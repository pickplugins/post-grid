/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPropValid);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@emotion/stylis/dist/stylis.browser.esm.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stylis_min);


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./src/blocks/heading/index.js":
/*!*************************************!*\
  !*** ./src/blocks/heading/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");













const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop'); ////console.log(wp.data.select('my-shop').getBreakPoint('food'))
//console.log(myStore.getBreakPoint());
////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)("post-grid/heading", {
  title: "Heading",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M4 14.5h16V16H4zM4 18.5h9V20H4zM4 4h3c2 0 3 .86 3 2.583 0 .891-.253 1.554-.76 1.988-.505.435-1.24.652-2.204.652H5.542V12H4V4zm2.855 4c.53 0 .924-.114 1.18-.343.266-.228.398-.579.398-1.051 0-.473-.132-.82-.397-1.04-.265-.229-.67-.343-1.217-.343H5.542V8h1.313z"
    }))
  },
  attributes: {
    heading: {
      type: 'object',
      default: {
        text: 'Heading',
        textAlign: '',
        tag: 'h2',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    link: {
      type: 'object',
      default: {
        textAlign: '',
        isLink: true,
        linkTarget: '',
        customUrl: '',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    prefix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    postfix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": {
        items: {}
      }
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var heading = attributes.heading;
    var link = attributes.link;
    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense()); //console.log(heading);
    // Heading CSS Class Selectors

    const headingSelector = '.pg-heading';
    const titleLinkSelector = link.isLink ? '.pg-heading a' : '.pg-heading';
    const headingPrefixSelector = '.pg-heading .prefix';
    const headingPostfixSelector = '.pg-heading .postfix';
    var breakPointList = [{
      label: 'Select..',
      icon: '',
      value: ''
    }];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = heading.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        heading: {
          text: heading.text,
          tag: heading.tag,
          textAlign: heading.textAlign,
          class: heading.class,
          color: heading.color,
          bgColor: heading.bgColor,
          padding: responsive,
          margin: heading.margin
        }
      });
      blockCssY.items[headingSelector] = blockCssY.items[headingSelector] != undefined ? blockCssY.items[headingSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[headingSelector]['padding-top'] != undefined ? blockCssY.items[headingSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[headingSelector]['padding-right'] != undefined ? blockCssY.items[headingSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[headingSelector]['padding-bottom'] != undefined ? blockCssY.items[headingSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[headingSelector]['padding-left'] != undefined ? blockCssY.items[headingSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = heading.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        heading: {
          text: heading.text,
          tag: heading.tag,
          textAlign: heading.textAlign,
          class: heading.class,
          color: heading.color,
          bgColor: heading.bgColor,
          padding: heading.padding,
          margin: responsive
        }
      });
      blockCssY.items[headingSelector] = blockCssY.items[headingSelector] != undefined ? blockCssY.items[headingSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[headingSelector]['margin-top'] != undefined ? blockCssY.items[headingSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[headingSelector]['margin-right'] !== undefined ? blockCssY.items[headingSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[headingSelector]['margin-bottom'] !== undefined ? blockCssY.items[headingSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[headingSelector]['margin-left'] !== undefined ? blockCssY.items[headingSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postCategories');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      //console.log('Listening blockCss: ', blockCss);
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      ////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
    }, [linkAttr]);

    var linkAttrObj = () => {
      var sdsd = {};
      linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      }); ////console.log(sdsd);

      setlinkAttrItems(sdsd); //return sdsd;
    }; ////console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }]; //const [blockCss, setBlockCss] = useState({ items: {} });

    const [setSome, setSomeState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [stateX, setStateX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('Old Value');
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    var headingLink = heading.customUrl != undefined && heading.customUrl.length > 0 ? heading.customUrl : ''; //console.log('Hello');

    const CustomTag = `${heading.tag}`;

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.AlignmentToolbar, {
      value: heading.textAlign,
      onChange: nextAlign => {
        setAttributes({
          heading: {
            textAlign: nextAlign,
            linkTarget: heading.linkTarget,
            customUrl: heading.customUrl,
            class: heading.class,
            color: heading.color,
            bgColor: heading.bgColor,
            padding: heading.padding,
            margin: heading.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "px-3",
      title: "General",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Heading",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Heading Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: heading.text,
      onChange: newVal => {
        setAttributes({
          heading: {
            text: newVal,
            textAlign: heading.textAlign,
            tag: heading.tag,
            color: heading.color,
            bgColor: heading.bgColor,
            padding: heading.padding,
            margin: heading.margin
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Heading Tag"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: heading.tag,
      options: [{
        label: 'No Heading',
        value: ''
      }, {
        label: 'H1',
        value: 'h1'
      }, {
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'span',
        value: 'SPAN'
      }, {
        label: 'div',
        value: 'DIV'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: newVal => {
        {
          setAttributes({
            heading: {
              text: heading.text,
              textAlign: heading.textAlign,
              tag: newVal,
              color: heading.color,
              bgColor: heading.bgColor,
              padding: heading.padding,
              margin: heading.margin
            }
          });
        }
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: heading.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = heading.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          heading: {
            text: heading.text,
            textAlign: heading.textAlign,
            tag: heading.tag,
            class: heading.class,
            color: responsive,
            bgColor: heading.bgColor,
            padding: heading.padding,
            margin: heading.margin
          }
        });
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: heading.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = heading.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          heading: {
            text: heading.text,
            textAlign: heading.textAlign,
            tag: heading.tag,
            class: heading.class,
            color: heading.color,
            bgColor: responsive,
            padding: heading.padding,
            margin: heading.margin
          }
        });
        blockCssY.items[headingSelector] = { ...blockCssY.items[headingSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: heading.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: heading.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Link",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
      label: "Linked with URL?",
      help: link.isLink ? 'Linked with post URL' : 'Not linked to post URL.',
      checked: link.isLink ? true : false,
      onChange: e => {
        setAttributes({
          link: {
            textAlign: link.textAlign,
            isLink: link.isLink ? false : true,
            linkTarget: link.linkTarget,
            customUrl: link.customUrl,
            class: link.class,
            color: link.color,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
      }
    }), link.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: link.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          link: {
            textAlign: link.textAlign,
            isLink: link.isLink,
            linkTarget: newVal,
            customUrl: link.customUrl,
            class: link.class,
            color: link.color,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Url"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: link.customUrl,
      onChange: newVal => {
        setAttributes({
          link: {
            textAlign: link.textAlign,
            isLink: link.isLink,
            linkTarget: link.linkTarget,
            customUrl: newVal,
            class: link.class,
            color: link.color,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          linkAttr: sdsd
        });
        linkAttrObj();
      }
    }, "Add")), linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: linkAttr[i].id,
        onChange: newVal => {
          linkAttr[i].id = newVal;
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          linkAttr[i].val = newVal;
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          linkAttr.splice(i, 1);
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      })));
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Prefix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: prefix.text,
      onChange: newVal => {
        setAttributes({
          prefix: {
            text: newVal,
            class: prefix.class,
            color: prefix.color,
            bgColor: prefix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Postfix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postfix.text,
      onChange: newVal => {
        setAttributes({
          postfix: {
            text: newVal,
            class: prefix.class,
            color: postfix.color,
            bgColor: postfix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Title Heading"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, headingSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Title link"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, headingSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, headingPrefixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, headingPostfixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, heading.tag && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(CustomTag, {
      className: ['pg-heading']
    }, link.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, linkAttrItems, {
      href: headingLink,
      target: heading.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.class
    }, prefix.text), heading.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.class
    }, postfix.text)), !link.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.class
    }, prefix.text), heading.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.class
    }, postfix.text))), heading.tag.length == 0 && link.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: ['pg-heading']
    }, linkAttrItems, {
      href: headingLink,
      target: heading.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), heading.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)), heading.tag.length == 0 && !link.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: 'pg-heading'
    }, prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), heading.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/link/index.js":
/*!**********************************!*\
  !*** ./src/blocks/link/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");













const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop'); ////console.log(wp.data.select('my-shop').getBreakPoint('food'))
//console.log(myStore.getBreakPoint());
////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)("post-grid/link", {
  title: "Link",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M4 14.5h16V16H4zM4 18.5h9V20H4zM4 4h3c2 0 3 .86 3 2.583 0 .891-.253 1.554-.76 1.988-.505.435-1.24.652-2.204.652H5.542V12H4V4zm2.855 4c.53 0 .924-.114 1.18-.343.266-.228.398-.579.398-1.051 0-.473-.132-.82-.397-1.04-.265-.229-.67-.343-1.217-.343H5.542V8h1.313z"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        tag: '',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    link: {
      type: 'object',
      default: {
        text: 'Custom Link',
        textAlign: '',
        linkTarget: '',
        customUrl: '#',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    prefix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    postfix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": {
        items: {}
      }
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var link = attributes.link;
    var wrapper = attributes.wrapper;
    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense()); // Wrapper CSS Class Selectors

    const titleWrapperSelector = '.pg-link';
    const titleLinkSelector = wrapper.tag ? link.customUrl ? '.pg-link a' : '.pg-link' : '.pg-link';
    const titlePrefixSelector = '.pg-link .prefix';
    const titlePostfixSelector = '.pg-link .postfix';
    var breakPointList = [{
      label: 'Select..',
      icon: '',
      value: ''
    }];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = link.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        link: {
          text: link.text,
          textAlign: link.textAlign,
          class: link.class,
          color: link.color,
          bgColor: link.bgColor,
          padding: responsive,
          margin: link.margin
        }
      });
      blockCssY.items[titleLinkSelector] = blockCssY.items[titleLinkSelector] != undefined ? blockCssY.items[titleLinkSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[titleLinkSelector]['padding-top'] != undefined ? blockCssY.items[titleLinkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[titleLinkSelector]['padding-right'] != undefined ? blockCssY.items[titleLinkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[titleLinkSelector]['padding-bottom'] != undefined ? blockCssY.items[titleLinkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[titleLinkSelector]['padding-left'] != undefined ? blockCssY.items[titleLinkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = link.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        link: {
          text: link.text,
          textAlign: link.textAlign,
          class: link.class,
          color: link.color,
          bgColor: link.bgColor,
          padding: link.padding,
          margin: responsive
        }
      });
      blockCssY.items[titleLinkSelector] = blockCssY.items[titleLinkSelector] != undefined ? blockCssY.items[titleLinkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[titleLinkSelector]['margin-top'] != undefined ? blockCssY.items[titleLinkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[titleLinkSelector]['margin-right'] !== undefined ? blockCssY.items[titleLinkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[titleLinkSelector]['margin-bottom'] !== undefined ? blockCssY.items[titleLinkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[titleLinkSelector]['margin-left'] !== undefined ? blockCssY.items[titleLinkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-link");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-link").outerHTML = "";
          }

          var divWrap = '<div id="css-block-link"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-link');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-link");

        if (divWrap != undefined) {
          document.getElementById("css-block-link").outerHTML = "";
        }

        var divWrap = '<div id="css-block-link"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-link');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      //console.log('Listening blockCss: ', blockCss);
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      ////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
    }, [linkAttr]);

    var linkAttrObj = () => {
      var sdsd = {};
      linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      }); ////console.log(sdsd);

      setlinkAttrItems(sdsd); //return sdsd;
    }; ////console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }]; //const [blockCss, setBlockCss] = useState({ items: {} });

    const [setSome, setSomeState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [stateX, setStateX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('Old Value');
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    var linkUrl = link.customUrl != undefined && link.customUrl.length > 0 ? link.customUrl : ''; //console.log('Hello');

    const CustomTag = `${wrapper.tag}`;

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.AlignmentToolbar, {
      value: link.textAlign,
      onChange: nextAlign => {
        setAttributes({
          link: {
            text: link.text,
            textAlign: nextAlign,
            linkTarget: link.linkTarget,
            customUrl: link.customUrl,
            class: link.class,
            color: link.color,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'text-align': nextAlign
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "px-3",
      title: "General",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Tag"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: wrapper.tag,
      options: [{
        label: 'No Wrapper',
        value: ''
      }, {
        label: 'H1',
        value: 'h1'
      }, {
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'span',
        value: 'SPAN'
      }, {
        label: 'div',
        value: 'DIV'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: newVal => {
        {
          setAttributes({
            wrapper: {
              textAlign: wrapper.textAlign,
              tag: newVal,
              color: wrapper.color,
              bgColor: wrapper.bgColor,
              padding: wrapper.padding,
              margin: wrapper.margin
            }
          });
        }
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Link",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "URL"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: link.customUrl,
      onChange: newVal => {
        setAttributes({
          link: {
            text: link.text,
            textAlign: link.textAlign,
            linkTarget: link.linkTarget,
            customUrl: newVal,
            class: link.class,
            color: link.color,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: link.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          link: {
            text: link.text,
            textAlign: link.textAlign,
            linkTarget: newVal,
            customUrl: link.customUrl,
            class: link.class,
            color: link.color,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          linkAttr: sdsd
        });
        linkAttrObj();
      }
    }, "Add")), linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: linkAttr[i].id,
        onChange: newVal => {
          linkAttr[i].id = newVal;
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          linkAttr[i].val = newVal;
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          linkAttr.splice(i, 1);
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      })));
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: link.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = link.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          link: {
            text: link.text,
            textAlign: link.textAlign,
            class: link.class,
            color: responsive,
            bgColor: link.bgColor,
            padding: link.padding,
            margin: link.margin
          }
        });
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: link.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = link.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          link: {
            text: link.text,
            textAlign: link.textAlign,
            class: link.class,
            color: link.color,
            bgColor: responsive,
            padding: link.padding,
            margin: link.margin
          }
        });
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: link.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: link.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Prefix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: prefix.text,
      onChange: newVal => {
        setAttributes({
          prefix: {
            text: newVal,
            class: prefix.class,
            color: prefix.color,
            bgColor: prefix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Postfix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postfix.text,
      onChange: newVal => {
        setAttributes({
          postfix: {
            text: newVal,
            class: prefix.class,
            color: postfix.color,
            bgColor: postfix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Link Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titleWrapperSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Link"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titleLinkSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titlePrefixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titlePostfixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, wrapper.tag && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(CustomTag, {
      className: ['pg-link']
    }, link.customUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, linkAttrItems, {
      href: linkUrl,
      target: link.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.class
    }, prefix.text), link.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.class
    }, postfix.text)), !link.customUrl && link.text), wrapper.tag.length == 0 && link.customUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: ['pg-link']
    }, linkAttrItems, {
      href: linkUrl,
      target: link.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), link.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)), wrapper.tag.length == 0 && !link.customUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: 'pg-link'
    }, prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), link.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-author/index.js":
/*!*****************************************!*\
  !*** ./src/blocks/post-author/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_sortablejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-sortablejs */ "./node_modules/react-sortablejs/dist/index.js");
/* harmony import */ var react_sortablejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");













