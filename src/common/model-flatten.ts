import { Cartesian4, Cartographic, Cesium3DTileset, CustomShader, Matrix4, Rectangle, UniformType } from 'cesium'

export function flattenTileset(tileset: Cesium3DTileset, options: { southwest: Cartographic; northeast: Cartographic; height: number; rotation: number }) {
  const southwest = options.southwest
  const northeast = options.northeast

  const localSouthwest = Cartographic.toCartesian(southwest)
  const localNortheast = Cartographic.toCartesian(northeast)

  const region = new Matrix4(localSouthwest.x, localNortheast.x, 0.0, 0.0, localSouthwest.y, localNortheast.y, 0.0, 0.0, localSouthwest.z, localNortheast.z, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0)

  const rectangle = Rectangle.fromCartographicArray([southwest, northeast])
  const center = Rectangle.center(rectangle)
  center.height = options.height
  const localCenter = Cartographic.toCartesian(center)

  tileset.customShader = new CustomShader({
    uniforms: {
      u_center: {
        type: UniformType.VEC4,
        value: new Cartesian4(localCenter.x, localCenter.y, localCenter.z, 1.0),
      },
      u_region: {
        type: UniformType.MAT4,
        value: region,
      },
      u_angle: {
        type: UniformType.FLOAT,
        value: options.rotation,
      },
    },
    vertexShaderText: `
      mat2 rotate(float rad) {
        float c = cos(rad);
        float s = sin(rad);
        return mat2(
            c, s,
            -s, c
        );
      }

      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput)
      {
        vec3 positionMC = vsInput.attributes.positionMC;

        vec4 p1 = czm_inverseModel * u_region[0];
        vec4 p2 = czm_inverseModel * u_region[1];

        vec2 pos1 = rotate(u_angle) * p1.xz;
        vec2 pos2 = rotate(u_angle) * p2.xz;
        vec2 pos = rotate(u_angle) * positionMC.xz;

        float minx = min(pos1.x, pos2.x);
        float maxx = max(pos1.x, pos2.x);
        float miny = min(pos1.y, pos2.y);
        float maxy = max(pos1.y, pos2.y);

        if (pos.x > minx && pos.x < maxx && pos.y > miny && pos.y < maxy)
        {
          vec4 centerMC = czm_inverseModel * u_center;

          positionMC.y = centerMC.y;
          vsOutput.positionMC = positionMC.xyz;
        }
      }
      `,
  })
}

export function cancelFlattenTileset(tileset: Cesium3DTileset) {
  tileset.customShader = undefined
}
