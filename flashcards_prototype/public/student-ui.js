var bu = { exports: {} }, il = {}, es = { exports: {} }, T = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qt = Symbol.for("react.element"), vc = Symbol.for("react.portal"), yc = Symbol.for("react.fragment"), gc = Symbol.for("react.strict_mode"), wc = Symbol.for("react.profiler"), kc = Symbol.for("react.provider"), Sc = Symbol.for("react.context"), xc = Symbol.for("react.forward_ref"), _c = Symbol.for("react.suspense"), Ec = Symbol.for("react.memo"), Cc = Symbol.for("react.lazy"), Hi = Symbol.iterator;
function Nc(e) {
  return e === null || typeof e != "object" ? null : (e = Hi && e[Hi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ns = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ts = Object.assign, rs = {};
function st(e, n, t) {
  this.props = e, this.context = n, this.refs = rs, this.updater = t || ns;
}
st.prototype.isReactComponent = {};
st.prototype.setState = function(e, n) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, n, "setState");
};
st.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ls() {
}
ls.prototype = st.prototype;
function Ko(e, n, t) {
  this.props = e, this.context = n, this.refs = rs, this.updater = t || ns;
}
var Yo = Ko.prototype = new ls();
Yo.constructor = Ko;
ts(Yo, st.prototype);
Yo.isPureReactComponent = !0;
var Bi = Array.isArray, os = Object.prototype.hasOwnProperty, Zo = { current: null }, is = { key: !0, ref: !0, __self: !0, __source: !0 };
function us(e, n, t) {
  var r, l = {}, o = null, i = null;
  if (n != null) for (r in n.ref !== void 0 && (i = n.ref), n.key !== void 0 && (o = "" + n.key), n) os.call(n, r) && !is.hasOwnProperty(r) && (l[r] = n[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = t;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: qt, type: e, key: o, ref: i, props: l, _owner: Zo.current };
}
function Lc(e, n) {
  return { $$typeof: qt, type: e.type, key: n, ref: e.ref, props: e.props, _owner: e._owner };
}
function Xo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === qt;
}
function Pc(e) {
  var n = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(t) {
    return n[t];
  });
}
var Ai = /\/+/g;
function Cl(e, n) {
  return typeof e == "object" && e !== null && e.key != null ? Pc("" + e.key) : n.toString(36);
}
function _r(e, n, t, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (o) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case qt:
        case vc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Cl(i, 0) : r, Bi(l) ? (t = "", e != null && (t = e.replace(Ai, "$&/") + "/"), _r(l, n, t, "", function(c) {
    return c;
  })) : l != null && (Xo(l) && (l = Lc(l, t + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Ai, "$&/") + "/") + e)), n.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Bi(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + Cl(o, u);
    i += _r(o, n, t, s, l);
  }
  else if (s = Nc(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + Cl(o, u++), i += _r(o, n, t, s, l);
  else if (o === "object") throw n = String(e), Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function or(e, n, t) {
  if (e == null) return e;
  var r = [], l = 0;
  return _r(e, r, "", "", function(o) {
    return n.call(t, o, l++);
  }), r;
}
function zc(e) {
  if (e._status === -1) {
    var n = e._result;
    n = n(), n.then(function(t) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
    }, function(t) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
    }), e._status === -1 && (e._status = 0, e._result = n);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ae = { current: null }, Er = { transition: null }, jc = { ReactCurrentDispatcher: ae, ReactCurrentBatchConfig: Er, ReactCurrentOwner: Zo };
function ss() {
  throw Error("act(...) is not supported in production builds of React.");
}
T.Children = { map: or, forEach: function(e, n, t) {
  or(e, function() {
    n.apply(this, arguments);
  }, t);
}, count: function(e) {
  var n = 0;
  return or(e, function() {
    n++;
  }), n;
}, toArray: function(e) {
  return or(e, function(n) {
    return n;
  }) || [];
}, only: function(e) {
  if (!Xo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
T.Component = st;
T.Fragment = yc;
T.Profiler = wc;
T.PureComponent = Ko;
T.StrictMode = gc;
T.Suspense = _c;
T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jc;
T.act = ss;
T.cloneElement = function(e, n, t) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ts({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (n != null) {
    if (n.ref !== void 0 && (o = n.ref, i = Zo.current), n.key !== void 0 && (l = "" + n.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in n) os.call(n, s) && !is.hasOwnProperty(s) && (r[s] = n[s] === void 0 && u !== void 0 ? u[s] : n[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = t;
  else if (1 < s) {
    u = Array(s);
    for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: qt, type: e.type, key: l, ref: o, props: r, _owner: i };
};
T.createContext = function(e) {
  return e = { $$typeof: Sc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: kc, _context: e }, e.Consumer = e;
};
T.createElement = us;
T.createFactory = function(e) {
  var n = us.bind(null, e);
  return n.type = e, n;
};
T.createRef = function() {
  return { current: null };
};
T.forwardRef = function(e) {
  return { $$typeof: xc, render: e };
};
T.isValidElement = Xo;
T.lazy = function(e) {
  return { $$typeof: Cc, _payload: { _status: -1, _result: e }, _init: zc };
};
T.memo = function(e, n) {
  return { $$typeof: Ec, type: e, compare: n === void 0 ? null : n };
};
T.startTransition = function(e) {
  var n = Er.transition;
  Er.transition = {};
  try {
    e();
  } finally {
    Er.transition = n;
  }
};
T.unstable_act = ss;
T.useCallback = function(e, n) {
  return ae.current.useCallback(e, n);
};
T.useContext = function(e) {
  return ae.current.useContext(e);
};
T.useDebugValue = function() {
};
T.useDeferredValue = function(e) {
  return ae.current.useDeferredValue(e);
};
T.useEffect = function(e, n) {
  return ae.current.useEffect(e, n);
};
T.useId = function() {
  return ae.current.useId();
};
T.useImperativeHandle = function(e, n, t) {
  return ae.current.useImperativeHandle(e, n, t);
};
T.useInsertionEffect = function(e, n) {
  return ae.current.useInsertionEffect(e, n);
};
T.useLayoutEffect = function(e, n) {
  return ae.current.useLayoutEffect(e, n);
};
T.useMemo = function(e, n) {
  return ae.current.useMemo(e, n);
};
T.useReducer = function(e, n, t) {
  return ae.current.useReducer(e, n, t);
};
T.useRef = function(e) {
  return ae.current.useRef(e);
};
T.useState = function(e) {
  return ae.current.useState(e);
};
T.useSyncExternalStore = function(e, n, t) {
  return ae.current.useSyncExternalStore(e, n, t);
};
T.useTransition = function() {
  return ae.current.useTransition();
};
T.version = "18.3.1";
es.exports = T;
var M = es.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc = M, Rc = Symbol.for("react.element"), Mc = Symbol.for("react.fragment"), Ic = Object.prototype.hasOwnProperty, Oc = Tc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Dc = { key: !0, ref: !0, __self: !0, __source: !0 };
function as(e, n, t) {
  var r, l = {}, o = null, i = null;
  t !== void 0 && (o = "" + t), n.key !== void 0 && (o = "" + n.key), n.ref !== void 0 && (i = n.ref);
  for (r in n) Ic.call(n, r) && !Dc.hasOwnProperty(r) && (l[r] = n[r]);
  if (e && e.defaultProps) for (r in n = e.defaultProps, n) l[r] === void 0 && (l[r] = n[r]);
  return { $$typeof: Rc, type: e, key: o, ref: i, props: l, _owner: Oc.current };
}
il.Fragment = Mc;
il.jsx = as;
il.jsxs = as;
bu.exports = il;
var v = bu.exports, cs = { exports: {} }, Se = {}, fs = { exports: {} }, ds = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function n(x, P) {
    var j = x.length;
    x.push(P);
    e: for (; 0 < j; ) {
      var K = j - 1 >>> 1, J = x[K];
      if (0 < l(J, P)) x[K] = P, x[j] = J, j = K;
      else break e;
    }
  }
  function t(x) {
    return x.length === 0 ? null : x[0];
  }
  function r(x) {
    if (x.length === 0) return null;
    var P = x[0], j = x.pop();
    if (j !== P) {
      x[0] = j;
      e: for (var K = 0, J = x.length, rr = J >>> 1; K < rr; ) {
        var kn = 2 * (K + 1) - 1, El = x[kn], Sn = kn + 1, lr = x[Sn];
        if (0 > l(El, j)) Sn < J && 0 > l(lr, El) ? (x[K] = lr, x[Sn] = j, K = Sn) : (x[K] = El, x[kn] = j, K = kn);
        else if (Sn < J && 0 > l(lr, j)) x[K] = lr, x[Sn] = j, K = Sn;
        else break e;
      }
    }
    return P;
  }
  function l(x, P) {
    var j = x.sortIndex - P.sortIndex;
    return j !== 0 ? j : x.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, u = i.now();
    e.unstable_now = function() {
      return i.now() - u;
    };
  }
  var s = [], c = [], h = 1, m = null, p = 3, w = !1, k = !1, S = !1, F = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(x) {
    for (var P = t(c); P !== null; ) {
      if (P.callback === null) r(c);
      else if (P.startTime <= x) r(c), P.sortIndex = P.expirationTime, n(s, P);
      else break;
      P = t(c);
    }
  }
  function y(x) {
    if (S = !1, d(x), !k) if (t(s) !== null) k = !0, dt(_);
    else {
      var P = t(c);
      P !== null && O(y, P.startTime - x);
    }
  }
  function _(x, P) {
    k = !1, S && (S = !1, f(L), L = -1), w = !0;
    var j = p;
    try {
      for (d(P), m = t(s); m !== null && (!(m.expirationTime > P) || x && !ve()); ) {
        var K = m.callback;
        if (typeof K == "function") {
          m.callback = null, p = m.priorityLevel;
          var J = K(m.expirationTime <= P);
          P = e.unstable_now(), typeof J == "function" ? m.callback = J : m === t(s) && r(s), d(P);
        } else r(s);
        m = t(s);
      }
      if (m !== null) var rr = !0;
      else {
        var kn = t(c);
        kn !== null && O(y, kn.startTime - P), rr = !1;
      }
      return rr;
    } finally {
      m = null, p = j, w = !1;
    }
  }
  var N = !1, C = null, L = -1, I = 5, z = -1;
  function ve() {
    return !(e.unstable_now() - z < I);
  }
  function qe() {
    if (C !== null) {
      var x = e.unstable_now();
      z = x;
      var P = !0;
      try {
        P = C(!0, x);
      } finally {
        P ? He() : (N = !1, C = null);
      }
    } else N = !1;
  }
  var He;
  if (typeof a == "function") He = function() {
    a(qe);
  };
  else if (typeof MessageChannel < "u") {
    var ft = new MessageChannel(), _l = ft.port2;
    ft.port1.onmessage = qe, He = function() {
      _l.postMessage(null);
    };
  } else He = function() {
    F(qe, 0);
  };
  function dt(x) {
    C = x, N || (N = !0, He());
  }
  function O(x, P) {
    L = F(function() {
      x(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(x) {
    x.callback = null;
  }, e.unstable_continueExecution = function() {
    k || w || (k = !0, dt(_));
  }, e.unstable_forceFrameRate = function(x) {
    0 > x || 125 < x ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : I = 0 < x ? Math.floor(1e3 / x) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return t(s);
  }, e.unstable_next = function(x) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = p;
    }
    var j = p;
    p = P;
    try {
      return x();
    } finally {
      p = j;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(x, P) {
    switch (x) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        x = 3;
    }
    var j = p;
    p = x;
    try {
      return P();
    } finally {
      p = j;
    }
  }, e.unstable_scheduleCallback = function(x, P, j) {
    var K = e.unstable_now();
    switch (typeof j == "object" && j !== null ? (j = j.delay, j = typeof j == "number" && 0 < j ? K + j : K) : j = K, x) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3;
    }
    return J = j + J, x = { id: h++, callback: P, priorityLevel: x, startTime: j, expirationTime: J, sortIndex: -1 }, j > K ? (x.sortIndex = j, n(c, x), t(s) === null && x === t(c) && (S ? (f(L), L = -1) : S = !0, O(y, j - K))) : (x.sortIndex = J, n(s, x), k || w || (k = !0, dt(_))), x;
  }, e.unstable_shouldYield = ve, e.unstable_wrapCallback = function(x) {
    var P = p;
    return function() {
      var j = p;
      p = P;
      try {
        return x.apply(this, arguments);
      } finally {
        p = j;
      }
    };
  };
})(ds);
fs.exports = ds;
var Fc = fs.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $c = M, ke = Fc;
function g(e) {
  for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++) n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ps = /* @__PURE__ */ new Set(), Ot = {};
function In(e, n) {
  nt(e, n), nt(e + "Capture", n);
}
function nt(e, n) {
  for (Ot[e] = n, e = 0; e < n.length; e++) ps.add(n[e]);
}
var Ye = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Jl = Object.prototype.hasOwnProperty, Uc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Wi = {}, Qi = {};
function Vc(e) {
  return Jl.call(Qi, e) ? !0 : Jl.call(Wi, e) ? !1 : Uc.test(e) ? Qi[e] = !0 : (Wi[e] = !0, !1);
}
function Hc(e, n, t, r) {
  if (t !== null && t.type === 0) return !1;
  switch (typeof n) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : t !== null ? !t.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Bc(e, n, t, r) {
  if (n === null || typeof n > "u" || Hc(e, n, t, r)) return !0;
  if (r) return !1;
  if (t !== null) switch (t.type) {
    case 3:
      return !n;
    case 4:
      return n === !1;
    case 5:
      return isNaN(n);
    case 6:
      return isNaN(n) || 1 > n;
  }
  return !1;
}
function ce(e, n, t, r, l, o, i) {
  this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = o, this.removeEmptyString = i;
}
var te = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  te[e] = new ce(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var n = e[0];
  te[n] = new ce(n, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  te[e] = new ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  te[e] = new ce(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  te[e] = new ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  te[e] = new ce(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  te[e] = new ce(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  te[e] = new ce(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  te[e] = new ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Go = /[\-:]([a-z])/g;
function Jo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var n = e.replace(
    Go,
    Jo
  );
  te[n] = new ce(n, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var n = e.replace(Go, Jo);
  te[n] = new ce(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var n = e.replace(Go, Jo);
  te[n] = new ce(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  te[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
te.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  te[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function qo(e, n, t, r) {
  var l = te.hasOwnProperty(n) ? te[n] : null;
  (l !== null ? l.type !== 0 : r || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (Bc(n, t, l, r) && (t = null), r || l === null ? Vc(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
}
var Je = $c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ir = Symbol.for("react.element"), Fn = Symbol.for("react.portal"), $n = Symbol.for("react.fragment"), bo = Symbol.for("react.strict_mode"), ql = Symbol.for("react.profiler"), ms = Symbol.for("react.provider"), hs = Symbol.for("react.context"), ei = Symbol.for("react.forward_ref"), bl = Symbol.for("react.suspense"), eo = Symbol.for("react.suspense_list"), ni = Symbol.for("react.memo"), en = Symbol.for("react.lazy"), vs = Symbol.for("react.offscreen"), Ki = Symbol.iterator;
function pt(e) {
  return e === null || typeof e != "object" ? null : (e = Ki && e[Ki] || e["@@iterator"], typeof e == "function" ? e : null);
}
var W = Object.assign, Nl;
function St(e) {
  if (Nl === void 0) try {
    throw Error();
  } catch (t) {
    var n = t.stack.trim().match(/\n( *(at )?)/);
    Nl = n && n[1] || "";
  }
  return `
` + Nl + e;
}
var Ll = !1;
function Pl(e, n) {
  if (!e || Ll) return "";
  Ll = !0;
  var t = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (n) if (n = function() {
      throw Error();
    }, Object.defineProperty(n.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(n, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], n);
    } else {
      try {
        n.call();
      } catch (c) {
        r = c;
      }
      e.call(n.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; ) u--;
      for (; 1 <= i && 0 <= u; i--, u--) if (l[i] !== o[u]) {
        if (i !== 1 || u !== 1)
          do
            if (i--, u--, 0 > u || l[i] !== o[u]) {
              var s = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= i && 0 <= u);
        break;
      }
    }
  } finally {
    Ll = !1, Error.prepareStackTrace = t;
  }
  return (e = e ? e.displayName || e.name : "") ? St(e) : "";
}
function Ac(e) {
  switch (e.tag) {
    case 5:
      return St(e.type);
    case 16:
      return St("Lazy");
    case 13:
      return St("Suspense");
    case 19:
      return St("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Pl(e.type, !1), e;
    case 11:
      return e = Pl(e.type.render, !1), e;
    case 1:
      return e = Pl(e.type, !0), e;
    default:
      return "";
  }
}
function no(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case $n:
      return "Fragment";
    case Fn:
      return "Portal";
    case ql:
      return "Profiler";
    case bo:
      return "StrictMode";
    case bl:
      return "Suspense";
    case eo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case hs:
      return (e.displayName || "Context") + ".Consumer";
    case ms:
      return (e._context.displayName || "Context") + ".Provider";
    case ei:
      var n = e.render;
      return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ni:
      return n = e.displayName || null, n !== null ? n : no(e.type) || "Memo";
    case en:
      n = e._payload, e = e._init;
      try {
        return no(e(n));
      } catch {
      }
  }
  return null;
}
function Wc(e) {
  var n = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (n.displayName || "Context") + ".Consumer";
    case 10:
      return (n._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = n.render, e = e.displayName || e.name || "", n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return n;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return no(n);
    case 8:
      return n === bo ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof n == "function") return n.displayName || n.name || null;
      if (typeof n == "string") return n;
  }
  return null;
}
function hn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ys(e) {
  var n = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
}
function Qc(e) {
  var n = ys(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
  if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
    var l = t.get, o = t.set;
    return Object.defineProperty(e, n, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(i) {
      r = "" + i, o.call(this, i);
    } }), Object.defineProperty(e, n, { enumerable: t.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(i) {
      r = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[n];
    } };
  }
}
function ur(e) {
  e._valueTracker || (e._valueTracker = Qc(e));
}
function gs(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var t = n.getValue(), r = "";
  return e && (r = ys(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
}
function Or(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function to(e, n) {
  var t = n.checked;
  return W({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: t ?? e._wrapperState.initialChecked });
}
function Yi(e, n) {
  var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
  t = hn(n.value != null ? n.value : t), e._wrapperState = { initialChecked: r, initialValue: t, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
}
function ws(e, n) {
  n = n.checked, n != null && qo(e, "checked", n, !1);
}
function ro(e, n) {
  ws(e, n);
  var t = hn(n.value), r = n.type;
  if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  n.hasOwnProperty("value") ? lo(e, n.type, t) : n.hasOwnProperty("defaultValue") && lo(e, n.type, hn(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
}
function Zi(e, n, t) {
  if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
    var r = n.type;
    if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
    n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n;
  }
  t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t);
}
function lo(e, n, t) {
  (n !== "number" || Or(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
}
var xt = Array.isArray;
function Xn(e, n, t, r) {
  if (e = e.options, n) {
    n = {};
    for (var l = 0; l < t.length; l++) n["$" + t[l]] = !0;
    for (t = 0; t < e.length; t++) l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0);
  } else {
    for (t = "" + hn(t), n = null, l = 0; l < e.length; l++) {
      if (e[l].value === t) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      n !== null || e[l].disabled || (n = e[l]);
    }
    n !== null && (n.selected = !0);
  }
}
function oo(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(g(91));
  return W({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Xi(e, n) {
  var t = n.value;
  if (t == null) {
    if (t = n.children, n = n.defaultValue, t != null) {
      if (n != null) throw Error(g(92));
      if (xt(t)) {
        if (1 < t.length) throw Error(g(93));
        t = t[0];
      }
      n = t;
    }
    n == null && (n = ""), t = n;
  }
  e._wrapperState = { initialValue: hn(t) };
}
function ks(e, n) {
  var t = hn(n.value), r = hn(n.defaultValue);
  t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r);
}
function Gi(e) {
  var n = e.textContent;
  n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
}
function Ss(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function io(e, n) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ss(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var sr, xs = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, t, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(n, t, r, l);
    });
  } : e;
}(function(e, n) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
  else {
    for (sr = sr || document.createElement("div"), sr.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = sr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; n.firstChild; ) e.appendChild(n.firstChild);
  }
});
function Dt(e, n) {
  if (n) {
    var t = e.firstChild;
    if (t && t === e.lastChild && t.nodeType === 3) {
      t.nodeValue = n;
      return;
    }
  }
  e.textContent = n;
}
var Ct = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Kc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ct).forEach(function(e) {
  Kc.forEach(function(n) {
    n = n + e.charAt(0).toUpperCase() + e.substring(1), Ct[n] = Ct[e];
  });
});
function _s(e, n, t) {
  return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || Ct.hasOwnProperty(e) && Ct[e] ? ("" + n).trim() : n + "px";
}
function Es(e, n) {
  e = e.style;
  for (var t in n) if (n.hasOwnProperty(t)) {
    var r = t.indexOf("--") === 0, l = _s(t, n[t], r);
    t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l;
  }
}
var Yc = W({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function uo(e, n) {
  if (n) {
    if (Yc[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(g(137, e));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(g(60));
      if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(g(61));
    }
    if (n.style != null && typeof n.style != "object") throw Error(g(62));
  }
}
function so(e, n) {
  if (e.indexOf("-") === -1) return typeof n.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ao = null;
function ti(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var co = null, Gn = null, Jn = null;
function Ji(e) {
  if (e = nr(e)) {
    if (typeof co != "function") throw Error(g(280));
    var n = e.stateNode;
    n && (n = fl(n), co(e.stateNode, e.type, n));
  }
}
function Cs(e) {
  Gn ? Jn ? Jn.push(e) : Jn = [e] : Gn = e;
}
function Ns() {
  if (Gn) {
    var e = Gn, n = Jn;
    if (Jn = Gn = null, Ji(e), n) for (e = 0; e < n.length; e++) Ji(n[e]);
  }
}
function Ls(e, n) {
  return e(n);
}
function Ps() {
}
var zl = !1;
function zs(e, n, t) {
  if (zl) return e(n, t);
  zl = !0;
  try {
    return Ls(e, n, t);
  } finally {
    zl = !1, (Gn !== null || Jn !== null) && (Ps(), Ns());
  }
}
function Ft(e, n) {
  var t = e.stateNode;
  if (t === null) return null;
  var r = fl(t);
  if (r === null) return null;
  t = r[n];
  e: switch (n) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (t && typeof t != "function") throw Error(g(231, n, typeof t));
  return t;
}
var fo = !1;
if (Ye) try {
  var mt = {};
  Object.defineProperty(mt, "passive", { get: function() {
    fo = !0;
  } }), window.addEventListener("test", mt, mt), window.removeEventListener("test", mt, mt);
} catch {
  fo = !1;
}
function Zc(e, n, t, r, l, o, i, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(t, c);
  } catch (h) {
    this.onError(h);
  }
}
var Nt = !1, Dr = null, Fr = !1, po = null, Xc = { onError: function(e) {
  Nt = !0, Dr = e;
} };
function Gc(e, n, t, r, l, o, i, u, s) {
  Nt = !1, Dr = null, Zc.apply(Xc, arguments);
}
function Jc(e, n, t, r, l, o, i, u, s) {
  if (Gc.apply(this, arguments), Nt) {
    if (Nt) {
      var c = Dr;
      Nt = !1, Dr = null;
    } else throw Error(g(198));
    Fr || (Fr = !0, po = c);
  }
}
function On(e) {
  var n = e, t = e;
  if (e.alternate) for (; n.return; ) n = n.return;
  else {
    e = n;
    do
      n = e, n.flags & 4098 && (t = n.return), e = n.return;
    while (e);
  }
  return n.tag === 3 ? t : null;
}
function js(e) {
  if (e.tag === 13) {
    var n = e.memoizedState;
    if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
  }
  return null;
}
function qi(e) {
  if (On(e) !== e) throw Error(g(188));
}
function qc(e) {
  var n = e.alternate;
  if (!n) {
    if (n = On(e), n === null) throw Error(g(188));
    return n !== e ? null : e;
  }
  for (var t = e, r = n; ; ) {
    var l = t.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (r = l.return, r !== null) {
        t = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === t) return qi(l), e;
        if (o === r) return qi(l), n;
        o = o.sibling;
      }
      throw Error(g(188));
    }
    if (t.return !== r.return) t = l, r = o;
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === t) {
          i = !0, t = l, r = o;
          break;
        }
        if (u === r) {
          i = !0, r = l, t = o;
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === t) {
            i = !0, t = o, r = l;
            break;
          }
          if (u === r) {
            i = !0, r = o, t = l;
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(g(189));
      }
    }
    if (t.alternate !== r) throw Error(g(190));
  }
  if (t.tag !== 3) throw Error(g(188));
  return t.stateNode.current === t ? e : n;
}
function Ts(e) {
  return e = qc(e), e !== null ? Rs(e) : null;
}
function Rs(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var n = Rs(e);
    if (n !== null) return n;
    e = e.sibling;
  }
  return null;
}
var Ms = ke.unstable_scheduleCallback, bi = ke.unstable_cancelCallback, bc = ke.unstable_shouldYield, ef = ke.unstable_requestPaint, Y = ke.unstable_now, nf = ke.unstable_getCurrentPriorityLevel, ri = ke.unstable_ImmediatePriority, Is = ke.unstable_UserBlockingPriority, $r = ke.unstable_NormalPriority, tf = ke.unstable_LowPriority, Os = ke.unstable_IdlePriority, ul = null, Ue = null;
function rf(e) {
  if (Ue && typeof Ue.onCommitFiberRoot == "function") try {
    Ue.onCommitFiberRoot(ul, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Me = Math.clz32 ? Math.clz32 : uf, lf = Math.log, of = Math.LN2;
function uf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (lf(e) / of | 0) | 0;
}
var ar = 64, cr = 4194304;
function _t(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ur(e, n) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = t & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = _t(u) : (o &= i, o !== 0 && (r = _t(o)));
  } else i = t & ~l, i !== 0 ? r = _t(i) : o !== 0 && (r = _t(o));
  if (r === 0) return 0;
  if (n !== 0 && n !== r && !(n & l) && (l = r & -r, o = n & -n, l >= o || l === 16 && (o & 4194240) !== 0)) return n;
  if (r & 4 && (r |= t & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= r; 0 < n; ) t = 31 - Me(n), l = 1 << t, r |= e[t], n &= ~l;
  return r;
}
function sf(e, n) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return n + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return n + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function af(e, n) {
  for (var t = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Me(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & t) || u & r) && (l[i] = sf(u, n)) : s <= n && (e.expiredLanes |= u), o &= ~u;
  }
}
function mo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ds() {
  var e = ar;
  return ar <<= 1, !(ar & 4194240) && (ar = 64), e;
}
function jl(e) {
  for (var n = [], t = 0; 31 > t; t++) n.push(e);
  return n;
}
function bt(e, n, t) {
  e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - Me(n), e[n] = t;
}
function cf(e, n) {
  var t = e.pendingLanes & ~n;
  e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < t; ) {
    var l = 31 - Me(t), o = 1 << l;
    n[l] = 0, r[l] = -1, e[l] = -1, t &= ~o;
  }
}
function li(e, n) {
  var t = e.entangledLanes |= n;
  for (e = e.entanglements; t; ) {
    var r = 31 - Me(t), l = 1 << r;
    l & n | e[r] & n && (e[r] |= n), t &= ~l;
  }
}
var D = 0;
function Fs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var $s, oi, Us, Vs, Hs, ho = !1, fr = [], un = null, sn = null, an = null, $t = /* @__PURE__ */ new Map(), Ut = /* @__PURE__ */ new Map(), tn = [], ff = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function eu(e, n) {
  switch (e) {
    case "focusin":
    case "focusout":
      un = null;
      break;
    case "dragenter":
    case "dragleave":
      sn = null;
      break;
    case "mouseover":
    case "mouseout":
      an = null;
      break;
    case "pointerover":
    case "pointerout":
      $t.delete(n.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ut.delete(n.pointerId);
  }
}
function ht(e, n, t, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: n, domEventName: t, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, n !== null && (n = nr(n), n !== null && oi(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e);
}
function df(e, n, t, r, l) {
  switch (n) {
    case "focusin":
      return un = ht(un, e, n, t, r, l), !0;
    case "dragenter":
      return sn = ht(sn, e, n, t, r, l), !0;
    case "mouseover":
      return an = ht(an, e, n, t, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return $t.set(o, ht($t.get(o) || null, e, n, t, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Ut.set(o, ht(Ut.get(o) || null, e, n, t, r, l)), !0;
  }
  return !1;
}
function Bs(e) {
  var n = En(e.target);
  if (n !== null) {
    var t = On(n);
    if (t !== null) {
      if (n = t.tag, n === 13) {
        if (n = js(t), n !== null) {
          e.blockedOn = n, Hs(e.priority, function() {
            Us(t);
          });
          return;
        }
      } else if (n === 3 && t.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Cr(e) {
  if (e.blockedOn !== null) return !1;
  for (var n = e.targetContainers; 0 < n.length; ) {
    var t = vo(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
    if (t === null) {
      t = e.nativeEvent;
      var r = new t.constructor(t.type, t);
      ao = r, t.target.dispatchEvent(r), ao = null;
    } else return n = nr(t), n !== null && oi(n), e.blockedOn = t, !1;
    n.shift();
  }
  return !0;
}
function nu(e, n, t) {
  Cr(e) && t.delete(n);
}
function pf() {
  ho = !1, un !== null && Cr(un) && (un = null), sn !== null && Cr(sn) && (sn = null), an !== null && Cr(an) && (an = null), $t.forEach(nu), Ut.forEach(nu);
}
function vt(e, n) {
  e.blockedOn === n && (e.blockedOn = null, ho || (ho = !0, ke.unstable_scheduleCallback(ke.unstable_NormalPriority, pf)));
}
function Vt(e) {
  function n(l) {
    return vt(l, e);
  }
  if (0 < fr.length) {
    vt(fr[0], e);
    for (var t = 1; t < fr.length; t++) {
      var r = fr[t];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (un !== null && vt(un, e), sn !== null && vt(sn, e), an !== null && vt(an, e), $t.forEach(n), Ut.forEach(n), t = 0; t < tn.length; t++) r = tn[t], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < tn.length && (t = tn[0], t.blockedOn === null); ) Bs(t), t.blockedOn === null && tn.shift();
}
var qn = Je.ReactCurrentBatchConfig, Vr = !0;
function mf(e, n, t, r) {
  var l = D, o = qn.transition;
  qn.transition = null;
  try {
    D = 1, ii(e, n, t, r);
  } finally {
    D = l, qn.transition = o;
  }
}
function hf(e, n, t, r) {
  var l = D, o = qn.transition;
  qn.transition = null;
  try {
    D = 4, ii(e, n, t, r);
  } finally {
    D = l, qn.transition = o;
  }
}
function ii(e, n, t, r) {
  if (Vr) {
    var l = vo(e, n, t, r);
    if (l === null) Vl(e, n, r, Hr, t), eu(e, r);
    else if (df(l, e, n, t, r)) r.stopPropagation();
    else if (eu(e, r), n & 4 && -1 < ff.indexOf(e)) {
      for (; l !== null; ) {
        var o = nr(l);
        if (o !== null && $s(o), o = vo(e, n, t, r), o === null && Vl(e, n, r, Hr, t), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Vl(e, n, r, null, t);
  }
}
var Hr = null;
function vo(e, n, t, r) {
  if (Hr = null, e = ti(r), e = En(e), e !== null) if (n = On(e), n === null) e = null;
  else if (t = n.tag, t === 13) {
    if (e = js(n), e !== null) return e;
    e = null;
  } else if (t === 3) {
    if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
    e = null;
  } else n !== e && (e = null);
  return Hr = e, null;
}
function As(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (nf()) {
        case ri:
          return 1;
        case Is:
          return 4;
        case $r:
        case tf:
          return 16;
        case Os:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ln = null, ui = null, Nr = null;
function Ws() {
  if (Nr) return Nr;
  var e, n = ui, t = n.length, r, l = "value" in ln ? ln.value : ln.textContent, o = l.length;
  for (e = 0; e < t && n[e] === l[e]; e++) ;
  var i = t - e;
  for (r = 1; r <= i && n[t - r] === l[o - r]; r++) ;
  return Nr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Lr(e) {
  var n = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function dr() {
  return !0;
}
function tu() {
  return !1;
}
function xe(e) {
  function n(t, r, l, o, i) {
    this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (t = e[u], this[u] = t ? t(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? dr : tu, this.isPropagationStopped = tu, this;
  }
  return W(n.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var t = this.nativeEvent;
    t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = dr);
  }, stopPropagation: function() {
    var t = this.nativeEvent;
    t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = dr);
  }, persist: function() {
  }, isPersistent: dr }), n;
}
var at = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, si = xe(at), er = W({}, at, { view: 0, detail: 0 }), vf = xe(er), Tl, Rl, yt, sl = W({}, er, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ai, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== yt && (yt && e.type === "mousemove" ? (Tl = e.screenX - yt.screenX, Rl = e.screenY - yt.screenY) : Rl = Tl = 0, yt = e), Tl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Rl;
} }), ru = xe(sl), yf = W({}, sl, { dataTransfer: 0 }), gf = xe(yf), wf = W({}, er, { relatedTarget: 0 }), Ml = xe(wf), kf = W({}, at, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Sf = xe(kf), xf = W({}, at, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), _f = xe(xf), Ef = W({}, at, { data: 0 }), lu = xe(Ef), Cf = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nf = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Lf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pf(e) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(e) : (e = Lf[e]) ? !!n[e] : !1;
}
function ai() {
  return Pf;
}
var zf = W({}, er, { key: function(e) {
  if (e.key) {
    var n = Cf[e.key] || e.key;
    if (n !== "Unidentified") return n;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Nf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ai, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), jf = xe(zf), Tf = W({}, sl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ou = xe(Tf), Rf = W({}, er, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ai }), Mf = xe(Rf), If = W({}, at, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Of = xe(If), Df = W({}, sl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Ff = xe(Df), $f = [9, 13, 27, 32], ci = Ye && "CompositionEvent" in window, Lt = null;
Ye && "documentMode" in document && (Lt = document.documentMode);
var Uf = Ye && "TextEvent" in window && !Lt, Qs = Ye && (!ci || Lt && 8 < Lt && 11 >= Lt), iu = " ", uu = !1;
function Ks(e, n) {
  switch (e) {
    case "keyup":
      return $f.indexOf(n.keyCode) !== -1;
    case "keydown":
      return n.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ys(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Un = !1;
function Vf(e, n) {
  switch (e) {
    case "compositionend":
      return Ys(n);
    case "keypress":
      return n.which !== 32 ? null : (uu = !0, iu);
    case "textInput":
      return e = n.data, e === iu && uu ? null : e;
    default:
      return null;
  }
}
function Hf(e, n) {
  if (Un) return e === "compositionend" || !ci && Ks(e, n) ? (e = Ws(), Nr = ui = ln = null, Un = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
        if (n.char && 1 < n.char.length) return n.char;
        if (n.which) return String.fromCharCode(n.which);
      }
      return null;
    case "compositionend":
      return Qs && n.locale !== "ko" ? null : n.data;
    default:
      return null;
  }
}
var Bf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function su(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n === "input" ? !!Bf[e.type] : n === "textarea";
}
function Zs(e, n, t, r) {
  Cs(r), n = Br(n, "onChange"), 0 < n.length && (t = new si("onChange", "change", null, t, r), e.push({ event: t, listeners: n }));
}
var Pt = null, Ht = null;
function Af(e) {
  oa(e, 0);
}
function al(e) {
  var n = Bn(e);
  if (gs(n)) return e;
}
function Wf(e, n) {
  if (e === "change") return n;
}
var Xs = !1;
if (Ye) {
  var Il;
  if (Ye) {
    var Ol = "oninput" in document;
    if (!Ol) {
      var au = document.createElement("div");
      au.setAttribute("oninput", "return;"), Ol = typeof au.oninput == "function";
    }
    Il = Ol;
  } else Il = !1;
  Xs = Il && (!document.documentMode || 9 < document.documentMode);
}
function cu() {
  Pt && (Pt.detachEvent("onpropertychange", Gs), Ht = Pt = null);
}
function Gs(e) {
  if (e.propertyName === "value" && al(Ht)) {
    var n = [];
    Zs(n, Ht, e, ti(e)), zs(Af, n);
  }
}
function Qf(e, n, t) {
  e === "focusin" ? (cu(), Pt = n, Ht = t, Pt.attachEvent("onpropertychange", Gs)) : e === "focusout" && cu();
}
function Kf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return al(Ht);
}
function Yf(e, n) {
  if (e === "click") return al(n);
}
function Zf(e, n) {
  if (e === "input" || e === "change") return al(n);
}
function Xf(e, n) {
  return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
}
var Oe = typeof Object.is == "function" ? Object.is : Xf;
function Bt(e, n) {
  if (Oe(e, n)) return !0;
  if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
  var t = Object.keys(e), r = Object.keys(n);
  if (t.length !== r.length) return !1;
  for (r = 0; r < t.length; r++) {
    var l = t[r];
    if (!Jl.call(n, l) || !Oe(e[l], n[l])) return !1;
  }
  return !0;
}
function fu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function du(e, n) {
  var t = fu(e);
  e = 0;
  for (var r; t; ) {
    if (t.nodeType === 3) {
      if (r = e + t.textContent.length, e <= n && r >= n) return { node: t, offset: n - e };
      e = r;
    }
    e: {
      for (; t; ) {
        if (t.nextSibling) {
          t = t.nextSibling;
          break e;
        }
        t = t.parentNode;
      }
      t = void 0;
    }
    t = fu(t);
  }
}
function Js(e, n) {
  return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Js(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
}
function qs() {
  for (var e = window, n = Or(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof n.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) e = n.contentWindow;
    else break;
    n = Or(e.document);
  }
  return n;
}
function fi(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
}
function Gf(e) {
  var n = qs(), t = e.focusedElem, r = e.selectionRange;
  if (n !== t && t && t.ownerDocument && Js(t.ownerDocument.documentElement, t)) {
    if (r !== null && fi(t)) {
      if (n = r.start, e = r.end, e === void 0 && (e = n), "selectionStart" in t) t.selectionStart = n, t.selectionEnd = Math.min(e, t.value.length);
      else if (e = (n = t.ownerDocument || document) && n.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = t.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = du(t, o);
        var i = du(
          t,
          r
        );
        l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (n = n.createRange(), n.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(n), e.extend(i.node, i.offset)) : (n.setEnd(i.node, i.offset), e.addRange(n)));
      }
    }
    for (n = [], e = t; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof t.focus == "function" && t.focus(), t = 0; t < n.length; t++) e = n[t], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Jf = Ye && "documentMode" in document && 11 >= document.documentMode, Vn = null, yo = null, zt = null, go = !1;
function pu(e, n, t) {
  var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  go || Vn == null || Vn !== Or(r) || (r = Vn, "selectionStart" in r && fi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), zt && Bt(zt, r) || (zt = r, r = Br(yo, "onSelect"), 0 < r.length && (n = new si("onSelect", "select", null, n, t), e.push({ event: n, listeners: r }), n.target = Vn)));
}
function pr(e, n) {
  var t = {};
  return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
}
var Hn = { animationend: pr("Animation", "AnimationEnd"), animationiteration: pr("Animation", "AnimationIteration"), animationstart: pr("Animation", "AnimationStart"), transitionend: pr("Transition", "TransitionEnd") }, Dl = {}, bs = {};
Ye && (bs = document.createElement("div").style, "AnimationEvent" in window || (delete Hn.animationend.animation, delete Hn.animationiteration.animation, delete Hn.animationstart.animation), "TransitionEvent" in window || delete Hn.transitionend.transition);
function cl(e) {
  if (Dl[e]) return Dl[e];
  if (!Hn[e]) return e;
  var n = Hn[e], t;
  for (t in n) if (n.hasOwnProperty(t) && t in bs) return Dl[e] = n[t];
  return e;
}
var ea = cl("animationend"), na = cl("animationiteration"), ta = cl("animationstart"), ra = cl("transitionend"), la = /* @__PURE__ */ new Map(), mu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yn(e, n) {
  la.set(e, n), In(n, [e]);
}
for (var Fl = 0; Fl < mu.length; Fl++) {
  var $l = mu[Fl], qf = $l.toLowerCase(), bf = $l[0].toUpperCase() + $l.slice(1);
  yn(qf, "on" + bf);
}
yn(ea, "onAnimationEnd");
yn(na, "onAnimationIteration");
yn(ta, "onAnimationStart");
yn("dblclick", "onDoubleClick");
yn("focusin", "onFocus");
yn("focusout", "onBlur");
yn(ra, "onTransitionEnd");
nt("onMouseEnter", ["mouseout", "mouseover"]);
nt("onMouseLeave", ["mouseout", "mouseover"]);
nt("onPointerEnter", ["pointerout", "pointerover"]);
nt("onPointerLeave", ["pointerout", "pointerover"]);
In("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
In("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
In("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
In("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
In("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
In("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Et = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ed = new Set("cancel close invalid load scroll toggle".split(" ").concat(Et));
function hu(e, n, t) {
  var r = e.type || "unknown-event";
  e.currentTarget = t, Jc(r, n, void 0, e), e.currentTarget = null;
}
function oa(e, n) {
  n = (n & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var r = e[t], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (n) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], s = u.instance, c = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        hu(l, u, c), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, c = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        hu(l, u, c), o = s;
      }
    }
  }
  if (Fr) throw e = po, Fr = !1, po = null, e;
}
function U(e, n) {
  var t = n[_o];
  t === void 0 && (t = n[_o] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  t.has(r) || (ia(n, e, 2, !1), t.add(r));
}
function Ul(e, n, t) {
  var r = 0;
  n && (r |= 4), ia(t, e, r, n);
}
var mr = "_reactListening" + Math.random().toString(36).slice(2);
function At(e) {
  if (!e[mr]) {
    e[mr] = !0, ps.forEach(function(t) {
      t !== "selectionchange" && (ed.has(t) || Ul(t, !1, e), Ul(t, !0, e));
    });
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[mr] || (n[mr] = !0, Ul("selectionchange", !1, n));
  }
}
function ia(e, n, t, r) {
  switch (As(n)) {
    case 1:
      var l = mf;
      break;
    case 4:
      l = hf;
      break;
    default:
      l = ii;
  }
  t = l.bind(null, n, t, e), l = void 0, !fo || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, { capture: !0, passive: l }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, { passive: l }) : e.addEventListener(n, t, !1);
}
function Vl(e, n, t, r, l) {
  var o = r;
  if (!(n & 1) && !(n & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var s = i.tag;
        if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        i = i.return;
      }
      for (; u !== null; ) {
        if (i = En(u), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  zs(function() {
    var c = o, h = ti(t), m = [];
    e: {
      var p = la.get(e);
      if (p !== void 0) {
        var w = si, k = e;
        switch (e) {
          case "keypress":
            if (Lr(t) === 0) break e;
          case "keydown":
          case "keyup":
            w = jf;
            break;
          case "focusin":
            k = "focus", w = Ml;
            break;
          case "focusout":
            k = "blur", w = Ml;
            break;
          case "beforeblur":
          case "afterblur":
            w = Ml;
            break;
          case "click":
            if (t.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = ru;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = gf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Mf;
            break;
          case ea:
          case na:
          case ta:
            w = Sf;
            break;
          case ra:
            w = Of;
            break;
          case "scroll":
            w = vf;
            break;
          case "wheel":
            w = Ff;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = _f;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = ou;
        }
        var S = (n & 4) !== 0, F = !S && e === "scroll", f = S ? p !== null ? p + "Capture" : null : p;
        S = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var y = d.stateNode;
          if (d.tag === 5 && y !== null && (d = y, f !== null && (y = Ft(a, f), y != null && S.push(Wt(a, y, d)))), F) break;
          a = a.return;
        }
        0 < S.length && (p = new w(p, k, null, t, h), m.push({ event: p, listeners: S }));
      }
    }
    if (!(n & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", p && t !== ao && (k = t.relatedTarget || t.fromElement) && (En(k) || k[Ze])) break e;
        if ((w || p) && (p = h.window === h ? h : (p = h.ownerDocument) ? p.defaultView || p.parentWindow : window, w ? (k = t.relatedTarget || t.toElement, w = c, k = k ? En(k) : null, k !== null && (F = On(k), k !== F || k.tag !== 5 && k.tag !== 6) && (k = null)) : (w = null, k = c), w !== k)) {
          if (S = ru, y = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (S = ou, y = "onPointerLeave", f = "onPointerEnter", a = "pointer"), F = w == null ? p : Bn(w), d = k == null ? p : Bn(k), p = new S(y, a + "leave", w, t, h), p.target = F, p.relatedTarget = d, y = null, En(h) === c && (S = new S(f, a + "enter", k, t, h), S.target = d, S.relatedTarget = F, y = S), F = y, w && k) n: {
            for (S = w, f = k, a = 0, d = S; d; d = Dn(d)) a++;
            for (d = 0, y = f; y; y = Dn(y)) d++;
            for (; 0 < a - d; ) S = Dn(S), a--;
            for (; 0 < d - a; ) f = Dn(f), d--;
            for (; a--; ) {
              if (S === f || f !== null && S === f.alternate) break n;
              S = Dn(S), f = Dn(f);
            }
            S = null;
          }
          else S = null;
          w !== null && vu(m, p, w, S, !1), k !== null && F !== null && vu(m, F, k, S, !0);
        }
      }
      e: {
        if (p = c ? Bn(c) : window, w = p.nodeName && p.nodeName.toLowerCase(), w === "select" || w === "input" && p.type === "file") var _ = Wf;
        else if (su(p)) if (Xs) _ = Zf;
        else {
          _ = Kf;
          var N = Qf;
        }
        else (w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (_ = Yf);
        if (_ && (_ = _(e, c))) {
          Zs(m, _, t, h);
          break e;
        }
        N && N(e, p, c), e === "focusout" && (N = p._wrapperState) && N.controlled && p.type === "number" && lo(p, "number", p.value);
      }
      switch (N = c ? Bn(c) : window, e) {
        case "focusin":
          (su(N) || N.contentEditable === "true") && (Vn = N, yo = c, zt = null);
          break;
        case "focusout":
          zt = yo = Vn = null;
          break;
        case "mousedown":
          go = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          go = !1, pu(m, t, h);
          break;
        case "selectionchange":
          if (Jf) break;
        case "keydown":
        case "keyup":
          pu(m, t, h);
      }
      var C;
      if (ci) e: {
        switch (e) {
          case "compositionstart":
            var L = "onCompositionStart";
            break e;
          case "compositionend":
            L = "onCompositionEnd";
            break e;
          case "compositionupdate":
            L = "onCompositionUpdate";
            break e;
        }
        L = void 0;
      }
      else Un ? Ks(e, t) && (L = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (L = "onCompositionStart");
      L && (Qs && t.locale !== "ko" && (Un || L !== "onCompositionStart" ? L === "onCompositionEnd" && Un && (C = Ws()) : (ln = h, ui = "value" in ln ? ln.value : ln.textContent, Un = !0)), N = Br(c, L), 0 < N.length && (L = new lu(L, e, null, t, h), m.push({ event: L, listeners: N }), C ? L.data = C : (C = Ys(t), C !== null && (L.data = C)))), (C = Uf ? Vf(e, t) : Hf(e, t)) && (c = Br(c, "onBeforeInput"), 0 < c.length && (h = new lu("onBeforeInput", "beforeinput", null, t, h), m.push({ event: h, listeners: c }), h.data = C));
    }
    oa(m, n);
  });
}
function Wt(e, n, t) {
  return { instance: e, listener: n, currentTarget: t };
}
function Br(e, n) {
  for (var t = n + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Ft(e, t), o != null && r.unshift(Wt(e, o, l)), o = Ft(e, n), o != null && r.push(Wt(e, o, l))), e = e.return;
  }
  return r;
}
function Dn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function vu(e, n, t, r, l) {
  for (var o = n._reactName, i = []; t !== null && t !== r; ) {
    var u = t, s = u.alternate, c = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && c !== null && (u = c, l ? (s = Ft(t, o), s != null && i.unshift(Wt(t, s, u))) : l || (s = Ft(t, o), s != null && i.push(Wt(t, s, u)))), t = t.return;
  }
  i.length !== 0 && e.push({ event: n, listeners: i });
}
var nd = /\r\n?/g, td = /\u0000|\uFFFD/g;
function yu(e) {
  return (typeof e == "string" ? e : "" + e).replace(nd, `
`).replace(td, "");
}
function hr(e, n, t) {
  if (n = yu(n), yu(e) !== n && t) throw Error(g(425));
}
function Ar() {
}
var wo = null, ko = null;
function So(e, n) {
  return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
}
var xo = typeof setTimeout == "function" ? setTimeout : void 0, rd = typeof clearTimeout == "function" ? clearTimeout : void 0, gu = typeof Promise == "function" ? Promise : void 0, ld = typeof queueMicrotask == "function" ? queueMicrotask : typeof gu < "u" ? function(e) {
  return gu.resolve(null).then(e).catch(od);
} : xo;
function od(e) {
  setTimeout(function() {
    throw e;
  });
}
function Hl(e, n) {
  var t = n, r = 0;
  do {
    var l = t.nextSibling;
    if (e.removeChild(t), l && l.nodeType === 8) if (t = l.data, t === "/$") {
      if (r === 0) {
        e.removeChild(l), Vt(n);
        return;
      }
      r--;
    } else t !== "$" && t !== "$?" && t !== "$!" || r++;
    t = l;
  } while (t);
  Vt(n);
}
function cn(e) {
  for (; e != null; e = e.nextSibling) {
    var n = e.nodeType;
    if (n === 1 || n === 3) break;
    if (n === 8) {
      if (n = e.data, n === "$" || n === "$!" || n === "$?") break;
      if (n === "/$") return null;
    }
  }
  return e;
}
function wu(e) {
  e = e.previousSibling;
  for (var n = 0; e; ) {
    if (e.nodeType === 8) {
      var t = e.data;
      if (t === "$" || t === "$!" || t === "$?") {
        if (n === 0) return e;
        n--;
      } else t === "/$" && n++;
    }
    e = e.previousSibling;
  }
  return null;
}
var ct = Math.random().toString(36).slice(2), $e = "__reactFiber$" + ct, Qt = "__reactProps$" + ct, Ze = "__reactContainer$" + ct, _o = "__reactEvents$" + ct, id = "__reactListeners$" + ct, ud = "__reactHandles$" + ct;
function En(e) {
  var n = e[$e];
  if (n) return n;
  for (var t = e.parentNode; t; ) {
    if (n = t[Ze] || t[$e]) {
      if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for (e = wu(e); e !== null; ) {
        if (t = e[$e]) return t;
        e = wu(e);
      }
      return n;
    }
    e = t, t = e.parentNode;
  }
  return null;
}
function nr(e) {
  return e = e[$e] || e[Ze], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Bn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(g(33));
}
function fl(e) {
  return e[Qt] || null;
}
var Eo = [], An = -1;
function gn(e) {
  return { current: e };
}
function V(e) {
  0 > An || (e.current = Eo[An], Eo[An] = null, An--);
}
function $(e, n) {
  An++, Eo[An] = e.current, e.current = n;
}
var vn = {}, ie = gn(vn), pe = gn(!1), zn = vn;
function tt(e, n) {
  var t = e.type.contextTypes;
  if (!t) return vn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in t) l[o] = n[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function me(e) {
  return e = e.childContextTypes, e != null;
}
function Wr() {
  V(pe), V(ie);
}
function ku(e, n, t) {
  if (ie.current !== vn) throw Error(g(168));
  $(ie, n), $(pe, t);
}
function ua(e, n, t) {
  var r = e.stateNode;
  if (n = n.childContextTypes, typeof r.getChildContext != "function") return t;
  r = r.getChildContext();
  for (var l in r) if (!(l in n)) throw Error(g(108, Wc(e) || "Unknown", l));
  return W({}, t, r);
}
function Qr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vn, zn = ie.current, $(ie, e), $(pe, pe.current), !0;
}
function Su(e, n, t) {
  var r = e.stateNode;
  if (!r) throw Error(g(169));
  t ? (e = ua(e, n, zn), r.__reactInternalMemoizedMergedChildContext = e, V(pe), V(ie), $(ie, e)) : V(pe), $(pe, t);
}
var Ae = null, dl = !1, Bl = !1;
function sa(e) {
  Ae === null ? Ae = [e] : Ae.push(e);
}
function sd(e) {
  dl = !0, sa(e);
}
function wn() {
  if (!Bl && Ae !== null) {
    Bl = !0;
    var e = 0, n = D;
    try {
      var t = Ae;
      for (D = 1; e < t.length; e++) {
        var r = t[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ae = null, dl = !1;
    } catch (l) {
      throw Ae !== null && (Ae = Ae.slice(e + 1)), Ms(ri, wn), l;
    } finally {
      D = n, Bl = !1;
    }
  }
  return null;
}
var Wn = [], Qn = 0, Kr = null, Yr = 0, _e = [], Ee = 0, jn = null, We = 1, Qe = "";
function xn(e, n) {
  Wn[Qn++] = Yr, Wn[Qn++] = Kr, Kr = e, Yr = n;
}
function aa(e, n, t) {
  _e[Ee++] = We, _e[Ee++] = Qe, _e[Ee++] = jn, jn = e;
  var r = We;
  e = Qe;
  var l = 32 - Me(r) - 1;
  r &= ~(1 << l), t += 1;
  var o = 32 - Me(n) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, We = 1 << 32 - Me(n) + l | t << l | r, Qe = o + e;
  } else We = 1 << o | t << l | r, Qe = e;
}
function di(e) {
  e.return !== null && (xn(e, 1), aa(e, 1, 0));
}
function pi(e) {
  for (; e === Kr; ) Kr = Wn[--Qn], Wn[Qn] = null, Yr = Wn[--Qn], Wn[Qn] = null;
  for (; e === jn; ) jn = _e[--Ee], _e[Ee] = null, Qe = _e[--Ee], _e[Ee] = null, We = _e[--Ee], _e[Ee] = null;
}
var we = null, ge = null, H = !1, Re = null;
function ca(e, n) {
  var t = Ce(5, null, null, 0);
  t.elementType = "DELETED", t.stateNode = n, t.return = e, n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t);
}
function xu(e, n) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, we = e, ge = cn(n.firstChild), !0) : !1;
    case 6:
      return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, we = e, ge = null, !0) : !1;
    case 13:
      return n = n.nodeType !== 8 ? null : n, n !== null ? (t = jn !== null ? { id: We, overflow: Qe } : null, e.memoizedState = { dehydrated: n, treeContext: t, retryLane: 1073741824 }, t = Ce(18, null, null, 0), t.stateNode = n, t.return = e, e.child = t, we = e, ge = null, !0) : !1;
    default:
      return !1;
  }
}
function Co(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function No(e) {
  if (H) {
    var n = ge;
    if (n) {
      var t = n;
      if (!xu(e, n)) {
        if (Co(e)) throw Error(g(418));
        n = cn(t.nextSibling);
        var r = we;
        n && xu(e, n) ? ca(r, t) : (e.flags = e.flags & -4097 | 2, H = !1, we = e);
      }
    } else {
      if (Co(e)) throw Error(g(418));
      e.flags = e.flags & -4097 | 2, H = !1, we = e;
    }
  }
}
function _u(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  we = e;
}
function vr(e) {
  if (e !== we) return !1;
  if (!H) return _u(e), H = !0, !1;
  var n;
  if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !So(e.type, e.memoizedProps)), n && (n = ge)) {
    if (Co(e)) throw fa(), Error(g(418));
    for (; n; ) ca(e, n), n = cn(n.nextSibling);
  }
  if (_u(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(g(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$") {
            if (n === 0) {
              ge = cn(e.nextSibling);
              break e;
            }
            n--;
          } else t !== "$" && t !== "$!" && t !== "$?" || n++;
        }
        e = e.nextSibling;
      }
      ge = null;
    }
  } else ge = we ? cn(e.stateNode.nextSibling) : null;
  return !0;
}
function fa() {
  for (var e = ge; e; ) e = cn(e.nextSibling);
}
function rt() {
  ge = we = null, H = !1;
}
function mi(e) {
  Re === null ? Re = [e] : Re.push(e);
}
var ad = Je.ReactCurrentBatchConfig;
function gt(e, n, t) {
  if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (t._owner) {
      if (t = t._owner, t) {
        if (t.tag !== 1) throw Error(g(309));
        var r = t.stateNode;
      }
      if (!r) throw Error(g(147, e));
      var l = r, o = "" + e;
      return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === o ? n.ref : (n = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, n._stringRef = o, n);
    }
    if (typeof e != "string") throw Error(g(284));
    if (!t._owner) throw Error(g(290, e));
  }
  return e;
}
function yr(e, n) {
  throw e = Object.prototype.toString.call(n), Error(g(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
}
function Eu(e) {
  var n = e._init;
  return n(e._payload);
}
function da(e) {
  function n(f, a) {
    if (e) {
      var d = f.deletions;
      d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a);
    }
  }
  function t(f, a) {
    if (!e) return null;
    for (; a !== null; ) n(f, a), a = a.sibling;
    return null;
  }
  function r(f, a) {
    for (f = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
    return f;
  }
  function l(f, a) {
    return f = mn(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, a, d, y) {
    return a === null || a.tag !== 6 ? (a = Xl(d, f.mode, y), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function s(f, a, d, y) {
    var _ = d.type;
    return _ === $n ? h(f, a, d.props.children, y, d.key) : a !== null && (a.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === en && Eu(_) === a.type) ? (y = l(a, d.props), y.ref = gt(f, a, d), y.return = f, y) : (y = Ir(d.type, d.key, d.props, null, f.mode, y), y.ref = gt(f, a, d), y.return = f, y);
  }
  function c(f, a, d, y) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Gl(d, f.mode, y), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function h(f, a, d, y, _) {
    return a === null || a.tag !== 7 ? (a = Pn(d, f.mode, y, _), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function m(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Xl("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ir:
          return d = Ir(a.type, a.key, a.props, null, f.mode, d), d.ref = gt(f, null, a), d.return = f, d;
        case Fn:
          return a = Gl(a, f.mode, d), a.return = f, a;
        case en:
          var y = a._init;
          return m(f, y(a._payload), d);
      }
      if (xt(a) || pt(a)) return a = Pn(a, f.mode, d, null), a.return = f, a;
      yr(f, a);
    }
    return null;
  }
  function p(f, a, d, y) {
    var _ = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return _ !== null ? null : u(f, a, "" + d, y);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ir:
          return d.key === _ ? s(f, a, d, y) : null;
        case Fn:
          return d.key === _ ? c(f, a, d, y) : null;
        case en:
          return _ = d._init, p(
            f,
            a,
            _(d._payload),
            y
          );
      }
      if (xt(d) || pt(d)) return _ !== null ? null : h(f, a, d, y, null);
      yr(f, d);
    }
    return null;
  }
  function w(f, a, d, y, _) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return f = f.get(d) || null, u(a, f, "" + y, _);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ir:
          return f = f.get(y.key === null ? d : y.key) || null, s(a, f, y, _);
        case Fn:
          return f = f.get(y.key === null ? d : y.key) || null, c(a, f, y, _);
        case en:
          var N = y._init;
          return w(f, a, d, N(y._payload), _);
      }
      if (xt(y) || pt(y)) return f = f.get(d) || null, h(a, f, y, _, null);
      yr(a, y);
    }
    return null;
  }
  function k(f, a, d, y) {
    for (var _ = null, N = null, C = a, L = a = 0, I = null; C !== null && L < d.length; L++) {
      C.index > L ? (I = C, C = null) : I = C.sibling;
      var z = p(f, C, d[L], y);
      if (z === null) {
        C === null && (C = I);
        break;
      }
      e && C && z.alternate === null && n(f, C), a = o(z, a, L), N === null ? _ = z : N.sibling = z, N = z, C = I;
    }
    if (L === d.length) return t(f, C), H && xn(f, L), _;
    if (C === null) {
      for (; L < d.length; L++) C = m(f, d[L], y), C !== null && (a = o(C, a, L), N === null ? _ = C : N.sibling = C, N = C);
      return H && xn(f, L), _;
    }
    for (C = r(f, C); L < d.length; L++) I = w(C, f, L, d[L], y), I !== null && (e && I.alternate !== null && C.delete(I.key === null ? L : I.key), a = o(I, a, L), N === null ? _ = I : N.sibling = I, N = I);
    return e && C.forEach(function(ve) {
      return n(f, ve);
    }), H && xn(f, L), _;
  }
  function S(f, a, d, y) {
    var _ = pt(d);
    if (typeof _ != "function") throw Error(g(150));
    if (d = _.call(d), d == null) throw Error(g(151));
    for (var N = _ = null, C = a, L = a = 0, I = null, z = d.next(); C !== null && !z.done; L++, z = d.next()) {
      C.index > L ? (I = C, C = null) : I = C.sibling;
      var ve = p(f, C, z.value, y);
      if (ve === null) {
        C === null && (C = I);
        break;
      }
      e && C && ve.alternate === null && n(f, C), a = o(ve, a, L), N === null ? _ = ve : N.sibling = ve, N = ve, C = I;
    }
    if (z.done) return t(
      f,
      C
    ), H && xn(f, L), _;
    if (C === null) {
      for (; !z.done; L++, z = d.next()) z = m(f, z.value, y), z !== null && (a = o(z, a, L), N === null ? _ = z : N.sibling = z, N = z);
      return H && xn(f, L), _;
    }
    for (C = r(f, C); !z.done; L++, z = d.next()) z = w(C, f, L, z.value, y), z !== null && (e && z.alternate !== null && C.delete(z.key === null ? L : z.key), a = o(z, a, L), N === null ? _ = z : N.sibling = z, N = z);
    return e && C.forEach(function(qe) {
      return n(f, qe);
    }), H && xn(f, L), _;
  }
  function F(f, a, d, y) {
    if (typeof d == "object" && d !== null && d.type === $n && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ir:
          e: {
            for (var _ = d.key, N = a; N !== null; ) {
              if (N.key === _) {
                if (_ = d.type, _ === $n) {
                  if (N.tag === 7) {
                    t(f, N.sibling), a = l(N, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (N.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === en && Eu(_) === N.type) {
                  t(f, N.sibling), a = l(N, d.props), a.ref = gt(f, N, d), a.return = f, f = a;
                  break e;
                }
                t(f, N);
                break;
              } else n(f, N);
              N = N.sibling;
            }
            d.type === $n ? (a = Pn(d.props.children, f.mode, y, d.key), a.return = f, f = a) : (y = Ir(d.type, d.key, d.props, null, f.mode, y), y.ref = gt(f, a, d), y.return = f, f = y);
          }
          return i(f);
        case Fn:
          e: {
            for (N = d.key; a !== null; ) {
              if (a.key === N) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                t(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                t(f, a);
                break;
              }
              else n(f, a);
              a = a.sibling;
            }
            a = Gl(d, f.mode, y), a.return = f, f = a;
          }
          return i(f);
        case en:
          return N = d._init, F(f, a, N(d._payload), y);
      }
      if (xt(d)) return k(f, a, d, y);
      if (pt(d)) return S(f, a, d, y);
      yr(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (t(f, a.sibling), a = l(a, d), a.return = f, f = a) : (t(f, a), a = Xl(d, f.mode, y), a.return = f, f = a), i(f)) : t(f, a);
  }
  return F;
}
var lt = da(!0), pa = da(!1), Zr = gn(null), Xr = null, Kn = null, hi = null;
function vi() {
  hi = Kn = Xr = null;
}
function yi(e) {
  var n = Zr.current;
  V(Zr), e._currentValue = n;
}
function Lo(e, n, t) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === t) break;
    e = e.return;
  }
}
function bn(e, n) {
  Xr = e, hi = Kn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & n && (de = !0), e.firstContext = null);
}
function Le(e) {
  var n = e._currentValue;
  if (hi !== e) if (e = { context: e, memoizedValue: n, next: null }, Kn === null) {
    if (Xr === null) throw Error(g(308));
    Kn = e, Xr.dependencies = { lanes: 0, firstContext: e };
  } else Kn = Kn.next = e;
  return n;
}
var Cn = null;
function gi(e) {
  Cn === null ? Cn = [e] : Cn.push(e);
}
function ma(e, n, t, r) {
  var l = n.interleaved;
  return l === null ? (t.next = t, gi(n)) : (t.next = l.next, l.next = t), n.interleaved = t, Xe(e, r);
}
function Xe(e, n) {
  e.lanes |= n;
  var t = e.alternate;
  for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; ) e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
  return t.tag === 3 ? t.stateNode : null;
}
var nn = !1;
function wi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function ha(e, n) {
  e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ke(e, n) {
  return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
}
function fn(e, n, t) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, R & 2) {
    var l = r.pending;
    return l === null ? n.next = n : (n.next = l.next, l.next = n), r.pending = n, Xe(e, t);
  }
  return l = r.interleaved, l === null ? (n.next = n, gi(r)) : (n.next = l.next, l.next = n), r.interleaved = n, Xe(e, t);
}
function Pr(e, n, t) {
  if (n = n.updateQueue, n !== null && (n = n.shared, (t & 4194240) !== 0)) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, li(e, t);
  }
}
function Cu(e, n) {
  var t = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, t === r)) {
    var l = null, o = null;
    if (t = t.firstBaseUpdate, t !== null) {
      do {
        var i = { eventTime: t.eventTime, lane: t.lane, tag: t.tag, payload: t.payload, callback: t.callback, next: null };
        o === null ? l = o = i : o = o.next = i, t = t.next;
      } while (t !== null);
      o === null ? l = o = n : o = o.next = n;
    } else l = o = n;
    t = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = t;
    return;
  }
  e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n;
}
function Gr(e, n, t, r) {
  var l = e.updateQueue;
  nn = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, c = s.next;
    s.next = null, i === null ? o = c : i.next = c, i = s;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, u = h.lastBaseUpdate, u !== i && (u === null ? h.firstBaseUpdate = c : u.next = c, h.lastBaseUpdate = s));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, h = c = s = null, u = o;
    do {
      var p = u.lane, w = u.eventTime;
      if ((r & p) === p) {
        h !== null && (h = h.next = {
          eventTime: w,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var k = e, S = u;
          switch (p = n, w = t, S.tag) {
            case 1:
              if (k = S.payload, typeof k == "function") {
                m = k.call(w, m, p);
                break e;
              }
              m = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = S.payload, p = typeof k == "function" ? k.call(w, m, p) : k, p == null) break e;
              m = W({}, m, p);
              break e;
            case 2:
              nn = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [u] : p.push(u));
      } else w = { eventTime: w, lane: p, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, h === null ? (c = h = w, s = m) : h = h.next = w, i |= p;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        p = u, u = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (s = m), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = h, n = l.shared.interleaved, n !== null) {
      l = n;
      do
        i |= l.lane, l = l.next;
      while (l !== n);
    } else o === null && (l.shared.lanes = 0);
    Rn |= i, e.lanes = i, e.memoizedState = m;
  }
}
function Nu(e, n, t) {
  if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
    var r = e[n], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = t, typeof l != "function") throw Error(g(191, l));
      l.call(r);
    }
  }
}
var tr = {}, Ve = gn(tr), Kt = gn(tr), Yt = gn(tr);
function Nn(e) {
  if (e === tr) throw Error(g(174));
  return e;
}
function ki(e, n) {
  switch ($(Yt, n), $(Kt, e), $(Ve, tr), e = n.nodeType, e) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : io(null, "");
      break;
    default:
      e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = io(n, e);
  }
  V(Ve), $(Ve, n);
}
function ot() {
  V(Ve), V(Kt), V(Yt);
}
function va(e) {
  Nn(Yt.current);
  var n = Nn(Ve.current), t = io(n, e.type);
  n !== t && ($(Kt, e), $(Ve, t));
}
function Si(e) {
  Kt.current === e && (V(Ve), V(Kt));
}
var B = gn(0);
function Jr(e) {
  for (var n = e; n !== null; ) {
    if (n.tag === 13) {
      var t = n.memoizedState;
      if (t !== null && (t = t.dehydrated, t === null || t.data === "$?" || t.data === "$!")) return n;
    } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
      if (n.flags & 128) return n;
    } else if (n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return null;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
  return null;
}
var Al = [];
function xi() {
  for (var e = 0; e < Al.length; e++) Al[e]._workInProgressVersionPrimary = null;
  Al.length = 0;
}
var zr = Je.ReactCurrentDispatcher, Wl = Je.ReactCurrentBatchConfig, Tn = 0, A = null, X = null, q = null, qr = !1, jt = !1, Zt = 0, cd = 0;
function re() {
  throw Error(g(321));
}
function _i(e, n) {
  if (n === null) return !1;
  for (var t = 0; t < n.length && t < e.length; t++) if (!Oe(e[t], n[t])) return !1;
  return !0;
}
function Ei(e, n, t, r, l, o) {
  if (Tn = o, A = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, zr.current = e === null || e.memoizedState === null ? md : hd, e = t(r, l), jt) {
    o = 0;
    do {
      if (jt = !1, Zt = 0, 25 <= o) throw Error(g(301));
      o += 1, q = X = null, n.updateQueue = null, zr.current = vd, e = t(r, l);
    } while (jt);
  }
  if (zr.current = br, n = X !== null && X.next !== null, Tn = 0, q = X = A = null, qr = !1, n) throw Error(g(300));
  return e;
}
function Ci() {
  var e = Zt !== 0;
  return Zt = 0, e;
}
function Fe() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return q === null ? A.memoizedState = q = e : q = q.next = e, q;
}
function Pe() {
  if (X === null) {
    var e = A.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var n = q === null ? A.memoizedState : q.next;
  if (n !== null) q = n, X = e;
  else {
    if (e === null) throw Error(g(310));
    X = e, e = { memoizedState: X.memoizedState, baseState: X.baseState, baseQueue: X.baseQueue, queue: X.queue, next: null }, q === null ? A.memoizedState = q = e : q = q.next = e;
  }
  return q;
}
function Xt(e, n) {
  return typeof n == "function" ? n(e) : n;
}
function Ql(e) {
  var n = Pe(), t = n.queue;
  if (t === null) throw Error(g(311));
  t.lastRenderedReducer = e;
  var r = X, l = r.baseQueue, o = t.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, t.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var u = i = null, s = null, c = o;
    do {
      var h = c.lane;
      if ((Tn & h) === h) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: h,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (u = s = m, i = r) : s = s.next = m, A.lanes |= h, Rn |= h;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? i = r : s.next = u, Oe(r, n.memoizedState) || (de = !0), n.memoizedState = r, n.baseState = i, n.baseQueue = s, t.lastRenderedState = r;
  }
  if (e = t.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, A.lanes |= o, Rn |= o, l = l.next;
    while (l !== e);
  } else l === null && (t.lanes = 0);
  return [n.memoizedState, t.dispatch];
}
function Kl(e) {
  var n = Pe(), t = n.queue;
  if (t === null) throw Error(g(311));
  t.lastRenderedReducer = e;
  var r = t.dispatch, l = t.pending, o = n.memoizedState;
  if (l !== null) {
    t.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    Oe(o, n.memoizedState) || (de = !0), n.memoizedState = o, n.baseQueue === null && (n.baseState = o), t.lastRenderedState = o;
  }
  return [o, r];
}
function ya() {
}
function ga(e, n) {
  var t = A, r = Pe(), l = n(), o = !Oe(r.memoizedState, l);
  if (o && (r.memoizedState = l, de = !0), r = r.queue, Ni(Sa.bind(null, t, r, e), [e]), r.getSnapshot !== n || o || q !== null && q.memoizedState.tag & 1) {
    if (t.flags |= 2048, Gt(9, ka.bind(null, t, r, l, n), void 0, null), b === null) throw Error(g(349));
    Tn & 30 || wa(t, n, l);
  }
  return l;
}
function wa(e, n, t) {
  e.flags |= 16384, e = { getSnapshot: n, value: t }, n = A.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, A.updateQueue = n, n.stores = [e]) : (t = n.stores, t === null ? n.stores = [e] : t.push(e));
}
function ka(e, n, t, r) {
  n.value = t, n.getSnapshot = r, xa(n) && _a(e);
}
function Sa(e, n, t) {
  return t(function() {
    xa(n) && _a(e);
  });
}
function xa(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var t = n();
    return !Oe(e, t);
  } catch {
    return !0;
  }
}
function _a(e) {
  var n = Xe(e, 1);
  n !== null && Ie(n, e, 1, -1);
}
function Lu(e) {
  var n = Fe();
  return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xt, lastRenderedState: e }, n.queue = e, e = e.dispatch = pd.bind(null, A, e), [n.memoizedState, e];
}
function Gt(e, n, t, r) {
  return e = { tag: e, create: n, destroy: t, deps: r, next: null }, n = A.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, A.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
}
function Ea() {
  return Pe().memoizedState;
}
function jr(e, n, t, r) {
  var l = Fe();
  A.flags |= e, l.memoizedState = Gt(1 | n, t, void 0, r === void 0 ? null : r);
}
function pl(e, n, t, r) {
  var l = Pe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (X !== null) {
    var i = X.memoizedState;
    if (o = i.destroy, r !== null && _i(r, i.deps)) {
      l.memoizedState = Gt(n, t, o, r);
      return;
    }
  }
  A.flags |= e, l.memoizedState = Gt(1 | n, t, o, r);
}
function Pu(e, n) {
  return jr(8390656, 8, e, n);
}
function Ni(e, n) {
  return pl(2048, 8, e, n);
}
function Ca(e, n) {
  return pl(4, 2, e, n);
}
function Na(e, n) {
  return pl(4, 4, e, n);
}
function La(e, n) {
  if (typeof n == "function") return e = e(), n(e), function() {
    n(null);
  };
  if (n != null) return e = e(), n.current = e, function() {
    n.current = null;
  };
}
function Pa(e, n, t) {
  return t = t != null ? t.concat([e]) : null, pl(4, 4, La.bind(null, n, e), t);
}
function Li() {
}
function za(e, n) {
  var t = Pe();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && _i(n, r[1]) ? r[0] : (t.memoizedState = [e, n], e);
}
function ja(e, n) {
  var t = Pe();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && _i(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [e, n], e);
}
function Ta(e, n, t) {
  return Tn & 21 ? (Oe(t, n) || (t = Ds(), A.lanes |= t, Rn |= t, e.baseState = !0), n) : (e.baseState && (e.baseState = !1, de = !0), e.memoizedState = t);
}
function fd(e, n) {
  var t = D;
  D = t !== 0 && 4 > t ? t : 4, e(!0);
  var r = Wl.transition;
  Wl.transition = {};
  try {
    e(!1), n();
  } finally {
    D = t, Wl.transition = r;
  }
}
function Ra() {
  return Pe().memoizedState;
}
function dd(e, n, t) {
  var r = pn(e);
  if (t = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null }, Ma(e)) Ia(n, t);
  else if (t = ma(e, n, t, r), t !== null) {
    var l = se();
    Ie(t, e, r, l), Oa(t, n, r);
  }
}
function pd(e, n, t) {
  var r = pn(e), l = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (Ma(e)) Ia(n, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = n.lastRenderedReducer, o !== null)) try {
      var i = n.lastRenderedState, u = o(i, t);
      if (l.hasEagerState = !0, l.eagerState = u, Oe(u, i)) {
        var s = n.interleaved;
        s === null ? (l.next = l, gi(n)) : (l.next = s.next, s.next = l), n.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    t = ma(e, n, l, r), t !== null && (l = se(), Ie(t, e, r, l), Oa(t, n, r));
  }
}
function Ma(e) {
  var n = e.alternate;
  return e === A || n !== null && n === A;
}
function Ia(e, n) {
  jt = qr = !0;
  var t = e.pending;
  t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
}
function Oa(e, n, t) {
  if (t & 4194240) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, li(e, t);
  }
}
var br = { readContext: Le, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, md = { readContext: Le, useCallback: function(e, n) {
  return Fe().memoizedState = [e, n === void 0 ? null : n], e;
}, useContext: Le, useEffect: Pu, useImperativeHandle: function(e, n, t) {
  return t = t != null ? t.concat([e]) : null, jr(
    4194308,
    4,
    La.bind(null, n, e),
    t
  );
}, useLayoutEffect: function(e, n) {
  return jr(4194308, 4, e, n);
}, useInsertionEffect: function(e, n) {
  return jr(4, 2, e, n);
}, useMemo: function(e, n) {
  var t = Fe();
  return n = n === void 0 ? null : n, e = e(), t.memoizedState = [e, n], e;
}, useReducer: function(e, n, t) {
  var r = Fe();
  return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, r.queue = e, e = e.dispatch = dd.bind(null, A, e), [r.memoizedState, e];
}, useRef: function(e) {
  var n = Fe();
  return e = { current: e }, n.memoizedState = e;
}, useState: Lu, useDebugValue: Li, useDeferredValue: function(e) {
  return Fe().memoizedState = e;
}, useTransition: function() {
  var e = Lu(!1), n = e[0];
  return e = fd.bind(null, e[1]), Fe().memoizedState = e, [n, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, n, t) {
  var r = A, l = Fe();
  if (H) {
    if (t === void 0) throw Error(g(407));
    t = t();
  } else {
    if (t = n(), b === null) throw Error(g(349));
    Tn & 30 || wa(r, n, t);
  }
  l.memoizedState = t;
  var o = { value: t, getSnapshot: n };
  return l.queue = o, Pu(Sa.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Gt(9, ka.bind(null, r, o, t, n), void 0, null), t;
}, useId: function() {
  var e = Fe(), n = b.identifierPrefix;
  if (H) {
    var t = Qe, r = We;
    t = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + t, n = ":" + n + "R" + t, t = Zt++, 0 < t && (n += "H" + t.toString(32)), n += ":";
  } else t = cd++, n = ":" + n + "r" + t.toString(32) + ":";
  return e.memoizedState = n;
}, unstable_isNewReconciler: !1 }, hd = {
  readContext: Le,
  useCallback: za,
  useContext: Le,
  useEffect: Ni,
  useImperativeHandle: Pa,
  useInsertionEffect: Ca,
  useLayoutEffect: Na,
  useMemo: ja,
  useReducer: Ql,
  useRef: Ea,
  useState: function() {
    return Ql(Xt);
  },
  useDebugValue: Li,
  useDeferredValue: function(e) {
    var n = Pe();
    return Ta(n, X.memoizedState, e);
  },
  useTransition: function() {
    var e = Ql(Xt)[0], n = Pe().memoizedState;
    return [e, n];
  },
  useMutableSource: ya,
  useSyncExternalStore: ga,
  useId: Ra,
  unstable_isNewReconciler: !1
}, vd = { readContext: Le, useCallback: za, useContext: Le, useEffect: Ni, useImperativeHandle: Pa, useInsertionEffect: Ca, useLayoutEffect: Na, useMemo: ja, useReducer: Kl, useRef: Ea, useState: function() {
  return Kl(Xt);
}, useDebugValue: Li, useDeferredValue: function(e) {
  var n = Pe();
  return X === null ? n.memoizedState = e : Ta(n, X.memoizedState, e);
}, useTransition: function() {
  var e = Kl(Xt)[0], n = Pe().memoizedState;
  return [e, n];
}, useMutableSource: ya, useSyncExternalStore: ga, useId: Ra, unstable_isNewReconciler: !1 };
function je(e, n) {
  if (e && e.defaultProps) {
    n = W({}, n), e = e.defaultProps;
    for (var t in e) n[t] === void 0 && (n[t] = e[t]);
    return n;
  }
  return n;
}
function Po(e, n, t, r) {
  n = e.memoizedState, t = t(r, n), t = t == null ? n : W({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
}
var ml = { isMounted: function(e) {
  return (e = e._reactInternals) ? On(e) === e : !1;
}, enqueueSetState: function(e, n, t) {
  e = e._reactInternals;
  var r = se(), l = pn(e), o = Ke(r, l);
  o.payload = n, t != null && (o.callback = t), n = fn(e, o, l), n !== null && (Ie(n, e, l, r), Pr(n, e, l));
}, enqueueReplaceState: function(e, n, t) {
  e = e._reactInternals;
  var r = se(), l = pn(e), o = Ke(r, l);
  o.tag = 1, o.payload = n, t != null && (o.callback = t), n = fn(e, o, l), n !== null && (Ie(n, e, l, r), Pr(n, e, l));
}, enqueueForceUpdate: function(e, n) {
  e = e._reactInternals;
  var t = se(), r = pn(e), l = Ke(t, r);
  l.tag = 2, n != null && (l.callback = n), n = fn(e, l, r), n !== null && (Ie(n, e, r, t), Pr(n, e, r));
} };
function zu(e, n, t, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : n.prototype && n.prototype.isPureReactComponent ? !Bt(t, r) || !Bt(l, o) : !0;
}
function Da(e, n, t) {
  var r = !1, l = vn, o = n.contextType;
  return typeof o == "object" && o !== null ? o = Le(o) : (l = me(n) ? zn : ie.current, r = n.contextTypes, o = (r = r != null) ? tt(e, l) : vn), n = new n(t, o), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ml, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), n;
}
function ju(e, n, t, r) {
  e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && ml.enqueueReplaceState(n, n.state, null);
}
function zo(e, n, t, r) {
  var l = e.stateNode;
  l.props = t, l.state = e.memoizedState, l.refs = {}, wi(e);
  var o = n.contextType;
  typeof o == "object" && o !== null ? l.context = Le(o) : (o = me(n) ? zn : ie.current, l.context = tt(e, o)), l.state = e.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Po(e, n, o, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && ml.enqueueReplaceState(l, l.state, null), Gr(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function it(e, n) {
  try {
    var t = "", r = n;
    do
      t += Ac(r), r = r.return;
    while (r);
    var l = t;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: n, stack: l, digest: null };
}
function Yl(e, n, t) {
  return { value: e, source: null, stack: t ?? null, digest: n ?? null };
}
function jo(e, n) {
  try {
    console.error(n.value);
  } catch (t) {
    setTimeout(function() {
      throw t;
    });
  }
}
var yd = typeof WeakMap == "function" ? WeakMap : Map;
function Fa(e, n, t) {
  t = Ke(-1, t), t.tag = 3, t.payload = { element: null };
  var r = n.value;
  return t.callback = function() {
    nl || (nl = !0, Vo = r), jo(e, n);
  }, t;
}
function $a(e, n, t) {
  t = Ke(-1, t), t.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = n.value;
    t.payload = function() {
      return r(l);
    }, t.callback = function() {
      jo(e, n);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (t.callback = function() {
    jo(e, n), typeof r != "function" && (dn === null ? dn = /* @__PURE__ */ new Set([this]) : dn.add(this));
    var i = n.stack;
    this.componentDidCatch(n.value, { componentStack: i !== null ? i : "" });
  }), t;
}
function Tu(e, n, t) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new yd();
    var l = /* @__PURE__ */ new Set();
    r.set(n, l);
  } else l = r.get(n), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(n, l));
  l.has(t) || (l.add(t), e = Td.bind(null, e, n, t), n.then(e, e));
}
function Ru(e) {
  do {
    var n;
    if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Mu(e, n, t, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === n ? e.flags |= 65536 : (e.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (n = Ke(-1, 1), n.tag = 2, fn(t, n, 1))), t.lanes |= 1), e);
}
var gd = Je.ReactCurrentOwner, de = !1;
function ue(e, n, t, r) {
  n.child = e === null ? pa(n, null, t, r) : lt(n, e.child, t, r);
}
function Iu(e, n, t, r, l) {
  t = t.render;
  var o = n.ref;
  return bn(n, l), r = Ei(e, n, t, r, o, l), t = Ci(), e !== null && !de ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Ge(e, n, l)) : (H && t && di(n), n.flags |= 1, ue(e, n, r, l), n.child);
}
function Ou(e, n, t, r, l) {
  if (e === null) {
    var o = t.type;
    return typeof o == "function" && !Oi(o) && o.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = o, Ua(e, n, o, r, l)) : (e = Ir(t.type, null, r, n, n.mode, l), e.ref = n.ref, e.return = n, n.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (t = t.compare, t = t !== null ? t : Bt, t(i, r) && e.ref === n.ref) return Ge(e, n, l);
  }
  return n.flags |= 1, e = mn(o, r), e.ref = n.ref, e.return = n, n.child = e;
}
function Ua(e, n, t, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Bt(o, r) && e.ref === n.ref) if (de = !1, n.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (de = !0);
    else return n.lanes = e.lanes, Ge(e, n, l);
  }
  return To(e, n, t, r, l);
}
function Va(e, n, t) {
  var r = n.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $(Zn, ye), ye |= t;
  else {
    if (!(t & 1073741824)) return e = o !== null ? o.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, $(Zn, ye), ye |= e, null;
    n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : t, $(Zn, ye), ye |= r;
  }
  else o !== null ? (r = o.baseLanes | t, n.memoizedState = null) : r = t, $(Zn, ye), ye |= r;
  return ue(e, n, l, t), n.child;
}
function Ha(e, n) {
  var t = n.ref;
  (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 512, n.flags |= 2097152);
}
function To(e, n, t, r, l) {
  var o = me(t) ? zn : ie.current;
  return o = tt(n, o), bn(n, l), t = Ei(e, n, t, r, o, l), r = Ci(), e !== null && !de ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Ge(e, n, l)) : (H && r && di(n), n.flags |= 1, ue(e, n, t, l), n.child);
}
function Du(e, n, t, r, l) {
  if (me(t)) {
    var o = !0;
    Qr(n);
  } else o = !1;
  if (bn(n, l), n.stateNode === null) Tr(e, n), Da(n, t, r), zo(n, t, r, l), r = !0;
  else if (e === null) {
    var i = n.stateNode, u = n.memoizedProps;
    i.props = u;
    var s = i.context, c = t.contextType;
    typeof c == "object" && c !== null ? c = Le(c) : (c = me(t) ? zn : ie.current, c = tt(n, c));
    var h = t.getDerivedStateFromProps, m = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== c) && ju(n, i, r, c), nn = !1;
    var p = n.memoizedState;
    i.state = p, Gr(n, r, i, l), s = n.memoizedState, u !== r || p !== s || pe.current || nn ? (typeof h == "function" && (Po(n, t, h, r), s = n.memoizedState), (u = nn || zu(n, t, u, r, p, s, c)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = s), i.props = r, i.state = s, i.context = c, r = u) : (typeof i.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
  } else {
    i = n.stateNode, ha(e, n), u = n.memoizedProps, c = n.type === n.elementType ? u : je(n.type, u), i.props = c, m = n.pendingProps, p = i.context, s = t.contextType, typeof s == "object" && s !== null ? s = Le(s) : (s = me(t) ? zn : ie.current, s = tt(n, s));
    var w = t.getDerivedStateFromProps;
    (h = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== m || p !== s) && ju(n, i, r, s), nn = !1, p = n.memoizedState, i.state = p, Gr(n, r, i, l);
    var k = n.memoizedState;
    u !== m || p !== k || pe.current || nn ? (typeof w == "function" && (Po(n, t, w, r), k = n.memoizedState), (c = nn || zu(n, t, c, r, p, k, s) || !1) ? (h || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, k, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, k, s)), typeof i.componentDidUpdate == "function" && (n.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = k), i.props = r, i.state = k, i.context = s, r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), r = !1);
  }
  return Ro(e, n, t, r, o, l);
}
function Ro(e, n, t, r, l, o) {
  Ha(e, n);
  var i = (n.flags & 128) !== 0;
  if (!r && !i) return l && Su(n, t, !1), Ge(e, n, o);
  r = n.stateNode, gd.current = n;
  var u = i && typeof t.getDerivedStateFromError != "function" ? null : r.render();
  return n.flags |= 1, e !== null && i ? (n.child = lt(n, e.child, null, o), n.child = lt(n, null, u, o)) : ue(e, n, u, o), n.memoizedState = r.state, l && Su(n, t, !0), n.child;
}
function Ba(e) {
  var n = e.stateNode;
  n.pendingContext ? ku(e, n.pendingContext, n.pendingContext !== n.context) : n.context && ku(e, n.context, !1), ki(e, n.containerInfo);
}
function Fu(e, n, t, r, l) {
  return rt(), mi(l), n.flags |= 256, ue(e, n, t, r), n.child;
}
var Mo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Io(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Aa(e, n, t) {
  var r = n.pendingProps, l = B.current, o = !1, i = (n.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), $(B, l & 1), e === null)
    return No(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (n.mode & 1 ? e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = n.mode, o = n.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = yl(i, r, 0, null), e = Pn(e, r, t, null), o.return = n, e.return = n, o.sibling = e, n.child = o, n.child.memoizedState = Io(t), n.memoizedState = Mo, e) : Pi(n, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return wd(e, n, i, r, u, l, t);
  if (o) {
    o = r.fallback, i = n.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && n.child !== l ? (r = n.child, r.childLanes = 0, r.pendingProps = s, n.deletions = null) : (r = mn(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = mn(u, o) : (o = Pn(o, i, t, null), o.flags |= 2), o.return = n, r.return = n, r.sibling = o, n.child = r, r = o, o = n.child, i = e.child.memoizedState, i = i === null ? Io(t) : { baseLanes: i.baseLanes | t, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~t, n.memoizedState = Mo, r;
  }
  return o = e.child, e = o.sibling, r = mn(o, { mode: "visible", children: r.children }), !(n.mode & 1) && (r.lanes = t), r.return = n, r.sibling = null, e !== null && (t = n.deletions, t === null ? (n.deletions = [e], n.flags |= 16) : t.push(e)), n.child = r, n.memoizedState = null, r;
}
function Pi(e, n) {
  return n = yl({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
}
function gr(e, n, t, r) {
  return r !== null && mi(r), lt(n, e.child, null, t), e = Pi(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
}
function wd(e, n, t, r, l, o, i) {
  if (t)
    return n.flags & 256 ? (n.flags &= -257, r = Yl(Error(g(422))), gr(e, n, i, r)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (o = r.fallback, l = n.mode, r = yl({ mode: "visible", children: r.children }, l, 0, null), o = Pn(o, l, i, null), o.flags |= 2, r.return = n, o.return = n, r.sibling = o, n.child = r, n.mode & 1 && lt(n, e.child, null, i), n.child.memoizedState = Io(i), n.memoizedState = Mo, o);
  if (!(n.mode & 1)) return gr(e, n, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(g(419)), r = Yl(o, r, void 0), gr(e, n, i, r);
  }
  if (u = (i & e.childLanes) !== 0, de || u) {
    if (r = b, r !== null) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Xe(e, l), Ie(r, e, l, -1));
    }
    return Ii(), r = Yl(Error(g(421))), gr(e, n, i, r);
  }
  return l.data === "$?" ? (n.flags |= 128, n.child = e.child, n = Rd.bind(null, e), l._reactRetry = n, null) : (e = o.treeContext, ge = cn(l.nextSibling), we = n, H = !0, Re = null, e !== null && (_e[Ee++] = We, _e[Ee++] = Qe, _e[Ee++] = jn, We = e.id, Qe = e.overflow, jn = n), n = Pi(n, r.children), n.flags |= 4096, n);
}
function $u(e, n, t) {
  e.lanes |= n;
  var r = e.alternate;
  r !== null && (r.lanes |= n), Lo(e.return, n, t);
}
function Zl(e, n, t, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: r, tail: t, tailMode: l } : (o.isBackwards = n, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = t, o.tailMode = l);
}
function Wa(e, n, t) {
  var r = n.pendingProps, l = r.revealOrder, o = r.tail;
  if (ue(e, n, r.children, t), r = B.current, r & 2) r = r & 1 | 2, n.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = n.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && $u(e, t, n);
      else if (e.tag === 19) $u(e, t, n);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === n) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === n) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if ($(B, r), !(n.mode & 1)) n.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (t = n.child, l = null; t !== null; ) e = t.alternate, e !== null && Jr(e) === null && (l = t), t = t.sibling;
      t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), Zl(n, !1, l, t, o);
      break;
    case "backwards":
      for (t = null, l = n.child, n.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Jr(e) === null) {
          n.child = l;
          break;
        }
        e = l.sibling, l.sibling = t, t = l, l = e;
      }
      Zl(n, !0, t, null, o);
      break;
    case "together":
      Zl(n, !1, null, null, void 0);
      break;
    default:
      n.memoizedState = null;
  }
  return n.child;
}
function Tr(e, n) {
  !(n.mode & 1) && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
}
function Ge(e, n, t) {
  if (e !== null && (n.dependencies = e.dependencies), Rn |= n.lanes, !(t & n.childLanes)) return null;
  if (e !== null && n.child !== e.child) throw Error(g(153));
  if (n.child !== null) {
    for (e = n.child, t = mn(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null; ) e = e.sibling, t = t.sibling = mn(e, e.pendingProps), t.return = n;
    t.sibling = null;
  }
  return n.child;
}
function kd(e, n, t) {
  switch (n.tag) {
    case 3:
      Ba(n), rt();
      break;
    case 5:
      va(n);
      break;
    case 1:
      me(n.type) && Qr(n);
      break;
    case 4:
      ki(n, n.stateNode.containerInfo);
      break;
    case 10:
      var r = n.type._context, l = n.memoizedProps.value;
      $(Zr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = n.memoizedState, r !== null)
        return r.dehydrated !== null ? ($(B, B.current & 1), n.flags |= 128, null) : t & n.child.childLanes ? Aa(e, n, t) : ($(B, B.current & 1), e = Ge(e, n, t), e !== null ? e.sibling : null);
      $(B, B.current & 1);
      break;
    case 19:
      if (r = (t & n.childLanes) !== 0, e.flags & 128) {
        if (r) return Wa(e, n, t);
        n.flags |= 128;
      }
      if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), $(B, B.current), r) break;
      return null;
    case 22:
    case 23:
      return n.lanes = 0, Va(e, n, t);
  }
  return Ge(e, n, t);
}
var Qa, Oo, Ka, Ya;
Qa = function(e, n) {
  for (var t = n.child; t !== null; ) {
    if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode);
    else if (t.tag !== 4 && t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === n) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === n) return;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
};
Oo = function() {
};
Ka = function(e, n, t, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = n.stateNode, Nn(Ve.current);
    var o = null;
    switch (t) {
      case "input":
        l = to(e, l), r = to(e, r), o = [];
        break;
      case "select":
        l = W({}, l, { value: void 0 }), r = W({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = oo(e, l), r = oo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ar);
    }
    uo(t, r);
    var i;
    t = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var u = l[c];
      for (i in u) u.hasOwnProperty(i) && (t || (t = {}), t[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Ot.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (u = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== u && (s != null || u != null)) if (c === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (t || (t = {}), t[i] = "");
        for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (t || (t = {}), t[i] = s[i]);
      } else t || (o || (o = []), o.push(
        c,
        t
      )), t = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Ot.hasOwnProperty(c) ? (s != null && c === "onScroll" && U("scroll", e), o || u === s || (o = [])) : (o = o || []).push(c, s));
    }
    t && (o = o || []).push("style", t);
    var c = o;
    (n.updateQueue = c) && (n.flags |= 4);
  }
};
Ya = function(e, n, t, r) {
  t !== r && (n.flags |= 4);
};
function wt(e, n) {
  if (!H) switch (e.tailMode) {
    case "hidden":
      n = e.tail;
      for (var t = null; n !== null; ) n.alternate !== null && (t = n), n = n.sibling;
      t === null ? e.tail = null : t.sibling = null;
      break;
    case "collapsed":
      t = e.tail;
      for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
      r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function le(e) {
  var n = e.alternate !== null && e.alternate.child === e.child, t = 0, r = 0;
  if (n) for (var l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = t, n;
}
function Sd(e, n, t) {
  var r = n.pendingProps;
  switch (pi(n), n.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return le(n), null;
    case 1:
      return me(n.type) && Wr(), le(n), null;
    case 3:
      return r = n.stateNode, ot(), V(pe), V(ie), xi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (vr(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, Re !== null && (Ao(Re), Re = null))), Oo(e, n), le(n), null;
    case 5:
      Si(n);
      var l = Nn(Yt.current);
      if (t = n.type, e !== null && n.stateNode != null) Ka(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
      else {
        if (!r) {
          if (n.stateNode === null) throw Error(g(166));
          return le(n), null;
        }
        if (e = Nn(Ve.current), vr(n)) {
          r = n.stateNode, t = n.type;
          var o = n.memoizedProps;
          switch (r[$e] = n, r[Qt] = o, e = (n.mode & 1) !== 0, t) {
            case "dialog":
              U("cancel", r), U("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              U("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Et.length; l++) U(Et[l], r);
              break;
            case "source":
              U("error", r);
              break;
            case "img":
            case "image":
            case "link":
              U(
                "error",
                r
              ), U("load", r);
              break;
            case "details":
              U("toggle", r);
              break;
            case "input":
              Yi(r, o), U("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, U("invalid", r);
              break;
            case "textarea":
              Xi(r, o), U("invalid", r);
          }
          uo(t, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && hr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && hr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Ot.hasOwnProperty(i) && u != null && i === "onScroll" && U("scroll", r);
          }
          switch (t) {
            case "input":
              ur(r), Zi(r, o, !0);
              break;
            case "textarea":
              ur(r), Gi(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ar);
          }
          r = l, n.updateQueue = r, r !== null && (n.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ss(t)), e === "http://www.w3.org/1999/xhtml" ? t === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(t, { is: r.is }) : (e = i.createElement(t), t === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, t), e[$e] = n, e[Qt] = r, Qa(e, n, !1, !1), n.stateNode = e;
          e: {
            switch (i = so(t, r), t) {
              case "dialog":
                U("cancel", e), U("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                U("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Et.length; l++) U(Et[l], e);
                l = r;
                break;
              case "source":
                U("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                U(
                  "error",
                  e
                ), U("load", e), l = r;
                break;
              case "details":
                U("toggle", e), l = r;
                break;
              case "input":
                Yi(e, r), l = to(e, r), U("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = W({}, r, { value: void 0 }), U("invalid", e);
                break;
              case "textarea":
                Xi(e, r), l = oo(e, r), U("invalid", e);
                break;
              default:
                l = r;
            }
            uo(t, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? Es(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && xs(e, s)) : o === "children" ? typeof s == "string" ? (t !== "textarea" || s !== "") && Dt(e, s) : typeof s == "number" && Dt(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Ot.hasOwnProperty(o) ? s != null && o === "onScroll" && U("scroll", e) : s != null && qo(e, o, s, i));
            }
            switch (t) {
              case "input":
                ur(e), Zi(e, r, !1);
                break;
              case "textarea":
                ur(e), Gi(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + hn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Xn(e, !!r.multiple, o, !1) : r.defaultValue != null && Xn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Ar);
            }
            switch (t) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (n.flags |= 4);
        }
        n.ref !== null && (n.flags |= 512, n.flags |= 2097152);
      }
      return le(n), null;
    case 6:
      if (e && n.stateNode != null) Ya(e, n, e.memoizedProps, r);
      else {
        if (typeof r != "string" && n.stateNode === null) throw Error(g(166));
        if (t = Nn(Yt.current), Nn(Ve.current), vr(n)) {
          if (r = n.stateNode, t = n.memoizedProps, r[$e] = n, (o = r.nodeValue !== t) && (e = we, e !== null)) switch (e.tag) {
            case 3:
              hr(r.nodeValue, t, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && hr(r.nodeValue, t, (e.mode & 1) !== 0);
          }
          o && (n.flags |= 4);
        } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[$e] = n, n.stateNode = r;
      }
      return le(n), null;
    case 13:
      if (V(B), r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && ge !== null && n.mode & 1 && !(n.flags & 128)) fa(), rt(), n.flags |= 98560, o = !1;
        else if (o = vr(n), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(g(318));
            if (o = n.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(g(317));
            o[$e] = n;
          } else rt(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
          le(n), o = !1;
        } else Re !== null && (Ao(Re), Re = null), o = !0;
        if (!o) return n.flags & 65536 ? n : null;
      }
      return n.flags & 128 ? (n.lanes = t, n) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (n.child.flags |= 8192, n.mode & 1 && (e === null || B.current & 1 ? G === 0 && (G = 3) : Ii())), n.updateQueue !== null && (n.flags |= 4), le(n), null);
    case 4:
      return ot(), Oo(e, n), e === null && At(n.stateNode.containerInfo), le(n), null;
    case 10:
      return yi(n.type._context), le(n), null;
    case 17:
      return me(n.type) && Wr(), le(n), null;
    case 19:
      if (V(B), o = n.memoizedState, o === null) return le(n), null;
      if (r = (n.flags & 128) !== 0, i = o.rendering, i === null) if (r) wt(o, !1);
      else {
        if (G !== 0 || e !== null && e.flags & 128) for (e = n.child; e !== null; ) {
          if (i = Jr(e), i !== null) {
            for (n.flags |= 128, wt(o, !1), r = i.updateQueue, r !== null && (n.updateQueue = r, n.flags |= 4), n.subtreeFlags = 0, r = t, t = n.child; t !== null; ) o = t, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t = t.sibling;
            return $(B, B.current & 1 | 2), n.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Y() > ut && (n.flags |= 128, r = !0, wt(o, !1), n.lanes = 4194304);
      }
      else {
        if (!r) if (e = Jr(i), e !== null) {
          if (n.flags |= 128, r = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), wt(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !H) return le(n), null;
        } else 2 * Y() - o.renderingStartTime > ut && t !== 1073741824 && (n.flags |= 128, r = !0, wt(o, !1), n.lanes = 4194304);
        o.isBackwards ? (i.sibling = n.child, n.child = i) : (t = o.last, t !== null ? t.sibling = i : n.child = i, o.last = i);
      }
      return o.tail !== null ? (n = o.tail, o.rendering = n, o.tail = n.sibling, o.renderingStartTime = Y(), n.sibling = null, t = B.current, $(B, r ? t & 1 | 2 : t & 1), n) : (le(n), null);
    case 22:
    case 23:
      return Mi(), r = n.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (n.flags |= 8192), r && n.mode & 1 ? ye & 1073741824 && (le(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : le(n), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(g(156, n.tag));
}
function xd(e, n) {
  switch (pi(n), n.tag) {
    case 1:
      return me(n.type) && Wr(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 3:
      return ot(), V(pe), V(ie), xi(), e = n.flags, e & 65536 && !(e & 128) ? (n.flags = e & -65537 | 128, n) : null;
    case 5:
      return Si(n), null;
    case 13:
      if (V(B), e = n.memoizedState, e !== null && e.dehydrated !== null) {
        if (n.alternate === null) throw Error(g(340));
        rt();
      }
      return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 19:
      return V(B), null;
    case 4:
      return ot(), null;
    case 10:
      return yi(n.type._context), null;
    case 22:
    case 23:
      return Mi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var wr = !1, oe = !1, _d = typeof WeakSet == "function" ? WeakSet : Set, E = null;
function Yn(e, n) {
  var t = e.ref;
  if (t !== null) if (typeof t == "function") try {
    t(null);
  } catch (r) {
    Q(e, n, r);
  }
  else t.current = null;
}
function Do(e, n, t) {
  try {
    t();
  } catch (r) {
    Q(e, n, r);
  }
}
var Uu = !1;
function Ed(e, n) {
  if (wo = Vr, e = qs(), fi(e)) {
    if ("selectionStart" in e) var t = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      t = (t = e.ownerDocument) && t.defaultView || window;
      var r = t.getSelection && t.getSelection();
      if (r && r.rangeCount !== 0) {
        t = r.anchorNode;
        var l = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          t.nodeType, o.nodeType;
        } catch {
          t = null;
          break e;
        }
        var i = 0, u = -1, s = -1, c = 0, h = 0, m = e, p = null;
        n: for (; ; ) {
          for (var w; m !== t || l !== 0 && m.nodeType !== 3 || (u = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (s = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (w = m.firstChild) !== null; )
            p = m, m = w;
          for (; ; ) {
            if (m === e) break n;
            if (p === t && ++c === l && (u = i), p === o && ++h === r && (s = i), (w = m.nextSibling) !== null) break;
            m = p, p = m.parentNode;
          }
          m = w;
        }
        t = u === -1 || s === -1 ? null : { start: u, end: s };
      } else t = null;
    }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (ko = { focusedElem: e, selectionRange: t }, Vr = !1, E = n; E !== null; ) if (n = E, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, E = e;
  else for (; E !== null; ) {
    n = E;
    try {
      var k = n.alternate;
      if (n.flags & 1024) switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var S = k.memoizedProps, F = k.memoizedState, f = n.stateNode, a = f.getSnapshotBeforeUpdate(n.elementType === n.type ? S : je(n.type, S), F);
            f.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var d = n.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(g(163));
      }
    } catch (y) {
      Q(n, n.return, y);
    }
    if (e = n.sibling, e !== null) {
      e.return = n.return, E = e;
      break;
    }
    E = n.return;
  }
  return k = Uu, Uu = !1, k;
}
function Tt(e, n, t) {
  var r = n.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Do(n, t, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function hl(e, n) {
  if (n = n.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
    var t = n = n.next;
    do {
      if ((t.tag & e) === e) {
        var r = t.create;
        t.destroy = r();
      }
      t = t.next;
    } while (t !== n);
  }
}
function Fo(e) {
  var n = e.ref;
  if (n !== null) {
    var t = e.stateNode;
    switch (e.tag) {
      case 5:
        e = t;
        break;
      default:
        e = t;
    }
    typeof n == "function" ? n(e) : n.current = e;
  }
}
function Za(e) {
  var n = e.alternate;
  n !== null && (e.alternate = null, Za(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[$e], delete n[Qt], delete n[_o], delete n[id], delete n[ud])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Xa(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Vu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Xa(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function $o(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = Ar));
  else if (r !== 4 && (e = e.child, e !== null)) for ($o(e, n, t), e = e.sibling; e !== null; ) $o(e, n, t), e = e.sibling;
}
function Uo(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.insertBefore(e, n) : t.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Uo(e, n, t), e = e.sibling; e !== null; ) Uo(e, n, t), e = e.sibling;
}
var ee = null, Te = !1;
function be(e, n, t) {
  for (t = t.child; t !== null; ) Ga(e, n, t), t = t.sibling;
}
function Ga(e, n, t) {
  if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
    Ue.onCommitFiberUnmount(ul, t);
  } catch {
  }
  switch (t.tag) {
    case 5:
      oe || Yn(t, n);
    case 6:
      var r = ee, l = Te;
      ee = null, be(e, n, t), ee = r, Te = l, ee !== null && (Te ? (e = ee, t = t.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t)) : ee.removeChild(t.stateNode));
      break;
    case 18:
      ee !== null && (Te ? (e = ee, t = t.stateNode, e.nodeType === 8 ? Hl(e.parentNode, t) : e.nodeType === 1 && Hl(e, t), Vt(e)) : Hl(ee, t.stateNode));
      break;
    case 4:
      r = ee, l = Te, ee = t.stateNode.containerInfo, Te = !0, be(e, n, t), ee = r, Te = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!oe && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Do(t, n, i), l = l.next;
        } while (l !== r);
      }
      be(e, n, t);
      break;
    case 1:
      if (!oe && (Yn(t, n), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount();
      } catch (u) {
        Q(t, n, u);
      }
      be(e, n, t);
      break;
    case 21:
      be(e, n, t);
      break;
    case 22:
      t.mode & 1 ? (oe = (r = oe) || t.memoizedState !== null, be(e, n, t), oe = r) : be(e, n, t);
      break;
    default:
      be(e, n, t);
  }
}
function Hu(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new _d()), n.forEach(function(r) {
      var l = Md.bind(null, e, r);
      t.has(r) || (t.add(r), r.then(l, l));
    });
  }
}
function ze(e, n) {
  var t = n.deletions;
  if (t !== null) for (var r = 0; r < t.length; r++) {
    var l = t[r];
    try {
      var o = e, i = n, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            ee = u.stateNode, Te = !1;
            break e;
          case 3:
            ee = u.stateNode.containerInfo, Te = !0;
            break e;
          case 4:
            ee = u.stateNode.containerInfo, Te = !0;
            break e;
        }
        u = u.return;
      }
      if (ee === null) throw Error(g(160));
      Ga(o, i, l), ee = null, Te = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      Q(l, n, c);
    }
  }
  if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) Ja(n, e), n = n.sibling;
}
function Ja(e, n) {
  var t = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ze(n, e), De(e), r & 4) {
        try {
          Tt(3, e, e.return), hl(3, e);
        } catch (S) {
          Q(e, e.return, S);
        }
        try {
          Tt(5, e, e.return);
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 1:
      ze(n, e), De(e), r & 512 && t !== null && Yn(t, t.return);
      break;
    case 5:
      if (ze(n, e), De(e), r & 512 && t !== null && Yn(t, t.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Dt(l, "");
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = t !== null ? t.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && ws(l, o), so(u, i);
          var c = so(u, o);
          for (i = 0; i < s.length; i += 2) {
            var h = s[i], m = s[i + 1];
            h === "style" ? Es(l, m) : h === "dangerouslySetInnerHTML" ? xs(l, m) : h === "children" ? Dt(l, m) : qo(l, h, m, c);
          }
          switch (u) {
            case "input":
              ro(l, o);
              break;
            case "textarea":
              ks(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var w = o.value;
              w != null ? Xn(l, !!o.multiple, w, !1) : p !== !!o.multiple && (o.defaultValue != null ? Xn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Xn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Qt] = o;
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 6:
      if (ze(n, e), De(e), r & 4) {
        if (e.stateNode === null) throw Error(g(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 3:
      if (ze(n, e), De(e), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
        Vt(n.containerInfo);
      } catch (S) {
        Q(e, e.return, S);
      }
      break;
    case 4:
      ze(n, e), De(e);
      break;
    case 13:
      ze(n, e), De(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ti = Y())), r & 4 && Hu(e);
      break;
    case 22:
      if (h = t !== null && t.memoizedState !== null, e.mode & 1 ? (oe = (c = oe) || h, ze(n, e), oe = c) : ze(n, e), De(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !h && e.mode & 1) for (E = e, h = e.child; h !== null; ) {
          for (m = E = h; E !== null; ) {
            switch (p = E, w = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Tt(4, p, p.return);
                break;
              case 1:
                Yn(p, p.return);
                var k = p.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = p, t = p.return;
                  try {
                    n = r, k.props = n.memoizedProps, k.state = n.memoizedState, k.componentWillUnmount();
                  } catch (S) {
                    Q(r, t, S);
                  }
                }
                break;
              case 5:
                Yn(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Au(m);
                  continue;
                }
            }
            w !== null ? (w.return = p, E = w) : Au(m);
          }
          h = h.sibling;
        }
        e: for (h = null, m = e; ; ) {
          if (m.tag === 5) {
            if (h === null) {
              h = m;
              try {
                l = m.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = m.stateNode, s = m.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = _s("display", i));
              } catch (S) {
                Q(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (h === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (S) {
              Q(e, e.return, S);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            h === m && (h = null), m = m.return;
          }
          h === m && (h = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      ze(n, e), De(e), r & 4 && Hu(e);
      break;
    case 21:
      break;
    default:
      ze(
        n,
        e
      ), De(e);
  }
}
function De(e) {
  var n = e.flags;
  if (n & 2) {
    try {
      e: {
        for (var t = e.return; t !== null; ) {
          if (Xa(t)) {
            var r = t;
            break e;
          }
          t = t.return;
        }
        throw Error(g(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Dt(l, ""), r.flags &= -33);
          var o = Vu(e);
          Uo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Vu(e);
          $o(e, u, i);
          break;
        default:
          throw Error(g(161));
      }
    } catch (s) {
      Q(e, e.return, s);
    }
    e.flags &= -3;
  }
  n & 4096 && (e.flags &= -4097);
}
function Cd(e, n, t) {
  E = e, qa(e);
}
function qa(e, n, t) {
  for (var r = (e.mode & 1) !== 0; E !== null; ) {
    var l = E, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || wr;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || oe;
        u = wr;
        var c = oe;
        if (wr = i, (oe = s) && !c) for (E = l; E !== null; ) i = E, s = i.child, i.tag === 22 && i.memoizedState !== null ? Wu(l) : s !== null ? (s.return = i, E = s) : Wu(l);
        for (; o !== null; ) E = o, qa(o), o = o.sibling;
        E = l, wr = u, oe = c;
      }
      Bu(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, E = o) : Bu(e);
  }
}
function Bu(e) {
  for (; E !== null; ) {
    var n = E;
    if (n.flags & 8772) {
      var t = n.alternate;
      try {
        if (n.flags & 8772) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            oe || hl(5, n);
            break;
          case 1:
            var r = n.stateNode;
            if (n.flags & 4 && !oe) if (t === null) r.componentDidMount();
            else {
              var l = n.elementType === n.type ? t.memoizedProps : je(n.type, t.memoizedProps);
              r.componentDidUpdate(l, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = n.updateQueue;
            o !== null && Nu(n, o, r);
            break;
          case 3:
            var i = n.updateQueue;
            if (i !== null) {
              if (t = null, n.child !== null) switch (n.child.tag) {
                case 5:
                  t = n.child.stateNode;
                  break;
                case 1:
                  t = n.child.stateNode;
              }
              Nu(n, i, t);
            }
            break;
          case 5:
            var u = n.stateNode;
            if (t === null && n.flags & 4) {
              t = u;
              var s = n.memoizedProps;
              switch (n.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && t.focus();
                  break;
                case "img":
                  s.src && (t.src = s.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (n.memoizedState === null) {
              var c = n.alternate;
              if (c !== null) {
                var h = c.memoizedState;
                if (h !== null) {
                  var m = h.dehydrated;
                  m !== null && Vt(m);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(g(163));
        }
        oe || n.flags & 512 && Fo(n);
      } catch (p) {
        Q(n, n.return, p);
      }
    }
    if (n === e) {
      E = null;
      break;
    }
    if (t = n.sibling, t !== null) {
      t.return = n.return, E = t;
      break;
    }
    E = n.return;
  }
}
function Au(e) {
  for (; E !== null; ) {
    var n = E;
    if (n === e) {
      E = null;
      break;
    }
    var t = n.sibling;
    if (t !== null) {
      t.return = n.return, E = t;
      break;
    }
    E = n.return;
  }
}
function Wu(e) {
  for (; E !== null; ) {
    var n = E;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var t = n.return;
          try {
            hl(4, n);
          } catch (s) {
            Q(n, t, s);
          }
          break;
        case 1:
          var r = n.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = n.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Q(n, l, s);
            }
          }
          var o = n.return;
          try {
            Fo(n);
          } catch (s) {
            Q(n, o, s);
          }
          break;
        case 5:
          var i = n.return;
          try {
            Fo(n);
          } catch (s) {
            Q(n, i, s);
          }
      }
    } catch (s) {
      Q(n, n.return, s);
    }
    if (n === e) {
      E = null;
      break;
    }
    var u = n.sibling;
    if (u !== null) {
      u.return = n.return, E = u;
      break;
    }
    E = n.return;
  }
}
var Nd = Math.ceil, el = Je.ReactCurrentDispatcher, zi = Je.ReactCurrentOwner, Ne = Je.ReactCurrentBatchConfig, R = 0, b = null, Z = null, ne = 0, ye = 0, Zn = gn(0), G = 0, Jt = null, Rn = 0, vl = 0, ji = 0, Rt = null, fe = null, Ti = 0, ut = 1 / 0, Be = null, nl = !1, Vo = null, dn = null, kr = !1, on = null, tl = 0, Mt = 0, Ho = null, Rr = -1, Mr = 0;
function se() {
  return R & 6 ? Y() : Rr !== -1 ? Rr : Rr = Y();
}
function pn(e) {
  return e.mode & 1 ? R & 2 && ne !== 0 ? ne & -ne : ad.transition !== null ? (Mr === 0 && (Mr = Ds()), Mr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : As(e.type)), e) : 1;
}
function Ie(e, n, t, r) {
  if (50 < Mt) throw Mt = 0, Ho = null, Error(g(185));
  bt(e, t, r), (!(R & 2) || e !== b) && (e === b && (!(R & 2) && (vl |= t), G === 4 && rn(e, ne)), he(e, r), t === 1 && R === 0 && !(n.mode & 1) && (ut = Y() + 500, dl && wn()));
}
function he(e, n) {
  var t = e.callbackNode;
  af(e, n);
  var r = Ur(e, e === b ? ne : 0);
  if (r === 0) t !== null && bi(t), e.callbackNode = null, e.callbackPriority = 0;
  else if (n = r & -r, e.callbackPriority !== n) {
    if (t != null && bi(t), n === 1) e.tag === 0 ? sd(Qu.bind(null, e)) : sa(Qu.bind(null, e)), ld(function() {
      !(R & 6) && wn();
    }), t = null;
    else {
      switch (Fs(r)) {
        case 1:
          t = ri;
          break;
        case 4:
          t = Is;
          break;
        case 16:
          t = $r;
          break;
        case 536870912:
          t = Os;
          break;
        default:
          t = $r;
      }
      t = ic(t, ba.bind(null, e));
    }
    e.callbackPriority = n, e.callbackNode = t;
  }
}
function ba(e, n) {
  if (Rr = -1, Mr = 0, R & 6) throw Error(g(327));
  var t = e.callbackNode;
  if (et() && e.callbackNode !== t) return null;
  var r = Ur(e, e === b ? ne : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || n) n = rl(e, r);
  else {
    n = r;
    var l = R;
    R |= 2;
    var o = nc();
    (b !== e || ne !== n) && (Be = null, ut = Y() + 500, Ln(e, n));
    do
      try {
        zd();
        break;
      } catch (u) {
        ec(e, u);
      }
    while (!0);
    vi(), el.current = o, R = l, Z !== null ? n = 0 : (b = null, ne = 0, n = G);
  }
  if (n !== 0) {
    if (n === 2 && (l = mo(e), l !== 0 && (r = l, n = Bo(e, l))), n === 1) throw t = Jt, Ln(e, 0), rn(e, r), he(e, Y()), t;
    if (n === 6) rn(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Ld(l) && (n = rl(e, r), n === 2 && (o = mo(e), o !== 0 && (r = o, n = Bo(e, o))), n === 1)) throw t = Jt, Ln(e, 0), rn(e, r), he(e, Y()), t;
      switch (e.finishedWork = l, e.finishedLanes = r, n) {
        case 0:
        case 1:
          throw Error(g(345));
        case 2:
          _n(e, fe, Be);
          break;
        case 3:
          if (rn(e, r), (r & 130023424) === r && (n = Ti + 500 - Y(), 10 < n)) {
            if (Ur(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              se(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = xo(_n.bind(null, e, fe, Be), n);
            break;
          }
          _n(e, fe, Be);
          break;
        case 4:
          if (rn(e, r), (r & 4194240) === r) break;
          for (n = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Me(r);
            o = 1 << i, i = n[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Nd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = xo(_n.bind(null, e, fe, Be), r);
            break;
          }
          _n(e, fe, Be);
          break;
        case 5:
          _n(e, fe, Be);
          break;
        default:
          throw Error(g(329));
      }
    }
  }
  return he(e, Y()), e.callbackNode === t ? ba.bind(null, e) : null;
}
function Bo(e, n) {
  var t = Rt;
  return e.current.memoizedState.isDehydrated && (Ln(e, n).flags |= 256), e = rl(e, n), e !== 2 && (n = fe, fe = t, n !== null && Ao(n)), e;
}
function Ao(e) {
  fe === null ? fe = e : fe.push.apply(fe, e);
}
function Ld(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var t = n.updateQueue;
      if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
        var l = t[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Oe(o(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (t = n.child, n.subtreeFlags & 16384 && t !== null) t.return = n, n = t;
    else {
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return !0;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }
  return !0;
}
function rn(e, n) {
  for (n &= ~ji, n &= ~vl, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
    var t = 31 - Me(n), r = 1 << t;
    e[t] = -1, n &= ~r;
  }
}
function Qu(e) {
  if (R & 6) throw Error(g(327));
  et();
  var n = Ur(e, 0);
  if (!(n & 1)) return he(e, Y()), null;
  var t = rl(e, n);
  if (e.tag !== 0 && t === 2) {
    var r = mo(e);
    r !== 0 && (n = r, t = Bo(e, r));
  }
  if (t === 1) throw t = Jt, Ln(e, 0), rn(e, n), he(e, Y()), t;
  if (t === 6) throw Error(g(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = n, _n(e, fe, Be), he(e, Y()), null;
}
function Ri(e, n) {
  var t = R;
  R |= 1;
  try {
    return e(n);
  } finally {
    R = t, R === 0 && (ut = Y() + 500, dl && wn());
  }
}
function Mn(e) {
  on !== null && on.tag === 0 && !(R & 6) && et();
  var n = R;
  R |= 1;
  var t = Ne.transition, r = D;
  try {
    if (Ne.transition = null, D = 1, e) return e();
  } finally {
    D = r, Ne.transition = t, R = n, !(R & 6) && wn();
  }
}
function Mi() {
  ye = Zn.current, V(Zn);
}
function Ln(e, n) {
  e.finishedWork = null, e.finishedLanes = 0;
  var t = e.timeoutHandle;
  if (t !== -1 && (e.timeoutHandle = -1, rd(t)), Z !== null) for (t = Z.return; t !== null; ) {
    var r = t;
    switch (pi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Wr();
        break;
      case 3:
        ot(), V(pe), V(ie), xi();
        break;
      case 5:
        Si(r);
        break;
      case 4:
        ot();
        break;
      case 13:
        V(B);
        break;
      case 19:
        V(B);
        break;
      case 10:
        yi(r.type._context);
        break;
      case 22:
      case 23:
        Mi();
    }
    t = t.return;
  }
  if (b = e, Z = e = mn(e.current, null), ne = ye = n, G = 0, Jt = null, ji = vl = Rn = 0, fe = Rt = null, Cn !== null) {
    for (n = 0; n < Cn.length; n++) if (t = Cn[n], r = t.interleaved, r !== null) {
      t.interleaved = null;
      var l = r.next, o = t.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      t.pending = r;
    }
    Cn = null;
  }
  return e;
}
function ec(e, n) {
  do {
    var t = Z;
    try {
      if (vi(), zr.current = br, qr) {
        for (var r = A.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        qr = !1;
      }
      if (Tn = 0, q = X = A = null, jt = !1, Zt = 0, zi.current = null, t === null || t.return === null) {
        G = 1, Jt = n, Z = null;
        break;
      }
      e: {
        var o = e, i = t.return, u = t, s = n;
        if (n = ne, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, h = u, m = h.tag;
          if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = h.alternate;
            p ? (h.updateQueue = p.updateQueue, h.memoizedState = p.memoizedState, h.lanes = p.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var w = Ru(i);
          if (w !== null) {
            w.flags &= -257, Mu(w, i, u, o, n), w.mode & 1 && Tu(o, c, n), n = w, s = c;
            var k = n.updateQueue;
            if (k === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(s), n.updateQueue = S;
            } else k.add(s);
            break e;
          } else {
            if (!(n & 1)) {
              Tu(o, c, n), Ii();
              break e;
            }
            s = Error(g(426));
          }
        } else if (H && u.mode & 1) {
          var F = Ru(i);
          if (F !== null) {
            !(F.flags & 65536) && (F.flags |= 256), Mu(F, i, u, o, n), mi(it(s, u));
            break e;
          }
        }
        o = s = it(s, u), G !== 4 && (G = 2), Rt === null ? Rt = [o] : Rt.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, n &= -n, o.lanes |= n;
              var f = Fa(o, s, n);
              Cu(o, f);
              break e;
            case 1:
              u = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (dn === null || !dn.has(d)))) {
                o.flags |= 65536, n &= -n, o.lanes |= n;
                var y = $a(o, u, n);
                Cu(o, y);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      rc(t);
    } catch (_) {
      n = _, Z === t && t !== null && (Z = t = t.return);
      continue;
    }
    break;
  } while (!0);
}
function nc() {
  var e = el.current;
  return el.current = br, e === null ? br : e;
}
function Ii() {
  (G === 0 || G === 3 || G === 2) && (G = 4), b === null || !(Rn & 268435455) && !(vl & 268435455) || rn(b, ne);
}
function rl(e, n) {
  var t = R;
  R |= 2;
  var r = nc();
  (b !== e || ne !== n) && (Be = null, Ln(e, n));
  do
    try {
      Pd();
      break;
    } catch (l) {
      ec(e, l);
    }
  while (!0);
  if (vi(), R = t, el.current = r, Z !== null) throw Error(g(261));
  return b = null, ne = 0, G;
}
function Pd() {
  for (; Z !== null; ) tc(Z);
}
function zd() {
  for (; Z !== null && !bc(); ) tc(Z);
}
function tc(e) {
  var n = oc(e.alternate, e, ye);
  e.memoizedProps = e.pendingProps, n === null ? rc(e) : Z = n, zi.current = null;
}
function rc(e) {
  var n = e;
  do {
    var t = n.alternate;
    if (e = n.return, n.flags & 32768) {
      if (t = xd(t, n), t !== null) {
        t.flags &= 32767, Z = t;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        G = 6, Z = null;
        return;
      }
    } else if (t = Sd(t, n, ye), t !== null) {
      Z = t;
      return;
    }
    if (n = n.sibling, n !== null) {
      Z = n;
      return;
    }
    Z = n = e;
  } while (n !== null);
  G === 0 && (G = 5);
}
function _n(e, n, t) {
  var r = D, l = Ne.transition;
  try {
    Ne.transition = null, D = 1, jd(e, n, t, r);
  } finally {
    Ne.transition = l, D = r;
  }
  return null;
}
function jd(e, n, t, r) {
  do
    et();
  while (on !== null);
  if (R & 6) throw Error(g(327));
  t = e.finishedWork;
  var l = e.finishedLanes;
  if (t === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(g(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = t.lanes | t.childLanes;
  if (cf(e, o), e === b && (Z = b = null, ne = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || kr || (kr = !0, ic($r, function() {
    return et(), null;
  })), o = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || o) {
    o = Ne.transition, Ne.transition = null;
    var i = D;
    D = 1;
    var u = R;
    R |= 4, zi.current = null, Ed(e, t), Ja(t, e), Gf(ko), Vr = !!wo, ko = wo = null, e.current = t, Cd(t), ef(), R = u, D = i, Ne.transition = o;
  } else e.current = t;
  if (kr && (kr = !1, on = e, tl = l), o = e.pendingLanes, o === 0 && (dn = null), rf(t.stateNode), he(e, Y()), n !== null) for (r = e.onRecoverableError, t = 0; t < n.length; t++) l = n[t], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (nl) throw nl = !1, e = Vo, Vo = null, e;
  return tl & 1 && e.tag !== 0 && et(), o = e.pendingLanes, o & 1 ? e === Ho ? Mt++ : (Mt = 0, Ho = e) : Mt = 0, wn(), null;
}
function et() {
  if (on !== null) {
    var e = Fs(tl), n = Ne.transition, t = D;
    try {
      if (Ne.transition = null, D = 16 > e ? 16 : e, on === null) var r = !1;
      else {
        if (e = on, on = null, tl = 0, R & 6) throw Error(g(331));
        var l = R;
        for (R |= 4, E = e.current; E !== null; ) {
          var o = E, i = o.child;
          if (E.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (E = c; E !== null; ) {
                  var h = E;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Tt(8, h, o);
                  }
                  var m = h.child;
                  if (m !== null) m.return = h, E = m;
                  else for (; E !== null; ) {
                    h = E;
                    var p = h.sibling, w = h.return;
                    if (Za(h), h === c) {
                      E = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = w, E = p;
                      break;
                    }
                    E = w;
                  }
                }
              }
              var k = o.alternate;
              if (k !== null) {
                var S = k.child;
                if (S !== null) {
                  k.child = null;
                  do {
                    var F = S.sibling;
                    S.sibling = null, S = F;
                  } while (S !== null);
                }
              }
              E = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, E = i;
          else e: for (; E !== null; ) {
            if (o = E, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Tt(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, E = f;
              break e;
            }
            E = o.return;
          }
        }
        var a = e.current;
        for (E = a; E !== null; ) {
          i = E;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, E = d;
          else e: for (i = a; E !== null; ) {
            if (u = E, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  hl(9, u);
              }
            } catch (_) {
              Q(u, u.return, _);
            }
            if (u === i) {
              E = null;
              break e;
            }
            var y = u.sibling;
            if (y !== null) {
              y.return = u.return, E = y;
              break e;
            }
            E = u.return;
          }
        }
        if (R = l, wn(), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
          Ue.onPostCommitFiberRoot(ul, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      D = t, Ne.transition = n;
    }
  }
  return !1;
}
function Ku(e, n, t) {
  n = it(t, n), n = Fa(e, n, 1), e = fn(e, n, 1), n = se(), e !== null && (bt(e, 1, n), he(e, n));
}
function Q(e, n, t) {
  if (e.tag === 3) Ku(e, e, t);
  else for (; n !== null; ) {
    if (n.tag === 3) {
      Ku(n, e, t);
      break;
    } else if (n.tag === 1) {
      var r = n.stateNode;
      if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (dn === null || !dn.has(r))) {
        e = it(t, e), e = $a(n, e, 1), n = fn(n, e, 1), e = se(), n !== null && (bt(n, 1, e), he(n, e));
        break;
      }
    }
    n = n.return;
  }
}
function Td(e, n, t) {
  var r = e.pingCache;
  r !== null && r.delete(n), n = se(), e.pingedLanes |= e.suspendedLanes & t, b === e && (ne & t) === t && (G === 4 || G === 3 && (ne & 130023424) === ne && 500 > Y() - Ti ? Ln(e, 0) : ji |= t), he(e, n);
}
function lc(e, n) {
  n === 0 && (e.mode & 1 ? (n = cr, cr <<= 1, !(cr & 130023424) && (cr = 4194304)) : n = 1);
  var t = se();
  e = Xe(e, n), e !== null && (bt(e, n, t), he(e, t));
}
function Rd(e) {
  var n = e.memoizedState, t = 0;
  n !== null && (t = n.retryLane), lc(e, t);
}
function Md(e, n) {
  var t = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (t = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(g(314));
  }
  r !== null && r.delete(n), lc(e, t);
}
var oc;
oc = function(e, n, t) {
  if (e !== null) if (e.memoizedProps !== n.pendingProps || pe.current) de = !0;
  else {
    if (!(e.lanes & t) && !(n.flags & 128)) return de = !1, kd(e, n, t);
    de = !!(e.flags & 131072);
  }
  else de = !1, H && n.flags & 1048576 && aa(n, Yr, n.index);
  switch (n.lanes = 0, n.tag) {
    case 2:
      var r = n.type;
      Tr(e, n), e = n.pendingProps;
      var l = tt(n, ie.current);
      bn(n, t), l = Ei(null, n, r, e, l, t);
      var o = Ci();
      return n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, me(r) ? (o = !0, Qr(n)) : o = !1, n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, wi(n), l.updater = ml, n.stateNode = l, l._reactInternals = n, zo(n, r, e, t), n = Ro(null, n, r, !0, o, t)) : (n.tag = 0, H && o && di(n), ue(null, n, l, t), n = n.child), n;
    case 16:
      r = n.elementType;
      e: {
        switch (Tr(e, n), e = n.pendingProps, l = r._init, r = l(r._payload), n.type = r, l = n.tag = Od(r), e = je(r, e), l) {
          case 0:
            n = To(null, n, r, e, t);
            break e;
          case 1:
            n = Du(null, n, r, e, t);
            break e;
          case 11:
            n = Iu(null, n, r, e, t);
            break e;
          case 14:
            n = Ou(null, n, r, je(r.type, e), t);
            break e;
        }
        throw Error(g(
          306,
          r,
          ""
        ));
      }
      return n;
    case 0:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : je(r, l), To(e, n, r, l, t);
    case 1:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : je(r, l), Du(e, n, r, l, t);
    case 3:
      e: {
        if (Ba(n), e === null) throw Error(g(387));
        r = n.pendingProps, o = n.memoizedState, l = o.element, ha(e, n), Gr(n, r, null, t);
        var i = n.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, n.updateQueue.baseState = o, n.memoizedState = o, n.flags & 256) {
          l = it(Error(g(423)), n), n = Fu(e, n, r, t, l);
          break e;
        } else if (r !== l) {
          l = it(Error(g(424)), n), n = Fu(e, n, r, t, l);
          break e;
        } else for (ge = cn(n.stateNode.containerInfo.firstChild), we = n, H = !0, Re = null, t = pa(n, null, r, t), n.child = t; t; ) t.flags = t.flags & -3 | 4096, t = t.sibling;
        else {
          if (rt(), r === l) {
            n = Ge(e, n, t);
            break e;
          }
          ue(e, n, r, t);
        }
        n = n.child;
      }
      return n;
    case 5:
      return va(n), e === null && No(n), r = n.type, l = n.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, So(r, l) ? i = null : o !== null && So(r, o) && (n.flags |= 32), Ha(e, n), ue(e, n, i, t), n.child;
    case 6:
      return e === null && No(n), null;
    case 13:
      return Aa(e, n, t);
    case 4:
      return ki(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = lt(n, null, r, t) : ue(e, n, r, t), n.child;
    case 11:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : je(r, l), Iu(e, n, r, l, t);
    case 7:
      return ue(e, n, n.pendingProps, t), n.child;
    case 8:
      return ue(e, n, n.pendingProps.children, t), n.child;
    case 12:
      return ue(e, n, n.pendingProps.children, t), n.child;
    case 10:
      e: {
        if (r = n.type._context, l = n.pendingProps, o = n.memoizedProps, i = l.value, $(Zr, r._currentValue), r._currentValue = i, o !== null) if (Oe(o.value, i)) {
          if (o.children === l.children && !pe.current) {
            n = Ge(e, n, t);
            break e;
          }
        } else for (o = n.child, o !== null && (o.return = n); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Ke(-1, t & -t), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var h = c.pending;
                    h === null ? s.next = s : (s.next = h.next, h.next = s), c.pending = s;
                  }
                }
                o.lanes |= t, s = o.alternate, s !== null && (s.lanes |= t), Lo(
                  o.return,
                  t,
                  n
                ), u.lanes |= t;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) i = o.type === n.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(g(341));
            i.lanes |= t, u = i.alternate, u !== null && (u.lanes |= t), Lo(i, t, n), i = o.sibling;
          } else i = o.child;
          if (i !== null) i.return = o;
          else for (i = o; i !== null; ) {
            if (i === n) {
              i = null;
              break;
            }
            if (o = i.sibling, o !== null) {
              o.return = i.return, i = o;
              break;
            }
            i = i.return;
          }
          o = i;
        }
        ue(e, n, l.children, t), n = n.child;
      }
      return n;
    case 9:
      return l = n.type, r = n.pendingProps.children, bn(n, t), l = Le(l), r = r(l), n.flags |= 1, ue(e, n, r, t), n.child;
    case 14:
      return r = n.type, l = je(r, n.pendingProps), l = je(r.type, l), Ou(e, n, r, l, t);
    case 15:
      return Ua(e, n, n.type, n.pendingProps, t);
    case 17:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : je(r, l), Tr(e, n), n.tag = 1, me(r) ? (e = !0, Qr(n)) : e = !1, bn(n, t), Da(n, r, l), zo(n, r, l, t), Ro(null, n, r, !0, e, t);
    case 19:
      return Wa(e, n, t);
    case 22:
      return Va(e, n, t);
  }
  throw Error(g(156, n.tag));
};
function ic(e, n) {
  return Ms(e, n);
}
function Id(e, n, t, r) {
  this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ce(e, n, t, r) {
  return new Id(e, n, t, r);
}
function Oi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Od(e) {
  if (typeof e == "function") return Oi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ei) return 11;
    if (e === ni) return 14;
  }
  return 2;
}
function mn(e, n) {
  var t = e.alternate;
  return t === null ? (t = Ce(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 14680064, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
}
function Ir(e, n, t, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Oi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case $n:
      return Pn(t.children, l, o, n);
    case bo:
      i = 8, l |= 8;
      break;
    case ql:
      return e = Ce(12, t, n, l | 2), e.elementType = ql, e.lanes = o, e;
    case bl:
      return e = Ce(13, t, n, l), e.elementType = bl, e.lanes = o, e;
    case eo:
      return e = Ce(19, t, n, l), e.elementType = eo, e.lanes = o, e;
    case vs:
      return yl(t, l, o, n);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ms:
          i = 10;
          break e;
        case hs:
          i = 9;
          break e;
        case ei:
          i = 11;
          break e;
        case ni:
          i = 14;
          break e;
        case en:
          i = 16, r = null;
          break e;
      }
      throw Error(g(130, e == null ? e : typeof e, ""));
  }
  return n = Ce(i, t, n, l), n.elementType = e, n.type = r, n.lanes = o, n;
}
function Pn(e, n, t, r) {
  return e = Ce(7, e, r, n), e.lanes = t, e;
}
function yl(e, n, t, r) {
  return e = Ce(22, e, r, n), e.elementType = vs, e.lanes = t, e.stateNode = { isHidden: !1 }, e;
}
function Xl(e, n, t) {
  return e = Ce(6, e, null, n), e.lanes = t, e;
}
function Gl(e, n, t) {
  return n = Ce(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
}
function Dd(e, n, t, r, l) {
  this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = jl(0), this.expirationTimes = jl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Di(e, n, t, r, l, o, i, u, s) {
  return e = new Dd(e, n, t, u, s), n === 1 ? (n = 1, o === !0 && (n |= 8)) : n = 0, o = Ce(3, null, null, n), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: t, cache: null, transitions: null, pendingSuspenseBoundaries: null }, wi(o), e;
}
function Fd(e, n, t) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Fn, key: r == null ? null : "" + r, children: e, containerInfo: n, implementation: t };
}
function uc(e) {
  if (!e) return vn;
  e = e._reactInternals;
  e: {
    if (On(e) !== e || e.tag !== 1) throw Error(g(170));
    var n = e;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break e;
        case 1:
          if (me(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(g(171));
  }
  if (e.tag === 1) {
    var t = e.type;
    if (me(t)) return ua(e, t, n);
  }
  return n;
}
function sc(e, n, t, r, l, o, i, u, s) {
  return e = Di(t, r, !0, e, l, o, i, u, s), e.context = uc(null), t = e.current, r = se(), l = pn(t), o = Ke(r, l), o.callback = n ?? null, fn(t, o, l), e.current.lanes = l, bt(e, l, r), he(e, r), e;
}
function gl(e, n, t, r) {
  var l = n.current, o = se(), i = pn(l);
  return t = uc(t), n.context === null ? n.context = t : n.pendingContext = t, n = Ke(o, i), n.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (n.callback = r), e = fn(l, n, i), e !== null && (Ie(e, l, i, o), Pr(e, l, i)), i;
}
function ll(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Yu(e, n) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var t = e.retryLane;
    e.retryLane = t !== 0 && t < n ? t : n;
  }
}
function Fi(e, n) {
  Yu(e, n), (e = e.alternate) && Yu(e, n);
}
function $d() {
  return null;
}
var ac = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function $i(e) {
  this._internalRoot = e;
}
wl.prototype.render = $i.prototype.render = function(e) {
  var n = this._internalRoot;
  if (n === null) throw Error(g(409));
  gl(e, n, null, null);
};
wl.prototype.unmount = $i.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var n = e.containerInfo;
    Mn(function() {
      gl(null, e, null, null);
    }), n[Ze] = null;
  }
};
function wl(e) {
  this._internalRoot = e;
}
wl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var n = Vs();
    e = { blockedOn: null, target: e, priority: n };
    for (var t = 0; t < tn.length && n !== 0 && n < tn[t].priority; t++) ;
    tn.splice(t, 0, e), t === 0 && Bs(e);
  }
};
function Ui(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function kl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Zu() {
}
function Ud(e, n, t, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = ll(i);
        o.call(c);
      };
    }
    var i = sc(n, r, e, 0, null, !1, !1, "", Zu);
    return e._reactRootContainer = i, e[Ze] = i.current, At(e.nodeType === 8 ? e.parentNode : e), Mn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = ll(s);
      u.call(c);
    };
  }
  var s = Di(e, 0, !1, null, null, !1, !1, "", Zu);
  return e._reactRootContainer = s, e[Ze] = s.current, At(e.nodeType === 8 ? e.parentNode : e), Mn(function() {
    gl(n, s, t, r);
  }), s;
}
function Sl(e, n, t, r, l) {
  var o = t._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = ll(i);
        u.call(s);
      };
    }
    gl(n, i, e, l);
  } else i = Ud(t, n, e, l, r);
  return ll(i);
}
$s = function(e) {
  switch (e.tag) {
    case 3:
      var n = e.stateNode;
      if (n.current.memoizedState.isDehydrated) {
        var t = _t(n.pendingLanes);
        t !== 0 && (li(n, t | 1), he(n, Y()), !(R & 6) && (ut = Y() + 500, wn()));
      }
      break;
    case 13:
      Mn(function() {
        var r = Xe(e, 1);
        if (r !== null) {
          var l = se();
          Ie(r, e, 1, l);
        }
      }), Fi(e, 1);
  }
};
oi = function(e) {
  if (e.tag === 13) {
    var n = Xe(e, 134217728);
    if (n !== null) {
      var t = se();
      Ie(n, e, 134217728, t);
    }
    Fi(e, 134217728);
  }
};
Us = function(e) {
  if (e.tag === 13) {
    var n = pn(e), t = Xe(e, n);
    if (t !== null) {
      var r = se();
      Ie(t, e, n, r);
    }
    Fi(e, n);
  }
};
Vs = function() {
  return D;
};
Hs = function(e, n) {
  var t = D;
  try {
    return D = e, n();
  } finally {
    D = t;
  }
};
co = function(e, n, t) {
  switch (n) {
    case "input":
      if (ro(e, t), n = t.name, t.type === "radio" && n != null) {
        for (t = e; t.parentNode; ) t = t.parentNode;
        for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++) {
          var r = t[n];
          if (r !== e && r.form === e.form) {
            var l = fl(r);
            if (!l) throw Error(g(90));
            gs(r), ro(r, l);
          }
        }
      }
      break;
    case "textarea":
      ks(e, t);
      break;
    case "select":
      n = t.value, n != null && Xn(e, !!t.multiple, n, !1);
  }
};
Ls = Ri;
Ps = Mn;
var Vd = { usingClientEntryPoint: !1, Events: [nr, Bn, fl, Cs, Ns, Ri] }, kt = { findFiberByHostInstance: En, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Hd = { bundleType: kt.bundleType, version: kt.version, rendererPackageName: kt.rendererPackageName, rendererConfig: kt.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Je.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ts(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: kt.findFiberByHostInstance || $d, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Sr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Sr.isDisabled && Sr.supportsFiber) try {
    ul = Sr.inject(Hd), Ue = Sr;
  } catch {
  }
}
Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vd;
Se.createPortal = function(e, n) {
  var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ui(n)) throw Error(g(200));
  return Fd(e, n, null, t);
};
Se.createRoot = function(e, n) {
  if (!Ui(e)) throw Error(g(299));
  var t = !1, r = "", l = ac;
  return n != null && (n.unstable_strictMode === !0 && (t = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), n = Di(e, 1, !1, null, null, t, !1, r, l), e[Ze] = n.current, At(e.nodeType === 8 ? e.parentNode : e), new $i(n);
};
Se.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var n = e._reactInternals;
  if (n === void 0)
    throw typeof e.render == "function" ? Error(g(188)) : (e = Object.keys(e).join(","), Error(g(268, e)));
  return e = Ts(n), e = e === null ? null : e.stateNode, e;
};
Se.flushSync = function(e) {
  return Mn(e);
};
Se.hydrate = function(e, n, t) {
  if (!kl(n)) throw Error(g(200));
  return Sl(null, e, n, !0, t);
};
Se.hydrateRoot = function(e, n, t) {
  if (!Ui(e)) throw Error(g(405));
  var r = t != null && t.hydratedSources || null, l = !1, o = "", i = ac;
  if (t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), n = sc(n, null, e, 1, t ?? null, l, !1, o, i), e[Ze] = n.current, At(e), r) for (e = 0; e < r.length; e++) t = r[e], l = t._getVersion, l = l(t._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [t, l] : n.mutableSourceEagerHydrationData.push(
    t,
    l
  );
  return new wl(n);
};
Se.render = function(e, n, t) {
  if (!kl(n)) throw Error(g(200));
  return Sl(null, e, n, !1, t);
};
Se.unmountComponentAtNode = function(e) {
  if (!kl(e)) throw Error(g(40));
  return e._reactRootContainer ? (Mn(function() {
    Sl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ze] = null;
    });
  }), !0) : !1;
};
Se.unstable_batchedUpdates = Ri;
Se.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
  if (!kl(t)) throw Error(g(200));
  if (e == null || e._reactInternals === void 0) throw Error(g(38));
  return Sl(e, n, t, !1, r);
};
Se.version = "18.3.1-next-f1338f8080-20240426";
function cc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cc);
    } catch (e) {
      console.error(e);
    }
}
cc(), cs.exports = Se;
var Bd = cs.exports, fc, Xu = Bd;
fc = Xu.createRoot, Xu.hydrateRoot;
function Gu(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 27.5127 27.5127", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M13.7564 6.305C7.42844 6.305 2.29273 8.87285 2.29273 12.0368C2.29273 14.6047 5.66304 16.7713 10.3173 17.505V21.2077L14.9027 16.6223L10.3173 12.0368V15.1664C6.70623 14.5244 4.58545 12.9883 4.58545 12.0368C4.58545 10.8217 8.0704 8.59773 13.7564 8.59773C19.4423 8.59773 22.9273 10.8217 22.9273 12.0368C22.9273 12.8737 21.2536 14.2034 18.3418 14.9371V17.2872C22.3885 16.4045 25.22 14.3869 25.22 12.0368C25.22 8.87285 20.0843 6.305 13.7564 6.305Z" }) });
}
function Ad(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" }) });
}
function Wd(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" }) });
}
function Qd(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 72.9551 72.9551", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M42.7395 32.4954L36.4775 29.638L42.7395 26.7806L45.5969 20.5186L48.4543 26.7806L54.7163 29.638L48.4543 32.4954L45.5969 38.7574L42.7395 32.4954ZM12.1592 44.837L15.0166 38.575L21.2786 35.7176L15.0166 32.8602L12.1592 26.5982L9.30177 32.8602L3.03979 35.7176L9.30177 38.575L12.1592 44.837ZM25.8383 29.638L29.1516 22.3121L36.4775 18.9987L29.1516 15.6853L25.8383 8.35944L22.5249 15.6853L15.199 18.9987L22.5249 22.3121L25.8383 29.638ZM13.6791 64.5956L31.9178 46.3265L44.077 58.4857L69.9153 29.4252L65.6292 25.1391L44.077 49.3663L31.9178 37.2071L9.11938 60.0359L13.6791 64.5956Z" }) });
}
function dc(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 40 40", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M31.6667 10.6833L29.3167 8.33333L20 17.65L10.6833 8.33333L8.33333 10.6833L17.65 20L8.33333 29.3167L10.6833 31.6667L20 22.35L29.3167 31.6667L31.6667 29.3167L22.35 20L31.6667 10.6833Z" }) });
}
function Kd(e) {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 48 48", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: [
    /* @__PURE__ */ v.jsx("path", { d: "M16 16H12V30C12 32.2 13.8 34 16 34H34V30H16V16Z" }),
    /* @__PURE__ */ v.jsx("path", { d: "M40 6H24C21.8 6 20 7.8 20 10V22C20 24.2 21.8 26 24 26H40C42.2 26 44 24.2 44 22V10C44 7.8 42.2 6 40 6ZM40 22H24V14H40V22Z" }),
    /* @__PURE__ */ v.jsx("path", { d: "M8 24H4V38C4 40.2 5.8 42 8 42H26V38H8V24Z" })
  ] });
}
function Yd(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 27.5127 27.5127", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M22.9273 10.2771C22.8814 5.24461 18.8004 1.18649 13.7564 1.18649C8.71236 1.18649 4.63131 5.24461 4.58545 10.2771V17.1553C4.58545 22.2223 8.68944 26.3262 13.7564 26.3262C18.8233 26.3262 22.9273 22.2223 22.9273 17.1553V10.2771ZM20.6345 10.2771H14.9027V3.58239C18.124 4.12118 20.5887 6.90684 20.6345 10.2771ZM12.61 3.58239V10.2771H6.87818C6.92404 6.90684 9.38872 4.12118 12.61 3.58239ZM20.6345 17.1553C20.6345 20.9498 17.5508 24.0335 13.7564 24.0335C9.9619 24.0335 6.87818 20.9498 6.87818 17.1553V12.5699H20.6345V17.1553Z" }) });
}
function pc(e) {
  return /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false", ...e, children: /* @__PURE__ */ v.jsx("path", { d: "M12 6V2L7 7L12 12V8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14H4C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14C20 9.58 16.42 6 12 6Z" }) });
}
const xl = (...e) => e.filter(Boolean).join(" "), ol = M.forwardRef(({
  variant: e = "primary",
  icon: n,
  className: t,
  children: r,
  type: l = "button",
  ...o
}, i) => /* @__PURE__ */ v.jsxs(
  "button",
  {
    ref: i,
    type: l,
    className: xl("wgu-button", `wgu-button--${e}`, t),
    ...o,
    children: [
      /* @__PURE__ */ v.jsx("span", { children: r }),
      n
    ]
  }
));
ol.displayName = "Button";
function Ju({
  label: e,
  className: n,
  children: t,
  type: r = "button",
  ...l
}) {
  return /* @__PURE__ */ v.jsx("button", { type: r, className: xl("wgu-icon-button", n), "aria-label": e, title: e, ...l, children: t });
}
function mc({ name: e, icon: n = /* @__PURE__ */ v.jsx(Kd, {}), variant: t = "plain" }) {
  return /* @__PURE__ */ v.jsxs("div", { className: xl("wgu-interactive-header", t === "chip" && "wgu-interactive-header--chip"), children: [
    n,
    /* @__PURE__ */ v.jsx("span", { className: "wgu-interactive-header__divider" }),
    /* @__PURE__ */ v.jsx("span", { className: "wgu-interactive-header__name wgu-type-h6", children: e })
  ] });
}
function Zd({
  name: e,
  title: n,
  body: t,
  actionLabel: r,
  onLaunch: l,
  disabledReason: o,
  imageUrl: i,
  icon: u,
  actionRef: s
}) {
  return /* @__PURE__ */ v.jsxs("section", { className: "wgu-launch", "aria-label": e, children: [
    /* @__PURE__ */ v.jsxs("div", { className: "wgu-launch__panel", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "wgu-launch__content", children: [
        /* @__PURE__ */ v.jsx(mc, { name: e, icon: u, variant: "chip" }),
        /* @__PURE__ */ v.jsxs("div", { className: "wgu-launch__text", children: [
          /* @__PURE__ */ v.jsx("h3", { className: "wgu-launch__title wgu-type-h5 wgu-clamp", children: n }),
          /* @__PURE__ */ v.jsx("p", { className: "wgu-launch__body wgu-type-body-18-regular wgu-clamp", children: t })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "wgu-launch__action", children: [
        o && /* @__PURE__ */ v.jsx("p", { className: "wgu-launch__note wgu-type-body-16-regular", children: o }),
        /* @__PURE__ */ v.jsx(ol, { ref: s, onClick: l, disabled: !!o, children: r })
      ] })
    ] }),
    i && /* @__PURE__ */ v.jsx("div", { className: "wgu-launch__media", style: { backgroundImage: `url("${i}")` }, role: "presentation" })
  ] });
}
function Xd({
  name: e,
  icon: n,
  actions: t,
  children: r,
  className: l,
  closing: o
}) {
  return /* @__PURE__ */ v.jsxs("div", { className: xl("wgu-shell", o && "is-closing", l), children: [
    /* @__PURE__ */ v.jsxs("div", { className: "wgu-shell__header", children: [
      /* @__PURE__ */ v.jsx(mc, { name: e, icon: n }),
      /* @__PURE__ */ v.jsx("div", { className: "wgu-shell__actions", children: t })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "wgu-shell__body", children: r })
  ] });
}
function Gd(e, n = 220) {
  const [t, r] = M.useState(!1), [l, o] = M.useState(!1), i = M.useRef(!1), u = M.useCallback(() => {
    i.current = !1, o(!1), r(!0);
  }, []), s = M.useCallback(async () => {
    if (i.current)
      return;
    i.current = !0;
    const c = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    n > 0 && !c && (o(!0), await new Promise((h) => {
      window.setTimeout(h, n);
    })), o(!1), r(!1), i.current = !1, e == null || e();
  }, [n, e]);
  return M.useEffect(() => {
    if (!t)
      return;
    const c = (m) => {
      m.key === "Escape" && s();
    }, h = document.body.style.overflow;
    return document.body.style.overflow = "hidden", document.addEventListener("keydown", c), () => {
      document.body.style.overflow = h, document.removeEventListener("keydown", c);
    };
  }, [t, s]), {
    isOpen: t,
    isClosing: l,
    open: u,
    close: s
  };
}
const hc = "wgu_launch";
function Vi() {
  return new URLSearchParams(window.location.search).has(hc);
}
function Jd() {
  return window.parent === window || Vi();
}
function qd() {
  return window.parent !== window && window.location.pathname.startsWith("/xblock/") && !Vi();
}
function bd(e) {
  const n = new URLSearchParams(window.location.search);
  return n.set(hc, "1"), `${window.location.origin}/xblock/${e}?${n.toString()}`;
}
function ep(e, n) {
  window.parent.postMessage({ type: "plugin.videoFullScreen", payload: { open: !0 } }, "*"), window.parent.postMessage({
    type: "plugin.modal",
    payload: {
      url: e,
      title: n,
      isFullscreen: !0,
      // The modal body doesn't give the iframe a height, so "100%" collapses it.
      height: "100vh",
      // Paragon's padding utility: let the interactive reach the window's edges.
      modalBodyClassName: "p-0"
    }
  }, "*");
}
function np() {
  window.parent.postMessage({ type: "plugin.modal-close" }, "*");
}
function tp() {
  const e = document.getElementById("content") ?? document.body;
  window.parent.postMessage({
    type: "plugin.resize",
    payload: { width: e.offsetWidth, height: e.offsetHeight }
  }, "*"), window.setTimeout(() => {
    window.parent.postMessage({ type: "plugin.videoFullScreen", payload: { open: !1 } }, "*");
  }, 150);
}
function rp(e) {
  const n = (t) => {
    var r;
    t.source === window.parent && ((r = t.data) == null ? void 0 : r.type) === "plugin.modal-close" && (tp(), e());
  };
  return window.addEventListener("message", n), () => window.removeEventListener("message", n);
}
function lp(e, n = []) {
  if (n.length === 0 || typeof e.attachShadow != "function")
    return e;
  const t = e.shadowRoot ?? e.attachShadow({ mode: "open" });
  t.replaceChildren();
  const r = document.createElement("style");
  r.textContent = ":host { all: initial; display: block; }", t.append(r), n.forEach((o) => {
    const i = document.createElement("link");
    i.rel = "stylesheet", i.href = o, t.append(i);
  });
  const l = document.createElement("div");
  return t.append(l), l;
}
const Wo = (e) => ({
  cards: e,
  index: 0,
  flipped: !1,
  falling: null,
  pass: 1,
  missed: [],
  got: 0,
  done: e.length === 0
});
function op(e, n) {
  switch (n.type) {
    case "start":
      return Wo(n.cards);
    case "flip":
      return e.done || e.falling ? e : { ...e, flipped: !e.flipped };
    case "answer": {
      if (e.done || e.falling || !e.flipped)
        return e;
      const t = e.cards[e.index];
      return {
        ...e,
        falling: n.answer,
        missed: n.answer === "missed" ? [...e.missed, t] : e.missed,
        got: n.answer === "got" ? e.got + 1 : e.got
      };
    }
    case "fallen": {
      if (!e.falling)
        return e;
      const t = e.index + 1;
      return {
        ...e,
        falling: null,
        flipped: !1,
        index: t,
        done: t >= e.cards.length
      };
    }
    case "practiceMissed":
      return e.missed.length === 0 ? e : { ...Wo(e.missed), pass: e.pass + 1 };
    default:
      return e;
  }
}
function ip(e) {
  return M.useReducer(op, e, Wo);
}
const xr = "Flashcards", up = "Hi! 👋 Let's pause for a quick review. You'll see a term, try to remember what it means, before revealing the answer. Select whether you got it right or wrong, and practice the ones you missed";
function Qo(e) {
  if (!e)
    return "";
  if (typeof document > "u")
    return e;
  const n = document.createElement("div");
  return n.innerHTML = e, (n.textContent || "").replace(/\s+/g, " ").trim();
}
function It({ html: e, className: n }) {
  return /* @__PURE__ */ v.jsx("div", { className: n, dangerouslySetInnerHTML: { __html: e } });
}
function qu({
  card: e,
  number: n,
  total: t,
  flipped: r,
  falling: l,
  showHints: o,
  onFlip: i,
  onAnswer: u,
  onFallen: s,
  frontRef: c,
  backRef: h,
  inert: m
}) {
  const p = [
    "fc-card",
    r && "is-flipped",
    l && `is-falling is-falling--${l}`
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx(
    "div",
    {
      className: p,
      onAnimationEnd: (w) => {
        w.target === w.currentTarget && l && (s == null || s());
      },
      inert: m ? "" : void 0,
      "aria-hidden": m || void 0,
      children: /* @__PURE__ */ v.jsxs("div", { className: "fc-card__inner", children: [
        /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            ref: c,
            className: "fc-card__face fc-card__front",
            onClick: i,
            "aria-hidden": r,
            inert: r ? "" : void 0,
            "aria-label": `Card ${n} of ${t}: ${Qo(e.front)}. Select to reveal the answer.`,
            children: [
              /* @__PURE__ */ v.jsx(Gu, { className: "fc-card__flip-icon" }),
              /* @__PURE__ */ v.jsx(It, { html: e.front, className: "fc-card__term wgu-type-h2 wgu-clamp" }),
              o && /* @__PURE__ */ v.jsxs("span", { className: "fc-card__hint wgu-type-body-18-regular", children: [
                /* @__PURE__ */ v.jsx(Yd, {}),
                "Click to reveal"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: "fc-card__face fc-card__back",
            "aria-hidden": !r,
            inert: r ? void 0 : "",
            children: [
              /* @__PURE__ */ v.jsx(Gu, { className: "fc-card__flip-icon" }),
              /* @__PURE__ */ v.jsxs("div", { className: "fc-card__answer", ref: h, tabIndex: -1, children: [
                /* @__PURE__ */ v.jsx(It, { html: e.front, className: "fc-card__answer-term wgu-type-h4" }),
                /* @__PURE__ */ v.jsx(It, { html: e.back, className: "fc-card__definition wgu-type-body-20-regular wgu-clamp" })
              ] }),
              o && /* @__PURE__ */ v.jsx("p", { className: "fc-card__question wgu-type-body-18-regular", children: "How did you do?" }),
              /* @__PURE__ */ v.jsxs("div", { className: "fc-card__footer", children: [
                /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    type: "button",
                    className: "fc-answer fc-answer--missed wgu-type-body-18-bold",
                    onClick: () => u == null ? void 0 : u("missed"),
                    children: /* @__PURE__ */ v.jsxs("span", { className: "fc-answer__label", children: [
                      /* @__PURE__ */ v.jsx(Ad, {}),
                      "Missed it"
                    ] })
                  }
                ),
                /* @__PURE__ */ v.jsx("span", { className: "fc-card__divider" }),
                /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    type: "button",
                    className: "fc-answer fc-answer--got wgu-type-body-18-bold",
                    onClick: () => u == null ? void 0 : u("got"),
                    children: /* @__PURE__ */ v.jsxs("span", { className: "fc-answer__label", children: [
                      "Got it",
                      /* @__PURE__ */ v.jsx(Wd, {})
                    ] })
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function sp({
  deck: e,
  onPracticeMissed: n,
  onExit: t
}) {
  const r = e.cards.length, l = e.missed.length, o = M.useRef(null);
  M.useEffect(() => {
    var u;
    return (u = o.current) == null ? void 0 : u.focus();
  }, []);
  let i = "Coming back to these in a few days will do more than running them again now";
  return l === 1 ? i = "Another quick pass in that one is all it takes" : l > 1 && (i = `Another quick pass in those ${l} is all it takes`), /* @__PURE__ */ v.jsxs("div", { className: `fc-outcome${l === 0 ? " fc-outcome--all-correct" : ""}`, children: [
    /* @__PURE__ */ v.jsxs("div", { className: "fc-outcome__summary", children: [
      /* @__PURE__ */ v.jsx(Qd, { className: "fc-outcome__icon" }),
      /* @__PURE__ */ v.jsxs("div", { className: "fc-outcome__text", children: [
        /* @__PURE__ */ v.jsx("p", { className: "fc-outcome__score wgu-type-d1", children: `${e.got}/${r}` }),
        /* @__PURE__ */ v.jsx("h3", { className: "fc-outcome__headline wgu-type-h3", ref: o, tabIndex: -1, children: `Well done! You recalled ${e.got} out of ${r} from memory` }),
        /* @__PURE__ */ v.jsx("p", { className: "fc-outcome__advice wgu-type-body-20-regular", children: i })
      ] }),
      l > 0 && /* @__PURE__ */ v.jsx(ol, { variant: "secondary", icon: /* @__PURE__ */ v.jsx(pc, { className: "fc-button-icon" }), onClick: n, children: "Practice what you missed" })
    ] }),
    l > 0 && /* @__PURE__ */ v.jsxs("div", { className: "fc-outcome__missed", children: [
      /* @__PURE__ */ v.jsx("p", { className: "wgu-type-body-18-bold", children: "Here are the ones you marked as missed:" }),
      /* @__PURE__ */ v.jsx("ul", { className: "fc-outcome__list", children: e.missed.map((u, s) => (
        // Cards have no id, and the same text may appear twice.
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ v.jsxs("li", { className: "fc-outcome__item", children: [
          /* @__PURE__ */ v.jsx(It, { html: u.front, className: "fc-outcome__term wgu-type-body-16-bold" }),
          /* @__PURE__ */ v.jsx(It, { html: u.back, className: "wgu-type-body-16-regular" })
        ] }, s)
      )) })
    ] }),
    /* @__PURE__ */ v.jsx(ol, { className: "fc-outcome__exit", icon: /* @__PURE__ */ v.jsx(dc, { className: "fc-button-icon" }), onClick: t, children: "Exit" })
  ] });
}
function ap({
  title: e,
  intro: n = up,
  flashcards: t,
  launchImageUrl: r,
  usageId: l
}) {
  const [o, i] = ip(t), [u, s] = M.useState(""), c = M.useRef(null), h = M.useRef(null), m = M.useRef(null), [p] = M.useState(Vi), [w] = M.useState(() => !!l && qd()), [k] = M.useState(Jd), S = M.useRef(null), F = M.useCallback(() => {
    if (p) {
      np();
      return;
    }
    i({ type: "start", cards: t }), window.setTimeout(() => {
      var O;
      return (O = c.current) == null ? void 0 : O.focus();
    }, 0);
  }, [p, i, t]), {
    isOpen: f,
    isClosing: a,
    open: d,
    close: y
  } = Gd(F), _ = () => y(), N = () => {
    if (w && l) {
      ep(bd(l), `${xr}: ${e}`);
      return;
    }
    i({ type: "start", cards: t }), d();
  };
  M.useEffect(() => {
    p && d();
  }, [p, d]), M.useEffect(() => {
    if (w)
      return rp(() => {
        var O;
        return (O = c.current) == null ? void 0 : O.focus();
      });
  }, [w]);
  const C = o.cards[o.index], L = o.cards[o.index + 1], I = o.cards.length, z = o.got + o.missed.length, ve = o.pass === 1 && o.index === 0, qe = I - o.index, He = M.useRef(!1);
  M.useEffect(() => {
    const O = () => {
      He.current = !0;
    }, x = () => {
      He.current = !1;
    };
    return document.addEventListener("keydown", O, !0), document.addEventListener("pointerdown", x, !0), () => {
      document.removeEventListener("keydown", O, !0), document.removeEventListener("pointerdown", x, !0);
    };
  }, []), M.useEffect(() => {
    var x, P;
    if (!f || o.done || o.falling)
      return;
    const O = { preventScroll: !0, focusVisible: He.current };
    o.flipped ? (x = m.current) == null || x.focus(O) : (P = h.current) == null || P.focus(O);
  }, [f, o.done, o.falling, o.flipped, o.index, o.pass]);
  const ft = M.useMemo(() => {
    if (!f)
      return "";
    if (o.done)
      return `You recalled ${o.got} out of ${I} from memory.`;
    if (!C)
      return "";
    const O = o.flipped ? `Answer. ${Qo(C.back)}` : `Term. ${Qo(C.front)}`;
    return `Card ${o.index + 1} of ${I}. ${O}`;
  }, [f, o.done, o.got, o.flipped, o.index, C, I]);
  M.useEffect(() => {
    s("");
    const O = window.setTimeout(() => s(ft), 0);
    return () => window.clearTimeout(O);
  }, [ft]);
  const _l = (O) => {
    !o.flipped || o.falling || o.done || (O.key === "ArrowLeft" ? (O.preventDefault(), i({ type: "answer", answer: "missed" })) : O.key === "ArrowRight" && (O.preventDefault(), i({ type: "answer", answer: "got" })));
  }, dt = [
    "wgu-ds",
    "fc-modal",
    f && "is-open",
    f && (k ? "wgu-overlay" : "wgu-panel")
  ].filter(Boolean).join(" ");
  return M.useEffect(() => {
    var O;
    f && !k && ((O = S.current) == null || O.scrollIntoView({ behavior: "smooth", block: "center" }));
  }, [f, k]), /* @__PURE__ */ v.jsxs("div", { className: "wgu-ds fc-block", children: [
    !p && !(f && !k) && /* @__PURE__ */ v.jsx(
      Zd,
      {
        name: xr,
        title: e,
        body: n,
        actionLabel: "Launch Interactive",
        onLaunch: N,
        disabledReason: t.length === 0 ? "No cards yet. Add some in Studio." : void 0,
        imageUrl: r,
        actionRef: c
      }
    ),
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        ref: S,
        className: dt,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `${xr}: ${e}`,
        onKeyDown: _l,
        children: [
          /* @__PURE__ */ v.jsx("div", { className: "wgu-visually-hidden", role: "status", "aria-atomic": "true", children: u }),
          f && /* @__PURE__ */ v.jsx(
            Xd,
            {
              name: xr,
              closing: a,
              actions: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
                !o.done && z > 0 && /* @__PURE__ */ v.jsx(Ju, { label: "Start again", onClick: () => i({ type: "start", cards: t }), children: /* @__PURE__ */ v.jsx(pc, {}) }),
                /* @__PURE__ */ v.jsx(Ju, { label: "Close", onClick: _, children: /* @__PURE__ */ v.jsx(dc, {}) })
              ] }),
              children: o.done ? /* @__PURE__ */ v.jsx(
                sp,
                {
                  deck: o,
                  onPracticeMissed: () => i({ type: "practiceMissed" }),
                  onExit: _
                }
              ) : (
                // A new deck (launch, replay, practice) deals its cards in; later cards don't.
                /* @__PURE__ */ v.jsxs("div", { className: `fc-stage${o.index === 0 && z === 0 ? " fc-stage--deal" : ""}`, children: [
                  /* @__PURE__ */ v.jsxs("div", { className: "fc-stack", children: [
                    qe > 2 && /* @__PURE__ */ v.jsx("div", { className: "fc-stack__back fc-stack__back--far" }),
                    qe > 1 && /* @__PURE__ */ v.jsx("div", { className: "fc-stack__back fc-stack__back--near" }),
                    o.falling && L && /* @__PURE__ */ v.jsx(
                      qu,
                      {
                        card: L,
                        number: o.index + 2,
                        total: I,
                        flipped: !1,
                        falling: null,
                        showHints: !1,
                        inert: !0
                      },
                      `${o.pass}-${o.index + 1}`
                    ),
                    C && /* @__PURE__ */ v.jsx(
                      qu,
                      {
                        card: C,
                        number: o.index + 1,
                        total: I,
                        flipped: o.flipped,
                        falling: o.falling,
                        showHints: ve,
                        onFlip: () => i({ type: "flip" }),
                        onAnswer: (O) => i({ type: "answer", answer: O }),
                        onFallen: () => i({ type: "fallen" }),
                        frontRef: h,
                        backRef: m
                      },
                      `${o.pass}-${o.index}`
                    )
                  ] }),
                  /* @__PURE__ */ v.jsx("p", { className: "fc-counter wgu-type-h5", children: `${o.index + 1}/${I}` })
                ] })
              )
            }
          )
        ]
      }
    )
  ] });
}
const cp = (e, {
  title: n,
  intro: t,
  flashcards: r,
  launchImageUrl: l,
  cssUrl: o,
  usageId: i
}) => {
  if (!e)
    return;
  const u = e[0] || e;
  fc(lp(u, o ? [o] : [])).render(
    /* @__PURE__ */ v.jsx(M.StrictMode, { children: /* @__PURE__ */ v.jsx(
      ap,
      {
        title: n,
        intro: t,
        flashcards: r,
        launchImageUrl: l,
        usageId: i
      }
    ) })
  );
};
export {
  cp as renderBlock
};