const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop'); ////console.log(wp.data.select('my-shop').getBreakPoint('food'))
////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("post-grid/post-author", {
  title: "Post Author",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("path", {
      d: "M10 4.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm2.25 7.5v-1A2.75 2.75 0 0011 8.25H7A2.75 2.75 0 004.25 11v1h1.5v-1c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v1h1.5zM4 20h9v-1.5H4V20zm16-4H4v-1.5h16V16z",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        tag: 'h2',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    elements: {
      "type": "object",
      "default": {
        items: [{
          id: 'avatar',
          name: "Avatar",
          active: true
        }, {
          id: 'name',
          name: "Name",
          active: true
        }, {
          id: 'description',
          name: "Description",
          active: false
        }]
      } // avatar, name, description, id

    },
    avatar: {
      "type": "object",
      "default": {
        class: 'avatar',
        size: '48',
        default: '',
        display: {},
        padding: {},
        margin: {}
      }
    },
    name: {
      "type": "object",
      "default": {
        class: 'name',
        prefix: '',
        postfix: '',
        linkTo: '',
        display: {},
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    description: {
      "type": "object",
      "default": {
        class: 'description',
        prefix: '',
        postfix: '',
        display: {},
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": {
        items: {}
      }
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var wrapper = attributes.wrapper;
    var elements = attributes.elements;
    var avatar = attributes.avatar;
    var description = attributes.description;
    var name = attributes.name;
    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(myStore.getLicense());
    const [postAuthor, setPostAuthor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)({});
    const [html, setHtml] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)({});
    const [postAuthorId, setPostAuthorId] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'author', postId);
    const [currentPostUrl, setCurrentPostUrl] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'link', postId);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/wp/v2/users/' + postAuthorId,
        method: 'GET'
      }).then(res => {
        //console.log(res)
        setPostAuthor(res);
      });
    }, [postAuthorId]);

    function generatehtml() {
      var nameHtml = postAuthor.name != undefined ? postAuthor.name : 'Author Name';

      if (name.linkTo == 'postUrl') {
        nameHtml = `<a href="${currentPostUrl}">${postAuthor.name != undefined ? postAuthor.name : 'Author Name'}</a>`;
      }

      if (name.linkTo == 'authorUrl') {
        nameHtml = `<a href="${postAuthor.url}">${postAuthor.name != undefined ? postAuthor.name : 'Author Name'}</a>`;
      }

      if (name.linkTo == 'authorLink') {
        nameHtml = `<a href="${postAuthor.link}">${postAuthor.name != undefined ? postAuthor.name : 'Author Name'}</a>`;
      }

      if (name.linkTo == 'authorMeta') {
        nameHtml = `<a href="${postAuthor.link}">${postAuthor.name != undefined ? postAuthor.name : 'Author Name'}</a>`;
      }

      if (name.linkTo == 'customUrl') {
        nameHtml = `<a href="${name.customUrl}">${postAuthor.name != undefined ? postAuthor.name : 'Author Name'}</a>`;
      }

      html.name = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(RawHTML, {
        class: name.class
      }, nameHtml ? nameHtml : 'Author Name');
      html.description = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(RawHTML, {
        class: description.class
      }, postAuthor.description != undefined ? postAuthor.description : 'Author description');

      if (postAuthor.avatar_urls != undefined) {
        var avatarHtml = `<img class='${avatar.class}' alt='' src=${postAuthor.avatar_urls != undefined ? postAuthor.avatar_urls[avatar.size] : ''} />`;
        html.avatar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(RawHTML, {
          class: avatar.class
        }, avatarHtml);
      }

      setHtml(html);
    }

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      generatehtml();
    }, [postAuthor]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      generatehtml();
    }, [name]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      generatehtml();
    }, [description]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      console.log(avatar);
      generatehtml();
      console.log(html);
    }, [avatar]); // Wrapper CSS Class Selectors

    const authorWrapperSelector = '.pg-postAuthor';
    const authorNameSelector = '.pg-postAuthor .name';
    const authorDescriptionSelector = '.pg-postAuthor .description';
    const authorAvatarSelector = '.pg-postAuthor .avatar';
    var breakPointList = [{
      label: 'Select..',
      icon: '',
      value: ''
    }];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = name.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        name: {
          class: name.class,
          postfix: name.postfix,
          prefix: name.prefix,
          linkTo: name.linkTo,
          linkToMeta: name.linkToMeta,
          customUrl: name.customUrl,
          display: name.display,
          color: name.color,
          bgColor: name.bgColor,
          padding: responsive,
          margin: name.margin
        }
      });
      blockCssY.items[authorNameSelector] = blockCssY.items[authorNameSelector] != undefined ? blockCssY.items[authorNameSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[authorNameSelector]['padding-top'] != undefined ? blockCssY.items[authorNameSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[authorNameSelector]['padding-right'] != undefined ? blockCssY.items[authorNameSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[authorNameSelector]['padding-bottom'] != undefined ? blockCssY.items[authorNameSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[authorNameSelector]['padding-left'] != undefined ? blockCssY.items[authorNameSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = name.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        name: {
          class: name.class,
          postfix: name.postfix,
          prefix: name.prefix,
          linkTo: name.linkTo,
          linkToMeta: name.linkToMeta,
          customUrl: name.customUrl,
          display: name.display,
          color: name.color,
          bgColor: name.bgColor,
          padding: name.padding,
          margin: responsive
        }
      });
      blockCssY.items[authorNameSelector] = blockCssY.items[authorNameSelector] != undefined ? blockCssY.items[authorNameSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[authorNameSelector]['margin-top'] != undefined ? blockCssY.items[authorNameSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[authorNameSelector]['margin-right'] !== undefined ? blockCssY.items[authorNameSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[authorNameSelector]['margin-bottom'] !== undefined ? blockCssY.items[authorNameSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[authorNameSelector]['margin-left'] !== undefined ? blockCssY.items[authorNameSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postAuthor");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postAuthor").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postAuthor"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postAuthor');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postAuthor");

        if (divWrap != undefined) {
          document.getElementById("css-block-postAuthor").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postAuthor"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postAuthor');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      //console.log('Listening blockCss: ', blockCss);
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
      linkAttrObj();
    }, [linkAttr]);

    var linkAttrObj = () => {
      var sdsd = {};
      linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      });
      setlinkAttrItems(sdsd); //return sdsd;
    };

    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }]; //const [blockCss, setBlockCss] = useState({ items: {} });

    const [setSome, setSomeState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)({});
    const [stateX, setStateX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)('Old Value');
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    const CustomTag = `${wrapper.tag}`;

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.BlockControls, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "px-3",
      title: "General",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Wrapper Tag"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: wrapper.tag,
      options: [{
        label: 'No Wrapper',
        value: ''
      }, {
        label: 'H1',
        value: 'h1'
      }, {
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'span',
        value: 'SPAN'
      }, {
        label: 'div',
        value: 'DIV'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: newVal => {
        {
          setAttributes({
            wrapper: {
              textAlign: wrapper.textAlign,
              tag: newVal,
              color: wrapper.color,
              bgColor: wrapper.bgColor,
              padding: wrapper.padding,
              margin: wrapper.margin
            }
          });
        }
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Elements",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__.ReactSortable, {
      list: elements.items,
      setList: item => {
        setAttributes({
          elements: {
            items: item
          }
        });
      }
    }, elements.items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      key: item.id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
      label: item.name,
      help: '',
      checked: item.active ? true : false,
      onChange: e => {
        //console.log(item.active);
        var isActive = elements.items[index].active ? false : true;
        elements.items[index].active = isActive; //console.log(elements.items[index]);

        setAttributes({
          elements: {
            items: elements.items
          }
        });
      }
    }))))), elements.items.find(x => x.name === 'Avatar').active && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Avatar",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Avatar Size"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: avatar.size,
      options: [{
        label: 'Select..',
        value: ''
      }, {
        label: '24',
        value: '24'
      }, {
        label: '48',
        value: '48'
      }, {
        label: '96',
        value: '96'
      }],
      onChange: newVal => {
        setAttributes({
          avatar: {
            class: avatar.class,
            size: newVal,
            default: avatar.default,
            display: avatar.display,
            padding: avatar.padding,
            margin: avatar.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Avatar Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: avatar.class,
      onChange: newVal => {
        setAttributes({
          avatar: {
            class: newVal,
            size: avatar.size,
            default: avatar.default,
            display: avatar.display,
            padding: avatar.padding,
            margin: avatar.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", null, "Display"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: avatar.display[breakPointX],
      options: [{
        label: 'Select..',
        value: ''
      }, {
        label: 'inline',
        value: 'inline'
      }, {
        label: 'inline-block',
        value: 'inline-block'
      }, {
        label: 'block',
        value: 'block'
      }],
      onChange: newVal => {
        var responsive = avatar.display;
        responsive[breakPointX] = newVal;
        setAttributes({
          avatar: {
            class: avatar.class,
            size: avatar.size,
            default: avatar.default,
            display: responsive,
            padding: avatar.padding,
            margin: avatar.margin
          }
        });
        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector],
          'display': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }))), elements.items.find(x => x.name === 'Name').active && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Name",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Name Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: name.class,
      onChange: newVal => {
        setAttributes({
          name: {
            class: newVal,
            postfix: name.postfix,
            prefix: name.prefix,
            linkTo: name.linkTo,
            linkToMeta: name.linkToMeta,
            customUrl: name.customUrl,
            display: name.display,
            color: name.color,
            bgColor: name.bgColor,
            padding: name.padding,
            margin: name.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Link To"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: name.linkTo,
      options: [{
        label: 'Select..',
        value: ''
      }, {
        label: 'Post URL',
        value: 'postUrl'
      }, {
        label: 'Author URL',
        value: 'authorUrl'
      }, {
        label: 'Author Profile',
        value: 'authorLink'
      }, // { label: 'Author Meta', value: 'authorMeta' },
      {
        label: 'Custom URL',
        value: 'customUrl'
      }],
      onChange: newVal => {
        setAttributes({
          name: {
            class: name.class,
            prefix: name.prefix,
            postfix: name.postfix,
            linkTo: newVal,
            linkToMeta: name.linkToMeta,
            customUrl: name.customUrl,
            display: name.display,
            color: name.color,
            bgColor: name.bgColor,
            padding: name.padding,
            margin: name.margin
          }
        });
      }
    })), name.linkTo == 'authorMeta' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Link Meta Key"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: name.linkToMeta,
      onChange: newVal => {
        setAttributes({
          name: {
            class: name.class,
            postfix: name.postfix,
            prefix: name.prefix,
            linkTo: name.linkTo,
            linkToMeta: newVal,
            customUrl: name.customUrl,
            display: name.display,
            color: name.color,
            bgColor: name.bgColor,
            padding: name.padding,
            margin: name.margin
          }
        });
      }
    })), name.linkTo == 'customUrl' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Custom Url"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: name.customUrl,
      onChange: newVal => {
        setAttributes({
          name: {
            class: name.class,
            postfix: name.postfix,
            prefix: name.prefix,
            linkTo: name.linkTo,
            linkToMeta: name.linkToMeta,
            customUrl: name.customUrl,
            customUrl: newVal,
            display: name.display,
            color: name.color,
            bgColor: name.bgColor,
            padding: name.padding,
            margin: name.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", null, "Display"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "px-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: name.display[breakPointX],
      options: [{
        label: 'Select..',
        value: ''
      }, {
        label: 'inline',
        value: 'inline'
      }, {
        label: 'inline-block',
        value: 'inline-block'
      }, {
        label: 'block',
        value: 'block'
      }],
      onChange: newVal => {
        var responsive = name.display;
        responsive[breakPointX] = newVal;
        setAttributes({
          name: {
            class: name.class,
            prefix: name.prefix,
            postfix: name.postfix,
            linkTo: name.linkTo,
            linkToMeta: name.linkToMeta,
            customUrl: name.customUrl,
            display: responsive,
            color: name.color,
            bgColor: name.bgColor,
            padding: name.padding,
            margin: name.margin
          }
        });
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'display': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: name.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = name.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          name: {
            class: name.class,
            prefix: name.prefix,
            postfix: name.postfix,
            linkTo: name.linkTo,
            linkToMeta: name.linkToMeta,
            customUrl: name.customUrl,
            display: name.display,
            color: responsive,
            bgColor: name.bgColor,
            padding: name.padding,
            margin: name.margin
          }
        });
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: name.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = name.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          name: {
            class: name.class,
            prefix: name.prefix,
            postfix: name.postfix,
            linkTo: name.linkTo,
            linkToMeta: name.linkToMeta,
            customUrl: name.customUrl,
            display: name.display,
            color: name.color,
            bgColor: responsive,
            padding: name.padding,
            margin: name.margin
          }
        });
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: name.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: name.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), elements.items.find(x => x.name === 'Description').active && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Description",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
      for: ""
    }, "Description Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: description.class,
      onChange: newVal => {
        setAttributes({
          description: {
            class: newVal,
            postfix: description.postfix,
            prefix: description.prefix,
            display: name.display,
            color: description.color,
            bgColor: description.bgColor,
            padding: description.padding,
            margin: description.margin
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", {
      className: "font-bold"
    }, "Wrapper Selector"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("code", null, authorWrapperSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", {
      className: "font-bold"
    }, "Name Selector"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("code", null, authorNameSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", {
      className: "font-bold"
    }, "Description Selector"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("code", null, authorDescriptionSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", {
      className: "font-bold"
    }, "Avatar Selector "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("code", null, authorAvatarSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
      className: "pg-postAuthor"
    }, elements.items.map(x => {
      //console.log('ID: ' + x.id);
      //console.log(html[x.id]);
      return x.active && html[x.id];
    }))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-categories/index.js":
/*!*********************************************!*\
  !*** ./src/blocks/post-categories/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");














const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.registerBlockType)("post-grid/post-categories", {
  title: "Post Categories",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M20 4H4v1.5h16V4zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3zM4 9.5h9V8H4v1.5zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3z",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    items: {
      type: 'object',
      default: {
        prefix: '',
        postfix: '',
        maxCount: 99,
        postCount: false,
        class: 'item inline-block',
        linkTarget: '',
        linkAttr: [],
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    separator: {
      type: 'object',
      default: {
        class: 'inline-block',
        text: ', ',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    frontText: {
      type: 'object',
      default: {
        text: 'Categories: ',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;
    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;
    var blockCssY = attributes.blockCssY;
    var customCss = attributes.customCss;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense()); // Wrapper CSS Class Selectors

    const itemWrapSelector = '.pg-postCategories';
    const itemSelector = '.pg-postCategories .item';
    const itemSeparatorSelector = '.pg-postCategories .separator';
    const frontTextSelector = '.pg-postCategories .frontText';
    const postCountSelector = '.pg-postCategories .postCount';
    var breakPointList = [];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = items.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: responsive,
          margin: items.margin
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[itemSelector]['padding-top'] != undefined ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[itemSelector]['padding-right'] != undefined ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[itemSelector]['padding-bottom'] != undefined ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[itemSelector]['padding-left'] != undefined ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = items.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: items.padding,
          margin: responsive
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[itemSelector]['margin-top'] != undefined ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[itemSelector]['margin-right'] !== undefined ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[itemSelector]['margin-bottom'] !== undefined ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[itemSelector]['margin-left'] !== undefined ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    const [categoryCount, setcategoryCount] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0); // Using the hook.

    const [postCategoriesData, setPostCategoriesData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.

    const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.

    const [postCategoriesX, setPostCategoriesX] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', postType, 'categories', postId);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      console.log('Listening postCategoriesX: ', postCategoriesX);
      setPostCategoriesData([]);
      setCategories([]);
      setcategoryCount(categories.length - 1);

      for (x in postCategoriesX) {
        var catId = postCategoriesX[x];
        console.log(x);
        var assd = x;

        if (x) {
          _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
            path: '/wp/v2/categories/' + catId,
            method: 'GET'
          }).then(res => {
            //console.log(res)
            setPostCategoriesData(current => [...current, res]);
            console.log(assd);
            setCategories(current => [...current, res]);
          });
        }
      }

      console.log(postCategoriesData);
    }, [postCategoriesX]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      var asdasd = postCategoriesData.slice(0, items.maxCount);
      setCategories(asdasd);
    }, [postCategoriesData]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      if (postCategoriesX.length > 0) {
        setcategoryCount(categories.length - 1);
        var asdasd = postCategoriesData.slice(0, items.maxCount);
        setCategories(asdasd);
      }
    }, [items]);

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postCategories');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      //console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
      generateBlockCssY();
    }, [items]);

    var linkAttrObj = () => {
      var sdsd = {};
      items.linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      });
      setlinkAttrItems(sdsd); //return sdsd;
    }; //console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }];
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    const post = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => select('core').getEntityRecord('postType', context['postType'], context['postId']));
    const termstaxonomy = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category', [4, 5])); //console.log('Hello');
    //console.log(post);

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      //console.log(x);
      //console.log(index);
      //console.log('Post Title');
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.AlignmentToolbar, {
      value: wrapper.textAlign,
      onChange: nextAlign => {
        setAttributes({
          wrapper: {
            textAlign: nextAlign,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Items Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: wrapper.class,
      onChange: newVal => {
        setAttributes({
          wrapper: {
            textAlign: wrapper.textAlign,
            class: newVal,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Items",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
      label: "Display Post Count",
      help: items.postCount ? 'Post Count Enabled' : 'Post Count Disabled',
      checked: items.postCount ? true : false,
      onChange: e => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount ? false : true,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Item Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.class,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: newVal,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Max Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.maxCount,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: newVal,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: items.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: newVal,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.prefix,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: newVal,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.postfix,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: newVal,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = items.linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: sdsd,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
        linkAttrObj();
      }
    }, "Add")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, items.linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
        className: "mr-2",
        value: items.linkAttr[i].id,
        onChange: newVal => {
          items.linkAttr[i].id = newVal;
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          items.linkAttr[i].val = newVal;
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          items.linkAttr.splice(i, 1);
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: items.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = items.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: responsive,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          color: responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: items.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = items.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: responsive,
            padding: items.padding,
            margin: items.margin
          }
        });
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: items.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: items.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Front Text",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: frontText.text,
      onChange: newVal => setAttributes({
        frontText: {
          text: newVal,
          color: frontText.color,
          bgColor: frontText.bgColor,
          padding: frontText.padding,
          margin: frontText.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Separator",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: separator.text,
      onChange: newVal => setAttributes({
        separator: {
          text: newVal,
          color: separator.color,
          bgColor: separator.bgColor,
          padding: separator.padding,
          margin: separator.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Items Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemWrapSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Caetgory Items"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemSelector, '{}', " ")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, ".pg-postCategories a", '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemSeparatorSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, frontTextSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Post Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, postCountSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-5"
    }), categories.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Spinner, null), categories.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "pg-postCategories"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "frontText inline-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, frontText.text)), categories.map((x, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        target: items.linkTarget,
        title: x.name
      }, linkAttrItems, {
        className: items.class,
        href: x.link
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, items.prefix, x.name, items.postfix), items.postCount == true && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "postCount"
      }, "(", x.count, ")"), categoryCount != index && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "separator"
      }, separator.text));
    })))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-excerpt/index.js":
/*!******************************************!*\
  !*** ./src/blocks/post-excerpt/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");













const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop'); ////console.log(wp.data.select('my-shop').getBreakPoint('food'))
//console.log(myStore.getBreakPoint());
////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)("post-grid/post-excerpt", {
  title: "Post Excerpt",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M12.75 9.333c0 .521-.102.977-.327 1.354-.23.386-.555.628-.893.774-.545.234-1.183.227-1.544.222l-.12-.001v-1.5h.123c.414.001.715.002.948-.099a.395.395 0 00.199-.166c.05-.083.114-.253.114-.584V7.2H8.8V4h3.95v5.333zM7.95 9.333c0 .521-.102.977-.327 1.354-.23.386-.555.628-.893.774-.545.234-1.183.227-1.544.222l-.12-.001v-1.5h.123c.414.001.715.002.948-.099a.394.394 0 00.198-.166c.05-.083.115-.253.115-.584V7.2H4V4h3.95v5.333zM13 20H4v-1.5h9V20zM20 16H4v-1.5h16V16z"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        tag: 'p',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    postExcerpt: {
      type: 'object',
      default: {
        text: '',
        isLink: true,
        linkTarget: '',
        customUrl: '',
        linkAttr: [],
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    readMore: {
      "type": "object",
      "default": {
        text: 'Read More',
        isLink: true,
        linkTarget: '',
        customUrl: '',
        linkAttr: [],
        class: '',
        color: {},
        bgColor: {}
      }
    },
    prefix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    postfix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var postExcerpt = attributes.postExcerpt;
    var wrapper = attributes.wrapper;
    var readMore = attributes.readMore;
    var linkAttr = attributes.linkAttr;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense());
    const [currentPostTitle, setCurrentPostTitle] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'excerpt', postId);
    const [currentPostUrl, setCurrentPostUrl] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'link', postId); //console.log(postExcerpt);
    // Wrapper CSS Class Selectors

    const excerptWrapperSelector = '.pg-postExcerpt';
    const excerptSelector = postExcerpt.isLink ? '.pg-postExcerpt a' : '.pg-postExcerpt';
    const redmoreSelector = '.pg-postExcerpt .readmore';
    var breakPointList = [{
      label: 'Select..',
      icon: '',
      value: ''
    }];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = postExcerpt.padding;
      responsive[breakPointX] = nextValues;
      console.log(nextValues);
      console.log(responsive);
      setAttributes({
        postExcerpt: {
          text: postExcerpt.text,
          isLink: postExcerpt.isLink,
          linkTarget: postExcerpt.linkTarget,
          customUrl: postExcerpt.customUrl,
          linkAttr: postExcerpt.linkAttr,
          class: postExcerpt.class,
          color: postExcerpt.color,
          bgColor: postExcerpt.bgColor,
          padding: responsive,
          margin: postExcerpt.margin
        }
      });
      blockCssY.items[excerptSelector] = blockCssY.items[excerptSelector] != undefined ? blockCssY.items[excerptSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[excerptSelector]['padding-top'] != undefined ? blockCssY.items[excerptSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[excerptSelector]['padding-right'] != undefined ? blockCssY.items[excerptSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[excerptSelector]['padding-bottom'] != undefined ? blockCssY.items[excerptSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[excerptSelector]['padding-left'] != undefined ? blockCssY.items[excerptSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = postExcerpt.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        postExcerpt: {
          text: postExcerpt.text,
          isLink: postExcerpt.isLink,
          linkTarget: postExcerpt.linkTarget,
          customUrl: postExcerpt.customUrl,
          linkAttr: postExcerpt.linkAttr,
          class: postExcerpt.class,
          color: postExcerpt.color,
          bgColor: postExcerpt.bgColor,
          padding: postExcerpt.padding,
          margin: responsive
        }
      });
      blockCssY.items[excerptSelector] = blockCssY.items[excerptSelector] != undefined ? blockCssY.items[excerptSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[excerptSelector]['margin-top'] != undefined ? blockCssY.items[excerptSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[excerptSelector]['margin-right'] !== undefined ? blockCssY.items[excerptSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[excerptSelector]['margin-bottom'] !== undefined ? blockCssY.items[excerptSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[excerptSelector]['margin-left'] !== undefined ? blockCssY.items[excerptSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postCategories');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      console.log('Listening currentPostTitle: ', currentPostTitle);
    }, [currentPostTitle]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      ////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
    }, [linkAttr]);

    var linkAttrObj = () => {
      var sdsd = {};
      linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      }); ////console.log(sdsd);

      setlinkAttrItems(sdsd); //return sdsd;
    }; ////console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }];
    const [setSome, setSomeState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [stateX, setStateX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('Old Value');
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    var postUrl = postExcerpt.customUrl != undefined && postExcerpt.customUrl.length > 0 ? postExcerpt.customUrl : currentPostUrl; //console.log('Hello');

    const CustomTag = `${wrapper.tag}`;

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.AlignmentToolbar, {
      value: postExcerpt.textAlign,
      onChange: nextAlign => {
        setAttributes({
          postExcerpt: {
            textAlign: nextAlign,
            isLink: postExcerpt.isLink,
            linkTarget: postExcerpt.linkTarget,
            customUrl: postExcerpt.customUrl,
            class: postExcerpt.class,
            color: postExcerpt.color,
            bgColor: postExcerpt.bgColor,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "px-3",
      title: "General",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Tag"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: wrapper.tag,
      options: [{
        label: 'No Wrapper',
        value: ''
      }, {
        label: 'H1',
        value: 'h1'
      }, {
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'span',
        value: 'SPAN'
      }, {
        label: 'div',
        value: 'DIV'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: newVal => {
        {
          setAttributes({
            wrapper: {
              textAlign: wrapper.textAlign,
              tag: newVal,
              color: wrapper.color,
              bgColor: wrapper.bgColor,
              padding: wrapper.padding,
              margin: wrapper.margin
            }
          });
        }
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Post Excerpt",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
      label: "Linked with post?",
      help: postExcerpt.isLink ? 'Linked with post URL' : 'Not linked to post URL.',
      checked: postExcerpt.isLink ? true : false,
      onChange: e => {
        setAttributes({
          postExcerpt: {
            text: postExcerpt.text,
            isLink: postExcerpt.isLink ? false : true,
            linkTarget: postExcerpt.linkTarget,
            customUrl: postExcerpt.customUrl,
            linkAttr: postExcerpt.linkAttr,
            class: postExcerpt.class,
            color: postExcerpt.color,
            bgColor: postExcerpt.bgColor,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
      }
    }), readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: readMore.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          postExcerpt: {
            text: postExcerpt.text,
            isLink: postExcerpt.isLink,
            linkTarget: newVal,
            customUrl: postExcerpt.customUrl,
            linkAttr: postExcerpt.linkAttr,
            class: postExcerpt.class,
            color: postExcerpt.color,
            bgColor: postExcerpt.bgColor,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Url"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postExcerpt.customUrl,
      onChange: newVal => {
        setAttributes({
          postExcerpt: {
            text: postExcerpt.text,
            isLink: postExcerpt.isLink,
            linkTarget: postExcerpt.linkTarget,
            customUrl: newVal,
            linkAttr: postExcerpt.linkAttr,
            class: postExcerpt.class,
            color: postExcerpt.color,
            bgColor: postExcerpt.bgColor,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = postExcerpt.linkAttr != undefined ? postExcerpt.linkAttr.concat({
          id: '',
          val: ''
        }) : [];
        setAttributes({
          postExcerpt: {
            text: postExcerpt.text,
            isLink: postExcerpt.isLink,
            linkTarget: postExcerpt.linkTarget,
            customUrl: postExcerpt.customUrl,
            linkAttr: sdsd,
            class: postExcerpt.class,
            color: postExcerpt.color,
            bgColor: postExcerpt.bgColor,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
        linkAttrObj();
      }
    }, "Add")), postExcerpt.linkAttr != undefined && postExcerpt.linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: postExcerpt.linkAttr[i].id,
        onChange: newVal => {
          postExcerpt.linkAttr[i].id = newVal;
          var ssdsd = postExcerpt.linkAttr.concat([]);
          setAttributes({
            postExcerpt: {
              text: postExcerpt.text,
              isLink: postExcerpt.isLink,
              linkTarget: postExcerpt.linkTarget,
              customUrl: postExcerpt.customUrl,
              linkAttr: ssdsd,
              class: postExcerpt.class,
              color: postExcerpt.color,
              bgColor: postExcerpt.bgColor,
              padding: postExcerpt.padding,
              margin: postExcerpt.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          postExcerpt.linkAttr[i].val = newVal;
          var ssdsd = postExcerpt.linkAttr.concat([]);
          setAttributes({
            postExcerpt: {
              text: postExcerpt.text,
              isLink: postExcerpt.isLink,
              linkTarget: postExcerpt.linkTarget,
              customUrl: postExcerpt.customUrl,
              linkAttr: ssdsd,
              class: postExcerpt.class,
              color: postExcerpt.color,
              bgColor: postExcerpt.bgColor,
              padding: postExcerpt.padding,
              margin: postExcerpt.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          postExcerpt.linkAttr.splice(i, 1);
          var ssdsd = postExcerpt.linkAttr.concat([]);
          setAttributes({
            postExcerpt: {
              text: postExcerpt.text,
              isLink: postExcerpt.isLink,
              linkTarget: postExcerpt.linkTarget,
              customUrl: postExcerpt.customUrl,
              linkAttr: ssdsd,
              class: postExcerpt.class,
              color: postExcerpt.color,
              bgColor: postExcerpt.bgColor,
              padding: postExcerpt.padding,
              margin: postExcerpt.margin
            }
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: postExcerpt.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = postExcerpt.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          postExcerpt: {
            text: postExcerpt.text,
            isLink: postExcerpt.isLink,
            linkTarget: postExcerpt.linkTarget,
            customUrl: postExcerpt.customUrl,
            linkAttr: postExcerpt.linkAttr,
            class: postExcerpt.class,
            color: responsive,
            bgColor: postExcerpt.bgColor,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: postExcerpt.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = postExcerpt.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          postExcerpt: {
            text: postExcerpt.text,
            isLink: postExcerpt.isLink,
            linkTarget: postExcerpt.linkTarget,
            customUrl: postExcerpt.customUrl,
            linkAttr: postExcerpt.linkAttr,
            class: postExcerpt.class,
            color: postExcerpt.color,
            bgColor: responsive,
            padding: postExcerpt.padding,
            margin: postExcerpt.margin
          }
        });
        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: postExcerpt.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Read More",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Read More Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: readMore.text,
      onChange: newVal => {
        setAttributes({
          readMore: {
            text: newVal,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            linkAttr: readMore.linkAttr,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
      label: "Linked with post?",
      help: readMore.isLink ? 'Linked with post URL' : 'Not linked to post URL.',
      checked: readMore.isLink ? true : false,
      onChange: e => {
        setAttributes({
          readMore: {
            text: readMore.text,
            isLink: readMore.isLink ? false : true,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            linkAttr: readMore.linkAttr,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor
          }
        });
      }
    }), readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: readMore.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          readMore: {
            text: readMore.text,
            isLink: readMore.isLink,
            linkTarget: newVal,
            customUrl: readMore.customUrl,
            linkAttr: readMore.linkAttr,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Url"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: readMore.customUrl,
      onChange: newVal => {
        setAttributes({
          readMore: {
            text: readMore.text,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: newVal,
            linkAttr: readMore.linkAttr,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = readMore.linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          readMore: {
            text: readMore.text,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            linkAttr: sdsd,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor
          }
        });
        linkAttrObj();
      }
    }, "Add")), readMore.linkAttr != undefined && readMore.linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: readMore.linkAttr[i].id,
        onChange: newVal => {
          readMore.linkAttr[i].id = newVal;
          var ssdsd = readMore.linkAttr.concat([]);
          setAttributes({
            readMore: {
              text: readMore.text,
              isLink: readMore.isLink,
              linkTarget: readMore.linkTarget,
              customUrl: readMore.customUrl,
              linkAttr: ssdsd,
              class: readMore.class,
              color: readMore.color,
              bgColor: readMore.bgColor
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          readMore.linkAttr[i].val = newVal;
          var ssdsd = readMore.linkAttr.concat([]);
          setAttributes({
            readMore: {
              text: readMore.text,
              isLink: readMore.isLink,
              linkTarget: readMore.linkTarget,
              customUrl: readMore.customUrl,
              linkAttr: ssdsd,
              class: readMore.class,
              color: readMore.color,
              bgColor: readMore.bgColor
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          readMore.linkAttr.splice(i, 1);
          var ssdsd = readMore.linkAttr.concat([]);
          setAttributes({
            readMore: {
              text: readMore.text,
              isLink: readMore.isLink,
              linkTarget: readMore.linkTarget,
              customUrl: readMore.customUrl,
              linkAttr: ssdsd,
              class: readMore.class,
              color: readMore.color,
              bgColor: readMore.bgColor
            }
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: readMore.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = readMore.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          readMore: {
            text: readMore.text,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            linkAttr: readMore.linkAttr,
            class: readMore.class,
            color: responsive,
            bgColor: readMore.bgColor
          }
        });
        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector],
          'color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: readMore.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = readMore.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          readMore: {
            text: readMore.text,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            linkAttr: readMore.linkAttr,
            class: readMore.class,
            color: readMore.color,
            bgColor: responsive
          }
        });
        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Prefix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: prefix.text,
      onChange: newVal => {
        setAttributes({
          prefix: {
            text: newVal,
            class: prefix.class,
            color: prefix.color,
            bgColor: prefix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Postfix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postfix.text,
      onChange: newVal => {
        setAttributes({
          postfix: {
            text: newVal,
            class: prefix.class,
            color: postfix.color,
            bgColor: postfix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Excerpt Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, excerptWrapperSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Excerpt - With Link"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, excerptSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Read More"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, redmoreSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "###############", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, JSON.stringify(postExcerpt.padding[breakPointX])), "###############", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, JSON.stringify(postExcerpt)), wrapper.tag && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(CustomTag, {
      className: ['pg-postExcerpt']
    }, postExcerpt.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: ""
    }, linkAttrItems, {
      href: postUrl
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.class
    }, prefix.text), currentPostTitle, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.class
    }, postfix.text)), !postExcerpt.isLink && currentPostTitle, readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
      className: "readmore",
      target: postExcerpt.linkTarget,
      href: postUrl
    }, " ", readMore.text)), wrapper.tag.length == 0 && postExcerpt.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: ['pg-postExcerpt']
    }, linkAttrItems, {
      href: postUrl,
      target: postExcerpt.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), currentPostTitle, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)), wrapper.tag.length == 0 && !postExcerpt.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: 'pg-postExcerpt'
    }, prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), currentPostTitle, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-grid/index.js":
/*!***************************************!*\
  !*** ./src/blocks/post-grid/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _queryprams__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../queryprams */ "./src/queryprams.js");




const {
  select,
  subscribe
} = wp.data;


const {
  parse
} = wp.blockSerializationDefaultParser;
const {
  RawHTML
} = wp.element;








const ALLOWED_MEDIA_TYPES = ['image']; //var el = element.createElement;
//////console.log(breakPoints);


 //////console.log(queryPrams);

var queryPramsX = _queryprams__WEBPACK_IMPORTED_MODULE_10__["default"].map((x, i) => {
  return {
    value: i,
    label: x.label
  };
}); // wp.apiFetch({ path: '/wp/v2/categories?per_page=100' })
//     .then(terms => //console.log(terms));
////console.log(queryPramsX);

const CustomCss = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div`
display: grid;
grid-template-columns: ${props => {
  return props.cssData.grid.gridTemplateColumns.map(item => {
    return item.val + item.unit + ' ';
  });
}};
grid-template-rows: ${props => {
  return props.cssData.grid.gridTemplateRows.map(item => {
    return item.val + item.unit + ' ';
  });
}};
column-gap: ${props => {
  return props.cssData.grid.colGap.val + props.cssData.grid.colGap.unit;
}};
row-gap: ${props => {
  return props.cssData.grid.rowGap.val + props.cssData.grid.rowGap.unit;
}};

`; // const CustomCss = styled.div`
// `;

const CustomCssItem = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div`

`;
const ContainerCss = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div`
padding: ${props => {
  return props.cssData.container.padding.val + props.cssData.container.padding.unit;
}};
margin: ${props => {
  return props.cssData.container.margin.val + props.cssData.container.margin.unit;
}};
background-color: ${props => {
  return props.cssData.container.bgColor;
}};
background-image: ${props => {
  return 'url(' + props.cssData.container.bgImg.url + ')';
}};
`;
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("post-grid/post-grid", {
  title: "Post Grid",
  icon: {
    background: '#7e70af',
    foreground: '#fff',
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.0",
      width: "512.000000pt",
      height: "512.000000pt",
      viewBox: "0 0 512.000000 512.000000",
      preserveAspectRatio: "xMidYMid meet"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("metadata", null, "Created by potrace 1.16, written by Peter Selinger 2001-2019"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("g", {
      transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)",
      stroke: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("path", {
      d: "M552 4620 c-18 -11 -41 -34 -52 -52 -19 -32 -20 -52 -20 -674 l0 -641 23 -33 c12 -18 35 -43 50 -54 28 -21 35 -21 821 -24 l792 -2 44 23 c30 16 51 37 67 67 l23 44 -2 632 c-3 624 -3 633 -24 661 -11 15 -36 38 -54 51 l-33 22 -801 0 c-782 0 -802 -1 -834 -20z m1418 -725 l0 -425 -585 0 -585 0 0 425 0 425 585 0 585 0 0 -425z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("path", {
      d: "M2915 4630 c-28 -11 -72 -60 -84 -93 -8 -19 -11 -328 -11 -966 l0 -938 23 -43 c16 -30 37 -51 67 -67 l44 -23 792 2 c786 3 793 3 821 24 15 11 38 36 51 54 l22 33 0 961 c0 941 0 962 -20 994 -11 18 -34 41 -52 52 -32 19 -52 20 -833 19 -440 0 -809 -4 -820 -9z m1405 -1055 l0 -745 -585 0 -585 0 0 745 0 745 585 0 585 0 0 -745z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("path", {
      d: "M580 2609 c-14 -6 -36 -20 -48 -32 -54 -51 -52 -2 -52 -1034 0 -938 0 -959 20 -991 11 -18 34 -41 52 -52 32 -19 52 -20 834 -20 l801 0 33 23 c18 12 43 35 54 50 21 28 21 32 24 981 l2 952 -23 44 c-16 30 -37 51 -67 67 l-43 23 -781 -1 c-494 0 -790 -4 -806 -10z m1390 -1064 l0 -745 -585 0 -585 0 0 745 0 745 585 0 585 0 0 -745z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("path", {
      d: "M2910 1958 c-33 -17 -51 -35 -68 -68 l-22 -45 2 -632 c3 -623 3 -632 24 -660 11 -15 36 -38 54 -50 l33 -23 801 0 c782 0 802 1 834 20 18 11 41 34 52 52 19 32 20 52 20 674 l0 641 -22 33 c-13 18 -36 43 -51 54 -28 21 -35 21 -820 24 l-792 2 -45 -22z m1410 -733 l0 -425 -585 0 -585 0 0 425 0 425 585 0 585 0 0 -425z"
    })))
  },
  attributes: {
    lazyLoad: {
      type: 'object',
      default: {
        enable: 'no',
        srcUrl: '',
        srcId: ''
      }
    },
    pagination: {
      type: 'object',
      default: {
        type: '',
        maxPageNum: '',
        prevText: '',
        nextText: '',
        fontSize: '',
        textColor: '',
        hoverColor: '',
        bgColor: '',
        bgActiveColor: '',
        loadMoreText: 'Load More',
        loadingIcon: ''
      }
    },
    search: {
      type: 'object',
      default: {
        enable: 'no',
        type: '',
        placeholder: '',
        icon: '',
        busyIcon: ''
      }
    },
    container: {
      type: 'object',
      default: {
        padding: {
          val: '10',
          unit: 'px'
        },
        margin: {
          val: '10',
          unit: 'px'
        },
        bgColor: '',
        bgImg: {
          id: '',
          url: ''
        }
      }
    },
    itemContainer: {
      type: 'object',
      default: {
        height: '',
        bgColor: '',
        bgImg: '',
        margin: '',
        padding: ''
      }
    },
    grid: {
      type: 'object',
      default: {
        gridTemplateColumns: [{
          val: 1,
          unit: 'fr'
        }, {
          val: 1,
          unit: 'fr'
        }, {
          val: 1,
          unit: 'fr'
        }],
        gridTemplateRows: [{
          val: 1,
          unit: 'fr'
        }, {
          val: 1,
          unit: 'fr'
        }],
        colGap: {
          val: 1,
          unit: 'em'
        },
        rowGap: {
          val: 1,
          unit: 'em'
        },
        padding: {
          val: 1,
          unit: 'em'
        },
        itemCss: []
      }
    },
    layout: {
      type: 'object',
      default: {
        id: '',
        data: [{
          "blockName": "core/post-title",
          "attrs": {},
          "innerBlocks": [],
          "innerHTML": "",
          "innerContent": []
        }, {
          "blockName": null,
          "attrs": {},
          "innerBlocks": [],
          "innerHTML": "\n\n",
          "innerContent": ["\n\n"]
        }, {
          "blockName": "core/post-date",
          "attrs": {},
          "innerBlocks": [],
          "innerHTML": "",
          "innerContent": []
        }, {
          "blockName": null,
          "attrs": {},
          "innerBlocks": [],
          "innerHTML": "\n\n",
          "innerContent": ["\n\n"]
        }, {
          "blockName": "core/post-excerpt",
          "attrs": {
            "moreText": "",
            "textColor": "primary"
          },
          "innerBlocks": [],
          "innerHTML": "",
          "innerContent": []
        }],
        "rawData": "<!-- wp:post-title /-->\n\n<!-- wp:post-date /-->\n\n<!-- wp:post-excerpt {\"moreText\":\"\",\"textColor\":\"primary\"} /-->"
      }
    },
    postTypes: {
      type: 'array',
      default: []
    },
    scripts: {
      type: 'object',
      default: {
        js: '',
        css: ''
      }
    },
    queryArgs: {
      type: 'object',
      default: {
        items: [{
          val: ['post', 'product'],
          multiple: false,
          id: 'postType',
          label: 'Post Types',
          description: "Select Post Types to Query"
        }, {
          val: [],
          multiple: false,
          id: 'postStatus',
          label: 'Post status',
          description: "Query post by post status"
        }, {
          val: '',
          multiple: false,
          id: 'order',
          label: 'Order',
          description: "Post query order"
        }, {
          val: [],
          multiple: false,
          id: 'orderby',
          label: 'Orderby',
          description: "Post query orderby"
        }]
      }
    }
  },
  category: "post-grid",
  edit: function (props) {
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)();
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var lazyLoad = attributes.lazyLoad;
    var container = attributes.container;
    var pagination = attributes.pagination;
    var search = attributes.search;
    var grid = attributes.grid;
    var layout = attributes.layout;
    var queryArgs = attributes.queryArgs;
    var [debounce, setDebounce] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null); // Using the hook.

    const postQueryPresets = [{
      name: 'Latest Posts by Publish Date',
      key: 'preset1',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "DESC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["date"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Oldest Posts by Publish Date',
      key: 'preset2',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "ASC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["date"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Latest Posts by Modified Date',
      key: 'preset3',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "DESC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["modified"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Oldest Posts by Modified Date',
      key: 'preset4',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "ASC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["modified"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Alphabetical Order A-Z',
      key: 'preset5',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "ASC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["name"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Alphabetical Order Z-A',
      key: 'preset6',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "DESC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["name"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Most Commented Posts',
      key: 'preset7',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "DESC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["name"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }, {
      name: 'Random 10 Posts',
      key: 'preset8',
      value: {
        "items": [{
          "val": ["post"],
          "multiple": false,
          "id": "postType",
          "label": "Post Types",
          "description": "Select Post Types to Query"
        }, {
          "val": ["publish"],
          "multiple": false,
          "id": "postStatus",
          "label": "Post status",
          "description": "Query post by post status"
        }, {
          "val": "DESC",
          "multiple": false,
          "id": "order",
          "label": "Order",
          "description": "Post query order"
        }, {
          "val": ["rand"],
          "multiple": false,
          "id": "orderby",
          "label": "Orderby",
          "description": "Post query orderby"
        }, {
          "val": "10",
          "multiple": false,
          "id": "postsPerPage",
          "label": "Posts Per Page",
          "description": ""
        }]
      }
    }];
    var [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
      license_status: '',
      license_key: ''
    }); // Using the hook.

    function fetchLicenseInfo() {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/post-grid/v2/get_license',
        method: 'POST',
        data: {}
      }).then(res => {
        console.log(res);
        setLicense(res);
      });
    }

    function MyCustomSelectControl() {
      const [fontSize, setFontSize] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(postQueryPresets[0]);
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.CustomSelectControl, {
        className: "w-full",
        label: "Query Presets",
        options: postQueryPresets,
        onChange: newVal => {
          console.log(newVal.selectedItem);
          queryArgs.items = newVal.selectedItem.value.items;
          setAttributes({
            queryArgs: {
              items: queryArgs.items
            }
          });
          setFontSize(newVal.selectedItem);
          fetchPosts();
          console.log(postQueryPresets.find(option => option.key === fontSize.key));
        },
        value: postQueryPresets.find(option => option.key === fontSize.key)
      }));
    }

    const gridLayout = [{
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 1 Rows, 0 Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "0",
          "unit": "em"
        },
        "colGap": {
          "val": "0",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 1 Rows, 1EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "1",
          "unit": "em"
        },
        "colGap": {
          "val": "1",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 1 Rows, 2EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "2",
          "unit": "em"
        },
        "colGap": {
          "val": "2",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 1 Rows, 3EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "3",
          "unit": "em"
        },
        "colGap": {
          "val": "3",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 1 Rows, 3px Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "3",
          "unit": "px"
        },
        "colGap": {
          "val": "3",
          "unit": "px"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 1 Rows, 10px Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "10",
          "unit": "px"
        },
        "colGap": {
          "val": "10",
          "unit": "px"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '2 Col, 2 Rows, 1st Spec 10px Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": "60",
          "unit": "%"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "10",
          "unit": "px"
        },
        "colGap": {
          "val": "10",
          "unit": "px"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": [{
          "grid-column-start": "1",
          "grid-column-end": "",
          "grid-row-start": "1",
          "grid-row-end": "3"
        }]
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2 Rows, 0 Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "0",
          "unit": "em"
        },
        "colGap": {
          "val": "0",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2 Rows, 1EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "1",
          "unit": "em"
        },
        "colGap": {
          "val": "1",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2 Rows, 2EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "2",
          "unit": "em"
        },
        "colGap": {
          "val": "2",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2 Rows, 3EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "3",
          "unit": "em"
        },
        "colGap": {
          "val": "3",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2 Rows, 3px Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "3",
          "unit": "px"
        },
        "colGap": {
          "val": "3",
          "unit": "px"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2 Rows, 10px Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "10",
          "unit": "px"
        },
        "colGap": {
          "val": "10",
          "unit": "px"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": []
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2nd Large 1 Rows, 1EM Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": 1,
          "unit": "em"
        },
        "colGap": {
          "val": 1,
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": [{
          "grid-column-start": "",
          "grid-column-end": "",
          "grid-row-start": "",
          "grid-row-end": ""
        }, {
          "grid-column-start": "2",
          "grid-column-end": "4",
          "grid-row-start": "",
          "grid-row-end": ""
        }]
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 1st Large 2 Rows, 0 Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "0",
          "unit": "em"
        },
        "colGap": {
          "val": "0",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": [{
          "grid-column-start": "1",
          "grid-column-end": "3",
          "grid-row-start": "",
          "grid-row-end": ""
        }]
      }
    }, {
      thumb: 'http://localhost/wordpress/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png',
      title: '3 Col, 2th Large 2 Rows, 0 Gap',
      data: {
        "gridTemplateRows": [{
          "val": 1,
          "unit": "fr"
        }],
        "gridTemplateColumns": [{
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }, {
          "val": 1,
          "unit": "fr"
        }],
        "rowGap": {
          "val": "0",
          "unit": "em"
        },
        "colGap": {
          "val": "0",
          "unit": "em"
        },
        "padding": {
          "val": 1,
          "unit": "em"
        },
        "itemCss": [{
          "grid-column-start": "",
          "grid-column-end": "",
          "grid-row-start": "",
          "grid-row-end": ""
        }, {
          "grid-column-start": "2",
          "grid-column-end": "4",
          "grid-row-start": "",
          "grid-row-end": ""
        }]
      }
    }];
    const ItemNthCssadasdsada1 = `
<style>
.item{
background-color: red;
}
</style>`;
    var ItemNthCssadasd2 = grid.itemCss.map((x, i) => {
      return `<style>.item:nth-child(${i + 1}){grid-column-start: ${x['grid-column-start']};grid-column-end: ${x['grid-column-end']};grid-row-start: ${x['grid-row-start']};grid-row-end: ${x['grid-row-end']};}</style>`;
    }); //////console.log(queryArgs);

    const colors = [{
      name: 'red',
      color: '#f00'
    }, {
      name: 'white',
      color: '#fff'
    }, {
      name: 'blue',
      color: '#00f'
    }];
    var postTypes = [];
    const postTypesData = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__.store).getPostTypes({
      per_page: -1
    }), []);
    postTypesData !== null && postTypesData.map(x => {
      postTypes.push({
        value: x.slug,
        label: x.name
      });
    });
    const TEMPLATE = [['core/post-title'], ['core/post-date'], ['core/post-excerpt']]; //////console.log(postTypes);
    //setAttributes({ : 'Raju' });

    function PostTemplateInnerBlocks() {
      const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useInnerBlocksProps)({
        className: 'wp-block-post'
      }, {
        template: TEMPLATE
      });
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", innerBlocksProps);
    }

    function PostTemplateBlockPreview(_ref) {
      let {
        blocks,
        blockContextId,
        isHidden,
        setActiveBlockContextId
      } = _ref;
      const blockPreviewProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__experimentalUseBlockPreview)({
        blocks,
        props: {
          className: 'wp-block-post'
        }
      });

      const handleOnClick = () => {
        setActiveBlockContextId(blockContextId);
      };

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("li", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockPreviewProps, {
        tabIndex: 0 // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ,
        role: "button"
      }));
    }

    const MemoizedPostTemplateBlockPreview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.memo)(PostTemplateBlockPreview);

    function updateLazyLoadEnable(val) {
      setAttributes({
        lazyLoad: {
          enable: val,
          srcUrl: lazyLoad.srcUrl,
          srcId: lazyLoad.srcId
        }
      });
    }

    function generateDateQueryArgs(args) {}

    function updateLazyLoadsrcUrl(url, id) {
      setAttributes({
        lazyLoad: {
          enable: lazyLoad.enable,
          srcUrl: url,
          srcId: id
        }
      });
    }

    const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]); // Using the hook.

    const [postsQuery, setPostsQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false); // Using the hook.

    function fetchPosts() {
      setPostsQuery(true);
      var arg = queryArgs.items.map(item => {
        return {
          id: item.id,
          val: item.val
        };
      });
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/post-grid/v2/get_posts',
        method: 'POST',
        data: {
          queryArgs: arg,
          rawData: layout.rawData
        }
      }).then(res => {
        setPostsQuery(false);
        console.log(res);
        setPosts(res);
      });
    }

    function generateLayout(x, i) {
      var savedBlocks = layout.data;
      var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->"; // Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser

      var blocks = savedBlocks.length > 0 ? savedBlocks : parse(content); //console.log(x);

      var sss = blocks.map((block, i) => {
        if (block.blockName !== null) {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(RawHTML, null, block.innerBlocks.length > 0 ? recursInnerBlocksHtml(block.innerBlocks, i) : block.innerHTML);
        }
      });
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-gray-400 p-3 "
      }, x.post_title, sss);
    }

    function recursInnerBlocksHtml(blocks) {
      let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var xx = blocks.map((block, i) => {
        //console.log(block);
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(RawHTML, null, "2nd Block", block.innerBlocks.length > 0 ? block.innerHTML + recursInnerBlocksHtml(block.innerBlocks, i) : block.innerHTML);
      });
      return xx;
    }

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      console.log('Listening layout: ', layout);
      fetchPosts();
    }, [layout]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      console.log('Listening queryArgs: ', queryArgs);
      fetchPosts();
    }, [queryArgs]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      //console.log('Listening container: ', container);
      fetchLayouts();
      fetchLayoutData(); //console.log('asdasd');

      fetchLicenseInfo();
    }, [container]);

    function selectLayout(id, post_content) {
      var blocks = parse(post_content);
      setAttributes({
        layout: {
          id: id,
          data: blocks,
          rawData: post_content
        }
      }); //console.log(wp.data.select('core/block-editor').getBlocks());
      //wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(post_content));
      //wp.data.dispatch('core/notices').createNotice('success', 'Here is our notice!');
      // var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";
      // Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
      //var blocks = parse(content);
      //console.log(blocks)
    }

    const [queryLayouts, setQueryLayouts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
      keyword: '',
      page: 1,
      category: ''
    });
    var [layoutList, setLayoutList] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
      items: []
    });
    var [layoutData, setLayoutData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
      source: 'saved'
    });
    var [layoutLoading, setLayoutLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    var [layoutCats, setLayoutCats] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      console.log('Listening layoutData: ', layoutData);
      var keywordLength = queryLayouts.keyword.length;

      if (keywordLength != 0) {
        if (keywordLength >= 4) {
          fetchLayouts();
        } else {}
      } else {
        fetchLayouts();
      }
    }, [layoutData]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      console.log('Listening queryLayouts: ', queryLayouts);
      var keywordLength = queryLayouts.keyword.length;

      if (keywordLength != 0) {
        if (keywordLength >= 4) {
          fetchLayouts();
        } else {}
      } else {
        fetchLayouts();
      }
    }, [queryLayouts]);

    function fetchLayouts() {
      setLayoutLoading(true);

      if (layoutData.source == 'saved') {
        _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
          path: '/post-grid/v2/get_posts_layout',
          method: 'POST',
          data: {
            category: queryLayouts.category,
            page: queryLayouts.page,
            keyword: queryLayouts.keyword
          }
        }).then(res => {
          console.log(res);
          setLayoutList({
            items: res.posts
          });
          setLayoutCats(res.terms);
          setLayoutLoading(false);
        });
      } else {
        fetch("https://getpostgrid.com/wp-json/postlayout/v2/get_post_layouts?category=" + queryLayouts.category + "&page=" + queryLayouts.page + "&keyword=" + queryLayouts.keyword, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(response => {
          if (response.ok && response.status < 400) {
            response.json().then(data => {
              console.log(data);
              setLayoutList({
                items: data.posts
              });
              setLayoutCats(data.terms);
              setLayoutLoading(false);
            });
          }
        }).catch(error => {//this.saveAsStatus = 'error';
          // handle the error
        });
      }
    }

    function fetchLayoutData() {
      setQueryLayouts({
        keyword: queryLayouts.keyword,
        page: queryLayouts.page,
        category: queryLayouts.category
      });
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/post-grid/v2/get_posts_layout',
        method: 'POST',
        data: {
          category: queryLayouts.category,
          source: queryLayouts.source,
          page: queryLayouts.page,
          keyword: queryLayouts.keyword
        }
      }).then(res => {
        //console.log(res);
        setLayoutData({
          source: layoutData.source
        });
        setQueryLayouts({
          keyword: queryLayouts.keyword,
          page: queryLayouts.page,
          category: queryLayouts.category
        });
      });
    }

    function generateQueryFieldAuthorIn(xx) {
      ////console.log(typeof xx);
      var xxts = [12, 24, 32];
      var xxt = [1, 2, 3].concat(xxts);
      return xxt.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, x);
      });
    }

    function removeQueryPram(i) {
      queryArgs.items.splice(i, 1);
      setAttributes({
        queryArgs: {
          items: queryArgs.items
        }
      });
    }

    function updateQueryPram(newVal, index) {
      ////console.log(index);
      ////console.log(newVal);
      var itemData = queryArgs.items[index];
      itemData.val = newVal;
      queryArgs.items[index] = itemData;
      setAttributes({
        queryArgs: {
          items: queryArgs.items
        }
      }); //console.log(queryArgs);

      fetchPosts(); // if (itemData.id == 's' || itemData.id == 'order'  ) {
      //     itemData.val = newVal;
      //     queryArgs.items[index] = itemData;
      //     setAttributes({ queryArgs: { items: queryArgs.items } });
      // }
      // if (itemData.id == 'postType' || itemData.id == 'orderby' || itemData.id == 'postStatus') {
      //     itemData.val = newVal;
      //     queryArgs.items[index] = itemData;
      //     setAttributes({ queryArgs: { items: queryArgs.items } });
      // }
      //queryArgs.items.splice(i, 1);
      ////console.log(queryArgs);
    }

    function generateQueryArgOptions(item, index) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: " "
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: item.label,
        initialOpen: false
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        onClick: ev => {
          removeQueryPram(index);
        },
        className: "cursor-pointer px-3 py-1 text-white bg-red-600 text-sm"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        className: "dashicon dashicons dashicons-no-alt"
      }), " Delete")), item.id == 'postType' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: item.id == 'postType' ? '' : 'hidden'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          height: '75px'
        },
        label: "",
        multiple: true,
        value: item.val,
        options: postTypes,
        onChange: newVal => updateQueryPram(newVal, index)
      })), item.id == 'postStatus' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: item.id == 'postStatus' ? '' : 'hidden'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          height: '75px'
        },
        label: "",
        multiple: true,
        value: item.val,
        options: [{
          label: 'Publish',
          value: 'publish'
        }, {
          label: 'Pending',
          value: 'pending'
        }, {
          label: 'Draft',
          value: 'draft'
        }, {
          label: 'Auto draft',
          value: 'auto-draft'
        }, {
          label: 'Future',
          value: 'future'
        }, {
          label: 'Private',
          value: 'private'
        }, {
          label: 'Inherit',
          value: 'inherit'
        }, {
          label: 'Trash',
          value: 'trash'
        }, {
          label: 'Any',
          value: 'any'
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), item.id == 'order' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: item.id == 'order' ? '' : 'hidden'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        value: item.val,
        options: [{
          label: 'Ascending',
          value: 'ASC'
        }, {
          label: 'Descending',
          value: 'DESC'
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), item.id == 'orderby' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: item.id == 'orderby' ? '' : 'hidden'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          height: '75px'
        },
        label: "",
        multiple: true,
        value: item.val,
        options: [{
          label: 'None',
          value: 'none'
        }, {
          label: 'ID',
          value: 'ID'
        }, {
          label: 'author',
          value: 'author'
        }, {
          label: 'title',
          value: 'title'
        }, {
          label: 'name',
          value: 'name'
        }, {
          label: 'type',
          value: 'type'
        }, {
          label: 'date',
          value: 'date'
        }, {
          label: 'modified',
          value: 'modified'
        }, {
          label: 'parent',
          value: 'parent'
        }, {
          label: 'rand',
          value: 'rand'
        }, {
          label: 'comment_count',
          value: 'comment_count'
        }, {
          label: 'relevance',
          value: 'relevance'
        }, {
          label: 'menu_order',
          value: 'menu_order'
        }, {
          label: 'meta_value',
          value: 'meta_value'
        }, {
          label: 'meta_value_num',
          value: 'meta_value_num'
        }, {
          label: 'post__in',
          value: 'post__in'
        }, {
          label: 'post_name__in',
          value: 'post_name__in'
        }, {
          label: 'post_parent__in',
          value: 'post_parent__in'
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), item.id == 'taxQueryRelation' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: item.id == 'taxQueryRelation' ? '' : 'hidden'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        value: item.val,
        options: [{
          label: 'OR',
          value: 'OR'
        }, {
          label: 'AND',
          value: 'AND'
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), item.id == 'metaQuery' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-amber-400 my-3 px-3 py-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
        className: "font-bold",
        href: ""
      }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: license.license_status != 'active' ? 'opacity-25' : ''
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm",
        onClick: ev => {
          var itemData = queryArgs.items[index];
          var xx = itemData.val.concat({
            fields: [{
              key: '',
              value: '',
              type: '',
              compare: ''
            }],
            relation: 'OR'
          });
          queryArgs.items[index].val = xx;
          setAttributes({
            queryArgs: {
              items: queryArgs.items
            }
          });
        }
      }, "Add"), item.val.map((x, j) => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
          title: "Meta Field",
          initialOpen: false
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
          className: "cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm",
          onClick: ev => {
            var itemData = queryArgs.items[index];
            var xx = itemData.val.splice(j, 1);
            queryArgs.items[index].val = itemData.val;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        }, "Remove"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, "Relation"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          style: {
            margin: 0
          },
          label: "",
          value: x.relation,
          options: [{
            label: 'OR',
            value: 'OR'
          }, {
            label: 'AND',
            value: 'AND'
          }],
          onChange: newVal => {
            var itemData = queryArgs.items[index]; //itemData.val.relation = newVal;

            itemData.val[j].relation = newVal; //var term = itemData.val[j].fields[k]
            //term.taxonomy = newVal;
            //console.log(itemData.val[j].relation);
            //console.log(newVal);
            //console.log(j);

            queryArgs.items[index].val = itemData.val;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        })), x.fields.map((y, k) => {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
            className: "border-b border-solid border-gray-300 py-3"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
            label: "Custom field key",
            value: y.key,
            placeholder: "meta_key",
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].fields[k];
              term.key = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
            label: "Meta Value ",
            value: y.value,
            placeholder: "25",
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].fields[k];
              term.value = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
            style: {
              margin: 0
            },
            label: "Custom field type",
            value: y.type,
            options: [{
              label: 'NUMERIC',
              value: 'NUMERIC'
            }, {
              label: 'BINARY',
              value: 'BINARY'
            }, {
              label: 'CHAR',
              value: 'CHAR'
            }, {
              label: 'DATE',
              value: 'DATE'
            }, {
              label: 'DATETIME',
              value: 'DATETIME'
            }, {
              label: 'DECIMAL',
              value: 'DECIMAL'
            }, {
              label: 'SIGNED',
              value: 'SIGNED'
            }, {
              label: 'TIME',
              value: 'TIME'
            }, {
              label: 'UNSIGNED',
              value: 'UNSIGNED'
            }],
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].fields[k];
              term.type = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
            style: {
              margin: 0
            },
            label: "compare ",
            value: y.compare,
            options: [{
              label: 'IN',
              value: 'IN'
            }, {
              label: 'NOT IN',
              value: 'NOT IN'
            }, {
              label: 'EXISTS',
              value: 'EXISTS'
            }, {
              label: 'NOT EXISTS',
              value: 'NOT EXISTS'
            }],
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].fields[k];
              term.compare = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          })));
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
          className: "cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm",
          onClick: ev => {
            var itemData = queryArgs.items[index];
            var xx = itemData.val[j].fields.concat({
              key: '',
              value: '',
              type: '',
              compare: ''
            });
            queryArgs.items[index].val[j].fields = xx;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        }, "Add")));
      }))), item.id == 'dateQuery' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-amber-400 my-3 px-3 py-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
        className: "font-bold",
        href: ""
      }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
        className: "my-3"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", null, "Add Arguments"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        options: [{
          "value": "",
          "label": "Select..."
        }, {
          "value": "year",
          "label": "Year"
        }, {
          "value": "month",
          "label": "Month"
        }, {
          "value": "week",
          "label": "Week"
        }, {
          "value": "day",
          "label": "Day"
        }, {
          "value": "hour",
          "label": "Hour"
        }, {
          "value": "minute",
          "label": "Minute"
        }, {
          "value": "second",
          "label": "Second"
        }, {
          "value": "after",
          "label": "After"
        }, {
          "value": "before",
          "label": "Before"
        }, {
          "value": "inclusive",
          "label": "Inclusive"
        }, {
          "value": "compare",
          "label": "Compare"
        }, {
          "value": "column",
          "label": "Column"
        }, {
          "value": "relation",
          "label": "Relation"
        }],
        onChange: newVal => {
          var itemData = queryArgs.items[index];
          console.log(itemData);

          if (newVal == 'year') {
            var xx = itemData.val.concat({
              id: 'year',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'month') {
            var xx = itemData.val.concat({
              id: 'month',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'week') {
            var xx = itemData.val.concat({
              id: 'week',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'day') {
            var xx = itemData.val.concat({
              id: 'day',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'hour') {
            var xx = itemData.val.concat({
              id: 'hour',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'minute') {
            var xx = itemData.val.concat({
              id: 'minute',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'second') {
            var xx = itemData.val.concat({
              id: 'second',
              value: '',
              compare: ''
            });
          }

          if (newVal == 'inclusive') {
            var xx = itemData.val.concat({
              id: 'inclusive',
              value: true
            });
          }

          if (newVal == 'compare') {
            var xx = itemData.val.concat({
              id: 'compare',
              value: ''
            });
          }

          if (newVal == 'column') {
            var xx = itemData.val.concat({
              id: 'column',
              value: ''
            });
          }

          if (newVal == 'relation') {
            var xx = itemData.val.concat({
              id: 'relation',
              value: ''
            });
          }

          if (newVal == 'before') {
            var xx = itemData.val.concat({
              id: 'before',
              value: '',
              year: '',
              month: '',
              day: ''
            });
          }

          if (newVal == 'after') {
            var xx = itemData.val.concat({
              id: 'after',
              value: '',
              year: '',
              month: '',
              day: ''
            });
          }

          queryArgs.items[index].val = xx; //console.log(xx);

          setAttributes({
            queryArgs: {
              items: queryArgs.items
            }
          });
        }
      })), item.val.map((x, j) => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
          title: x.id,
          initialOpen: false
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
          className: "cursor-pointer px-3 py-1 text-white bg-red-600 text-sm my-2 inline-block",
          onClick: ev => {
            queryArgs.items[index].val.splice(j, 1);
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        }, "Delete"), (x.id == 'after' || x.id == 'before') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", null, "Year"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
          placeholder: "",
          onChange: newVal => {
            //clearTimeout(debounce);
            // debounce = setTimeout(() => {
            queryArgs.items[index].val[j].year = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            }); //}, 1000);
          }
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", null, "Month"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
          placeholder: "",
          onChange: newVal => {
            // clearTimeout(debounce);
            //debounce = setTimeout(() => {
            queryArgs.items[index].val[j].month = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            }); //}, 1000);
          }
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", null, "Day"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
          placeholder: "",
          onChange: newVal => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
              queryArgs.items[index].val[j].day = newVal;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }, 1000);
          }
        }))), x.id == 'inclusive' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          style: {
            margin: 0
          },
          options: [{
            label: 'True',
            value: true
          }, {
            label: 'False',
            value: false
          }],
          onChange: newVal => {
            queryArgs.items[index].val[j].value = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        })), x.id == 'compare' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          style: {
            margin: 0
          },
          options: [{
            label: '=',
            value: '='
          }, {
            label: '!=',
            value: '!='
          }, {
            label: '>',
            value: '>'
          }, {
            label: '>=',
            value: '>='
          }, {
            label: '<',
            value: '<'
          }, {
            label: '<=',
            value: '<='
          }, {
            label: 'IN',
            value: 'IN'
          }, {
            label: 'NOT IN',
            value: 'NOT IN'
          }, {
            label: 'EXISTS',
            value: 'EXISTS'
          }, {
            label: 'NOT EXISTS',
            value: 'NOT EXISTS'
          }, {
            label: 'BETWEEN',
            value: 'BETWEEN'
          }, {
            label: 'NOT BETWEEN',
            value: 'NOT BETWEEN'
          }],
          onChange: newVal => {
            queryArgs.items[index].val[j].value = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        })), x.id == 'column' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
          placeholder: "",
          onChange: newVal => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
              queryArgs.items[index].val[j].value = newVal;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }, 1000);
          }
        })), x.id == 'relation' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          style: {
            margin: 0
          },
          options: [{
            label: 'OR',
            value: 'OR'
          }, {
            label: 'AND',
            value: 'AND'
          }],
          onChange: newVal => {
            queryArgs.items[index].val[j].value = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        })), (x.id == 'year' || x.id == 'month' || x.id == 'week' || x.id == 'day' || x.id == 'hour' || x.id == 'minute' || x.id == 'second') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
          label: "Value",
          placeholder: "",
          onChange: newVal => {
            //clearTimeout(debounce);
            //debounce = setTimeout(() => {
            queryArgs.items[index].val[j].value = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            }); //}, 1000);
          }
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          style: {
            margin: 0
          },
          label: "compare ",
          options: [{
            label: '=',
            value: '='
          }, {
            label: '!=',
            value: '!='
          }, {
            label: '>',
            value: '>'
          }, {
            label: '>=',
            value: '>='
          }, {
            label: '<',
            value: '<'
          }, {
            label: '<=',
            value: '<='
          }, {
            label: 'IN',
            value: 'IN'
          }, {
            label: 'NOT IN',
            value: 'NOT IN'
          }, {
            label: 'EXISTS',
            value: 'EXISTS'
          }, {
            label: 'NOT EXISTS',
            value: 'NOT EXISTS'
          }, {
            label: 'BETWEEN',
            value: 'BETWEEN'
          }, {
            label: 'NOT BETWEEN',
            value: 'NOT BETWEEN'
          }],
          onChange: newVal => {
            queryArgs.items[index].val[j].compare = newVal;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        }))));
      })), item.id == 'taxQuery' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-amber-400 my-3 px-3 py-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
        className: "font-bold",
        href: ""
      }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: license.license_status != 'active' ? 'opacity-25' : ''
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm",
        onClick: ev => {
          var itemData = queryArgs.items[index];
          var xx = itemData.val.concat({
            terms: [{
              taxonomy: '',
              field: '',
              terms: '',
              operator: ''
            }],
            relation: 'OR'
          });
          queryArgs.items[index].val = xx;
          setAttributes({
            queryArgs: {
              items: queryArgs.items
            }
          });
        }
      }, "Add"), item.val.map((x, j) => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
          title: "Term",
          initialOpen: false
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
          className: "cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm",
          onClick: ev => {
            var itemData = queryArgs.items[index];
            var xx = itemData.val.splice(j, 1);
            queryArgs.items[index].val = itemData.val;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        }, "Remove"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, "Terms Relation"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          style: {
            margin: 0
          },
          label: "",
          value: x.relation,
          options: [{
            label: 'OR',
            value: 'OR'
          }, {
            label: 'AND',
            value: 'AND'
          }],
          onChange: newVal => {
            var itemData = queryArgs.items[index]; //itemData.val.relation = newVal;

            itemData.val[j].relation = newVal; //var term = itemData.val[j].terms[k]
            //term.taxonomy = newVal;
            //console.log(itemData.val[j].relation);
            //console.log(newVal);
            //console.log(j);

            queryArgs.items[index].val = itemData.val;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        })), x.terms.map((y, k) => {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
            className: "border-b border-solid border-gray-300 py-3"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
            label: "Taxonomy",
            value: y.taxonomy,
            placeholder: "Taxonomy",
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].terms[k];
              term.taxonomy = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
            label: "Terms",
            value: y.terms,
            placeholder: "Comma separated",
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].terms[k];
              term.terms = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
            style: {
              margin: 0
            },
            label: "Fields",
            value: y.field,
            options: [{
              label: 'Term ID',
              value: 'term_id'
            }, {
              label: 'Name',
              value: 'name'
            }, {
              label: 'Slug',
              value: 'slug'
            }, {
              label: 'Term taxonomy id',
              value: 'term_taxonomy_id'
            }],
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].terms[k];
              term.field = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
            style: {
              margin: 0
            },
            label: "Operator",
            value: y.operator,
            options: [{
              label: 'IN',
              value: 'IN'
            }, {
              label: 'NOT IN',
              value: 'NOT IN'
            }, {
              label: 'AND',
              value: 'AND'
            }, {
              label: 'EXISTS',
              value: 'EXISTS'
            }, {
              label: 'NOT EXISTS',
              value: 'NOT EXISTS'
            }],
            onChange: newVal => {
              var itemData = queryArgs.items[index];
              var term = itemData.val[j].terms[k];
              term.operator = newVal;
              queryArgs.items[index].val = itemData.val;
              setAttributes({
                queryArgs: {
                  items: queryArgs.items
                }
              });
            }
          })));
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
          className: "cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm",
          onClick: ev => {
            var itemData = queryArgs.items[index];
            var xx = itemData.val[j].terms.concat({
              taxonomy: '',
              field: '',
              terms: '',
              operator: ''
            });
            queryArgs.items[index].val[j].terms = xx;
            setAttributes({
              queryArgs: {
                items: queryArgs.items
              }
            });
          }
        }, "Add")));
      }))), (item.id == 'metaKey' || item.id == 's' || item.id == 'metaValue' || item.id == 'metaValueNum' || item.id == 'metaCompare' || item.id == 'year' || item.id == 'monthnum' || item.id == 'w' || item.id == 'day' || item.id == 'hour' || item.id == 'minute' || item.id == 'second' || item.id == 'm' || item.id == 'author' || item.id == 'authorName' || item.id == 'tag' || item.id == 'tagId' || item.id == 'cat' || item.id == 'categoryName' || item.id == 'p' || item.id == 'name' || item.id == 'pageId' || item.id == 'pagename' || item.id == 'postParent' || item.id == 'postsPerPage' || item.id == 'paged' || item.id == 'offset' || item.id == 'postsPerArchivePage' || item.id == 'perm') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: item.val,
        onChange: newVal => {
          clearTimeout(debounce);
          debounce = setTimeout(() => {
            updateQueryPram(newVal, index);
          }, 1000);
        }
      })), (item.id == 'postParent' || item.id == 'postPassword') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-amber-400 my-3 px-3 py-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
        className: "font-bold",
        href: ""
      }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: item.val,
        onChange: newVal => updateQueryPram(newVal, index)
      })), (item.id == 'postNameIn' || item.id == 'authorIn' || item.id == 'authorNotIn' || item.id == 'postNotIn' || item.id == 'postIn' || item.id == 'postParentNotIn' || item.id == 'tagNotIn' || item.id == 'tagAnd' || item.id == 'tagIn' || item.id == 'postParentIn' || item.id == 'tagSlugIn' || item.id == 'tagSlugAnd' || item.id == 'categoryNotIn' || item.id == 'categoryIn' || item.id == 'categoryAnd') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-amber-400 my-3 px-3 py-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
        className: "font-bold",
        href: ""
      }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: item.val,
        placeholder: "Comma separated",
        onChange: newVal => updateQueryPram(newVal, index)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: item.id == 'postNameIndd' ? '' : 'hidden'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm",
        onClick: ev => {
          var itemData = queryArgs.items[index];
          var val = itemData.val.concat({
            slug: ''
          });
          itemData.val = val;
          queryArgs.items[index] = itemData;
          setAttributes({
            queryArgs: {
              items: queryArgs.items
            }
          });
        }
      }, "Add")), item.id == 'commentCount' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: item.val.value,
        placeholder: "Comment Count, Ex: 25",
        onChange: newVal => updateQueryPram({
          value: newVal,
          compare: item.val.compare
        }, index)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        value: item.val.compare,
        options: [{
          label: '=',
          value: '='
        }, {
          label: '!=',
          value: '!='
        }, {
          label: '>',
          value: '>'
        }, {
          label: '>=',
          value: '>='
        }, {
          label: '<',
          value: '<'
        }, {
          label: '<=',
          value: '<='
        }],
        onChange: newVal => updateQueryPram({
          value: item.val.value,
          compare: newVal
        }, index)
      })), item.id == 'postMimeType' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        multiple: true,
        value: item.val,
        options: [{
          label: 'image/jpeg',
          value: 'jpg|jpeg|jpe'
        }, {
          label: 'image/gif',
          value: 'gif'
        }, {
          label: 'image/png',
          value: 'png'
        }, {
          label: 'image/bmp',
          value: 'bmp'
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), (item.id == 'cacheResults' || item.id == 'nopaging' || item.id == 'hasPassword' || item.id == 'updatePostMetaCache' || item.id == 'updatePostTermCache') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        value: item.val,
        options: [{
          label: 'True',
          value: true
        }, {
          label: 'False',
          value: false
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), item.id == 'ignoreStickyPosts' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "bg-amber-400 my-3 px-3 py-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
        className: "font-bold",
        href: ""
      }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        value: item.val,
        options: [{
          label: 'True',
          value: true
        }, {
          label: 'False',
          value: false
        }],
        onChange: newVal => updateQueryPram(newVal, index)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, item.description)));
    }

    function addQueryPram(index) {
      // ////console.log(queryPrams);
      var attrExist = false; ////console.log(index);

      var data = _queryprams__WEBPACK_IMPORTED_MODULE_10__["default"][index];
      var multiple = data.multiple; ////console.log(multiple);

      var isExist = queryArgs.items.map(item => {
        //////console.log(item);
        if (item.id == index) {
          ////console.log(item);
          return true;
        }
      }); ////console.log(isExist);

      var items = queryArgs.items.concat([data]);
      setAttributes({
        queryArgs: {
          items: items
        }
      });
    }

    function addGridColumn() {
      var gridTemplateColumns = grid.gridTemplateColumns.concat([{
        val: 1,
        unit: 'fr'
      }]);
      setAttributes({
        grid: {
          gridTemplateColumns: gridTemplateColumns,
          gridTemplateRows: grid.gridTemplateRows,
          colGap: grid.colGap,
          rowGap: grid.rowGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      });
    }

    function addGridRow() {
      var gridTemplateRows = grid.gridTemplateRows.concat([{
        val: 1,
        unit: 'fr'
      }]);
      setAttributes({
        grid: {
          gridTemplateColumns: grid.gridTemplateColumns,
          gridTemplateRows: gridTemplateRows,
          colGap: grid.colGap,
          rowGap: grid.rowGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      });
    }

    function deleteGridColumn(i) {
      grid.gridTemplateColumns.splice(i, 1);
      setAttributes({
        grid: {
          gridTemplateColumns: grid.gridTemplateColumns,
          gridTemplateRows: grid.gridTemplateRows,
          colGap: grid.colGap,
          rowGap: grid.rowGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      });
    }

    function deleteGridRow(i) {
      grid.gridTemplateRows.splice(i, 1);
      setAttributes({
        grid: {
          gridTemplateColumns: grid.gridTemplateColumns,
          gridTemplateRows: grid.gridTemplateRows,
          colGap: grid.colGap,
          rowGap: grid.rowGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "post-grid"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "General",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "py-2 font-bold "
    }, "Container Options"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: container.padding.val,
      onChange: newVal => setAttributes({
        container: {
          padding: {
            val: newVal,
            unit: container.padding.unit
          },
          margin: container.margin,
          bgColor: container.bgColor,
          bgImg: container.bgImg
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: container.padding.unit,
      options: [{
        label: 'px',
        value: 'px'
      }, {
        label: 'em',
        value: 'em'
      }],
      onChange: newVal => setAttributes({
        container: {
          padding: {
            val: container.padding.val,
            unit: newVal
          },
          margin: container.margin,
          bgColor: container.bgColor,
          bgImg: container.bgImg
        }
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: container.margin.val,
      onChange: newVal => setAttributes({
        container: {
          padding: container.padding,
          margin: {
            val: newVal,
            unit: container.margin.unit
          },
          bgColor: container.bgColor,
          bgImg: container.bgImg
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: container.margin.unit,
      options: [{
        label: 'px',
        value: 'px'
      }, {
        label: 'em',
        value: 'em'
      }],
      onChange: newVal => setAttributes({
        container: {
          margin: {
            val: container.padding.val,
            unit: newVal
          },
          padding: container.padding,
          bgColor: container.bgColor,
          bgImg: container.bgImg
        }
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      color: container.bgColor,
      colors: colors,
      enableAlpha: true,
      onChange: newVal => setAttributes({
        container: {
          padding: container.padding,
          margin: container.margin,
          bgColor: newVal,
          bgImg: container.bgImg
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Background Image"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("img", {
      src: container.bgImg.url,
      alt: ""
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: media => {
        // media.id
        setAttributes({
          container: {
            padding: container.padding,
            margin: container.margin,
            bgColor: container.bgColor,
            bgImg: {
              id: media.id,
              url: media.url
            }
          }
        });
      },
      onClose: () => {//////console.log('onClose')
      },
      allowedTypes: ALLOWED_MEDIA_TYPES,
      value: container.bgImg,
      render: _ref2 => {
        let {
          open
        } = _ref2;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          onClick: open
        }, "Open Media Library");
      }
    })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Lazy load",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "Enable",
      value: lazyLoad.enable,
      options: [{
        label: 'Yes',
        value: 'yes'
      }, {
        label: 'No',
        value: 'no'
      }],
      onChange: newSize => updateLazyLoadEnable(newSize)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Lazy Load Image"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("img", {
      src: lazyLoad.srcUrl,
      alt: ""
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: media => {
        // media.id
        //////console.log(media);
        updateLazyLoadsrcUrl(media.url, media.id); //updateLazyLoadsrcId(media.id);
      },
      onClose: () => {//////console.log('onClose')
      },
      allowedTypes: ALLOWED_MEDIA_TYPES,
      value: lazyLoad.srcId,
      render: _ref3 => {
        let {
          open
        } = _ref3;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          onClick: open
        }, "Open Media Library");
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Query Post",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "mb-5"
    }, license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "bg-amber-400 mt-5 px-3 py-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
      className: "font-bold",
      href: ""
    }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: license.license_status != 'active' ? 'opacity-25' : ''
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(MyCustomSelectControl, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", null, "Add Query Parameters"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      options: queryPramsX,
      onChange: newVal => addQueryPram(newVal)
    }), queryArgs.items.map((item, index) => {
      //////console.log(item);
      //////console.log(index);
      return generateQueryArgOptions(item, index);
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Layouts",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "text-white cursor-pointer"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: layoutData.source == 'library' ? 'bg-blue-500 w-1/2 inline-block px-3 py-2' : 'bg-blue-300  inline-block px-3 py-2 w-1/2',
      onClick: ev => {
        setLayoutData({
          source: 'library'
        });
      }
    }, "Library"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: layoutData.source == 'saved' ? 'bg-blue-500 w-1/2 inline-block px-3 py-2' : 'bg-blue-300 inline-block px-3 py-2 w-1/2 ',
      onClick: ev => {
        setLayoutData({
          source: 'saved'
        });
      }
    }, "Saved")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: queryLayouts.keyword,
      type: "text",
      placeholder: "Search Layouts...",
      onChange: newVal => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          setQueryLayouts({
            keyword: newVal,
            page: queryLayouts.page,
            category: queryLayouts.category
          });
        }, 1000); //fetchLayouts();
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      style: {
        margin: 0
      },
      label: "",
      value: queryLayouts.category,
      options: layoutCats,
      onChange: newVal => {
        console.log(newVal);
        setQueryLayouts({
          keyword: queryLayouts.keyword,
          page: queryLayouts.page,
          category: newVal
        }); //fetchLayouts();
      }
    })), layoutLoading == true && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null)), layoutLoading == false && layoutList.items.length > 0 && layoutList.items.map(x => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "my-3  "
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "relative cursor-pointer",
        onClick: ev => {
          selectLayout(x.post_id, x.post_content);
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("img", {
        src: x.thumb_url
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "text-[16px] p-2 bg-blue-600 text-white bg-opacity-90 text-bold absolute bottom-0 w-full text-center"
      }, x.post_title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "my-3"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        className: "mx-2"
      }, "#", x.post_id), x.sale_price > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        className: "mx-2"
      }, "Price:", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("del", {
        className: "ml-2"
      }, x.price, " "), "-", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        className: ""
      }, x.sale_price, "USD ")), x.sale_price == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        className: "mx-2"
      }, "Price:", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        className: ""
      }, " ", x.sale_price, "USD")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
        title: "Buy To Download",
        className: ['text-white px-3 py-1 mx-2', x.is_pro ? ' bg-amber-400' : ' bg-blue-600'].join('')
      }, x.is_pro ? 'Buy Now' : 'Free')));
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "w-full py-2 bg-blue-500 cursor-pointer my-3 text-center text-white",
      onClick: ev => {
        var page = queryLayouts.page + 1;
        setQueryLayouts({
          keyword: queryLayouts.keyword,
          page: page,
          category: queryLayouts.category
        });
      }
    }, layoutLoading.loading == true && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
      className: "text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null)), "Load More"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Grid Settings",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
      className: "mb-3",
      variant: "secondary",
      onClick: addGridColumn
    }, "Add Column"), grid.gridTemplateColumns.map((item, index) => {
      //////console.log(item);
      //////console.log(index);
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: item.val,
        type: "number",
        onChange: newVal => setAttributes({
          grid: {
            gridTemplateColumns: grid.gridTemplateColumns.map((x, i) => {
              return index == i ? {
                val: newVal,
                unit: x.unit
              } : x;
            }),
            gridTemplateRows: grid.gridTemplateRows,
            colGap: grid.colGap,
            rowGap: grid.rowGap,
            padding: grid.padding,
            itemCss: grid.itemCss
          }
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        style: {
          margin: 0
        },
        label: "",
        value: item.unit,
        options: [{
          label: 'fr',
          value: 'fr'
        }, {
          label: 'px',
          value: 'px'
        }, {
          label: '%',
          value: '%'
        }, {
          label: 'em',
          value: 'em'
        }],
        onChange: newVal => setAttributes({
          grid: {
            gridTemplateColumns: grid.gridTemplateColumns.map((x, i) => {
              return index == i ? {
                val: x.val,
                unit: newVal
              } : x;
            }),
            gridTemplateRows: grid.gridTemplateRows,
            colGap: grid.colGap,
            rowGap: grid.rowGap,
            padding: grid.padding,
            itemCss: grid.itemCss
          }
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
        icon: "no-alt",
        onClick: ev => {
          deleteGridColumn(index);
        }
      }));
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
      onClick: addGridRow,
      className: "my-3",
      variant: "secondary"
    }, "Add Row"), grid.gridTemplateRows.map((item, index) => {
      //////console.log(item);
      //////console.log(index);
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: item.val,
        type: "number",
        onChange: newVal => setAttributes({
          grid: {
            gridTemplateRows: grid.gridTemplateRows.map((x, i) => {
              return index == i ? {
                val: newVal,
                unit: x.unit
              } : x;
            }),
            gridTemplateColumns: grid.gridTemplateColumns,
            colGap: grid.colGap,
            rowGap: grid.rowGap,
            padding: grid.padding,
            itemCss: grid.itemCss
          }
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
        className: "mb-0",
        value: item.unit,
        options: [{
          label: 'fr',
          value: 'fr'
        }, {
          label: 'px',
          value: 'px'
        }, {
          label: '%',
          value: '%'
        }, {
          label: 'em',
          value: 'em'
        }],
        onChange: newVal => setAttributes({
          grid: {
            gridTemplateRows: grid.gridTemplateRows.map((x, i) => {
              return index == i ? {
                val: x.val,
                unit: newVal
              } : x;
            }),
            gridTemplateColumns: grid.gridTemplateColumns,
            colGap: grid.colGap,
            rowGap: grid.rowGap,
            padding: grid.padding,
            itemCss: grid.itemCss
          }
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
        icon: "no-alt",
        onClick: ev => {
          deleteGridRow(index);
        }
      }));
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Column Gap"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: grid.colGap.val,
      type: "number",
      onChange: newVal => setAttributes({
        grid: {
          gridTemplateRows: grid.gridTemplateRows,
          gridTemplateColumns: grid.gridTemplateColumns,
          colGap: {
            val: newVal,
            unit: grid.colGap.unit
          },
          rowGap: grid.rowGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      className: "mb-0",
      value: grid.colGap.unit,
      options: [{
        label: 'fr',
        value: 'fr'
      }, {
        label: 'px',
        value: 'px'
      }, {
        label: '%',
        value: '%'
      }, {
        label: 'em',
        value: 'em'
      }],
      onChange: newVal => setAttributes({
        grid: {
          gridTemplateRows: grid.gridTemplateRows,
          gridTemplateColumns: grid.gridTemplateColumns,
          colGap: {
            val: grid.colGap.val,
            unit: newVal
          },
          rowGap: grid.rowGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Row Gap"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: grid.rowGap.val,
      type: "number",
      onChange: newVal => setAttributes({
        grid: {
          gridTemplateRows: grid.gridTemplateRows,
          gridTemplateColumns: grid.gridTemplateColumns,
          rowGap: {
            val: newVal,
            unit: grid.rowGap.unit
          },
          colGap: grid.colGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      className: "mb-0",
      value: grid.rowGap.unit,
      options: [{
        label: 'fr',
        value: 'fr'
      }, {
        label: 'px',
        value: 'px'
      }, {
        label: '%',
        value: '%'
      }, {
        label: 'em',
        value: 'em'
      }],
      onChange: newVal => setAttributes({
        grid: {
          gridTemplateRows: grid.gridTemplateRows,
          gridTemplateColumns: grid.gridTemplateColumns,
          rowGap: {
            val: grid.rowGap.val,
            unit: newVal
          },
          colGap: grid.colGap,
          padding: grid.padding,
          itemCss: grid.itemCss
        }
      })
    })), license.license_status != 'active' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "bg-amber-400 mt-5 px-3 py-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, "Only avilable in Premium "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("a", {
      className: "font-bold",
      href: ""
    }, "Get Premium")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: license.license_status != 'active' ? 'opacity-25' : ''
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "N'th Item CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
      className: "my-3",
      variant: "secondary",
      onClick: newVal => {
        var itemCss = grid.itemCss.concat({
          'grid-column-start': '',
          'grid-column-end': '',
          'grid-row-start': '',
          'grid-row-end': ''
        });
        setAttributes({
          grid: {
            gridTemplateRows: grid.gridTemplateRows,
            gridTemplateColumns: grid.gridTemplateColumns,
            rowGap: grid.rowGap,
            colGap: grid.colGap,
            padding: grid.padding,
            itemCss: itemCss
          }
        });
      }
    }, "Add")), grid.itemCss.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: i + 1 + '\'th Item',
        initialOpen: false
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
        icon: "no-alt",
        variant: "secondary",
        onClick: ev => {
          grid.itemCss.splice(i, 1);
          setAttributes({
            grid: {
              gridTemplateRows: grid.gridTemplateRows,
              gridTemplateColumns: grid.gridTemplateColumns,
              rowGap: grid.rowGap,
              colGap: grid.colGap,
              padding: grid.padding,
              itemCss: grid.itemCss
            }
          });
        }
      }, "Delete"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
        for: ""
      }, "grid-column-start"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: x['grid-column-start'],
        type: "number",
        onChange: newVal => {
          grid.itemCss[i]['grid-column-start'] = newVal;
          setAttributes({
            grid: {
              gridTemplateRows: grid.gridTemplateRows,
              gridTemplateColumns: grid.gridTemplateColumns,
              rowGap: grid.rowGap,
              colGap: grid.colGap,
              padding: grid.padding,
              itemCss: grid.itemCss
            }
          });
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
        for: ""
      }, "grid-column-end"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: x['grid-column-end'],
        type: "number",
        onChange: newVal => {
          grid.itemCss[i]['grid-column-end'] = newVal;
          setAttributes({
            grid: {
              gridTemplateRows: grid.gridTemplateRows,
              gridTemplateColumns: grid.gridTemplateColumns,
              rowGap: grid.rowGap,
              colGap: grid.colGap,
              padding: grid.padding,
              itemCss: grid.itemCss
            }
          });
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
        for: ""
      }, "grid-row-start"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: x['grid-row-start'],
        type: "number",
        onChange: newVal => {
          grid.itemCss[i]['grid-row-start'] = newVal;
          setAttributes({
            grid: {
              gridTemplateRows: grid.gridTemplateRows,
              gridTemplateColumns: grid.gridTemplateColumns,
              rowGap: grid.rowGap,
              colGap: grid.colGap,
              padding: grid.padding,
              itemCss: grid.itemCss
            }
          });
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
        for: ""
      }, "grid-row-end"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        value: x['grid-row-end'],
        type: "number",
        onChange: newVal => {
          grid.itemCss[i]['grid-row-end'] = newVal;
          setAttributes({
            grid: {
              gridTemplateRows: grid.gridTemplateRows,
              gridTemplateColumns: grid.gridTemplateColumns,
              rowGap: grid.rowGap,
              colGap: grid.colGap,
              padding: grid.padding,
              itemCss: grid.itemCss
            }
          });
        }
      })));
    }), gridLayout.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "cursor-pointer relative my-3",
        onClick: ev => {
          setAttributes({
            grid: x.data
          });
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("img", {
        src: x.thumb
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "text-[16px] p-2 bg-blue-600 text-white bg-opacity-90 text-bold absolute bottom-0 w-full text-center"
      }, x.title));
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Pagination",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "Enable",
      value: pagination.type,
      options: [{
        label: 'None',
        value: 'none'
      }, {
        label: 'Normal Pagination',
        value: 'normal'
      }, {
        label: 'Ajax Pagination',
        value: 'ajax'
      }, {
        label: 'Next-Previous',
        value: 'next_previous'
      }, {
        label: 'Load More',
        value: 'loadmore'
      }, {
        label: 'Infinite Load',
        value: 'infinite'
      }],
      onChange: newVal => setAttributes({
        pagination: {
          type: newVal,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.nextText,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Max Number of Pagination"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: pagination.maxPageNum,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: newVal,
          prevText: pagination.prevText,
          nextText: pagination.nextText,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Previous Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: pagination.prevText,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: newVal,
          nextText: pagination.nextText,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Next Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: pagination.nextText,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: newVal,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Font Size"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: pagination.fontSize,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.nextText,
          fontSize: newVal,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Text Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      color: pagination.textColor,
      colors: colors,
      enableAlpha: true,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.fontSize,
          fontSize: pagination.fontSize,
          textColor: newVal,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      color: pagination.bgColor,
      colors: colors,
      enableAlpha: true,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.fontSize,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: newVal,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Active/Hover Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      color: pagination.bgActiveColor,
      colors: colors,
      enableAlpha: true,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.fontSize,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: newVal,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: pagination.type == 'loadmore' || pagination.type == 'infinite' ? '' : 'hidden'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Load More Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: pagination.loadMoreText,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.fontSize,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: newVal,
          loadingIcon: pagination.loadingIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("label", {
      for: ""
    }, "Loading Icon"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: pagination.loadingIcon,
      onChange: newVal => setAttributes({
        pagination: {
          type: pagination.type,
          maxPageNum: pagination.maxPageNum,
          prevText: pagination.prevText,
          nextText: pagination.fontSize,
          fontSize: pagination.fontSize,
          textColor: pagination.textColor,
          hoverColor: pagination.hoverColor,
          bgColor: pagination.bgColor,
          bgActiveColor: pagination.bgActiveColor,
          loadMoreText: pagination.loadMoreText,
          loadingIcon: newVal
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Search",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "Enable",
      value: search.enable,
      options: [{
        label: 'No',
        value: 'no'
      }, {
        label: 'Yes',
        value: 'yes'
      }],
      onChange: newVal => setAttributes({
        search: {
          enable: newVal,
          type: search.type,
          placeholder: search.placeholder,
          icon: search.icon,
          busyIcon: search.busyIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "Search action",
      value: search.type,
      options: [{
        label: 'Ajax - On change form data',
        value: 'ajax'
      }, {
        label: 'On form submit - GET method',
        value: 'form_submit'
      }],
      onChange: newVal => setAttributes({
        search: {
          enable: search.type,
          type: newVal,
          placeholder: search.placeholder,
          icon: search.icon,
          busyIcon: search.busyIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      label: "Placeholder text",
      value: search.placeholder,
      onChange: newVal => setAttributes({
        search: {
          enable: search.type,
          type: search.type,
          placeholder: newVal,
          icon: search.icon,
          busyIcon: search.busyIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      label: "Search icon",
      value: search.icon,
      onChange: newVal => setAttributes({
        search: {
          enable: search.type,
          type: search.type,
          placeholder: search.placeholder,
          icon: newVal,
          busyIcon: search.busyIcon
        }
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      label: "Loading icon",
      value: search.busyIcon,
      onChange: newVal => setAttributes({
        search: {
          enable: search.type,
          type: search.type,
          placeholder: search.placeholder,
          icon: search.icon,
          busyIcon: newVal
        }
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Scripts",
      icon: "dashicons-menu-alt3",
      initialOpen: false
    })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "my-custom-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(RawHTML, null, ItemNthCssadasd2), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(ContainerCss, {
      cssData: props.attributes
    }, lazyLoad.enable == 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "lazyLoad"
    }, "lazyLoad"), search.enable == 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "search"
    }, "search form"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", null, postsQuery == false && posts.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "no-posts  asd text-center"
    }, "No Post found"), postsQuery && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null)), postsQuery == false && posts.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(CustomCss, {
      cssData: props.attributes,
      className: ""
    }, posts.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        className: "border p-3 item "
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(RawHTML, null, x.html)); //return (generateLayout(x, i))
    }))), pagination.type == 'normal' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "pagination"
    }, "normal Pagination"), pagination.type == 'ajax' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "pagination"
    }, "ajax Pagination"), pagination.type == 'next_previous' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "pagination"
    }, "next_previous Pagination"), pagination.type == 'loadmore' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "pagination"
    }, "loadmore Pagination"), pagination.type == 'infinite' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      className: "pagination"
    }, "infinite Pagination")))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-meta/index.js":
