;(function (H) {
    var each = H.each
    var round = Math.round
    var cos = Math.cos
    var sin = Math.sin
    var deg2rad = Math.deg2rad
    H.wrap(H.seriesTypes.pie.prototype, 'translate', function (proceed) {
        proceed.apply(this, [].slice.call(arguments, 1))
        // Do not do this if the chart is not 3D
        if (!this.chart.is3d()) {
            return
        }
        // 判断pieType === ‘2’,渲染高低不一的3d饼图
        if (this.chart.options.pieType !== '2') {
            return
        }
        var series = this,
            chart = series.chart,
            options = chart.options,
            seriesOptions = series.options,
            depth = seriesOptions.depth || 0,
            options3d = options.chart.options3d,
            alpha = options3d.alpha,
            beta = options3d.beta,
            z = seriesOptions.stacking ? (seriesOptions.stack || 0) * depth : series._i * depth
        z += depth / 2
        if (seriesOptions.grouping !== false) {
            z = 0
        }
        each(series.data, function (point) {
            var shapeArgs = point.shapeArgs,
                angle
            point.shapeType = 'arc3d'
            var ran = point.options.h
            shapeArgs.z = z
            shapeArgs.depth = depth * 0.75 + ran
            shapeArgs.alpha = alpha
            shapeArgs.beta = beta
            shapeArgs.center = series.center
            shapeArgs.ran = ran
            angle = (shapeArgs.end + shapeArgs.start) / 2
            point.slicedTranslation = {
                translateX: round(cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
                translateY: round(sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
            }
        })
    })
    H.wrap(H.SVGRenderer.prototype, 'arc3dPath', function (proceed) {
        // Run original proceed method
        var ret = proceed.apply(this, [].slice.call(arguments, 1))
        ret.zTop = (ret.zOut + 0.5) / 100
        return ret
    })
})(Highcharts)
