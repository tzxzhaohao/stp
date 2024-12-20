/*
 Highstock JS v9.3.3 (2022-02-01)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict'
;(function (V, N) {
    'object' === typeof module && module.exports
        ? ((N['default'] = N), (module.exports = V.document ? N(V) : N))
        : 'function' === typeof define && define.amd
        ? define('highcharts/highstock', function () {
              return N(V)
          })
        : (V.Highcharts && V.Highcharts.error(16, !0), (V.Highcharts = N(V)))
})('undefined' !== typeof window ? window : this, function (V) {
    function N(h, E, A, F) {
        h.hasOwnProperty(E) || (h[E] = F.apply(null, A))
    }
    var h = {}
    N(h, 'Core/Globals.js', [], function () {
        var h = 'undefined' !== typeof V ? V : 'undefined' !== typeof window ? window : {},
            E
        ;(function (d) {
            d.SVG_NS = 'http://www.w3.org/2000/svg'
            d.product = 'Highcharts'
            d.version = '9.3.3'
            d.win = h
            d.doc = d.win.document
            d.svg =
                d.doc &&
                d.doc.createElementNS &&
                !!d.doc.createElementNS(d.SVG_NS, 'svg').createSVGRect
            d.userAgent = (d.win.navigator && d.win.navigator.userAgent) || ''
            d.isChrome = -1 !== d.userAgent.indexOf('Chrome')
            d.isFirefox = -1 !== d.userAgent.indexOf('Firefox')
            d.isMS = /(edge|msie|trident)/i.test(d.userAgent) && !d.win.opera
            d.isSafari = !d.isChrome && -1 !== d.userAgent.indexOf('Safari')
            d.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(d.userAgent)
            d.isWebKit = -1 !== d.userAgent.indexOf('AppleWebKit')
            d.deg2rad = (2 * Math.PI) / 360
            d.hasBidiBug = d.isFirefox && 4 > parseInt(d.userAgent.split('Firefox/')[1], 10)
            d.hasTouch = !!d.win.TouchEvent
            d.marginNames = ['plotTop', 'marginRight', 'marginBottom', 'plotLeft']
            d.noop = function () {}
            d.supportsPassiveEvents = (function () {
                var h = !1
                if (!d.isMS) {
                    var E = Object.defineProperty({}, 'passive', {
                        get: function () {
                            h = !0
                        },
                    })
                    d.win.addEventListener &&
                        d.win.removeEventListener &&
                        (d.win.addEventListener('testPassive', d.noop, E),
                        d.win.removeEventListener('testPassive', d.noop, E))
                }
                return h
            })()
            d.charts = []
            d.dateFormats = {}
            d.seriesTypes = {}
            d.symbolSizes = {}
            d.chartCount = 0
        })(E || (E = {}))
        ;('')
        return E
    })
    N(h, 'Core/Utilities.js', [h['Core/Globals.js']], function (d) {
        function h(e, g, b, k) {
            var l = g ? 'Highcharts error' : 'Highcharts warning'
            32 === e && (e = l + ': Deprecated member')
            var r = p(e),
                B = r ? l + ' #' + e + ': www.highcharts.com/errors/' + e + '/' : e.toString()
            if ('undefined' !== typeof k) {
                var M = ''
                r && (B += '?')
                I(k, function (b, e) {
                    M += '\n - ' + e + ': ' + b
                    r && (B += encodeURI(e) + '=' + encodeURI(b))
                })
                B += M
            }
            K(d, 'displayError', { chart: b, code: e, message: B, params: k }, function () {
                if (g) throw Error(B)
                u.console && -1 === h.messages.indexOf(B) && console.warn(B)
            })
            h.messages.push(B)
        }
        function A(e, g) {
            var b = {}
            I(e, function (k, l) {
                if (H(e[l], !0) && !e.nodeType && g[l])
                    (k = A(e[l], g[l])), Object.keys(k).length && (b[l] = k)
                else if (H(e[l]) || e[l] !== g[l]) b[l] = e[l]
            })
            return b
        }
        function F(e, g) {
            return parseInt(e, g || 10)
        }
        function t(e) {
            return 'string' === typeof e
        }
        function G(e) {
            e = Object.prototype.toString.call(e)
            return '[object Array]' === e || '[object Array Iterator]' === e
        }
        function H(e, g) {
            return !!e && 'object' === typeof e && (!g || !G(e))
        }
        function y(e) {
            return H(e) && 'number' === typeof e.nodeType
        }
        function q(e) {
            var g = e && e.constructor
            return !(!H(e, !0) || y(e) || !g || !g.name || 'Object' === g.name)
        }
        function p(e) {
            return 'number' === typeof e && !isNaN(e) && Infinity > e && -Infinity < e
        }
        function f(e) {
            return 'undefined' !== typeof e && null !== e
        }
        function c(e, g, b) {
            var l
            t(g)
                ? f(b)
                    ? e.setAttribute(g, b)
                    : e &&
                      e.getAttribute &&
                      ((l = e.getAttribute(g)) || 'class' !== g || (l = e.getAttribute(g + 'Name')))
                : I(g, function (b, g) {
                      f(b) ? e.setAttribute(g, b) : e.removeAttribute(g)
                  })
            return l
        }
        function a(e, g) {
            var b
            e || (e = {})
            for (b in g) e[b] = g[b]
            return e
        }
        function n() {
            for (var e = arguments, g = e.length, b = 0; b < g; b++) {
                var l = e[b]
                if ('undefined' !== typeof l && null !== l) return l
            }
        }
        function m(e, g) {
            d.isMS &&
                !d.svg &&
                g &&
                'undefined' !== typeof g.opacity &&
                (g.filter = 'alpha(opacity=' + 100 * g.opacity + ')')
            a(e.style, g)
        }
        function D(e, g) {
            return 1e14 < e ? e : parseFloat(e.toPrecision(g || 14))
        }
        function C(e, g, b) {
            var l = d.getStyle || C
            if ('width' === g)
                return (
                    (g = Math.min(e.offsetWidth, e.scrollWidth)),
                    (b = e.getBoundingClientRect && e.getBoundingClientRect().width),
                    b < g && b >= g - 1 && (g = Math.floor(b)),
                    Math.max(
                        0,
                        g - (l(e, 'padding-left', !0) || 0) - (l(e, 'padding-right', !0) || 0)
                    )
                )
            if ('height' === g)
                return Math.max(
                    0,
                    Math.min(e.offsetHeight, e.scrollHeight) -
                        (l(e, 'padding-top', !0) || 0) -
                        (l(e, 'padding-bottom', !0) || 0)
                )
            u.getComputedStyle || h(27, !0)
            if ((e = u.getComputedStyle(e, void 0))) {
                var k = e.getPropertyValue(g)
                n(b, 'opacity' !== g) && (k = F(k))
            }
            return k
        }
        function I(e, g, b) {
            for (var l in e) Object.hasOwnProperty.call(e, l) && g.call(b || e[l], e[l], l, e)
        }
        function L(e, g, b) {
            function l(b, g) {
                var l = e.removeEventListener || d.removeEventListenerPolyfill
                l && l.call(e, b, g, !1)
            }
            function k(b) {
                var k
                if (e.nodeName) {
                    if (g) {
                        var P = {}
                        P[g] = !0
                    } else P = b
                    I(P, function (e, g) {
                        if (b[g]) for (k = b[g].length; k--; ) l(g, b[g][k].fn)
                    })
                }
            }
            var r = ('function' === typeof e && e.prototype) || e
            if (Object.hasOwnProperty.call(r, 'hcEvents')) {
                var x = r.hcEvents
                g
                    ? ((r = x[g] || []),
                      b
                          ? ((x[g] = r.filter(function (e) {
                                return b !== e.fn
                            })),
                            l(g, b))
                          : (k(x), (x[g] = [])))
                    : (k(x), delete r.hcEvents)
            }
        }
        function K(e, g, b, l) {
            b = b || {}
            if (z.createEvent && (e.dispatchEvent || (e.fireEvent && e !== d))) {
                var k = z.createEvent('Events')
                k.initEvent(g, !0, !0)
                b = a(k, b)
                e.dispatchEvent ? e.dispatchEvent(b) : e.fireEvent(g, b)
            } else if (e.hcEvents) {
                b.target ||
                    a(b, {
                        preventDefault: function () {
                            b.defaultPrevented = !0
                        },
                        target: e,
                        type: g,
                    })
                k = []
                for (var r = e, B = !1; r.hcEvents; )
                    Object.hasOwnProperty.call(r, 'hcEvents') &&
                        r.hcEvents[g] &&
                        (k.length && (B = !0), k.unshift.apply(k, r.hcEvents[g])),
                        (r = Object.getPrototypeOf(r))
                B &&
                    k.sort(function (b, e) {
                        return b.order - e.order
                    })
                k.forEach(function (g) {
                    !1 === g.fn.call(e, b) && b.preventDefault()
                })
            }
            l && !b.defaultPrevented && l.call(e, b)
        }
        var v = d.charts,
            z = d.doc,
            u = d.win
        ;(h || (h = {})).messages = []
        Math.easeInOutSine = function (e) {
            return -0.5 * (Math.cos(Math.PI * e) - 1)
        }
        var k = Array.prototype.find
            ? function (e, g) {
                  return e.find(g)
              }
            : function (e, g) {
                  var b,
                      l = e.length
                  for (b = 0; b < l; b++) if (g(e[b], b)) return e[b]
              }
        I(
            { map: 'map', each: 'forEach', grep: 'filter', reduce: 'reduce', some: 'some' },
            function (e, g) {
                d[g] = function (b) {
                    var l
                    h(32, !1, void 0, ((l = {}), (l['Highcharts.' + g] = 'use Array.' + e), l))
                    return Array.prototype[e].apply(b, [].slice.call(arguments, 1))
                }
            }
        )
        var w,
            l = (function () {
                var e = Math.random().toString(36).substring(2, 9) + '-',
                    g = 0
                return function () {
                    return 'highcharts-' + (w ? '' : e) + g++
                }
            })()
        u.jQuery &&
            (u.jQuery.fn.highcharts = function () {
                var e = [].slice.call(arguments)
                if (this[0])
                    return e[0]
                        ? (new d[t(e[0]) ? e.shift() : 'Chart'](this[0], e[0], e[1]), this)
                        : v[c(this[0], 'data-highcharts-chart')]
            })
        k = {
            addEvent: function (e, g, b, l) {
                void 0 === l && (l = {})
                var k = ('function' === typeof e && e.prototype) || e
                Object.hasOwnProperty.call(k, 'hcEvents') || (k.hcEvents = {})
                k = k.hcEvents
                d.Point &&
                    e instanceof d.Point &&
                    e.series &&
                    e.series.chart &&
                    (e.series.chart.runTrackerClick = !0)
                var r = e.addEventListener || d.addEventListenerPolyfill
                r &&
                    r.call(
                        e,
                        g,
                        b,
                        d.supportsPassiveEvents
                            ? {
                                  passive:
                                      void 0 === l.passive ? -1 !== g.indexOf('touch') : l.passive,
                                  capture: !1,
                              }
                            : !1
                    )
                k[g] || (k[g] = [])
                k[g].push({ fn: b, order: 'number' === typeof l.order ? l.order : Infinity })
                k[g].sort(function (b, e) {
                    return b.order - e.order
                })
                return function () {
                    L(e, g, b)
                }
            },
            arrayMax: function (e) {
                for (var g = e.length, b = e[0]; g--; ) e[g] > b && (b = e[g])
                return b
            },
            arrayMin: function (e) {
                for (var g = e.length, b = e[0]; g--; ) e[g] < b && (b = e[g])
                return b
            },
            attr: c,
            clamp: function (e, g, b) {
                return e > g ? (e < b ? e : b) : g
            },
            cleanRecursively: A,
            clearTimeout: function (e) {
                f(e) && clearTimeout(e)
            },
            correctFloat: D,
            createElement: function (e, g, b, l, k) {
                e = z.createElement(e)
                g && a(e, g)
                k && m(e, { padding: '0', border: 'none', margin: '0' })
                b && m(e, b)
                l && l.appendChild(e)
                return e
            },
            css: m,
            defined: f,
            destroyObjectProperties: function (e, g) {
                I(e, function (b, l) {
                    b && b !== g && b.destroy && b.destroy()
                    delete e[l]
                })
            },
            discardElement: function (e) {
                e && e.parentElement && e.parentElement.removeChild(e)
            },
            erase: function (e, g) {
                for (var b = e.length; b--; )
                    if (e[b] === g) {
                        e.splice(b, 1)
                        break
                    }
            },
            error: h,
            extend: a,
            extendClass: function (e, g) {
                var b = function () {}
                b.prototype = new e()
                a(b.prototype, g)
                return b
            },
            find: k,
            fireEvent: K,
            getMagnitude: function (e) {
                return Math.pow(10, Math.floor(Math.log(e) / Math.LN10))
            },
            getNestedProperty: function (e, g) {
                for (e = e.split('.'); e.length && f(g); ) {
                    var b = e.shift()
                    if ('undefined' === typeof b || '__proto__' === b) return
                    g = g[b]
                    if (
                        !f(g) ||
                        'function' === typeof g ||
                        'number' === typeof g.nodeType ||
                        g === u
                    )
                        return
                }
                return g
            },
            getStyle: C,
            inArray: function (e, g, b) {
                h(32, !1, void 0, { 'Highcharts.inArray': 'use Array.indexOf' })
                return g.indexOf(e, b)
            },
            isArray: G,
            isClass: q,
            isDOMElement: y,
            isFunction: function (e) {
                return 'function' === typeof e
            },
            isNumber: p,
            isObject: H,
            isString: t,
            keys: function (e) {
                h(32, !1, void 0, { 'Highcharts.keys': 'use Object.keys' })
                return Object.keys(e)
            },
            merge: function () {
                var e,
                    g = arguments,
                    b = {},
                    l = function (b, e) {
                        'object' !== typeof b && (b = {})
                        I(e, function (g, k) {
                            '__proto__' !== k &&
                                'constructor' !== k &&
                                (!H(g, !0) || q(g) || y(g)
                                    ? (b[k] = e[k])
                                    : (b[k] = l(b[k] || {}, g)))
                        })
                        return b
                    }
                !0 === g[0] && ((b = g[1]), (g = Array.prototype.slice.call(g, 2)))
                var k = g.length
                for (e = 0; e < k; e++) b = l(b, g[e])
                return b
            },
            normalizeTickInterval: function (e, g, b, l, k) {
                var r = e
                b = n(b, 1)
                var B = e / b
                g ||
                    ((g = k ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10]),
                    !1 === l &&
                        (1 === b
                            ? (g = g.filter(function (b) {
                                  return 0 === b % 1
                              }))
                            : 0.1 >= b && (g = [1 / b])))
                for (
                    l = 0;
                    l < g.length &&
                    !((r = g[l]),
                    (k && r * b >= e) || (!k && B <= (g[l] + (g[l + 1] || g[l])) / 2));
                    l++
                );
                return (r = D(r * b, -Math.round(Math.log(0.001) / Math.LN10)))
            },
            objectEach: I,
            offset: function (e) {
                var g = z.documentElement
                e =
                    e.parentElement || e.parentNode
                        ? e.getBoundingClientRect()
                        : { top: 0, left: 0, width: 0, height: 0 }
                return {
                    top: e.top + (u.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                    left: e.left + (u.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
                    width: e.width,
                    height: e.height,
                }
            },
            pad: function (e, g, b) {
                return Array((g || 2) + 1 - String(e).replace('-', '').length).join(b || '0') + e
            },
            pick: n,
            pInt: F,
            relativeLength: function (e, g, b) {
                return /%$/.test(e) ? (g * parseFloat(e)) / 100 + (b || 0) : parseFloat(e)
            },
            removeEvent: L,
            splat: function (e) {
                return G(e) ? e : [e]
            },
            stableSort: function (e, g) {
                var b = e.length,
                    l,
                    k
                for (k = 0; k < b; k++) e[k].safeI = k
                e.sort(function (b, e) {
                    l = g(b, e)
                    return 0 === l ? b.safeI - e.safeI : l
                })
                for (k = 0; k < b; k++) delete e[k].safeI
            },
            syncTimeout: function (e, g, b) {
                if (0 < g) return setTimeout(e, g, b)
                e.call(0, b)
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 24192e5,
                year: 314496e5,
            },
            uniqueKey: l,
            useSerialIds: function (e) {
                return (w = n(e, w))
            },
            wrap: function (e, g, b) {
                var l = e[g]
                e[g] = function () {
                    var e = Array.prototype.slice.call(arguments),
                        g = arguments,
                        k = this
                    k.proceed = function () {
                        l.apply(k, arguments.length ? arguments : g)
                    }
                    e.unshift(l)
                    e = b.apply(this, e)
                    k.proceed = null
                    return e
                }
            },
        }
        ;('')
        return k
    })
    N(h, 'Core/Chart/ChartDefaults.js', [], function () {
        return {
            panning: { enabled: !1, type: 'x' },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            defaultSeriesType: 'line',
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            resetZoomButton: { theme: { zIndex: 6 }, position: { align: 'right', x: -10, y: 10 } },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: '#335cad',
            backgroundColor: '#ffffff',
            plotBorderColor: '#cccccc',
        }
    })
    N(h, 'Core/Color/Color.js', [h['Core/Globals.js'], h['Core/Utilities.js']], function (d, h) {
        var E = h.isNumber,
            F = h.merge,
            t = h.pInt
        h = (function () {
            function h(E) {
                this.rgba = [NaN, NaN, NaN, NaN]
                this.input = E
                var y = d.Color
                if (y && y !== h) return new y(E)
                if (!(this instanceof h)) return new h(E)
                this.init(E)
            }
            h.parse = function (d) {
                return d ? new h(d) : h.None
            }
            h.prototype.init = function (d) {
                var y
                if ('object' === typeof d && 'undefined' !== typeof d.stops)
                    this.stops = d.stops.map(function (c) {
                        return new h(c[1])
                    })
                else if ('string' === typeof d) {
                    this.input = d = h.names[d.toLowerCase()] || d
                    if ('#' === d.charAt(0)) {
                        var q = d.length
                        var p = parseInt(d.substr(1), 16)
                        7 === q
                            ? (y = [(p & 16711680) >> 16, (p & 65280) >> 8, p & 255, 1])
                            : 4 === q &&
                              (y = [
                                  ((p & 3840) >> 4) | ((p & 3840) >> 8),
                                  ((p & 240) >> 4) | (p & 240),
                                  ((p & 15) << 4) | (p & 15),
                                  1,
                              ])
                    }
                    if (!y)
                        for (p = h.parsers.length; p-- && !y; ) {
                            var f = h.parsers[p]
                            ;(q = f.regex.exec(d)) && (y = f.parse(q))
                        }
                }
                y && (this.rgba = y)
            }
            h.prototype.get = function (d) {
                var y = this.input,
                    q = this.rgba
                if ('object' === typeof y && 'undefined' !== typeof this.stops) {
                    var p = F(y)
                    p.stops = [].slice.call(p.stops)
                    this.stops.forEach(function (f, c) {
                        p.stops[c] = [p.stops[c][0], f.get(d)]
                    })
                    return p
                }
                return q && E(q[0])
                    ? 'rgb' === d || (!d && 1 === q[3])
                        ? 'rgb(' + q[0] + ',' + q[1] + ',' + q[2] + ')'
                        : 'a' === d
                        ? '' + q[3]
                        : 'rgba(' + q.join(',') + ')'
                    : y
            }
            h.prototype.brighten = function (d) {
                var y = this.rgba
                if (this.stops)
                    this.stops.forEach(function (p) {
                        p.brighten(d)
                    })
                else if (E(d) && 0 !== d)
                    for (var q = 0; 3 > q; q++)
                        (y[q] += t(255 * d)), 0 > y[q] && (y[q] = 0), 255 < y[q] && (y[q] = 255)
                return this
            }
            h.prototype.setOpacity = function (d) {
                this.rgba[3] = d
                return this
            }
            h.prototype.tweenTo = function (d, y) {
                var q = this.rgba,
                    p = d.rgba
                if (!E(q[0]) || !E(p[0])) return d.input || 'none'
                d = 1 !== p[3] || 1 !== q[3]
                return (
                    (d ? 'rgba(' : 'rgb(') +
                    Math.round(p[0] + (q[0] - p[0]) * (1 - y)) +
                    ',' +
                    Math.round(p[1] + (q[1] - p[1]) * (1 - y)) +
                    ',' +
                    Math.round(p[2] + (q[2] - p[2]) * (1 - y)) +
                    (d ? ',' + (p[3] + (q[3] - p[3]) * (1 - y)) : '') +
                    ')'
                )
            }
            h.names = { white: '#ffffff', black: '#000000' }
            h.parsers = [
                {
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (d) {
                        return [t(d[1]), t(d[2]), t(d[3]), parseFloat(d[4], 10)]
                    },
                },
                {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (d) {
                        return [t(d[1]), t(d[2]), t(d[3]), 1]
                    },
                },
            ]
            h.None = new h('')
            return h
        })()
        ;('')
        return h
    })
    N(h, 'Core/Color/Palettes.js', [], function () {
        return {
            colors: '#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1'.split(
                ' '
            ),
        }
    })
    N(h, 'Core/Time.js', [h['Core/Globals.js'], h['Core/Utilities.js']], function (d, h) {
        var E = d.win,
            F = h.defined,
            t = h.error,
            G = h.extend,
            H = h.isObject,
            y = h.merge,
            q = h.objectEach,
            p = h.pad,
            f = h.pick,
            c = h.splat,
            a = h.timeUnits,
            n = d.isSafari && E.Intl && E.Intl.DateTimeFormat.prototype.formatRange,
            m = d.isSafari && E.Intl && !E.Intl.DateTimeFormat.prototype.formatRange
        h = (function () {
            function D(a) {
                this.options = {}
                this.variableTimezone = this.useUTC = !1
                this.Date = E.Date
                this.getTimezoneOffset = this.timezoneOffsetFunction()
                this.update(a)
            }
            D.prototype.get = function (a, c) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var C = c.getTime(),
                        f = C - this.getTimezoneOffset(c)
                    c.setTime(f)
                    a = c['getUTC' + a]()
                    c.setTime(C)
                    return a
                }
                return this.useUTC ? c['getUTC' + a]() : c['get' + a]()
            }
            D.prototype.set = function (a, c, f) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if (
                        'Milliseconds' === a ||
                        'Seconds' === a ||
                        ('Minutes' === a && 0 === this.getTimezoneOffset(c) % 36e5)
                    )
                        return c['setUTC' + a](f)
                    var C = this.getTimezoneOffset(c)
                    C = c.getTime() - C
                    c.setTime(C)
                    c['setUTC' + a](f)
                    a = this.getTimezoneOffset(c)
                    C = c.getTime() + a
                    return c.setTime(C)
                }
                return this.useUTC || (n && 'FullYear' === a) ? c['setUTC' + a](f) : c['set' + a](f)
            }
            D.prototype.update = function (a) {
                var c = f(a && a.useUTC, !0)
                this.options = a = y(!0, this.options || {}, a)
                this.Date = a.Date || E.Date || Date
                this.timezoneOffset = (this.useUTC = c) && a.timezoneOffset
                this.getTimezoneOffset = this.timezoneOffsetFunction()
                this.variableTimezone = c && !(!a.getTimezoneOffset && !a.timezone)
            }
            D.prototype.makeTime = function (a, c, n, D, v, z) {
                if (this.useUTC) {
                    var u = this.Date.UTC.apply(0, arguments)
                    var k = this.getTimezoneOffset(u)
                    u += k
                    var w = this.getTimezoneOffset(u)
                    k !== w
                        ? (u += w - k)
                        : k - 36e5 !== this.getTimezoneOffset(u - 36e5) || m || (u -= 36e5)
                } else u = new this.Date(a, c, f(n, 1), f(D, 0), f(v, 0), f(z, 0)).getTime()
                return u
            }
            D.prototype.timezoneOffsetFunction = function () {
                var a = this,
                    c = this.options,
                    f = c.getTimezoneOffset,
                    n = c.moment || E.moment
                if (!this.useUTC)
                    return function (a) {
                        return 6e4 * new Date(a.toString()).getTimezoneOffset()
                    }
                if (c.timezone) {
                    if (n)
                        return function (a) {
                            return 6e4 * -n.tz(a, c.timezone).utcOffset()
                        }
                    t(25)
                }
                return this.useUTC && f
                    ? function (a) {
                          return 6e4 * f(a.valueOf())
                      }
                    : function () {
                          return 6e4 * (a.timezoneOffset || 0)
                      }
            }
            D.prototype.dateFormat = function (a, c, n) {
                if (!F(c) || isNaN(c))
                    return (d.defaultOptions.lang && d.defaultOptions.lang.invalidDate) || ''
                a = f(a, '%Y-%m-%d %H:%M:%S')
                var C = this,
                    v = new this.Date(c),
                    z = this.get('Hours', v),
                    u = this.get('Day', v),
                    k = this.get('Date', v),
                    w = this.get('Month', v),
                    l = this.get('FullYear', v),
                    e = d.defaultOptions.lang,
                    g = e && e.weekdays,
                    b = e && e.shortWeekdays
                v = G(
                    {
                        a: b ? b[u] : g[u].substr(0, 3),
                        A: g[u],
                        d: p(k),
                        e: p(k, 2, ' '),
                        w: u,
                        b: e.shortMonths[w],
                        B: e.months[w],
                        m: p(w + 1),
                        o: w + 1,
                        y: l.toString().substr(2, 2),
                        Y: l,
                        H: p(z),
                        k: z,
                        I: p(z % 12 || 12),
                        l: z % 12 || 12,
                        M: p(this.get('Minutes', v)),
                        p: 12 > z ? 'AM' : 'PM',
                        P: 12 > z ? 'am' : 'pm',
                        S: p(v.getSeconds()),
                        L: p(Math.floor(c % 1e3), 3),
                    },
                    d.dateFormats
                )
                q(v, function (b, e) {
                    for (; -1 !== a.indexOf('%' + e); )
                        a = a.replace('%' + e, 'function' === typeof b ? b.call(C, c) : b)
                })
                return n ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
            }
            D.prototype.resolveDTLFormat = function (a) {
                return H(a, !0) ? a : ((a = c(a)), { main: a[0], from: a[1], to: a[2] })
            }
            D.prototype.getTimeTicks = function (c, n, m, D) {
                var v = this,
                    z = [],
                    u = {},
                    k = new v.Date(n),
                    w = c.unitRange,
                    l = c.count || 1,
                    e
                D = f(D, 1)
                if (F(n)) {
                    v.set(
                        'Milliseconds',
                        k,
                        w >= a.second ? 0 : l * Math.floor(v.get('Milliseconds', k) / l)
                    )
                    w >= a.second &&
                        v.set(
                            'Seconds',
                            k,
                            w >= a.minute ? 0 : l * Math.floor(v.get('Seconds', k) / l)
                        )
                    w >= a.minute &&
                        v.set(
                            'Minutes',
                            k,
                            w >= a.hour ? 0 : l * Math.floor(v.get('Minutes', k) / l)
                        )
                    w >= a.hour &&
                        v.set('Hours', k, w >= a.day ? 0 : l * Math.floor(v.get('Hours', k) / l))
                    w >= a.day &&
                        v.set(
                            'Date',
                            k,
                            w >= a.month ? 1 : Math.max(1, l * Math.floor(v.get('Date', k) / l))
                        )
                    if (w >= a.month) {
                        v.set('Month', k, w >= a.year ? 0 : l * Math.floor(v.get('Month', k) / l))
                        var g = v.get('FullYear', k)
                    }
                    w >= a.year && v.set('FullYear', k, g - (g % l))
                    w === a.week &&
                        ((g = v.get('Day', k)),
                        v.set('Date', k, v.get('Date', k) - g + D + (g < D ? -7 : 0)))
                    g = v.get('FullYear', k)
                    D = v.get('Month', k)
                    var b = v.get('Date', k),
                        B = v.get('Hours', k)
                    n = k.getTime()
                    ;(!v.variableTimezone && v.useUTC) ||
                        !F(m) ||
                        (e =
                            m - n > 4 * a.month ||
                            v.getTimezoneOffset(n) !== v.getTimezoneOffset(m))
                    n = k.getTime()
                    for (k = 1; n < m; )
                        z.push(n),
                            (n =
                                w === a.year
                                    ? v.makeTime(g + k * l, 0)
                                    : w === a.month
                                    ? v.makeTime(g, D + k * l)
                                    : !e || (w !== a.day && w !== a.week)
                                    ? e && w === a.hour && 1 < l
                                        ? v.makeTime(g, D, b, B + k * l)
                                        : n + w * l
                                    : v.makeTime(g, D, b + k * l * (w === a.day ? 1 : 7))),
                            k++
                    z.push(n)
                    w <= a.hour &&
                        1e4 > z.length &&
                        z.forEach(function (b) {
                            0 === b % 18e5 &&
                                '000000000' === v.dateFormat('%H%M%S%L', b) &&
                                (u[b] = 'day')
                        })
                }
                z.info = G(c, { higherRanks: u, totalRange: w * l })
                return z
            }
            D.prototype.getDateFormat = function (c, n, f, m) {
                var v = this.dateFormat('%m-%d %H:%M:%S.%L', n),
                    z = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                    u = 'millisecond'
                for (k in a) {
                    if (
                        c === a.week &&
                        +this.dateFormat('%w', n) === f &&
                        '00:00:00.000' === v.substr(6)
                    ) {
                        var k = 'week'
                        break
                    }
                    if (a[k] > c) {
                        k = u
                        break
                    }
                    if (z[k] && v.substr(z[k]) !== '01-01 00:00:00.000'.substr(z[k])) break
                    'week' !== k && (u = k)
                }
                if (k) var w = this.resolveDTLFormat(m[k]).main
                return w
            }
            return D
        })()
        ;('')
        return h
    })
    N(
        h,
        'Core/DefaultOptions.js',
        [
            h['Core/Chart/ChartDefaults.js'],
            h['Core/Color/Color.js'],
            h['Core/Globals.js'],
            h['Core/Color/Palettes.js'],
            h['Core/Time.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G) {
            h = h.parse
            var E = G.merge,
                y = {
                    colors: F.colors,
                    symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
                    lang: {
                        loading: 'Loading...',
                        months: 'January February March April May June July August September October November December'.split(
                            ' '
                        ),
                        shortMonths: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
                        weekdays: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(
                            ' '
                        ),
                        decimalPoint: '.',
                        numericSymbols: 'kMGTPE'.split(''),
                        resetZoom: 'Reset zoom',
                        resetZoomTitle: 'Reset zoom level 1:1',
                        thousandsSep: ' ',
                    },
                    global: {},
                    time: {
                        Date: void 0,
                        getTimezoneOffset: void 0,
                        timezone: void 0,
                        timezoneOffset: 0,
                        useUTC: !0,
                    },
                    chart: d,
                    title: { text: 'Chart title', align: 'center', margin: 15, widthAdjust: -44 },
                    subtitle: { text: '', align: 'center', widthAdjust: -44 },
                    caption: { margin: 15, text: '', align: 'left', verticalAlign: 'bottom' },
                    plotOptions: {},
                    labels: { style: { position: 'absolute', color: '#333333' } },
                    legend: {
                        enabled: !0,
                        align: 'center',
                        alignColumns: !0,
                        className: 'highcharts-no-tooltip',
                        layout: 'horizontal',
                        labelFormatter: function () {
                            return this.name
                        },
                        borderColor: '#999999',
                        borderRadius: 0,
                        navigation: { activeColor: '#003399', inactiveColor: '#cccccc' },
                        itemStyle: {
                            color: '#333333',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                        },
                        itemHoverStyle: { color: '#000000' },
                        itemHiddenStyle: { color: '#cccccc' },
                        shadow: !1,
                        itemCheckboxStyle: { position: 'absolute', width: '13px', height: '13px' },
                        squareSymbol: !0,
                        symbolPadding: 5,
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0,
                        title: { style: { fontWeight: 'bold' } },
                    },
                    loading: {
                        labelStyle: { fontWeight: 'bold', position: 'relative', top: '45%' },
                        style: {
                            position: 'absolute',
                            backgroundColor: '#ffffff',
                            opacity: 0.5,
                            textAlign: 'center',
                        },
                    },
                    tooltip: {
                        enabled: !0,
                        animation: A.svg,
                        borderRadius: 3,
                        dateTimeLabelFormats: {
                            millisecond: '%A, %b %e, %H:%M:%S.%L',
                            second: '%A, %b %e, %H:%M:%S',
                            minute: '%A, %b %e, %H:%M',
                            hour: '%A, %b %e, %H:%M',
                            day: '%A, %b %e, %Y',
                            week: 'Week from %A, %b %e, %Y',
                            month: '%B %Y',
                            year: '%Y',
                        },
                        footerFormat: '',
                        headerShape: 'callout',
                        hideDelay: 500,
                        padding: 8,
                        shape: 'callout',
                        shared: !1,
                        snap: A.isTouchDevice ? 25 : 10,
                        headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                        pointFormat:
                            '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                        backgroundColor: h('#f7f7f7').setOpacity(0.85).get(),
                        borderWidth: 1,
                        shadow: !0,
                        stickOnContact: !1,
                        style: {
                            color: '#333333',
                            cursor: 'default',
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                        },
                        useHTML: !1,
                    },
                    credits: {
                        enabled: !0,
                        href: 'https://www.highcharts.com?credits',
                        position: { align: 'right', x: -10, verticalAlign: 'bottom', y: -5 },
                        style: { cursor: 'pointer', color: '#999999', fontSize: '9px' },
                        text: 'Highcharts.com',
                    },
                }
            y.chart.styledMode = !1
            ;('')
            var q = new t(E(y.global, y.time))
            d = {
                defaultOptions: y,
                defaultTime: q,
                getOptions: function () {
                    return y
                },
                setOptions: function (p) {
                    E(!0, y, p)
                    if (p.time || p.global)
                        A.time ? A.time.update(E(y.global, y.time, p.global, p.time)) : (A.time = q)
                    return y
                },
            }
            ;('')
            return d
        }
    )
    N(
        h,
        'Core/Animation/Fx.js',
        [h['Core/Color/Color.js'], h['Core/Globals.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = d.parse,
                t = h.win,
                G = A.isNumber,
                H = A.objectEach
            return (function () {
                function d(q, p, f) {
                    this.pos = NaN
                    this.options = p
                    this.elem = q
                    this.prop = f
                }
                d.prototype.dSetter = function () {
                    var q = this.paths,
                        p = q && q[0]
                    q = q && q[1]
                    var f = this.now || 0,
                        c = []
                    if (1 !== f && p && q)
                        if (p.length === q.length && 1 > f)
                            for (var a = 0; a < q.length; a++) {
                                for (var n = p[a], m = q[a], D = [], C = 0; C < m.length; C++) {
                                    var I = n[C],
                                        L = m[C]
                                    G(I) && G(L) && ('A' !== m[0] || (4 !== C && 5 !== C))
                                        ? (D[C] = I + f * (L - I))
                                        : (D[C] = L)
                                }
                                c.push(D)
                            }
                        else c = q
                    else c = this.toD || []
                    this.elem.attr('d', c, void 0, !0)
                }
                d.prototype.update = function () {
                    var q = this.elem,
                        p = this.prop,
                        f = this.now,
                        c = this.options.step
                    if (this[p + 'Setter']) this[p + 'Setter']()
                    else q.attr ? q.element && q.attr(p, f, null, !0) : (q.style[p] = f + this.unit)
                    c && c.call(q, f, this)
                }
                d.prototype.run = function (q, p, f) {
                    var c = this,
                        a = c.options,
                        n = function (a) {
                            return n.stopped ? !1 : c.step(a)
                        },
                        m =
                            t.requestAnimationFrame ||
                            function (a) {
                                setTimeout(a, 13)
                            },
                        D = function () {
                            for (var a = 0; a < d.timers.length; a++)
                                d.timers[a]() || d.timers.splice(a--, 1)
                            d.timers.length && m(D)
                        }
                    q !== p || this.elem['forceAnimate:' + this.prop]
                        ? ((this.startTime = +new Date()),
                          (this.start = q),
                          (this.end = p),
                          (this.unit = f),
                          (this.now = this.start),
                          (this.pos = 0),
                          (n.elem = this.elem),
                          (n.prop = this.prop),
                          n() && 1 === d.timers.push(n) && m(D))
                        : (delete a.curAnim[this.prop],
                          a.complete &&
                              0 === Object.keys(a.curAnim).length &&
                              a.complete.call(this.elem))
                }
                d.prototype.step = function (q) {
                    var p = +new Date(),
                        f = this.options,
                        c = this.elem,
                        a = f.complete,
                        n = f.duration,
                        m = f.curAnim
                    if (c.attr && !c.element) q = !1
                    else if (q || p >= n + this.startTime) {
                        this.now = this.end
                        this.pos = 1
                        this.update()
                        var D = (m[this.prop] = !0)
                        H(m, function (a) {
                            !0 !== a && (D = !1)
                        })
                        D && a && a.call(c)
                        q = !1
                    } else
                        (this.pos = f.easing((p - this.startTime) / n)),
                            (this.now = this.start + (this.end - this.start) * this.pos),
                            this.update(),
                            (q = !0)
                    return q
                }
                d.prototype.initPath = function (q, p, f) {
                    function c(a, c) {
                        for (; a.length < K; ) {
                            var u = a[0],
                                k = c[K - a.length]
                            k &&
                                'M' === u[0] &&
                                (a[0] =
                                    'C' === k[0]
                                        ? ['C', u[1], u[2], u[1], u[2], u[1], u[2]]
                                        : ['L', u[1], u[2]])
                            a.unshift(u)
                            D && ((u = a.pop()), a.push(a[a.length - 1], u))
                        }
                    }
                    function a(a, c) {
                        for (; a.length < K; )
                            if (
                                ((c = a[Math.floor(a.length / C) - 1].slice()),
                                'C' === c[0] && ((c[1] = c[5]), (c[2] = c[6])),
                                D)
                            ) {
                                var u = a[Math.floor(a.length / C)].slice()
                                a.splice(a.length / 2, 0, c, u)
                            } else a.push(c)
                    }
                    var n = q.startX,
                        m = q.endX
                    f = f.slice()
                    var D = q.isArea,
                        C = D ? 2 : 1
                    p = p && p.slice()
                    if (!p) return [f, f]
                    if (n && m && m.length) {
                        for (q = 0; q < n.length; q++)
                            if (n[q] === m[0]) {
                                var I = q
                                break
                            } else if (n[0] === m[m.length - n.length + q]) {
                                I = q
                                var L = !0
                                break
                            } else if (n[n.length - 1] === m[m.length - n.length + q]) {
                                I = n.length - q
                                break
                            }
                        'undefined' === typeof I && (p = [])
                    }
                    if (p.length && G(I)) {
                        var K = f.length + I * C
                        L ? (c(p, f), a(f, p)) : (c(f, p), a(p, f))
                    }
                    return [p, f]
                }
                d.prototype.fillSetter = function () {
                    d.prototype.strokeSetter.apply(this, arguments)
                }
                d.prototype.strokeSetter = function () {
                    this.elem.attr(
                        this.prop,
                        E(this.start).tweenTo(E(this.end), this.pos),
                        void 0,
                        !0
                    )
                }
                d.timers = []
                return d
            })()
        }
    )
    N(
        h,
        'Core/Animation/AnimationUtilities.js',
        [h['Core/Animation/Fx.js'], h['Core/Utilities.js']],
        function (d, h) {
            function E(a) {
                return q(a)
                    ? p({ duration: 500, defer: 0 }, a)
                    : { duration: a ? 500 : 0, defer: 0 }
            }
            function F(a, c) {
                for (var n = d.timers.length; n--; )
                    d.timers[n].elem !== a ||
                        (c && c !== d.timers[n].prop) ||
                        (d.timers[n].stopped = !0)
            }
            var t = h.defined,
                G = h.getStyle,
                H = h.isArray,
                y = h.isNumber,
                q = h.isObject,
                p = h.merge,
                f = h.objectEach,
                c = h.pick
            return {
                animate: function (a, c, m) {
                    var n,
                        C = '',
                        I,
                        L
                    if (!q(m)) {
                        var K = arguments
                        m = { duration: K[2], easing: K[3], complete: K[4] }
                    }
                    y(m.duration) || (m.duration = 400)
                    m.easing =
                        'function' === typeof m.easing
                            ? m.easing
                            : Math[m.easing] || Math.easeInOutSine
                    m.curAnim = p(c)
                    f(c, function (f, z) {
                        F(a, z)
                        L = new d(a, m, z)
                        I = void 0
                        'd' === z && H(c.d)
                            ? ((L.paths = L.initPath(a, a.pathArray, c.d)),
                              (L.toD = c.d),
                              (n = 0),
                              (I = 1))
                            : a.attr
                            ? (n = a.attr(z))
                            : ((n = parseFloat(G(a, z)) || 0), 'opacity' !== z && (C = 'px'))
                        I || (I = f)
                        'string' === typeof I && I.match('px') && (I = I.replace(/px/g, ''))
                        L.run(n, I, C)
                    })
                },
                animObject: E,
                getDeferredAnimation: function (a, c, f) {
                    var n = E(c),
                        m = 0,
                        p = 0
                    ;(f ? [f] : a.series).forEach(function (a) {
                        a = E(a.options.animation)
                        m = c && t(c.defer) ? n.defer : Math.max(m, a.duration + a.defer)
                        p = Math.min(n.duration, a.duration)
                    })
                    a.renderer.forExport && (m = 0)
                    return { defer: Math.max(0, m - p), duration: Math.min(m, p) }
                },
                setAnimation: function (a, n) {
                    n.renderer.globalAnimation = c(a, n.options.chart.animation, !0)
                },
                stop: F,
            }
        }
    )
    N(
        h,
        'Core/Renderer/HTML/AST.js',
        [h['Core/Globals.js'], h['Core/Utilities.js']],
        function (d, h) {
            var E = d.SVG_NS,
                F = h.attr,
                t = h.createElement,
                G = h.error,
                H = h.isFunction,
                y = h.isString,
                q = h.objectEach,
                p = h.splat,
                f =
                    (h = d.win.trustedTypes) &&
                    H(h.createPolicy) &&
                    h.createPolicy('highcharts', {
                        createHTML: function (a) {
                            return a
                        },
                    }),
                c = f ? f.createHTML('') : ''
            try {
                var a = !!new DOMParser().parseFromString(c, 'text/html')
            } catch (n) {
                a = !1
            }
            H = (function () {
                function n(a) {
                    this.nodes = 'string' === typeof a ? this.parseMarkup(a) : a
                }
                n.filterUserAttributes = function (a) {
                    q(a, function (c, f) {
                        var m = !0
                        ;-1 === n.allowedAttributes.indexOf(f) && (m = !1)
                        ;-1 !== ['background', 'dynsrc', 'href', 'lowsrc', 'src'].indexOf(f) &&
                            (m =
                                y(c) &&
                                n.allowedReferences.some(function (a) {
                                    return 0 === c.indexOf(a)
                                }))
                        m ||
                            (G("Highcharts warning: Invalid attribute '" + f + "' in config"),
                            delete a[f])
                    })
                    return a
                }
                n.setElementHTML = function (a, c) {
                    a.innerHTML = n.emptyHTML
                    c && new n(c).addToDOM(a)
                }
                n.prototype.addToDOM = function (a) {
                    function c(a, f) {
                        var m
                        p(a).forEach(function (a) {
                            var v = a.tagName,
                                z = a.textContent ? d.doc.createTextNode(a.textContent) : void 0
                            if (v)
                                if ('#text' === v) var u = z
                                else if (-1 !== n.allowedTags.indexOf(v)) {
                                    v = d.doc.createElementNS(
                                        'svg' === v ? E : f.namespaceURI || E,
                                        v
                                    )
                                    var k = a.attributes || {}
                                    q(a, function (a, l) {
                                        'tagName' !== l &&
                                            'attributes' !== l &&
                                            'children' !== l &&
                                            'textContent' !== l &&
                                            (k[l] = a)
                                    })
                                    F(v, n.filterUserAttributes(k))
                                    z && v.appendChild(z)
                                    c(a.children || [], v)
                                    u = v
                                } else G('Highcharts warning: Invalid tagName ' + v + ' in config')
                            u && f.appendChild(u)
                            m = u
                        })
                        return m
                    }
                    return c(this.nodes, a)
                }
                n.prototype.parseMarkup = function (c) {
                    var n = []
                    c = c.trim()
                    if (a) c = new DOMParser().parseFromString(f ? f.createHTML(c) : c, 'text/html')
                    else {
                        var m = t('div')
                        m.innerHTML = c
                        c = { body: m }
                    }
                    var p = function (a, c) {
                        var f = a.nodeName.toLowerCase(),
                            z = { tagName: f }
                        '#text' === f && (z.textContent = a.textContent || '')
                        if ((f = a.attributes)) {
                            var u = {}
                            ;[].forEach.call(f, function (k) {
                                u[k.name] = k.value
                            })
                            z.attributes = u
                        }
                        if (a.childNodes.length) {
                            var k = []
                            ;[].forEach.call(a.childNodes, function (a) {
                                p(a, k)
                            })
                            k.length && (z.children = k)
                        }
                        c.push(z)
                    }
                    ;[].forEach.call(c.body.childNodes, function (a) {
                        return p(a, n)
                    })
                    return n
                }
                n.allowedAttributes =
                    'aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex'.split(
                        ' '
                    )
                n.allowedReferences = 'https:// http:// mailto: / ../ ./ #'.split(' ')
                n.allowedTags =
                    'a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text'.split(
                        ' '
                    )
                n.emptyHTML = c
                return n
            })()
            ;('')
            return H
        }
    )
    N(
        h,
        'Core/FormatUtilities.js',
        [h['Core/DefaultOptions.js'], h['Core/Utilities.js']],
        function (d, h) {
            function E(p, f, c, a) {
                p = +p || 0
                f = +f
                var n = F.lang,
                    m = (p.toString().split('.')[1] || '').split('e')[0].length,
                    D = p.toString().split('e'),
                    C = f
                if (-1 === f) f = Math.min(m, 20)
                else if (!H(f)) f = 2
                else if (f && D[1] && 0 > D[1]) {
                    var I = f + +D[1]
                    0 <= I
                        ? ((D[0] = (+D[0]).toExponential(I).split('e')[0]), (f = I))
                        : ((D[0] = D[0].split('.')[0] || 0),
                          (p = 20 > f ? (D[0] * Math.pow(10, D[1])).toFixed(f) : 0),
                          (D[1] = 0))
                }
                I = (Math.abs(D[1] ? D[0] : p) + Math.pow(10, -Math.max(f, m) - 1)).toFixed(f)
                m = String(q(I))
                var L = 3 < m.length ? m.length % 3 : 0
                c = y(c, n.decimalPoint)
                a = y(a, n.thousandsSep)
                p = (0 > p ? '-' : '') + (L ? m.substr(0, L) + a : '')
                p = 0 > +D[1] && !C ? '0' : p + m.substr(L).replace(/(\d{3})(?=\d)/g, '$1' + a)
                f && (p += c + I.slice(-f))
                D[1] && 0 !== +p && (p += 'e' + D[1])
                return p
            }
            var F = d.defaultOptions,
                t = d.defaultTime,
                G = h.getNestedProperty,
                H = h.isNumber,
                y = h.pick,
                q = h.pInt
            return {
                dateFormat: function (p, f, c) {
                    return t.dateFormat(p, f, c)
                },
                format: function (p, f, c) {
                    var a = '{',
                        n = !1,
                        m = /f$/,
                        D = /\.([0-9])/,
                        C = F.lang,
                        I = (c && c.time) || t
                    c = (c && c.numberFormatter) || E
                    for (var L = []; p; ) {
                        var q = p.indexOf(a)
                        if (-1 === q) break
                        var v = p.slice(0, q)
                        if (n) {
                            v = v.split(':')
                            a = G(v.shift() || '', f)
                            if (v.length && 'number' === typeof a)
                                if (((v = v.join(':')), m.test(v))) {
                                    var z = parseInt((v.match(D) || ['', '-1'])[1], 10)
                                    null !== a &&
                                        (a = c(
                                            a,
                                            z,
                                            C.decimalPoint,
                                            -1 < v.indexOf(',') ? C.thousandsSep : ''
                                        ))
                                } else a = I.dateFormat(v, a)
                            L.push(a)
                        } else L.push(v)
                        p = p.slice(q + 1)
                        a = (n = !n) ? '}' : '{'
                    }
                    L.push(p)
                    return L.join('')
                },
                numberFormat: E,
            }
        }
    )
    N(h, 'Core/Renderer/RendererUtilities.js', [h['Core/Utilities.js']], function (d) {
        var h = d.clamp,
            A = d.pick,
            F = d.stableSort,
            t
        ;(function (d) {
            function t(d, q, p) {
                var f = d,
                    c = f.reducedLen || q,
                    a = function (a, c) {
                        return (c.rank || 0) - (a.rank || 0)
                    },
                    n = function (a, c) {
                        return a.target - c.target
                    },
                    m,
                    D = !0,
                    C = [],
                    I = 0
                for (m = d.length; m--; ) I += d[m].size
                if (I > c) {
                    F(d, a)
                    for (I = m = 0; I <= c; ) (I += d[m].size), m++
                    C = d.splice(m - 1, d.length)
                }
                F(d, n)
                for (
                    d = d.map(function (a) {
                        return { size: a.size, targets: [a.target], align: A(a.align, 0.5) }
                    });
                    D;

                ) {
                    for (m = d.length; m--; )
                        (c = d[m]),
                            (a = (Math.min.apply(0, c.targets) + Math.max.apply(0, c.targets)) / 2),
                            (c.pos = h(a - c.size * c.align, 0, q - c.size))
                    m = d.length
                    for (D = !1; m--; )
                        0 < m &&
                            d[m - 1].pos + d[m - 1].size > d[m].pos &&
                            ((d[m - 1].size += d[m].size),
                            (d[m - 1].targets = d[m - 1].targets.concat(d[m].targets)),
                            (d[m - 1].align = 0.5),
                            d[m - 1].pos + d[m - 1].size > q && (d[m - 1].pos = q - d[m - 1].size),
                            d.splice(m, 1),
                            (D = !0))
                }
                f.push.apply(f, C)
                m = 0
                d.some(function (a) {
                    var c = 0
                    return (a.targets || []).some(function () {
                        f[m].pos = a.pos + c
                        if ('undefined' !== typeof p && Math.abs(f[m].pos - f[m].target) > p)
                            return (
                                f.slice(0, m + 1).forEach(function (a) {
                                    return delete a.pos
                                }),
                                (f.reducedLen = (f.reducedLen || q) - 0.1 * q),
                                f.reducedLen > 0.1 * q && t(f, q, p),
                                !0
                            )
                        c += f[m].size
                        m++
                        return !1
                    })
                })
                F(f, n)
                return f
            }
            d.distribute = t
        })(t || (t = {}))
        return t
    })
    N(
        h,
        'Core/Renderer/SVG/SVGElement.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Renderer/HTML/AST.js'],
            h['Core/Color/Color.js'],
            h['Core/Globals.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t) {
            var E = d.animate,
                H = d.animObject,
                y = d.stop,
                q = F.deg2rad,
                p = F.doc,
                f = F.noop,
                c = F.svg,
                a = F.SVG_NS,
                n = F.win,
                m = t.addEvent,
                D = t.attr,
                C = t.createElement,
                I = t.css,
                L = t.defined,
                K = t.erase,
                v = t.extend,
                z = t.fireEvent,
                u = t.isArray,
                k = t.isFunction,
                w = t.isNumber,
                l = t.isString,
                e = t.merge,
                g = t.objectEach,
                b = t.pick,
                B = t.pInt,
                J = t.syncTimeout,
                r = t.uniqueKey
            d = (function () {
                function x() {
                    this.element = void 0
                    this.onEvents = {}
                    this.opacity = 1
                    this.renderer = void 0
                    this.SVG_NS = a
                    this.symbolCustomAttribs =
                        'x y width height r start end innerR anchorX anchorY rounded'.split(' ')
                }
                x.prototype._defaultGetter = function (e) {
                    e = b(
                        this[e + 'Value'],
                        this[e],
                        this.element ? this.element.getAttribute(e) : null,
                        0
                    )
                    ;/^[\-0-9\.]+$/.test(e) && (e = parseFloat(e))
                    return e
                }
                x.prototype._defaultSetter = function (b, e, g) {
                    g.setAttribute(e, b)
                }
                x.prototype.add = function (b) {
                    var e = this.renderer,
                        g = this.element
                    b && (this.parentGroup = b)
                    this.parentInverted = b && b.inverted
                    'undefined' !== typeof this.textStr &&
                        'text' === this.element.nodeName &&
                        e.buildText(this)
                    this.added = !0
                    if (!b || b.handleZ || this.zIndex) var l = this.zIndexSetter()
                    l || (b ? b.element : e.box).appendChild(g)
                    if (this.onAdd) this.onAdd()
                    return this
                }
                x.prototype.addClass = function (b, e) {
                    var g = e ? '' : this.attr('class') || ''
                    b = (b || '')
                        .split(/ /g)
                        .reduce(
                            function (b, e) {
                                ;-1 === g.indexOf(e) && b.push(e)
                                return b
                            },
                            g ? [g] : []
                        )
                        .join(' ')
                    b !== g && this.attr('class', b)
                    return this
                }
                x.prototype.afterSetters = function () {
                    this.doTransform && (this.updateTransform(), (this.doTransform = !1))
                }
                x.prototype.align = function (e, g, k) {
                    var r = {},
                        P = this.renderer,
                        a = P.alignedObjects,
                        M,
                        c,
                        B
                    if (e) {
                        if (((this.alignOptions = e), (this.alignByTranslate = g), !k || l(k)))
                            (this.alignTo = M = k || 'renderer'),
                                K(a, this),
                                a.push(this),
                                (k = void 0)
                    } else (e = this.alignOptions), (g = this.alignByTranslate), (M = this.alignTo)
                    k = b(k, P[M], 'scrollablePlotBox' === M ? P.plotBox : void 0, P)
                    M = e.align
                    var x = e.verticalAlign
                    P = (k.x || 0) + (e.x || 0)
                    a = (k.y || 0) + (e.y || 0)
                    'right' === M ? (c = 1) : 'center' === M && (c = 2)
                    c && (P += (k.width - (e.width || 0)) / c)
                    r[g ? 'translateX' : 'x'] = Math.round(P)
                    'bottom' === x ? (B = 1) : 'middle' === x && (B = 2)
                    B && (a += (k.height - (e.height || 0)) / B)
                    r[g ? 'translateY' : 'y'] = Math.round(a)
                    this[this.placed ? 'animate' : 'attr'](r)
                    this.placed = !0
                    this.alignAttr = r
                    return this
                }
                x.prototype.alignSetter = function (b) {
                    var e = { left: 'start', center: 'middle', right: 'end' }
                    e[b] && ((this.alignValue = b), this.element.setAttribute('text-anchor', e[b]))
                }
                x.prototype.animate = function (e, k, l) {
                    var r = this,
                        a = H(b(k, this.renderer.globalAnimation, !0))
                    k = a.defer
                    b(p.hidden, p.msHidden, p.webkitHidden, !1) && (a.duration = 0)
                    0 !== a.duration
                        ? (l && (a.complete = l),
                          J(function () {
                              r.element && E(r, e, a)
                          }, k))
                        : (this.attr(e, void 0, l),
                          g(
                              e,
                              function (b, e) {
                                  a.step && a.step.call(this, b, { prop: e, pos: 1, elem: this })
                              },
                              this
                          ))
                    return this
                }
                x.prototype.applyTextOutline = function (b) {
                    var e = this.element
                    ;-1 !== b.indexOf('contrast') &&
                        (b = b.replace(/contrast/g, this.renderer.getContrast(e.style.fill)))
                    var g = b.split(' ')
                    b = g[g.length - 1]
                    if ((g = g[0]) && 'none' !== g && F.svg) {
                        this.fakeTS = !0
                        this.ySetter = this.xSetter
                        g = g.replace(/(^[\d\.]+)(.*?)$/g, function (b, e, g) {
                            return 2 * Number(e) + g
                        })
                        this.removeTextOutline()
                        var k = p.createElementNS(a, 'tspan')
                        D(k, {
                            class: 'highcharts-text-outline',
                            fill: b,
                            stroke: b,
                            'stroke-width': g,
                            'stroke-linejoin': 'round',
                        })
                        ;[].forEach.call(e.childNodes, function (b) {
                            var e = b.cloneNode(!0)
                            e.removeAttribute &&
                                ['fill', 'stroke', 'stroke-width', 'stroke'].forEach(function (b) {
                                    return e.removeAttribute(b)
                                })
                            k.appendChild(e)
                        })
                        var l = p.createElementNS(a, 'tspan')
                        l.textContent = '\u200b'
                        ;['x', 'y'].forEach(function (b) {
                            var g = e.getAttribute(b)
                            g && l.setAttribute(b, g)
                        })
                        k.appendChild(l)
                        e.insertBefore(k, e.firstChild)
                    }
                }
                x.prototype.attr = function (b, e, k, l) {
                    var a = this.element,
                        r = this.symbolCustomAttribs,
                        P,
                        O = this,
                        M,
                        c
                    if ('string' === typeof b && 'undefined' !== typeof e) {
                        var B = b
                        b = {}
                        b[B] = e
                    }
                    'string' === typeof b
                        ? (O = (this[b + 'Getter'] || this._defaultGetter).call(this, b, a))
                        : (g(
                              b,
                              function (e, g) {
                                  M = !1
                                  l || y(this, g)
                                  this.symbolName &&
                                      -1 !== r.indexOf(g) &&
                                      (P || (this.symbolAttr(b), (P = !0)), (M = !0))
                                  !this.rotation ||
                                      ('x' !== g && 'y' !== g) ||
                                      (this.doTransform = !0)
                                  M ||
                                      ((c = this[g + 'Setter'] || this._defaultSetter),
                                      c.call(this, e, g, a),
                                      !this.styledMode &&
                                          this.shadows &&
                                          /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                                              g
                                          ) &&
                                          this.updateShadows(g, e, c))
                              },
                              this
                          ),
                          this.afterSetters())
                    k && k.call(this)
                    return O
                }
                x.prototype.clip = function (b) {
                    return this.attr(
                        'clip-path',
                        b ? 'url(' + this.renderer.url + '#' + b.id + ')' : 'none'
                    )
                }
                x.prototype.crisp = function (b, e) {
                    e = e || b.strokeWidth || 0
                    var g = (Math.round(e) % 2) / 2
                    b.x = Math.floor(b.x || this.x || 0) + g
                    b.y = Math.floor(b.y || this.y || 0) + g
                    b.width = Math.floor((b.width || this.width || 0) - 2 * g)
                    b.height = Math.floor((b.height || this.height || 0) - 2 * g)
                    L(b.strokeWidth) && (b.strokeWidth = e)
                    return b
                }
                x.prototype.complexColor = function (b, k, l) {
                    var a = this.renderer,
                        P,
                        c,
                        B,
                        x,
                        w,
                        M,
                        J,
                        f,
                        n,
                        m,
                        v = [],
                        C
                    z(this.renderer, 'complexColor', { args: arguments }, function () {
                        b.radialGradient
                            ? (c = 'radialGradient')
                            : b.linearGradient && (c = 'linearGradient')
                        if (c) {
                            B = b[c]
                            w = a.gradients
                            M = b.stops
                            n = l.radialReference
                            u(B) &&
                                (b[c] = B =
                                    {
                                        x1: B[0],
                                        y1: B[1],
                                        x2: B[2],
                                        y2: B[3],
                                        gradientUnits: 'userSpaceOnUse',
                                    })
                            'radialGradient' === c &&
                                n &&
                                !L(B.gradientUnits) &&
                                ((x = B),
                                (B = e(B, a.getRadialAttr(n, x), {
                                    gradientUnits: 'userSpaceOnUse',
                                })))
                            g(B, function (b, e) {
                                'id' !== e && v.push(e, b)
                            })
                            g(M, function (b) {
                                v.push(b)
                            })
                            v = v.join(',')
                            if (w[v]) m = w[v].attr('id')
                            else {
                                B.id = m = r()
                                var O = (w[v] = a.createElement(c).attr(B).add(a.defs))
                                O.radAttr = x
                                O.stops = []
                                M.forEach(function (b) {
                                    0 === b[1].indexOf('rgba')
                                        ? ((P = A.parse(b[1])),
                                          (J = P.get('rgb')),
                                          (f = P.get('a')))
                                        : ((J = b[1]), (f = 1))
                                    b = a
                                        .createElement('stop')
                                        .attr({ offset: b[0], 'stop-color': J, 'stop-opacity': f })
                                        .add(O)
                                    O.stops.push(b)
                                })
                            }
                            C = 'url(' + a.url + '#' + m + ')'
                            l.setAttribute(k, C)
                            l.gradient = v
                            b.toString = function () {
                                return C
                            }
                        }
                    })
                }
                x.prototype.css = function (b) {
                    var e = this.styles,
                        k = {},
                        l = this.element,
                        a = ['textOutline', 'textOverflow', 'width'],
                        r = '',
                        x = !e
                    b && b.color && (b.fill = b.color)
                    e &&
                        g(b, function (b, g) {
                            e && e[g] !== b && ((k[g] = b), (x = !0))
                        })
                    if (x) {
                        e && (b = v(e, k))
                        if (b)
                            if (null === b.width || 'auto' === b.width) delete this.textWidth
                            else if ('text' === l.nodeName.toLowerCase() && b.width)
                                var w = (this.textWidth = B(b.width))
                        this.styles = b
                        w && !c && this.renderer.forExport && delete b.width
                        if (l.namespaceURI === this.SVG_NS) {
                            var u = function (b, e) {
                                return '-' + e.toLowerCase()
                            }
                            g(b, function (b, e) {
                                ;-1 === a.indexOf(e) &&
                                    (r += e.replace(/([A-Z])/g, u) + ':' + b + ';')
                            })
                            r && D(l, 'style', r)
                        } else I(l, b)
                        this.added &&
                            ('text' === this.element.nodeName && this.renderer.buildText(this),
                            b && b.textOutline && this.applyTextOutline(b.textOutline))
                    }
                    return this
                }
                x.prototype.dashstyleSetter = function (e) {
                    var g = this['stroke-width']
                    'inherit' === g && (g = 1)
                    if ((e = e && e.toLowerCase())) {
                        var k = e
                            .replace('shortdashdotdot', '3,1,1,1,1,1,')
                            .replace('shortdashdot', '3,1,1,1')
                            .replace('shortdot', '1,1,')
                            .replace('shortdash', '3,1,')
                            .replace('longdash', '8,3,')
                            .replace(/dot/g, '1,3,')
                            .replace('dash', '4,3,')
                            .replace(/,$/, '')
                            .split(',')
                        for (e = k.length; e--; ) k[e] = '' + B(k[e]) * b(g, NaN)
                        e = k.join(',').replace(/NaN/g, 'none')
                        this.element.setAttribute('stroke-dasharray', e)
                    }
                }
                x.prototype.destroy = function () {
                    var b = this,
                        e = b.element || {},
                        k = b.renderer,
                        l = e.ownerSVGElement,
                        a = (k.isSVG && 'SPAN' === e.nodeName && b.parentGroup) || void 0
                    e.onclick = e.onmouseout = e.onmouseover = e.onmousemove = e.point = null
                    y(b)
                    if (b.clipPath && l) {
                        var r = b.clipPath
                        ;[].forEach.call(
                            l.querySelectorAll('[clip-path],[CLIP-PATH]'),
                            function (b) {
                                ;-1 < b.getAttribute('clip-path').indexOf(r.element.id) &&
                                    b.removeAttribute('clip-path')
                            }
                        )
                        b.clipPath = r.destroy()
                    }
                    if (b.stops) {
                        for (l = 0; l < b.stops.length; l++) b.stops[l].destroy()
                        b.stops.length = 0
                        b.stops = void 0
                    }
                    b.safeRemoveChild(e)
                    for (
                        k.styledMode || b.destroyShadows();
                        a && a.div && 0 === a.div.childNodes.length;

                    )
                        (e = a.parentGroup), b.safeRemoveChild(a.div), delete a.div, (a = e)
                    b.alignTo && K(k.alignedObjects, b)
                    g(b, function (e, g) {
                        b[g] && b[g].parentGroup === b && b[g].destroy && b[g].destroy()
                        delete b[g]
                    })
                }
                x.prototype.destroyShadows = function () {
                    ;(this.shadows || []).forEach(function (b) {
                        this.safeRemoveChild(b)
                    }, this)
                    this.shadows = void 0
                }
                x.prototype.destroyTextPath = function (b, e) {
                    var g = b.getElementsByTagName('text')[0]
                    if (g) {
                        if (
                            (g.removeAttribute('dx'),
                            g.removeAttribute('dy'),
                            e.element.setAttribute('id', ''),
                            this.textPathWrapper && g.getElementsByTagName('textPath').length)
                        ) {
                            for (b = this.textPathWrapper.element.childNodes; b.length; )
                                g.appendChild(b[0])
                            g.removeChild(this.textPathWrapper.element)
                        }
                    } else if (b.getAttribute('dx') || b.getAttribute('dy'))
                        b.removeAttribute('dx'), b.removeAttribute('dy')
                    this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
                }
                x.prototype.dSetter = function (b, e, g) {
                    u(b) &&
                        ('string' === typeof b[0] && (b = this.renderer.pathToSegments(b)),
                        (this.pathArray = b),
                        (b = b.reduce(function (b, e, g) {
                            return e && e.join
                                ? (g ? b + ' ' : '') + e.join(' ')
                                : (e || '').toString()
                        }, '')))
                    ;/(NaN| {2}|^$)/.test(b) && (b = 'M 0 0')
                    this[e] !== b && (g.setAttribute(e, b), (this[e] = b))
                }
                x.prototype.fadeOut = function (e) {
                    var g = this
                    g.animate(
                        { opacity: 0 },
                        {
                            duration: b(e, 150),
                            complete: function () {
                                g.attr({ y: -9999 }).hide()
                            },
                        }
                    )
                }
                x.prototype.fillSetter = function (b, e, g) {
                    'string' === typeof b ? g.setAttribute(e, b) : b && this.complexColor(b, e, g)
                }
                x.prototype.getBBox = function (e, g) {
                    var l = this.renderer,
                        a = this.element,
                        r = this.styles,
                        B = this.textStr,
                        c = l.cache,
                        w = l.cacheKeys,
                        u = a.namespaceURI === this.SVG_NS
                    g = b(g, this.rotation, 0)
                    var J = l.styledMode
                            ? a && x.prototype.getStyle.call(a, 'font-size')
                            : r && r.fontSize,
                        z
                    if (L(B)) {
                        var M = B.toString()
                        ;-1 === M.indexOf('<') && (M = M.replace(/[0-9]/g, '0'))
                        M += [
                            '',
                            g,
                            J,
                            this.textWidth,
                            r && r.textOverflow,
                            r && r.fontWeight,
                        ].join()
                    }
                    M && !e && (z = c[M])
                    if (!z) {
                        if (u || l.forExport) {
                            try {
                                var f =
                                    this.fakeTS &&
                                    function (b) {
                                        var e = a.querySelector('.highcharts-text-outline')
                                        e && I(e, { display: b })
                                    }
                                k(f) && f('none')
                                z = a.getBBox
                                    ? v({}, a.getBBox())
                                    : { width: a.offsetWidth, height: a.offsetHeight }
                                k(f) && f('')
                            } catch (U) {
                                ;('')
                            }
                            if (!z || 0 > z.width) z = { width: 0, height: 0 }
                        } else z = this.htmlGetBBox()
                        l.isSVG &&
                            ((e = z.width),
                            (l = z.height),
                            u &&
                                (z.height = l =
                                    { '11px,17': 14, '13px,20': 16 }[
                                        (J || '') + ',' + Math.round(l)
                                    ] || l),
                            g &&
                                ((u = g * q),
                                (z.width = Math.abs(l * Math.sin(u)) + Math.abs(e * Math.cos(u))),
                                (z.height = Math.abs(l * Math.cos(u)) + Math.abs(e * Math.sin(u)))))
                        if (M && ('' === B || 0 < z.height)) {
                            for (; 250 < w.length; ) delete c[w.shift()]
                            c[M] || w.push(M)
                            c[M] = z
                        }
                    }
                    return z
                }
                x.prototype.getStyle = function (b) {
                    return n.getComputedStyle(this.element || this, '').getPropertyValue(b)
                }
                x.prototype.hasClass = function (b) {
                    return -1 !== ('' + this.attr('class')).split(' ').indexOf(b)
                }
                x.prototype.hide = function (b) {
                    b ? this.attr({ y: -9999 }) : this.attr({ visibility: 'hidden' })
                    return this
                }
                x.prototype.htmlGetBBox = function () {
                    return { height: 0, width: 0, x: 0, y: 0 }
                }
                x.prototype.init = function (b, e) {
                    this.element = 'span' === e ? C(e) : p.createElementNS(this.SVG_NS, e)
                    this.renderer = b
                    z(this, 'afterInit')
                }
                x.prototype.invert = function (b) {
                    this.inverted = b
                    this.updateTransform()
                    return this
                }
                x.prototype.on = function (b, e) {
                    var g = this.onEvents
                    if (g[b]) g[b]()
                    g[b] = m(this.element, b, e)
                    return this
                }
                x.prototype.opacitySetter = function (b, e, g) {
                    this.opacity = b = Number(Number(b).toFixed(3))
                    g.setAttribute(e, b)
                }
                x.prototype.removeClass = function (b) {
                    return this.attr(
                        'class',
                        ('' + this.attr('class'))
                            .replace(l(b) ? new RegExp('(^| )' + b + '( |$)') : b, ' ')
                            .replace(/ +/g, ' ')
                            .trim()
                    )
                }
                x.prototype.removeTextOutline = function () {
                    var b = this.element.querySelector('tspan.highcharts-text-outline')
                    b && this.safeRemoveChild(b)
                }
                x.prototype.safeRemoveChild = function (b) {
                    var e = b.parentNode
                    e && e.removeChild(b)
                }
                x.prototype.setRadialReference = function (b) {
                    var e = this.element.gradient && this.renderer.gradients[this.element.gradient]
                    this.element.radialReference = b
                    e && e.radAttr && e.animate(this.renderer.getRadialAttr(b, e.radAttr))
                    return this
                }
                x.prototype.setTextPath = function (b, l) {
                    var k = this.element,
                        a = this.text ? this.text.element : k,
                        B = { textAnchor: 'text-anchor' },
                        c = !1,
                        x = this.textPathWrapper,
                        u = !x
                    l = e(
                        !0,
                        {
                            enabled: !0,
                            attributes: { dy: -5, startOffset: '50%', textAnchor: 'middle' },
                        },
                        l
                    )
                    var Q = h.filterUserAttributes(l.attributes)
                    if (b && l && l.enabled) {
                        x && null === x.element.parentNode
                            ? ((u = !0), (x = x.destroy()))
                            : x && this.removeTextOutline.call(x.parentGroup)
                        this.options && this.options.padding && (Q.dx = -this.options.padding)
                        x ||
                            ((this.textPathWrapper = x = this.renderer.createElement('textPath')),
                            (c = !0))
                        var J = x.element
                        ;(l = b.element.getAttribute('id')) ||
                            b.element.setAttribute('id', (l = r()))
                        if (u)
                            for (
                                a.setAttribute('y', 0),
                                    w(Q.dx) && a.setAttribute('x', -Q.dx),
                                    b = [].slice.call(a.childNodes),
                                    u = 0;
                                u < b.length;
                                u++
                            ) {
                                var z = b[u]
                                ;(z.nodeType !== n.Node.TEXT_NODE && 'tspan' !== z.nodeName) ||
                                    J.appendChild(z)
                            }
                        c && x && x.add({ element: a })
                        J.setAttributeNS(
                            'http://www.w3.org/1999/xlink',
                            'href',
                            this.renderer.url + '#' + l
                        )
                        L(Q.dy) && (J.parentNode.setAttribute('dy', Q.dy), delete Q.dy)
                        L(Q.dx) && (J.parentNode.setAttribute('dx', Q.dx), delete Q.dx)
                        g(Q, function (b, e) {
                            J.setAttribute(B[e] || e, b)
                        })
                        k.removeAttribute('transform')
                        this.removeTextOutline.call(x)
                        this.text &&
                            !this.renderer.styledMode &&
                            this.attr({ fill: 'none', 'stroke-width': 0 })
                        this.applyTextOutline = this.updateTransform = f
                    } else
                        x &&
                            (delete this.updateTransform,
                            delete this.applyTextOutline,
                            this.destroyTextPath(k, b),
                            this.updateTransform(),
                            this.options &&
                                this.options.rotation &&
                                this.applyTextOutline(this.options.style.textOutline))
                    return this
                }
                x.prototype.shadow = function (b, e, l) {
                    var k = [],
                        a = this.element,
                        r = this.oldShadowOptions,
                        P = {
                            color: '#000000',
                            offsetX: this.parentInverted ? -1 : 1,
                            offsetY: this.parentInverted ? -1 : 1,
                            opacity: 0.15,
                            width: 3,
                        },
                        B = !1,
                        c
                    !0 === b ? (c = P) : 'object' === typeof b && (c = v(P, b))
                    c &&
                        (c &&
                            r &&
                            g(c, function (b, e) {
                                b !== r[e] && (B = !0)
                            }),
                        B && this.destroyShadows(),
                        (this.oldShadowOptions = c))
                    if (!c) this.destroyShadows()
                    else if (!this.shadows) {
                        var x = c.opacity / c.width
                        var w = this.parentInverted
                            ? 'translate(' + c.offsetY + ', ' + c.offsetX + ')'
                            : 'translate(' + c.offsetX + ', ' + c.offsetY + ')'
                        for (P = 1; P <= c.width; P++) {
                            var u = a.cloneNode(!1)
                            var J = 2 * c.width + 1 - 2 * P
                            D(u, {
                                stroke: b.color || '#000000',
                                'stroke-opacity': x * P,
                                'stroke-width': J,
                                transform: w,
                                fill: 'none',
                            })
                            u.setAttribute(
                                'class',
                                (u.getAttribute('class') || '') + ' highcharts-shadow'
                            )
                            l &&
                                (D(u, 'height', Math.max(D(u, 'height') - J, 0)), (u.cutHeight = J))
                            e
                                ? e.element.appendChild(u)
                                : a.parentNode && a.parentNode.insertBefore(u, a)
                            k.push(u)
                        }
                        this.shadows = k
                    }
                    return this
                }
                x.prototype.show = function (b) {
                    return this.attr({ visibility: b ? 'inherit' : 'visible' })
                }
                x.prototype.strokeSetter = function (b, e, g) {
                    this[e] = b
                    this.stroke && this['stroke-width']
                        ? (x.prototype.fillSetter.call(this, this.stroke, 'stroke', g),
                          g.setAttribute('stroke-width', this['stroke-width']),
                          (this.hasStroke = !0))
                        : 'stroke-width' === e && 0 === b && this.hasStroke
                        ? (g.removeAttribute('stroke'), (this.hasStroke = !1))
                        : this.renderer.styledMode &&
                          this['stroke-width'] &&
                          (g.setAttribute('stroke-width', this['stroke-width']),
                          (this.hasStroke = !0))
                }
                x.prototype.strokeWidth = function () {
                    if (!this.renderer.styledMode) return this['stroke-width'] || 0
                    var b = this.getStyle('stroke-width'),
                        e = 0
                    if (b.indexOf('px') === b.length - 2) e = B(b)
                    else if ('' !== b) {
                        var g = p.createElementNS(a, 'rect')
                        D(g, { width: b, 'stroke-width': 0 })
                        this.element.parentNode.appendChild(g)
                        e = g.getBBox().width
                        g.parentNode.removeChild(g)
                    }
                    return e
                }
                x.prototype.symbolAttr = function (e) {
                    var g = this
                    'x y r start end width height innerR anchorX anchorY clockwise'
                        .split(' ')
                        .forEach(function (l) {
                            g[l] = b(e[l], g[l])
                        })
                    g.attr({ d: g.renderer.symbols[g.symbolName](g.x, g.y, g.width, g.height, g) })
                }
                x.prototype.textSetter = function (b) {
                    b !== this.textStr &&
                        (delete this.textPxLength,
                        (this.textStr = b),
                        this.added && this.renderer.buildText(this))
                }
                x.prototype.titleSetter = function (e) {
                    var g = this.element,
                        l =
                            g.getElementsByTagName('title')[0] ||
                            p.createElementNS(this.SVG_NS, 'title')
                    g.insertBefore ? g.insertBefore(l, g.firstChild) : g.appendChild(l)
                    l.textContent = String(b(e, ''))
                        .replace(/<[^>]*>/g, '')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                }
                x.prototype.toFront = function () {
                    var b = this.element
                    b.parentNode.appendChild(b)
                    return this
                }
                x.prototype.translate = function (b, e) {
                    return this.attr({ translateX: b, translateY: e })
                }
                x.prototype.updateShadows = function (b, e, g) {
                    var l = this.shadows
                    if (l)
                        for (var k = l.length; k--; )
                            g.call(
                                l[k],
                                'height' === b
                                    ? Math.max(e - (l[k].cutHeight || 0), 0)
                                    : 'd' === b
                                    ? this.d
                                    : e,
                                b,
                                l[k]
                            )
                }
                x.prototype.updateTransform = function () {
                    var e = this.scaleX,
                        g = this.scaleY,
                        l = this.inverted,
                        k = this.rotation,
                        a = this.matrix,
                        r = this.element,
                        c = this.translateX || 0,
                        B = this.translateY || 0
                    l && ((c += this.width), (B += this.height))
                    c = ['translate(' + c + ',' + B + ')']
                    L(a) && c.push('matrix(' + a.join(',') + ')')
                    l
                        ? c.push('rotate(90) scale(-1,1)')
                        : k &&
                          c.push(
                              'rotate(' +
                                  k +
                                  ' ' +
                                  b(this.rotationOriginX, r.getAttribute('x'), 0) +
                                  ' ' +
                                  b(this.rotationOriginY, r.getAttribute('y') || 0) +
                                  ')'
                          )
                    ;(L(e) || L(g)) && c.push('scale(' + b(e, 1) + ' ' + b(g, 1) + ')')
                    c.length && r.setAttribute('transform', c.join(' '))
                }
                x.prototype.visibilitySetter = function (b, e, g) {
                    'inherit' === b ? g.removeAttribute(e) : this[e] !== b && g.setAttribute(e, b)
                    this[e] = b
                }
                x.prototype.xGetter = function (b) {
                    'circle' === this.element.nodeName &&
                        ('x' === b ? (b = 'cx') : 'y' === b && (b = 'cy'))
                    return this._defaultGetter(b)
                }
                x.prototype.zIndexSetter = function (b, e) {
                    var g = this.renderer,
                        l = this.parentGroup,
                        k = (l || g).element || g.box,
                        a = this.element
                    g = k === g.box
                    var r = !1
                    var c = this.added
                    var x
                    L(b)
                        ? (a.setAttribute('data-z-index', b), (b = +b), this[e] === b && (c = !1))
                        : L(this[e]) && a.removeAttribute('data-z-index')
                    this[e] = b
                    if (c) {
                        ;(b = this.zIndex) && l && (l.handleZ = !0)
                        e = k.childNodes
                        for (x = e.length - 1; 0 <= x && !r; x--) {
                            l = e[x]
                            c = l.getAttribute('data-z-index')
                            var u = !L(c)
                            if (l !== a)
                                if (0 > b && u && !g && !x) k.insertBefore(a, e[x]), (r = !0)
                                else if (B(c) <= b || (u && (!L(b) || 0 <= b)))
                                    k.insertBefore(a, e[x + 1] || null), (r = !0)
                        }
                        r || (k.insertBefore(a, e[g ? 3 : 0] || null), (r = !0))
                    }
                    return r
                }
                return x
            })()
            d.prototype['stroke-widthSetter'] = d.prototype.strokeSetter
            d.prototype.yGetter = d.prototype.xGetter
            d.prototype.matrixSetter =
                d.prototype.rotationOriginXSetter =
                d.prototype.rotationOriginYSetter =
                d.prototype.rotationSetter =
                d.prototype.scaleXSetter =
                d.prototype.scaleYSetter =
                d.prototype.translateXSetter =
                d.prototype.translateYSetter =
                d.prototype.verticalAlignSetter =
                    function (b, e) {
                        this[e] = b
                        this.doTransform = !0
                    }
            ;('')
            return d
        }
    )
    N(h, 'Core/Renderer/RendererRegistry.js', [h['Core/Globals.js']], function (d) {
        var h
        ;(function (h) {
            h.rendererTypes = {}
            var E
            h.getRendererType = function (d) {
                void 0 === d && (d = E)
                return h.rendererTypes[d] || h.rendererTypes[E]
            }
            h.registerRendererType = function (t, A, H) {
                h.rendererTypes[t] = A
                if (!E || H) (E = t), (d.Renderer = A)
            }
        })(h || (h = {}))
        return h
    })
    N(
        h,
        'Core/Renderer/SVG/SVGLabel.js',
        [h['Core/Renderer/SVG/SVGElement.js'], h['Core/Utilities.js']],
        function (d, h) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var p = function (f, c) {
                            p =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return p(f, c)
                        }
                        return function (f, c) {
                            function a() {
                                this.constructor = f
                            }
                            p(f, c)
                            f.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((a.prototype = c.prototype), new a())
                        }
                    })(),
                F = h.defined,
                t = h.extend,
                G = h.isNumber,
                H = h.merge,
                y = h.pick,
                q = h.removeEvent
            return (function (p) {
                function f(c, a, n, m, D, C, I, L, d, v) {
                    var z = p.call(this) || this
                    z.paddingLeftSetter = z.paddingSetter
                    z.paddingRightSetter = z.paddingSetter
                    z.init(c, 'g')
                    z.textStr = a
                    z.x = n
                    z.y = m
                    z.anchorX = C
                    z.anchorY = I
                    z.baseline = d
                    z.className = v
                    z.addClass('button' === v ? 'highcharts-no-tooltip' : 'highcharts-label')
                    v && z.addClass('highcharts-' + v)
                    z.text = c.text(void 0, 0, 0, L).attr({ zIndex: 1 })
                    var u
                    'string' === typeof D &&
                        ((u = /^url\((.*?)\)$/.test(D)) || z.renderer.symbols[D]) &&
                        (z.symbolKey = D)
                    z.bBox = f.emptyBBox
                    z.padding = 3
                    z.baselineOffset = 0
                    z.needsBox = c.styledMode || u
                    z.deferredAttr = {}
                    z.alignFactor = 0
                    return z
                }
                E(f, p)
                f.prototype.alignSetter = function (c) {
                    c = { left: 0, center: 0.5, right: 1 }[c]
                    c !== this.alignFactor &&
                        ((this.alignFactor = c),
                        this.bBox && G(this.xSetting) && this.attr({ x: this.xSetting }))
                }
                f.prototype.anchorXSetter = function (c, a) {
                    this.anchorX = c
                    this.boxAttr(a, Math.round(c) - this.getCrispAdjust() - this.xSetting)
                }
                f.prototype.anchorYSetter = function (c, a) {
                    this.anchorY = c
                    this.boxAttr(a, c - this.ySetting)
                }
                f.prototype.boxAttr = function (c, a) {
                    this.box ? this.box.attr(c, a) : (this.deferredAttr[c] = a)
                }
                f.prototype.css = function (c) {
                    if (c) {
                        var a = {}
                        c = H(c)
                        f.textProps.forEach(function (f) {
                            'undefined' !== typeof c[f] && ((a[f] = c[f]), delete c[f])
                        })
                        this.text.css(a)
                        var n = 'width' in a
                        'fontSize' in a || 'fontWeight' in a
                            ? this.updateTextPadding()
                            : n && this.updateBoxSize()
                    }
                    return d.prototype.css.call(this, c)
                }
                f.prototype.destroy = function () {
                    q(this.element, 'mouseenter')
                    q(this.element, 'mouseleave')
                    this.text && this.text.destroy()
                    this.box && (this.box = this.box.destroy())
                    d.prototype.destroy.call(this)
                }
                f.prototype.fillSetter = function (c, a) {
                    c && (this.needsBox = !0)
                    this.fill = c
                    this.boxAttr(a, c)
                }
                f.prototype.getBBox = function () {
                    this.textStr &&
                        0 === this.bBox.width &&
                        0 === this.bBox.height &&
                        this.updateBoxSize()
                    var c = this.padding,
                        a = y(this.paddingLeft, c)
                    return {
                        width: this.width,
                        height: this.height,
                        x: this.bBox.x - a,
                        y: this.bBox.y - c,
                    }
                }
                f.prototype.getCrispAdjust = function () {
                    return this.renderer.styledMode && this.box
                        ? (this.box.strokeWidth() % 2) / 2
                        : ((this['stroke-width'] ? parseInt(this['stroke-width'], 10) : 0) % 2) / 2
                }
                f.prototype.heightSetter = function (c) {
                    this.heightSetting = c
                }
                f.prototype.onAdd = function () {
                    var c = this.textStr
                    this.text.add(this)
                    this.attr({ text: F(c) ? c : '', x: this.x, y: this.y })
                    this.box &&
                        F(this.anchorX) &&
                        this.attr({ anchorX: this.anchorX, anchorY: this.anchorY })
                }
                f.prototype.paddingSetter = function (c, a) {
                    G(c)
                        ? c !== this[a] && ((this[a] = c), this.updateTextPadding())
                        : (this[a] = void 0)
                }
                f.prototype.rSetter = function (c, a) {
                    this.boxAttr(a, c)
                }
                f.prototype.shadow = function (c) {
                    c &&
                        !this.renderer.styledMode &&
                        (this.updateBoxSize(), this.box && this.box.shadow(c))
                    return this
                }
                f.prototype.strokeSetter = function (c, a) {
                    this.stroke = c
                    this.boxAttr(a, c)
                }
                f.prototype['stroke-widthSetter'] = function (c, a) {
                    c && (this.needsBox = !0)
                    this['stroke-width'] = c
                    this.boxAttr(a, c)
                }
                f.prototype['text-alignSetter'] = function (c) {
                    this.textAlign = c
                }
                f.prototype.textSetter = function (c) {
                    'undefined' !== typeof c && this.text.attr({ text: c })
                    this.updateTextPadding()
                }
                f.prototype.updateBoxSize = function () {
                    var c = this.text.element.style,
                        a = {},
                        n = this.padding,
                        m = (this.bBox =
                            (G(this.widthSetting) && G(this.heightSetting) && !this.textAlign) ||
                            !F(this.text.textStr)
                                ? f.emptyBBox
                                : this.text.getBBox())
                    this.width = this.getPaddedWidth()
                    this.height = (this.heightSetting || m.height || 0) + 2 * n
                    c = this.renderer.fontMetrics(c && c.fontSize, this.text)
                    this.baselineOffset =
                        n + Math.min((this.text.firstLineMetrics || c).b, m.height || Infinity)
                    this.heightSetting && (this.baselineOffset += (this.heightSetting - c.h) / 2)
                    this.needsBox &&
                        (this.box ||
                            ((n = this.box =
                                this.symbolKey
                                    ? this.renderer.symbol(this.symbolKey)
                                    : this.renderer.rect()),
                            n.addClass(
                                ('button' === this.className ? '' : 'highcharts-label-box') +
                                    (this.className ? ' highcharts-' + this.className + '-box' : '')
                            ),
                            n.add(this)),
                        (n = this.getCrispAdjust()),
                        (a.x = n),
                        (a.y = (this.baseline ? -this.baselineOffset : 0) + n),
                        (a.width = Math.round(this.width)),
                        (a.height = Math.round(this.height)),
                        this.box.attr(t(a, this.deferredAttr)),
                        (this.deferredAttr = {}))
                }
                f.prototype.updateTextPadding = function () {
                    var c = this.text
                    this.updateBoxSize()
                    var a = this.baseline ? 0 : this.baselineOffset,
                        f = y(this.paddingLeft, this.padding)
                    F(this.widthSetting) &&
                        this.bBox &&
                        ('center' === this.textAlign || 'right' === this.textAlign) &&
                        (f +=
                            { center: 0.5, right: 1 }[this.textAlign] *
                            (this.widthSetting - this.bBox.width))
                    if (f !== c.x || a !== c.y)
                        c.attr('x', f),
                            c.hasBoxWidthChanged && (this.bBox = c.getBBox(!0)),
                            'undefined' !== typeof a && c.attr('y', a)
                    c.x = f
                    c.y = a
                }
                f.prototype.widthSetter = function (c) {
                    this.widthSetting = G(c) ? c : void 0
                }
                f.prototype.getPaddedWidth = function () {
                    var c = this.padding,
                        a = y(this.paddingLeft, c)
                    c = y(this.paddingRight, c)
                    return (this.widthSetting || this.bBox.width || 0) + a + c
                }
                f.prototype.xSetter = function (c) {
                    this.x = c
                    this.alignFactor &&
                        ((c -= this.alignFactor * this.getPaddedWidth()),
                        (this['forceAnimate:x'] = !0))
                    this.xSetting = Math.round(c)
                    this.attr('translateX', this.xSetting)
                }
                f.prototype.ySetter = function (c) {
                    this.ySetting = this.y = Math.round(c)
                    this.attr('translateY', this.ySetting)
                }
                f.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }
                f.textProps =
                    'color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width'.split(
                        ' '
                    )
                return f
            })(d)
        }
    )
    N(h, 'Core/Renderer/SVG/Symbols.js', [h['Core/Utilities.js']], function (d) {
        function h(d, q, p, f, c) {
            var a = []
            if (c) {
                var n = c.start || 0,
                    m = H(c.r, p)
                p = H(c.r, f || p)
                var D = (c.end || 0) - 0.001
                f = c.innerR
                var C = H(c.open, 0.001 > Math.abs((c.end || 0) - n - 2 * Math.PI)),
                    I = Math.cos(n),
                    L = Math.sin(n),
                    h = Math.cos(D),
                    v = Math.sin(D)
                n = H(c.longArc, 0.001 > D - n - Math.PI ? 0 : 1)
                a.push(
                    ['M', d + m * I, q + p * L],
                    ['A', m, p, 0, n, H(c.clockwise, 1), d + m * h, q + p * v]
                )
                t(f) &&
                    a.push(C ? ['M', d + f * h, q + f * v] : ['L', d + f * h, q + f * v], [
                        'A',
                        f,
                        f,
                        0,
                        n,
                        t(c.clockwise) ? 1 - c.clockwise : 0,
                        d + f * I,
                        q + f * L,
                    ])
                C || a.push(['Z'])
            }
            return a
        }
        function A(d, q, p, f, c) {
            return c && c.r
                ? F(d, q, p, f, c)
                : [['M', d, q], ['L', d + p, q], ['L', d + p, q + f], ['L', d, q + f], ['Z']]
        }
        function F(d, q, p, f, c) {
            c = (c && c.r) || 0
            return [
                ['M', d + c, q],
                ['L', d + p - c, q],
                ['C', d + p, q, d + p, q, d + p, q + c],
                ['L', d + p, q + f - c],
                ['C', d + p, q + f, d + p, q + f, d + p - c, q + f],
                ['L', d + c, q + f],
                ['C', d, q + f, d, q + f, d, q + f - c],
                ['L', d, q + c],
                ['C', d, q, d, q, d + c, q],
            ]
        }
        var t = d.defined,
            G = d.isNumber,
            H = d.pick
        return {
            arc: h,
            callout: function (d, q, p, f, c) {
                var a = Math.min((c && c.r) || 0, p, f),
                    n = a + 6,
                    m = c && c.anchorX
                c = (c && c.anchorY) || 0
                var D = F(d, q, p, f, { r: a })
                if (!G(m)) return D
                d + m >= p
                    ? c > q + n && c < q + f - n
                        ? D.splice(
                              3,
                              1,
                              ['L', d + p, c - 6],
                              ['L', d + p + 6, c],
                              ['L', d + p, c + 6],
                              ['L', d + p, q + f - a]
                          )
                        : D.splice(
                              3,
                              1,
                              ['L', d + p, f / 2],
                              ['L', m, c],
                              ['L', d + p, f / 2],
                              ['L', d + p, q + f - a]
                          )
                    : 0 >= d + m
                    ? c > q + n && c < q + f - n
                        ? D.splice(
                              7,
                              1,
                              ['L', d, c + 6],
                              ['L', d - 6, c],
                              ['L', d, c - 6],
                              ['L', d, q + a]
                          )
                        : D.splice(
                              7,
                              1,
                              ['L', d, f / 2],
                              ['L', m, c],
                              ['L', d, f / 2],
                              ['L', d, q + a]
                          )
                    : c && c > f && m > d + n && m < d + p - n
                    ? D.splice(
                          5,
                          1,
                          ['L', m + 6, q + f],
                          ['L', m, q + f + 6],
                          ['L', m - 6, q + f],
                          ['L', d + a, q + f]
                      )
                    : c &&
                      0 > c &&
                      m > d + n &&
                      m < d + p - n &&
                      D.splice(
                          1,
                          1,
                          ['L', m - 6, q],
                          ['L', m, q - 6],
                          ['L', m + 6, q],
                          ['L', p - a, q]
                      )
                return D
            },
            circle: function (d, q, p, f) {
                return h(d + p / 2, q + f / 2, p / 2, f / 2, {
                    start: 0.5 * Math.PI,
                    end: 2.5 * Math.PI,
                    open: !1,
                })
            },
            diamond: function (d, q, p, f) {
                return [
                    ['M', d + p / 2, q],
                    ['L', d + p, q + f / 2],
                    ['L', d + p / 2, q + f],
                    ['L', d, q + f / 2],
                    ['Z'],
                ]
            },
            rect: A,
            roundedRect: F,
            square: A,
            triangle: function (d, q, p, f) {
                return [['M', d + p / 2, q], ['L', d + p, q + f], ['L', d, q + f], ['Z']]
            },
            'triangle-down': function (d, q, p, f) {
                return [['M', d, q], ['L', d + p, q], ['L', d + p / 2, q + f], ['Z']]
            },
        }
    })
    N(
        h,
        'Core/Renderer/SVG/TextBuilder.js',
        [h['Core/Renderer/HTML/AST.js'], h['Core/Globals.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = h.doc,
                t = h.SVG_NS,
                G = h.win,
                H = A.attr,
                y = A.isString,
                q = A.objectEach,
                p = A.pick
            return (function () {
                function f(c) {
                    var a = c.styles
                    this.renderer = c.renderer
                    this.svgElement = c
                    this.width = c.textWidth
                    this.textLineHeight = a && a.lineHeight
                    this.textOutline = a && a.textOutline
                    this.ellipsis = !(!a || 'ellipsis' !== a.textOverflow)
                    this.noWrap = !(!a || 'nowrap' !== a.whiteSpace)
                    this.fontSize = a && a.fontSize
                }
                f.prototype.buildSVG = function () {
                    var c = this.svgElement,
                        a = c.element,
                        f = c.renderer,
                        m = p(c.textStr, '').toString(),
                        D = -1 !== m.indexOf('<'),
                        C = a.childNodes
                    f = this.width && !c.added && f.box
                    var I = /<br.*?>/g,
                        L = [
                            m,
                            this.ellipsis,
                            this.noWrap,
                            this.textLineHeight,
                            this.textOutline,
                            this.fontSize,
                            this.width,
                        ].join()
                    if (L !== c.textCache) {
                        c.textCache = L
                        delete c.actualWidth
                        for (L = C.length; L--; ) a.removeChild(C[L])
                        D ||
                        this.ellipsis ||
                        this.width ||
                        (-1 !== m.indexOf(' ') && (!this.noWrap || I.test(m)))
                            ? '' !== m &&
                              (f && f.appendChild(a),
                              (m = new d(m)),
                              this.modifyTree(m.nodes),
                              m.addToDOM(c.element),
                              this.modifyDOM(),
                              this.ellipsis &&
                                  -1 !== (a.textContent || '').indexOf('\u2026') &&
                                  c.attr(
                                      'title',
                                      this.unescapeEntities(c.textStr || '', ['&lt;', '&gt;'])
                                  ),
                              f && f.removeChild(a))
                            : a.appendChild(E.createTextNode(this.unescapeEntities(m)))
                        y(this.textOutline) &&
                            c.applyTextOutline &&
                            c.applyTextOutline(this.textOutline)
                    }
                }
                f.prototype.modifyDOM = function () {
                    var c = this,
                        a = this.svgElement,
                        f = H(a.element, 'x')
                    a.firstLineMetrics = void 0
                    for (var m; (m = a.element.firstChild); )
                        if (/^[\s\u200B]*$/.test(m.textContent || ' ')) a.element.removeChild(m)
                        else break
                    ;[].forEach.call(
                        a.element.querySelectorAll('tspan.highcharts-br'),
                        function (n, m) {
                            n.nextSibling &&
                                n.previousSibling &&
                                (0 === m &&
                                    1 === n.previousSibling.nodeType &&
                                    (a.firstLineMetrics = a.renderer.fontMetrics(
                                        void 0,
                                        n.previousSibling
                                    )),
                                H(n, { dy: c.getLineHeight(n.nextSibling), x: f }))
                        }
                    )
                    var d = this.width || 0
                    if (d) {
                        var C = function (n, m) {
                                var v = n.textContent || '',
                                    z = v.replace(/([^\^])-/g, '$1- ').split(' '),
                                    u =
                                        !c.noWrap &&
                                        (1 < z.length || 1 < a.element.childNodes.length),
                                    k = c.getLineHeight(m),
                                    w = 0,
                                    l = a.actualWidth
                                if (c.ellipsis)
                                    v &&
                                        c.truncate(
                                            n,
                                            v,
                                            void 0,
                                            0,
                                            Math.max(0, d - parseInt(c.fontSize || 12, 10)),
                                            function (e, g) {
                                                return e.substring(0, g) + '\u2026'
                                            }
                                        )
                                else if (u) {
                                    v = []
                                    for (u = []; m.firstChild && m.firstChild !== n; )
                                        u.push(m.firstChild), m.removeChild(m.firstChild)
                                    for (; z.length; )
                                        z.length &&
                                            !c.noWrap &&
                                            0 < w &&
                                            (v.push(n.textContent || ''),
                                            (n.textContent = z.join(' ').replace(/- /g, '-'))),
                                            c.truncate(
                                                n,
                                                void 0,
                                                z,
                                                0 === w ? l || 0 : 0,
                                                d,
                                                function (e, g) {
                                                    return z
                                                        .slice(0, g)
                                                        .join(' ')
                                                        .replace(/- /g, '-')
                                                }
                                            ),
                                            (l = a.actualWidth),
                                            w++
                                    u.forEach(function (e) {
                                        m.insertBefore(e, n)
                                    })
                                    v.forEach(function (e) {
                                        m.insertBefore(E.createTextNode(e), n)
                                        e = E.createElementNS(t, 'tspan')
                                        e.textContent = '\u200b'
                                        H(e, { dy: k, x: f })
                                        m.insertBefore(e, n)
                                    })
                                }
                            },
                            p = function (c) {
                                ;[].slice.call(c.childNodes).forEach(function (f) {
                                    f.nodeType === G.Node.TEXT_NODE
                                        ? C(f, c)
                                        : (-1 !== f.className.baseVal.indexOf('highcharts-br') &&
                                              (a.actualWidth = 0),
                                          p(f))
                                })
                            }
                        p(a.element)
                    }
                }
                f.prototype.getLineHeight = function (c) {
                    var a
                    c = c.nodeType === G.Node.TEXT_NODE ? c.parentElement : c
                    this.renderer.styledMode ||
                        (a =
                            c && /(px|em)$/.test(c.style.fontSize)
                                ? c.style.fontSize
                                : this.fontSize || this.renderer.style.fontSize || 12)
                    return this.textLineHeight
                        ? parseInt(this.textLineHeight.toString(), 10)
                        : this.renderer.fontMetrics(a, c || this.svgElement.element).h
                }
                f.prototype.modifyTree = function (c) {
                    var a = this,
                        f = function (n, d) {
                            var m = n.attributes
                            m = void 0 === m ? {} : m
                            var p = n.children,
                                D = n.tagName,
                                q = a.renderer.styledMode
                            if ('b' === D || 'strong' === D)
                                q
                                    ? (m['class'] = 'highcharts-strong')
                                    : (m.style = 'font-weight:bold;' + (m.style || ''))
                            else if ('i' === D || 'em' === D)
                                q
                                    ? (m['class'] = 'highcharts-emphasized')
                                    : (m.style = 'font-style:italic;' + (m.style || ''))
                            y(m.style) &&
                                (m.style = m.style.replace(/(;| |^)color([ :])/, '$1fill$2'))
                            'br' === D
                                ? ((m['class'] = 'highcharts-br'),
                                  (n.textContent = '\u200b'),
                                  (d = c[d + 1]) &&
                                      d.textContent &&
                                      (d.textContent = d.textContent.replace(/^ +/gm, '')))
                                : 'a' === D &&
                                  p &&
                                  p.some(function (a) {
                                      return '#text' === a.tagName
                                  }) &&
                                  (n.children = [{ children: p, tagName: 'tspan' }])
                            '#text' !== D && 'a' !== D && (n.tagName = 'tspan')
                            n.attributes = m
                            p &&
                                p
                                    .filter(function (a) {
                                        return '#text' !== a.tagName
                                    })
                                    .forEach(f)
                        }
                    c.forEach(f)
                }
                f.prototype.truncate = function (c, a, f, m, d, p) {
                    var n = this.svgElement,
                        C = n.renderer,
                        D = n.rotation,
                        v = [],
                        z = f ? 1 : 0,
                        u = (a || f || '').length,
                        k = u,
                        w,
                        l = function (e, b) {
                            b = b || e
                            var g = c.parentNode
                            if (g && 'undefined' === typeof v[b])
                                if (g.getSubStringLength)
                                    try {
                                        v[b] = m + g.getSubStringLength(0, f ? b + 1 : b)
                                    } catch (J) {
                                        ;('')
                                    }
                                else
                                    C.getSpanWidth &&
                                        ((c.textContent = p(a || f, e)),
                                        (v[b] = m + C.getSpanWidth(n, c)))
                            return v[b]
                        }
                    n.rotation = 0
                    var e = l(c.textContent.length)
                    if (m + e > d) {
                        for (; z <= u; )
                            (k = Math.ceil((z + u) / 2)),
                                f && (w = p(f, k)),
                                (e = l(k, w && w.length - 1)),
                                z === u ? (z = u + 1) : e > d ? (u = k - 1) : (z = k)
                        0 === u
                            ? (c.textContent = '')
                            : (a && u === a.length - 1) || (c.textContent = w || p(a || f, k))
                    }
                    f && f.splice(0, k)
                    n.actualWidth = e
                    n.rotation = D
                }
                f.prototype.unescapeEntities = function (c, a) {
                    q(this.renderer.escapes, function (f, m) {
                        ;(a && -1 !== a.indexOf(f)) ||
                            (c = c.toString().replace(new RegExp(f, 'g'), m))
                    })
                    return c
                }
                return f
            })()
        }
    )
    N(
        h,
        'Core/Renderer/SVG/SVGRenderer.js',
        [
            h['Core/Renderer/HTML/AST.js'],
            h['Core/Color/Color.js'],
            h['Core/Globals.js'],
            h['Core/Renderer/RendererRegistry.js'],
            h['Core/Renderer/SVG/SVGElement.js'],
            h['Core/Renderer/SVG/SVGLabel.js'],
            h['Core/Renderer/SVG/Symbols.js'],
            h['Core/Renderer/SVG/TextBuilder.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y, q) {
            var p = A.charts,
                f = A.deg2rad,
                c = A.doc,
                a = A.isFirefox,
                n = A.isMS,
                m = A.isWebKit,
                D = A.noop,
                C = A.SVG_NS,
                I = A.symbolSizes,
                L = A.win,
                K = q.addEvent,
                v = q.attr,
                z = q.createElement,
                u = q.css,
                k = q.defined,
                w = q.destroyObjectProperties,
                l = q.extend,
                e = q.isArray,
                g = q.isNumber,
                b = q.isObject,
                B = q.isString,
                J = q.merge,
                r = q.pick,
                x = q.pInt,
                M = q.uniqueKey,
                X
            A = (function () {
                function P(b, e, g, l, k, a, r) {
                    this.width =
                        this.url =
                        this.style =
                        this.isSVG =
                        this.imgCount =
                        this.height =
                        this.gradients =
                        this.globalAnimation =
                        this.defs =
                        this.chartIndex =
                        this.cacheKeys =
                        this.cache =
                        this.boxWrapper =
                        this.box =
                        this.alignedObjects =
                            void 0
                    this.init(b, e, g, l, k, a, r)
                }
                P.prototype.init = function (b, e, g, l, k, r, B) {
                    var x = this.createElement('svg').attr({
                            version: '1.1',
                            class: 'highcharts-root',
                        }),
                        O = x.element
                    B || x.css(this.getStyle(l))
                    b.appendChild(O)
                    v(b, 'dir', 'ltr')
                    ;-1 === b.innerHTML.indexOf('xmlns') && v(O, 'xmlns', this.SVG_NS)
                    this.isSVG = !0
                    this.box = O
                    this.boxWrapper = x
                    this.alignedObjects = []
                    this.url = this.getReferenceURL()
                    this.createElement('desc')
                        .add()
                        .element.appendChild(c.createTextNode('Created with Highcharts 9.3.3'))
                    this.defs = this.createElement('defs').add()
                    this.allowHTML = r
                    this.forExport = k
                    this.styledMode = B
                    this.gradients = {}
                    this.cache = {}
                    this.cacheKeys = []
                    this.imgCount = 0
                    this.setSize(e, g, !1)
                    var P
                    a &&
                        b.getBoundingClientRect &&
                        ((e = function () {
                            u(b, { left: 0, top: 0 })
                            P = b.getBoundingClientRect()
                            u(b, {
                                left: Math.ceil(P.left) - P.left + 'px',
                                top: Math.ceil(P.top) - P.top + 'px',
                            })
                        }),
                        e(),
                        (this.unSubPixelFix = K(L, 'resize', e)))
                }
                P.prototype.definition = function (b) {
                    return new d([b]).addToDOM(this.defs.element)
                }
                P.prototype.getReferenceURL = function () {
                    if ((a || m) && c.getElementsByTagName('base').length) {
                        if (!k(X)) {
                            var b = M()
                            b = new d([
                                {
                                    tagName: 'svg',
                                    attributes: { width: 8, height: 8 },
                                    children: [
                                        {
                                            tagName: 'defs',
                                            children: [
                                                {
                                                    tagName: 'clipPath',
                                                    attributes: { id: b },
                                                    children: [
                                                        {
                                                            tagName: 'rect',
                                                            attributes: { width: 4, height: 4 },
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            tagName: 'rect',
                                            attributes: {
                                                id: 'hitme',
                                                width: 8,
                                                height: 8,
                                                'clip-path': 'url(#' + b + ')',
                                                fill: 'rgba(0,0,0,0.001)',
                                            },
                                        },
                                    ],
                                },
                            ]).addToDOM(c.body)
                            u(b, { position: 'fixed', top: 0, left: 0, zIndex: 9e5 })
                            var e = c.elementFromPoint(6, 6)
                            X = 'hitme' === (e && e.id)
                            c.body.removeChild(b)
                        }
                        if (X)
                            return L.location.href
                                .split('#')[0]
                                .replace(/<[^>]*>/g, '')
                                .replace(/([\('\)])/g, '\\$1')
                                .replace(/ /g, '%20')
                    }
                    return ''
                }
                P.prototype.getStyle = function (b) {
                    return (this.style = l(
                        {
                            fontFamily:
                                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                            fontSize: '12px',
                        },
                        b
                    ))
                }
                P.prototype.setStyle = function (b) {
                    this.boxWrapper.css(this.getStyle(b))
                }
                P.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width
                }
                P.prototype.destroy = function () {
                    var b = this.defs
                    this.box = null
                    this.boxWrapper = this.boxWrapper.destroy()
                    w(this.gradients || {})
                    this.gradients = null
                    b && (this.defs = b.destroy())
                    this.unSubPixelFix && this.unSubPixelFix()
                    return (this.alignedObjects = null)
                }
                P.prototype.createElement = function (b) {
                    var e = new this.Element()
                    e.init(this, b)
                    return e
                }
                P.prototype.getRadialAttr = function (b, e) {
                    return {
                        cx: b[0] - b[2] / 2 + (e.cx || 0) * b[2],
                        cy: b[1] - b[2] / 2 + (e.cy || 0) * b[2],
                        r: (e.r || 0) * b[2],
                    }
                }
                P.prototype.buildText = function (b) {
                    new y(b).buildSVG()
                }
                P.prototype.getContrast = function (b) {
                    b = h.parse(b).rgba
                    b[0] *= 1
                    b[1] *= 1.2
                    b[2] *= 0.5
                    return 459 < b[0] + b[1] + b[2] ? '#000000' : '#FFFFFF'
                }
                P.prototype.button = function (b, e, g, k, a, r, c, B, x, P) {
                    var u = this.label(b, e, g, x, void 0, void 0, P, void 0, 'button'),
                        w = this.styledMode,
                        O = 0,
                        f = a ? J(a) : {}
                    b = (f && f.style) || {}
                    f = d.filterUserAttributes(f)
                    u.attr(J({ padding: 8, r: 2 }, f))
                    if (!w) {
                        f = J(
                            {
                                fill: '#f7f7f7',
                                stroke: '#cccccc',
                                'stroke-width': 1,
                                style: {
                                    color: '#333333',
                                    cursor: 'pointer',
                                    fontWeight: 'normal',
                                },
                            },
                            { style: b },
                            f
                        )
                        var Q = f.style
                        delete f.style
                        r = J(f, { fill: '#e6e6e6' }, d.filterUserAttributes(r || {}))
                        var z = r.style
                        delete r.style
                        c = J(
                            f,
                            { fill: '#e6ebf5', style: { color: '#000000', fontWeight: 'bold' } },
                            d.filterUserAttributes(c || {})
                        )
                        var m = c.style
                        delete c.style
                        B = J(f, { style: { color: '#cccccc' } }, d.filterUserAttributes(B || {}))
                        var W = B.style
                        delete B.style
                    }
                    K(u.element, n ? 'mouseover' : 'mouseenter', function () {
                        3 !== O && u.setState(1)
                    })
                    K(u.element, n ? 'mouseout' : 'mouseleave', function () {
                        3 !== O && u.setState(O)
                    })
                    u.setState = function (b) {
                        1 !== b && (u.state = O = b)
                        u.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass(
                            'highcharts-button-' +
                                ['normal', 'hover', 'pressed', 'disabled'][b || 0]
                        )
                        w || u.attr([f, r, c, B][b || 0]).css([Q, z, m, W][b || 0])
                    }
                    w || u.attr(f).css(l({ cursor: 'default' }, Q))
                    return u
                        .on('touchstart', function (b) {
                            return b.stopPropagation()
                        })
                        .on('click', function (b) {
                            3 !== O && k.call(u, b)
                        })
                }
                P.prototype.crispLine = function (b, e, g) {
                    void 0 === g && (g = 'round')
                    var l = b[0],
                        a = b[1]
                    k(l[1]) && l[1] === a[1] && (l[1] = a[1] = Math[g](l[1]) - (e % 2) / 2)
                    k(l[2]) && l[2] === a[2] && (l[2] = a[2] = Math[g](l[2]) + (e % 2) / 2)
                    return b
                }
                P.prototype.path = function (g) {
                    var k = this.styledMode ? {} : { fill: 'none' }
                    e(g) ? (k.d = g) : b(g) && l(k, g)
                    return this.createElement('path').attr(k)
                }
                P.prototype.circle = function (e, g, l) {
                    e = b(e) ? e : 'undefined' === typeof e ? {} : { x: e, y: g, r: l }
                    g = this.createElement('circle')
                    g.xSetter = g.ySetter = function (b, e, g) {
                        g.setAttribute('c' + e, b)
                    }
                    return g.attr(e)
                }
                P.prototype.arc = function (e, g, l, k, a, r) {
                    b(e)
                        ? ((k = e), (g = k.y), (l = k.r), (e = k.x))
                        : (k = { innerR: k, start: a, end: r })
                    e = this.symbol('arc', e, g, l, l, k)
                    e.r = l
                    return e
                }
                P.prototype.rect = function (e, g, l, k, a, r) {
                    a = b(e) ? e.r : a
                    var c = this.createElement('rect')
                    e = b(e)
                        ? e
                        : 'undefined' === typeof e
                        ? {}
                        : { x: e, y: g, width: Math.max(l, 0), height: Math.max(k, 0) }
                    this.styledMode ||
                        ('undefined' !== typeof r && ((e['stroke-width'] = r), (e = c.crisp(e))),
                        (e.fill = 'none'))
                    a && (e.r = a)
                    c.rSetter = function (b, e, g) {
                        c.r = b
                        v(g, { rx: b, ry: b })
                    }
                    c.rGetter = function () {
                        return c.r || 0
                    }
                    return c.attr(e)
                }
                P.prototype.setSize = function (b, e, g) {
                    this.width = b
                    this.height = e
                    this.boxWrapper.animate(
                        { width: b, height: e },
                        {
                            step: function () {
                                this.attr({
                                    viewBox:
                                        '0 0 ' + this.attr('width') + ' ' + this.attr('height'),
                                })
                            },
                            duration: r(g, !0) ? void 0 : 0,
                        }
                    )
                    this.alignElements()
                }
                P.prototype.g = function (b) {
                    var e = this.createElement('g')
                    return b ? e.attr({ class: 'highcharts-' + b }) : e
                }
                P.prototype.image = function (b, e, l, k, a, r) {
                    var c = { preserveAspectRatio: 'none' },
                        B = function (b, e) {
                            b.setAttributeNS
                                ? b.setAttributeNS('http://www.w3.org/1999/xlink', 'href', e)
                                : b.setAttribute('hc-svg-href', e)
                        }
                    g(e) && (c.x = e)
                    g(l) && (c.y = l)
                    g(k) && (c.width = k)
                    g(a) && (c.height = a)
                    var x = this.createElement('image').attr(c)
                    e = function (e) {
                        B(x.element, b)
                        r.call(x, e)
                    }
                    r
                        ? (B(
                              x.element,
                              'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                          ),
                          (l = new L.Image()),
                          K(l, 'load', e),
                          (l.src = b),
                          l.complete && e({}))
                        : B(x.element, b)
                    return x
                }
                P.prototype.symbol = function (b, e, g, a, B, x) {
                    var P = this,
                        w = /^url\((.*?)\)$/,
                        f = w.test(b),
                        J = !f && (this.symbols[b] ? b : 'circle'),
                        O = J && this.symbols[J],
                        Q
                    if (O) {
                        'number' === typeof e &&
                            (Q = O.call(
                                this.symbols,
                                Math.round(e || 0),
                                Math.round(g || 0),
                                a || 0,
                                B || 0,
                                x
                            ))
                        var n = this.path(Q)
                        P.styledMode || n.attr('fill', 'none')
                        l(n, { symbolName: J || void 0, x: e, y: g, width: a, height: B })
                        x && l(n, x)
                    } else if (f) {
                        var m = b.match(w)[1]
                        var v = (n = this.image(m))
                        v.imgwidth = r(I[m] && I[m].width, x && x.width)
                        v.imgheight = r(I[m] && I[m].height, x && x.height)
                        var d = function (b) {
                            return b.attr({ width: b.width, height: b.height })
                        }
                        ;['width', 'height'].forEach(function (b) {
                            v[b + 'Setter'] = function (b, e) {
                                var g = this['img' + e]
                                this[e] = b
                                k(g) &&
                                    (x &&
                                        'within' === x.backgroundSize &&
                                        this.width &&
                                        this.height &&
                                        (g = Math.round(
                                            g *
                                                Math.min(
                                                    this.width / this.imgwidth,
                                                    this.height / this.imgheight
                                                )
                                        )),
                                    this.element && this.element.setAttribute(e, g),
                                    this.alignByTranslate ||
                                        ((b = ((this[e] || 0) - g) / 2),
                                        this.attr(
                                            'width' === e ? { translateX: b } : { translateY: b }
                                        )))
                            }
                        })
                        k(e) && v.attr({ x: e, y: g })
                        v.isImg = !0
                        k(v.imgwidth) && k(v.imgheight)
                            ? d(v)
                            : (v.attr({ width: 0, height: 0 }),
                              z('img', {
                                  onload: function () {
                                      var b = p[P.chartIndex]
                                      0 === this.width &&
                                          (u(this, { position: 'absolute', top: '-999em' }),
                                          c.body.appendChild(this))
                                      I[m] = { width: this.width, height: this.height }
                                      v.imgwidth = this.width
                                      v.imgheight = this.height
                                      v.element && d(v)
                                      this.parentNode && this.parentNode.removeChild(this)
                                      P.imgCount--
                                      if (!P.imgCount && b && !b.hasLoaded) b.onload()
                                  },
                                  src: m,
                              }),
                              this.imgCount++)
                    }
                    return n
                }
                P.prototype.clipRect = function (b, e, g, l) {
                    var k = M() + '-',
                        a = this.createElement('clipPath').attr({ id: k }).add(this.defs)
                    b = this.rect(b, e, g, l, 0).add(a)
                    b.id = k
                    b.clipPath = a
                    b.count = 0
                    return b
                }
                P.prototype.text = function (b, e, g, l) {
                    var a = {}
                    if (l && (this.allowHTML || !this.forExport)) return this.html(b, e, g)
                    a.x = Math.round(e || 0)
                    g && (a.y = Math.round(g))
                    k(b) && (a.text = b)
                    b = this.createElement('text').attr(a)
                    if (!l || (this.forExport && !this.allowHTML))
                        b.xSetter = function (b, e, g) {
                            for (
                                var l = g.getElementsByTagName('tspan'),
                                    k = g.getAttribute(e),
                                    a = 0,
                                    r;
                                a < l.length;
                                a++
                            )
                                (r = l[a]), r.getAttribute(e) === k && r.setAttribute(e, b)
                            g.setAttribute(e, b)
                        }
                    return b
                }
                P.prototype.fontMetrics = function (b, e) {
                    b =
                        (!this.styledMode && /px/.test(b)) || !L.getComputedStyle
                            ? b ||
                              (e && e.style && e.style.fontSize) ||
                              (this.style && this.style.fontSize)
                            : e && t.prototype.getStyle.call(e, 'font-size')
                    b = /px/.test(b) ? x(b) : 12
                    e = 24 > b ? b + 3 : Math.round(1.2 * b)
                    return { h: e, b: Math.round(0.8 * e), f: b }
                }
                P.prototype.rotCorr = function (b, e, g) {
                    var l = b
                    e && g && (l = Math.max(l * Math.cos(e * f), 4))
                    return { x: (-b / 3) * Math.sin(e * f), y: l }
                }
                P.prototype.pathToSegments = function (b) {
                    for (
                        var e = [],
                            l = [],
                            k = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 },
                            a = 0;
                        a < b.length;
                        a++
                    )
                        B(l[0]) &&
                            g(b[a]) &&
                            l.length === k[l[0].toUpperCase()] &&
                            b.splice(a, 0, l[0].replace('M', 'L').replace('m', 'l')),
                            'string' === typeof b[a] &&
                                (l.length && e.push(l.slice(0)), (l.length = 0)),
                            l.push(b[a])
                    e.push(l.slice(0))
                    return e
                }
                P.prototype.label = function (b, e, g, l, k, a, r, c, x) {
                    return new G(this, b, e, g, l, k, a, r, c, x)
                }
                P.prototype.alignElements = function () {
                    this.alignedObjects.forEach(function (b) {
                        return b.align()
                    })
                }
                return P
            })()
            l(A.prototype, {
                Element: t,
                SVG_NS: C,
                escapes: { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' },
                symbols: H,
                draw: D,
            })
            F.registerRendererType('svg', A, !0)
            ;('')
            return A
        }
    )
    N(
        h,
        'Core/Renderer/HTML/HTMLElement.js',
        [h['Core/Globals.js'], h['Core/Renderer/SVG/SVGElement.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (c, f) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return a(c, f)
                        }
                        return function (c, f) {
                            function n() {
                                this.constructor = c
                            }
                            a(c, f)
                            c.prototype =
                                null === f
                                    ? Object.create(f)
                                    : ((n.prototype = f.prototype), new n())
                        }
                    })(),
                t = d.isFirefox,
                G = d.isMS,
                H = d.isWebKit,
                y = d.win,
                q = A.css,
                p = A.defined,
                f = A.extend,
                c = A.pick,
                a = A.pInt
            return (function (n) {
                function m() {
                    return (null !== n && n.apply(this, arguments)) || this
                }
                E(m, n)
                m.compose = function (a) {
                    if (-1 === m.composedClasses.indexOf(a)) {
                        m.composedClasses.push(a)
                        var c = m.prototype,
                            f = a.prototype
                        f.getSpanCorrection = c.getSpanCorrection
                        f.htmlCss = c.htmlCss
                        f.htmlGetBBox = c.htmlGetBBox
                        f.htmlUpdateTransform = c.htmlUpdateTransform
                        f.setSpanRotation = c.setSpanRotation
                    }
                    return a
                }
                m.prototype.getSpanCorrection = function (a, c, f) {
                    this.xCorr = -a * f
                    this.yCorr = -c
                }
                m.prototype.htmlCss = function (a) {
                    var n = 'SPAN' === this.element.tagName && a && 'width' in a,
                        m = c(n && a.width, void 0)
                    if (n) {
                        delete a.width
                        this.textWidth = m
                        var d = !0
                    }
                    a &&
                        'ellipsis' === a.textOverflow &&
                        ((a.whiteSpace = 'nowrap'), (a.overflow = 'hidden'))
                    this.styles = f(this.styles, a)
                    q(this.element, a)
                    d && this.htmlUpdateTransform()
                    return this
                }
                m.prototype.htmlGetBBox = function () {
                    var a = this.element
                    return {
                        x: a.offsetLeft,
                        y: a.offsetTop,
                        width: a.offsetWidth,
                        height: a.offsetHeight,
                    }
                }
                m.prototype.htmlUpdateTransform = function () {
                    if (this.added) {
                        var c = this.renderer,
                            f = this.element,
                            n = this.translateX || 0,
                            m = this.translateY || 0,
                            d = this.x || 0,
                            v = this.y || 0,
                            z = this.textAlign || 'left',
                            u = { left: 0, center: 0.5, right: 1 }[z],
                            k = this.styles
                        k = k && k.whiteSpace
                        q(f, { marginLeft: n, marginTop: m })
                        !c.styledMode &&
                            this.shadows &&
                            this.shadows.forEach(function (b) {
                                q(b, { marginLeft: n + 1, marginTop: m + 1 })
                            })
                        this.inverted &&
                            [].forEach.call(f.childNodes, function (b) {
                                c.invertChild(b, f)
                            })
                        if ('SPAN' === f.tagName) {
                            var w = this.rotation,
                                l = this.textWidth && a(this.textWidth),
                                e = [w, z, f.innerHTML, this.textWidth, this.textAlign].join(),
                                g = void 0
                            g = !1
                            if (l !== this.oldTextWidth) {
                                if (this.textPxLength) var b = this.textPxLength
                                else
                                    q(f, { width: '', whiteSpace: k || 'nowrap' }),
                                        (b = f.offsetWidth)
                                ;(l > this.oldTextWidth || b > l) &&
                                    (/[ \-]/.test(f.textContent || f.innerText) ||
                                        'ellipsis' === f.style.textOverflow) &&
                                    (q(f, {
                                        width: b > l || w ? l + 'px' : 'auto',
                                        display: 'block',
                                        whiteSpace: k || 'normal',
                                    }),
                                    (this.oldTextWidth = l),
                                    (g = !0))
                            }
                            this.hasBoxWidthChanged = g
                            e !== this.cTT &&
                                ((g = c.fontMetrics(f.style.fontSize, f).b),
                                !p(w) ||
                                    (w === (this.oldRotation || 0) && z === this.oldAlign) ||
                                    this.setSpanRotation(w, u, g),
                                this.getSpanCorrection(
                                    (!p(w) && this.textPxLength) || f.offsetWidth,
                                    g,
                                    u,
                                    w,
                                    z
                                ))
                            q(f, {
                                left: d + (this.xCorr || 0) + 'px',
                                top: v + (this.yCorr || 0) + 'px',
                            })
                            this.cTT = e
                            this.oldRotation = w
                            this.oldAlign = z
                        }
                    } else this.alignOnAdd = !0
                }
                m.prototype.setSpanRotation = function (a, c, f) {
                    var n = {},
                        m =
                            G && !/Edge/.test(y.navigator.userAgent)
                                ? '-ms-transform'
                                : H
                                ? '-webkit-transform'
                                : t
                                ? 'MozTransform'
                                : y.opera
                                ? '-o-transform'
                                : void 0
                    m &&
                        ((n[m] = n.transform = 'rotate(' + a + 'deg)'),
                        (n[m + (t ? 'Origin' : '-origin')] = n.transformOrigin =
                            100 * c + '% ' + f + 'px'),
                        q(this.element, n))
                }
                m.composedClasses = []
                return m
            })(h)
        }
    )
    N(
        h,
        'Core/Renderer/HTML/HTMLRenderer.js',
        [
            h['Core/Renderer/HTML/AST.js'],
            h['Core/Renderer/SVG/SVGElement.js'],
            h['Core/Renderer/SVG/SVGRenderer.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (f, c) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return d(f, c)
                        }
                        return function (f, c) {
                            function a() {
                                this.constructor = f
                            }
                            d(f, c)
                            f.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((a.prototype = c.prototype), new a())
                        }
                    })(),
                E = F.attr,
                H = F.createElement,
                y = F.extend,
                q = F.pick
            return (function (p) {
                function f() {
                    return (null !== p && p.apply(this, arguments)) || this
                }
                t(f, p)
                f.compose = function (c) {
                    ;-1 === f.composedClasses.indexOf(c) &&
                        (f.composedClasses.push(c), (c.prototype.html = f.prototype.html))
                    return c
                }
                f.prototype.html = function (c, a, f) {
                    var n = this.createElement('span'),
                        p = n.element,
                        C = n.renderer,
                        I = C.isSVG,
                        L = function (a, c) {
                            ;['opacity', 'visibility'].forEach(function (f) {
                                a[f + 'Setter'] = function (u, k, w) {
                                    var l = a.div ? a.div.style : c
                                    h.prototype[f + 'Setter'].call(this, u, k, w)
                                    l && (l[k] = u)
                                }
                            })
                            a.addedSetters = !0
                        }
                    n.textSetter = function (a) {
                        a !== this.textStr &&
                            (delete this.bBox,
                            delete this.oldTextWidth,
                            d.setElementHTML(this.element, q(a, '')),
                            (this.textStr = a),
                            (n.doTransform = !0))
                    }
                    I && L(n, n.element.style)
                    n.xSetter =
                        n.ySetter =
                        n.alignSetter =
                        n.rotationSetter =
                            function (a, c) {
                                'align' === c ? (n.alignValue = n.textAlign = a) : (n[c] = a)
                                n.doTransform = !0
                            }
                    n.afterSetters = function () {
                        this.doTransform && (this.htmlUpdateTransform(), (this.doTransform = !1))
                    }
                    n.attr({ text: c, x: Math.round(a), y: Math.round(f) }).css({
                        position: 'absolute',
                    })
                    C.styledMode ||
                        n.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize })
                    p.style.whiteSpace = 'nowrap'
                    n.css = n.htmlCss
                    I &&
                        (n.add = function (a) {
                            var c = C.box.parentNode,
                                f = []
                            if ((this.parentGroup = a)) {
                                var u = a.div
                                if (!u) {
                                    for (; a; ) f.push(a), (a = a.parentGroup)
                                    f.reverse().forEach(function (k) {
                                        function a(b, e) {
                                            k[e] = b
                                            'translateX' === e
                                                ? (g.left = b + 'px')
                                                : (g.top = b + 'px')
                                            k.doTransform = !0
                                        }
                                        var l = E(k.element, 'class'),
                                            e = k.styles || {}
                                        u = k.div =
                                            k.div ||
                                            H(
                                                'div',
                                                l ? { className: l } : void 0,
                                                {
                                                    position: 'absolute',
                                                    left: (k.translateX || 0) + 'px',
                                                    top: (k.translateY || 0) + 'px',
                                                    display: k.display,
                                                    opacity: k.opacity,
                                                    cursor: e.cursor,
                                                    pointerEvents: e.pointerEvents,
                                                    visibility: k.visibility,
                                                },
                                                u || c
                                            )
                                        var g = u.style
                                        y(k, {
                                            classSetter: (function (b) {
                                                return function (e) {
                                                    this.element.setAttribute('class', e)
                                                    b.className = e
                                                }
                                            })(u),
                                            on: function () {
                                                f[0].div &&
                                                    n.on.apply(
                                                        { element: f[0].div, onEvents: k.onEvents },
                                                        arguments
                                                    )
                                                return k
                                            },
                                            translateXSetter: a,
                                            translateYSetter: a,
                                        })
                                        k.addedSetters || L(k)
                                    })
                                }
                            } else u = c
                            u.appendChild(p)
                            n.added = !0
                            n.alignOnAdd && n.htmlUpdateTransform()
                            return n
                        })
                    return n
                }
                f.composedClasses = []
                return f
            })(A)
        }
    )
    N(h, 'Core/Axis/AxisDefaults.js', [], function () {
        var d
        ;(function (d) {
            d.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: { main: '%H:%M:%S.%L', range: !1 },
                    second: { main: '%H:%M:%S', range: !1 },
                    minute: { main: '%H:%M', range: !1 },
                    hour: { main: '%H:%M', range: !1 },
                    day: { main: '%e. %b' },
                    week: { main: '%e. %b' },
                    month: { main: "%b '%y" },
                    year: { main: '%Y' },
                },
                endOnTick: !1,
                gridLineDashStyle: 'Solid',
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: 'justify',
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: { color: '#666666', cursor: 'default', fontSize: '11px' },
                },
                maxPadding: 0.01,
                minorGridLineDashStyle: 'Solid',
                minorTickLength: 2,
                minorTickPosition: 'outside',
                minPadding: 0.01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: 'between',
                tickPosition: 'outside',
                title: {
                    align: 'middle',
                    rotation: 0,
                    useHTML: !1,
                    x: 0,
                    y: 0,
                    style: { color: '#666666' },
                },
                type: 'linear',
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: '#f2f2f2',
                minorGridLineWidth: 1,
                minorTickColor: '#999999',
                lineColor: '#ccd6eb',
                lineWidth: 1,
                gridLineColor: '#e6e6e6',
                gridLineWidth: void 0,
                tickColor: '#ccd6eb',
            }
            d.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: 0.05,
                minPadding: 0.05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: { x: -8 },
                startOnTick: !0,
                title: { rotation: 270, text: 'Values' },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: 'justify',
                    formatter: function () {
                        var d = this.axis.chart.numberFormatter
                        return d(this.total, -1)
                    },
                    style: {
                        color: '#000000',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textOutline: '1px contrast',
                    },
                },
                gridLineWidth: 1,
                lineWidth: 0,
            }
            d.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } }
            d.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } }
            d.defaultBottomAxisOptions = {
                labels: { autoRotation: [-45], x: 0 },
                margin: 15,
                title: { rotation: 0 },
            }
            d.defaultTopAxisOptions = {
                labels: { autoRotation: [-45], x: 0 },
                margin: 15,
                title: { rotation: 0 },
            }
        })(d || (d = {}))
        return d
    })
    N(h, 'Core/Foundation.js', [h['Core/Utilities.js']], function (d) {
        var h = d.addEvent,
            A = d.isFunction,
            F = d.objectEach,
            t = d.removeEvent,
            G
        ;(function (d) {
            d.registerEventOptions = function (d, q) {
                d.eventOptions = d.eventOptions || {}
                F(q.events, function (p, f) {
                    d.eventOptions[f] !== p &&
                        (d.eventOptions[f] &&
                            (t(d, f, d.eventOptions[f]), delete d.eventOptions[f]),
                        A(p) && ((d.eventOptions[f] = p), h(d, f, p)))
                })
            }
        })(G || (G = {}))
        return G
    })
    N(
        h,
        'Core/Axis/Tick.js',
        [h['Core/FormatUtilities.js'], h['Core/Globals.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = h.deg2rad,
                t = A.clamp,
                G = A.correctFloat,
                H = A.defined,
                y = A.destroyObjectProperties,
                q = A.extend,
                p = A.fireEvent,
                f = A.isNumber,
                c = A.merge,
                a = A.objectEach,
                n = A.pick
            h = (function () {
                function m(a, c, f, n, d) {
                    this.isNewLabel = this.isNew = !0
                    this.axis = a
                    this.pos = c
                    this.type = f || ''
                    this.parameters = d || {}
                    this.tickmarkOffset = this.parameters.tickmarkOffset
                    this.options = this.parameters.options
                    p(this, 'init')
                    f || n || this.addLabel()
                }
                m.prototype.addLabel = function () {
                    var a = this,
                        c = a.axis,
                        m = c.options,
                        h = c.chart,
                        K = c.categories,
                        v = c.logarithmic,
                        z = c.names,
                        u = a.pos,
                        k = n(a.options && a.options.labels, m.labels),
                        w = c.tickPositions,
                        l = u === w[0],
                        e = u === w[w.length - 1],
                        g = (!k.step || 1 === k.step) && 1 === c.tickInterval
                    w = w.info
                    var b = a.label,
                        B
                    K = this.parameters.category || (K ? n(K[u], z[u], u) : u)
                    v && f(K) && (K = G(v.lin2log(K)))
                    if (c.dateTime)
                        if (w) {
                            var J = h.time.resolveDTLFormat(
                                m.dateTimeLabelFormats[(!m.grid && w.higherRanks[u]) || w.unitName]
                            )
                            var r = J.main
                        } else
                            f(K) && (r = c.dateTime.getXDateFormat(K, m.dateTimeLabelFormats || {}))
                    a.isFirst = l
                    a.isLast = e
                    var x = {
                        axis: c,
                        chart: h,
                        dateTimeLabelFormat: r,
                        isFirst: l,
                        isLast: e,
                        pos: u,
                        tick: a,
                        tickPositionInfo: w,
                        value: K,
                    }
                    p(this, 'labelFormat', x)
                    var M = function (b) {
                        return k.formatter
                            ? k.formatter.call(b, b)
                            : k.format
                            ? ((b.text = c.defaultLabelFormatter.call(b)), d.format(k.format, b, h))
                            : c.defaultLabelFormatter.call(b, b)
                    }
                    m = M.call(x, x)
                    var X = J && J.list
                    a.shortenLabel = X
                        ? function () {
                              for (B = 0; B < X.length; B++)
                                  if (
                                      (q(x, { dateTimeLabelFormat: X[B] }),
                                      b.attr({ text: M.call(x, x) }),
                                      b.getBBox().width < c.getSlotWidth(a) - 2 * k.padding)
                                  )
                                      return
                              b.attr({ text: '' })
                          }
                        : void 0
                    g && c._addedPlotLB && a.moveLabel(m, k)
                    H(b) || a.movedLabel
                        ? b &&
                          b.textStr !== m &&
                          !g &&
                          (!b.textWidth ||
                              k.style.width ||
                              b.styles.width ||
                              b.css({ width: null }),
                          b.attr({ text: m }),
                          (b.textPxLength = b.getBBox().width))
                        : ((a.label = b = a.createLabel({ x: 0, y: 0 }, m, k)), (a.rotation = 0))
                }
                m.prototype.createLabel = function (a, f, n) {
                    var d = this.axis,
                        m = d.chart
                    if (
                        (a =
                            H(f) && n.enabled
                                ? m.renderer.text(f, a.x, a.y, n.useHTML).add(d.labelGroup)
                                : null)
                    )
                        m.styledMode || a.css(c(n.style)), (a.textPxLength = a.getBBox().width)
                    return a
                }
                m.prototype.destroy = function () {
                    y(this, this.axis)
                }
                m.prototype.getPosition = function (a, c, f, n) {
                    var d = this.axis,
                        m = d.chart,
                        z = (n && m.oldChartHeight) || m.chartHeight
                    a = {
                        x: a
                            ? G(d.translate(c + f, null, null, n) + d.transB)
                            : d.left +
                              d.offset +
                              (d.opposite
                                  ? ((n && m.oldChartWidth) || m.chartWidth) - d.right - d.left
                                  : 0),
                        y: a
                            ? z - d.bottom + d.offset - (d.opposite ? d.height : 0)
                            : G(z - d.translate(c + f, null, null, n) - d.transB),
                    }
                    a.y = t(a.y, -1e5, 1e5)
                    p(this, 'afterGetPosition', { pos: a })
                    return a
                }
                m.prototype.getLabelPosition = function (a, c, f, n, d, m, z, u) {
                    var k = this.axis,
                        w = k.transA,
                        l = k.isLinked && k.linkedParent ? k.linkedParent.reversed : k.reversed,
                        e = k.staggerLines,
                        g = k.tickRotCorr || { x: 0, y: 0 },
                        b =
                            n || k.reserveSpaceDefault
                                ? 0
                                : -k.labelOffset * ('center' === k.labelAlign ? 0.5 : 1),
                        B = {},
                        J = d.y
                    H(J) ||
                        (J =
                            0 === k.side
                                ? f.rotation
                                    ? -8
                                    : -f.getBBox().height
                                : 2 === k.side
                                ? g.y + 8
                                : Math.cos(f.rotation * E) * (g.y - f.getBBox(!1, 0).height / 2))
                    a = a + d.x + b + g.x - (m && n ? m * w * (l ? -1 : 1) : 0)
                    c = c + J - (m && !n ? m * w * (l ? 1 : -1) : 0)
                    e &&
                        ((f = (z / (u || 1)) % e),
                        k.opposite && (f = e - f - 1),
                        (c += (k.labelOffset / e) * f))
                    B.x = a
                    B.y = Math.round(c)
                    p(this, 'afterGetLabelPosition', { pos: B, tickmarkOffset: m, index: z })
                    return B
                }
                m.prototype.getLabelSize = function () {
                    return this.label
                        ? this.label.getBBox()[this.axis.horiz ? 'height' : 'width']
                        : 0
                }
                m.prototype.getMarkPath = function (a, c, f, n, d, m) {
                    return m.crispLine(
                        [
                            ['M', a, c],
                            ['L', a + (d ? 0 : -f), c + (d ? f : 0)],
                        ],
                        n
                    )
                }
                m.prototype.handleOverflow = function (a) {
                    var c = this.axis,
                        f = c.options.labels,
                        d = a.x,
                        m = c.chart.chartWidth,
                        v = c.chart.spacing,
                        z = n(c.labelLeft, Math.min(c.pos, v[3]))
                    v = n(c.labelRight, Math.max(c.isRadial ? 0 : c.pos + c.len, m - v[1]))
                    var u = this.label,
                        k = this.rotation,
                        w = { left: 0, center: 0.5, right: 1 }[c.labelAlign || u.attr('align')],
                        l = u.getBBox().width,
                        e = c.getSlotWidth(this),
                        g = {},
                        b = e,
                        B = 1,
                        J
                    if (k || 'justify' !== f.overflow)
                        0 > k && d - w * l < z
                            ? (J = Math.round(d / Math.cos(k * E) - z))
                            : 0 < k && d + w * l > v && (J = Math.round((m - d) / Math.cos(k * E)))
                    else if (
                        ((m = d + (1 - w) * l),
                        d - w * l < z
                            ? (b = a.x + b * (1 - w) - z)
                            : m > v && ((b = v - a.x + b * w), (B = -1)),
                        (b = Math.min(e, b)),
                        b < e &&
                            'center' === c.labelAlign &&
                            (a.x += B * (e - b - w * (e - Math.min(l, b)))),
                        l > b || (c.autoRotation && (u.styles || {}).width))
                    )
                        J = b
                    J &&
                        (this.shortenLabel
                            ? this.shortenLabel()
                            : ((g.width = Math.floor(J) + 'px'),
                              (f.style || {}).textOverflow || (g.textOverflow = 'ellipsis'),
                              u.css(g)))
                }
                m.prototype.moveLabel = function (c, f) {
                    var n = this,
                        d = n.label,
                        m = n.axis,
                        v = m.reversed,
                        z = !1
                    d && d.textStr === c
                        ? ((n.movedLabel = d), (z = !0), delete n.label)
                        : a(m.ticks, function (a) {
                              z ||
                                  a.isNew ||
                                  a === n ||
                                  !a.label ||
                                  a.label.textStr !== c ||
                                  ((n.movedLabel = a.label),
                                  (z = !0),
                                  (a.labelPos = n.movedLabel.xy),
                                  delete a.label)
                          })
                    if (!z && (n.labelPos || d)) {
                        var u = n.labelPos || d.xy
                        d = m.horiz ? (v ? 0 : m.width + m.left) : u.x
                        m = m.horiz ? u.y : v ? m.width + m.left : 0
                        n.movedLabel = n.createLabel({ x: d, y: m }, c, f)
                        n.movedLabel && n.movedLabel.attr({ opacity: 0 })
                    }
                }
                m.prototype.render = function (a, c, f) {
                    var d = this.axis,
                        m = d.horiz,
                        v = this.pos,
                        z = n(this.tickmarkOffset, d.tickmarkOffset)
                    v = this.getPosition(m, v, z, c)
                    z = v.x
                    var u = v.y
                    d = (m && z === d.pos + d.len) || (!m && u === d.pos) ? -1 : 1
                    m = n(f, this.label && this.label.newOpacity, 1)
                    f = n(f, 1)
                    this.isActive = !0
                    this.renderGridLine(c, f, d)
                    this.renderMark(v, f, d)
                    this.renderLabel(v, c, m, a)
                    this.isNew = !1
                    p(this, 'afterRender')
                }
                m.prototype.renderGridLine = function (a, c, f) {
                    var d = this.axis,
                        m = d.options,
                        v = {},
                        z = this.pos,
                        u = this.type,
                        k = n(this.tickmarkOffset, d.tickmarkOffset),
                        w = d.chart.renderer,
                        l = this.gridLine,
                        e = m.gridLineWidth,
                        g = m.gridLineColor,
                        b = m.gridLineDashStyle
                    'minor' === this.type &&
                        ((e = m.minorGridLineWidth),
                        (g = m.minorGridLineColor),
                        (b = m.minorGridLineDashStyle))
                    l ||
                        (d.chart.styledMode ||
                            ((v.stroke = g), (v['stroke-width'] = e || 0), (v.dashstyle = b)),
                        u || (v.zIndex = 1),
                        a && (c = 0),
                        (this.gridLine = l =
                            w
                                .path()
                                .attr(v)
                                .addClass('highcharts-' + (u ? u + '-' : '') + 'grid-line')
                                .add(d.gridGroup)))
                    if (
                        l &&
                        (f = d.getPlotLinePath({
                            value: z + k,
                            lineWidth: l.strokeWidth() * f,
                            force: 'pass',
                            old: a,
                        }))
                    )
                        l[a || this.isNew ? 'attr' : 'animate']({ d: f, opacity: c })
                }
                m.prototype.renderMark = function (a, c, f) {
                    var d = this.axis,
                        m = d.options,
                        v = d.chart.renderer,
                        z = this.type,
                        u = d.tickSize(z ? z + 'Tick' : 'tick'),
                        k = a.x
                    a = a.y
                    var w = n(
                        m['minor' !== z ? 'tickWidth' : 'minorTickWidth'],
                        !z && d.isXAxis ? 1 : 0
                    )
                    m = m['minor' !== z ? 'tickColor' : 'minorTickColor']
                    var l = this.mark,
                        e = !l
                    u &&
                        (d.opposite && (u[0] = -u[0]),
                        l ||
                            ((this.mark = l =
                                v
                                    .path()
                                    .addClass('highcharts-' + (z ? z + '-' : '') + 'tick')
                                    .add(d.axisGroup)),
                            d.chart.styledMode || l.attr({ stroke: m, 'stroke-width': w })),
                        l[e ? 'attr' : 'animate']({
                            d: this.getMarkPath(k, a, u[0], l.strokeWidth() * f, d.horiz, v),
                            opacity: c,
                        }))
                }
                m.prototype.renderLabel = function (a, c, d, m) {
                    var p = this.axis,
                        v = p.horiz,
                        z = p.options,
                        u = this.label,
                        k = z.labels,
                        w = k.step
                    p = n(this.tickmarkOffset, p.tickmarkOffset)
                    var l = a.x
                    a = a.y
                    var e = !0
                    u &&
                        f(l) &&
                        ((u.xy = a = this.getLabelPosition(l, a, u, v, k, p, m, w)),
                        (this.isFirst && !this.isLast && !z.showFirstLabel) ||
                        (this.isLast && !this.isFirst && !z.showLastLabel)
                            ? (e = !1)
                            : !v || k.step || k.rotation || c || 0 === d || this.handleOverflow(a),
                        w && m % w && (e = !1),
                        e && f(a.y)
                            ? ((a.opacity = d),
                              u[this.isNewLabel ? 'attr' : 'animate'](a),
                              (this.isNewLabel = !1))
                            : (u.attr('y', -9999), (this.isNewLabel = !0)))
                }
                m.prototype.replaceMovedLabel = function () {
                    var a = this.label,
                        c = this.axis,
                        f = c.reversed
                    if (a && !this.isNew) {
                        var n = c.horiz ? (f ? c.left : c.width + c.left) : a.xy.x
                        f = c.horiz ? a.xy.y : f ? c.width + c.top : c.top
                        a.animate({ x: n, y: f, opacity: 0 }, void 0, a.destroy)
                        delete this.label
                    }
                    c.isDirty = !0
                    this.label = this.movedLabel
                    delete this.movedLabel
                }
                return m
            })()
            ;('')
            return h
        }
    )
    N(
        h,
        'Core/Axis/Axis.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Axis/AxisDefaults.js'],
            h['Core/Color/Color.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Foundation.js'],
            h['Core/Globals.js'],
            h['Core/Axis/Tick.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y) {
            var q = d.animObject,
                p = F.defaultOptions,
                f = t.registerEventOptions,
                c = G.deg2rad,
                a = y.arrayMax,
                n = y.arrayMin,
                m = y.clamp,
                D = y.correctFloat,
                C = y.defined,
                I = y.destroyObjectProperties,
                L = y.erase,
                K = y.error,
                v = y.extend,
                z = y.fireEvent,
                u = y.getMagnitude,
                k = y.isArray,
                w = y.isNumber,
                l = y.isString,
                e = y.merge,
                g = y.normalizeTickInterval,
                b = y.objectEach,
                B = y.pick,
                J = y.relativeLength,
                r = y.removeEvent,
                x = y.splat,
                M = y.syncTimeout
            d = (function () {
                function d(b, e) {
                    this.zoomEnabled =
                        this.width =
                        this.visible =
                        this.userOptions =
                        this.translationSlope =
                        this.transB =
                        this.transA =
                        this.top =
                        this.ticks =
                        this.tickRotCorr =
                        this.tickPositions =
                        this.tickmarkOffset =
                        this.tickInterval =
                        this.tickAmount =
                        this.side =
                        this.series =
                        this.right =
                        this.positiveValuesOnly =
                        this.pos =
                        this.pointRangePadding =
                        this.pointRange =
                        this.plotLinesAndBandsGroups =
                        this.plotLinesAndBands =
                        this.paddedTicks =
                        this.overlap =
                        this.options =
                        this.offset =
                        this.names =
                        this.minPixelPadding =
                        this.minorTicks =
                        this.minorTickInterval =
                        this.min =
                        this.maxLabelLength =
                        this.max =
                        this.len =
                        this.left =
                        this.labelFormatter =
                        this.labelEdge =
                        this.isLinked =
                        this.height =
                        this.hasVisibleSeries =
                        this.hasNames =
                        this.eventOptions =
                        this.coll =
                        this.closestPointRange =
                        this.chart =
                        this.categories =
                        this.bottom =
                        this.alternateBands =
                            void 0
                    this.init(b, e)
                }
                d.prototype.init = function (b, e) {
                    var g = e.isX
                    this.chart = b
                    this.horiz = b.inverted && !this.isZAxis ? !g : g
                    this.isXAxis = g
                    this.coll = this.coll || (g ? 'xAxis' : 'yAxis')
                    z(this, 'init', { userOptions: e })
                    this.opposite = B(e.opposite, this.opposite)
                    this.side = B(
                        e.side,
                        this.side,
                        this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
                    )
                    this.setOptions(e)
                    var a = this.options,
                        l = a.labels,
                        k = a.type
                    this.userOptions = e
                    this.minPixelPadding = 0
                    this.reversed = B(a.reversed, this.reversed)
                    this.visible = a.visible
                    this.zoomEnabled = a.zoomEnabled
                    this.hasNames = 'category' === k || !0 === a.categories
                    this.categories = a.categories || this.hasNames
                    this.names || ((this.names = []), (this.names.keys = {}))
                    this.plotLinesAndBandsGroups = {}
                    this.positiveValuesOnly = !!this.logarithmic
                    this.isLinked = C(a.linkedTo)
                    this.ticks = {}
                    this.labelEdge = []
                    this.minorTicks = {}
                    this.plotLinesAndBands = []
                    this.alternateBands = {}
                    this.len = 0
                    this.minRange = this.userMinRange = a.minRange || a.maxZoom
                    this.range = a.range
                    this.offset = a.offset || 0
                    this.min = this.max = null
                    e = B(a.crosshair, x(b.options.tooltip.crosshairs)[g ? 0 : 1])
                    this.crosshair = !0 === e ? {} : e
                    ;-1 === b.axes.indexOf(this) &&
                        (g ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
                        b[this.coll].push(this))
                    this.series = this.series || []
                    b.inverted &&
                        !this.isZAxis &&
                        g &&
                        'undefined' === typeof this.reversed &&
                        (this.reversed = !0)
                    this.labelRotation = w(l.rotation) ? l.rotation : void 0
                    f(this, a)
                    z(this, 'afterInit')
                }
                d.prototype.setOptions = function (b) {
                    this.options = e(
                        h.defaultXAxisOptions,
                        'yAxis' === this.coll && h.defaultYAxisOptions,
                        [
                            h.defaultTopAxisOptions,
                            h.defaultRightAxisOptions,
                            h.defaultBottomAxisOptions,
                            h.defaultLeftAxisOptions,
                        ][this.side],
                        e(p[this.coll], b)
                    )
                    z(this, 'afterSetOptions', { userOptions: b })
                }
                d.prototype.defaultLabelFormatter = function (b) {
                    var e = this.axis
                    b = this.chart.numberFormatter
                    var g = w(this.value) ? this.value : NaN,
                        a = e.chart.time,
                        l = this.dateTimeLabelFormat,
                        k = p.lang,
                        c = k.numericSymbols
                    k = k.numericSymbolMagnitude || 1e3
                    var r = e.logarithmic ? Math.abs(g) : e.tickInterval,
                        f = c && c.length
                    if (e.categories) var x = '' + this.value
                    else if (l) x = a.dateFormat(l, g)
                    else if (f && 1e3 <= r)
                        for (; f-- && 'undefined' === typeof x; )
                            (e = Math.pow(k, f + 1)),
                                r >= e &&
                                    0 === (10 * g) % e &&
                                    null !== c[f] &&
                                    0 !== g &&
                                    (x = b(g / e, -1) + c[f])
                    'undefined' === typeof x &&
                        (x = 1e4 <= Math.abs(g) ? b(g, -1) : b(g, -1, void 0, ''))
                    return x
                }
                d.prototype.getSeriesExtremes = function () {
                    var b = this,
                        e = b.chart,
                        g
                    z(this, 'getSeriesExtremes', null, function () {
                        b.hasVisibleSeries = !1
                        b.dataMin = b.dataMax = b.threshold = null
                        b.softThreshold = !b.isXAxis
                        b.stacking && b.stacking.buildStacks()
                        b.series.forEach(function (a) {
                            if (a.visible || !e.options.chart.ignoreHiddenSeries) {
                                var l = a.options,
                                    k = l.threshold
                                b.hasVisibleSeries = !0
                                b.positiveValuesOnly && 0 >= k && (k = null)
                                if (b.isXAxis) {
                                    if (((l = a.xData), l.length)) {
                                        l = b.logarithmic ? l.filter(b.validatePositiveValue) : l
                                        g = a.getXExtremes(l)
                                        var c = g.min
                                        var r = g.max
                                        w(c) ||
                                            c instanceof Date ||
                                            ((l = l.filter(w)),
                                            (g = a.getXExtremes(l)),
                                            (c = g.min),
                                            (r = g.max))
                                        l.length &&
                                            ((b.dataMin = Math.min(B(b.dataMin, c), c)),
                                            (b.dataMax = Math.max(B(b.dataMax, r), r)))
                                    }
                                } else if (
                                    ((a = a.applyExtremes()),
                                    w(a.dataMin) &&
                                        ((c = a.dataMin),
                                        (b.dataMin = Math.min(B(b.dataMin, c), c))),
                                    w(a.dataMax) &&
                                        ((r = a.dataMax),
                                        (b.dataMax = Math.max(B(b.dataMax, r), r))),
                                    C(k) && (b.threshold = k),
                                    !l.softThreshold || b.positiveValuesOnly)
                                )
                                    b.softThreshold = !1
                            }
                        })
                    })
                    z(this, 'afterGetSeriesExtremes')
                }
                d.prototype.translate = function (b, e, g, a, l, k) {
                    var c = this.linkedParent || this,
                        r = a && c.old ? c.old.min : c.min,
                        f = c.minPixelPadding
                    l =
                        (c.isOrdinal ||
                            (c.brokenAxis && c.brokenAxis.hasBreaks) ||
                            (c.logarithmic && l)) &&
                        c.lin2val
                    var x = 1,
                        B = 0
                    a = a && c.old ? c.old.transA : c.transA
                    a || (a = c.transA)
                    g && ((x *= -1), (B = c.len))
                    c.reversed && ((x *= -1), (B -= x * (c.sector || c.len)))
                    e
                        ? ((b = (b * x + B - f) / a + r), l && (b = c.lin2val(b)))
                        : (l && (b = c.val2lin(b)),
                          (b = w(r) ? x * (b - r) * a + B + x * f + (w(k) ? a * k : 0) : void 0))
                    return b
                }
                d.prototype.toPixels = function (b, e) {
                    return this.translate(b, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
                }
                d.prototype.toValue = function (b, e) {
                    return this.translate(b - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
                }
                d.prototype.getPlotLinePath = function (b) {
                    function e(b, e, g) {
                        if (('pass' !== n && b < e) || b > g) n ? (b = m(b, e, g)) : (h = !0)
                        return b
                    }
                    var g = this,
                        a = g.chart,
                        l = g.left,
                        k = g.top,
                        c = b.old,
                        r = b.value,
                        f = b.lineWidth,
                        x = (c && a.oldChartHeight) || a.chartHeight,
                        u = (c && a.oldChartWidth) || a.chartWidth,
                        d = g.transB,
                        J = b.translatedValue,
                        n = b.force,
                        P,
                        v,
                        p,
                        M,
                        h
                    b = {
                        value: r,
                        lineWidth: f,
                        old: c,
                        force: n,
                        acrossPanes: b.acrossPanes,
                        translatedValue: J,
                    }
                    z(this, 'getPlotLinePath', b, function (b) {
                        J = B(J, g.translate(r, null, null, c))
                        J = m(J, -1e5, 1e5)
                        P = p = Math.round(J + d)
                        v = M = Math.round(x - J - d)
                        w(J)
                            ? g.horiz
                                ? ((v = k), (M = x - g.bottom), (P = p = e(P, l, l + g.width)))
                                : ((P = l), (p = u - g.right), (v = M = e(v, k, k + g.height)))
                            : ((h = !0), (n = !1))
                        b.path =
                            h && !n
                                ? null
                                : a.renderer.crispLine(
                                      [
                                          ['M', P, v],
                                          ['L', p, M],
                                      ],
                                      f || 1
                                  )
                    })
                    return b.path
                }
                d.prototype.getLinearTickPositions = function (b, e, g) {
                    var a = D(Math.floor(e / b) * b)
                    g = D(Math.ceil(g / b) * b)
                    var l = [],
                        k
                    D(a + b) === a && (k = 20)
                    if (this.single) return [e]
                    for (e = a; e <= g; ) {
                        l.push(e)
                        e = D(e + b, k)
                        if (e === c) break
                        var c = e
                    }
                    return l
                }
                d.prototype.getMinorTickInterval = function () {
                    var b = this.options
                    return !0 === b.minorTicks
                        ? B(b.minorTickInterval, 'auto')
                        : !1 === b.minorTicks
                        ? null
                        : b.minorTickInterval
                }
                d.prototype.getMinorTickPositions = function () {
                    var b = this.options,
                        e = this.tickPositions,
                        g = this.minorTickInterval,
                        a = this.pointRangePadding || 0,
                        l = this.min - a
                    a = this.max + a
                    var k = a - l,
                        c = []
                    if (k && k / g < this.len / 3) {
                        var r = this.logarithmic
                        if (r)
                            this.paddedTicks.forEach(function (b, e, a) {
                                e && c.push.apply(c, r.getLogTickPositions(g, a[e - 1], a[e], !0))
                            })
                        else if (this.dateTime && 'auto' === this.getMinorTickInterval())
                            c = c.concat(
                                this.getTimeTicks(
                                    this.dateTime.normalizeTimeTickInterval(g),
                                    l,
                                    a,
                                    b.startOfWeek
                                )
                            )
                        else for (b = l + ((e[0] - l) % g); b <= a && b !== c[0]; b += g) c.push(b)
                    }
                    0 !== c.length && this.trimTicks(c)
                    return c
                }
                d.prototype.adjustForMinRange = function () {
                    var b = this.options,
                        e = this.logarithmic,
                        g = this.min,
                        l = this.max,
                        k = 0,
                        c,
                        r,
                        f,
                        x
                    this.isXAxis &&
                        'undefined' === typeof this.minRange &&
                        !e &&
                        (C(b.min) || C(b.max) || C(b.floor) || C(b.ceiling)
                            ? (this.minRange = null)
                            : (this.series.forEach(function (b) {
                                  f = b.xData
                                  x = b.xIncrement ? 1 : f.length - 1
                                  if (1 < f.length)
                                      for (c = x; 0 < c; c--)
                                          if (((r = f[c] - f[c - 1]), !k || r < k)) k = r
                              }),
                              (this.minRange = Math.min(5 * k, this.dataMax - this.dataMin))))
                    if (l - g < this.minRange) {
                        var u = this.dataMax - this.dataMin >= this.minRange
                        var d = this.minRange
                        var w = (d - l + g) / 2
                        w = [g - w, B(b.min, g - w)]
                        u &&
                            (w[2] = this.logarithmic
                                ? this.logarithmic.log2lin(this.dataMin)
                                : this.dataMin)
                        g = a(w)
                        l = [g + d, B(b.max, g + d)]
                        u && (l[2] = e ? e.log2lin(this.dataMax) : this.dataMax)
                        l = n(l)
                        l - g < d && ((w[0] = l - d), (w[1] = B(b.min, l - d)), (g = a(w)))
                    }
                    this.min = g
                    this.max = l
                }
                d.prototype.getClosest = function () {
                    var b
                    this.categories
                        ? (b = 1)
                        : this.series.forEach(function (e) {
                              var g = e.closestPointRange,
                                  a = e.visible || !e.chart.options.chart.ignoreHiddenSeries
                              !e.noSharedTooltip && C(g) && a && (b = C(b) ? Math.min(b, g) : g)
                          })
                    return b
                }
                d.prototype.nameToX = function (b) {
                    var e = k(this.categories),
                        g = e ? this.categories : this.names,
                        a = b.options.x
                    b.series.requireSorting = !1
                    C(a) ||
                        (a = this.options.uniqueNames
                            ? e
                                ? g.indexOf(b.name)
                                : B(g.keys[b.name], -1)
                            : b.series.autoIncrement())
                    if (-1 === a) {
                        if (!e) var l = g.length
                    } else l = a
                    'undefined' !== typeof l &&
                        ((this.names[l] = b.name), (this.names.keys[b.name] = l))
                    return l
                }
                d.prototype.updateNames = function () {
                    var b = this,
                        e = this.names
                    0 < e.length &&
                        (Object.keys(e.keys).forEach(function (b) {
                            delete e.keys[b]
                        }),
                        (e.length = 0),
                        (this.minRange = this.userMinRange),
                        (this.series || []).forEach(function (e) {
                            e.xIncrement = null
                            if (!e.points || e.isDirtyData)
                                (b.max = Math.max(b.max, e.xData.length - 1)),
                                    e.processData(),
                                    e.generatePoints()
                            e.data.forEach(function (g, a) {
                                if (g && g.options && 'undefined' !== typeof g.name) {
                                    var l = b.nameToX(g)
                                    'undefined' !== typeof l &&
                                        l !== g.x &&
                                        ((g.x = l), (e.xData[a] = l))
                                }
                            })
                        }))
                }
                d.prototype.setAxisTranslation = function () {
                    var b = this,
                        e = b.max - b.min,
                        g = b.linkedParent,
                        a = !!b.categories,
                        k = b.isXAxis,
                        c = b.axisPointRange || 0,
                        r = 0,
                        f = 0,
                        x = b.transA
                    if (k || a || c) {
                        var u = b.getClosest()
                        g
                            ? ((r = g.minPointOffset), (f = g.pointRangePadding))
                            : b.series.forEach(function (e) {
                                  var g = a
                                          ? 1
                                          : k
                                          ? B(e.options.pointRange, u, 0)
                                          : b.axisPointRange || 0,
                                      x = e.options.pointPlacement
                                  c = Math.max(c, g)
                                  if (!b.single || a)
                                      (e = e.is('xrange') ? !k : k),
                                          (r = Math.max(r, e && l(x) ? 0 : g / 2)),
                                          (f = Math.max(f, e && 'on' === x ? 0 : g))
                              })
                        g = b.ordinal && b.ordinal.slope && u ? b.ordinal.slope / u : 1
                        b.minPointOffset = r *= g
                        b.pointRangePadding = f *= g
                        b.pointRange = Math.min(c, b.single && a ? 1 : e)
                        k && (b.closestPointRange = u)
                    }
                    b.translationSlope = b.transA = x = b.staticScale || b.len / (e + f || 1)
                    b.transB = b.horiz ? b.left : b.bottom
                    b.minPixelPadding = x * r
                    z(this, 'afterSetAxisTranslation')
                }
                d.prototype.minFromRange = function () {
                    return this.max - this.range
                }
                d.prototype.setTickInterval = function (b) {
                    var e = this.chart,
                        a = this.logarithmic,
                        l = this.options,
                        k = this.isXAxis,
                        c = this.isLinked,
                        r = l.tickPixelInterval,
                        f = this.categories,
                        x = this.softThreshold,
                        d = l.maxPadding,
                        J = l.minPadding,
                        n = w(l.tickInterval) && 0 <= l.tickInterval ? l.tickInterval : void 0,
                        m = w(this.threshold) ? this.threshold : null
                    this.dateTime || f || c || this.getTickAmount()
                    var P = B(this.userMin, l.min)
                    var v = B(this.userMax, l.max)
                    if (c) {
                        this.linkedParent = e[this.coll][l.linkedTo]
                        var p = this.linkedParent.getExtremes()
                        this.min = B(p.min, p.dataMin)
                        this.max = B(p.max, p.dataMax)
                        l.type !== this.linkedParent.options.type && K(11, 1, e)
                    } else {
                        if (x && C(m))
                            if (this.dataMin >= m) (p = m), (J = 0)
                            else if (this.dataMax <= m) {
                                var M = m
                                d = 0
                            }
                        this.min = B(P, p, this.dataMin)
                        this.max = B(v, M, this.dataMax)
                    }
                    a &&
                        (this.positiveValuesOnly &&
                            !b &&
                            0 >= Math.min(this.min, B(this.dataMin, this.min)) &&
                            K(10, 1, e),
                        (this.min = D(a.log2lin(this.min), 16)),
                        (this.max = D(a.log2lin(this.max), 16)))
                    this.range &&
                        C(this.max) &&
                        ((this.userMin =
                            this.min =
                            P =
                                Math.max(this.dataMin, this.minFromRange())),
                        (this.userMax = v = this.max),
                        (this.range = null))
                    z(this, 'foundExtremes')
                    this.beforePadding && this.beforePadding()
                    this.adjustForMinRange()
                    !(
                        f ||
                        this.axisPointRange ||
                        (this.stacking && this.stacking.usePercentage) ||
                        c
                    ) &&
                        C(this.min) &&
                        C(this.max) &&
                        (e = this.max - this.min) &&
                        (!C(P) && J && (this.min -= e * J), !C(v) && d && (this.max += e * d))
                    w(this.userMin) ||
                        (w(l.softMin) && l.softMin < this.min && (this.min = P = l.softMin),
                        w(l.floor) && (this.min = Math.max(this.min, l.floor)))
                    w(this.userMax) ||
                        (w(l.softMax) && l.softMax > this.max && (this.max = v = l.softMax),
                        w(l.ceiling) && (this.max = Math.min(this.max, l.ceiling)))
                    x &&
                        C(this.dataMin) &&
                        ((m = m || 0),
                        !C(P) && this.min < m && this.dataMin >= m
                            ? (this.min = this.options.minRange
                                  ? Math.min(m, this.max - this.minRange)
                                  : m)
                            : !C(v) &&
                              this.max > m &&
                              this.dataMax <= m &&
                              (this.max = this.options.minRange
                                  ? Math.max(m, this.min + this.minRange)
                                  : m))
                    w(this.min) &&
                        w(this.max) &&
                        !this.chart.polar &&
                        this.min > this.max &&
                        (C(this.options.min)
                            ? (this.max = this.min)
                            : C(this.options.max) && (this.min = this.max))
                    this.tickInterval =
                        this.min === this.max ||
                        'undefined' === typeof this.min ||
                        'undefined' === typeof this.max
                            ? 1
                            : c &&
                              this.linkedParent &&
                              !n &&
                              r === this.linkedParent.options.tickPixelInterval
                            ? (n = this.linkedParent.tickInterval)
                            : B(
                                  n,
                                  this.tickAmount
                                      ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                                      : void 0,
                                  f ? 1 : ((this.max - this.min) * r) / Math.max(this.len, r)
                              )
                    if (k && !b) {
                        var h =
                            this.min !== (this.old && this.old.min) ||
                            this.max !== (this.old && this.old.max)
                        this.series.forEach(function (b) {
                            b.forceCrop = b.forceCropping && b.forceCropping()
                            b.processData(h)
                        })
                        z(this, 'postProcessData', { hasExtemesChanged: h })
                    }
                    this.setAxisTranslation()
                    z(this, 'initialAxisTranslation')
                    this.pointRange &&
                        !n &&
                        (this.tickInterval = Math.max(this.pointRange, this.tickInterval))
                    b = B(
                        l.minTickInterval,
                        this.dateTime &&
                            !this.series.some(function (b) {
                                return b.noSharedTooltip
                            })
                            ? this.closestPointRange
                            : 0
                    )
                    !n && this.tickInterval < b && (this.tickInterval = b)
                    this.dateTime ||
                        this.logarithmic ||
                        n ||
                        (this.tickInterval = g(
                            this.tickInterval,
                            void 0,
                            u(this.tickInterval),
                            B(
                                l.allowDecimals,
                                0.5 > this.tickInterval || void 0 !== this.tickAmount
                            ),
                            !!this.tickAmount
                        ))
                    this.tickAmount || (this.tickInterval = this.unsquish())
                    this.setTickPositions()
                }
                d.prototype.setTickPositions = function () {
                    var b = this.options,
                        e = b.tickPositions,
                        g = this.getMinorTickInterval(),
                        a = this.hasVerticalPanning(),
                        l = 'colorAxis' === this.coll,
                        k = (l || !a) && b.startOnTick
                    a = (l || !a) && b.endOnTick
                    l = b.tickPositioner
                    this.tickmarkOffset =
                        this.categories &&
                        'between' === b.tickmarkPlacement &&
                        1 === this.tickInterval
                            ? 0.5
                            : 0
                    this.minorTickInterval =
                        'auto' === g && this.tickInterval ? this.tickInterval / 5 : g
                    this.single =
                        this.min === this.max &&
                        C(this.min) &&
                        !this.tickAmount &&
                        (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals)
                    this.tickPositions = g = e && e.slice()
                    !g &&
                        ((this.ordinal && this.ordinal.positions) ||
                        !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200))
                            ? (g = this.dateTime
                                  ? this.getTimeTicks(
                                        this.dateTime.normalizeTimeTickInterval(
                                            this.tickInterval,
                                            b.units
                                        ),
                                        this.min,
                                        this.max,
                                        b.startOfWeek,
                                        this.ordinal && this.ordinal.positions,
                                        this.closestPointRange,
                                        !0
                                    )
                                  : this.logarithmic
                                  ? this.logarithmic.getLogTickPositions(
                                        this.tickInterval,
                                        this.min,
                                        this.max
                                    )
                                  : this.getLinearTickPositions(
                                        this.tickInterval,
                                        this.min,
                                        this.max
                                    ))
                            : ((g = [this.min, this.max]), K(19, !1, this.chart)),
                        g.length > this.len &&
                            ((g = [g[0], g.pop()]), g[0] === g[1] && (g.length = 1)),
                        (this.tickPositions = g),
                        l && (l = l.apply(this, [this.min, this.max]))) &&
                        (this.tickPositions = g = l)
                    this.paddedTicks = g.slice(0)
                    this.trimTicks(g, k, a)
                    this.isLinked ||
                        (this.single &&
                            2 > g.length &&
                            !this.categories &&
                            !this.series.some(function (b) {
                                return b.is('heatmap') && 'between' === b.options.pointPlacement
                            }) &&
                            ((this.min -= 0.5), (this.max += 0.5)),
                        e || l || this.adjustTickAmount())
                    z(this, 'afterSetTickPositions')
                }
                d.prototype.trimTicks = function (b, e, g) {
                    var a = b[0],
                        l = b[b.length - 1],
                        k = (!this.isOrdinal && this.minPointOffset) || 0
                    z(this, 'trimTicks')
                    if (!this.isLinked) {
                        if (e && -Infinity !== a) this.min = a
                        else for (; this.min - k > b[0]; ) b.shift()
                        if (g) this.max = l
                        else for (; this.max + k < b[b.length - 1]; ) b.pop()
                        0 === b.length && C(a) && !this.options.tickPositions && b.push((l + a) / 2)
                    }
                }
                d.prototype.alignToOthers = function () {
                    var b = {},
                        e = this.options,
                        g
                    !1 !== this.chart.options.chart.alignTicks &&
                        e.alignTicks &&
                        !1 !== e.startOnTick &&
                        !1 !== e.endOnTick &&
                        !this.logarithmic &&
                        this.chart[this.coll].forEach(function (e) {
                            var a = e.options
                            a = [e.horiz ? a.left : a.top, a.width, a.height, a.pane].join()
                            e.series.length && (b[a] ? (g = !0) : (b[a] = 1))
                        })
                    return g
                }
                d.prototype.getTickAmount = function () {
                    var b = this.options,
                        e = b.tickPixelInterval,
                        g = b.tickAmount
                    !C(b.tickInterval) &&
                        !g &&
                        this.len < e &&
                        !this.isRadial &&
                        !this.logarithmic &&
                        b.startOnTick &&
                        b.endOnTick &&
                        (g = 2)
                    !g && this.alignToOthers() && (g = Math.ceil(this.len / e) + 1)
                    4 > g && ((this.finalTickAmt = g), (g = 5))
                    this.tickAmount = g
                }
                d.prototype.adjustTickAmount = function () {
                    var b = this.options,
                        e = this.tickInterval,
                        g = this.tickPositions,
                        a = this.tickAmount,
                        l = this.finalTickAmt,
                        k = g && g.length,
                        c = B(this.threshold, this.softThreshold ? 0 : null)
                    if (this.hasData() && w(this.min) && w(this.max)) {
                        if (k < a) {
                            for (; g.length < a; )
                                g.length % 2 || this.min === c
                                    ? g.push(D(g[g.length - 1] + e))
                                    : g.unshift(D(g[0] - e))
                            this.transA *= (k - 1) / (a - 1)
                            this.min = b.startOnTick ? g[0] : Math.min(this.min, g[0])
                            this.max = b.endOnTick
                                ? g[g.length - 1]
                                : Math.max(this.max, g[g.length - 1])
                        } else k > a && ((this.tickInterval *= 2), this.setTickPositions())
                        if (C(l)) {
                            for (e = b = g.length; e--; )
                                ((3 === l && 1 === e % 2) || (2 >= l && 0 < e && e < b - 1)) &&
                                    g.splice(e, 1)
                            this.finalTickAmt = void 0
                        }
                    }
                }
                d.prototype.setScale = function () {
                    var b = !1,
                        e = !1
                    this.series.forEach(function (g) {
                        b = b || g.isDirtyData || g.isDirty
                        e = e || (g.xAxis && g.xAxis.isDirty) || !1
                    })
                    this.setAxisSize()
                    var g = this.len !== (this.old && this.old.len)
                    g ||
                    b ||
                    e ||
                    this.isLinked ||
                    this.forceRedraw ||
                    this.userMin !== (this.old && this.old.userMin) ||
                    this.userMax !== (this.old && this.old.userMax) ||
                    this.alignToOthers()
                        ? (this.stacking && this.stacking.resetStacks(),
                          (this.forceRedraw = !1),
                          this.getSeriesExtremes(),
                          this.setTickInterval(),
                          this.isDirty ||
                              (this.isDirty =
                                  g ||
                                  this.min !== (this.old && this.old.min) ||
                                  this.max !== (this.old && this.old.max)))
                        : this.stacking && this.stacking.cleanStacks()
                    b && this.panningState && (this.panningState.isDirty = !0)
                    z(this, 'afterSetScale')
                }
                d.prototype.setExtremes = function (b, e, g, a, l) {
                    var k = this,
                        c = k.chart
                    g = B(g, !0)
                    k.series.forEach(function (b) {
                        delete b.kdTree
                    })
                    l = v(l, { min: b, max: e })
                    z(k, 'setExtremes', l, function () {
                        k.userMin = b
                        k.userMax = e
                        k.eventArgs = l
                        g && c.redraw(a)
                    })
                }
                d.prototype.zoom = function (b, e) {
                    var g = this,
                        a = this.dataMin,
                        l = this.dataMax,
                        k = this.options,
                        c = Math.min(a, B(k.min, a)),
                        r = Math.max(l, B(k.max, l))
                    b = { newMin: b, newMax: e }
                    z(this, 'zoom', b, function (b) {
                        var e = b.newMin,
                            k = b.newMax
                        if (e !== g.min || k !== g.max)
                            g.allowZoomOutside ||
                                (C(a) && (e < c && (e = c), e > r && (e = r)),
                                C(l) && (k < c && (k = c), k > r && (k = r))),
                                (g.displayBtn =
                                    'undefined' !== typeof e || 'undefined' !== typeof k),
                                g.setExtremes(e, k, !1, void 0, { trigger: 'zoom' })
                        b.zoomed = !0
                    })
                    return b.zoomed
                }
                d.prototype.setAxisSize = function () {
                    var b = this.chart,
                        e = this.options,
                        g = e.offsets || [0, 0, 0, 0],
                        a = this.horiz,
                        l = (this.width = Math.round(
                            J(B(e.width, b.plotWidth - g[3] + g[1]), b.plotWidth)
                        )),
                        k = (this.height = Math.round(
                            J(B(e.height, b.plotHeight - g[0] + g[2]), b.plotHeight)
                        )),
                        c = (this.top = Math.round(
                            J(B(e.top, b.plotTop + g[0]), b.plotHeight, b.plotTop)
                        ))
                    e = this.left = Math.round(
                        J(B(e.left, b.plotLeft + g[3]), b.plotWidth, b.plotLeft)
                    )
                    this.bottom = b.chartHeight - k - c
                    this.right = b.chartWidth - l - e
                    this.len = Math.max(a ? l : k, 0)
                    this.pos = a ? e : c
                }
                d.prototype.getExtremes = function () {
                    var b = this.logarithmic
                    return {
                        min: b ? D(b.lin2log(this.min)) : this.min,
                        max: b ? D(b.lin2log(this.max)) : this.max,
                        dataMin: this.dataMin,
                        dataMax: this.dataMax,
                        userMin: this.userMin,
                        userMax: this.userMax,
                    }
                }
                d.prototype.getThreshold = function (b) {
                    var e = this.logarithmic,
                        g = e ? e.lin2log(this.min) : this.min
                    e = e ? e.lin2log(this.max) : this.max
                    null === b || -Infinity === b
                        ? (b = g)
                        : Infinity === b
                        ? (b = e)
                        : g > b
                        ? (b = g)
                        : e < b && (b = e)
                    return this.translate(b, 0, 1, 0, 1)
                }
                d.prototype.autoLabelAlign = function (b) {
                    var e = (B(b, 0) - 90 * this.side + 720) % 360
                    b = { align: 'center' }
                    z(this, 'autoLabelAlign', b, function (b) {
                        15 < e && 165 > e
                            ? (b.align = 'right')
                            : 195 < e && 345 > e && (b.align = 'left')
                    })
                    return b.align
                }
                d.prototype.tickSize = function (b) {
                    var e = this.options,
                        g = B(
                            e['tick' === b ? 'tickWidth' : 'minorTickWidth'],
                            'tick' === b && this.isXAxis && !this.categories ? 1 : 0
                        ),
                        a = e['tick' === b ? 'tickLength' : 'minorTickLength']
                    if (g && a) {
                        'inside' === e[b + 'Position'] && (a = -a)
                        var l = [a, g]
                    }
                    b = { tickSize: l }
                    z(this, 'afterTickSize', b)
                    return b.tickSize
                }
                d.prototype.labelMetrics = function () {
                    var b = (this.tickPositions && this.tickPositions[0]) || 0
                    return this.chart.renderer.fontMetrics(
                        this.options.labels.style.fontSize,
                        this.ticks[b] && this.ticks[b].label
                    )
                }
                d.prototype.unsquish = function () {
                    var b = this.options.labels,
                        e = this.horiz,
                        g = this.tickInterval,
                        a = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / g),
                        l = b.rotation,
                        k = this.labelMetrics(),
                        r = Math.max(this.max - this.min, 0),
                        f = function (b) {
                            var e = b / (a || 1)
                            e = 1 < e ? Math.ceil(e) : 1
                            e * g > r &&
                                Infinity !== b &&
                                Infinity !== a &&
                                r &&
                                (e = Math.ceil(r / g))
                            return D(e * g)
                        },
                        x = g,
                        u,
                        d,
                        J = Number.MAX_VALUE
                    if (e) {
                        if (!b.staggerLines && !b.step)
                            if (w(l)) var n = [l]
                            else a < b.autoRotationLimit && (n = b.autoRotation)
                        n &&
                            n.forEach(function (b) {
                                if (b === l || (b && -90 <= b && 90 >= b)) {
                                    d = f(Math.abs(k.h / Math.sin(c * b)))
                                    var e = d + Math.abs(b / 360)
                                    e < J && ((J = e), (u = b), (x = d))
                                }
                            })
                    } else b.step || (x = f(k.h))
                    this.autoRotation = n
                    this.labelRotation = B(u, w(l) ? l : 0)
                    return x
                }
                d.prototype.getSlotWidth = function (b) {
                    var e = this.chart,
                        g = this.horiz,
                        a = this.options.labels,
                        l = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                        k = e.margin[3]
                    if (b && w(b.slotWidth)) return b.slotWidth
                    if (g && 2 > a.step)
                        return a.rotation ? 0 : ((this.staggerLines || 1) * this.len) / l
                    if (!g) {
                        b = a.style.width
                        if (void 0 !== b) return parseInt(String(b), 10)
                        if (k) return k - e.spacing[3]
                    }
                    return 0.33 * e.chartWidth
                }
                d.prototype.renderUnsquish = function () {
                    var b = this.chart,
                        e = b.renderer,
                        g = this.tickPositions,
                        a = this.ticks,
                        k = this.options.labels,
                        c = k.style,
                        r = this.horiz,
                        f = this.getSlotWidth(),
                        x = Math.max(1, Math.round(f - 2 * k.padding)),
                        B = {},
                        u = this.labelMetrics(),
                        d = c.textOverflow,
                        w = 0
                    l(k.rotation) || (B.rotation = k.rotation || 0)
                    g.forEach(function (b) {
                        b = a[b]
                        b.movedLabel && b.replaceMovedLabel()
                        b && b.label && b.label.textPxLength > w && (w = b.label.textPxLength)
                    })
                    this.maxLabelLength = w
                    if (this.autoRotation)
                        w > x && w > u.h
                            ? (B.rotation = this.labelRotation)
                            : (this.labelRotation = 0)
                    else if (f) {
                        var J = x
                        if (!d) {
                            var n = 'clip'
                            for (x = g.length; !r && x--; ) {
                                var m = g[x]
                                if ((m = a[m].label))
                                    m.styles && 'ellipsis' === m.styles.textOverflow
                                        ? m.css({ textOverflow: 'clip' })
                                        : m.textPxLength > f && m.css({ width: f + 'px' }),
                                        m.getBBox().height > this.len / g.length - (u.h - u.f) &&
                                            (m.specificTextOverflow = 'ellipsis')
                            }
                        }
                    }
                    B.rotation &&
                        ((J = w > 0.5 * b.chartHeight ? 0.33 * b.chartHeight : w),
                        d || (n = 'ellipsis'))
                    if ((this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation)))
                        B.align = this.labelAlign
                    g.forEach(function (b) {
                        var e = (b = a[b]) && b.label,
                            g = c.width,
                            l = {}
                        e &&
                            (e.attr(B),
                            b.shortenLabel
                                ? b.shortenLabel()
                                : J &&
                                  !g &&
                                  'nowrap' !== c.whiteSpace &&
                                  (J < e.textPxLength || 'SPAN' === e.element.tagName)
                                ? ((l.width = J + 'px'),
                                  d || (l.textOverflow = e.specificTextOverflow || n),
                                  e.css(l))
                                : e.styles &&
                                  e.styles.width &&
                                  !l.width &&
                                  !g &&
                                  e.css({ width: null }),
                            delete e.specificTextOverflow,
                            (b.rotation = B.rotation))
                    }, this)
                    this.tickRotCorr = e.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
                }
                d.prototype.hasData = function () {
                    return (
                        this.series.some(function (b) {
                            return b.hasData()
                        }) ||
                        (this.options.showEmpty && C(this.min) && C(this.max))
                    )
                }
                d.prototype.addTitle = function (b) {
                    var g = this.chart.renderer,
                        a = this.horiz,
                        l = this.opposite,
                        k = this.options.title,
                        c = this.chart.styledMode,
                        r
                    this.axisTitle ||
                        ((r = k.textAlign) ||
                            (r = (
                                a
                                    ? { low: 'left', middle: 'center', high: 'right' }
                                    : {
                                          low: l ? 'right' : 'left',
                                          middle: 'center',
                                          high: l ? 'left' : 'right',
                                      }
                            )[k.align]),
                        (this.axisTitle = g
                            .text(k.text || '', 0, 0, k.useHTML)
                            .attr({ zIndex: 7, rotation: k.rotation, align: r })
                            .addClass('highcharts-axis-title')),
                        c || this.axisTitle.css(e(k.style)),
                        this.axisTitle.add(this.axisGroup),
                        (this.axisTitle.isNew = !0))
                    c ||
                        k.style.width ||
                        this.isRadial ||
                        this.axisTitle.css({ width: this.len + 'px' })
                    this.axisTitle[b ? 'show' : 'hide'](b)
                }
                d.prototype.generateTick = function (b) {
                    var e = this.ticks
                    e[b] ? e[b].addLabel() : (e[b] = new H(this, b))
                }
                d.prototype.getOffset = function () {
                    var e = this,
                        g = this,
                        a = g.chart,
                        l = g.horiz,
                        k = g.options,
                        c = g.side,
                        r = g.ticks,
                        f = g.tickPositions,
                        x = g.coll,
                        u = g.axisParent,
                        d = a.renderer,
                        w = a.inverted && !g.isZAxis ? [1, 0, 3, 2][c] : c,
                        J = g.hasData(),
                        n = k.title,
                        m = k.labels,
                        v = a.axisOffset
                    a = a.clipOffset
                    var p = [-1, 1, 1, -1][c],
                        M = k.className,
                        h,
                        q = 0,
                        I = 0,
                        D = 0
                    g.showAxis = h = J || k.showEmpty
                    g.staggerLines = (g.horiz && m.staggerLines) || void 0
                    if (!g.axisGroup) {
                        var L = function (b, g, a) {
                            return d
                                .g(b)
                                .attr({ zIndex: a })
                                .addClass(
                                    'highcharts-' +
                                        x.toLowerCase() +
                                        g +
                                        ' ' +
                                        (e.isRadial ? 'highcharts-radial-axis' + g + ' ' : '') +
                                        (M || '')
                                )
                                .add(u)
                        }
                        g.gridGroup = L('grid', '-grid', k.gridZIndex)
                        g.axisGroup = L('axis', '', k.zIndex)
                        g.labelGroup = L('axis-labels', '-labels', m.zIndex)
                    }
                    J || g.isLinked
                        ? (f.forEach(function (b) {
                              g.generateTick(b)
                          }),
                          g.renderUnsquish(),
                          (g.reserveSpaceDefault =
                              0 === c || 2 === c || { 1: 'left', 3: 'right' }[c] === g.labelAlign),
                          B(
                              m.reserveSpace,
                              'center' === g.labelAlign ? !0 : null,
                              g.reserveSpaceDefault
                          ) &&
                              f.forEach(function (b) {
                                  D = Math.max(r[b].getLabelSize(), D)
                              }),
                          g.staggerLines && (D *= g.staggerLines),
                          (g.labelOffset = D * (g.opposite ? -1 : 1)))
                        : b(r, function (b, e) {
                              b.destroy()
                              delete r[e]
                          })
                    if (
                        n &&
                        n.text &&
                        !1 !== n.enabled &&
                        (g.addTitle(h), h && !1 !== n.reserveSpace)
                    ) {
                        g.titleOffset = q = g.axisTitle.getBBox()[l ? 'height' : 'width']
                        var K = n.offset
                        I = C(K) ? 0 : B(n.margin, l ? 5 : 10)
                    }
                    g.renderLine()
                    g.offset = p * B(k.offset, v[c] ? v[c] + (k.margin || 0) : 0)
                    g.tickRotCorr = g.tickRotCorr || { x: 0, y: 0 }
                    n = 0 === c ? -g.labelMetrics().h : 2 === c ? g.tickRotCorr.y : 0
                    J = Math.abs(D) + I
                    D && (J = J - n + p * (l ? B(m.y, g.tickRotCorr.y + 8 * p) : m.x))
                    g.axisTitleMargin = B(K, J)
                    g.getMaxLabelDimensions &&
                        (g.maxLabelDimensions = g.getMaxLabelDimensions(r, f))
                    'colorAxis' !== x &&
                        ((l = this.tickSize('tick')),
                        (v[c] = Math.max(
                            v[c],
                            (g.axisTitleMargin || 0) + q + p * g.offset,
                            J,
                            f && f.length && l ? l[0] + p * g.offset : 0
                        )),
                        (k =
                            !g.axisLine || k.offset
                                ? 0
                                : 2 * Math.floor(g.axisLine.strokeWidth() / 2)),
                        (a[w] = Math.max(a[w], k)))
                    z(this, 'afterGetOffset')
                }
                d.prototype.getLinePath = function (b) {
                    var e = this.chart,
                        g = this.opposite,
                        a = this.offset,
                        l = this.horiz,
                        k = this.left + (g ? this.width : 0) + a
                    a = e.chartHeight - this.bottom - (g ? this.height : 0) + a
                    g && (b *= -1)
                    return e.renderer.crispLine(
                        [
                            ['M', l ? this.left : k, l ? a : this.top],
                            [
                                'L',
                                l ? e.chartWidth - this.right : k,
                                l ? a : e.chartHeight - this.bottom,
                            ],
                        ],
                        b
                    )
                }
                d.prototype.renderLine = function () {
                    this.axisLine ||
                        ((this.axisLine = this.chart.renderer
                            .path()
                            .addClass('highcharts-axis-line')
                            .add(this.axisGroup)),
                        this.chart.styledMode ||
                            this.axisLine.attr({
                                stroke: this.options.lineColor,
                                'stroke-width': this.options.lineWidth,
                                zIndex: 7,
                            }))
                }
                d.prototype.getTitlePosition = function () {
                    var b = this.horiz,
                        e = this.left,
                        g = this.top,
                        a = this.len,
                        l = this.options.title,
                        k = b ? e : g,
                        c = this.opposite,
                        r = this.offset,
                        f = l.x,
                        x = l.y,
                        B = this.axisTitle,
                        u = this.chart.renderer.fontMetrics(l.style.fontSize, B)
                    B = Math.max(B.getBBox(null, 0).height - u.h - 1, 0)
                    a = { low: k + (b ? 0 : a), middle: k + a / 2, high: k + (b ? a : 0) }[l.align]
                    e =
                        (b ? g + this.height : e) +
                        (b ? 1 : -1) * (c ? -1 : 1) * this.axisTitleMargin +
                        [-B, B, u.f, -B][this.side]
                    b = {
                        x: b ? a + f : e + (c ? this.width : 0) + r + f,
                        y: b ? e + x - (c ? this.height : 0) + r : a + x,
                    }
                    z(this, 'afterGetTitlePosition', { titlePosition: b })
                    return b
                }
                d.prototype.renderMinorTick = function (b, e) {
                    var g = this.minorTicks
                    g[b] || (g[b] = new H(this, b, 'minor'))
                    e && g[b].isNew && g[b].render(null, !0)
                    g[b].render(null, !1, 1)
                }
                d.prototype.renderTick = function (b, e, g) {
                    var a = this.ticks
                    if (
                        !this.isLinked ||
                        (b >= this.min && b <= this.max) ||
                        (this.grid && this.grid.isColumn)
                    )
                        a[b] || (a[b] = new H(this, b)),
                            g && a[b].isNew && a[b].render(e, !0, -1),
                            a[b].render(e)
                }
                d.prototype.render = function () {
                    var e = this,
                        g = e.chart,
                        a = e.logarithmic,
                        l = e.options,
                        k = e.isLinked,
                        c = e.tickPositions,
                        r = e.axisTitle,
                        f = e.ticks,
                        x = e.minorTicks,
                        B = e.alternateBands,
                        u = l.stackLabels,
                        d = l.alternateGridColor,
                        J = e.tickmarkOffset,
                        n = e.axisLine,
                        m = e.showAxis,
                        v = q(g.renderer.globalAnimation),
                        p,
                        h
                    e.labelEdge.length = 0
                    e.overlap = !1
                    ;[f, x, B].forEach(function (e) {
                        b(e, function (b) {
                            b.isActive = !1
                        })
                    })
                    if (e.hasData() || k) {
                        var C = e.chart.hasRendered && e.old && w(e.old.min)
                        e.minorTickInterval &&
                            !e.categories &&
                            e.getMinorTickPositions().forEach(function (b) {
                                e.renderMinorTick(b, C)
                            })
                        c.length &&
                            (c.forEach(function (b, g) {
                                e.renderTick(b, g, C)
                            }),
                            J &&
                                (0 === e.min || e.single) &&
                                (f[-1] || (f[-1] = new H(e, -1, null, !0)), f[-1].render(-1)))
                        d &&
                            c.forEach(function (b, l) {
                                h = 'undefined' !== typeof c[l + 1] ? c[l + 1] + J : e.max - J
                                0 === l % 2 &&
                                    b < e.max &&
                                    h <= e.max + (g.polar ? -J : J) &&
                                    (B[b] || (B[b] = new G.PlotLineOrBand(e)),
                                    (p = b + J),
                                    (B[b].options = {
                                        from: a ? a.lin2log(p) : p,
                                        to: a ? a.lin2log(h) : h,
                                        color: d,
                                        className: 'highcharts-alternate-grid',
                                    }),
                                    B[b].render(),
                                    (B[b].isActive = !0))
                            })
                        e._addedPlotLB ||
                            ((e._addedPlotLB = !0),
                            (l.plotLines || []).concat(l.plotBands || []).forEach(function (b) {
                                e.addPlotBandOrLine(b)
                            }))
                    }
                    ;[f, x, B].forEach(function (e) {
                        var a = [],
                            l = v.duration
                        b(e, function (b, e) {
                            b.isActive || (b.render(e, !1, 0), (b.isActive = !1), a.push(e))
                        })
                        M(
                            function () {
                                for (var b = a.length; b--; )
                                    e[a[b]] &&
                                        !e[a[b]].isActive &&
                                        (e[a[b]].destroy(), delete e[a[b]])
                            },
                            e !== B && g.hasRendered && l ? l : 0
                        )
                    })
                    n &&
                        (n[n.isPlaced ? 'animate' : 'attr']({
                            d: this.getLinePath(n.strokeWidth()),
                        }),
                        (n.isPlaced = !0),
                        n[m ? 'show' : 'hide'](m))
                    r &&
                        m &&
                        ((l = e.getTitlePosition()),
                        w(l.y)
                            ? (r[r.isNew ? 'attr' : 'animate'](l), (r.isNew = !1))
                            : (r.attr('y', -9999), (r.isNew = !0)))
                    u && u.enabled && e.stacking && e.stacking.renderStackTotals()
                    e.old = {
                        len: e.len,
                        max: e.max,
                        min: e.min,
                        transA: e.transA,
                        userMax: e.userMax,
                        userMin: e.userMin,
                    }
                    e.isDirty = !1
                    z(this, 'afterRender')
                }
                d.prototype.redraw = function () {
                    this.visible &&
                        (this.render(),
                        this.plotLinesAndBands.forEach(function (b) {
                            b.render()
                        }))
                    this.series.forEach(function (b) {
                        b.isDirty = !0
                    })
                }
                d.prototype.getKeepProps = function () {
                    return this.keepProps || d.keepProps
                }
                d.prototype.destroy = function (e) {
                    var g = this,
                        a = g.plotLinesAndBands,
                        l = this.eventOptions
                    z(this, 'destroy', { keepEvents: e })
                    e || r(g)
                    ;[g.ticks, g.minorTicks, g.alternateBands].forEach(function (b) {
                        I(b)
                    })
                    if (a) for (e = a.length; e--; ) a[e].destroy()
                    'axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar'
                        .split(' ')
                        .forEach(function (b) {
                            g[b] && (g[b] = g[b].destroy())
                        })
                    for (var k in g.plotLinesAndBandsGroups)
                        g.plotLinesAndBandsGroups[k] = g.plotLinesAndBandsGroups[k].destroy()
                    b(g, function (b, e) {
                        ;-1 === g.getKeepProps().indexOf(e) && delete g[e]
                    })
                    this.eventOptions = l
                }
                d.prototype.drawCrosshair = function (b, e) {
                    var g = this.crosshair,
                        a = B(g && g.snap, !0),
                        l = this.chart,
                        k,
                        c = this.cross
                    z(this, 'drawCrosshair', { e: b, point: e })
                    b || (b = this.cross && this.cross.e)
                    if (g && !1 !== (C(e) || !a)) {
                        a
                            ? C(e) &&
                              (k = B(
                                  'colorAxis' !== this.coll ? e.crosshairPos : null,
                                  this.isXAxis ? e.plotX : this.len - e.plotY
                              ))
                            : (k =
                                  b &&
                                  (this.horiz
                                      ? b.chartX - this.pos
                                      : this.len - b.chartY + this.pos))
                        if (C(k)) {
                            var r = {
                                value: e && (this.isXAxis ? e.x : B(e.stackY, e.y)),
                                translatedValue: k,
                            }
                            l.polar &&
                                v(r, {
                                    isCrosshair: !0,
                                    chartX: b && b.chartX,
                                    chartY: b && b.chartY,
                                    point: e,
                                })
                            r = this.getPlotLinePath(r) || null
                        }
                        if (!C(r)) {
                            this.hideCrosshair()
                            return
                        }
                        a = this.categories && !this.isRadial
                        c ||
                            ((this.cross = c =
                                l.renderer
                                    .path()
                                    .addClass(
                                        'highcharts-crosshair highcharts-crosshair-' +
                                            (a ? 'category ' : 'thin ') +
                                            (g.className || '')
                                    )
                                    .attr({ zIndex: B(g.zIndex, 2) })
                                    .add()),
                            l.styledMode ||
                                (c
                                    .attr({
                                        stroke:
                                            g.color ||
                                            (a
                                                ? A.parse('#ccd6eb').setOpacity(0.25).get()
                                                : '#cccccc'),
                                        'stroke-width': B(g.width, 1),
                                    })
                                    .css({ 'pointer-events': 'none' }),
                                g.dashStyle && c.attr({ dashstyle: g.dashStyle })))
                        c.show().attr({ d: r })
                        a && !g.width && c.attr({ 'stroke-width': this.transA })
                        this.cross.e = b
                    } else this.hideCrosshair()
                    z(this, 'afterDrawCrosshair', { e: b, point: e })
                }
                d.prototype.hideCrosshair = function () {
                    this.cross && this.cross.hide()
                    z(this, 'afterHideCrosshair')
                }
                d.prototype.hasVerticalPanning = function () {
                    var b = this.chart.options.chart.panning
                    return !!(b && b.enabled && /y/.test(b.type))
                }
                d.prototype.validatePositiveValue = function (b) {
                    return w(b) && 0 < b
                }
                d.prototype.update = function (b, g) {
                    var a = this.chart
                    b = e(this.userOptions, b)
                    this.destroy(!0)
                    this.init(a, b)
                    a.isDirtyBox = !0
                    B(g, !0) && a.redraw()
                }
                d.prototype.remove = function (b) {
                    for (var e = this.chart, g = this.coll, a = this.series, l = a.length; l--; )
                        a[l] && a[l].remove(!1)
                    L(e.axes, this)
                    L(e[g], this)
                    e[g].forEach(function (b, e) {
                        b.options.index = b.userOptions.index = e
                    })
                    this.destroy()
                    e.isDirtyBox = !0
                    B(b, !0) && e.redraw()
                }
                d.prototype.setTitle = function (b, e) {
                    this.update({ title: b }, e)
                }
                d.prototype.setCategories = function (b, e) {
                    this.update({ categories: b }, e)
                }
                d.defaultOptions = h.defaultXAxisOptions
                d.keepProps = 'extKey hcEvents names series userMax userMin'.split(' ')
                return d
            })()
            ;('')
            return d
        }
    )
    N(h, 'Core/Axis/DateTimeAxis.js', [h['Core/Utilities.js']], function (d) {
        var h = d.addEvent,
            A = d.getMagnitude,
            F = d.normalizeTickInterval,
            t = d.timeUnits,
            G
        ;(function (d) {
            function y() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }
            function q(c) {
                'datetime' !== c.userOptions.type
                    ? (this.dateTime = void 0)
                    : this.dateTime || (this.dateTime = new f(this))
            }
            var p = []
            d.compose = function (c) {
                ;-1 === p.indexOf(c) &&
                    (p.push(c),
                    c.keepProps.push('dateTime'),
                    (c.prototype.getTimeTicks = y),
                    h(c, 'init', q))
                return c
            }
            var f = (function () {
                function c(a) {
                    this.axis = a
                }
                c.prototype.normalizeTimeTickInterval = function (a, c) {
                    var f = c || [
                        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ['second', [1, 2, 5, 10, 15, 30]],
                        ['minute', [1, 2, 5, 10, 15, 30]],
                        ['hour', [1, 2, 3, 4, 6, 8, 12]],
                        ['day', [1, 2]],
                        ['week', [1, 2]],
                        ['month', [1, 2, 3, 4, 6]],
                        ['year', null],
                    ]
                    c = f[f.length - 1]
                    var d = t[c[0]],
                        n = c[1],
                        p
                    for (
                        p = 0;
                        p < f.length &&
                        !((c = f[p]),
                        (d = t[c[0]]),
                        (n = c[1]),
                        f[p + 1] && a <= (d * n[n.length - 1] + t[f[p + 1][0]]) / 2);
                        p++
                    );
                    d === t.year && a < 5 * d && (n = [1, 2, 5])
                    a = F(a / d, n, 'year' === c[0] ? Math.max(A(a / d), 1) : 1)
                    return { unitRange: d, count: a, unitName: c[0] }
                }
                c.prototype.getXDateFormat = function (a, c) {
                    var f = this.axis
                    return f.closestPointRange
                        ? f.chart.time.getDateFormat(
                              f.closestPointRange,
                              a,
                              f.options.startOfWeek,
                              c
                          ) || c.year
                        : c.day
                }
                return c
            })()
            d.Additions = f
        })(G || (G = {}))
        return G
    })
    N(h, 'Core/Axis/LogarithmicAxis.js', [h['Core/Utilities.js']], function (d) {
        var h = d.addEvent,
            A = d.getMagnitude,
            F = d.normalizeTickInterval,
            t = d.pick,
            G
        ;(function (d) {
            function y(c) {
                var a = this.logarithmic
                'logarithmic' !== c.userOptions.type
                    ? (this.logarithmic = void 0)
                    : a || (this.logarithmic = new f(this))
            }
            function q() {
                var c = this.logarithmic
                c &&
                    ((this.lin2val = function (a) {
                        return c.lin2log(a)
                    }),
                    (this.val2lin = function (a) {
                        return c.log2lin(a)
                    }))
            }
            var p = []
            d.compose = function (c) {
                ;-1 === p.indexOf(c) &&
                    (p.push(c),
                    c.keepProps.push('logarithmic'),
                    h(c, 'init', y),
                    h(c, 'afterInit', q))
                return c
            }
            var f = (function () {
                function c(a) {
                    this.axis = a
                }
                c.prototype.getLogTickPositions = function (a, c, f, d) {
                    var n = this.axis,
                        m = n.len,
                        p = n.options,
                        h = []
                    d || (this.minorAutoInterval = void 0)
                    if (0.5 <= a) (a = Math.round(a)), (h = n.getLinearTickPositions(a, c, f))
                    else if (0.08 <= a) {
                        var v = Math.floor(c),
                            z,
                            u = (p = void 0)
                        for (
                            m =
                                0.3 < a
                                    ? [1, 2, 4]
                                    : 0.15 < a
                                    ? [1, 2, 4, 6, 8]
                                    : [1, 2, 3, 4, 5, 6, 7, 8, 9];
                            v < f + 1 && !u;
                            v++
                        ) {
                            var k = m.length
                            for (z = 0; z < k && !u; z++) {
                                var w = this.log2lin(this.lin2log(v) * m[z])
                                w > c && (!d || p <= f) && 'undefined' !== typeof p && h.push(p)
                                p > f && (u = !0)
                                p = w
                            }
                        }
                    } else
                        (c = this.lin2log(c)),
                            (f = this.lin2log(f)),
                            (a = d ? n.getMinorTickInterval() : p.tickInterval),
                            (a = t(
                                'auto' === a ? null : a,
                                this.minorAutoInterval,
                                ((p.tickPixelInterval / (d ? 5 : 1)) * (f - c)) /
                                    ((d ? m / n.tickPositions.length : m) || 1)
                            )),
                            (a = F(a, void 0, A(a))),
                            (h = n.getLinearTickPositions(a, c, f).map(this.log2lin)),
                            d || (this.minorAutoInterval = a / 5)
                    d || (n.tickInterval = a)
                    return h
                }
                c.prototype.lin2log = function (a) {
                    return Math.pow(10, a)
                }
                c.prototype.log2lin = function (a) {
                    return Math.log(a) / Math.LN10
                }
                return c
            })()
            d.Additions = f
        })(G || (G = {}))
        return G
    })
    N(h, 'Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js', [h['Core/Utilities.js']], function (d) {
        var h = d.erase,
            A = d.extend,
            F = d.isNumber,
            t
        ;(function (d) {
            var t = [],
                y
            d.compose = function (d, f) {
                y || (y = d)
                ;-1 === t.indexOf(f) && (t.push(f), A(f.prototype, q.prototype))
                return f
            }
            var q = (function () {
                function d() {}
                d.prototype.getPlotBandPath = function (f, c, a) {
                    void 0 === a && (a = this.options)
                    var d = this.getPlotLinePath({
                            value: c,
                            force: !0,
                            acrossPanes: a.acrossPanes,
                        }),
                        m = [],
                        p = this.horiz
                    c =
                        !F(this.min) ||
                        !F(this.max) ||
                        (f < this.min && c < this.min) ||
                        (f > this.max && c > this.max)
                    f = this.getPlotLinePath({ value: f, force: !0, acrossPanes: a.acrossPanes })
                    a = 1
                    if (f && d) {
                        if (c) {
                            var h = f.toString() === d.toString()
                            a = 0
                        }
                        for (c = 0; c < f.length; c += 2) {
                            var q = f[c],
                                L = f[c + 1],
                                K = d[c],
                                v = d[c + 1]
                            ;('M' !== q[0] && 'L' !== q[0]) ||
                                ('M' !== L[0] && 'L' !== L[0]) ||
                                ('M' !== K[0] && 'L' !== K[0]) ||
                                ('M' !== v[0] && 'L' !== v[0]) ||
                                (p && K[1] === q[1]
                                    ? ((K[1] += a), (v[1] += a))
                                    : p || K[2] !== q[2] || ((K[2] += a), (v[2] += a)),
                                m.push(
                                    ['M', q[1], q[2]],
                                    ['L', L[1], L[2]],
                                    ['L', v[1], v[2]],
                                    ['L', K[1], K[2]],
                                    ['Z']
                                ))
                            m.isFlat = h
                        }
                    }
                    return m
                }
                d.prototype.addPlotBand = function (f) {
                    return this.addPlotBandOrLine(f, 'plotBands')
                }
                d.prototype.addPlotLine = function (f) {
                    return this.addPlotBandOrLine(f, 'plotLines')
                }
                d.prototype.addPlotBandOrLine = function (f, c) {
                    var a = this,
                        d = this.userOptions,
                        m = new y(this, f)
                    this.visible && (m = m.render())
                    if (m) {
                        this._addedPlotLB ||
                            ((this._addedPlotLB = !0),
                            (d.plotLines || []).concat(d.plotBands || []).forEach(function (c) {
                                a.addPlotBandOrLine(c)
                            }))
                        if (c) {
                            var p = d[c] || []
                            p.push(f)
                            d[c] = p
                        }
                        this.plotLinesAndBands.push(m)
                    }
                    return m
                }
                d.prototype.removePlotBandOrLine = function (f) {
                    var c = this.plotLinesAndBands,
                        a = this.options,
                        d = this.userOptions
                    if (c) {
                        for (var m = c.length; m--; ) c[m].id === f && c[m].destroy()
                        ;[
                            a.plotLines || [],
                            d.plotLines || [],
                            a.plotBands || [],
                            d.plotBands || [],
                        ].forEach(function (a) {
                            for (m = a.length; m--; ) (a[m] || {}).id === f && h(a, a[m])
                        })
                    }
                }
                d.prototype.removePlotBand = function (f) {
                    this.removePlotBandOrLine(f)
                }
                d.prototype.removePlotLine = function (f) {
                    this.removePlotBandOrLine(f)
                }
                return d
            })()
        })(t || (t = {}))
        return t
    })
    N(
        h,
        'Core/Axis/PlotLineOrBand/PlotLineOrBand.js',
        [h['Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js'], h['Core/Utilities.js']],
        function (d, h) {
            var A = h.arrayMax,
                E = h.arrayMin,
                t = h.defined,
                G = h.destroyObjectProperties,
                H = h.erase,
                y = h.fireEvent,
                q = h.merge,
                p = h.objectEach,
                f = h.pick
            h = (function () {
                function c(a, c) {
                    this.axis = a
                    c && ((this.options = c), (this.id = c.id))
                }
                c.compose = function (a) {
                    return d.compose(c, a)
                }
                c.prototype.render = function () {
                    y(this, 'render')
                    var a = this,
                        c = a.axis,
                        d = c.horiz,
                        h = c.logarithmic,
                        C = a.options,
                        I = C.color,
                        L = f(C.zIndex, 0),
                        K = C.events,
                        v = {},
                        z = c.chart.renderer,
                        u = C.label,
                        k = a.label,
                        w = C.to,
                        l = C.from,
                        e = C.value,
                        g = a.svgElem,
                        b = [],
                        B = t(l) && t(w)
                    b = t(e)
                    var J = !g,
                        r = {
                            class:
                                'highcharts-plot-' + (B ? 'band ' : 'line ') + (C.className || ''),
                        },
                        x = B ? 'bands' : 'lines'
                    h && ((l = h.log2lin(l)), (w = h.log2lin(w)), (e = h.log2lin(e)))
                    c.chart.styledMode ||
                        (b
                            ? ((r.stroke = I || '#999999'),
                              (r['stroke-width'] = f(C.width, 1)),
                              C.dashStyle && (r.dashstyle = C.dashStyle))
                            : B &&
                              ((r.fill = I || '#e6ebf5'),
                              C.borderWidth &&
                                  ((r.stroke = C.borderColor),
                                  (r['stroke-width'] = C.borderWidth))))
                    v.zIndex = L
                    x += '-' + L
                    ;(h = c.plotLinesAndBandsGroups[x]) ||
                        (c.plotLinesAndBandsGroups[x] = h =
                            z
                                .g('plot-' + x)
                                .attr(v)
                                .add())
                    J && (a.svgElem = g = z.path().attr(r).add(h))
                    if (b)
                        b = c.getPlotLinePath({
                            value: e,
                            lineWidth: g.strokeWidth(),
                            acrossPanes: C.acrossPanes,
                        })
                    else if (B) b = c.getPlotBandPath(l, w, C)
                    else return
                    !a.eventsAdded &&
                        K &&
                        (p(K, function (b, e) {
                            g.on(e, function (b) {
                                K[e].apply(a, [b])
                            })
                        }),
                        (a.eventsAdded = !0))
                    ;(J || !g.d) && b && b.length
                        ? g.attr({ d: b })
                        : g &&
                          (b
                              ? (g.show(!0), g.animate({ d: b }))
                              : g.d && (g.hide(), k && (a.label = k = k.destroy())))
                    u &&
                    (t(u.text) || t(u.formatter)) &&
                    b &&
                    b.length &&
                    0 < c.width &&
                    0 < c.height &&
                    !b.isFlat
                        ? ((u = q(
                              {
                                  align: d && B && 'center',
                                  x: d ? !B && 4 : 10,
                                  verticalAlign: !d && B && 'middle',
                                  y: d ? (B ? 16 : 10) : B ? 6 : -4,
                                  rotation: d && !B && 90,
                              },
                              u
                          )),
                          this.renderLabel(u, b, B, L))
                        : k && k.hide()
                    return a
                }
                c.prototype.renderLabel = function (a, c, f, d) {
                    var n = this.axis,
                        m = n.chart.renderer,
                        p = this.label
                    p ||
                        ((this.label = p =
                            m
                                .text(this.getLabelText(a), 0, 0, a.useHTML)
                                .attr({
                                    align: a.textAlign || a.align,
                                    rotation: a.rotation,
                                    class:
                                        'highcharts-plot-' +
                                        (f ? 'band' : 'line') +
                                        '-label ' +
                                        (a.className || ''),
                                    zIndex: d,
                                })
                                .add()),
                        n.chart.styledMode || p.css(q({ textOverflow: 'ellipsis' }, a.style)))
                    d = c.xBounds || [c[0][1], c[1][1], f ? c[2][1] : c[0][1]]
                    c = c.yBounds || [c[0][2], c[1][2], f ? c[2][2] : c[0][2]]
                    f = E(d)
                    m = E(c)
                    p.align(a, !1, { x: f, y: m, width: A(d) - f, height: A(c) - m })
                    ;(p.alignValue && 'left' !== p.alignValue) ||
                        p.css({
                            width:
                                (90 === p.rotation
                                    ? n.height - (p.alignAttr.y - n.top)
                                    : n.width - (p.alignAttr.x - n.left)) + 'px',
                        })
                    p.show(!0)
                }
                c.prototype.getLabelText = function (a) {
                    return t(a.formatter) ? a.formatter.call(this) : a.text
                }
                c.prototype.destroy = function () {
                    H(this.axis.plotLinesAndBands, this)
                    delete this.axis
                    G(this)
                }
                return c
            })()
            ;('')
            ;('')
            return h
        }
    )
    N(
        h,
        'Core/Tooltip.js',
        [
            h['Core/FormatUtilities.js'],
            h['Core/Globals.js'],
            h['Core/Renderer/RendererUtilities.js'],
            h['Core/Renderer/RendererRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t) {
            var E = d.format,
                H = h.doc,
                y = A.distribute,
                q = t.addEvent,
                p = t.clamp,
                f = t.css,
                c = t.defined,
                a = t.discardElement,
                n = t.extend,
                m = t.fireEvent,
                D = t.isArray,
                C = t.isNumber,
                I = t.isString,
                L = t.merge,
                K = t.pick,
                v = t.splat,
                z = t.syncTimeout
            d = (function () {
                function d(a, c) {
                    this.allowShared = !0
                    this.container = void 0
                    this.crosshairs = []
                    this.distance = 0
                    this.isHidden = !0
                    this.isSticky = !1
                    this.now = {}
                    this.options = {}
                    this.outside = !1
                    this.chart = a
                    this.init(a, c)
                }
                d.prototype.applyFilter = function () {
                    var a = this.chart
                    a.renderer.definition({
                        tagName: 'filter',
                        attributes: { id: 'drop-shadow-' + a.index, opacity: 0.5 },
                        children: [
                            {
                                tagName: 'feGaussianBlur',
                                attributes: { in: 'SourceAlpha', stdDeviation: 1 },
                            },
                            { tagName: 'feOffset', attributes: { dx: 1, dy: 1 } },
                            {
                                tagName: 'feComponentTransfer',
                                children: [
                                    {
                                        tagName: 'feFuncA',
                                        attributes: { type: 'linear', slope: 0.3 },
                                    },
                                ],
                            },
                            {
                                tagName: 'feMerge',
                                children: [
                                    { tagName: 'feMergeNode' },
                                    { tagName: 'feMergeNode', attributes: { in: 'SourceGraphic' } },
                                ],
                            },
                        ],
                    })
                }
                d.prototype.bodyFormatter = function (a) {
                    return a.map(function (a) {
                        var l = a.series.tooltipOptions
                        return (
                            l[(a.point.formatPrefix || 'point') + 'Formatter'] ||
                            a.point.tooltipFormatter
                        ).call(a.point, l[(a.point.formatPrefix || 'point') + 'Format'] || '')
                    })
                }
                d.prototype.cleanSplit = function (a) {
                    this.chart.series.forEach(function (c) {
                        var l = c && c.tt
                        l && (!l.isActive || a ? (c.tt = l.destroy()) : (l.isActive = !1))
                    })
                }
                d.prototype.defaultFormatter = function (a) {
                    var c = this.points || v(this)
                    var l = [a.tooltipFooterHeaderFormatter(c[0])]
                    l = l.concat(a.bodyFormatter(c))
                    l.push(a.tooltipFooterHeaderFormatter(c[0], !0))
                    return l
                }
                d.prototype.destroy = function () {
                    this.label && (this.label = this.label.destroy())
                    this.split && this.tt && (this.cleanSplit(!0), (this.tt = this.tt.destroy()))
                    this.renderer && ((this.renderer = this.renderer.destroy()), a(this.container))
                    t.clearTimeout(this.hideTimer)
                    t.clearTimeout(this.tooltipTimeout)
                }
                d.prototype.getAnchor = function (a, c) {
                    var l = this.chart,
                        e = l.pointer,
                        g = l.inverted,
                        b = l.plotTop,
                        k = l.plotLeft,
                        f,
                        r,
                        d = 0,
                        u = 0
                    a = v(a)
                    this.followPointer && c
                        ? ('undefined' === typeof c.chartX && (c = e.normalize(c)),
                          (e = [c.chartX - k, c.chartY - b]))
                        : a[0].tooltipPos
                        ? (e = a[0].tooltipPos)
                        : (a.forEach(function (e) {
                              f = e.series.yAxis
                              r = e.series.xAxis
                              d += e.plotX || 0
                              u += e.plotLow ? (e.plotLow + (e.plotHigh || 0)) / 2 : e.plotY || 0
                              r &&
                                  f &&
                                  (g
                                      ? ((d += b + l.plotHeight - r.len - r.pos),
                                        (u += k + l.plotWidth - f.len - f.pos))
                                      : ((d += r.pos - k), (u += f.pos - b)))
                          }),
                          (d /= a.length),
                          (u /= a.length),
                          (e = [g ? l.plotWidth - u : d, g ? l.plotHeight - d : u]),
                          this.shared &&
                              1 < a.length &&
                              c &&
                              (g ? (e[0] = c.chartX - k) : (e[1] = c.chartY - b)))
                    return e.map(Math.round)
                }
                d.prototype.getLabel = function () {
                    var a = this,
                        d = this.chart.styledMode,
                        l = this.options,
                        e = this.split && this.allowShared,
                        g = 'tooltip' + (c(l.className) ? ' ' + l.className : ''),
                        b =
                            l.style.pointerEvents ||
                            (!this.followPointer && l.stickOnContact ? 'auto' : 'none'),
                        B = function () {
                            a.inContact = !0
                        },
                        u = function (b) {
                            var e = a.chart.hoverSeries
                            a.inContact =
                                a.shouldStickOnContact() &&
                                a.chart.pointer.inClass(b.relatedTarget, 'highcharts-tooltip')
                            if (!a.inContact && e && e.onMouseOut) e.onMouseOut()
                        },
                        r,
                        x = this.chart.renderer
                    if (a.label) {
                        var n = !a.label.hasClass('highcharts-label')
                        ;((e && !n) || (!e && n)) && a.destroy()
                    }
                    if (!this.label) {
                        if (this.outside) {
                            n = this.chart.options.chart.style
                            var m = F.getRendererType()
                            this.container = r = h.doc.createElement('div')
                            r.className = 'highcharts-tooltip-container'
                            f(r, {
                                position: 'absolute',
                                top: '1px',
                                pointerEvents: b,
                                zIndex: Math.max(
                                    this.options.style.zIndex || 0,
                                    ((n && n.zIndex) || 0) + 3
                                ),
                            })
                            q(r, 'mouseenter', B)
                            q(r, 'mouseleave', u)
                            h.doc.body.appendChild(r)
                            this.renderer = x = new m(r, 0, 0, n, void 0, void 0, x.styledMode)
                        }
                        e
                            ? (this.label = x.g(g))
                            : ((this.label = x
                                  .label('', 0, 0, l.shape, void 0, void 0, l.useHTML, void 0, g)
                                  .attr({ padding: l.padding, r: l.borderRadius })),
                              d ||
                                  this.label
                                      .attr({
                                          fill: l.backgroundColor,
                                          'stroke-width': l.borderWidth,
                                      })
                                      .css(l.style)
                                      .css({ pointerEvents: b })
                                      .shadow(l.shadow))
                        d &&
                            l.shadow &&
                            (this.applyFilter(),
                            this.label.attr({
                                filter: 'url(#drop-shadow-' + this.chart.index + ')',
                            }))
                        if (a.outside && !a.split) {
                            var z = this.label,
                                p = z.xSetter,
                                v = z.ySetter
                            z.xSetter = function (b) {
                                p.call(z, a.distance)
                                r.style.left = b + 'px'
                            }
                            z.ySetter = function (b) {
                                v.call(z, a.distance)
                                r.style.top = b + 'px'
                            }
                        }
                        this.label.on('mouseenter', B).on('mouseleave', u).attr({ zIndex: 8 }).add()
                    }
                    return this.label
                }
                d.prototype.getPosition = function (a, c, l) {
                    var e = this.chart,
                        g = this.distance,
                        b = {},
                        k = (e.inverted && l.h) || 0,
                        f = this.outside,
                        r = f ? H.documentElement.clientWidth - 2 * g : e.chartWidth,
                        d = f
                            ? Math.max(
                                  H.body.scrollHeight,
                                  H.documentElement.scrollHeight,
                                  H.body.offsetHeight,
                                  H.documentElement.offsetHeight,
                                  H.documentElement.clientHeight
                              )
                            : e.chartHeight,
                        u = e.pointer.getChartPosition(),
                        w = function (b) {
                            var k = 'x' === b
                            return [b, k ? r : d, k ? a : c].concat(
                                f
                                    ? [
                                          k ? a * u.scaleX : c * u.scaleY,
                                          k
                                              ? u.left - g + (l.plotX + e.plotLeft) * u.scaleX
                                              : u.top - g + (l.plotY + e.plotTop) * u.scaleY,
                                          0,
                                          k ? r : d,
                                      ]
                                    : [
                                          k ? a : c,
                                          k ? l.plotX + e.plotLeft : l.plotY + e.plotTop,
                                          k ? e.plotLeft : e.plotTop,
                                          k ? e.plotLeft + e.plotWidth : e.plotTop + e.plotHeight,
                                      ]
                            )
                        },
                        n = w('y'),
                        m = w('x'),
                        z
                    w = !!l.negative
                    !e.polar &&
                        e.hoverSeries &&
                        e.hoverSeries.yAxis &&
                        e.hoverSeries.yAxis.reversed &&
                        (w = !w)
                    var p = !this.followPointer && K(l.ttBelow, !e.inverted === w),
                        v = function (e, a, l, c, r, d, x) {
                            var B = f ? ('y' === e ? g * u.scaleY : g * u.scaleX) : g,
                                w = (l - c) / 2,
                                J = c < r - g,
                                n = r + g + c < a,
                                m = r - B - l + w
                            r = r + B - w
                            if (p && n) b[e] = r
                            else if (!p && J) b[e] = m
                            else if (J) b[e] = Math.min(x - c, 0 > m - k ? m : m - k)
                            else if (n) b[e] = Math.max(d, r + k + l > a ? r : r + k)
                            else return !1
                        },
                        h = function (e, a, l, c, k) {
                            var r
                            k < g || k > a - g
                                ? (r = !1)
                                : (b[e] = k < l / 2 ? 1 : k > a - c / 2 ? a - c - 2 : k - l / 2)
                            return r
                        },
                        Q = function (b) {
                            var e = n
                            n = m
                            m = e
                            z = b
                        },
                        q = function () {
                            !1 !== v.apply(0, n)
                                ? !1 !== h.apply(0, m) || z || (Q(!0), q())
                                : z
                                ? (b.x = b.y = 0)
                                : (Q(!0), q())
                        }
                    ;(e.inverted || 1 < this.len) && Q()
                    q()
                    return b
                }
                d.prototype.hide = function (a) {
                    var c = this
                    t.clearTimeout(this.hideTimer)
                    a = K(a, this.options.hideDelay)
                    this.isHidden ||
                        (this.hideTimer = z(function () {
                            c.getLabel().fadeOut(a ? void 0 : a)
                            c.isHidden = !0
                        }, a))
                }
                d.prototype.init = function (a, c) {
                    this.chart = a
                    this.options = c
                    this.crosshairs = []
                    this.now = { x: 0, y: 0 }
                    this.isHidden = !0
                    this.split = c.split && !a.inverted && !a.polar
                    this.shared = c.shared || this.split
                    this.outside = K(c.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY))
                }
                d.prototype.shouldStickOnContact = function () {
                    return !(this.followPointer || !this.options.stickOnContact)
                }
                d.prototype.isStickyOnContact = function () {
                    return !(!this.shouldStickOnContact() || !this.inContact)
                }
                d.prototype.move = function (a, c, l, e) {
                    var g = this,
                        b = g.now,
                        k =
                            !1 !== g.options.animation &&
                            !g.isHidden &&
                            (1 < Math.abs(a - b.x) || 1 < Math.abs(c - b.y)),
                        f = g.followPointer || 1 < g.len
                    n(b, {
                        x: k ? (2 * b.x + a) / 3 : a,
                        y: k ? (b.y + c) / 2 : c,
                        anchorX: f ? void 0 : k ? (2 * b.anchorX + l) / 3 : l,
                        anchorY: f ? void 0 : k ? (b.anchorY + e) / 2 : e,
                    })
                    g.getLabel().attr(b)
                    g.drawTracker()
                    k &&
                        (t.clearTimeout(this.tooltipTimeout),
                        (this.tooltipTimeout = setTimeout(function () {
                            g && g.move(a, c, l, e)
                        }, 32)))
                }
                d.prototype.refresh = function (a, c) {
                    var l = this.chart,
                        e = this.options,
                        g = v(a),
                        b = g[0],
                        k = [],
                        f = e.formatter || this.defaultFormatter,
                        r = this.shared,
                        d = l.styledMode,
                        u = {}
                    if (e.enabled) {
                        t.clearTimeout(this.hideTimer)
                        this.allowShared = !(!D(a) && a.series && a.series.noSharedTooltip)
                        this.followPointer = !this.split && b.series.tooltipOptions.followPointer
                        a = this.getAnchor(a, c)
                        var w = a[0],
                            n = a[1]
                        r && this.allowShared
                            ? (l.pointer.applyInactiveState(g),
                              g.forEach(function (b) {
                                  b.setState('hover')
                                  k.push(b.getLabelConfig())
                              }),
                              (u = { x: b.category, y: b.y }),
                              (u.points = k))
                            : (u = b.getLabelConfig())
                        this.len = k.length
                        f = f.call(u, this)
                        r = b.series
                        this.distance = K(r.tooltipOptions.distance, 16)
                        if (!1 === f) this.hide()
                        else {
                            if (this.split && this.allowShared) this.renderSplit(f, g)
                            else {
                                var z = w,
                                    p = n
                                c &&
                                    l.pointer.isDirectTouch &&
                                    ((z = c.chartX - l.plotLeft), (p = c.chartY - l.plotTop))
                                if (
                                    l.polar ||
                                    !1 === r.options.clip ||
                                    g.some(function (b) {
                                        return b.series.shouldShowTooltip(z, p)
                                    })
                                )
                                    (c = this.getLabel()),
                                        (e.style.width && !d) ||
                                            c.css({ width: this.chart.spacingBox.width + 'px' }),
                                        c.attr({ text: f && f.join ? f.join('') : f }),
                                        c
                                            .removeClass(/highcharts-color-[\d]+/g)
                                            .addClass(
                                                'highcharts-color-' + K(b.colorIndex, r.colorIndex)
                                            ),
                                        d ||
                                            c.attr({
                                                stroke:
                                                    e.borderColor ||
                                                    b.color ||
                                                    r.color ||
                                                    '#666666',
                                            }),
                                        this.updatePosition({
                                            plotX: w,
                                            plotY: n,
                                            negative: b.negative,
                                            ttBelow: b.ttBelow,
                                            h: a[2] || 0,
                                        })
                                else {
                                    this.hide()
                                    return
                                }
                            }
                            this.isHidden && this.label && this.label.attr({ opacity: 1 }).show()
                            this.isHidden = !1
                        }
                        m(this, 'refresh')
                    }
                }
                d.prototype.renderSplit = function (a, c) {
                    function l(b, g, a, l, c) {
                        void 0 === c && (c = !0)
                        a
                            ? ((g = A ? 0 : ea),
                              (b = p(b - l / 2, R.left, R.right - l - (e.outside ? E : 0))))
                            : ((g -= G),
                              (b = c ? b - l - C : b + C),
                              (b = p(b, c ? b : R.left, R.right)))
                        return { x: b, y: g }
                    }
                    var e = this,
                        g = e.chart,
                        b = e.chart,
                        k = b.chartWidth,
                        f = b.chartHeight,
                        r = b.plotHeight,
                        d = b.plotLeft,
                        u = b.plotTop,
                        w = b.pointer,
                        m = b.scrollablePixelsY
                    m = void 0 === m ? 0 : m
                    var z = b.scrollablePixelsX,
                        v = b.scrollingContainer
                    v = void 0 === v ? { scrollLeft: 0, scrollTop: 0 } : v
                    var h = v.scrollLeft
                    v = v.scrollTop
                    var q = b.styledMode,
                        C = e.distance,
                        Q = e.options,
                        D = e.options.positioner,
                        R =
                            e.outside && 'number' !== typeof z
                                ? H.documentElement.getBoundingClientRect()
                                : { left: h, right: h + k, top: v, bottom: v + f },
                        L = e.getLabel(),
                        t = this.renderer || g.renderer,
                        A = !(!g.xAxis[0] || !g.xAxis[0].opposite)
                    g = w.getChartPosition()
                    var E = g.left
                    g = g.top
                    var G = u + v,
                        F = 0,
                        ea = r - m
                    I(a) && (a = [!1, a])
                    a = a.slice(0, c.length + 1).reduce(function (b, g, a) {
                        if (!1 !== g && '' !== g) {
                            a = c[a - 1] || {
                                isHeader: !0,
                                plotX: c[0].plotX,
                                plotY: r,
                                series: {},
                            }
                            var k = a.isHeader,
                                f = k ? e : a.series
                            g = g.toString()
                            var x = f.tt,
                                B = a.isHeader
                            var w = a.series
                            var J = 'highcharts-color-' + K(a.colorIndex, w.colorIndex, 'none')
                            x ||
                                ((x = { padding: Q.padding, r: Q.borderRadius }),
                                q ||
                                    ((x.fill = Q.backgroundColor),
                                    (x['stroke-width'] = Q.borderWidth)),
                                (x = t
                                    .label(
                                        '',
                                        0,
                                        0,
                                        Q[B ? 'headerShape' : 'shape'],
                                        void 0,
                                        void 0,
                                        Q.useHTML
                                    )
                                    .addClass(
                                        (B ? 'highcharts-tooltip-header ' : '') +
                                            'highcharts-tooltip-box ' +
                                            J
                                    )
                                    .attr(x)
                                    .add(L)))
                            x.isActive = !0
                            x.attr({ text: g })
                            q ||
                                x
                                    .css(Q.style)
                                    .shadow(Q.shadow)
                                    .attr({
                                        stroke: Q.borderColor || a.color || w.color || '#333333',
                                    })
                            f = f.tt = x
                            B = f.getBBox()
                            g = B.width + f.strokeWidth()
                            k && ((F = B.height), (ea += F), A && (G -= F))
                            w = a.plotX
                            w = void 0 === w ? 0 : w
                            J = a.plotY
                            J = void 0 === J ? 0 : J
                            x = a.series
                            if (a.isHeader) {
                                w = d + w
                                var n = u + r / 2
                            } else {
                                var m = x.xAxis,
                                    z = x.yAxis
                                w = m.pos + p(w, -C, m.len + C)
                                x.shouldShowTooltip(0, z.pos - u + J, { ignoreX: !0 }) &&
                                    (n = z.pos + J)
                            }
                            w = p(w, R.left - C, R.right + C)
                            'number' === typeof n
                                ? ((B = B.height + 1),
                                  (J = D ? D.call(e, g, B, a) : l(w, n, k, g)),
                                  b.push({
                                      align: D ? 0 : void 0,
                                      anchorX: w,
                                      anchorY: n,
                                      boxWidth: g,
                                      point: a,
                                      rank: K(J.rank, k ? 1 : 0),
                                      size: B,
                                      target: J.y,
                                      tt: f,
                                      x: J.x,
                                  }))
                                : (f.isActive = !1)
                        }
                        return b
                    }, [])
                    !D &&
                        a.some(function (b) {
                            var g = (e.outside ? E : 0) + b.anchorX
                            return g < R.left && g + b.boxWidth < R.right
                                ? !0
                                : g < E - R.left + b.boxWidth && R.right - g > g
                        }) &&
                        (a = a.map(function (b) {
                            var e = l(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1)
                            return n(b, { target: e.y, x: e.x })
                        }))
                    e.cleanSplit()
                    y(a, ea)
                    var N = E,
                        Y = E
                    a.forEach(function (b) {
                        var g = b.x,
                            a = b.boxWidth
                        b = b.isHeader
                        b ||
                            (e.outside && E + g < N && (N = E + g),
                            !b && e.outside && N + a > Y && (Y = E + g))
                    })
                    a.forEach(function (b) {
                        var g = b.x,
                            a = b.anchorX,
                            l = b.pos,
                            c = b.point.isHeader
                        l = {
                            visibility: 'undefined' === typeof l ? 'hidden' : 'inherit',
                            x: g,
                            y: l + G,
                            anchorX: a,
                            anchorY: b.anchorY,
                        }
                        if (e.outside && g < a) {
                            var k = E - N
                            0 < k &&
                                (c || ((l.x = g + k), (l.anchorX = a + k)),
                                c && ((l.x = (Y - N) / 2), (l.anchorX = a + k)))
                        }
                        b.tt.attr(l)
                    })
                    a = e.container
                    m = e.renderer
                    e.outside &&
                        a &&
                        m &&
                        ((b = L.getBBox()),
                        m.setSize(b.width + b.x, b.height + b.y, !1),
                        (a.style.left = N + 'px'),
                        (a.style.top = g + 'px'))
                }
                d.prototype.drawTracker = function () {
                    if (this.followPointer || !this.options.stickOnContact)
                        this.tracker && this.tracker.destroy()
                    else {
                        var a = this.chart,
                            c = this.label,
                            l = this.shared ? a.hoverPoints : a.hoverPoint
                        if (c && l) {
                            var e = { x: 0, y: 0, width: 0, height: 0 }
                            l = this.getAnchor(l)
                            var g = c.getBBox()
                            l[0] += a.plotLeft - c.translateX
                            l[1] += a.plotTop - c.translateY
                            e.x = Math.min(0, l[0])
                            e.y = Math.min(0, l[1])
                            e.width =
                                0 > l[0]
                                    ? Math.max(Math.abs(l[0]), g.width - l[0])
                                    : Math.max(Math.abs(l[0]), g.width)
                            e.height =
                                0 > l[1]
                                    ? Math.max(Math.abs(l[1]), g.height - Math.abs(l[1]))
                                    : Math.max(Math.abs(l[1]), g.height)
                            this.tracker
                                ? this.tracker.attr(e)
                                : ((this.tracker = c.renderer
                                      .rect(e)
                                      .addClass('highcharts-tracker')
                                      .add(c)),
                                  a.styledMode || this.tracker.attr({ fill: 'rgba(0,0,0,0)' }))
                        }
                    }
                }
                d.prototype.styledModeFormat = function (a) {
                    return a
                        .replace('style="font-size: 10px"', 'class="highcharts-header"')
                        .replace(
                            /style="color:{(point|series)\.color}"/g,
                            'class="highcharts-color-{$1.colorIndex}"'
                        )
                }
                d.prototype.tooltipFooterHeaderFormatter = function (a, c) {
                    var l = a.series,
                        e = l.tooltipOptions,
                        g = l.xAxis,
                        b = g && g.dateTime
                    g = { isFooter: c, labelConfig: a }
                    var k = e.xDateFormat,
                        f = e[c ? 'footerFormat' : 'headerFormat']
                    m(this, 'headerFormatter', g, function (g) {
                        b && !k && C(a.key) && (k = b.getXDateFormat(a.key, e.dateTimeLabelFormats))
                        b &&
                            k &&
                            ((a.point && a.point.tooltipDateKeys) || ['key']).forEach(function (b) {
                                f = f.replace('{point.' + b + '}', '{point.' + b + ':' + k + '}')
                            })
                        l.chart.styledMode && (f = this.styledModeFormat(f))
                        g.text = E(f, { point: a, series: l }, this.chart)
                    })
                    return g.text
                }
                d.prototype.update = function (a) {
                    this.destroy()
                    L(!0, this.chart.options.tooltip.userOptions, a)
                    this.init(this.chart, L(!0, this.options, a))
                }
                d.prototype.updatePosition = function (a) {
                    var c = this.chart,
                        l = this.options,
                        e = c.pointer,
                        g = this.getLabel()
                    e = e.getChartPosition()
                    var b = (l.positioner || this.getPosition).call(this, g.width, g.height, a),
                        k = a.plotX + c.plotLeft
                    a = a.plotY + c.plotTop
                    if (this.outside) {
                        l = l.borderWidth + 2 * this.distance
                        this.renderer.setSize(g.width + l, g.height + l, !1)
                        if (1 !== e.scaleX || 1 !== e.scaleY)
                            f(this.container, {
                                transform: 'scale(' + e.scaleX + ', ' + e.scaleY + ')',
                            }),
                                (k *= e.scaleX),
                                (a *= e.scaleY)
                        k += e.left - b.x
                        a += e.top - b.y
                    }
                    this.move(Math.round(b.x), Math.round(b.y || 0), k, a)
                }
                return d
            })()
            ;('')
            return d
        }
    )
    N(
        h,
        'Core/Series/Point.js',
        [
            h['Core/Renderer/HTML/AST.js'],
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/DefaultOptions.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t) {
            var E = h.animObject,
                H = A.defaultOptions,
                y = F.format,
                q = t.addEvent,
                p = t.defined,
                f = t.erase,
                c = t.extend,
                a = t.fireEvent,
                n = t.getNestedProperty,
                m = t.isArray,
                D = t.isFunction,
                C = t.isNumber,
                I = t.isObject,
                L = t.merge,
                K = t.objectEach,
                v = t.pick,
                z = t.syncTimeout,
                u = t.removeEvent,
                k = t.uniqueKey
            h = (function () {
                function w() {
                    this.colorIndex = this.category = void 0
                    this.formatPrefix = 'point'
                    this.id = void 0
                    this.isNull = !1
                    this.percentage = this.options = this.name = void 0
                    this.selected = !1
                    this.total = this.series = void 0
                    this.visible = !0
                    this.x = void 0
                }
                w.prototype.animateBeforeDestroy = function () {
                    var a = this,
                        e = { x: a.startXPos, opacity: 0 },
                        g = a.getGraphicalProps()
                    g.singular.forEach(function (b) {
                        a[b] = a[b].animate(
                            'dataLabel' === b
                                ? { x: a[b].startXPos, y: a[b].startYPos, opacity: 0 }
                                : e
                        )
                    })
                    g.plural.forEach(function (b) {
                        a[b].forEach(function (b) {
                            b.element &&
                                b.animate(
                                    c(
                                        { x: a.startXPos },
                                        b.startYPos ? { x: b.startXPos, y: b.startYPos } : {}
                                    )
                                )
                        })
                    })
                }
                w.prototype.applyOptions = function (a, e) {
                    var g = this.series,
                        b = g.options.pointValKey || g.pointValKey
                    a = w.prototype.optionsToObject.call(this, a)
                    c(this, a)
                    this.options = this.options ? c(this.options, a) : a
                    a.group && delete this.group
                    a.dataLabels && delete this.dataLabels
                    b && (this.y = w.prototype.getNestedProperty.call(this, b))
                    this.formatPrefix = (this.isNull = v(
                        this.isValid && !this.isValid(),
                        null === this.x || !C(this.y)
                    ))
                        ? 'null'
                        : 'point'
                    this.selected && (this.state = 'select')
                    'name' in this &&
                        'undefined' === typeof e &&
                        g.xAxis &&
                        g.xAxis.hasNames &&
                        (this.x = g.xAxis.nameToX(this))
                    'undefined' === typeof this.x && g
                        ? (this.x = 'undefined' === typeof e ? g.autoIncrement() : e)
                        : C(a.x) && g.options.relativeXValue && (this.x = g.autoIncrement(a.x))
                    return this
                }
                w.prototype.destroy = function () {
                    function a() {
                        if (e.graphic || e.dataLabel || e.dataLabels) u(e), e.destroyElements()
                        for (r in e) e[r] = null
                    }
                    var e = this,
                        g = e.series,
                        b = g.chart
                    g = g.options.dataSorting
                    var c = b.hoverPoints,
                        k = E(e.series.chart.renderer.globalAnimation),
                        r
                    e.legendItem && b.legend.destroyItem(e)
                    c && (e.setState(), f(c, e), c.length || (b.hoverPoints = null))
                    if (e === b.hoverPoint) e.onMouseOut()
                    g && g.enabled ? (this.animateBeforeDestroy(), z(a, k.duration)) : a()
                    b.pointCount--
                }
                w.prototype.destroyElements = function (a) {
                    var e = this
                    a = e.getGraphicalProps(a)
                    a.singular.forEach(function (g) {
                        e[g] = e[g].destroy()
                    })
                    a.plural.forEach(function (g) {
                        e[g].forEach(function (b) {
                            b.element && b.destroy()
                        })
                        delete e[g]
                    })
                }
                w.prototype.firePointEvent = function (l, e, g) {
                    var b = this,
                        c = this.series.options
                    ;(c.point.events[l] ||
                        (b.options && b.options.events && b.options.events[l])) &&
                        b.importEvents()
                    'click' === l &&
                        c.allowPointSelect &&
                        (g = function (e) {
                            b.select && b.select(null, e.ctrlKey || e.metaKey || e.shiftKey)
                        })
                    a(b, l, e, g)
                }
                w.prototype.getClassName = function () {
                    return (
                        'highcharts-point' +
                        (this.selected ? ' highcharts-point-select' : '') +
                        (this.negative ? ' highcharts-negative' : '') +
                        (this.isNull ? ' highcharts-null-point' : '') +
                        ('undefined' !== typeof this.colorIndex
                            ? ' highcharts-color-' + this.colorIndex
                            : '') +
                        (this.options.className ? ' ' + this.options.className : '') +
                        (this.zone && this.zone.className
                            ? ' ' + this.zone.className.replace('highcharts-negative', '')
                            : '')
                    )
                }
                w.prototype.getGraphicalProps = function (a) {
                    var e = this,
                        g = [],
                        b = { singular: [], plural: [] },
                        l
                    a = a || { graphic: 1, dataLabel: 1 }
                    a.graphic && g.push('graphic', 'upperGraphic', 'shadowGroup')
                    a.dataLabel && g.push('dataLabel', 'dataLabelUpper', 'connector')
                    for (l = g.length; l--; ) {
                        var c = g[l]
                        e[c] && b.singular.push(c)
                    }
                    ;['dataLabel', 'connector'].forEach(function (g) {
                        var l = g + 's'
                        a[g] && e[l] && b.plural.push(l)
                    })
                    return b
                }
                w.prototype.getLabelConfig = function () {
                    return {
                        x: this.category,
                        y: this.y,
                        color: this.color,
                        colorIndex: this.colorIndex,
                        key: this.name || this.category,
                        series: this.series,
                        point: this,
                        percentage: this.percentage,
                        total: this.total || this.stackTotal,
                    }
                }
                w.prototype.getNestedProperty = function (a) {
                    if (a) return 0 === a.indexOf('custom.') ? n(a, this.options) : this[a]
                }
                w.prototype.getZone = function () {
                    var a = this.series,
                        e = a.zones
                    a = a.zoneAxis || 'y'
                    var g,
                        b = 0
                    for (g = e[b]; this[a] >= g.value; ) g = e[++b]
                    this.nonZonedColor || (this.nonZonedColor = this.color)
                    this.color = g && g.color && !this.options.color ? g.color : this.nonZonedColor
                    return g
                }
                w.prototype.hasNewShapeType = function () {
                    return (
                        (this.graphic &&
                            (this.graphic.symbolName || this.graphic.element.nodeName)) !==
                        this.shapeType
                    )
                }
                w.prototype.init = function (c, e, g) {
                    this.series = c
                    this.applyOptions(e, g)
                    this.id = p(this.id) ? this.id : k()
                    this.resolveColor()
                    c.chart.pointCount++
                    a(this, 'afterInit')
                    return this
                }
                w.prototype.optionsToObject = function (a) {
                    var e = this.series,
                        g = e.options.keys,
                        b = g || e.pointArrayMap || ['y'],
                        c = b.length,
                        l = {},
                        k = 0,
                        f = 0
                    if (C(a) || null === a) l[b[0]] = a
                    else if (m(a))
                        for (
                            !g &&
                            a.length > c &&
                            ((e = typeof a[0]),
                            'string' === e ? (l.name = a[0]) : 'number' === e && (l.x = a[0]),
                            k++);
                            f < c;

                        )
                            (g && 'undefined' === typeof a[k]) ||
                                (0 < b[f].indexOf('.')
                                    ? w.prototype.setNestedProperty(l, a[k], b[f])
                                    : (l[b[f]] = a[k])),
                                k++,
                                f++
                    else
                        'object' === typeof a &&
                            ((l = a),
                            a.dataLabels && (e._hasPointLabels = !0),
                            a.marker && (e._hasPointMarkers = !0))
                    return l
                }
                w.prototype.resolveColor = function () {
                    var a = this.series,
                        e = a.chart.styledMode
                    var g = a.chart.options.chart.colorCount
                    delete this.nonZonedColor
                    if (a.options.colorByPoint) {
                        if (!e) {
                            g = a.options.colors || a.chart.options.colors
                            var b = g[a.colorCounter]
                            g = g.length
                        }
                        e = a.colorCounter
                        a.colorCounter++
                        a.colorCounter === g && (a.colorCounter = 0)
                    } else e || (b = a.color), (e = a.colorIndex)
                    this.colorIndex = v(this.options.colorIndex, e)
                    this.color = v(this.options.color, b)
                }
                w.prototype.setNestedProperty = function (a, e, g) {
                    g.split('.').reduce(function (b, g, a, c) {
                        b[g] = c.length - 1 === a ? e : I(b[g], !0) ? b[g] : {}
                        return b[g]
                    }, a)
                    return a
                }
                w.prototype.tooltipFormatter = function (a) {
                    var e = this.series,
                        g = e.tooltipOptions,
                        b = v(g.valueDecimals, ''),
                        c = g.valuePrefix || '',
                        l = g.valueSuffix || ''
                    e.chart.styledMode && (a = e.chart.tooltip.styledModeFormat(a))
                    ;(e.pointArrayMap || ['y']).forEach(function (e) {
                        e = '{point.' + e
                        if (c || l) a = a.replace(RegExp(e + '}', 'g'), c + e + '}' + l)
                        a = a.replace(RegExp(e + '}', 'g'), e + ':,.' + b + 'f}')
                    })
                    return y(a, { point: this, series: this.series }, e.chart)
                }
                w.prototype.update = function (a, e, g, b) {
                    function c() {
                        l.applyOptions(a)
                        var b = f && l.hasDummyGraphic
                        b = null === l.y ? !b : b
                        f && b && ((l.graphic = f.destroy()), delete l.hasDummyGraphic)
                        I(a, !0) &&
                            (f &&
                                f.element &&
                                a &&
                                a.marker &&
                                'undefined' !== typeof a.marker.symbol &&
                                (l.graphic = f.destroy()),
                            a &&
                                a.dataLabels &&
                                l.dataLabel &&
                                (l.dataLabel = l.dataLabel.destroy()),
                            l.connector && (l.connector = l.connector.destroy()))
                        w = l.index
                        k.updateParallelArrays(l, w)
                        u.data[w] = I(u.data[w], !0) || I(a, !0) ? l.options : v(a, u.data[w])
                        k.isDirty = k.isDirtyData = !0
                        !k.fixedBox && k.hasCartesianSeries && (d.isDirtyBox = !0)
                        'point' === u.legendType && (d.isDirtyLegend = !0)
                        e && d.redraw(g)
                    }
                    var l = this,
                        k = l.series,
                        f = l.graphic,
                        d = k.chart,
                        u = k.options,
                        w
                    e = v(e, !0)
                    !1 === b ? c() : l.firePointEvent('update', { options: a }, c)
                }
                w.prototype.remove = function (a, e) {
                    this.series.removePoint(this.series.data.indexOf(this), a, e)
                }
                w.prototype.select = function (a, e) {
                    var g = this,
                        b = g.series,
                        c = b.chart
                    this.selectedStaging = a = v(a, !g.selected)
                    g.firePointEvent(a ? 'select' : 'unselect', { accumulate: e }, function () {
                        g.selected = g.options.selected = a
                        b.options.data[b.data.indexOf(g)] = g.options
                        g.setState(a && 'select')
                        e ||
                            c.getSelectedPoints().forEach(function (b) {
                                var e = b.series
                                b.selected &&
                                    b !== g &&
                                    ((b.selected = b.options.selected = !1),
                                    (e.options.data[e.data.indexOf(b)] = b.options),
                                    b.setState(
                                        c.hoverPoints && e.options.inactiveOtherPoints
                                            ? 'inactive'
                                            : ''
                                    ),
                                    b.firePointEvent('unselect'))
                            })
                    })
                    delete this.selectedStaging
                }
                w.prototype.onMouseOver = function (a) {
                    var e = this.series.chart,
                        g = e.pointer
                    a = a ? g.normalize(a) : g.getChartCoordinatesFromPoint(this, e.inverted)
                    g.runPointActions(a, this)
                }
                w.prototype.onMouseOut = function () {
                    var a = this.series.chart
                    this.firePointEvent('mouseOut')
                    this.series.options.inactiveOtherPoints ||
                        (a.hoverPoints || []).forEach(function (e) {
                            e.setState()
                        })
                    a.hoverPoints = a.hoverPoint = null
                }
                w.prototype.importEvents = function () {
                    if (!this.hasImportedEvents) {
                        var a = this,
                            e = L(a.series.options.point, a.options).events
                        a.events = e
                        K(e, function (e, b) {
                            D(e) && q(a, b, e)
                        })
                        this.hasImportedEvents = !0
                    }
                }
                w.prototype.setState = function (l, e) {
                    var g = this.series,
                        b = this.state,
                        k = g.options.states[l || 'normal'] || {},
                        f = H.plotOptions[g.type].marker && g.options.marker,
                        r = f && !1 === f.enabled,
                        x = (f && f.states && f.states[l || 'normal']) || {},
                        u = !1 === x.enabled,
                        w = this.marker || {},
                        n = g.chart,
                        m = f && g.markerAttribs,
                        z = g.halo,
                        p,
                        h = g.stateMarkerGraphic
                    l = l || ''
                    if (
                        !(
                            (l === this.state && !e) ||
                            (this.selected && 'select' !== l) ||
                            !1 === k.enabled ||
                            (l && (u || (r && !1 === x.enabled))) ||
                            (l && w.states && w.states[l] && !1 === w.states[l].enabled)
                        )
                    ) {
                        this.state = l
                        m && (p = g.markerAttribs(this, l))
                        if (this.graphic && !this.hasDummyGraphic) {
                            b && this.graphic.removeClass('highcharts-point-' + b)
                            l && this.graphic.addClass('highcharts-point-' + l)
                            if (!n.styledMode) {
                                var q = g.pointAttribs(this, l)
                                var Q = v(n.options.chart.animation, k.animation)
                                g.options.inactiveOtherPoints &&
                                    C(q.opacity) &&
                                    ((this.dataLabels || []).forEach(function (b) {
                                        b && b.animate({ opacity: q.opacity }, Q)
                                    }),
                                    this.connector &&
                                        this.connector.animate({ opacity: q.opacity }, Q))
                                this.graphic.animate(q, Q)
                            }
                            p &&
                                this.graphic.animate(
                                    p,
                                    v(n.options.chart.animation, x.animation, f.animation)
                                )
                            h && h.hide()
                        } else {
                            if (l && x) {
                                b = w.symbol || g.symbol
                                h && h.currentSymbol !== b && (h = h.destroy())
                                if (p)
                                    if (h) h[e ? 'animate' : 'attr']({ x: p.x, y: p.y })
                                    else
                                        b &&
                                            ((g.stateMarkerGraphic = h =
                                                n.renderer
                                                    .symbol(b, p.x, p.y, p.width, p.height)
                                                    .add(g.markerGroup)),
                                            (h.currentSymbol = b))
                                !n.styledMode &&
                                    h &&
                                    'inactive' !== this.state &&
                                    h.attr(g.pointAttribs(this, l))
                            }
                            h &&
                                (h[l && this.isInside ? 'show' : 'hide'](),
                                (h.element.point = this),
                                h.addClass(this.getClassName(), !0))
                        }
                        k = k.halo
                        p = ((h = this.graphic || h) && h.visibility) || 'inherit'
                        k && k.size && h && 'hidden' !== p && !this.isCluster
                            ? (z || (g.halo = z = n.renderer.path().add(h.parentGroup)),
                              z.show()[e ? 'animate' : 'attr']({ d: this.haloPath(k.size) }),
                              z.attr({
                                  class:
                                      'highcharts-halo highcharts-color-' +
                                      v(this.colorIndex, g.colorIndex) +
                                      (this.className ? ' ' + this.className : ''),
                                  visibility: p,
                                  zIndex: -1,
                              }),
                              (z.point = this),
                              n.styledMode ||
                                  z.attr(
                                      c(
                                          {
                                              fill: this.color || g.color,
                                              'fill-opacity': k.opacity,
                                          },
                                          d.filterUserAttributes(k.attributes || {})
                                      )
                                  ))
                            : z &&
                              z.point &&
                              z.point.haloPath &&
                              z.animate({ d: z.point.haloPath(0) }, null, z.hide)
                        a(this, 'afterSetState', { state: l })
                    }
                }
                w.prototype.haloPath = function (a) {
                    return this.series.chart.renderer.symbols.circle(
                        Math.floor(this.plotX) - a,
                        this.plotY - a,
                        2 * a,
                        2 * a
                    )
                }
                return w
            })()
            ;('')
            return h
        }
    )
    N(
        h,
        'Core/Pointer.js',
        [
            h['Core/Color/Color.js'],
            h['Core/Globals.js'],
            h['Core/Tooltip.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t = d.parse,
                E = h.charts,
                H = h.noop,
                y = F.addEvent,
                q = F.attr,
                p = F.css,
                f = F.defined,
                c = F.extend,
                a = F.find,
                n = F.fireEvent,
                m = F.isNumber,
                D = F.isObject,
                C = F.objectEach,
                I = F.offset,
                L = F.pick,
                K = F.splat
            d = (function () {
                function d(a, c) {
                    this.lastValidTouch = {}
                    this.pinchDown = []
                    this.runChartClick = !1
                    this.eventsToUnbind = []
                    this.chart = a
                    this.hasDragged = !1
                    this.options = c
                    this.init(a, c)
                }
                d.prototype.applyInactiveState = function (a) {
                    var c = [],
                        k
                    ;(a || []).forEach(function (a) {
                        k = a.series
                        c.push(k)
                        k.linkedParent && c.push(k.linkedParent)
                        k.linkedSeries && (c = c.concat(k.linkedSeries))
                        k.navigatorSeries && c.push(k.navigatorSeries)
                    })
                    this.chart.series.forEach(function (a) {
                        ;-1 === c.indexOf(a)
                            ? a.setState('inactive', !0)
                            : a.options.inactiveOtherPoints && a.setAllPointsToState('inactive')
                    })
                }
                d.prototype.destroy = function () {
                    var a = this
                    this.eventsToUnbind.forEach(function (a) {
                        return a()
                    })
                    this.eventsToUnbind = []
                    h.chartCount ||
                        (d.unbindDocumentMouseUp &&
                            (d.unbindDocumentMouseUp = d.unbindDocumentMouseUp()),
                        d.unbindDocumentTouchEnd &&
                            (d.unbindDocumentTouchEnd = d.unbindDocumentTouchEnd()))
                    clearInterval(a.tooltipTimeout)
                    C(a, function (c, k) {
                        a[k] = void 0
                    })
                }
                d.prototype.drag = function (a) {
                    var c = this.chart,
                        k = c.options.chart,
                        f = this.zoomHor,
                        l = this.zoomVert,
                        e = c.plotLeft,
                        g = c.plotTop,
                        b = c.plotWidth,
                        d = c.plotHeight,
                        n = this.mouseDownX || 0,
                        r = this.mouseDownY || 0,
                        x = D(k.panning) ? k.panning && k.panning.enabled : k.panning,
                        m = k.panKey && a[k.panKey + 'Key'],
                        z = a.chartX,
                        p = a.chartY,
                        h = this.selectionMarker
                    if (!h || !h.touch)
                        if (
                            (z < e ? (z = e) : z > e + b && (z = e + b),
                            p < g ? (p = g) : p > g + d && (p = g + d),
                            (this.hasDragged = Math.sqrt(Math.pow(n - z, 2) + Math.pow(r - p, 2))),
                            10 < this.hasDragged)
                        ) {
                            var v = c.isInsidePlot(n - e, r - g, { visiblePlotOnly: !0 })
                            ;(!c.hasCartesianSeries && !c.mapView) ||
                                (!this.zoomX && !this.zoomY) ||
                                !v ||
                                m ||
                                h ||
                                ((this.selectionMarker = h =
                                    c.renderer
                                        .rect(e, g, f ? 1 : b, l ? 1 : d, 0)
                                        .attr({ class: 'highcharts-selection-marker', zIndex: 7 })
                                        .add()),
                                c.styledMode ||
                                    h.attr({
                                        fill:
                                            k.selectionMarkerFill ||
                                            t('#335cad').setOpacity(0.25).get(),
                                    }))
                            h &&
                                f &&
                                ((f = z - n),
                                h.attr({ width: Math.abs(f), x: (0 < f ? 0 : f) + n }))
                            h &&
                                l &&
                                ((f = p - r),
                                h.attr({ height: Math.abs(f), y: (0 < f ? 0 : f) + r }))
                            v && !h && x && c.pan(a, k.panning)
                        }
                }
                d.prototype.dragStart = function (a) {
                    var c = this.chart
                    c.mouseIsDown = a.type
                    c.cancelClick = !1
                    c.mouseDownX = this.mouseDownX = a.chartX
                    c.mouseDownY = this.mouseDownY = a.chartY
                }
                d.prototype.drop = function (a) {
                    var d = this,
                        k = this.chart,
                        w = this.hasPinched
                    if (this.selectionMarker) {
                        var l = this.selectionMarker,
                            e = l.attr ? l.attr('x') : l.x,
                            g = l.attr ? l.attr('y') : l.y,
                            b = l.attr ? l.attr('width') : l.width,
                            B = l.attr ? l.attr('height') : l.height,
                            z = {
                                originalEvent: a,
                                xAxis: [],
                                yAxis: [],
                                x: e,
                                y: g,
                                width: b,
                                height: B,
                            },
                            r = !!k.mapView
                        if (this.hasDragged || w)
                            k.axes.forEach(function (c) {
                                if (
                                    c.zoomEnabled &&
                                    f(c.min) &&
                                    (w || d[{ xAxis: 'zoomX', yAxis: 'zoomY' }[c.coll]]) &&
                                    m(e) &&
                                    m(g)
                                ) {
                                    var l = c.horiz,
                                        k = 'touchend' === a.type ? c.minPixelPadding : 0,
                                        x = c.toValue((l ? e : g) + k)
                                    l = c.toValue((l ? e + b : g + B) - k)
                                    z[c.coll].push({
                                        axis: c,
                                        min: Math.min(x, l),
                                        max: Math.max(x, l),
                                    })
                                    r = !0
                                }
                            }),
                                r &&
                                    n(k, 'selection', z, function (b) {
                                        k.zoom(c(b, w ? { animation: !1 } : null))
                                    })
                        m(k.index) && (this.selectionMarker = this.selectionMarker.destroy())
                        w && this.scaleGroups()
                    }
                    k &&
                        m(k.index) &&
                        (p(k.container, { cursor: k._cursor }),
                        (k.cancelClick = 10 < this.hasDragged),
                        (k.mouseIsDown = this.hasDragged = this.hasPinched = !1),
                        (this.pinchDown = []))
                }
                d.prototype.findNearestKDPoint = function (a, c, k) {
                    var f = this.chart,
                        l = f.hoverPoint
                    f = f.tooltip
                    if (l && f && f.isStickyOnContact()) return l
                    var e
                    a.forEach(function (a) {
                        var b =
                            !(a.noSharedTooltip && c) &&
                            0 > a.options.findNearestPointBy.indexOf('y')
                        a = a.searchPoint(k, b)
                        if ((b = D(a, !0) && a.series) && !(b = !D(e, !0))) {
                            b = e.distX - a.distX
                            var g = e.dist - a.dist,
                                l =
                                    (a.series.group && a.series.group.zIndex) -
                                    (e.series.group && e.series.group.zIndex)
                            b =
                                0 <
                                (0 !== b && c
                                    ? b
                                    : 0 !== g
                                    ? g
                                    : 0 !== l
                                    ? l
                                    : e.series.index > a.series.index
                                    ? -1
                                    : 1)
                        }
                        b && (e = a)
                    })
                    return e
                }
                d.prototype.getChartCoordinatesFromPoint = function (a, c) {
                    var k = a.series,
                        f = k.xAxis
                    k = k.yAxis
                    var l = a.shapeArgs
                    if (f && k) {
                        var e = L(a.clientX, a.plotX),
                            g = a.plotY || 0
                        a.isNode && l && m(l.x) && m(l.y) && ((e = l.x), (g = l.y))
                        return c
                            ? { chartX: k.len + k.pos - g, chartY: f.len + f.pos - e }
                            : { chartX: e + f.pos, chartY: g + k.pos }
                    }
                    if (l && l.x && l.y) return { chartX: l.x, chartY: l.y }
                }
                d.prototype.getChartPosition = function () {
                    if (this.chartPosition) return this.chartPosition
                    var a = this.chart.container,
                        c = I(a)
                    this.chartPosition = { left: c.left, top: c.top, scaleX: 1, scaleY: 1 }
                    var k = a.offsetWidth
                    a = a.offsetHeight
                    2 < k &&
                        2 < a &&
                        ((this.chartPosition.scaleX = c.width / k),
                        (this.chartPosition.scaleY = c.height / a))
                    return this.chartPosition
                }
                d.prototype.getCoordinates = function (a) {
                    var c = { xAxis: [], yAxis: [] }
                    this.chart.axes.forEach(function (k) {
                        c[k.isXAxis ? 'xAxis' : 'yAxis'].push({
                            axis: k,
                            value: k.toValue(a[k.horiz ? 'chartX' : 'chartY']),
                        })
                    })
                    return c
                }
                d.prototype.getHoverData = function (c, f, k, d, l, e) {
                    var g = []
                    d = !(!d || !c)
                    var b = {
                        chartX: e ? e.chartX : void 0,
                        chartY: e ? e.chartY : void 0,
                        shared: l,
                    }
                    n(this, 'beforeGetHoverData', b)
                    var u =
                        f && !f.stickyTracking
                            ? [f]
                            : k.filter(function (e) {
                                  return b.filter
                                      ? b.filter(e)
                                      : e.visible &&
                                            !(!l && e.directTouch) &&
                                            L(e.options.enableMouseTracking, !0) &&
                                            e.stickyTracking
                              })
                    var w = d || !e ? c : this.findNearestKDPoint(u, l, e)
                    f = w && w.series
                    w &&
                        (l && !f.noSharedTooltip
                            ? ((u = k.filter(function (e) {
                                  return b.filter
                                      ? b.filter(e)
                                      : e.visible &&
                                            !(!l && e.directTouch) &&
                                            L(e.options.enableMouseTracking, !0) &&
                                            !e.noSharedTooltip
                              })),
                              u.forEach(function (b) {
                                  var e = a(b.points, function (b) {
                                      return b.x === w.x && !b.isNull
                                  })
                                  D(e) && (b.chart.isBoosting && (e = b.getPoint(e)), g.push(e))
                              }))
                            : g.push(w))
                    b = { hoverPoint: w }
                    n(this, 'afterGetHoverData', b)
                    return { hoverPoint: b.hoverPoint, hoverSeries: f, hoverPoints: g }
                }
                d.prototype.getPointFromEvent = function (a) {
                    a = a.target
                    for (var c; a && !c; ) (c = a.point), (a = a.parentNode)
                    return c
                }
                d.prototype.onTrackerMouseOut = function (a) {
                    a = a.relatedTarget || a.toElement
                    var c = this.chart.hoverSeries
                    this.isDirectTouch = !1
                    if (
                        !(
                            !c ||
                            !a ||
                            c.stickyTracking ||
                            this.inClass(a, 'highcharts-tooltip') ||
                            (this.inClass(a, 'highcharts-series-' + c.index) &&
                                this.inClass(a, 'highcharts-tracker'))
                        )
                    )
                        c.onMouseOut()
                }
                d.prototype.inClass = function (a, c) {
                    for (var k; a; ) {
                        if ((k = q(a, 'class'))) {
                            if (-1 !== k.indexOf(c)) return !0
                            if (-1 !== k.indexOf('highcharts-container')) return !1
                        }
                        a = a.parentNode
                    }
                }
                d.prototype.init = function (a, c) {
                    this.options = c
                    this.chart = a
                    this.runChartClick = !(!c.chart.events || !c.chart.events.click)
                    this.pinchDown = []
                    this.lastValidTouch = {}
                    A &&
                        ((a.tooltip = new A(a, c.tooltip)),
                        (this.followTouchMove = L(c.tooltip.followTouchMove, !0)))
                    this.setDOMEvents()
                }
                d.prototype.normalize = function (a, f) {
                    var k = a.touches,
                        d = k
                            ? k.length
                                ? k.item(0)
                                : L(k.changedTouches, a.changedTouches)[0]
                            : a
                    f || (f = this.getChartPosition())
                    k = d.pageX - f.left
                    d = d.pageY - f.top
                    k /= f.scaleX
                    d /= f.scaleY
                    return c(a, { chartX: Math.round(k), chartY: Math.round(d) })
                }
                d.prototype.onContainerClick = function (a) {
                    var f = this.chart,
                        k = f.hoverPoint
                    a = this.normalize(a)
                    var d = f.plotLeft,
                        l = f.plotTop
                    f.cancelClick ||
                        (k && this.inClass(a.target, 'highcharts-tracker')
                            ? (n(k.series, 'click', c(a, { point: k })),
                              f.hoverPoint && k.firePointEvent('click', a))
                            : (c(a, this.getCoordinates(a)),
                              f.isInsidePlot(a.chartX - d, a.chartY - l, { visiblePlotOnly: !0 }) &&
                                  n(f, 'click', a)))
                }
                d.prototype.onContainerMouseDown = function (a) {
                    var c = 1 === ((a.buttons || a.button) & 1)
                    a = this.normalize(a)
                    if (h.isFirefox && 0 !== a.button) this.onContainerMouseMove(a)
                    if ('undefined' === typeof a.button || c)
                        this.zoomOption(a),
                            c && a.preventDefault && a.preventDefault(),
                            this.dragStart(a)
                }
                d.prototype.onContainerMouseLeave = function (a) {
                    var c = E[L(d.hoverChartIndex, -1)],
                        k = this.chart.tooltip
                    ;(k &&
                        k.shouldStickOnContact() &&
                        this.inClass(a.relatedTarget, 'highcharts-tooltip-container')) ||
                        ((a = this.normalize(a)),
                        c &&
                            (a.relatedTarget || a.toElement) &&
                            (c.pointer.reset(), (c.pointer.chartPosition = void 0)),
                        k && !k.isHidden && this.reset())
                }
                d.prototype.onContainerMouseEnter = function (a) {
                    delete this.chartPosition
                }
                d.prototype.onContainerMouseMove = function (a) {
                    var c = this.chart
                    a = this.normalize(a)
                    this.setHoverChartIndex()
                    a.preventDefault || (a.returnValue = !1)
                    ;('mousedown' === c.mouseIsDown || this.touchSelect(a)) && this.drag(a)
                    c.openMenu ||
                        (!this.inClass(a.target, 'highcharts-tracker') &&
                            !c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                                visiblePlotOnly: !0,
                            })) ||
                        (this.inClass(a.target, 'highcharts-no-tooltip')
                            ? this.reset(!1, 0)
                            : this.runPointActions(a))
                }
                d.prototype.onDocumentTouchEnd = function (a) {
                    var c = E[L(d.hoverChartIndex, -1)]
                    c && c.pointer.drop(a)
                }
                d.prototype.onContainerTouchMove = function (a) {
                    if (this.touchSelect(a)) this.onContainerMouseMove(a)
                    else this.touch(a)
                }
                d.prototype.onContainerTouchStart = function (a) {
                    if (this.touchSelect(a)) this.onContainerMouseDown(a)
                    else this.zoomOption(a), this.touch(a, !0)
                }
                d.prototype.onDocumentMouseMove = function (a) {
                    var c = this.chart,
                        k = this.chartPosition
                    a = this.normalize(a, k)
                    var f = c.tooltip
                    !k ||
                        (f && f.isStickyOnContact()) ||
                        c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                            visiblePlotOnly: !0,
                        }) ||
                        this.inClass(a.target, 'highcharts-tracker') ||
                        this.reset()
                }
                d.prototype.onDocumentMouseUp = function (a) {
                    var c = E[L(d.hoverChartIndex, -1)]
                    c && c.pointer.drop(a)
                }
                d.prototype.pinch = function (a) {
                    var f = this,
                        k = f.chart,
                        d = f.pinchDown,
                        l = a.touches || [],
                        e = l.length,
                        g = f.lastValidTouch,
                        b = f.hasZoom,
                        B = {},
                        m =
                            1 === e &&
                            ((f.inClass(a.target, 'highcharts-tracker') && k.runTrackerClick) ||
                                f.runChartClick),
                        r = {},
                        x = f.selectionMarker
                    1 < e
                        ? (f.initiated = !0)
                        : 1 === e && this.followTouchMove && (f.initiated = !1)
                    b && f.initiated && !m && !1 !== a.cancelable && a.preventDefault()
                    ;[].map.call(l, function (b) {
                        return f.normalize(b)
                    })
                    'touchstart' === a.type
                        ? ([].forEach.call(l, function (b, e) {
                              d[e] = { chartX: b.chartX, chartY: b.chartY }
                          }),
                          (g.x = [d[0].chartX, d[1] && d[1].chartX]),
                          (g.y = [d[0].chartY, d[1] && d[1].chartY]),
                          k.axes.forEach(function (b) {
                              if (b.zoomEnabled) {
                                  var e = k.bounds[b.horiz ? 'h' : 'v'],
                                      a = b.minPixelPadding,
                                      g = b.toPixels(
                                          Math.min(L(b.options.min, b.dataMin), b.dataMin)
                                      ),
                                      c = b.toPixels(
                                          Math.max(L(b.options.max, b.dataMax), b.dataMax)
                                      ),
                                      l = Math.max(g, c)
                                  e.min = Math.min(b.pos, Math.min(g, c) - a)
                                  e.max = Math.max(b.pos + b.len, l + a)
                              }
                          }),
                          (f.res = !0))
                        : f.followTouchMove && 1 === e
                        ? this.runPointActions(f.normalize(a))
                        : d.length &&
                          (n(k, 'touchpan', { originalEvent: a }, function () {
                              x || (f.selectionMarker = x = c({ destroy: H, touch: !0 }, k.plotBox))
                              f.pinchTranslate(d, l, B, x, r, g)
                              f.hasPinched = b
                              f.scaleGroups(B, r)
                          }),
                          f.res && ((f.res = !1), this.reset(!1, 0)))
                }
                d.prototype.pinchTranslate = function (a, c, k, f, l, e) {
                    this.zoomHor && this.pinchTranslateDirection(!0, a, c, k, f, l, e)
                    this.zoomVert && this.pinchTranslateDirection(!1, a, c, k, f, l, e)
                }
                d.prototype.pinchTranslateDirection = function (a, c, k, f, l, e, g, b) {
                    var d = this.chart,
                        n = a ? 'x' : 'y',
                        r = a ? 'X' : 'Y',
                        x = 'chart' + r,
                        m = a ? 'width' : 'height',
                        w = d['plot' + (a ? 'Left' : 'Top')],
                        u = d.inverted,
                        p = d.bounds[a ? 'h' : 'v'],
                        h = 1 === c.length,
                        v = c[0][x],
                        z = !h && c[1][x]
                    c = function () {
                        'number' === typeof I &&
                            20 < Math.abs(v - z) &&
                            (C = b || Math.abs(R - I) / Math.abs(v - z))
                        Q = (w - R) / C + v
                        q = d['plot' + (a ? 'Width' : 'Height')] / C
                    }
                    var q,
                        Q,
                        C = b || 1,
                        R = k[0][x],
                        I = !h && k[1][x]
                    c()
                    k = Q
                    if (k < p.min) {
                        k = p.min
                        var D = !0
                    } else k + q > p.max && ((k = p.max - q), (D = !0))
                    D
                        ? ((R -= 0.8 * (R - g[n][0])),
                          'number' === typeof I && (I -= 0.8 * (I - g[n][1])),
                          c())
                        : (g[n] = [R, I])
                    u || ((e[n] = Q - w), (e[m] = q))
                    e = u ? 1 / C : C
                    l[m] = q
                    l[n] = k
                    f[u ? (a ? 'scaleY' : 'scaleX') : 'scale' + r] = C
                    f['translate' + r] = e * w + (R - e * v)
                }
                d.prototype.reset = function (a, c) {
                    var k = this.chart,
                        f = k.hoverSeries,
                        l = k.hoverPoint,
                        e = k.hoverPoints,
                        g = k.tooltip,
                        b = g && g.shared ? e : l
                    a &&
                        b &&
                        K(b).forEach(function (b) {
                            b.series.isCartesian && 'undefined' === typeof b.plotX && (a = !1)
                        })
                    if (a)
                        g &&
                            b &&
                            K(b).length &&
                            (g.refresh(b),
                            g.shared && e
                                ? e.forEach(function (b) {
                                      b.setState(b.state, !0)
                                      b.series.isCartesian &&
                                          (b.series.xAxis.crosshair &&
                                              b.series.xAxis.drawCrosshair(null, b),
                                          b.series.yAxis.crosshair &&
                                              b.series.yAxis.drawCrosshair(null, b))
                                  })
                                : l &&
                                  (l.setState(l.state, !0),
                                  k.axes.forEach(function (b) {
                                      b.crosshair &&
                                          l.series[b.coll] === b &&
                                          b.drawCrosshair(null, l)
                                  })))
                    else {
                        if (l) l.onMouseOut()
                        e &&
                            e.forEach(function (b) {
                                b.setState()
                            })
                        if (f) f.onMouseOut()
                        g && g.hide(c)
                        this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove())
                        k.axes.forEach(function (b) {
                            b.hideCrosshair()
                        })
                        this.hoverX = k.hoverPoints = k.hoverPoint = null
                    }
                }
                d.prototype.runPointActions = function (c, f) {
                    var k = this.chart,
                        n = k.tooltip && k.tooltip.options.enabled ? k.tooltip : void 0,
                        l = n ? n.shared : !1,
                        e = f || k.hoverPoint,
                        g = (e && e.series) || k.hoverSeries
                    f = this.getHoverData(
                        e,
                        g,
                        k.series,
                        (!c || 'touchmove' !== c.type) &&
                            (!!f || (g && g.directTouch && this.isDirectTouch)),
                        l,
                        c
                    )
                    e = f.hoverPoint
                    g = f.hoverSeries
                    var b = f.hoverPoints
                    f = g && g.tooltipOptions.followPointer && !g.tooltipOptions.split
                    l = l && g && !g.noSharedTooltip
                    if (e && (e !== k.hoverPoint || (n && n.isHidden))) {
                        ;(k.hoverPoints || []).forEach(function (a) {
                            ;-1 === b.indexOf(a) && a.setState()
                        })
                        if (k.hoverSeries !== g) g.onMouseOver()
                        this.applyInactiveState(b)
                        ;(b || []).forEach(function (b) {
                            b.setState('hover')
                        })
                        k.hoverPoint && k.hoverPoint.firePointEvent('mouseOut')
                        if (!e.series) return
                        k.hoverPoints = b
                        k.hoverPoint = e
                        e.firePointEvent('mouseOver')
                        n && n.refresh(l ? b : e, c)
                    } else
                        f &&
                            n &&
                            !n.isHidden &&
                            ((e = n.getAnchor([{}], c)),
                            k.isInsidePlot(e[0], e[1], { visiblePlotOnly: !0 }) &&
                                n.updatePosition({ plotX: e[0], plotY: e[1] }))
                    this.unDocMouseMove ||
                        ((this.unDocMouseMove = y(
                            k.container.ownerDocument,
                            'mousemove',
                            function (b) {
                                var a = E[d.hoverChartIndex]
                                if (a) a.pointer.onDocumentMouseMove(b)
                            }
                        )),
                        this.eventsToUnbind.push(this.unDocMouseMove))
                    k.axes.forEach(function (e) {
                        var g = L((e.crosshair || {}).snap, !0),
                            l
                        g &&
                            (((l = k.hoverPoint) && l.series[e.coll] === e) ||
                                (l = a(b, function (b) {
                                    return b.series[e.coll] === e
                                })))
                        l || !g ? e.drawCrosshair(c, l) : e.hideCrosshair()
                    })
                }
                d.prototype.scaleGroups = function (a, c) {
                    var k = this.chart
                    k.series.forEach(function (f) {
                        var l = a || f.getPlotBox()
                        f.group &&
                            ((f.xAxis && f.xAxis.zoomEnabled) || k.mapView) &&
                            (f.group.attr(l),
                            f.markerGroup &&
                                (f.markerGroup.attr(l), f.markerGroup.clip(c ? k.clipRect : null)),
                            f.dataLabelsGroup && f.dataLabelsGroup.attr(l))
                    })
                    k.clipRect.attr(c || k.clipBox)
                }
                d.prototype.setDOMEvents = function () {
                    var a = this,
                        c = this.chart.container,
                        k = c.ownerDocument
                    c.onmousedown = this.onContainerMouseDown.bind(this)
                    c.onmousemove = this.onContainerMouseMove.bind(this)
                    c.onclick = this.onContainerClick.bind(this)
                    this.eventsToUnbind.push(
                        y(c, 'mouseenter', this.onContainerMouseEnter.bind(this))
                    )
                    this.eventsToUnbind.push(
                        y(c, 'mouseleave', this.onContainerMouseLeave.bind(this))
                    )
                    d.unbindDocumentMouseUp ||
                        (d.unbindDocumentMouseUp = y(
                            k,
                            'mouseup',
                            this.onDocumentMouseUp.bind(this)
                        ))
                    for (var f = this.chart.renderTo.parentElement; f && 'BODY' !== f.tagName; )
                        this.eventsToUnbind.push(
                            y(f, 'scroll', function () {
                                delete a.chartPosition
                            })
                        ),
                            (f = f.parentElement)
                    h.hasTouch &&
                        (this.eventsToUnbind.push(
                            y(c, 'touchstart', this.onContainerTouchStart.bind(this), {
                                passive: !1,
                            })
                        ),
                        this.eventsToUnbind.push(
                            y(c, 'touchmove', this.onContainerTouchMove.bind(this), { passive: !1 })
                        ),
                        d.unbindDocumentTouchEnd ||
                            (d.unbindDocumentTouchEnd = y(
                                k,
                                'touchend',
                                this.onDocumentTouchEnd.bind(this),
                                { passive: !1 }
                            )))
                }
                d.prototype.setHoverChartIndex = function () {
                    var a = this.chart,
                        c = h.charts[L(d.hoverChartIndex, -1)]
                    if (c && c !== a) c.pointer.onContainerMouseLeave({ relatedTarget: !0 })
                    ;(c && c.mouseIsDown) || (d.hoverChartIndex = a.index)
                }
                d.prototype.touch = function (a, c) {
                    var k = this.chart,
                        f
                    this.setHoverChartIndex()
                    if (1 === a.touches.length)
                        if (
                            ((a = this.normalize(a)),
                            (f = k.isInsidePlot(a.chartX - k.plotLeft, a.chartY - k.plotTop, {
                                visiblePlotOnly: !0,
                            })) && !k.openMenu)
                        ) {
                            c && this.runPointActions(a)
                            if ('touchmove' === a.type) {
                                c = this.pinchDown
                                var l = c[0]
                                    ? 4 <=
                                      Math.sqrt(
                                          Math.pow(c[0].chartX - a.chartX, 2) +
                                              Math.pow(c[0].chartY - a.chartY, 2)
                                      )
                                    : !1
                            }
                            L(l, !0) && this.pinch(a)
                        } else c && this.reset()
                    else 2 === a.touches.length && this.pinch(a)
                }
                d.prototype.touchSelect = function (a) {
                    return !(
                        !this.chart.options.chart.zoomBySingleTouch ||
                        !a.touches ||
                        1 !== a.touches.length
                    )
                }
                d.prototype.zoomOption = function (a) {
                    var c = this.chart,
                        k = c.options.chart
                    c = c.inverted
                    var f = k.zoomType || ''
                    ;/touch/.test(a.type) && (f = L(k.pinchType, f))
                    this.zoomX = a = /x/.test(f)
                    this.zoomY = k = /y/.test(f)
                    this.zoomHor = (a && !c) || (k && c)
                    this.zoomVert = (k && !c) || (a && c)
                    this.hasZoom = a || k
                }
                return d
            })()
            ;('')
            return d
        }
    )
    N(
        h,
        'Core/MSPointer.js',
        [h['Core/Globals.js'], h['Core/Pointer.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            function E() {
                var c = []
                c.item = function (a) {
                    return this[a]
                }
                a(m, function (a) {
                    c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target })
                })
                return c
            }
            function t(a, c, f, d) {
                var n = H[h.hoverChartIndex || NaN]
                ;('touch' !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH) ||
                    !n ||
                    ((n = n.pointer),
                    d(a),
                    n[c]({ type: f, target: a.currentTarget, preventDefault: q, touches: E() }))
            }
            var G =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (c, f) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return a(c, f)
                        }
                        return function (c, f) {
                            function d() {
                                this.constructor = c
                            }
                            a(c, f)
                            c.prototype =
                                null === f
                                    ? Object.create(f)
                                    : ((d.prototype = f.prototype), new d())
                        }
                    })(),
                H = d.charts,
                y = d.doc,
                q = d.noop,
                p = d.win,
                f = A.addEvent,
                c = A.css,
                a = A.objectEach,
                n = A.removeEvent,
                m = {},
                D = !!p.PointerEvent
            return (function (a) {
                function h() {
                    return (null !== a && a.apply(this, arguments)) || this
                }
                G(h, a)
                h.isRequired = function () {
                    return !(d.hasTouch || (!p.PointerEvent && !p.MSPointerEvent))
                }
                h.prototype.batchMSEvents = function (a) {
                    a(
                        this.chart.container,
                        D ? 'pointerdown' : 'MSPointerDown',
                        this.onContainerPointerDown
                    )
                    a(
                        this.chart.container,
                        D ? 'pointermove' : 'MSPointerMove',
                        this.onContainerPointerMove
                    )
                    a(y, D ? 'pointerup' : 'MSPointerUp', this.onDocumentPointerUp)
                }
                h.prototype.destroy = function () {
                    this.batchMSEvents(n)
                    a.prototype.destroy.call(this)
                }
                h.prototype.init = function (f, d) {
                    a.prototype.init.call(this, f, d)
                    this.hasZoom &&
                        c(f.container, { '-ms-touch-action': 'none', 'touch-action': 'none' })
                }
                h.prototype.onContainerPointerDown = function (a) {
                    t(a, 'onContainerTouchStart', 'touchstart', function (a) {
                        m[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget }
                    })
                }
                h.prototype.onContainerPointerMove = function (a) {
                    t(a, 'onContainerTouchMove', 'touchmove', function (a) {
                        m[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }
                        m[a.pointerId].target || (m[a.pointerId].target = a.currentTarget)
                    })
                }
                h.prototype.onDocumentPointerUp = function (a) {
                    t(a, 'onDocumentTouchEnd', 'touchend', function (a) {
                        delete m[a.pointerId]
                    })
                }
                h.prototype.setDOMEvents = function () {
                    a.prototype.setDOMEvents.call(this)
                    ;(this.hasZoom || this.followTouchMove) && this.batchMSEvents(f)
                }
                return h
            })(h)
        }
    )
    N(
        h,
        'Core/Legend/Legend.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Globals.js'],
            h['Core/Series/Point.js'],
            h['Core/Renderer/RendererUtilities.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G) {
            var E = d.animObject,
                y = d.setAnimation,
                q = h.format
            d = A.isFirefox
            var p = A.marginNames
            A = A.win
            var f = t.distribute,
                c = G.addEvent,
                a = G.createElement,
                n = G.css,
                m = G.defined,
                D = G.discardElement,
                C = G.find,
                I = G.fireEvent,
                L = G.isNumber,
                K = G.merge,
                v = G.pick,
                z = G.relativeLength,
                u = G.stableSort,
                k = G.syncTimeout
            t = G.wrap
            G = (function () {
                function d(a, e) {
                    this.allItems = []
                    this.contentGroup = this.box = void 0
                    this.display = !1
                    this.group = void 0
                    this.offsetWidth =
                        this.maxLegendWidth =
                        this.maxItemWidth =
                        this.legendWidth =
                        this.legendHeight =
                        this.lastLineHeight =
                        this.lastItemY =
                        this.itemY =
                        this.itemX =
                        this.itemMarginTop =
                        this.itemMarginBottom =
                        this.itemHeight =
                        this.initialItemY =
                            0
                    this.options = {}
                    this.padding = 0
                    this.pages = []
                    this.proximate = !1
                    this.scrollGroup = void 0
                    this.widthOption =
                        this.totalItemWidth =
                        this.titleHeight =
                        this.symbolWidth =
                        this.symbolHeight =
                            0
                    this.chart = a
                    this.init(a, e)
                }
                d.prototype.init = function (a, e) {
                    this.chart = a
                    this.setOptions(e)
                    e.enabled &&
                        (this.render(),
                        c(this.chart, 'endResize', function () {
                            this.legend.positionCheckboxes()
                        }),
                        this.proximate
                            ? (this.unchartrender = c(this.chart, 'render', function () {
                                  this.legend.proximatePositions()
                                  this.legend.positionItems()
                              }))
                            : this.unchartrender && this.unchartrender())
                }
                d.prototype.setOptions = function (a) {
                    var e = v(a.padding, 8)
                    this.options = a
                    this.chart.styledMode ||
                        ((this.itemStyle = a.itemStyle),
                        (this.itemHiddenStyle = K(this.itemStyle, a.itemHiddenStyle)))
                    this.itemMarginTop = a.itemMarginTop || 0
                    this.itemMarginBottom = a.itemMarginBottom || 0
                    this.padding = e
                    this.initialItemY = e - 5
                    this.symbolWidth = v(a.symbolWidth, 16)
                    this.pages = []
                    this.proximate = 'proximate' === a.layout && !this.chart.inverted
                    this.baseline = void 0
                }
                d.prototype.update = function (a, e) {
                    var g = this.chart
                    this.setOptions(K(!0, this.options, a))
                    this.destroy()
                    g.isDirtyLegend = g.isDirtyBox = !0
                    v(e, !0) && g.redraw()
                    I(this, 'afterUpdate')
                }
                d.prototype.colorizeItem = function (a, e) {
                    a.legendGroup[e ? 'removeClass' : 'addClass']('highcharts-legend-item-hidden')
                    if (!this.chart.styledMode) {
                        var g = this.options,
                            b = a.legendItem,
                            c = a.legendLine,
                            l = a.legendSymbol,
                            k = this.itemHiddenStyle.color
                        g = e ? g.itemStyle.color : k
                        var f = e ? a.color || k : k,
                            d = a.options && a.options.marker,
                            n = { fill: f }
                        b && b.css({ fill: g, color: g })
                        c && c.attr({ stroke: f })
                        l &&
                            (d &&
                                l.isMarker &&
                                ((n = a.pointAttribs()), e || (n.stroke = n.fill = k)),
                            l.attr(n))
                    }
                    I(this, 'afterColorizeItem', { item: a, visible: e })
                }
                d.prototype.positionItems = function () {
                    this.allItems.forEach(this.positionItem, this)
                    this.chart.isResizing || this.positionCheckboxes()
                }
                d.prototype.positionItem = function (a) {
                    var e = this,
                        g = this.options,
                        b = g.symbolPadding,
                        c = !g.rtl,
                        l = a._legendItemPos
                    g = l[0]
                    l = l[1]
                    var k = a.checkbox,
                        f = a.legendGroup
                    f &&
                        f.element &&
                        ((b = {
                            translateX: c ? g : this.legendWidth - g - 2 * b - 4,
                            translateY: l,
                        }),
                        (c = function () {
                            I(e, 'afterPositionItem', { item: a })
                        }),
                        m(f.translateY) ? f.animate(b, void 0, c) : (f.attr(b), c()))
                    k && ((k.x = g), (k.y = l))
                }
                d.prototype.destroyItem = function (a) {
                    var e = a.checkbox
                    ;['legendItem', 'legendLine', 'legendSymbol', 'legendGroup'].forEach(function (
                        e
                    ) {
                        a[e] && (a[e] = a[e].destroy())
                    })
                    e && D(a.checkbox)
                }
                d.prototype.destroy = function () {
                    function a(a) {
                        this[a] && (this[a] = this[a].destroy())
                    }
                    this.getAllItems().forEach(function (e) {
                        ;['legendItem', 'legendGroup'].forEach(a, e)
                    })
                    'clipRect up down pager nav box title group'.split(' ').forEach(a, this)
                    this.display = null
                }
                d.prototype.positionCheckboxes = function () {
                    var a = this.group && this.group.alignAttr,
                        e = this.clipHeight || this.legendHeight,
                        g = this.titleHeight
                    if (a) {
                        var b = a.translateY
                        this.allItems.forEach(function (c) {
                            var l = c.checkbox
                            if (l) {
                                var k = b + g + l.y + (this.scrollOffset || 0) + 3
                                n(l, {
                                    left: a.translateX + c.checkboxOffset + l.x - 20 + 'px',
                                    top: k + 'px',
                                    display:
                                        this.proximate || (k > b - 6 && k < b + e - 6)
                                            ? ''
                                            : 'none',
                                })
                            }
                        }, this)
                    }
                }
                d.prototype.renderTitle = function () {
                    var a = this.options,
                        e = this.padding,
                        g = a.title,
                        b = 0
                    g.text &&
                        (this.title ||
                            ((this.title = this.chart.renderer
                                .label(
                                    g.text,
                                    e - 3,
                                    e - 4,
                                    null,
                                    null,
                                    null,
                                    a.useHTML,
                                    null,
                                    'legend-title'
                                )
                                .attr({ zIndex: 1 })),
                            this.chart.styledMode || this.title.css(g.style),
                            this.title.add(this.group)),
                        g.width || this.title.css({ width: this.maxLegendWidth + 'px' }),
                        (a = this.title.getBBox()),
                        (b = a.height),
                        (this.offsetWidth = a.width),
                        this.contentGroup.attr({ translateY: b }))
                    this.titleHeight = b
                }
                d.prototype.setText = function (a) {
                    var e = this.options
                    a.legendItem.attr({
                        text: e.labelFormat
                            ? q(e.labelFormat, a, this.chart)
                            : e.labelFormatter.call(a),
                    })
                }
                d.prototype.renderItem = function (a) {
                    var e = this.chart,
                        g = e.renderer,
                        b = this.options,
                        c = this.symbolWidth,
                        k = b.symbolPadding || 0,
                        l = this.itemStyle,
                        f = this.itemHiddenStyle,
                        d = 'horizontal' === b.layout ? v(b.itemDistance, 20) : 0,
                        n = !b.rtl,
                        m = !a.series,
                        p = !m && a.series.drawLegendSymbol ? a.series : a,
                        h = p.options,
                        u = this.createCheckboxForItem && h && h.showCheckbox,
                        w = b.useHTML,
                        q = a.options.className,
                        Q = a.legendItem
                    h = c + k + d + (u ? 20 : 0)
                    Q ||
                        ((a.legendGroup = g
                            .g('legend-item')
                            .addClass(
                                'highcharts-' +
                                    p.type +
                                    '-series highcharts-color-' +
                                    a.colorIndex +
                                    (q ? ' ' + q : '') +
                                    (m ? ' highcharts-series-' + a.index : '')
                            )
                            .attr({ zIndex: 1 })
                            .add(this.scrollGroup)),
                        (a.legendItem = Q = g.text('', n ? c + k : -k, this.baseline || 0, w)),
                        e.styledMode || Q.css(K(a.visible ? l : f)),
                        Q.attr({ align: n ? 'left' : 'right', zIndex: 2 }).add(a.legendGroup),
                        this.baseline ||
                            ((this.fontMetrics = g.fontMetrics(e.styledMode ? 12 : l.fontSize, Q)),
                            (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
                            Q.attr('y', this.baseline),
                            (this.symbolHeight = b.symbolHeight || this.fontMetrics.f),
                            b.squareSymbol &&
                                ((this.symbolWidth = v(
                                    b.symbolWidth,
                                    Math.max(this.symbolHeight, 16)
                                )),
                                (h = this.symbolWidth + k + d + (u ? 20 : 0)),
                                n && Q.attr('x', this.symbolWidth + k))),
                        p.drawLegendSymbol(this, a),
                        this.setItemEvents && this.setItemEvents(a, Q, w))
                    u && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a)
                    this.colorizeItem(a, a.visible)
                    ;(!e.styledMode && l.width) ||
                        Q.css({
                            width:
                                (b.itemWidth || this.widthOption || e.spacingBox.width) - h + 'px',
                        })
                    this.setText(a)
                    e = Q.getBBox()
                    g = (this.fontMetrics && this.fontMetrics.h) || 0
                    a.itemWidth = a.checkboxOffset = b.itemWidth || a.legendItemWidth || e.width + h
                    this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth)
                    this.totalItemWidth += a.itemWidth
                    this.itemHeight = a.itemHeight = Math.round(
                        a.legendItemHeight || (e.height > 1.5 * g ? e.height : g)
                    )
                }
                d.prototype.layoutItem = function (a) {
                    var e = this.options,
                        g = this.padding,
                        b = 'horizontal' === e.layout,
                        c = a.itemHeight,
                        k = this.itemMarginBottom,
                        l = this.itemMarginTop,
                        f = b ? v(e.itemDistance, 20) : 0,
                        d = this.maxLegendWidth
                    e = e.alignColumns && this.totalItemWidth > d ? this.maxItemWidth : a.itemWidth
                    b &&
                        this.itemX - g + e > d &&
                        ((this.itemX = g),
                        this.lastLineHeight && (this.itemY += l + this.lastLineHeight + k),
                        (this.lastLineHeight = 0))
                    this.lastItemY = l + this.itemY + k
                    this.lastLineHeight = Math.max(c, this.lastLineHeight)
                    a._legendItemPos = [this.itemX, this.itemY]
                    b ? (this.itemX += e) : ((this.itemY += l + c + k), (this.lastLineHeight = c))
                    this.offsetWidth =
                        this.widthOption ||
                        Math.max(
                            (b ? this.itemX - g - (a.checkbox ? 0 : f) : e) + g,
                            this.offsetWidth
                        )
                }
                d.prototype.getAllItems = function () {
                    var a = []
                    this.chart.series.forEach(function (e) {
                        var g = e && e.options
                        e &&
                            v(g.showInLegend, m(g.linkedTo) ? !1 : void 0, !0) &&
                            (a = a.concat(e.legendItems || ('point' === g.legendType ? e.data : e)))
                    })
                    I(this, 'afterGetAllItems', { allItems: a })
                    return a
                }
                d.prototype.getAlignment = function () {
                    var a = this.options
                    return this.proximate
                        ? a.align.charAt(0) + 'tv'
                        : a.floating
                        ? ''
                        : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
                }
                d.prototype.adjustMargins = function (a, e) {
                    var g = this.chart,
                        b = this.options,
                        c = this.getAlignment()
                    c &&
                        [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(
                            function (k, l) {
                                k.test(c) &&
                                    !m(a[l]) &&
                                    (g[p[l]] = Math.max(
                                        g[p[l]],
                                        g.legend[(l + 1) % 2 ? 'legendHeight' : 'legendWidth'] +
                                            [1, -1, -1, 1][l] * b[l % 2 ? 'x' : 'y'] +
                                            v(b.margin, 12) +
                                            e[l] +
                                            (g.titleOffset[l] || 0)
                                    ))
                            }
                        )
                }
                d.prototype.proximatePositions = function () {
                    var a = this.chart,
                        e = [],
                        g = 'left' === this.options.align
                    this.allItems.forEach(function (b) {
                        var c
                        var k = g
                        if (b.yAxis) {
                            b.xAxis.options.reversed && (k = !k)
                            b.points &&
                                (c = C(k ? b.points : b.points.slice(0).reverse(), function (b) {
                                    return L(b.plotY)
                                }))
                            k =
                                this.itemMarginTop +
                                b.legendItem.getBBox().height +
                                this.itemMarginBottom
                            var l = b.yAxis.top - a.plotTop
                            b.visible
                                ? ((c = c ? c.plotY : b.yAxis.height), (c += l - 0.3 * k))
                                : (c = l + b.yAxis.height)
                            e.push({ target: c, size: k, item: b })
                        }
                    }, this)
                    f(e, a.plotHeight).forEach(function (b) {
                        b.item._legendItemPos &&
                            (b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos)
                    })
                }
                d.prototype.render = function () {
                    var a = this.chart,
                        e = a.renderer,
                        g = this.options,
                        b = this.padding,
                        c = this.getAllItems(),
                        k = this.group,
                        f = this.box
                    this.itemX = b
                    this.itemY = this.initialItemY
                    this.lastItemY = this.offsetWidth = 0
                    this.widthOption = z(g.width, a.spacingBox.width - b)
                    var d = a.spacingBox.width - 2 * b - g.x
                    ;-1 < ['rm', 'lm'].indexOf(this.getAlignment().substring(0, 2)) && (d /= 2)
                    this.maxLegendWidth = this.widthOption || d
                    k ||
                        ((this.group = k =
                            e
                                .g('legend')
                                .addClass(g.className || '')
                                .attr({ zIndex: 7 })
                                .add()),
                        (this.contentGroup = e.g().attr({ zIndex: 1 }).add(k)),
                        (this.scrollGroup = e.g().add(this.contentGroup)))
                    this.renderTitle()
                    u(c, function (b, a) {
                        return (
                            ((b.options && b.options.legendIndex) || 0) -
                            ((a.options && a.options.legendIndex) || 0)
                        )
                    })
                    g.reversed && c.reverse()
                    this.allItems = c
                    this.display = d = !!c.length
                    this.itemHeight =
                        this.totalItemWidth =
                        this.maxItemWidth =
                        this.lastLineHeight =
                            0
                    c.forEach(this.renderItem, this)
                    c.forEach(this.layoutItem, this)
                    c = (this.widthOption || this.offsetWidth) + b
                    var n = this.lastItemY + this.lastLineHeight + this.titleHeight
                    n = this.handleOverflow(n)
                    n += b
                    f ||
                        ((this.box = f =
                            e
                                .rect()
                                .addClass('highcharts-legend-box')
                                .attr({ r: g.borderRadius })
                                .add(k)),
                        (f.isNew = !0))
                    a.styledMode ||
                        f
                            .attr({
                                stroke: g.borderColor,
                                'stroke-width': g.borderWidth || 0,
                                fill: g.backgroundColor || 'none',
                            })
                            .shadow(g.shadow)
                    0 < c &&
                        0 < n &&
                        (f[f.isNew ? 'attr' : 'animate'](
                            f.crisp.call({}, { x: 0, y: 0, width: c, height: n }, f.strokeWidth())
                        ),
                        (f.isNew = !1))
                    f[d ? 'show' : 'hide']()
                    a.styledMode && 'none' === k.getStyle('display') && (c = n = 0)
                    this.legendWidth = c
                    this.legendHeight = n
                    d && this.align()
                    this.proximate || this.positionItems()
                    I(this, 'afterRender')
                }
                d.prototype.align = function (a) {
                    void 0 === a && (a = this.chart.spacingBox)
                    var e = this.chart,
                        g = this.options,
                        b = a.y
                    ;/(lth|ct|rth)/.test(this.getAlignment()) && 0 < e.titleOffset[0]
                        ? (b += e.titleOffset[0])
                        : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                          0 < e.titleOffset[2] &&
                          (b -= e.titleOffset[2])
                    b !== a.y && (a = K(a, { y: b }))
                    this.group.align(
                        K(g, {
                            width: this.legendWidth,
                            height: this.legendHeight,
                            verticalAlign: this.proximate ? 'top' : g.verticalAlign,
                        }),
                        !0,
                        a
                    )
                }
                d.prototype.handleOverflow = function (a) {
                    var e = this,
                        g = this.chart,
                        b = g.renderer,
                        c = this.options,
                        k = c.y,
                        f = 'top' === c.verticalAlign,
                        l = this.padding,
                        d = c.maxHeight,
                        n = c.navigation,
                        m = v(n.animation, !0),
                        p = n.arrowSize || 12,
                        h = this.pages,
                        u = this.allItems,
                        w = function (b) {
                            'number' === typeof b
                                ? C.attr({ height: b })
                                : C && ((e.clipRect = C.destroy()), e.contentGroup.clip())
                            e.contentGroup.div &&
                                (e.contentGroup.div.style.clip = b
                                    ? 'rect(' + l + 'px,9999px,' + (l + b) + 'px,0)'
                                    : 'auto')
                        },
                        q = function (a) {
                            e[a] = b
                                .circle(0, 0, 1.3 * p)
                                .translate(p / 2, p / 2)
                                .add(R)
                            g.styledMode || e[a].attr('fill', 'rgba(0,0,0,0.0001)')
                            return e[a]
                        },
                        Q,
                        z
                    k = g.spacingBox.height + (f ? -k : k) - l
                    var R = this.nav,
                        C = this.clipRect
                    'horizontal' !== c.layout ||
                        'middle' === c.verticalAlign ||
                        c.floating ||
                        (k /= 2)
                    d && (k = Math.min(k, d))
                    h.length = 0
                    a && 0 < k && a > k && !1 !== n.enabled
                        ? ((this.clipHeight = Q = Math.max(k - 20 - this.titleHeight - l, 0)),
                          (this.currentPage = v(this.currentPage, 1)),
                          (this.fullHeight = a),
                          u.forEach(function (b, a) {
                              var e = b._legendItemPos[1],
                                  g = Math.round(b.legendItem.getBBox().height),
                                  c = h.length
                              if (!c || (e - h[c - 1] > Q && (z || e) !== h[c - 1]))
                                  h.push(z || e), c++
                              b.pageIx = c - 1
                              z && (u[a - 1].pageIx = c - 1)
                              a === u.length - 1 &&
                                  e + g - h[c - 1] > Q &&
                                  g <= Q &&
                                  (h.push(e), (b.pageIx = c))
                              e !== z && (z = e)
                          }),
                          C ||
                              ((C = e.clipRect = b.clipRect(0, l, 9999, 0)),
                              e.contentGroup.clip(C)),
                          w(Q),
                          R ||
                              ((this.nav = R = b.g().attr({ zIndex: 1 }).add(this.group)),
                              (this.up = b.symbol('triangle', 0, 0, p, p).add(R)),
                              q('upTracker').on('click', function () {
                                  e.scroll(-1, m)
                              }),
                              (this.pager = b
                                  .text('', 15, 10)
                                  .addClass('highcharts-legend-navigation')),
                              g.styledMode || this.pager.css(n.style),
                              this.pager.add(R),
                              (this.down = b.symbol('triangle-down', 0, 0, p, p).add(R)),
                              q('downTracker').on('click', function () {
                                  e.scroll(1, m)
                              })),
                          e.scroll(0),
                          (a = k))
                        : R &&
                          (w(),
                          (this.nav = R.destroy()),
                          this.scrollGroup.attr({ translateY: 1 }),
                          (this.clipHeight = 0))
                    return a
                }
                d.prototype.scroll = function (a, e) {
                    var g = this,
                        b = this.chart,
                        c = this.pages,
                        f = c.length,
                        l = this.clipHeight,
                        d = this.options.navigation,
                        n = this.pager,
                        m = this.padding,
                        p = this.currentPage + a
                    p > f && (p = f)
                    0 < p &&
                        ('undefined' !== typeof e && y(e, b),
                        this.nav.attr({
                            translateX: m,
                            translateY: l + this.padding + 7 + this.titleHeight,
                            visibility: 'visible',
                        }),
                        [this.up, this.upTracker].forEach(function (b) {
                            b.attr({
                                class:
                                    1 === p
                                        ? 'highcharts-legend-nav-inactive'
                                        : 'highcharts-legend-nav-active',
                            })
                        }),
                        n.attr({ text: p + '/' + f }),
                        [this.down, this.downTracker].forEach(function (b) {
                            b.attr({
                                x: 18 + this.pager.getBBox().width,
                                class:
                                    p === f
                                        ? 'highcharts-legend-nav-inactive'
                                        : 'highcharts-legend-nav-active',
                            })
                        }, this),
                        b.styledMode ||
                            (this.up.attr({ fill: 1 === p ? d.inactiveColor : d.activeColor }),
                            this.upTracker.css({ cursor: 1 === p ? 'default' : 'pointer' }),
                            this.down.attr({ fill: p === f ? d.inactiveColor : d.activeColor }),
                            this.downTracker.css({ cursor: p === f ? 'default' : 'pointer' })),
                        (this.scrollOffset = -c[p - 1] + this.initialItemY),
                        this.scrollGroup.animate({ translateY: this.scrollOffset }),
                        (this.currentPage = p),
                        this.positionCheckboxes(),
                        (a = E(v(e, b.renderer.globalAnimation, !0))),
                        k(function () {
                            I(g, 'afterScroll', { currentPage: p })
                        }, a.duration))
                }
                d.prototype.setItemEvents = function (a, e, g) {
                    var b = this,
                        c = b.chart.renderer.boxWrapper,
                        k = a instanceof F,
                        f = 'highcharts-legend-' + (k ? 'point' : 'series') + '-active',
                        l = b.chart.styledMode,
                        d = function (e) {
                            b.allItems.forEach(function (b) {
                                a !== b &&
                                    [b].concat(b.linkedSeries || []).forEach(function (b) {
                                        b.setState(e, !k)
                                    })
                            })
                        }
                    ;(g ? [e, a.legendSymbol] : [a.legendGroup]).forEach(function (g) {
                        if (g)
                            g.on('mouseover', function () {
                                a.visible && d('inactive')
                                a.setState('hover')
                                a.visible && c.addClass(f)
                                l || e.css(b.options.itemHoverStyle)
                            })
                                .on('mouseout', function () {
                                    b.chart.styledMode ||
                                        e.css(K(a.visible ? b.itemStyle : b.itemHiddenStyle))
                                    d('')
                                    c.removeClass(f)
                                    a.setState()
                                })
                                .on('click', function (b) {
                                    var e = function () {
                                        a.setVisible && a.setVisible()
                                        d(a.visible ? 'inactive' : '')
                                    }
                                    c.removeClass(f)
                                    b = { browserEvent: b }
                                    a.firePointEvent
                                        ? a.firePointEvent('legendItemClick', b, e)
                                        : I(a, 'legendItemClick', b, e)
                                })
                    })
                }
                d.prototype.createCheckboxForItem = function (k) {
                    k.checkbox = a(
                        'input',
                        {
                            type: 'checkbox',
                            className: 'highcharts-legend-checkbox',
                            checked: k.selected,
                            defaultChecked: k.selected,
                        },
                        this.options.itemCheckboxStyle,
                        this.chart.container
                    )
                    c(k.checkbox, 'click', function (a) {
                        I(
                            k.series || k,
                            'checkboxClick',
                            { checked: a.target.checked, item: k },
                            function () {
                                k.select()
                            }
                        )
                    })
                }
                return d
            })()
            ;(/Trident\/7\.0/.test(A.navigator && A.navigator.userAgent) || d) &&
                t(G.prototype, 'positionItem', function (a, c) {
                    var e = this,
                        g = function () {
                            c._legendItemPos && a.call(e, c)
                        }
                    g()
                    e.bubbleLegend || setTimeout(g)
                })
            ;('')
            return G
        }
    )
    N(
        h,
        'Core/Series/SeriesRegistry.js',
        [
            h['Core/Globals.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Series/Point.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t = h.defaultOptions,
                E = F.error,
                H = F.extendClass,
                y = F.merge,
                q
            ;(function (p) {
                function f(c, a) {
                    var f = t.plotOptions || {},
                        d = a.defaultOptions
                    a.prototype.pointClass || (a.prototype.pointClass = A)
                    a.prototype.type = c
                    d && (f[c] = d)
                    p.seriesTypes[c] = a
                }
                p.seriesTypes = d.seriesTypes
                p.getSeries = function (c, a) {
                    void 0 === a && (a = {})
                    var f = c.options.chart
                    f = a.type || f.type || f.defaultSeriesType || ''
                    var d = p.seriesTypes[f]
                    p || E(17, !0, c, { missingModuleFor: f })
                    f = new d()
                    'function' === typeof f.init && f.init(c, a)
                    return f
                }
                p.registerSeriesType = f
                p.seriesType = function (c, a, d, m, h) {
                    var n = t.plotOptions || {}
                    a = a || ''
                    n[c] = y(n[a], d)
                    f(c, H(p.seriesTypes[a] || function () {}, m))
                    p.seriesTypes[c].prototype.type = c
                    h && (p.seriesTypes[c].prototype.pointClass = H(A, h))
                    return p.seriesTypes[c]
                }
            })(q || (q = {}))
            return q
        }
    )
    N(
        h,
        'Core/Chart/Chart.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Axis/Axis.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Foundation.js'],
            h['Core/Globals.js'],
            h['Core/Legend/Legend.js'],
            h['Core/MSPointer.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Pointer.js'],
            h['Core/Renderer/RendererRegistry.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Renderer/SVG/SVGRenderer.js'],
            h['Core/Time.js'],
            h['Core/Utilities.js'],
            h['Core/Renderer/HTML/AST.js'],
        ],
        function (d, h, A, F, t, G, H, y, q, p, f, c, a, n, m) {
            var D = d.animate,
                C = d.animObject,
                I = d.setAnimation,
                L = A.numberFormat,
                K = F.registerEventOptions,
                v = t.charts,
                z = t.doc,
                u = t.marginNames,
                k = t.svg,
                w = t.win,
                l = y.defaultOptions,
                e = y.defaultTime,
                g = f.seriesTypes,
                b = n.addEvent,
                B = n.attr,
                J = n.cleanRecursively,
                r = n.createElement,
                x = n.css,
                M = n.defined,
                X = n.discardElement,
                P = n.erase,
                O = n.error,
                W = n.extend,
                Z = n.find,
                E = n.fireEvent,
                aa = n.getStyle,
                Q = n.isArray,
                ba = n.isNumber,
                R = n.isObject,
                ca = n.isString,
                T = n.merge,
                U = n.objectEach,
                S = n.pick,
                da = n.pInt,
                ia = n.relativeLength,
                N = n.removeEvent,
                fa = n.splat,
                Y = n.syncTimeout,
                ja = n.uniqueKey
            d = (function () {
                function f(b, a, e) {
                    this.series =
                        this.renderTo =
                        this.renderer =
                        this.pointer =
                        this.pointCount =
                        this.plotWidth =
                        this.plotTop =
                        this.plotLeft =
                        this.plotHeight =
                        this.plotBox =
                        this.options =
                        this.numberFormatter =
                        this.margin =
                        this.legend =
                        this.labelCollectors =
                        this.isResizing =
                        this.index =
                        this.eventOptions =
                        this.container =
                        this.colorCounter =
                        this.clipBox =
                        this.chartWidth =
                        this.chartHeight =
                        this.bounds =
                        this.axisOffset =
                        this.axes =
                            void 0
                    this.sharedClips = {}
                    this.yAxis =
                        this.xAxis =
                        this.userOptions =
                        this.titleOffset =
                        this.time =
                        this.symbolCounter =
                        this.spacingBox =
                        this.spacing =
                            void 0
                    this.getArgs(b, a, e)
                }
                f.chart = function (b, a, e) {
                    return new f(b, a, e)
                }
                f.prototype.getArgs = function (b, a, e) {
                    ca(b) || b.nodeName ? ((this.renderTo = b), this.init(a, e)) : this.init(b, a)
                }
                f.prototype.init = function (b, e) {
                    var g = b.plotOptions || {}
                    E(this, 'init', { args: arguments }, function () {
                        var c = T(l, b),
                            f = c.chart
                        U(c.plotOptions, function (b, a) {
                            R(b) && (b.tooltip = (g[a] && T(g[a].tooltip)) || void 0)
                        })
                        c.tooltip.userOptions =
                            (b.chart && b.chart.forExport && b.tooltip.userOptions) || b.tooltip
                        this.userOptions = b
                        this.margin = []
                        this.spacing = []
                        this.bounds = { h: {}, v: {} }
                        this.labelCollectors = []
                        this.callback = e
                        this.isResizing = 0
                        this.options = c
                        this.axes = []
                        this.series = []
                        this.time = b.time && Object.keys(b.time).length ? new a(b.time) : t.time
                        this.numberFormatter = f.numberFormatter || L
                        this.styledMode = f.styledMode
                        this.hasCartesianSeries = f.showAxes
                        this.index = v.length
                        v.push(this)
                        t.chartCount++
                        K(this, f)
                        this.xAxis = []
                        this.yAxis = []
                        this.pointCount = this.colorCounter = this.symbolCounter = 0
                        E(this, 'afterInit')
                        this.firstRender()
                    })
                }
                f.prototype.initSeries = function (b) {
                    var a = this.options.chart
                    a = b.type || a.type || a.defaultSeriesType
                    var e = g[a]
                    e || O(17, !0, this, { missingModuleFor: a })
                    a = new e()
                    'function' === typeof a.init && a.init(this, b)
                    return a
                }
                f.prototype.setSeriesData = function () {
                    this.getSeriesOrderByLinks().forEach(function (b) {
                        b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
                    })
                }
                f.prototype.getSeriesOrderByLinks = function () {
                    return this.series.concat().sort(function (b, a) {
                        return b.linkedSeries.length || a.linkedSeries.length
                            ? a.linkedSeries.length - b.linkedSeries.length
                            : 0
                    })
                }
                f.prototype.orderSeries = function (b) {
                    var a = this.series
                    b = b || 0
                    for (var e = a.length; b < e; ++b)
                        a[b] && ((a[b].index = b), (a[b].name = a[b].getName()))
                }
                f.prototype.isInsidePlot = function (b, a, e) {
                    void 0 === e && (e = {})
                    var g = this.inverted,
                        c = this.plotBox,
                        f = this.plotLeft,
                        k = this.plotTop,
                        l = this.scrollablePlotBox,
                        d = 0
                    var r = 0
                    e.visiblePlotOnly &&
                        this.scrollingContainer &&
                        ((r = this.scrollingContainer), (d = r.scrollLeft), (r = r.scrollTop))
                    var x = e.series
                    c = (e.visiblePlotOnly && l) || c
                    l = e.inverted ? a : b
                    a = e.inverted ? b : a
                    b = { x: l, y: a, isInsidePlot: !0 }
                    if (!e.ignoreX) {
                        var n = (x && (g ? x.yAxis : x.xAxis)) || { pos: f, len: Infinity }
                        l = e.paneCoordinates ? n.pos + l : f + l
                        ;(l >= Math.max(d + f, n.pos) &&
                            l <= Math.min(d + f + c.width, n.pos + n.len)) ||
                            (b.isInsidePlot = !1)
                    }
                    !e.ignoreY &&
                        b.isInsidePlot &&
                        ((g = (x && (g ? x.xAxis : x.yAxis)) || { pos: k, len: Infinity }),
                        (e = e.paneCoordinates ? g.pos + a : k + a),
                        (e >= Math.max(r + k, g.pos) &&
                            e <= Math.min(r + k + c.height, g.pos + g.len)) ||
                            (b.isInsidePlot = !1))
                    E(this, 'afterIsInsidePlot', b)
                    return b.isInsidePlot
                }
                f.prototype.redraw = function (b) {
                    E(this, 'beforeRedraw')
                    var a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                        e = this.series,
                        g = this.pointer,
                        c = this.legend,
                        f = this.userOptions.legend,
                        k = this.renderer,
                        l = k.isHidden(),
                        d = [],
                        r = this.isDirtyBox,
                        x = this.isDirtyLegend
                    this.setResponsive && this.setResponsive(!1)
                    I(this.hasRendered ? b : !1, this)
                    l && this.temporaryDisplay()
                    this.layOutTitles()
                    for (b = e.length; b--; ) {
                        var n = e[b]
                        if (n.options.stacking || n.options.centerInCategory) {
                            var m = !0
                            if (n.isDirty) {
                                var p = !0
                                break
                            }
                        }
                    }
                    if (p)
                        for (b = e.length; b--; ) (n = e[b]), n.options.stacking && (n.isDirty = !0)
                    e.forEach(function (b) {
                        b.isDirty &&
                            ('point' === b.options.legendType
                                ? ('function' === typeof b.updateTotals && b.updateTotals(),
                                  (x = !0))
                                : f && (f.labelFormatter || f.labelFormat) && (x = !0))
                        b.isDirtyData && E(b, 'updatedData')
                    })
                    x && c && c.options.enabled && (c.render(), (this.isDirtyLegend = !1))
                    m && this.getStacks()
                    a.forEach(function (b) {
                        b.updateNames()
                        b.setScale()
                    })
                    this.getMargins()
                    a.forEach(function (b) {
                        b.isDirty && (r = !0)
                    })
                    a.forEach(function (b) {
                        var a = b.min + ',' + b.max
                        b.extKey !== a &&
                            ((b.extKey = a),
                            d.push(function () {
                                E(b, 'afterSetExtremes', W(b.eventArgs, b.getExtremes()))
                                delete b.eventArgs
                            }))
                        ;(r || m) && b.redraw()
                    })
                    r && this.drawChartBox()
                    E(this, 'predraw')
                    e.forEach(function (b) {
                        ;(r || b.isDirty) && b.visible && b.redraw()
                        b.isDirtyData = !1
                    })
                    g && g.reset(!0)
                    k.draw()
                    E(this, 'redraw')
                    E(this, 'render')
                    l && this.temporaryDisplay(!0)
                    d.forEach(function (b) {
                        b.call()
                    })
                }
                f.prototype.get = function (b) {
                    function a(a) {
                        return a.id === b || (a.options && a.options.id === b)
                    }
                    for (
                        var e = this.series, g = Z(this.axes, a) || Z(this.series, a), c = 0;
                        !g && c < e.length;
                        c++
                    )
                        g = Z(e[c].points || [], a)
                    return g
                }
                f.prototype.getAxes = function () {
                    var b = this,
                        a = this.options,
                        e = (a.xAxis = fa(a.xAxis || {}))
                    a = a.yAxis = fa(a.yAxis || {})
                    E(this, 'getAxes')
                    e.forEach(function (b, a) {
                        b.index = a
                        b.isX = !0
                    })
                    a.forEach(function (b, a) {
                        b.index = a
                    })
                    e.concat(a).forEach(function (a) {
                        new h(b, a)
                    })
                    E(this, 'afterGetAxes')
                }
                f.prototype.getSelectedPoints = function () {
                    return this.series.reduce(function (b, a) {
                        a.getPointsCollection().forEach(function (a) {
                            S(a.selectedStaging, a.selected) && b.push(a)
                        })
                        return b
                    }, [])
                }
                f.prototype.getSelectedSeries = function () {
                    return this.series.filter(function (b) {
                        return b.selected
                    })
                }
                f.prototype.setTitle = function (b, a, e) {
                    this.applyDescription('title', b)
                    this.applyDescription('subtitle', a)
                    this.applyDescription('caption', void 0)
                    this.layOutTitles(e)
                }
                f.prototype.applyDescription = function (b, a) {
                    var e = this,
                        g =
                            'title' === b
                                ? {
                                      color: '#333333',
                                      fontSize: this.options.isStock ? '16px' : '18px',
                                  }
                                : { color: '#666666' }
                    g = this.options[b] = T(!this.styledMode && { style: g }, this.options[b], a)
                    var c = this[b]
                    c && a && (this[b] = c = c.destroy())
                    g &&
                        !c &&
                        ((c = this.renderer
                            .text(g.text, 0, 0, g.useHTML)
                            .attr({
                                align: g.align,
                                class: 'highcharts-' + b,
                                zIndex: g.zIndex || 4,
                            })
                            .add()),
                        (c.update = function (a) {
                            e[
                                {
                                    title: 'setTitle',
                                    subtitle: 'setSubtitle',
                                    caption: 'setCaption',
                                }[b]
                            ](a)
                        }),
                        this.styledMode || c.css(g.style),
                        (this[b] = c))
                }
                f.prototype.layOutTitles = function (b) {
                    var a = [0, 0, 0],
                        e = this.renderer,
                        g = this.spacingBox
                    ;['title', 'subtitle', 'caption'].forEach(function (b) {
                        var c = this[b],
                            f = this.options[b],
                            k = f.verticalAlign || 'top'
                        b = 'title' === b ? ('top' === k ? -3 : 0) : 'top' === k ? a[0] + 2 : 0
                        var l
                        if (c) {
                            this.styledMode || (l = f.style && f.style.fontSize)
                            l = e.fontMetrics(l, c).b
                            c.css({ width: (f.width || g.width + (f.widthAdjust || 0)) + 'px' })
                            var d = Math.round(c.getBBox(f.useHTML).height)
                            c.align(
                                W({ y: 'bottom' === k ? l : b + l, height: d }, f),
                                !1,
                                'spacingBox'
                            )
                            f.floating ||
                                ('top' === k
                                    ? (a[0] = Math.ceil(a[0] + d))
                                    : 'bottom' === k && (a[2] = Math.ceil(a[2] + d)))
                        }
                    }, this)
                    a[0] &&
                        'top' === (this.options.title.verticalAlign || 'top') &&
                        (a[0] += this.options.title.margin)
                    a[2] &&
                        'bottom' === this.options.caption.verticalAlign &&
                        (a[2] += this.options.caption.margin)
                    var c = !this.titleOffset || this.titleOffset.join(',') !== a.join(',')
                    this.titleOffset = a
                    E(this, 'afterLayOutTitles')
                    !this.isDirtyBox &&
                        c &&
                        ((this.isDirtyBox = this.isDirtyLegend = c),
                        this.hasRendered && S(b, !0) && this.isDirtyBox && this.redraw())
                }
                f.prototype.getChartSize = function () {
                    var b = this.options.chart,
                        a = b.width
                    b = b.height
                    var e = this.renderTo
                    M(a) || (this.containerWidth = aa(e, 'width'))
                    M(b) || (this.containerHeight = aa(e, 'height'))
                    this.chartWidth = Math.max(0, a || this.containerWidth || 600)
                    this.chartHeight = Math.max(
                        0,
                        ia(b, this.chartWidth) ||
                            (1 < this.containerHeight ? this.containerHeight : 400)
                    )
                }
                f.prototype.temporaryDisplay = function (b) {
                    var a = this.renderTo
                    if (b)
                        for (; a && a.style; )
                            a.hcOrigStyle && (x(a, a.hcOrigStyle), delete a.hcOrigStyle),
                                a.hcOrigDetached &&
                                    (z.body.removeChild(a), (a.hcOrigDetached = !1)),
                                (a = a.parentNode)
                    else
                        for (; a && a.style; ) {
                            z.body.contains(a) ||
                                a.parentNode ||
                                ((a.hcOrigDetached = !0), z.body.appendChild(a))
                            if ('none' === aa(a, 'display', !1) || a.hcOricDetached)
                                (a.hcOrigStyle = {
                                    display: a.style.display,
                                    height: a.style.height,
                                    overflow: a.style.overflow,
                                }),
                                    (b = { display: 'block', overflow: 'hidden' }),
                                    a !== this.renderTo && (b.height = 0),
                                    x(a, b),
                                    a.offsetWidth ||
                                        a.style.setProperty('display', 'block', 'important')
                            a = a.parentNode
                            if (a === z.body) break
                        }
                }
                f.prototype.setClassName = function (b) {
                    this.container.className = 'highcharts-container ' + (b || '')
                }
                f.prototype.getContainer = function () {
                    var b = this.options,
                        a = b.chart,
                        e = ja(),
                        g,
                        f = this.renderTo
                    f || (this.renderTo = f = a.renderTo)
                    ca(f) && (this.renderTo = f = z.getElementById(f))
                    f || O(13, !0, this)
                    var l = da(B(f, 'data-highcharts-chart'))
                    ba(l) && v[l] && v[l].hasRendered && v[l].destroy()
                    B(f, 'data-highcharts-chart', this.index)
                    f.innerHTML = m.emptyHTML
                    a.skipClone || f.offsetWidth || this.temporaryDisplay()
                    this.getChartSize()
                    l = this.chartWidth
                    var d = this.chartHeight
                    x(f, { overflow: 'hidden' })
                    this.styledMode ||
                        (g = W(
                            {
                                position: 'relative',
                                overflow: 'hidden',
                                width: l + 'px',
                                height: d + 'px',
                                textAlign: 'left',
                                lineHeight: 'normal',
                                zIndex: 0,
                                '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                                userSelect: 'none',
                                'touch-action': 'manipulation',
                                outline: 'none',
                            },
                            a.style || {}
                        ))
                    this.container = e = r('div', { id: e }, g, f)
                    this._cursor = e.style.cursor
                    this.renderer = new (a.renderer || !k ? p.getRendererType(a.renderer) : c)(
                        e,
                        l,
                        d,
                        void 0,
                        a.forExport,
                        b.exporting && b.exporting.allowHTML,
                        this.styledMode
                    )
                    I(void 0, this)
                    this.setClassName(a.className)
                    if (this.styledMode) for (var n in b.defs) this.renderer.definition(b.defs[n])
                    else this.renderer.setStyle(a.style)
                    this.renderer.chartIndex = this.index
                    E(this, 'afterGetContainer')
                }
                f.prototype.getMargins = function (b) {
                    var a = this.spacing,
                        e = this.margin,
                        g = this.titleOffset
                    this.resetMargins()
                    g[0] && !M(e[0]) && (this.plotTop = Math.max(this.plotTop, g[0] + a[0]))
                    g[2] &&
                        !M(e[2]) &&
                        (this.marginBottom = Math.max(this.marginBottom, g[2] + a[2]))
                    this.legend && this.legend.display && this.legend.adjustMargins(e, a)
                    E(this, 'getMargins')
                    b || this.getAxisMargins()
                }
                f.prototype.getAxisMargins = function () {
                    var b = this,
                        a = (b.axisOffset = [0, 0, 0, 0]),
                        e = b.colorAxis,
                        g = b.margin,
                        c = function (b) {
                            b.forEach(function (b) {
                                b.visible && b.getOffset()
                            })
                        }
                    b.hasCartesianSeries ? c(b.axes) : e && e.length && c(e)
                    u.forEach(function (e, c) {
                        M(g[c]) || (b[e] += a[c])
                    })
                    b.setChartSize()
                }
                f.prototype.reflow = function (b) {
                    var a = this,
                        e = a.options.chart,
                        g = a.renderTo,
                        c = M(e.width) && M(e.height),
                        f = e.width || aa(g, 'width')
                    e = e.height || aa(g, 'height')
                    g = b ? b.target : w
                    delete a.pointer.chartPosition
                    if (!c && !a.isPrinting && f && e && (g === w || g === z)) {
                        if (f !== a.containerWidth || e !== a.containerHeight)
                            n.clearTimeout(a.reflowTimeout),
                                (a.reflowTimeout = Y(
                                    function () {
                                        a.container && a.setSize(void 0, void 0, !1)
                                    },
                                    b ? 100 : 0
                                ))
                        a.containerWidth = f
                        a.containerHeight = e
                    }
                }
                f.prototype.setReflow = function (a) {
                    var e = this
                    !1 === a || this.unbindReflow
                        ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow())
                        : ((this.unbindReflow = b(w, 'resize', function (b) {
                              e.options && e.reflow(b)
                          })),
                          b(this, 'destroy', this.unbindReflow))
                }
                f.prototype.setSize = function (b, a, e) {
                    var g = this,
                        c = g.renderer
                    g.isResizing += 1
                    I(e, g)
                    e = c.globalAnimation
                    g.oldChartHeight = g.chartHeight
                    g.oldChartWidth = g.chartWidth
                    'undefined' !== typeof b && (g.options.chart.width = b)
                    'undefined' !== typeof a && (g.options.chart.height = a)
                    g.getChartSize()
                    g.styledMode ||
                        (e ? D : x)(
                            g.container,
                            { width: g.chartWidth + 'px', height: g.chartHeight + 'px' },
                            e
                        )
                    g.setChartSize(!0)
                    c.setSize(g.chartWidth, g.chartHeight, e)
                    g.axes.forEach(function (b) {
                        b.isDirty = !0
                        b.setScale()
                    })
                    g.isDirtyLegend = !0
                    g.isDirtyBox = !0
                    g.layOutTitles()
                    g.getMargins()
                    g.redraw(e)
                    g.oldChartHeight = null
                    E(g, 'resize')
                    Y(function () {
                        g &&
                            E(g, 'endResize', null, function () {
                                --g.isResizing
                            })
                    }, C(e).duration)
                }
                f.prototype.setChartSize = function (b) {
                    var a = this.inverted,
                        e = this.renderer,
                        g = this.chartWidth,
                        c = this.chartHeight,
                        f = this.options.chart,
                        k = this.spacing,
                        l = this.clipOffset,
                        d,
                        r,
                        x,
                        n
                    this.plotLeft = d = Math.round(this.plotLeft)
                    this.plotTop = r = Math.round(this.plotTop)
                    this.plotWidth = x = Math.max(0, Math.round(g - d - this.marginRight))
                    this.plotHeight = n = Math.max(0, Math.round(c - r - this.marginBottom))
                    this.plotSizeX = a ? n : x
                    this.plotSizeY = a ? x : n
                    this.plotBorderWidth = f.plotBorderWidth || 0
                    this.spacingBox = e.spacingBox = {
                        x: k[3],
                        y: k[0],
                        width: g - k[3] - k[1],
                        height: c - k[0] - k[2],
                    }
                    this.plotBox = e.plotBox = { x: d, y: r, width: x, height: n }
                    a = 2 * Math.floor(this.plotBorderWidth / 2)
                    g = Math.ceil(Math.max(a, l[3]) / 2)
                    c = Math.ceil(Math.max(a, l[0]) / 2)
                    this.clipBox = {
                        x: g,
                        y: c,
                        width: Math.floor(this.plotSizeX - Math.max(a, l[1]) / 2 - g),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, l[2]) / 2 - c)),
                    }
                    b ||
                        (this.axes.forEach(function (b) {
                            b.setAxisSize()
                            b.setAxisTranslation()
                        }),
                        e.alignElements())
                    E(this, 'afterSetChartSize', { skipAxes: b })
                }
                f.prototype.resetMargins = function () {
                    E(this, 'resetMargins')
                    var b = this,
                        a = b.options.chart
                    ;['margin', 'spacing'].forEach(function (e) {
                        var g = a[e],
                            c = R(g) ? g : [g, g, g, g]
                        ;['Top', 'Right', 'Bottom', 'Left'].forEach(function (g, f) {
                            b[e][f] = S(a[e + g], c[f])
                        })
                    })
                    u.forEach(function (a, e) {
                        b[a] = S(b.margin[e], b.spacing[e])
                    })
                    b.axisOffset = [0, 0, 0, 0]
                    b.clipOffset = [0, 0, 0, 0]
                }
                f.prototype.drawChartBox = function () {
                    var b = this.options.chart,
                        a = this.renderer,
                        e = this.chartWidth,
                        g = this.chartHeight,
                        c = this.styledMode,
                        f = this.plotBGImage,
                        k = b.backgroundColor,
                        l = b.plotBackgroundColor,
                        d = b.plotBackgroundImage,
                        r = this.plotLeft,
                        x = this.plotTop,
                        n = this.plotWidth,
                        m = this.plotHeight,
                        p = this.plotBox,
                        h = this.clipRect,
                        B = this.clipBox,
                        u = this.chartBackground,
                        w = this.plotBackground,
                        J = this.plotBorder,
                        v,
                        q = 'animate'
                    u ||
                        ((this.chartBackground = u =
                            a.rect().addClass('highcharts-background').add()),
                        (q = 'attr'))
                    if (c) var Q = (v = u.strokeWidth())
                    else {
                        Q = b.borderWidth || 0
                        v = Q + (b.shadow ? 8 : 0)
                        k = { fill: k || 'none' }
                        if (Q || u['stroke-width'])
                            (k.stroke = b.borderColor), (k['stroke-width'] = Q)
                        u.attr(k).shadow(b.shadow)
                    }
                    u[q]({
                        x: v / 2,
                        y: v / 2,
                        width: e - v - (Q % 2),
                        height: g - v - (Q % 2),
                        r: b.borderRadius,
                    })
                    q = 'animate'
                    w ||
                        ((q = 'attr'),
                        (this.plotBackground = w =
                            a.rect().addClass('highcharts-plot-background').add()))
                    w[q](p)
                    c ||
                        (w.attr({ fill: l || 'none' }).shadow(b.plotShadow),
                        d &&
                            (f
                                ? (d !== f.attr('href') && f.attr('href', d), f.animate(p))
                                : (this.plotBGImage = a.image(d, r, x, n, m).add())))
                    h
                        ? h.animate({ width: B.width, height: B.height })
                        : (this.clipRect = a.clipRect(B))
                    q = 'animate'
                    J ||
                        ((q = 'attr'),
                        (this.plotBorder = J =
                            a.rect().addClass('highcharts-plot-border').attr({ zIndex: 1 }).add()))
                    c ||
                        J.attr({
                            stroke: b.plotBorderColor,
                            'stroke-width': b.plotBorderWidth || 0,
                            fill: 'none',
                        })
                    J[q](J.crisp({ x: r, y: x, width: n, height: m }, -J.strokeWidth()))
                    this.isDirtyBox = !1
                    E(this, 'afterDrawChartBox')
                }
                f.prototype.propFromSeries = function () {
                    var b = this,
                        a = b.options.chart,
                        e = b.options.series,
                        c,
                        f,
                        k
                    ;['inverted', 'angular', 'polar'].forEach(function (l) {
                        f = g[a.type || a.defaultSeriesType]
                        k = a[l] || (f && f.prototype[l])
                        for (c = e && e.length; !k && c--; )
                            (f = g[e[c].type]) && f.prototype[l] && (k = !0)
                        b[l] = k
                    })
                }
                f.prototype.linkSeries = function () {
                    var b = this,
                        a = b.series
                    a.forEach(function (b) {
                        b.linkedSeries.length = 0
                    })
                    a.forEach(function (a) {
                        var e = a.options.linkedTo
                        ca(e) &&
                            (e = ':previous' === e ? b.series[a.index - 1] : b.get(e)) &&
                            e.linkedParent !== a &&
                            (e.linkedSeries.push(a),
                            (a.linkedParent = e),
                            e.enabledDataSorting && a.setDataSortingOptions(),
                            (a.visible = S(a.options.visible, e.options.visible, a.visible)))
                    })
                    E(this, 'afterLinkSeries')
                }
                f.prototype.renderSeries = function () {
                    this.series.forEach(function (b) {
                        b.translate()
                        b.render()
                    })
                }
                f.prototype.renderLabels = function () {
                    var b = this,
                        a = b.options.labels
                    a.items &&
                        a.items.forEach(function (e) {
                            var g = W(a.style, e.style),
                                c = da(g.left) + b.plotLeft,
                                f = da(g.top) + b.plotTop + 12
                            delete g.left
                            delete g.top
                            b.renderer.text(e.html, c, f).attr({ zIndex: 2 }).css(g).add()
                        })
                }
                f.prototype.render = function () {
                    var b = this.axes,
                        a = this.colorAxis,
                        e = this.renderer,
                        g = this.options,
                        c = function (b) {
                            b.forEach(function (b) {
                                b.visible && b.render()
                            })
                        },
                        f = 0
                    this.setTitle()
                    this.legend = new G(this, g.legend)
                    this.getStacks && this.getStacks()
                    this.getMargins(!0)
                    this.setChartSize()
                    g = this.plotWidth
                    b.some(function (b) {
                        if (b.horiz && b.visible && b.options.labels.enabled && b.series.length)
                            return (f = 21), !0
                    })
                    var k = (this.plotHeight = Math.max(this.plotHeight - f, 0))
                    b.forEach(function (b) {
                        b.setScale()
                    })
                    this.getAxisMargins()
                    var l = 1.1 < g / this.plotWidth,
                        d = 1.05 < k / this.plotHeight
                    if (l || d)
                        b.forEach(function (b) {
                            ;((b.horiz && l) || (!b.horiz && d)) && b.setTickInterval(!0)
                        }),
                            this.getMargins()
                    this.drawChartBox()
                    this.hasCartesianSeries ? c(b) : a && a.length && c(a)
                    this.seriesGroup ||
                        (this.seriesGroup = e.g('series-group').attr({ zIndex: 3 }).add())
                    this.renderSeries()
                    this.renderLabels()
                    this.addCredits()
                    this.setResponsive && this.setResponsive()
                    this.hasRendered = !0
                }
                f.prototype.addCredits = function (b) {
                    var a = this,
                        e = T(!0, this.options.credits, b)
                    e.enabled &&
                        !this.credits &&
                        ((this.credits = this.renderer
                            .text(e.text + (this.mapCredits || ''), 0, 0)
                            .addClass('highcharts-credits')
                            .on('click', function () {
                                e.href && (w.location.href = e.href)
                            })
                            .attr({ align: e.position.align, zIndex: 8 })),
                        a.styledMode || this.credits.css(e.style),
                        this.credits.add().align(e.position),
                        (this.credits.update = function (b) {
                            a.credits = a.credits.destroy()
                            a.addCredits(b)
                        }))
                }
                f.prototype.destroy = function () {
                    var b = this,
                        a = b.axes,
                        e = b.series,
                        g = b.container,
                        c = g && g.parentNode,
                        f
                    E(b, 'destroy')
                    b.renderer.forExport ? P(v, b) : (v[b.index] = void 0)
                    t.chartCount--
                    b.renderTo.removeAttribute('data-highcharts-chart')
                    N(b)
                    for (f = a.length; f--; ) a[f] = a[f].destroy()
                    this.scroller && this.scroller.destroy && this.scroller.destroy()
                    for (f = e.length; f--; ) e[f] = e[f].destroy()
                    'title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer'
                        .split(' ')
                        .forEach(function (a) {
                            var e = b[a]
                            e && e.destroy && (b[a] = e.destroy())
                        })
                    g && ((g.innerHTML = m.emptyHTML), N(g), c && X(g))
                    U(b, function (a, e) {
                        delete b[e]
                    })
                }
                f.prototype.firstRender = function () {
                    var b = this,
                        a = b.options
                    if (!b.isReadyToRender || b.isReadyToRender()) {
                        b.getContainer()
                        b.resetMargins()
                        b.setChartSize()
                        b.propFromSeries()
                        b.getAxes()
                        ;(Q(a.series) ? a.series : []).forEach(function (a) {
                            b.initSeries(a)
                        })
                        b.linkSeries()
                        b.setSeriesData()
                        E(b, 'beforeRender')
                        q &&
                            (H.isRequired() ? (b.pointer = new H(b, a)) : (b.pointer = new q(b, a)))
                        b.render()
                        b.pointer.getChartPosition()
                        if (!b.renderer.imgCount && !b.hasLoaded) b.onload()
                        b.temporaryDisplay(!0)
                    }
                }
                f.prototype.onload = function () {
                    this.callbacks.concat([this.callback]).forEach(function (b) {
                        b && 'undefined' !== typeof this.index && b.apply(this, [this])
                    }, this)
                    E(this, 'load')
                    E(this, 'render')
                    M(this.index) && this.setReflow(this.options.chart.reflow)
                    this.hasLoaded = !0
                }
                f.prototype.addSeries = function (b, a, e) {
                    var g = this,
                        c
                    b &&
                        ((a = S(a, !0)),
                        E(g, 'addSeries', { options: b }, function () {
                            c = g.initSeries(b)
                            g.isDirtyLegend = !0
                            g.linkSeries()
                            c.enabledDataSorting && c.setData(b.data, !1)
                            E(g, 'afterAddSeries', { series: c })
                            a && g.redraw(e)
                        }))
                    return c
                }
                f.prototype.addAxis = function (b, a, e, g) {
                    return this.createAxis(a ? 'xAxis' : 'yAxis', {
                        axis: b,
                        redraw: e,
                        animation: g,
                    })
                }
                f.prototype.addColorAxis = function (b, a, e) {
                    return this.createAxis('colorAxis', { axis: b, redraw: a, animation: e })
                }
                f.prototype.createAxis = function (b, a) {
                    b = new h(this, T(a.axis, { index: this[b].length, isX: 'xAxis' === b }))
                    S(a.redraw, !0) && this.redraw(a.animation)
                    return b
                }
                f.prototype.showLoading = function (a) {
                    var e = this,
                        g = e.options,
                        c = g.loading,
                        f = function () {
                            k &&
                                x(k, {
                                    left: e.plotLeft + 'px',
                                    top: e.plotTop + 'px',
                                    width: e.plotWidth + 'px',
                                    height: e.plotHeight + 'px',
                                })
                        },
                        k = e.loadingDiv,
                        l = e.loadingSpan
                    k ||
                        (e.loadingDiv = k =
                            r(
                                'div',
                                { className: 'highcharts-loading highcharts-loading-hidden' },
                                null,
                                e.container
                            ))
                    l ||
                        ((e.loadingSpan = l =
                            r('span', { className: 'highcharts-loading-inner' }, null, k)),
                        b(e, 'redraw', f))
                    k.className = 'highcharts-loading'
                    m.setElementHTML(l, S(a, g.lang.loading, ''))
                    e.styledMode ||
                        (x(k, W(c.style, { zIndex: 10 })),
                        x(l, c.labelStyle),
                        e.loadingShown ||
                            (x(k, { opacity: 0, display: '' }),
                            D(
                                k,
                                { opacity: c.style.opacity || 0.5 },
                                { duration: c.showDuration || 0 }
                            )))
                    e.loadingShown = !0
                    f()
                }
                f.prototype.hideLoading = function () {
                    var b = this.options,
                        a = this.loadingDiv
                    a &&
                        ((a.className = 'highcharts-loading highcharts-loading-hidden'),
                        this.styledMode ||
                            D(
                                a,
                                { opacity: 0 },
                                {
                                    duration: b.loading.hideDuration || 100,
                                    complete: function () {
                                        x(a, { display: 'none' })
                                    },
                                }
                            ))
                    this.loadingShown = !1
                }
                f.prototype.update = function (b, g, c, f) {
                    var k = this,
                        l = {
                            credits: 'addCredits',
                            title: 'setTitle',
                            subtitle: 'setSubtitle',
                            caption: 'setCaption',
                        },
                        d = b.isResponsiveOptions,
                        r = [],
                        x,
                        n
                    E(k, 'update', { options: b })
                    d || k.setResponsive(!1, !0)
                    b = J(b, k.options)
                    k.userOptions = T(k.userOptions, b)
                    var m = b.chart
                    if (m) {
                        T(!0, k.options.chart, m)
                        'className' in m && k.setClassName(m.className)
                        'reflow' in m && k.setReflow(m.reflow)
                        if ('inverted' in m || 'polar' in m || 'type' in m) {
                            k.propFromSeries()
                            var p = !0
                        }
                        'alignTicks' in m && (p = !0)
                        'events' in m && K(this, m)
                        U(m, function (b, a) {
                            ;-1 !== k.propsRequireUpdateSeries.indexOf('chart.' + a) && (x = !0)
                            ;-1 !== k.propsRequireDirtyBox.indexOf(a) && (k.isDirtyBox = !0)
                            ;-1 !== k.propsRequireReflow.indexOf(a) &&
                                (d ? (k.isDirtyBox = !0) : (n = !0))
                        })
                        !k.styledMode && m.style && k.renderer.setStyle(k.options.chart.style || {})
                    }
                    !k.styledMode && b.colors && (this.options.colors = b.colors)
                    b.time &&
                        (this.time === e && (this.time = new a(b.time)),
                        T(!0, k.options.time, b.time))
                    U(b, function (a, e) {
                        if (k[e] && 'function' === typeof k[e].update) k[e].update(a, !1)
                        else if ('function' === typeof k[l[e]]) k[l[e]](a)
                        else
                            'colors' !== e &&
                                -1 === k.collectionsWithUpdate.indexOf(e) &&
                                T(!0, k.options[e], b[e])
                        'chart' !== e && -1 !== k.propsRequireUpdateSeries.indexOf(e) && (x = !0)
                    })
                    this.collectionsWithUpdate.forEach(function (a) {
                        if (b[a]) {
                            var e = []
                            k[a].forEach(function (b, a) {
                                b.options.isInternal || e.push(S(b.options.index, a))
                            })
                            fa(b[a]).forEach(function (b, g) {
                                var f = M(b.id),
                                    l
                                f && (l = k.get(b.id))
                                !l &&
                                    k[a] &&
                                    (l = k[a][e ? e[g] : g]) &&
                                    f &&
                                    M(l.options.id) &&
                                    (l = void 0)
                                l && l.coll === a && (l.update(b, !1), c && (l.touched = !0))
                                !l &&
                                    c &&
                                    k.collectionsWithInit[a] &&
                                    (k.collectionsWithInit[a][0].apply(
                                        k,
                                        [b].concat(k.collectionsWithInit[a][1] || []).concat([!1])
                                    ).touched = !0)
                            })
                            c &&
                                k[a].forEach(function (b) {
                                    b.touched || b.options.isInternal ? delete b.touched : r.push(b)
                                })
                        }
                    })
                    r.forEach(function (b) {
                        b.chart && b.remove && b.remove(!1)
                    })
                    p &&
                        k.axes.forEach(function (b) {
                            b.update({}, !1)
                        })
                    x &&
                        k.getSeriesOrderByLinks().forEach(function (b) {
                            b.chart && b.update({}, !1)
                        }, this)
                    p = m && m.width
                    m = m && (ca(m.height) ? ia(m.height, p || k.chartWidth) : m.height)
                    n || (ba(p) && p !== k.chartWidth) || (ba(m) && m !== k.chartHeight)
                        ? k.setSize(p, m, f)
                        : S(g, !0) && k.redraw(f)
                    E(k, 'afterUpdate', { options: b, redraw: g, animation: f })
                }
                f.prototype.setSubtitle = function (b, a) {
                    this.applyDescription('subtitle', b)
                    this.layOutTitles(a)
                }
                f.prototype.setCaption = function (b, a) {
                    this.applyDescription('caption', b)
                    this.layOutTitles(a)
                }
                f.prototype.showResetZoom = function () {
                    function b() {
                        a.zoomOut()
                    }
                    var a = this,
                        e = l.lang,
                        g = a.options.chart.resetZoomButton,
                        c = g.theme,
                        f = c.states,
                        k =
                            'chart' === g.relativeTo || 'spacingBox' === g.relativeTo
                                ? null
                                : 'scrollablePlotBox'
                    E(this, 'beforeShowResetZoom', null, function () {
                        a.resetZoomButton = a.renderer
                            .button(e.resetZoom, null, null, b, c, f && f.hover)
                            .attr({ align: g.position.align, title: e.resetZoomTitle })
                            .addClass('highcharts-reset-zoom')
                            .add()
                            .align(g.position, !1, k)
                    })
                    E(this, 'afterShowResetZoom')
                }
                f.prototype.zoomOut = function () {
                    E(this, 'selection', { resetSelection: !0 }, this.zoom)
                }
                f.prototype.zoom = function (b) {
                    var a = this,
                        e = a.pointer,
                        g = a.inverted ? e.mouseDownX : e.mouseDownY,
                        c = !1,
                        f
                    !b || b.resetSelection
                        ? (a.axes.forEach(function (b) {
                              f = b.zoom()
                          }),
                          (e.initiated = !1))
                        : b.xAxis.concat(b.yAxis).forEach(function (b) {
                              var k = b.axis,
                                  l = a.inverted ? k.left : k.top,
                                  d = a.inverted ? l + k.width : l + k.height,
                                  r = k.isXAxis,
                                  x = !1
                              if ((!r && g >= l && g <= d) || r || !M(g)) x = !0
                              e[r ? 'zoomX' : 'zoomY'] &&
                                  x &&
                                  ((f = k.zoom(b.min, b.max)), k.displayBtn && (c = !0))
                          })
                    var k = a.resetZoomButton
                    c && !k ? a.showResetZoom() : !c && R(k) && (a.resetZoomButton = k.destroy())
                    f &&
                        a.redraw(S(a.options.chart.animation, b && b.animation, 100 > a.pointCount))
                }
                f.prototype.pan = function (b, a) {
                    var e = this,
                        g = e.hoverPoints
                    a = 'object' === typeof a ? a : { enabled: a, type: 'x' }
                    var c = e.options.chart,
                        f = e.options.mapNavigation && e.options.mapNavigation.enabled
                    c && c.panning && (c.panning = a)
                    var k = a.type,
                        l
                    E(this, 'pan', { originalEvent: b }, function () {
                        g &&
                            g.forEach(function (b) {
                                b.setState()
                            })
                        var a = e.xAxis
                        'xy' === k ? (a = a.concat(e.yAxis)) : 'y' === k && (a = e.yAxis)
                        var c = {}
                        a.forEach(function (a) {
                            if (a.options.panningEnabled && !a.options.isInternal) {
                                var g = a.horiz,
                                    d = b[g ? 'chartX' : 'chartY']
                                g = g ? 'mouseDownX' : 'mouseDownY'
                                var r = e[g],
                                    x = a.minPointOffset || 0,
                                    n =
                                        (a.reversed && !e.inverted) || (!a.reversed && e.inverted)
                                            ? -1
                                            : 1,
                                    m = a.getExtremes(),
                                    p = a.toValue(r - d, !0) + x * n,
                                    h =
                                        a.toValue(r + a.len - d, !0) -
                                        (x * n || (a.isXAxis && a.pointRangePadding) || 0),
                                    u = h < p
                                n = a.hasVerticalPanning()
                                r = u ? h : p
                                p = u ? p : h
                                var B = a.panningState
                                !n ||
                                    a.isXAxis ||
                                    (B && !B.isDirty) ||
                                    a.series.forEach(function (b) {
                                        var a = b.getProcessedData(!0)
                                        a = b.getExtremes(a.yData, !0)
                                        B ||
                                            (B = {
                                                startMin: Number.MAX_VALUE,
                                                startMax: -Number.MAX_VALUE,
                                            })
                                        ba(a.dataMin) &&
                                            ba(a.dataMax) &&
                                            ((B.startMin = Math.min(
                                                S(b.options.threshold, Infinity),
                                                a.dataMin,
                                                B.startMin
                                            )),
                                            (B.startMax = Math.max(
                                                S(b.options.threshold, -Infinity),
                                                a.dataMax,
                                                B.startMax
                                            )))
                                    })
                                n = Math.min(
                                    S(B && B.startMin, m.dataMin),
                                    x ? m.min : a.toValue(a.toPixels(m.min) - a.minPixelPadding)
                                )
                                h = Math.max(
                                    S(B && B.startMax, m.dataMax),
                                    x ? m.max : a.toValue(a.toPixels(m.max) + a.minPixelPadding)
                                )
                                a.panningState = B
                                a.isOrdinal ||
                                    ((x = n - r),
                                    0 < x && ((p += x), (r = n)),
                                    (x = p - h),
                                    0 < x && ((p = h), (r -= x)),
                                    a.series.length &&
                                        r !== m.min &&
                                        p !== m.max &&
                                        r >= n &&
                                        p <= h &&
                                        (a.setExtremes(r, p, !1, !1, { trigger: 'pan' }),
                                        e.resetZoomButton ||
                                            f ||
                                            r === n ||
                                            p === h ||
                                            !k.match('y') ||
                                            (e.showResetZoom(), (a.displayBtn = !1)),
                                        (l = !0)),
                                    (c[g] = d))
                            }
                        })
                        U(c, function (b, a) {
                            e[a] = b
                        })
                        l && e.redraw(!1)
                        x(e.container, { cursor: 'move' })
                    })
                }
                return f
            })()
            W(d.prototype, {
                callbacks: [],
                collectionsWithInit: {
                    xAxis: [d.prototype.addAxis, [!0]],
                    yAxis: [d.prototype.addAxis, [!1]],
                    series: [d.prototype.addSeries],
                },
                collectionsWithUpdate: ['xAxis', 'yAxis', 'series'],
                propsRequireDirtyBox:
                    'backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow'.split(
                        ' '
                    ),
                propsRequireReflow:
                    'margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft'.split(
                        ' '
                    ),
                propsRequireUpdateSeries:
                    'chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip'.split(
                        ' '
                    ),
            })
            ;('')
            return d
        }
    )
    N(h, 'Core/Legend/LegendSymbol.js', [h['Core/Utilities.js']], function (d) {
        var h = d.merge,
            A = d.pick,
            F
        ;(function (d) {
            d.drawLineMarker = function (d) {
                var t = this.options,
                    y = d.symbolWidth,
                    q = d.symbolHeight,
                    p = q / 2,
                    f = this.chart.renderer,
                    c = this.legendGroup
                d = d.baseline - Math.round(0.3 * d.fontMetrics.b)
                var a = {},
                    n = t.marker
                this.chart.styledMode ||
                    ((a = { 'stroke-width': t.lineWidth || 0 }),
                    t.dashStyle && (a.dashstyle = t.dashStyle))
                this.legendLine = f
                    .path([
                        ['M', 0, d],
                        ['L', y, d],
                    ])
                    .addClass('highcharts-graph')
                    .attr(a)
                    .add(c)
                n &&
                    !1 !== n.enabled &&
                    y &&
                    ((t = Math.min(A(n.radius, p), p)),
                    0 === this.symbol.indexOf('url') &&
                        ((n = h(n, { width: q, height: q })), (t = 0)),
                    (this.legendSymbol = y =
                        f
                            .symbol(this.symbol, y / 2 - t, d - t, 2 * t, 2 * t, n)
                            .addClass('highcharts-point')
                            .add(c)),
                    (y.isMarker = !0))
            }
            d.drawRectangle = function (d, h) {
                var t = d.symbolHeight,
                    q = d.options.squareSymbol
                h.legendSymbol = this.chart.renderer
                    .rect(
                        q ? (d.symbolWidth - t) / 2 : 0,
                        d.baseline - t + 1,
                        q ? t : d.symbolWidth,
                        t,
                        A(d.options.symbolRadius, t / 2)
                    )
                    .addClass('highcharts-point')
                    .attr({ zIndex: 3 })
                    .add(h.legendGroup)
            }
        })(F || (F = {}))
        return F
    })
    N(h, 'Core/Series/SeriesDefaults.js', [], function () {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: { duration: 1e3 },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: '#ffffff',
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: { animation: !0 },
                    hover: {
                        animation: { duration: 50 },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1,
                    },
                    select: { fillColor: '#cccccc', lineColor: '#000000', lineWidth: 2 },
                },
            },
            point: { events: {} },
            dataLabels: {
                animation: {},
                align: 'center',
                defer: !0,
                formatter: function () {
                    var d = this.series.chart.numberFormatter
                    return 'number' !== typeof this.y ? '' : d(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: 'contrast',
                    textOutline: '1px contrast',
                },
                verticalAlign: 'bottom',
                x: 0,
                y: 0,
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: { animation: !0 },
                hover: {
                    animation: { duration: 50 },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: { size: 10, opacity: 0.25 },
                },
                select: { animation: { duration: 0 } },
                inactive: { animation: { duration: 50 }, opacity: 0.2 },
            },
            stickyTracking: !0,
            turboThreshold: 1e3,
            findNearestPointBy: 'x',
        }
    })
    N(
        h,
        'Core/Series/Series.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Foundation.js'],
            h['Core/Globals.js'],
            h['Core/Legend/LegendSymbol.js'],
            h['Core/Series/Point.js'],
            h['Core/Series/SeriesDefaults.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Renderer/SVG/SVGElement.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y, q, p) {
            var f = d.animObject,
                c = d.setAnimation,
                a = h.defaultOptions,
                n = A.registerEventOptions,
                m = F.hasTouch,
                D = F.svg,
                C = F.win,
                I = y.seriesTypes,
                L = p.addEvent,
                K = p.arrayMax,
                v = p.arrayMin,
                z = p.clamp,
                u = p.cleanRecursively,
                k = p.correctFloat,
                w = p.defined,
                l = p.erase,
                e = p.error,
                g = p.extend,
                b = p.find,
                B = p.fireEvent,
                J = p.getNestedProperty,
                r = p.isArray,
                x = p.isNumber,
                M = p.isString,
                E = p.merge,
                P = p.objectEach,
                O = p.pick,
                W = p.removeEvent,
                Z = p.splat,
                ha = p.syncTimeout
            d = (function () {
                function d() {
                    this.zones =
                        this.yAxis =
                        this.xAxis =
                        this.userOptions =
                        this.tooltipOptions =
                        this.processedYData =
                        this.processedXData =
                        this.points =
                        this.options =
                        this.linkedSeries =
                        this.index =
                        this.eventsToUnbind =
                        this.eventOptions =
                        this.data =
                        this.chart =
                        this._i =
                            void 0
                }
                d.prototype.init = function (b, a) {
                    B(this, 'init', { options: a })
                    var e = this,
                        c = b.series
                    this.eventsToUnbind = []
                    e.chart = b
                    e.options = e.setOptions(a)
                    a = e.options
                    e.linkedSeries = []
                    e.bindAxes()
                    g(e, {
                        name: a.name,
                        state: '',
                        visible: !1 !== a.visible,
                        selected: !0 === a.selected,
                    })
                    n(this, a)
                    var f = a.events
                    if (
                        (f && f.click) ||
                        (a.point && a.point.events && a.point.events.click) ||
                        a.allowPointSelect
                    )
                        b.runTrackerClick = !0
                    e.getColor()
                    e.getSymbol()
                    e.parallelArrays.forEach(function (b) {
                        e[b + 'Data'] || (e[b + 'Data'] = [])
                    })
                    e.isCartesian && (b.hasCartesianSeries = !0)
                    var k
                    c.length && (k = c[c.length - 1])
                    e._i = O(k && k._i, -1) + 1
                    e.opacity = e.options.opacity
                    b.orderSeries(this.insert(c))
                    a.dataSorting && a.dataSorting.enabled
                        ? e.setDataSortingOptions()
                        : e.points || e.data || e.setData(a.data, !1)
                    B(this, 'afterInit')
                }
                d.prototype.is = function (b) {
                    return I[b] && this instanceof I[b]
                }
                d.prototype.insert = function (b) {
                    var a = this.options.index,
                        e
                    if (x(a)) {
                        for (e = b.length; e--; )
                            if (a >= O(b[e].options.index, b[e]._i)) {
                                b.splice(e + 1, 0, this)
                                break
                            }
                        ;-1 === e && b.unshift(this)
                        e += 1
                    } else b.push(this)
                    return O(e, b.length - 1)
                }
                d.prototype.bindAxes = function () {
                    var b = this,
                        a = b.options,
                        g = b.chart,
                        c
                    B(this, 'bindAxes', null, function () {
                        ;(b.axisTypes || []).forEach(function (f) {
                            var k = 0
                            g[f].forEach(function (e) {
                                c = e.options
                                if (
                                    (a[f] === k && !c.isInternal) ||
                                    ('undefined' !== typeof a[f] && a[f] === c.id) ||
                                    ('undefined' === typeof a[f] && 0 === c.index)
                                )
                                    b.insert(e.series), (b[f] = e), (e.isDirty = !0)
                                c.isInternal || k++
                            })
                            b[f] || b.optionalAxis === f || e(18, !0, g)
                        })
                    })
                    B(this, 'afterBindAxes')
                }
                d.prototype.updateParallelArrays = function (b, a) {
                    var e = b.series,
                        g = arguments,
                        c = x(a)
                            ? function (g) {
                                  var c = 'y' === g && e.toYData ? e.toYData(b) : b[g]
                                  e[g + 'Data'][a] = c
                              }
                            : function (b) {
                                  Array.prototype[a].apply(
                                      e[b + 'Data'],
                                      Array.prototype.slice.call(g, 2)
                                  )
                              }
                    e.parallelArrays.forEach(c)
                }
                d.prototype.hasData = function () {
                    return (
                        (this.visible &&
                            'undefined' !== typeof this.dataMax &&
                            'undefined' !== typeof this.dataMin) ||
                        (this.visible && this.yData && 0 < this.yData.length)
                    )
                }
                d.prototype.autoIncrement = function (b) {
                    var a = this.options,
                        e = a.pointIntervalUnit,
                        g = a.relativeXValue,
                        c = this.chart.time,
                        f = this.xIncrement,
                        k
                    f = O(f, a.pointStart, 0)
                    this.pointInterval = k = O(this.pointInterval, a.pointInterval, 1)
                    g && x(b) && (k *= b)
                    e &&
                        ((a = new c.Date(f)),
                        'day' === e
                            ? c.set('Date', a, c.get('Date', a) + k)
                            : 'month' === e
                            ? c.set('Month', a, c.get('Month', a) + k)
                            : 'year' === e && c.set('FullYear', a, c.get('FullYear', a) + k),
                        (k = a.getTime() - f))
                    if (g && x(b)) return f + k
                    this.xIncrement = f + k
                    return f
                }
                d.prototype.setDataSortingOptions = function () {
                    var b = this.options
                    g(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 })
                    w(b.pointRange) || (b.pointRange = 1)
                }
                d.prototype.setOptions = function (b) {
                    var e = this.chart,
                        g = e.options,
                        c = g.plotOptions,
                        f = e.userOptions || {}
                    b = E(b)
                    e = e.styledMode
                    var k = { plotOptions: c, userOptions: b }
                    B(this, 'setOptions', k)
                    var d = k.plotOptions[this.type],
                        l = f.plotOptions || {}
                    this.userOptions = k.userOptions
                    f = E(d, c.series, f.plotOptions && f.plotOptions[this.type], b)
                    this.tooltipOptions = E(
                        a.tooltip,
                        a.plotOptions.series && a.plotOptions.series.tooltip,
                        a.plotOptions[this.type].tooltip,
                        g.tooltip.userOptions,
                        c.series && c.series.tooltip,
                        c[this.type].tooltip,
                        b.tooltip
                    )
                    this.stickyTracking = O(
                        b.stickyTracking,
                        l[this.type] && l[this.type].stickyTracking,
                        l.series && l.series.stickyTracking,
                        this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : f.stickyTracking
                    )
                    null === d.marker && delete f.marker
                    this.zoneAxis = f.zoneAxis
                    c = this.zones = (f.zones || []).slice()
                    ;(!f.negativeColor && !f.negativeFillColor) ||
                        f.zones ||
                        ((g = {
                            value: f[this.zoneAxis + 'Threshold'] || f.threshold || 0,
                            className: 'highcharts-negative',
                        }),
                        e || ((g.color = f.negativeColor), (g.fillColor = f.negativeFillColor)),
                        c.push(g))
                    c.length &&
                        w(c[c.length - 1].value) &&
                        c.push(e ? {} : { color: this.color, fillColor: this.fillColor })
                    B(this, 'afterSetOptions', { options: f })
                    return f
                }
                d.prototype.getName = function () {
                    return O(this.options.name, 'Series ' + (this.index + 1))
                }
                d.prototype.getCyclic = function (b, a, e) {
                    var g = this.chart,
                        c = this.userOptions,
                        f = b + 'Index',
                        k = b + 'Counter',
                        d = e ? e.length : O(g.options.chart[b + 'Count'], g[b + 'Count'])
                    if (!a) {
                        var l = O(c[f], c['_' + f])
                        w(l) ||
                            (g.series.length || (g[k] = 0),
                            (c['_' + f] = l = g[k] % d),
                            (g[k] += 1))
                        e && (a = e[l])
                    }
                    'undefined' !== typeof l && (this[f] = l)
                    this[b] = a
                }
                d.prototype.getColor = function () {
                    this.chart.styledMode
                        ? this.getCyclic('color')
                        : this.options.colorByPoint
                        ? (this.color = '#cccccc')
                        : this.getCyclic(
                              'color',
                              this.options.color || a.plotOptions[this.type].color,
                              this.chart.options.colors
                          )
                }
                d.prototype.getPointsCollection = function () {
                    return (this.hasGroupedData ? this.points : this.data) || []
                }
                d.prototype.getSymbol = function () {
                    this.getCyclic('symbol', this.options.marker.symbol, this.chart.options.symbols)
                }
                d.prototype.findPointIndex = function (a, e) {
                    var g = a.id,
                        c = a.x,
                        f = this.points,
                        k = this.options.dataSorting,
                        d,
                        l
                    if (g) (k = this.chart.get(g)), k instanceof G && (d = k)
                    else if (
                        this.linkedParent ||
                        this.enabledDataSorting ||
                        this.options.relativeXValue
                    )
                        if (
                            ((d = function (b) {
                                return !b.touched && b.index === a.index
                            }),
                            k && k.matchByName
                                ? (d = function (b) {
                                      return !b.touched && b.name === a.name
                                  })
                                : this.options.relativeXValue &&
                                  (d = function (b) {
                                      return !b.touched && b.options.x === a.x
                                  }),
                            (d = b(f, d)),
                            !d)
                        )
                            return
                    if (d) {
                        var r = d && d.index
                        'undefined' !== typeof r && (l = !0)
                    }
                    'undefined' === typeof r && x(c) && (r = this.xData.indexOf(c, e))
                    ;-1 !== r &&
                        'undefined' !== typeof r &&
                        this.cropped &&
                        (r = r >= this.cropStart ? r - this.cropStart : r)
                    !l && x(r) && f[r] && f[r].touched && (r = void 0)
                    return r
                }
                d.prototype.updateData = function (b, a) {
                    var e = this.options,
                        g = e.dataSorting,
                        c = this.points,
                        f = [],
                        k = this.requireSorting,
                        d = b.length === c.length,
                        l,
                        r,
                        n,
                        m = !0
                    this.xIncrement = null
                    b.forEach(function (b, a) {
                        var r =
                                (w(b) &&
                                    this.pointClass.prototype.optionsToObject.call(
                                        { series: this },
                                        b
                                    )) ||
                                {},
                            m = r.x
                        if (r.id || x(m)) {
                            if (
                                ((r = this.findPointIndex(r, n)),
                                -1 === r || 'undefined' === typeof r
                                    ? f.push(b)
                                    : c[r] && b !== e.data[r]
                                    ? (c[r].update(b, !1, null, !1),
                                      (c[r].touched = !0),
                                      k && (n = r + 1))
                                    : c[r] && (c[r].touched = !0),
                                !d || a !== r || (g && g.enabled) || this.hasDerivedData)
                            )
                                l = !0
                        } else f.push(b)
                    }, this)
                    if (l)
                        for (b = c.length; b--; )
                            (r = c[b]) && !r.touched && r.remove && r.remove(!1, a)
                    else
                        !d || (g && g.enabled)
                            ? (m = !1)
                            : (b.forEach(function (b, a) {
                                  b !== c[a].y && c[a].update && c[a].update(b, !1, null, !1)
                              }),
                              (f.length = 0))
                    c.forEach(function (b) {
                        b && (b.touched = !1)
                    })
                    if (!m) return !1
                    f.forEach(function (b) {
                        this.addPoint(b, !1, null, null, !1)
                    }, this)
                    null === this.xIncrement &&
                        this.xData &&
                        this.xData.length &&
                        ((this.xIncrement = K(this.xData)), this.autoIncrement())
                    return !0
                }
                d.prototype.setData = function (b, a, g, c) {
                    var f = this,
                        k = f.points,
                        d = (k && k.length) || 0,
                        l = f.options,
                        n = f.chart,
                        m = l.dataSorting,
                        p = f.xAxis,
                        h = l.turboThreshold,
                        B = this.xData,
                        u = this.yData,
                        w = f.pointArrayMap
                    w = w && w.length
                    var J = l.keys,
                        v,
                        q = 0,
                        z = 1,
                        Q = null
                    b = b || []
                    var C = b.length
                    a = O(a, !0)
                    m && m.enabled && (b = this.sortData(b))
                    !1 !== c &&
                        C &&
                        d &&
                        !f.cropped &&
                        !f.hasGroupedData &&
                        f.visible &&
                        !f.isSeriesBoosting &&
                        (v = this.updateData(b, g))
                    if (!v) {
                        f.xIncrement = null
                        f.colorCounter = 0
                        this.parallelArrays.forEach(function (b) {
                            f[b + 'Data'].length = 0
                        })
                        if (h && C > h)
                            if (((Q = f.getFirstValidPoint(b)), x(Q)))
                                for (g = 0; g < C; g++) (B[g] = this.autoIncrement()), (u[g] = b[g])
                            else if (r(Q))
                                if (w)
                                    if (Q.length === w)
                                        for (g = 0; g < C; g++)
                                            (B[g] = this.autoIncrement()), (u[g] = b[g])
                                    else
                                        for (g = 0; g < C; g++)
                                            (c = b[g]), (B[g] = c[0]), (u[g] = c.slice(1, w + 1))
                                else if (
                                    (J &&
                                        ((q = J.indexOf('x')),
                                        (z = J.indexOf('y')),
                                        (q = 0 <= q ? q : 0),
                                        (z = 0 <= z ? z : 1)),
                                    1 === Q.length && (z = 0),
                                    q === z)
                                )
                                    for (g = 0; g < C; g++)
                                        (B[g] = this.autoIncrement()), (u[g] = b[g][z])
                                else
                                    for (g = 0; g < C; g++) (c = b[g]), (B[g] = c[q]), (u[g] = c[z])
                            else e(12, !1, n)
                        else
                            for (g = 0; g < C; g++)
                                'undefined' !== typeof b[g] &&
                                    ((c = { series: f }),
                                    f.pointClass.prototype.applyOptions.apply(c, [b[g]]),
                                    f.updateParallelArrays(c, g))
                        u && M(u[0]) && e(14, !0, n)
                        f.data = []
                        f.options.data = f.userOptions.data = b
                        for (g = d; g--; ) k[g] && k[g].destroy && k[g].destroy()
                        p && (p.minRange = p.userMinRange)
                        f.isDirty = n.isDirtyBox = !0
                        f.isDirtyData = !!k
                        g = !1
                    }
                    'point' === l.legendType && (this.processData(), this.generatePoints())
                    a && n.redraw(g)
                }
                d.prototype.sortData = function (b) {
                    var a = this,
                        e = a.options.dataSorting.sortKey || 'y',
                        g = function (b, a) {
                            return (
                                (w(a) &&
                                    b.pointClass.prototype.optionsToObject.call(
                                        { series: b },
                                        a
                                    )) ||
                                {}
                            )
                        }
                    b.forEach(function (e, c) {
                        b[c] = g(a, e)
                        b[c].index = c
                    }, this)
                    b.concat()
                        .sort(function (b, a) {
                            b = J(e, b)
                            a = J(e, a)
                            return a < b ? -1 : a > b ? 1 : 0
                        })
                        .forEach(function (b, a) {
                            b.x = a
                        }, this)
                    a.linkedSeries &&
                        a.linkedSeries.forEach(function (a) {
                            var e = a.options,
                                c = e.data
                            ;(e.dataSorting && e.dataSorting.enabled) ||
                                !c ||
                                (c.forEach(function (e, f) {
                                    c[f] = g(a, e)
                                    b[f] && ((c[f].x = b[f].x), (c[f].index = f))
                                }),
                                a.setData(c, !1))
                        })
                    return b
                }
                d.prototype.getProcessedData = function (b) {
                    var a = this.xAxis,
                        g = this.options,
                        c = g.cropThreshold,
                        f = b || this.getExtremesFromAll || g.getExtremesFromAll,
                        k = this.isCartesian
                    b = a && a.val2lin
                    g = !(!a || !a.logarithmic)
                    var d = 0,
                        l = this.xData,
                        r = this.yData,
                        x = this.requireSorting
                    var n = !1
                    var m = l.length
                    if (a) {
                        n = a.getExtremes()
                        var p = n.min
                        var h = n.max
                        n = a.categories && !a.names.length
                    }
                    if (k && this.sorted && !f && (!c || m > c || this.forceCrop))
                        if (l[m - 1] < p || l[0] > h) (l = []), (r = [])
                        else if (this.yData && (l[0] < p || l[m - 1] > h)) {
                            var B = this.cropData(this.xData, this.yData, p, h)
                            l = B.xData
                            r = B.yData
                            d = B.start
                            B = !0
                        }
                    for (c = l.length || 1; --c; )
                        if (
                            ((a = g ? b(l[c]) - b(l[c - 1]) : l[c] - l[c - 1]),
                            0 < a && ('undefined' === typeof u || a < u))
                        )
                            var u = a
                        else 0 > a && x && !n && (e(15, !1, this.chart), (x = !1))
                    return { xData: l, yData: r, cropped: B, cropStart: d, closestPointRange: u }
                }
                d.prototype.processData = function (b) {
                    var a = this.xAxis
                    if (
                        this.isCartesian &&
                        !this.isDirty &&
                        !a.isDirty &&
                        !this.yAxis.isDirty &&
                        !b
                    )
                        return !1
                    b = this.getProcessedData()
                    this.cropped = b.cropped
                    this.cropStart = b.cropStart
                    this.processedXData = b.xData
                    this.processedYData = b.yData
                    this.closestPointRange = this.basePointRange = b.closestPointRange
                    B(this, 'afterProcessData')
                }
                d.prototype.cropData = function (b, a, e, g, c) {
                    var f = b.length,
                        k,
                        d = 0,
                        l = f
                    c = O(c, this.cropShoulder)
                    for (k = 0; k < f; k++)
                        if (b[k] >= e) {
                            d = Math.max(0, k - c)
                            break
                        }
                    for (e = k; e < f; e++)
                        if (b[e] > g) {
                            l = e + c
                            break
                        }
                    return { xData: b.slice(d, l), yData: a.slice(d, l), start: d, end: l }
                }
                d.prototype.generatePoints = function () {
                    var b = this.options,
                        a = b.data,
                        e = this.processedXData,
                        c = this.processedYData,
                        f = this.pointClass,
                        k = e.length,
                        d = this.cropStart || 0,
                        l = this.hasGroupedData,
                        r = b.keys,
                        n = []
                    b = b.dataGrouping && b.dataGrouping.groupAll ? d : 0
                    var x,
                        m,
                        p = this.data
                    if (!p && !l) {
                        var h = []
                        h.length = a.length
                        p = this.data = h
                    }
                    r && l && (this.options.keys = !1)
                    for (m = 0; m < k; m++) {
                        h = d + m
                        if (l) {
                            var u = new f().init(this, [e[m]].concat(Z(c[m])))
                            u.dataGroup = this.groupMap[b + m]
                            u.dataGroup.options &&
                                ((u.options = u.dataGroup.options),
                                g(u, u.dataGroup.options),
                                delete u.dataLabels)
                        } else
                            (u = p[h]) ||
                                'undefined' === typeof a[h] ||
                                (p[h] = u = new f().init(this, a[h], e[m]))
                        u && ((u.index = l ? b + m : h), (n[m] = u))
                    }
                    this.options.keys = r
                    if (p && (k !== (x = p.length) || l))
                        for (m = 0; m < x; m++)
                            m !== d || l || (m += k),
                                p[m] && (p[m].destroyElements(), (p[m].plotX = void 0))
                    this.data = p
                    this.points = n
                    B(this, 'afterGeneratePoints')
                }
                d.prototype.getXExtremes = function (b) {
                    return { min: v(b), max: K(b) }
                }
                d.prototype.getExtremes = function (b, a) {
                    var e = this.xAxis,
                        g = this.yAxis,
                        c = this.processedXData || this.xData,
                        f = [],
                        k = this.requireSorting ? this.cropShoulder : 0
                    g = g ? g.positiveValuesOnly : !1
                    var d,
                        l = 0,
                        n = 0,
                        m = 0
                    b = b || this.stackedYData || this.processedYData || []
                    var p = b.length
                    if (e) {
                        var h = e.getExtremes()
                        l = h.min
                        n = h.max
                    }
                    for (d = 0; d < p; d++) {
                        var u = c[d]
                        h = b[d]
                        var w = (x(h) || r(h)) && (h.length || 0 < h || !g)
                        u =
                            a ||
                            this.getExtremesFromAll ||
                            this.options.getExtremesFromAll ||
                            this.cropped ||
                            !e ||
                            ((c[d + k] || u) >= l && (c[d - k] || u) <= n)
                        if (w && u)
                            if ((w = h.length)) for (; w--; ) x(h[w]) && (f[m++] = h[w])
                            else f[m++] = h
                    }
                    b = { activeYData: f, dataMin: v(f), dataMax: K(f) }
                    B(this, 'afterGetExtremes', { dataExtremes: b })
                    return b
                }
                d.prototype.applyExtremes = function () {
                    var b = this.getExtremes()
                    this.dataMin = b.dataMin
                    this.dataMax = b.dataMax
                    return b
                }
                d.prototype.getFirstValidPoint = function (b) {
                    for (var a = b.length, e = 0, g = null; null === g && e < a; ) (g = b[e]), e++
                    return g
                }
                d.prototype.translate = function () {
                    this.processedXData || this.processData()
                    this.generatePoints()
                    var b = this.options,
                        a = b.stacking,
                        e = this.xAxis,
                        g = e.categories,
                        c = this.enabledDataSorting,
                        f = this.yAxis,
                        d = this.points,
                        l = d.length,
                        n = this.pointPlacementToXValue(),
                        m = !!n,
                        p = b.threshold,
                        h = b.startFromThreshold ? p : 0,
                        u = this.zoneAxis || 'y',
                        J,
                        v,
                        q = Number.MAX_VALUE
                    for (J = 0; J < l; J++) {
                        var M = d[J],
                            C = M.x,
                            D = void 0,
                            I = void 0,
                            L = M.y,
                            K = M.low,
                            t =
                                a &&
                                f.stacking &&
                                f.stacking.stacks[
                                    (this.negStacks && L < (h ? 0 : p) ? '-' : '') + this.stackKey
                                ]
                        if (
                            (f.positiveValuesOnly && !f.validatePositiveValue(L)) ||
                            (e.positiveValuesOnly && !e.validatePositiveValue(C))
                        )
                            M.isNull = !0
                        M.plotX = v = k(
                            z(e.translate(C, 0, 0, 0, 1, n, 'flags' === this.type), -1e5, 1e5)
                        )
                        if (a && this.visible && t && t[C]) {
                            var y = this.getStackIndicator(y, C, this.index)
                            M.isNull || ((D = t[C]), (I = D.points[y.key]))
                        }
                        r(I) &&
                            ((K = I[0]),
                            (L = I[1]),
                            K === h && y.key === t[C].base && (K = O(x(p) && p, f.min)),
                            f.positiveValuesOnly && 0 >= K && (K = null),
                            (M.total = M.stackTotal = D.total),
                            (M.percentage = D.total && (M.y / D.total) * 100),
                            (M.stackY = L),
                            this.irregularWidths ||
                                D.setOffset(this.pointXOffset || 0, this.barW || 0))
                        M.yBottom = w(K) ? z(f.translate(K, 0, 1, 0, 1), -1e5, 1e5) : null
                        this.dataModify && (L = this.dataModify.modifyValue(L, J))
                        M.plotY = void 0
                        x(L) &&
                            ((D = f.translate(L, !1, !0, !1, !0)),
                            'undefined' !== typeof D && (M.plotY = z(D, -1e5, 1e5)))
                        M.isInside = this.isPointInside(M)
                        M.clientX = m ? k(e.translate(C, 0, 0, 0, 1, n)) : v
                        M.negative = M[u] < (b[u + 'Threshold'] || p || 0)
                        M.category = g && 'undefined' !== typeof g[M.x] ? g[M.x] : M.x
                        if (!M.isNull && !1 !== M.visible) {
                            'undefined' !== typeof P && (q = Math.min(q, Math.abs(v - P)))
                            var P = v
                        }
                        M.zone = this.zones.length ? M.getZone() : void 0
                        !M.graphic && this.group && c && (M.isNew = !0)
                    }
                    this.closestPointRangePx = q
                    B(this, 'afterTranslate')
                }
                d.prototype.getValidPoints = function (b, a, e) {
                    var g = this.chart
                    return (b || this.points || []).filter(function (b) {
                        return a && !g.isInsidePlot(b.plotX, b.plotY, { inverted: g.inverted })
                            ? !1
                            : !1 !== b.visible && (e || !b.isNull)
                    })
                }
                d.prototype.getClipBox = function () {
                    var b = this.chart,
                        a = this.xAxis,
                        e = this.yAxis,
                        g = E(b.clipBox)
                    a && a.len !== b.plotSizeX && (g.width = a.len)
                    e && e.len !== b.plotSizeY && (g.height = e.len)
                    return g
                }
                d.prototype.getSharedClipKey = function () {
                    return (this.sharedClipKey =
                        (this.options.xAxis || 0) + ',' + (this.options.yAxis || 0))
                }
                d.prototype.setClip = function () {
                    var b = this.chart,
                        a = this.group,
                        e = this.markerGroup,
                        g = b.sharedClips
                    b = b.renderer
                    var c = this.getClipBox(),
                        f = this.getSharedClipKey(),
                        k = g[f]
                    k ? k.animate(c) : (g[f] = k = b.clipRect(c))
                    a && a.clip(!1 === this.options.clip ? void 0 : k)
                    e && e.clip()
                }
                d.prototype.animate = function (b) {
                    var a = this.chart,
                        e = this.group,
                        g = this.markerGroup,
                        c = a.inverted,
                        k = f(this.options.animation),
                        d = [this.getSharedClipKey(), k.duration, k.easing, k.defer].join(),
                        l = a.sharedClips[d],
                        r = a.sharedClips[d + 'm']
                    if (b && e)
                        (k = this.getClipBox()),
                            l
                                ? l.attr('height', k.height)
                                : ((k.width = 0),
                                  c && (k.x = a.plotHeight),
                                  (l = a.renderer.clipRect(k)),
                                  (a.sharedClips[d] = l),
                                  (r = a.renderer.clipRect({
                                      x: c ? (a.plotSizeX || 0) + 99 : -99,
                                      y: c ? -a.plotLeft : -a.plotTop,
                                      width: 99,
                                      height: c ? a.chartWidth : a.chartHeight,
                                  })),
                                  (a.sharedClips[d + 'm'] = r)),
                            e.clip(l),
                            g && g.clip(r)
                    else if (l && !l.hasClass('highcharts-animating')) {
                        a = this.getClipBox()
                        var n = k.step
                        g &&
                            g.element.childNodes.length &&
                            (k.step = function (b, a) {
                                n && n.apply(a, arguments)
                                r && r.element && r.attr(a.prop, 'width' === a.prop ? b + 99 : b)
                            })
                        l.addClass('highcharts-animating').animate(a, k)
                    }
                }
                d.prototype.afterAnimate = function () {
                    var b = this
                    this.setClip()
                    P(this.chart.sharedClips, function (a, e, g) {
                        a &&
                            !b.chart.container.querySelector('[clip-path="url(#' + a.id + ')"]') &&
                            (a.destroy(), delete g[e])
                    })
                    this.finishedAnimating = !0
                    B(this, 'afterAnimate')
                }
                d.prototype.drawPoints = function () {
                    var b = this.points,
                        a = this.chart,
                        e = this.options.marker,
                        g = this[this.specialGroup] || this.markerGroup,
                        c = this.xAxis,
                        f = O(
                            e.enabled,
                            !c || c.isRadial ? !0 : null,
                            this.closestPointRangePx >= e.enabledThreshold * e.radius
                        ),
                        k,
                        d
                    if (!1 !== e.enabled || this._hasPointMarkers)
                        for (k = 0; k < b.length; k++) {
                            var l = b[k]
                            var r = (d = l.graphic) ? 'animate' : 'attr'
                            var n = l.marker || {}
                            var x = !!l.marker
                            if (
                                ((f && 'undefined' === typeof n.enabled) || n.enabled) &&
                                !l.isNull &&
                                !1 !== l.visible
                            ) {
                                var m = O(n.symbol, this.symbol, 'rect')
                                var p = this.markerAttribs(l, l.selected && 'select')
                                this.enabledDataSorting &&
                                    (l.startXPos = c.reversed ? -(p.width || 0) : c.width)
                                var h = !1 !== l.isInside
                                d
                                    ? d[h ? 'show' : 'hide'](h).animate(p)
                                    : h &&
                                      (0 < (p.width || 0) || l.hasImage) &&
                                      ((l.graphic = d =
                                          a.renderer
                                              .symbol(m, p.x, p.y, p.width, p.height, x ? n : e)
                                              .add(g)),
                                      this.enabledDataSorting &&
                                          a.hasRendered &&
                                          (d.attr({ x: l.startXPos }), (r = 'animate')))
                                d && 'animate' === r && d[h ? 'show' : 'hide'](h).animate(p)
                                if (d && !a.styledMode)
                                    d[r](this.pointAttribs(l, l.selected && 'select'))
                                d && d.addClass(l.getClassName(), !0)
                            } else d && (l.graphic = d.destroy())
                        }
                }
                d.prototype.markerAttribs = function (b, a) {
                    var e = this.options,
                        g = e.marker,
                        c = b.marker || {},
                        f = c.symbol || g.symbol,
                        k = O(c.radius, g.radius)
                    a &&
                        ((g = g.states[a]),
                        (a = c.states && c.states[a]),
                        (k = O(a && a.radius, g && g.radius, k + ((g && g.radiusPlus) || 0))))
                    b.hasImage = f && 0 === f.indexOf('url')
                    b.hasImage && (k = 0)
                    b = { x: e.crisp ? Math.floor(b.plotX - k) : b.plotX - k, y: b.plotY - k }
                    k && (b.width = b.height = 2 * k)
                    return b
                }
                d.prototype.pointAttribs = function (b, a) {
                    var e = this.options.marker,
                        g = b && b.options,
                        c = (g && g.marker) || {},
                        f = g && g.color,
                        k = b && b.color,
                        d = b && b.zone && b.zone.color,
                        l = this.color
                    b = O(c.lineWidth, e.lineWidth)
                    g = 1
                    l = f || d || k || l
                    f = c.fillColor || e.fillColor || l
                    k = c.lineColor || e.lineColor || l
                    a = a || 'normal'
                    e = e.states[a] || {}
                    a = (c.states && c.states[a]) || {}
                    b = O(a.lineWidth, e.lineWidth, b + O(a.lineWidthPlus, e.lineWidthPlus, 0))
                    f = a.fillColor || e.fillColor || f
                    k = a.lineColor || e.lineColor || k
                    g = O(a.opacity, e.opacity, g)
                    return { stroke: k, 'stroke-width': b, fill: f, opacity: g }
                }
                d.prototype.destroy = function (b) {
                    var a = this,
                        e = a.chart,
                        g = /AppleWebKit\/533/.test(C.navigator.userAgent),
                        c = a.data || [],
                        f,
                        k,
                        d,
                        r
                    B(a, 'destroy')
                    this.removeEvents(b)
                    ;(a.axisTypes || []).forEach(function (b) {
                        ;(r = a[b]) &&
                            r.series &&
                            (l(r.series, a), (r.isDirty = r.forceRedraw = !0))
                    })
                    a.legendItem && a.chart.legend.destroyItem(a)
                    for (k = c.length; k--; ) (d = c[k]) && d.destroy && d.destroy()
                    a.clips &&
                        a.clips.forEach(function (b) {
                            return b.destroy()
                        })
                    p.clearTimeout(a.animationTimeout)
                    P(a, function (b, a) {
                        b instanceof q &&
                            !b.survive &&
                            ((f = g && 'group' === a ? 'hide' : 'destroy'), b[f]())
                    })
                    e.hoverSeries === a && (e.hoverSeries = void 0)
                    l(e.series, a)
                    e.orderSeries()
                    P(a, function (e, g) {
                        ;(b && 'hcEvents' === g) || delete a[g]
                    })
                }
                d.prototype.applyZones = function () {
                    var b = this,
                        a = this.chart,
                        e = a.renderer,
                        g = this.zones,
                        c = this.clips || [],
                        f = this.graph,
                        k = this.area,
                        d = Math.max(a.chartWidth, a.chartHeight),
                        l = this[(this.zoneAxis || 'y') + 'Axis'],
                        r = a.inverted,
                        n,
                        x,
                        m,
                        p,
                        h,
                        u,
                        B,
                        w,
                        J = !1
                    if (g.length && (f || k) && l && 'undefined' !== typeof l.min) {
                        var v = l.reversed
                        var q = l.horiz
                        f && !this.showLine && f.hide()
                        k && k.hide()
                        var M = l.getExtremes()
                        g.forEach(function (g, C) {
                            n = v ? (q ? a.plotWidth : 0) : q ? 0 : l.toPixels(M.min) || 0
                            n = z(O(x, n), 0, d)
                            x = z(Math.round(l.toPixels(O(g.value, M.max), !0) || 0), 0, d)
                            J && (n = x = l.toPixels(M.max))
                            p = Math.abs(n - x)
                            h = Math.min(n, x)
                            u = Math.max(n, x)
                            l.isXAxis
                                ? ((m = { x: r ? u : h, y: 0, width: p, height: d }),
                                  q || (m.x = a.plotHeight - m.x))
                                : ((m = { x: 0, y: r ? u : h, width: d, height: p }),
                                  q && (m.y = a.plotWidth - m.y))
                            r &&
                                e.isVML &&
                                (m = l.isXAxis
                                    ? { x: 0, y: v ? h : u, height: m.width, width: a.chartWidth }
                                    : {
                                          x: m.y - a.plotLeft - a.spacingBox.x,
                                          y: 0,
                                          width: m.height,
                                          height: a.chartHeight,
                                      })
                            c[C] ? c[C].animate(m) : (c[C] = e.clipRect(m))
                            B = b['zone-area-' + C]
                            w = b['zone-graph-' + C]
                            f && w && w.clip(c[C])
                            k && B && B.clip(c[C])
                            J = g.value > M.max
                            b.resetZones && 0 === x && (x = void 0)
                        })
                        this.clips = c
                    } else b.visible && (f && f.show(!0), k && k.show(!0))
                }
                d.prototype.invertGroups = function (b) {
                    function a() {
                        ;['group', 'markerGroup'].forEach(function (a) {
                            e[a] &&
                                (g.renderer.isVML &&
                                    e[a].attr({ width: e.yAxis.len, height: e.xAxis.len }),
                                (e[a].width = e.yAxis.len),
                                (e[a].height = e.xAxis.len),
                                e[a].invert(e.isRadialSeries ? !1 : b))
                        })
                    }
                    var e = this,
                        g = e.chart
                    e.xAxis && (e.eventsToUnbind.push(L(g, 'resize', a)), a(), (e.invertGroups = a))
                }
                d.prototype.plotGroup = function (b, a, e, g, c) {
                    var f = this[b],
                        k = !f
                    e = { visibility: e, zIndex: g || 0.1 }
                    'undefined' === typeof this.opacity ||
                        this.chart.styledMode ||
                        'inactive' === this.state ||
                        (e.opacity = this.opacity)
                    k && (this[b] = f = this.chart.renderer.g().add(c))
                    f.addClass(
                        'highcharts-' +
                            a +
                            ' highcharts-series-' +
                            this.index +
                            ' highcharts-' +
                            this.type +
                            '-series ' +
                            (w(this.colorIndex)
                                ? 'highcharts-color-' + this.colorIndex + ' '
                                : '') +
                            (this.options.className || '') +
                            (f.hasClass('highcharts-tracker') ? ' highcharts-tracker' : ''),
                        !0
                    )
                    f.attr(e)[k ? 'attr' : 'animate'](this.getPlotBox())
                    return f
                }
                d.prototype.getPlotBox = function () {
                    var b = this.chart,
                        a = this.xAxis,
                        e = this.yAxis
                    b.inverted && ((a = e), (e = this.xAxis))
                    return {
                        translateX: a ? a.left : b.plotLeft,
                        translateY: e ? e.top : b.plotTop,
                        scaleX: 1,
                        scaleY: 1,
                    }
                }
                d.prototype.removeEvents = function (b) {
                    b || W(this)
                    this.eventsToUnbind.length &&
                        (this.eventsToUnbind.forEach(function (b) {
                            b()
                        }),
                        (this.eventsToUnbind.length = 0))
                }
                d.prototype.render = function () {
                    var b = this,
                        a = b.chart,
                        e = b.options,
                        g = f(e.animation),
                        c = b.visible ? 'inherit' : 'hidden',
                        k = e.zIndex,
                        d = b.hasRendered,
                        l = a.seriesGroup,
                        r = a.inverted
                    a = !b.finishedAnimating && a.renderer.isSVG ? g.duration : 0
                    B(this, 'render')
                    var n = b.plotGroup('group', 'series', c, k, l)
                    b.markerGroup = b.plotGroup('markerGroup', 'markers', c, k, l)
                    !1 !== e.clip && b.setClip()
                    b.animate && a && b.animate(!0)
                    n.inverted = O(b.invertible, b.isCartesian) ? r : !1
                    b.drawGraph && (b.drawGraph(), b.applyZones())
                    b.visible && b.drawPoints()
                    b.drawDataLabels && b.drawDataLabels()
                    b.redrawPoints && b.redrawPoints()
                    b.drawTracker && !1 !== b.options.enableMouseTracking && b.drawTracker()
                    b.invertGroups(r)
                    b.animate && a && b.animate()
                    d ||
                        (a && g.defer && (a += g.defer),
                        (b.animationTimeout = ha(function () {
                            b.afterAnimate()
                        }, a || 0)))
                    b.isDirty = !1
                    b.hasRendered = !0
                    B(b, 'afterRender')
                }
                d.prototype.redraw = function () {
                    var b = this.chart,
                        a = this.isDirty || this.isDirtyData,
                        e = this.group,
                        g = this.xAxis,
                        c = this.yAxis
                    e &&
                        (b.inverted && e.attr({ width: b.plotWidth, height: b.plotHeight }),
                        e.animate({
                            translateX: O(g && g.left, b.plotLeft),
                            translateY: O(c && c.top, b.plotTop),
                        }))
                    this.translate()
                    this.render()
                    a && delete this.kdTree
                }
                d.prototype.searchPoint = function (b, a) {
                    var e = this.xAxis,
                        g = this.yAxis,
                        c = this.chart.inverted
                    return this.searchKDTree(
                        {
                            clientX: c ? e.len - b.chartY + e.pos : b.chartX - e.pos,
                            plotY: c ? g.len - b.chartX + g.pos : b.chartY - g.pos,
                        },
                        a,
                        b
                    )
                }
                d.prototype.buildKDTree = function (b) {
                    function a(b, g, c) {
                        var f = b && b.length
                        if (f) {
                            var k = e.kdAxisArray[g % c]
                            b.sort(function (b, a) {
                                return b[k] - a[k]
                            })
                            f = Math.floor(f / 2)
                            return {
                                point: b[f],
                                left: a(b.slice(0, f), g + 1, c),
                                right: a(b.slice(f + 1), g + 1, c),
                            }
                        }
                    }
                    this.buildingKdTree = !0
                    var e = this,
                        g = -1 < e.options.findNearestPointBy.indexOf('y') ? 2 : 1
                    delete e.kdTree
                    ha(
                        function () {
                            e.kdTree = a(e.getValidPoints(null, !e.directTouch), g, g)
                            e.buildingKdTree = !1
                        },
                        e.options.kdNow || (b && 'touchstart' === b.type) ? 0 : 1
                    )
                }
                d.prototype.searchKDTree = function (b, a, e) {
                    function g(b, a, e, l) {
                        var r = a.point,
                            n = c.kdAxisArray[e % l],
                            x = r,
                            m = w(b[f]) && w(r[f]) ? Math.pow(b[f] - r[f], 2) : null
                        var p = w(b[k]) && w(r[k]) ? Math.pow(b[k] - r[k], 2) : null
                        p = (m || 0) + (p || 0)
                        r.dist = w(p) ? Math.sqrt(p) : Number.MAX_VALUE
                        r.distX = w(m) ? Math.sqrt(m) : Number.MAX_VALUE
                        n = b[n] - r[n]
                        p = 0 > n ? 'left' : 'right'
                        m = 0 > n ? 'right' : 'left'
                        a[p] && ((p = g(b, a[p], e + 1, l)), (x = p[d] < x[d] ? p : r))
                        a[m] &&
                            Math.sqrt(n * n) < x[d] &&
                            ((b = g(b, a[m], e + 1, l)), (x = b[d] < x[d] ? b : x))
                        return x
                    }
                    var c = this,
                        f = this.kdAxisArray[0],
                        k = this.kdAxisArray[1],
                        d = a ? 'distX' : 'dist'
                    a = -1 < c.options.findNearestPointBy.indexOf('y') ? 2 : 1
                    this.kdTree || this.buildingKdTree || this.buildKDTree(e)
                    if (this.kdTree) return g(b, this.kdTree, a, a)
                }
                d.prototype.pointPlacementToXValue = function () {
                    var b = this.options,
                        a = b.pointRange,
                        e = this.xAxis
                    b = b.pointPlacement
                    'between' === b && (b = e.reversed ? -0.5 : 0.5)
                    return x(b) ? b * (a || e.pointRange) : 0
                }
                d.prototype.isPointInside = function (b) {
                    var a = this.chart,
                        e = this.xAxis,
                        g = this.yAxis
                    return (
                        'undefined' !== typeof b.plotY &&
                        'undefined' !== typeof b.plotX &&
                        0 <= b.plotY &&
                        b.plotY <= (g ? g.len : a.plotHeight) &&
                        0 <= b.plotX &&
                        b.plotX <= (e ? e.len : a.plotWidth)
                    )
                }
                d.prototype.drawTracker = function () {
                    var b = this,
                        a = b.options,
                        e = a.trackByArea,
                        g = [].concat(e ? b.areaPath : b.graphPath),
                        c = b.chart,
                        f = c.pointer,
                        k = c.renderer,
                        d = c.options.tooltip.snap,
                        l = b.tracker,
                        r = function (a) {
                            if (c.hoverSeries !== b) b.onMouseOver()
                        },
                        n = 'rgba(192,192,192,' + (D ? 0.0001 : 0.002) + ')'
                    l
                        ? l.attr({ d: g })
                        : b.graph &&
                          ((b.tracker = k
                              .path(g)
                              .attr({ visibility: b.visible ? 'visible' : 'hidden', zIndex: 2 })
                              .addClass(e ? 'highcharts-tracker-area' : 'highcharts-tracker-line')
                              .add(b.group)),
                          c.styledMode ||
                              b.tracker.attr({
                                  'stroke-linecap': 'round',
                                  'stroke-linejoin': 'round',
                                  stroke: n,
                                  fill: e ? n : 'none',
                                  'stroke-width': b.graph.strokeWidth() + (e ? 0 : 2 * d),
                              }),
                          [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (b) {
                              if (
                                  b &&
                                  (b
                                      .addClass('highcharts-tracker')
                                      .on('mouseover', r)
                                      .on('mouseout', function (b) {
                                          f.onTrackerMouseOut(b)
                                      }),
                                  a.cursor && !c.styledMode && b.css({ cursor: a.cursor }),
                                  m)
                              )
                                  b.on('touchstart', r)
                          }))
                    B(this, 'afterDrawTracker')
                }
                d.prototype.addPoint = function (b, a, e, g, c) {
                    var f = this.options,
                        k = this.data,
                        d = this.chart,
                        l = this.xAxis
                    l = l && l.hasNames && l.names
                    var r = f.data,
                        n = this.xData,
                        x
                    a = O(a, !0)
                    var m = { series: this }
                    this.pointClass.prototype.applyOptions.apply(m, [b])
                    var p = m.x
                    var h = n.length
                    if (this.requireSorting && p < n[h - 1]) for (x = !0; h && n[h - 1] > p; ) h--
                    this.updateParallelArrays(m, 'splice', h, 0, 0)
                    this.updateParallelArrays(m, h)
                    l && m.name && (l[p] = m.name)
                    r.splice(h, 0, b)
                    x && (this.data.splice(h, 0, null), this.processData())
                    'point' === f.legendType && this.generatePoints()
                    e &&
                        (k[0] && k[0].remove
                            ? k[0].remove(!1)
                            : (k.shift(), this.updateParallelArrays(m, 'shift'), r.shift()))
                    !1 !== c && B(this, 'addPoint', { point: m })
                    this.isDirtyData = this.isDirty = !0
                    a && d.redraw(g)
                }
                d.prototype.removePoint = function (b, a, e) {
                    var g = this,
                        f = g.data,
                        k = f[b],
                        d = g.points,
                        l = g.chart,
                        r = function () {
                            d && d.length === f.length && d.splice(b, 1)
                            f.splice(b, 1)
                            g.options.data.splice(b, 1)
                            g.updateParallelArrays(k || { series: g }, 'splice', b, 1)
                            k && k.destroy()
                            g.isDirty = !0
                            g.isDirtyData = !0
                            a && l.redraw()
                        }
                    c(e, l)
                    a = O(a, !0)
                    k ? k.firePointEvent('remove', null, r) : r()
                }
                d.prototype.remove = function (b, a, e, g) {
                    function c() {
                        f.destroy(g)
                        k.isDirtyLegend = k.isDirtyBox = !0
                        k.linkSeries()
                        O(b, !0) && k.redraw(a)
                    }
                    var f = this,
                        k = f.chart
                    !1 !== e ? B(f, 'remove', null, c) : c()
                }
                d.prototype.update = function (b, a) {
                    b = u(b, this.userOptions)
                    B(this, 'update', { options: b })
                    var c = this,
                        f = c.chart,
                        k = c.userOptions,
                        d = c.initialType || c.type,
                        l = f.options.plotOptions,
                        r = I[d].prototype,
                        n = c.finishedAnimating && { animation: !1 },
                        x = {},
                        m,
                        p = ['eventOptions', 'navigatorSeries', 'baseSeries'],
                        h = b.type || k.type || f.options.chart.type,
                        w = !(
                            this.hasDerivedData ||
                            (h && h !== this.type) ||
                            'undefined' !== typeof b.pointStart ||
                            'undefined' !== typeof b.pointInterval ||
                            'undefined' !== typeof b.relativeXValue ||
                            c.hasOptionChanged('dataGrouping') ||
                            c.hasOptionChanged('pointStart') ||
                            c.hasOptionChanged('pointInterval') ||
                            c.hasOptionChanged('pointIntervalUnit') ||
                            c.hasOptionChanged('keys')
                        )
                    h = h || d
                    w &&
                        (p.push(
                            'data',
                            'isDirtyData',
                            'points',
                            'processedXData',
                            'processedYData',
                            'xIncrement',
                            'cropped',
                            '_hasPointMarkers',
                            '_hasPointLabels',
                            'clips',
                            'nodes',
                            'layout',
                            'mapMap',
                            'mapData',
                            'minY',
                            'maxY',
                            'minX',
                            'maxX'
                        ),
                        !1 !== b.visible && p.push('area', 'graph'),
                        c.parallelArrays.forEach(function (b) {
                            p.push(b + 'Data')
                        }),
                        b.data &&
                            (b.dataSorting && g(c.options.dataSorting, b.dataSorting),
                            this.setData(b.data, !1)))
                    b = E(
                        k,
                        n,
                        {
                            index: 'undefined' === typeof k.index ? c.index : k.index,
                            pointStart: O(
                                l && l.series && l.series.pointStart,
                                k.pointStart,
                                c.xData[0]
                            ),
                        },
                        !w && { data: c.options.data },
                        b
                    )
                    w && b.data && (b.data = c.options.data)
                    p = ['group', 'markerGroup', 'dataLabelsGroup', 'transformGroup'].concat(p)
                    p.forEach(function (b) {
                        p[b] = c[b]
                        delete c[b]
                    })
                    l = !1
                    if (I[h]) {
                        if (((l = h !== c.type), c.remove(!1, !1, !1, !0), l))
                            if (Object.setPrototypeOf) Object.setPrototypeOf(c, I[h].prototype)
                            else {
                                n = Object.hasOwnProperty.call(c, 'hcEvents') && c.hcEvents
                                for (m in r) c[m] = void 0
                                g(c, I[h].prototype)
                                n ? (c.hcEvents = n) : delete c.hcEvents
                            }
                    } else e(17, !0, f, { missingModuleFor: h })
                    p.forEach(function (b) {
                        c[b] = p[b]
                    })
                    c.init(f, b)
                    if (w && this.points) {
                        var J = c.options
                        !1 === J.visible
                            ? ((x.graphic = 1), (x.dataLabel = 1))
                            : c._hasPointLabels ||
                              ((b = J.marker),
                              (r = J.dataLabels),
                              !b ||
                                  (!1 !== b.enabled &&
                                      (k.marker && k.marker.symbol) === b.symbol) ||
                                  (x.graphic = 1),
                              r && !1 === r.enabled && (x.dataLabel = 1))
                        this.points.forEach(function (b) {
                            b &&
                                b.series &&
                                (b.resolveColor(),
                                Object.keys(x).length && b.destroyElements(x),
                                !1 === J.showInLegend && b.legendItem && f.legend.destroyItem(b))
                        }, this)
                    }
                    c.initialType = d
                    f.linkSeries()
                    l && c.linkedSeries.length && (c.isDirtyData = !0)
                    B(this, 'afterUpdate')
                    O(a, !0) && f.redraw(w ? void 0 : !1)
                }
                d.prototype.setName = function (b) {
                    this.name = this.options.name = this.userOptions.name = b
                    this.chart.isDirtyLegend = !0
                }
                d.prototype.hasOptionChanged = function (b) {
                    var a = this.options[b],
                        e = this.chart.options.plotOptions,
                        g = this.userOptions[b]
                    return g
                        ? a !== g
                        : a !==
                              O(
                                  e && e[this.type] && e[this.type][b],
                                  e && e.series && e.series[b],
                                  a
                              )
                }
                d.prototype.onMouseOver = function () {
                    var b = this.chart,
                        a = b.hoverSeries
                    b.pointer.setHoverChartIndex()
                    if (a && a !== this) a.onMouseOut()
                    this.options.events.mouseOver && B(this, 'mouseOver')
                    this.setState('hover')
                    b.hoverSeries = this
                }
                d.prototype.onMouseOut = function () {
                    var b = this.options,
                        a = this.chart,
                        e = a.tooltip,
                        g = a.hoverPoint
                    a.hoverSeries = null
                    if (g) g.onMouseOut()
                    this && b.events.mouseOut && B(this, 'mouseOut')
                    !e || this.stickyTracking || (e.shared && !this.noSharedTooltip) || e.hide()
                    a.series.forEach(function (b) {
                        b.setState('', !0)
                    })
                }
                d.prototype.setState = function (b, a) {
                    var e = this,
                        g = e.options,
                        c = e.graph,
                        f = g.inactiveOtherPoints,
                        k = g.states,
                        d = O(
                            k[b || 'normal'] && k[b || 'normal'].animation,
                            e.chart.options.chart.animation
                        ),
                        l = g.lineWidth,
                        r = 0,
                        n = g.opacity
                    b = b || ''
                    if (
                        e.state !== b &&
                        ([e.group, e.markerGroup, e.dataLabelsGroup].forEach(function (a) {
                            a &&
                                (e.state && a.removeClass('highcharts-series-' + e.state),
                                b && a.addClass('highcharts-series-' + b))
                        }),
                        (e.state = b),
                        !e.chart.styledMode)
                    ) {
                        if (k[b] && !1 === k[b].enabled) return
                        b &&
                            ((l = k[b].lineWidth || l + (k[b].lineWidthPlus || 0)),
                            (n = O(k[b].opacity, n)))
                        if (c && !c.dashstyle)
                            for (g = { 'stroke-width': l }, c.animate(g, d); e['zone-graph-' + r]; )
                                e['zone-graph-' + r].animate(g, d), (r += 1)
                        f ||
                            [e.group, e.markerGroup, e.dataLabelsGroup, e.labelBySeries].forEach(
                                function (b) {
                                    b && b.animate({ opacity: n }, d)
                                }
                            )
                    }
                    a && f && e.points && e.setAllPointsToState(b || void 0)
                }
                d.prototype.setAllPointsToState = function (b) {
                    this.points.forEach(function (a) {
                        a.setState && a.setState(b)
                    })
                }
                d.prototype.setVisible = function (b, a) {
                    var e = this,
                        g = e.chart,
                        c = e.legendItem,
                        f = g.options.chart.ignoreHiddenSeries,
                        k = e.visible,
                        d = (e.visible =
                            b =
                            e.options.visible =
                            e.userOptions.visible =
                                'undefined' === typeof b ? !k : b)
                            ? 'show'
                            : 'hide'
                    ;['group', 'dataLabelsGroup', 'markerGroup', 'tracker', 'tt'].forEach(function (
                        b
                    ) {
                        if (e[b]) e[b][d]()
                    })
                    if (g.hoverSeries === e || (g.hoverPoint && g.hoverPoint.series) === e)
                        e.onMouseOut()
                    c && g.legend.colorizeItem(e, b)
                    e.isDirty = !0
                    e.options.stacking &&
                        g.series.forEach(function (b) {
                            b.options.stacking && b.visible && (b.isDirty = !0)
                        })
                    e.linkedSeries.forEach(function (a) {
                        a.setVisible(b, !1)
                    })
                    f && (g.isDirtyBox = !0)
                    B(e, d)
                    !1 !== a && g.redraw()
                }
                d.prototype.show = function () {
                    this.setVisible(!0)
                }
                d.prototype.hide = function () {
                    this.setVisible(!1)
                }
                d.prototype.select = function (b) {
                    this.selected =
                        b =
                        this.options.selected =
                            'undefined' === typeof b ? !this.selected : b
                    this.checkbox && (this.checkbox.checked = b)
                    B(this, b ? 'select' : 'unselect')
                }
                d.prototype.shouldShowTooltip = function (b, a, e) {
                    void 0 === e && (e = {})
                    e.series = this
                    e.visiblePlotOnly = !0
                    return this.chart.isInsidePlot(b, a, e)
                }
                d.defaultOptions = H
                return d
            })()
            g(d.prototype, {
                axisTypes: ['xAxis', 'yAxis'],
                coll: 'series',
                colorCounter: 0,
                cropShoulder: 1,
                directTouch: !1,
                drawLegendSymbol: t.drawLineMarker,
                isCartesian: !0,
                kdAxisArray: ['clientX', 'plotY'],
                parallelArrays: ['x', 'y'],
                pointClass: G,
                requireSorting: !0,
                sorted: !0,
            })
            y.series = d
            ;('')
            ;('')
            return d
        }
    )
    N(
        h,
        'Extensions/ScrollablePlotArea.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Axis/Axis.js'],
            h['Core/Chart/Chart.js'],
            h['Core/Series/Series.js'],
            h['Core/Renderer/RendererRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G) {
            var E = d.stop,
                y = G.addEvent,
                q = G.createElement,
                p = G.merge,
                f = G.pick
            y(A, 'afterSetChartSize', function (c) {
                var a = this.options.chart.scrollablePlotArea,
                    f = a && a.minWidth
                a = a && a.minHeight
                if (!this.renderer.forExport) {
                    if (f) {
                        if ((this.scrollablePixelsX = f = Math.max(0, f - this.chartWidth))) {
                            this.scrollablePlotBox = this.renderer.scrollablePlotBox = p(
                                this.plotBox
                            )
                            this.plotBox.width = this.plotWidth += f
                            this.inverted ? (this.clipBox.height += f) : (this.clipBox.width += f)
                            var d = { 1: { name: 'right', value: f } }
                        }
                    } else
                        a &&
                            (this.scrollablePixelsY = f = Math.max(0, a - this.chartHeight)) &&
                            ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                                p(this.plotBox)),
                            (this.plotBox.height = this.plotHeight += f),
                            this.inverted ? (this.clipBox.width += f) : (this.clipBox.height += f),
                            (d = { 2: { name: 'bottom', value: f } }))
                    d &&
                        !c.skipAxes &&
                        this.axes.forEach(function (a) {
                            d[a.side]
                                ? (a.getPlotLinePath = function () {
                                      var c = d[a.side].name,
                                          f = this[c]
                                      this[c] = f - d[a.side].value
                                      var n = h.prototype.getPlotLinePath.apply(this, arguments)
                                      this[c] = f
                                      return n
                                  })
                                : (a.setAxisSize(), a.setAxisTranslation())
                        })
                }
            })
            y(A, 'render', function () {
                this.scrollablePixelsX || this.scrollablePixelsY
                    ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
                    : this.fixedDiv && this.applyFixed()
            })
            A.prototype.setUpScrolling = function () {
                var c = this,
                    a = {
                        WebkitOverflowScrolling: 'touch',
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    }
                this.scrollablePixelsX && (a.overflowX = 'auto')
                this.scrollablePixelsY && (a.overflowY = 'auto')
                this.scrollingParent = q(
                    'div',
                    { className: 'highcharts-scrolling-parent' },
                    { position: 'relative' },
                    this.renderTo
                )
                this.scrollingContainer = q(
                    'div',
                    { className: 'highcharts-scrolling' },
                    a,
                    this.scrollingParent
                )
                y(this.scrollingContainer, 'scroll', function () {
                    c.pointer && delete c.pointer.chartPosition
                })
                this.innerContainer = q(
                    'div',
                    { className: 'highcharts-inner-container' },
                    null,
                    this.scrollingContainer
                )
                this.innerContainer.appendChild(this.container)
                this.setUpScrolling = null
            }
            A.prototype.moveFixedElements = function () {
                var c = this.container,
                    a = this.fixedRenderer,
                    f =
                        '.highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title'.split(
                            ' '
                        ),
                    d
                this.scrollablePixelsX && !this.inverted
                    ? (d = '.highcharts-yaxis')
                    : this.scrollablePixelsX && this.inverted
                    ? (d = '.highcharts-xaxis')
                    : this.scrollablePixelsY && !this.inverted
                    ? (d = '.highcharts-xaxis')
                    : this.scrollablePixelsY && this.inverted && (d = '.highcharts-yaxis')
                d &&
                    f.push(
                        d + ':not(.highcharts-radial-axis)',
                        d + '-labels:not(.highcharts-radial-axis-labels)'
                    )
                f.forEach(function (f) {
                    ;[].forEach.call(c.querySelectorAll(f), function (c) {
                        ;(c.namespaceURI === a.SVG_NS ? a.box : a.box.parentNode).appendChild(c)
                        c.style.pointerEvents = 'auto'
                    })
                })
            }
            A.prototype.applyFixed = function () {
                var c = !this.fixedDiv,
                    a = this.options.chart,
                    d = a.scrollablePlotArea,
                    m = t.getRendererType()
                c
                    ? ((this.fixedDiv = q(
                          'div',
                          { className: 'highcharts-fixed' },
                          {
                              position: 'absolute',
                              overflow: 'hidden',
                              pointerEvents: 'none',
                              zIndex: ((a.style && a.style.zIndex) || 0) + 2,
                              top: 0,
                          },
                          null,
                          !0
                      )),
                      this.scrollingContainer &&
                          this.scrollingContainer.parentNode.insertBefore(
                              this.fixedDiv,
                              this.scrollingContainer
                          ),
                      (this.renderTo.style.overflow = 'visible'),
                      (this.fixedRenderer = a =
                          new m(
                              this.fixedDiv,
                              this.chartWidth,
                              this.chartHeight,
                              this.options.chart.style
                          )),
                      (this.scrollableMask = a
                          .path()
                          .attr({
                              fill: this.options.chart.backgroundColor || '#fff',
                              'fill-opacity': f(d.opacity, 0.85),
                              zIndex: -1,
                          })
                          .addClass('highcharts-scrollable-mask')
                          .add()),
                      y(this, 'afterShowResetZoom', this.moveFixedElements),
                      y(this, 'afterDrilldown', this.moveFixedElements),
                      y(this, 'afterLayOutTitles', this.moveFixedElements))
                    : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight)
                if (this.scrollableDirty || c) (this.scrollableDirty = !1), this.moveFixedElements()
                a = this.chartWidth + (this.scrollablePixelsX || 0)
                m = this.chartHeight + (this.scrollablePixelsY || 0)
                E(this.container)
                this.container.style.width = a + 'px'
                this.container.style.height = m + 'px'
                this.renderer.boxWrapper.attr({
                    width: a,
                    height: m,
                    viewBox: [0, 0, a, m].join(' '),
                })
                this.chartBackground.attr({ width: a, height: m })
                this.scrollingContainer.style.height = this.chartHeight + 'px'
                c &&
                    (d.scrollPositionX &&
                        (this.scrollingContainer.scrollLeft =
                            this.scrollablePixelsX * d.scrollPositionX),
                    d.scrollPositionY &&
                        (this.scrollingContainer.scrollTop =
                            this.scrollablePixelsY * d.scrollPositionY))
                m = this.axisOffset
                c = this.plotTop - m[0] - 1
                d = this.plotLeft - m[3] - 1
                a = this.plotTop + this.plotHeight + m[2] + 1
                m = this.plotLeft + this.plotWidth + m[1] + 1
                var p = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                    h = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0)
                c = this.scrollablePixelsX
                    ? [
                          ['M', 0, c],
                          ['L', this.plotLeft - 1, c],
                          ['L', this.plotLeft - 1, a],
                          ['L', 0, a],
                          ['Z'],
                          ['M', p, c],
                          ['L', this.chartWidth, c],
                          ['L', this.chartWidth, a],
                          ['L', p, a],
                          ['Z'],
                      ]
                    : this.scrollablePixelsY
                    ? [
                          ['M', d, 0],
                          ['L', d, this.plotTop - 1],
                          ['L', m, this.plotTop - 1],
                          ['L', m, 0],
                          ['Z'],
                          ['M', d, h],
                          ['L', d, this.chartHeight],
                          ['L', m, this.chartHeight],
                          ['L', m, h],
                          ['Z'],
                      ]
                    : [['M', 0, 0]]
                'adjustHeight' !== this.redrawTrigger && this.scrollableMask.attr({ d: c })
            }
            y(h, 'afterInit', function () {
                this.chart.scrollableDirty = !0
            })
            y(F, 'show', function () {
                this.chart.scrollableDirty = !0
            })
            ;('')
        }
    )
    N(
        h,
        'Core/Axis/StackingAxis.js',
        [h['Core/Animation/AnimationUtilities.js'], h['Core/Axis/Axis.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = d.getDeferredAnimation,
                t = A.addEvent,
                G = A.destroyObjectProperties,
                H = A.fireEvent,
                y = A.isNumber,
                q = A.objectEach,
                p
            ;(function (f) {
                function c() {
                    var a = this.stacking
                    if (a) {
                        var c = a.stacks
                        q(c, function (a, f) {
                            G(a)
                            c[f] = null
                        })
                        a && a.stackTotalGroup && a.stackTotalGroup.destroy()
                    }
                }
                function a() {
                    this.stacking || (this.stacking = new m(this))
                }
                var d = []
                f.compose = function (f) {
                    ;-1 === d.indexOf(f) && (d.push(f), t(f, 'init', a), t(f, 'destroy', c))
                    return f
                }
                var m = (function () {
                    function a(a) {
                        this.oldStacks = {}
                        this.stacks = {}
                        this.stacksTouched = 0
                        this.axis = a
                    }
                    a.prototype.buildStacks = function () {
                        var a = this.axis,
                            c = a.series,
                            f = a.options.reversedStacks,
                            d = c.length,
                            n
                        if (!a.isXAxis) {
                            this.usePercentage = !1
                            for (n = d; n--; ) {
                                var m = c[f ? n : d - n - 1]
                                m.setStackedPoints()
                                m.setGroupedPoints()
                            }
                            for (n = 0; n < d; n++) c[n].modifyStacks()
                            H(a, 'afterBuildStacks')
                        }
                    }
                    a.prototype.cleanStacks = function () {
                        if (!this.axis.isXAxis) {
                            if (this.oldStacks) var a = (this.stacks = this.oldStacks)
                            q(a, function (a) {
                                q(a, function (a) {
                                    a.cumulative = a.total
                                })
                            })
                        }
                    }
                    a.prototype.resetStacks = function () {
                        var a = this,
                            c = a.stacks
                        a.axis.isXAxis ||
                            q(c, function (c) {
                                q(c, function (f, d) {
                                    y(f.touched) && f.touched < a.stacksTouched
                                        ? (f.destroy(), delete c[d])
                                        : ((f.total = null), (f.cumulative = null))
                                })
                            })
                    }
                    a.prototype.renderStackTotals = function () {
                        var a = this.axis,
                            c = a.chart,
                            f = c.renderer,
                            d = this.stacks
                        a = E(c, (a.options.stackLabels && a.options.stackLabels.animation) || !1)
                        var n = (this.stackTotalGroup =
                            this.stackTotalGroup ||
                            f
                                .g('stack-labels')
                                .attr({ visibility: 'visible', zIndex: 6, opacity: 0 })
                                .add())
                        n.translate(c.plotLeft, c.plotTop)
                        q(d, function (a) {
                            q(a, function (a) {
                                a.render(n)
                            })
                        })
                        n.animate({ opacity: 1 }, a)
                    }
                    return a
                })()
                f.Additions = m
            })(p || (p = {}))
            return p
        }
    )
    N(
        h,
        'Extensions/Stacking.js',
        [
            h['Core/Axis/Axis.js'],
            h['Core/Chart/Chart.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Globals.js'],
            h['Core/Series/Series.js'],
            h['Core/Axis/StackingAxis.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H) {
            var y = A.format,
                q = H.correctFloat,
                p = H.defined,
                f = H.destroyObjectProperties,
                c = H.isArray,
                a = H.isNumber,
                n = H.objectEach,
                m = H.pick,
                D = (function () {
                    function c(a, c, f, d, n) {
                        var m = a.chart.inverted
                        this.axis = a
                        this.isNegative = f
                        this.options = c = c || {}
                        this.x = d
                        this.total = null
                        this.points = {}
                        this.hasValidPoints = !1
                        this.stack = n
                        this.rightCliff = this.leftCliff = 0
                        this.alignOptions = {
                            align: c.align || (m ? (f ? 'left' : 'right') : 'center'),
                            verticalAlign: c.verticalAlign || (m ? 'middle' : f ? 'bottom' : 'top'),
                            y: c.y,
                            x: c.x,
                        }
                        this.textAlign = c.textAlign || (m ? (f ? 'right' : 'left') : 'center')
                    }
                    c.prototype.destroy = function () {
                        f(this, this.axis)
                    }
                    c.prototype.render = function (a) {
                        var c = this.axis.chart,
                            f = this.options,
                            d = f.format
                        d = d ? y(d, this, c) : f.formatter.call(this)
                        this.label
                            ? this.label.attr({ text: d, visibility: 'hidden' })
                            : ((this.label = c.renderer.label(
                                  d,
                                  null,
                                  null,
                                  f.shape,
                                  null,
                                  null,
                                  f.useHTML,
                                  !1,
                                  'stack-labels'
                              )),
                              (d = {
                                  r: f.borderRadius || 0,
                                  text: d,
                                  rotation: f.rotation,
                                  padding: m(f.padding, 5),
                                  visibility: 'hidden',
                              }),
                              c.styledMode ||
                                  ((d.fill = f.backgroundColor),
                                  (d.stroke = f.borderColor),
                                  (d['stroke-width'] = f.borderWidth),
                                  this.label.css(f.style)),
                              this.label.attr(d),
                              this.label.added || this.label.add(a))
                        this.label.labelrank = c.plotSizeY
                    }
                    c.prototype.setOffset = function (c, f, d, n, h) {
                        var u = this.axis,
                            k = u.chart
                        n = u.translate(
                            u.stacking.usePercentage ? 100 : n ? n : this.total,
                            0,
                            0,
                            0,
                            1
                        )
                        d = u.translate(d ? d : 0)
                        d = p(n) && Math.abs(n - d)
                        c = m(h, k.xAxis[0].translate(this.x)) + c
                        u = p(n) && this.getStackBox(k, this, c, n, f, d, u)
                        f = this.label
                        d = this.isNegative
                        c = 'justify' === m(this.options.overflow, 'justify')
                        var w = this.textAlign
                        f &&
                            u &&
                            ((h = f.getBBox()),
                            (n = f.padding),
                            (w =
                                'left' === w
                                    ? k.inverted
                                        ? -n
                                        : n
                                    : 'right' === w
                                    ? h.width
                                    : k.inverted && 'center' === w
                                    ? h.width / 2
                                    : k.inverted
                                    ? d
                                        ? h.width + n
                                        : -n
                                    : h.width / 2),
                            (d = k.inverted ? h.height / 2 : d ? -n : h.height),
                            (this.alignOptions.x = m(this.options.x, 0)),
                            (this.alignOptions.y = m(this.options.y, 0)),
                            (u.x -= w),
                            (u.y -= d),
                            f.align(this.alignOptions, null, u),
                            k.isInsidePlot(
                                f.alignAttr.x + w - this.alignOptions.x,
                                f.alignAttr.y + d - this.alignOptions.y
                            )
                                ? f.show()
                                : ((f.alignAttr.y = -9999), (c = !1)),
                            c &&
                                t.prototype.justifyDataLabel.call(
                                    this.axis,
                                    f,
                                    this.alignOptions,
                                    f.alignAttr,
                                    h,
                                    u
                                ),
                            f.attr({ x: f.alignAttr.x, y: f.alignAttr.y }),
                            m(!c && this.options.crop, !0) &&
                                ((k =
                                    a(f.x) &&
                                    a(f.y) &&
                                    k.isInsidePlot(f.x - n + f.width, f.y) &&
                                    k.isInsidePlot(f.x + n, f.y)) ||
                                    f.hide()))
                    }
                    c.prototype.getStackBox = function (a, c, f, d, n, m, k) {
                        var p = c.axis.reversed,
                            l = a.inverted,
                            e = k.height + k.pos - (l ? a.plotLeft : a.plotTop)
                        c = (c.isNegative && !p) || (!c.isNegative && p)
                        return {
                            x: l
                                ? c
                                    ? d - k.right
                                    : d - m + k.pos - a.plotLeft
                                : f + a.xAxis[0].transB - a.plotLeft,
                            y: l ? k.height - f - n : c ? e - d - m : e - d,
                            width: l ? m : n,
                            height: l ? n : m,
                        }
                    }
                    return c
                })()
            h.prototype.getStacks = function () {
                var a = this,
                    c = a.inverted
                a.yAxis.forEach(function (a) {
                    a.stacking &&
                        a.stacking.stacks &&
                        a.hasVisibleSeries &&
                        (a.stacking.oldStacks = a.stacking.stacks)
                })
                a.series.forEach(function (f) {
                    var d = (f.xAxis && f.xAxis.options) || {}
                    !f.options.stacking ||
                        (!0 !== f.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
                        (f.stackKey = [
                            f.type,
                            m(f.options.stack, ''),
                            c ? d.top : d.left,
                            c ? d.height : d.width,
                        ].join())
                })
            }
            G.compose(d)
            t.prototype.setGroupedPoints = function () {
                var a = this.yAxis.stacking
                this.options.centerInCategory &&
                (this.is('column') || this.is('columnrange')) &&
                !this.options.stacking &&
                1 < this.chart.series.length
                    ? t.prototype.setStackedPoints.call(this, 'group')
                    : a &&
                      n(a.stacks, function (c, f) {
                          'group' === f.slice(-5) &&
                              (n(c, function (a) {
                                  return a.destroy()
                              }),
                              delete a.stacks[f])
                      })
            }
            t.prototype.setStackedPoints = function (a) {
                var f = a || this.options.stacking
                if (
                    f &&
                    (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)
                ) {
                    var d = this.processedXData,
                        n = this.processedYData,
                        h = [],
                        z = n.length,
                        u = this.options,
                        k = u.threshold,
                        w = m(u.startFromThreshold && k, 0)
                    u = u.stack
                    a = a ? this.type + ',' + f : this.stackKey
                    var l = '-' + a,
                        e = this.negStacks,
                        g = this.yAxis,
                        b = g.stacking.stacks,
                        B = g.stacking.oldStacks,
                        J,
                        r
                    g.stacking.stacksTouched += 1
                    for (r = 0; r < z; r++) {
                        var x = d[r]
                        var M = n[r]
                        var C = this.getStackIndicator(C, x, this.index)
                        var t = C.key
                        var O = (J = e && M < (w ? 0 : k)) ? l : a
                        b[O] || (b[O] = {})
                        b[O][x] ||
                            (B[O] && B[O][x]
                                ? ((b[O][x] = B[O][x]), (b[O][x].total = null))
                                : (b[O][x] = new D(g, g.options.stackLabels, J, x, u)))
                        O = b[O][x]
                        null !== M
                            ? ((O.points[t] = O.points[this.index] = [m(O.cumulative, w)]),
                              p(O.cumulative) || (O.base = t),
                              (O.touched = g.stacking.stacksTouched),
                              0 < C.index &&
                                  !1 === this.singleStacks &&
                                  (O.points[t][0] = O.points[this.index + ',' + x + ',0'][0]))
                            : (O.points[t] = O.points[this.index] = null)
                        'percent' === f
                            ? ((J = J ? a : l),
                              e && b[J] && b[J][x]
                                  ? ((J = b[J][x]),
                                    (O.total = J.total =
                                        Math.max(J.total, O.total) + Math.abs(M) || 0))
                                  : (O.total = q(O.total + (Math.abs(M) || 0))))
                            : 'group' === f
                            ? (c(M) && (M = M[0]), null !== M && (O.total = (O.total || 0) + 1))
                            : (O.total = q(O.total + (M || 0)))
                        O.cumulative =
                            'group' === f ? (O.total || 1) - 1 : m(O.cumulative, w) + (M || 0)
                        null !== M &&
                            (O.points[t].push(O.cumulative),
                            (h[r] = O.cumulative),
                            (O.hasValidPoints = !0))
                    }
                    'percent' === f && (g.stacking.usePercentage = !0)
                    'group' !== f && (this.stackedYData = h)
                    g.stacking.oldStacks = {}
                }
            }
            t.prototype.modifyStacks = function () {
                var a = this,
                    c = a.stackKey,
                    f = a.yAxis.stacking.stacks,
                    d = a.processedXData,
                    n,
                    m = a.options.stacking
                a[m + 'Stacker'] &&
                    [c, '-' + c].forEach(function (c) {
                        for (var k = d.length, p, l; k--; )
                            if (
                                ((p = d[k]),
                                (n = a.getStackIndicator(n, p, a.index, c)),
                                (l = (p = f[c] && f[c][p]) && p.points[n.key]))
                            )
                                a[m + 'Stacker'](l, p, k)
                    })
            }
            t.prototype.percentStacker = function (a, c, f) {
                c = c.total ? 100 / c.total : 0
                a[0] = q(a[0] * c)
                a[1] = q(a[1] * c)
                this.stackedYData[f] = a[1]
            }
            t.prototype.getStackIndicator = function (a, c, f, d) {
                !p(a) || a.x !== c || (d && a.key !== d)
                    ? (a = { x: c, index: 0, key: d })
                    : a.index++
                a.key = [f, c, a.index].join()
                return a
            }
            F.StackItem = D
            ;('')
            return F.StackItem
        }
    )
    N(
        h,
        'Series/Line/LineSeries.js',
        [h['Core/Series/Series.js'], h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, q) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (d, f) {
                                        d.__proto__ = f
                                    }) ||
                                function (d, f) {
                                    for (var c in f) f.hasOwnProperty(c) && (d[c] = f[c])
                                }
                            return d(h, q)
                        }
                        return function (h, q) {
                            function p() {
                                this.constructor = h
                            }
                            d(h, q)
                            h.prototype =
                                null === q
                                    ? Object.create(q)
                                    : ((p.prototype = q.prototype), new p())
                        }
                    })(),
                t = A.defined,
                G = A.merge
            A = (function (h) {
                function y() {
                    var d = (null !== h && h.apply(this, arguments)) || this
                    d.data = void 0
                    d.options = void 0
                    d.points = void 0
                    return d
                }
                E(y, h)
                y.prototype.drawGraph = function () {
                    var d = this,
                        p = this.options,
                        f = (this.gappedPath || this.getGraphPath).call(this),
                        c = this.chart.styledMode,
                        a = [['graph', 'highcharts-graph']]
                    c || a[0].push(p.lineColor || this.color || '#cccccc', p.dashStyle)
                    a = d.getZonesGraphs(a)
                    a.forEach(function (a, m) {
                        var n = a[0],
                            h = d[n],
                            q = h ? 'animate' : 'attr'
                        h
                            ? ((h.endX = d.preventGraphAnimation ? null : f.xMap),
                              h.animate({ d: f }))
                            : f.length &&
                              (d[n] = h =
                                  d.chart.renderer
                                      .path(f)
                                      .addClass(a[1])
                                      .attr({ zIndex: 1 })
                                      .add(d.group))
                        h &&
                            !c &&
                            ((n = {
                                stroke: a[2],
                                'stroke-width': p.lineWidth,
                                fill: (d.fillGraph && d.color) || 'none',
                            }),
                            a[3]
                                ? (n.dashstyle = a[3])
                                : 'square' !== p.linecap &&
                                  (n['stroke-linecap'] = n['stroke-linejoin'] = 'round'),
                            h[q](n).shadow(2 > m && p.shadow))
                        h && ((h.startX = f.xMap), (h.isArea = f.isArea))
                    })
                }
                y.prototype.getGraphPath = function (d, p, f) {
                    var c = this,
                        a = c.options,
                        n = [],
                        m = [],
                        h,
                        q = a.step
                    d = d || c.points
                    var I = d.reversed
                    I && d.reverse()
                    ;(q = { right: 1, center: 2 }[q] || (q && 3)) && I && (q = 4 - q)
                    d = this.getValidPoints(d, !1, !(a.connectNulls && !p && !f))
                    d.forEach(function (D, C) {
                        var v = D.plotX,
                            z = D.plotY,
                            u = d[C - 1]
                        ;(D.leftCliff || (u && u.rightCliff)) && !f && (h = !0)
                        D.isNull && !t(p) && 0 < C
                            ? (h = !a.connectNulls)
                            : D.isNull && !p
                            ? (h = !0)
                            : (0 === C || h
                                  ? (C = [['M', D.plotX, D.plotY]])
                                  : c.getPointSpline
                                  ? (C = [c.getPointSpline(d, D, C)])
                                  : q
                                  ? ((C =
                                        1 === q
                                            ? [['L', u.plotX, z]]
                                            : 2 === q
                                            ? [
                                                  ['L', (u.plotX + v) / 2, u.plotY],
                                                  ['L', (u.plotX + v) / 2, z],
                                              ]
                                            : [['L', v, u.plotY]]),
                                    C.push(['L', v, z]))
                                  : (C = [['L', v, z]]),
                              m.push(D.x),
                              q && (m.push(D.x), 2 === q && m.push(D.x)),
                              n.push.apply(n, C),
                              (h = !1))
                    })
                    n.xMap = m
                    return (c.graphPath = n)
                }
                y.prototype.getZonesGraphs = function (d) {
                    this.zones.forEach(function (h, f) {
                        f = [
                            'zone-graph-' + f,
                            'highcharts-graph highcharts-zone-graph-' +
                                f +
                                ' ' +
                                (h.className || ''),
                        ]
                        this.chart.styledMode ||
                            f.push(h.color || this.color, h.dashStyle || this.options.dashStyle)
                        d.push(f)
                    }, this)
                    return d
                }
                y.defaultOptions = G(d.defaultOptions, {})
                return y
            })(d)
            h.registerSeriesType('line', A)
            ;('')
            return A
        }
    )
    N(
        h,
        'Series/Area/AreaSeries.js',
        [
            h['Core/Color/Color.js'],
            h['Core/Legend/LegendSymbol.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t =
                    (this && this.__extends) ||
                    (function () {
                        var f = function (c, a) {
                            f =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return f(c, a)
                        }
                        return function (c, a) {
                            function d() {
                                this.constructor = c
                            }
                            f(c, a)
                            c.prototype =
                                null === a
                                    ? Object.create(a)
                                    : ((d.prototype = a.prototype), new d())
                        }
                    })(),
                E = d.parse,
                H = A.seriesTypes.line
            d = F.extend
            var y = F.merge,
                q = F.objectEach,
                p = F.pick
            F = (function (f) {
                function c() {
                    var a = (null !== f && f.apply(this, arguments)) || this
                    a.data = void 0
                    a.options = void 0
                    a.points = void 0
                    return a
                }
                t(c, f)
                c.prototype.drawGraph = function () {
                    this.areaPath = []
                    f.prototype.drawGraph.apply(this)
                    var a = this,
                        c = this.areaPath,
                        d = this.options,
                        h = [['area', 'highcharts-area', this.color, d.fillColor]]
                    this.zones.forEach(function (c, f) {
                        h.push([
                            'zone-area-' + f,
                            'highcharts-area highcharts-zone-area-' + f + ' ' + c.className,
                            c.color || a.color,
                            c.fillColor || d.fillColor,
                        ])
                    })
                    h.forEach(function (f) {
                        var n = f[0],
                            m = a[n],
                            h = m ? 'animate' : 'attr',
                            q = {}
                        m
                            ? ((m.endX = a.preventGraphAnimation ? null : c.xMap),
                              m.animate({ d: c }))
                            : ((q.zIndex = 0),
                              (m = a[n] = a.chart.renderer.path(c).addClass(f[1]).add(a.group)),
                              (m.isArea = !0))
                        a.chart.styledMode ||
                            (q.fill = p(f[3], E(f[2]).setOpacity(p(d.fillOpacity, 0.75)).get()))
                        m[h](q)
                        m.startX = c.xMap
                        m.shiftUnit = d.step ? 2 : 1
                    })
                }
                c.prototype.getGraphPath = function (a) {
                    var c = H.prototype.getGraphPath,
                        f = this.options,
                        d = f.stacking,
                        h = this.yAxis,
                        q,
                        t = [],
                        y = [],
                        v = this.index,
                        z = h.stacking.stacks[this.stackKey],
                        u = f.threshold,
                        k = Math.round(h.getThreshold(f.threshold))
                    f = p(f.connectNulls, 'percent' === d)
                    var w = function (b, g, c) {
                        var f = a[b]
                        b = d && z[f.x].points[v]
                        var l = f[c + 'Null'] || 0
                        c = f[c + 'Cliff'] || 0
                        f = !0
                        if (c || l) {
                            var n = (l ? b[0] : b[1]) + c
                            var m = b[0] + c
                            f = !!l
                        } else !d && a[g] && a[g].isNull && (n = m = u)
                        'undefined' !== typeof n &&
                            (y.push({
                                plotX: e,
                                plotY: null === n ? k : h.getThreshold(n),
                                isNull: f,
                                isCliff: !0,
                            }),
                            t.push({
                                plotX: e,
                                plotY: null === m ? k : h.getThreshold(m),
                                doCurve: !1,
                            }))
                    }
                    a = a || this.points
                    d && (a = this.getStackPoints(a))
                    for (q = 0; q < a.length; q++) {
                        d ||
                            (a[q].leftCliff =
                                a[q].rightCliff =
                                a[q].leftNull =
                                a[q].rightNull =
                                    void 0)
                        var l = a[q].isNull
                        var e = p(a[q].rectPlotX, a[q].plotX)
                        var g = d ? p(a[q].yBottom, k) : k
                        if (!l || f)
                            f || w(q, q - 1, 'left'),
                                (l && !d && f) ||
                                    (y.push(a[q]), t.push({ x: q, plotX: e, plotY: g })),
                                f || w(q, q + 1, 'right')
                    }
                    q = c.call(this, y, !0, !0)
                    t.reversed = !0
                    l = c.call(this, t, !0, !0)
                    ;(g = l[0]) && 'M' === g[0] && (l[0] = ['L', g[1], g[2]])
                    l = q.concat(l)
                    l.length && l.push(['Z'])
                    c = c.call(this, y, !1, f)
                    l.xMap = q.xMap
                    this.areaPath = l
                    return c
                }
                c.prototype.getStackPoints = function (a) {
                    var c = this,
                        f = [],
                        d = [],
                        h = this.xAxis,
                        t = this.yAxis,
                        y = t.stacking.stacks[this.stackKey],
                        E = {},
                        v = t.series,
                        z = v.length,
                        u = t.options.reversedStacks ? 1 : -1,
                        k = v.indexOf(c)
                    a = a || this.points
                    if (this.options.stacking) {
                        for (var w = 0; w < a.length; w++)
                            (a[w].leftNull = a[w].rightNull = void 0), (E[a[w].x] = a[w])
                        q(y, function (a, g) {
                            null !== a.total && d.push(g)
                        })
                        d.sort(function (a, g) {
                            return a - g
                        })
                        var l = v.map(function (a) {
                            return a.visible
                        })
                        d.forEach(function (a, g) {
                            var b = 0,
                                e,
                                n
                            if (E[a] && !E[a].isNull)
                                f.push(E[a]),
                                    [-1, 1].forEach(function (b) {
                                        var f = 1 === b ? 'rightNull' : 'leftNull',
                                            r = 0,
                                            x = y[d[g + b]]
                                        if (x)
                                            for (var h = k; 0 <= h && h < z; ) {
                                                var m = v[h].index
                                                e = x.points[m]
                                                e ||
                                                    (m === c.index
                                                        ? (E[a][f] = !0)
                                                        : l[h] &&
                                                          (n = y[a].points[m]) &&
                                                          (r -= n[1] - n[0]))
                                                h += u
                                            }
                                        E[a][1 === b ? 'rightCliff' : 'leftCliff'] = r
                                    })
                            else {
                                for (var r = k; 0 <= r && r < z; ) {
                                    if ((e = y[a].points[v[r].index])) {
                                        b = e[1]
                                        break
                                    }
                                    r += u
                                }
                                b = p(b, 0)
                                b = t.translate(b, 0, 1, 0, 1)
                                f.push({
                                    isNull: !0,
                                    plotX: h.translate(a, 0, 0, 0, 1),
                                    x: a,
                                    plotY: b,
                                    yBottom: b,
                                })
                            }
                        })
                    }
                    return f
                }
                c.defaultOptions = y(H.defaultOptions, { threshold: 0 })
                return c
            })(H)
            d(F.prototype, { singleStacks: !1, drawLegendSymbol: h.drawRectangle })
            A.registerSeriesType('area', F)
            ;('')
            return F
        }
    )
    N(
        h,
        'Series/Spline/SplineSeries.js',
        [h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, q) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (d, f) {
                                        d.__proto__ = f
                                    }) ||
                                function (d, f) {
                                    for (var c in f) f.hasOwnProperty(c) && (d[c] = f[c])
                                }
                            return d(h, q)
                        }
                        return function (h, q) {
                            function p() {
                                this.constructor = h
                            }
                            d(h, q)
                            h.prototype =
                                null === q
                                    ? Object.create(q)
                                    : ((p.prototype = q.prototype), new p())
                        }
                    })(),
                F = d.seriesTypes.line,
                t = h.merge,
                G = h.pick
            h = (function (d) {
                function h() {
                    var h = (null !== d && d.apply(this, arguments)) || this
                    h.data = void 0
                    h.options = void 0
                    h.points = void 0
                    return h
                }
                E(h, d)
                h.prototype.getPointSpline = function (d, h, f) {
                    var c = h.plotX || 0,
                        a = h.plotY || 0,
                        n = d[f - 1]
                    f = d[f + 1]
                    if (
                        n &&
                        !n.isNull &&
                        !1 !== n.doCurve &&
                        !h.isCliff &&
                        f &&
                        !f.isNull &&
                        !1 !== f.doCurve &&
                        !h.isCliff
                    ) {
                        d = n.plotY || 0
                        var m = f.plotX || 0
                        f = f.plotY || 0
                        var p = 0
                        var q = (1.5 * c + (n.plotX || 0)) / 2.5
                        var t = (1.5 * a + d) / 2.5
                        m = (1.5 * c + m) / 2.5
                        var y = (1.5 * a + f) / 2.5
                        m !== q && (p = ((y - t) * (m - c)) / (m - q) + a - y)
                        t += p
                        y += p
                        t > d && t > a
                            ? ((t = Math.max(d, a)), (y = 2 * a - t))
                            : t < d && t < a && ((t = Math.min(d, a)), (y = 2 * a - t))
                        y > f && y > a
                            ? ((y = Math.max(f, a)), (t = 2 * a - y))
                            : y < f && y < a && ((y = Math.min(f, a)), (t = 2 * a - y))
                        h.rightContX = m
                        h.rightContY = y
                    }
                    h = [
                        'C',
                        G(n.rightContX, n.plotX, 0),
                        G(n.rightContY, n.plotY, 0),
                        G(q, c, 0),
                        G(t, a, 0),
                        c,
                        a,
                    ]
                    n.rightContX = n.rightContY = void 0
                    return h
                }
                h.defaultOptions = t(F.defaultOptions)
                return h
            })(F)
            d.registerSeriesType('spline', h)
            ;('')
            return h
        }
    )
    N(
        h,
        'Series/AreaSpline/AreaSplineSeries.js',
        [
            h['Series/Area/AreaSeries.js'],
            h['Series/Spline/SplineSeries.js'],
            h['Core/Legend/LegendSymbol.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (f, c) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return d(f, c)
                        }
                        return function (f, c) {
                            function a() {
                                this.constructor = f
                            }
                            d(f, c)
                            f.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((a.prototype = c.prototype), new a())
                        }
                    })(),
                H = d.prototype,
                y = t.extend,
                q = t.merge
            t = (function (p) {
                function f() {
                    var c = (null !== p && p.apply(this, arguments)) || this
                    c.data = void 0
                    c.points = void 0
                    c.options = void 0
                    return c
                }
                E(f, p)
                f.defaultOptions = q(h.defaultOptions, d.defaultOptions)
                return f
            })(h)
            y(t.prototype, {
                getGraphPath: H.getGraphPath,
                getStackPoints: H.getStackPoints,
                drawGraph: H.drawGraph,
                drawLegendSymbol: A.drawRectangle,
            })
            F.registerSeriesType('areaspline', t)
            ;('')
            return t
        }
    )
    N(
        h,
        'Series/Column/ColumnSeries.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Color/Color.js'],
            h['Core/Globals.js'],
            h['Core/Legend/LegendSymbol.js'],
            h['Core/Series/Series.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H) {
            var y =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (c, f) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                                }
                            return a(c, f)
                        }
                        return function (c, f) {
                            function d() {
                                this.constructor = c
                            }
                            a(c, f)
                            c.prototype =
                                null === f
                                    ? Object.create(f)
                                    : ((d.prototype = f.prototype), new d())
                        }
                    })(),
                q = d.animObject,
                p = h.parse,
                f = A.hasTouch
            d = A.noop
            var c = H.clamp,
                a = H.css,
                n = H.defined,
                m = H.extend,
                D = H.fireEvent,
                C = H.isArray,
                I = H.isNumber,
                E = H.merge,
                K = H.pick,
                v = H.objectEach
            H = (function (d) {
                function h() {
                    var a = (null !== d && d.apply(this, arguments)) || this
                    a.borderWidth = void 0
                    a.data = void 0
                    a.group = void 0
                    a.options = void 0
                    a.points = void 0
                    return a
                }
                y(h, d)
                h.prototype.animate = function (a) {
                    var f = this,
                        d = this.yAxis,
                        e = f.options,
                        g = this.chart.inverted,
                        b = {},
                        k = g ? 'translateX' : 'translateY'
                    if (a)
                        (b.scaleY = 0.001),
                            (a = c(d.toPixels(e.threshold), d.pos, d.pos + d.len)),
                            g ? (b.translateX = a - d.len) : (b.translateY = a),
                            f.clipBox && f.setClip(),
                            f.group.attr(b)
                    else {
                        var h = Number(f.group.attr(k))
                        f.group.animate(
                            { scaleY: 1 },
                            m(q(f.options.animation), {
                                step: function (a, e) {
                                    f.group && ((b[k] = h + e.pos * (d.pos - h)), f.group.attr(b))
                                },
                            })
                        )
                    }
                }
                h.prototype.init = function (a, c) {
                    d.prototype.init.apply(this, arguments)
                    var f = this
                    a = f.chart
                    a.hasRendered &&
                        a.series.forEach(function (a) {
                            a.type === f.type && (a.isDirty = !0)
                        })
                }
                h.prototype.getColumnMetrics = function () {
                    var a = this,
                        c = a.options,
                        f = a.xAxis,
                        e = a.yAxis,
                        g = f.options.reversedStacks
                    g = (f.reversed && !g) || (!f.reversed && g)
                    var b = {},
                        d,
                        h = 0
                    !1 === c.grouping
                        ? (h = 1)
                        : a.chart.series.forEach(function (c) {
                              var g = c.yAxis,
                                  f = c.options
                              if (
                                  c.type === a.type &&
                                  (c.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                                  e.len === g.len &&
                                  e.pos === g.pos
                              ) {
                                  if (f.stacking && 'group' !== f.stacking) {
                                      d = c.stackKey
                                      'undefined' === typeof b[d] && (b[d] = h++)
                                      var k = b[d]
                                  } else !1 !== f.grouping && (k = h++)
                                  c.columnIndex = k
                              }
                          })
                    var r = Math.min(
                            Math.abs(f.transA) *
                                ((f.ordinal && f.ordinal.slope) ||
                                    c.pointRange ||
                                    f.closestPointRange ||
                                    f.tickInterval ||
                                    1),
                            f.len
                        ),
                        n = r * c.groupPadding,
                        m = (r - 2 * n) / (h || 1)
                    c = Math.min(
                        c.maxPointWidth || f.len,
                        K(c.pointWidth, m * (1 - 2 * c.pointPadding))
                    )
                    a.columnMetrics = {
                        width: c,
                        offset:
                            (m - c) / 2 +
                            (n + ((a.columnIndex || 0) + (g ? 1 : 0)) * m - r / 2) * (g ? -1 : 1),
                        paddedWidth: m,
                        columnCount: h,
                    }
                    return a.columnMetrics
                }
                h.prototype.crispCol = function (a, c, f, e) {
                    var g = this.chart,
                        b = this.borderWidth,
                        d = -(b % 2 ? 0.5 : 0)
                    b = b % 2 ? 0.5 : 1
                    g.inverted && g.renderer.isVML && (b += 1)
                    this.options.crisp &&
                        ((f = Math.round(a + f) + d), (a = Math.round(a) + d), (f -= a))
                    e = Math.round(c + e) + b
                    d = 0.5 >= Math.abs(c) && 0.5 < e
                    c = Math.round(c) + b
                    e -= c
                    d && e && (--c, (e += 1))
                    return { x: a, y: c, width: f, height: e }
                }
                h.prototype.adjustForMissingColumns = function (a, c, f, e) {
                    var g = this,
                        b = this.options.stacking
                    if (!f.isNull && 1 < e.columnCount) {
                        var d = 0,
                            k = 0
                        v(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
                            if ('number' === typeof f.x && (a = a[f.x.toString()])) {
                                var e = a.points[g.index],
                                    c = a.total
                                b
                                    ? (e && (d = k), a.hasValidPoints && k++)
                                    : C(e) && ((d = e[1]), (k = c || 0))
                            }
                        })
                        a =
                            (f.plotX || 0) +
                            ((k - 1) * e.paddedWidth + c) / 2 -
                            c -
                            d * e.paddedWidth
                    }
                    return a
                }
                h.prototype.translate = function () {
                    var a = this,
                        f = a.chart,
                        d = a.options,
                        e = (a.dense = 2 > a.closestPointRange * a.xAxis.transA)
                    e = a.borderWidth = K(d.borderWidth, e ? 0 : 1)
                    var g = a.xAxis,
                        b = a.yAxis,
                        h = d.threshold,
                        m = (a.translatedThreshold = b.getThreshold(h)),
                        r = K(d.minPointLength, 5),
                        x = a.getColumnMetrics(),
                        p = x.width,
                        u = (a.pointXOffset = x.offset),
                        q = a.dataMin,
                        v = a.dataMax,
                        z = (a.barW = Math.max(p, 1 + 2 * e))
                    f.inverted && (m -= 0.5)
                    d.pointPadding && (z = Math.ceil(z))
                    t.prototype.translate.apply(a)
                    a.points.forEach(function (e) {
                        var k = K(e.yBottom, m),
                            l = 999 + Math.abs(k),
                            B = e.plotX || 0
                        l = c(e.plotY, -l, b.len + l)
                        var w = Math.min(l, k),
                            J = Math.max(l, k) - w,
                            M = p,
                            D = B + u,
                            t = z
                        r &&
                            Math.abs(J) < r &&
                            ((J = r),
                            (B = (!b.reversed && !e.negative) || (b.reversed && e.negative)),
                            I(h) &&
                                I(v) &&
                                e.y === h &&
                                v <= h &&
                                (b.min || 0) < h &&
                                (q !== v || (b.max || 0) <= h) &&
                                (B = !B),
                            (w = Math.abs(w - m) > r ? k - r : m - (B ? r : 0)))
                        n(e.options.pointWidth) &&
                            ((M = t = Math.ceil(e.options.pointWidth)),
                            (D -= Math.round((M - p) / 2)))
                        d.centerInCategory && (D = a.adjustForMissingColumns(D, M, e, x))
                        e.barX = D
                        e.pointWidth = M
                        e.tooltipPos = f.inverted
                            ? [
                                  c(
                                      b.len + b.pos - f.plotLeft - l,
                                      b.pos - f.plotLeft,
                                      b.len + b.pos - f.plotLeft
                                  ),
                                  g.len + g.pos - f.plotTop - D - t / 2,
                                  J,
                              ]
                            : [
                                  g.left - f.plotLeft + D + t / 2,
                                  c(
                                      l + b.pos - f.plotTop,
                                      b.pos - f.plotTop,
                                      b.len + b.pos - f.plotTop
                                  ),
                                  J,
                              ]
                        e.shapeType = a.pointClass.prototype.shapeType || 'rect'
                        e.shapeArgs = a.crispCol.apply(a, e.isNull ? [D, m, t, 0] : [D, w, t, J])
                    })
                }
                h.prototype.drawGraph = function () {
                    this.group[this.dense ? 'addClass' : 'removeClass']('highcharts-dense-data')
                }
                h.prototype.pointAttribs = function (a, c) {
                    var f = this.options,
                        e = this.pointAttrToOptions || {},
                        g = e.stroke || 'borderColor',
                        b = e['stroke-width'] || 'borderWidth',
                        d = (a && a.color) || this.color,
                        k = (a && a[g]) || f[g] || d
                    e = (a && a.options.dashStyle) || f.dashStyle
                    var r = (a && a[b]) || f[b] || this[b] || 0,
                        h = K(a && a.opacity, f.opacity, 1)
                    if (a && this.zones.length) {
                        var n = a.getZone()
                        d = a.options.color || (n && (n.color || a.nonZonedColor)) || this.color
                        n &&
                            ((k = n.borderColor || k),
                            (e = n.dashStyle || e),
                            (r = n.borderWidth || r))
                    }
                    c &&
                        a &&
                        ((a = E(f.states[c], (a.options.states && a.options.states[c]) || {})),
                        (c = a.brightness),
                        (d =
                            a.color ||
                            ('undefined' !== typeof c && p(d).brighten(a.brightness).get()) ||
                            d),
                        (k = a[g] || k),
                        (r = a[b] || r),
                        (e = a.dashStyle || e),
                        (h = K(a.opacity, h)))
                    g = { fill: d, stroke: k, 'stroke-width': r, opacity: h }
                    e && (g.dashstyle = e)
                    return g
                }
                h.prototype.drawPoints = function () {
                    var a = this,
                        c = this.chart,
                        f = a.options,
                        e = c.renderer,
                        g = f.animationLimit || 250,
                        b
                    a.points.forEach(function (d) {
                        var k = d.graphic,
                            l = !!k,
                            h = k && c.pointCount < g ? 'animate' : 'attr'
                        if (I(d.plotY) && null !== d.y) {
                            b = d.shapeArgs
                            k && d.hasNewShapeType() && (k = k.destroy())
                            a.enabledDataSorting &&
                                (d.startXPos = a.xAxis.reversed
                                    ? -(b ? b.width || 0 : 0)
                                    : a.xAxis.width)
                            k ||
                                ((d.graphic = k = e[d.shapeType](b).add(d.group || a.group)) &&
                                    a.enabledDataSorting &&
                                    c.hasRendered &&
                                    c.pointCount < g &&
                                    (k.attr({ x: d.startXPos }), (l = !0), (h = 'animate')))
                            if (k && l) k[h](E(b))
                            if (f.borderRadius) k[h]({ r: f.borderRadius })
                            c.styledMode ||
                                k[h](a.pointAttribs(d, d.selected && 'select')).shadow(
                                    !1 !== d.allowShadow && f.shadow,
                                    null,
                                    f.stacking && !f.borderRadius
                                )
                            k &&
                                (k.addClass(d.getClassName(), !0),
                                k.attr({ visibility: d.visible ? 'inherit' : 'hidden' }))
                        } else k && (d.graphic = k.destroy())
                    })
                }
                h.prototype.drawTracker = function () {
                    var c = this,
                        d = c.chart,
                        l = d.pointer,
                        e = function (b) {
                            var a = l.getPointFromEvent(b)
                            'undefined' !== typeof a && ((l.isDirectTouch = !0), a.onMouseOver(b))
                        },
                        g
                    c.points.forEach(function (b) {
                        g = C(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []
                        b.graphic && (b.graphic.element.point = b)
                        g.forEach(function (a) {
                            a.div ? (a.div.point = b) : (a.element.point = b)
                        })
                    })
                    c._hasTracking ||
                        (c.trackerGroups.forEach(function (b) {
                            if (c[b]) {
                                c[b]
                                    .addClass('highcharts-tracker')
                                    .on('mouseover', e)
                                    .on('mouseout', function (b) {
                                        l.onTrackerMouseOut(b)
                                    })
                                if (f) c[b].on('touchstart', e)
                                !d.styledMode &&
                                    c.options.cursor &&
                                    c[b].css(a).css({ cursor: c.options.cursor })
                            }
                        }),
                        (c._hasTracking = !0))
                    D(this, 'afterDrawTracker')
                }
                h.prototype.remove = function () {
                    var a = this,
                        c = a.chart
                    c.hasRendered &&
                        c.series.forEach(function (c) {
                            c.type === a.type && (c.isDirty = !0)
                        })
                    t.prototype.remove.apply(a, arguments)
                }
                h.defaultOptions = E(t.defaultOptions, {
                    borderRadius: 0,
                    centerInCategory: !1,
                    groupPadding: 0.2,
                    marker: null,
                    pointPadding: 0.1,
                    minPointLength: 0,
                    cropThreshold: 50,
                    pointRange: null,
                    states: {
                        hover: { halo: !1, brightness: 0.1 },
                        select: { color: '#cccccc', borderColor: '#000000' },
                    },
                    dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
                    startFromThreshold: !0,
                    stickyTracking: !1,
                    tooltip: { distance: 6 },
                    threshold: 0,
                    borderColor: '#ffffff',
                })
                return h
            })(t)
            m(H.prototype, {
                cropShoulder: 0,
                directTouch: !0,
                drawLegendSymbol: F.drawRectangle,
                getSymbol: d,
                negStacks: !0,
                trackerGroups: ['group', 'dataLabelsGroup'],
            })
            G.registerSeriesType('column', H)
            ;('')
            ;('')
            return H
        }
    )
    N(
        h,
        'Core/Series/DataLabel.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A) {
            var E = d.getDeferredAnimation,
                t = h.format,
                G = A.defined,
                H = A.extend,
                y = A.fireEvent,
                q = A.isArray,
                p = A.merge,
                f = A.objectEach,
                c = A.pick,
                a = A.splat,
                n
            ;(function (d) {
                function h(a, f, d, l, e) {
                    var g = this,
                        b = this.chart,
                        k = this.isCartesian && b.inverted,
                        h = this.enabledDataSorting,
                        r = c(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                        n = c(a.plotY, -9999),
                        m = f.getBBox(),
                        p = d.rotation,
                        u = d.align,
                        q = b.isInsidePlot(r, Math.round(n), {
                            inverted: k,
                            paneCoordinates: !0,
                            series: g,
                        }),
                        w = function (b) {
                            h && g.xAxis && !v && g.setDataLabelStartPos(a, f, e, q, b)
                        },
                        v = 'justify' === c(d.overflow, h ? 'none' : 'justify'),
                        z =
                            this.visible &&
                            !1 !== a.visible &&
                            (a.series.forceDL ||
                                (h && !v) ||
                                q ||
                                (c(d.inside, !!this.options.stacking) &&
                                    l &&
                                    b.isInsidePlot(r, k ? l.x + 1 : l.y + l.height - 1, {
                                        inverted: k,
                                        paneCoordinates: !0,
                                        series: g,
                                    })))
                    if (z) {
                        var D = b.renderer.fontMetrics(
                            b.styledMode ? void 0 : d.style.fontSize,
                            f
                        ).b
                        l = H(
                            {
                                x: k ? this.yAxis.len - n : r,
                                y: Math.round(k ? this.xAxis.len - r : n),
                                width: 0,
                                height: 0,
                            },
                            l
                        )
                        H(d, { width: m.width, height: m.height })
                        p
                            ? ((v = !1),
                              (r = b.renderer.rotCorr(D, p)),
                              (r = {
                                  x: l.x + (d.x || 0) + l.width / 2 + r.x,
                                  y:
                                      l.y +
                                      (d.y || 0) +
                                      { top: 0, middle: 0.5, bottom: 1 }[d.verticalAlign] *
                                          l.height,
                              }),
                              w(r),
                              f[e ? 'attr' : 'animate'](r).attr({ align: u }),
                              (w = (p + 720) % 360),
                              (w = 180 < w && 360 > w),
                              'left' === u
                                  ? (r.y -= w ? m.height : 0)
                                  : 'center' === u
                                  ? ((r.x -= m.width / 2), (r.y -= m.height / 2))
                                  : 'right' === u && ((r.x -= m.width), (r.y -= w ? 0 : m.height)),
                              (f.placed = !0),
                              (f.alignAttr = r))
                            : (w(l), f.align(d, void 0, l), (r = f.alignAttr))
                        v && 0 <= l.height
                            ? this.justifyDataLabel(f, d, r, m, l, e)
                            : c(d.crop, !0) &&
                              (z =
                                  b.isInsidePlot(r.x, r.y, { paneCoordinates: !0, series: g }) &&
                                  b.isInsidePlot(r.x + m.width, r.y + m.height, {
                                      paneCoordinates: !0,
                                      series: g,
                                  }))
                        if (d.shape && !p)
                            f[e ? 'attr' : 'animate']({
                                anchorX: k ? b.plotWidth - a.plotY : a.plotX,
                                anchorY: k ? b.plotHeight - a.plotX : a.plotY,
                            })
                    }
                    e && h && (f.placed = !1)
                    z || (h && !v) || (f.hide(!0), (f.placed = !1))
                }
                function n(a, c) {
                    var f = c.filter
                    return f
                        ? ((c = f.operator),
                          (a = a[f.property]),
                          (f = f.value),
                          ('>' === c && a > f) ||
                          ('<' === c && a < f) ||
                          ('>=' === c && a >= f) ||
                          ('<=' === c && a <= f) ||
                          ('==' === c && a == f) ||
                          ('===' === c && a === f)
                              ? !0
                              : !1)
                        : !0
                }
                function m() {
                    var d = this,
                        k = d.chart,
                        h = d.options,
                        l = d.points,
                        e = d.hasRendered || 0,
                        g = k.renderer,
                        b = h.dataLabels,
                        m,
                        p = b.animation
                    p = b.defer ? E(k, p, d) : { defer: 0, duration: 0 }
                    b = K(
                        K(
                            k.options.plotOptions &&
                                k.options.plotOptions.series &&
                                k.options.plotOptions.series.dataLabels,
                            k.options.plotOptions &&
                                k.options.plotOptions[d.type] &&
                                k.options.plotOptions[d.type].dataLabels
                        ),
                        b
                    )
                    y(this, 'drawDataLabels')
                    if (q(b) || b.enabled || d._hasPointLabels) {
                        var r = d.plotGroup(
                            'dataLabelsGroup',
                            'data-labels',
                            e ? 'inherit' : 'hidden',
                            b.zIndex || 6
                        )
                        r.attr({ opacity: +e })
                        !e &&
                            (e = d.dataLabelsGroup) &&
                            (d.visible && r.show(!0),
                            e[h.animation ? 'animate' : 'attr']({ opacity: 1 }, p))
                        l.forEach(function (e) {
                            m = a(K(b, e.dlOptions || (e.options && e.options.dataLabels)))
                            m.forEach(function (b, a) {
                                var l = b.enabled && (!e.isNull || e.dataLabelOnNull) && n(e, b),
                                    m = e.connectors ? e.connectors[a] : e.connector,
                                    p = e.dataLabels ? e.dataLabels[a] : e.dataLabel,
                                    x = c(b.distance, e.labelDistance),
                                    u = !p
                                if (l) {
                                    var B = e.getLabelConfig()
                                    var q = c(b[e.formatPrefix + 'Format'], b.format)
                                    B = G(q)
                                        ? t(q, B, k)
                                        : (b[e.formatPrefix + 'Formatter'] || b.formatter).call(
                                              B,
                                              b
                                          )
                                    q = b.style
                                    var w = b.rotation
                                    k.styledMode ||
                                        ((q.color = c(b.color, q.color, d.color, '#000000')),
                                        'contrast' === q.color
                                            ? ((e.contrastColor = g.getContrast(
                                                  e.color || d.color
                                              )),
                                              (q.color =
                                                  (!G(x) && b.inside) || 0 > x || h.stacking
                                                      ? e.contrastColor
                                                      : '#000000'))
                                            : delete e.contrastColor,
                                        h.cursor && (q.cursor = h.cursor))
                                    var v = {
                                        r: b.borderRadius || 0,
                                        rotation: w,
                                        padding: b.padding,
                                        zIndex: 1,
                                    }
                                    k.styledMode ||
                                        ((v.fill = b.backgroundColor),
                                        (v.stroke = b.borderColor),
                                        (v['stroke-width'] = b.borderWidth))
                                    f(v, function (b, a) {
                                        'undefined' === typeof b && delete v[a]
                                    })
                                }
                                !p ||
                                    (l && G(B) && !!p.div === !!b.useHTML) ||
                                    ((e.dataLabel = p = e.dataLabel && e.dataLabel.destroy()),
                                    e.dataLabels &&
                                        (1 === e.dataLabels.length
                                            ? delete e.dataLabels
                                            : delete e.dataLabels[a]),
                                    a || delete e.dataLabel,
                                    m &&
                                        ((e.connector = e.connector.destroy()),
                                        e.connectors &&
                                            (1 === e.connectors.length
                                                ? delete e.connectors
                                                : delete e.connectors[a])))
                                l &&
                                    G(B) &&
                                    (p
                                        ? (v.text = B)
                                        : ((e.dataLabels = e.dataLabels || []),
                                          (p = e.dataLabels[a] =
                                              w
                                                  ? g
                                                        .text(B, 0, -9999, b.useHTML)
                                                        .addClass('highcharts-data-label')
                                                  : g.label(
                                                        B,
                                                        0,
                                                        -9999,
                                                        b.shape,
                                                        null,
                                                        null,
                                                        b.useHTML,
                                                        null,
                                                        'data-label'
                                                    )),
                                          a || (e.dataLabel = p),
                                          p.addClass(
                                              ' highcharts-data-label-color-' +
                                                  e.colorIndex +
                                                  ' ' +
                                                  (b.className || '') +
                                                  (b.useHTML ? ' highcharts-tracker' : '')
                                          )),
                                    (p.options = b),
                                    p.attr(v),
                                    k.styledMode || p.css(q).shadow(b.shadow),
                                    p.added || p.add(r),
                                    b.textPath &&
                                        !b.useHTML &&
                                        (p.setTextPath(
                                            (e.getDataLabelPath && e.getDataLabelPath(p)) ||
                                                e.graphic,
                                            b.textPath
                                        ),
                                        e.dataLabelPath &&
                                            !b.textPath.enabled &&
                                            (e.dataLabelPath = e.dataLabelPath.destroy())),
                                    d.alignDataLabel(e, p, b, null, u))
                            })
                        })
                    }
                    y(this, 'afterDrawDataLabels')
                }
                function A(a, c, f, d, e, g) {
                    var b = this.chart,
                        k = c.align,
                        l = c.verticalAlign,
                        r = a.box ? 0 : a.padding || 0,
                        h = c.x
                    h = void 0 === h ? 0 : h
                    var n = c.y
                    n = void 0 === n ? 0 : n
                    var m = (f.x || 0) + r
                    if (0 > m) {
                        'right' === k && 0 <= h ? ((c.align = 'left'), (c.inside = !0)) : (h -= m)
                        var p = !0
                    }
                    m = (f.x || 0) + d.width - r
                    m > b.plotWidth &&
                        ('left' === k && 0 >= h
                            ? ((c.align = 'right'), (c.inside = !0))
                            : (h += b.plotWidth - m),
                        (p = !0))
                    m = f.y + r
                    0 > m &&
                        ('bottom' === l && 0 <= n
                            ? ((c.verticalAlign = 'top'), (c.inside = !0))
                            : (n -= m),
                        (p = !0))
                    m = (f.y || 0) + d.height - r
                    m > b.plotHeight &&
                        ('top' === l && 0 >= n
                            ? ((c.verticalAlign = 'bottom'), (c.inside = !0))
                            : (n += b.plotHeight - m),
                        (p = !0))
                    p && ((c.x = h), (c.y = n), (a.placed = !g), a.align(c, void 0, e))
                    return p
                }
                function K(a, c) {
                    var f = [],
                        d
                    if (q(a) && !q(c))
                        f = a.map(function (a) {
                            return p(a, c)
                        })
                    else if (q(c) && !q(a))
                        f = c.map(function (e) {
                            return p(a, e)
                        })
                    else if (q(a) || q(c))
                        for (d = Math.max(a.length, c.length); d--; ) f[d] = p(a[d], c[d])
                    else f = p(a, c)
                    return f
                }
                function v(a, c, f, d, e) {
                    var g = this.chart,
                        b = g.inverted,
                        k = this.xAxis,
                        l = k.reversed,
                        r = b ? c.height / 2 : c.width / 2
                    a = (a = a.pointWidth) ? a / 2 : 0
                    c.startXPos = b ? e.x : l ? -r - a : k.width - r + a
                    c.startYPos = b ? (l ? this.yAxis.height - r + a : -r - a) : e.y
                    d
                        ? 'hidden' === c.visibility &&
                          (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 }))
                        : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide)
                    g.hasRendered &&
                        (f && c.attr({ x: c.startXPos, y: c.startYPos }), (c.placed = !0))
                }
                var z = []
                d.compose = function (a) {
                    if (-1 === z.indexOf(a)) {
                        var c = a.prototype
                        z.push(a)
                        c.alignDataLabel = h
                        c.drawDataLabels = m
                        c.justifyDataLabel = A
                        c.setDataLabelStartPos = v
                    }
                }
            })(n || (n = {}))
            ;('')
            return n
        }
    )
    N(
        h,
        'Series/Column/ColumnDataLabel.js',
        [h['Core/Series/DataLabel.js'], h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = h.series,
                t = A.merge,
                G = A.pick,
                H
            ;(function (h) {
                function q(f, c, a, d, h) {
                    var n = this.chart.inverted,
                        m = f.series,
                        p = (m.xAxis ? m.xAxis.len : this.chart.plotSizeX) || 0
                    m = (m.yAxis ? m.yAxis.len : this.chart.plotSizeY) || 0
                    var q = f.dlBox || f.shapeArgs,
                        y = G(f.below, f.plotY > G(this.translatedThreshold, m)),
                        v = G(a.inside, !!this.options.stacking)
                    q &&
                        ((d = t(q)),
                        0 > d.y && ((d.height += d.y), (d.y = 0)),
                        (q = d.y + d.height - m),
                        0 < q && q < d.height && (d.height -= q),
                        n &&
                            (d = {
                                x: m - d.y - d.height,
                                y: p - d.x - d.width,
                                width: d.height,
                                height: d.width,
                            }),
                        v ||
                            (n
                                ? ((d.x += y ? 0 : d.width), (d.width = 0))
                                : ((d.y += y ? d.height : 0), (d.height = 0))))
                    a.align = G(a.align, !n || v ? 'center' : y ? 'right' : 'left')
                    a.verticalAlign = G(a.verticalAlign, n || v ? 'middle' : y ? 'top' : 'bottom')
                    E.prototype.alignDataLabel.call(this, f, c, a, d, h)
                    a.inside && f.contrastColor && c.css({ color: f.contrastColor })
                }
                var p = []
                h.compose = function (f) {
                    d.compose(E)
                    ;-1 === p.indexOf(f) && (p.push(f), (f.prototype.alignDataLabel = q))
                }
            })(H || (H = {}))
            return H
        }
    )
    N(
        h,
        'Series/Bar/BarSeries.js',
        [
            h['Series/Column/ColumnSeries.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, q) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (d, f) {
                                        d.__proto__ = f
                                    }) ||
                                function (d, f) {
                                    for (var c in f) f.hasOwnProperty(c) && (d[c] = f[c])
                                }
                            return d(h, q)
                        }
                        return function (h, q) {
                            function p() {
                                this.constructor = h
                            }
                            d(h, q)
                            h.prototype =
                                null === q
                                    ? Object.create(q)
                                    : ((p.prototype = q.prototype), new p())
                        }
                    })(),
                t = A.extend,
                G = A.merge
            A = (function (h) {
                function t() {
                    var d = (null !== h && h.apply(this, arguments)) || this
                    d.data = void 0
                    d.options = void 0
                    d.points = void 0
                    return d
                }
                E(t, h)
                t.defaultOptions = G(d.defaultOptions, {})
                return t
            })(d)
            t(A.prototype, { inverted: !0 })
            h.registerSeriesType('bar', A)
            ;('')
            return A
        }
    )
    N(
        h,
        'Series/Scatter/ScatterSeries.js',
        [
            h['Series/Column/ColumnSeries.js'],
            h['Series/Line/LineSeries.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, f) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (c, a) {
                                        c.__proto__ = a
                                    }) ||
                                function (c, a) {
                                    for (var f in a) a.hasOwnProperty(f) && (c[f] = a[f])
                                }
                            return d(h, f)
                        }
                        return function (h, f) {
                            function c() {
                                this.constructor = h
                            }
                            d(h, f)
                            h.prototype =
                                null === f
                                    ? Object.create(f)
                                    : ((c.prototype = f.prototype), new c())
                        }
                    })(),
                E = F.addEvent,
                H = F.extend,
                y = F.merge
            F = (function (d) {
                function p() {
                    var f = (null !== d && d.apply(this, arguments)) || this
                    f.data = void 0
                    f.options = void 0
                    f.points = void 0
                    return f
                }
                t(p, d)
                p.prototype.applyJitter = function () {
                    var f = this,
                        c = this.options.jitter,
                        a = this.points.length
                    c &&
                        this.points.forEach(function (d, h) {
                            ;['x', 'y'].forEach(function (n, m) {
                                var p = 'plot' + n.toUpperCase()
                                if (c[n] && !d.isNull) {
                                    var q = f[n + 'Axis']
                                    var t = c[n] * q.transA
                                    if (q && !q.isLog) {
                                        var v = Math.max(0, d[p] - t)
                                        q = Math.min(q.len, d[p] + t)
                                        m = 1e4 * Math.sin(h + m * a)
                                        d[p] = v + (q - v) * (m - Math.floor(m))
                                        'x' === n && (d.clientX = d.plotX)
                                    }
                                }
                            })
                        })
                }
                p.prototype.drawGraph = function () {
                    this.options.lineWidth
                        ? d.prototype.drawGraph.call(this)
                        : this.graph && (this.graph = this.graph.destroy())
                }
                p.defaultOptions = y(h.defaultOptions, {
                    lineWidth: 0,
                    findNearestPointBy: 'xy',
                    jitter: { x: 0, y: 0 },
                    marker: { enabled: !0 },
                    tooltip: {
                        headerFormat:
                            '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                        pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>',
                    },
                })
                return p
            })(h)
            H(F.prototype, {
                drawTracker: d.prototype.drawTracker,
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
                takeOrdinalPosition: !1,
            })
            E(F, 'afterTranslate', function () {
                this.applyJitter()
            })
            A.registerSeriesType('scatter', F)
            ;('')
            return F
        }
    )
    N(
        h,
        'Series/CenteredUtilities.js',
        [h['Core/Globals.js'], h['Core/Series/Series.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = d.deg2rad,
                t = A.isNumber,
                G = A.pick,
                H = A.relativeLength,
                y
            ;(function (d) {
                d.getCenter = function () {
                    var d = this.options,
                        f = this.chart,
                        c = 2 * (d.slicedOffset || 0),
                        a = f.plotWidth - 2 * c,
                        n = f.plotHeight - 2 * c,
                        m = d.center,
                        q = Math.min(a, n),
                        t = d.size,
                        y = d.innerSize || 0
                    'string' === typeof t && (t = parseFloat(t))
                    'string' === typeof y && (y = parseFloat(y))
                    d = [
                        G(m[0], '50%'),
                        G(m[1], '50%'),
                        G(t && 0 > t ? void 0 : d.size, '100%'),
                        G(y && 0 > y ? void 0 : d.innerSize || 0, '0%'),
                    ]
                    !f.angular || this instanceof h || (d[3] = 0)
                    for (m = 0; 4 > m; ++m)
                        (t = d[m]),
                            (f = 2 > m || (2 === m && /%$/.test(t))),
                            (d[m] = H(t, [a, n, q, d[2]][m]) + (f ? c : 0))
                    d[3] > d[2] && (d[3] = d[2])
                    return d
                }
                d.getStartAndEndRadians = function (d, f) {
                    d = t(d) ? d : 0
                    f = t(f) && f > d && 360 > f - d ? f : d + 360
                    return { start: E * (d + -90), end: E * (f + -90) }
                }
            })(y || (y = {}))
            ;('')
            return y
        }
    )
    N(
        h,
        'Series/Pie/PiePoint.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Series/Point.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var f = function (c, a) {
                            f =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return f(c, a)
                        }
                        return function (c, a) {
                            function d() {
                                this.constructor = c
                            }
                            f(c, a)
                            c.prototype =
                                null === a
                                    ? Object.create(a)
                                    : ((d.prototype = a.prototype), new d())
                        }
                    })(),
                t = d.setAnimation,
                G = A.addEvent,
                H = A.defined
            d = A.extend
            var y = A.isNumber,
                q = A.pick,
                p = A.relativeLength
            h = (function (f) {
                function c() {
                    var a = (null !== f && f.apply(this, arguments)) || this
                    a.labelDistance = void 0
                    a.options = void 0
                    a.series = void 0
                    return a
                }
                E(c, f)
                c.prototype.getConnectorPath = function () {
                    var a = this.labelPosition,
                        c = this.series.options.dataLabels,
                        f = this.connectorShapes,
                        d = c.connectorShape
                    f[d] && (d = f[d])
                    return d.call(
                        this,
                        { x: a.final.x, y: a.final.y, alignment: a.alignment },
                        a.connectorPosition,
                        c
                    )
                }
                c.prototype.getTranslate = function () {
                    return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 }
                }
                c.prototype.haloPath = function (a) {
                    var c = this.shapeArgs
                    return this.sliced || !this.visible
                        ? []
                        : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                              innerR: c.r - 1,
                              start: c.start,
                              end: c.end,
                          })
                }
                c.prototype.init = function () {
                    var a = this
                    f.prototype.init.apply(this, arguments)
                    this.name = q(this.name, 'Slice')
                    var c = function (c) {
                        a.slice('select' === c.type)
                    }
                    G(this, 'select', c)
                    G(this, 'unselect', c)
                    return this
                }
                c.prototype.isValid = function () {
                    return y(this.y) && 0 <= this.y
                }
                c.prototype.setVisible = function (a, c) {
                    var f = this,
                        d = this.series,
                        h = d.chart,
                        n = d.options.ignoreHiddenPoint
                    c = q(c, n)
                    a !== this.visible &&
                        ((this.visible =
                            this.options.visible =
                            a =
                                'undefined' === typeof a ? !this.visible : a),
                        (d.options.data[d.data.indexOf(this)] = this.options),
                        ['graphic', 'dataLabel', 'connector', 'shadowGroup'].forEach(function (c) {
                            if (f[c]) f[c][a ? 'show' : 'hide'](a)
                        }),
                        this.legendItem && h.legend.colorizeItem(this, a),
                        a || 'hover' !== this.state || this.setState(''),
                        n && (d.isDirty = !0),
                        c && h.redraw())
                }
                c.prototype.slice = function (a, c, f) {
                    var d = this.series
                    t(f, d.chart)
                    q(c, !0)
                    this.sliced = this.options.sliced = H(a) ? a : !this.sliced
                    d.options.data[d.data.indexOf(this)] = this.options
                    this.graphic && this.graphic.animate(this.getTranslate())
                    this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
                }
                return c
            })(h)
            d(h.prototype, {
                connectorShapes: {
                    fixedOffset: function (f, c, a) {
                        var d = c.breakAt
                        c = c.touchingSliceAt
                        return [
                            ['M', f.x, f.y],
                            a.softConnector
                                ? [
                                      'C',
                                      f.x + ('left' === f.alignment ? -5 : 5),
                                      f.y,
                                      2 * d.x - c.x,
                                      2 * d.y - c.y,
                                      d.x,
                                      d.y,
                                  ]
                                : ['L', d.x, d.y],
                            ['L', c.x, c.y],
                        ]
                    },
                    straight: function (f, c) {
                        c = c.touchingSliceAt
                        return [
                            ['M', f.x, f.y],
                            ['L', c.x, c.y],
                        ]
                    },
                    crookedLine: function (f, c, a) {
                        c = c.touchingSliceAt
                        var d = this.series,
                            h = d.center[0],
                            q = d.chart.plotWidth,
                            t = d.chart.plotLeft
                        d = f.alignment
                        var y = this.shapeArgs.r
                        a = p(a.crookDistance, 1)
                        q = 'left' === d ? h + y + (q + t - h - y) * (1 - a) : t + (h - y) * a
                        a = ['L', q, f.y]
                        h = !0
                        if ('left' === d ? q > f.x || q < c.x : q < f.x || q > c.x) h = !1
                        f = [['M', f.x, f.y]]
                        h && f.push(a)
                        f.push(['L', c.x, c.y])
                        return f
                    },
                },
            })
            return h
        }
    )
    N(
        h,
        'Series/Pie/PieSeries.js',
        [
            h['Series/CenteredUtilities.js'],
            h['Series/Column/ColumnSeries.js'],
            h['Core/Globals.js'],
            h['Core/Legend/LegendSymbol.js'],
            h['Series/Pie/PiePoint.js'],
            h['Core/Series/Series.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Renderer/SVG/Symbols.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y, q) {
            var p =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (c, f) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f])
                                }
                            return a(c, f)
                        }
                        return function (c, f) {
                            function d() {
                                this.constructor = c
                            }
                            a(c, f)
                            c.prototype =
                                null === f
                                    ? Object.create(f)
                                    : ((d.prototype = f.prototype), new d())
                        }
                    })(),
                f = d.getStartAndEndRadians
            A = A.noop
            var c = q.clamp,
                a = q.extend,
                n = q.fireEvent,
                m = q.merge,
                D = q.pick,
                C = q.relativeLength
            q = (function (a) {
                function d() {
                    var c = (null !== a && a.apply(this, arguments)) || this
                    c.center = void 0
                    c.data = void 0
                    c.maxLabelDistance = void 0
                    c.options = void 0
                    c.points = void 0
                    return c
                }
                p(d, a)
                d.prototype.animate = function (a) {
                    var c = this,
                        f = c.points,
                        d = c.startAngleRad
                    a ||
                        f.forEach(function (a) {
                            var f = a.graphic,
                                k = a.shapeArgs
                            f &&
                                k &&
                                (f.attr({
                                    r: D(a.startR, c.center && c.center[3] / 2),
                                    start: d,
                                    end: d,
                                }),
                                f.animate(
                                    { r: k.r, start: k.start, end: k.end },
                                    c.options.animation
                                ))
                        })
                }
                d.prototype.drawEmpty = function () {
                    var a = this.startAngleRad,
                        c = this.endAngleRad,
                        f = this.options
                    if (0 === this.total && this.center) {
                        var d = this.center[0]
                        var k = this.center[1]
                        this.graph ||
                            (this.graph = this.chart.renderer
                                .arc(d, k, this.center[1] / 2, 0, a, c)
                                .addClass('highcharts-empty-series')
                                .add(this.group))
                        this.graph.attr({
                            d: y.arc(d, k, this.center[2] / 2, 0, {
                                start: a,
                                end: c,
                                innerR: this.center[3] / 2,
                            }),
                        })
                        this.chart.styledMode ||
                            this.graph.attr({
                                'stroke-width': f.borderWidth,
                                fill: f.fillColor || 'none',
                                stroke: f.color || '#cccccc',
                            })
                    } else this.graph && (this.graph = this.graph.destroy())
                }
                d.prototype.drawPoints = function () {
                    var a = this.chart.renderer
                    this.points.forEach(function (c) {
                        c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy())
                        c.graphic ||
                            ((c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group)),
                            (c.delayedRendering = !0))
                    })
                }
                d.prototype.generatePoints = function () {
                    a.prototype.generatePoints.call(this)
                    this.updateTotals()
                }
                d.prototype.getX = function (a, f, d) {
                    var h = this.center,
                        k = this.radii ? this.radii[d.index] || 0 : h[2] / 2
                    a = Math.asin(c((a - h[1]) / (k + d.labelDistance), -1, 1))
                    return (
                        h[0] +
                        (f ? -1 : 1) * Math.cos(a) * (k + d.labelDistance) +
                        (0 < d.labelDistance ? (f ? -1 : 1) * this.options.dataLabels.padding : 0)
                    )
                }
                d.prototype.hasData = function () {
                    return !!this.processedXData.length
                }
                d.prototype.redrawPoints = function () {
                    var a = this,
                        c = a.chart,
                        f = c.renderer,
                        d = a.options.shadow,
                        k,
                        h,
                        l,
                        e
                    this.drawEmpty()
                    !d ||
                        a.shadowGroup ||
                        c.styledMode ||
                        (a.shadowGroup = f.g('shadow').attr({ zIndex: -1 }).add(a.group))
                    a.points.forEach(function (g) {
                        var b = {}
                        h = g.graphic
                        if (!g.isNull && h) {
                            var n = void 0
                            e = g.shapeArgs
                            k = g.getTranslate()
                            c.styledMode ||
                                ((n = g.shadowGroup),
                                d && !n && (n = g.shadowGroup = f.g('shadow').add(a.shadowGroup)),
                                n && n.attr(k),
                                (l = a.pointAttribs(g, g.selected && 'select')))
                            g.delayedRendering
                                ? (h.setRadialReference(a.center).attr(e).attr(k),
                                  c.styledMode ||
                                      h.attr(l).attr({ 'stroke-linejoin': 'round' }).shadow(d, n),
                                  (g.delayedRendering = !1))
                                : (h.setRadialReference(a.center),
                                  c.styledMode || m(!0, b, l),
                                  m(!0, b, e, k),
                                  h.animate(b))
                            h.attr({ visibility: g.visible ? 'inherit' : 'hidden' })
                            h.addClass(g.getClassName(), !0)
                        } else h && (g.graphic = h.destroy())
                    })
                }
                d.prototype.sortByAngle = function (a, c) {
                    a.sort(function (a, f) {
                        return 'undefined' !== typeof a.angle && (f.angle - a.angle) * c
                    })
                }
                d.prototype.translate = function (a) {
                    this.generatePoints()
                    var c = this.options,
                        d = c.slicedOffset,
                        h = d + (c.borderWidth || 0),
                        k = f(c.startAngle, c.endAngle),
                        m = (this.startAngleRad = k.start)
                    k = (this.endAngleRad = k.end) - m
                    var l = this.points,
                        e = c.dataLabels.distance
                    c = c.ignoreHiddenPoint
                    var g = l.length,
                        b,
                        p = 0
                    a || (this.center = a = this.getCenter())
                    for (b = 0; b < g; b++) {
                        var q = l[b]
                        var r = m + p * k
                        !q.isValid() || (c && !q.visible) || (p += q.percentage / 100)
                        var x = m + p * k
                        var M = {
                            x: a[0],
                            y: a[1],
                            r: a[2] / 2,
                            innerR: a[3] / 2,
                            start: Math.round(1e3 * r) / 1e3,
                            end: Math.round(1e3 * x) / 1e3,
                        }
                        q.shapeType = 'arc'
                        q.shapeArgs = M
                        q.labelDistance = D(
                            q.options.dataLabels && q.options.dataLabels.distance,
                            e
                        )
                        q.labelDistance = C(q.labelDistance, M.r)
                        this.maxLabelDistance = Math.max(
                            this.maxLabelDistance || 0,
                            q.labelDistance
                        )
                        x = (x + r) / 2
                        x > 1.5 * Math.PI
                            ? (x -= 2 * Math.PI)
                            : x < -Math.PI / 2 && (x += 2 * Math.PI)
                        q.slicedTranslation = {
                            translateX: Math.round(Math.cos(x) * d),
                            translateY: Math.round(Math.sin(x) * d),
                        }
                        M = (Math.cos(x) * a[2]) / 2
                        var t = (Math.sin(x) * a[2]) / 2
                        q.tooltipPos = [a[0] + 0.7 * M, a[1] + 0.7 * t]
                        q.half = x < -Math.PI / 2 || x > Math.PI / 2 ? 1 : 0
                        q.angle = x
                        r = Math.min(h, q.labelDistance / 5)
                        q.labelPosition = {
                            natural: {
                                x: a[0] + M + Math.cos(x) * q.labelDistance,
                                y: a[1] + t + Math.sin(x) * q.labelDistance,
                            },
                            final: {},
                            alignment: 0 > q.labelDistance ? 'center' : q.half ? 'right' : 'left',
                            connectorPosition: {
                                breakAt: {
                                    x: a[0] + M + Math.cos(x) * r,
                                    y: a[1] + t + Math.sin(x) * r,
                                },
                                touchingSliceAt: { x: a[0] + M, y: a[1] + t },
                            },
                        }
                    }
                    n(this, 'afterTranslate')
                }
                d.prototype.updateTotals = function () {
                    var a = this.points,
                        c = a.length,
                        f = this.options.ignoreHiddenPoint,
                        d,
                        k = 0
                    for (d = 0; d < c; d++) {
                        var h = a[d]
                        !h.isValid() || (f && !h.visible) || (k += h.y)
                    }
                    this.total = k
                    for (d = 0; d < c; d++)
                        (h = a[d]),
                            (h.percentage = 0 < k && (h.visible || !f) ? (h.y / k) * 100 : 0),
                            (h.total = k)
                }
                d.defaultOptions = m(G.defaultOptions, {
                    center: [null, null],
                    clip: !1,
                    colorByPoint: !0,
                    dataLabels: {
                        allowOverlap: !0,
                        connectorPadding: 5,
                        connectorShape: 'fixedOffset',
                        crookDistance: '70%',
                        distance: 30,
                        enabled: !0,
                        formatter: function () {
                            return this.point.isNull ? void 0 : this.point.name
                        },
                        softConnector: !0,
                        x: 0,
                    },
                    fillColor: void 0,
                    ignoreHiddenPoint: !0,
                    inactiveOtherPoints: !0,
                    legendType: 'point',
                    marker: null,
                    size: null,
                    showInLegend: !1,
                    slicedOffset: 10,
                    stickyTracking: !1,
                    tooltip: { followPointer: !0 },
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    lineWidth: void 0,
                    states: { hover: { brightness: 0.1 } },
                })
                return d
            })(G)
            a(q.prototype, {
                axisTypes: [],
                directTouch: !0,
                drawGraph: void 0,
                drawLegendSymbol: F.drawRectangle,
                drawTracker: h.prototype.drawTracker,
                getCenter: d.getCenter,
                getSymbol: A,
                isCartesian: !1,
                noSharedTooltip: !0,
                pointAttribs: h.prototype.pointAttribs,
                pointClass: t,
                requireSorting: !1,
                searchPoint: A,
                trackerGroups: ['group', 'dataLabelsGroup'],
            })
            H.registerSeriesType('pie', q)
            ;('')
            return q
        }
    )
    N(
        h,
        'Series/Pie/PieDataLabel.js',
        [
            h['Core/Series/DataLabel.js'],
            h['Core/Globals.js'],
            h['Core/Renderer/RendererUtilities.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t) {
            var E = h.noop,
                H = A.distribute,
                y = F.series,
                q = t.arrayMax,
                p = t.clamp,
                f = t.defined,
                c = t.merge,
                a = t.pick,
                n = t.relativeLength,
                m
            ;(function (h) {
                function m() {
                    var d = this,
                        h = d.data,
                        k = d.chart,
                        m = d.options.dataLabels || {},
                        l = m.connectorPadding,
                        e = k.plotWidth,
                        g = k.plotHeight,
                        b = k.plotLeft,
                        n = Math.round(k.chartWidth / 3),
                        p = d.center,
                        r = p[2] / 2,
                        x = p[1],
                        v = [[], []],
                        t = [0, 0, 0, 0],
                        D = d.dataLabelPositioners,
                        C,
                        E,
                        A,
                        I,
                        F,
                        G,
                        L,
                        K,
                        N,
                        T,
                        U,
                        S
                    d.visible &&
                        (m.enabled || d._hasPointLabels) &&
                        (h.forEach(function (b) {
                            b.dataLabel &&
                                b.visible &&
                                b.dataLabel.shortened &&
                                (b.dataLabel
                                    .attr({ width: 'auto' })
                                    .css({ width: 'auto', textOverflow: 'clip' }),
                                (b.dataLabel.shortened = !1))
                        }),
                        y.prototype.drawDataLabels.apply(d),
                        h.forEach(function (b) {
                            b.dataLabel &&
                                (b.visible
                                    ? (v[b.half].push(b),
                                      (b.dataLabel._pos = null),
                                      !f(m.style.width) &&
                                          !f(
                                              b.options.dataLabels &&
                                                  b.options.dataLabels.style &&
                                                  b.options.dataLabels.style.width
                                          ) &&
                                          b.dataLabel.getBBox().width > n &&
                                          (b.dataLabel.css({ width: Math.round(0.7 * n) + 'px' }),
                                          (b.dataLabel.shortened = !0)))
                                    : ((b.dataLabel = b.dataLabel.destroy()),
                                      b.dataLabels &&
                                          1 === b.dataLabels.length &&
                                          delete b.dataLabels))
                        }),
                        v.forEach(function (c, h) {
                            var n = c.length,
                                q = [],
                                B
                            if (n) {
                                d.sortByAngle(c, h - 0.5)
                                if (0 < d.maxLabelDistance) {
                                    var u = Math.max(0, x - r - d.maxLabelDistance)
                                    var w = Math.min(x + r + d.maxLabelDistance, k.plotHeight)
                                    c.forEach(function (b) {
                                        0 < b.labelDistance &&
                                            b.dataLabel &&
                                            ((b.top = Math.max(0, x - r - b.labelDistance)),
                                            (b.bottom = Math.min(
                                                x + r + b.labelDistance,
                                                k.plotHeight
                                            )),
                                            (B = b.dataLabel.getBBox().height || 21),
                                            (b.distributeBox = {
                                                target: b.labelPosition.natural.y - b.top + B / 2,
                                                size: B,
                                                rank: b.y,
                                            }),
                                            q.push(b.distributeBox))
                                    })
                                    u = w + B - u
                                    H(q, u, u / 5)
                                }
                                for (U = 0; U < n; U++) {
                                    C = c[U]
                                    G = C.labelPosition
                                    I = C.dataLabel
                                    T = !1 === C.visible ? 'hidden' : 'inherit'
                                    N = u = G.natural.y
                                    q &&
                                        f(C.distributeBox) &&
                                        ('undefined' === typeof C.distributeBox.pos
                                            ? (T = 'hidden')
                                            : ((L = C.distributeBox.size),
                                              (N = D.radialDistributionY(C))))
                                    delete C.positionIndex
                                    if (m.justify) K = D.justify(C, r, p)
                                    else
                                        switch (m.alignTo) {
                                            case 'connectors':
                                                K = D.alignToConnectors(c, h, e, b)
                                                break
                                            case 'plotEdges':
                                                K = D.alignToPlotEdges(I, h, e, b)
                                                break
                                            default:
                                                K = D.radialDistributionX(d, C, N, u)
                                        }
                                    I._attr = { visibility: T, align: G.alignment }
                                    S = C.options.dataLabels || {}
                                    I._pos = {
                                        x:
                                            K +
                                            a(S.x, m.x) +
                                            ({ left: l, right: -l }[G.alignment] || 0),
                                        y: N + a(S.y, m.y) - 10,
                                    }
                                    G.final.x = K
                                    G.final.y = N
                                    a(m.crop, !0) &&
                                        ((F = I.getBBox().width),
                                        (u = null),
                                        K - F < l && 1 === h
                                            ? ((u = Math.round(F - K + l)),
                                              (t[3] = Math.max(u, t[3])))
                                            : K + F > e - l &&
                                              0 === h &&
                                              ((u = Math.round(K + F - e + l)),
                                              (t[1] = Math.max(u, t[1]))),
                                        0 > N - L / 2
                                            ? (t[0] = Math.max(Math.round(-N + L / 2), t[0]))
                                            : N + L / 2 > g &&
                                              (t[2] = Math.max(Math.round(N + L / 2 - g), t[2])),
                                        (I.sideOverflow = u))
                                }
                            }
                        }),
                        0 === q(t) || this.verifyDataLabelOverflow(t)) &&
                        (this.placeDataLabels(),
                        this.points.forEach(function (b) {
                            S = c(m, b.options.dataLabels)
                            if ((E = a(S.connectorWidth, 1))) {
                                var e
                                A = b.connector
                                if (
                                    (I = b.dataLabel) &&
                                    I._pos &&
                                    b.visible &&
                                    0 < b.labelDistance
                                ) {
                                    T = I._attr.visibility
                                    if ((e = !A))
                                        (b.connector = A =
                                            k.renderer
                                                .path()
                                                .addClass(
                                                    'highcharts-data-label-connector  highcharts-color-' +
                                                        b.colorIndex +
                                                        (b.className ? ' ' + b.className : '')
                                                )
                                                .add(d.dataLabelsGroup)),
                                            k.styledMode ||
                                                A.attr({
                                                    'stroke-width': E,
                                                    stroke:
                                                        S.connectorColor || b.color || '#666666',
                                                })
                                    A[e ? 'attr' : 'animate']({ d: b.getConnectorPath() })
                                    A.attr('visibility', T)
                                } else A && (b.connector = A.destroy())
                            }
                        }))
                }
                function t() {
                    this.points.forEach(function (a) {
                        var c = a.dataLabel,
                            f
                        c &&
                            a.visible &&
                            ((f = c._pos)
                                ? (c.sideOverflow &&
                                      ((c._attr.width = Math.max(
                                          c.getBBox().width - c.sideOverflow,
                                          0
                                      )),
                                      c.css({
                                          width: c._attr.width + 'px',
                                          textOverflow:
                                              (this.options.dataLabels.style || {}).textOverflow ||
                                              'ellipsis',
                                      }),
                                      (c.shortened = !0)),
                                  c.attr(c._attr),
                                  c[c.moved ? 'animate' : 'attr'](f),
                                  (c.moved = !0))
                                : c && c.attr({ y: -9999 }))
                        delete a.distributeBox
                    }, this)
                }
                function D(a) {
                    var c = this.center,
                        f = this.options,
                        d = f.center,
                        l = f.minSize || 80,
                        e = null !== f.size
                    if (!e) {
                        if (null !== d[0]) var g = Math.max(c[2] - Math.max(a[1], a[3]), l)
                        else (g = Math.max(c[2] - a[1] - a[3], l)), (c[0] += (a[3] - a[1]) / 2)
                        null !== d[1]
                            ? (g = p(g, l, c[2] - Math.max(a[0], a[2])))
                            : ((g = p(g, l, c[2] - a[0] - a[2])), (c[1] += (a[0] - a[2]) / 2))
                        g < c[2]
                            ? ((c[2] = g),
                              (c[3] = Math.min(n(f.innerSize || 0, g), g)),
                              this.translate(c),
                              this.drawDataLabels && this.drawDataLabels())
                            : (e = !0)
                    }
                    return e
                }
                var A = [],
                    v = {
                        radialDistributionY: function (a) {
                            return a.top + a.distributeBox.pos
                        },
                        radialDistributionX: function (a, c, f, d) {
                            return a.getX(f < c.top + 2 || f > c.bottom - 2 ? d : f, c.half, c)
                        },
                        justify: function (a, c, f) {
                            return f[0] + (a.half ? -1 : 1) * (c + a.labelDistance)
                        },
                        alignToPlotEdges: function (a, c, f, d) {
                            a = a.getBBox().width
                            return c ? a + d : f - a - d
                        },
                        alignToConnectors: function (a, c, f, d) {
                            var k = 0,
                                e
                            a.forEach(function (a) {
                                e = a.dataLabel.getBBox().width
                                e > k && (k = e)
                            })
                            return c ? k + d : f - k - d
                        },
                    }
                h.compose = function (a) {
                    d.compose(y)
                    ;-1 === A.indexOf(a) &&
                        (A.push(a),
                        (a = a.prototype),
                        (a.dataLabelPositioners = v),
                        (a.alignDataLabel = E),
                        (a.drawDataLabels = m),
                        (a.placeDataLabels = t),
                        (a.verifyDataLabelOverflow = D))
                }
            })(m || (m = {}))
            return m
        }
    )
    N(
        h,
        'Extensions/OverlappingDataLabels.js',
        [h['Core/Chart/Chart.js'], h['Core/Utilities.js']],
        function (d, h) {
            function E(d, f) {
                var c = !1
                if (d) {
                    var a = d.newOpacity
                    d.oldOpacity !== a &&
                        (d.alignAttr && d.placed
                            ? (d[a ? 'removeClass' : 'addClass']('highcharts-data-label-hidden'),
                              (c = !0),
                              (d.alignAttr.opacity = a),
                              d[d.isOld ? 'animate' : 'attr'](d.alignAttr, null, function () {
                                  f.styledMode || d.css({ pointerEvents: a ? 'auto' : 'none' })
                              }),
                              t(f, 'afterHideOverlappingLabel'))
                            : d.attr({ opacity: a }))
                    d.isOld = !0
                }
                return c
            }
            var F = h.addEvent,
                t = h.fireEvent,
                G = h.isArray,
                H = h.isNumber,
                y = h.objectEach,
                q = h.pick
            F(d, 'render', function () {
                var d = this,
                    f = []
                ;(this.labelCollectors || []).forEach(function (c) {
                    f = f.concat(c())
                })
                ;(this.yAxis || []).forEach(function (c) {
                    c.stacking &&
                        c.options.stackLabels &&
                        !c.options.stackLabels.allowOverlap &&
                        y(c.stacking.stacks, function (a) {
                            y(a, function (a) {
                                a.label && 'hidden' !== a.label.visibility && f.push(a.label)
                            })
                        })
                })
                ;(this.series || []).forEach(function (c) {
                    var a = c.options.dataLabels
                    c.visible &&
                        (!1 !== a.enabled || c._hasPointLabels) &&
                        ((a = function (a) {
                            return a.forEach(function (a) {
                                a.visible &&
                                    (G(a.dataLabels)
                                        ? a.dataLabels
                                        : a.dataLabel
                                        ? [a.dataLabel]
                                        : []
                                    ).forEach(function (c) {
                                        var h = c.options
                                        c.labelrank = q(
                                            h.labelrank,
                                            a.labelrank,
                                            a.shapeArgs && a.shapeArgs.height
                                        )
                                        h.allowOverlap
                                            ? ((c.oldOpacity = c.opacity),
                                              (c.newOpacity = 1),
                                              E(c, d))
                                            : f.push(c)
                                    })
                            })
                        }),
                        a(c.nodes || []),
                        a(c.points))
                })
                this.hideOverlappingLabels(f)
            })
            d.prototype.hideOverlappingLabels = function (d) {
                var f = this,
                    c = d.length,
                    a = f.renderer,
                    h,
                    m,
                    p,
                    q = !1
                var y = function (c) {
                    var f,
                        d = c.box ? 0 : c.padding || 0,
                        k = (f = 0),
                        h
                    if (c && (!c.alignAttr || c.placed)) {
                        var l = c.alignAttr || { x: c.attr('x'), y: c.attr('y') }
                        var e = c.parentGroup
                        c.width ||
                            ((f = c.getBBox()),
                            (c.width = f.width),
                            (c.height = f.height),
                            (f = a.fontMetrics(null, c.element).h))
                        var g = c.width - 2 * d
                        ;(h = { left: '0', center: '0.5', right: '1' }[c.alignValue])
                            ? (k = +h * g)
                            : H(c.x) && Math.round(c.x) !== c.translateX && (k = c.x - c.translateX)
                        return {
                            x: l.x + (e.translateX || 0) + d - (k || 0),
                            y: l.y + (e.translateY || 0) + d - f,
                            width: c.width - 2 * d,
                            height: c.height - 2 * d,
                        }
                    }
                }
                for (m = 0; m < c; m++)
                    if ((h = d[m]))
                        (h.oldOpacity = h.opacity), (h.newOpacity = 1), (h.absoluteBox = y(h))
                d.sort(function (a, c) {
                    return (c.labelrank || 0) - (a.labelrank || 0)
                })
                for (m = 0; m < c; m++) {
                    var A = (y = d[m]) && y.absoluteBox
                    for (h = m + 1; h < c; ++h) {
                        var F = (p = d[h]) && p.absoluteBox
                        !A ||
                            !F ||
                            y === p ||
                            0 === y.newOpacity ||
                            0 === p.newOpacity ||
                            F.x >= A.x + A.width ||
                            F.x + F.width <= A.x ||
                            F.y >= A.y + A.height ||
                            F.y + F.height <= A.y ||
                            ((y.labelrank < p.labelrank ? y : p).newOpacity = 0)
                    }
                }
                d.forEach(function (a) {
                    E(a, f) && (q = !0)
                })
                q && t(f, 'afterHideAllOverlappingLabels')
            }
        }
    )
    N(h, 'Core/Responsive.js', [h['Core/Utilities.js']], function (d) {
        var h = d.extend,
            A = d.find,
            F = d.isArray,
            t = d.isObject,
            G = d.merge,
            H = d.objectEach,
            y = d.pick,
            q = d.splat,
            p = d.uniqueKey,
            f
        ;(function (c) {
            var a = []
            c.compose = function (c) {
                ;-1 === a.indexOf(c) && (a.push(c), h(c.prototype, f.prototype))
                return c
            }
            var f = (function () {
                function a() {}
                a.prototype.currentOptions = function (a) {
                    function c(a, d, h, m) {
                        var k
                        H(a, function (a, l) {
                            if (!m && -1 < f.collectionsWithUpdate.indexOf(l) && d[l])
                                for (
                                    a = q(a), h[l] = [], k = 0;
                                    k < Math.max(a.length, d[l].length);
                                    k++
                                )
                                    d[l][k] &&
                                        (void 0 === a[k]
                                            ? (h[l][k] = d[l][k])
                                            : ((h[l][k] = {}), c(a[k], d[l][k], h[l][k], m + 1)))
                            else
                                t(a)
                                    ? ((h[l] = F(a) ? [] : {}), c(a, d[l] || {}, h[l], m + 1))
                                    : (h[l] = 'undefined' === typeof d[l] ? null : d[l])
                        })
                    }
                    var f = this,
                        d = {}
                    c(a, this.options, d, 0)
                    return d
                }
                a.prototype.matchResponsiveRule = function (a, c) {
                    var f = a.condition
                    ;(
                        f.callback ||
                        function () {
                            return (
                                this.chartWidth <= y(f.maxWidth, Number.MAX_VALUE) &&
                                this.chartHeight <= y(f.maxHeight, Number.MAX_VALUE) &&
                                this.chartWidth >= y(f.minWidth, 0) &&
                                this.chartHeight >= y(f.minHeight, 0)
                            )
                        }
                    ).call(this) && c.push(a._id)
                }
                a.prototype.setResponsive = function (a, c) {
                    var f = this,
                        d = this.options.responsive,
                        h = this.currentResponsive,
                        m = []
                    !c &&
                        d &&
                        d.rules &&
                        d.rules.forEach(function (a) {
                            'undefined' === typeof a._id && (a._id = p())
                            f.matchResponsiveRule(a, m)
                        }, this)
                    c = G.apply(
                        void 0,
                        m
                            .map(function (a) {
                                return A((d || {}).rules || [], function (c) {
                                    return c._id === a
                                })
                            })
                            .map(function (a) {
                                return a && a.chartOptions
                            })
                    )
                    c.isResponsiveOptions = !0
                    m = m.toString() || void 0
                    m !== (h && h.ruleIds) &&
                        (h && this.update(h.undoOptions, a, !0),
                        m
                            ? ((h = this.currentOptions(c)),
                              (h.isResponsiveOptions = !0),
                              (this.currentResponsive = {
                                  ruleIds: m,
                                  mergedOptions: c,
                                  undoOptions: h,
                              }),
                              this.update(c, a, !0))
                            : (this.currentResponsive = void 0))
                }
                return a
            })()
        })(f || (f = {}))
        ;('')
        ;('')
        return f
    })
    N(
        h,
        'masters/highcharts.src.js',
        [
            h['Core/Globals.js'],
            h['Core/Utilities.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Animation/Fx.js'],
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Renderer/HTML/AST.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Renderer/RendererUtilities.js'],
            h['Core/Renderer/SVG/SVGElement.js'],
            h['Core/Renderer/SVG/SVGRenderer.js'],
            h['Core/Renderer/HTML/HTMLElement.js'],
            h['Core/Renderer/HTML/HTMLRenderer.js'],
            h['Core/Axis/Axis.js'],
            h['Core/Axis/DateTimeAxis.js'],
            h['Core/Axis/LogarithmicAxis.js'],
            h['Core/Axis/PlotLineOrBand/PlotLineOrBand.js'],
            h['Core/Axis/Tick.js'],
            h['Core/Tooltip.js'],
            h['Core/Series/Point.js'],
            h['Core/Pointer.js'],
            h['Core/MSPointer.js'],
            h['Core/Legend/Legend.js'],
            h['Core/Chart/Chart.js'],
            h['Core/Series/Series.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Series/Column/ColumnSeries.js'],
            h['Series/Column/ColumnDataLabel.js'],
            h['Series/Pie/PieSeries.js'],
            h['Series/Pie/PieDataLabel.js'],
            h['Core/Series/DataLabel.js'],
            h['Core/Responsive.js'],
            h['Core/Color/Color.js'],
            h['Core/Time.js'],
        ],
        function (
            d,
            h,
            A,
            F,
            t,
            G,
            H,
            y,
            q,
            p,
            f,
            c,
            a,
            n,
            m,
            D,
            C,
            I,
            L,
            K,
            v,
            z,
            u,
            k,
            w,
            l,
            e,
            g,
            b,
            B,
            J,
            r,
            x
        ) {
            d.animate = t.animate
            d.animObject = t.animObject
            d.getDeferredAnimation = t.getDeferredAnimation
            d.setAnimation = t.setAnimation
            d.stop = t.stop
            d.timers = F.timers
            d.AST = G
            d.Axis = a
            d.Chart = u
            d.chart = u.chart
            d.Fx = F
            d.Legend = z
            d.PlotLineOrBand = D
            d.Point = L
            d.Pointer = v.isRequired() ? v : K
            d.Series = k
            d.SVGElement = q
            d.SVGRenderer = p
            d.Tick = C
            d.Time = x
            d.Tooltip = I
            d.Color = r
            d.color = r.parse
            c.compose(p)
            f.compose(q)
            d.defaultOptions = A.defaultOptions
            d.getOptions = A.getOptions
            d.time = A.defaultTime
            d.setOptions = A.setOptions
            d.dateFormat = H.dateFormat
            d.format = H.format
            d.numberFormat = H.numberFormat
            d.addEvent = h.addEvent
            d.arrayMax = h.arrayMax
            d.arrayMin = h.arrayMin
            d.attr = h.attr
            d.clearTimeout = h.clearTimeout
            d.correctFloat = h.correctFloat
            d.createElement = h.createElement
            d.css = h.css
            d.defined = h.defined
            d.destroyObjectProperties = h.destroyObjectProperties
            d.discardElement = h.discardElement
            d.distribute = y.distribute
            d.erase = h.erase
            d.error = h.error
            d.extend = h.extend
            d.extendClass = h.extendClass
            d.find = h.find
            d.fireEvent = h.fireEvent
            d.getMagnitude = h.getMagnitude
            d.getStyle = h.getStyle
            d.inArray = h.inArray
            d.isArray = h.isArray
            d.isClass = h.isClass
            d.isDOMElement = h.isDOMElement
            d.isFunction = h.isFunction
            d.isNumber = h.isNumber
            d.isObject = h.isObject
            d.isString = h.isString
            d.keys = h.keys
            d.merge = h.merge
            d.normalizeTickInterval = h.normalizeTickInterval
            d.objectEach = h.objectEach
            d.offset = h.offset
            d.pad = h.pad
            d.pick = h.pick
            d.pInt = h.pInt
            d.relativeLength = h.relativeLength
            d.removeEvent = h.removeEvent
            d.seriesType = w.seriesType
            d.splat = h.splat
            d.stableSort = h.stableSort
            d.syncTimeout = h.syncTimeout
            d.timeUnits = h.timeUnits
            d.uniqueKey = h.uniqueKey
            d.useSerialIds = h.useSerialIds
            d.wrap = h.wrap
            e.compose(l)
            B.compose(k)
            n.compose(a)
            m.compose(a)
            b.compose(g)
            D.compose(a)
            J.compose(u)
            return d
        }
    )
    N(
        h,
        'Core/Axis/OrdinalAxis.js',
        [
            h['Core/Axis/Axis.js'],
            h['Core/Globals.js'],
            h['Core/Series/Series.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t = F.addEvent,
                E = F.correctFloat,
                H = F.css,
                y = F.defined,
                q = F.error,
                p = F.pick,
                f = F.timeUnits,
                c = [],
                a
            ;(function (a) {
                function d(a, c, b, d, k, l, h) {
                    void 0 === k && (k = [])
                    void 0 === l && (l = 0)
                    var e = {},
                        g = this.options.tickPixelInterval,
                        r = this.chart.time,
                        m = [],
                        n,
                        p,
                        x = 0,
                        B = [],
                        u = -Number.MAX_VALUE
                    if (
                        (!this.options.ordinal && !this.options.breaks) ||
                        !k ||
                        3 > k.length ||
                        'undefined' === typeof c
                    )
                        return r.getTimeTicks.apply(r, arguments)
                    var J = k.length
                    for (n = 0; n < J; n++) {
                        var w = n && k[n - 1] > b
                        k[n] < c && (x = n)
                        if (n === J - 1 || k[n + 1] - k[n] > 5 * l || w) {
                            if (k[n] > u) {
                                for (p = r.getTimeTicks(a, k[x], k[n], d); p.length && p[0] <= u; )
                                    p.shift()
                                p.length && (u = p[p.length - 1])
                                m.push(B.length)
                                B = B.concat(p)
                            }
                            x = n + 1
                        }
                        if (w) break
                    }
                    if (p) {
                        p = p.info
                        if (h && p.unitRange <= f.hour) {
                            n = B.length - 1
                            for (x = 1; x < n; x++)
                                if (r.dateFormat('%d', B[x]) !== r.dateFormat('%d', B[x - 1])) {
                                    e[B[x]] = 'day'
                                    var v = !0
                                }
                            v && (e[B[0]] = 'day')
                            p.higherRanks = e
                        }
                        p.segmentStarts = m
                        B.info = p
                    } else q(12, !1, this.chart)
                    if (h && y(g)) {
                        p = B.length
                        r = []
                        x = []
                        n = void 0
                        for (v = p; v--; )
                            (m = this.translate(B[v])), n && (x[v] = n - m), (r[v] = n = m)
                        x.sort()
                        x = x[Math.floor(x.length / 2)]
                        x < 0.6 * g && (x = null)
                        v = B[p - 1] > b ? p - 1 : p
                        for (n = void 0; v--; )
                            (m = r[v]),
                                (p = Math.abs(n - m)),
                                n && p < 0.8 * g && (null === x || p < 0.8 * x)
                                    ? (e[B[v]] && !e[B[v + 1]] ? ((p = v + 1), (n = m)) : (p = v),
                                      B.splice(p, 1))
                                    : (n = m)
                    }
                    return B
                }
                function n(a) {
                    var e = this.ordinal.positions
                    if (!e) return a
                    var b = e.length - 1
                    if (0 > a) a = e[0]
                    else if (a > b) a = e[b]
                    else {
                        b = Math.floor(a)
                        var c = a - b
                    }
                    return 'undefined' !== typeof c && 'undefined' !== typeof e[b]
                        ? e[b] + (c ? c * (e[b + 1] - e[b]) : 0)
                        : a
                }
                function C(a) {
                    var e = this.ordinal,
                        b = e.positions
                    if (!b) return a
                    var c =
                        (a - (this.old ? this.old.min : this.min)) *
                            (this.old ? this.old.transA : this.transA) +
                        this.minPixelPadding
                    ;(0 < c && c < this.left + this.len) ||
                        (e.extendedOrdinalPositions ||
                            (e.extendedOrdinalPositions = e.getExtendedPositions()),
                        (b = e.extendedOrdinalPositions))
                    if (b && b.length) {
                        a = e.getIndexOfPoint(c, b)
                        e = E(a % 1)
                        if (0 <= a && a < b.length - 1)
                            return b[Math.floor(a)] + e * (b[Math.ceil(a)] - b[Math.floor(a)])
                        e = b.length
                        c = b[0]
                        b = b[e - 1]
                        var f = (b - c) / (e - 1)
                        return 0 > a ? c + f * a : b + f * (a - e)
                    }
                    return a
                }
                function I(e, c) {
                    var b = a.Additions.findIndexOf(e, c, !0)
                    return e[b] === c ? b : b + (c - e[b]) / (e[b + 1] - e[b])
                }
                function F() {
                    this.ordinal || (this.ordinal = new a.Additions(this))
                }
                function G() {
                    this.isXAxis &&
                        y(this.options.overscroll) &&
                        this.max === this.dataMax &&
                        (!this.chart.mouseIsDown || this.isInternal) &&
                        (!this.eventArgs ||
                            (this.eventArgs && 'navigator' !== this.eventArgs.trigger)) &&
                        ((this.max += this.options.overscroll),
                        !this.isInternal &&
                            y(this.userMin) &&
                            (this.min += this.options.overscroll))
                }
                function v() {
                    this.horiz &&
                        !this.isDirty &&
                        (this.isDirty =
                            this.isOrdinal &&
                            this.chart.navigator &&
                            !this.chart.navigator.adaptToUpdatedData)
                }
                function z() {
                    this.ordinal &&
                        (this.ordinal.beforeSetTickPositions(),
                        (this.tickInterval = this.ordinal.postProcessTickInterval(
                            this.tickInterval
                        )))
                }
                function u(a) {
                    var e = this.xAxis[0],
                        b = e.options.overscroll,
                        c = a.originalEvent.chartX,
                        f = this.options.chart.panning,
                        d = !1
                    if (f && 'y' !== f.type && e.options.ordinal && e.series.length) {
                        var k = this.mouseDownX,
                            l = e.getExtremes(),
                            h = l.dataMax,
                            m = l.min,
                            n = l.max,
                            p = this.hoverPoints,
                            q =
                                e.closestPointRange ||
                                (e.ordinal && e.ordinal.overscrollPointsRange)
                        k = (k - c) / (e.translationSlope * (e.ordinal.slope || q))
                        q = { ordinal: { positions: e.ordinal.getExtendedPositions() } }
                        var u = e.index2val,
                            w = e.val2lin,
                            v = void 0,
                            t = (v = void 0),
                            z = void 0
                        q.ordinal.positions
                            ? 1 < Math.abs(k) &&
                              (p &&
                                  p.forEach(function (a) {
                                      a.setState()
                                  }),
                              0 > k
                                  ? ((t = q), (z = e.ordinal.positions ? e : q))
                                  : ((t = e.ordinal.positions ? e : q), (z = q)),
                              (v = z.ordinal.positions),
                              h > v[v.length - 1] && v.push(h),
                              (this.fixedRange = n - m),
                              (v = e.navigatorAxis.toFixedRange(
                                  void 0,
                                  void 0,
                                  u.apply(t, [w.apply(t, [m, !0]) + k]),
                                  u.apply(z, [w.apply(z, [n, !0]) + k])
                              )),
                              v.min >= Math.min(l.dataMin, m) &&
                                  v.max <= Math.max(h, n) + b &&
                                  e.setExtremes(v.min, v.max, !0, !1, { trigger: 'pan' }),
                              (this.mouseDownX = c),
                              H(this.container, { cursor: 'move' }))
                            : (d = !0)
                    } else d = !0
                    d || (f && /y/.test(f.type)) ? b && (e.max = e.dataMax + b) : a.preventDefault()
                }
                function k() {
                    var a = this.xAxis
                    a &&
                        a.options.ordinal &&
                        (delete a.ordinal.index, delete a.ordinal.extendedOrdinalPositions)
                }
                function w(a, c) {
                    var b = this.ordinal,
                        e = b.positions,
                        g = b.slope,
                        f = b.extendedOrdinalPositions
                    if (!e) return a
                    var d = e.length
                    if (e[0] <= a && e[d - 1] >= a) a = I(e, a)
                    else {
                        f ||
                            ((f = b.getExtendedPositions && b.getExtendedPositions()),
                            (b.extendedOrdinalPositions = f))
                        if (!f || !f.length) return a
                        d = f.length
                        g || (g = (f[d - 1] - f[0]) / d)
                        e = I(f, e[0])
                        a >= f[0] && a <= f[d - 1]
                            ? (a = I(f, a) - e)
                            : a < f[0]
                            ? ((a = f[0] - a), (a = -e - a / g))
                            : ((a -= f[d - 1]), (a = a / g + d - e))
                    }
                    return c ? a : g * (a || 0) + b.offset
                }
                a.compose = function (a, g, b) {
                    if (-1 === c.indexOf(a)) {
                        c.push(a)
                        var e = a.prototype
                        e.getTimeTicks = d
                        e.index2val = n
                        e.lin2val = C
                        e.val2lin = w
                        e.ordinal2lin = e.val2lin
                        t(a, 'afterInit', F)
                        t(a, 'foundExtremes', G)
                        t(a, 'afterSetScale', v)
                        t(a, 'initialAxisTranslation', z)
                    }
                    ;-1 === c.indexOf(b) && (c.push(b), t(b, 'pan', u))
                    ;-1 === c.indexOf(g) && (c.push(g), t(g, 'updatedData', k))
                    return a
                }
                var l = (function () {
                    function a(a) {
                        this.index = {}
                        this.axis = a
                    }
                    a.prototype.beforeSetTickPositions = function () {
                        var a = this.axis,
                            b = a.ordinal,
                            e = a.getExtremes(),
                            c = e.min,
                            f = e.max,
                            d = a.isXAxis && !!a.options.breaks
                        e = a.options.ordinal
                        var k = a.chart.options.chart.ignoreHiddenSeries,
                            l,
                            h,
                            m = [],
                            n = Number.MAX_VALUE,
                            q = !1
                        if (e || d) {
                            a.series.forEach(function (a, b) {
                                l = []
                                if (
                                    !(
                                        (k && !1 === a.visible) ||
                                        (!1 === a.takeOrdinalPosition && !d)
                                    ) &&
                                    ((m = m.concat(a.processedXData)),
                                    (u = m.length),
                                    m.sort(function (a, b) {
                                        return a - b
                                    }),
                                    (n = Math.min(n, p(a.closestPointRange, n))),
                                    u)
                                ) {
                                    for (b = 0; b < u - 1; )
                                        m[b] !== m[b + 1] && l.push(m[b + 1]), b++
                                    l[0] !== m[0] && l.unshift(m[0])
                                    m = l
                                }
                            })
                            var u = m.length
                            if (2 < u) {
                                var w = m[1] - m[0]
                                for (h = u - 1; h-- && !q; ) m[h + 1] - m[h] !== w && (q = !0)
                                !a.options.keepOrdinalPadding &&
                                    (m[0] - c > w || f - m[m.length - 1] > w) &&
                                    (q = !0)
                            } else
                                a.options.overscroll &&
                                    (2 === u
                                        ? (n = m[1] - m[0])
                                        : 1 === u
                                        ? ((n = a.options.overscroll), (m = [m[0], m[0] + n]))
                                        : (n = b.overscrollPointsRange))
                            q || a.forceOrdinal
                                ? (a.options.overscroll &&
                                      ((b.overscrollPointsRange = n),
                                      (m = m.concat(b.getOverscrollPositions()))),
                                  (b.positions = m),
                                  (w = a.ordinal2lin(Math.max(c, m[0]), !0)),
                                  (h = Math.max(
                                      a.ordinal2lin(Math.min(f, m[m.length - 1]), !0),
                                      1
                                  )),
                                  (b.slope = f = (f - c) / (h - w)),
                                  (b.offset = c - w * f))
                                : ((b.overscrollPointsRange = p(
                                      a.closestPointRange,
                                      b.overscrollPointsRange
                                  )),
                                  (b.positions = a.ordinal.slope = b.offset = void 0))
                        }
                        a.isOrdinal = e && q
                        b.groupIntervalFactor = null
                    }
                    a.findIndexOf = function (a, b, e) {
                        for (var c = 0, g = a.length - 1, f; c < g; )
                            (f = Math.ceil((c + g) / 2)), a[f] <= b ? (c = f) : (g = f - 1)
                        return a[c] === b ? c : e ? c : -1
                    }
                    a.prototype.getExtendedPositions = function () {
                        var a = this,
                            b = a.axis,
                            e = b.constructor.prototype,
                            c = b.chart,
                            f = b.series[0].currentDataGrouping,
                            d = f ? f.count + f.unitName : 'raw',
                            k = b.options.overscroll,
                            l = b.getExtremes(),
                            m = void 0,
                            n = a.index
                        n || (n = a.index = {})
                        if (!n[d]) {
                            var p = {
                                series: [],
                                chart: c,
                                forceOrdinal: !1,
                                getExtremes: function () {
                                    return { min: l.dataMin, max: l.dataMax + k }
                                },
                                getGroupPixelWidth: e.getGroupPixelWidth,
                                getTimeTicks: e.getTimeTicks,
                                options: { ordinal: !0 },
                                ordinal: { getGroupIntervalFactor: this.getGroupIntervalFactor },
                                ordinal2lin: e.ordinal2lin,
                                getIndexOfPoint: e.getIndexOfPoint,
                                val2lin: e.val2lin,
                            }
                            p.ordinal.axis = p
                            b.series.forEach(function (b) {
                                m = {
                                    xAxis: p,
                                    xData: b.xData.slice(),
                                    chart: c,
                                    destroyGroupedData: h.noop,
                                    getProcessedData: A.prototype.getProcessedData,
                                    applyGrouping: A.prototype.applyGrouping,
                                }
                                m.xData = m.xData.concat(a.getOverscrollPositions())
                                m.options = {
                                    dataGrouping: f
                                        ? {
                                              firstAnchor: 'firstPoint',
                                              anchor: 'middle',
                                              lastAnchor: 'lastPoint',
                                              enabled: !0,
                                              forced: !0,
                                              approximation: 'open',
                                              units: [[f.unitName, [f.count]]],
                                          }
                                        : { enabled: !1 },
                                }
                                p.series.push(m)
                                b.processData.apply(m)
                            })
                            m.closestPointRange !== m.basePointRange &&
                                m.currentDataGrouping &&
                                (p.forceOrdinal = !0)
                            b.ordinal.beforeSetTickPositions.apply({ axis: p })
                            n[d] = p.ordinal.positions
                        }
                        return n[d]
                    }
                    a.prototype.getGroupIntervalFactor = function (a, b, e) {
                        e = e.processedXData
                        var c = e.length,
                            f = []
                        var g = this.groupIntervalFactor
                        if (!g) {
                            for (g = 0; g < c - 1; g++) f[g] = e[g + 1] - e[g]
                            f.sort(function (a, b) {
                                return a - b
                            })
                            f = f[Math.floor(c / 2)]
                            a = Math.max(a, e[0])
                            b = Math.min(b, e[c - 1])
                            this.groupIntervalFactor = g = (c * f) / (b - a)
                        }
                        return g
                    }
                    a.prototype.getIndexOfPoint = function (e, b) {
                        var c = this.axis,
                            f = this.positions ? this.positions[0] : 0,
                            g =
                                (c.series[0].points &&
                                    c.series[0].points[0] &&
                                    c.series[0].points[0].plotX) ||
                                c.minPixelPadding
                        1 < c.series.length &&
                            c.series.forEach(function (a) {
                                a.points &&
                                    y(a.points[0]) &&
                                    y(a.points[0].plotX) &&
                                    a.points[0].plotX < g &&
                                    (g = a.points[0].plotX)
                            })
                        e =
                            (e - g) /
                            (c.translationSlope *
                                (this.slope || c.closestPointRange || this.overscrollPointsRange))
                        return a.findIndexOf(b, f) + e
                    }
                    a.prototype.getOverscrollPositions = function () {
                        var a = this.axis,
                            b = a.options.overscroll,
                            e = this.overscrollPointsRange,
                            c = [],
                            f = a.dataMax
                        if (y(e)) for (; f <= a.dataMax + b; ) (f += e), c.push(f)
                        return c
                    }
                    a.prototype.postProcessTickInterval = function (a) {
                        var b = this.axis,
                            e = this.slope
                        return e
                            ? b.options.breaks
                                ? b.closestPointRange || a
                                : a / (e / b.closestPointRange)
                            : a
                    }
                    return a
                })()
                a.Additions = l
            })(a || (a = {}))
            return a
        }
    )
    N(
        h,
        'Series/DataModifyComposition.js',
        [
            h['Core/Axis/Axis.js'],
            h['Core/Series/Point.js'],
            h['Core/Series/Series.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F) {
            var t = h.prototype.tooltipFormatter,
                E = F.addEvent,
                H = F.arrayMax,
                y = F.arrayMin,
                q = F.correctFloat,
                p = F.defined,
                f = F.isArray,
                c = F.isNumber,
                a = F.isString,
                n = F.pick,
                m
            ;(function (d) {
                function h(e, b, c) {
                    this.isXAxis ||
                        (this.series.forEach(function (c) {
                            'compare' === e && 'boolean' !== typeof b
                                ? c.setCompare(b, !1)
                                : 'cumulative' !== e || a(b) || c.setCumulative(b, !1)
                        }),
                        n(c, !0) && this.chart.redraw())
                }
                function m(a) {
                    var b = this,
                        e = b.series.chart.numberFormatter,
                        c = function (c) {
                            a = a.replace(
                                '{point.' + c + '}',
                                (0 < b[c] && 'change' === c ? '+' : '') +
                                    e(b[c], n(b.series.tooltipOptions.changeDecimals, 2))
                            )
                        }
                    p(b.change) && c('change')
                    p(b.cumulativeSum) && c('cumulativeSum')
                    return t.apply(this, [a])
                }
                function D() {
                    var a = this.options.compare
                    if ('percent' === a || 'value' === a || this.options.cumulative) {
                        var b = new e(this)
                        'percent' === a || 'value' === a ? b.initCompare(a) : b.initCumulative()
                    }
                    this.dataModify = b
                }
                function A(a) {
                    a = a.dataExtremes
                    var b = a.activeYData
                    if (this.dataModify && a) {
                        var c = void 0
                        this.options.compare
                            ? (c = [
                                  this.dataModify.modifyValue(a.dataMin),
                                  this.dataModify.modifyValue(a.dataMax),
                              ])
                            : this.options.cumulative &&
                              f(b) &&
                              2 <= b.length &&
                              (c = e.getCumulativeExtremes(b))
                        c && ((a.dataMin = y(c)), (a.dataMax = H(c)))
                    }
                }
                function v(a, b) {
                    this.options.compare = this.userOptions.compare = a
                    this.update({}, n(b, !0))
                    !this.dataModify || ('value' !== a && 'percent' !== a)
                        ? this.points.forEach(function (a) {
                              delete a.change
                          })
                        : this.dataModify.initCompare(a)
                }
                function z() {
                    if (this.xAxis && this.processedYData && this.dataModify) {
                        var a = this.processedXData,
                            b = this.processedYData,
                            e = b.length,
                            f = !0 === this.options.compareStart ? 0 : 1,
                            d = -1,
                            k
                        this.pointArrayMap &&
                            (d = this.pointArrayMap.indexOf(
                                this.options.pointValKey || this.pointValKey || 'y'
                            ))
                        for (k = 0; k < e - f; k++) {
                            var l = b[k] && -1 < d ? b[k][d] : b[k]
                            if (c(l) && 0 !== l && a[k + f] >= (this.xAxis.min || 0)) {
                                this.dataModify.compareValue = l
                                break
                            }
                        }
                    }
                }
                function u(a, b) {
                    this.setModifier('compare', a, b)
                }
                function k(a, b) {
                    a = n(a, !1)
                    this.options.cumulative = this.userOptions.cumulative = a
                    this.update({}, n(b, !0))
                    this.dataModify
                        ? this.dataModify.initCumulative()
                        : this.points.forEach(function (a) {
                              delete a.cumulativeSum
                          })
                }
                function w(a, b) {
                    this.setModifier('cumulative', a, b)
                }
                var l = []
                d.compose = function (a, b, e) {
                    if (-1 === l.indexOf(a)) {
                        l.push(a)
                        var c = a.prototype
                        c.setCompare = v
                        c.setCumulative = k
                        E(a, 'afterInit', D)
                        E(a, 'afterGetExtremes', A)
                        E(a, 'afterProcessData', z)
                    }
                    ;-1 === l.indexOf(b) &&
                        (l.push(b),
                        (b = b.prototype),
                        (b.setCompare = u),
                        (b.setModifier = h),
                        (b.setCumulative = w))
                    ;-1 === l.indexOf(e) && (l.push(e), (e.prototype.tooltipFormatter = m))
                    return a
                }
                var e = (function () {
                    function a(a) {
                        this.series = a
                    }
                    a.prototype.modifyValue = function () {
                        return 0
                    }
                    a.getCumulativeExtremes = function (a) {
                        var b = Infinity,
                            e = -Infinity
                        a.reduce(function (a, c) {
                            c = a + c
                            b = Math.min(b, c, a)
                            e = Math.max(e, c, a)
                            return c
                        })
                        return [b, e]
                    }
                    a.prototype.initCompare = function (a) {
                        this.modifyValue = function (b, e) {
                            null === b && (b = 0)
                            var c = this.compareValue
                            return 'undefined' !== typeof b && 'undefined' !== typeof c
                                ? ((b =
                                      'value' === a
                                          ? b - c
                                          : (b / c) * 100 -
                                            (100 === this.series.options.compareBase ? 0 : 100)),
                                  'undefined' !== typeof e &&
                                      (e = this.series.points[e]) &&
                                      (e.change = b),
                                  b)
                                : 0
                        }
                    }
                    a.prototype.initCumulative = function () {
                        this.modifyValue = function (a, e) {
                            null === a && (a = 0)
                            if (void 0 !== a && void 0 !== e) {
                                var b = 0 < e ? this.series.points[e - 1] : null
                                b && b.cumulativeSum && (a = q(b.cumulativeSum + a))
                                if ((e = this.series.points[e])) e.cumulativeSum = a
                                return a
                            }
                            return 0
                        }
                    }
                    return a
                })()
                d.Additions = e
            })(m || (m = {}))
            ;('')
            return m
        }
    )
    N(
        h,
        'Core/Axis/BrokenAxis.js',
        [h['Extensions/Stacking.js'], h['Core/Utilities.js']],
        function (d, h) {
            var A = h.addEvent,
                E = h.find,
                t = h.fireEvent,
                G = h.isArray,
                H = h.isNumber,
                y = h.pick,
                q
            ;(function (h) {
                function f() {
                    'undefined' !== typeof this.brokenAxis &&
                        this.brokenAxis.setBreaks(this.options.breaks, !1)
                }
                function c() {
                    this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1)
                }
                function a() {
                    var a = this.brokenAxis
                    if (a && a.hasBreaks) {
                        for (
                            var c = this.tickPositions, f = this.tickPositions.info, d = [], h = 0;
                            h < c.length;
                            h++
                        )
                            a.isInAnyBreak(c[h]) || d.push(c[h])
                        this.tickPositions = d
                        this.tickPositions.info = f
                    }
                }
                function n() {
                    this.brokenAxis || (this.brokenAxis = new K(this))
                }
                function m() {
                    var a = this.options.connectNulls,
                        c = this.points,
                        f = this.xAxis,
                        d = this.yAxis
                    if (this.isDirty)
                        for (var h = c.length; h--; ) {
                            var l = c[h],
                                e =
                                    !(null === l.y && !1 === a) &&
                                    ((f && f.brokenAxis && f.brokenAxis.isInAnyBreak(l.x, !0)) ||
                                        (d && d.brokenAxis && d.brokenAxis.isInAnyBreak(l.y, !0)))
                            l.visible = e ? !1 : !1 !== l.options.visible
                        }
                }
                function p() {
                    this.drawBreaks(this.xAxis, ['x'])
                    this.drawBreaks(this.yAxis, y(this.pointArrayMap, ['y']))
                }
                function q(a, c) {
                    var f = this,
                        d = f.points,
                        h,
                        l,
                        e,
                        g
                    if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
                        var b = a.brokenAxis
                        c.forEach(function (c) {
                            h = (b && b.breakArray) || []
                            l = a.isXAxis ? a.min : y(f.options.threshold, a.min)
                            d.forEach(function (b) {
                                g = y(b['stack' + c.toUpperCase()], b[c])
                                h.forEach(function (c) {
                                    if (H(l) && H(g)) {
                                        e = !1
                                        if ((l < c.from && g > c.to) || (l > c.from && g < c.from))
                                            e = 'pointBreak'
                                        else if (
                                            (l < c.from && g > c.from && g < c.to) ||
                                            (l > c.from && g > c.to && g < c.from)
                                        )
                                            e = 'pointInBreak'
                                        e && t(a, e, { point: b, brk: c })
                                    }
                                })
                            })
                        })
                    }
                }
                function I() {
                    var a = this.currentDataGrouping,
                        c = a && a.gapSize
                    a = this.points.slice()
                    var f = this.yAxis,
                        k = this.options.gapSize,
                        h = a.length - 1,
                        l
                    if (k && 0 < h)
                        for (
                            'value' !== this.options.gapUnit && (k *= this.basePointRange),
                                c && c > k && c >= this.basePointRange && (k = c),
                                l = void 0;
                            h--;

                        )
                            (l && !1 !== l.visible) || (l = a[h + 1]),
                                (c = a[h]),
                                !1 !== l.visible &&
                                    !1 !== c.visible &&
                                    (l.x - c.x > k &&
                                        ((l = (c.x + l.x) / 2),
                                        a.splice(h + 1, 0, { isNull: !0, x: l }),
                                        f.stacking &&
                                            this.options.stacking &&
                                            ((l = f.stacking.stacks[this.stackKey][l] =
                                                new d(f, f.options.stackLabels, !1, l, this.stack)),
                                            (l.total = 0))),
                                    (l = c))
                    return this.getGraphPath(a)
                }
                var F = []
                h.compose = function (d, h) {
                    ;-1 === F.indexOf(d) &&
                        (F.push(d),
                        d.keepProps.push('brokenAxis'),
                        A(d, 'init', n),
                        A(d, 'afterInit', f),
                        A(d, 'afterSetTickPositions', a),
                        A(d, 'afterSetOptions', c))
                    if (-1 === F.indexOf(h)) {
                        F.push(h)
                        var u = h.prototype
                        u.drawBreaks = q
                        u.gappedPath = I
                        A(h, 'afterGeneratePoints', m)
                        A(h, 'afterRender', p)
                    }
                    return d
                }
                var K = (function () {
                    function a(a) {
                        this.hasBreaks = !1
                        this.axis = a
                    }
                    a.isInBreak = function (a, c) {
                        var f = a.repeat || Infinity,
                            d = a.from,
                            l = a.to - a.from
                        c = c >= d ? (c - d) % f : f - ((d - c) % f)
                        return a.inclusive ? c <= l : c < l && 0 !== c
                    }
                    a.lin2Val = function (c) {
                        var f = this.brokenAxis
                        f = f && f.breakArray
                        if (!f || !H(c)) return c
                        var d
                        for (d = 0; d < f.length; d++) {
                            var h = f[d]
                            if (h.from >= c) break
                            else h.to < c ? (c += h.len) : a.isInBreak(h, c) && (c += h.len)
                        }
                        return c
                    }
                    a.val2Lin = function (c) {
                        var f = this.brokenAxis
                        f = f && f.breakArray
                        if (!f || !H(c)) return c
                        var d = c,
                            h
                        for (h = 0; h < f.length; h++) {
                            var l = f[h]
                            if (l.to <= c) d -= l.len
                            else if (l.from >= c) break
                            else if (a.isInBreak(l, c)) {
                                d -= c - l.from
                                break
                            }
                        }
                        return d
                    }
                    a.prototype.findBreakAt = function (a, c) {
                        return E(c, function (c) {
                            return c.from < a && a < c.to
                        })
                    }
                    a.prototype.isInAnyBreak = function (c, f) {
                        var d = this.axis,
                            h = d.options.breaks || [],
                            l = h.length,
                            e
                        if (l && H(c)) {
                            for (; l--; )
                                if (a.isInBreak(h[l], c)) {
                                    var g = !0
                                    e || (e = y(h[l].showPoints, !d.isXAxis))
                                }
                            var b = g && f ? g && !e : g
                        }
                        return b
                    }
                    a.prototype.setBreaks = function (c, f) {
                        var d = this,
                            h = d.axis,
                            l = G(c) && !!c.length
                        h.isDirty = d.hasBreaks !== l
                        d.hasBreaks = l
                        h.options.breaks = h.userOptions.breaks = c
                        h.forceRedraw = !0
                        h.series.forEach(function (a) {
                            a.isDirty = !0
                        })
                        l || h.val2lin !== a.val2Lin || (delete h.val2lin, delete h.lin2val)
                        l &&
                            ((h.userOptions.ordinal = !1),
                            (h.lin2val = a.lin2Val),
                            (h.val2lin = a.val2Lin),
                            (h.setExtremes = function (a, c, b, f, k) {
                                if (d.hasBreaks) {
                                    for (
                                        var e = this.options.breaks || [], g;
                                        (g = d.findBreakAt(a, e));

                                    )
                                        a = g.to
                                    for (; (g = d.findBreakAt(c, e)); ) c = g.from
                                    c < a && (c = a)
                                }
                                h.constructor.prototype.setExtremes.call(this, a, c, b, f, k)
                            }),
                            (h.setAxisTranslation = function () {
                                h.constructor.prototype.setAxisTranslation.call(this)
                                d.unitLength = void 0
                                if (d.hasBreaks) {
                                    var c = h.options.breaks || [],
                                        f = [],
                                        b = [],
                                        k = y(h.pointRangePadding, 0),
                                        l = 0,
                                        r,
                                        m = h.userMin || h.min,
                                        n = h.userMax || h.max,
                                        p
                                    c.forEach(function (b) {
                                        r = b.repeat || Infinity
                                        H(m) &&
                                            H(n) &&
                                            (a.isInBreak(b, m) && (m += (b.to % r) - (m % r)),
                                            a.isInBreak(b, n) && (n -= (n % r) - (b.from % r)))
                                    })
                                    c.forEach(function (a) {
                                        u = a.from
                                        r = a.repeat || Infinity
                                        if (H(m) && H(n)) {
                                            for (; u - r > m; ) u -= r
                                            for (; u < m; ) u += r
                                            for (p = u; p < n; p += r)
                                                f.push({ value: p, move: 'in' }),
                                                    f.push({
                                                        value: p + a.to - a.from,
                                                        move: 'out',
                                                        size: a.breakSize,
                                                    })
                                        }
                                    })
                                    f.sort(function (a, b) {
                                        return a.value === b.value
                                            ? ('in' === a.move ? 0 : 1) - ('in' === b.move ? 0 : 1)
                                            : a.value - b.value
                                    })
                                    var q = 0
                                    var u = m
                                    f.forEach(function (a) {
                                        q += 'in' === a.move ? 1 : -1
                                        1 === q && 'in' === a.move && (u = a.value)
                                        0 === q &&
                                            H(u) &&
                                            (b.push({
                                                from: u,
                                                to: a.value,
                                                len: a.value - u - (a.size || 0),
                                            }),
                                            (l += a.value - u - (a.size || 0)))
                                    })
                                    d.breakArray = b
                                    H(m) &&
                                        H(n) &&
                                        H(h.min) &&
                                        ((d.unitLength = n - m - l + k),
                                        t(h, 'afterBreaks'),
                                        h.staticScale
                                            ? (h.transA = h.staticScale)
                                            : d.unitLength &&
                                              (h.transA *= (n - h.min + k) / d.unitLength),
                                        k &&
                                            (h.minPixelPadding =
                                                h.transA * (h.minPointOffset || 0)),
                                        (h.min = m),
                                        (h.max = n))
                                }
                            }))
                        y(f, !0) && h.chart.redraw()
                    }
                    return a
                })()
                h.Additions = K
            })(q || (q = {}))
            return q
        }
    )
    N(
        h,
        'masters/modules/broken-axis.src.js',
        [h['Core/Globals.js'], h['Core/Axis/BrokenAxis.js']],
        function (d, h) {
            h.compose(d.Axis, d.Series)
        }
    )
    N(
        h,
        'Extensions/DataGrouping.js',
        [
            h['Core/Axis/Axis.js'],
            h['Core/Axis/DateTimeAxis.js'],
            h['Core/FormatUtilities.js'],
            h['Core/Globals.js'],
            h['Core/Series/Point.js'],
            h['Core/Series/Series.js'],
            h['Core/Tooltip.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y, q) {
            var p = A.format,
                f = G.prototype
            A = q.addEvent
            var c = q.arrayMax,
                a = q.arrayMin,
                n = q.correctFloat,
                m = q.defined,
                D = q.error,
                C = q.extend,
                I = q.isNumber,
                E = q.merge,
                K = q.pick
            ;('')
            var v = (F.approximations = {
                sum: function (a) {
                    var c = a.length
                    if (!c && a.hasNulls) var b = null
                    else if (c) for (b = 0; c--; ) b += a[c]
                    return b
                },
                average: function (a) {
                    var c = a.length
                    a = v.sum(a)
                    I(a) && c && (a = n(a / c))
                    return a
                },
                averages: function () {
                    var a = []
                    ;[].forEach.call(arguments, function (c) {
                        a.push(v.average(c))
                    })
                    return 'undefined' === typeof a[0] ? void 0 : a
                },
                open: function (a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                },
                high: function (a) {
                    return a.length ? c(a) : a.hasNulls ? null : void 0
                },
                low: function (c) {
                    return c.length ? a(c) : c.hasNulls ? null : void 0
                },
                close: function (a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                },
                hlc: function (a, c, b) {
                    a = v.high(a)
                    c = v.low(c)
                    b = v.close(b)
                    if (I(a) || I(c) || I(b)) return [a, c, b]
                },
                ohlc: function (a, c, b, f) {
                    a = v.open(a)
                    c = v.high(c)
                    b = v.low(b)
                    f = v.close(f)
                    if (I(a) || I(c) || I(b) || I(f)) return [a, c, b, f]
                },
                range: function (a, c) {
                    a = v.low(a)
                    c = v.high(c)
                    if (I(a) || I(c)) return [a, c]
                    if (null === a && null === c) return null
                },
            })
            q = function (a, c, b, f) {
                var e = this,
                    d = e.data,
                    g = e.options && e.options.data,
                    k = [],
                    l = [],
                    h = [],
                    n = a.length,
                    p = !!c,
                    q = [],
                    u = e.pointArrayMap,
                    B = u && u.length,
                    w = ['x'].concat(u || ['y']),
                    t = this.options.dataGrouping && this.options.dataGrouping.groupAll,
                    z = 0,
                    y = 0,
                    D
                f =
                    'function' === typeof f
                        ? f
                        : v[f]
                        ? v[f]
                        : v[(e.getDGApproximation && e.getDGApproximation()) || 'average']
                B
                    ? u.forEach(function () {
                          q.push([])
                      })
                    : q.push([])
                var C = B || 1
                for (D = 0; D <= n && !(a[D] >= b[0]); D++);
                for (D; D <= n; D++) {
                    for (; ('undefined' !== typeof b[z + 1] && a[D] >= b[z + 1]) || D === n; ) {
                        var A = b[z]
                        e.dataGroupInfo = { start: t ? y : e.cropStart + y, length: q[0].length }
                        var F = f.apply(e, q)
                        e.pointClass &&
                            !m(e.dataGroupInfo.options) &&
                            ((e.dataGroupInfo.options = E(
                                e.pointClass.prototype.optionsToObject.call(
                                    { series: e },
                                    e.options.data[e.cropStart + y]
                                )
                            )),
                            w.forEach(function (a) {
                                delete e.dataGroupInfo.options[a]
                            }))
                        'undefined' !== typeof F && (k.push(A), l.push(F), h.push(e.dataGroupInfo))
                        y = D
                        for (A = 0; A < C; A++) (q[A].length = 0), (q[A].hasNulls = !1)
                        z += 1
                        if (D === n) break
                    }
                    if (D === n) break
                    if (u) {
                        A =
                            e.options.dataGrouping && e.options.dataGrouping.groupAll
                                ? D
                                : e.cropStart + D
                        F =
                            (d && d[A]) ||
                            e.pointClass.prototype.applyOptions.apply({ series: e }, [g[A]])
                        var G = void 0
                        for (A = 0; A < B; A++)
                            (G = F[u[A]]), I(G) ? q[A].push(G) : null === G && (q[A].hasNulls = !0)
                    } else
                        (A = p ? c[D] : null),
                            I(A) ? q[0].push(A) : null === A && (q[0].hasNulls = !0)
                }
                return { groupedXData: k, groupedYData: l, groupMap: h }
            }
            var z = { approximations: v, groupData: q },
                u = f.generatePoints,
                k = {
                    groupPixelWidth: 2,
                    dateTimeLabelFormats: {
                        millisecond: [
                            '%A, %b %e, %H:%M:%S.%L',
                            '%A, %b %e, %H:%M:%S.%L',
                            '-%H:%M:%S.%L',
                        ],
                        second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
                        minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                        hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                        day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                        week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                        month: ['%B %Y', '%B', '-%B %Y'],
                        year: ['%Y', '%Y', '-%Y'],
                    },
                },
                w = {
                    line: {},
                    spline: {},
                    area: {},
                    areaspline: {},
                    arearange: {},
                    column: { groupPixelWidth: 10 },
                    columnrange: { groupPixelWidth: 10 },
                    candlestick: { groupPixelWidth: 10 },
                    ohlc: { groupPixelWidth: 5 },
                    hlc: { groupPixelWidth: 5 },
                    heikinashi: { groupPixelWidth: 10 },
                },
                l = (F.defaultDataGroupingUnits = [
                    ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ['second', [1, 2, 5, 10, 15, 30]],
                    ['minute', [1, 2, 5, 10, 15, 30]],
                    ['hour', [1, 2, 3, 4, 6, 8, 12]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1, 3, 6]],
                    ['year', null],
                ])
            f.getDGApproximation = function () {
                return this.is('arearange')
                    ? 'range'
                    : this.is('ohlc')
                    ? 'ohlc'
                    : this.is('hlc')
                    ? 'hlc'
                    : this.is('column')
                    ? 'sum'
                    : 'average'
            }
            f.groupData = q
            f.applyGrouping = function (a) {
                var c = this.chart,
                    b = this.options.dataGrouping,
                    e = !1 !== this.allowDG && b && K(b.enabled, c.options.isStock),
                    d = this.visible || !c.options.chart.ignoreHiddenSeries,
                    k,
                    n = this.currentDataGrouping,
                    p = !1
                e && !this.requireSorting && (this.requireSorting = p = !0)
                a =
                    !1 ===
                        !(
                            this.isCartesian &&
                            !this.isDirty &&
                            !this.xAxis.isDirty &&
                            !this.yAxis.isDirty &&
                            !a
                        ) || !e
                p && (this.requireSorting = !1)
                if (!a) {
                    this.destroyGroupedData()
                    e = b.groupAll ? this.xData : this.processedXData
                    var q = b.groupAll ? this.yData : this.processedYData
                    a = c.plotSizeX
                    p = this.xAxis
                    var u = p.options.ordinal,
                        w = this.groupPixelWidth
                    if (w && e && e.length) {
                        this.isDirty = k = !0
                        this.points = null
                        var v = p.getExtremes()
                        var t = v.min
                        v = v.max
                        u = (u && p.ordinal && p.ordinal.getGroupIntervalFactor(t, v, this)) || 1
                        a = p.getTimeTicks(
                            h.Additions.prototype.normalizeTimeTickInterval(
                                ((w * (v - t)) / a) * u,
                                b.units || l
                            ),
                            Math.min(t, e[0]),
                            Math.max(v, e[e.length - 1]),
                            p.options.startOfWeek,
                            e,
                            this.closestPointRange
                        )
                        w = f.groupData.apply(this, [e, q, a, b.approximation])
                        e = w.groupedXData
                        q = w.groupedYData
                        u = 0
                        b &&
                            b.smoothed &&
                            e.length &&
                            ((b.firstAnchor = 'firstPoint'),
                            (b.anchor = 'middle'),
                            (b.lastAnchor = 'lastPoint'),
                            D(32, !1, c, { 'dataGrouping.smoothed': 'use dataGrouping.anchor' }))
                        c = e
                        var z = this.options.dataGrouping
                        t = this.currentDataGrouping && this.currentDataGrouping.gapSize
                        if (z && this.xData && t && this.groupMap) {
                            var y = c.length - 1
                            var C = z.anchor
                            var A = K(z.firstAnchor, C)
                            z = K(z.lastAnchor, C)
                            if (C && 'start' !== C) {
                                var F = t * { middle: 0.5, end: 1 }[C]
                                for (C = c.length - 1; C-- && 0 < C; ) c[C] += F
                            }
                            if (A && 'start' !== A && this.xData[0] >= c[0]) {
                                C = this.groupMap[0].start
                                F = this.groupMap[0].length
                                var E = void 0
                                I(C) && I(F) && (E = C + (F - 1))
                                c[0] = {
                                    middle: c[0] + 0.5 * t,
                                    end: c[0] + t,
                                    firstPoint: this.xData[0],
                                    lastPoint: E && this.xData[E],
                                }[A]
                            }
                            z &&
                                'start' !== z &&
                                t &&
                                c[y] >= v - t &&
                                ((v = this.groupMap[this.groupMap.length - 1].start),
                                (c[y] = {
                                    middle: c[y] + 0.5 * t,
                                    end: c[y] + t,
                                    firstPoint: v && this.xData[v],
                                    lastPoint: this.xData[this.xData.length - 1],
                                }[z]))
                        }
                        for (v = 1; v < a.length; v++)
                            (a.info.segmentStarts && -1 !== a.info.segmentStarts.indexOf(v)) ||
                                (u = Math.max(a[v] - a[v - 1], u))
                        v = a.info
                        v.gapSize = u
                        this.closestPointRange = a.info.totalRange
                        this.groupMap = w.groupMap
                        if (d) {
                            d = e
                            if (m(d[0]) && I(p.min) && I(p.dataMin) && d[0] < p.min) {
                                if (
                                    (!m(p.options.min) && p.min <= p.dataMin) ||
                                    p.min === p.dataMin
                                )
                                    p.min = Math.min(d[0], p.min)
                                p.dataMin = Math.min(d[0], p.dataMin)
                            }
                            if (
                                m(d[d.length - 1]) &&
                                I(p.max) &&
                                I(p.dataMax) &&
                                d[d.length - 1] > p.max
                            ) {
                                if (
                                    (!m(p.options.max) && I(p.dataMax) && p.max >= p.dataMax) ||
                                    p.max === p.dataMax
                                )
                                    p.max = Math.max(d[d.length - 1], p.max)
                                p.dataMax = Math.max(d[d.length - 1], p.dataMax)
                            }
                        }
                        b.groupAll &&
                            ((this.allGroupedData = q),
                            (b = this.cropData(e, q, p.min, p.max, 1)),
                            (e = b.xData),
                            (q = b.yData),
                            (this.cropStart = b.start))
                        this.processedXData = e
                        this.processedYData = q
                    } else this.groupMap = null
                    this.hasGroupedData = k
                    this.currentDataGrouping = v
                    this.preventGraphAnimation = (n && n.totalRange) !== (v && v.totalRange)
                }
            }
            f.destroyGroupedData = function () {
                this.groupedData &&
                    (this.groupedData.forEach(function (a, c) {
                        a && (this.groupedData[c] = a.destroy ? a.destroy() : null)
                    }, this),
                    (this.groupedData.length = 0))
            }
            f.generatePoints = function () {
                u.apply(this)
                this.destroyGroupedData()
                this.groupedData = this.hasGroupedData ? this.points : null
            }
            d.prototype.applyGrouping = function (a) {
                var c = this
                c.series.forEach(function (b) {
                    b.groupPixelWidth = void 0
                    b.groupPixelWidth = c.getGroupPixelWidth && c.getGroupPixelWidth()
                    b.groupPixelWidth && (b.hasProcessed = !0)
                    b.applyGrouping(!!a.hasExtemesChanged)
                })
            }
            d.prototype.getGroupPixelWidth = function () {
                var a = this.series,
                    c = a.length,
                    b,
                    f = 0,
                    d = !1,
                    l
                for (b = c; b--; )
                    (l = a[b].options.dataGrouping) &&
                        (f = Math.max(f, K(l.groupPixelWidth, k.groupPixelWidth)))
                for (b = c; b--; )
                    if ((l = a[b].options.dataGrouping))
                        if (
                            ((c = (a[b].processedXData || a[b].data).length),
                            a[b].groupPixelWidth || c > this.chart.plotSizeX / f || (c && l.forced))
                        )
                            d = !0
                return d ? f : 0
            }
            d.prototype.setDataGrouping = function (a, c) {
                var b
                c = K(c, !0)
                a || (a = { forced: !1, units: null })
                if (this instanceof d)
                    for (b = this.series.length; b--; )
                        this.series[b].update({ dataGrouping: a }, !1)
                else
                    this.chart.options.series.forEach(function (b) {
                        b.dataGrouping = a
                    }, !1)
                this.ordinal && (this.ordinal.slope = void 0)
                c && this.chart.redraw()
            }
            A(d, 'postProcessData', d.prototype.applyGrouping)
            A(t, 'update', function () {
                if (this.dataGroup) return D(24, !1, this.series.chart), !1
            })
            A(H, 'headerFormatter', function (a) {
                var c = this.chart,
                    b = c.time,
                    e = a.labelConfig,
                    f = e.series,
                    d = f.tooltipOptions,
                    l = f.options.dataGrouping,
                    h = d.xDateFormat,
                    m = f.xAxis,
                    n = d[a.isFooter ? 'footerFormat' : 'headerFormat']
                if (m && 'datetime' === m.options.type && l && I(e.key)) {
                    var q = f.currentDataGrouping
                    l = l.dateTimeLabelFormats || k.dateTimeLabelFormats
                    if (q)
                        if (((d = l[q.unitName]), 1 === q.count)) h = d[0]
                        else {
                            h = d[1]
                            var u = d[2]
                        }
                    else
                        !h &&
                            l &&
                            m.dateTime &&
                            (h = m.dateTime.getXDateFormat(e.x, d.dateTimeLabelFormats))
                    h = b.dateFormat(h, e.key)
                    u && (h += b.dateFormat(u, e.key + q.totalRange - 1))
                    f.chart.styledMode && (n = this.styledModeFormat(n))
                    a.text = p(n, { point: C(e.point, { key: h }), series: f }, c)
                    a.preventDefault()
                }
            })
            A(G, 'destroy', f.destroyGroupedData)
            A(G, 'afterSetOptions', function (a) {
                a = a.options
                var c = this.type,
                    b = this.chart.options.plotOptions,
                    e = y.defaultOptions.plotOptions[c].dataGrouping,
                    f = this.useCommonDataGrouping && k
                if (b && (w[c] || f)) {
                    e || (e = E(k, w[c]))
                    var d = this.chart.rangeSelector
                    a.dataGrouping = E(
                        f,
                        e,
                        b.series && b.series.dataGrouping,
                        b[c].dataGrouping,
                        this.userOptions.dataGrouping,
                        !a.isInternal &&
                            d &&
                            I(d.selected) &&
                            d.buttonOptions[d.selected].dataGrouping
                    )
                }
            })
            A(d, 'afterSetScale', function () {
                this.series.forEach(function (a) {
                    a.hasProcessed = !1
                })
            })
            F.dataGrouping = z
            ;('')
            return z
        }
    )
    N(h, 'Series/HLC/HLCPoint.js', [h['Core/Series/SeriesRegistry.js']], function (d) {
        var h =
            (this && this.__extends) ||
            (function () {
                var d = function (h, t) {
                    d =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (d, h) {
                                d.__proto__ = h
                            }) ||
                        function (d, h) {
                            for (var t in h) h.hasOwnProperty(t) && (d[t] = h[t])
                        }
                    return d(h, t)
                }
                return function (h, t) {
                    function A() {
                        this.constructor = h
                    }
                    d(h, t)
                    h.prototype =
                        null === t ? Object.create(t) : ((A.prototype = t.prototype), new A())
                }
            })()
        return (function (d) {
            function A() {
                var h = (null !== d && d.apply(this, arguments)) || this
                h.close = void 0
                h.high = void 0
                h.low = void 0
                h.options = void 0
                h.plotClose = void 0
                h.series = void 0
                return h
            }
            h(A, d)
            return A
        })(d.seriesTypes.column.prototype.pointClass)
    })
    N(
        h,
        'Series/HLC/HLCSeries.js',
        [h['Series/HLC/HLCPoint.js'], h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var F =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, p) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (f, c) {
                                        f.__proto__ = c
                                    }) ||
                                function (f, c) {
                                    for (var a in c) c.hasOwnProperty(a) && (f[a] = c[a])
                                }
                            return d(h, p)
                        }
                        return function (h, p) {
                            function f() {
                                this.constructor = h
                            }
                            d(h, p)
                            h.prototype =
                                null === p
                                    ? Object.create(p)
                                    : ((f.prototype = p.prototype), new f())
                        }
                    })(),
                t = h.seriesTypes.column,
                E = A.extend,
                H = A.merge
            A = (function (d) {
                function h() {
                    var h = (null !== d && d.apply(this, arguments)) || this
                    h.data = void 0
                    h.options = void 0
                    h.points = void 0
                    h.yData = void 0
                    return h
                }
                F(h, d)
                h.prototype.extendStem = function (d, f, c) {
                    var a = d[0]
                    d = d[1]
                    'number' === typeof a[2] && (a[2] = Math.max(c + f, a[2]))
                    'number' === typeof d[2] && (d[2] = Math.min(c - f, d[2]))
                }
                h.prototype.getPointPath = function (d, f) {
                    f = f.strokeWidth()
                    var c = d.series,
                        a = (f % 2) / 2,
                        h = Math.round(d.plotX) - a,
                        m = Math.round(d.shapeArgs.width / 2)
                    var p = [
                        ['M', h, Math.round(d.yBottom)],
                        ['L', h, Math.round(d.plotHigh)],
                    ]
                    null !== d.close &&
                        ((d = Math.round(d.plotClose) + a),
                        p.push(['M', h, d], ['L', h + m, d]),
                        c.extendStem(p, f / 2, d))
                    return p
                }
                h.prototype.drawSinglePoint = function (d) {
                    var f = d.series,
                        c = f.chart,
                        a = d.graphic,
                        h = !a
                    'undefined' !== typeof d.plotY &&
                        (a || (d.graphic = a = c.renderer.path().add(f.group)),
                        c.styledMode || a.attr(f.pointAttribs(d, d.selected && 'select')),
                        (f = f.getPointPath(d, a)),
                        a[h ? 'attr' : 'animate']({ d: f }).addClass(d.getClassName(), !0))
                }
                h.prototype.drawPoints = function () {
                    this.points.forEach(this.drawSinglePoint)
                }
                h.prototype.init = function () {
                    d.prototype.init.apply(this, arguments)
                    this.options.stacking = void 0
                }
                h.prototype.pointAttribs = function (h, f) {
                    h = d.prototype.pointAttribs.call(this, h, f)
                    delete h.fill
                    return h
                }
                h.prototype.toYData = function (d) {
                    return [d.high, d.low, d.close]
                }
                h.prototype.translate = function () {
                    var h = this,
                        f = h.yAxis,
                        c = (this.pointArrayMap && this.pointArrayMap.slice()) || [],
                        a = c.map(function (a) {
                            return 'plot' + (a.charAt(0).toUpperCase() + a.slice(1))
                        })
                    a.push('yBottom')
                    c.push('low')
                    d.prototype.translate.apply(h)
                    h.points.forEach(function (d) {
                        c.forEach(function (c, n) {
                            c = d[c]
                            null !== c &&
                                (h.dataModify && (c = h.dataModify.modifyValue(c)),
                                (d[a[n]] = f.toPixels(c, !0)))
                        })
                        d.tooltipPos[1] = d.plotHigh + f.pos - h.chart.plotTop
                    })
                }
                h.defaultOptions = H(t.defaultOptions, {
                    lineWidth: 1,
                    tooltip: {
                        pointFormat:
                            '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
                    },
                    threshold: null,
                    states: { hover: { lineWidth: 3 } },
                    stickyTracking: !0,
                })
                return h
            })(t)
            E(A.prototype, {
                animate: null,
                directTouch: !1,
                pointArrayMap: ['high', 'low', 'close'],
                pointAttrToOptions: { stroke: 'color', 'stroke-width': 'lineWidth' },
                pointValKey: 'close',
            })
            A.prototype.pointClass = d
            h.registerSeriesType('hlc', A)
            ;('')
            return A
        }
    )
    N(h, 'Series/OHLC/OHLCPoint.js', [h['Core/Series/SeriesRegistry.js']], function (d) {
        var h =
            (this && this.__extends) ||
            (function () {
                var d = function (h, t) {
                    d =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (d, h) {
                                d.__proto__ = h
                            }) ||
                        function (d, h) {
                            for (var t in h) h.hasOwnProperty(t) && (d[t] = h[t])
                        }
                    return d(h, t)
                }
                return function (h, t) {
                    function A() {
                        this.constructor = h
                    }
                    d(h, t)
                    h.prototype =
                        null === t ? Object.create(t) : ((A.prototype = t.prototype), new A())
                }
            })()
        return (function (d) {
            function A() {
                var h = (null !== d && d.apply(this, arguments)) || this
                h.open = void 0
                h.options = void 0
                h.plotOpen = void 0
                h.series = void 0
                return h
            }
            h(A, d)
            A.prototype.getClassName = function () {
                return (
                    d.prototype.getClassName.call(this) +
                    (this.open < this.close ? ' highcharts-point-up' : ' highcharts-point-down')
                )
            }
            A.prototype.resolveUpColor = function () {
                this.open < this.close &&
                    !this.options.color &&
                    this.series.options.upColor &&
                    (this.color = this.series.options.upColor)
            }
            A.prototype.resolveColor = function () {
                d.prototype.resolveColor.call(this)
                this.resolveUpColor()
            }
            A.prototype.getZone = function () {
                var h = d.prototype.getZone.call(this)
                this.resolveUpColor()
                return h
            }
            A.prototype.applyOptions = function () {
                d.prototype.applyOptions.apply(this, arguments)
                this.resolveColor && this.resolveColor()
                return this
            }
            return A
        })(d.seriesTypes.hlc.prototype.pointClass)
    })
    N(
        h,
        'Series/OHLC/OHLCSeries.js',
        [h['Series/OHLC/OHLCPoint.js'], h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (c, a) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                                }
                            return d(c, a)
                        }
                        return function (c, a) {
                            function f() {
                                this.constructor = c
                            }
                            d(c, a)
                            c.prototype =
                                null === a
                                    ? Object.create(a)
                                    : ((f.prototype = a.prototype), new f())
                        }
                    })(),
                t = h.series,
                G = h.seriesTypes.hlc,
                H = A.addEvent,
                y = A.extend,
                q = A.merge,
                p = (function (d) {
                    function c() {
                        var a = (null !== d && d.apply(this, arguments)) || this
                        a.data = void 0
                        a.options = void 0
                        a.points = void 0
                        return a
                    }
                    E(c, d)
                    c.prototype.getPointPath = function (a, c) {
                        var f = d.prototype.getPointPath.call(this, a, c)
                        c = c.strokeWidth()
                        var h = (c % 2) / 2,
                            n = Math.round(a.plotX) - h,
                            p = Math.round(a.shapeArgs.width / 2)
                        null !== a.open &&
                            ((a = Math.round(a.plotOpen) + h),
                            f.push(['M', n, a], ['L', n - p, a]),
                            d.prototype.extendStem.call(this, f, c / 2, a))
                        return f
                    }
                    c.prototype.pointAttribs = function (a, c) {
                        c = d.prototype.pointAttribs.call(this, a, c)
                        var f = this.options
                        delete c.fill
                        !a.options.color && f.upColor && a.open < a.close && (c.stroke = f.upColor)
                        return c
                    }
                    c.prototype.toYData = function (a) {
                        return [a.open, a.high, a.low, a.close]
                    }
                    c.defaultOptions = q(G.defaultOptions, {
                        tooltip: {
                            pointFormat:
                                '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
                        },
                    })
                    return c
                })(G)
            y(p.prototype, { pointArrayMap: ['open', 'high', 'low', 'close'] })
            p.prototype.pointClass = d
            h.registerSeriesType('ohlc', p)
            H(t, 'init', function (d) {
                d = d.options
                d.useOhlcData &&
                    'highcharts-navigator-series' !== d.id &&
                    y(this, {
                        pointValKey: p.prototype.pointValKey,
                        pointArrayMap: p.prototype.pointArrayMap,
                        toYData: p.prototype.toYData,
                    })
            })
            H(t, 'afterSetOptions', function (d) {
                d = d.options
                var c = d.dataGrouping
                c &&
                    d.useOhlcData &&
                    'highcharts-navigator-series' !== d.id &&
                    (c.approximation = 'ohlc')
            })
            ;('')
            return p
        }
    )
    N(
        h,
        'Series/Candlestick/CandlestickSeries.js',
        [h['Core/DefaultOptions.js'], h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, f) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (c, a) {
                                        c.__proto__ = a
                                    }) ||
                                function (c, a) {
                                    for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d])
                                }
                            return d(h, f)
                        }
                        return function (h, f) {
                            function c() {
                                this.constructor = h
                            }
                            d(h, f)
                            h.prototype =
                                null === f
                                    ? Object.create(f)
                                    : ((c.prototype = f.prototype), new c())
                        }
                    })(),
                t = d.defaultOptions
            d = h.seriesTypes
            var G = d.column,
                H = d.ohlc,
                y = A.merge
            A = (function (d) {
                function h() {
                    var f = (null !== d && d.apply(this, arguments)) || this
                    f.data = void 0
                    f.options = void 0
                    f.points = void 0
                    return f
                }
                E(h, d)
                h.prototype.pointAttribs = function (d, c) {
                    var a = G.prototype.pointAttribs.call(this, d, c),
                        f = this.options,
                        h = d.open < d.close,
                        p = f.lineColor || this.color,
                        q = d.color || this.color
                    a['stroke-width'] = f.lineWidth
                    a.fill = d.options.color || (h ? f.upColor || q : q)
                    a.stroke = d.options.lineColor || (h ? f.upLineColor || p : p)
                    c &&
                        ((d = f.states[c]),
                        (a.fill = d.color || a.fill),
                        (a.stroke = d.lineColor || a.stroke),
                        (a['stroke-width'] = d.lineWidth || a['stroke-width']))
                    return a
                }
                h.prototype.drawPoints = function () {
                    var d = this,
                        c = d.chart,
                        a = d.yAxis.reversed
                    d.points.forEach(function (f) {
                        var h = f.graphic,
                            n = !h
                        if ('undefined' !== typeof f.plotY) {
                            h || (f.graphic = h = c.renderer.path().add(d.group))
                            d.chart.styledMode ||
                                h
                                    .attr(d.pointAttribs(f, f.selected && 'select'))
                                    .shadow(d.options.shadow)
                            var p = (h.strokeWidth() % 2) / 2
                            var q = Math.round(f.plotX) - p
                            var t = f.plotOpen
                            var y = f.plotClose
                            var v = Math.min(t, y)
                            t = Math.max(t, y)
                            var z = Math.round(f.shapeArgs.width / 2)
                            y = a ? t !== f.yBottom : Math.round(v) !== Math.round(f.plotHigh)
                            var u = a ? Math.round(v) !== Math.round(f.plotHigh) : t !== f.yBottom
                            v = Math.round(v) + p
                            t = Math.round(t) + p
                            p = []
                            p.push(
                                ['M', q - z, t],
                                ['L', q - z, v],
                                ['L', q + z, v],
                                ['L', q + z, t],
                                ['Z'],
                                ['M', q, v],
                                ['L', q, y ? Math.round(a ? f.yBottom : f.plotHigh) : v],
                                ['M', q, t],
                                ['L', q, u ? Math.round(a ? f.plotHigh : f.yBottom) : t]
                            )
                            h[n ? 'attr' : 'animate']({ d: p }).addClass(f.getClassName(), !0)
                        }
                    })
                }
                h.defaultOptions = y(H.defaultOptions, t.plotOptions, {
                    states: { hover: { lineWidth: 2 } },
                    tooltip: t.plotOptions.ohlc.tooltip,
                    threshold: null,
                    lineColor: '#000000',
                    lineWidth: 1,
                    upColor: '#ffffff',
                    stickyTracking: !0,
                })
                return h
            })(H)
            h.registerSeriesType('candlestick', A)
            ;('')
            return A
        }
    )
    N(
        h,
        'Series/Flags/FlagsPoint.js',
        [h['Core/Series/SeriesRegistry.js'], h['Core/Utilities.js']],
        function (d, h) {
            var A =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (h, t) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (d, h) {
                                        d.__proto__ = h
                                    }) ||
                                function (d, h) {
                                    for (var p in h) h.hasOwnProperty(p) && (d[p] = h[p])
                                }
                            return d(h, t)
                        }
                        return function (h, t) {
                            function y() {
                                this.constructor = h
                            }
                            d(h, t)
                            h.prototype =
                                null === t
                                    ? Object.create(t)
                                    : ((y.prototype = t.prototype), new y())
                        }
                    })(),
                E = h.isNumber
            return (function (d) {
                function h() {
                    var h = (null !== d && d.apply(this, arguments)) || this
                    h.options = void 0
                    h.series = void 0
                    return h
                }
                A(h, d)
                h.prototype.isValid = function () {
                    return E(this.y) || 'undefined' === typeof this.y
                }
                h.prototype.hasNewShapeType = function () {
                    var d = this.options.shape || this.series.options.shape
                    return this.graphic && d && d !== this.graphic.symbolKey
                }
                return h
            })(d.seriesTypes.column.prototype.pointClass)
        }
    )
    N(
        h,
        'Series/OnSeriesComposition.js',
        [h['Series/Column/ColumnSeries.js'], h['Core/Series/Series.js'], h['Core/Utilities.js']],
        function (d, h, A) {
            var E = d.prototype,
                t = h.prototype,
                G = A.defined,
                H = A.stableSort,
                y
            ;(function (d) {
                function h() {
                    return t.getPlotBox.call(
                        (this.options.onSeries && this.chart.get(this.options.onSeries)) || this
                    )
                }
                function f() {
                    E.translate.apply(this)
                    var a = this,
                        c = a.options,
                        d = a.chart,
                        f = a.points,
                        h = c.onSeries,
                        p = (h = h && d.get(h)) && h.options.step,
                        q = h && h.points,
                        t = d.inverted,
                        v = a.xAxis,
                        z = a.yAxis
                    d = f.length - 1
                    var u
                    c = c.onKey || 'y'
                    var k = q && q.length,
                        w = 0,
                        l
                    if (h && h.visible && k) {
                        w = (h.pointXOffset || 0) + (h.barW || 0) / 2
                        var e = h.currentDataGrouping
                        var g = q[k - 1].x + (e ? e.totalRange : 0)
                        H(f, function (a, b) {
                            return a.x - b.x
                        })
                        for (c = 'plot' + c[0].toUpperCase() + c.substr(1); k-- && f[d]; ) {
                            var b = q[k]
                            e = f[d]
                            e.y = b.y
                            if (b.x <= e.x && 'undefined' !== typeof b[c]) {
                                if (
                                    e.x <= g &&
                                    ((e.plotY = b[c]),
                                    b.x < e.x &&
                                        !p &&
                                        (l = q[k + 1]) &&
                                        'undefined' !== typeof l[c])
                                ) {
                                    var B = (e.x - b.x) / (l.x - b.x)
                                    e.plotY += B * (l[c] - b[c])
                                    e.y += B * (l.y - b.y)
                                }
                                d--
                                k++
                                if (0 > d) break
                            }
                        }
                    }
                    f.forEach(function (b, c) {
                        b.plotX += w
                        if ('undefined' === typeof b.plotY || t)
                            0 <= b.plotX && b.plotX <= v.len
                                ? t
                                    ? ((b.plotY = v.translate(b.x, 0, 1, 0, 1)),
                                      (b.plotX = G(b.y) ? z.translate(b.y, 0, 0, 0, 1) : 0))
                                    : (b.plotY = (v.opposite ? 0 : a.yAxis.len) + v.offset)
                                : (b.shapeArgs = {})
                        if ((u = f[c - 1]) && u.plotX === b.plotX) {
                            'undefined' === typeof u.stackIndex && (u.stackIndex = 0)
                            var e = u.stackIndex + 1
                        }
                        b.stackIndex = e
                    })
                    this.onSeries = h
                }
                var c = []
                d.compose = function (a) {
                    if (-1 === c.indexOf(a)) {
                        c.push(a)
                        var d = a.prototype
                        d.getPlotBox = h
                        d.translate = f
                    }
                    return a
                }
                d.getPlotBox = h
                d.translate = f
            })(y || (y = {}))
            return y
        }
    )
    N(
        h,
        'Series/Flags/FlagsSymbols.js',
        [h['Core/Renderer/RendererRegistry.js'], h['Core/Renderer/SVG/SVGRenderer.js']],
        function (d, h) {
            function A(d) {
                E[d + 'pin'] = function (h, t, y, q, p) {
                    var f = p && p.anchorX
                    p = p && p.anchorY
                    'circle' === d && q > y && ((h -= Math.round((q - y) / 2)), (y = q))
                    var c = E[d](h, t, y, q)
                    if (f && p) {
                        var a = f
                        'circle' === d
                            ? (a = h + y / 2)
                            : ((h = c[0]),
                              (y = c[1]),
                              'M' === h[0] && 'L' === y[0] && (a = (h[1] + y[1]) / 2))
                        c.push(['M', a, t > p ? t : t + q], ['L', f, p])
                        c = c.concat(E.circle(f - 1, p - 1, 2, 2))
                    }
                    return c
                }
            }
            var E = h.prototype.symbols
            E.flag = function (d, h, A, y, q) {
                var p = (q && q.anchorX) || d
                q = (q && q.anchorY) || h
                var f = E.circle(p - 1, q - 1, 2, 2)
                f.push(
                    ['M', p, q],
                    ['L', d, h + y],
                    ['L', d, h],
                    ['L', d + A, h],
                    ['L', d + A, h + y],
                    ['L', d, h + y],
                    ['Z']
                )
                return f
            }
            A('circle')
            A('square')
            d = d.getRendererType()
            d !== h &&
                ((d.prototype.symbols.circlepin = E.circlepin),
                (d.prototype.symbols.flag = E.flag),
                (d.prototype.symbols.squarepin = E.squarepin))
            return E
        }
    )
    N(
        h,
        'Series/Flags/FlagsSeries.js',
        [
            h['Series/Flags/FlagsPoint.js'],
            h['Core/Globals.js'],
            h['Series/OnSeriesComposition.js'],
            h['Core/Renderer/RendererUtilities.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Renderer/SVG/SVGElement.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H) {
            var y =
                (this && this.__extends) ||
                (function () {
                    var a = function (c, d) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, c) {
                                    a.__proto__ = c
                                }) ||
                            function (a, c) {
                                for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                            }
                        return a(c, d)
                    }
                    return function (c, d) {
                        function f() {
                            this.constructor = c
                        }
                        a(c, d)
                        c.prototype =
                            null === d ? Object.create(d) : ((f.prototype = d.prototype), new f())
                    }
                })()
            h = h.noop
            var q = F.distribute,
                p = t.series,
                f = t.seriesTypes.column,
                c = H.addEvent,
                a = H.defined
            F = H.extend
            var n = H.merge,
                m = H.objectEach,
                D = H.wrap
            H = (function (d) {
                function h() {
                    var a = (null !== d && d.apply(this, arguments)) || this
                    a.data = void 0
                    a.options = void 0
                    a.points = void 0
                    return a
                }
                y(h, d)
                h.prototype.animate = function (a) {
                    a && this.setClip()
                }
                h.prototype.drawPoints = function () {
                    var c = this.points,
                        d = this.chart,
                        f = d.renderer,
                        h = d.inverted,
                        p = this.options,
                        k = p.y,
                        w,
                        l = this.yAxis,
                        e = {},
                        g = []
                    for (w = c.length; w--; ) {
                        var b = c[w]
                        var B = (h ? b.plotY : b.plotX) > this.xAxis.len
                        var t = b.plotX
                        var r = b.stackIndex
                        var x = b.options.shape || p.shape
                        var M = b.plotY
                        'undefined' !== typeof M &&
                            (M = b.plotY + k - ('undefined' !== typeof r && r * p.stackDistance))
                        b.anchorX = r ? void 0 : b.plotX
                        var y = r ? void 0 : b.plotY
                        var A = 'flag' !== x
                        r = b.graphic
                        'undefined' !== typeof M && 0 <= t && !B
                            ? (r && b.hasNewShapeType() && (r = r.destroy()),
                              r ||
                                  ((r = b.graphic =
                                      f
                                          .label('', null, null, x, null, null, p.useHTML)
                                          .addClass('highcharts-point')
                                          .add(this.markerGroup)),
                                  b.graphic.div && (b.graphic.div.point = b),
                                  (r.isNew = !0)),
                              r.attr({
                                  align: A ? 'center' : 'left',
                                  width: p.width,
                                  height: p.height,
                                  'text-align': p.textAlign,
                              }),
                              d.styledMode ||
                                  r
                                      .attr(this.pointAttribs(b))
                                      .css(n(p.style, b.style))
                                      .shadow(p.shadow),
                              0 < t && (t -= r.strokeWidth() % 2),
                              (x = { y: M, anchorY: y }),
                              p.allowOverlapX && ((x.x = t), (x.anchorX = b.anchorX)),
                              r
                                  .attr({ text: b.options.title || p.title || 'A' })
                                  [r.isNew ? 'attr' : 'animate'](x),
                              p.allowOverlapX ||
                                  (e[b.plotX]
                                      ? (e[b.plotX].size = Math.max(e[b.plotX].size, r.width))
                                      : (e[b.plotX] = {
                                            align: A ? 0.5 : 0,
                                            size: r.width,
                                            target: t,
                                            anchorX: t,
                                        })),
                              (b.tooltipPos = [t, M + l.pos - d.plotTop]))
                            : r && (b.graphic = r.destroy())
                    }
                    if (!p.allowOverlapX) {
                        var C = 100
                        m(e, function (a) {
                            a.plotX = a.anchorX
                            g.push(a)
                            C = Math.max(a.size, C)
                        })
                        q(g, h ? l.len : this.xAxis.len, C)
                        c.forEach(function (b) {
                            var c = b.graphic && e[b.plotX]
                            c &&
                                (b.graphic[b.graphic.isNew ? 'attr' : 'animate']({
                                    x: c.pos + c.align * c.size,
                                    anchorX: b.anchorX,
                                }),
                                a(c.pos)
                                    ? (b.graphic.isNew = !1)
                                    : (b.graphic.attr({ x: -9999, anchorX: -9999 }),
                                      (b.graphic.isNew = !0)))
                        })
                    }
                    p.useHTML &&
                        D(this.markerGroup, 'on', function (a) {
                            return G.prototype.on.apply(
                                a.apply(this, [].slice.call(arguments, 1)),
                                [].slice.call(arguments, 1)
                            )
                        })
                }
                h.prototype.drawTracker = function () {
                    var a = this.points
                    d.prototype.drawTracker.call(this)
                    a.forEach(function (d) {
                        var f = d.graphic
                        f &&
                            (d.unbindMouseOver && d.unbindMouseOver(),
                            (d.unbindMouseOver = c(f.element, 'mouseover', function () {
                                0 < d.stackIndex &&
                                    !d.raised &&
                                    ((d._y = f.y), f.attr({ y: d._y - 8 }), (d.raised = !0))
                                a.forEach(function (a) {
                                    a !== d &&
                                        a.raised &&
                                        a.graphic &&
                                        (a.graphic.attr({ y: a._y }), (a.raised = !1))
                                })
                            })))
                    })
                }
                h.prototype.pointAttribs = function (a, c) {
                    var d = this.options,
                        f = (a && a.color) || this.color,
                        h = d.lineColor,
                        k = a && a.lineWidth
                    a = (a && a.fillColor) || d.fillColor
                    c &&
                        ((a = d.states[c].fillColor),
                        (h = d.states[c].lineColor),
                        (k = d.states[c].lineWidth))
                    return { fill: a || f, stroke: h || f, 'stroke-width': k || d.lineWidth || 0 }
                }
                h.prototype.setClip = function () {
                    p.prototype.setClip.apply(this, arguments)
                    !1 !== this.options.clip &&
                        this.sharedClipKey &&
                        this.markerGroup &&
                        this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey])
                }
                h.defaultOptions = n(f.defaultOptions, {
                    pointRange: 0,
                    allowOverlapX: !1,
                    shape: 'flag',
                    stackDistance: 12,
                    textAlign: 'center',
                    tooltip: { pointFormat: '{point.text}' },
                    threshold: null,
                    y: -30,
                    fillColor: '#ffffff',
                    lineWidth: 1,
                    states: { hover: { lineColor: '#000000', fillColor: '#ccd6eb' } },
                    style: { fontSize: '11px', fontWeight: 'bold' },
                })
                return h
            })(f)
            A.compose(H)
            F(H.prototype, {
                allowDG: !1,
                forceCrop: !0,
                invertible: !1,
                noSharedTooltip: !0,
                pointClass: d,
                sorted: !1,
                takeOrdinalPosition: !1,
                trackerGroups: ['markerGroup'],
                buildKDTree: h,
                init: p.prototype.init,
                invertGroups: h,
            })
            t.registerSeriesType('flags', H)
            ;('')
            ;('')
            return H
        }
    )
    N(h, 'Core/Axis/ScrollbarAxis.js', [h['Core/Utilities.js']], function (d) {
        var h = d.addEvent,
            A = d.defined,
            F = d.pick
        return (function () {
            function d() {}
            d.compose = function (t, E) {
                if (-1 === d.composed.indexOf(t)) d.composed.push(t)
                else return t
                var y = function (d) {
                    var h = F(d.options && d.options.min, d.min),
                        f = F(d.options && d.options.max, d.max)
                    return {
                        axisMin: h,
                        axisMax: f,
                        scrollMin: A(d.dataMin)
                            ? Math.min(h, d.min, d.dataMin, F(d.threshold, Infinity))
                            : h,
                        scrollMax: A(d.dataMax)
                            ? Math.max(f, d.max, d.dataMax, F(d.threshold, -Infinity))
                            : f,
                    }
                }
                h(t, 'afterInit', function () {
                    var d = this
                    d.options &&
                        d.options.scrollbar &&
                        d.options.scrollbar.enabled &&
                        ((d.options.scrollbar.vertical = !d.horiz),
                        (d.options.startOnTick = d.options.endOnTick = !1),
                        (d.scrollbar = new E(d.chart.renderer, d.options.scrollbar, d.chart)),
                        h(d.scrollbar, 'changed', function (h) {
                            var f = y(d),
                                c = f.axisMax,
                                a = f.scrollMin,
                                p = f.scrollMax - a
                            A(f.axisMin) &&
                                A(c) &&
                                ((d.horiz && !d.reversed) || (!d.horiz && d.reversed)
                                    ? ((f = a + p * this.to), (a += p * this.from))
                                    : ((f = a + p * (1 - this.from)), (a += p * (1 - this.to))),
                                this.shouldUpdateExtremes(h.DOMType)
                                    ? d.setExtremes(
                                          a,
                                          f,
                                          !0,
                                          'mousemove' !== h.DOMType && 'touchmove' !== h.DOMType,
                                          h
                                      )
                                    : this.setRange(this.from, this.to))
                        }))
                })
                h(t, 'afterRender', function () {
                    var d = y(this),
                        h = d.scrollMin,
                        f = d.scrollMax
                    d = this.scrollbar
                    var c = this.axisTitleMargin + (this.titleOffset || 0),
                        a = this.chart.scrollbarsOffsets,
                        n = this.options.margin || 0
                    d &&
                        (this.horiz
                            ? (this.opposite || (a[1] += c),
                              d.position(
                                  this.left,
                                  this.top + this.height + 2 + a[1] - (this.opposite ? n : 0),
                                  this.width,
                                  this.height
                              ),
                              this.opposite || (a[1] += n),
                              (c = 1))
                            : (this.opposite && (a[0] += c),
                              d.position(
                                  d.options.opposite
                                      ? this.left + this.width + 2 + a[0] - (this.opposite ? 0 : n)
                                      : this.opposite
                                      ? 0
                                      : n,
                                  this.top,
                                  this.width,
                                  this.height
                              ),
                              this.opposite && (a[0] += n),
                              (c = 0)),
                        (a[c] += d.size + d.options.margin),
                        isNaN(h) ||
                        isNaN(f) ||
                        !A(this.min) ||
                        !A(this.max) ||
                        this.min === this.max
                            ? d.setRange(0, 1)
                            : ((a = (this.min - h) / (f - h)),
                              (h = (this.max - h) / (f - h)),
                              (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
                                  ? d.setRange(a, h)
                                  : d.setRange(1 - h, 1 - a)))
                })
                h(t, 'afterGetOffset', function () {
                    var d = this.scrollbar && !this.scrollbar.options.opposite
                    d = this.horiz ? 2 : d ? 3 : 1
                    var h = this.scrollbar
                    h &&
                        ((this.chart.scrollbarsOffsets = [0, 0]),
                        (this.chart.axisOffset[d] += h.size + h.options.margin))
                })
                return t
            }
            d.composed = []
            return d
        })()
    })
    N(h, 'Core/ScrollbarDefaults.js', [h['Core/Globals.js']], function (d) {
        return {
            height: d.isTouchDevice ? 20 : 14,
            barBorderRadius: 0,
            buttonBorderRadius: 0,
            liveRedraw: void 0,
            margin: 10,
            minWidth: 6,
            opposite: !0,
            step: 0.2,
            zIndex: 3,
            barBackgroundColor: '#cccccc',
            barBorderWidth: 1,
            barBorderColor: '#cccccc',
            buttonArrowColor: '#333333',
            buttonBackgroundColor: '#e6e6e6',
            buttonBorderColor: '#cccccc',
            buttonBorderWidth: 1,
            rifleColor: '#333333',
            trackBackgroundColor: '#f2f2f2',
            trackBorderColor: '#f2f2f2',
            trackBorderWidth: 1,
        }
    })
    N(
        h,
        'Core/Scrollbar.js',
        [
            h['Core/DefaultOptions.js'],
            h['Core/Globals.js'],
            h['Core/Axis/ScrollbarAxis.js'],
            h['Core/ScrollbarDefaults.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t) {
            var E = d.defaultOptions,
                H = t.addEvent,
                y = t.correctFloat,
                q = t.defined,
                p = t.destroyObjectProperties,
                f = t.fireEvent,
                c = t.merge,
                a = t.pick,
                n = t.removeEvent
            d = (function () {
                function d(a, c, d) {
                    this._events = []
                    this.chart = void 0
                    this.from = this.chartY = this.chartX = 0
                    this.scrollbar = this.renderer = this.options = this.group = void 0
                    this.scrollbarButtons = []
                    this.scrollbarGroup = void 0
                    this.scrollbarLeft = 0
                    this.scrollbarRifles = void 0
                    this.scrollbarStrokeWidth = 1
                    this.to = this.size = this.scrollbarTop = 0
                    this.track = void 0
                    this.trackBorderWidth = 1
                    this.userOptions = void 0
                    this.y = this.x = 0
                    this.init(a, c, d)
                }
                d.compose = function (a) {
                    A.compose(a, d)
                }
                d.swapXY = function (a, c) {
                    c &&
                        a.forEach(function (a) {
                            for (var c = a.length, d, f = 0; f < c; f += 2)
                                (d = a[f + 1]),
                                    'number' === typeof d && ((a[f + 1] = a[f + 2]), (a[f + 2] = d))
                        })
                    return a
                }
                d.prototype.addEvents = function () {
                    var a = this.options.inverted ? [1, 0] : [0, 1],
                        c = this.scrollbarButtons,
                        d = this.scrollbarGroup.element,
                        f = this.track.element,
                        m = this.mouseDownHandler.bind(this),
                        n = this.mouseMoveHandler.bind(this),
                        p = this.mouseUpHandler.bind(this)
                    a = [
                        [c[a[0]].element, 'click', this.buttonToMinClick.bind(this)],
                        [c[a[1]].element, 'click', this.buttonToMaxClick.bind(this)],
                        [f, 'click', this.trackClick.bind(this)],
                        [d, 'mousedown', m],
                        [d.ownerDocument, 'mousemove', n],
                        [d.ownerDocument, 'mouseup', p],
                    ]
                    h.hasTouch &&
                        a.push(
                            [d, 'touchstart', m],
                            [d.ownerDocument, 'touchmove', n],
                            [d.ownerDocument, 'touchend', p]
                        )
                    a.forEach(function (a) {
                        H.apply(null, a)
                    })
                    this._events = a
                }
                d.prototype.buttonToMaxClick = function (c) {
                    var d = (this.to - this.from) * a(this.options.step, 0.2)
                    this.updatePosition(this.from + d, this.to + d)
                    f(this, 'changed', {
                        from: this.from,
                        to: this.to,
                        trigger: 'scrollbar',
                        DOMEvent: c,
                    })
                }
                d.prototype.buttonToMinClick = function (c) {
                    var d = y(this.to - this.from) * a(this.options.step, 0.2)
                    this.updatePosition(y(this.from - d), y(this.to - d))
                    f(this, 'changed', {
                        from: this.from,
                        to: this.to,
                        trigger: 'scrollbar',
                        DOMEvent: c,
                    })
                }
                d.prototype.cursorToScrollbarPosition = function (a) {
                    var c = this.options
                    c = c.minWidth > this.calculatedWidth ? c.minWidth : 0
                    return {
                        chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - c),
                        chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c),
                    }
                }
                d.prototype.destroy = function () {
                    var a = this,
                        c = a.chart.scroller
                    a.removeEvents()
                    ;['track', 'scrollbarRifles', 'scrollbar', 'scrollbarGroup', 'group'].forEach(
                        function (c) {
                            a[c] && a[c].destroy && (a[c] = a[c].destroy())
                        }
                    )
                    c && a === c.scrollbar && ((c.scrollbar = null), p(c.scrollbarButtons))
                }
                d.prototype.drawScrollbarButton = function (a) {
                    var c = this.renderer,
                        f = this.scrollbarButtons,
                        h = this.options,
                        m = this.size,
                        n = c.g().add(this.group)
                    f.push(n)
                    n = c.rect().addClass('highcharts-scrollbar-button').add(n)
                    this.chart.styledMode ||
                        n.attr({
                            stroke: h.buttonBorderColor,
                            'stroke-width': h.buttonBorderWidth,
                            fill: h.buttonBackgroundColor,
                        })
                    n.attr(
                        n.crisp(
                            {
                                x: -0.5,
                                y: -0.5,
                                width: m + 1,
                                height: m + 1,
                                r: h.buttonBorderRadius,
                            },
                            n.strokeWidth()
                        )
                    )
                    n = c
                        .path(
                            d.swapXY(
                                [
                                    ['M', m / 2 + (a ? -1 : 1), m / 2 - 3],
                                    ['L', m / 2 + (a ? -1 : 1), m / 2 + 3],
                                    ['L', m / 2 + (a ? 2 : -2), m / 2],
                                ],
                                h.vertical
                            )
                        )
                        .addClass('highcharts-scrollbar-arrow')
                        .add(f[a])
                    this.chart.styledMode || n.attr({ fill: h.buttonArrowColor })
                }
                d.prototype.init = function (d, f, h) {
                    this.scrollbarButtons = []
                    this.renderer = d
                    this.userOptions = f
                    this.options = c(F, E.scrollbar, f)
                    this.chart = h
                    this.size = a(this.options.size, this.options.height)
                    f.enabled && (this.render(), this.addEvents())
                }
                d.prototype.mouseDownHandler = function (a) {
                    a = this.chart.pointer.normalize(a)
                    a = this.cursorToScrollbarPosition(a)
                    this.chartX = a.chartX
                    this.chartY = a.chartY
                    this.initPositions = [this.from, this.to]
                    this.grabbedCenter = !0
                }
                d.prototype.mouseMoveHandler = function (a) {
                    var c = this.chart.pointer.normalize(a),
                        d = this.options.vertical ? 'chartY' : 'chartX',
                        h = this.initPositions || []
                    !this.grabbedCenter ||
                        (a.touches && 0 === a.touches[0][d]) ||
                        ((c = this.cursorToScrollbarPosition(c)[d]),
                        (d = this[d]),
                        (d = c - d),
                        (this.hasDragged = !0),
                        this.updatePosition(h[0] + d, h[1] + d),
                        this.hasDragged &&
                            f(this, 'changed', {
                                from: this.from,
                                to: this.to,
                                trigger: 'scrollbar',
                                DOMType: a.type,
                                DOMEvent: a,
                            }))
                }
                d.prototype.mouseUpHandler = function (a) {
                    this.hasDragged &&
                        f(this, 'changed', {
                            from: this.from,
                            to: this.to,
                            trigger: 'scrollbar',
                            DOMType: a.type,
                            DOMEvent: a,
                        })
                    this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
                }
                d.prototype.position = function (a, c, d, f) {
                    var h = this.options.vertical,
                        m = this.rendered ? 'animate' : 'attr',
                        n = 0
                    this.x = a
                    this.y = c + this.trackBorderWidth
                    this.width = d
                    this.xOffset = this.height = f
                    this.yOffset = n
                    h
                        ? ((this.width = this.yOffset = d = n = this.size),
                          (this.xOffset = c = 0),
                          (this.barWidth = f - 2 * d),
                          (this.x = a += this.options.margin))
                        : ((this.height = this.xOffset = f = c = this.size),
                          (this.barWidth = d - 2 * f),
                          (this.y += this.options.margin))
                    this.group[m]({ translateX: a, translateY: this.y })
                    this.track[m]({ width: d, height: f })
                    this.scrollbarButtons[1][m]({
                        translateX: h ? 0 : d - c,
                        translateY: h ? f - n : 0,
                    })
                }
                d.prototype.removeEvents = function () {
                    this._events.forEach(function (a) {
                        n.apply(null, a)
                    })
                    this._events.length = 0
                }
                d.prototype.render = function () {
                    var a = this.renderer,
                        c = this.options,
                        f = this.size,
                        h = this.chart.styledMode,
                        m = a.g('scrollbar').attr({ zIndex: c.zIndex, translateY: -99999 }).add()
                    this.group = m
                    this.track = a
                        .rect()
                        .addClass('highcharts-scrollbar-track')
                        .attr({ x: 0, r: c.trackBorderRadius || 0, height: f, width: f })
                        .add(m)
                    h ||
                        this.track.attr({
                            fill: c.trackBackgroundColor,
                            stroke: c.trackBorderColor,
                            'stroke-width': c.trackBorderWidth,
                        })
                    this.trackBorderWidth = this.track.strokeWidth()
                    this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 })
                    this.scrollbarGroup = a.g().add(m)
                    this.scrollbar = a
                        .rect()
                        .addClass('highcharts-scrollbar-thumb')
                        .attr({ height: f, width: f, r: c.barBorderRadius || 0 })
                        .add(this.scrollbarGroup)
                    this.scrollbarRifles = a
                        .path(
                            d.swapXY(
                                [
                                    ['M', -3, f / 4],
                                    ['L', -3, (2 * f) / 3],
                                    ['M', 0, f / 4],
                                    ['L', 0, (2 * f) / 3],
                                    ['M', 3, f / 4],
                                    ['L', 3, (2 * f) / 3],
                                ],
                                c.vertical
                            )
                        )
                        .addClass('highcharts-scrollbar-rifles')
                        .add(this.scrollbarGroup)
                    h ||
                        (this.scrollbar.attr({
                            fill: c.barBackgroundColor,
                            stroke: c.barBorderColor,
                            'stroke-width': c.barBorderWidth,
                        }),
                        this.scrollbarRifles.attr({ stroke: c.rifleColor, 'stroke-width': 1 }))
                    this.scrollbarStrokeWidth = this.scrollbar.strokeWidth()
                    this.scrollbarGroup.translate(
                        (-this.scrollbarStrokeWidth % 2) / 2,
                        (-this.scrollbarStrokeWidth % 2) / 2
                    )
                    this.drawScrollbarButton(0)
                    this.drawScrollbarButton(1)
                }
                d.prototype.setRange = function (a, c) {
                    var d = this.options,
                        f = d.vertical,
                        h = d.minWidth,
                        m = this.barWidth,
                        n =
                            !this.rendered ||
                            this.hasDragged ||
                            (this.chart.navigator && this.chart.navigator.hasDragged)
                                ? 'attr'
                                : 'animate'
                    if (q(m)) {
                        var p = m * Math.min(c, 1)
                        a = Math.max(a, 0)
                        var k = Math.ceil(m * a)
                        this.calculatedWidth = p = y(p - k)
                        p < h && ((k = (m - h + p) * a), (p = h))
                        h = Math.floor(k + this.xOffset + this.yOffset)
                        m = p / 2 - 0.5
                        this.from = a
                        this.to = c
                        f
                            ? (this.scrollbarGroup[n]({ translateY: h }),
                              this.scrollbar[n]({ height: p }),
                              this.scrollbarRifles[n]({ translateY: m }),
                              (this.scrollbarTop = h),
                              (this.scrollbarLeft = 0))
                            : (this.scrollbarGroup[n]({ translateX: h }),
                              this.scrollbar[n]({ width: p }),
                              this.scrollbarRifles[n]({ translateX: m }),
                              (this.scrollbarLeft = h),
                              (this.scrollbarTop = 0))
                        12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0)
                        !1 === d.showFull &&
                            (0 >= a && 1 <= c ? this.group.hide() : this.group.show())
                        this.rendered = !0
                    }
                }
                d.prototype.shouldUpdateExtremes = function (c) {
                    return (
                        a(
                            this.options.liveRedraw,
                            h.svg && !h.isTouchDevice && !this.chart.isBoosting
                        ) ||
                        'mouseup' === c ||
                        'touchend' === c ||
                        !q(c)
                    )
                }
                d.prototype.trackClick = function (a) {
                    var c = this.chart.pointer.normalize(a),
                        d = this.to - this.from,
                        h = this.y + this.scrollbarTop,
                        m = this.x + this.scrollbarLeft
                    ;(this.options.vertical && c.chartY > h) ||
                    (!this.options.vertical && c.chartX > m)
                        ? this.updatePosition(this.from + d, this.to + d)
                        : this.updatePosition(this.from - d, this.to - d)
                    f(this, 'changed', {
                        from: this.from,
                        to: this.to,
                        trigger: 'scrollbar',
                        DOMEvent: a,
                    })
                }
                d.prototype.update = function (a) {
                    this.destroy()
                    this.init(this.chart.renderer, c(!0, this.options, a), this.chart)
                }
                d.prototype.updatePosition = function (a, c) {
                    1 < c && ((a = y(1 - y(c - a))), (c = 1))
                    0 > a && ((c = y(c - a)), (a = 0))
                    this.from = a
                    this.to = c
                }
                d.defaultOptions = F
                return d
            })()
            E.scrollbar = c(!0, d.defaultOptions, E.scrollbar)
            return d
        }
    )
    N(
        h,
        'Core/Axis/NavigatorAxis.js',
        [h['Core/Globals.js'], h['Core/Utilities.js']],
        function (d, h) {
            var A = d.isTouchDevice,
                E = h.addEvent,
                t = h.correctFloat,
                G = h.defined,
                H = h.isNumber,
                y = h.pick,
                q = (function () {
                    function d(d) {
                        this.axis = d
                    }
                    d.prototype.destroy = function () {
                        this.axis = void 0
                    }
                    d.prototype.toFixedRange = function (d, c, a, h) {
                        var f = this.axis,
                            n = f.chart
                        n = n && n.fixedRange
                        var p = (f.pointRange || 0) / 2
                        d = y(a, f.translate(d, !0, !f.horiz))
                        c = y(h, f.translate(c, !0, !f.horiz))
                        f = n && (c - d) / n
                        G(a) || (d = t(d + p))
                        G(h) || (c = t(c - p))
                        0.7 < f && 1.3 > f && (h ? (d = c - n) : (c = d + n))
                        ;(H(d) && H(c)) || (d = c = void 0)
                        return { min: d, max: c }
                    }
                    return d
                })()
            return (function () {
                function d() {}
                d.compose = function (d) {
                    d.keepProps.push('navigatorAxis')
                    E(d, 'init', function () {
                        this.navigatorAxis || (this.navigatorAxis = new q(this))
                    })
                    E(d, 'zoom', function (c) {
                        var a = this.chart.options,
                            d = a.navigator,
                            f = this.navigatorAxis,
                            h = a.chart.pinchType,
                            p = a.rangeSelector
                        a = a.chart.zoomType
                        this.isXAxis &&
                            ((d && d.enabled) || (p && p.enabled)) &&
                            ('y' === a
                                ? (c.zoomed = !1)
                                : ((!A && 'xy' === a) || (A && 'xy' === h)) &&
                                  this.options.range &&
                                  ((d = f.previousZoom),
                                  G(c.newMin)
                                      ? (f.previousZoom = [this.min, this.max])
                                      : d &&
                                        ((c.newMin = d[0]),
                                        (c.newMax = d[1]),
                                        (f.previousZoom = void 0))))
                        'undefined' !== typeof c.zoomed && c.preventDefault()
                    })
                }
                d.AdditionsClass = q
                return d
            })()
        }
    )
    N(
        h,
        'Core/Navigator.js',
        [
            h['Core/Axis/Axis.js'],
            h['Core/Chart/Chart.js'],
            h['Core/Color/Color.js'],
            h['Core/Globals.js'],
            h['Core/Axis/NavigatorAxis.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Renderer/RendererRegistry.js'],
            h['Core/Scrollbar.js'],
            h['Core/Series/Series.js'],
            h['Core/Series/SeriesRegistry.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y, q, p, f) {
            A = A.parse
            var c = F.hasTouch,
                a = F.isTouchDevice,
                n = G.defaultOptions,
                m = f.addEvent,
                E = f.clamp,
                C = f.correctFloat,
                I = f.defined,
                L = f.destroyObjectProperties,
                K = f.erase,
                v = f.extend,
                z = f.find,
                u = f.isArray,
                k = f.isNumber,
                w = f.merge,
                l = f.pick,
                e = f.removeEvent,
                g = f.splat,
                b = function (a) {
                    for (var b = [], c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
                    b = [].filter.call(b, k)
                    if (b.length) return Math[a].apply(0, b)
                }
            G = 'undefined' === typeof p.seriesTypes.areaspline ? 'line' : 'areaspline'
            v(n, {
                navigator: {
                    height: 40,
                    margin: 25,
                    maskInside: !0,
                    handles: {
                        width: 7,
                        height: 15,
                        symbols: ['navigator-handle', 'navigator-handle'],
                        enabled: !0,
                        lineWidth: 1,
                        backgroundColor: '#f2f2f2',
                        borderColor: '#999999',
                    },
                    maskFill: A('#6685c2').setOpacity(0.3).get(),
                    outlineColor: '#cccccc',
                    outlineWidth: 1,
                    series: {
                        type: G,
                        fillOpacity: 0.05,
                        lineWidth: 1,
                        compare: null,
                        dataGrouping: {
                            approximation: 'average',
                            enabled: !0,
                            groupPixelWidth: 2,
                            firstAnchor: 'firstPoint',
                            anchor: 'middle',
                            lastAnchor: 'lastPoint',
                            units: [
                                ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                                ['second', [1, 2, 5, 10, 15, 30]],
                                ['minute', [1, 2, 5, 10, 15, 30]],
                                ['hour', [1, 2, 3, 4, 6, 8, 12]],
                                ['day', [1, 2, 3, 4]],
                                ['week', [1, 2, 3]],
                                ['month', [1, 3, 6]],
                                ['year', null],
                            ],
                        },
                        dataLabels: { enabled: !1, zIndex: 2 },
                        id: 'highcharts-navigator-series',
                        className: 'highcharts-navigator-series',
                        lineColor: null,
                        marker: { enabled: !1 },
                        threshold: null,
                    },
                    xAxis: {
                        overscroll: 0,
                        className: 'highcharts-navigator-xaxis',
                        tickLength: 0,
                        lineWidth: 0,
                        gridLineColor: '#e6e6e6',
                        gridLineWidth: 1,
                        tickPixelInterval: 200,
                        labels: { align: 'left', style: { color: '#999999' }, x: 3, y: -4 },
                        crosshair: !1,
                    },
                    yAxis: {
                        className: 'highcharts-navigator-yaxis',
                        gridLineWidth: 0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0.1,
                        maxPadding: 0.1,
                        labels: { enabled: !1 },
                        crosshair: !1,
                        title: { text: null },
                        tickLength: 0,
                        tickWidth: 0,
                    },
                },
            })
            H.getRendererType().prototype.symbols['navigator-handle'] = function (a, b, c, e, d) {
                a = ((d && d.width) || 0) / 2
                b = Math.round(a / 3) + 0.5
                d = (d && d.height) || 0
                return [
                    ['M', -a - 1, 0.5],
                    ['L', a, 0.5],
                    ['L', a, d + 0.5],
                    ['L', -a - 1, d + 0.5],
                    ['L', -a - 1, 0.5],
                    ['M', -b, 4],
                    ['L', -b, d - 3],
                    ['M', b - 1, 4],
                    ['L', b - 1, d - 3],
                ]
            }
            var B = (function () {
                function f(a) {
                    this.zoomedMin =
                        this.zoomedMax =
                        this.yAxis =
                        this.xAxis =
                        this.top =
                        this.size =
                        this.shades =
                        this.rendered =
                        this.range =
                        this.outlineHeight =
                        this.outline =
                        this.opposite =
                        this.navigatorSize =
                        this.navigatorSeries =
                        this.navigatorOptions =
                        this.navigatorGroup =
                        this.navigatorEnabled =
                        this.left =
                        this.height =
                        this.handles =
                        this.chart =
                        this.baseSeries =
                            void 0
                    this.init(a)
                }
                f.prototype.drawHandle = function (a, b, c, d) {
                    var e = this.navigatorOptions.handles.height
                    this.handles[b][d](
                        c
                            ? {
                                  translateX: Math.round(this.left + this.height / 2),
                                  translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - e),
                              }
                            : {
                                  translateX: Math.round(this.left + parseInt(a, 10)),
                                  translateY: Math.round(this.top + this.height / 2 - e / 2 - 1),
                              }
                    )
                }
                f.prototype.drawOutline = function (a, b, c, d) {
                    var e = this.navigatorOptions.maskInside,
                        f = this.outline.strokeWidth(),
                        g = f / 2,
                        h = (f % 2) / 2
                    f = this.outlineHeight
                    var k = this.scrollbarHeight || 0,
                        l = this.size,
                        m = this.left - k,
                        r = this.top
                    c
                        ? ((m -= g),
                          (c = r + b + h),
                          (b = r + a + h),
                          (h = [
                              ['M', m + f, r - k - h],
                              ['L', m + f, c],
                              ['L', m, c],
                              ['L', m, b],
                              ['L', m + f, b],
                              ['L', m + f, r + l + k],
                          ]),
                          e && h.push(['M', m + f, c - g], ['L', m + f, b + g]))
                        : ((a += m + k - h),
                          (b += m + k - h),
                          (r += g),
                          (h = [
                              ['M', m, r],
                              ['L', a, r],
                              ['L', a, r + f],
                              ['L', b, r + f],
                              ['L', b, r],
                              ['L', m + l + 2 * k, r],
                          ]),
                          e && h.push(['M', a - g, r], ['L', b + g, r]))
                    this.outline[d]({ d: h })
                }
                f.prototype.drawMasks = function (a, b, c, d) {
                    var e = this.left,
                        f = this.top,
                        g = this.height
                    if (c) {
                        var h = [e, e, e]
                        var k = [f, f + a, f + b]
                        var l = [g, g, g]
                        var m = [a, b - a, this.size - b]
                    } else
                        (h = [e, e + a, e + b]),
                            (k = [f, f, f]),
                            (l = [a, b - a, this.size - b]),
                            (m = [g, g, g])
                    this.shades.forEach(function (a, b) {
                        a[d]({ x: h[b], y: k[b], width: l[b], height: m[b] })
                    })
                }
                f.prototype.renderElements = function () {
                    var a = this,
                        b = a.navigatorOptions,
                        c = b.maskInside,
                        e = a.chart,
                        d = e.renderer,
                        f,
                        g = { cursor: e.inverted ? 'ns-resize' : 'ew-resize' }
                    a.navigatorGroup = f = d
                        .g('navigator')
                        .attr({ zIndex: 8, visibility: 'hidden' })
                        .add()
                    ;[!c, c, !c].forEach(function (c, h) {
                        a.shades[h] = d
                            .rect()
                            .addClass(
                                'highcharts-navigator-mask' + (1 === h ? '-inside' : '-outside')
                            )
                            .add(f)
                        e.styledMode ||
                            a.shades[h]
                                .attr({ fill: c ? b.maskFill : 'rgba(0,0,0,0)' })
                                .css(1 === h && g)
                    })
                    a.outline = d.path().addClass('highcharts-navigator-outline').add(f)
                    e.styledMode ||
                        a.outline.attr({ 'stroke-width': b.outlineWidth, stroke: b.outlineColor })
                    b.handles.enabled &&
                        [0, 1].forEach(function (c) {
                            b.handles.inverted = e.inverted
                            a.handles[c] = d.symbol(
                                b.handles.symbols[c],
                                -b.handles.width / 2 - 1,
                                0,
                                b.handles.width,
                                b.handles.height,
                                b.handles
                            )
                            a.handles[c]
                                .attr({ zIndex: 7 - c })
                                .addClass(
                                    'highcharts-navigator-handle highcharts-navigator-handle-' +
                                        ['left', 'right'][c]
                                )
                                .add(f)
                            if (!e.styledMode) {
                                var h = b.handles
                                a.handles[c]
                                    .attr({
                                        fill: h.backgroundColor,
                                        stroke: h.borderColor,
                                        'stroke-width': h.lineWidth,
                                    })
                                    .css(g)
                            }
                        })
                }
                f.prototype.update = function (a) {
                    ;(this.series || []).forEach(function (a) {
                        a.baseSeries && delete a.baseSeries.navigatorSeries
                    })
                    this.destroy()
                    w(!0, this.chart.options.navigator, this.options, a)
                    this.init(this.chart)
                }
                f.prototype.render = function (a, b, c, e) {
                    var d = this.chart,
                        f = this.scrollbarHeight,
                        g,
                        h = this.xAxis,
                        m = h.pointRange || 0
                    var r = h.navigatorAxis.fake ? d.xAxis[0] : h
                    var n = this.navigatorEnabled,
                        p,
                        x = this.rendered
                    var q = d.inverted
                    var u = d.xAxis[0].minRange,
                        B = d.xAxis[0].options.maxRange
                    if (!this.hasDragged || I(c)) {
                        a = C(a - m / 2)
                        b = C(b + m / 2)
                        if (!k(a) || !k(b))
                            if (x) (c = 0), (e = l(h.width, r.width))
                            else return
                        this.left = l(h.left, d.plotLeft + f + (q ? d.plotWidth : 0))
                        this.size = p = g = l(h.len, (q ? d.plotHeight : d.plotWidth) - 2 * f)
                        d = q ? f : g + 2 * f
                        c = l(c, h.toPixels(a, !0))
                        e = l(e, h.toPixels(b, !0))
                        ;(k(c) && Infinity !== Math.abs(c)) || ((c = 0), (e = d))
                        a = h.toValue(c, !0)
                        b = h.toValue(e, !0)
                        var w = Math.abs(C(b - a))
                        w < u
                            ? this.grabbedLeft
                                ? (c = h.toPixels(b - u - m, !0))
                                : this.grabbedRight && (e = h.toPixels(a + u + m, !0))
                            : I(B) &&
                              C(w - m) > B &&
                              (this.grabbedLeft
                                  ? (c = h.toPixels(b - B - m, !0))
                                  : this.grabbedRight && (e = h.toPixels(a + B + m, !0)))
                        this.zoomedMax = E(Math.max(c, e), 0, p)
                        this.zoomedMin = E(
                            this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, e),
                            0,
                            p
                        )
                        this.range = this.zoomedMax - this.zoomedMin
                        p = Math.round(this.zoomedMax)
                        c = Math.round(this.zoomedMin)
                        n &&
                            (this.navigatorGroup.attr({ visibility: 'visible' }),
                            (x = x && !this.hasDragged ? 'animate' : 'attr'),
                            this.drawMasks(c, p, q, x),
                            this.drawOutline(c, p, q, x),
                            this.navigatorOptions.handles.enabled &&
                                (this.drawHandle(c, 0, q, x), this.drawHandle(p, 1, q, x)))
                        this.scrollbar &&
                            (q
                                ? ((q = this.top - f),
                                  (r =
                                      this.left -
                                      f +
                                      (n || !r.opposite
                                          ? 0
                                          : (r.titleOffset || 0) + r.axisTitleMargin)),
                                  (f = g + 2 * f))
                                : ((q = this.top + (n ? this.height : -f)), (r = this.left - f)),
                            this.scrollbar.position(r, q, d, f),
                            this.scrollbar.setRange(
                                this.zoomedMin / (g || 1),
                                this.zoomedMax / (g || 1)
                            ))
                        this.rendered = !0
                    }
                }
                f.prototype.addMouseEvents = function () {
                    var a = this,
                        b = a.chart,
                        e = b.container,
                        d = [],
                        f,
                        g
                    a.mouseMoveHandler = f = function (b) {
                        a.onMouseMove(b)
                    }
                    a.mouseUpHandler = g = function (b) {
                        a.onMouseUp(b)
                    }
                    d = a.getPartsEvents('mousedown')
                    d.push(m(b.renderTo, 'mousemove', f), m(e.ownerDocument, 'mouseup', g))
                    c &&
                        (d.push(m(b.renderTo, 'touchmove', f), m(e.ownerDocument, 'touchend', g)),
                        d.concat(a.getPartsEvents('touchstart')))
                    a.eventsToUnbind = d
                    a.series &&
                        a.series[0] &&
                        d.push(
                            m(a.series[0].xAxis, 'foundExtremes', function () {
                                b.navigator.modifyNavigatorAxisExtremes()
                            })
                        )
                }
                f.prototype.getPartsEvents = function (a) {
                    var b = this,
                        c = []
                    ;['shades', 'handles'].forEach(function (d) {
                        b[d].forEach(function (e, f) {
                            c.push(
                                m(e.element, a, function (a) {
                                    b[d + 'Mousedown'](a, f)
                                })
                            )
                        })
                    })
                    return c
                }
                f.prototype.shadesMousedown = function (a, b) {
                    a = this.chart.pointer.normalize(a)
                    var c = this.chart,
                        d = this.xAxis,
                        e = this.zoomedMin,
                        f = this.left,
                        g = this.size,
                        h = this.range,
                        k = a.chartX
                    c.inverted && ((k = a.chartY), (f = this.top))
                    if (1 === b)
                        (this.grabbedCenter = k), (this.fixedWidth = h), (this.dragOffset = k - e)
                    else {
                        a = k - f - h / 2
                        if (0 === b) a = Math.max(0, a)
                        else if (2 === b && a + h >= g)
                            if (((a = g - h), this.reversedExtremes)) {
                                a -= h
                                var l = this.getUnionExtremes().dataMin
                            } else var m = this.getUnionExtremes().dataMax
                        a !== e &&
                            ((this.fixedWidth = h),
                            (b = d.navigatorAxis.toFixedRange(a, a + h, l, m)),
                            I(b.min) &&
                                c.xAxis[0].setExtremes(
                                    Math.min(b.min, b.max),
                                    Math.max(b.min, b.max),
                                    !0,
                                    null,
                                    { trigger: 'navigator' }
                                ))
                    }
                }
                f.prototype.handlesMousedown = function (a, b) {
                    this.chart.pointer.normalize(a)
                    a = this.chart
                    var c = a.xAxis[0],
                        d = this.reversedExtremes
                    0 === b
                        ? ((this.grabbedLeft = !0),
                          (this.otherHandlePos = this.zoomedMax),
                          (this.fixedExtreme = d ? c.min : c.max))
                        : ((this.grabbedRight = !0),
                          (this.otherHandlePos = this.zoomedMin),
                          (this.fixedExtreme = d ? c.max : c.min))
                    a.fixedRange = null
                }
                f.prototype.onMouseMove = function (b) {
                    var c = this,
                        d = c.chart,
                        e = c.left,
                        f = c.navigatorSize,
                        g = c.range,
                        h = c.dragOffset,
                        k = d.inverted
                    ;(b.touches && 0 === b.touches[0].pageX) ||
                        ((b = d.pointer.normalize(b)),
                        (d = b.chartX),
                        k && ((e = c.top), (d = b.chartY)),
                        c.grabbedLeft
                            ? ((c.hasDragged = !0), c.render(0, 0, d - e, c.otherHandlePos))
                            : c.grabbedRight
                            ? ((c.hasDragged = !0), c.render(0, 0, c.otherHandlePos, d - e))
                            : c.grabbedCenter &&
                              ((c.hasDragged = !0),
                              d < h ? (d = h) : d > f + h - g && (d = f + h - g),
                              c.render(0, 0, d - h, d - h + g)),
                        c.hasDragged &&
                            c.scrollbar &&
                            l(
                                c.scrollbar.options.liveRedraw,
                                F.svg && !a && !this.chart.isBoosting
                            ) &&
                            ((b.DOMType = b.type),
                            setTimeout(function () {
                                c.onMouseUp(b)
                            }, 0)))
                }
                f.prototype.onMouseUp = function (a) {
                    var b = this.chart,
                        c = this.xAxis,
                        d = this.scrollbar,
                        e = a.DOMEvent || a,
                        f = b.inverted,
                        g = this.rendered && !this.hasDragged ? 'animate' : 'attr'
                    if ((this.hasDragged && (!d || !d.hasDragged)) || 'scrollbar' === a.trigger) {
                        d = this.getUnionExtremes()
                        if (this.zoomedMin === this.otherHandlePos) var h = this.fixedExtreme
                        else if (this.zoomedMax === this.otherHandlePos) var l = this.fixedExtreme
                        this.zoomedMax === this.size &&
                            (l = this.reversedExtremes ? d.dataMin : d.dataMax)
                        0 === this.zoomedMin && (h = this.reversedExtremes ? d.dataMax : d.dataMin)
                        c = c.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, h, l)
                        I(c.min) &&
                            b.xAxis[0].setExtremes(
                                Math.min(c.min, c.max),
                                Math.max(c.min, c.max),
                                !0,
                                this.hasDragged ? !1 : null,
                                { trigger: 'navigator', triggerOp: 'navigator-drag', DOMEvent: e }
                            )
                    }
                    'mousemove' !== a.DOMType &&
                        'touchmove' !== a.DOMType &&
                        (this.grabbedLeft =
                            this.grabbedRight =
                            this.grabbedCenter =
                            this.fixedWidth =
                            this.fixedExtreme =
                            this.otherHandlePos =
                            this.hasDragged =
                            this.dragOffset =
                                null)
                    this.navigatorEnabled &&
                        k(this.zoomedMin) &&
                        k(this.zoomedMax) &&
                        ((b = Math.round(this.zoomedMin)),
                        (a = Math.round(this.zoomedMax)),
                        this.shades && this.drawMasks(b, a, f, g),
                        this.outline && this.drawOutline(b, a, f, g),
                        this.navigatorOptions.handles.enabled &&
                            Object.keys(this.handles).length === this.handles.length &&
                            (this.drawHandle(b, 0, f, g), this.drawHandle(a, 1, f, g)))
                }
                f.prototype.removeEvents = function () {
                    this.eventsToUnbind &&
                        (this.eventsToUnbind.forEach(function (a) {
                            a()
                        }),
                        (this.eventsToUnbind = void 0))
                    this.removeBaseSeriesEvents()
                }
                f.prototype.removeBaseSeriesEvents = function () {
                    var a = this.baseSeries || []
                    this.navigatorEnabled &&
                        a[0] &&
                        (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                            a.forEach(function (a) {
                                e(a, 'updatedData', this.updatedDataHandler)
                            }, this),
                        a[0].xAxis && e(a[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes))
                }
                f.prototype.init = function (a) {
                    var c = a.options,
                        e = c.navigator,
                        f = e.enabled,
                        g = c.scrollbar,
                        h = g.enabled
                    c = f ? e.height : 0
                    var k = h ? g.height : 0
                    this.handles = []
                    this.shades = []
                    this.chart = a
                    this.setBaseSeries()
                    this.height = c
                    this.scrollbarHeight = k
                    this.scrollbarEnabled = h
                    this.navigatorEnabled = f
                    this.navigatorOptions = e
                    this.scrollbarOptions = g
                    this.outlineHeight = c + k
                    this.opposite = l(e.opposite, !(f || !a.inverted))
                    var n = this
                    f = n.baseSeries
                    g = a.xAxis.length
                    h = a.yAxis.length
                    var p = (f && f[0] && f[0].xAxis) || a.xAxis[0] || { options: {} }
                    a.isDirtyBox = !0
                    n.navigatorEnabled
                        ? ((n.xAxis = new d(
                              a,
                              w(
                                  { breaks: p.options.breaks, ordinal: p.options.ordinal },
                                  e.xAxis,
                                  {
                                      id: 'navigator-x-axis',
                                      yAxis: 'navigator-y-axis',
                                      isX: !0,
                                      type: 'datetime',
                                      index: g,
                                      isInternal: !0,
                                      offset: 0,
                                      keepOrdinalPadding: !0,
                                      startOnTick: !1,
                                      endOnTick: !1,
                                      minPadding: 0,
                                      maxPadding: 0,
                                      zoomEnabled: !1,
                                  },
                                  a.inverted
                                      ? { offsets: [k, 0, -k, 0], width: c }
                                      : { offsets: [0, -k, 0, k], height: c }
                              )
                          )),
                          (n.yAxis = new d(
                              a,
                              w(
                                  e.yAxis,
                                  {
                                      id: 'navigator-y-axis',
                                      alignTicks: !1,
                                      offset: 0,
                                      index: h,
                                      isInternal: !0,
                                      reversed: l(
                                          e.yAxis && e.yAxis.reversed,
                                          a.yAxis[0] && a.yAxis[0].reversed,
                                          !1
                                      ),
                                      zoomEnabled: !1,
                                  },
                                  a.inverted ? { width: c } : { height: c }
                              )
                          )),
                          f || e.series.data
                              ? n.updateNavigatorSeries(!1)
                              : 0 === a.series.length &&
                                (n.unbindRedraw = m(a, 'beforeRedraw', function () {
                                    0 < a.series.length &&
                                        !n.series &&
                                        (n.setBaseSeries(), n.unbindRedraw())
                                })),
                          (n.reversedExtremes =
                              (a.inverted && !n.xAxis.reversed) ||
                              (!a.inverted && n.xAxis.reversed)),
                          n.renderElements(),
                          n.addMouseEvents())
                        : ((n.xAxis = {
                              chart: a,
                              navigatorAxis: { fake: !0 },
                              translate: function (c, d) {
                                  var e = a.xAxis[0],
                                      f = e.getExtremes(),
                                      g = e.len - 2 * k,
                                      h = b('min', e.options.min, f.dataMin)
                                  e = b('max', e.options.max, f.dataMax) - h
                                  return d ? (c * e) / g + h : (g * (c - h)) / e
                              },
                              toPixels: function (a) {
                                  return this.translate(a)
                              },
                              toValue: function (a) {
                                  return this.translate(a, !0)
                              },
                          }),
                          (n.xAxis.navigatorAxis.axis = n.xAxis),
                          (n.xAxis.navigatorAxis.toFixedRange =
                              t.AdditionsClass.prototype.toFixedRange.bind(n.xAxis.navigatorAxis)))
                    a.options.scrollbar.enabled &&
                        ((a.scrollbar = n.scrollbar =
                            new y(
                                a.renderer,
                                w(a.options.scrollbar, {
                                    margin: n.navigatorEnabled ? 0 : 10,
                                    vertical: a.inverted,
                                }),
                                a
                            )),
                        m(n.scrollbar, 'changed', function (a) {
                            var b = n.size,
                                c = b * this.to
                            b *= this.from
                            n.hasDragged = n.scrollbar.hasDragged
                            n.render(0, 0, b, c)
                            this.shouldUpdateExtremes(a.DOMType) &&
                                setTimeout(function () {
                                    n.onMouseUp(a)
                                })
                        }))
                    n.addBaseSeriesEvents()
                    n.addChartEvents()
                }
                f.prototype.getUnionExtremes = function (a) {
                    var c = this.chart.xAxis[0],
                        d = this.xAxis,
                        e = d.options,
                        f = c.options,
                        g
                    ;(a && null === c.dataMin) ||
                        (g = {
                            dataMin: l(e && e.min, b('min', f.min, c.dataMin, d.dataMin, d.min)),
                            dataMax: l(e && e.max, b('max', f.max, c.dataMax, d.dataMax, d.max)),
                        })
                    return g
                }
                f.prototype.setBaseSeries = function (a, b) {
                    var c = this.chart,
                        d = (this.baseSeries = [])
                    a =
                        a ||
                        (c.options && c.options.navigator.baseSeries) ||
                        (c.series.length
                            ? z(c.series, function (a) {
                                  return !a.options.isInternal
                              }).index
                            : 0)
                    ;(c.series || []).forEach(function (b, c) {
                        b.options.isInternal ||
                            (!b.options.showInNavigator &&
                                ((c !== a && b.options.id !== a) ||
                                    !1 === b.options.showInNavigator)) ||
                            d.push(b)
                    })
                    this.xAxis &&
                        !this.xAxis.navigatorAxis.fake &&
                        this.updateNavigatorSeries(!0, b)
                }
                f.prototype.updateNavigatorSeries = function (a, b) {
                    var c = this,
                        d = c.chart,
                        f = c.baseSeries,
                        h,
                        k,
                        m = c.navigatorOptions.series,
                        p,
                        r = {
                            enableMouseTracking: !1,
                            index: null,
                            linkedTo: null,
                            group: 'nav',
                            padXAxis: !1,
                            xAxis: 'navigator-x-axis',
                            yAxis: 'navigator-y-axis',
                            showInLegend: !1,
                            stacking: void 0,
                            isInternal: !0,
                            states: { inactive: { opacity: 1 } },
                        },
                        q = (c.series = (c.series || []).filter(function (a) {
                            var b = a.baseSeries
                            return 0 > f.indexOf(b)
                                ? (b &&
                                      (e(b, 'updatedData', c.updatedDataHandler),
                                      delete b.navigatorSeries),
                                  a.chart && a.destroy(),
                                  !1)
                                : !0
                        }))
                    f &&
                        f.length &&
                        f.forEach(function (a) {
                            var e = a.navigatorSeries,
                                x = v(
                                    { color: a.color, visible: a.visible },
                                    u(m) ? n.navigator.series : m
                                )
                            ;(e && !1 === c.navigatorOptions.adaptToUpdatedData) ||
                                ((r.name = 'Navigator ' + f.length),
                                (h = a.options || {}),
                                (p = h.navigatorOptions || {}),
                                (x.dataLabels = g(x.dataLabels)),
                                (k = w(h, r, x, p)),
                                (k.pointRange = l(
                                    x.pointRange,
                                    p.pointRange,
                                    n.plotOptions[k.type || 'line'].pointRange
                                )),
                                (x = p.data || x.data),
                                (c.hasNavigatorData = c.hasNavigatorData || !!x),
                                (k.data = x || (h.data && h.data.slice(0))),
                                e && e.options
                                    ? e.update(k, b)
                                    : ((a.navigatorSeries = d.initSeries(k)),
                                      (a.navigatorSeries.baseSeries = a),
                                      q.push(a.navigatorSeries)))
                        })
                    if ((m.data && (!f || !f.length)) || u(m))
                        (c.hasNavigatorData = !1),
                            (m = g(m)),
                            m.forEach(function (a, b) {
                                r.name = 'Navigator ' + (q.length + 1)
                                k = w(
                                    n.navigator.series,
                                    {
                                        color:
                                            (d.series[b] &&
                                                !d.series[b].options.isInternal &&
                                                d.series[b].color) ||
                                            d.options.colors[b] ||
                                            d.options.colors[0],
                                    },
                                    r,
                                    a
                                )
                                k.data = a.data
                                k.data && ((c.hasNavigatorData = !0), q.push(d.initSeries(k)))
                            })
                    a && this.addBaseSeriesEvents()
                }
                f.prototype.addBaseSeriesEvents = function () {
                    var a = this,
                        b = a.baseSeries || []
                    b[0] &&
                        b[0].xAxis &&
                        b[0].eventsToUnbind.push(
                            m(b[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes)
                        )
                    b.forEach(function (b) {
                        b.eventsToUnbind.push(
                            m(b, 'show', function () {
                                this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                            })
                        )
                        b.eventsToUnbind.push(
                            m(b, 'hide', function () {
                                this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                            })
                        )
                        !1 !== this.navigatorOptions.adaptToUpdatedData &&
                            b.xAxis &&
                            b.eventsToUnbind.push(m(b, 'updatedData', this.updatedDataHandler))
                        b.eventsToUnbind.push(
                            m(b, 'remove', function () {
                                this.navigatorSeries &&
                                    (K(a.series, this.navigatorSeries),
                                    I(this.navigatorSeries.options) &&
                                        this.navigatorSeries.remove(!1),
                                    delete this.navigatorSeries)
                            })
                        )
                    }, this)
                }
                f.prototype.getBaseSeriesMin = function (a) {
                    return this.baseSeries.reduce(function (a, b) {
                        return Math.min(a, b.xData ? b.xData[0] : a)
                    }, a)
                }
                f.prototype.modifyNavigatorAxisExtremes = function () {
                    var a = this.xAxis,
                        b
                    'undefined' !== typeof a.getExtremes &&
                        (!(b = this.getUnionExtremes(!0)) ||
                            (b.dataMin === a.min && b.dataMax === a.max) ||
                            ((a.min = b.dataMin), (a.max = b.dataMax)))
                }
                f.prototype.modifyBaseAxisExtremes = function () {
                    var a = this.chart.navigator,
                        b = this.getExtremes(),
                        c = b.dataMin,
                        d = b.dataMax
                    b = b.max - b.min
                    var e = a.stickToMin,
                        f = a.stickToMax,
                        g = l(this.options.overscroll, 0),
                        h = a.series && a.series[0],
                        m = !!this.setExtremes
                    if (!this.eventArgs || 'rangeSelectorButton' !== this.eventArgs.trigger) {
                        if (e) {
                            var n = c
                            var p = n + b
                        }
                        f &&
                            ((p = d + g),
                            e ||
                                (n = Math.max(
                                    c,
                                    p - b,
                                    a.getBaseSeriesMin(
                                        h && h.xData ? h.xData[0] : -Number.MAX_VALUE
                                    )
                                )))
                        m &&
                            (e || f) &&
                            k(n) &&
                            ((this.min = this.userMin = n), (this.max = this.userMax = p))
                    }
                    a.stickToMin = a.stickToMax = null
                }
                f.prototype.updatedDataHandler = function () {
                    var a = this.chart.navigator,
                        b = this.navigatorSeries
                    a.stickToMax = a.reversedExtremes
                        ? 0 === Math.round(a.zoomedMin)
                        : Math.round(a.zoomedMax) >= Math.round(a.size)
                    a.stickToMin = a.shouldStickToMin(this, a)
                    b &&
                        !a.hasNavigatorData &&
                        ((b.options.pointStart = this.xData[0]),
                        b.setData(this.options.data, !1, null, !1))
                }
                f.prototype.shouldStickToMin = function (a, b) {
                    b = b.getBaseSeriesMin(a.xData[0])
                    var c = a.xAxis
                    a = c.max
                    var d = c.min
                    c = c.options.range
                    return k(a) && k(d) ? (c && 0 < a - b ? a - b < c : d <= b) : !1
                }
                f.prototype.addChartEvents = function () {
                    this.eventsToUnbind || (this.eventsToUnbind = [])
                    this.eventsToUnbind.push(
                        m(this.chart, 'redraw', function () {
                            var a = this.navigator,
                                b =
                                    a &&
                                    ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) ||
                                        this.xAxis[0])
                            b && a.render(b.min, b.max)
                        }),
                        m(this.chart, 'getMargins', function () {
                            var a = this.navigator,
                                b = a.opposite ? 'plotTop' : 'marginBottom'
                            this.inverted && (b = a.opposite ? 'marginRight' : 'plotLeft')
                            this[b] =
                                (this[b] || 0) +
                                (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) +
                                a.navigatorOptions.margin
                        })
                    )
                }
                f.prototype.destroy = function () {
                    this.removeEvents()
                    this.xAxis && (K(this.chart.xAxis, this.xAxis), K(this.chart.axes, this.xAxis))
                    this.yAxis && (K(this.chart.yAxis, this.yAxis), K(this.chart.axes, this.yAxis))
                    ;(this.series || []).forEach(function (a) {
                        a.destroy && a.destroy()
                    })
                    'series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered'
                        .split(' ')
                        .forEach(function (a) {
                            this[a] && this[a].destroy && this[a].destroy()
                            this[a] = null
                        }, this)
                    ;[this.handles].forEach(function (a) {
                        L(a)
                    }, this)
                }
                return f
            })()
            F.Navigator ||
                ((F.Navigator = B),
                t.compose(d),
                m(h, 'beforeShowResetZoom', function () {
                    var b = this.options,
                        c = b.navigator,
                        d = b.rangeSelector
                    if (
                        ((c && c.enabled) || (d && d.enabled)) &&
                        ((!a && 'x' === b.chart.zoomType) || (a && 'x' === b.chart.pinchType))
                    )
                        return !1
                }),
                m(h, 'beforeRender', function () {
                    var a = this.options
                    if (a.navigator.enabled || a.scrollbar.enabled)
                        this.scroller = this.navigator = new B(this)
                }),
                m(h, 'afterSetChartSize', function () {
                    var a = this.legend,
                        b = this.navigator
                    if (b) {
                        var c = a && a.options
                        var d = b.xAxis
                        var e = b.yAxis
                        var f = b.scrollbarHeight
                        this.inverted
                            ? ((b.left = b.opposite
                                  ? this.chartWidth - f - b.height
                                  : this.spacing[3] + f),
                              (b.top = this.plotTop + f))
                            : ((b.left = l(d.left, this.plotLeft + f)),
                              (b.top =
                                  b.navigatorOptions.top ||
                                  this.chartHeight -
                                      b.height -
                                      f -
                                      this.spacing[2] -
                                      (this.rangeSelector && this.extraBottomMargin
                                          ? this.rangeSelector.getHeight()
                                          : 0) -
                                      (c &&
                                      'bottom' === c.verticalAlign &&
                                      'proximate' !== c.layout &&
                                      c.enabled &&
                                      !c.floating
                                          ? a.legendHeight + l(c.margin, 10)
                                          : 0) -
                                      (this.titleOffset ? this.titleOffset[2] : 0)))
                        d &&
                            e &&
                            (this.inverted
                                ? (d.options.left = e.options.left = b.left)
                                : (d.options.top = e.options.top = b.top),
                            d.setAxisSize(),
                            e.setAxisSize())
                    }
                }),
                m(h, 'update', function (a) {
                    var b = a.options.navigator || {},
                        c = a.options.scrollbar || {}
                    this.navigator ||
                        this.scroller ||
                        (!b.enabled && !c.enabled) ||
                        (w(!0, this.options.navigator, b),
                        w(!0, this.options.scrollbar, c),
                        delete a.options.navigator,
                        delete a.options.scrollbar)
                }),
                m(h, 'afterUpdate', function (a) {
                    this.navigator ||
                        this.scroller ||
                        (!this.options.navigator.enabled && !this.options.scrollbar.enabled) ||
                        ((this.scroller = this.navigator = new B(this)),
                        l(a.redraw, !0) && this.redraw(a.animation))
                }),
                m(h, 'afterAddSeries', function () {
                    this.navigator && this.navigator.setBaseSeries(null, !1)
                }),
                m(q, 'afterUpdate', function () {
                    this.chart.navigator &&
                        !this.options.isInternal &&
                        this.chart.navigator.setBaseSeries(null, !1)
                }),
                h.prototype.callbacks.push(function (a) {
                    var b = a.navigator
                    b && a.xAxis[0] && ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max))
                }))
            F.Navigator = B
            return F.Navigator
        }
    )
    N(
        h,
        'Extensions/RangeSelector.js',
        [
            h['Core/Axis/Axis.js'],
            h['Core/Chart/Chart.js'],
            h['Core/Globals.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Renderer/SVG/SVGElement.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G) {
            function E(a) {
                if (-1 !== a.indexOf('%L')) return 'text'
                var b = 'aAdewbBmoyY'.split('').some(function (b) {
                        return -1 !== a.indexOf('%' + b)
                    }),
                    c = 'HkIlMS'.split('').some(function (b) {
                        return -1 !== a.indexOf('%' + b)
                    })
                return b && c ? 'datetime-local' : b ? 'date' : c ? 'time' : 'text'
            }
            var y = F.defaultOptions,
                q = G.addEvent,
                p = G.createElement,
                f = G.css,
                c = G.defined,
                a = G.destroyObjectProperties,
                n = G.discardElement,
                m = G.extend,
                D = G.find,
                C = G.fireEvent,
                I = G.isNumber,
                L = G.merge,
                K = G.objectEach,
                v = G.pad,
                z = G.pick,
                u = G.pInt,
                k = G.splat
            m(y, {
                rangeSelector: {
                    allButtonsEnabled: !1,
                    buttons: void 0,
                    buttonSpacing: 5,
                    dropdown: 'responsive',
                    enabled: void 0,
                    verticalAlign: 'top',
                    buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
                    floating: !1,
                    x: 0,
                    y: 0,
                    height: void 0,
                    inputBoxBorderColor: 'none',
                    inputBoxHeight: 17,
                    inputBoxWidth: void 0,
                    inputDateFormat: '%b %e, %Y',
                    inputDateParser: void 0,
                    inputEditDateFormat: '%Y-%m-%d',
                    inputEnabled: !0,
                    inputPosition: { align: 'right', x: 0, y: 0 },
                    inputSpacing: 5,
                    selected: void 0,
                    buttonPosition: { align: 'left', x: 0, y: 0 },
                    inputStyle: { color: '#335cad', cursor: 'pointer' },
                    labelStyle: { color: '#666666' },
                },
            })
            m(y.lang, {
                rangeSelectorZoom: 'Zoom',
                rangeSelectorFrom: '',
                rangeSelectorTo: '\u2192',
            })
            var w = (function () {
                function e(a) {
                    this.buttons = void 0
                    this.buttonOptions = e.prototype.defaultButtons
                    this.initialButtonGroupWidth = 0
                    this.options = void 0
                    this.chart = a
                    this.init(a)
                }
                e.prototype.clickButton = function (a, e) {
                    var b = this.chart,
                        f = this.buttonOptions[a],
                        g = b.xAxis[0],
                        h = (b.scroller && b.scroller.getUnionExtremes()) || g || {},
                        l = h.dataMin,
                        m = h.dataMax,
                        n = g && Math.round(Math.min(g.max, z(m, g.max))),
                        p = f.type
                    h = f._range
                    var u,
                        B = f.dataGrouping
                    if (null !== l && null !== m) {
                        b.fixedRange = h
                        this.setSelected(a)
                        B &&
                            ((this.forcedDataGrouping = !0),
                            d.prototype.setDataGrouping.call(g || { chart: this.chart }, B, !1),
                            (this.frozenStates = f.preserveDataGrouping))
                        if ('month' === p || 'year' === p)
                            if (g) {
                                p = { range: f, max: n, chart: b, dataMin: l, dataMax: m }
                                var w = g.minFromRange.call(p)
                                I(p.newMax) && (n = p.newMax)
                            } else h = f
                        else if (h) (w = Math.max(n - h, l)), (n = Math.min(w + h, m))
                        else if ('ytd' === p)
                            if (g)
                                'undefined' === typeof m &&
                                    ((l = Number.MAX_VALUE),
                                    (m = Number.MIN_VALUE),
                                    b.series.forEach(function (a) {
                                        a = a.xData
                                        l = Math.min(a[0], l)
                                        m = Math.max(a[a.length - 1], m)
                                    }),
                                    (e = !1)),
                                    (n = this.getYTDExtremes(m, l, b.time.useUTC)),
                                    (w = u = n.min),
                                    (n = n.max)
                            else {
                                this.deferredYTDClick = a
                                return
                            }
                        else
                            'all' === p &&
                                g &&
                                (b.navigator &&
                                    b.navigator.baseSeries[0] &&
                                    (b.navigator.baseSeries[0].xAxis.options.range = void 0),
                                (w = l),
                                (n = m))
                        c(w) && (w += f._offsetMin)
                        c(n) && (n += f._offsetMax)
                        this.dropdown && (this.dropdown.selectedIndex = a + 1)
                        if (g)
                            g.setExtremes(w, n, z(e, !0), void 0, {
                                trigger: 'rangeSelectorButton',
                                rangeSelectorButton: f,
                            })
                        else {
                            var t = k(b.options.xAxis)[0]
                            var v = t.range
                            t.range = h
                            var y = t.min
                            t.min = u
                            q(b, 'load', function () {
                                t.range = v
                                t.min = y
                            })
                        }
                        C(this, 'afterBtnClick')
                    }
                }
                e.prototype.setSelected = function (a) {
                    this.selected = this.options.selected = a
                }
                e.prototype.init = function (a) {
                    var b = this,
                        c = a.options.rangeSelector,
                        e = c.buttons || b.defaultButtons.slice(),
                        d = c.selected,
                        f = function () {
                            var a = b.minInput,
                                c = b.maxInput
                            a && a.blur && C(a, 'blur')
                            c && c.blur && C(c, 'blur')
                        }
                    b.chart = a
                    b.options = c
                    b.buttons = []
                    b.buttonOptions = e
                    this.eventsToUnbind = []
                    this.eventsToUnbind.push(q(a.container, 'mousedown', f))
                    this.eventsToUnbind.push(q(a, 'resize', f))
                    e.forEach(b.computeButtonRange)
                    'undefined' !== typeof d && e[d] && this.clickButton(d, !1)
                    this.eventsToUnbind.push(
                        q(a, 'load', function () {
                            a.xAxis &&
                                a.xAxis[0] &&
                                q(a.xAxis[0], 'setExtremes', function (c) {
                                    this.max - this.min !== a.fixedRange &&
                                        'rangeSelectorButton' !== c.trigger &&
                                        'updatedData' !== c.trigger &&
                                        b.forcedDataGrouping &&
                                        !b.frozenStates &&
                                        this.setDataGrouping(!1, !1)
                                })
                        })
                    )
                }
                e.prototype.updateButtonStates = function () {
                    var a = this,
                        c = this.chart,
                        e = this.dropdown,
                        d = c.xAxis[0],
                        f = Math.round(d.max - d.min),
                        g = !d.hasVisibleSeries,
                        h = (c.scroller && c.scroller.getUnionExtremes()) || d,
                        k = h.dataMin,
                        l = h.dataMax
                    c = a.getYTDExtremes(l, k, c.time.useUTC)
                    var m = c.min,
                        n = c.max,
                        p = a.selected,
                        q = I(p),
                        u = a.options.allButtonsEnabled,
                        w = a.buttons
                    a.buttonOptions.forEach(function (b, c) {
                        var h = b._range,
                            r = b.type,
                            x = b.count || 1,
                            t = w[c],
                            B = 0,
                            v = b._offsetMax - b._offsetMin
                        b = c === p
                        var z = h > l - k,
                            y = h < d.minRange,
                            A = !1,
                            J = !1
                        h = h === f
                        ;('month' === r || 'year' === r) &&
                        f + 36e5 >= 864e5 * { month: 28, year: 365 }[r] * x - v &&
                        f - 36e5 <= 864e5 * { month: 31, year: 366 }[r] * x + v
                            ? (h = !0)
                            : 'ytd' === r
                            ? ((h = n - m + v === f), (A = !b))
                            : 'all' === r && ((h = d.max - d.min >= l - k), (J = !b && q && h))
                        r = !u && (z || y || J || g)
                        x = (b && h) || (h && !q && !A) || (b && a.frozenStates)
                        r ? (B = 3) : x && ((q = !0), (B = 2))
                        t.state !== B &&
                            (t.setState(B),
                            e &&
                                ((e.options[c + 1].disabled = r),
                                2 === B && (e.selectedIndex = c + 1)),
                            0 === B && p === c && a.setSelected())
                    })
                }
                e.prototype.computeButtonRange = function (a) {
                    var b = a.type,
                        c = a.count || 1,
                        e = {
                            millisecond: 1,
                            second: 1e3,
                            minute: 6e4,
                            hour: 36e5,
                            day: 864e5,
                            week: 6048e5,
                        }
                    if (e[b]) a._range = e[b] * c
                    else if ('month' === b || 'year' === b)
                        a._range = 864e5 * { month: 30, year: 365 }[b] * c
                    a._offsetMin = z(a.offsetMin, 0)
                    a._offsetMax = z(a.offsetMax, 0)
                    a._range += a._offsetMax - a._offsetMin
                }
                e.prototype.getInputValue = function (a) {
                    a = 'min' === a ? this.minInput : this.maxInput
                    var b = this.chart.options.rangeSelector,
                        c = this.chart.time
                    return a
                        ? (('text' === a.type && b.inputDateParser) || this.defaultInputDateParser)(
                              a.value,
                              c.useUTC,
                              c
                          )
                        : 0
                }
                e.prototype.setInputValue = function (a, e) {
                    var b = this.options,
                        d = this.chart.time,
                        f = 'min' === a ? this.minInput : this.maxInput
                    a = 'min' === a ? this.minDateBox : this.maxDateBox
                    if (f) {
                        var g = f.getAttribute('data-hc-time')
                        g = c(g) ? Number(g) : void 0
                        c(e) &&
                            (c(g) && f.setAttribute('data-hc-time-previous', g),
                            f.setAttribute('data-hc-time', e),
                            (g = e))
                        f.value = d.dateFormat(
                            this.inputTypeFormats[f.type] || b.inputEditDateFormat,
                            g
                        )
                        a && a.attr({ text: d.dateFormat(b.inputDateFormat, g) })
                    }
                }
                e.prototype.setInputExtremes = function (a, c, e) {
                    if ((a = 'min' === a ? this.minInput : this.maxInput)) {
                        var b = this.inputTypeFormats[a.type],
                            d = this.chart.time
                        b &&
                            ((c = d.dateFormat(b, c)),
                            a.min !== c && (a.min = c),
                            (e = d.dateFormat(b, e)),
                            a.max !== e && (a.max = e))
                    }
                }
                e.prototype.showInput = function (a) {
                    var b = 'min' === a ? this.minDateBox : this.maxDateBox
                    if ((a = 'min' === a ? this.minInput : this.maxInput) && b && this.inputGroup) {
                        var c = 'text' === a.type,
                            e = this.inputGroup,
                            d = e.translateX
                        e = e.translateY
                        var g = this.options.inputBoxWidth
                        f(a, {
                            width: c ? b.width + (g ? -2 : 20) + 'px' : 'auto',
                            height: c ? b.height - 2 + 'px' : 'auto',
                            border: '2px solid silver',
                        })
                        c && g
                            ? f(a, { left: d + b.x + 'px', top: e + 'px' })
                            : f(a, {
                                  left:
                                      Math.min(
                                          Math.round(b.x + d - (a.offsetWidth - b.width) / 2),
                                          this.chart.chartWidth - a.offsetWidth
                                      ) + 'px',
                                  top: e - (a.offsetHeight - b.height) / 2 + 'px',
                              })
                    }
                }
                e.prototype.hideInput = function (a) {
                    ;(a = 'min' === a ? this.minInput : this.maxInput) &&
                        f(a, { top: '-9999em', border: 0, width: '1px', height: '1px' })
                }
                e.prototype.defaultInputDateParser = function (a, c, e) {
                    var b = a.split('/').join('-').split(' ').join('T')
                    ;-1 === b.indexOf('T') && (b += 'T00:00')
                    if (c) b += 'Z'
                    else {
                        var d
                        if ((d = A.isSafari))
                            (d = b),
                                (d = !(
                                    6 < d.length &&
                                    (d.lastIndexOf('-') === d.length - 6 ||
                                        d.lastIndexOf('+') === d.length - 6)
                                ))
                        d &&
                            ((d = new Date(b).getTimezoneOffset() / 60),
                            (b += 0 >= d ? '+' + v(-d) + ':00' : '-' + v(d) + ':00'))
                    }
                    b = Date.parse(b)
                    I(b) || ((a = a.split('-')), (b = Date.UTC(u(a[0]), u(a[1]) - 1, u(a[2]))))
                    e && c && I(b) && (b += e.getTimezoneOffset(b))
                    return b
                }
                e.prototype.drawInput = function (a) {
                    function b() {
                        var b = g.getInputValue(a),
                            e = c.xAxis[0],
                            d = c.scroller && c.scroller.xAxis ? c.scroller.xAxis : e,
                            f = d.dataMin
                        d = d.dataMax
                        var h = g.maxInput,
                            k = g.minInput
                        b !== Number(u.getAttribute('data-hc-time-previous')) &&
                            I(b) &&
                            (u.setAttribute('data-hc-time-previous', b),
                            n && h && I(f)
                                ? b > Number(h.getAttribute('data-hc-time'))
                                    ? (b = void 0)
                                    : b < f && (b = f)
                                : k &&
                                  I(d) &&
                                  (b < Number(k.getAttribute('data-hc-time'))
                                      ? (b = void 0)
                                      : b > d && (b = d)),
                            'undefined' !== typeof b &&
                                e.setExtremes(n ? b : e.min, n ? e.max : b, void 0, void 0, {
                                    trigger: 'rangeSelectorInput',
                                }))
                    }
                    var c = this.chart,
                        e = this.div,
                        d = this.inputGroup,
                        g = this,
                        h = c.renderer.style || {},
                        k = c.renderer,
                        l = c.options.rangeSelector,
                        n = 'min' === a,
                        q = y.lang[n ? 'rangeSelectorFrom' : 'rangeSelectorTo'] || ''
                    q = k
                        .label(q, 0)
                        .addClass('highcharts-range-label')
                        .attr({ padding: q ? 2 : 0, height: q ? l.inputBoxHeight : 0 })
                        .add(d)
                    k = k
                        .label('', 0)
                        .addClass('highcharts-range-input')
                        .attr({
                            padding: 2,
                            width: l.inputBoxWidth,
                            height: l.inputBoxHeight,
                            'text-align': 'center',
                        })
                        .on('click', function () {
                            g.showInput(a)
                            g[a + 'Input'].focus()
                        })
                    c.styledMode || k.attr({ stroke: l.inputBoxBorderColor, 'stroke-width': 1 })
                    k.add(d)
                    var u = p(
                        'input',
                        { name: a, className: 'highcharts-range-selector' },
                        void 0,
                        e
                    )
                    u.setAttribute('type', E(l.inputDateFormat || '%b %e, %Y'))
                    c.styledMode ||
                        (q.css(L(h, l.labelStyle)),
                        k.css(L({ color: '#333333' }, h, l.inputStyle)),
                        f(
                            u,
                            m(
                                {
                                    position: 'absolute',
                                    border: 0,
                                    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                                    width: '1px',
                                    height: '1px',
                                    padding: 0,
                                    textAlign: 'center',
                                    fontSize: h.fontSize,
                                    fontFamily: h.fontFamily,
                                    top: '-9999em',
                                },
                                l.inputStyle
                            )
                        ))
                    u.onfocus = function () {
                        g.showInput(a)
                    }
                    u.onblur = function () {
                        u === A.doc.activeElement && b()
                        g.hideInput(a)
                        g.setInputValue(a)
                        u.blur()
                    }
                    var w = !1
                    u.onchange = function () {
                        w || (b(), g.hideInput(a), u.blur())
                    }
                    u.onkeypress = function (a) {
                        13 === a.keyCode && b()
                    }
                    u.onkeydown = function (a) {
                        w = !0
                        ;(38 !== a.keyCode && 40 !== a.keyCode) || b()
                    }
                    u.onkeyup = function () {
                        w = !1
                    }
                    return { dateBox: k, input: u, label: q }
                }
                e.prototype.getPosition = function () {
                    var a = this.chart,
                        c = a.options.rangeSelector
                    a = 'top' === c.verticalAlign ? a.plotTop - a.axisOffset[0] : 0
                    return {
                        buttonTop: a + c.buttonPosition.y,
                        inputTop: a + c.inputPosition.y - 10,
                    }
                }
                e.prototype.getYTDExtremes = function (a, c, e) {
                    var b = this.chart.time,
                        d = new b.Date(a),
                        f = b.get('FullYear', d)
                    e = e ? b.Date.UTC(f, 0, 1) : +new b.Date(f, 0, 1)
                    c = Math.max(c, e)
                    d = d.getTime()
                    return { max: Math.min(a || d, d), min: c }
                }
                e.prototype.render = function (a, e) {
                    var b = this.chart,
                        d = b.renderer,
                        f = b.container,
                        g = b.options,
                        h = g.rangeSelector,
                        k = z(g.chart.style && g.chart.style.zIndex, 0) + 1
                    g = h.inputEnabled
                    if (!1 !== h.enabled) {
                        this.rendered ||
                            ((this.group = d.g('range-selector-group').attr({ zIndex: 7 }).add()),
                            (this.div = p('div', void 0, {
                                position: 'relative',
                                height: 0,
                                zIndex: k,
                            })),
                            this.buttonOptions.length && this.renderButtons(),
                            f.parentNode && f.parentNode.insertBefore(this.div, f),
                            g &&
                                ((this.inputGroup = d.g('input-group').add(this.group)),
                                (d = this.drawInput('min')),
                                (this.minDateBox = d.dateBox),
                                (this.minLabel = d.label),
                                (this.minInput = d.input),
                                (d = this.drawInput('max')),
                                (this.maxDateBox = d.dateBox),
                                (this.maxLabel = d.label),
                                (this.maxInput = d.input)))
                        if (
                            g &&
                            (this.setInputValue('min', a),
                            this.setInputValue('max', e),
                            (a = (b.scroller && b.scroller.getUnionExtremes()) || b.xAxis[0] || {}),
                            c(a.dataMin) &&
                                c(a.dataMax) &&
                                ((b = b.xAxis[0].minRange || 0),
                                this.setInputExtremes(
                                    'min',
                                    a.dataMin,
                                    Math.min(a.dataMax, this.getInputValue('max')) - b
                                ),
                                this.setInputExtremes(
                                    'max',
                                    Math.max(a.dataMin, this.getInputValue('min')) + b,
                                    a.dataMax
                                )),
                            this.inputGroup)
                        ) {
                            var l = 0
                            ;[
                                this.minLabel,
                                this.minDateBox,
                                this.maxLabel,
                                this.maxDateBox,
                            ].forEach(function (a) {
                                if (a) {
                                    var b = a.getBBox().width
                                    b && (a.attr({ x: l }), (l += b + h.inputSpacing))
                                }
                            })
                        }
                        this.alignElements()
                        this.rendered = !0
                    }
                }
                e.prototype.renderButtons = function () {
                    var a = this,
                        c = this.buttons,
                        d = this.options,
                        e = y.lang,
                        f = this.chart.renderer,
                        g = L(d.buttonTheme),
                        h = g && g.states,
                        k = g.width || 28
                    delete g.width
                    delete g.states
                    this.buttonGroup = f.g('range-selector-buttons').add(this.group)
                    var l = (this.dropdown = p(
                        'select',
                        void 0,
                        {
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            padding: 0,
                            border: 0,
                            top: '-9999em',
                            cursor: 'pointer',
                            opacity: 0.0001,
                        },
                        this.div
                    ))
                    q(l, 'touchstart', function () {
                        l.style.fontSize = '16px'
                    })
                    ;[
                        [A.isMS ? 'mouseover' : 'mouseenter'],
                        [A.isMS ? 'mouseout' : 'mouseleave'],
                        ['change', 'click'],
                    ].forEach(function (b) {
                        var d = b[0],
                            e = b[1]
                        q(l, d, function () {
                            var b = c[a.currentButtonIndex()]
                            b && C(b.element, e || d)
                        })
                    })
                    this.zoomText = f
                        .label((e && e.rangeSelectorZoom) || '', 0)
                        .attr({
                            padding: d.buttonTheme.padding,
                            height: d.buttonTheme.height,
                            paddingLeft: 0,
                            paddingRight: 0,
                        })
                        .add(this.buttonGroup)
                    this.chart.styledMode ||
                        (this.zoomText.css(d.labelStyle),
                        (g['stroke-width'] = z(g['stroke-width'], 0)))
                    p('option', { textContent: this.zoomText.textStr, disabled: !0 }, void 0, l)
                    this.buttonOptions.forEach(function (b, d) {
                        p('option', { textContent: b.title || b.text }, void 0, l)
                        c[d] = f
                            .button(
                                b.text,
                                0,
                                0,
                                function (c) {
                                    var e = b.events && b.events.click,
                                        f
                                    e && (f = e.call(b, c))
                                    !1 !== f && a.clickButton(d)
                                    a.isActive = !0
                                },
                                g,
                                h && h.hover,
                                h && h.select,
                                h && h.disabled
                            )
                            .attr({ 'text-align': 'center', width: k })
                            .add(a.buttonGroup)
                        b.title && c[d].attr('title', b.title)
                    })
                }
                e.prototype.alignElements = function () {
                    var a = this,
                        c = this.buttonGroup,
                        d = this.buttons,
                        e = this.chart,
                        f = this.group,
                        g = this.inputGroup,
                        h = this.options,
                        k = this.zoomText,
                        l = e.options,
                        m =
                            l.exporting &&
                            !1 !== l.exporting.enabled &&
                            l.navigation &&
                            l.navigation.buttonOptions
                    l = h.buttonPosition
                    var n = h.inputPosition,
                        p = h.verticalAlign,
                        q = function (b, c) {
                            return m &&
                                a.titleCollision(e) &&
                                'top' === p &&
                                'right' === c.align &&
                                c.y - b.getBBox().height - 12 <
                                    (m.y || 0) + (m.height || 0) + e.spacing[0]
                                ? -40
                                : 0
                        },
                        u = e.plotLeft
                    if (f && l && n) {
                        var w = l.x - e.spacing[3]
                        if (c) {
                            this.positionButtons()
                            if (!this.initialButtonGroupWidth) {
                                var t = 0
                                k && (t += k.getBBox().width + 5)
                                d.forEach(function (a, b) {
                                    t += a.width
                                    b !== d.length - 1 && (t += h.buttonSpacing)
                                })
                                this.initialButtonGroupWidth = t
                            }
                            u -= e.spacing[3]
                            this.updateButtonStates()
                            k = q(c, l)
                            this.alignButtonGroup(k)
                            f.placed = c.placed = e.hasLoaded
                        }
                        c = 0
                        g &&
                            ((c = q(g, n)),
                            'left' === n.align
                                ? (w = u)
                                : 'right' === n.align && (w = -Math.max(e.axisOffset[1], -c)),
                            g.align(
                                {
                                    y: n.y,
                                    width: g.getBBox().width,
                                    align: n.align,
                                    x: n.x + w - 2,
                                },
                                !0,
                                e.spacingBox
                            ),
                            (g.placed = e.hasLoaded))
                        this.handleCollision(c)
                        f.align({ verticalAlign: p }, !0, e.spacingBox)
                        g = f.alignAttr.translateY
                        c = f.getBBox().height + 20
                        q = 0
                        'bottom' === p &&
                            ((q =
                                (q = e.legend && e.legend.options) &&
                                'bottom' === q.verticalAlign &&
                                q.enabled &&
                                !q.floating
                                    ? e.legend.legendHeight + z(q.margin, 10)
                                    : 0),
                            (c = c + q - 20),
                            (q =
                                g -
                                c -
                                (h.floating ? 0 : h.y) -
                                (e.titleOffset ? e.titleOffset[2] : 0) -
                                10))
                        if ('top' === p)
                            h.floating && (q = 0),
                                e.titleOffset && e.titleOffset[0] && (q = e.titleOffset[0]),
                                (q += e.margin[0] - e.spacing[0] || 0)
                        else if ('middle' === p)
                            if (n.y === l.y) q = g
                            else if (n.y || l.y)
                                q = 0 > n.y || 0 > l.y ? q - Math.min(n.y, l.y) : g - c
                        f.translate(h.x, h.y + Math.floor(q))
                        l = this.minInput
                        n = this.maxInput
                        g = this.dropdown
                        h.inputEnabled &&
                            l &&
                            n &&
                            ((l.style.marginTop = f.translateY + 'px'),
                            (n.style.marginTop = f.translateY + 'px'))
                        g && (g.style.marginTop = f.translateY + 'px')
                    }
                }
                e.prototype.alignButtonGroup = function (a, c) {
                    var b = this.chart,
                        e = this.buttonGroup,
                        d = this.options.buttonPosition,
                        f = b.plotLeft - b.spacing[3],
                        g = d.x - b.spacing[3]
                    'right' === d.align ? (g += a - f) : 'center' === d.align && (g -= f / 2)
                    e &&
                        e.align(
                            {
                                y: d.y,
                                width: z(c, this.initialButtonGroupWidth),
                                align: d.align,
                                x: g,
                            },
                            !0,
                            b.spacingBox
                        )
                }
                e.prototype.positionButtons = function () {
                    var a = this.buttons,
                        c = this.chart,
                        e = this.options,
                        d = this.zoomText,
                        f = c.hasLoaded ? 'animate' : 'attr',
                        g = e.buttonPosition,
                        h = c.plotLeft,
                        k = h
                    d &&
                        'hidden' !== d.visibility &&
                        (d[f]({ x: z(h + g.x, h) }), (k += g.x + d.getBBox().width + 5))
                    this.buttonOptions.forEach(function (b, c) {
                        if ('hidden' !== a[c].visibility)
                            a[c][f]({ x: k }), (k += a[c].width + e.buttonSpacing)
                        else a[c][f]({ x: h })
                    })
                }
                e.prototype.handleCollision = function (a) {
                    var b = this,
                        c = this.chart,
                        e = this.buttonGroup,
                        d = this.inputGroup,
                        f = this.options,
                        g = f.buttonPosition,
                        h = f.dropdown,
                        k = f.inputPosition
                    f = function () {
                        var a = 0
                        b.buttons.forEach(function (b) {
                            b = b.getBBox()
                            b.width > a && (a = b.width)
                        })
                        return a
                    }
                    var l = function (b) {
                            if (d && e) {
                                var c =
                                        d.alignAttr.translateX +
                                        d.alignOptions.x -
                                        a +
                                        d.getBBox().x +
                                        2,
                                    f = d.alignOptions.width,
                                    h = e.alignAttr.translateX + e.getBBox().x
                                return h + b > c && c + f > h && g.y < k.y + d.getBBox().height
                            }
                            return !1
                        },
                        m = function () {
                            d &&
                                e &&
                                d.attr({
                                    translateX:
                                        d.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a),
                                    translateY: d.alignAttr.translateY + e.getBBox().height + 10,
                                })
                        }
                    if (e) {
                        if ('always' === h) {
                            this.collapseButtons(a)
                            l(f()) && m()
                            return
                        }
                        'never' === h && this.expandButtons()
                    }
                    d && e
                        ? k.align === g.align || l(this.initialButtonGroupWidth + 20)
                            ? 'responsive' === h
                                ? (this.collapseButtons(a), l(f()) && m())
                                : m()
                            : 'responsive' === h && this.expandButtons()
                        : e &&
                          'responsive' === h &&
                          (this.initialButtonGroupWidth > c.plotWidth
                              ? this.collapseButtons(a)
                              : this.expandButtons())
                }
                e.prototype.collapseButtons = function (a) {
                    var b = this.buttons,
                        c = this.buttonOptions,
                        e = this.chart,
                        d = this.dropdown,
                        f = this.options,
                        g = this.zoomText,
                        h =
                            (e.userOptions.rangeSelector &&
                                e.userOptions.rangeSelector.buttonTheme) ||
                            {},
                        k = function (a) {
                            return {
                                text: a ? a + ' \u25be' : '\u25be',
                                width: 'auto',
                                paddingLeft: z(f.buttonTheme.paddingLeft, h.padding, 8),
                                paddingRight: z(f.buttonTheme.paddingRight, h.padding, 8),
                            }
                        }
                    g && g.hide()
                    var l = !1
                    c.forEach(function (a, c) {
                        c = b[c]
                        2 !== c.state ? c.hide() : (c.show(), c.attr(k(a.text)), (l = !0))
                    })
                    l ||
                        (d && (d.selectedIndex = 0),
                        b[0].show(),
                        b[0].attr(k(this.zoomText && this.zoomText.textStr)))
                    c = f.buttonPosition.align
                    this.positionButtons()
                    ;('right' !== c && 'center' !== c) ||
                        this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width)
                    this.showDropdown()
                }
                e.prototype.expandButtons = function () {
                    var a = this.buttons,
                        c = this.buttonOptions,
                        e = this.options,
                        d = this.zoomText
                    this.hideDropdown()
                    d && d.show()
                    c.forEach(function (b, c) {
                        c = a[c]
                        c.show()
                        c.attr({
                            text: b.text,
                            width: e.buttonTheme.width || 28,
                            paddingLeft: z(e.buttonTheme.paddingLeft, 'unset'),
                            paddingRight: z(e.buttonTheme.paddingRight, 'unset'),
                        })
                        2 > c.state && c.setState(0)
                    })
                    this.positionButtons()
                }
                e.prototype.currentButtonIndex = function () {
                    var a = this.dropdown
                    return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
                }
                e.prototype.showDropdown = function () {
                    var a = this.buttonGroup,
                        c = this.buttons,
                        e = this.chart,
                        d = this.dropdown
                    if (a && d) {
                        var g = a.translateX
                        a = a.translateY
                        c = c[this.currentButtonIndex()].getBBox()
                        f(d, {
                            left: e.plotLeft + g + 'px',
                            top: a + 0.5 + 'px',
                            width: c.width + 'px',
                            height: c.height + 'px',
                        })
                        this.hasVisibleDropdown = !0
                    }
                }
                e.prototype.hideDropdown = function () {
                    var a = this.dropdown
                    a &&
                        (f(a, { top: '-9999em', width: '1px', height: '1px' }),
                        (this.hasVisibleDropdown = !1))
                }
                e.prototype.getHeight = function () {
                    var a = this.options,
                        c = this.group,
                        e = a.y,
                        d = a.buttonPosition.y,
                        f = a.inputPosition.y
                    if (a.height) return a.height
                    this.alignElements()
                    a = c ? c.getBBox(!0).height + 13 + e : 0
                    c = Math.min(f, d)
                    if ((0 > f && 0 > d) || (0 < f && 0 < d)) a += Math.abs(c)
                    return a
                }
                e.prototype.titleCollision = function (a) {
                    return !(a.options.title.text || a.options.subtitle.text)
                }
                e.prototype.update = function (a) {
                    var b = this.chart
                    L(!0, b.options.rangeSelector, a)
                    this.destroy()
                    this.init(b)
                    this.render()
                }
                e.prototype.destroy = function () {
                    var b = this,
                        c = b.minInput,
                        d = b.maxInput
                    b.eventsToUnbind &&
                        (b.eventsToUnbind.forEach(function (a) {
                            return a()
                        }),
                        (b.eventsToUnbind = void 0))
                    a(b.buttons)
                    c && (c.onfocus = c.onblur = c.onchange = null)
                    d && (d.onfocus = d.onblur = d.onchange = null)
                    K(
                        b,
                        function (a, c) {
                            a &&
                                'chart' !== c &&
                                (a instanceof t
                                    ? a.destroy()
                                    : a instanceof window.HTMLElement && n(a))
                            a !== e.prototype[c] && (b[c] = null)
                        },
                        this
                    )
                }
                return e
            })()
            w.prototype.defaultButtons = [
                { type: 'month', count: 1, text: '1m', title: 'View 1 month' },
                { type: 'month', count: 3, text: '3m', title: 'View 3 months' },
                { type: 'month', count: 6, text: '6m', title: 'View 6 months' },
                { type: 'ytd', text: 'YTD', title: 'View year to date' },
                { type: 'year', count: 1, text: '1y', title: 'View 1 year' },
                { type: 'all', text: 'All', title: 'View all' },
            ]
            w.prototype.inputTypeFormats = {
                'datetime-local': '%Y-%m-%dT%H:%M:%S',
                date: '%Y-%m-%d',
                time: '%H:%M:%S',
            }
            d.prototype.minFromRange = function () {
                var a = this.range,
                    b = a.type,
                    c = this.max,
                    d = this.chart.time,
                    e = function (a, c) {
                        var e = 'year' === b ? 'FullYear' : 'Month',
                            f = new d.Date(a),
                            g = d.get(e, f)
                        d.set(e, f, g + c)
                        g === d.get(e, f) && d.set('Date', f, 0)
                        return f.getTime() - a
                    }
                if (I(a)) {
                    var f = c - a
                    var h = a
                } else (f = c + e(c, -a.count)), this.chart && (this.chart.fixedRange = c - f)
                var k = z(this.dataMin, Number.MIN_VALUE)
                I(f) || (f = k)
                f <= k &&
                    ((f = k),
                    'undefined' === typeof h && (h = e(f, a.count)),
                    (this.newMax = Math.min(f + h, this.dataMax)))
                I(c) || (f = void 0)
                return f
            }
            if (!A.RangeSelector) {
                var l = [],
                    e = function (a) {
                        function b() {
                            e &&
                                ((c = a.xAxis[0].getExtremes()),
                                (d = a.legend),
                                (g = e && e.options.verticalAlign),
                                I(c.min) && e.render(c.min, c.max),
                                d.display &&
                                    'top' === g &&
                                    g === d.options.verticalAlign &&
                                    ((f = L(a.spacingBox)),
                                    (f.y =
                                        'vertical' === d.options.layout
                                            ? a.plotTop
                                            : f.y + e.getHeight()),
                                    (d.group.placed = !1),
                                    d.align(f)))
                        }
                        var c,
                            e = a.rangeSelector,
                            d,
                            f,
                            g
                        e &&
                            (D(l, function (b) {
                                return b[0] === a
                            }) ||
                                l.push([
                                    a,
                                    [
                                        q(a.xAxis[0], 'afterSetExtremes', function (a) {
                                            e && e.render(a.min, a.max)
                                        }),
                                        q(a, 'redraw', b),
                                    ],
                                ]),
                            b())
                    }
                q(h, 'afterGetContainer', function () {
                    this.options.rangeSelector &&
                        this.options.rangeSelector.enabled &&
                        (this.rangeSelector = new w(this))
                })
                q(h, 'beforeRender', function () {
                    var a = this.axes,
                        b = this.rangeSelector
                    b &&
                        (I(b.deferredYTDClick) &&
                            (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick),
                        a.forEach(function (a) {
                            a.updateNames()
                            a.setScale()
                        }),
                        this.getAxisMargins(),
                        b.render(),
                        (a = b.options.verticalAlign),
                        b.options.floating ||
                            ('bottom' === a
                                ? (this.extraBottomMargin = !0)
                                : 'middle' !== a && (this.extraTopMargin = !0)))
                })
                q(h, 'update', function (a) {
                    var b = a.options.rangeSelector
                    a = this.rangeSelector
                    var d = this.extraBottomMargin,
                        f = this.extraTopMargin
                    b &&
                        b.enabled &&
                        !c(a) &&
                        this.options.rangeSelector &&
                        ((this.options.rangeSelector.enabled = !0),
                        (this.rangeSelector = a = new w(this)))
                    this.extraTopMargin = this.extraBottomMargin = !1
                    a &&
                        (e(this),
                        (b = (b && b.verticalAlign) || (a.options && a.options.verticalAlign)),
                        a.options.floating ||
                            ('bottom' === b
                                ? (this.extraBottomMargin = !0)
                                : 'middle' !== b && (this.extraTopMargin = !0)),
                        this.extraBottomMargin !== d || this.extraTopMargin !== f) &&
                        (this.isDirtyBox = !0)
                })
                q(h, 'render', function () {
                    var a = this.rangeSelector
                    a &&
                        !a.options.floating &&
                        (a.render(),
                        (a = a.options.verticalAlign),
                        'bottom' === a
                            ? (this.extraBottomMargin = !0)
                            : 'middle' !== a && (this.extraTopMargin = !0))
                })
                q(h, 'getMargins', function () {
                    var a = this.rangeSelector
                    a &&
                        ((a = a.getHeight()),
                        this.extraTopMargin && (this.plotTop += a),
                        this.extraBottomMargin && (this.marginBottom += a))
                })
                h.prototype.callbacks.push(e)
                q(h, 'destroy', function () {
                    for (var a = 0; a < l.length; a++) {
                        var b = l[a]
                        if (b[0] === this) {
                            b[1].forEach(function (a) {
                                return a()
                            })
                            l.splice(a, 1)
                            break
                        }
                    }
                })
                A.RangeSelector = w
            }
            return w
        }
    )
    N(
        h,
        'Core/Chart/StockChart.js',
        [
            h['Core/Animation/AnimationUtilities.js'],
            h['Core/Axis/Axis.js'],
            h['Core/Chart/Chart.js'],
            h['Core/FormatUtilities.js'],
            h['Core/DefaultOptions.js'],
            h['Core/Series/Series.js'],
            h['Core/Renderer/SVG/SVGRenderer.js'],
            h['Core/Utilities.js'],
        ],
        function (d, h, A, F, t, G, H, y) {
            function q(a, c) {
                return 'xAxis' === a
                    ? {
                          minPadding: 0,
                          maxPadding: 0,
                          overscroll: 0,
                          ordinal: !0,
                          title: { text: null },
                          labels: { overflow: 'justify' },
                          showLastLabel: !0,
                      }
                    : 'yAxis' === a
                    ? {
                          labels: { y: -2 },
                          opposite: v(c.opposite, !0),
                          showLastLabel: !(!c.categories && 'category' !== c.type),
                          title: { text: null },
                      }
                    : {}
            }
            function p(c, d) {
                if ('xAxis' === c) {
                    c = a()
                    var f = { type: 'datetime', categories: void 0 }
                    v(d.navigator && d.navigator.enabled, c.navigator.enabled, !0) &&
                        ((f.startOnTick = !1), (f.endOnTick = !1))
                    return f
                }
                return {}
            }
            var f =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (c, d) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c
                                    }) ||
                                function (a, c) {
                                    for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                                }
                            return a(c, d)
                        }
                        return function (c, d) {
                            function f() {
                                this.constructor = c
                            }
                            a(c, d)
                            c.prototype =
                                null === d
                                    ? Object.create(d)
                                    : ((f.prototype = d.prototype), new f())
                        }
                    })(),
                c = F.format,
                a = t.getOptions
            d = y.addEvent
            var n = y.clamp,
                m = y.defined,
                E = y.extend,
                C = y.find,
                I = y.isNumber,
                L = y.isString,
                K = y.merge,
                v = y.pick,
                z = y.splat
            y = (function (c) {
                function d() {
                    return (null !== c && c.apply(this, arguments)) || this
                }
                f(d, c)
                d.prototype.init = function (d, f) {
                    var e = a(),
                        g = d.xAxis,
                        b = d.yAxis,
                        h = v(d.navigator && d.navigator.enabled, e.navigator.enabled, !0)
                    d.xAxis = d.yAxis = void 0
                    h = K(
                        {
                            chart: { panning: { enabled: !0, type: 'x' }, pinchType: 'x' },
                            navigator: { enabled: h },
                            scrollbar: { enabled: v(e.scrollbar && e.scrollbar.enabled, !0) },
                            rangeSelector: { enabled: v(e.rangeSelector.enabled, !0) },
                            title: { text: null },
                            tooltip: { split: v(e.tooltip.split, !0), crosshairs: !0 },
                            legend: { enabled: !1 },
                        },
                        d,
                        { isStock: !0 }
                    )
                    d.xAxis = g
                    d.yAxis = b
                    h.xAxis = z(d.xAxis || {}).map(function (a, b) {
                        return K(q('xAxis', a), e.xAxis, e.xAxis && e.xAxis[b], a, p('xAxis', d))
                    })
                    h.yAxis = z(d.yAxis || {}).map(function (a, b) {
                        return K(q('yAxis', a), e.yAxis, e.yAxis && e.yAxis[b], a)
                    })
                    c.prototype.init.call(this, h, f)
                }
                d.prototype.createAxis = function (a, d) {
                    d.axis = K(q(a, d.axis), d.axis, p(a, this.userOptions))
                    return c.prototype.createAxis.call(this, a, d)
                }
                return d
            })(A)
            ;(function (a) {
                a.stockChart = function (c, d, f) {
                    return new a(c, d, f)
                }
            })(y || (y = {}))
            d(G, 'setOptions', function (a) {
                var c
                this.chart.options.isStock &&
                    (this.is('column') || this.is('columnrange')
                        ? (c = { borderWidth: 0, shadow: !1 })
                        : this.is('scatter') ||
                          this.is('sma') ||
                          (c = { marker: { enabled: !1, radius: 2 } }),
                    c && (a.plotOptions[this.type] = K(a.plotOptions[this.type], c)))
            })
            d(h, 'autoLabelAlign', function (a) {
                var c = this.chart,
                    d = this.options
                c = c._labelPanes = c._labelPanes || {}
                var f = this.options.labels
                this.chart.options.isStock &&
                    'yAxis' === this.coll &&
                    ((d = d.top + ',' + d.height),
                    !c[d] &&
                        f.enabled &&
                        (15 === f.x && (f.x = 0),
                        'undefined' === typeof f.align && (f.align = 'right'),
                        (c[d] = this),
                        (a.align = 'right'),
                        a.preventDefault()))
            })
            d(h, 'destroy', function () {
                var a = this.chart,
                    c = this.options && this.options.top + ',' + this.options.height
                c && a._labelPanes && a._labelPanes[c] === this && delete a._labelPanes[c]
            })
            d(h, 'getPlotLinePath', function (a) {
                function c(a) {
                    var b = 'xAxis' === a ? 'yAxis' : 'xAxis'
                    a = d.options[b]
                    return I(a)
                        ? [e[b][a]]
                        : L(a)
                        ? [e.get(a)]
                        : f.map(function (a) {
                              return a[b]
                          })
                }
                var d = this,
                    f = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                    e = d.chart,
                    g = e.renderer,
                    b = d.left,
                    h = d.top,
                    p,
                    q,
                    u,
                    t,
                    z = [],
                    y = [],
                    A = a.translatedValue,
                    E = a.value,
                    D = a.force
                if (
                    (e.options.isStock && !1 !== a.acrossPanes && 'xAxis' === d.coll) ||
                    'yAxis' === d.coll
                ) {
                    a.preventDefault()
                    y = c(d.coll)
                    var F = d.isXAxis ? e.yAxis : e.xAxis
                    F.forEach(function (a) {
                        if (m(a.options.id) ? -1 === a.options.id.indexOf('navigator') : 1) {
                            var b = a.isXAxis ? 'yAxis' : 'xAxis'
                            b = m(a.options[b]) ? e[b][a.options[b]] : e[b][0]
                            d === b && y.push(a)
                        }
                    })
                    var G = y.length ? [] : [d.isXAxis ? e.yAxis[0] : e.xAxis[0]]
                    y.forEach(function (a) {
                        ;-1 !== G.indexOf(a) ||
                            C(G, function (b) {
                                return b.pos === a.pos && b.len === a.len
                            }) ||
                            G.push(a)
                    })
                    var H = v(A, d.translate(E, null, null, a.old))
                    I(H) &&
                        (d.horiz
                            ? G.forEach(function (a) {
                                  var c
                                  q = a.pos
                                  t = q + a.len
                                  p = u = Math.round(H + d.transB)
                                  'pass' !== D &&
                                      (p < b || p > b + d.width) &&
                                      (D ? (p = u = n(p, b, b + d.width)) : (c = !0))
                                  c || z.push(['M', p, q], ['L', u, t])
                              })
                            : G.forEach(function (a) {
                                  var b
                                  p = a.pos
                                  u = p + a.len
                                  q = t = Math.round(h + d.height - H)
                                  'pass' !== D &&
                                      (q < h || q > h + d.height) &&
                                      (D ? (q = t = n(q, h, h + d.height)) : (b = !0))
                                  b || z.push(['M', p, q], ['L', u, t])
                              }))
                    a.path = 0 < z.length ? g.crispPolyLine(z, a.lineWidth || 1) : null
                }
            })
            H.prototype.crispPolyLine = function (a, c) {
                for (var d = 0; d < a.length; d += 2) {
                    var f = a[d],
                        e = a[d + 1]
                    f[1] === e[1] && (f[1] = e[1] = Math.round(f[1]) - (c % 2) / 2)
                    f[2] === e[2] && (f[2] = e[2] = Math.round(f[2]) + (c % 2) / 2)
                }
                return a
            }
            d(h, 'afterHideCrosshair', function () {
                this.crossLabel && (this.crossLabel = this.crossLabel.hide())
            })
            d(h, 'afterDrawCrosshair', function (a) {
                var d, f
                if (
                    this.crosshair &&
                    this.crosshair.label &&
                    this.crosshair.label.enabled &&
                    this.cross &&
                    I(this.min) &&
                    I(this.max)
                ) {
                    var h = this.chart,
                        e = this.logarithmic,
                        g = this.crosshair.label,
                        b = this.horiz,
                        m = this.opposite,
                        n = this.left,
                        p = this.top,
                        q = this.crossLabel,
                        u = g.format,
                        t = '',
                        z = 'inside' === this.options.tickPosition,
                        y = !1 !== this.crosshair.snap,
                        A = 0,
                        C = a.e || (this.cross && this.cross.e)
                    a = a.point
                    var D = this.min,
                        F = this.max
                    e && ((D = e.lin2log(D)), (F = e.lin2log(F)))
                    e = b
                        ? 'center'
                        : m
                        ? 'right' === this.labelAlign
                            ? 'right'
                            : 'left'
                        : 'left' === this.labelAlign
                        ? 'left'
                        : 'center'
                    q ||
                        ((q = this.crossLabel =
                            h.renderer
                                .label('', 0, void 0, g.shape || 'callout')
                                .addClass(
                                    'highcharts-crosshair-label highcharts-color-' +
                                        (a
                                            ? a.series.colorIndex
                                            : this.series[0] && this.series[0].colorIndex)
                                )
                                .attr({
                                    align: g.align || e,
                                    padding: v(g.padding, 8),
                                    r: v(g.borderRadius, 3),
                                    zIndex: 2,
                                })
                                .add(this.labelGroup)),
                        h.styledMode ||
                            q
                                .attr({
                                    fill:
                                        g.backgroundColor ||
                                        (a && a.series && a.series.color) ||
                                        '#666666',
                                    stroke: g.borderColor || '',
                                    'stroke-width': g.borderWidth || 0,
                                })
                                .css(
                                    E(
                                        {
                                            color: '#ffffff',
                                            fontWeight: 'normal',
                                            fontSize: '11px',
                                            textAlign: 'center',
                                        },
                                        g.style || {}
                                    )
                                ))
                    b
                        ? ((e = y ? (a.plotX || 0) + n : C.chartX), (p += m ? 0 : this.height))
                        : ((e = m ? this.width + n : 0), (p = y ? (a.plotY || 0) + p : C.chartY))
                    u ||
                        g.formatter ||
                        (this.dateTime && (t = '%b %d, %Y'),
                        (u = '{value' + (t ? ':' + t : '') + '}'))
                    t = y ? (this.isXAxis ? a.x : a.y) : this.toValue(b ? C.chartX : C.chartY)
                    y = a ? a.series.isPointInside(a) : I(t) && t > D && t < F
                    C = ''
                    u
                        ? (C = c(u, { value: t }, h))
                        : g.formatter && I(t) && (C = g.formatter.call(this, t))
                    q.attr({ text: C, x: e, y: p, visibility: y ? 'visible' : 'hidden' })
                    g = q.getBBox()
                    if (I(q.y))
                        if (b) {
                            if ((z && !m) || (!z && m)) p = q.y - g.height
                        } else p = q.y - g.height / 2
                    b
                        ? ((d = n - g.x), (f = n + this.width - g.x))
                        : ((d = 'left' === this.labelAlign ? n : 0),
                          (f = 'right' === this.labelAlign ? n + this.width : h.chartWidth))
                    q.translateX < d && (A = d - q.translateX)
                    q.translateX + g.width >= f && (A = -(q.translateX + g.width - f))
                    q.attr({
                        x: e + A,
                        y: p,
                        anchorX: b ? e : this.opposite ? 0 : h.chartWidth,
                        anchorY: b ? (this.opposite ? h.chartHeight : 0) : p + g.height / 2,
                    })
                }
            })
            G.prototype.forceCropping = function () {
                var a = this.chart,
                    c = this.options.dataGrouping
                return !1 !== this.allowDG && c && v(c.enabled, a.options.isStock)
            }
            d(A, 'update', function (a) {
                a = a.options
                'scrollbar' in a &&
                    this.navigator &&
                    (K(!0, this.options.scrollbar, a.scrollbar),
                    this.navigator.update({}, !1),
                    delete a.scrollbar)
            })
            return y
        }
    )
    N(
        h,
        'masters/modules/stock.src.js',
        [
            h['Core/Globals.js'],
            h['Core/Axis/OrdinalAxis.js'],
            h['Series/DataModifyComposition.js'],
            h['Core/Scrollbar.js'],
            h['Core/Chart/StockChart.js'],
        ],
        function (d, h, A, F, t) {
            d.Scrollbar = F
            d.StockChart = d.stockChart = t.stockChart
            F.compose(d.Axis)
            h.compose(d.Axis, d.Series, d.Chart)
            A.compose(d.Series, d.Axis, d.Point)
        }
    )
    N(h, 'masters/highstock.src.js', [h['masters/highcharts.src.js']], function (d) {
        d.product = 'Highstock'
        return d
    })
    h['masters/highstock.src.js']._modules = h
    return h['masters/highstock.src.js']
})
//# sourceMappingURL=highstock.js.map