/*!***************************************!*\
  !*** ./src/blocks/post-meta/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash-es */ "lodash-es");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_es__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_es_template__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lodash-es/template */ "./node_modules/lodash/template.js");
/* harmony import */ var lodash_es_template__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_es_template__WEBPACK_IMPORTED_MODULE_13__);













const {
  RawHTML
} = wp.element;





var myStore = wp.data.select('my-shop');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockType)("post-grid/post-meta", {
  title: "Post Meta",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M20 4H4v1.5h16V4zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3zM4 9.5h9V8H4v1.5zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3z",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd"
    }))
  },
  attributes: {
    template: {
      "type": "string",
      "default": '<%= metaValue %>'
    },
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    meta: {
      type: 'object',
      default: {
        key: '',
        prefix: '',
        postfix: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    separator: {
      type: 'object',
      default: {
        class: 'inline-block',
        text: ', ',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    frontText: {
      type: 'object',
      default: {
        text: 'Meta Value: ',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;
    var meta = attributes.meta;
    var template = attributes.template;
    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;
    var blockCssY = attributes.blockCssY;
    var customCss = attributes.customCss;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(myStore.getLicense());
    const [metaValue, setMetaValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [metaHtml, setMetaHtml] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Wrapper CSS Class Selectors

    const itemWrapSelector = '.pg-postMeta';
    const itemSelector = '.pg-postMeta .item';
    const itemSeparatorSelector = '.pg-postMeta .separator';
    const frontTextSelector = '.pg-postMeta .frontText';
    const postCountSelector = '.pg-postMeta .postCount';
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/post-grid/v2/get_post_meta',
        method: 'POST',
        data: {
          postId: postId,
          meta_key: meta.key
        }
      }).then(res => {
        //console.log(res);
        setMetaValue(res.meta_value);

        var compiled = lodash_es__WEBPACK_IMPORTED_MODULE_12___default().template(template); //console.log(compiled({ 'metaValue': res.meta_value }));


        var html = compiled({
          'metaValue': res.meta_value
        });
        setMetaHtml(html);
      });
    }, [meta]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (metaValue != null) {
        var compiled = lodash_es__WEBPACK_IMPORTED_MODULE_12___default().template(template);

        setMetaHtml(compiled({
          'metaValue': metaValue
        }));
      }
    }, [template]);
    var breakPointList = [];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = items.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: responsive,
          margin: items.margin
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[itemSelector]['padding-top'] != undefined ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[itemSelector]['padding-right'] != undefined ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[itemSelector]['padding-bottom'] != undefined ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[itemSelector]['padding-left'] != undefined ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = items.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: items.padding,
          margin: responsive
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[itemSelector]['margin-top'] != undefined ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[itemSelector]['margin-right'] !== undefined ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[itemSelector]['margin-bottom'] !== undefined ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[itemSelector]['margin-left'] !== undefined ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    const [categoryCount, setcategoryCount] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0); // Using the hook.

    const [postCategoriesData, setPostCategoriesData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // Using the hook.

    const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // Using the hook.

    const [postCategoriesX, setPostCategoriesX] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.useEntityProp)('postType', postType, 'categories', postId);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      console.log('Listening postCategoriesX: ', postCategoriesX);
      setPostCategoriesData([]);
      setCategories([]);
      setcategoryCount(categories.length - 1);

      for (x in postCategoriesX) {
        var catId = postCategoriesX[x];
        console.log(x);
        var assd = x;

        if (x) {
          _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
            path: '/wp/v2/categories/' + catId,
            method: 'GET'
          }).then(res => {
            //console.log(res)
            setPostCategoriesData(current => [...current, res]);
            console.log(assd);
            setCategories(current => [...current, res]);
          });
        }
      }

      console.log(postCategoriesData);
    }, [postCategoriesX]);

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postCategories');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      //console.log('Listening linkAttr: ', linkAttr);
      generateBlockCssY();
    }, [items]); //console.log(breakPointList);

    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }];
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    const post = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select('core').getEntityRecord('postType', context['postType'], context['postId']));
    const termstaxonomy = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category', [4, 5])); //console.log('Hello');
    //console.log(post);

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      //console.log(x);
      //console.log(index);
      //console.log('Post Title');
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.AlignmentToolbar, {
      value: wrapper.textAlign,
      onChange: nextAlign => {
        setAttributes({
          wrapper: {
            textAlign: nextAlign,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-3"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Meta Key, Template",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Meta Key"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: meta.key,
      onChange: newVal => {
        setAttributes({
          meta: {
            key: newVal,
            prefix: meta.prefix,
            color: meta.postfix,
            color: meta.color,
            bgColor: meta.bgColor,
            padding: meta.padding,
            margin: meta.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "my-3",
      for: ""
    }, "Template"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      value: template,
      onChange: newVal => {
        setAttributes({
          template: newVal
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, "Please check the documentaiton https://lodash.com/docs/4.17.15#template"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Response"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
      className: "break-words"
    }, JSON.stringify(metaValue))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Wrapper Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: wrapper.class,
      onChange: newVal => {
        setAttributes({
          wrapper: {
            textAlign: wrapper.textAlign,
            class: newVal,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Front Text",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: frontText.text,
      onChange: newVal => setAttributes({
        frontText: {
          text: newVal,
          color: frontText.color,
          bgColor: frontText.bgColor,
          padding: frontText.padding,
          margin: frontText.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Separator",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: separator.text,
      onChange: newVal => setAttributes({
        separator: {
          text: newVal,
          color: separator.color,
          bgColor: separator.bgColor,
          padding: separator.padding,
          margin: separator.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Meta Value Return",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-3"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "font-bold"
    }, "Items Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, itemWrapSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "font-bold"
    }, "Caetgory Items"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, itemSelector, '{}', " ")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, ".pg-postMeta a", '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "font-bold"
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, itemSeparatorSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "font-bold"
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, frontTextSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "font-bold"
    }, "Post Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, postCountSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, meta.key.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: meta.key,
      onChange: newVal => {
        setAttributes({
          meta: {
            key: newVal,
            prefix: meta.prefix,
            color: meta.postfix,
            color: meta.color,
            bgColor: meta.bgColor,
            padding: meta.padding,
            margin: meta.margin
          }
        });
      }
    }), categories.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pg-postMeta"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "frontText inline-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, null, frontText.text)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, null, metaHtml)))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-tags/index.js":
/*!***************************************!*\
  !*** ./src/blocks/post-tags/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");














const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.registerBlockType)("post-grid/post-tags", {
  title: "Post Tags",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M8.1 12.3c.1.1.3.3.5.3.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.4-.2.5-.3l3-3c.3-.3.5-.7.5-1.1 0-.4-.2-.8-.5-1.1L9.7 3.5c-.1-.2-.3-.3-.5-.3H5c-.4 0-.8.4-.8.8v4.2c0 .2.1.4.2.5l3.7 3.6zM5.8 4.8h3.1l3.4 3.4v.1l-3 3 .5.5-.7-.5-3.3-3.4V4.8zM4 20h9v-1.5H4V20zm0-5.5V16h16v-1.5H4z"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    items: {
      type: 'object',
      default: {
        prefix: '',
        postfix: '',
        maxCount: 99,
        postCount: false,
        class: 'item inline-block',
        linkTarget: '',
        linkAttr: [],
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    separator: {
      type: 'object',
      default: {
        class: 'inline-block',
        text: ', ',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    frontText: {
      type: 'object',
      default: {
        text: 'Tags: ',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;
    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;
    var blockCssY = attributes.blockCssY;
    var customCss = attributes.customCss;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense()); // Wrapper CSS Class Selectors

    const itemWrapSelector = '.pg-postCategories';
    const itemSelector = '.pg-postCategories .item';
    const itemSeparatorSelector = '.pg-postCategories .separator';
    const frontTextSelector = '.pg-postCategories .frontText';
    const postCountSelector = '.pg-postCategories .postCount';
    var breakPointList = [];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = items.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: responsive,
          margin: items.margin
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[itemSelector]['padding-top'] != undefined ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[itemSelector]['padding-right'] != undefined ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[itemSelector]['padding-bottom'] != undefined ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[itemSelector]['padding-left'] != undefined ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = items.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: items.padding,
          margin: responsive
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[itemSelector]['margin-top'] != undefined ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[itemSelector]['margin-right'] !== undefined ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[itemSelector]['margin-bottom'] !== undefined ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[itemSelector]['margin-left'] !== undefined ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    const [categoryCount, setcategoryCount] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0); // Using the hook.

    const [postCategoriesData, setPostCategoriesData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.

    const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.

    const [postCategoriesX, setPostCategoriesX] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', postType, 'tags', postId);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      console.log('Listening postCategoriesX: ', postCategoriesX);
      setPostCategoriesData([]);
      setCategories([]);
      setcategoryCount(categories.length - 1);

      for (x in postCategoriesX) {
        var catId = postCategoriesX[x];
        console.log(x);
        var assd = x;

        if (x) {
          _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
            path: '/wp/v2/tags/' + catId,
            method: 'GET'
          }).then(res => {
            //console.log(res)
            setPostCategoriesData(current => [...current, res]);
            console.log(assd);
            setCategories(current => [...current, res]);
          });
        }
      }

      console.log(postCategoriesData);
    }, [postCategoriesX]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      var asdasd = postCategoriesData.slice(0, items.maxCount);
      setCategories(asdasd);
    }, [postCategoriesData]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      if (postCategoriesX.length > 0) {
        setcategoryCount(categories.length - 1);
        var asdasd = postCategoriesData.slice(0, items.maxCount);
        setCategories(asdasd);
      }
    }, [items]);

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postCategories');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      //console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
      generateBlockCssY();
    }, [items]);

    var linkAttrObj = () => {
      var sdsd = {};
      items.linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      });
      setlinkAttrItems(sdsd); //return sdsd;
    }; //console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }];
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    const post = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => select('core').getEntityRecord('postType', context['postType'], context['postId']));
    const termstaxonomy = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category', [4, 5])); //console.log('Hello');
    //console.log(post);

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      //console.log(x);
      //console.log(index);
      //console.log('Post Title');
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.AlignmentToolbar, {
      value: wrapper.textAlign,
      onChange: nextAlign => {
        setAttributes({
          wrapper: {
            textAlign: nextAlign,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Items Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: wrapper.class,
      onChange: newVal => {
        setAttributes({
          wrapper: {
            textAlign: wrapper.textAlign,
            class: newVal,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Items",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
      label: "Display Post Count",
      help: items.postCount ? 'Post Count Enabled' : 'Post Count Disabled',
      checked: items.postCount ? true : false,
      onChange: e => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount ? false : true,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Item Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.class,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: newVal,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Max Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.maxCount,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: newVal,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: items.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: newVal,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.prefix,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: newVal,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.postfix,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: newVal,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = items.linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: sdsd,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
        linkAttrObj();
      }
    }, "Add")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, items.linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
        className: "mr-2",
        value: items.linkAttr[i].id,
        onChange: newVal => {
          items.linkAttr[i].id = newVal;
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          items.linkAttr[i].val = newVal;
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          items.linkAttr.splice(i, 1);
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: items.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = items.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: responsive,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          color: responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: items.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = items.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: responsive,
            padding: items.padding,
            margin: items.margin
          }
        });
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: items.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: items.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Front Text",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: frontText.text,
      onChange: newVal => setAttributes({
        frontText: {
          text: newVal,
          color: frontText.color,
          bgColor: frontText.bgColor,
          padding: frontText.padding,
          margin: frontText.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Separator",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: separator.text,
      onChange: newVal => setAttributes({
        separator: {
          text: newVal,
          color: separator.color,
          bgColor: separator.bgColor,
          padding: separator.padding,
          margin: separator.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Items Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemWrapSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Caetgory Items"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemSelector, '{}', " ")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, ".pg-postCategories a", '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemSeparatorSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, frontTextSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Post Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, postCountSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-5"
    }), categories.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Spinner, null), categories.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "pg-postCategories"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "frontText inline-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, frontText.text)), categories.map((x, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        target: items.linkTarget,
        title: x.name
      }, linkAttrItems, {
        className: items.class,
        href: x.link
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, items.prefix, x.name, items.postfix), items.postCount == true && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "postCount"
      }, "(", x.count, ")"), categoryCount != index && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "separator"
      }, separator.text));
    })))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-terms/index.js":
/*!****************************************!*\
  !*** ./src/blocks/post-terms/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");














const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.registerBlockType)("post-grid/post-terms", {
  title: "Post Terms",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M8.1 12.3c.1.1.3.3.5.3.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.4-.2.5-.3l3-3c.3-.3.5-.7.5-1.1 0-.4-.2-.8-.5-1.1L9.7 3.5c-.1-.2-.3-.3-.5-.3H5c-.4 0-.8.4-.8.8v4.2c0 .2.1.4.2.5l3.7 3.6zM5.8 4.8h3.1l3.4 3.4v.1l-3 3 .5.5-.7-.5-3.3-3.4V4.8zM4 20h9v-1.5H4V20zm0-5.5V16h16v-1.5H4z"
    }))
  },
  attributes: {
    taxonomy: {
      "type": "string",
      "default": ''
    },
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    items: {
      type: 'object',
      default: {
        prefix: '',
        postfix: '',
        maxCount: 99,
        postCount: false,
        class: 'item inline-block',
        linkTarget: '',
        linkAttr: [],
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    separator: {
      type: 'object',
      default: {
        class: 'inline-block',
        text: ', ',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    frontText: {
      type: 'object',
      default: {
        text: 'Tags: ',
        class: 'inline-block',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;
    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;
    var taxonomy = attributes.taxonomy;
    var blockCssY = attributes.blockCssY;
    var customCss = attributes.customCss;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense());
    const [isLoaded, setIsLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Wrapper CSS Class Selectors

    const itemWrapSelector = '.pg-postTerms';
    const itemSelector = '.pg-postTerms .item';
    const itemSeparatorSelector = '.pg-postTerms .separator';
    const frontTextSelector = '.pg-postTerms .frontText';
    const postCountSelector = '.pg-postTerms .postCount';
    var breakPointList = [];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = items.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: responsive,
          margin: items.margin
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[itemSelector]['padding-top'] != undefined ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[itemSelector]['padding-right'] != undefined ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[itemSelector]['padding-bottom'] != undefined ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[itemSelector]['padding-left'] != undefined ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = items.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        items: {
          prefix: items.prefix,
          postfix: items.postfix,
          maxCount: items.maxCount,
          postCount: items.postCount,
          class: items.class,
          linkTarget: items.linkTarget,
          linkAttr: items.linkAttr,
          color: items.color,
          bgColor: items.bgColor,
          padding: items.padding,
          margin: responsive
        }
      });
      blockCssY.items[itemSelector] = blockCssY.items[itemSelector] != undefined ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[itemSelector]['margin-top'] != undefined ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[itemSelector]['margin-right'] !== undefined ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[itemSelector]['margin-bottom'] !== undefined ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[itemSelector]['margin-left'] !== undefined ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    const [categoryCount, setcategoryCount] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0); // Using the hook.

    const [postCategoriesData, setPostCategoriesData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.

    const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.

    const [taxonomies, setTaxonomies] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Using the hook.
    // const [postCategoriesX, setPostCategoriesX] = useState([]); // Using the hook.

    const [postCategoriesX, setPostCategoriesX] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', postType, taxonomy, postId);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      console.log('Listening postCategoriesX: ', postCategoriesX);
      setPostCategoriesData([]);
      setCategories([]);
      setcategoryCount(categories.length - 1);

      for (x in postCategoriesX) {
        var catId = postCategoriesX[x];
        console.log(x);
        var assd = x;

        if (x) {
          _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
            path: '/wp/v2/' + taxonomy + '/' + catId,
            method: 'GET'
          }).then(res => {
            //console.log(res)
            setPostCategoriesData(current => [...current, res]);
            console.log(assd);
            setCategories(current => [...current, res]);
          });
        }
      }

      console.log(postCategoriesData);
    }, [postCategoriesX]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      var asdasd = postCategoriesData.slice(0, items.maxCount);
      setCategories(asdasd);
    }, [postCategoriesData]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      // console.log(useEntityProp('postType', postType, taxonomy, postId));
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/wp/v2/' + taxonomy + '/?post=' + postId,
        method: 'GET'
      }).then(res => {
        console.log(res);
        setPostCategoriesData(current => [...current, res]); // console.log(assd)

        setCategories(current => [...current, res]);
      });
    }, [taxonomy]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      // console.log(useEntityProp('postType', postType, taxonomy, postId));
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/wp/v2/taxonomies/?type=' + postType,
        method: 'GET'
      }).then(res => {
        console.log(res);

        for (x in res) {
          var item = res[x];

          if (x == 'category') {
            setTaxonomies(current => [...current, {
              label: item.name,
              value: 'categories'
            }]);
          } else if (x == 'post_tag') {
            setTaxonomies(current => [...current, {
              label: item.name,
              value: 'tags'
            }]);
          } else {
            setTaxonomies(current => [...current, {
              label: item.name,
              value: x
            }]);
          } //console.log(x)

        } // console.log(assd)

      });
    }, [isLoaded]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      console.log(postCategoriesX);

      if (postCategoriesX != undefined && postCategoriesX.length > 0) {
        setcategoryCount(categories.length - 1);
        var asdasd = postCategoriesData.slice(0, items.maxCount);
        setCategories(asdasd);
      }
    }, [items]);
    const closeListener = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.subscribe)(() => {
      const isReady = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.select)('core/editor').__unstableIsEditorReady();

      if (!isReady) {
        // Editor not ready.
        return;
      } // Close the listener as soon as we know we are ready to avoid an infinite loop.


      closeListener(); // Your code is placed after this comment, once the editor is ready.

      setIsLoaded(true);
    });

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postTerms");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postTerms").outerHTML = "";
          }

          var divWrap = '<div id="css-block-postTerms"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-postTerms');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postTerms");

        if (divWrap != undefined) {
          document.getElementById("css-block-postTerms").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postTerms"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-postTerms');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      //console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
      generateBlockCssY();
    }, [items]);

    var linkAttrObj = () => {
      var sdsd = {};
      items.linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      });
      setlinkAttrItems(sdsd); //return sdsd;
    }; //console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }];
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      //console.log(x);
      //console.log(index);
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.AlignmentToolbar, {
      value: wrapper.textAlign,
      onChange: nextAlign => {
        setAttributes({
          wrapper: {
            textAlign: nextAlign,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "px-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Taxonomies"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: taxonomy,
      options: taxonomies,
      onChange: newVal => {
        setAttributes({
          taxonomy: newVal
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Items Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: wrapper.class,
      onChange: newVal => {
        setAttributes({
          wrapper: {
            textAlign: wrapper.textAlign,
            class: newVal,
            color: wrapper.color,
            bgColor: wrapper.bgColor,
            padding: wrapper.padding,
            margin: wrapper.margin
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Items",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
      label: "Display Post Count",
      help: items.postCount ? 'Post Count Enabled' : 'Post Count Disabled',
      checked: items.postCount ? true : false,
      onChange: e => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount ? false : true,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Item Class"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.class,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: newVal,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Max Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.maxCount,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: newVal,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: items.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: newVal,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.prefix,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: newVal,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: items.postfix,
      onChange: newVal => {
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: newVal,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = items.linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: sdsd,
            color: items.color,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
        linkAttrObj();
      }
    }, "Add")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, items.linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
        className: "mr-2",
        value: items.linkAttr[i].id,
        onChange: newVal => {
          items.linkAttr[i].id = newVal;
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          items.linkAttr[i].val = newVal;
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          items.linkAttr.splice(i, 1);
          var ssdsd = items.linkAttr.concat([]);
          setAttributes({
            items: {
              prefix: items.prefix,
              postfix: items.postfix,
              maxCount: items.maxCount,
              postCount: items.postCount,
              class: items.class,
              linkTarget: items.linkTarget,
              linkAttr: ssdsd,
              color: items.color,
              bgColor: items.bgColor,
              padding: items.padding,
              margin: items.margin
            }
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: items.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = items.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: responsive,
            bgColor: items.bgColor,
            padding: items.padding,
            margin: items.margin
          }
        });
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          color: responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ColorPalette, {
      value: items.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = items.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          items: {
            prefix: items.prefix,
            postfix: items.postfix,
            maxCount: items.maxCount,
            postCount: items.postCount,
            class: items.class,
            linkTarget: items.linkTarget,
            linkAttr: items.linkAttr,
            color: items.color,
            bgColor: responsive,
            padding: items.padding,
            margin: items.margin
          }
        });
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: items.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_11__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
      label: "",
      values: items.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Front Text",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: frontText.text,
      onChange: newVal => setAttributes({
        frontText: {
          text: newVal,
          color: frontText.color,
          bgColor: frontText.bgColor,
          padding: frontText.padding,
          margin: frontText.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Separator",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalInputControl, {
      value: separator.text,
      onChange: newVal => setAttributes({
        separator: {
          text: newVal,
          color: separator.color,
          bgColor: separator.bgColor,
          padding: separator.padding,
          margin: separator.margin
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Items Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemWrapSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Caetgory Items"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemSelector, '{}', " ")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, ".pg-postTerms a", '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Separator"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, itemSeparatorSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Front Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, frontTextSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Post Count"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, postCountSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-5"
    }), taxonomy.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Taxonomies"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "",
      value: taxonomy,
      options: taxonomies,
      onChange: newVal => {
        setAttributes({
          taxonomy: newVal
        });
      }
    })), categories.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Spinner, null), categories.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "pg-postTerms"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "frontText inline-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, frontText.text)), categories.map((x, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        target: items.linkTarget,
        title: x.name
      }, linkAttrItems, {
        className: items.class,
        href: x.link
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, items.prefix, x.name, items.postfix), items.postCount == true && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "postCount"
      }, "(", x.count, ")"), categoryCount != index && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "separator"
      }, separator.text));
    })))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/post-title/index.js":
/*!****************************************!*\
  !*** ./src/blocks/post-title/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/typography */ "./src/components/typography/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");













const {
  RawHTML
} = wp.element;




var myStore = wp.data.select('my-shop');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)("post-grid/post-title", {
  title: "Post Title",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M4 14.5h16V16H4zM4 18.5h9V20H4zM4 4h3c2 0 3 .86 3 2.583 0 .891-.253 1.554-.76 1.988-.505.435-1.24.652-2.204.652H5.542V12H4V4zm2.855 4c.53 0 .924-.114 1.18-.343.266-.228.398-.579.398-1.051 0-.473-.132-.82-.397-1.04-.265-.229-.67-.343-1.217-.343H5.542V8h1.313z"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'h2',
          class: ''
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        }
      }
    },
    postTitle: {
      type: 'object',
      default: {
        options: {
          isLink: true,
          linkTarget: '',
          linkAttr: [],
          customUrl: '',
          class: ''
        },
        typo: {
          fontSize: {},
          //{ val: '18', unit: 'px' }
          lineHeight: {},
          // { val: '18', unit: 'px' }
          letterSpacing: {},
          // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {},
          //overline, line-through, underline
          textTransform: {}
        },
        styles: {
          textAlign: {},
          display: {},
          width: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        }
      }
    },
    prefix: {
      type: 'object',
      default: {
        options: {
          text: '',
          class: 'prefix'
        },
        styles: {
          color: {},
          bgColor: {}
        }
      }
    },
    postfix: {
      type: 'object',
      default: {
        options: {
          text: '',
          class: 'prefix'
        },
        styles: {
          color: {},
          bgColor: {}
        }
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    blockId: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;
    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    let postTitle = attributes.postTitle;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense());
    const [customTags, setCustomTags] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [currentPostTitle, setCurrentPostTitle] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'title', postId);
    const [currentPostUrl, setCurrentPostUrl] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'link', postId);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      setAttributes({
        blockId: blockIdX
      });
      generateBlockCssY();
      customTags['currentYear'] = '2022';
      customTags['currentMonth'] = '07';
      customTags['currentDay'] = '27';
      customTags['currentDate'] = '27';
      customTags['currentTime'] = '27';
      customTags['postPublishDate'] = '123';
      customTags['postModifiedDate'] = '123';
      customTags['termId'] = '';
      customTags['termTitle'] = '';
      customTags['termDescription'] = '';
      customTags['termPostCount'] = '';
      customTags['postTagTitle'] = 'First Tag Title';
      customTags['postTagsTitle'] = 'First Tag Title';
      customTags['postCategoryTitle'] = 'First Category Title';
      customTags['postCategoriesTitle'] = 'First Categories Title';
      customTags['postTermTitle'] = 'First Term Title';
      customTags['postTermsTitle'] = 'List of all terms title';
      customTags['postId'] = '123';
      customTags['postStatus'] = '123';
      customTags['authorId'] = '123';
      customTags['authorName'] = 'Nur Hasan';
      customTags['authorFirstName'] = 'Nur';
      customTags['authorLastName'] = 'Hasan';
      customTags['authorDescription'] = 'Hasan';
      customTags['excerpt'] = 'Here is the post excerpt';
      customTags['rankmathTitle'] = 'Hasan';
      customTags['rankmathPermalink'] = 'Hasan';
      customTags['rankmathExcerpt'] = 'Hasan';
      customTags['rankmathFocusKeyword'] = 'Hasan';
      customTags['rankmathFocusKeywords'] = 'Hasan';
      customTags['rankmathOrgname'] = 'Hasan';
      customTags['rankmathOrgurl'] = 'Hasan';
      customTags['rankmathOrglogo'] = 'Hasan';
      customTags['siteTitle'] = '';
      customTags['siteDescription'] = '';
      customTags['postMeta'] = '';
      customTags['separator'] = '';
      customTags['searchTerms'] = '';
      customTags['counter'] = '1';
    }, [clientId]); // Wrapper CSS Class Selectors

    const titleWrapperSelector = blockClass;
    const titleLinkSelector = postTitle.options.isLink ? blockClass + ' a' : blockClass;
    const titlePrefixSelector = blockClass + ' .prefix';
    const titlePostfixSelector = blockClass + ' .postfix';
    var breakPointList = [{
      label: 'Select..',
      icon: '',
      value: ''
    }];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function handleLinkClick(ev) {
      //console.log(ev)
      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }

    function paddingControl(nextValues) {
      var responsive = postTitle.styles.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      var styles = { ...postTitle.styles,
        padding: responsive
      };
      setAttributes({
        postTitle: { ...postTitle,
          styles: styles
        }
      });
      blockCssY.items[titleLinkSelector] = blockCssY.items[titleLinkSelector] != undefined ? blockCssY.items[titleLinkSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[titleLinkSelector]['padding-top'] != undefined ? blockCssY.items[titleLinkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[titleLinkSelector]['padding-right'] != undefined ? blockCssY.items[titleLinkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[titleLinkSelector]['padding-bottom'] != undefined ? blockCssY.items[titleLinkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[titleLinkSelector]['padding-left'] != undefined ? blockCssY.items[titleLinkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'padding-left': paddingLeft
        };
      } //setAttributes({ blockCssY: { items: blockCssY.items } });

    }

    function marginControl(nextValues) {
      var responsive = postTitle.styles.margin;
      responsive[breakPointX] = nextValues;
      var styles = { ...postTitle.styles,
        margin: responsive
      };
      setAttributes({
        postTitle: { ...postTitle,
          styles: styles
        }
      });
      blockCssY.items[titleLinkSelector] = blockCssY.items[titleLinkSelector] != undefined ? blockCssY.items[titleLinkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[titleLinkSelector]['margin-top'] != undefined ? blockCssY.items[titleLinkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[titleLinkSelector]['margin-right'] !== undefined ? blockCssY.items[titleLinkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[titleLinkSelector]['margin-bottom'] !== undefined ? blockCssY.items[titleLinkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[titleLinkSelector]['margin-left'] !== undefined ? blockCssY.items[titleLinkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'margin-left': marginLeft
        };
      } //setAttributes({ blockCssY: { items: blockCssY.items } });

    }

    function generateBlockCssY() {
      var reponsiveCssGroups = {};

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      } //return false;


      var reponsiveCssMobile = '';

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCssMobile += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCssMobile += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssMobile += attrName + ':' + attrValue + ';';
          }

          reponsiveCssMobile += '}';
        }

        reponsiveCssMobile += '}';
      }

      var reponsiveCssTablet = '';

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCssTablet += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCssTablet += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssTablet += attrName + ':' + attrValue + ';';
          }

          reponsiveCssTablet += '}';
        }

        reponsiveCssTablet += '}';
      }

      var reponsiveCssDesktop = '';

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCssDesktop += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCssDesktop += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssDesktop += attrName + ':' + attrValue + ';';
          }

          reponsiveCssDesktop += '}';
        }

        reponsiveCssDesktop += '}'; //console.log(reponsiveCssDesktop);
      }

      var reponsiveCss = reponsiveCssMobile + reponsiveCssTablet + reponsiveCssDesktop;
      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-" + blockId);

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-" + blockId).outerHTML = "";
          }

          var divWrap = '<div id="css-block-' + blockId + '"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-' + blockId);
          var str = '<style>' + reponsiveCss + customCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-" + blockId);

        if (divWrap != undefined) {
          document.getElementById("css-block-" + blockId).outerHTML = "";
        }

        var divWrap = '<div id="css-block-' + blockId + '"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-' + blockId);
        var str = '<style>' + reponsiveCss + customCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      setAttributes({
        customCss: customCss
      });
      generateBlockCssY();
    }, [customCss]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      linkAttrObj();
    }, [postTitle]);

    var linkAttrObj = () => {
      var sdsd = {};
      postTitle.options.linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      });
      setlinkAttrItems(sdsd);
    };

    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }];
    const [setSome, setSomeState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [stateX, setStateX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('Old Value');
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    var postUrl = postTitle.options.customUrl != undefined && postTitle.options.customUrl.length > 0 ? postTitle.options.customUrl : currentPostUrl;
    const CustomTag = `${wrapper.options.tag}`;

    function onChangeTypo(typoX) {
      //console.log(typoX);
      setAttributes({
        postTitle: { ...postTitle,
          typo: typoX
        }
      });
      var newValuesObjX = {};
      console.log(typoX);

      if (typoX.fontFamily[breakPointX] != undefined) {
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'font-family': typoX.fontFamily
        };
      }

      if (typoX.fontSize[breakPointX] != undefined) {
        var fontSizeVal = typoX.fontSize[breakPointX].val ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = typoX.fontSize[breakPointX].unit ? typoX.fontSize[breakPointX].unit : 'px';
        var fontSizeX = blockCssY.items[titleLinkSelector]['font-size'] != undefined ? blockCssY.items[titleLinkSelector]['font-size'] : {};
        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'font-size': fontSizeX
        };
      }

      if (typoX.lineHeight[breakPointX] != undefined) {//var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        //var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';
        // var lineHeightX = (blockCssY.items[titleLinkSelector]['line-height'] != undefined) ? blockCssY.items[titleLinkSelector]['line-height'] : {};
        // lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;
        // blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'line-height': lineHeightX };
      }

      if (typoX.lineHeight[breakPointX] != undefined) {
        var lineHeightVal = typoX.lineHeight[breakPointX].val ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = typoX.lineHeight[breakPointX].unit ? typoX.lineHeight[breakPointX].unit : 'px';
        console.log(lineHeightUnit);
        var lineHeightX = blockCssY.items[titleLinkSelector]['line-height'] != undefined ? blockCssY.items[titleLinkSelector]['line-height'] : {};
        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'line-height': lineHeightX
        };
      }

      if (typoX.letterSpacing[breakPointX] != undefined) {
        var letterSpacingVal = typoX.letterSpacing[breakPointX].val ? typoX.letterSpacing[breakPointX].val : 16;
        var letterSpacingUnit = typoX.letterSpacing[breakPointX].unit ? typoX.letterSpacing[breakPointX].unit : 'px';
        var letterSpacingX = blockCssY.items[titleLinkSelector]['letter-spacing'] != undefined ? blockCssY.items[titleLinkSelector]['letter-spacing'] : {};
        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'letter-spacing': letterSpacingX
        };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'font-weight': typoX.fontWeight
        };
      }

      if (typoX.textDecoration[breakPointX] != undefined) {
        var str = {};
        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = textDecorationX.length > 0 ? textDecorationX.join(' ') : '';
        str[breakPointX] = textDecorationXStr; //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'text-decoration': str
        };
      }

      if (typoX.textTransform[breakPointX] != undefined) {
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
          'text-transform': typoX.textTransform
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function onChangeBreakPoint(x, index) {
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.AlignmentToolbar, {
      value: wrapper.styles.textAlign,
      onChange: nextAlign => {
        var textAlign = wrapper.styles.textAlign;
        textAlign[breakPointX] = nextAlign;
        var styles = { ...wrapper.styles,
          textAlign: textAlign
        };
        setAttributes({
          wrapper: {
            options: wrapper.options,
            styles: styles
          }
        });
        blockCssY.items[titleWrapperSelector] = { ...blockCssY.items[titleWrapperSelector],
          'text-align': textAlign
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "px-3",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Tag"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: wrapper.options.tag,
      options: [{
        label: 'No Wrapper',
        value: ''
      }, {
        label: 'H1',
        value: 'h1'
      }, {
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'span',
        value: 'SPAN'
      }, {
        label: 'div',
        value: 'DIV'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: newVal => {
        var options = { ...wrapper.options,
          tag: newVal
        };
        setAttributes({
          wrapper: {
            styles: wrapper.styles,
            options: options
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Post Title",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
      label: "Linked with post?",
      help: postTitle.options.isLink ? 'Linked with post URL' : 'Not linked to post URL.',
      checked: postTitle.options.isLink ? true : false,
      onChange: e => {
        var options = { ...postTitle.options,
          isLink: postTitle.options.isLink ? false : true
        };
        setAttributes({
          postTitle: { ...postTitle,
            options: options
          }
        });
      }
    }), postTitle.options.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: postTitle.options.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        var options = { ...postTitle.options,
          linkTarget: newVal
        };
        setAttributes({
          postTitle: { ...postTitle,
            options: options
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Url"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postTitle.options.customUrl,
      onChange: newVal => {
        var options = { ...postTitle.options,
          customUrl: newVal
        };
        setAttributes({
          postTitle: { ...postTitle,
            options: options
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = postTitle.options.linkAttr.concat({
          id: '',
          val: ''
        });
        var options = { ...postTitle.options,
          linkAttr: sdsd
        };
        setAttributes({
          postTitle: { ...postTitle,
            options: options
          }
        });
        linkAttrObj();
      }
    }, "Add")), postTitle.options.linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: postTitle.options.linkAttr[i].id,
        onChange: newVal => {
          postTitle.options.linkAttr[i].id = newVal;
          var ssdsd = postTitle.options.linkAttr.concat([]);
          var options = { ...postTitle.options,
            linkAttr: ssdsd
          };
          setAttributes({
            postTitle: { ...postTitle,
              options: options
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          postTitle.options.linkAttr[i].val = newVal;
          var ssdsd = postTitle.options.linkAttr.concat([]);
          var options = { ...postTitle.options,
            linkAttr: ssdsd
          };
          setAttributes({
            postTitle: { ...postTitle,
              options: options
            }
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          postTitle.options.linkAttr.splice(i, 1);
          var ssdsd = postTitle.options.linkAttr.concat([]);
          var options = { ...postTitle.options,
            linkAttr: ssdsd
          };
          setAttributes({
            postTitle: {
              styles: postTitle.styles,
              options: options
            }
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: postTitle.styles.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitle.styles.color).length == 0) {
          newValuesObj[breakPointX] = newVal;
        } else {
          newValuesObj = postTitle.styles.color;
          newValuesObj[breakPointX] = newVal;
        }

        var styles = { ...postTitle.styles,
          color: newValuesObj
        };
        setAttributes({
          postTitle: { ...postTitle,
            styles: styles
          }
        });
        var newValuesObjX = {};

        if (blockCssY.items[titleLinkSelector] == undefined) {
          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
            color: newValuesObj
          };
        } else {
          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
            color: newValuesObj
          };
        }

        setAttributes({
          blockCssY: {
            items: newValuesObjX
          }
        }); // blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'color': newValuesObj };
        // setAttributes({ blockCssY: { items: blockCssY.items } });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: postTitle.styles.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitle.styles.bgColor).length == 0) {
          newValuesObj[breakPointX] = newVal;
        } else {
          newValuesObj = postTitle.styles.bgColor;
          newValuesObj[breakPointX] = newVal;
        }

        var styles = { ...postTitle.styles,
          bgColor: newValuesObj
        };
        setAttributes({
          postTitle: { ...postTitle,
            styles: styles
          }
        });
        var newValuesObjX = {};

        if (blockCssY.items[titleLinkSelector] == undefined) {
          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
            'background-color': newValuesObj
          };
        } else {
          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
            'background-color': newValuesObj
          };
        }

        setAttributes({
          blockCssY: {
            items: newValuesObjX
          }
        }); //blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'background-color': newValuesObj };
        //setAttributes({ blockCssY: { items: blockCssY.items } });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "font-bold"
    }, "Typography"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_typography__WEBPACK_IMPORTED_MODULE_11__["default"], {
      typo: postTitle.typo,
      breakPointX: breakPointX,
      onChange: onChangeTypo,
      setAttributes: setAttributes,
      postTitleX: postTitle
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Display"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: postTitle.styles.display[breakPointX],
      options: [{
        label: 'Select..',
        value: ''
      }, {
        label: 'inline',
        value: 'inline'
      }, {
        label: 'inline-block',
        value: 'inline-block'
      }, {
        label: 'block',
        value: 'block'
      }],
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitle.styles.display).length == 0) {
          newValuesObj[breakPointX] = newVal;
        } else {
          newValuesObj = postTitle.styles.display;
          newValuesObj[breakPointX] = newVal;
        }

        var styles = { ...postTitle.styles,
          display: newValuesObj
        };
        setAttributes({
          postTitle: { ...postTitle,
            styles: styles
          }
        });
        var newValuesObjX = {};

        if (blockCssY.items[titleLinkSelector] == undefined) {
          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
            display: newValuesObj
          };
        } else {
          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector],
            display: newValuesObj
          };
        }

        setAttributes({
          blockCssY: {
            items: newValuesObjX
          }
        }); //blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'display': newValuesObj };
        //setAttributes({ blockCssY: { items: blockCssY.items } });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: postTitle.styles.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: postTitle.styles.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Prefix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: prefix.options.text,
      onChange: newVal => {
        var options = { ...prefix.options,
          text: newVal
        };
        setAttributes({
          prefix: {
            styles: prefix.styles,
            options: options
          }
        }); // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, bgColor: prefix.bgColor } })
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Postfix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postfix.options.text,
      onChange: newVal => {
        var options = { ...postfix.options,
          text: newVal
        };
        setAttributes({
          postfix: {
            styles: postfix.styles,
            options: options
          }
        }); // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, bgColor: postfix.bgColor } })
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Title Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titleWrapperSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Title link"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titleLinkSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titlePrefixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, titlePostfixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, wrapper.options.tag && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(CustomTag, {
      className: [blockId]
    }, postTitle.options.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      onClick: handleLinkClick
    }, linkAttrItems, {
      href: postUrl,
      target: postTitle.options.linkTarget
    }), prefix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.options.class
    }, prefix.options.text), currentPostTitle, postfix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.options.class
    }, postfix.options.text)), !postTitle.options.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, prefix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.options.class
    }, prefix.options.text), currentPostTitle, postfix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.options.class
    }, postfix.options.text))), wrapper.options.tag.length == 0 && postTitle.options.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      onClick: handleLinkClick,
      className: [blockId]
    }, linkAttrItems, {
      href: postUrl,
      target: postTitle.options.linkTarget
    }), prefix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.options.class
    }, prefix.options.text), currentPostTitle, postfix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.options.class
    }, postfix.options.text)), wrapper.options.tag.length == 0 && !postTitle.options.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: blockId
    }, prefix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.options.class
    }, prefix.options.text), currentPostTitle, postfix.options.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.options.class
    }, postfix.options.text)))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/read-more/index.js":
