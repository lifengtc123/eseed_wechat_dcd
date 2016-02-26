define("biz_web/lib/swfobject.js", [], function(e, t, n) {
try {
var r = +(new Date), i = function() {
function e() {
if (U) return;
try {
var e = M.getElementsByTagName("body")[0].appendChild(g("span"));
e.parentNode.removeChild(e);
} catch (t) {
return;
}
U = !0;
var n = P.length;
for (var r = 0; r < n; r++) P[r]();
}
function t(e) {
U ? e() : P[P.length] = e;
}
function n(e) {
if (typeof O.addEventListener != x) O.addEventListener("load", e, !1); else if (typeof M.addEventListener != x) M.addEventListener("load", e, !1); else if (typeof O.attachEvent != x) y(O, "onload", e); else if (typeof O.onload == "function") {
var t = O.onload;
O.onload = function() {
t(), e();
};
} else O.onload = e;
}
function r() {
D ? s() : o();
}
function s() {
var e = M.getElementsByTagName("body")[0], t = g(T);
t.setAttribute("type", k);
var n = e.appendChild(t);
if (n) {
var r = 0;
(function() {
if (typeof n.GetVariable != x) {
var i = n.GetVariable("$version");
i && (i = i.split(" ")[1].split(","), $.pv = [ parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10) ]);
} else if (r < 10) {
r++, setTimeout(arguments.callee, 10);
return;
}
e.removeChild(t), n = null, o();
})();
} else o();
}
function o() {
var e = H.length;
if (e > 0) for (var t = 0; t < e; t++) {
var n = H[t].id, r = H[t].callbackFn, i = {
success: !1,
id: n
};
if ($.pv[0] > 0) {
var s = m(n);
if (s) if (b(H[t].swfVersion) && !($.wk && $.wk < 312)) E(n, !0), r && (i.success = !0, i.ref = u(n), r(i)); else if (H[t].expressInstall && a()) {
var o = {};
o.data = H[t].expressInstall, o.width = s.getAttribute("width") || "0", o.height = s.getAttribute("height") || "0", s.getAttribute("class") && (o.styleclass = s.getAttribute("class")), s.getAttribute("align") && (o.align = s.getAttribute("align"));
var c = {}, h = s.getElementsByTagName("param"), p = h.length;
for (var d = 0; d < p; d++) h[d].getAttribute("name").toLowerCase() != "movie" && (c[h[d].getAttribute("name")] = h[d].getAttribute("value"));
f(o, c, n, r);
} else l(s), r && r(i);
} else {
E(n, !0);
if (r) {
var v = u(n);
v && typeof v.SetVariable != x && (i.success = !0, i.ref = v), r(i);
}
}
}
}
function u(e) {
var t = null, n = m(e);
if (n && n.nodeName == "OBJECT") if (typeof n.SetVariable != x) t = n; else {
var r = n.getElementsByTagName(T)[0];
r && (t = r);
}
return t;
}
function a() {
return !z && b("6.0.65") && ($.win || $.mac) && !($.wk && $.wk < 312);
}
function f(e, t, n, r) {
z = !0, q = r || null, R = {
success: !1,
id: n
};
var i = m(n);
if (i) {
i.nodeName == "OBJECT" ? (F = c(i), I = null) : (F = i, I = n), e.id = L;
if (typeof e.width == x || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) e.width = "310";
if (typeof e.height == x || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) e.height = "137";
M.title = M.title.slice(0, 47) + " - Flash Player Installation";
var s = $.ie && $.win ? "ActiveX" : "PlugIn", o = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + s + "&MMdoctitle=" + M.title;
typeof t.flashvars != x ? t.flashvars += "&" + o : t.flashvars = o;
if ($.ie && $.win && i.readyState != 4) {
var u = g("div");
n += "SWFObjectNew", u.setAttribute("id", n), i.parentNode.insertBefore(u, i), i.style.display = "none", function() {
i.readyState == 4 ? i.parentNode.removeChild(i) : setTimeout(arguments.callee, 10);
}();
}
h(e, t, n);
}
}
function l(e) {
if ($.ie && $.win && e.readyState != 4) {
var t = g("div");
e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(c(e), t), e.style.display = "none", function() {
e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
}();
} else e.parentNode.replaceChild(c(e), e);
}
function c(e) {
var t = g("div");
if ($.win && $.ie) t.innerHTML = e.innerHTML; else {
var n = e.getElementsByTagName(T)[0];
if (n) {
var r = n.childNodes;
if (r) {
var i = r.length;
for (var s = 0; s < i; s++) (r[s].nodeType != 1 || r[s].nodeName != "PARAM") && r[s].nodeType != 8 && t.appendChild(r[s].cloneNode(!0));
}
}
}
return t;
}
function h(e, t, n) {
var r, i = m(n);
if ($.wk && $.wk < 312) return r;
if (i) {
typeof e.id == x && (e.id = n);
if ($.ie && $.win) {
var s = "";
for (var o in e) e[o] != Object.prototype[o] && (o.toLowerCase() == "data" ? t.movie = e[o] : o.toLowerCase() == "styleclass" ? s += ' class="' + e[o] + '"' : o.toLowerCase() != "classid" && (s += " " + o + '="' + e[o] + '"'));
var u = "";
for (var a in t) t[a] != Object.prototype[a] && (u += '<param name="' + a + '" value="' + t[a] + '" />');
i.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + s + ">" + u + "</object>", B[B.length] = e.id, r = m(e.id);
} else {
var f = g(T);
f.setAttribute("type", k);
for (var l in e) e[l] != Object.prototype[l] && (l.toLowerCase() == "styleclass" ? f.setAttribute("class", e[l]) : l.toLowerCase() != "classid" && f.setAttribute(l, e[l]));
for (var c in t) t[c] != Object.prototype[c] && c.toLowerCase() != "movie" && p(f, c, t[c]);
i.parentNode.replaceChild(f, i), r = f;
}
}
return r;
}
function p(e, t, n) {
var r = g("param");
r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r);
}
function d(e) {
var t = m(e);
t && t.nodeName == "OBJECT" && ($.ie && $.win ? (t.style.display = "none", function() {
t.readyState == 4 ? v(e) : setTimeout(arguments.callee, 10);
}()) : t.parentNode.removeChild(t));
}
function v(e) {
var t = m(e);
if (t) {
for (var n in t) typeof t[n] == "function" && (t[n] = null);
t.parentNode.removeChild(t);
}
}
function m(e) {
var t = null;
try {
t = M.getElementById(e);
} catch (n) {}
return t;
}
function g(e) {
return M.createElement(e);
}
function y(e, t, n) {
e.attachEvent(t, n), j[j.length] = [ e, t, n ];
}
function b(e) {
var t = $.pv, n = e.split(".");
return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1;
}
function w(e, t, n, r) {
if ($.ie && $.mac) return;
var i = M.getElementsByTagName("head")[0];
if (!i) return;
var s = n && typeof n == "string" ? n : "screen";
r && (W = null, X = null);
if (!W || X != s) {
var o = g("style");
o.setAttribute("type", "text/css"), o.setAttribute("media", s), W = i.appendChild(o), $.ie && $.win && typeof M.styleSheets != x && M.styleSheets.length > 0 && (W = M.styleSheets[M.styleSheets.length - 1]), X = s;
}
$.ie && $.win ? W && typeof W.addRule == T && W.addRule(e, t) : W && typeof M.createTextNode != x && W.appendChild(M.createTextNode(e + " {" + t + "}"));
}
function E(e, t) {
if (!V) return;
var n = t ? "visible" : "hidden";
U && m(e) ? m(e).style.visibility = n : w("#" + e, "visibility:" + n);
}
function S(e) {
var t = /[\\\"<>\.;]/, n = t.exec(e) != null;
return n && typeof encodeURIComponent != x ? encodeURIComponent(e) : e;
}
var x = "undefined", T = "object", N = "Shockwave Flash", C = "ShockwaveFlash.ShockwaveFlash", k = "application/x-shockwave-flash", L = "SWFObjectExprInst", A = "onreadystatechange", O = window, M = document, _ = navigator, D = !1, P = [ r ], H = [], B = [], j = [], F, I, q, R, U = !1, z = !1, W, X, V = !0, $ = function() {
var e = typeof M.getElementById != x && typeof M.getElementsByTagName != x && typeof M.createElement != x, t = _.userAgent.toLowerCase(), n = _.platform.toLowerCase(), r = n ? /win/.test(n) : /win/.test(t), i = n ? /mac/.test(n) : /mac/.test(t), s = /webkit/.test(t) ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, o = !1, u = [ 0, 0, 0 ], a = null;
if (typeof _.plugins != x && typeof _.plugins[N] == T) a = _.plugins[N].description, a && (typeof _.mimeTypes == x || !_.mimeTypes[k] || !!_.mimeTypes[k].enabledPlugin) && (D = !0, o = !1, a = a.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), u[0] = parseInt(a.replace(/^(.*)\..*$/, "$1"), 10), u[1] = parseInt(a.replace(/^.*\.(.*)\s.*$/, "$1"), 10), u[2] = /[a-zA-Z]/.test(a) ? parseInt(a.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof O.ActiveXObject != x) try {
var f = new ActiveXObject(C);
f && (a = f.GetVariable("$version"), a && (o = !0, a = a.split(" ")[1].split(","), u = [ parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10) ]));
} catch (l) {}
return {
w3: e,
pv: u,
wk: s,
ie: o,
win: r,
mac: i
};
}(), J = function() {
if (!$.w3) return;
(typeof M.readyState != x && M.readyState == "complete" || typeof M.readyState == x && (M.getElementsByTagName("body")[0] || M.body)) && e(), U || (typeof M.addEventListener != x && M.addEventListener("DOMContentLoaded", e, !1), $.ie && $.win && (M.attachEvent(A, function() {
M.readyState == "complete" && (M.detachEvent(A, arguments.callee), e());
}), O == top && function() {
if (U) return;
try {
M.documentElement.doScroll("left");
} catch (t) {
setTimeout(arguments.callee, 0);
return;
}
e();
}()), $.wk && function() {
if (U) return;
if (!/loaded|complete/.test(M.readyState)) {
setTimeout(arguments.callee, 0);
return;
}
e();
}(), n(e));
}(), K = function() {
$.ie && $.win && window.attachEvent("onunload", function() {
var e = j.length;
for (var t = 0; t < e; t++) j[t][0].detachEvent(j[t][1], j[t][2]);
var n = B.length;
for (var r = 0; r < n; r++) d(B[r]);
for (var s in $) $[s] = null;
$ = null;
for (var o in i) i[o] = null;
i = null;
});
}();
return {
registerObject: function(e, t, n, r) {
if ($.w3 && e && t) {
var i = {};
i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, H[H.length] = i, E(e, !1);
} else r && r({
success: !1,
id: e
});
},
getObjectById: function(e) {
if ($.w3) return u(e);
},
embedSWF: function(e, n, r, i, s, o, u, l, c, p) {
var d = {
success: !1,
id: n
};
$.w3 && !($.wk && $.wk < 312) && e && n && r && i && s ? (E(n, !1), t(function() {
r += "", i += "";
var t = {};
if (c && typeof c === T) for (var v in c) t[v] = c[v];
t.data = e, t.width = r, t.height = i;
var m = {};
if (l && typeof l === T) for (var g in l) m[g] = l[g];
if (u && typeof u === T) for (var y in u) typeof m.flashvars != x ? m.flashvars += "&" + y + "=" + u[y] : m.flashvars = y + "=" + u[y];
if (b(s)) {
var w = h(t, m, n);
t.id == n && E(n, !0), d.success = !0, d.ref = w;
} else {
if (o && a()) {
t.data = o, f(t, m, n, p);
return;
}
E(n, !0);
}
p && p(d);
})) : p && p(d);
},
switchOffAutoHideShow: function() {
V = !1;
},
ua: $,
getFlashPlayerVersion: function() {
return {
major: $.pv[0],
minor: $.pv[1],
release: $.pv[2]
};
},
hasFlashPlayerVersion: b,
createSWF: function(e, t, n) {
return $.w3 ? h(e, t, n) : undefined;
},
showExpressInstall: function(e, t, n, r) {
$.w3 && a() && f(e, t, n, r);
},
removeSWF: function(e) {
$.w3 && d(e);
},
createCSS: function(e, t, n, r) {
$.w3 && w(e, t, n, r);
},
addDomLoadEvent: t,
addLoadEvent: n,
getQueryParamValue: function(e) {
var t = M.location.search || M.location.hash;
if (t) {
/\?/.test(t) && (t = t.split("?")[1]);
if (e == null) return S(t);
var n = t.split("&");
for (var r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return S(n[r].substring(n[r].indexOf("=") + 1));
}
return "";
},
expressInstallCallback: function() {
if (z) {
var e = m(L);
e && F && (e.parentNode.replaceChild(F, e), I && (E(I, !0), $.ie && $.win && (F.style.display = "block")), q && q(R)), z = !1;
}
}
};
}();
return i;
} catch (s) {
wx.jslog({
src: "biz_web/lib/swfobject.js"
}, s);
}
});define("biz_web/lib/video.js", [], function(require, exports, module) {
try {
var report_time_begin = +(new Date);
document.createElement("video"), document.createElement("audio"), document.createElement("track");
var vjs = function(e, t, n) {
var r;
if (typeof e == "string") {
e.indexOf("#") === 0 && (e = e.slice(1));
if (vjs.players[e]) return vjs.players[e];
r = vjs.el(e);
} else r = e;
if (!r || !r.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
return r.player || new vjs.Player(r, t, n);
}, videojs = vjs;
window.videojs = window.vjs = vjs, vjs.CDN_VERSION = "4.1", vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://", vjs.options = {
techOrder: [ "html5", "flash" ],
html5: {},
flash: {},
width: 300,
height: 150,
defaultVolume: 0,
children: {
mediaLoader: {},
posterImage: {},
textTrackDisplay: {},
loadingSpinner: {},
bigPlayButton: {},
controlBar: {}
}
}, vjs.CDN_VERSION !== "GENERATED_CDN_VSN" && (videojs.options.flash.swf = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf"), vjs.players = {}, vjs.CoreObject = vjs.CoreObject = function() {}, vjs.CoreObject.extend = function(e) {
var t, n;
e = e || {}, t = e.init || e.init || this.prototype.init || this.prototype.init || function() {}, n = function() {
t.apply(this, arguments);
}, n.prototype = vjs.obj.create(this.prototype), n.prototype.constructor = n, n.extend = vjs.CoreObject.extend, n.create = vjs.CoreObject.create;
for (var r in e) e.hasOwnProperty(r) && (n.prototype[r] = e[r]);
return n;
}, vjs.CoreObject.create = function() {
var e = vjs.obj.create(this.prototype);
return this.apply(e, arguments), e;
}, vjs.on = function(e, t, n) {
var r = vjs.getData(e);
r.handlers || (r.handlers = {}), r.handlers[t] || (r.handlers[t] = []), n.guid || (n.guid = vjs.guid++), r.handlers[t].push(n), r.dispatcher || (r.disabled = !1, r.dispatcher = function(t) {
if (r.disabled) return;
t = vjs.fixEvent(t);
var n = r.handlers[t.type];
if (n) {
var i = n.slice(0);
for (var s = 0, o = i.length; s < o; s++) {
if (t.isImmediatePropagationStopped()) break;
i[s].call(e, t);
}
}
}), r.handlers[t].length == 1 && (document.addEventListener ? e.addEventListener(t, r.dispatcher, !1) : document.attachEvent && e.attachEvent("on" + t, r.dispatcher));
}, vjs.off = function(e, t, n) {
if (!vjs.hasData(e)) return;
var r = vjs.getData(e);
if (!r.handlers) return;
var i = function(t) {
r.handlers[t] = [], vjs.cleanUpEvents(e, t);
};
if (!t) {
for (var s in r.handlers) i(s);
return;
}
var o = r.handlers[t];
if (!o) return;
if (!n) {
i(t);
return;
}
if (n.guid) for (var u = 0; u < o.length; u++) o[u].guid === n.guid && o.splice(u--, 1);
vjs.cleanUpEvents(e, t);
}, vjs.cleanUpEvents = function(e, t) {
var n = vjs.getData(e);
n.handlers[t].length === 0 && (delete n.handlers[t], document.removeEventListener ? e.removeEventListener(t, n.dispatcher, !1) : document.detachEvent && e.detachEvent("on" + t, n.dispatcher)), vjs.isEmpty(n.handlers) && (delete n.handlers, delete n.dispatcher, delete n.disabled), vjs.isEmpty(n) && vjs.removeData(e);
}, vjs.fixEvent = function(e) {
function t() {
return !0;
}
function n() {
return !1;
}
if (!e || !e.isPropagationStopped) {
var r = e || window.event;
e = {};
for (var i in r) i !== "layerX" && i !== "layerY" && (e[i] = r[i]);
e.target || (e.target = e.srcElement || document), e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement, e.preventDefault = function() {
r.preventDefault && r.preventDefault(), e.returnValue = !1, e.isDefaultPrevented = t;
}, e.isDefaultPrevented = n, e.stopPropagation = function() {
r.stopPropagation && r.stopPropagation(), e.cancelBubble = !0, e.isPropagationStopped = t;
}, e.isPropagationStopped = n, e.stopImmediatePropagation = function() {
r.stopImmediatePropagation && r.stopImmediatePropagation(), e.isImmediatePropagationStopped = t, e.stopPropagation();
}, e.isImmediatePropagationStopped = n;
if (e.clientX != null) {
var s = document.documentElement, o = document.body;
e.pageX = e.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = e.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0);
}
e.which = e.charCode || e.keyCode, e.button != null && (e.button = e.button & 1 ? 0 : e.button & 4 ? 1 : e.button & 2 ? 2 : 0);
}
return e;
}, vjs.trigger = function(e, t) {
var n = vjs.hasData(e) ? vjs.getData(e) : {}, r = e.parentNode || e.ownerDocument;
typeof t == "string" && (t = {
type: t,
target: e
}), t = vjs.fixEvent(t), n.dispatcher && n.dispatcher.call(e, t);
if (r && !t.isPropagationStopped()) vjs.trigger(r, t); else if (!r && !t.isDefaultPrevented()) {
var i = vjs.getData(t.target);
t.target[t.type] && (i.disabled = !0, typeof t.target[t.type] == "function" && t.target[t.type](), i.disabled = !1);
}
return !t.isDefaultPrevented();
}, vjs.one = function(e, t, n) {
vjs.on(e, t, function() {
vjs.off(e, t, arguments.callee), n.apply(this, arguments);
});
};
var hasOwnProp = Object.prototype.hasOwnProperty;
vjs.createEl = function(e, t) {
var n = document.createElement(e || "div");
for (var r in t) hasOwnProp.call(t, r) && (r.indexOf("aria-") !== -1 || r == "role" ? n.setAttribute(r, t[r]) : n[r] = t[r]);
return n;
}, vjs.capitalize = function(e) {
return e.charAt(0).toUpperCase() + e.slice(1);
}, vjs.obj = {}, vjs.obj.create = Object.create || function(e) {
function t() {}
return t.prototype = e, new t;
}, vjs.obj.each = function(e, t, n) {
for (var r in e) hasOwnProp.call(e, r) && t.call(n || this, r, e[r]);
}, vjs.obj.merge = function(e, t) {
if (!t) return e;
for (var n in t) hasOwnProp.call(t, n) && (e[n] = t[n]);
return e;
}, vjs.obj.deepMerge = function(e, t) {
var n, r, i, s;
s = "[object Object]", e = vjs.obj.copy(e);
for (n in t) hasOwnProp.call(t, n) && (r = e[n], i = t[n], vjs.obj.isPlain(r) && vjs.obj.isPlain(i) ? e[n] = vjs.obj.deepMerge(r, i) : e[n] = t[n]);
return e;
}, vjs.obj.copy = function(e) {
return vjs.obj.merge({}, e);
}, vjs.obj.isPlain = function(e) {
return !!e && typeof e == "object" && e.toString() === "[object Object]" && e.constructor === Object;
}, vjs.bind = function(e, t, n) {
t.guid || (t.guid = vjs.guid++);
var r = function() {
return t.apply(e, arguments);
};
return r.guid = n ? n + "_" + t.guid : t.guid, r;
}, vjs.cache = {}, vjs.guid = 1, vjs.expando = "vdata" + (new Date).getTime(), vjs.getData = function(e) {
var t = e[vjs.expando];
return t || (t = e[vjs.expando] = vjs.guid++, vjs.cache[t] = {}), vjs.cache[t];
}, vjs.hasData = function(e) {
var t = e[vjs.expando];
return !!t && !vjs.isEmpty(vjs.cache[t]);
}, vjs.removeData = function(e) {
var t = e[vjs.expando];
if (!t) return;
delete vjs.cache[t];
try {
delete e[vjs.expando];
} catch (n) {
e.removeAttribute ? e.removeAttribute(vjs.expando) : e[vjs.expando] = null;
}
}, vjs.isEmpty = function(e) {
for (var t in e) if (e[t] !== null) return !1;
return !0;
}, vjs.addClass = function(e, t) {
(" " + e.className + " ").indexOf(" " + t + " ") == -1 && (e.className = e.className === "" ? t : e.className + " " + t);
}, vjs.removeClass = function(e, t) {
if (e.className.indexOf(t) == -1) return;
var n = e.className.split(" ");
for (var r = n.length - 1; r >= 0; r--) n[r] === t && n.splice(r, 1);
e.className = n.join(" ");
}, vjs.TEST_VID = vjs.createEl("video"), vjs.USER_AGENT = navigator.userAgent, vjs.IS_IPHONE = /iPhone/i.test(vjs.USER_AGENT), vjs.IS_IPAD = /iPad/i.test(vjs.USER_AGENT), vjs.IS_IPOD = /iPod/i.test(vjs.USER_AGENT), vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD, vjs.IOS_VERSION = function() {
var e = vjs.USER_AGENT.match(/OS (\d+)_/i);
if (e && e[1]) return e[1];
}(), vjs.IS_ANDROID = /Android/i.test(vjs.USER_AGENT), vjs.ANDROID_VERSION = function() {
var e = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i), t, n;
return e ? (t = e[1] && parseFloat(e[1]), n = e[2] && parseFloat(e[2]), t && n ? parseFloat(e[1] + "." + e[2]) : t ? t : null) : null;
}(), vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && /webkit/i.test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3, vjs.IS_FIREFOX = /Firefox/i.test(vjs.USER_AGENT), vjs.IS_CHROME = /Chrome/i.test(vjs.USER_AGENT), vjs.getAttributeValues = function(e) {
var t = {}, n = ",autoplay,controls,loop,muted,default,";
if (e && e.attributes && e.attributes.length > 0) {
var r = e.attributes, i, s;
for (var o = r.length - 1; o >= 0; o--) {
i = r[o].name, s = r[o].value;
if (typeof e[i] == "boolean" || n.indexOf("," + i + ",") !== -1) s = s !== null ? !0 : !1;
t[i] = s;
}
}
return t;
}, vjs.getComputedDimension = function(e, t) {
var n = "";
return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "").getPropertyValue(t) : e.currentStyle && (n = e["client" + t.substr(0, 1).toUpperCase() + t.substr(1)] + "px"), n;
}, vjs.insertFirst = function(e, t) {
t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e);
}, vjs.support = {}, vjs.el = function(e) {
return e.indexOf("#") === 0 && (e = e.slice(1)), document.getElementById(e);
}, vjs.formatTime = function(e, t) {
t = t || e;
var n = Math.floor(e % 60), r = Math.floor(e / 60 % 60), i = Math.floor(e / 3600), s = Math.floor(t / 60 % 60), o = Math.floor(t / 3600);
return i = i > 0 || o > 0 ? i + ":" : "", r = ((i || s >= 10) && r < 10 ? "0" + r : r) + ":", n = n < 10 ? "0" + n : n, i + r + n;
}, vjs.blockTextSelection = function() {
document.body.focus(), document.onselectstart = function() {
return !1;
};
}, vjs.unblockTextSelection = function() {
document.onselectstart = function() {
return !0;
};
}, vjs.trim = function(e) {
return e.toString().replace(/^\s+/, "").replace(/\s+$/, "");
}, vjs.round = function(e, t) {
return t || (t = 0), Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
}, vjs.createTimeRange = function(e, t) {
return {
length: 1,
start: function() {
return e;
},
end: function() {
return t;
}
};
}, vjs.get = function(e, t, n) {
var r = e.indexOf("file:") === 0 || window.location.href.indexOf("file:") === 0 && e.indexOf("http") === -1;
typeof XMLHttpRequest == "undefined" && (window.XMLHttpRequest = function() {
try {
return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
} catch (e) {}
try {
return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
} catch (t) {}
try {
return new window.ActiveXObject("Msxml2.XMLHTTP");
} catch (n) {}
throw new Error("This browser does not support XMLHttpRequest.");
});
var i = new XMLHttpRequest;
try {
i.open("GET", e);
} catch (s) {
n(s);
}
i.onreadystatechange = function() {
i.readyState === 4 && (i.status === 200 || r && i.status === 0 ? t(i.responseText) : n && n());
};
try {
i.send();
} catch (s) {
n && n(s);
}
}, vjs.setLocalStorage = function(e, t) {
try {
var n = window.localStorage || !1;
if (!n) return;
n[e] = t;
} catch (r) {
r.code == 22 || r.code == 1014 ? vjs.log("LocalStorage Full (VideoJS)", r) : r.code == 18 ? vjs.log("LocalStorage not allowed (VideoJS)", r) : vjs.log("LocalStorage Error (VideoJS)", r);
}
}, vjs.getAbsoluteURL = function(e) {
return e.match(/^https?:\/\//) || (e = vjs.createEl("div", {
innerHTML: '<a href="' + e + '">x</a>'
}).firstChild.href), e;
}, vjs.log = function() {
vjs.log.history = vjs.log.history || [], vjs.log.history.push(arguments), window.console && window.console.log(Array.prototype.slice.call(arguments));
}, vjs.findPosition = function(e) {
var t, n, r, i, s, o, u, a, f;
return e.getBoundingClientRect && e.parentNode && (t = e.getBoundingClientRect()), t ? (n = document.documentElement, r = document.body, i = n.clientLeft || r.clientLeft || 0, s = window.pageXOffset || r.scrollLeft, o = t.left + s - i, u = n.clientTop || r.clientTop || 0, a = window.pageYOffset || r.scrollTop, f = t.top + a - u, {
left: o,
top: f
}) : {
left: 0,
top: 0
};
}, vjs.Component = vjs.CoreObject.extend({
init: function(e, t, n) {
this.player_ = e, this.options_ = vjs.obj.copy(this.options_), t = this.options(t), this.id_ = t.id || (t.el && t.el.id ? t.el.id : e.id() + "_component_" + vjs.guid++), this.name_ = t.name || null, this.el_ = t.el || this.createEl(), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, this.initChildren(), this.ready(n);
}
}), vjs.Component.prototype.dispose = function() {
if (this.children_) for (var e = this.children_.length - 1; e >= 0; e--) this.children_[e].dispose && this.children_[e].dispose();
this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), vjs.removeData(this.el_), this.el_ = null;
}, vjs.Component.prototype.player_, vjs.Component.prototype.player = function() {
return this.player_;
}, vjs.Component.prototype.options_, vjs.Component.prototype.options = function(e) {
return e === undefined ? this.options_ : this.options_ = vjs.obj.deepMerge(this.options_, e);
}, vjs.Component.prototype.el_, vjs.Component.prototype.createEl = function(e, t) {
return vjs.createEl(e, t);
}, vjs.Component.prototype.el = function() {
return this.el_;
}, vjs.Component.prototype.contentEl_, vjs.Component.prototype.contentEl = function() {
return this.contentEl_ || this.el_;
}, vjs.Component.prototype.id_, vjs.Component.prototype.id = function() {
return this.id_;
}, vjs.Component.prototype.name_, vjs.Component.prototype.name = function() {
return this.name_;
}, vjs.Component.prototype.children_, vjs.Component.prototype.children = function() {
return this.children_;
}, vjs.Component.prototype.childIndex_, vjs.Component.prototype.getChildById = function(e) {
return this.childIndex_[e];
}, vjs.Component.prototype.childNameIndex_, vjs.Component.prototype.getChild = function(e) {
return this.childNameIndex_[e];
}, vjs.Component.prototype.addChild = function(e, t) {
var n, r, i, s;
return typeof e == "string" ? (i = e, t = t || {}, r = t.componentClass || vjs.capitalize(i), t.name = i, n = new window.videojs[r](this.player_ || this, t)) : n = e, this.children_.push(n), typeof n.id == "function" && (this.childIndex_[n.id()] = n), i = i || n.name && n.name(), i && (this.childNameIndex_[i] = n), typeof n.el == "function" && n.el() && this.contentEl().appendChild(n.el()), n;
}, vjs.Component.prototype.removeChild = function(e) {
typeof e == "string" && (e = this.getChild(e));
if (!e || !this.children_) return;
var t = !1;
for (var n = this.children_.length - 1; n >= 0; n--) if (this.children_[n] === e) {
t = !0, this.children_.splice(n, 1);
break;
}
if (!t) return;
this.childIndex_[e.id] = null, this.childNameIndex_[e.name] = null;
var r = e.el();
r && r.parentNode === this.contentEl() && this.contentEl().removeChild(e.el());
}, vjs.Component.prototype.initChildren = function() {
var e = this.options_;
if (e && e.children) {
var t = this;
vjs.obj.each(e.children, function(e, n) {
if (n === !1) return;
var r = function() {
t[e] = t.addChild(e, n);
};
n.loadEvent || r();
});
}
}, vjs.Component.prototype.buildCSSClass = function() {
return "";
}, vjs.Component.prototype.on = function(e, t) {
return vjs.on(this.el_, e, vjs.bind(this, t)), this;
}, vjs.Component.prototype.off = function(e, t) {
return vjs.off(this.el_, e, t), this;
}, vjs.Component.prototype.one = function(e, t) {
return vjs.one(this.el_, e, vjs.bind(this, t)), this;
}, vjs.Component.prototype.trigger = function(e, t) {
return vjs.trigger(this.el_, e, t), this;
}, vjs.Component.prototype.isReady_, vjs.Component.prototype.isReadyOnInitFinish_ = !0, vjs.Component.prototype.readyQueue_, vjs.Component.prototype.ready = function(e) {
return e && (this.isReady_ ? e.call(this) : (this.readyQueue_ === undefined && (this.readyQueue_ = []), this.readyQueue_.push(e))), this;
}, vjs.Component.prototype.triggerReady = function() {
this.isReady_ = !0;
var e = this.readyQueue_;
if (e && e.length > 0) {
for (var t = 0, n = e.length; t < n; t++) e[t].call(this);
this.readyQueue_ = [], this.trigger("ready");
}
}, vjs.Component.prototype.addClass = function(e) {
return vjs.addClass(this.el_, e), this;
}, vjs.Component.prototype.removeClass = function(e) {
return vjs.removeClass(this.el_, e), this;
}, vjs.Component.prototype.show = function() {
return this.el_.style.display = "block", this;
}, vjs.Component.prototype.hide = function() {
return this.el_.style.display = "none", this;
}, vjs.Component.prototype.fadeIn = function() {
return this.removeClass("vjs-fade-out"), this.addClass("vjs-fade-in"), this;
}, vjs.Component.prototype.fadeOut = function() {
return this.removeClass("vjs-fade-in"), this.addClass("vjs-fade-out"), this;
}, vjs.Component.prototype.lockShowing = function() {
return this.addClass("vjs-lock-showing"), this;
}, vjs.Component.prototype.unlockShowing = function() {
return this.removeClass("vjs-lock-showing"), this;
}, vjs.Component.prototype.disable = function() {
this.hide(), this.show = function() {}, this.fadeIn = function() {};
}, vjs.Component.prototype.width = function(e, t) {
return this.dimension("width", e, t);
}, vjs.Component.prototype.height = function(e, t) {
return this.dimension("height", e, t);
}, vjs.Component.prototype.dimensions = function(e, t) {
return this.width(e, !0).height(t);
}, vjs.Component.prototype.dimension = function(e, t, n) {
if (t !== undefined) return ("" + t).indexOf("%") !== -1 || ("" + t).indexOf("px") !== -1 ? this.el_.style[e] = t : t === "auto" ? this.el_.style[e] = "" : this.el_.style[e] = t + "px", n || this.trigger("resize"), this;
if (!this.el_) return 0;
var r = this.el_.style[e], i = r.indexOf("px");
return i !== -1 ? parseInt(r.slice(0, i), 10) : parseInt(this.el_["offset" + vjs.capitalize(e)], 10);
}, vjs.Button = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
var n = !1;
this.on("touchstart", function() {
n = !0;
}), this.on("touchmove", function() {
n = !1;
});
var r = this;
this.on("touchend", function(e) {
n && r.onClick(e), e.preventDefault(), e.stopPropagation();
}), this.on("click", this.onClick), this.on("focus", this.onFocus), this.on("blur", this.onBlur);
}
}), vjs.Button.prototype.createEl = function(e, t) {
return t = vjs.obj.merge({
className: this.buildCSSClass(),
innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.buttonText || "Need Text") + "</span></div>",
role: "button",
"aria-live": "polite",
tabIndex: 0
}, t), vjs.Component.prototype.createEl.call(this, e, t);
}, vjs.Button.prototype.buildCSSClass = function() {
return "vjs-control " + vjs.Component.prototype.buildCSSClass.call(this);
}, vjs.Button.prototype.onClick = function() {}, vjs.Button.prototype.onFocus = function() {
vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Button.prototype.onKeyPress = function(e) {
if (e.which == 32 || e.which == 13) e.preventDefault(), this.onClick();
}, vjs.Button.prototype.onBlur = function() {
vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Slider = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), this.bar = this.getChild(this.options_.barName), this.handle = this.getChild(this.options_.handleName), e.on(this.playerEvent, vjs.bind(this, this.update)), this.on("mousedown", this.onMouseDown), this.on("touchstart", this.onMouseDown), this.on("focus", this.onFocus), this.on("blur", this.onBlur), this.on("click", this.onClick), this.player_.on("controlsvisible", vjs.bind(this, this.update)), e.ready(vjs.bind(this, this.update)), this.boundEvents = {};
}
}), vjs.Slider.prototype.createEl = function(e, t) {
return t = t || {}, t.className = t.className + " vjs-slider", t = vjs.obj.merge({
role: "slider",
"aria-valuenow": 0,
"aria-valuemin": 0,
"aria-valuemax": 100,
tabIndex: 0
}, t), vjs.Component.prototype.createEl.call(this, e, t);
}, vjs.Slider.prototype.onMouseDown = function(e) {
e.preventDefault(), vjs.blockTextSelection(), this.boundEvents.move = vjs.bind(this, this.onMouseMove), this.boundEvents.end = vjs.bind(this, this.onMouseUp), vjs.on(document, "mousemove", this.boundEvents.move), vjs.on(document, "mouseup", this.boundEvents.end), vjs.on(document, "touchmove", this.boundEvents.move), vjs.on(document, "touchend", this.boundEvents.end), this.onMouseMove(e);
}, vjs.Slider.prototype.onMouseUp = function() {
vjs.unblockTextSelection(), vjs.off(document, "mousemove", this.boundEvents.move, !1), vjs.off(document, "mouseup", this.boundEvents.end, !1), vjs.off(document, "touchmove", this.boundEvents.move, !1), vjs.off(document, "touchend", this.boundEvents.end, !1), this.update();
}, vjs.Slider.prototype.update = function() {
if (!this.el_) return;
var e, t = this.getPercent(), n = this.handle, r = this.bar;
isNaN(t) && (t = 0), e = t;
if (n) {
var i = this.el_, s = i.offsetWidth, o = n.el().offsetWidth, u = o ? o / s : 0, a = 1 - u, f = t * a;
e = f + u / 2, n.el().style.left = vjs.round(f * 100, 2) + "%";
}
r.el().style.width = vjs.round(e * 100, 2) + "%";
}, vjs.Slider.prototype.calculateDistance = function(e) {
var t, n, r, i, s, o, u, a, f;
t = this.el_, n = vjs.findPosition(t), s = o = t.offsetWidth, u = this.handle;
if (this.options_.vertical) {
i = n.top, e.changedTouches ? f = e.changedTouches[0].pageY : f = e.pageY;
if (u) {
var l = u.el().offsetHeight;
i += l / 2, o -= l;
}
return Math.max(0, Math.min(1, (i - f + o) / o));
}
r = n.left, e.changedTouches ? a = e.changedTouches[0].pageX : a = e.pageX;
if (u) {
var c = u.el().offsetWidth;
r += c / 2, s -= c;
}
return Math.max(0, Math.min(1, (a - r) / s));
}, vjs.Slider.prototype.onFocus = function() {
vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Slider.prototype.onKeyPress = function(e) {
e.which == 37 ? (e.preventDefault(), this.stepBack()) : e.which == 39 && (e.preventDefault(), this.stepForward());
}, vjs.Slider.prototype.onBlur = function() {
vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Slider.prototype.onClick = function(e) {
e.stopImmediatePropagation(), e.preventDefault();
}, vjs.SliderHandle = vjs.Component.extend(), vjs.SliderHandle.prototype.defaultValue = 0, vjs.SliderHandle.prototype.createEl = function(e, t) {
return t = t || {}, t.className = t.className + " vjs-slider-handle", t = vjs.obj.merge({
innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
}, t), vjs.Component.prototype.createEl.call(this, "div", t);
}, vjs.Menu = vjs.Component.extend(), vjs.Menu.prototype.addItem = function(e) {
this.addChild(e), e.on("click", vjs.bind(this, function() {
this.unlockShowing();
}));
}, vjs.Menu.prototype.createEl = function() {
var e = this.options().contentElType || "ul";
this.contentEl_ = vjs.createEl(e, {
className: "vjs-menu-content"
});
var t = vjs.Component.prototype.createEl.call(this, "div", {
append: this.contentEl_,
className: "vjs-menu"
});
return t.appendChild(this.contentEl_), vjs.on(t, "click", function(e) {
e.preventDefault(), e.stopImmediatePropagation();
}), t;
}, vjs.MenuItem = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), this.selected(t.selected);
}
}), vjs.MenuItem.prototype.createEl = function(e, t) {
return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({
className: "vjs-menu-item",
innerHTML: this.options_.label
}, t));
}, vjs.MenuItem.prototype.onClick = function() {
this.selected(!0);
}, vjs.MenuItem.prototype.selected = function(e) {
e ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-selected", !0)) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-selected", !1));
}, vjs.MenuButton = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), this.menu = this.createMenu(), this.addChild(this.menu), this.items && this.items.length === 0 && this.hide(), this.on("keyup", this.onKeyPress), this.el_.setAttribute("aria-haspopup", !0), this.el_.setAttribute("role", "button");
}
}), vjs.MenuButton.prototype.buttonPressed_ = !1, vjs.MenuButton.prototype.createMenu = function() {
var e = new vjs.Menu(this.player_);
this.options().title && e.el().appendChild(vjs.createEl("li", {
className: "vjs-menu-title",
innerHTML: vjs.capitalize(this.kind_),
tabindex: -1
})), this.items = this.createItems();
if (this.items) for (var t = 0; t < this.items.length; t++) e.addItem(this.items[t]);
return e;
}, vjs.MenuButton.prototype.createItems = function() {}, vjs.MenuButton.prototype.buildCSSClass = function() {
return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this);
}, vjs.MenuButton.prototype.onFocus = function() {}, vjs.MenuButton.prototype.onBlur = function() {}, vjs.MenuButton.prototype.onClick = function() {
this.one("mouseout", vjs.bind(this, function() {
this.menu.unlockShowing(), this.el_.blur();
})), this.buttonPressed_ ? this.unpressButton() : this.pressButton();
}, vjs.MenuButton.prototype.onKeyPress = function(e) {
e.preventDefault(), e.which == 32 || e.which == 13 ? this.buttonPressed_ ? this.unpressButton() : this.pressButton() : e.which == 27 && this.buttonPressed_ && this.unpressButton();
}, vjs.MenuButton.prototype.pressButton = function() {
this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-pressed", !0), this.items && this.items.length > 0 && this.items[0].el().focus();
}, vjs.MenuButton.prototype.unpressButton = function() {
this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-pressed", !1);
}, vjs.Player = vjs.Component.extend({
init: function(e, t, n) {
this.tag = e, t = vjs.obj.merge(this.getTagSettings(e), t), this.cache_ = {}, this.poster_ = t.poster, this.controls_ = t.controls, t.customControlsOnMobile !== !0 && (vjs.IS_IOS || vjs.IS_ANDROID) ? (e.controls = t.controls, this.controls_ = !1) : e.controls = !1, vjs.Component.call(this, this, t, n), this.one("play", function(e) {
var t = {
type: "firstplay",
target: this.el_
}, n = vjs.trigger(this.el_, t);
n || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
}), this.on("ended", this.onEnded), this.on("play", this.onPlay), this.on("firstplay", this.onFirstPlay), this.on("pause", this.onPause), this.on("progress", this.onProgress), this.on("durationchange", this.onDurationChange), this.on("error", this.onError), this.on("fullscreenchange", this.onFullscreenChange), vjs.players[this.id_] = this, t.plugins && vjs.obj.each(t.plugins, function(e, t) {
this[e](t);
}, this);
}
}), vjs.Player.prototype.options_ = vjs.options, vjs.Player.prototype.dispose = function() {
vjs.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.stopTrackingProgress(), this.stopTrackingCurrentTime(), this.tech && this.tech.dispose(), vjs.Component.prototype.dispose.call(this);
}, vjs.Player.prototype.getTagSettings = function(e) {
var t = {
sources: [],
tracks: []
};
vjs.obj.merge(t, vjs.getAttributeValues(e));
if (e.hasChildNodes()) {
var n, r, i, s, o;
n = e.childNodes;
for (s = 0, o = n.length; s < o; s++) r = n[s], i = r.nodeName.toLowerCase(), i === "source" ? t.sources.push(vjs.getAttributeValues(r)) : i === "track" && t.tracks.push(vjs.getAttributeValues(r));
}
return t;
}, vjs.Player.prototype.createEl = function() {
var e = this.el_ = vjs.Component.prototype.createEl.call(this, "div"), t = this.tag;
t.removeAttribute("width"), t.removeAttribute("height");
if (t.hasChildNodes()) {
var n, r, i, s, o, u;
n = t.childNodes, r = n.length, u = [];
while (r--) s = n[r], o = s.nodeName.toLowerCase(), (o === "source" || o === "track") && u.push(s);
for (i = 0; i < u.length; i++) t.removeChild(u[i]);
}
return t.id = t.id || "vjs_video_" + vjs.guid++, e.id = t.id, e.className = t.className, t.id += "_html5_api", t.className = "vjs-tech", t.player = e.player = this, this.addClass("vjs-paused"), this.width(this.options_.width, !0), this.height(this.options_.height, !0), t.parentNode && t.parentNode.insertBefore(e, t), vjs.insertFirst(t, e), e;
}, vjs.Player.prototype.loadTech = function(e, t) {
this.tech ? this.unloadTech() : e !== "Html5" && this.tag && (this.el_.removeChild(this.tag), this.tag.player = null, this.tag = null), this.techName = e, this.isReady_ = !1;
var n = function() {
this.player_.triggerReady(), this.features.progressEvents || this.player_.manualProgressOn(), this.features.timeupdateEvents || this.player_.manualTimeUpdatesOn();
}, r = vjs.obj.merge({
source: t,
parentEl: this.el_
}, this.options_[e.toLowerCase()]);
t && (t.src == this.cache_.src && this.cache_.currentTime > 0 && (r.startTime = this.cache_.currentTime), this.cache_.src = t.src), this.tech = new window.videojs[e](this, r), this.tech.ready(n);
}, vjs.Player.prototype.unloadTech = function() {
this.isReady_ = !1, this.tech.dispose(), this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), this.tech = !1;
}, vjs.Player.prototype.manualProgressOn = function() {
this.manualProgress = !0, this.trackProgress(), this.tech.one("progress", function() {
this.features.progressEvents = !0, this.player_.manualProgressOff();
});
}, vjs.Player.prototype.manualProgressOff = function() {
this.manualProgress = !1, this.stopTrackingProgress();
}, vjs.Player.prototype.trackProgress = function() {
this.progressInterval = setInterval(vjs.bind(this, function() {
this.cache_.bufferEnd < this.buffered().end(0) ? this.trigger("progress") : this.bufferedPercent() == 1 && (this.stopTrackingProgress(), this.trigger("progress"));
}), 500);
}, vjs.Player.prototype.stopTrackingProgress = function() {
clearInterval(this.progressInterval);
}, vjs.Player.prototype.manualTimeUpdatesOn = function() {
this.manualTimeUpdates = !0, this.on("play", this.trackCurrentTime), this.on("pause", this.stopTrackingCurrentTime), this.tech.one("timeupdate", function() {
this.features.timeupdateEvents = !0, this.player_.manualTimeUpdatesOff();
});
}, vjs.Player.prototype.manualTimeUpdatesOff = function() {
this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off("play", this.trackCurrentTime), this.off("pause", this.stopTrackingCurrentTime);
}, vjs.Player.prototype.trackCurrentTime = function() {
this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = setInterval(vjs.bind(this, function() {
this.trigger("timeupdate");
}), 250);
}, vjs.Player.prototype.stopTrackingCurrentTime = function() {
clearInterval(this.currentTimeInterval);
}, vjs.Player.prototype.onEnded = function() {
this.options_.loop && (this.currentTime(0), this.play());
}, vjs.Player.prototype.onPlay = function() {
vjs.removeClass(this.el_, "vjs-paused"), vjs.addClass(this.el_, "vjs-playing");
}, vjs.Player.prototype.onFirstPlay = function() {
this.options_.starttime && this.currentTime(this.options_.starttime);
}, vjs.Player.prototype.onPause = function() {
vjs.removeClass(this.el_, "vjs-playing"), vjs.addClass(this.el_, "vjs-paused");
}, vjs.Player.prototype.onProgress = function() {
this.bufferedPercent() == 1 && this.trigger("loadedalldata");
}, vjs.Player.prototype.onDurationChange = function() {
this.duration(this.techGet("duration"));
}, vjs.Player.prototype.onError = function(e) {
vjs.log("Video Error", e);
}, vjs.Player.prototype.onFullscreenChange = function() {
this.isFullScreen ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen");
}, vjs.Player.prototype.cache_, vjs.Player.prototype.getCache = function() {
return this.cache_;
}, vjs.Player.prototype.techCall = function(e, t) {
if (this.tech && !this.tech.isReady_) this.tech.ready(function() {
this[e](t);
}); else try {
this.tech[e](t);
} catch (n) {
throw vjs.log(n), n;
}
}, vjs.Player.prototype.techGet = function(e) {
if (this.tech.isReady_) try {
return this.tech[e]();
} catch (t) {
throw this.tech[e] === undefined ? vjs.log("Video.js: " + e + " method not defined for " + this.techName + " playback technology.", t) : t.name == "TypeError" ? (vjs.log("Video.js: " + e + " unavailable on " + this.techName + " playback technology element.", t), this.tech.isReady_ = !1) : vjs.log(t), t;
}
return;
}, vjs.Player.prototype.play = function() {
return this.techCall("play"), this;
}, vjs.Player.prototype.pause = function() {
return this.techCall("pause"), this;
}, vjs.Player.prototype.paused = function() {
return this.techGet("paused") === !1 ? !1 : !0;
}, vjs.Player.prototype.currentTime = function(e) {
return e !== undefined ? (this.cache_.lastSetCurrentTime = e, this.techCall("setCurrentTime", e), this.manualTimeUpdates && this.trigger("timeupdate"), this) : this.cache_.currentTime = this.techGet("currentTime") || 0;
}, vjs.Player.prototype.duration = function(e) {
return e !== undefined ? (this.cache_.duration = parseFloat(e), this) : this.cache_.duration;
}, vjs.Player.prototype.remainingTime = function() {
return this.duration() - this.currentTime();
}, vjs.Player.prototype.buffered = function() {
var e = this.techGet("buffered"), t = 0, n = this.cache_.bufferEnd = this.cache_.bufferEnd || 0;
return e && e.length > 0 && e.end(0) !== n && (n = e.end(0), this.cache_.bufferEnd = n), vjs.createTimeRange(t, n);
}, vjs.Player.prototype.bufferedPercent = function() {
return this.duration() ? this.buffered().end(0) / this.duration() : 0;
}, vjs.Player.prototype.volume = function(e) {
var t;
return e !== undefined ? (t = Math.max(0, Math.min(1, parseFloat(e))), this.cache_.volume = t, this.techCall("setVolume", t), vjs.setLocalStorage("volume", t), this) : (t = parseFloat(this.techGet("volume")), isNaN(t) ? 1 : t);
}, vjs.Player.prototype.muted = function(e) {
return e !== undefined ? (this.techCall("setMuted", e), this) : this.techGet("muted") || !1;
}, vjs.Player.prototype.supportsFullScreen = function() {
return this.techGet("supportsFullScreen") || !1;
}, vjs.Player.prototype.requestFullScreen = function() {
var e = vjs.support.requestFullScreen;
return this.isFullScreen = !0, e ? (vjs.on(document, e.eventName, vjs.bind(this, function(t) {
this.isFullScreen = document[e.isFullScreen], this.isFullScreen === !1 && vjs.off(document, e.eventName, arguments.callee), this.trigger("fullscreenchange");
})), this.el_[e.requestFn]()) : this.tech.supportsFullScreen() ? this.techCall("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this;
}, vjs.Player.prototype.cancelFullScreen = function() {
var e = vjs.support.requestFullScreen;
return this.isFullScreen = !1, e ? document[e.cancelFn]() : this.tech.supportsFullScreen() ? this.techCall("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this;
}, vjs.Player.prototype.enterFullWindow = function() {
this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, vjs.on(document, "keydown", vjs.bind(this, this.fullWindowOnEscKey)), document.documentElement.style.overflow = "hidden", vjs.addClass(document.body, "vjs-full-window"), this.trigger("enterFullWindow");
}, vjs.Player.prototype.fullWindowOnEscKey = function(e) {
e.keyCode === 27 && (this.isFullScreen === !0 ? this.cancelFullScreen() : this.exitFullWindow());
}, vjs.Player.prototype.exitFullWindow = function() {
this.isFullWindow = !1, vjs.off(document, "keydown", this.fullWindowOnEscKey), document.documentElement.style.overflow = this.docOrigOverflow, vjs.removeClass(document.body, "vjs-full-window"), this.trigger("exitFullWindow");
}, vjs.Player.prototype.selectSource = function(e) {
for (var t = 0, n = this.options_.techOrder; t < n.length; t++) {
var r = vjs.capitalize(n[t]), i = window.videojs[r];
if (i.isSupported()) for (var s = 0, o = e; s < o.length; s++) {
var u = o[s];
if (i.canPlaySource(u)) return {
source: u,
tech: r
};
}
}
return !1;
}, vjs.Player.prototype.src = function(e) {
if (e instanceof Array) {
var t = this.selectSource(e), n;
t ? (e = t.source, n = t.tech, n == this.techName ? this.src(e) : this.loadTech(n, e)) : this.el_.appendChild(vjs.createEl("p", {
innerHTML: 'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
}));
} else e instanceof Object ? window.videojs[this.techName].canPlaySource(e) ? this.src(e.src) : this.src([ e ]) : (this.cache_.src = e, this.isReady_ ? (this.techCall("src", e), this.options_["preload"] == "auto" && this.load(), this.options_.autoplay && this.play()) : this.ready(function() {
this.src(e);
}));
return this;
}, vjs.Player.prototype.load = function() {
return this.techCall("load"), this;
}, vjs.Player.prototype.currentSrc = function() {
return this.techGet("currentSrc") || this.cache_.src || "";
}, vjs.Player.prototype.preload = function(e) {
return e !== undefined ? (this.techCall("setPreload", e), this.options_.preload = e, this) : this.techGet("preload");
}, vjs.Player.prototype.autoplay = function(e) {
return e !== undefined ? (this.techCall("setAutoplay", e), this.options_.autoplay = e, this) : this.techGet("autoplay", e);
}, vjs.Player.prototype.loop = function(e) {
return e !== undefined ? (this.techCall("setLoop", e), this.options_.loop = e, this) : this.techGet("loop");
}, vjs.Player.prototype.poster_, vjs.Player.prototype.poster = function(e) {
return e !== undefined && (this.poster_ = e), this.poster_;
}, vjs.Player.prototype.controls_, vjs.Player.prototype.controls = function(e) {
return e !== undefined && this.controls_ !== e && (this.controls_ = !!e, this.trigger("controlschange")), this.controls_;
}, vjs.Player.prototype.error = function() {
return this.techGet("error");
}, vjs.Player.prototype.ended = function() {
return this.techGet("ended");
}, function() {
var e, t, n;
n = document.createElement("div"), t = {}, n.cancelFullscreen !== undefined ? (t.requestFn = "requestFullscreen", t.cancelFn = "exitFullscreen", t.eventName = "fullscreenchange", t.isFullScreen = "fullScreen") : (document.mozCancelFullScreen ? (e = "moz", t.isFullScreen = e + "FullScreen") : (e = "webkit", t.isFullScreen = e + "IsFullScreen"), n[e + "RequestFullScreen"] && (t.requestFn = e + "RequestFullScreen", t.cancelFn = e + "CancelFullScreen"), t.eventName = e + "fullscreenchange"), document[t.cancelFn] && (vjs.support.requestFullScreen = t);
}(), vjs.ControlBar = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.controls() || this.disable(), e.one("play", vjs.bind(this, function() {
var e, t = vjs.bind(this, this.fadeIn), n = vjs.bind(this, this.fadeOut);
this.fadeIn(), "ontouchstart" in window || (this.player_.on("mouseover", t), this.player_.on("mouseout", n), this.player_.on("pause", vjs.bind(this, this.lockShowing)), this.player_.on("play", vjs.bind(this, this.unlockShowing))), e = !1, this.player_.on("touchstart", function() {
e = !0;
}), this.player_.on("touchmove", function() {
e = !1;
}), this.player_.on("touchend", vjs.bind(this, function(t) {
var n;
e && (n = this.el().className.search("fade-in"), n !== -1 ? this.fadeOut() : this.fadeIn()), e = !1, this.player_.paused() || t.preventDefault();
}));
}));
}
}), vjs.ControlBar.prototype.options_ = {
loadEvent: "play",
children: {
playToggle: {},
currentTimeDisplay: {},
timeDivider: {},
durationDisplay: {},
remainingTimeDisplay: {},
progressControl: {},
fullscreenToggle: {},
volumeControl: {},
muteToggle: {}
}
}, vjs.ControlBar.prototype.createEl = function() {
return vjs.createEl("div", {
className: "vjs-control-bar"
});
}, vjs.ControlBar.prototype.fadeIn = function() {
vjs.Component.prototype.fadeIn.call(this), this.player_.trigger("controlsvisible");
}, vjs.ControlBar.prototype.fadeOut = function() {
vjs.Component.prototype.fadeOut.call(this), this.player_.trigger("controlshidden");
}, vjs.PlayToggle = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), e.on("play", vjs.bind(this, this.onPlay)), e.on("pause", vjs.bind(this, this.onPause));
}
}), vjs.PlayToggle.prototype.buttonText = "Play", vjs.PlayToggle.prototype.buildCSSClass = function() {
return "vjs-play-control " + vjs.Button.prototype.buildCSSClass.call(this);
}, vjs.PlayToggle.prototype.onClick = function() {
this.player_.paused() ? this.player_.play() : this.player_.pause();
}, vjs.PlayToggle.prototype.onPlay = function() {
vjs.removeClass(this.el_, "vjs-paused"), vjs.addClass(this.el_, "vjs-playing"), this.el_.children[0].children[0].innerHTML = "Pause";
}, vjs.PlayToggle.prototype.onPause = function() {
vjs.removeClass(this.el_, "vjs-playing"), vjs.addClass(this.el_, "vjs-paused"), this.el_.children[0].children[0].innerHTML = "Play";
}, vjs.CurrentTimeDisplay = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateContent));
}
}), vjs.CurrentTimeDisplay.prototype.createEl = function() {
var e = vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-current-time vjs-time-controls vjs-control"
});
return this.content = vjs.createEl("div", {
className: "vjs-current-time-display",
innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
"aria-live": "off"
}), e.appendChild(vjs.createEl("div").appendChild(this.content)), e;
}, vjs.CurrentTimeDisplay.prototype.updateContent = function() {
var e = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + vjs.formatTime(e, this.player_.duration());
}, vjs.DurationDisplay = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateContent));
}
}), vjs.DurationDisplay.prototype.createEl = function() {
var e = vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-duration vjs-time-controls vjs-control"
});
return this.content = vjs.createEl("div", {
className: "vjs-duration-display",
innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
"aria-live": "off"
}), e.appendChild(vjs.createEl("div").appendChild(this.content)), e;
}, vjs.DurationDisplay.prototype.updateContent = function() {
this.player_.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + vjs.formatTime(this.player_.duration()));
}, vjs.TimeDivider = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.TimeDivider.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-time-divider",
innerHTML: "<div><span>/</span></div>"
});
}, vjs.RemainingTimeDisplay = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateContent));
}
}), vjs.RemainingTimeDisplay.prototype.createEl = function() {
var e = vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-remaining-time vjs-time-controls vjs-control"
});
return this.content = vjs.createEl("div", {
className: "vjs-remaining-time-display",
innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
"aria-live": "off"
}), e.appendChild(vjs.createEl("div").appendChild(this.content)), e;
}, vjs.RemainingTimeDisplay.prototype.updateContent = function() {
this.player_.duration() && this.player_.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + vjs.formatTime(this.player_.remainingTime()));
}, vjs.FullscreenToggle = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t);
}
}), vjs.FullscreenToggle.prototype.buttonText = "Fullscreen", vjs.FullscreenToggle.prototype.buildCSSClass = function() {
return "vjs-fullscreen-control " + vjs.Button.prototype.buildCSSClass.call(this);
}, vjs.FullscreenToggle.prototype.onClick = function() {
this.player_.isFullScreen ? (this.player_.cancelFullScreen(), this.el_.children[0].children[0].innerHTML = "Fullscreen") : (this.player_.requestFullScreen(), this.el_.children[0].children[0].innerHTML = "Non-Fullscreen");
}, vjs.ProgressControl = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.ProgressControl.prototype.options_ = {
children: {
seekBar: {}
}
}, vjs.ProgressControl.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-progress-control vjs-control"
});
}, vjs.SeekBar = vjs.Slider.extend({
init: function(e, t) {
vjs.Slider.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateARIAAttributes)), e.ready(vjs.bind(this, this.updateARIAAttributes));
}
}), vjs.SeekBar.prototype.options_ = {
children: {
loadProgressBar: {},
playProgressBar: {},
seekHandle: {}
},
barName: "playProgressBar",
handleName: "seekHandle"
}, vjs.SeekBar.prototype.playerEvent = "timeupdate", vjs.SeekBar.prototype.createEl = function() {
return vjs.Slider.prototype.createEl.call(this, "div", {
className: "vjs-progress-holder",
"aria-label": "video progress bar"
});
}, vjs.SeekBar.prototype.updateARIAAttributes = function() {
var e = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
this.el_.setAttribute("aria-valuenow", vjs.round(this.getPercent() * 100, 2)), this.el_.setAttribute("aria-valuetext", vjs.formatTime(e, this.player_.duration()));
}, vjs.SeekBar.prototype.getPercent = function() {
return this.player_.currentTime() / this.player_.duration();
}, vjs.SeekBar.prototype.onMouseDown = function(e) {
vjs.Slider.prototype.onMouseDown.call(this, e), this.player_.scrubbing = !0, this.videoWasPlaying = !this.player_.paused(), this.player_.pause();
}, vjs.SeekBar.prototype.onMouseMove = function(e) {
var t = this.calculateDistance(e) * this.player_.duration();
t == this.player_.duration() && (t -= .1), this.player_.currentTime(t);
}, vjs.SeekBar.prototype.onMouseUp = function(e) {
vjs.Slider.prototype.onMouseUp.call(this, e), this.player_.scrubbing = !1, this.videoWasPlaying && this.player_.play();
}, vjs.SeekBar.prototype.stepForward = function() {
this.player_.currentTime(this.player_.currentTime() + 5);
}, vjs.SeekBar.prototype.stepBack = function() {
this.player_.currentTime(this.player_.currentTime() - 5);
}, vjs.LoadProgressBar = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("progress", vjs.bind(this, this.update));
}
}), vjs.LoadProgressBar.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-load-progress",
innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
});
}, vjs.LoadProgressBar.prototype.update = function() {
this.el_.style && (this.el_.style.width = vjs.round(this.player_.bufferedPercent() * 100, 2) + "%");
}, vjs.PlayProgressBar = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.PlayProgressBar.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-play-progress",
innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
});
}, vjs.SeekHandle = vjs.SliderHandle.extend(), vjs.SeekHandle.prototype.defaultValue = "00:00", vjs.SeekHandle.prototype.createEl = function() {
return vjs.SliderHandle.prototype.createEl.call(this, "div", {
className: "vjs-seek-handle"
});
}, vjs.VolumeControl = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.tech && e.tech.features && e.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), e.on("loadstart", vjs.bind(this, function() {
e.tech.features && e.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
}));
}
}), vjs.VolumeControl.prototype.options_ = {
children: {
volumeBar: {}
}
}, vjs.VolumeControl.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-volume-control vjs-control"
});
}, vjs.VolumeBar = vjs.Slider.extend({
init: function(e, t) {
vjs.Slider.call(this, e, t), e.on("volumechange", vjs.bind(this, this.updateARIAAttributes)), e.ready(vjs.bind(this, this.updateARIAAttributes)), setTimeout(vjs.bind(this, this.update), 0);
}
}), vjs.VolumeBar.prototype.updateARIAAttributes = function() {
this.el_.setAttribute("aria-valuenow", vjs.round(this.player_.volume() * 100, 2)), this.el_.setAttribute("aria-valuetext", vjs.round(this.player_.volume() * 100, 2) + "%");
}, vjs.VolumeBar.prototype.options_ = {
children: {
volumeLevel: {},
volumeHandle: {}
},
barName: "volumeLevel",
handleName: "volumeHandle"
}, vjs.VolumeBar.prototype.playerEvent = "volumechange", vjs.VolumeBar.prototype.createEl = function() {
return vjs.Slider.prototype.createEl.call(this, "div", {
className: "vjs-volume-bar",
"aria-label": "volume level"
});
}, vjs.VolumeBar.prototype.onMouseMove = function(e) {
this.player_.volume(this.calculateDistance(e));
}, vjs.VolumeBar.prototype.getPercent = function() {
return this.player_.muted() ? 0 : this.player_.volume();
}, vjs.VolumeBar.prototype.stepForward = function() {
this.player_.volume(this.player_.volume() + .1);
}, vjs.VolumeBar.prototype.stepBack = function() {
this.player_.volume(this.player_.volume() - .1);
}, vjs.VolumeLevel = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.VolumeLevel.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-volume-level",
innerHTML: '<span class="vjs-control-text"></span>'
});
}, vjs.VolumeHandle = vjs.SliderHandle.extend(), vjs.VolumeHandle.prototype.defaultValue = "00:00", vjs.VolumeHandle.prototype.createEl = function() {
return vjs.SliderHandle.prototype.createEl.call(this, "div", {
className: "vjs-volume-handle"
});
}, vjs.MuteToggle = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), e.on("volumechange", vjs.bind(this, this.update)), e.tech && e.tech.features && e.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), e.on("loadstart", vjs.bind(this, function() {
e.tech.features && e.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
}));
}
}), vjs.MuteToggle.prototype.createEl = function() {
return vjs.Button.prototype.createEl.call(this, "div", {
className: "vjs-mute-control vjs-control",
innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
});
}, vjs.MuteToggle.prototype.onClick = function() {
this.player_.muted(this.player_.muted() ? !1 : !0);
}, vjs.MuteToggle.prototype.update = function() {
var e = this.player_.volume(), t = 3;
e === 0 || this.player_.muted() ? t = 0 : e < .33 ? t = 1 : e < .67 && (t = 2), this.player_.muted() ? this.el_.children[0].children[0].innerHTML != "Unmute" && (this.el_.children[0].children[0].innerHTML = "Unmute") : this.el_.children[0].children[0].innerHTML != "Mute" && (this.el_.children[0].children[0].innerHTML = "Mute");
for (var n = 0; n < 4; n++) vjs.removeClass(this.el_, "vjs-vol-" + n);
vjs.addClass(this.el_, "vjs-vol-" + t);
}, vjs.VolumeMenuButton = vjs.MenuButton.extend({
init: function(e, t) {
vjs.MenuButton.call(this, e, t), e.on("volumechange", vjs.bind(this, this.update)), e.tech && e.tech.features && e.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), e.on("loadstart", vjs.bind(this, function() {
e.tech.features && e.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
})), this.addClass("vjs-menu-button");
}
}), vjs.VolumeMenuButton.prototype.createMenu = function() {
var e = new vjs.Menu(this.player_, {
contentElType: "div"
}), t = new vjs.VolumeBar(this.player_, vjs.obj.merge({
vertical: !0
}, this.options_.volumeBar));
return e.addChild(t), e;
}, vjs.VolumeMenuButton.prototype.onClick = function() {
vjs.MuteToggle.prototype.onClick.call(this), vjs.MenuButton.prototype.onClick.call(this);
}, vjs.VolumeMenuButton.prototype.createEl = function() {
return vjs.Button.prototype.createEl.call(this, "div", {
className: "vjs-volume-menu-button vjs-menu-button vjs-control",
innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
});
}, vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update, vjs.PosterImage = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), (!e.poster() || !e.controls()) && this.hide(), e.on("play", vjs.bind(this, this.hide));
}
}), vjs.PosterImage.prototype.createEl = function() {
var e = vjs.createEl("div", {
className: "vjs-poster",
tabIndex: -1
}), t = this.player_.poster();
return t && ("backgroundSize" in e.style ? e.style.backgroundImage = 'url("' + t + '")' : e.appendChild(vjs.createEl("img", {
src: t
}))), e;
}, vjs.PosterImage.prototype.onClick = function() {
this.player_.play();
}, vjs.LoadingSpinner = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("canplay", vjs.bind(this, this.hide)), e.on("canplaythrough", vjs.bind(this, this.hide)), e.on("playing", vjs.bind(this, this.hide)), e.on("seeked", vjs.bind(this, this.hide)), e.on("seeking", vjs.bind(this, this.show)), e.on("seeked", vjs.bind(this, this.hide)), e.on("error", vjs.bind(this, this.show)), e.on("waiting", vjs.bind(this, this.show));
}
}), vjs.LoadingSpinner.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-loading-spinner"
});
}, vjs.BigPlayButton = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), e.controls() || this.hide(), e.on("play", vjs.bind(this, this.hide));
}
}), vjs.BigPlayButton.prototype.createEl = function() {
return vjs.Button.prototype.createEl.call(this, "div", {
className: "vjs-big-play-button",
innerHTML: "<span></span>",
"aria-label": "play video"
});
}, vjs.BigPlayButton.prototype.onClick = function() {
this.player_.play();
}, vjs.MediaTechController = vjs.Component.extend({
init: function(e, t, n) {
vjs.Component.call(this, e, t, n);
}
}), vjs.MediaTechController.prototype.onClick = function() {
return vjs.IS_ANDROID ? function() {} : function() {
this.player_.controls() && (this.player_.paused() ? this.player_.play() : this.player_.pause());
};
}(), vjs.MediaTechController.prototype.features = {
volumeControl: !0,
fullscreenResize: !1,
progressEvents: !1,
timeupdateEvents: !1
}, vjs.media = {}, vjs.media.ApiMethods = "play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted".split(",");
function createMethod(e) {
return function() {
throw new Error('The "' + e + "\" method is not available on the playback technology's API");
};
}
for (var i = vjs.media.ApiMethods.length - 1; i >= 0; i--) {
var methodName = vjs.media.ApiMethods[i];
vjs.MediaTechController.prototype[vjs.media.ApiMethods[i]] = createMethod(methodName);
}
vjs.Html5 = vjs.MediaTechController.extend({
init: function(e, t, n) {
this.features.volumeControl = vjs.Html5.canControlVolume(), this.features.movingMediaElementInDOM = !vjs.IS_IOS, this.features.fullscreenResize = !0, vjs.MediaTechController.call(this, e, t, n);
var r = t.source;
r && this.el_.currentSrc == r.src ? e.trigger("loadstart") : r && (this.el_.src = r.src), e.ready(function() {
this.tag && this.options_.autoplay && this.paused() && (delete this.tag.poster, this.play());
}), this.on("click", this.onClick), this.setupTriggers(), this.triggerReady();
}
}), vjs.Html5.prototype.dispose = function() {
vjs.MediaTechController.prototype.dispose.call(this);
}, vjs.Html5.prototype.createEl = function() {
var e = this.player_, t = e.tag, n;
if (!t || this.features.movingMediaElementInDOM === !1) t ? (t.player = null, e.tag = null, e.el().removeChild(t), t = t.cloneNode(!1)) : t = vjs.createEl("video", {
id: e.id() + "_html5_api",
className: "vjs-tech"
}), t.player = e, vjs.insertFirst(t, e.el());
var r = [ "autoplay", "preload", "loop", "muted" ];
for (var i = r.length - 1; i >= 0; i--) {
var s = r[i];
e.options_[s] !== null && (t[s] = e.options_[s]);
}
return t;
}, vjs.Html5.prototype.setupTriggers = function() {
for (var e = vjs.Html5.Events.length - 1; e >= 0; e--) vjs.on(this.el_, vjs.Html5.Events[e], vjs.bind(this.player_, this.eventHandler));
}, vjs.Html5.prototype.eventHandler = function(e) {
this.trigger(e), e.stopPropagation();
}, vjs.Html5.prototype.play = function() {
this.el_.play();
}, vjs.Html5.prototype.pause = function() {
this.el_.pause();
}, vjs.Html5.prototype.paused = function() {
return this.el_.paused;
}, vjs.Html5.prototype.currentTime = function() {
return this.el_.currentTime;
}, vjs.Html5.prototype.setCurrentTime = function(e) {
try {
this.el_.currentTime = e;
} catch (t) {
vjs.log(t, "Video is not ready. (Video.js)");
}
}, vjs.Html5.prototype.duration = function() {
return this.el_.duration || 0;
}, vjs.Html5.prototype.buffered = function() {
return this.el_.buffered;
}, vjs.Html5.prototype.volume = function() {
return this.el_.volume;
}, vjs.Html5.prototype.setVolume = function(e) {
this.el_.volume = e;
}, vjs.Html5.prototype.muted = function() {
return this.el_.muted;
}, vjs.Html5.prototype.setMuted = function(e) {
this.el_.muted = e;
}, vjs.Html5.prototype.width = function() {
return this.el_.offsetWidth;
}, vjs.Html5.prototype.height = function() {
return this.el_.offsetHeight;
}, vjs.Html5.prototype.supportsFullScreen = function() {
if (typeof this.el_.webkitEnterFullScreen == "function") if (/Android/.test(vjs.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)) return !0;
return !1;
}, vjs.Html5.prototype.enterFullScreen = function() {
var e = this.el_;
e.paused && e.networkState <= e.HAVE_METADATA ? (this.el_.play(), setTimeout(function() {
e.pause(), e.webkitEnterFullScreen();
}, 0)) : e.webkitEnterFullScreen();
}, vjs.Html5.prototype.exitFullScreen = function() {
this.el_.webkitExitFullScreen();
}, vjs.Html5.prototype.src = function(e) {
this.el_.src = e;
}, vjs.Html5.prototype.load = function() {
this.el_.load();
}, vjs.Html5.prototype.currentSrc = function() {
return this.el_.currentSrc;
}, vjs.Html5.prototype.preload = function() {
return this.el_.preload;
}, vjs.Html5.prototype.setPreload = function(e) {
this.el_.preload = e;
}, vjs.Html5.prototype.autoplay = function() {
return this.el_.autoplay;
}, vjs.Html5.prototype.setAutoplay = function(e) {
this.el_.autoplay = e;
}, vjs.Html5.prototype.loop = function() {
return this.el_.loop;
}, vjs.Html5.prototype.setLoop = function(e) {
this.el_.loop = e;
}, vjs.Html5.prototype.error = function() {
return this.el_.error;
}, vjs.Html5.prototype.seeking = function() {
return this.el_.seeking;
}, vjs.Html5.prototype.ended = function() {
return this.el_.ended;
}, vjs.Html5.prototype.defaultMuted = function() {
return this.el_.defaultMuted;
}, vjs.Html5.isSupported = function() {
return !!vjs.TEST_VID.canPlayType;
}, vjs.Html5.canPlaySource = function(e) {
try {
return !!vjs.TEST_VID.canPlayType(e.type);
} catch (t) {
return "";
}
}, vjs.Html5.canControlVolume = function() {
var e = vjs.TEST_VID.volume;
return vjs.TEST_VID.volume = e / 2 + .1, e !== vjs.TEST_VID.volume;
}, vjs.Html5.Events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","), vjs.IS_OLD_ANDROID && (document.createElement("video").constructor.prototype.canPlayType = function(e) {
return e && e.toLowerCase().indexOf("video/mp4") != -1 ? "maybe" : "";
}), vjs.Flash = vjs.MediaTechController.extend({
init: function(e, t, n) {
vjs.MediaTechController.call(this, e, t, n);
var r = t.source, i = t.parentEl, s = this.el_ = vjs.createEl("div", {
id: e.id() + "_temp_flash"
}), o = e.id() + "_flash_api", u = e.options_, a = vjs.obj.merge({
readyFunction: "videojs.Flash.onReady",
eventProxyFunction: "videojs.Flash.onEvent",
errorEventProxyFunction: "videojs.Flash.onError",
autoplay: u.autoplay,
preload: u.preload,
loop: u.loop,
muted: u.muted
}, t.flashVars), f = vjs.obj.merge({
wmode: "transparent",
bgcolor: "#000000"
}, t.params), l = vjs.obj.merge({
id: o,
name: o,
"class": "vjs-tech"
}, t.attributes);
r && (a.src = encodeURIComponent(vjs.getAbsoluteURL(r.src))), vjs.insertFirst(s, i), t.startTime && this.ready(function() {
this.load(), this.play(), this.currentTime(t.startTime);
});
if (t.iFrameMode === !0 && !vjs.IS_FIREFOX) {
var c = vjs.createEl("iframe", {
id: o + "_iframe",
name: o + "_iframe",
className: "vjs-tech",
scrolling: "no",
marginWidth: 0,
marginHeight: 0,
frameBorder: 0
});
a.readyFunction = "ready", a.eventProxyFunction = "events", a.errorEventProxyFunction = "errors", vjs.on(c, "load", vjs.bind(this, function() {
var e, n = c.contentWindow;
e = c.contentDocument ? c.contentDocument : c.contentWindow.document, e.write(vjs.Flash.getEmbedCode(t.swf, a, f, l)), n.player = this.player_, n.ready = vjs.bind(this.player_, function(t) {
var n = e.getElementById(t), r = this, i = r.tech;
i.el_ = n, vjs.on(n, "click", i.bind(i.onClick)), vjs.Flash.checkReady(i);
}), n.events = vjs.bind(this.player_, function(e, t) {
var n = this;
n && n.techName === "flash" && n.trigger(t);
}), n.errors = vjs.bind(this.player_, function(e, t) {
vjs.log("Flash Error", t);
});
})), s.parentNode.replaceChild(c, s);
} else vjs.Flash.embed(t.swf, s, a, f, l);
}
}), vjs.Flash.prototype.dispose = function() {
vjs.MediaTechController.prototype.dispose.call(this);
}, vjs.Flash.prototype.play = function() {
this.el_.vjs_play();
}, vjs.Flash.prototype.pause = function() {
this.el_.vjs_pause();
}, vjs.Flash.prototype.src = function(e) {
e = vjs.getAbsoluteURL(e), this.el_.vjs_src(e);
if (this.player_.autoplay()) {
var t = this;
setTimeout(function() {
t.play();
}, 0);
}
}, vjs.Flash.prototype.load = function() {
this.el_.vjs_load();
}, vjs.Flash.prototype.poster = function() {
this.el_.vjs_getProperty("poster");
}, vjs.Flash.prototype.buffered = function() {
return vjs.createTimeRange(0, this.el_.vjs_getProperty("buffered"));
}, vjs.Flash.prototype.supportsFullScreen = function() {
return !1;
}, vjs.Flash.prototype.enterFullScreen = function() {
return !1;
};
var api = vjs.Flash.prototype, readWrite = "preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), readOnly = "error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(","), createSetter = function(e) {
var t = e.charAt(0).toUpperCase() + e.slice(1);
api["set" + t] = function(t) {
return this.el_.vjs_setProperty(e, t);
};
}, createGetter = function(e) {
api[e] = function() {
return this.el_.vjs_getProperty(e);
};
};
(function() {
var e;
for (e = 0; e < readWrite.length; e++) createGetter(readWrite[e]), createSetter(readWrite[e]);
for (e = 0; e < readOnly.length; e++) createGetter(readOnly[e]);
})(), vjs.Flash.isSupported = function() {
return vjs.Flash.version()[0] >= 10;
}, vjs.Flash.canPlaySource = function(e) {
if (e.type in vjs.Flash.formats) return "maybe";
}, vjs.Flash.formats = {
"video/flv": "FLV",
"video/x-flv": "FLV",
"video/mp4": "MP4",
"video/m4v": "MP4"
}, vjs.Flash.onReady = function(e) {
var t = vjs.el(e), n = t.player || t.parentNode.player, r = n.tech;
t.player = n, r.el_ = t, r.on("click", r.onClick), vjs.Flash.checkReady(r);
}, vjs.Flash.checkReady = function(e) {
e.el().vjs_getProperty ? e.triggerReady() : setTimeout(function() {
vjs.Flash.checkReady(e);
}, 50);
}, vjs.Flash.onEvent = function(e, t) {
var n = vjs.el(e).player;
n.trigger(t);
}, vjs.Flash.onError = function(e, t) {
var n = vjs.el(e).player;
n.trigger("error"), vjs.log("Flash Error", t, e);
}, vjs.Flash.version = function() {
var e = "0,0,0";
try {
e = (new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
} catch (t) {
try {
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (e = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
} catch (n) {}
}
return e.split(",");
}, vjs.Flash.embed = function(e, t, n, r, i) {
var s = vjs.Flash.getEmbedCode(e, n, r, i), o = vjs.createEl("div", {
innerHTML: s
}).childNodes[0], u = t.parentNode;
t.parentNode.replaceChild(o, t);
var a = u.childNodes[0];
return setTimeout(function() {
a.style.display = "block";
}, 1e3), o;
}, vjs.Flash.getEmbedCode = function(e, t, n, r) {
var i = '<object type="application/x-shockwave-flash"', s = "", o = "", u = "";
return t && vjs.obj.each(t, function(e, t) {
s += e + "=" + t + "&amp;";
}), n = vjs.obj.merge({
movie: e,
flashvars: s,
allowScriptAccess: "always",
allowNetworking: "all"
}, n), vjs.obj.each(n, function(e, t) {
o += '<param name="' + e + '" value="' + t + '" />';
}), r = vjs.obj.merge({
data: e,
width: "100%",
height: "100%"
}, r), vjs.obj.each(r, function(e, t) {
u += e + '="' + t + '" ';
}), i + u + ">" + o + "</object>";
}, vjs.MediaLoader = vjs.Component.extend({
init: function(e, t, n) {
vjs.Component.call(this, e, t, n);
if (!e.options_.sources || e.options_.sources.length === 0) for (var r = 0, i = e.options_.techOrder; r < i.length; r++) {
var s = vjs.capitalize(i[r]), o = window.videojs[s];
if (o && o.isSupported()) {
e.loadTech(s);
break;
}
} else e.src(e.options_.sources);
}
}), vjs.Player.prototype.textTracks_, vjs.Player.prototype.textTracks = function() {
return this.textTracks_ = this.textTracks_ || [], this.textTracks_;
}, vjs.Player.prototype.addTextTrack = function(e, t, n, r) {
var i = this.textTracks_ = this.textTracks_ || [];
r = r || {}, r.kind = e, r.label = t, r.language = n;
var s = vjs.capitalize(e || "subtitles"), o = new window.videojs[s + "Track"](this, r);
return i.push(o), o;
}, vjs.Player.prototype.addTextTracks = function(e) {
var t;
for (var n = 0; n < e.length; n++) t = e[n], this.addTextTrack(t.kind, t.label, t.language, t);
return this;
}, vjs.Player.prototype.showTextTrack = function(e, t) {
var n = this.textTracks_, r = 0, i = n.length, s, o, u;
for (; r < i; r++) s = n[r], s.id() === e ? (s.show(), o = s) : t && s.kind() == t && s.mode() > 0 && s.disable();
return u = o ? o.kind() : t ? t : !1, u && this.trigger(u + "trackchange"), this;
}, vjs.TextTrack = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), this.id_ = t.id || "vjs_" + t.kind + "_" + t.language + "_" + vjs.guid++, this.src_ = t.src, this.dflt_ = t["default"] || t.dflt, this.title_ = t.title, this.language_ = t.srclang, this.label_ = t.label, this.cues_ = [], this.activeCues_ = [], this.readyState_ = 0, this.mode_ = 0, this.player_.on("fullscreenchange", vjs.bind(this, this.adjustFontSize));
}
}), vjs.TextTrack.prototype.kind_, vjs.TextTrack.prototype.kind = function() {
return this.kind_;
}, vjs.TextTrack.prototype.src_, vjs.TextTrack.prototype.src = function() {
return this.src_;
}, vjs.TextTrack.prototype.dflt_, vjs.TextTrack.prototype.dflt = function() {
return this.dflt_;
}, vjs.TextTrack.prototype.title_, vjs.TextTrack.prototype.title = function() {
return this.title_;
}, vjs.TextTrack.prototype.language_, vjs.TextTrack.prototype.language = function() {
return this.language_;
}, vjs.TextTrack.prototype.label_, vjs.TextTrack.prototype.label = function() {
return this.label_;
}, vjs.TextTrack.prototype.cues_, vjs.TextTrack.prototype.cues = function() {
return this.cues_;
}, vjs.TextTrack.prototype.activeCues_, vjs.TextTrack.prototype.activeCues = function() {
return this.activeCues_;
}, vjs.TextTrack.prototype.readyState_, vjs.TextTrack.prototype.readyState = function() {
return this.readyState_;
}, vjs.TextTrack.prototype.mode_, vjs.TextTrack.prototype.mode = function() {
return this.mode_;
}, vjs.TextTrack.prototype.adjustFontSize = function() {
this.player_.isFullScreen ? this.el_.style.fontSize = screen.width / this.player_.width() * 1.4 * 100 + "%" : this.el_.style.fontSize = "";
}, vjs.TextTrack.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-" + this.kind_ + " vjs-text-track"
});
}, vjs.TextTrack.prototype.show = function() {
this.activate(), this.mode_ = 2, vjs.Component.prototype.show.call(this);
}, vjs.TextTrack.prototype.hide = function() {
this.activate(), this.mode_ = 1, vjs.Component.prototype.hide.call(this);
}, vjs.TextTrack.prototype.disable = function() {
this.mode_ == 2 && this.hide(), this.deactivate(), this.mode_ = 0;
}, vjs.TextTrack.prototype.activate = function() {
this.readyState_ === 0 && this.load(), this.mode_ === 0 && (this.player_.on("timeupdate", vjs.bind(this, this.update, this.id_)), this.player_.on("ended", vjs.bind(this, this.reset, this.id_)), (this.kind_ === "captions" || this.kind_ === "subtitles") && this.player_.getChild("textTrackDisplay").addChild(this));
}, vjs.TextTrack.prototype.deactivate = function() {
this.player_.off("timeupdate", vjs.bind(this, this.update, this.id_)), this.player_.off("ended", vjs.bind(this, this.reset, this.id_)), this.reset(), this.player_.getChild("textTrackDisplay").removeChild(this);
}, vjs.TextTrack.prototype.load = function() {
this.readyState_ === 0 && (this.readyState_ = 1, vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError)));
}, vjs.TextTrack.prototype.onError = function(e) {
this.error = e, this.readyState_ = 3, this.trigger("error");
}, vjs.TextTrack.prototype.parseCues = function(e) {
var t, n, r, i = e.split("\n"), s = "", o;
for (var u = 1, a = i.length; u < a; u++) {
s = vjs.trim(i[u]);
if (s) {
s.indexOf("-->") == -1 ? (o = s, s = vjs.trim(i[++u])) : o = this.cues_.length, t = {
id: o,
index: this.cues_.length
}, n = s.split(" --> "), t.startTime = this.parseCueTime(n[0]), t.endTime = this.parseCueTime(n[1]), r = [];
while (i[++u] && (s = vjs.trim(i[u]))) r.push(s);
t.text = r.join("<br/>"), this.cues_.push(t);
}
}
this.readyState_ = 2, this.trigger("loaded");
}, vjs.TextTrack.prototype.parseCueTime = function(e) {
var t = e.split(":"), n = 0, r, i, s, o, u;
return t.length == 3 ? (r = t[0], i = t[1], s = t[2]) : (r = 0, i = t[0], s = t[1]), s = s.split(/\s+/), o = s.splice(0, 1)[0], o = o.split(/\.|,/), u = parseFloat(o[1]), o = o[0], n += parseFloat(r) * 3600, n += parseFloat(i) * 60, n += parseFloat(o), u && (n += u / 1e3), n;
}, vjs.TextTrack.prototype.update = function() {
if (this.cues_.length > 0) {
var e = this.player_.currentTime();
if (this.prevChange === undefined || e < this.prevChange || this.nextChange <= e) {
var t = this.cues_, n = this.player_.duration(), r = 0, i = !1, s = [], o, u, a, f;
e >= this.nextChange || this.nextChange === undefined ? f = this.firstActiveIndex !== undefined ? this.firstActiveIndex : 0 : (i = !0, f = this.lastActiveIndex !== undefined ? this.lastActiveIndex : t.length - 1);
for (;;) {
a = t[f];
if (a.endTime <= e) r = Math.max(r, a.endTime), a.active && (a.active = !1); else if (e < a.startTime) {
n = Math.min(n, a.startTime), a.active && (a.active = !1);
if (!i) break;
} else i ? (s.splice(0, 0, a), u === undefined && (u = f), o = f) : (s.push(a), o === undefined && (o = f), u = f), n = Math.min(n, a.endTime), r = Math.max(r, a.startTime), a.active = !0;
if (i) {
if (f === 0) break;
f--;
} else {
if (f === t.length - 1) break;
f++;
}
}
this.activeCues_ = s, this.nextChange = n, this.prevChange = r, this.firstActiveIndex = o, this.lastActiveIndex = u, this.updateDisplay(), this.trigger("cuechange");
}
}
}, vjs.TextTrack.prototype.updateDisplay = function() {
var e = this.activeCues_, t = "", n = 0, r = e.length;
for (; n < r; n++) t += '<span class="vjs-tt-cue">' + e[n].text + "</span>";
this.el_.innerHTML = t;
}, vjs.TextTrack.prototype.reset = function() {
this.nextChange = 0, this.prevChange = this.player_.duration(), this.firstActiveIndex = 0, this.lastActiveIndex = 0;
}, vjs.CaptionsTrack = vjs.TextTrack.extend(), vjs.CaptionsTrack.prototype.kind_ = "captions", vjs.SubtitlesTrack = vjs.TextTrack.extend(), vjs.SubtitlesTrack.prototype.kind_ = "subtitles", vjs.ChaptersTrack = vjs.TextTrack.extend(), vjs.ChaptersTrack.prototype.kind_ = "chapters", vjs.TextTrackDisplay = vjs.Component.extend({
init: function(e, t, n) {
vjs.Component.call(this, e, t, n), e.options_.tracks && e.options_.tracks.length > 0 && this.player_.addTextTracks(e.options_.tracks);
}
}), vjs.TextTrackDisplay.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-text-track-display"
});
}, vjs.TextTrackMenuItem = vjs.MenuItem.extend({
init: function(e, t) {
var n = this.track = t.track;
t.label = n.label(), t.selected = n.dflt(), vjs.MenuItem.call(this, e, t), this.player_.on(n.kind() + "trackchange", vjs.bind(this, this.update));
}
}), vjs.TextTrackMenuItem.prototype.onClick = function() {
vjs.MenuItem.prototype.onClick.call(this), this.player_.showTextTrack(this.track.id_, this.track.kind());
}, vjs.TextTrackMenuItem.prototype.update = function() {
this.selected(this.track.mode() == 2);
}, vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
init: function(e, t) {
t.track = {
kind: function() {
return t.kind;
},
player: e,
label: function() {
return t.kind + " off";
},
dflt: function() {
return !1;
},
mode: function() {
return !1;
}
}, vjs.TextTrackMenuItem.call(this, e, t), this.selected(!0);
}
}), vjs.OffTextTrackMenuItem.prototype.onClick = function() {
vjs.TextTrackMenuItem.prototype.onClick.call(this), this.player_.showTextTrack(this.track.id_, this.track.kind());
}, vjs.OffTextTrackMenuItem.prototype.update = function() {
var e = this.player_.textTracks(), t = 0, n = e.length, r, i = !0;
for (; t < n; t++) r = e[t], r.kind() == this.track.kind() && r.mode() == 2 && (i = !1);
this.selected(i);
}, vjs.TextTrackButton = vjs.MenuButton.extend({
init: function(e, t) {
vjs.MenuButton.call(this, e, t), this.items.length <= 1 && this.hide();
}
}), vjs.TextTrackButton.prototype.createItems = function() {
var e = [], t;
e.push(new vjs.OffTextTrackMenuItem(this.player_, {
kind: this.kind_
}));
for (var n = 0; n < this.player_.textTracks().length; n++) t = this.player_.textTracks()[n], t.kind() === this.kind_ && e.push(new vjs.TextTrackMenuItem(this.player_, {
track: t
}));
return e;
}, vjs.CaptionsButton = vjs.TextTrackButton.extend({
init: function(e, t, n) {
vjs.TextTrackButton.call(this, e, t, n), this.el_.setAttribute("aria-label", "Captions Menu");
}
}), vjs.CaptionsButton.prototype.kind_ = "captions", vjs.CaptionsButton.prototype.buttonText = "Captions", vjs.CaptionsButton.prototype.className = "vjs-captions-button", vjs.SubtitlesButton = vjs.TextTrackButton.extend({
init: function(e, t, n) {
vjs.TextTrackButton.call(this, e, t, n), this.el_.setAttribute("aria-label", "Subtitles Menu");
}
}), vjs.SubtitlesButton.prototype.kind_ = "subtitles", vjs.SubtitlesButton.prototype.buttonText = "Subtitles", vjs.SubtitlesButton.prototype.className = "vjs-subtitles-button", vjs.ChaptersButton = vjs.TextTrackButton.extend({
init: function(e, t, n) {
vjs.TextTrackButton.call(this, e, t, n), this.el_.setAttribute("aria-label", "Chapters Menu");
}
}), vjs.ChaptersButton.prototype.kind_ = "chapters", vjs.ChaptersButton.prototype.buttonText = "Chapters", vjs.ChaptersButton.prototype.className = "vjs-chapters-button", vjs.ChaptersButton.prototype.createItems = function() {
var e = [], t;
for (var n = 0; n < this.player_.textTracks().length; n++) t = this.player_.textTracks()[n], t.kind() === this.kind_ && e.push(new vjs.TextTrackMenuItem(this.player_, {
track: t
}));
return e;
}, vjs.ChaptersButton.prototype.createMenu = function() {
var e = this.player_.textTracks(), t = 0, n = e.length, r, i, s = this.items = [];
for (; t < n; t++) {
r = e[t];
if (r.kind() == this.kind_ && r.dflt()) {
if (r.readyState() < 2) {
this.chaptersTrack = r, r.on("loaded", vjs.bind(this, this.createMenu));
return;
}
i = r;
break;
}
}
var o = this.menu = new vjs.Menu(this.player_);
o.el_.appendChild(vjs.createEl("li", {
className: "vjs-menu-title",
innerHTML: vjs.capitalize(this.kind_),
tabindex: -1
}));
if (i) {
var u = i.cues_, a, f;
t = 0, n = u.length;
for (; t < n; t++) a = u[t], f = new vjs.ChaptersTrackMenuItem(this.player_, {
track: i,
cue: a
}), s.push(f), o.addChild(f);
}
return this.items.length > 0 && this.show(), o;
}, vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
init: function(e, t) {
var n = this.track = t.track, r = this.cue = t.cue, i = e.currentTime();
t.label = r.text, t.selected = r.startTime <= i && i < r.endTime, vjs.MenuItem.call(this, e, t), n.on("cuechange", vjs.bind(this, this.update));
}
}), vjs.ChaptersTrackMenuItem.prototype.onClick = function() {
vjs.MenuItem.prototype.onClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime);
}, vjs.ChaptersTrackMenuItem.prototype.update = function() {
var e = this.cue, t = this.player_.currentTime();
this.selected(e.startTime <= t && t < e.endTime);
}, vjs.obj.merge(vjs.ControlBar.prototype.options_.children, {
subtitlesButton: {},
captionsButton: {},
chaptersButton: {}
}), vjs.JSON;
if (typeof window.JSON != "undefined" && window.JSON.parse === "function") vjs.JSON = window.JSON; else {
vjs.JSON = {};
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
vjs.JSON.parse = function(text, reviver) {
function walk(e, t) {
var n, r, i = e[t];
if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
return reviver.call(e, t, i);
}
var j;
text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}));
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
"": j
}, "") : j;
throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
};
}
return vjs.autoSetup = function() {
var e, t, n, r = document.getElementsByTagName("video");
if (r && r.length > 0) for (var i = 0, s = r.length; i < s; i++) {
t = r[i];
if (!t || !t.getAttribute) {
vjs.autoSetupTimeout(1);
break;
}
t.player === undefined && (e = t.getAttribute("data-setup"), e !== null && (e = vjs.JSON.parse(e || "{}"), n = videojs(t, e)));
} else vjs.windowLoaded || vjs.autoSetupTimeout(1);
}, vjs.autoSetupTimeout = function(e) {
setTimeout(vjs.autoSetup, e);
}, vjs.one(window, "load", function() {
vjs.windowLoaded = !0;
}), vjs.autoSetupTimeout(1), vjs.plugin = function(e, t) {
vjs.Player.prototype[e] = t;
}, videojs;
} catch (e) {
wx.jslog({
src: "biz_web/lib/video.js"
}, e);
}
});define("tpl/media/img.html.js",[],function(){
return'<div class="appmsgSendedItem simple_img">\n    <a class="title_wrp" href="/cgi-bin/getimgdata?token={token}&msgid={msgid}&mode=large&source={source}&fileId={id}&ow={ow}" target="_blank">\n        <img class="icon" src="/cgi-bin/getimgdata?token={token}&msgid={msgid}&mode=small&source={source}&fileId={id}&ow={ow}">\n        <span class="title">[图片]</span>\n    </a>\n</div>';
});define("tpl/media/audio.html.js",[],function(){
return'<div class="appmsgSendedItem simple_audiomsg" id="wxAudioBox{id}" data-aid="{id}" data-fid="{file_id}" data-source="{source}">\n    <a class="title_wrp" href="javascript:;"  title="点击播放">\n        <span class="icon icon_lh" src="{appmsg_cover}"/></span>\n        <span class="title">[语音]{play_length}"</span>\n    </a>\n    <p class="desc">{play_length}"</p>\n</div>\n';
});define("biz_web/lib/soundmanager2.js", [], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = null, s;
function o(e, t) {
function n(e) {
return o.preferFlash && Bt && !o.ignoreFlash && o.flash[e] !== s && o.flash[e];
}
function r(e) {
return function(t) {
var n = this._s, r;
return !n || !n._a ? (n && n.id ? o._wD(n.id + ": Ignoring " + t.type) : o._wD(c + "Ignoring " + t.type), r = null) : r = e.call(this, t), r;
};
}
this.setupOptions = {
url: e || null,
flashVersion: 8,
debugMode: !1,
debugFlash: !1,
useConsole: !1,
consoleOnly: !0,
waitForWindowLoad: !1,
bgColor: "#ffffff",
useHighPerformance: !1,
flashPollingInterval: null,
html5PollingInterval: null,
flashLoadTimeout: 1e3,
wmode: null,
allowScriptAccess: "always",
useFlashBlock: !1,
useHTML5Audio: !0,
html5Test: /^(probably|maybe)$/i,
preferFlash: !0,
noSWFCache: !1,
idPrefix: "sound"
}, this.defaultOptions = {
autoLoad: !1,
autoPlay: !1,
from: null,
loops: 1,
onid3: null,
onload: null,
whileloading: null,
onplay: null,
onpause: null,
onresume: null,
whileplaying: null,
onposition: null,
onstop: null,
onfailure: null,
onfinish: null,
multiShot: !0,
multiShotEvents: !1,
position: null,
pan: 0,
stream: !0,
to: null,
type: null,
usePolicyFile: !1,
volume: 100
}, this.flash9Options = {
isMovieStar: null,
usePeakData: !1,
useWaveformData: !1,
useEQData: !1,
onbufferchange: null,
ondataerror: null
}, this.movieStarOptions = {
bufferTime: 3,
serverURL: null,
onconnect: null,
duration: null
}, this.audioFormats = {
mp3: {
type: [ 'audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust" ],
required: !0
},
mp4: {
related: [ "aac", "m4a", "m4b" ],
type: [ 'audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic" ],
required: !1
},
ogg: {
type: [ "audio/ogg; codecs=vorbis" ],
required: !1
},
opus: {
type: [ "audio/ogg; codecs=opus", "audio/opus" ],
required: !1
},
wav: {
type: [ 'audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav" ],
required: !1
}
}, this.movieID = "sm2-container", this.id = t || "sm2movie", this.debugID = "soundmanager-debug", this.debugURLParam = /([#?&])debug=1/i, this.versionNumber = "V2.97a.20130512", this.version = null, this.movieURL = null, this.altURL = null, this.swfLoaded = !1, this.enabled = !1, this.oMC = null, this.sounds = {}, this.soundIDs = [], this.muted = !1, this.didFlashBlock = !1, this.filePattern = null, this.filePatterns = {
flash8: /\.mp3(\?.*)?$/i,
flash9: /\.mp3(\?.*)?$/i
}, this.features = {
buffering: !1,
peakData: !1,
waveformData: !1,
eqData: !1,
movieStar: !1
}, this.sandbox = {
type: null,
types: {
remote: "remote (domain-based) rules",
localWithFile: "local with file access (no internet access)",
localWithNetwork: "local with network (internet access only, no local access)",
localTrusted: "local, trusted (local+internet access)"
},
description: null,
noRemote: null,
noLocal: null
}, this.html5 = {
usingFlash: null
}, this.flash = {}, this.html5Only = !1, this.ignoreFlash = !1;
var i, o = this, u = null, a = null, f = "soundManager", l = f + ": ", c = "HTML5::", h, p = navigator.userAgent, d = window.location.href.toString(), v = document, m, g, y, b, w = [], E = !0, S, x = !1, T = !1, N = !1, C = !1, k = !1, L, A = 0, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W, X, V, $, J, K, Q, G, Y = [ "log", "info", "warn", "error" ], Z = 8, et, tt, nt, rt = null, it = null, st, ot, ut, at, ft, lt, ct, ht, pt, dt = !1, vt = !1, mt, gt, yt, bt = 0, wt = null, Et, St = [], xt, Tt = null, Nt, Ct, kt, Lt, At, Ot, Mt, _t, Dt = Array.prototype.slice, Pt = !1, Ht, Bt, jt, Ft, It, qt, Rt, Ut, zt = 0, Wt = p.match(/(ipad|iphone|ipod)/i), Xt = p.match(/android/i), Vt = p.match(/msie/i), $t = p.match(/webkit/i), Jt = p.match(/safari/i) && !p.match(/chrome/i), Kt = p.match(/opera/i), Qt = p.match(/firefox/i), Gt = p.match(/(mobile|pre\/|xoom)/i) || Wt || Xt, Yt = !d.match(/usehtml5audio/i) && !d.match(/sm2\-ignorebadua/i) && Jt && !p.match(/silk/i) && p.match(/OS X 10_6_([3-7])/i), Zt = window.console !== s && console.log !== s, en = v.hasFocus !== s ? v.hasFocus() : null, tn = Jt && (v.hasFocus === s || !v.hasFocus()), nn = !tn, rn = /(mp3|mp4|mpa|m4a|m4b)/i, sn = 1e3, on = "about:blank", un = v.location ? v.location.protocol.match(/http/i) : null, an = un ? "" : "http://", fn = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i, ln = [ "mpeg4", "aac", "flv", "mov", "mp4", "m4v", "f4v", "m4a", "m4b", "mp4v", "3gp", "3g2" ], cn = new RegExp("\\.(" + ln.join("|") + ")(\\?.*)?$", "i");
this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i, this.useAltURL = !un, at = {
swfBox: "sm2-object-box",
swfDefault: "movieContainer",
swfError: "swf_error",
swfTimedout: "swf_timedout",
swfLoaded: "swf_loaded",
swfUnblocked: "swf_unblocked",
sm2Debug: "sm2_debug",
highPerf: "high_performance",
flashDebug: "flash_debug"
}, this.hasHTML5 = function() {
try {
return Audio !== s && (Kt && opera !== s && opera.version() < 10 ? new Audio(null) : new Audio).canPlayType !== s;
} catch (e) {
return !1;
}
}(), this.setup = function(e) {
var t = !o.url;
return e !== s && N && Tt && o.ok() && (e.flashVersion !== s || e.url !== s || e.html5Test !== s) && ht(st("setupLate")), _(e), e && (t && V && e.url !== s && o.beginDelayedInit(), !V && e.url !== s && v.readyState === "complete" && setTimeout(W, 1)), o;
}, this.ok = function() {
return Tt ? N && !C : o.useHTML5Audio && o.hasHTML5;
}, this.supported = this.ok, this.getMovie = function(e) {
return h(e) || v[e] || window[e];
}, this.createSound = function(e, t) {
function n() {
return l = lt(l), o.sounds[l.id] = new i(l), o.soundIDs.push(l.id), o.sounds[l.id];
}
var r, u, l, c = null;
r = f + ".createSound(): ", u = r + st(N ? "notOK" : "notReady");
if (!N || !o.ok()) return ht(u), !1;
t !== s && (e = {
id: e,
url: t
}), l = M(e), l.url = Et(l.url), l.id === undefined && (l.id = o.setupOptions.idPrefix + zt++), l.id.toString().charAt(0).match(/^[0-9]$/) && o._wD(r + st("badID", l.id), 2), o._wD(r + l.id + (l.url ? " (" + l.url + ")" : ""), 1);
if (pt(l.id, !0)) return o._wD(r + l.id + " exists", 1), o.sounds[l.id];
if (Ct(l)) c = n(), o._wD(l.id + ": Using HTML5"), c._setup_html5(l); else {
if (o.html5Only) return o._wD(l.id + ": No HTML5 support for this sound, and no Flash. Exiting."), n();
if (o.html5.usingFlash && l.url && l.url.match(/data\:/i)) return o._wD(l.id + ": data: URIs not supported via Flash. Exiting."), n();
b > 8 && (l.isMovieStar === null && (l.isMovieStar = !!(l.serverURL || (l.type ? l.type.match(fn) : !1) || l.url && l.url.match(cn))), l.isMovieStar && (o._wD(r + "using MovieStar handling"), l.loops > 1 && L("noNSLoop"))), l = ct(l, r), c = n(), b === 8 ? a._createSound(l.id, l.loops || 1, l.usePolicyFile) : (a._createSound(l.id, l.url, l.usePeakData, l.useWaveformData, l.useEQData, l.isMovieStar, l.isMovieStar ? l.bufferTime : !1, l.loops || 1, l.serverURL, l.duration || null, l.autoPlay, !0, l.autoLoad, l.usePolicyFile), l.serverURL || (c.connected = !0, l.onconnect && l.onconnect.apply(c))), !l.serverURL && (l.autoLoad || l.autoPlay) && c.load(l);
}
return !l.serverURL && l.autoPlay && c.play(), c;
}, this.destroySound = function(e, t) {
if (!pt(e)) return !1;
var n = o.sounds[e], r;
n._iO = {}, n.stop(), n.unload();
for (r = 0; r < o.soundIDs.length; r++) if (o.soundIDs[r] === e) {
o.soundIDs.splice(r, 1);
break;
}
return t || n.destruct(!0), n = null, delete o.sounds[e], !0;
}, this.load = function(e, t) {
return pt(e) ? o.sounds[e].load(t) : !1;
}, this.unload = function(e) {
return pt(e) ? o.sounds[e].unload() : !1;
}, this.onPosition = function(e, t, n, r) {
return pt(e) ? o.sounds[e].onposition(t, n, r) : !1;
}, this.onposition = this.onPosition, this.clearOnPosition = function(e, t, n) {
return pt(e) ? o.sounds[e].clearOnPosition(t, n) : !1;
}, this.play = function(e, t) {
var n = null, r = t && !(t instanceof Object);
if (!N || !o.ok()) return ht(f + ".play(): " + st(N ? "notOK" : "notReady")), !1;
if (!pt(e, r)) {
if (!r) return !1;
r && (t = {
url: t
}), t && t.url && (o._wD(f + '.play(): Attempting to create "' + e + '"', 1), t.id = e, n = o.createSound(t).play());
} else r && (t = {
url: t
});
return n === null && (n = o.sounds[e].play(t)), n;
}, this.start = this.play, this.setPosition = function(e, t) {
return pt(e) ? o.sounds[e].setPosition(t) : !1;
}, this.stop = function(e) {
return pt(e) ? (o._wD(f + ".stop(" + e + ")", 1), o.sounds[e].stop()) : !1;
}, this.stopAll = function() {
var e;
o._wD(f + ".stopAll()", 1);
for (e in o.sounds) o.sounds.hasOwnProperty(e) && o.sounds[e].stop();
}, this.pause = function(e) {
return pt(e) ? o.sounds[e].pause() : !1;
}, this.pauseAll = function() {
var e;
for (e = o.soundIDs.length - 1; e >= 0; e--) o.sounds[o.soundIDs[e]].pause();
}, this.resume = function(e) {
return pt(e) ? o.sounds[e].resume() : !1;
}, this.resumeAll = function() {
var e;
for (e = o.soundIDs.length - 1; e >= 0; e--) o.sounds[o.soundIDs[e]].resume();
}, this.togglePause = function(e) {
return pt(e) ? o.sounds[e].togglePause() : !1;
}, this.setPan = function(e, t) {
return pt(e) ? o.sounds[e].setPan(t) : !1;
}, this.setVolume = function(e, t) {
return pt(e) ? o.sounds[e].setVolume(t) : !1;
}, this.mute = function(e) {
var t = 0;
e instanceof String && (e = null);
if (!e) {
o._wD(f + ".mute(): Muting all sounds");
for (t = o.soundIDs.length - 1; t >= 0; t--) o.sounds[o.soundIDs[t]].mute();
return o.muted = !0, !0;
}
return pt(e) ? (o._wD(f + '.mute(): Muting "' + e + '"'), o.sounds[e].mute()) : !1;
}, this.muteAll = function() {
o.mute();
}, this.unmute = function(e) {
var t;
e instanceof String && (e = null);
if (!e) {
o._wD(f + ".unmute(): Unmuting all sounds");
for (t = o.soundIDs.length - 1; t >= 0; t--) o.sounds[o.soundIDs[t]].unmute();
return o.muted = !1, !0;
}
return pt(e) ? (o._wD(f + '.unmute(): Unmuting "' + e + '"'), o.sounds[e].unmute()) : !1;
}, this.unmuteAll = function() {
o.unmute();
}, this.toggleMute = function(e) {
return pt(e) ? o.sounds[e].toggleMute() : !1;
}, this.getMemoryUse = function() {
var e = 0;
return a && b !== 8 && (e = parseInt(a._getMemoryUse(), 10)), e;
}, this.disable = function(e) {
var t;
e === s && (e = !1);
if (C) return !1;
C = !0, L("shutdown", 1);
for (t = o.soundIDs.length - 1; t >= 0; t--) et(o.sounds[o.soundIDs[t]]);
return O(e), _t.remove(window, "load", B), !0;
}, this.canPlayMIME = function(e) {
var t;
return o.hasHTML5 && (t = kt({
type: e
})), !t && Tt && (t = e && o.ok() ? !!((b > 8 ? e.match(fn) : null) || e.match(o.mimePattern)) : null), t;
}, this.canPlayURL = function(e) {
var t;
return o.hasHTML5 && (t = kt({
url: e
})), !t && Tt && (t = e && o.ok() ? !!e.match(o.filePattern) : null), t;
}, this.canPlayLink = function(e) {
return e.type !== s && e.type && o.canPlayMIME(e.type) ? !0 : o.canPlayURL(e.href);
}, this.getSoundById = function(e, t) {
if (!e) return null;
var n = o.sounds[e];
return !n && !t && o._wD(f + '.getSoundById(): Sound "' + e + '" not found.', 2), n;
}, this.onready = function(e, t) {
var n = "onready", r = !1;
if (typeof e != "function") throw st("needFunction", n);
return N && o._wD(st("queue", n)), t || (t = window), P(n, e, t), H(), r = !0, r;
}, this.ontimeout = function(e, t) {
var n = "ontimeout", r = !1;
if (typeof e != "function") throw st("needFunction", n);
return N && o._wD(st("queue", n)), t || (t = window), P(n, e, t), H({
type: n
}), r = !0, r;
}, this._writeDebug = function(e, t) {
var n = "soundmanager-debug", r, i;
if (!o.debugMode) return !1;
if (Zt && o.useConsole) {
t && typeof t == "object" ? console.log(e, t) : Y[t] !== s ? console[Y[t]](e) : console.log(e);
if (o.consoleOnly) return !0;
}
return r = h(n), r ? (i = v.createElement("div"), ++A % 2 === 0 && (i.className = "sm2-alt"), t === s ? t = 0 : t = parseInt(t, 10), i.appendChild(v.createTextNode(e)), t && (t >= 2 && (i.style.fontWeight = "bold"), t === 3 && (i.style.color = "#ff3333")), r.insertBefore(i, r.firstChild), r = null, !0) : !1;
}, d.indexOf("sm2-debug=alert") !== -1 && (this._writeDebug = function(e) {
window.alert(e);
}), this._wD = this._writeDebug, this._debug = function() {
var e, t;
L("currentObj", 1);
for (e = 0, t = o.soundIDs.length; e < t; e++) o.sounds[o.soundIDs[e]]._debug();
}, this.reboot = function(e, t) {
o.soundIDs.length && o._wD("Destroying " + o.soundIDs.length + " SMSound object" + (o.soundIDs.length !== 1 ? "s" : "") + "...");
var n, r, i;
for (n = o.soundIDs.length - 1; n >= 0; n--) o.sounds[o.soundIDs[n]].destruct();
if (a) try {
Vt && (it = a.innerHTML), rt = a.parentNode.removeChild(a);
} catch (s) {
L("badRemove", 2);
}
it = rt = Tt = a = null, o.enabled = V = N = dt = vt = x = T = C = Pt = o.swfLoaded = !1, o.soundIDs = [], o.sounds = {}, zt = 0;
if (!e) {
for (n in w) if (w.hasOwnProperty(n)) for (r = 0, i = w[n].length; r < i; r++) w[n][r].fired = !1;
} else w = [];
return t || o._wD(f + ": Rebooting..."), o.html5 = {
usingFlash: null
}, o.flash = {}, o.html5Only = !1, o.ignoreFlash = !1, window.setTimeout(function() {
z(), t || o.beginDelayedInit();
}, 20), o;
}, this.reset = function() {
return L("reset"), o.reboot(!0, !0);
}, this.getMoviePercent = function() {
return a && "PercentLoaded" in a ? a.PercentLoaded() : null;
}, this.beginDelayedInit = function() {
k = !0, W(), setTimeout(function() {
return vt ? !1 : (J(), U(), vt = !0, !0);
}, 20), j();
}, this.destruct = function() {
o._wD(f + ".destruct()"), o.disable(!0);
}, i = function(e) {
var t = this, n, r, i, f, l, c, h = !1, p = [], d = 0, v, m, g = null, y, w;
y = {
duration: null,
time: null
}, this.id = e.id, this.sID = this.id, this.url = e.url, this.options = M(e), this.instanceOptions = this.options, this._iO = this.instanceOptions, this.pan = this.options.pan, this.volume = this.options.volume, this.isHTML5 = !1, this._a = null, w = this.url ? !1 : !0, this.id3 = {}, this._debug = function() {
o._wD(t.id + ": Merged options:", t.options);
}, this.load = function(e) {
var n = null, r;
e !== s ? t._iO = M(e, t.options) : (e = t.options, t._iO = e, g && g !== t.url && (L("manURL"), t._iO.url = t.url, t.url = null)), t._iO.url || (t._iO.url = t.url), t._iO.url = Et(t._iO.url), t.instanceOptions = t._iO, r = t._iO, o._wD(t.id + ": load (" + r.url + ")");
if (!r.url && !t.url) return o._wD(t.id + ": load(): url is unassigned. Exiting.", 2), t;
!t.isHTML5 && b === 8 && !t.url && !r.autoPlay && o._wD(t.id + ": Flash 8 load() limitation: Wait for onload() before calling play().", 1);
if (r.url === t.url && t.readyState !== 0 && t.readyState !== 2) return L("onURL", 1), t.readyState === 3 && r.onload && Ut(t, function() {
r.onload.apply(t, [ !!t.duration ]);
}), t;
t.loaded = !1, t.readyState = 1, t.playState = 0, t.id3 = {};
if (Ct(r)) n = t._setup_html5(r), n._called_load ? o._wD(t.id + ": Ignoring request to load again") : (t._html5_canplay = !1, t.url !== r.url && (o._wD(L("manURL") + ": " + r.url), t._a.src = r.url, t.setPosition(0)), t._a.autobuffer = "auto", t._a.preload = "auto", t._a._called_load = !0, r.autoPlay && t.play()); else {
if (o.html5Only) return o._wD(t.id + ": No flash support. Exiting."), t;
if (t._iO.url && t._iO.url.match(/data\:/i)) return o._wD(t.id + ": data: URIs not supported via Flash. Exiting."), t;
try {
t.isHTML5 = !1, t._iO = ct(lt(r)), r = t._iO, b === 8 ? a._load(t.id, r.url, r.stream, r.autoPlay, r.usePolicyFile) : a._load(t.id, r.url, !!r.stream, !!r.autoPlay, r.loops || 1, !!r.autoLoad, r.usePolicyFile);
} catch (i) {
L("smError", 2), S("onload", !1), K({
type: "SMSOUND_LOAD_JS_EXCEPTION",
fatal: !0
});
}
}
return t.url = r.url, t;
}, this.unload = function() {
return t.readyState !== 0 && (o._wD(t.id + ": unload()"), t.isHTML5 ? (f(), t._a && (t._a.pause(), g = At(t._a))) : b === 8 ? a._unload(t.id, on) : a._unload(t.id), n()), t;
}, this.destruct = function(e) {
o._wD(t.id + ": Destruct"), t.isHTML5 ? (f(), t._a && (t._a.pause(), At(t._a), Pt || i(), t._a._s = null, t._a = null)) : (t._iO.onfailure = null, a._destroySound(t.id)), e || o.destroySound(t.id, !0);
}, this.play = function(e, n) {
var r, i, u, f, p, d, v, g = !0, y = null;
r = t.id + ": play(): ", n = n === s ? !0 : n, e || (e = {}), t.url && (t._iO.url = t.url), t._iO = M(t._iO, t.options), t._iO = M(e, t._iO), t._iO.url = Et(t._iO.url), t.instanceOptions = t._iO;
if (!t.isHTML5 && t._iO.serverURL && !t.connected) return t.getAutoPlay() || (o._wD(r + " Netstream not connected yet - setting autoPlay"), t.setAutoPlay(!0)), t;
Ct(t._iO) && (t._setup_html5(t._iO), l()), t.playState === 1 && !t.paused && (i = t._iO.multiShot, i ? o._wD(r + "Already playing (multi-shot)", 1) : (o._wD(r + "Already playing (one-shot)", 1), t.isHTML5 && t.setPosition(t._iO.position), y = t));
if (y !== null) return y;
e.url && e.url !== t.url && (!t.readyState && !t.isHTML5 && b === 8 && w ? w = !1 : t.load(t._iO)), t.loaded ? o._wD(r.substr(0, r.lastIndexOf(":"))) : t.readyState === 0 ? (o._wD(r + "Attempting to load"), !t.isHTML5 && !o.html5Only ? (t._iO.autoPlay = !0, t.load(t._iO)) : t.isHTML5 ? t.load(t._iO) : (o._wD(r + "Unsupported type. Exiting."), y = t), t.instanceOptions = t._iO) : t.readyState === 2 ? (o._wD(r + "Could not load - exiting", 2), y = t) : o._wD(r + "Loading - attempting to play...");
if (y !== null) return y;
!t.isHTML5 && b === 9 && t.position > 0 && t.position === t.duration && (o._wD(r + "Sound at end, resetting to position:0"), e.position = 0);
if (t.paused && t.position >= 0 && (!t._iO.serverURL || t.position > 0)) o._wD(r + "Resuming from paused state", 1), t.resume(); else {
t._iO = M(e, t._iO);
if (t._iO.from !== null && t._iO.to !== null && t.instanceCount === 0 && t.playState === 0 && !t._iO.serverURL) {
f = function() {
t._iO = M(e, t._iO), t.play(t._iO);
}, t.isHTML5 && !t._html5_canplay ? (o._wD(r + "Beginning load for from/to case"), t.load({
oncanplay: f
}), y = !1) : !t.isHTML5 && !t.loaded && (!t.readyState || t.readyState !== 2) && (o._wD(r + "Preloading for from/to case"), t.load({
onload: f
}), y = !1);
if (y !== null) return y;
t._iO = m();
}
(!t.instanceCount || t._iO.multiShotEvents || t.isHTML5 && t._iO.multiShot && !Pt || !t.isHTML5 && b > 8 && !t.getAutoPlay()) && t.instanceCount++, t._iO.onposition && t.playState === 0 && c(t), t.playState = 1, t.paused = !1, t.position = t._iO.position !== s && !isNaN(t._iO.position) ? t._iO.position : 0, t.isHTML5 || (t._iO = ct(lt(t._iO))), t._iO.onplay && n && (t._iO.onplay.apply(t), h = !0), t.setVolume(t._iO.volume, !0), t.setPan(t._iO.pan, !0), t.isHTML5 ? t.instanceCount < 2 ? (l(), u = t._setup_html5(), t.setPosition(t._iO.position), u.play()) : (o._wD(t.id + ": Cloning Audio() for instance #" + t.instanceCount + "..."), p = new Audio(t._iO.url), d = function() {
_t.remove(p, "onended", d), t._onfinish(t), At(p), p = null;
}, v = function() {
_t.remove(p, "canplay", v);
try {
p.currentTime = t._iO.position / sn;
} catch (e) {
ht(t.id + ": multiShot play() failed to apply position of " + t._iO.position / sn);
}
p.play();
}, _t.add(p, "ended", d), t._iO.position ? _t.add(p, "canplay", v) : p.play()) : (g = a._start(t.id, t._iO.loops || 1, b === 9 ? t.position : t.position / sn, t._iO.multiShot || !1), b === 9 && !g && (o._wD(r + "No sound hardware, or 32-sound ceiling hit", 2), t._iO.onplayerror && t._iO.onplayerror.apply(t)));
}
return t;
}, this.start = this.play, this.stop = function(e) {
var n = t._iO, r;
return t.playState === 1 && (o._wD(t.id + ": stop()"), t._onbufferchange(0), t._resetOnPosition(0), t.paused = !1, t.isHTML5 || (t.playState = 0), v(), n.to && t.clearOnPosition(n.to), t.isHTML5 ? t._a && (r = t.position, t.setPosition(0), t.position = r, t._a.pause(), t.playState = 0, t._onTimer(), f()) : (a._stop(t.id, e), n.serverURL && t.unload()), t.instanceCount = 0, t._iO = {}, n.onstop && n.onstop.apply(t)), t;
}, this.setAutoPlay = function(e) {
o._wD(t.id + ": Autoplay turned " + (e ? "on" : "off")), t._iO.autoPlay = e, t.isHTML5 || (a._setAutoPlay(t.id, e), e && !t.instanceCount && t.readyState === 1 && (t.instanceCount++, o._wD(t.id + ": Incremented instance count to " + t.instanceCount)));
}, this.getAutoPlay = function() {
return t._iO.autoPlay;
}, this.setPosition = function(e) {
e === s && (e = 0);
var n, r, i = t.isHTML5 ? Math.max(e, 0) : Math.min(t.duration || t._iO.duration, Math.max(e, 0));
t.position = i, r = t.position / sn, t._resetOnPosition(t.position), t._iO.position = i;
if (!t.isHTML5) n = b === 9 ? t.position : r, t.readyState && t.readyState !== 2 && a._setPosition(t.id, n, t.paused || !t.playState, t._iO.multiShot); else if (t._a) {
if (t._html5_canplay) {
if (t._a.currentTime !== r) {
o._wD(t.id + ": setPosition(" + r + ")");
try {
t._a.currentTime = r, (t.playState === 0 || t.paused) && t._a.pause();
} catch (u) {
o._wD(t.id + ": setPosition(" + r + ") failed: " + u.message, 2);
}
}
} else if (r) return o._wD(t.id + ": setPosition(" + r + "): Cannot seek yet, sound not ready", 2), t;
t.paused && t._onTimer(!0);
}
return t;
}, this.pause = function(e) {
return t.paused || t.playState === 0 && t.readyState !== 1 ? t : (o._wD(t.id + ": pause()"), t.paused = !0, t.isHTML5 ? (t._setup_html5().pause(), f()) : (e || e === s) && a._pause(t.id, t._iO.multiShot), t._iO.onpause && t._iO.onpause.apply(t), t);
}, this.resume = function() {
var e = t._iO;
return t.paused ? (o._wD(t.id + ": resume()"), t.paused = !1, t.playState = 1, t.isHTML5 ? (t._setup_html5().play(), l()) : (e.isMovieStar && !e.serverURL && t.setPosition(t.position), a._pause(t.id, e.multiShot)), !h && e.onplay ? (e.onplay.apply(t), h = !0) : e.onresume && e.onresume.apply(t), t) : t;
}, this.togglePause = function() {
return o._wD(t.id + ": togglePause()"), t.playState === 0 ? (t.play({
position: b === 9 && !t.isHTML5 ? t.position : t.position / sn
}), t) : (t.paused ? t.resume() : t.pause(), t);
}, this.setPan = function(e, n) {
return e === s && (e = 0), n === s && (n = !1), t.isHTML5 || a._setPan(t.id, e), t._iO.pan = e, n || (t.pan = e, t.options.pan = e), t;
}, this.setVolume = function(e, n) {
return e === s && (e = 100), n === s && (n = !1), t.isHTML5 ? t._a && (t._a.volume = Math.max(0, Math.min(1, e / 100))) : a._setVolume(t.id, o.muted && !t.muted || t.muted ? 0 : e), t._iO.volume = e, n || (t.volume = e, t.options.volume = e), t;
}, this.mute = function() {
return t.muted = !0, t.isHTML5 ? t._a && (t._a.muted = !0) : a._setVolume(t.id, 0), t;
}, this.unmute = function() {
t.muted = !1;
var e = t._iO.volume !== s;
return t.isHTML5 ? t._a && (t._a.muted = !1) : a._setVolume(t.id, e ? t._iO.volume : t.options.volume), t;
}, this.toggleMute = function() {
return t.muted ? t.unmute() : t.mute();
}, this.onPosition = function(e, n, r) {
return p.push({
position: parseInt(e, 10),
method: n,
scope: r !== s ? r : t,
fired: !1
}), t;
}, this.onposition = this.onPosition, this.clearOnPosition = function(e, t) {
var n;
e = parseInt(e, 10);
if (isNaN(e)) return !1;
for (n = 0; n < p.length; n++) e === p[n].position && (!t || t === p[n].method) && (p[n].fired && d--, p.splice(n, 1));
}, this._processOnPosition = function() {
var e, n, r = p.length;
if (!r || !t.playState || d >= r) return !1;
for (e = r - 1; e >= 0; e--) n = p[e], !n.fired && t.position >= n.position && (n.fired = !0, d++, n.method.apply(n.scope, [ n.position ]));
return !0;
}, this._resetOnPosition = function(e) {
var t, n, r = p.length;
if (!r) return !1;
for (t = r - 1; t >= 0; t--) n = p[t], n.fired && e <= n.position && (n.fired = !1, d--);
return !0;
}, m = function() {
var e = t._iO, n = e.from, r = e.to, i, s;
return s = function() {
o._wD(t.id + ': "To" time of ' + r + " reached."), t.clearOnPosition(r, s), t.stop();
}, i = function() {
o._wD(t.id + ': Playing "from" ' + n), r !== null && !isNaN(r) && t.onPosition(r, s);
}, n !== null && !isNaN(n) && (e.position = n, e.multiShot = !1, i()), e;
}, c = function() {
var e, n = t._iO.onposition;
if (n) for (e in n) n.hasOwnProperty(e) && t.onPosition(parseInt(e, 10), n[e]);
}, v = function() {
var e, n = t._iO.onposition;
if (n) for (e in n) n.hasOwnProperty(e) && t.clearOnPosition(parseInt(e, 10));
}, l = function() {
t.isHTML5 && mt(t);
}, f = function() {
t.isHTML5 && gt(t);
}, n = function(e) {
e || (p = [], d = 0), h = !1, t._hasTimer = null, t._a = null, t._html5_canplay = !1, t.bytesLoaded = null, t.bytesTotal = null, t.duration = t._iO && t._iO.duration ? t._iO.duration : null, t.durationEstimate = null, t.buffered = [], t.eqData = [], t.eqData.left = [], t.eqData.right = [], t.failures = 0, t.isBuffering = !1, t.instanceOptions = {}, t.instanceCount = 0, t.loaded = !1, t.metadata = {}, t.readyState = 0, t.muted = !1, t.paused = !1, t.peakData = {
left: 0,
right: 0
}, t.waveformData = {
left: [],
right: []
}, t.playState = 0, t.position = null, t.id3 = {};
}, n(), this._onTimer = function(e) {
var n, r = !1, i, s = {};
if (t._hasTimer || e) return t._a && (e || (t.playState > 0 || t.readyState === 1) && !t.paused) && (n = t._get_html5_duration(), n !== y.duration && (y.duration = n, t.duration = n, r = !0), t.durationEstimate = t.duration, i = t._a.currentTime * sn || 0, i !== y.time && (y.time = i, r = !0), (r || e) && t._whileplaying(i, s, s, s, s)), r;
}, this._get_html5_duration = function() {
var e = t._iO, n = t._a && t._a.duration ? t._a.duration * sn : e && e.duration ? e.duration : null, r = n && !isNaN(n) && n !== Infinity ? n : null;
return r;
}, this._apply_loop = function(e, t) {
!e.loop && t > 1 && o._wD("Note: Native HTML5 looping is infinite.", 1), e.loop = t > 1 ? "loop" : "";
}, this._setup_html5 = function(e) {
var i = M(t._iO, e), s = Pt ? u : t._a, o = decodeURI(i.url), a;
Pt ? o === decodeURI(Ht) && (a = !0) : o === decodeURI(g) && (a = !0);
if (s) {
if (s._s) if (Pt) s._s && s._s.playState && !a && s._s.stop(); else if (!Pt && o === decodeURI(g)) return t._apply_loop(s, i.loops), s;
a || (n(!1), s.src = i.url, t.url = i.url, g = i.url, Ht = i.url, s._called_load = !1);
} else i.autoLoad || i.autoPlay ? t._a = new Audio(i.url) : t._a = Kt && opera.version() < 10 ? new Audio(null) : new Audio, s = t._a, s._called_load = !1, Pt && (u = s);
return t.isHTML5 = !0, t._a = s, s._s = t, r(), t._apply_loop(s, i.loops), i.autoLoad || i.autoPlay ? t.load() : (s.autobuffer = !1, s.preload = "auto"), s;
}, r = function() {
function e(e, n, r) {
return t._a ? t._a.addEventListener(e, n, r || !1) : null;
}
if (t._a._added_events) return !1;
var n;
t._a._added_events = !0;
for (n in It) It.hasOwnProperty(n) && e(n, It[n]);
return !0;
}, i = function() {
function e(e, n, r) {
return t._a ? t._a.removeEventListener(e, n, r || !1) : null;
}
var n;
o._wD(t.id + ": Removing event listeners"), t._a._added_events = !1;
for (n in It) It.hasOwnProperty(n) && e(n, It[n]);
}, this._onload = function(e) {
var n, r = !!e || !t.isHTML5 && b === 8 && t.duration;
return n = t.id + ": ", o._wD(n + (r ? "onload()" : "Failed to load / invalid sound?" + (t.duration ? " -" : " Zero-length duration reported.") + " (" + t.url + ")"), r ? 1 : 2), !r && !t.isHTML5 && (o.sandbox.noRemote === !0 && o._wD(n + st("noNet"), 1), o.sandbox.noLocal === !0 && o._wD(n + st("noLocal"), 1)), t.loaded = r, t.readyState = r ? 3 : 2, t._onbufferchange(0), t._iO.onload && Ut(t, function() {
t._iO.onload.apply(t, [ r ]);
}), !0;
}, this._onbufferchange = function(e) {
return t.playState === 0 ? !1 : e && t.isBuffering || !e && !t.isBuffering ? !1 : (t.isBuffering = e === 1, t._iO.onbufferchange && (o._wD(t.id + ": Buffer state change: " + e), t._iO.onbufferchange.apply(t)), !0);
}, this._onsuspend = function() {
return t._iO.onsuspend && (o._wD(t.id + ": Playback suspended"), t._iO.onsuspend.apply(t)), !0;
}, this._onfailure = function(e, n, r) {
t.failures++, o._wD(t.id + ": Failures = " + t.failures), t._iO.onfailure && t.failures === 1 ? t._iO.onfailure(t, e, n, r) : o._wD(t.id + ": Ignoring failure");
}, this._onfinish = function() {
var e = t._iO.onfinish;
t._onbufferchange(0), t._resetOnPosition(0), t.instanceCount && (t.instanceCount--, t.instanceCount || (v(), t.playState = 0, t.paused = !1, t.instanceCount = 0, t.instanceOptions = {}, t._iO = {}, f(), t.isHTML5 && (t.position = 0)), (!t.instanceCount || t._iO.multiShotEvents) && e && (o._wD(t.id + ": onfinish()"), Ut(t, function() {
e.apply(t);
})));
}, this._whileloading = function(e, n, r, i) {
var s = t._iO;
t.bytesLoaded = e, t.bytesTotal = n, t.duration = Math.floor(r), t.bufferLength = i, !t.isHTML5 && !s.isMovieStar ? s.duration ? t.durationEstimate = t.duration > s.duration ? t.duration : s.duration : t.durationEstimate = parseInt(t.bytesTotal / t.bytesLoaded * t.duration, 10) : t.durationEstimate = t.duration, t.isHTML5 || (t.buffered = [ {
start: 0,
end: t.duration
} ]), (t.readyState !== 3 || t.isHTML5) && s.whileloading && s.whileloading.apply(t);
}, this._whileplaying = function(e, n, r, i, o) {
var u = t._iO, a;
return isNaN(e) || e === null ? !1 : (t.position = Math.max(0, e), t._processOnPosition(), !t.isHTML5 && b > 8 && (u.usePeakData && n !== s && n && (t.peakData = {
left: n.leftPeak,
right: n.rightPeak
}), u.useWaveformData && r !== s && r && (t.waveformData = {
left: r.split(","),
right: i.split(",")
}), u.useEQData && o !== s && o && o.leftEQ && (a = o.leftEQ.split(","), t.eqData = a, t.eqData.left = a, o.rightEQ !== s && o.rightEQ && (t.eqData.right = o.rightEQ.split(",")))), t.playState === 1 && (!t.isHTML5 && b === 8 && !t.position && t.isBuffering && t._onbufferchange(0), u.whileplaying && u.whileplaying.apply(t)), !0);
}, this._oncaptiondata = function(e) {
o._wD(t.id + ": Caption data received."), t.captiondata = e, t._iO.oncaptiondata && t._iO.oncaptiondata.apply(t, [ e ]);
}, this._onmetadata = function(e, n) {
o._wD(t.id + ": Metadata received.");
var r = {}, i, s;
for (i = 0, s = e.length; i < s; i++) r[e[i]] = n[i];
t.metadata = r, t._iO.onmetadata && t._iO.onmetadata.apply(t);
}, this._onid3 = function(e, n) {
o._wD(t.id + ": ID3 data received.");
var r = [], i, s;
for (i = 0, s = e.length; i < s; i++) r[e[i]] = n[i];
t.id3 = M(t.id3, r), t._iO.onid3 && t._iO.onid3.apply(t);
}, this._onconnect = function(e) {
e = e === 1, o._wD(t.id + ": " + (e ? "Connected." : "Failed to connect? - " + t.url), e ? 1 : 2), t.connected = e, e && (t.failures = 0, pt(t.id) && (t.getAutoPlay() ? t.play(s, t.getAutoPlay()) : t._iO.autoLoad && t.load()), t._iO.onconnect && t._iO.onconnect.apply(t, [ e ]));
}, this._ondataerror = function(e) {
t.playState > 0 && (o._wD(t.id + ": Data error: " + e), t._iO.ondataerror && t._iO.ondataerror.apply(t));
}, this._debug();
}, $ = function() {
return v.body || v._docElement || v.getElementsByTagName("div")[0];
}, h = function(e) {
return v.getElementById(e);
}, M = function(e, t) {
var n = e || {}, r, i;
r = t === s ? o.defaultOptions : t;
for (i in r) r.hasOwnProperty(i) && n[i] === s && (typeof r[i] != "object" || r[i] === null ? n[i] = r[i] : n[i] = M(n[i], r[i]));
return n;
}, Ut = function(e, t) {
!e.isHTML5 && b === 8 ? window.setTimeout(t, 0) : t();
}, D = {
onready: 1,
ontimeout: 1,
defaultOptions: 1,
flash9Options: 1,
movieStarOptions: 1
}, _ = function(e, t) {
var n, r = !0, i = t !== s, u = o.setupOptions, a = D;
if (e === s) {
r = [];
for (n in u) u.hasOwnProperty(n) && r.push(n);
for (n in a) a.hasOwnProperty(n) && (typeof o[n] == "object" ? r.push(n + ": {...}") : o[n] instanceof Function ? r.push(n + ": function() {...}") : r.push(n));
return o._wD(st("setup", r.join(", "))), !1;
}
for (n in e) if (e.hasOwnProperty(n)) if (typeof e[n] != "object" || e[n] === null || e[n] instanceof Array || e[n] instanceof RegExp) i && a[t] !== s ? o[t][n] = e[n] : u[n] !== s ? (o.setupOptions[n] = e[n], o[n] = e[n]) : a[n] === s ? (ht(st(o[n] === s ? "setupUndef" : "setupError", n), 2), r = !1) : o[n] instanceof Function ? o[n].apply(o, e[n] instanceof Array ? e[n] : [ e[n] ]) : o[n] = e[n]; else {
if (a[n] !== s) return _(e[n], n);
ht(st(o[n] === s ? "setupUndef" : "setupError", n), 2), r = !1;
}
return r;
}, _t = function() {
function e(e) {
var t = Dt.call(e), n = t.length;
return i ? (t[1] = "on" + t[1], n > 3 && t.pop()) : n === 3 && t.push(!1), t;
}
function t(e, t) {
var n = e.shift(), r = [ s[t] ];
i ? n[r](e[0], e[1]) : n[r].apply(n, e);
}
function n() {
t(e(arguments), "add");
}
function r() {
t(e(arguments), "remove");
}
var i = window.attachEvent, s = {
add: i ? "attachEvent" : "addEventListener",
remove: i ? "detachEvent" : "removeEventListener"
};
return {
add: n,
remove: r
};
}(), It = {
abort: r(function() {
o._wD(this._s.id + ": abort");
}),
canplay: r(function() {
var e = this._s, t;
if (e._html5_canplay) return !0;
e._html5_canplay = !0, o._wD(e.id + ": canplay"), e._onbufferchange(0), t = e._iO.position !== s && !isNaN(e._iO.position) ? e._iO.position / sn : null;
if (e.position && this.currentTime !== t) {
o._wD(e.id + ": canplay: Setting position to " + t);
try {
this.currentTime = t;
} catch (n) {
o._wD(e.id + ": canplay: Setting position of " + t + " failed: " + n.message, 2);
}
}
e._iO._oncanplay && e._iO._oncanplay();
}),
canplaythrough: r(function() {
var e = this._s;
e.loaded || (e._onbufferchange(0), e._whileloading(e.bytesLoaded, e.bytesTotal, e._get_html5_duration()), e._onload(!0));
}),
ended: r(function() {
var e = this._s;
o._wD(e.id + ": ended"), e._onfinish();
}),
error: r(function() {
o._wD(this._s.id + ": HTML5 error, code " + this.error.code), this._s._onload(!1);
}),
loadeddata: r(function() {
var e = this._s;
o._wD(e.id + ": loadeddata"), !e._loaded && !Jt && (e.duration = e._get_html5_duration());
}),
loadedmetadata: r(function() {
o._wD(this._s.id + ": loadedmetadata");
}),
loadstart: r(function() {
o._wD(this._s.id + ": loadstart"), this._s._onbufferchange(1);
}),
play: r(function() {
this._s._onbufferchange(0);
}),
playing: r(function() {
o._wD(this._s.id + ": playing"), this._s._onbufferchange(0);
}),
progress: r(function(e) {
var t = this._s, n, r, i, s = 0, u = e.type === "progress", a = e.target.buffered, f = e.loaded || 0, l = e.total || 1;
t.buffered = [];
if (a && a.length) {
for (n = 0, r = a.length; n < r; n++) t.buffered.push({
start: a.start(n) * sn,
end: a.end(n) * sn
});
s = (a.end(0) - a.start(0)) * sn, f = Math.min(1, s / (e.target.duration * sn));
if (u && a.length > 1) {
i = [], r = a.length;
for (n = 0; n < r; n++) i.push(e.target.buffered.start(n) * sn + "-" + e.target.buffered.end(n) * sn);
o._wD(this._s.id + ": progress, timeRanges: " + i.join(", "));
}
u && !isNaN(f) && o._wD(this._s.id + ": progress, " + Math.floor(f * 100) + "% loaded");
}
isNaN(f) || (t._onbufferchange(0), t._whileloading(f, l, t._get_html5_duration()), f && l && f === l && It.canplaythrough.call(this, e));
}),
ratechange: r(function() {
o._wD(this._s.id + ": ratechange");
}),
suspend: r(function(e) {
var t = this._s;
o._wD(this._s.id + ": suspend"), It.progress.call(this, e), t._onsuspend();
}),
stalled: r(function() {
o._wD(this._s.id + ": stalled");
}),
timeupdate: r(function() {
this._s._onTimer();
}),
waiting: r(function() {
var e = this._s;
o._wD(this._s.id + ": waiting"), e._onbufferchange(1);
})
}, Ct = function(e) {
var t;
return !e || !e.type && !e.url && !e.serverURL ? t = !1 : e.serverURL || e.type && n(e.type) ? t = !1 : t = e.type ? kt({
type: e.type
}) : kt({
url: e.url
}) || o.html5Only || e.url.match(/data\:/i), t;
}, At = function(e) {
var t;
return e && (t = Jt && !Wt ? null : Qt ? on : null, e.src = t, e._called_unload !== undefined && (e._called_load = !1)), Pt && (Ht = null), t;
}, kt = function(e) {
if (!o.useHTML5Audio || !o.hasHTML5) return !1;
var t = e.url || null, r = e.type || null, i = o.audioFormats, u, a, f, l;
if (r && o.html5[r] !== s) return o.html5[r] && !n(r);
if (!Lt) {
Lt = [];
for (l in i) i.hasOwnProperty(l) && (Lt.push(l), i[l].related && (Lt = Lt.concat(i[l].related)));
Lt = new RegExp("\\.(" + Lt.join("|") + ")(\\?.*)?$", "i");
}
return f = t ? t.toLowerCase().match(Lt) : null, !f || !f.length ? r ? (a = r.indexOf(";"), f = (a !== -1 ? r.substr(0, a) : r).substr(6)) : u = !1 : f = f[1], f && o.html5[f] !== s ? u = o.html5[f] && !n(f) : (r = "audio/" + f, u = o.html5.canPlayType({
type: r
}), o.html5[f] = u, u = u && o.html5[r] && !n(r)), u;
}, Mt = function() {
function e(e) {
var n, r, i, s = !1, u = !1;
if (!t || typeof t.canPlayType != "function") return s;
if (e instanceof Array) {
for (r = 0, i = e.length; r < i; r++) if (o.html5[e[r]] || t.canPlayType(e[r]).match(o.html5Test)) u = !0, o.html5[e[r]] = !0, o.flash[e[r]] = !!e[r].match(rn);
s = u;
} else n = t && typeof t.canPlayType == "function" ? t.canPlayType(e) : !1, s = !!n && !!n.match(o.html5Test);
return s;
}
if (!o.useHTML5Audio || !o.hasHTML5) return o.html5.usingFlash = !0, Tt = !0, !1;
var t = Audio !== s ? Kt && opera.version() < 10 ? new Audio(null) : new Audio : null, n, r, i = {}, u, a;
u = o.audioFormats;
for (n in u) if (u.hasOwnProperty(n)) {
r = "audio/" + n, i[n] = e(u[n].type), i[r] = i[n], n.match(rn) ? (o.flash[n] = !0, o.flash[r] = !0) : (o.flash[n] = !1, o.flash[r] = !1);
if (u[n] && u[n].related) for (a = u[n].related.length - 1; a >= 0; a--) i["audio/" + u[n].related[a]] = i[n], o.html5[u[n].related[a]] = i[n], o.flash[u[n].related[a]] = i[n];
}
return i.canPlayType = t ? e : null, o.html5 = M(o.html5, i), o.html5.usingFlash = Nt(), Tt = o.html5.usingFlash, !0;
}, R = {
notReady: "Unavailable - wait until onready() has fired.",
notOK: "Audio support is not available.",
domError: f + "exception caught while appending SWF to DOM.",
spcWmode: "Removing wmode, preventing known SWF loading issue(s)",
swf404: l + "Verify that %s is a valid path.",
tryDebug: "Try " + f + ".debugFlash = true for more security details (output goes to SWF.)",
checkSWF: "See SWF output for more debug info.",
localFail: l + "Non-HTTP page (" + v.location.protocol + " URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
waitFocus: l + "Special case: Waiting for SWF to load with window focus...",
waitForever: l + "Waiting indefinitely for Flash (will recover if unblocked)...",
waitSWF: l + "Waiting for 100% SWF load...",
needFunction: l + "Function object expected for %s",
badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
currentObj: l + "_debug(): Current sound objects",
waitOnload: l + "Waiting for window.onload()",
docLoaded: l + "Document already loaded",
onload: l + "initComplete(): calling soundManager.onload()",
onloadOK: f + ".onload() complete",
didInit: l + "init(): Already called?",
secNote: "Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
badRemove: l + "Failed to remove Flash node.",
shutdown: f + ".disable(): Shutting down",
queue: l + "Queueing %s handler",
smError: "SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
fbTimeout: "No flash response, applying ." + at.swfTimedout + " CSS...",
fbLoaded: "Flash loaded",
fbHandler: l + "flashBlockHandler()",
manURL: "SMSound.load(): Using manually-assigned URL",
onURL: f + ".load(): current URL already assigned.",
badFV: f + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
as2loop: "Note: Setting stream:false so looping can work (flash 8 limitation)",
noNSLoop: "Note: Looping not implemented for MovieStar formats",
needfl9: "Note: Switching to flash 9, required for MP4 formats.",
mfTimeout: "Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
needFlash: l + "Fatal error: Flash is needed to play some required formats, but is not available.",
gotFocus: l + "Got window focus.",
policy: "Enabling usePolicyFile for data access",
setup: f + ".setup(): allowed parameters: %s",
setupError: f + '.setup(): "%s" cannot be assigned with this method.',
setupUndef: f + '.setup(): Could not find option "%s"',
setupLate: f + ".setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
noURL: l + "Flash URL required. Call soundManager.setup({url:...}) to get started.",
sm2Loaded: "SoundManager 2: Ready.",
reset: f + ".reset(): Removing event callbacks",
mobileUA: "Mobile UA detected, preferring HTML5 by default.",
globalHTML5: "Using singleton HTML5 Audio() pattern for this device."
}, st = function() {
var e = Dt.call(arguments), t = e.shift(), n = R && R[t] ? R[t] : "", r, i;
if (n && e && e.length) for (r = 0, i = e.length; r < i; r++) n = n.replace("%s", e[r]);
return n;
}, lt = function(e) {
return b === 8 && e.loops > 1 && e.stream && (L("as2loop"), e.stream = !1), e;
}, ct = function(e, t) {
return e && !e.usePolicyFile && (e.onid3 || e.usePeakData || e.useWaveformData || e.useEQData) && (o._wD((t || "") + st("policy")), e.usePolicyFile = !0), e;
}, ht = function(e) {
Zt && console.warn !== s ? console.warn(e) : o._wD(e);
}, m = function() {
return !1;
}, et = function(e) {
var t;
for (t in e) e.hasOwnProperty(t) && typeof e[t] == "function" && (e[t] = m);
t = null;
}, tt = function(e) {
e === s && (e = !1), (C || e) && o.disable(e);
}, nt = function(e) {
var t = null, n;
if (e) if (e.match(/\.swf(\?.*)?$/i)) {
t = e.substr(e.toLowerCase().lastIndexOf(".swf?") + 4);
if (t) return e;
} else e.lastIndexOf("/") !== e.length - 1 && (e += "/");
return n = (e && e.lastIndexOf("/") !== -1 ? e.substr(0, e.lastIndexOf("/") + 1) : "./") + o.movieURL, o.noSWFCache && (n += "?ts=" + (new Date).getTime()), n;
}, I = function() {
b = parseInt(o.flashVersion, 10), b !== 8 && b !== 9 && (o._wD(st("badFV", b, Z)), o.flashVersion = b = Z);
var e = o.debugMode || o.debugFlash ? "_debug.swf" : ".swf";
o.useHTML5Audio && !o.html5Only && o.audioFormats.mp4.required && b < 9 && (o._wD(st("needfl9")), o.flashVersion = b = 9), o.version = o.versionNumber + (o.html5Only ? " (HTML5-only mode)" : b === 9 ? " (AS3/Flash 9)" : " (AS2/Flash 8)"), b > 8 ? (o.defaultOptions = M(o.defaultOptions, o.flash9Options), o.features.buffering = !0, o.defaultOptions = M(o.defaultOptions, o.movieStarOptions), o.filePatterns.flash9 = new RegExp("\\.(mp3|" + ln.join("|") + ")(\\?.*)?$", "i"), o.features.movieStar = !0) : o.features.movieStar = !1, o.filePattern = o.filePatterns[b !== 8 ? "flash9" : "flash8"], o.movieURL = (b === 8 ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", e), o.features.peakData = o.features.waveformData = o.features.eqData = b > 8;
}, Q = function(e, t) {
if (!a) return !1;
a._setPolling(e, t);
}, G = function() {
o.debugURLParam.test(d) && (o.debugMode = !0);
if (h(o.debugID)) return !1;
var e, t, n, r, i;
if (o.debugMode && !h(o.debugID) && (!Zt || !o.useConsole || !o.consoleOnly)) {
e = v.createElement("div"), e.id = o.debugID + "-toggle", r = {
position: "fixed",
bottom: "0px",
right: "0px",
width: "1.2em",
height: "1.2em",
lineHeight: "1.2em",
margin: "2px",
textAlign: "center",
border: "1px solid #999",
cursor: "pointer",
background: "#fff",
color: "#333",
zIndex: 10001
}, e.appendChild(v.createTextNode("-")), e.onclick = ft, e.title = "Toggle SM2 debug console", p.match(/msie 6/i) && (e.style.position = "absolute", e.style.cursor = "hand");
for (i in r) r.hasOwnProperty(i) && (e.style[i] = r[i]);
t = v.createElement("div"), t.id = o.debugID, t.style.display = o.debugMode ? "block" : "none";
if (o.debugMode && !h(e.id)) {
try {
n = $(), n.appendChild(e);
} catch (s) {
throw new Error(st("domError") + " \n" + s.toString());
}
n.appendChild(t);
}
}
n = null;
}, pt = this.getSoundById, L = function(e, t) {
return e ? o._wD(st(e), t) : "";
}, ft = function() {
var e = h(o.debugID), t = h(o.debugID + "-toggle");
if (!e) return !1;
E ? (t.innerHTML = "+", e.style.display = "none") : (t.innerHTML = "-", e.style.display = "block"), E = !E;
}, S = function(e, t, n) {
if (window.sm2Debugger !== s) try {
sm2Debugger.handleEvent(e, t, n);
} catch (r) {
return !1;
}
return !0;
}, ut = function() {
var e = [];
return o.debugMode && e.push(at.sm2Debug), o.debugFlash && e.push(at.flashDebug), o.useHighPerformance && e.push(at.highPerf), e.join(" ");
}, ot = function() {
var e = st("fbHandler"), t = o.getMoviePercent(), n = at, r = {
type: "FLASHBLOCK"
};
if (o.html5Only) return !1;
o.ok() ? (o.didFlashBlock && o._wD(e + ": Unblocked"), o.oMC && (o.oMC.className = [ ut(), n.swfDefault, n.swfLoaded + (o.didFlashBlock ? " " + n.swfUnblocked : "") ].join(" "))) : (Tt && (o.oMC.className = ut() + " " + n.swfDefault + " " + (t === null ? n.swfTimedout : n.swfError), o._wD(e + ": " + st("fbTimeout") + (t ? " (" + st("fbLoaded") + ")" : ""))), o.didFlashBlock = !0, H({
type: "ontimeout",
ignoreInit: !0,
error: r
}), K(r));
}, P = function(e, t, n) {
w[e] === s && (w[e] = []), w[e].push({
method: t,
scope: n || null,
fired: !1
});
}, H = function(e) {
e || (e = {
type: o.ok() ? "onready" : "ontimeout"
});
if (!N && e && !e.ignoreInit) return !1;
if (e.type === "ontimeout" && (o.ok() || C && !e.ignoreInit)) return !1;
var t = {
success: e && e.ignoreInit ? o.ok() : !C
}, n = e && e.type ? w[e.type] || [] : [], r = [], i, s, u = [ t ], a = Tt && !o.ok();
e.error && (u[0].error = e.error);
for (i = 0, s = n.length; i < s; i++) n[i].fired !== !0 && r.push(n[i]);
if (r.length) for (i = 0, s = r.length; i < s; i++) r[i].scope ? r[i].method.apply(r[i].scope, u) : r[i].method.apply(this, u), a || (r[i].fired = !0);
return !0;
}, B = function() {
window.setTimeout(function() {
o.useFlashBlock && ot(), H(), typeof o.onload == "function" && (L("onload", 1), o.onload.apply(window), L("onloadOK", 1)), o.waitForWindowLoad && _t.add(window, "load", B);
}, 1);
}, jt = function() {
if (Bt !== s) return Bt;
var e = !1, t = navigator, n = t.plugins, r, i, o, u = window.ActiveXObject;
if (n && n.length) i = "application/x-shockwave-flash", o = t.mimeTypes, o && o[i] && o[i].enabledPlugin && o[i].enabledPlugin.description && (e = !0); else if (u !== s && !p.match(/MSAppHost/i)) {
try {
r = new u("ShockwaveFlash.ShockwaveFlash");
} catch (a) {
r = null;
}
e = !!r, r = null;
}
return Bt = e, e;
}, Nt = function() {
var e, t, n = o.audioFormats, r = Wt && !!p.match(/os (1|2|3_0|3_1)/i);
if (r) o.hasHTML5 = !1, o.html5Only = !0, o.oMC && (o.oMC.style.display = "none"); else if (o.useHTML5Audio) {
if (!o.html5 || !o.html5.canPlayType) o._wD("SoundManager: No HTML5 Audio() support detected."), o.hasHTML5 = !1;
Yt && o._wD(l + "Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - " + (Bt ? "will use flash fallback for MP3/MP4, if available" : " would use flash fallback for MP3/MP4, but none detected."), 1);
}
if (o.useHTML5Audio && o.hasHTML5) {
xt = !0;
for (t in n) n.hasOwnProperty(t) && n[t].required && (o.html5.canPlayType(n[t].type) ? o.preferFlash && (o.flash[t] || o.flash[n[t].type]) && (e = !0) : (xt = !1, e = !0));
}
return o.ignoreFlash && (e = !1, xt = !0), o.html5Only = o.hasHTML5 && o.useHTML5Audio && !e, !o.html5Only;
}, Et = function(e) {
var t, n, r = 0, i;
if (e instanceof Array) {
for (t = 0, n = e.length; t < n; t++) if (e[t] instanceof Object) {
if (o.canPlayMIME(e[t].type)) {
r = t;
break;
}
} else if (o.canPlayURL(e[t])) {
r = t;
break;
}
e[r].url && (e[r] = e[r].url), i = e[r];
} else i = e;
return i;
}, mt = function(e) {
e._hasTimer || (e._hasTimer = !0, !Gt && o.html5PollingInterval && (wt === null && bt === 0 && (wt = setInterval(yt, o.html5PollingInterval)), bt++));
}, gt = function(e) {
e._hasTimer && (e._hasTimer = !1, !Gt && o.html5PollingInterval && bt--);
}, yt = function() {
var e;
if (wt !== null && !bt) return clearInterval(wt), wt = null, !1;
for (e = o.soundIDs.length - 1; e >= 0; e--) o.sounds[o.soundIDs[e]].isHTML5 && o.sounds[o.soundIDs[e]]._hasTimer && o.sounds[o.soundIDs[e]]._onTimer();
}, K = function(e) {
e = e !== s ? e : {}, typeof o.onerror == "function" && o.onerror.apply(window, [ {
type: e.type !== s ? e.type : null
} ]), e.fatal !== s && e.fatal && o.disable();
}, Ft = function() {
if (!Yt || !jt()) return !1;
var e = o.audioFormats, t, n;
for (n in e) if (e.hasOwnProperty(n)) if (n === "mp3" || n === "mp4") {
o._wD(f + ": Using flash fallback for " + n + " format"), o.html5[n] = !1;
if (e[n] && e[n].related) for (t = e[n].related.length - 1; t >= 0; t--) o.html5[e[n].related[t]] = !1;
}
}, this._setSandboxType = function(e) {
var t = o.sandbox;
t.type = e, t.description = t.types[t.types[e] !== s ? e : "unknown"], t.type === "localWithFile" ? (t.noRemote = !0, t.noLocal = !1, L("secNote", 2)) : t.type === "localWithNetwork" ? (t.noRemote = !1, t.noLocal = !0) : t.type === "localTrusted" && (t.noRemote = !1, t.noLocal = !1);
}, this._externalInterfaceOK = function(e) {
if (o.swfLoaded) return !1;
var t;
S("swf", !0), S("flashtojs", !0), o.swfLoaded = !0, tn = !1, Yt && Ft();
if (!e || e.replace(/\+dev/i, "") !== o.versionNumber.replace(/\+dev/i, "")) return t = f + ': Fatal: JavaScript file build "' + o.versionNumber + '" does not match Flash SWF build "' + e + '" at ' + o.url + ". Ensure both are up-to-date.", setTimeout(function() {
throw new Error(t);
}, 0), !1;
setTimeout(y, Vt ? 100 : 1);
}, J = function(e, t) {
function n() {
var e = [], t, n = [], r = " + ";
t = "SoundManager " + o.version + (!o.html5Only && o.useHTML5Audio ? o.hasHTML5 ? " + HTML5 audio" : ", no HTML5 audio support" : ""), o.html5Only ? o.html5PollingInterval && e.push("html5PollingInterval (" + o.html5PollingInterval + "ms)") : (o.preferFlash && e.push("preferFlash"), o.useHighPerformance && e.push("useHighPerformance"), o.flashPollingInterval && e.push("flashPollingInterval (" + o.flashPollingInterval + "ms)"), o.html5PollingInterval && e.push("html5PollingInterval (" + o.html5PollingInterval + "ms)"), o.wmode && e.push("wmode (" + o.wmode + ")"), o.debugFlash && e.push("debugFlash"), o.useFlashBlock && e.push("flashBlock")), e.length && (n = n.concat([ e.join(r) ])), o._wD(t + (n.length ? r + n.join(", ") : ""), 1), qt();
}
function r(e, t) {
return '<param name="' + e + '" value="' + t + '" />';
}
if (x && T) return !1;
if (o.html5Only) return I(), n(), o.oMC = h(o.movieID), y(), x = !0, T = !0, !1;
var i = t || o.url, u = o.altURL || i, a = "JS/Flash audio component (SoundManager 2)", f = $(), l = ut(), c = null, d = v.getElementsByTagName("html")[0], m, g, b, w, E, S, N, C;
c = d && d.dir && d.dir.match(/rtl/i), e = e === s ? o.id : e, I(), o.url = nt(un ? i : u), t = o.url, o.wmode = !o.wmode && o.useHighPerformance ? "transparent" : o.wmode, o.wmode !== null && (p.match(/msie 8/i) || !Vt && !o.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (St.push(R.spcWmode), o.wmode = null), m = {
name: e,
id: e,
src: t,
quality: "high",
allowScriptAccess: o.allowScriptAccess,
bgcolor: o.bgColor,
pluginspage: an + "www.macromedia.com/go/getflashplayer",
title: a,
type: "application/x-shockwave-flash",
wmode: o.wmode,
hasPriority: "true"
}, o.debugFlash && (m.FlashVars = "debug=1"), o.wmode || delete m.wmode;
if (Vt) g = v.createElement("div"), w = [ '<object id="' + e + '" data="' + t + '" type="' + m.type + '" title="' + m.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + an + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', r("movie", t), r("AllowScriptAccess", o.allowScriptAccess), r("quality", m.quality), o.wmode ? r("wmode", o.wmode) : "", r("bgcolor", o.bgColor), r("hasPriority", "true"), o.debugFlash ? r("FlashVars", m.FlashVars) : "", "</object>" ].join(""); else {
g = v.createElement("embed");
for (b in m) m.hasOwnProperty(b) && g.setAttribute(b, m[b]);
}
G(), l = ut(), f = $();
if (f) {
o.oMC = h(o.movieID) || v.createElement("div");
if (!o.oMC.id) {
o.oMC.id = o.movieID, o.oMC.className = at.swfDefault + " " + l, S = null, E = null, o.useFlashBlock || (o.useHighPerformance ? S = {
position: "fixed",
width: "8px",
height: "8px",
bottom: "0px",
left: "0px",
overflow: "hidden"
} : (S = {
position: "absolute",
width: "6px",
height: "6px",
top: "-9999px",
left: "-9999px"
}, c && (S.left = Math.abs(parseInt(S.left, 10)) + "px"))), $t && (o.oMC.style.zIndex = 1e4);
if (!o.debugFlash) for (N in S) S.hasOwnProperty(N) && (o.oMC.style[N] = S[N]);
try {
Vt || o.oMC.appendChild(g), f.appendChild(o.oMC), Vt && (E = o.oMC.appendChild(v.createElement("div")), E.className = at.swfBox, E.innerHTML = w), T = !0;
} catch (k) {
throw new Error(st("domError") + " \n" + k.toString());
}
} else C = o.oMC.className, o.oMC.className = (C ? C + " " : at.swfDefault) + (l ? " " + l : ""), o.oMC.appendChild(g), Vt && (E = o.oMC.appendChild(v.createElement("div")), E.className = at.swfBox, E.innerHTML = w), T = !0;
}
return x = !0, n(), !0;
}, U = function() {
return o.html5Only ? (J(), !1) : a ? !1 : o.url ? (a = o.getMovie(o.id), a || (rt ? (Vt ? o.oMC.innerHTML = it : o.oMC.appendChild(rt), rt = null, x = !0) : J(o.id, o.url), a = o.getMovie(o.id)), typeof o.oninitmovie == "function" && setTimeout(o.oninitmovie, 1), Rt(), !0) : (L("noURL"), !1);
}, j = function() {
setTimeout(F, 1e3);
}, F = function() {
var e, t = !1;
if (!o.url) return !1;
if (dt) return !1;
dt = !0, _t.remove(window, "load", j);
if (tn && !en) return L("waitFocus"), !1;
N || (e = o.getMoviePercent(), e > 0 && e < 100 && (t = !0)), setTimeout(function() {
e = o.getMoviePercent();
if (t) return dt = !1, o._wD(st("waitSWF")), window.setTimeout(j, 1), !1;
N || (o._wD(f + ": No Flash response within expected time. Likely causes: " + (e === 0 ? "SWF load failed, " : "") + "Flash blocked or JS-Flash security error." + (o.debugFlash ? " " + st("checkSWF") : ""), 2), !un && e && (L("localFail", 2), o.debugFlash || L("tryDebug", 2)), e === 0 && o._wD(st("swf404", o.url), 1), S("flashtojs", !1, ": Timed out" + un ? " (Check flash security or flash blockers)" : " (No plugin/missing SWF?)")), !N && nn && (e === null ? o.useFlashBlock || o.flashLoadTimeout === 0 ? (o.useFlashBlock && ot(), L("waitForever")) : !o.useFlashBlock && xt ? window.setTimeout(function() {
ht(l + "useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false..."), o.setup({
preferFlash: !1
}).reboot(), o.didFlashBlock = !0, o.beginDelayedInit();
}, 1) : (L("waitForever"), H({
type: "ontimeout",
ignoreInit: !0
})) : o.flashLoadTimeout === 0 ? L("waitForever") : tt(!0));
}, o.flashLoadTimeout);
}, q = function() {
function e() {
_t.remove(window, "focus", q);
}
return en || !tn ? (e(), !0) : (nn = !0, en = !0, L("gotFocus"), dt = !1, j(), e(), !0);
}, Rt = function() {
St.length && (o._wD("SoundManager 2: " + St.join(" "), 1), St = []);
}, qt = function() {
Rt();
var e, t = [];
if (o.useHTML5Audio && o.hasHTML5) {
for (e in o.audioFormats) o.audioFormats.hasOwnProperty(e) && t.push(e + " = " + o.html5[e] + (!o.html5[e] && Tt && o.flash[e] ? " (using flash)" : o.preferFlash && o.flash[e] && Tt ? " (preferring flash)" : o.html5[e] ? "" : " (" + (o.audioFormats[e].required ? "required, " : "") + "and no flash support)"));
o._wD("SoundManager 2 HTML5 support: " + t.join(", "), 1);
}
}, O = function(e) {
if (N) return !1;
if (o.html5Only) return L("sm2Loaded"), N = !0, B(), S("onload", !0), !0;
var t = o.useFlashBlock && o.flashLoadTimeout && !o.getMoviePercent(), n = !0, r;
return t || (N = !0, C && (r = {
type: !Bt && Tt ? "NO_FLASH" : "INIT_TIMEOUT"
})), o._wD("SoundManager 2 " + (C ? "failed to load" : "loaded") + " (" + (C ? "Flash security/load error" : "OK") + ")", C ? 2 : 1), C || e ? (o.useFlashBlock && o.oMC && (o.oMC.className = ut() + " " + (o.getMoviePercent() === null ? at.swfTimedout : at.swfError)), H({
type: "ontimeout",
error: r,
ignoreInit: !0
}), S("onload", !1), K(r), n = !1) : S("onload", !0), C || (o.waitForWindowLoad && !k ? (L("waitOnload"), _t.add(window, "load", B)) : (o.waitForWindowLoad && k && L("docLoaded"), B())), n;
}, g = function() {
var e, t = o.setupOptions;
for (e in t) t.hasOwnProperty(e) && (o[e] === s ? o[e] = t[e] : o[e] !== t[e] && (o.setupOptions[e] = o[e]));
}, y = function() {
function e() {
_t.remove(window, "load", o.beginDelayedInit);
}
if (N) return L("didInit"), !1;
if (o.html5Only) return N || (e(), o.enabled = !0, O()), !0;
U();
try {
a._externalInterfaceTest(!1), Q(!0, o.flashPollingInterval || (o.useHighPerformance ? 10 : 50)), o.debugMode || a._disableDebug(), o.enabled = !0, S("jstoflash", !0), o.html5Only || _t.add(window, "unload", m);
} catch (t) {
return o._wD("js/flash exception: " + t.toString()), S("jstoflash", !1), K({
type: "JS_TO_FLASH_EXCEPTION",
fatal: !0
}), tt(!0), O(), !1;
}
return O(), e(), !0;
}, W = function() {
return V ? !1 : (V = !0, g(), G(), function() {
var e = "sm2-usehtml5audio=", t = "sm2-preferflash=", n = null, r = null, i = d.toLowerCase();
i.indexOf(e) !== -1 && (n = i.charAt(i.indexOf(e) + e.length) === "1", Zt && console.log((n ? "Enabling " : "Disabling ") + "useHTML5Audio via URL parameter"), o.setup({
useHTML5Audio: n
})), i.indexOf(t) !== -1 && (r = i.charAt(i.indexOf(t) + t.length) === "1", Zt && console.log((r ? "Enabling " : "Disabling ") + "preferFlash via URL parameter"), o.setup({
preferFlash: r
}));
}(), !Bt && o.hasHTML5 && (o._wD("SoundManager: No Flash detected" + (o.useHTML5Audio ? ". Trying HTML5-only mode." : ", enabling HTML5."), 1), o.setup({
useHTML5Audio: !0,
preferFlash: !1
})), Mt(), !Bt && Tt && (St.push(R.needFlash), o.setup({
flashLoadTimeout: 1
})), v.removeEventListener && v.removeEventListener("DOMContentLoaded", W, !1), U(), !0);
}, Ot = function() {
return v.readyState === "complete" && (W(), v.detachEvent("onreadystatechange", Ot)), !0;
}, X = function() {
k = !0, _t.remove(window, "load", X);
}, z = function() {
if (Gt) {
(!o.setupOptions.useHTML5Audio || o.setupOptions.preferFlash) && St.push(R.mobileUA), o.setupOptions.useHTML5Audio = !0, o.setupOptions.preferFlash = !1;
if (Wt || Xt && !p.match(/android\s2\.3/i)) St.push(R.globalHTML5), Wt && (o.ignoreFlash = !0), Pt = !0;
}
}, z(), jt(), _t.add(window, "focus", q), _t.add(window, "load", j), _t.add(window, "load", X), v.addEventListener ? v.addEventListener("DOMContentLoaded", W, !1) : v.attachEvent ? v.attachEvent("onreadystatechange", Ot) : (S("onload", !1), K({
type: "NO_DOM2_EVENTS",
fatal: !0
}));
}
if (window.SM2_DEFER === undefined || !SM2_DEFER) i = new o;
return window.soundManager = i, i;
} catch (u) {
wx.jslog({
src: "biz_web/lib/soundmanager2.js"
}, u);
}
});define("tpl/media/dialog/file.html.js",[],function(){
return'{each list as item}\n{mediaDialogInit item}\n<li class="media_item">\n    <div class="media_info">\n        <label class="media_name frm_radio_label">\n        	<i class="icon_radio"></i>\n        	<input name="media" type="radio" class="frm_radio" value="{item.file_id}">\n            {item.name}\n        </label>\n        <span class="media_size">{item.size}</span>\n        <span class="media_time">{mediaDialogtimeFormat item.update_time}</span>\n    </div>\n    <div id="fileItem{item.file_id}" data-id="{item.file_id}" data-type="{item.type}" class="media_content"></div>\n</li>\n{/each}\n';
});define("tpl/media/dialog/videomsg_layout.html.js",[],function(){
return'<div class="dialog_media_container">\n    <div class="sub_title_bar in_dialog">\n        <div class="title_tab js_videotab"></div>\n        <div class="search_bar dn">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="richvideo_create js_video_create {if scene != \'default\'}dn{/if}">\n            <a class="" target="_blank" href="www.baidu.com?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                <i class="icon_richvideo_small"></i><strong>新建视频消息</strong>\n            </a>\n        </div>\n    </div>\n    <div class="js_video_status js_video_content dn">\n        <div class="richvideo_list media_dialog" id="js_videomsg_list">\n            <div class="richvideo_col"><div class="inner"></div></div>&nbsp;\n            <div class="richvideo_col"><div class="inner"></div></div>\n        </div>\n    </div>\n    <div class="js_video_status js_video_tencent dn">\n        <div class="video">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">视频网址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box"><input type="text" class="frm_input js_video_txurl"></span>\n                    <p class="frm_tips">支持腾讯视频和微视频</p>\n                </div>\n            </div>\n			<div class="video_preview js_video_preview"></div>\n		</div>\n    </div>\n    <div class="js_video_status js_video_loading">\n        <i class="icon_loading_small white">loading...</i>\n    </div>\n    <div class="js_video_status js_video_none dn">\n        <div class="no_media_wrp">\n            <p class="empty_tips js_empty_tips"></p>\n            <!--\n            <div class="richvideo_create js_video_create">\n                <a class="" target="_blank" href="www.baidu.com?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                    <i class="icon_richvideo_small"></i><strong>新建视频消息</strong>\n                </a>\n            </div>\n            -->\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    \n    <div class="pagination_wrp pageNavigator js_pagebar"></div>\n</div>\n';
});define("tpl/media/dialog/appmsg_layout.html.js",[],function(){
return'<div class="dialog_media_container appmsg_media_dialog">\n    <div class="sub_title_bar in_dialog">\n        <div class="search_bar">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="标题/作者/摘要" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="appmsg_create tr">\n            {if type==10}\n            <a class="" target="_blank" href="/MenuWxs/新建单图文">\n                <i class="icon_appmsg_small"></i><strong>新建单图文消息</strong>\n            </a>\n            <a class="" target="_blank" href="www.baidu.com?t=media/appmsg_edit&action=edit&type=10&isMul=1&lang=zh_CN&token={token}">\n                <i class="icon_appmsg_small multi"></i><strong>新建多图文消息</strong>\n            </a>\n            {else if type==11}\n            <a class="" target="_blank" href="www.baidu.com?t=media/appmsg_edit&action=edit&type=11&lang=zh_CN&token={token}">\n                <i class="icon_shopmsg_small"></i><strong>新建单商品消息</strong>\n            </a>\n            <a class="" target="_blank" href="www.baidu.com?t=media/appmsg_edit&action=edit&type=11&isMul=1&lang=zh_CN&token={token}">\n                <i class="icon_shopmsg_small multi"></i><strong>新建多商品消息</strong>\n            </a>\n            {/if}\n        </div>\n    </div>\n    <div class="dialog_media_inner">\n        {if tpl=="loading"}\n        <i class="icon_loading_small white">loading...</i>\n        {else if tpl=="no-media"}\n        <div class="no_media_wrp">\n            <p class="tips">暂无素材</p>\n        </div>\n        <span class="vm_box"></span>\n        {else}\n        <div class="js_appmsg_list appmsg_list media_dialog">\n            <div class="appmsg_col"><div class="inner"></div></div>&nbsp;\n            <div class="appmsg_col"><div class="inner"></div></div>\n        </div>\n        <div class="pagination_wrp pageNavigator"></div>\n        {/if}\n    </div>\n</div>\n';
});define("tpl/media/dialog/file_layout.html.js",[],function(){
return'<div class=\'dialog_media_container {if tpl=="no-media"}no_media{/if}\'>\n    {if tpl=="loading"}\n    <i class="icon_loading_small white">loading...</i>\n    {else if tpl=="no-media"}\n    <div class="no_media_wrp">\n        <p class="tips">\n        暂无素材        </p>\n        <div class="upload_box">\n            <span class="upload_area"><a id="js_media_dialog_upload{upload_id}" class="btn btn_upload" data-gid="">上传</a></span>\n            <div class="bubble_tips bubble_right warn">\n                <div class="bubble_tips_inner">\n                    {if type=="2"}\n                        大小: 不超过2M,&nbsp;&nbsp;&nbsp;&nbsp;格式: bmp, png, jpeg, jpg, gif                    {/if}\n                    {if type=="3"}\n                        大小: 不超过5M,&nbsp;&nbsp;&nbsp;&nbsp;长度: 不超过60s,&nbsp;&nbsp;&nbsp;&nbsp;格式: mp3, wma, wav, amr                    {/if}\n                    {if type=="4"}\n                        大小: 不超过20M,&nbsp;&nbsp;&nbsp;&nbsp;格式: rm, rmvb, wmv, avi, mpg, mpeg, mp4                    {/if}\n                </div> \n                <i class="bubble_tips_arrow out"></i>\n                <i class="bubble_tips_arrow in"></i>\n            </div>\n        </div>\n    </div>\n    <span class="vm_box"></span>\n    {else}\n    <div class="sub_title_bar in_dialog">\n        <div class="search_bar dn">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="upload_box">\n            <span class="upload_area"><a id="js_media_dialog_upload{upload_id}" class="btn btn_upload" data-gid="">上传</a></span>&nbsp;\n            <div class="bubble_tips bubble_left warn">\n                <div class="bubble_tips_inner">\n                    {if type=="2"}\n                        大小: 不超过2M,&nbsp;&nbsp;&nbsp;&nbsp;格式: bmp, png, jpeg, jpg, gif                    {/if}\n                    {if type=="3"}\n                        大小: 不超过5M,&nbsp;&nbsp;&nbsp;&nbsp;长度: 不超过60s,&nbsp;&nbsp;&nbsp;&nbsp;格式: mp3, wma, wav, amr                    {/if}\n                    {if type=="4"}\n                        大小: 不超过20M,&nbsp;&nbsp;&nbsp;&nbsp;格式: rm, rmvb, wmv, avi, mpg, mpeg, mp4                    {/if}\n                </div>\n                <i class="bubble_tips_arrow out"></i>\n                <i class="bubble_tips_arrow in"></i>\n            </div>\n        </div>&nbsp;\n    </div>\n    <ul class=\'dialog_media_list js_media_list\'></ul>\n    <div class="pagination_wrp pageNavigator"></div>\n    {/if}\n</div>\n';
});define("cardticket/send_card.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js","tpl/cardticket/send_card.html.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$send_popup.popup("get"),e.find(".js_card_list").html(v({
loading:!0
}));
}
function a(t,a){
var i=a.opt,n=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count
},i.param);
j=!0,e(a),s.get({
url:i.url||"/merchant/electroniccardmgr",
data:n,
complete:function(){
j=!1;
}
},function(t){
if(0==t.base_resp.ret){
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,i.data=t.card_list;
var e=u.parse_cardlist(i.data);
m=e.card_cache,i.data=e.card_list,i.pageInfo.total_count=t.total_num,o(i.pageInfo,a);
}else s.show(t);
});
}
function o(t,e,a){
var o,p=e.opt;
if(p.payflag=p.param.flag,o=e.$send_popup.popup("get"),a){
var s=o.find(".js_select");
return s.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.$send_popup.popup("resetPosition"),e.pagebar=null,void r(p.pageInfo,e);
}
o.find(".js_card_list").html(v(p));
var d=p.defaultValues,s=o.find(".js_select");
d.length&&s.each(function(){
for(var t=$(this),e=0;e<d.length;e++)if(d[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=s.checkbox({
onChanged:function(){
if(p.multi){
var t=0;
s.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",o).text(t);
}
}
}),e.pagebar=null,r(p.pageInfo,e),i(e),n(e),c(e),e.$send_popup.popup("resetPosition");
}
function i(t){
function e(e){
var o=$.trim(n.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(c.param.keyword=o,a(c.pageInfo,t));
}
var o=t.$send_popup.popup("get"),i=$(".js_search",o),n=$(".js_keyword",o),c=t.opt;
i.click(function(){
e();
}),n.keyup(function(t){
e(t);
}),n.val(c.param.keyword);
}
function n(t){
var e=t.$send_popup.popup("get"),a=e.find(".js_card_preview");
a.on("click",function(t){
var e=$(this).data("cid"),a=m[e];
if(a){
var o=($(this),$(this).offset());
$(".js_pop_card_preview").remove();
var i=$(h({
card:a
})).appendTo(document.body).hide();
i.css({
position:"fixed",
left:o.left-i.outerWidth()-10,
top:"50%",
"margin-top":-1*i.outerHeight()/2,
"z-index":"10000"
}).show();
var n=i.offset();
return i.find(".js_arrow").css({
top:o.top-n.top
}),$(document).one("click",function(){
i.remove();
}),t.stopPropagation(),!1;
}
});
}
function c(t){
var e=t.$send_popup.popup("get"),a=e.find(".js_modify_quantity");
a.each(function(){
var t=$(this),e=1*t.attr("data-new")||0;
new k({
container:t,
setquantity:e?!0:!1,
quantityChange:function(e,a){
var o=m[e];
o&&(o.quantity=this.opt.setquantity?o.quantity+a:a,t.attr("data-new",1),o.isnew=!0,
this.opt.setquantity=!0,$("#js_ct_tr_"+e).find(".js_sendcard_quantity").text(o.quantity));
}
});
});
}
function r(t,e){
var i=t.total_count,n=e.$send_popup.popup("get");
if(t.count&&i>t.count){
var c=t.begin/t.count;
e.pagebar=new d({
container:$(".js_pager",n),
first:!1,
last:!1,
midRange:5,
initShowPage:c+1,
perPage:t.count,
totalItemsNum:i,
callback:function(i){
if(j)return!1;
var n=i.currentPage;
return n!=c+1&&(t.begin=(n-1)*t.count,e.opt.hasdata&&e.opt.data?o(t,e,!0):a(t,e)),
e.$send_popup.popup("resetPosition"),!0;
}
});
}
}
var p=(t("common/wx/popup.js"),t("common/wx/Tips.js")),s=t("common/wx/Cgi.js"),d=(t("common/wx/Step.js"),
t("common/wx/pagebar.js")),u=t("cardticket/parse_data.js"),l=t("cardticket/store_cgi.js"),_=(t("cardticket/common_template_helper.js"),
{
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
defaultValues:[],
url:"",
removeOnHide:!0,
source:""
}),f=t("tpl/cardticket/card_table.html.js"),h=template.compile(t("tpl/cardticket/card_preview.html.js")),m={};
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var g=function(t){
this.opt=$.extend(!0,{},_,t),this.init();
},v=template.compile(f),j=!1,k=t("cardticket/card_quantity.js");
return g.prototype={
_html:t("tpl/cardticket/send_card.html.js"),
init:function(){
var t=this.opt,e=this,i=$(template.compile(this._html)()).popup({
title:"选择卡券",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(a){
if(!j){
var o=e.select_card_checkbox.values()[0],i=this,n=i.get(),c=m[o];
if(!o||!c)return void p.err("请选择卡券");
if(t.multi)for(var r=e.select_card_checkbox.values(),s=0;s<r.length;s++){
var d=m[r[s]];
if(t.neednew&&(!d.isnew||0==d.quantity))return p.err("卡券库存不能为0，请先设置库存再投放"),void a.stopPropagation();
}else if(t.neednew&&(!c.isnew||0==c.quantity)){
p.err("请先设置库存再投放卡券");
var u=n.find("input[data-id="+o+"]");
return $(u.closest("tr").find(".js_modify_quantity")[0]).click(),void a.stopPropagation();
}
if(!t.multi&&t.noexpire&&c.is_expire)return void p.err("卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(t.multi&&t.noexpire)for(var r=e.select_card_checkbox.values(),s=0;s<r.length;s++){
var d=m[r[s]];
if(d.is_expire)return p.err("不能选择已过期的卡券，请先到卡券详情去延长有效期"),void a.stopPropagation();
}
var r=e.select_card_checkbox.values();
return r.length>t.maxcount?(p.err("最多只能选择%s个卡券".sprintf(t.maxcount)),void a.stopPropagation()):void l.canSendCard({
card_id:o,
success:function(a){
if(a===!1)p.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var o=e.select_card_checkbox.values(),n=t.multi?o:o,c=[];
if(t.multi)for(var r=0;r<n.length;r++)m[n[r]].cardid=m[n[r]].id,c.push(m[n[r]]);else c=m[n],
c.cardid=m[n].id;
t.selectComplete&&t.selectComplete(c,0),i.hide();
}
}
});
}
}
},{
text:"取消",
type:"default",
click:function(){
j||this.hide();
}
}],
onHide:function(){
t.onHide.call(e),t.removeOnHide&&this.remove();
},
className:"send_card align_edge",
width:960
});
if(this.$send_popup=i,t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,m={};
for(var n=0;n<t.data.length;n++){
var c=t.data[n];
m[c.id]=c;
}
o(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$send_popup.popup("show"),this.$send_popup.popup("resetPosition");
},
hide:function(){
this.$send_popup.popup("hide");
},
destroy:function(){
this.$send_popup.popup("remove");
}
},g;
});define("common/wx/media/videoDialog.js",["common/wx/popup.js","page/smallvideo/dialog_select_video.css","widget/media/media_dialog.css","common/wx/top.js","common/wx/Tips.js","common/wx/media/video.js","common/wx/pagebar.js","media/media_cgi.js","tpl/media/dialog/videomsg_layout.html.js"],function(e){
"use strict";
function i(e,i,t){
e=e.replace(/^\s+|\s+$/g,""),e=e.replace(/^v\.qq\.com/,"http://v.qq.com"),-1!=e.indexOf("http://v.qq.com")?d(e,i,t):(-1!=e.indexOf("http://www.weishi.com")||-1!=e.indexOf("http://weishi.com")||-1!=e.indexOf("http://www.weishi.qq.com")||-1!=e.indexOf("http://weishi.qq.com"))&&n(e,i,t);
}
function t(e,i){
var i=i||document.location.toString(),t=e+"=",o=i.indexOf(t);
if(-1!=o){
var d=i.indexOf("&",o),n=i.indexOf("?",o);
return-1!=n&&(-1==d||d>n)&&(d=n),n=i.indexOf("#",o),-1!=n&&(-1==d||d>n)&&(d=n),-1==d?i.substring(o+t.length):i.substring(o+t.length,d);
}
return"";
}
function o(e){
e=e||window.location.toString();
var i,o=t("vid",e);
return o||(i=e.match(/\/\w{15}\/(\w+)\.html/))&&(o=i[1]),o||((i=e.match(/\/page\/\w{1}\/\w{1}\/\w{1}\/(\w+)\.html/))?o=i[1]:(i=e.match(/\/(page|play)\/+(\w{11})\.html/))&&(o=i[2])),
o||(i=e.match(/\/boke\/gplay\/\w+_\w+_(\w+)\.html/))&&(o=i[1]),encodeURIComponent(o);
}
function d(e,i,t){
var d,n,a="",s=t.width,m=t.height;
if(d=e.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)")))a=encodeURIComponent(d[2]),
t.vid=a,n="http://v.qq.com/iframe/player.html?vid="+a+"&width="+s+"&height="+m+"&auto=0",
i(n,t);else if(d=e.match(new RegExp("(http://)?v\\.qq\\.com/cover[^/]*/\\w+/([^/]*)\\.html"))){
var c=encodeURIComponent(d[2]),l="http://sns.video.qq.com/fcgi-bin/dlib/dataout_ex?auto_id=137&cid="+c+"&otype=json",r=document.getElementsByTagName("head")[0],h=document.createElement("script");
h.type="text/javascript",h.src=l,h.async=!0,void 0!==h.onreadystatechange?h.onreadystatechange=function(){
if("loaded"==h.readyState)try{
a=QZOutputJson.videos[0].vid,t.vid=a,n="http://v.qq.com/iframe/player.html?vid="+a+"&width="+s+"&height="+m+"&auto=0",
i(n,t);
}catch(e){}
}:h.onload=function(){
try{
a=QZOutputJson.videos[0].vid,t.vid=a,n="http://v.qq.com/iframe/player.html?vid="+a+"&width="+s+"&height="+m+"&auto=0",
i(n,t);
}catch(e){}
},r.appendChild(h);
}else a=o(e),""!=a&&(t.vid=a,n="http://v.qq.com/iframe/player.html?vid="+a+"&width="+s+"&height="+m+"&auto=0",
i(n,t));
}
function n(e,i,t){
var o,d="",n=t.width,a=t.height,s=e.match(/\/t\/(\d+)/)||e.match(/\/#show\/(\d+)/);
s&&"object"==typeof s&&s.length>1&&(d=s[1],t.vid=d,o="http://z.weishi.com/weixin/player.html?msgid="+d+"&width="+n+"&height="+a+"&auto=0",
i(o,t));
}
e("common/wx/popup.js"),e("page/smallvideo/dialog_select_video.css"),e("widget/media/media_dialog.css");
var a=e("common/wx/top.js"),s=e("common/wx/Tips.js"),m=e("common/wx/media/video.js"),c=e("common/wx/pagebar.js"),l=e("media/media_cgi.js"),r=e("tpl/media/dialog/videomsg_layout.html.js"),h=15,p=21,f={};
f[h]="video_msg_cnt",f[p]="short_video_cnt";
var v=function(e,i){
var t=$.extend({},i);
return t.selector=e,t.id=t.app_id,t.tpl="videomsg",t.for_selection=!0,t.for_transfer=!!t.content,
t.hide_transfer=!!t.content,t.video_id=t.content,t.source="file",new m(t);
},_=548,g=280,u=function(e){
this.scene=e.scene||"default",this.onOK=e.onOK,this.can_use_shortvideo=e.can_use_shortvideo,
this.create();
},w={
create:function(){
var e=this,t=$.parseHTML(wx.T(r,{
scene:e.scene,
token:wx.data.t
}));
e.dialog&&e.dialog.popup("remove"),e.dialog=$(t[0]).popup({
title:"选择视频",
className:"dialog_select_video",
width:960,
onOK:function(){
var t=this,o=e.$dom.find(".js_top.selected").data("id"),d=e.$dom.find(".Js_videomsg.selected").parent().data("opt"),n=e.$dom.find(".js_video_txurl").val();
if(o){
if(!d)return s.err("请选择视频"),!0;
if(e.onOK&&!e.onOK(o,d))return!0;
t.remove(),e.dialog=null;
}else{
if(!n)return s.err("请输入视频网址"),!0;
i(n,function(i,d){
d=$.extend({
url:i
},d),e.onOK&&e.onOK(o,d),t.remove(),e.dialog=null;
},{
width:500,
height:375,
align:"none"
});
}
},
onCancel:function(){
this.remove(),e.dialog=null;
},
onHide:function(){
this.remove(),e.dialog=null;
}
}),e.$dom=e.dialog.popup("get"),e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
e.init(),e.dialog.popup("resetPosition");
},
init:function(){
var e=this,i=e.can_use_shortvideo?[{
name:"小视频",
id:p
}]:[];
"ueditor"==e.scene?(i.unshift({
name:"视频网址"
}),e.initTencentVideo()):(i.unshift({
name:"视频",
id:h
}),e.getList(h,0,10)),e.tab=new a(e.$dom.find(".js_videotab"),i),e.tab.selected(0),
e.tab.dom.find("a").on("click",function(e){
e.preventDefault();
}),e.$dom.on("click",".js_top",function(){
var i=$(this).data("id");
e.$dom.find(".js_video_status").hide(),e.$dom.find(".js_video_create").hide(),e.$dom.find(".js_pagebar").empty(),
e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),i?(i==h&&e.$dom.find(".js_video_create").show(),
e.getList(i,0,10)):e.$dom.find(".js_video_tencent").show(),e.tab.selected($(this).data("index"));
}),e.$dom.on("click",".Js_videomsg",function(){
e.$dom.find(".Js_videomsg.selected").removeClass("selected"),e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),
$(this).addClass("selected");
}),e.$dom.on("mousewheel","#js_videomsg_list",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll","#js_videomsg_list",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
});
},
initTencentVideo:function(){
var e=this;
e.$dom.find(".js_video_loading").hide(),e.$dom.find(".js_video_tencent").show(),
e.$dom.find(".js_video_txurl").on("input propertychange",function(){
var t=$(this).val();
t?(e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),i(t,function(i){
var t="<iframe height="+g+" width="+_+' frameborder=0 src="'+i+'" allowfullscreen></iframe>';
e.$dom.find(".js_video_preview").html(t),e.dialog.popup("resetPosition");
},{
width:_,
height:g
})):e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled");
});
},
initPagebar:function(e,i,t){
var o=this,d=e/i+1;
return i>=t?void o.$dom.find(".js_pagebar").hide():void new c({
container:o.$dom.find(".js_pagebar").show(),
perPage:i,
first:!1,
last:!1,
isSimple:!0,
initShowPage:d,
totalItemsNum:t,
callback:function(t){
var n=t.currentPage,a=o.$dom.find(".js_top.selected").data("id");
n!=d&&a&&(e=i*--n,o.getList(a,e,i));
}
});
},
getList:function(e,i,t){
var o=this,d=e==h?l.appmsg:l;
o.$dom.find(".js_video_content").hide(),o.$dom.find(".js_video_loading").show(),
d.getList(e,i,t,function(d){
if(o.dialog&&e==o.$dom.find(".js_top.selected").data("id")){
var n=d.file_item||d.item,a=o.$dom.find("#js_videomsg_list").find(".inner").empty();
n.length?(n.each(function(e,i){
var t=a.eq(i%2),o=$('<div id="appmsg%s"></div>'.sprintf(e.app_id||e.file_id),t).appendTo(t);
v(o,e);
}),o.$dom.find(".js_video_content").show(),o.dialog.popup("resetPosition")):o.$dom.find(".js_video_none").show().find(".js_empty_tips").html(e==p?"暂无素材<br />（素材来源：通过微信用户上传给公众帐号）":"暂无素材"),
o.$dom.find(".js_video_loading").hide(),o.initPagebar(i,t,d.file_cnt[f[e]]);
}
});
}
};
return $.extend(u.prototype,w),u;
});define("common/wx/media/imageDialog.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/pagebar.js","biz_web/utils/upload.js","tpl/media/dialog/image_layout.html.js","tpl/media/dialog/image_list.html.js","tpl/media/dialog/image_group.html.js","page/media/dialog_img_pick.css"],function(e){
"use strict";
var i=e("common/wx/Cgi.js"),t=e("common/wx/Tips.js"),n=(e("common/wx/popup.js"),
e("common/wx/pagebar.js")),o=e("biz_web/utils/upload.js"),a=e("tpl/media/dialog/image_layout.html.js"),r=e("tpl/media/dialog/image_list.html.js"),l=e("tpl/media/dialog/image_group.html.js"),s=(template.render,
template.compile(l)),d=template.compile(r);
e("page/media/dialog_img_pick.css");
var g=function(e){
return new p(e);
},p=function(e){
this.options=e,this.events=[],this.imgArr=[],this.converting=0,this.fromUpload=[],
c.init.call(this);
},c={
init:function(){
var e=this,i=e.options=$.extend(!0,{
tpl:a,
title:"选择图片",
scene:"cdn",
maxSelect:1,
perPage:10,
group:1,
onOK:null,
onCancel:null
},e.options);
i.tpl=template.compile(i.tpl)(i),e.on("ok",i.onOK),e.on("cancel",i.onCancel),e.on("hide",i.onHide),
e.dialog=$(i.tpl.trim()).popup({
title:i.title,
className:"img_dialog_wrp",
width:846,
buttons:[{
text:"确定",
type:"disabled",
click:function(){
var n=this.get().find(".js_btn").eq(0).parent();
return n.hasClass("btn_disabled")?void t.err("请选择图片"):(e.popup=this,$.each(e.imgArr,function(i,t){
t.source=-1!=e.fromUpload.indexOf(t.file_id+"")?"upload":"lib";
}),void("cdn"==i.scene&&e.converting>0?(n.btn(!1),e.on("converted",function(){
0==e.converting&&(e.trigger("ok",e.imgArr||[]),n.btn(!0));
})):e.trigger("ok",e.imgArr||[])));
}
},{
text:"取消",
click:function(){
e.trigger("cancel"),this.hide();
}
}],
onHide:function(){
e.trigger("hide");
}
}),e.dialog.popup("get").find(".js_loading").show(),u.getImagesByGroupId({
group_id:i.group,
count:i.perPage
},function(t){
if(e.dialog){
var n=t.page_info;
n.scene=i.scene,n.group=i.group;
var o=e.dialog.popup("get"),a=s(n);
o.find(".js_loading").hide(),o.find(".js_group").append(a).find(".js_total").text("(%s)".sprintf(n.file_cnt.img_cnt)),
c.renderImageList(o.find(".js_list"),n,e.imgArr),c.initEvent.call(e,t),c.initPageBar.call(e,n,i.group),
e.dialog.popup("resetPosition");
}
}),c.initUpload.call(e,i.group);
},
initEvent:function(){
var e=this,i=e.dialog.popup("get"),n=e.options;
i.on("click",".js_imageitem",function(){
var o,a=$(this),r=a.find("label"),l=i.find(".js_btn_p").eq(0),s=a.data("url"),d=a.data("id"),g=a.data("format");
r.hasClass("selected")?(s||e.converting--,r.removeClass("selected"),o=m.indexOf(e.imgArr,d),
o>=0&&e.imgArr.splice(o,1),i.find(".js_selected").text(e.imgArr.length)):1==n.maxSelect?(s||(e.converting=1),
r.addClass("selected"),a.siblings().find("label").removeClass("selected"),e.imgArr=[{
url:s,
file_id:d,
format:g
}],i.find(".js_selected").text(e.imgArr.length)):n.maxSelect>e.imgArr.length?(s||e.converting++,
r.addClass("selected"),e.imgArr.push({
url:s,
file_id:d,
format:g
}),i.find(".js_selected").text(e.imgArr.length)):t.err("最多可选%s张".sprintf(n.maxSelect)),
e.imgArr.length>0?l.enable().addClass("btn_primary"):l.disable(),"cdn"==n.scene&&r.hasClass("selected")&&!s&&u.getCdnUrlByFileId({
file_id:d,
group_id:i.find(".js_groupitem.selected").data("groupid")
},function(i){
0==i.errcode?(e.converting--,a.data("url",i.url),o=m.indexOf(e.imgArr,d),o>=0&&(e.imgArr[o].url=i.url),
e.trigger("converted")):(t.err("转存失败"),a.click());
});
}),i.on("click",".js_groupitem",function(t,o){
var a=$(this),r=i.find(".js_list"),l=i.find(".js_loading"),s=i.find(".js_pagebar"),d=a.data("groupid");
a.hasClass("selected")||(a.addClass("selected").siblings(".selected").removeClass("selected"),
$("#js_imageupload").data("groupid",d),r.hide(),s.hide(),l.show(),u.getImagesByGroupId({
group_id:d,
count:n.perPage
},function(t){
if(e.dialog&&d==i.find(".js_groupitem.selected").data("groupid")){
t=t.page_info,t.scene=n.scene,l.hide(),s.show(),c.renderImageList(r,t,e.imgArr),
c.initPageBar.call(e,t,d),c.initUpload.call(e);
for(var a=0;o&&"upload"==o.source&&a<o.count;++a)r.children().eq(a).click();
}
}));
});
},
initPageBar:function(e,i){
var t=this,o=t.dialog.popup("get"),a=t.options;
c.pagebar&&c.pagebar.destroy();
var r=0;
return 0==i?r=e.file_cnt.img_cnt:e.file_group_list.file_group.each(function(e){
e.id==i&&(r=e.count);
}),a.perPage>=r?void o.find(".js_pagebar").empty():void(c.pagebar=new n({
container:o.find(".js_pagebar"),
perPage:a.perPage,
initShowPage:1,
totalItemsNum:r,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=o.find(".js_groupitem.selected").data("groupid"),n=o.find(".js_list"),r=o.find(".js_loading"),l=o.find(".js_pagebar");
n.hide(),l.hide(),r.show(),u.getImagesByGroupId({
group_id:i,
begin:e.perPage*(e.currentPage-1),
count:a.perPage
},function(e){
e=e.page_info,e.scene=a.scene,r.hide(),l.show(),c.renderImageList(n,e,t.imgArr);
});
}
}));
},
initUpload:function(e){
var i=this,n=i.dialog.popup("get"),a=n.find(".js_imageupload"),r="js_imageupload"+Math.random().toString().substr(2),l=n.find(".js_groupitem.selected").data("groupid")||e||1;
a.attr("id",r).off().children().remove(),o.uploadImageLibFile({
container:"#"+r,
multi:!0,
type:2,
doublewrite:!0,
groupid:l,
onComplete:function(e,n,o,a){
0==a.base_resp.ret&&t.suc("上传成功"),i.fromUpload.push(a.content);
},
onAllComplete:function(e,i){
var t,o=n.find(".js_groupitem.selected");
i.filesUploaded>0&&(t=+o.find("span").text(),o.removeClass("selected").trigger("click",{
source:"upload",
count:i.filesUploaded
}),o.find("span").text(t+i.filesUploaded));
},
showError:!0
});
},
renderImageList:function(e,i,t){
i.file_item.each(function(e){
e.img_url=wx.url("/cgi-bin/getimgdata?mode=small&source=file&fileId=%s".sprintf(e.file_id)),
-1!=m.indexOf(t,e.file_id)&&(e.selected=1);
}),e.html(d(i)).show();
}
},u={
getImagesByGroupId:function(e,t){
e=$.extend({
group_id:1,
begin:0,
count:8,
type:2
},e),i.get({
url:wx.url("/cgi-bin/filepage"),
data:e,
mask:!1
},function(e){
0!=e.base_resp.ret?i.show(e):t(e);
});
},
getCdnUrlByFileId:function(e,t){
e.group_id=e.group_id||1,i.post({
url:wx.url("/cgi-bin/uploadimg2cdn?action=duplicate"),
data:e,
mask:!1
},function(e){
t(e);
});
}
},m={
indexOf:function(e,i){
for(var t=0,n=e.length;n>t;++t)if(e[t].file_id==i)return t;
return-1;
}
},f={
on:function(e,i){
if(i){
var t=this.events;
return t[e]=t[e]||[],t[e].push(i),this;
}
},
trigger:function(e){
var i=this,t=arguments,n=i.events[e];
return n?($.each(n,function(e,n){
n.apply(i,Array.prototype.slice.call(t,1));
}),this):void 0;
},
hide:function(){
return this.dialog.popup("hide"),this;
},
show:function(){
return this.dialog.popup("show"),this;
},
destroy:function(){
this.dialog.popup("remove"),this.dialog=null;
}
};
return $.extend(p.prototype,f),g;
});define("media/media_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var r=e("common/wx/Tips.js"),s=e("common/wx/Cgi.js"),a={
del:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/operate_appmsg?sub=del&t=ajax-response"),
data:{
AppMsgId:e
},
error:function(){
r.err("删除失败");
}
},function(e){
"0"==e.ret?(r.suc("删除成功"),a&&a(e)):r.err("删除失败");
});
},
del_sv:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
r.err("删除失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(r.suc("删除成功"),a.suc&&a.suc(e)):(r.err("删除失败"),
a.fail&&a.fail(e));
});
},
edit_sv:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e.id,
filename:e.name
},
error:function(){
r.err("编辑失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(r.suc("编辑成功"),a.suc&&a.suc(e)):(r.err("编辑失败"),
a.fail&&a.fail(e));
});
},
save:function(e,a,t,i,n,c){
var o=wx.url(t.AppMsgId?"/cgi-bin/operate_appmsg?t=ajax-response&sub=update&type=%s".sprintf(a):"/cgi-bin/operate_appmsg?t=ajax-response&sub=create&type=%s".sprintf(a));
t.ajax=1,s.post({
url:o,
data:t,
dataType:"html",
error:function(e,s){
"timeout"!=s&&r.err("保存失败"),n&&n(!1,-1);
},
complete:c
},function(s){
if(s=$.parseJSON(s),"0"==s.ret)r.suc("保存成功"),i&&i(s);else{
var a=!1;
switch(s.ret){
case"64506":
r.err("保存失败,链接不合法");
break;

case"64507":
r.err("内容不能包含链接，请调整");
break;

case"64508":
r.err("查看原文链接可能具备安全风险，请检查");
break;

case"-99":
r.err("内容超出字数，请调整");
break;

case"10801":
r.err("标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),a=s.msg;
break;

case"10802":
r.err("作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),a=s.msg;
break;

case"10803":
r.err("敏感链接，请重新添加。"),a=s.msg;
break;

case"10804":
r.err(e?"正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。":"摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),
a=s.msg;
break;

case"10806":
r.err("正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),a=s.msg;
break;

case"-20000":
r.err("登录态超时，请重新登录。");
break;

case"15801":
case"15802":
case"15803":
case"15804":
case"15805":
case"15806":
break;

default:
r.err("保存失败");
}
n&&n(a,s.ret);
}
});
},
preview:function(e,a,t,i,n){
s.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=%s".sprintf(a)),
data:t,
dataType:"html",
error:function(){
r.err("发送失败，请稍后重试"),n&&n();
}
},function(s){
if(s=$.parseJSON(s),"0"==s.ret)r.suc("发送预览成功，请留意你的手机微信"),i&&i(s);else{
switch(s.ret){
case"64501":
r.err("你输入是非法的微信号，请重新输入");
break;

case"64502":
r.err("你输入的微信号不存在，请重新输入");
break;

case"10700":
case"64503":
r.err("你输入的微信号不是你的好友");
break;

case"10703":
r.err("对方关闭了接收消息");
break;

case"10701":
r.err("用户已被加入黑名单，无法向其发送消息");
break;

case"10704":
case"10705":
r.err("该素材已被删除");
break;

case"64504":
r.err("保存图文消息发送错误，请稍后再试");
break;

case"64505":
r.err("发送预览失败，请稍后再试");
break;

case"64507":
r.err("内容不能包含链接，请调整");
break;

case"-99":
r.err("内容超出字数，请调整");
break;

case"62752":
r.err("可能含有具备安全风险的链接，请检查");
break;

case"10801":
r.err("标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s.antispam=!0;
break;

case"10802":
r.err("作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s.antispam=!0;
break;

case"10803":
r.err("敏感链接，请重新添加。"),s.antispam=!0;
break;

case"10804":
r.err(e?"正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。":"摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),
s.antispam=!0;
break;

case"10806":
r.err("正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s.antispam=!0;
break;

case"-8":
case"-6":
s.ret="-6",r.err("请输入验证码");
break;

case"15801":
case"15802":
case"15803":
case"15804":
case"15805":
case"15806":
break;

default:
r.err("系统繁忙，请稍后重试");
}
n&&n(s);
}
});
},
getList:function(e,a,t,i,n){
var c="";
c=wx.url(n?"www.baidu.com?type=%s&action=list&begin=%s&count=%s&query=%s&f=json".sprintf(e,a,t,n):"www.baidu.com?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,a,t)),
s.get({
mask:!1,
url:c,
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?i&&i(e.app_msg_info):r.err("获取列表失败");
});
},
getSingleList:function(e,a,t,i){
s.get({
mask:!1,
url:wx.url("www.baidu.com?type=%s&action=for_advert&begin=%s&count=%s&f=json".sprintf(e,a,t)),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?i&&i(e.app_msg_info):r.err("获取列表失败");
});
}
},t={
save:function(e,a,t){
var i=wx.url("/cgi-bin/operate_vote");
e.ajax=1,s.post({
url:i,
data:e,
error:function(){
r.err("保存失败"),t&&t();
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(r.suc("保存成功"),a&&a(e)):(r.err("保存失败"),t&&t(e));
});
}
};
return{
rename:function(e,a,t){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e,
fileName:a
},
error:function(){
r.err("重命名失败");
}
},function(e){
if(!e||!e.base_resp)return void r.err("重命名失败");
var s=e.base_resp.ret;
if("0"==s)r.suc("重命名成功"),t&&t(e);else switch(s){
case"-2":
r.err("素材名不能包含空格");
break;

default:
r.err("重命名失败");
}
});
},
del:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
r.err("删除失败");
}
},function(e){
return e&&e.base_resp?void("0"==e.base_resp.ret?(r.suc("删除成功"),a&&a(e)):r.err("删除失败")):void r.err("删除失败");
});
},
getList:function(e,a,t,i){
s.get({
mask:!1,
url:wx.url("/cgi-bin/filepage?type=%s&begin=%s&count=%s&f=json".sprintf(e,a,t)),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?i&&i(e.page_info):r.err("获取列表失败");
});
},
appmsg:a,
vote:t
};
});define("biz_web/utils/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js"],function(e){
"use strict";
function i(e){
f.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),t=e("common/wx/dialog.js"),a=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=wx.T,l=wx.path.webuploader,s=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",c={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/*"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/*,application/pdf"
},
fileSingleSizeLimit:2097152
},
7:{
accept:{
extensions:"bmp,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
}
};
c[15]=c[4];
var p=function(e){
t.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},u=function(e){
var i=n.Uploader;
0==i.support("flash")?p("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?p("<p>您的浏览器不支持上传</p>"):e.refresh();
},m=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},d={
swf:l,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:5,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1e8,
height:1e8,
quality:90,
compressSize:0,
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},f=new Image,g={},h=function(e){
if(!e.url)throw"missing url";
var t,l,s,p=$('<ul class="upload_file_box" style="display:none"></ul>'),f=$(e.container);
f.on("click",function(){
Math.random()<.1&&m(12),u(t);
}).parent().append(p),function(){
0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),l={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket),
pick:{
id:f,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},s=c[e.type]||c[2],e=$.extend(!0,{},d,l,s,e);
try{
t=n.create(e);
}catch(h){
if(!t)return;
}
return p.on("click",".js_cancel",function(){
var e=$(this).data("id");
t.cancelFile(e),$(this).hide();
}),t.on("beforeFileQueued",function(i){
return Math.random()<.1&&m(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),t.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
p.append(r(o,i)).show();
}),t.on("fileDequeued",function(){
Math.random()<.1&&m(14),e.onCancel&&e.onCancel();
}),t.on("uploadProgress",function(i,n){
var t="#uploadItem%s".sprintf(i.id),a=p.find(t).find(".progress_bar_thumb");
a.width("%s%".sprintf(100*n)),1==n&&p.find(t).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),t.on("uploadStart",function(e){
g[e.id]=+new Date;
}),t.on("uploadSuccess",function(n,t,o){
if(Math.random()<.1&&m(16),t&&t.base_resp){
var r=+t.base_resp.ret;
if(0==r)Math.random()<.1&&(m(17),g[n.id]&&i(+new Date-g[n.id]));else switch(n.setStatus("invalid"),
r){
case-18:
a.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
a.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
a.err("上传文件过于频繁，请稍后再试");
break;

case-10:
a.err("上传文件过大");
break;

case-22:
a.err("上传音频文件不能超过60秒");
break;

case-39:
a.err("上传图片已超过宽度（或者高度）限制，请将图片调整到宽度4000像素以下，高度4000像素以下后重试");
break;

default:
a.err("上传文件发送出错，请刷新页面后重试！");
}
}
e.onComplete&&e.onComplete(null,n.id,n,t,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),t.on("uploadFinished",function(i){
this.reset(),p.fadeOut().html(""),g={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),t.on("uploadError",function(){
Math.random()<.1&&m(15),e.onError&&e.onError();
}),t.on("error",function(i,t,o){
switch("object"==typeof t&&(o=t),i){
case"Q_EXCEED_NUM_LIMIT":
a.err("一次上传最多只能上传%s个文件".sprintf(t));
break;

case"F_EXCEED_SIZE":
a.err("文件大小不能超过%s".sprintf(n.formatSize(t,"0")));
break;

case"Q_TYPE_DENIED":
a.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),t;
},b=function(e){
return function(i){
return i.url=e,h(i);
};
},w=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:h,
uploadBizFile:b(s+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:b(s+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:b(s+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:b(s+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:b(s+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:b(s+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:b(s+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:b(s+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:b(s+"/misc/setlocation?action=upload"),
uploadCdnFileFromAd:function(e){
return b(s+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=s+"/cgi-bin/filetransfer?action=upload_material&f=json",1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),
h(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return b(s+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
tmpFileUrl:w(s+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:w(s+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:w(s+"/cgi-bin/filetransfer?action=multimedia")
};
});