/*!***************************************!*\
  !*** ./src/blocks/read-more/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/store.js");
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _components_breakpoint_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/breakpoint-toggle */ "./src/components/breakpoint-toggle/index.js");













const {
  RawHTML
} = wp.element;



var myStore = wp.data.select('my-shop'); ////console.log(wp.data.select('my-shop').getBreakPoint('food'))
//console.log(myStore.getBreakPoint());
////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)("post-grid/read-more", {
  title: "Read More",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      focusable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"
    }))
  },
  attributes: {
    wrapper: {
      type: 'object',
      default: {
        textAlign: '',
        tag: '',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    readMore: {
      type: 'object',
      default: {
        text: 'Read More',
        textAlign: '',
        isLink: true,
        linkTarget: '',
        customUrl: '',
        class: '',
        color: {},
        bgColor: {},
        padding: {},
        margin: {}
      }
    },
    prefix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    postfix: {
      "type": "object",
      "default": {
        text: '',
        class: '',
        color: {},
        bgColor: {}
      }
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": {
        items: {}
      }
    },
    blockCssY: {
      "type": "object",
      "default": {
        items: {}
      }
    }
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],
  supports: {
    "align": ["wide", "full"]
  },
  category: "post-grid",
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;
    var readMore = attributes.readMore;
    var wrapper = attributes.wrapper;
    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var postId = context['postId'];
    var postType = context['postType'];
    const [breakPointX, setBreakPointX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getBreakPoint());
    const [license, setLicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(myStore.getLicense());
    const [currentPostUrl, setCurrentPostUrl] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'link', postId); //console.log(readMore);
    // Wrapper CSS Class Selectors

    const readmoreWrapperSelector = '.pg-readMore';
    var readmoreLinkSelector = '';

    if (wrapper.tag.length != 0) {
      if (readMore.isLink) {
        readmoreLinkSelector = '.pg-readMore a';
      } else {
        readmoreLinkSelector = '.pg-readMore';
      }
    } else {
      readmoreLinkSelector = '.pg-readMore';
    }

    const readmorePrefixSelector = '.pg-readMore .prefix';
    const readmorePostfixSelector = '.pg-readMore .postfix';
    var breakPointList = [{
      label: 'Select..',
      icon: '',
      value: ''
    }];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    function paddingControl(nextValues) {
      var responsive = readMore.padding;
      responsive[breakPointX] = nextValues; //console.log(nextValues);

      setAttributes({
        readMore: {
          text: readMore.text,
          textAlign: readMore.textAlign,
          class: readMore.class,
          color: readMore.color,
          bgColor: readMore.bgColor,
          padding: responsive,
          margin: readMore.margin
        }
      });
      blockCssY.items[readmoreLinkSelector] = blockCssY.items[readmoreLinkSelector] != undefined ? blockCssY.items[readmoreLinkSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = blockCssY.items[readmoreLinkSelector]['padding-top'] != undefined ? blockCssY.items[readmoreLinkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'padding-top': paddingTop
        };
      }

      if (nextValues.right != undefined) {
        var paddingRight = blockCssY.items[readmoreLinkSelector]['padding-right'] != undefined ? blockCssY.items[readmoreLinkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'padding-right': paddingRight
        };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = blockCssY.items[readmoreLinkSelector]['padding-bottom'] != undefined ? blockCssY.items[readmoreLinkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'padding-bottom': paddingBottom
        };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = blockCssY.items[readmoreLinkSelector]['padding-left'] != undefined ? blockCssY.items[readmoreLinkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'padding-left': paddingLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function marginControl(nextValues) {
      var responsive = readMore.margin;
      responsive[breakPointX] = nextValues;
      setAttributes({
        readMore: {
          text: readMore.text,
          textAlign: readMore.textAlign,
          class: readMore.class,
          color: readMore.color,
          bgColor: readMore.bgColor,
          padding: readMore.padding,
          margin: responsive
        }
      });
      blockCssY.items[readmoreLinkSelector] = blockCssY.items[readmoreLinkSelector] != undefined ? blockCssY.items[readmoreLinkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = blockCssY.items[readmoreLinkSelector]['margin-top'] != undefined ? blockCssY.items[readmoreLinkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'margin-top': marginTop
        };
      }

      if (nextValues.right != undefined) {
        var marginRight = blockCssY.items[readmoreLinkSelector]['margin-right'] !== undefined ? blockCssY.items[readmoreLinkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'margin-right': marginRight
        };
      }

      if (nextValues.bottom != undefined) {
        var marginBottom = blockCssY.items[readmoreLinkSelector]['margin-bottom'] !== undefined ? blockCssY.items[readmoreLinkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'margin-bottom': marginBottom
        };
      }

      if (nextValues.left != undefined) {
        var marginLeft = blockCssY.items[readmoreLinkSelector]['margin-left'] !== undefined ? blockCssY.items[readmoreLinkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left;
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'margin-left': marginLeft
        };
      }

      setAttributes({
        blockCssY: {
          items: blockCssY.items
        }
      });
    }

    function generateBlockCssY() {
      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {
        var attrs = blockCssY.items[selector];

        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {
            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = [];
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = [];
            }

            reponsiveCssGroups[device][selector].push({
              'attr': attr,
              'val': attrValue
            });
          }
        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }

      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];
          reponsiveCss += selector + '{';

          for (var index in attrs) {
            var attr = attrs[index];
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }

          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      } //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-readMore");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-readMore").outerHTML = "";
          }

          var divWrap = '<div id="css-block-readMore"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);
          var csswrappg = iframeDocument.getElementById('css-block-readMore');
          var str = '<style>' + reponsiveCss + '</style>';
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200);
      } else {
        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-readMore");

        if (divWrap != undefined) {
          document.getElementById("css-block-readMore").outerHTML = "";
        }

        var divWrap = '<div id="css-block-readMore"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);
        var csswrappg = document.getElementById('css-block-readMore');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);
      }
    }

    var [linkAttrItems, setlinkAttrItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // Using the hook.

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      //console.log('Listening blockCss: ', blockCss);
      generateBlockCssY();
    }, [blockCssY]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
      ////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
    }, [linkAttr]);

    var linkAttrObj = () => {
      var sdsd = {};
      linkAttr.map(x => {
        if (x.val) sdsd[x.id] = x.val;
      }); ////console.log(sdsd);

      setlinkAttrItems(sdsd); //return sdsd;
    }; ////console.log(breakPointList);


    const colors = [{
      name: '9DD6DF',
      color: '#9DD6DF'
    }, {
      name: '18978F',
      color: '#18978F'
    }, {
      name: 'A084CF',
      color: '#A084CF'
    }, {
      name: 'DFBB9D',
      color: '#DFBB9D'
    }, {
      name: '774360',
      color: '#774360'
    }, {
      name: '3AB0FF',
      color: '#3AB0FF'
    }, {
      name: '51557E',
      color: '#51557E'
    }]; //const [blockCss, setBlockCss] = useState({ items: {} });

    const [setSome, setSomeState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [stateX, setStateX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('Old Value');
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post');
    var postUrl = readMore.customUrl != undefined && readMore.customUrl.length > 0 ? readMore.customUrl : currentPostUrl; //console.log('Hello');

    const CustomTag = `${wrapper.tag}`;

    const MyDropdown = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Dropdown, {
      position: "bottom",
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
          title: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].name : '',
          variant: "secondary",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, {
          className: "text-lg "
        }, _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX] != undefined ? _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon : '<span class="icon-responsive font-bold"></span>'));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, breakPointList.map(x => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            //console.log(x.value);
            setPreviewDeviceType(x.value);
            var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
            asdsdsd.then(res => {
              setBreakPointX(res.breakpoint);
              generateBlockCssY();
            });
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RawHTML, null, x.icon));
      }))
    }));

    function onChangeBreakPoint(x, index) {
      setPreviewDeviceType(x.value);
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      asdsdsd.then(res => {
        setBreakPointX(res.breakpoint);
        generateBlockCssY();
      });
    }

    return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.AlignmentToolbar, {
      value: readMore.textAlign,
      onChange: nextAlign => {
        setAttributes({
          readMore: {
            textAlign: nextAlign,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
      key: "general"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "px-3",
      title: "General",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Wrapper",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Wrapper Tag"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: wrapper.tag,
      options: [{
        label: 'No Wrapper',
        value: ''
      }, {
        label: 'H1',
        value: 'h1'
      }, {
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'span',
        value: 'SPAN'
      }, {
        label: 'div',
        value: 'DIV'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: newVal => {
        {
          setAttributes({
            wrapper: {
              textAlign: wrapper.textAlign,
              tag: newVal,
              color: wrapper.color,
              bgColor: wrapper.bgColor,
              padding: wrapper.padding,
              margin: wrapper.margin
            }
          });
        }
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Read More",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: readMore.text,
      onChange: newVal => {
        setAttributes({
          readMore: {
            text: newVal,
            textAlign: readMore.textAlign,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
      label: "Linked with post?",
      help: readMore.isLink ? 'Linked with post URL' : 'Not linked to post URL.',
      checked: readMore.isLink ? true : false,
      onChange: e => {
        setAttributes({
          readMore: {
            text: readMore.text,
            textAlign: readMore.textAlign,
            isLink: readMore.isLink ? false : true,
            linkTarget: readMore.linkTarget,
            customUrl: readMore.customUrl,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
      }
    }), readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Link Target"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
      label: "",
      value: readMore.linkTarget,
      options: [{
        label: '_self',
        value: '_self'
      }, {
        label: '_blank',
        value: '_blank'
      }, {
        label: '_parent',
        value: '_parent'
      }, {
        label: '_top',
        value: '_top'
      }],
      onChange: newVal => {
        setAttributes({
          readMore: {
            text: readMore.text,
            textAlign: readMore.textAlign,
            isLink: readMore.isLink,
            linkTarget: newVal,
            customUrl: readMore.customUrl,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Url"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: readMore.customUrl,
      onChange: newVal => {
        setAttributes({
          readMore: {
            text: readMore.text,
            textAlign: readMore.textAlign,
            isLink: readMore.isLink,
            linkTarget: readMore.linkTarget,
            customUrl: newVal,
            class: readMore.class,
            color: readMore.color,
            bgColor: readMore.bgColor,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Custom Attributes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: " cursor-pointer px-3 text-white py-1 bg-blue-600",
      onClick: ev => {
        var sdsd = linkAttr.concat({
          id: '',
          val: ''
        });
        setAttributes({
          linkAttr: sdsd
        });
        linkAttrObj();
      }
    }, "Add")), linkAttr.map((x, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "my-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: linkAttr[i].id,
        onChange: newVal => {
          linkAttr[i].id = newVal;
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
        className: "mr-2",
        value: x.val,
        onChange: newVal => {
          linkAttr[i].val = newVal;
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close",
        onClick: ev => {
          linkAttr.splice(i, 1);
          var ssdsd = linkAttr.concat([]);
          setAttributes({
            linkAttr: ssdsd
          });
        }
      })));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: readMore.color[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = readMore.color;
        responsive[breakPointX] = newVal;
        setAttributes({
          readMore: {
            text: readMore.text,
            textAlign: readMore.textAlign,
            isLink: readMore.isLink,
            class: readMore.class,
            color: responsive,
            bgColor: readMore.bgColor,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Background Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
      value: readMore.bgColor[breakPointX],
      colors: colors,
      enableAlpha: true,
      onChange: newVal => {
        var responsive = readMore.bgColor;
        responsive[breakPointX] = newVal;
        setAttributes({
          readMore: {
            text: readMore.text,
            textAlign: readMore.textAlign,
            isLink: readMore.isLink,
            class: readMore.class,
            color: readMore.color,
            bgColor: responsive,
            padding: readMore.padding,
            margin: readMore.margin
          }
        });
        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector],
          'background-color': responsive
        };
        setAttributes({
          blockCssY: {
            items: blockCssY.items
          }
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Padding"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: readMore.padding[breakPointX],
      onChange: nextValues => {
        paddingControl(nextValues);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", null, "Margin"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChangeBreakPoint,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_8__["default"][breakPointX].icon,
      value: breakPointX
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalBoxControl, {
      label: "",
      values: readMore.margin[breakPointX],
      onChange: nextValues => {
        marginControl(nextValues);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Prefix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: prefix.text,
      onChange: newVal => {
        setAttributes({
          prefix: {
            text: newVal,
            class: prefix.class,
            color: prefix.color,
            bgColor: prefix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Postfix",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      for: ""
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalInputControl, {
      value: postfix.text,
      onChange: newVal => {
        setAttributes({
          postfix: {
            text: newVal,
            class: prefix.class,
            color: postfix.color,
            bgColor: postfix.bgColor
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: "Custom Style",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Please use following class selector to apply your custom CSS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Read More Wrapper"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, readmoreWrapperSelector, '{/* your CSS here*/}'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Read More link"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, readmoreLinkSelector, '{}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Prefix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, readmorePrefixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "my-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: "font-bold"
    }, "Postfix"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", null, readmorePostfixSelector, '{/* your CSS here*/}', " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextareaControl, {
      label: "Custom CSS",
      help: "Do not use 'style' tag",
      value: customCss,
      onChange: value => {
        setAttributes({
          customCss: value
        });
      }
    })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("pre", null, JSON.stringify(blockCssY)), wrapper.tag && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(CustomTag, {
      className: ['pg-readMore']
    }, readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, linkAttrItems, {
      href: postUrl,
      target: readMore.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: prefix.class
    }, prefix.text), readMore.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: postfix.class
    }, postfix.text)), !readMore.isLink && readMore.text), wrapper.tag.length == 0 && readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: ['pg-readMore']
    }, linkAttrItems, {
      href: postUrl,
      target: readMore.linkTarget
    }), prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), readMore.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)), wrapper.tag.length == 0 && !readMore.isLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
      className: 'pg-readMore'
    }, prefix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "prefix"
    }, prefix.text), readMore.text, postfix.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "postfix"
    }, postfix.text)))];
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
});

/***/ }),

/***/ "./src/breakpoints.js":
/*!****************************!*\
  !*** ./src/breakpoints.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const breakPoints = {
//   sm: { name: 'Small', id: 'sm', icon: '<span class="icon-mobile-phone"></span>', min: 0, max: 640 },
//   md: { name: 'Medium', id: 'md', icon: '<span class="icon-tablet"></span>', min: 641, max: 768 },
//   lg: { name: 'Large', id: 'lg', icon: '<span class="icon-laptop"></span>', min: 769, max: 1024 },
//   xl: { name: 'Extra-Large', id: 'xl', icon: '<span class="icon-desktop"></span>', min: 1025, max: 1280 },
//   xl2: { name: '2 Extra-Large', id: 'xl2', icon: '<span class="icon-television"></span>', min: 1281, max: 1536 }
// };
const breakPoints = {
  Mobile: {
    name: 'Mobile',
    id: 'Mobile',
    icon: '<span class="icon-mobile-phone"></span>',
    min: 0,
    max: 360
  },
  Tablet: {
    name: 'Tablet',
    id: 'Tablet',
    icon: '<span class="icon-tablet"></span>',
    min: 361,
    max: 780
  },
  Desktop: {
    name: 'Desktop',
    id: 'Desktop',
    icon: '<span class="icon-desktop"></span>',
    min: 781,
    max: 1024
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (breakPoints);

/***/ }),

/***/ "./src/components/breakpoint-toggle/index.js":
/*!***************************************************!*\
  !*** ./src/components/breakpoint-toggle/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_icon_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/icon-toggle */ "./src/components/icon-toggle/index.js");
/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../breakpoints */ "./src/breakpoints.js");


const {
  Component,
  RawHTML
} = wp.element;




var myStore = wp.data.select('my-shop');

class BreakpointToggle extends Component {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "state", {
      breakPointX: myStore.getBreakPoint()
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setBreakPoint", x => {
      console.log(x); //setPreviewDeviceType(x.value)

      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value);
      this.setState({
        breakPointX: x.value
      });
    });
  }

  render() {
    var that = this;
    const {
      position,
      variant,
      iconList,
      //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      activeIcon,
      value
    } = this.props;

    function onChangeX(x) {
      console.log(x);
    }

    var breakPointList = [];

    for (var x in _breakpoints__WEBPACK_IMPORTED_MODULE_4__["default"]) {
      var item = _breakpoints__WEBPACK_IMPORTED_MODULE_4__["default"][x];
      breakPointList.push({
        label: item.name,
        icon: item.icon,
        value: item.id
      });
    }

    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = wp.data.dispatch('core/edit-post'); // function onChangeBreakPoint(x, index) {
    //   console.log(x);
    //   console.log(index);
    //   that.setBreakPoint(x);
    //   console.log('Brekapoint Toggle');
    //   setPreviewDeviceType(x.value)
    //   // var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)
    //   // asdsdsd.then((res) => {
    //   //   console.log(res);
    //   //   that.setBreakPoint(res);
    //   //   //setBreakPointX(res.breakpoint);
    //   //   //generateBlockCss();
    //   // });
    // }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, this.state.breakPointX, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_icon_toggle__WEBPACK_IMPORTED_MODULE_3__["default"], {
      position: "bottom",
      variant: "secondary",
      iconList: breakPointList,
      buttonTitle: "Break Point Switch",
      onChange: onChange,
      activeIcon: _breakpoints__WEBPACK_IMPORTED_MODULE_4__["default"][this.state.breakPointX].icon,
      value: value
    }));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BreakpointToggle);

/***/ }),

/***/ "./src/components/icon-toggle/index.js":
/*!*********************************************!*\
  !*** ./src/components/icon-toggle/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

const {
  Component,
  RawHTML
} = wp.element;


class IconToggle extends Component {
  render() {
    const {
      position,
      variant,
      iconList,
      //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      activeIcon,
      value
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
      position: position,
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          title: buttonTitle,
          variant: variant,
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, {
          className: "text-lg "
        }, activeIcon));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, iconList.map((x, index) => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: ' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer',
          onClick: ev => {
            onChange(x, index);
            console.log('Icon Toggle');
          }
        }, !x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          class: "icon-close"
        })), x.value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, null, x.icon));
      }))
    }));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconToggle);

/***/ }),

/***/ "./src/components/typography/index.js":
/*!********************************************!*\
  !*** ./src/components/typography/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

const {
  Component,
  RawHTML
} = wp.element;



class Typography extends Component {
  render() {
    var {
      typo,
      breakPointX,
      onChange,
      setAttributes,
      postTitleX
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Font Family")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
      value: typo.fontFamily[breakPointX] != undefined ? typo.fontFamily[breakPointX] : '',
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.fontFamily).length == 0) {
          newValuesObj[breakPointX] = newVal;
        } else {
          newValuesObj = postTitleX.typo.fontFamily;
          newValuesObj[breakPointX] = newVal;
        }

        var typoX = { ...postTitleX.typo,
          fontFamily: newValuesObj
        };
        onChange(typoX);
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Font Size")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
      type: "number",
      value: typo.fontSize[breakPointX] != undefined ? typo.fontSize[breakPointX].val : '',
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.fontSize).length == 0) {
          newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX],
            val: newVal
          };
        } else {
          newValuesObj = postTitleX.typo.fontSize;
          newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX],
            val: newVal
          };
        }

        var typoX = { ...postTitleX.typo,
          fontSize: newValuesObj
        };
        onChange(typoX);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "",
      value: typo.fontSize[breakPointX] != undefined ? typo.fontSize[breakPointX].unit : '',
      options: [{
        label: 'Select Unit',
        value: ''
      }, {
        label: 'px',
        value: 'px'
      }, {
        label: '%',
        value: '%'
      }, {
        label: 'em',
        value: 'em'
      }, {
        label: 'ex',
        value: 'ex'
      }, {
        label: 'rem',
        value: 'rem'
      }, {
        label: 'vh',
        value: 'vh'
      }, {
        label: 'vw',
        value: 'vw'
      }, {
        label: 'pt',
        value: 'pt'
      }, {
        label: 'pc',
        value: 'pc'
      }, {
        label: 'ch',
        value: 'ch'
      }],
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.fontSize).length == 0) {
          newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX],
            unit: newVal
          };
        } else {
          newValuesObj = postTitleX.typo.fontSize;
          newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX],
            unit: newVal
          };
        }

        var typoX = { ...postTitleX.typo,
          fontSize: newValuesObj
        };
        onChange(typoX);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Line Height")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
      type: "number",
      value: typo.lineHeight[breakPointX] != undefined ? typo.lineHeight[breakPointX].val : '',
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.lineHeight).length == 0) {
          newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX],
            val: newVal
          };
        } else {
          newValuesObj = postTitleX.typo.lineHeight;
          newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX],
            val: newVal
          };
        }

        var typoX = { ...postTitleX.typo,
          lineHeight: newValuesObj
        };
        onChange(typoX);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "",
      value: typo.lineHeight[breakPointX] != undefined ? typo.lineHeight[breakPointX].unit : '',
      options: [{
        label: 'Select Unit',
        value: ''
      }, {
        label: 'px',
        value: 'px'
      }, {
        label: '%',
        value: '%'
      }, {
        label: 'em',
        value: 'em'
      }, {
        label: 'ex',
        value: 'ex'
      }, {
        label: 'rem',
        value: 'rem'
      }, {
        label: 'vh',
        value: 'vh'
      }, {
        label: 'vw',
        value: 'vw'
      }, {
        label: 'pt',
        value: 'pt'
      }, {
        label: 'pc',
        value: 'pc'
      }, {
        label: 'ch',
        value: 'ch'
      }],
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.lineHeight).length == 0) {
          newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX],
            unit: newVal
          };
        } else {
          newValuesObj = postTitleX.typo.lineHeight;
          newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX],
            unit: newVal
          };
        }

        var typoX = { ...postTitleX.typo,
          lineHeight: newValuesObj
        };
        onChange(typoX);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Letter Spacing")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
      type: "number",
      value: typo.letterSpacing[breakPointX] != undefined ? typo.letterSpacing[breakPointX].val : '',
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.letterSpacing).length == 0) {
          newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX],
            val: newVal
          };
        } else {
          newValuesObj = postTitleX.typo.letterSpacing;
          newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX],
            val: newVal
          };
        }

        var typoX = { ...postTitleX.typo,
          letterSpacing: newValuesObj
        };
        onChange(typoX);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "",
      value: typo.letterSpacing[breakPointX] != undefined ? typo.letterSpacing[breakPointX].unit : '',
      options: [{
        label: 'Select Unit',
        value: ''
      }, {
        label: 'px',
        value: 'px'
      }, {
        label: '%',
        value: '%'
      }, {
        label: 'em',
        value: 'em'
      }, {
        label: 'ex',
        value: 'ex'
      }, {
        label: 'rem',
        value: 'rem'
      }, {
        label: 'vh',
        value: 'vh'
      }, {
        label: 'vw',
        value: 'vw'
      }, {
        label: 'pt',
        value: 'pt'
      }, {
        label: 'pc',
        value: 'pc'
      }, {
        label: 'ch',
        value: 'ch'
      }],
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.letterSpacing).length == 0) {
          newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX],
            unit: newVal
          };
        } else {
          newValuesObj = postTitleX.typo.letterSpacing;
          newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX],
            unit: newVal
          };
        }

        var typoX = { ...postTitleX.typo,
          letterSpacing: newValuesObj
        };
        onChange(typoX);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Font Weight"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "",
      value: typo.fontWeight[breakPointX] != undefined ? typo.fontWeight[breakPointX] : '',
      options: [{
        label: 'Select...',
        value: ''
      }, {
        label: 'bold',
        value: 'bold'
      }, {
        label: 'bolder',
        value: 'bolder'
      }, {
        label: 'lighter',
        value: 'lighter'
      }, {
        label: '100',
        value: '100'
      }, {
        label: '200',
        value: '200'
      }, {
        label: '300',
        value: '300'
      }, {
        label: '400',
        value: '400'
      }, {
        label: '500',
        value: '500'
      }, {
        label: '600',
        value: '600'
      }, {
        label: '700',
        value: '700'
      }, {
        label: '800',
        value: '800'
      }, {
        label: '900',
        value: '900'
      }],
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.fontWeight).length == 0) {
          newValuesObj[breakPointX] = newVal;
        } else {
          newValuesObj = postTitleX.typo.fontWeight;
          newValuesObj[breakPointX] = newVal;
        }

        var typoX = { ...postTitleX.typo,
          fontWeight: newValuesObj
        };
        onChange(typoX);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Text Transform"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "",
      value: typo.textTransform[breakPointX] != undefined ? typo.textTransform[breakPointX] : '',
      options: [{
        label: 'Select...',
        value: ''
      }, {
        label: 'Uppercase',
        value: 'uppercase'
      }, {
        label: 'Lowercase',
        value: 'lowercase'
      }, {
        label: 'Capitalize',
        value: 'capitalize'
      }],
      onChange: newVal => {
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.textTransform).length == 0) {
          newValuesObj[breakPointX] = newVal;
        } else {
          newValuesObj = postTitleX.typo.textTransform;
          newValuesObj[breakPointX] = newVal;
        }

        var typoX = { ...postTitleX.typo,
          textTransform: newValuesObj
        };
        onChange(typoX);
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: ""
    }, "Text Decoration"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: postTitleX.typo.textDecoration[breakPointX] != undefined && postTitleX.typo.textDecoration[breakPointX].indexOf('underline') !== -1 ? '!bg-blue-300 ' : '',
      variant: "secondary",
      onClick: ev => {
        var newVal = 'underline';
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.textDecoration).length == 0) {
          newValuesObj[breakPointX] = [newVal];
        } else {
          newValuesObj = postTitleX.typo.textDecoration;

          if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
            var arr = newValuesObj[breakPointX].filter(item => item !== newVal);
            newValuesObj[breakPointX] = arr;
          } else {
            newValuesObj[breakPointX].push(newVal);
          }
        }

        var typoX = { ...postTitleX.typo,
          textDecoration: newValuesObj
        };
        onChange(typoX);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "icon-underline"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: postTitleX.typo.textDecoration[breakPointX] != undefined && postTitleX.typo.textDecoration[breakPointX].indexOf('line-through') !== -1 ? '!bg-blue-300 ' : '',
      variant: "secondary",
      onClick: ev => {
        var newVal = 'line-through';
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.textDecoration).length == 0) {
          newValuesObj[breakPointX] = [newVal];
        } else {
          newValuesObj = postTitleX.typo.textDecoration;

          if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
            var arr = newValuesObj[breakPointX].filter(item => item !== newVal);
            newValuesObj[breakPointX] = arr;
          } else {
            newValuesObj[breakPointX].push(newVal);
          }
        }

        var typoX = { ...postTitleX.typo,
          textDecoration: newValuesObj
        };
        onChange(typoX);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "icon-strikethrough"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: postTitleX.typo.textDecoration[breakPointX] != undefined && postTitleX.typo.textDecoration[breakPointX].indexOf('overline') !== -1 ? '!bg-blue-300 ' : '',
      variant: "secondary",
      onClick: ev => {
        var newVal = 'overline';
        var newValuesObj = {};

        if (Object.keys(postTitleX.typo.textDecoration).length == 0) {
          newValuesObj[breakPointX] = [newVal];
        } else {
          newValuesObj = postTitleX.typo.textDecoration;

          if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
            var arr = newValuesObj[breakPointX].filter(item => item !== newVal);
            newValuesObj[breakPointX] = arr;
          } else {
            newValuesObj[breakPointX].push(newVal);
          }
        }

        var typoX = { ...postTitleX.typo,
          textDecoration: newValuesObj
        };
        onChange(typoX);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "icon-overline"
    })))));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typography);

/***/ }),

/***/ "./src/queryprams.js":
/*!***************************!*\
  !*** ./src/queryprams.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const queryPrams = [{
  val: ['post', 'product'],
  multiple: false,
  id: 'postType',
  label: 'Post Types',
  description: "Select Post Types to Query"
}, {
  val: [],
  multiple: false,
  id: 'taxQuery',
  label: 'Tax Query',
  description: "Taxonomies query arguments"
}, {
  val: 'OR',
  multiple: false,
  id: 'taxQueryRelation',
  label: 'Tax Query Relation',
  description: "Taxonomies query relation"
}, {
  val: [],
  multiple: false,
  id: 'metaQuery',
  label: 'Meta Query',
  description: "Meta field query"
}, {
  val: '',
  multiple: false,
  id: 's',
  label: 'Keyword',
  description: "Search keyword, ex: hello"
}, {
  val: [],
  multiple: false,
  id: 'postStatus',
  label: 'Post status',
  description: "Query post by post status"
}, {
  val: '',
  multiple: false,
  id: 'order',
  label: 'Order',
  description: "Post query order"
}, {
  val: [],
  multiple: false,
  id: 'orderby',
  label: 'Orderby',
  description: "Post query orderby"
}, {
  val: '',
  multiple: false,
  id: 'metaKey',
  label: 'Meta fields key',
  description: "Post query by meta fields key"
}, // Date Parameters
{
  val: [],
  multiple: false,
  id: 'dateQuery',
  label: 'Date Query ',
  description: "Post query by date"
}, {
  val: '',
  multiple: false,
  id: 'year',
  label: 'Year',
  description: "Post query by year"
}, {
  val: '',
  multiple: false,
  id: 'monthnum',
  label: 'Month',
  description: "Post query by month"
}, {
  val: '',
  multiple: false,
  id: 'w',
  label: 'Week',
  description: "Post query by week"
}, {
  val: '',
  multiple: false,
  id: 'day',
  label: 'Day',
  description: "Post query by day"
}, {
  val: '',
  multiple: false,
  id: 'hour',
  label: 'Hour',
  description: "Post query by hour"
}, {
  val: '',
  multiple: false,
  id: 'minute',
  label: 'Miniute',
  description: "Post query by miniute"
}, {
  val: '',
  multiple: false,
  id: 'second',
  label: 'Second',
  description: "Post query by second"
}, {
  val: '',
  multiple: false,
  id: 'm',
  label: 'Month',
  description: "Post query by month"
}, // Author Parameters
{
  val: '',
  multiple: false,
  id: 'author',
  label: 'Author',
  description: "Post query by Author ID"
}, {
  val: '',
  multiple: false,
  id: 'authorName',
  label: 'Author Name',
  description: "Post query by Author Name"
}, {
  val: [],
  multiple: false,
  id: 'authorIn',
  label: 'Author In',
  description: "Post query by Author IDs"
}, {
  val: [],
  multiple: false,
  id: 'authorNotIn',
  label: 'Author Not In',
  description: ""
}, // Category Parameters
{
  val: '',
  multiple: false,
  id: 'cat',
  label: 'Category ID',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'categoryName',
  label: 'Category Name',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'categoryAnd',
  label: 'CategoryAnd',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'categoryIn',
  label: 'Category In',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'categoryNotIn',
  label: 'Category Not In',
  description: ""
}, // Tag Parameters
{
  val: '',
  multiple: false,
  id: 'tag',
  label: 'Tags',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'tagId',
  label: 'Tag Id',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'tagAnd',
  label: 'Tag And',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'tagIn',
  label: 'Tag In',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'tagNotIn',
  label: 'Tag Not In',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'tagSlugAnd',
  label: 'Tag Slug And',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'tagSlugIn',
  label: 'Tag Slug In',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'p',
  label: 'Post id',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'name',
  label: 'Name',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'pageId',
  label: 'Page Id',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'pagename',
  label: 'Page name',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'postParent',
  label: 'Post Parent',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'postParentIn',
  label: 'Post Parent In',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'postParentNotIn',
  label: 'Post Parent Not In',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'postIn',
  label: 'Post In',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'postNotIn',
  label: 'Post Not In',
  description: ""
}, {
  val: [{
    slug: ''
  }],
  multiple: false,
  id: 'postNameIn',
  label: 'Post Name In',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'hasPassword',
  label: 'Has Password',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'postPassword ',
  label: 'Post Password',
  description: ""
}, {
  val: {
    compare: '='
  },
  multiple: false,
  id: 'commentCount',
  label: 'Comment Count',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'nopaging',
  label: 'No Paging',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'postsPerPage',
  label: 'Posts Per Page',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'paged',
  label: 'Paged',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'offset',
  label: 'Offset',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'postsPerArchivePage',
  label: 'Posts Per Archive Page',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'ignoreStickyPosts',
  label: 'Ignore Sticky Posts',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'metaKey',
  label: 'Meta Key',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'metaValue',
  label: 'Meta Value',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'metaValueNum',
  label: 'Meta Value Num',
  description: ""
}, {
  val: '',
  multiple: false,
  id: 'metaCompare',
  label: 'Meta Compare',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'metaQuery',
  label: 'Meta Query',
  description: ""
}, {
  val: 'readable',
  multiple: false,
  id: 'perm',
  label: 'Perm',
  description: ""
}, {
  val: [],
  multiple: false,
  id: 'postMimeType',
  label: 'Post Mime Type',
  description: ""
}, {
  val: false,
  multiple: false,
  id: 'cacheResults',
  label: 'Cache Results',
  description: ""
}, {
  val: false,
  multiple: false,
  id: 'updatePostMetaCache',
  label: 'Update Post Meta Cache',
  description: ""
}, {
  val: false,
  multiple: false,
  id: 'updatePostTermCache',
  label: 'Update Post Term Cache',
  description: ""
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (queryPrams);

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const DEFAULT_STATE = {
  prices: {},
  discountPercent: 5656,
  choko: 'Milk Candy',
  price: 123,
  proUrl: 'http://getpostgrid.com/',
  breakPoint: 'Desktop',
  license: {
    license_status: '',
    license_key: ''
  }
};
const actions = {
  setBreakPoint(breakpoint) {
    return {
      type: 'SET_BREAKPOINT',
      breakpoint
    };
  },

  setLicense(license) {
    return {
      type: 'SET_LICENSE',
      license
    };
  },

  setPrice(item, price) {
    return {
      type: 'SET_PRICE',
      item,
      price
    };
  },

  startSale(discountPercent) {
    return {
      type: 'START_SALE',
      discountPercent
    };
  },

  fetchFromAPI(path) {
    return {
      type: 'FETCH_FROM_API',
      path
    };
  },

  fetchLicense(path) {
    return {
      type: 'FETCH_LICENSE_FROM_API',
      path
    };
  }

};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.createReduxStore)('my-shop', {
  reducer() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    let action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_BREAKPOINT':
        return { ...state,
          breakPoint: action.breakpoint
        };

      case 'SET_LICENSE':
        return { ...state,
          license: action.license
        };

      case 'SET_PRICE':
        return { ...state,
          price: action.price
        };

      case 'START_SALE':
        return { ...state,
          discountPercent: action.discountPercent
        };
    }

    return state;
  },

  actions,
  selectors: {
    getProurl(state) {
      const {
        proUrl
      } = state; //return price * (1 - 0.01 * discountPercent);

      return proUrl;
    },

    getBreakPoint(state) {
      const {
        breakPoint
      } = state; //return price * (1 - 0.01 * discountPercent);

      return breakPoint;
    },

    getLicense(state) {
      const {
        license
      } = state; //console.log(license);
      //return price * (1 - 0.01 * discountPercent);

      return license;
    },

    getPrice(state, item) {
      const {
        price,
        discountPercent
      } = state; //const price = prices[item];
      //return price * (1 - 0.01 * discountPercent);

      return price;
    },

    getData(state, item) {
      //console.log(state);
      //console.log(item);
      const {
        prices,
        discountPercent
      } = state;
      const price = prices[item]; //return price * (1 - 0.01 * discountPercent);

      return 234234;
    }

  },
  controls: {
    FETCH_FROM_API(action) {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: action.path
      });
    },

    FETCH_LICENSE_FROM_API(action) {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: action.path,
        method: 'POST',
        data: {}
      });
    }

  },
  resolvers: {
    *getPrice(item) {
      const path = '/wp/v2/prices/' + item;
      const price = yield actions.fetchFromAPI(path);
      return actions.setPrice(item, price);
    },

    *getLicense() {
      const path = '/post-grid/v2/get_license';
      const res = yield actions.fetchLicense(path); //console.log(res);

      return actions.setLicense(res);
    }

  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.register)(store);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
  var breakPoint = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('my-shop').getBreakPoint(); //var license = select('my-shop').getLicense();
  ////console.log('Subscribe: ' + breakPoint)
});


/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/***/ ((module) => {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_basePropertyOf.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_basePropertyOf.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_baseValues.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseValues.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js");

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ "./node_modules/lodash/_customDefaultsAssignIn.js":
/*!********************************************************!*\
  !*** ./node_modules/lodash/_customDefaultsAssignIn.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

module.exports = customDefaultsAssignIn;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_escapeHtmlChar.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_escapeHtmlChar.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var basePropertyOf = __webpack_require__(/*! ./_basePropertyOf */ "./node_modules/lodash/_basePropertyOf.js");

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
var escapeHtmlChar = basePropertyOf(htmlEscapes);

module.exports = escapeHtmlChar;


/***/ }),

/***/ "./node_modules/lodash/_escapeStringChar.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_escapeStringChar.js ***!
  \**************************************************/
/***/ ((module) => {

/** Used to escape characters for inclusion in compiled string literals. */
var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

/**
 * Used by `_.template` to escape characters for inclusion in compiled string literals.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}

module.exports = escapeStringChar;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_reEscape.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_reEscape.js ***!
  \******************************************/
/***/ ((module) => {

/** Used to match template delimiters. */
var reEscape = /<%-([\s\S]+?)%>/g;

module.exports = reEscape;


/***/ }),

/***/ "./node_modules/lodash/_reEvaluate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_reEvaluate.js ***!
  \********************************************/
/***/ ((module) => {

/** Used to match template delimiters. */
var reEvaluate = /<%([\s\S]+?)%>/g;

module.exports = reEvaluate;


/***/ }),

/***/ "./node_modules/lodash/_reInterpolate.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_reInterpolate.js ***!
  \***********************************************/
/***/ ((module) => {

/** Used to match template delimiters. */
var reInterpolate = /<%=([\s\S]+?)%>/g;

module.exports = reInterpolate;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/***/ ((module) => {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/assignInWith.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/assignInWith.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;


/***/ }),

/***/ "./node_modules/lodash/attempt.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/attempt.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isError = __webpack_require__(/*! ./isError */ "./node_modules/lodash/isError.js");

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Avoid throwing errors for invalid selectors.
 * var elements = _.attempt(function(selector) {
 *   return document.querySelectorAll(selector);
 * }, '>_>');
 *
 * if (_.isError(elements)) {
 *   elements = [];
 * }
 */
var attempt = baseRest(function(func, args) {
  try {
    return apply(func, undefined, args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
});

module.exports = attempt;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/escape.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/escape.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var escapeHtmlChar = __webpack_require__(/*! ./_escapeHtmlChar */ "./node_modules/lodash/_escapeHtmlChar.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"']/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "./node_modules/lodash/isError.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isError.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js"),
    isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js");

/** `Object#toString` result references. */
var domExcTag = '[object DOMException]',
    errorTag = '[object Error]';

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == errorTag || tag == domExcTag ||
    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
}

module.exports = isError;


/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/template.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/template.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignInWith = __webpack_require__(/*! ./assignInWith */ "./node_modules/lodash/assignInWith.js"),
    attempt = __webpack_require__(/*! ./attempt */ "./node_modules/lodash/attempt.js"),
    baseValues = __webpack_require__(/*! ./_baseValues */ "./node_modules/lodash/_baseValues.js"),
    customDefaultsAssignIn = __webpack_require__(/*! ./_customDefaultsAssignIn */ "./node_modules/lodash/_customDefaultsAssignIn.js"),
    escapeStringChar = __webpack_require__(/*! ./_escapeStringChar */ "./node_modules/lodash/_escapeStringChar.js"),
    isError = __webpack_require__(/*! ./isError */ "./node_modules/lodash/isError.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js"),
    reInterpolate = __webpack_require__(/*! ./_reInterpolate */ "./node_modules/lodash/_reInterpolate.js"),
    templateSettings = __webpack_require__(/*! ./templateSettings */ "./node_modules/lodash/templateSettings.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/** Error message constants. */
var INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

/** Used to match empty string literals in compiled template source. */
var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

/**
 * Used to validate the `validate` option in `_.template` variable.
 *
 * Forbids characters which could potentially change the meaning of the function argument definition:
 * - "()," (modification of function parameters)
 * - "=" (default value)
 * - "[]{}" (destructuring of function parameters)
 * - "/" (beginning of a comment)
 * - whitespace
 */
var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

/**
 * Used to match
 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
 */
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/** Used to ensure capturing order of template delimiters. */
var reNoMatch = /($^)/;

/** Used to match unescaped characters in compiled string literals. */
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is given, it takes precedence over `_.templateSettings` values.
 *
 * **Note:** In the development build `_.template` utilizes
 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for easier debugging.
 *
 * For more information on precompiling templates see
 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options={}] The options object.
 * @param {RegExp} [options.escape=_.templateSettings.escape]
 *  The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
 *  The "evaluate" delimiter.
 * @param {Object} [options.imports=_.templateSettings.imports]
 *  An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
 *  The "interpolate" delimiter.
 * @param {string} [options.sourceURL='templateSources[n]']
 *  The sourceURL of the compiled template.
 * @param {string} [options.variable='obj']
 *  The data object variable name.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the compiled template function.
 * @example
 *
 * // Use the "interpolate" delimiter to create a compiled template.
 * var compiled = _.template('hello <%= user %>!');
 * compiled({ 'user': 'fred' });
 * // => 'hello fred!'
 *
 * // Use the HTML "escape" delimiter to escape data property values.
 * var compiled = _.template('<b><%- value %></b>');
 * compiled({ 'value': '<script>' });
 * // => '<b>&lt;script&gt;</b>'
 *
 * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the internal `print` function in "evaluate" delimiters.
 * var compiled = _.template('<% print("hello " + user); %>!');
 * compiled({ 'user': 'barney' });
 * // => 'hello barney!'
 *
 * // Use the ES template literal delimiter as an "interpolate" delimiter.
 * // Disable support by replacing the "interpolate" delimiter.
 * var compiled = _.template('hello ${ user }!');
 * compiled({ 'user': 'pebbles' });
 * // => 'hello pebbles!'
 *
 * // Use backslashes to treat delimiters as plain text.
 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
 * compiled({ 'value': 'ignored' });
 * // => '<%- value %>'
 *
 * // Use the `imports` option to import `jQuery` as `jq`.
 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the `sourceURL` option to specify a custom sourceURL for the template.
 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
 * compiled(data);
 * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
 *
 * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
 * compiled.source;
 * // => function(data) {
 * //   var __t, __p = '';
 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
 * //   return __p;
 * // }
 *
 * // Use custom template delimiters.
 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
 * var compiled = _.template('hello {{ user }}!');
 * compiled({ 'user': 'mustache' });
 * // => 'hello mustache!'
 *
 * // Use the `source` property to inline compiled templates for meaningful
 * // line numbers in error messages and stack traces.
 * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
 *   var JST = {\
 *     "main": ' + _.template(mainText).source + '\
 *   };\
 * ');
 */
function template(string, options, guard) {
  // Based on John Resig's `tmpl` implementation
  // (http://ejohn.org/blog/javascript-micro-templating/)
  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
  var settings = templateSettings.imports._.templateSettings || templateSettings;

  if (guard && isIterateeCall(string, options, guard)) {
    options = undefined;
  }
  string = toString(string);
  options = assignInWith({}, options, settings, customDefaultsAssignIn);

  var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
      importsKeys = keys(imports),
      importsValues = baseValues(imports, importsKeys);

  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";

  // Compile the regexp to match each delimiter.
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
  , 'g');

  // Use a sourceURL for easier debugging.
  // The sourceURL gets injected into the source that's eval-ed, so be careful
  // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
  // and escape the comment, thus injecting code that gets evaled.
  var sourceURL = hasOwnProperty.call(options, 'sourceURL')
    ? ('//# sourceURL=' +
       (options.sourceURL + '').replace(/\s/g, ' ') +
       '\n')
    : '';

  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);

    // Escape characters that can't be included in string literals.
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    // Replace delimiters with snippets.
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;

    // The JS engine embedded in Adobe products needs `match` returned in
    // order to produce the correct `offset` value.
    return match;
  });

  source += "';\n";

  // If `variable` is not specified wrap a with-statement around the generated
  // code to add the data object to the top of the scope chain.
  var variable = hasOwnProperty.call(options, 'variable') && options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  // Throw an error if a forbidden character was found in `variable`, to prevent
  // potential command injection attacks.
  else if (reForbiddenIdentifierChars.test(variable)) {
    throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
  }

  // Cleanup code by stripping empty strings.
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');

  // Frame code as the function body.
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
       ? ', __e = _.escape'
       : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
        "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';

  var result = attempt(function() {
    return Function(importsKeys, sourceURL + 'return ' + source)
      .apply(undefined, importsValues);
  });

  // Provide the compiled function's source by its `toString` method or
  // the `source` property as a convenience for inlining compiled templates.
  result.source = source;
  if (isError(result)) {
    throw result;
  }
  return result;
}

module.exports = template;


/***/ }),

/***/ "./node_modules/lodash/templateSettings.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/templateSettings.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var escape = __webpack_require__(/*! ./escape */ "./node_modules/lodash/escape.js"),
    reEscape = __webpack_require__(/*! ./_reEscape */ "./node_modules/lodash/_reEscape.js"),
    reEvaluate = __webpack_require__(/*! ./_reEvaluate */ "./node_modules/lodash/_reEvaluate.js"),
    reInterpolate = __webpack_require__(/*! ./_reInterpolate */ "./node_modules/lodash/_reInterpolate.js");

/**
 * By default, the template delimiters used by lodash are like those in
 * embedded Ruby (ERB) as well as ES2015 template strings. Change the
 * following template settings to use alternative delimiters.
 *
 * @static
 * @memberOf _
 * @type {Object}
 */
var templateSettings = {

  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  'escape': reEscape,

  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  'evaluate': reEvaluate,

  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  'interpolate': reInterpolate,

  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type {string}
   */
  'variable': '',

  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type {Object}
   */
  'imports': {

    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type {Function}
     */
    '_': { 'escape': escape }
  }
};

module.exports = templateSettings;


/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

// ATTENTION

var REACT_ELEMENT_TYPE =  Symbol.for('react.element');
var REACT_PORTAL_TYPE =  Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE =  Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE =  Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE =  Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE =  Symbol.for('react.provider');
var REACT_CONTEXT_TYPE =  Symbol.for('react.context');
var REACT_SERVER_CONTEXT_TYPE =  Symbol.for('react.server_context');
var REACT_FORWARD_REF_TYPE =  Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE =  Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE =  Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE =  Symbol.for('react.memo');
var REACT_LAZY_TYPE =  Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE =  Symbol.for('react.offscreen');

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_SERVER_CONTEXT_TYPE:
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false;
var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isConcurrentMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
      hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}
function isSuspenseList(object) {
  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
}

exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.SuspenseList = SuspenseList;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isSuspenseList = isSuspenseList;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-sortablejs/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-sortablejs/dist/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $8zHUo$sortablejs = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
var $8zHUo$classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
var $8zHUo$react = __webpack_require__(/*! react */ "react");
var $8zHUo$tinyinvariant = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/tiny-invariant.esm.js");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

$parcel$export(module.exports, "Sortable", () => $882b6d93070905b3$re_export$Sortable);
$parcel$export(module.exports, "Direction", () => $882b6d93070905b3$re_export$Direction);
$parcel$export(module.exports, "DOMRect", () => $882b6d93070905b3$re_export$DOMRect);
$parcel$export(module.exports, "GroupOptions", () => $882b6d93070905b3$re_export$GroupOptions);
$parcel$export(module.exports, "MoveEvent", () => $882b6d93070905b3$re_export$MoveEvent);
$parcel$export(module.exports, "Options", () => $882b6d93070905b3$re_export$Options);
$parcel$export(module.exports, "PullResult", () => $882b6d93070905b3$re_export$PullResult);
$parcel$export(module.exports, "PutResult", () => $882b6d93070905b3$re_export$PutResult);
$parcel$export(module.exports, "SortableEvent", () => $882b6d93070905b3$re_export$SortableEvent);
$parcel$export(module.exports, "SortableOptions", () => $882b6d93070905b3$re_export$SortableOptions);
$parcel$export(module.exports, "Utils", () => $882b6d93070905b3$re_export$Utils);
$parcel$export(module.exports, "ReactSortable", () => $7fe8e3ea572bda7a$export$11bbed9ee0012c13);





function $eb03e74f8f7db1f3$export$1d0aa160432dfea5(node) {
    if (node.parentElement !== null) node.parentElement.removeChild(node);
}
function $eb03e74f8f7db1f3$export$6d240faa51aa562f(parent, newChild, index) {
    const refChild = parent.children[index] || null;
    parent.insertBefore(newChild, refChild);
}
function $eb03e74f8f7db1f3$export$d7d742816c28cf91(customs) {
    $eb03e74f8f7db1f3$export$77f49a256021c8de(customs);
    $eb03e74f8f7db1f3$export$a6177d5829f70ebc(customs);
}
function $eb03e74f8f7db1f3$export$77f49a256021c8de(customs) {
    customs.forEach((curr)=>$eb03e74f8f7db1f3$export$1d0aa160432dfea5(curr.element));
}
function $eb03e74f8f7db1f3$export$a6177d5829f70ebc(customs) {
    customs.forEach((curr)=>{
        $eb03e74f8f7db1f3$export$6d240faa51aa562f(curr.parentElement, curr.element, curr.oldIndex);
    });
}
function $eb03e74f8f7db1f3$export$4655efe700f887a(evt, list) {
    const mode = $eb03e74f8f7db1f3$export$1fc0f6205829e19c(evt);
    const parentElement = {
        parentElement: evt.from
    };
    let custom = [];
    switch(mode){
        case "normal":
            /* eslint-disable */ const item = {
                element: evt.item,
                newIndex: evt.newIndex,
                oldIndex: evt.oldIndex,
                parentElement: evt.from
            };
            custom = [
                item
            ];
            break;
        case "swap":
            const drag = {
                element: evt.item,
                oldIndex: evt.oldIndex,
                newIndex: evt.newIndex,
                ...parentElement
            };
            const swap = {
                element: evt.swapItem,
                oldIndex: evt.newIndex,
                newIndex: evt.oldIndex,
                ...parentElement
            };
            custom = [
                drag,
                swap
            ];
            break;
        case "multidrag":
            custom = evt.oldIndicies.map((curr, index)=>({
                    element: curr.multiDragElement,
                    oldIndex: curr.index,
                    newIndex: evt.newIndicies[index].index,
                    ...parentElement
                }));
            break;
    }
    /* eslint-enable */ const customs = $eb03e74f8f7db1f3$export$bc06a3af7dc65f53(custom, list);
    return customs;
}
function $eb03e74f8f7db1f3$export$c25cf8080bd305ec(normalized, list) {
    const a = $eb03e74f8f7db1f3$export$be2da95e6167b0bd(normalized, list);
    const b = $eb03e74f8f7db1f3$export$eca851ee65ae17e4(normalized, a);
    return b;
}
function $eb03e74f8f7db1f3$export$be2da95e6167b0bd(normalized, list) {
    const newList = [
        ...list
    ];
    normalized.concat().reverse().forEach((curr)=>newList.splice(curr.oldIndex, 1));
    return newList;
}
function $eb03e74f8f7db1f3$export$eca851ee65ae17e4(normalized, list, evt, clone) {
    const newList = [
        ...list
    ];
    normalized.forEach((curr)=>{
        const newItem = clone && evt && clone(curr.item, evt);
        newList.splice(curr.newIndex, 0, newItem || curr.item);
    });
    return newList;
}
function $eb03e74f8f7db1f3$export$1fc0f6205829e19c(evt) {
    if (evt.oldIndicies && evt.oldIndicies.length > 0) return "multidrag";
    if (evt.swapItem) return "swap";
    return "normal";
}
function $eb03e74f8f7db1f3$export$bc06a3af7dc65f53(inputs, list) {
    const normalized = inputs.map((curr)=>({
            ...curr,
            item: list[curr.oldIndex]
        })).sort((a, b)=>a.oldIndex - b.oldIndex);
    return normalized;
}
function $eb03e74f8f7db1f3$export$7553c81e62e31b7e(props) {
    /* eslint-disable */ const { list: // react sortable props
    list , setList: setList , children: children , tag: tag , style: style , className: className , clone: clone , onAdd: // sortable options that have methods we want to overwrite
    onAdd , onChange: onChange , onChoose: onChoose , onClone: onClone , onEnd: onEnd , onFilter: onFilter , onRemove: onRemove , onSort: onSort , onStart: onStart , onUnchoose: onUnchoose , onUpdate: onUpdate , onMove: onMove , onSpill: onSpill , onSelect: onSelect , onDeselect: onDeselect , ...options } = props;
    /* eslint-enable */ return options;
}


/** Holds a global reference for which react element is being dragged */ // @todo - use context to manage this. How does one use 2 different providers?
const $7fe8e3ea572bda7a$var$store = {
    dragging: null
};
class $7fe8e3ea572bda7a$export$11bbed9ee0012c13 extends (0, $8zHUo$react.Component) {
    /* eslint-disable-next-line */ static defaultProps = {
        clone: (item)=>item
    };
    constructor(props){
        super(props);
        // @todo forward ref this component
        this.ref = /*#__PURE__*/ (0, $8zHUo$react.createRef)();
        // make all state false because we can't change sortable unless a mouse gesture is made.
        const newList = [
            ...props.list
        ].map((item)=>Object.assign(item, {
                chosen: false,
                selected: false
            }));
        props.setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
        (0, ($parcel$interopDefault($8zHUo$tinyinvariant)))(//@ts-expect-error: Doesn't exist. Will deprecate soon.
        !props.plugins, `
Plugins prop is no longer supported.
Instead, mount it with "Sortable.mount(new MultiDrag())"
Please read the updated README.md at https://github.com/SortableJS/react-sortablejs.
      `);
    }
    componentDidMount() {
        if (this.ref.current === null) return;
        const newOptions = this.makeOptions();
        (0, ($parcel$interopDefault($8zHUo$sortablejs))).create(this.ref.current, newOptions);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.disabled !== this.props.disabled && this.sortable) this.sortable.option("disabled", this.props.disabled);
    }
    render() {
        const { tag: tag , style: style , className: className , id: id  } = this.props;
        const classicProps = {
            style: style,
            className: className,
            id: id
        };
        // if no tag, default to a `div` element.
        const newTag = !tag || tag === null ? "div" : tag;
        return /*#__PURE__*/ (0, $8zHUo$react.createElement)(newTag, {
            // @todo - find a way (perhaps with the callback) to allow AntD components to work
            ref: this.ref,
            ...classicProps
        }, this.getChildren());
    }
    getChildren() {
        const { children: children , dataIdAttr: dataIdAttr , selectedClass: selectedClass = "sortable-selected" , chosenClass: chosenClass = "sortable-chosen" , dragClass: /* eslint-disable */ dragClass = "sortable-drag" , fallbackClass: fallbackClass = "sortable-falback" , ghostClass: ghostClass = "sortable-ghost" , swapClass: swapClass = "sortable-swap-highlight" , filter: /* eslint-enable */ filter = "sortable-filter" , list: list ,  } = this.props;
        // if no children, don't do anything.
        if (!children || children == null) return null;
        const dataid = dataIdAttr || "data-id";
        /* eslint-disable-next-line */ return (0, $8zHUo$react.Children).map(children, (child, index)=>{
            if (child === undefined) return undefined;
            const item = list[index] || {};
            const { className: prevClassName  } = child.props;
            // @todo - handle the function if avalable. I don't think anyone will be doing this soon.
            const filtered = typeof filter === "string" && {
                [filter.replace(".", "")]: !!item.filtered
            };
            const className = (0, ($parcel$interopDefault($8zHUo$classnames)))(prevClassName, {
                [selectedClass]: item.selected,
                [chosenClass]: item.chosen,
                ...filtered
            });
            return /*#__PURE__*/ (0, $8zHUo$react.cloneElement)(child, {
                [dataid]: child.key,
                className: className
            });
        });
    }
    /** Appends the `sortable` property to this component */ get sortable() {
        const el = this.ref.current;
        if (el === null) return null;
        const key = Object.keys(el).find((k)=>k.includes("Sortable"));
        if (!key) return null;
        //@ts-expect-error: fix me.
        return el[key];
    }
    /** Converts all the props from `ReactSortable` into the `options` object that `Sortable.create(el, [options])` can use. */ makeOptions() {
        const DOMHandlers = [
            "onAdd",
            "onChoose",
            "onDeselect",
            "onEnd",
            "onRemove",
            "onSelect",
            "onSpill",
            "onStart",
            "onUnchoose",
            "onUpdate", 
        ];
        const NonDOMHandlers = [
            "onChange",
            "onClone",
            "onFilter",
            "onSort", 
        ];
        const newOptions = (0, $eb03e74f8f7db1f3$export$7553c81e62e31b7e)(this.props);
        DOMHandlers.forEach((name)=>newOptions[name] = this.prepareOnHandlerPropAndDOM(name));
        NonDOMHandlers.forEach((name)=>newOptions[name] = this.prepareOnHandlerProp(name));
        /** onMove has 2 arguments and needs to be handled seperately. */ const onMove1 = (evt, originalEvt)=>{
            const { onMove: onMove  } = this.props;
            const defaultValue = evt.willInsertAfter || -1;
            if (!onMove) return defaultValue;
            const result = onMove(evt, originalEvt, this.sortable, $7fe8e3ea572bda7a$var$store);
            if (typeof result === "undefined") return false;
            return result;
        };
        return {
            ...newOptions,
            onMove: onMove1
        };
    }
    /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */ prepareOnHandlerPropAndDOM(evtName) {
        return (evt)=>{
            // call the component prop
            this.callOnHandlerProp(evt, evtName);
            // calls state change
            //@ts-expect-error: until @types multidrag item is in
            this[evtName](evt);
        };
    }
    /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */ prepareOnHandlerProp(evtName) {
        return (evt)=>{
            // call the component prop
            this.callOnHandlerProp(evt, evtName);
        };
    }
    /** Calls the `props.on[Handler]` function */ callOnHandlerProp(evt, evtName) {
        const propEvent = this.props[evtName];
        if (propEvent) propEvent(evt, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    // SORTABLE DOM HANDLING
    onAdd(evt) {
        const { list: list , setList: setList , clone: clone  } = this.props;
        /* eslint-disable-next-line */ const otherList = [
            ...$7fe8e3ea572bda7a$var$store.dragging.props.list
        ];
        const customs = (0, $eb03e74f8f7db1f3$export$4655efe700f887a)(evt, otherList);
        (0, $eb03e74f8f7db1f3$export$77f49a256021c8de)(customs);
        const newList = (0, $eb03e74f8f7db1f3$export$eca851ee65ae17e4)(customs, list, evt, clone).map((item)=>Object.assign(item, {
                selected: false
            }));
        setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    onRemove(evt) {
        const { list: list , setList: setList  } = this.props;
        const mode = (0, $eb03e74f8f7db1f3$export$1fc0f6205829e19c)(evt);
        const customs = (0, $eb03e74f8f7db1f3$export$4655efe700f887a)(evt, list);
        (0, $eb03e74f8f7db1f3$export$a6177d5829f70ebc)(customs);
        let newList = [
            ...list
        ];
        // remove state if not in clone mode. otherwise, keep.
        if (evt.pullMode !== "clone") newList = (0, $eb03e74f8f7db1f3$export$be2da95e6167b0bd)(customs, newList);
        else {
            // switch used to get the clone
            let customClones = customs;
            switch(mode){
                case "multidrag":
                    customClones = customs.map((item, index)=>({
                            ...item,
                            element: evt.clones[index]
                        }));
                    break;
                case "normal":
                    customClones = customs.map((item)=>({
                            ...item,
                            element: evt.clone
                        }));
                    break;
                case "swap":
                default:
                    (0, ($parcel$interopDefault($8zHUo$tinyinvariant)))(true, `mode "${mode}" cannot clone. Please remove "props.clone" from <ReactSortable/> when using the "${mode}" plugin`);
            }
            (0, $eb03e74f8f7db1f3$export$77f49a256021c8de)(customClones);
            // replace selected items with cloned items
            customs.forEach((curr)=>{
                const index = curr.oldIndex;
                /* eslint-disable-next-line */ const newItem = this.props.clone(curr.item, evt);
                newList.splice(index, 1, newItem);
            });
        }
        // remove item.selected from list
        newList = newList.map((item)=>Object.assign(item, {
                selected: false
            }));
        setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    onUpdate(evt) {
        const { list: list , setList: setList  } = this.props;
        const customs = (0, $eb03e74f8f7db1f3$export$4655efe700f887a)(evt, list);
        (0, $eb03e74f8f7db1f3$export$77f49a256021c8de)(customs);
        (0, $eb03e74f8f7db1f3$export$a6177d5829f70ebc)(customs);
        const newList = (0, $eb03e74f8f7db1f3$export$c25cf8080bd305ec)(customs, list);
        return setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    onStart() {
        $7fe8e3ea572bda7a$var$store.dragging = this;
    }
    onEnd() {
        $7fe8e3ea572bda7a$var$store.dragging = null;
    }
    onChoose(evt) {
        const { list: list , setList: setList  } = this.props;
        const newList = list.map((item, index)=>{
            let newItem = item;
            if (index === evt.oldIndex) newItem = Object.assign(item, {
                chosen: true
            });
            return newItem;
        });
        setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    onUnchoose(evt) {
        const { list: list , setList: setList  } = this.props;
        const newList = list.map((item, index)=>{
            let newItem = item;
            if (index === evt.oldIndex) newItem = Object.assign(newItem, {
                chosen: false
            });
            return newItem;
        });
        setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    onSpill(evt) {
        const { removeOnSpill: removeOnSpill , revertOnSpill: revertOnSpill  } = this.props;
        if (removeOnSpill && !revertOnSpill) (0, $eb03e74f8f7db1f3$export$1d0aa160432dfea5)(evt.item);
    }
    onSelect(evt) {
        const { list: list , setList: setList  } = this.props;
        const newList = list.map((item)=>Object.assign(item, {
                selected: false
            }));
        evt.newIndicies.forEach((curr)=>{
            const index = curr.index;
            if (index === -1) {
                console.log(`"${evt.type}" had indice of "${curr.index}", which is probably -1 and doesn't usually happen here.`);
                console.log(evt);
                return;
            }
            newList[index].selected = true;
        });
        setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
    onDeselect(evt) {
        const { list: list , setList: setList  } = this.props;
        const newList = list.map((item)=>Object.assign(item, {
                selected: false
            }));
        evt.newIndicies.forEach((curr)=>{
            const index = curr.index;
            if (index === -1) return;
            newList[index].selected = true;
        });
        setList(newList, this.sortable, $7fe8e3ea572bda7a$var$store);
    }
}


var $faefaad95e5fcca0$exports = {};


$parcel$exportWildcard(module.exports, $faefaad95e5fcca0$exports);


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/*!********************************************!*\
  !*** ./node_modules/shallowequal/index.js ***!
  \********************************************/
/***/ ((module) => {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ "./node_modules/sortablejs/modular/sortable.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/sortablejs/modular/sortable.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiDrag": () => (/* binding */ MultiDragPlugin),
/* harmony export */   "Sortable": () => (/* binding */ Sortable),
/* harmony export */   "Swap": () => (/* binding */ SwapPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var version = "1.15.0";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !! /*@__PURE__*/navigator.userAgent.match(pattern);
  }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};

function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function matches(
/**HTMLElement*/
el,
/**String*/
selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}

function closest(
/**HTMLElement*/
el,
/**String*/
selector,
/**HTMLElement*/
ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;

    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }

      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }

  return null;
}

var R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}

function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function matrix(el, selfOnly) {
  var appliedTransforms = '';

  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */

    } while (!selfOnly && (el = el.parentNode));
  }

  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */

  return matrixFn && new matrixFn(appliedTransforms);
}

function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;

    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }

    return list;
  }

  return [];
}

function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;

  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */


function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;

  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */

      } while (container = container.parentNode);
    }
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}
/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */


function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
  /* jshint boss:true */

  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;

    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }

    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }

  return false;
}
/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */


function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0,
      i = 0,
      children = el.children;

  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }

      currentChild++;
    }

    i++;
  }

  return null;
}
/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */


function lastChild(el, selector) {
  var last = el.lastElementChild;

  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }

  return last || null;
}
/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */


function index(el, selector) {
  var index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }
  /* jshint boss:true */


  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }

  return index;
}
/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */


function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();

  if (el) {
    do {
      var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }

  return [offsetLeft, offsetTop];
}
/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */


function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }

  return -1;
}

function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;

  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);

      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */

  } while (elem = elem.parentNode);

  return getWindowScrollingElement();
}

function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }

  return dst;
}

function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}

var _throttleTimeout;

function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
          _this = this;

      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }

      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}

function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}

var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
      animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });

        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);

          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }

        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;

      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }

      var animating = false,
          animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);

        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }

        target.toRect = toRect;

        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        } // if fromRect != toRect: animate


        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;

          if (!time) {
            time = _this.options.animation;
          }

          _this.animate(target, animatingRect, toRect, time);
        }

        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);

      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }

      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        this.forRepaintDummy = repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}

function repaint(target) {
  return target.offsetWidth;
}

function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }

    plugins.forEach(function (p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;

    this.eventCanceled = false;

    evt.cancel = function () {
      _this.eventCanceled = true;
    };

    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable: sortable
        }, evt));
      } // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined


      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized; // Add default options from plugin

      _extends(defaults, initialized.defaults);
    });

    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);

      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;

      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
      options = sortable.options,
      onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }

  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));

  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }

  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }

  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var _excluded = ["evt"];

var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, _excluded);

  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};

function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}

var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance,
    // For positioning ghost absolutely
ghostRelativeParent,
    ghostRelativeParentInitialScroll = [],
    // (left, top)
_silent = false,
    savedInputChecked = [];
/** @const */

var documentExists = typeof document !== 'undefined',
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
    // This will not pass for IE9, because IE9 DnD only works on anchors
supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
    supportCssPointerEvents = function () {
  if (!documentExists) return; // false when <= IE11

  if (IE11OrLess) {
    return false;
  }

  var el = document.createElement('x');
  el.style.cssText = 'pointer-events:auto';
  return el.style.pointerEvents === 'auto';
}(),
    _detectDirection = function _detectDirection(el, options) {
  var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

  if (elCSS.display === 'flex') {
    return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
  }

  if (elCSS.display === 'grid') {
    return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
  }

  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
    var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
    return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
  }

  return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
},
    _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
},

/**
 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
 * @param  {Number} x      X position
 * @param  {Number} y      Y position
 * @return {HTMLElement}   Element of the first found nearest Sortable
 */
_detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
  var ret;
  sortables.some(function (sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable),
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
},
    _prepareGroup = function _prepareGroup(options) {
  function toFn(value, pull) {
    return function (to, from, dragEl, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

      if (value == null && (pull || sameGroup)) {
        // Default pull value
        // Default pull and put value if same group
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === 'clone') {
        return value;
      } else if (typeof value === 'function') {
        return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }

  var group = {};
  var originalGroup = options.group;

  if (!originalGroup || _typeof(originalGroup) != 'object') {
    originalGroup = {
      name: originalGroup
    };
  }

  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
},
    _hideGhostForTarget = function _hideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', 'none');
  }
},
    _unhideGhostForTarget = function _unhideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', '');
  }
}; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


if (documentExists && !ChromeForAndroid) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}

var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;

    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

    if (nearest) {
      // Create imitation event
      var event = {};

      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }

      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;

      nearest[expando]._onDragOver(event);
    }
  }
};

var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */


function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }

  this.el = el; // root element

  this.options = options = _extends({}, options); // Export instance

  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults); // Set default options

  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }

  _prepareGroup(options); // Bind all private methods


  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  } // Setup drag mode


  this.nativeDraggable = options.forceFallback ? false : supportDraggable;

  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  } // Bind events


  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }

  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }

  sortables.push(this.el); // Restore sorting

  options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

  _extends(this, AnimationStateManager());
}

Sortable.prototype =
/** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(
  /** Event|TouchEvent */
  evt) {
    if (!evt.cancelable) return;

    var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
        target = (touch || evt).target,
        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
        filter = options.filter;

    _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


    if (dragEl) {
      return;
    }

    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    } // cancel dnd if original target is content editable


    if (originalTarget.isContentEditable) {
      return;
    } // Safari ignores further event handling after mousedown


    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') {
      return;
    }

    target = closest(target, options.draggable, el, false);

    if (target && target.animated) {
      return;
    }

    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    } // Get the index of the dragged element within its parent


    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable); // Check filter

    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });

        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);

        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });

      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }

    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    } // Prepare `dragstart`


    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(
  /** Event */
  evt,
  /** Touch */
  touch,
  /** HTMLElement */
  target) {
    var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;

    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';

      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });

        if (Sortable.eventCanceled) {
          _this._onDrop();

          return;
        } // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove


        _this._disableDelayedDragEvents();

        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        } // Bind the events: dragstart/dragend


        _this._triggerDragStart(evt, touch); // Drag start event


        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        }); // Chosen item


        toggleClass(dragEl, options.chosenClass, true);
      }; // Disable "draggable"


      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }

      pluginEvent('delayStart', this, {
        evt: evt
      }); // Delay is impossible for native DnD in Edge or IE

      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();

          return;
        } // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag


        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
  /** TouchEvent|PointerEvent **/
  e) {
    var touch = e.touches ? e.touches[0] : e;

    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);

    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(
  /** Event */
  evt,
  /** Touch */
  touch) {
    touch = touch || evt.pointerType == 'touch' && evt;

    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }

    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {

    awaitingDragStarted = false;

    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });

      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }

      var options = this.options; // Apply effect

      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost(); // Drag start event

      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;

      _hideGhostForTarget();

      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;

      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }

      dragEl.parentNode[expando]._isOutsideThisEl(target);

      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });

            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }

          target = parent; // store last element
        }
        /* jshint boss:true */
        while (parent = parent.parentNode);
      }

      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(
  /**TouchEvent*/
  evt) {
    if (tapEvt) {
      var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
          dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
          dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }

        this._onDragStart(evt, true);
      }

      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }

        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }

      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
          options = this.options; // Position absolutely

      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;

        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }

        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }

        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }

      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl); // Set transform-origin

      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart(
  /**Event*/
  evt,
  /**boolean*/
  fallback) {
    var _this = this;

    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });

    if (Sortable.eventCanceled) {
      this._onDrop();

      return;
    }

    pluginEvent('setupClone', this);

    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';

      this._hideClone();

      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    } // #1143: IFrame support workaround


    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;

      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }

      _this._hideClone();

      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }

      on(document, 'drop', _this); // #1276 fix:

      css(dragEl, 'transform', 'translateZ(0)');
    }

    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;

    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(
  /**Event*/
  evt) {
    var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;

    if (_silent) return;

    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread2({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    } // Capture animation state


    function capture() {
      dragOverEvent('dragOverAnimationCapture');

      _this.captureAnimationState();

      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    } // Return invocation when dragEl is inserted (or completed)


    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }

        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }

        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        } // Animation


        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }

        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });

        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      } // Null lastTarget if it is not inside a previously swapped element


      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      } // no bubbling and not fallback


      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


        !insertion && nearestEmptyInsertDetectEvent(evt);
      }

      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    } // Call when dragEl has been inserted


    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }

    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }

    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;

    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }

    ignoreNextClick = false;

    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;

      if (revert) {
        parentEl = rootEl; // actualization

        capture();

        this._hideClone();

        dragOverEvent('revert');

        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }

        return completed(true);
      }

      var elLastChild = lastChild(el, options.draggable);

      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // Insert to end of list
        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        } // if there is a last element, it is the target


        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }

        if (target) {
          targetRect = getRect(target);
        }

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();

          if (elLastChild && elLastChild.nextSibling) {
            // the last draggable element is not the last node
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }

          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        // Insert to start of list
        var firstChild = getChild(el, 0, options, true);

        if (firstChild === dragEl) {
          return completed(false);
        }

        target = firstChild;
        targetRect = getRect(target);

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
            side1 = vertical ? 'top' : 'left',
            scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }

        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;

        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);

          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        } // If dragEl is already beside target: Do not insert


        if (direction === 0 || sibling === target) {
          return completed(false);
        }

        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
            after = false;
        after = direction === 1;

        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }

          _silent = true;
          setTimeout(_unsilent, 30);
          capture();

          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          } // Undo chrome's scroll adjustment (has no effect on other browsers)


          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }

          parentEl = dragEl.parentNode; // actualization
          // must be done before animation

          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }

          changed();
          return completed(true);
        }
      }

      if (el.contains(dragEl)) {
        return completed(false);
      }
    }

    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop(
  /**Event*/
  evt) {
    var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);

    if (Sortable.eventCanceled) {
      this._nulling();

      return;
    }

    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);

    _cancelNextTick(this.cloneId);

    _cancelNextTick(this._dragStartId); // Unbind events


    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }

    this._offMoveEvents();

    this._offUpEvents();

    if (Safari) {
      css(document.body, 'user-select', '');
    }

    css(dragEl, 'transform', '');

    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }

      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }

      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }

        _disableDraggable(dragEl);

        dragEl.style['will-change'] = ''; // Remove classes
        // ghostClass is added in dragStarted

        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }

        toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });

        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            }); // Remove event


            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            }); // drag from one list and drop into another


            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }

          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }

        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }

          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          }); // Save sorting


          this.save();
        }
      }
    }

    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(
  /**Event*/
  evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);

        break;

      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);

          _globalDragOver(evt);
        }

        break;

      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },

  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;

    for (; i < n; i++) {
      el = children[i];

      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }

    return order;
  },

  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {},
        rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];

      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },

  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },

  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;

    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);

      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }

      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },

  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    } // Remove draggable attributes


    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });

    this._onDrop();

    this._disableDelayedDragEvents();

    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');

      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }

      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();

      return;
    }

    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return; // show clone at dragEl or original position

      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }

      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }

      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};

function _globalDragOver(
/**Event*/
evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  evt.cancelable && evt.preventDefault();
}

function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }

  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);

  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }

  return retVal;
}

function _disableDraggable(el) {
  el.draggable = false;
}

function _unsilent() {
  _silent = false;
}

function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}

function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}

function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;

  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }

      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }

  invert = invert || invertSwap;

  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }

  return 0;
}
/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */


function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */


function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;

  while (i--) {
    sum += str.charCodeAt(i);
  }

  return sum.toString(36);
}

function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;

  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}

function _nextTick(fn) {
  return setTimeout(fn, 0);
}

function _cancelNextTick(id) {
  return clearTimeout(id);
} // Fixed #973:


if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
} // Export utils


Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};
/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */

Sortable.get = function (element) {
  return element[expando];
};
/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */


Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }

    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */


Sortable.create = function (el, options) {
  return new Sortable(el, options);
}; // Export


Sortable.version = version;

var autoScrolls = [],
    scrollEl,
    scrollRootEl,
    scrolling = false,
    lastAutoScrollX,
    lastAutoScrollY,
    touchEvt$1,
    pointerElemChangedInterval;

function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    }; // Bind all private methods

    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }

  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;

      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;

      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }

      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;

      var x = (evt.touches ? evt.touches[0] : evt).clientX,
          y = (evt.touches ? evt.touches[0] : evt).clientY,
          elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt; // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good

      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

        var ogElemScroller = getParentAutoScrollElement(elem, true);

        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }

            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }

        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}

function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}

function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}

var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
      y = (evt.touches ? evt.touches[0] : evt).clientY,
      sens = options.scrollSensitivity,
      speed = options.scrollSpeed,
      winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
      scrollCustomFn; // New scroll root, set scrollEl

  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;

    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }

  var layersOut = 0;
  var currentParent = scrollEl;

  do {
    var el = currentParent,
        rect = getRect(el),
        top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right,
        width = rect.width,
        height = rect.height,
        canScrollX = void 0,
        canScrollY = void 0,
        scrollWidth = el.scrollWidth,
        scrollHeight = el.scrollHeight,
        elCSS = css(el),
        scrollPosX = el.scrollLeft,
        scrollPosY = el.scrollTop;

    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }

    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }

    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);

      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */

        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

          }

          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }

          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }

    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();

  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};

function Revert() {}

Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();

    if (putSortable) {
      putSortable.captureAnimationState();
    }

    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }

    this.sortable.animateAll();

    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};

_extends(Revert, {
  pluginName: 'revertOnSpill'
});

function Remove() {}

Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};

_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }

  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
          target = _ref2.target,
          onMove = _ref2.onMove,
          activeSortable = _ref2.activeSortable,
          changed = _ref2.changed,
          cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
          options = this.options;

      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;

        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
          putSortable = _ref3.putSortable,
          dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
      p2 = n2.parentNode,
      i1,
      i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }

  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
    multiDragClones = [],
    lastMultiDragSelect,
    // for selection with modifier key down (SHIFT)
multiDragSortable,
    initialFolding = false,
    // Initial multi-drag fold when drag started
folding = false,
    // Folding any other time
dragStarted = false,
    dragEl$1,
    clonesFromRect,
    clonesHidden;

function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    if (!sortable.options.avoidImplicitDeselect) {
      if (sortable.options.supportPointer) {
        on(document, 'pointerup', this._deselectMultiDrag);
      } else {
        on(document, 'mouseup', this._deselectMultiDrag);
        on(document, 'touchend', this._deselectMultiDrag);
      }
    }

    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      avoidImplicitDeselect: false,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';

        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }

        dataTransfer.setData('Text', data);
      }
    };
  }

  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
          cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;

      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }

      sortable._hideClone();

      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
          rootEl = _ref3.rootEl,
          dispatchSortableEvent = _ref3.dispatchSortableEvent,
          cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;

      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
          rootEl = _ref4.rootEl,
          cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;

      var sortable = _ref5.sortable,
          cloneNowHidden = _ref5.cloneNowHidden,
          cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');

        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;

      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }

      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      }); // Sort multi-drag elements

      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;

      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;

      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM
        sortable.captureAnimationState();

        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }

      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;

        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        } // Remove all auxiliary multidrag items from el, if sorting enabled


        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
          completed = _ref8.completed,
          cancel = _ref8.cancel;

      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
          rootEl = _ref9.rootEl,
          sortable = _ref9.sortable,
          dragRect = _ref9.dragRect;

      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
          isOwner = _ref10.isOwner,
          insertion = _ref10.insertion,
          activeSortable = _ref10.activeSortable,
          parentEl = _ref10.parentEl,
          putSortable = _ref10.putSortable;
      var options = this.options;

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }

        initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }

          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;

            activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
          isOwner = _ref11.isOwner,
          activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });

      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
          rootEl = _ref12.rootEl,
          parentEl = _ref12.parentEl,
          sortable = _ref12.sortable,
          dispatchSortableEvent = _ref12.dispatchSortableEvent,
          oldIndex = _ref12.oldIndex,
          putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
          children = parentEl.children; // Multi-drag selection

      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }

        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvent: evt
          }); // Modifier activated, select from last to dragEl

          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
                currentIndex = index(dragEl$1);

            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;

              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }

              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvent: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }

          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvent: evt
          });
        }
      } // Multi-drag drop


      if (dragStarted && this.isMultiDrag) {
        folding = false; // Do not "unfold" after around dragEl if reverted

        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
              multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();

          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;

                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect; // Prepare unfold animation

                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed


            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }

              multiDragIndex++;
            }); // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.

            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });

              if (update) {
                dispatchSortableEvent('update');
              }
            }
          } // Must be done after capturing individual rects (scroll bar)


          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }

        multiDragSortable = toSortable;
      } // Remove clones if necessary


      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();

      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

      if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

      if (evt && evt.button !== 0) return;

      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvent: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();

          multiDragSortable = sortable;
        }

        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },

      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
            index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;

      var oldIndicies = [],
          newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        }); // multiDragElements will already be sorted if folding

        var newIndex;

        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }

        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();

        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }

        return key;
      }
    }
  });
}

function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}
/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */


function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}

function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sortable);



/***/ }),

/***/ "./node_modules/styled-components/dist/styled-components.browser.esm.js":
/*!******************************************************************************!*\
  !*** ./node_modules/styled-components/dist/styled-components.browser.esm.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerStyleSheet": () => (/* binding */ Je),
/* harmony export */   "StyleSheetConsumer": () => (/* binding */ le),
/* harmony export */   "StyleSheetContext": () => (/* binding */ ue),
/* harmony export */   "StyleSheetManager": () => (/* binding */ ye),
/* harmony export */   "ThemeConsumer": () => (/* binding */ Le),
/* harmony export */   "ThemeContext": () => (/* binding */ Ge),
/* harmony export */   "ThemeProvider": () => (/* binding */ Fe),
/* harmony export */   "__PRIVATE__": () => (/* binding */ Ke),
/* harmony export */   "createGlobalStyle": () => (/* binding */ We),
/* harmony export */   "css": () => (/* binding */ Ce),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "isStyledComponent": () => (/* binding */ N),
/* harmony export */   "keyframes": () => (/* binding */ Ue),
/* harmony export */   "useTheme": () => (/* binding */ Ze),
/* harmony export */   "version": () => (/* binding */ C),
/* harmony export */   "withTheme": () => (/* binding */ Xe)
/* harmony export */ });
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shallowequal */ "./node_modules/shallowequal/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shallowequal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/stylis */ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6__);
function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var g=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},S=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!(0,react_is__WEBPACK_IMPORTED_MODULE_0__.typeOf)(t)},w=Object.freeze([]),E=Object.freeze({});function b(e){return"function"==typeof e}function _(e){return true&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function N(e){return e&&"string"==typeof e.styledComponentId}var A="undefined"!=typeof process&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",C="5.3.5",I="undefined"!=typeof window&&"HTMLElement"in window,P=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!=="development"),O={},R= true?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"}:0;function D(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t)})),e}function j(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw false?0:new Error(D.apply(void 0,[R[e]].concat(n)).trim())}var T=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&j(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),x=new Map,k=new Map,V=1,B=function(e){if(x.has(e))return x.get(e);for(;k.has(V);)V++;var t=V++;return true&&((0|t)<0||t>1<<30)&&j(16,""+t),x.set(e,t),k.set(t,e),t},z=function(e){return k.get(e)},M=function(e,t){t>=V&&(V=t+1),x.set(e,t),k.set(t,e)},G="style["+A+'][data-styled-version="5.3.5"]',L=new RegExp("^"+A+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),F=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r)},Y=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(L);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(M(u,c),F(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(i)}}},q=function(){return"undefined"!=typeof window&&void 0!==window.__webpack_nonce__?window.__webpack_nonce__:null},H=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(A))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(A,"active"),r.setAttribute("data-styled-version","5.3.5");var i=q();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},$=function(){function e(e){var t=this.element=H(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}j(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),W=function(){function e(e){var t=this.element=H(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),U=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),J=I,X={isServer:!I,useCSSOMInjection:!P},Z=function(){function e(e,t,n){void 0===e&&(e=E),void 0===t&&(t={}),this.options=v({},X,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&I&&J&&(J=!1,function(e){for(var t=document.querySelectorAll(G),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(A)&&(Y(e,o),o.parentNode&&o.parentNode.removeChild(o))}}(this))}e.registerId=function(e){return B(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(v({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new U(o):r?new $(o):new W(o),new T(e)));var e,t,n,r,o},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(B(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(B(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(B(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=z(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(i&&a&&i.size){var c=A+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",")})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n'}}}return r}(this)},e}(),K=/(a)(d)/gi,Q=function(e){return String.fromCharCode(e+(e>25?39:97))};function ee(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Q(t%52)+n;return(Q(t%52)+n).replace(K,"$1-$2")}var te=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ne=function(e){return te(5381,e)};function re(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(b(n)&&!N(n))return!1}return!0}var oe=ne("5.3.5"),se=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic= false&&0,this.componentId=t,this.baseHash=te(oe,t),this.baseStyle=n,Z.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else{var s=Ne(this.rules,e,t,n).join(""),i=ee(te(this.baseHash,s)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a)}o.push(i),this.staticRulesId=i}else{for(var c=this.rules.length,u=te(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h, true&&(u=te(u,h+d));else if(h){var p=Ne(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=te(u,f+d),l+=f}}if(l){var m=ee(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y)}o.push(m)}}return o.join(" ")},e}(),ie=/^\s*\/\/.*$/gm,ae=[":","[",".","#"];function ce(e){var t,n,r,o,s=void 0===e?E:e,i=s.options,a=void 0===i?E:i,c=s.plugins,u=void 0===c?w:c,l=new _emotion_stylis__WEBPACK_IMPORTED_MODULE_3__["default"](a),d=[],h=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){d.push(e)})),f=function(e,r,s){return 0===r&&-1!==ae.indexOf(s[n.length])||s.match(o)?e:"."+t};function m(e,s,i,a){void 0===a&&(a="&");var c=e.replace(ie,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),l(i||!s?"":s,u)}return l.use([].concat(u,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f))},h,function(e){if(-2===e){var t=d;return d=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||j(15),te(e,t.name)}),5381).toString():"",m}var ue=react__WEBPACK_IMPORTED_MODULE_1___default().createContext(),le=ue.Consumer,de=react__WEBPACK_IMPORTED_MODULE_1___default().createContext(),he=(de.Consumer,new Z),pe=ce();function fe(){return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ue)||he}function me(){return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(de)||pe}function ye(e){var t=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(e.stylisPlugins),n=t[0],s=t[1],c=fe(),u=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)((function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target]),l=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)((function(){return ce({options:{prefix:!e.disableVendorPrefixes},plugins:n})}),[e.disableVendorPrefixes,n]);return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function(){shallowequal__WEBPACK_IMPORTED_MODULE_2___default()(n,e.stylisPlugins)||s(e.stylisPlugins)}),[e.stylisPlugins]),react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ue.Provider,{value:u},react__WEBPACK_IMPORTED_MODULE_1___default().createElement(de.Provider,{value:l}, true?react__WEBPACK_IMPORTED_MODULE_1___default().Children.only(e.children):0))}var ve=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=pe);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return j(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=pe),this.name+e.hash},e}(),ge=/([A-Z])/,Se=/([A-Z])/g,we=/^ms-/,Ee=function(e){return"-"+e.toLowerCase()};function be(e){return ge.test(e)?e.replace(Se,Ee).replace(we,"-ms-"):e}var _e=function(e){return null==e||!1===e||""===e};function Ne(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=Ne(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(_e(e))return"";if(N(e))return"."+e.styledComponentId;if(b(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return true&&(0,react_is__WEBPACK_IMPORTED_MODULE_0__.isElement)(u)&&console.warn(_(e)+" is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."),Ne(u,n,r,o)}var l;return e instanceof ve?r?(e.inject(r,o),e.getName(o)):e:S(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!_e(t[i])&&(Array.isArray(t[i])&&t[i].isCss||b(t[i])?s.push(be(i)+":",t[i],";"):S(t[i])?s.push.apply(s,e(t[i],i)):s.push(be(i)+": "+(r=i,null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in _emotion_unitless__WEBPACK_IMPORTED_MODULE_4__["default"]?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}var Ae=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function Ce(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return b(e)||S(e)?Ae(Ne(g(w,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Ae(Ne(g(e,n)))}var Ie=/invalid hook call/i,Pe=new Set,Oe=function(e,t){if(true){var n="The component "+e+(t?' with the id of "'+t+'"':"")+" has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",r=console.error;try{var o=!0;console.error=function(e){if(Ie.test(e))o=!1,Pe.delete(n);else{for(var t=arguments.length,s=new Array(t>1?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];r.apply(void 0,[e].concat(s))}},(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(),o&&!Pe.has(n)&&(console.warn(n),Pe.add(n))}catch(e){Ie.test(e.message)&&Pe.delete(n)}finally{console.error=r}}},Re=function(e,t,n){return void 0===n&&(n=E),e.theme!==n.theme&&e.theme||t||n.theme},De=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,je=/(^-|-$)/g;function Te(e){return e.replace(De,"-").replace(je,"")}var xe=function(e){return ee(ne(e)>>>0)};function ke(e){return"string"==typeof e&&( false||e.charAt(0)===e.charAt(0).toLowerCase())}var Ve=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Be=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function ze(e,t,n){var r=e[n];Ve(t)&&Ve(r)?Me(r,t):e[n]=t}function Me(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(Ve(i))for(var a in i)Be(a)&&ze(e,i[a],a)}return e}var Ge=react__WEBPACK_IMPORTED_MODULE_1___default().createContext(),Le=Ge.Consumer;function Fe(e){var t=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Ge),n=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)((function(){return function(e,t){if(!e)return j(14);if(b(e)){var n=e(t);return false||null!==n&&!Array.isArray(n)&&"object"==typeof n?n:j(7)}return Array.isArray(e)||"object"!=typeof e?j(8):t?v({},t,{},e):e}(e.theme,t)}),[e.theme,t]);return e.children?react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Ge.Provider,{value:n},e.children):null}var Ye={};function qe(e,t,n){var o=N(e),i=!ke(e),a=t.attrs,c=void 0===a?w:a,d=t.componentId,h=void 0===d?function(e,t){var n="string"!=typeof e?"sc":Te(e);Ye[n]=(Ye[n]||0)+1;var r=n+"-"+xe("5.3.5"+n+Ye[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):d,p=t.displayName,f=void 0===p?function(e){return ke(e)?"styled."+e:"Styled("+_(e)+")"}(e):p,g=t.displayName&&t.componentId?Te(t.displayName)+"-"+t.componentId:t.componentId||h,S=o&&e.attrs?Array.prototype.concat(e.attrs,c).filter(Boolean):c,A=t.shouldForwardProp;o&&e.shouldForwardProp&&(A=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var C,I=new se(n,g,o?e.componentStyle:void 0),P=I.isStatic&&0===c.length,O=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,d=e.shouldForwardProp,h=e.styledComponentId,p=e.target; true&&(0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(h);var f=function(e,t,n){void 0===e&&(e=E);var r=v({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in b(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t]})),[r,o]}(Re(t,(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Ge),a)||E,t,o),y=f[0],g=f[1],S=function(e,t,n,r){var o=fe(),s=me(),i=t?e.generateAndInjectStyles(E,o,s):e.generateAndInjectStyles(n,o,s);return true&&(0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(i), true&&!t&&r&&r(i),i}(i,r,y, true?e.warnTooManyClasses:0),w=n,_=g.$as||t.$as||g.as||t.as||p,N=ke(_),A=g!==t?v({},t,{},g):t,C={};for(var I in A)"$"!==I[0]&&"as"!==I&&("forwardedAs"===I?C.as=A[I]:(d?d(I,_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_5__["default"],_):!N||(0,_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_5__["default"])(I))&&(C[I]=A[I]));return t.style&&g.style!==t.style&&(C.style=v({},t.style,{},g.style)),C.className=Array.prototype.concat(c,h,S!==h?S:null,t.className,g.className).filter(Boolean).join(" "),C.ref=w,(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_,C)}(C,e,t,P)};return O.displayName=f,(C=react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(O)).attrs=S,C.componentStyle=I,C.displayName=f,C.shouldForwardProp=A,C.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):w,C.styledComponentId=g,C.target=o?e.target:e,C.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(ke(e)?e:Te(_(e)));return qe(e,v({},o,{attrs:S,componentId:s}),n)},Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?Me({},e.defaultProps,t):t}}), true&&(Oe(f,g),C.warnTooManyClasses=function(e,t){var n={},r=!1;return function(o){if(!r&&(n[o]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'+t+'"':"";console.warn("Over 200 classes were generated for component "+e+s+".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=!0,n={}}}}(f,g)),C.toString=function(){return"."+C.styledComponentId},i&&hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6___default()(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),C}var He=function(e){return function e(t,r,o){if(void 0===o&&(o=E),!(0,react_is__WEBPACK_IMPORTED_MODULE_0__.isValidElementType)(r))return j(1,String(r));var s=function(){return t(r,o,Ce.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,v({},o,{},n))},s.attrs=function(n){return e(t,r,v({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(qe,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){He[e]=He(e)}));var $e=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=re(e),Z.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(e,t,n,r){var o=r(Ne(this.rules,t,n,r).join(""),""),s=this.componentId+e;n.insertRules(s,s,o)},t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},t.renderStyles=function(e,t,n,r){e>2&&Z.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function We(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=Ce.apply(void 0,[e].concat(n)),a="sc-global-"+xe(JSON.stringify(i)),u=new $e(i,a);function l(e){var t=fe(),n=me(),o=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Ge),l=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(t.allocateGSInstance(a)).current;return true&&react__WEBPACK_IMPORTED_MODULE_1___default().Children.count(e.children)&&console.warn("The global style component "+a+" was given child JSX. createGlobalStyle does not render children."), true&&i.some((function(e){return"string"==typeof e&&-1!==e.indexOf("@import")}))&&console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."),t.server&&h(l,e,t,o,n),(0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)((function(){if(!t.server)return h(l,e,t,o,n),function(){return u.removeStyles(l,t)}}),[l,e,t,o,n]),null}function h(e,t,n,r,o){if(u.isStatic)u.renderStyles(e,O,n,o);else{var s=v({},t,{theme:Re(t,r,l.defaultProps)});u.renderStyles(e,s,n,o)}}return true&&Oe(a),react__WEBPACK_IMPORTED_MODULE_1___default().memo(l)}function Ue(e){ true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=Ce.apply(void 0,[e].concat(n)).join(""),s=xe(o);return new ve(s,o)}var Je=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=q();return"<style "+[n&&'nonce="'+n+'"',A+'="true"','data-styled-version="5.3.5"'].filter(Boolean).join(" ")+">"+t+"</style>"},this.getStyleTags=function(){return e.sealed?j(2):e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)return j(2);var n=((t={})[A]="",t["data-styled-version"]="5.3.5",t.dangerouslySetInnerHTML={__html:e.instance.toString()},t),o=q();return o&&(n.nonce=o),[react__WEBPACK_IMPORTED_MODULE_1___default().createElement("style",v({},n,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Z({isServer:!0}),this.sealed=!1}var t=e.prototype;return t.collectStyles=function(e){return this.sealed?j(2):react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ye,{sheet:this.instance},e)},t.interleaveWithNodeStream=function(e){return j(3)},e}(),Xe=function(e){var t=react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef((function(t,n){var o=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Ge),i=e.defaultProps,a=Re(t,o,i);return true&&void 0===a&&console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'+_(e)+'"'),react__WEBPACK_IMPORTED_MODULE_1___default().createElement(e,v({},t,{theme:a,ref:n}))}));return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6___default()(t,e),t.displayName="WithTheme("+_(e)+")",t},Ze=function(){return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Ge)},Ke={StyleSheet:Z,masterSheet:he}; true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"), true&&"undefined"!=typeof window&&(window["__styled-components-init__"]=window["__styled-components-init__"]||0,1===window["__styled-components-init__"]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window["__styled-components-init__"]+=1);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (He);
//# sourceMappingURL=styled-components.browser.esm.js.map


/***/ }),

/***/ "./node_modules/tiny-invariant/dist/tiny-invariant.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invariant)
/* harmony export */ });
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? prefix + ": " + provided : prefix;
    throw new Error(value);
}




/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "lodash-es":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_post_title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/post-title */ "./src/blocks/post-title/index.js");
/* harmony import */ var _blocks_post_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/post-grid */ "./src/blocks/post-grid/index.js");
/* harmony import */ var _blocks_post_excerpt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/post-excerpt */ "./src/blocks/post-excerpt/index.js");
/* harmony import */ var _blocks_read_more__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/read-more */ "./src/blocks/read-more/index.js");
/* harmony import */ var _blocks_post_author__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/post-author */ "./src/blocks/post-author/index.js");
/* harmony import */ var _blocks_post_categories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blocks/post-categories */ "./src/blocks/post-categories/index.js");
/* harmony import */ var _blocks_post_tags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blocks/post-tags */ "./src/blocks/post-tags/index.js");
/* harmony import */ var _blocks_post_terms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blocks/post-terms */ "./src/blocks/post-terms/index.js");
/* harmony import */ var _blocks_post_meta__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./blocks/post-meta */ "./src/blocks/post-meta/index.js");
/* harmony import */ var _blocks_heading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./blocks/heading */ "./src/blocks/heading/index.js");
/* harmony import */ var _blocks_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blocks/link */ "./src/blocks/link/index.js");
window.PostGridPluginData = [];











})();

/******/ })()
;
//# sourceMappingURL=index.js.map