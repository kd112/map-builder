!function (t) {
  var e = {};function i(n) {
    if (e[n]) return e[n].exports;var o = e[n] = { i: n, l: !1, exports: {} };return t[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
  }i.m = t, i.c = e, i.d = function (t, e, n) {
    i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;if (4 & e && "object" == typeof t && t && t.__esModule) return t;var n = Object.create(null);if (i.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) i.d(n, o, function (e) {
      return t[e];
    }.bind(null, o));return n;
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return i.d(e, "a", e), e;
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, i.p = "", i(i.s = 12);
}({ 0: function (t, e, i) {
    "use strict";
    t.exports = o, t.exports.default = o;var n = i(11);function o(t, e) {
      if (!(this instanceof o)) return new o(t, e);this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), e && this._initFormat(e), this.clear();
    }function r(t, e, i) {
      if (!i) return e.indexOf(t);for (var n = 0; n < e.length; n++) if (i(t, e[n])) return n;return -1;
    }function s(t, e) {
      a(t, 0, t.children.length, e, t);
    }function a(t, e, i, n, o) {
      o || (o = y(null)), o.minX = 1 / 0, o.minY = 1 / 0, o.maxX = -1 / 0, o.maxY = -1 / 0;for (var r, s = e; s < i; s++) r = t.children[s], h(o, t.leaf ? n(r) : r);return o;
    }function h(t, e) {
      return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t;
    }function l(t, e) {
      return t.minX - e.minX;
    }function u(t, e) {
      return t.minY - e.minY;
    }function c(t) {
      return (t.maxX - t.minX) * (t.maxY - t.minY);
    }function p(t) {
      return t.maxX - t.minX + (t.maxY - t.minY);
    }function d(t, e) {
      return (Math.max(e.maxX, t.maxX) - Math.min(e.minX, t.minX)) * (Math.max(e.maxY, t.maxY) - Math.min(e.minY, t.minY));
    }function f(t, e) {
      var i = Math.max(t.minX, e.minX),
          n = Math.max(t.minY, e.minY),
          o = Math.min(t.maxX, e.maxX),
          r = Math.min(t.maxY, e.maxY);return Math.max(0, o - i) * Math.max(0, r - n);
    }function _(t, e) {
      return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY;
    }function g(t, e) {
      return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY;
    }function y(t) {
      return { children: t, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
    }function v(t, e, i, o, r) {
      for (var s, a = [e, i]; a.length;) (i = a.pop()) - (e = a.pop()) <= o || (s = e + Math.ceil((i - e) / o / 2) * o, n(t, s, e, i, r), a.push(e, s, s, i));
    }o.prototype = { all: function () {
        return this._all(this.data, []);
      }, search: function (t) {
        var e = this.data,
            i = [],
            n = this.toBBox;if (!g(t, e)) return i;for (var o, r, s, a, h = []; e;) {
          for (o = 0, r = e.children.length; o < r; o++) s = e.children[o], g(t, a = e.leaf ? n(s) : s) && (e.leaf ? i.push(s) : _(t, a) ? this._all(s, i) : h.push(s));e = h.pop();
        }return i;
      }, collides: function (t) {
        var e = this.data,
            i = this.toBBox;if (!g(t, e)) return !1;for (var n, o, r, s, a = []; e;) {
          for (n = 0, o = e.children.length; n < o; n++) if (r = e.children[n], g(t, s = e.leaf ? i(r) : r)) {
            if (e.leaf || _(t, s)) return !0;a.push(r);
          }e = a.pop();
        }return !1;
      }, load: function (t) {
        if (!t || !t.length) return this;if (t.length < this._minEntries) {
          for (var e = 0, i = t.length; e < i; e++) this.insert(t[e]);return this;
        }var n = this._build(t.slice(), 0, t.length - 1, 0);if (this.data.children.length) {
          if (this.data.height === n.height) this._splitRoot(this.data, n);else {
            if (this.data.height < n.height) {
              var o = this.data;this.data = n, n = o;
            }this._insert(n, this.data.height - n.height - 1, !0);
          }
        } else this.data = n;return this;
      }, insert: function (t) {
        return t && this._insert(t, this.data.height - 1), this;
      }, clear: function () {
        return this.data = y([]), this;
      }, remove: function (t, e) {
        if (!t) return this;for (var i, n, o, s, a = this.data, h = this.toBBox(t), l = [], u = []; a || l.length;) {
          if (a || (a = l.pop(), n = l[l.length - 1], i = u.pop(), s = !0), a.leaf && -1 !== (o = r(t, a.children, e))) return a.children.splice(o, 1), l.push(a), this._condense(l), this;s || a.leaf || !_(a, h) ? n ? (i++, a = n.children[i], s = !1) : a = null : (l.push(a), u.push(i), i = 0, n = a, a = a.children[0]);
        }return this;
      }, toBBox: function (t) {
        return t;
      }, compareMinX: l, compareMinY: u, toJSON: function () {
        return this.data;
      }, fromJSON: function (t) {
        return this.data = t, this;
      }, _all: function (t, e) {
        for (var i = []; t;) t.leaf ? e.push.apply(e, t.children) : i.push.apply(i, t.children), t = i.pop();return e;
      }, _build: function (t, e, i, n) {
        var o,
            r = i - e + 1,
            a = this._maxEntries;if (r <= a) return s(o = y(t.slice(e, i + 1)), this.toBBox), o;n || (n = Math.ceil(Math.log(r) / Math.log(a)), a = Math.ceil(r / Math.pow(a, n - 1))), (o = y([])).leaf = !1, o.height = n;var h,
            l,
            u,
            c,
            p = Math.ceil(r / a),
            d = p * Math.ceil(Math.sqrt(a));for (v(t, e, i, d, this.compareMinX), h = e; h <= i; h += d) for (v(t, h, u = Math.min(h + d - 1, i), p, this.compareMinY), l = h; l <= u; l += p) c = Math.min(l + p - 1, u), o.children.push(this._build(t, l, c, n - 1));return s(o, this.toBBox), o;
      }, _chooseSubtree: function (t, e, i, n) {
        for (var o, r, s, a, h, l, u, p; n.push(e), !e.leaf && n.length - 1 !== i;) {
          for (u = p = 1 / 0, o = 0, r = e.children.length; o < r; o++) h = c(s = e.children[o]), (l = d(t, s) - h) < p ? (p = l, u = h < u ? h : u, a = s) : l === p && h < u && (u = h, a = s);e = a || e.children[0];
        }return e;
      }, _insert: function (t, e, i) {
        var n = this.toBBox,
            o = i ? t : n(t),
            r = [],
            s = this._chooseSubtree(o, this.data, e, r);for (s.children.push(t), h(s, o); e >= 0 && r[e].children.length > this._maxEntries;) this._split(r, e), e--;this._adjustParentBBoxes(o, r, e);
      }, _split: function (t, e) {
        var i = t[e],
            n = i.children.length,
            o = this._minEntries;this._chooseSplitAxis(i, o, n);var r = this._chooseSplitIndex(i, o, n),
            a = y(i.children.splice(r, i.children.length - r));a.height = i.height, a.leaf = i.leaf, s(i, this.toBBox), s(a, this.toBBox), e ? t[e - 1].children.push(a) : this._splitRoot(i, a);
      }, _splitRoot: function (t, e) {
        this.data = y([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, s(this.data, this.toBBox);
      }, _chooseSplitIndex: function (t, e, i) {
        var n, o, r, s, h, l, u, p;for (l = u = 1 / 0, n = e; n <= i - e; n++) s = f(o = a(t, 0, n, this.toBBox), r = a(t, n, i, this.toBBox)), h = c(o) + c(r), s < l ? (l = s, p = n, u = h < u ? h : u) : s === l && h < u && (u = h, p = n);return p;
      }, _chooseSplitAxis: function (t, e, i) {
        var n = t.leaf ? this.compareMinX : l,
            o = t.leaf ? this.compareMinY : u;this._allDistMargin(t, e, i, n) < this._allDistMargin(t, e, i, o) && t.children.sort(n);
      }, _allDistMargin: function (t, e, i, n) {
        t.children.sort(n);var o,
            r,
            s = this.toBBox,
            l = a(t, 0, e, s),
            u = a(t, i - e, i, s),
            c = p(l) + p(u);for (o = e; o < i - e; o++) r = t.children[o], h(l, t.leaf ? s(r) : r), c += p(l);for (o = i - e - 1; o >= e; o--) r = t.children[o], h(u, t.leaf ? s(r) : r), c += p(u);return c;
      }, _adjustParentBBoxes: function (t, e, i) {
        for (var n = i; n >= 0; n--) h(e[n], t);
      }, _condense: function (t) {
        for (var e, i = t.length - 1; i >= 0; i--) 0 === t[i].children.length ? i > 0 ? (e = t[i - 1].children).splice(e.indexOf(t[i]), 1) : this.clear() : s(t[i], this.toBBox);
      }, _initFormat: function (t) {
        var e = ["return a", " - b", ";"];this.compareMinX = new Function("a", "b", e.join(t[0])), this.compareMinY = new Function("a", "b", e.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};");
      } };
  }, 11: function (t, e, i) {
    t.exports = function () {
      "use strict";
      function t(t, e, i) {
        var n = t[e];t[e] = t[i], t[i] = n;
      }function e(t, e) {
        return t < e ? -1 : t > e ? 1 : 0;
      }return function (i, n, o, r, s) {
        !function e(i, n, o, r, s) {
          for (; r > o;) {
            if (r - o > 600) {
              var a = r - o + 1,
                  h = n - o + 1,
                  l = Math.log(a),
                  u = .5 * Math.exp(2 * l / 3),
                  c = .5 * Math.sqrt(l * u * (a - u) / a) * (h - a / 2 < 0 ? -1 : 1),
                  p = Math.max(o, Math.floor(n - h * u / a + c)),
                  d = Math.min(r, Math.floor(n + (a - h) * u / a + c));e(i, n, p, d, s);
            }var f = i[n],
                _ = o,
                g = r;for (t(i, o, n), s(i[r], f) > 0 && t(i, o, r); _ < g;) {
              for (t(i, _, g), _++, g--; s(i[_], f) < 0;) _++;for (; s(i[g], f) > 0;) g--;
            }0 === s(i[o], f) ? t(i, o, g) : t(i, ++g, r), g <= n && (o = g + 1), n <= g && (r = g - 1);
          }
        }(i, n, o || 0, r || i.length - 1, s || e);
      };
    }();
  }, 12: function (t, e, i) {
    "use strict";
    i.r(e);var n = 0;function o(t) {
      return t.ol_uid || (t.ol_uid = ++n);
    }var r = "5.1.3",
        s = function (t) {
      function e(e) {
        var i = "Assertion failed. See https://openlayers.org/en/" + r.split("-")[0] + "/doc/errors/#" + e + " for details.";t.call(this, i), this.code = e, this.name = "AssertionError", this.message = i;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Error),
        a = { ADD: "add", REMOVE: "remove" },
        h = "propertychange",
        l = "function" == typeof Object.assign ? Object.assign : function (t, e) {
      var i = arguments;if (void 0 === t || null === t) throw new TypeError("Cannot convert undefined or null to object");for (var n = Object(t), o = 1, r = arguments.length; o < r; ++o) {
        var s = i[o];if (void 0 !== s && null !== s) for (var a in s) s.hasOwnProperty(a) && (n[a] = s[a]);
      }return n;
    };function u(t) {
      for (var e in t) delete t[e];
    }function c(t) {
      var e = [];for (var i in t) e.push(t[i]);return e;
    }function p(t) {
      var e;for (e in t) return !1;return !e;
    }function d(t, e, i, n) {
      for (var o, r = 0, s = t.length; r < s; ++r) if ((o = t[r]).listener === e && o.bindTo === i) return n && (o.deleteIndex = r), o;
    }function f(t, e) {
      var i = t.ol_lm;return i ? i[e] : void 0;
    }function _(t) {
      var e = t.ol_lm;return e || (e = t.ol_lm = {}), e;
    }function g(t, e) {
      var i = f(t, e);if (i) {
        for (var n = 0, o = i.length; n < o; ++n) t.removeEventListener(e, i[n].boundListener), u(i[n]);i.length = 0;var r = t.ol_lm;r && (delete r[e], 0 === Object.keys(r).length && delete t.ol_lm);
      }
    }function y(t, e, i, n, o) {
      var r = _(t),
          s = r[e];s || (s = r[e] = []);var a = d(s, i, n, !1);return a ? o || (a.callOnce = !1) : (a = { bindTo: n, callOnce: !!o, listener: i, target: t, type: e }, t.addEventListener(e, function (t) {
        var e = function (e) {
          var i = t.listener,
              n = t.bindTo || t.target;return t.callOnce && E(t), i.call(n, e);
        };return t.boundListener = e, e;
      }(a)), s.push(a)), a;
    }function v(t, e, i, n) {
      return y(t, e, i, n, !0);
    }function m(t, e, i, n) {
      var o = f(t, e);if (o) {
        var r = d(o, i, n, !0);r && E(r);
      }
    }function E(t) {
      if (t && t.target) {
        t.target.removeEventListener(t.type, t.boundListener);var e = f(t.target, t.type);if (e) {
          var i = "deleteIndex" in t ? t.deleteIndex : e.indexOf(t);-1 !== i && e.splice(i, 1), 0 === e.length && g(t.target, t.type);
        }u(t);
      }
    }function x() {
      return !0;
    }function C() {
      return !1;
    }function T() {}var S = function () {};S.prototype.dispose = function () {
      this.disposed_ || (this.disposed_ = !0, this.disposeInternal());
    }, S.prototype.disposed_ = !1, S.prototype.disposeInternal = T;var R = S,
        I = function (t) {
      this.propagationStopped, this.type = t, this.target = null;
    };function w(t) {
      t.stopPropagation();
    }I.prototype.preventDefault = function () {
      this.propagationStopped = !0;
    }, I.prototype.stopPropagation = function () {
      this.propagationStopped = !0;
    };var O = I,
        L = function (t) {
      function e() {
        t.call(this), this.pendingRemovals_ = {}, this.dispatching_ = {}, this.listeners_ = {};
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.addEventListener = function (t, e) {
        var i = this.listeners_[t];i || (i = this.listeners_[t] = []), -1 === i.indexOf(e) && i.push(e);
      }, e.prototype.dispatchEvent = function (t) {
        var e = "string" == typeof t ? new O(t) : t,
            i = e.type;e.target = this;var n,
            o = this.listeners_[i];if (o) {
          i in this.dispatching_ || (this.dispatching_[i] = 0, this.pendingRemovals_[i] = 0), ++this.dispatching_[i];for (var r = 0, s = o.length; r < s; ++r) if (!1 === o[r].call(this, e) || e.propagationStopped) {
            n = !1;break;
          }if (--this.dispatching_[i], 0 === this.dispatching_[i]) {
            var a = this.pendingRemovals_[i];for (delete this.pendingRemovals_[i]; a--;) this.removeEventListener(i, T);delete this.dispatching_[i];
          }return n;
        }
      }, e.prototype.disposeInternal = function () {
        !function (t) {
          var e = _(t);for (var i in e) g(t, i);
        }(this);
      }, e.prototype.getListeners = function (t) {
        return this.listeners_[t];
      }, e.prototype.hasListener = function (t) {
        return t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0;
      }, e.prototype.removeEventListener = function (t, e) {
        var i = this.listeners_[t];if (i) {
          var n = i.indexOf(e);t in this.pendingRemovals_ ? (i[n] = T, ++this.pendingRemovals_[t]) : (i.splice(n, 1), 0 === i.length && delete this.listeners_[t]);
        }
      }, e;
    }(R),
        M = { CHANGE: "change", CLEAR: "clear", CONTEXTMENU: "contextmenu", CLICK: "click", DBLCLICK: "dblclick", DRAGENTER: "dragenter", DRAGOVER: "dragover", DROP: "drop", ERROR: "error", KEYDOWN: "keydown", KEYPRESS: "keypress", LOAD: "load", MOUSEDOWN: "mousedown", MOUSEMOVE: "mousemove", MOUSEOUT: "mouseout", MOUSEUP: "mouseup", MOUSEWHEEL: "mousewheel", MSPOINTERDOWN: "MSPointerDown", RESIZE: "resize", TOUCHSTART: "touchstart", TOUCHMOVE: "touchmove", TOUCHEND: "touchend", WHEEL: "wheel" };var P = function (t) {
      function e() {
        t.call(this), this.revision_ = 0;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.changed = function () {
        ++this.revision_, this.dispatchEvent(M.CHANGE);
      }, e.prototype.getRevision = function () {
        return this.revision_;
      }, e.prototype.on = function (t, e) {
        if (Array.isArray(t)) {
          for (var i = t.length, n = new Array(i), o = 0; o < i; ++o) n[o] = y(this, t[o], e);return n;
        }return y(this, t, e);
      }, e.prototype.once = function (t, e) {
        if (Array.isArray(t)) {
          for (var i = t.length, n = new Array(i), o = 0; o < i; ++o) n[o] = v(this, t[o], e);return n;
        }return v(this, t, e);
      }, e.prototype.un = function (t, e) {
        if (Array.isArray(t)) for (var i = 0, n = t.length; i < n; ++i) m(this, t[i], e);else m(this, t, e);
      }, e;
    }(L),
        F = function (t) {
      function e(e, i, n) {
        t.call(this, e), this.key = i, this.oldValue = n;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O),
        b = {};function A(t) {
      return b.hasOwnProperty(t) ? b[t] : b[t] = "change:" + t;
    }var D = function (t) {
      function e(e) {
        t.call(this), o(this), this.values_ = {}, void 0 !== e && this.setProperties(e);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function (t) {
        var e;return this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
      }, e.prototype.getKeys = function () {
        return Object.keys(this.values_);
      }, e.prototype.getProperties = function () {
        return l({}, this.values_);
      }, e.prototype.notify = function (t, e) {
        var i;i = A(t), this.dispatchEvent(new F(i, t, e)), i = h, this.dispatchEvent(new F(i, t, e));
      }, e.prototype.set = function (t, e, i) {
        if (i) this.values_[t] = e;else {
          var n = this.values_[t];this.values_[t] = e, n !== e && this.notify(t, n);
        }
      }, e.prototype.setProperties = function (t, e) {
        for (var i in t) this.set(i, t[i], e);
      }, e.prototype.unset = function (t, e) {
        if (t in this.values_) {
          var i = this.values_[t];delete this.values_[t], e || this.notify(t, i);
        }
      }, e;
    }(P),
        G = "length",
        k = function (t) {
      function e(e, i) {
        t.call(this, e), this.element = i;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O),
        N = function (t) {
      function e(e, i) {
        t.call(this);var n = i || {};if (this.unique_ = !!n.unique, this.array_ = e || [], this.unique_) for (var o = 0, r = this.array_.length; o < r; ++o) this.assertUnique_(this.array_[o], o);this.updateLength_();
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clear = function () {
        for (; this.getLength() > 0;) this.pop();
      }, e.prototype.extend = function (t) {
        for (var e = 0, i = t.length; e < i; ++e) this.push(t[e]);return this;
      }, e.prototype.forEach = function (t) {
        for (var e = this.array_, i = 0, n = e.length; i < n; ++i) t(e[i], i, e);
      }, e.prototype.getArray = function () {
        return this.array_;
      }, e.prototype.item = function (t) {
        return this.array_[t];
      }, e.prototype.getLength = function () {
        return this.get(G);
      }, e.prototype.insertAt = function (t, e) {
        this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(new k(a.ADD, e));
      }, e.prototype.pop = function () {
        return this.removeAt(this.getLength() - 1);
      }, e.prototype.push = function (t) {
        this.unique_ && this.assertUnique_(t);var e = this.getLength();return this.insertAt(e, t), this.getLength();
      }, e.prototype.remove = function (t) {
        for (var e = this.array_, i = 0, n = e.length; i < n; ++i) if (e[i] === t) return this.removeAt(i);
      }, e.prototype.removeAt = function (t) {
        var e = this.array_[t];return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(new k(a.REMOVE, e)), e;
      }, e.prototype.setAt = function (t, e) {
        var i = this.getLength();if (t < i) {
          this.unique_ && this.assertUnique_(e, t);var n = this.array_[t];this.array_[t] = e, this.dispatchEvent(new k(a.REMOVE, n)), this.dispatchEvent(new k(a.ADD, e));
        } else {
          for (var o = i; o < t; ++o) this.insertAt(o, void 0);this.insertAt(t, e);
        }
      }, e.prototype.updateLength_ = function () {
        this.set(G, this.array_.length);
      }, e.prototype.assertUnique_ = function (t, e) {
        for (var i = 0, n = this.array_.length; i < n; ++i) if (this.array_[i] === t && i !== e) throw new s(58);
      }, e;
    }(D),
        Y = function (t) {
      function e(e, i, n) {
        t.call(this, e), this.map = i, this.frameState = void 0 !== n ? n : null;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O),
        X = function (t) {
      function e(e, i, n, o, r) {
        t.call(this, e, i, r), this.originalEvent = n, this.pixel = i.getEventPixel(n), this.coordinate = i.getCoordinateFromPixel(this.pixel), this.dragging = void 0 !== o && o;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.preventDefault = function () {
        t.prototype.preventDefault.call(this), this.originalEvent.preventDefault();
      }, e.prototype.stopPropagation = function () {
        t.prototype.stopPropagation.call(this), this.originalEvent.stopPropagation();
      }, e;
    }(Y),
        j = "undefined" != typeof navigator ? navigator.userAgent.toLowerCase() : "",
        W = -1 !== j.indexOf("firefox"),
        K = -1 !== j.indexOf("safari") && -1 == j.indexOf("chrom"),
        z = -1 !== j.indexOf("webkit") && -1 == j.indexOf("edge"),
        U = -1 !== j.indexOf("macintosh"),
        B = window.devicePixelRatio || 1,
        V = function () {
      var t = !1;try {
        t = !!document.createElement("CANVAS").getContext("2d").setLineDash;
      } catch (t) {}return t;
    }(),
        Z = (navigator, "ontouchstart" in window),
        H = "PointerEvent" in window,
        q = !!navigator.msPointerEnabled,
        J = { SINGLECLICK: "singleclick", CLICK: M.CLICK, DBLCLICK: M.DBLCLICK, POINTERDRAG: "pointerdrag", POINTERMOVE: "pointermove", POINTERDOWN: "pointerdown", POINTERUP: "pointerup", POINTEROVER: "pointerover", POINTEROUT: "pointerout", POINTERENTER: "pointerenter", POINTERLEAVE: "pointerleave", POINTERCANCEL: "pointercancel" },
        Q = function (t) {
      function e(e, i, n, o, r) {
        t.call(this, e, i, n.originalEvent, o, r), this.pointerEvent = n;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(X),
        $ = { POINTERMOVE: "pointermove", POINTERDOWN: "pointerdown", POINTERUP: "pointerup", POINTEROVER: "pointerover", POINTEROUT: "pointerout", POINTERENTER: "pointerenter", POINTERLEAVE: "pointerleave", POINTERCANCEL: "pointercancel" },
        tt = function (t, e) {
      this.dispatcher = t, this.mapping_ = e;
    };tt.prototype.getEvents = function () {
      return Object.keys(this.mapping_);
    }, tt.prototype.getHandlerForEvent = function (t) {
      return this.mapping_[t];
    };var et = tt,
        it = 1,
        nt = "mouse";function ot(t) {
      if (!this.isEventSimulatedFromTouch_(t)) {
        it.toString() in this.pointerMap && this.cancel(t);var e = lt(t, this.dispatcher);this.pointerMap[it.toString()] = t, this.dispatcher.down(e, t);
      }
    }function rt(t) {
      if (!this.isEventSimulatedFromTouch_(t)) {
        var e = lt(t, this.dispatcher);this.dispatcher.move(e, t);
      }
    }function st(t) {
      if (!this.isEventSimulatedFromTouch_(t)) {
        var e = this.pointerMap[it.toString()];if (e && e.button === t.button) {
          var i = lt(t, this.dispatcher);this.dispatcher.up(i, t), this.cleanupMouse();
        }
      }
    }function at(t) {
      if (!this.isEventSimulatedFromTouch_(t)) {
        var e = lt(t, this.dispatcher);this.dispatcher.enterOver(e, t);
      }
    }function ht(t) {
      if (!this.isEventSimulatedFromTouch_(t)) {
        var e = lt(t, this.dispatcher);this.dispatcher.leaveOut(e, t);
      }
    }function lt(t, e) {
      var i = e.cloneEvent(t, t),
          n = i.preventDefault;return i.preventDefault = function () {
        t.preventDefault(), n();
      }, i.pointerId = it, i.isPrimary = !0, i.pointerType = nt, i;
    }var ut = function (t) {
      function e(e) {
        var i = { mousedown: ot, mousemove: rt, mouseup: st, mouseover: at, mouseout: ht };t.call(this, e, i), this.pointerMap = e.pointerMap, this.lastTouches = [];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.isEventSimulatedFromTouch_ = function (t) {
        for (var e = this.lastTouches, i = t.clientX, n = t.clientY, o = 0, r = e.length, s = void 0; o < r && (s = e[o]); o++) {
          var a = Math.abs(i - s[0]),
              h = Math.abs(n - s[1]);if (a <= 25 && h <= 25) return !0;
        }return !1;
      }, e.prototype.cancel = function (t) {
        var e = lt(t, this.dispatcher);this.dispatcher.cancel(e, t), this.cleanupMouse();
      }, e.prototype.cleanupMouse = function () {
        delete this.pointerMap[it.toString()];
      }, e;
    }(et),
        ct = ["", "unavailable", "touch", "pen", "mouse"];function pt(t) {
      this.pointerMap[t.pointerId.toString()] = t;var e = this.prepareEvent_(t);this.dispatcher.down(e, t);
    }function dt(t) {
      var e = this.prepareEvent_(t);this.dispatcher.move(e, t);
    }function ft(t) {
      var e = this.prepareEvent_(t);this.dispatcher.up(e, t), this.cleanup(t.pointerId);
    }function _t(t) {
      var e = this.prepareEvent_(t);this.dispatcher.leaveOut(e, t);
    }function gt(t) {
      var e = this.prepareEvent_(t);this.dispatcher.enterOver(e, t);
    }function yt(t) {
      var e = this.prepareEvent_(t);this.dispatcher.cancel(e, t), this.cleanup(t.pointerId);
    }function vt(t) {
      var e = this.dispatcher.makeEvent("lostpointercapture", t, t);this.dispatcher.dispatchEvent(e);
    }function mt(t) {
      var e = this.dispatcher.makeEvent("gotpointercapture", t, t);this.dispatcher.dispatchEvent(e);
    }var Et = function (t) {
      function e(e) {
        var i = { MSPointerDown: pt, MSPointerMove: dt, MSPointerUp: ft, MSPointerOut: _t, MSPointerOver: gt, MSPointerCancel: yt, MSGotPointerCapture: mt, MSLostPointerCapture: vt };t.call(this, e, i), this.pointerMap = e.pointerMap;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.prepareEvent_ = function (t) {
        var e = t;return "number" == typeof t.pointerType && ((e = this.dispatcher.cloneEvent(t, t)).pointerType = ct[t.pointerType]), e;
      }, e.prototype.cleanup = function (t) {
        delete this.pointerMap[t.toString()];
      }, e;
    }(et);function xt(t) {
      this.dispatcher.fireNativeEvent(t);
    }function Ct(t) {
      this.dispatcher.fireNativeEvent(t);
    }function Tt(t) {
      this.dispatcher.fireNativeEvent(t);
    }function St(t) {
      this.dispatcher.fireNativeEvent(t);
    }function Rt(t) {
      this.dispatcher.fireNativeEvent(t);
    }function It(t) {
      this.dispatcher.fireNativeEvent(t);
    }function wt(t) {
      this.dispatcher.fireNativeEvent(t);
    }function Ot(t) {
      this.dispatcher.fireNativeEvent(t);
    }var Lt = function (t) {
      function e(e) {
        var i = { pointerdown: xt, pointermove: Ct, pointerup: Tt, pointerout: St, pointerover: Rt, pointercancel: It, gotpointercapture: Ot, lostpointercapture: wt };t.call(this, e, i);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(et),
        Mt = !1,
        Pt = function (t) {
      function e(e, i, n) {
        t.call(this, e), this.originalEvent = i;var o = n || {};this.buttons = this.getButtons_(o), this.pressure = this.getPressure_(o, this.buttons), this.bubbles = "bubbles" in o && o.bubbles, this.cancelable = "cancelable" in o && o.cancelable, this.view = "view" in o ? o.view : null, this.detail = "detail" in o ? o.detail : null, this.screenX = "screenX" in o ? o.screenX : 0, this.screenY = "screenY" in o ? o.screenY : 0, this.clientX = "clientX" in o ? o.clientX : 0, this.clientY = "clientY" in o ? o.clientY : 0, this.ctrlKey = "ctrlKey" in o && o.ctrlKey, this.altKey = "altKey" in o && o.altKey, this.shiftKey = "shiftKey" in o && o.shiftKey, this.metaKey = "metaKey" in o && o.metaKey, this.button = "button" in o ? o.button : 0, this.relatedTarget = "relatedTarget" in o ? o.relatedTarget : null, this.pointerId = "pointerId" in o ? o.pointerId : 0, this.width = "width" in o ? o.width : 0, this.height = "height" in o ? o.height : 0, this.tiltX = "tiltX" in o ? o.tiltX : 0, this.tiltY = "tiltY" in o ? o.tiltY : 0, this.pointerType = "pointerType" in o ? o.pointerType : "", this.hwTimestamp = "hwTimestamp" in o ? o.hwTimestamp : 0, this.isPrimary = "isPrimary" in o && o.isPrimary, i.preventDefault && (this.preventDefault = function () {
          i.preventDefault();
        });
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getButtons_ = function (t) {
        var e;if (t.buttons || Mt) e = t.buttons;else switch (t.which) {case 1:
            e = 1;break;case 2:
            e = 4;break;case 3:
            e = 2;break;default:
            e = 0;}return e;
      }, e.prototype.getPressure_ = function (t, e) {
        return t.pressure ? t.pressure : e ? .5 : 0;
      }, e;
    }(O);!function () {
      try {
        var t = new MouseEvent("click", { buttons: 1 });Mt = 1 === t.buttons;
      } catch (t) {}
    }();var Ft = Pt;function bt(t, e) {
      return t > e ? 1 : t < e ? -1 : 0;
    }function At(t, e) {
      return t.indexOf(e) >= 0;
    }function Dt(t, e, i) {
      var n,
          o = t.length;if (t[0] <= e) return 0;if (e <= t[o - 1]) return o - 1;if (i > 0) {
        for (n = 1; n < o; ++n) if (t[n] < e) return n - 1;
      } else if (i < 0) {
        for (n = 1; n < o; ++n) if (t[n] <= e) return n;
      } else for (n = 1; n < o; ++n) {
        if (t[n] == e) return n;if (t[n] < e) return t[n - 1] - e < e - t[n] ? n - 1 : n;
      }return o - 1;
    }function Gt(t, e, i) {
      for (; e < i;) {
        var n = t[e];t[e] = t[i], t[i] = n, ++e, --i;
      }
    }function kt(t, e) {
      for (var i = Array.isArray(e) ? e : [e], n = i.length, o = 0; o < n; o++) t[t.length] = i[o];
    }function Nt(t, e) {
      var i = t.length;if (i !== e.length) return !1;for (var n = 0; n < i; n++) if (t[n] !== e[n]) return !1;return !0;
    }function Yt(t) {
      this.vacuumTouches_(t), this.setPrimaryTouch_(t.changedTouches[0]), this.dedupSynthMouse_(t), this.clickCount_++, this.processTouches_(t, this.overDown_);
    }function Xt(t) {
      t.preventDefault(), this.processTouches_(t, this.moveOverOut_);
    }function jt(t) {
      this.dedupSynthMouse_(t), this.processTouches_(t, this.upOut_);
    }function Wt(t) {
      this.processTouches_(t, this.cancelOut_);
    }var Kt = function (t) {
      function e(e, i) {
        var n = { touchstart: Yt, touchmove: Xt, touchend: jt, touchcancel: Wt };t.call(this, e, n), this.pointerMap = e.pointerMap, this.mouseSource = i, this.firstTouchId_ = void 0, this.clickCount_ = 0, this.resetId_ = void 0, this.dedupTimeout_ = 2500;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.isPrimaryTouch_ = function (t) {
        return this.firstTouchId_ === t.identifier;
      }, e.prototype.setPrimaryTouch_ = function (t) {
        var e = Object.keys(this.pointerMap).length;(0 === e || 1 === e && it.toString() in this.pointerMap) && (this.firstTouchId_ = t.identifier, this.cancelResetClickCount_());
      }, e.prototype.removePrimaryPointer_ = function (t) {
        t.isPrimary && (this.firstTouchId_ = void 0, this.resetClickCount_());
      }, e.prototype.resetClickCount_ = function () {
        this.resetId_ = setTimeout(this.resetClickCountHandler_.bind(this), 200);
      }, e.prototype.resetClickCountHandler_ = function () {
        this.clickCount_ = 0, this.resetId_ = void 0;
      }, e.prototype.cancelResetClickCount_ = function () {
        void 0 !== this.resetId_ && clearTimeout(this.resetId_);
      }, e.prototype.touchToPointer_ = function (t, e) {
        var i = this.dispatcher.cloneEvent(t, e);return i.pointerId = e.identifier + 2, i.bubbles = !0, i.cancelable = !0, i.detail = this.clickCount_, i.button = 0, i.buttons = 1, i.width = e.webkitRadiusX || e.radiusX || 0, i.height = e.webkitRadiusY || e.radiusY || 0, i.pressure = e.webkitForce || e.force || .5, i.isPrimary = this.isPrimaryTouch_(e), i.pointerType = "touch", i.clientX = e.clientX, i.clientY = e.clientY, i.screenX = e.screenX, i.screenY = e.screenY, i;
      }, e.prototype.processTouches_ = function (t, e) {
        var i = Array.prototype.slice.call(t.changedTouches),
            n = i.length;function o() {
          t.preventDefault();
        }for (var r = 0; r < n; ++r) {
          var s = this.touchToPointer_(t, i[r]);s.preventDefault = o, e.call(this, t, s);
        }
      }, e.prototype.findTouch_ = function (t, e) {
        for (var i = t.length, n = 0; n < i; n++) {
          if (t[n].identifier === e) return !0;
        }return !1;
      }, e.prototype.vacuumTouches_ = function (t) {
        var e = t.touches,
            i = Object.keys(this.pointerMap),
            n = i.length;if (n >= e.length) {
          for (var o = [], r = 0; r < n; ++r) {
            var s = i[r],
                a = this.pointerMap[s];s == it || this.findTouch_(e, s - 2) || o.push(a.out);
          }for (var h = 0; h < o.length; ++h) this.cancelOut_(t, o[h]);
        }
      }, e.prototype.overDown_ = function (t, e) {
        this.pointerMap[e.pointerId] = { target: e.target, out: e, outTarget: e.target }, this.dispatcher.over(e, t), this.dispatcher.enter(e, t), this.dispatcher.down(e, t);
      }, e.prototype.moveOverOut_ = function (t, e) {
        var i = e,
            n = this.pointerMap[i.pointerId];if (n) {
          var o = n.out,
              r = n.outTarget;this.dispatcher.move(i, t), o && r !== i.target && (o.relatedTarget = i.target, i.relatedTarget = r, o.target = r, i.target ? (this.dispatcher.leaveOut(o, t), this.dispatcher.enterOver(i, t)) : (i.target = r, i.relatedTarget = null, this.cancelOut_(t, i))), n.out = i, n.outTarget = i.target;
        }
      }, e.prototype.upOut_ = function (t, e) {
        this.dispatcher.up(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e);
      }, e.prototype.cancelOut_ = function (t, e) {
        this.dispatcher.cancel(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e);
      }, e.prototype.cleanUpPointer_ = function (t) {
        delete this.pointerMap[t.pointerId], this.removePrimaryPointer_(t);
      }, e.prototype.dedupSynthMouse_ = function (t) {
        var e = this.mouseSource.lastTouches,
            i = t.changedTouches[0];if (this.isPrimaryTouch_(i)) {
          var n = [i.clientX, i.clientY];e.push(n), setTimeout(function () {
            !function (t, e) {
              var i = t.indexOf(e),
                  n = i > -1;n && t.splice(i, 1);
            }(e, n);
          }, this.dedupTimeout_);
        }
      }, e;
    }(et),
        zt = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary", !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]],
        Ut = function (t) {
      function e(e) {
        t.call(this), this.element_ = e, this.pointerMap = {}, this.eventMap_ = {}, this.eventSourceList_ = [], this.registerSources();
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.registerSources = function () {
        if (H) this.registerSource("native", new Lt(this));else if (q) this.registerSource("ms", new Et(this));else {
          var t = new ut(this);this.registerSource("mouse", t), Z && this.registerSource("touch", new Kt(this, t));
        }this.register_();
      }, e.prototype.registerSource = function (t, e) {
        var i = e,
            n = i.getEvents();n && (n.forEach(function (t) {
          var e = i.getHandlerForEvent(t);e && (this.eventMap_[t] = e.bind(i));
        }.bind(this)), this.eventSourceList_.push(i));
      }, e.prototype.register_ = function () {
        for (var t = this.eventSourceList_.length, e = 0; e < t; e++) {
          var i = this.eventSourceList_[e];this.addEvents_(i.getEvents());
        }
      }, e.prototype.unregister_ = function () {
        for (var t = this.eventSourceList_.length, e = 0; e < t; e++) {
          var i = this.eventSourceList_[e];this.removeEvents_(i.getEvents());
        }
      }, e.prototype.eventHandler_ = function (t) {
        var e = t.type,
            i = this.eventMap_[e];i && i(t);
      }, e.prototype.addEvents_ = function (t) {
        t.forEach(function (t) {
          y(this.element_, t, this.eventHandler_, this);
        }.bind(this));
      }, e.prototype.removeEvents_ = function (t) {
        t.forEach(function (t) {
          m(this.element_, t, this.eventHandler_, this);
        }.bind(this));
      }, e.prototype.cloneEvent = function (t, e) {
        for (var i = {}, n = 0, o = zt.length; n < o; n++) {
          var r = zt[n][0];i[r] = t[r] || e[r] || zt[n][1];
        }return i;
      }, e.prototype.down = function (t, e) {
        this.fireEvent($.POINTERDOWN, t, e);
      }, e.prototype.move = function (t, e) {
        this.fireEvent($.POINTERMOVE, t, e);
      }, e.prototype.up = function (t, e) {
        this.fireEvent($.POINTERUP, t, e);
      }, e.prototype.enter = function (t, e) {
        t.bubbles = !1, this.fireEvent($.POINTERENTER, t, e);
      }, e.prototype.leave = function (t, e) {
        t.bubbles = !1, this.fireEvent($.POINTERLEAVE, t, e);
      }, e.prototype.over = function (t, e) {
        t.bubbles = !0, this.fireEvent($.POINTEROVER, t, e);
      }, e.prototype.out = function (t, e) {
        t.bubbles = !0, this.fireEvent($.POINTEROUT, t, e);
      }, e.prototype.cancel = function (t, e) {
        this.fireEvent($.POINTERCANCEL, t, e);
      }, e.prototype.leaveOut = function (t, e) {
        this.out(t, e), this.contains_(t.target, t.relatedTarget) || this.leave(t, e);
      }, e.prototype.enterOver = function (t, e) {
        this.over(t, e), this.contains_(t.target, t.relatedTarget) || this.enter(t, e);
      }, e.prototype.contains_ = function (t, e) {
        return !(!t || !e) && t.contains(e);
      }, e.prototype.makeEvent = function (t, e, i) {
        return new Ft(t, i, e);
      }, e.prototype.fireEvent = function (t, e, i) {
        var n = this.makeEvent(t, e, i);this.dispatchEvent(n);
      }, e.prototype.fireNativeEvent = function (t) {
        var e = this.makeEvent(t.type, t, t);this.dispatchEvent(e);
      }, e.prototype.wrapMouseEvent = function (t, e) {
        return this.makeEvent(t, ut.prepareEvent(e, this), e);
      }, e.prototype.disposeInternal = function () {
        this.unregister_(), t.prototype.disposeInternal.call(this);
      }, e;
    }(L),
        Bt = function (t) {
      function e(e, i) {
        t.call(this), this.map_ = e, this.clickTimeoutId_ = 0, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = i ? i * B : B, this.down_ = null;var n = this.map_.getViewport();this.activePointers_ = 0, this.trackedTouches_ = {}, this.pointerEventHandler_ = new Ut(n), this.documentPointerEventHandler_ = null, this.pointerdownListenerKey_ = y(this.pointerEventHandler_, $.POINTERDOWN, this.handlePointerDown_, this), this.relayedListenerKey_ = y(this.pointerEventHandler_, $.POINTERMOVE, this.relayEvent_, this);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.emulateClick_ = function (t) {
        var e = new Q(J.CLICK, this.map_, t);this.dispatchEvent(e), 0 !== this.clickTimeoutId_ ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = 0, e = new Q(J.DBLCLICK, this.map_, t), this.dispatchEvent(e)) : this.clickTimeoutId_ = setTimeout(function () {
          this.clickTimeoutId_ = 0;var e = new Q(J.SINGLECLICK, this.map_, t);this.dispatchEvent(e);
        }.bind(this), 250);
      }, e.prototype.updateActivePointers_ = function (t) {
        var e = t;e.type == J.POINTERUP || e.type == J.POINTERCANCEL ? delete this.trackedTouches_[e.pointerId] : e.type == J.POINTERDOWN && (this.trackedTouches_[e.pointerId] = !0), this.activePointers_ = Object.keys(this.trackedTouches_).length;
      }, e.prototype.handlePointerUp_ = function (t) {
        this.updateActivePointers_(t);var e = new Q(J.POINTERUP, this.map_, t);this.dispatchEvent(e), e.propagationStopped || this.dragging_ || !this.isMouseActionButton_(t) || this.emulateClick_(this.down_), 0 === this.activePointers_ && (this.dragListenerKeys_.forEach(E), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null, this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null);
      }, e.prototype.isMouseActionButton_ = function (t) {
        return 0 === t.button;
      }, e.prototype.handlePointerDown_ = function (t) {
        this.updateActivePointers_(t);var e = new Q(J.POINTERDOWN, this.map_, t);this.dispatchEvent(e), this.down_ = t, 0 === this.dragListenerKeys_.length && (this.documentPointerEventHandler_ = new Ut(document), this.dragListenerKeys_.push(y(this.documentPointerEventHandler_, J.POINTERMOVE, this.handlePointerMove_, this), y(this.documentPointerEventHandler_, J.POINTERUP, this.handlePointerUp_, this), y(this.pointerEventHandler_, J.POINTERCANCEL, this.handlePointerUp_, this)));
      }, e.prototype.handlePointerMove_ = function (t) {
        if (this.isMoving_(t)) {
          this.dragging_ = !0;var e = new Q(J.POINTERDRAG, this.map_, t, this.dragging_);this.dispatchEvent(e);
        }t.preventDefault();
      }, e.prototype.relayEvent_ = function (t) {
        var e = !(!this.down_ || !this.isMoving_(t));this.dispatchEvent(new Q(t.type, this.map_, t, e));
      }, e.prototype.isMoving_ = function (t) {
        return this.dragging_ || Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_;
      }, e.prototype.disposeInternal = function () {
        this.relayedListenerKey_ && (E(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.pointerdownListenerKey_ && (E(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(E), this.dragListenerKeys_.length = 0, this.documentPointerEventHandler_ && (this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null), this.pointerEventHandler_ && (this.pointerEventHandler_.dispose(), this.pointerEventHandler_ = null), t.prototype.disposeInternal.call(this);
      }, e;
    }(L),
        Vt = "postrender",
        Zt = "movestart",
        Ht = "moveend",
        qt = { LAYERGROUP: "layergroup", SIZE: "size", TARGET: "target", VIEW: "view" },
        Jt = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4, ABORT: 5 };function Qt(t, e) {
      if (!t) throw new s(e);
    }var $t = function (t, e) {
      this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
    };$t.prototype.clear = function () {
      this.elements_.length = 0, this.priorities_.length = 0, u(this.queuedElements_);
    }, $t.prototype.dequeue = function () {
      var t = this.elements_,
          e = this.priorities_,
          i = t[0];1 == t.length ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0));var n = this.keyFunction_(i);return delete this.queuedElements_[n], i;
    }, $t.prototype.enqueue = function (t) {
      Qt(!(this.keyFunction_(t) in this.queuedElements_), 31);var e = this.priorityFunction_(t);return e != 1 / 0 && (this.elements_.push(t), this.priorities_.push(e), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0);
    }, $t.prototype.getCount = function () {
      return this.elements_.length;
    }, $t.prototype.getLeftChildIndex_ = function (t) {
      return 2 * t + 1;
    }, $t.prototype.getRightChildIndex_ = function (t) {
      return 2 * t + 2;
    }, $t.prototype.getParentIndex_ = function (t) {
      return t - 1 >> 1;
    }, $t.prototype.heapify_ = function () {
      var t;for (t = (this.elements_.length >> 1) - 1; t >= 0; t--) this.siftUp_(t);
    }, $t.prototype.isEmpty = function () {
      return 0 === this.elements_.length;
    }, $t.prototype.isKeyQueued = function (t) {
      return t in this.queuedElements_;
    }, $t.prototype.isQueued = function (t) {
      return this.isKeyQueued(this.keyFunction_(t));
    }, $t.prototype.siftUp_ = function (t) {
      for (var e = this.elements_, i = this.priorities_, n = e.length, o = e[t], r = i[t], s = t; t < n >> 1;) {
        var a = this.getLeftChildIndex_(t),
            h = this.getRightChildIndex_(t),
            l = h < n && i[h] < i[a] ? h : a;e[t] = e[l], i[t] = i[l], t = l;
      }e[t] = o, i[t] = r, this.siftDown_(s, t);
    }, $t.prototype.siftDown_ = function (t, e) {
      for (var i = this.elements_, n = this.priorities_, o = i[e], r = n[e]; e > t;) {
        var s = this.getParentIndex_(e);if (!(n[s] > r)) break;i[e] = i[s], n[e] = n[s], e = s;
      }i[e] = o, n[e] = r;
    }, $t.prototype.reprioritize = function () {
      var t,
          e,
          i,
          n = this.priorityFunction_,
          o = this.elements_,
          r = this.priorities_,
          s = 0,
          a = o.length;for (e = 0; e < a; ++e) (i = n(t = o[e])) == 1 / 0 ? delete this.queuedElements_[this.keyFunction_(t)] : (r[s] = i, o[s++] = t);o.length = s, r.length = s, this.heapify_();
    };var te = function (t) {
      function e(e, i) {
        t.call(this, function (t) {
          return e.apply(null, t);
        }, function (t) {
          return t[0].getKey();
        }), this.tileChangeCallback_ = i, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {};
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.enqueue = function (e) {
        var i = t.prototype.enqueue.call(this, e);i && y(e[0], M.CHANGE, this.handleTileChange, this);return i;
      }, e.prototype.getTilesLoading = function () {
        return this.tilesLoading_;
      }, e.prototype.handleTileChange = function (t) {
        var e = t.target,
            i = e.getState();if (i === Jt.LOADED || i === Jt.ERROR || i === Jt.EMPTY || i === Jt.ABORT) {
          m(e, M.CHANGE, this.handleTileChange, this);var n = e.getKey();n in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[n], --this.tilesLoading_), this.tileChangeCallback_();
        }
      }, e.prototype.loadMoreTiles = function (t, e) {
        for (var i, n, o, r = 0, s = !1; this.tilesLoading_ < t && r < e && this.getCount() > 0;) o = (n = this.dequeue()[0]).getKey(), (i = n.getState()) === Jt.ABORT ? s = !0 : i !== Jt.IDLE || o in this.tilesLoadingKeys_ || (this.tilesLoadingKeys_[o] = !0, ++this.tilesLoading_, ++r, n.load());0 === r && s && this.tileChangeCallback_();
      }, e;
    }($t),
        ee = 42,
        ie = 256;function ne(t, e, i) {
      return Math.min(Math.max(t, e), i);
    }var oe = "cosh" in Math ? Math.cosh : function (t) {
      var e = Math.exp(t);return (e + 1 / e) / 2;
    };function re(t, e, i, n, o, r) {
      var s = o - i,
          a = r - n;if (0 !== s || 0 !== a) {
        var h = ((t - i) * s + (e - n) * a) / (s * s + a * a);h > 1 ? (i = o, n = r) : h > 0 && (i += s * h, n += a * h);
      }return se(t, e, i, n);
    }function se(t, e, i, n) {
      var o = i - t,
          r = n - e;return o * o + r * r;
    }function ae(t) {
      return t * Math.PI / 180;
    }function he(t, e) {
      var i = t % e;return i * e < 0 ? i + e : i;
    }function le(t, e, i) {
      return t + i * (e - t);
    }function ue(t) {
      return t;
    }function ce(t, e) {
      return void 0 !== t ? 0 : void 0;
    }function pe(t, e) {
      return void 0 !== t ? t + e : void 0;
    }var de = { ANIMATING: 0, INTERACTING: 1 },
        fe = "center",
        _e = "resolution",
        ge = "rotation";function ye(t, e) {
      return t[0] += e[0], t[1] += e[1], t;
    }function ve(t, e) {
      var i = Math.cos(e),
          n = Math.sin(e),
          o = t[0] * i - t[1] * n,
          r = t[1] * i + t[0] * n;return t[0] = o, t[1] = r, t;
    }function me(t, e) {
      return t[0] *= e, t[1] *= e, t;
    }function Ee(t) {
      return Math.pow(t, 3);
    }function xe(t) {
      return 1 - Ee(1 - t);
    }function Ce(t) {
      return 3 * t * t - 2 * t * t * t;
    }function Te(t) {
      return t;
    }var Se = { BOTTOM_LEFT: "bottom-left", BOTTOM_RIGHT: "bottom-right", TOP_LEFT: "top-left", TOP_RIGHT: "top-right" },
        Re = { UNKNOWN: 0, INTERSECTING: 1, ABOVE: 2, RIGHT: 4, BELOW: 8, LEFT: 16 };function Ie(t) {
      for (var e = Ae(), i = 0, n = t.length; i < n; ++i) Xe(e, t[i]);return e;
    }function we(t, e, i) {
      return i ? (i[0] = t[0] - e, i[1] = t[1] - e, i[2] = t[2] + e, i[3] = t[3] + e, i) : [t[0] - e, t[1] - e, t[2] + e, t[3] + e];
    }function Oe(t, e) {
      return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice();
    }function Le(t, e, i) {
      var n, o;return (n = e < t[0] ? t[0] - e : t[2] < e ? e - t[2] : 0) * n + (o = i < t[1] ? t[1] - i : t[3] < i ? i - t[3] : 0) * o;
    }function Me(t, e) {
      return Fe(t, e[0], e[1]);
    }function Pe(t, e) {
      return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3];
    }function Fe(t, e, i) {
      return t[0] <= e && e <= t[2] && t[1] <= i && i <= t[3];
    }function be(t, e) {
      var i = t[0],
          n = t[1],
          o = t[2],
          r = t[3],
          s = e[0],
          a = e[1],
          h = Re.UNKNOWN;return s < i ? h |= Re.LEFT : s > o && (h |= Re.RIGHT), a < n ? h |= Re.BELOW : a > r && (h |= Re.ABOVE), h === Re.UNKNOWN && (h = Re.INTERSECTING), h;
    }function Ae() {
      return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    }function De(t, e, i, n, o) {
      return o ? (o[0] = t, o[1] = e, o[2] = i, o[3] = n, o) : [t, e, i, n];
    }function Ge(t) {
      return De(1 / 0, 1 / 0, -1 / 0, -1 / 0, t);
    }function ke(t, e, i, n, o) {
      return We(Ge(o), t, e, i, n);
    }function Ne(t, e) {
      return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3];
    }function Ye(t, e) {
      return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t;
    }function Xe(t, e) {
      e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1]);
    }function je(t, e) {
      for (var i = 0, n = e.length; i < n; ++i) Xe(t, e[i]);return t;
    }function We(t, e, i, n, o) {
      for (; i < n; i += o) Ke(t, e[i], e[i + 1]);return t;
    }function Ke(t, e, i) {
      t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], i), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], i);
    }function ze(t) {
      var e = 0;return ei(t) || (e = $e(t) * He(t)), e;
    }function Ue(t) {
      return [t[0], t[1]];
    }function Be(t) {
      return [t[2], t[1]];
    }function Ve(t) {
      return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2];
    }function Ze(t, e, i, n, o) {
      var r = e * n[0] / 2,
          s = e * n[1] / 2,
          a = Math.cos(i),
          h = Math.sin(i),
          l = r * a,
          u = r * h,
          c = s * a,
          p = s * h,
          d = t[0],
          f = t[1],
          _ = d - l + p,
          g = d - l - p,
          y = d + l - p,
          v = d + l + p,
          m = f - u - c,
          E = f - u + c,
          x = f + u + c,
          C = f + u - c;return De(Math.min(_, g, y, v), Math.min(m, E, x, C), Math.max(_, g, y, v), Math.max(m, E, x, C), o);
    }function He(t) {
      return t[3] - t[1];
    }function qe(t, e, i) {
      var n = i || [1 / 0, 1 / 0, -1 / 0, -1 / 0];return ti(t, e) ? (t[0] > e[0] ? n[0] = t[0] : n[0] = e[0], t[1] > e[1] ? n[1] = t[1] : n[1] = e[1], t[2] < e[2] ? n[2] = t[2] : n[2] = e[2], t[3] < e[3] ? n[3] = t[3] : n[3] = e[3]) : Ge(n), n;
    }function Je(t) {
      return [t[0], t[3]];
    }function Qe(t) {
      return [t[2], t[3]];
    }function $e(t) {
      return t[2] - t[0];
    }function ti(t, e) {
      return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1];
    }function ei(t) {
      return t[2] < t[0] || t[3] < t[1];
    }function ii(t, e, i) {
      var n = [t[0], t[1], t[0], t[3], t[2], t[1], t[2], t[3]];return e(n, n, 2), function (t, e, i) {
        return De(Math.min.apply(null, t), Math.min.apply(null, e), Math.max.apply(null, t), Math.max.apply(null, e), i);
      }([n[0], n[2], n[4], n[6]], [n[1], n[3], n[5], n[7]], i);
    }var ni = { POINT: "Point", LINE_STRING: "LineString", LINEAR_RING: "LinearRing", POLYGON: "Polygon", MULTI_POINT: "MultiPoint", MULTI_LINE_STRING: "MultiLineString", MULTI_POLYGON: "MultiPolygon", GEOMETRY_COLLECTION: "GeometryCollection", CIRCLE: "Circle" },
        oi = { XY: "XY", XYZ: "XYZ", XYM: "XYM", XYZM: "XYZM" };function ri(t, e, i, n, o, r) {
      for (var s = r || [], a = 0, h = e; h < i; h += n) {
        var l = t[h],
            u = t[h + 1];s[a++] = o[0] * l + o[2] * u + o[4], s[a++] = o[1] * l + o[3] * u + o[5];
      }return r && s.length != a && (s.length = a), s;
    }
    /**
     * @license
     * Latitude/longitude spherical geodesy formulae taken from
     * http://www.movable-type.co.uk/scripts/latlong.html
     * Licensed under CC-BY-3.0.
     */
    var si = 6371008.8;function ai(t, e, i) {
      var n = i || si,
          o = ae(t[1]),
          r = ae(e[1]),
          s = (r - o) / 2,
          a = ae(e[0] - t[0]) / 2,
          h = Math.sin(s) * Math.sin(s) + Math.sin(a) * Math.sin(a) * Math.cos(o) * Math.cos(r);return 2 * n * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    }var hi = { DEGREES: "degrees", FEET: "ft", METERS: "m", PIXELS: "pixels", TILE_PIXELS: "tile-pixels", USFEET: "us-ft" },
        li = {};li[hi.DEGREES] = 2 * Math.PI * 6370997 / 360, li[hi.FEET] = .3048, li[hi.METERS] = 1, li[hi.USFEET] = 1200 / 3937;var ui = hi,
        ci = function (t) {
      this.code_ = t.code, this.units_ = t.units, this.extent_ = void 0 !== t.extent ? t.extent : null, this.worldExtent_ = void 0 !== t.worldExtent ? t.worldExtent : null, this.axisOrientation_ = void 0 !== t.axisOrientation ? t.axisOrientation : "enu", this.global_ = void 0 !== t.global && t.global, this.canWrapX_ = !(!this.global_ || !this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit;
    };ci.prototype.canWrapX = function () {
      return this.canWrapX_;
    }, ci.prototype.getCode = function () {
      return this.code_;
    }, ci.prototype.getExtent = function () {
      return this.extent_;
    }, ci.prototype.getUnits = function () {
      return this.units_;
    }, ci.prototype.getMetersPerUnit = function () {
      return this.metersPerUnit_ || li[this.units_];
    }, ci.prototype.getWorldExtent = function () {
      return this.worldExtent_;
    }, ci.prototype.getAxisOrientation = function () {
      return this.axisOrientation_;
    }, ci.prototype.isGlobal = function () {
      return this.global_;
    }, ci.prototype.setGlobal = function (t) {
      this.global_ = t, this.canWrapX_ = !(!t || !this.extent_);
    }, ci.prototype.getDefaultTileGrid = function () {
      return this.defaultTileGrid_;
    }, ci.prototype.setDefaultTileGrid = function (t) {
      this.defaultTileGrid_ = t;
    }, ci.prototype.setExtent = function (t) {
      this.extent_ = t, this.canWrapX_ = !(!this.global_ || !t);
    }, ci.prototype.setWorldExtent = function (t) {
      this.worldExtent_ = t;
    }, ci.prototype.setGetPointResolution = function (t) {
      this.getPointResolutionFunc_ = t;
    }, ci.prototype.getPointResolutionFunc = function () {
      return this.getPointResolutionFunc_;
    };var pi = ci,
        di = 6378137,
        fi = Math.PI * di,
        _i = [-fi, -fi, fi, fi],
        gi = [-180, -85, 180, 85],
        yi = function (t) {
      function e(e) {
        t.call(this, { code: e, units: ui.METERS, extent: _i, global: !0, worldExtent: gi, getPointResolution: function (t, e) {
            return t / oe(e[1] / di);
          } });
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(pi),
        vi = [new yi("EPSG:3857"), new yi("EPSG:102100"), new yi("EPSG:102113"), new yi("EPSG:900913"), new yi("urn:ogc:def:crs:EPSG:6.18:3:3857"), new yi("urn:ogc:def:crs:EPSG::3857"), new yi("http://www.opengis.net/gml/srs/epsg.xml#3857")];function mi(t, e, i) {
      var n = t.length,
          o = i > 1 ? i : 2,
          r = e;void 0 === r && (r = o > 2 ? t.slice() : new Array(n));for (var s = fi, a = 0; a < n; a += o) {
        r[a] = s * t[a] / 180;var h = di * Math.log(Math.tan(Math.PI * (t[a + 1] + 90) / 360));h > s ? h = s : h < -s && (h = -s), r[a + 1] = h;
      }return r;
    }function Ei(t, e, i) {
      var n = t.length,
          o = i > 1 ? i : 2,
          r = e;void 0 === r && (r = o > 2 ? t.slice() : new Array(n));for (var s = 0; s < n; s += o) r[s] = 180 * t[s] / fi, r[s + 1] = 360 * Math.atan(Math.exp(t[s + 1] / di)) / Math.PI - 90;return r;
    }var xi = [-180, -90, 180, 90],
        Ci = 6378137 * Math.PI / 180,
        Ti = function (t) {
      function e(e, i) {
        t.call(this, { code: e, units: ui.DEGREES, extent: xi, axisOrientation: i, global: !0, metersPerUnit: Ci, worldExtent: xi });
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(pi),
        Si = [new Ti("CRS:84"), new Ti("EPSG:4326", "neu"), new Ti("urn:ogc:def:crs:EPSG::4326", "neu"), new Ti("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new Ti("urn:ogc:def:crs:OGC:1.3:CRS84"), new Ti("urn:ogc:def:crs:OGC:2:84"), new Ti("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new Ti("urn:x-ogc:def:crs:EPSG:4326", "neu")],
        Ri = {};var Ii = {};function wi(t, e, i) {
      var n = t.getCode(),
          o = e.getCode();n in Ii || (Ii[n] = {}), Ii[n][o] = i;
    }function Oi(t, e, i) {
      var n;if (void 0 !== e) {
        for (var o = 0, r = t.length; o < r; ++o) e[o] = t[o];n = e;
      } else n = t.slice();return n;
    }function Li(t, e, i) {
      if (void 0 !== e && t !== e) {
        for (var n = 0, o = t.length; n < o; ++n) e[n] = t[n];t = e;
      }return t;
    }function Mi(t) {
      !function (t, e) {
        Ri[t] = e;
      }(t.getCode(), t), wi(t, t, Oi);
    }function Pi(t) {
      var e = null;if (t instanceof pi) e = t;else if ("string" == typeof t) {
        e = function (t) {
          return Ri[t] || null;
        }(t);
      }return e;
    }function Fi(t, e, i, n) {
      var o,
          r = (t = Pi(t)).getPointResolutionFunc();if (r) o = r(e, i);else if (t.getUnits() == ui.DEGREES && !n || n == ui.DEGREES) o = e;else {
        var s = Gi(t, Pi("EPSG:4326")),
            a = [i[0] - e / 2, i[1], i[0] + e / 2, i[1], i[0], i[1] - e / 2, i[0], i[1] + e / 2];o = (ai((a = s(a, a, 2)).slice(0, 2), a.slice(2, 4)) + ai(a.slice(4, 6), a.slice(6, 8))) / 2;var h = n ? li[n] : t.getMetersPerUnit();void 0 !== h && (o /= h);
      }return o;
    }function bi(t) {
      !function (t) {
        t.forEach(Mi);
      }(t), t.forEach(function (e) {
        t.forEach(function (t) {
          e !== t && wi(e, t, Oi);
        });
      });
    }function Ai(t, e) {
      return t ? "string" == typeof t ? Pi(t) : t : Pi(e);
    }function Di(t, e) {
      if (t === e) return !0;var i = t.getUnits() === e.getUnits();return t.getCode() === e.getCode() ? i : Gi(t, e) === Oi && i;
    }function Gi(t, e) {
      var i = function (t, e) {
        var i;return t in Ii && e in Ii[t] && (i = Ii[t][e]), i;
      }(t.getCode(), e.getCode());return i || (i = Li), i;
    }function ki(t, e) {
      return Gi(Pi(t), Pi(e));
    }function Ni(t, e, i) {
      return ki(e, i)(t, void 0, t.length);
    }bi(vi), bi(Si), function (t, e, i, n) {
      t.forEach(function (t) {
        e.forEach(function (e) {
          wi(t, e, i), wi(e, t, n);
        });
      });
    }(Si, vi, mi, Ei);var Yi = new Array(6);function Xi(t) {
      return Wi(t, 1, 0, 0, 1, 0, 0);
    }function ji(t, e) {
      var i = t[0],
          n = t[1],
          o = t[2],
          r = t[3],
          s = t[4],
          a = t[5],
          h = e[0],
          l = e[1],
          u = e[2],
          c = e[3],
          p = e[4],
          d = e[5];return t[0] = i * h + o * l, t[1] = n * h + r * l, t[2] = i * u + o * c, t[3] = n * u + r * c, t[4] = i * p + o * d + s, t[5] = n * p + r * d + a, t;
    }function Wi(t, e, i, n, o, r, s) {
      return t[0] = e, t[1] = i, t[2] = n, t[3] = o, t[4] = r, t[5] = s, t;
    }function Ki(t, e) {
      return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
    }function zi(t, e) {
      var i = e[0],
          n = e[1];return e[0] = t[0] * i + t[2] * n + t[4], e[1] = t[1] * i + t[3] * n + t[5], e;
    }function Ui(t, e, i) {
      return ji(t, Wi(Yi, e, 0, 0, i, 0, 0));
    }function Bi(t, e, i) {
      return ji(t, Wi(Yi, 1, 0, 0, 1, e, i));
    }function Vi(t, e, i, n, o, r, s, a) {
      var h = Math.sin(r),
          l = Math.cos(r);return t[0] = n * l, t[1] = o * h, t[2] = -n * h, t[3] = o * l, t[4] = s * n * l - a * n * h + e, t[5] = s * o * h + a * o * l + i, t;
    }var Zi = [1, 0, 0, 1, 0, 0],
        Hi = function (t) {
      function e() {
        t.call(this), this.extent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.extentRevision_ = -1, this.simplifiedGeometryCache = {}, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {}, e.prototype.closestPointXY = function (t, e, i, n) {}, e.prototype.getClosestPoint = function (t, e) {
        var i = e || [NaN, NaN];return this.closestPointXY(t[0], t[1], i, 1 / 0), i;
      }, e.prototype.intersectsCoordinate = function (t) {
        return this.containsXY(t[0], t[1]);
      }, e.prototype.computeExtent = function (t) {}, e.prototype.getExtent = function (t) {
        return this.extentRevision_ != this.getRevision() && (this.extent_ = this.computeExtent(this.extent_), this.extentRevision_ = this.getRevision()), function (t, e) {
          return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t;
        }(this.extent_, t);
      }, e.prototype.rotate = function (t, e) {}, e.prototype.scale = function (t, e, i) {}, e.prototype.translate = function (t, e) {}, e.prototype.simplify = function (t) {
        return this.getSimplifiedGeometry(t * t);
      }, e.prototype.getSimplifiedGeometry = function (t) {}, e.prototype.getType = function () {}, e.prototype.applyTransform = function (t) {}, e.prototype.intersectsExtent = function (t) {}, e.prototype.translate = function (t, e) {}, e.prototype.transform = function (t, e) {
        var i = (t = Pi(t)).getUnits() == ui.TILE_PIXELS ? function (i, n, o) {
          var r = t.getExtent(),
              s = t.getWorldExtent(),
              a = He(s) / He(r);return Vi(Zi, s[0], s[3], a, -a, 0, 0, 0), ri(i, 0, i.length, o, Zi, n), ki(t, e)(i, n, o);
        } : ki(t, e);return this.applyTransform(i), this;
      }, e;
    }(D);Hi.prototype.containsXY = C;var qi = Hi,
        Ji = function (t) {
      function e() {
        t.call(this), this.layout = oi.XY, this.stride = 2, this.flatCoordinates = null;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.computeExtent = function (t) {
        return ke(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t);
      }, e.prototype.getCoordinates = function () {}, e.prototype.getFirstCoordinate = function () {
        return this.flatCoordinates.slice(0, this.stride);
      }, e.prototype.getFlatCoordinates = function () {
        return this.flatCoordinates;
      }, e.prototype.getLastCoordinate = function () {
        return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
      }, e.prototype.getLayout = function () {
        return this.layout;
      }, e.prototype.getSimplifiedGeometry = function (t) {
        if (this.simplifiedGeometryRevision != this.getRevision() && (u(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || 0 !== this.simplifiedGeometryMaxMinSquaredTolerance && t <= this.simplifiedGeometryMaxMinSquaredTolerance) return this;var e = t.toString();if (this.simplifiedGeometryCache.hasOwnProperty(e)) return this.simplifiedGeometryCache[e];var i = this.getSimplifiedGeometryInternal(t);return i.getFlatCoordinates().length < this.flatCoordinates.length ? (this.simplifiedGeometryCache[e] = i, i) : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
      }, e.prototype.getSimplifiedGeometryInternal = function (t) {
        return this;
      }, e.prototype.getStride = function () {
        return this.stride;
      }, e.prototype.setFlatCoordinates = function (t, e) {
        this.stride = Qi(t), this.layout = t, this.flatCoordinates = e;
      }, e.prototype.setCoordinates = function (t, e) {}, e.prototype.setLayout = function (t, e, i) {
        var n;if (t) n = Qi(t);else {
          for (var o = 0; o < i; ++o) {
            if (0 === e.length) return this.layout = oi.XY, void (this.stride = 2);e = e[0];
          }t = function (t) {
            var e;2 == t ? e = oi.XY : 3 == t ? e = oi.XYZ : 4 == t && (e = oi.XYZM);return e;
          }(n = e.length);
        }this.layout = t, this.stride = n;
      }, e.prototype.applyTransform = function (t) {
        this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
      }, e.prototype.rotate = function (t, e) {
        var i = this.getFlatCoordinates();if (i) {
          var n = this.getStride();!function (t, e, i, n, o, r, s) {
            for (var a = s || [], h = Math.cos(o), l = Math.sin(o), u = r[0], c = r[1], p = 0, d = e; d < i; d += n) {
              var f = t[d] - u,
                  _ = t[d + 1] - c;a[p++] = u + f * h - _ * l, a[p++] = c + f * l + _ * h;for (var g = d + 2; g < d + n; ++g) a[p++] = t[g];
            }s && a.length != p && (a.length = p);
          }(i, 0, i.length, n, t, e, i), this.changed();
        }
      }, e.prototype.scale = function (t, e, i) {
        var n = e;void 0 === n && (n = t);var o = i;o || (o = Ve(this.getExtent()));var r = this.getFlatCoordinates();if (r) {
          var s = this.getStride();!function (t, e, i, n, o, r, s, a) {
            for (var h = a || [], l = s[0], u = s[1], c = 0, p = e; p < i; p += n) {
              var d = t[p] - l,
                  f = t[p + 1] - u;h[c++] = l + o * d, h[c++] = u + r * f;for (var _ = p + 2; _ < p + n; ++_) h[c++] = t[_];
            }a && h.length != c && (h.length = c);
          }(r, 0, r.length, s, t, n, o, r), this.changed();
        }
      }, e.prototype.translate = function (t, e) {
        var i = this.getFlatCoordinates();if (i) {
          var n = this.getStride();!function (t, e, i, n, o, r, s) {
            for (var a = s || [], h = 0, l = e; l < i; l += n) {
              a[h++] = t[l] + o, a[h++] = t[l + 1] + r;for (var u = l + 2; u < l + n; ++u) a[h++] = t[u];
            }s && a.length != h && (a.length = h);
          }(i, 0, i.length, n, t, e, i), this.changed();
        }
      }, e;
    }(qi);function Qi(t) {
      var e;return t == oi.XY ? e = 2 : t == oi.XYZ || t == oi.XYM ? e = 3 : t == oi.XYZM && (e = 4), e;
    }Ji.prototype.containsXY = C;var $i = Ji;function tn(t, e, i, n) {
      for (var o = 0, r = t[i - n], s = t[i - n + 1]; e < i; e += n) {
        var a = t[e],
            h = t[e + 1];o += s * a - r * h, r = a, s = h;
      }return o / 2;
    }function en(t, e, i, n) {
      for (var o = 0, r = 0, s = i.length; r < s; ++r) {
        var a = i[r];o += tn(t, e, a, n), e = a;
      }return o;
    }function nn(t, e, i, n, o, r, s) {
      var a,
          h = t[e],
          l = t[e + 1],
          u = t[i] - h,
          c = t[i + 1] - l;if (0 === u && 0 === c) a = e;else {
        var p = ((o - h) * u + (r - l) * c) / (u * u + c * c);if (p > 1) a = i;else {
          if (p > 0) {
            for (var d = 0; d < n; ++d) s[d] = le(t[e + d], t[i + d], p);return void (s.length = n);
          }a = e;
        }
      }for (var f = 0; f < n; ++f) s[f] = t[a + f];s.length = n;
    }function on(t, e, i, n, o) {
      var r = t[e],
          s = t[e + 1];for (e += n; e < i; e += n) {
        var a = t[e],
            h = t[e + 1],
            l = se(r, s, a, h);l > o && (o = l), r = a, s = h;
      }return o;
    }function rn(t, e, i, n, o) {
      for (var r = 0, s = i.length; r < s; ++r) {
        var a = i[r];o = on(t, e, a, n, o), e = a;
      }return o;
    }function sn(t, e, i, n, o, r, s, a, h, l, u) {
      if (e == i) return l;var c, p;if (0 === o) {
        if ((p = se(s, a, t[e], t[e + 1])) < l) {
          for (c = 0; c < n; ++c) h[c] = t[e + c];return h.length = n, p;
        }return l;
      }for (var d = u || [NaN, NaN], f = e + n; f < i;) if (nn(t, f - n, f, n, s, a, d), (p = se(s, a, d[0], d[1])) < l) {
        for (l = p, c = 0; c < n; ++c) h[c] = d[c];h.length = n, f += n;
      } else f += n * Math.max((Math.sqrt(p) - Math.sqrt(l)) / o | 0, 1);if (r && (nn(t, i - n, e, n, s, a, d), (p = se(s, a, d[0], d[1])) < l)) {
        for (l = p, c = 0; c < n; ++c) h[c] = d[c];h.length = n;
      }return l;
    }function an(t, e, i, n, o, r, s, a, h, l, u) {
      for (var c = u || [NaN, NaN], p = 0, d = i.length; p < d; ++p) {
        var f = i[p];l = sn(t, e, f, n, o, r, s, a, h, l, c), e = f;
      }return l;
    }function hn(t, e, i, n) {
      for (var o = 0, r = i.length; o < r; ++o) for (var s = i[o], a = 0; a < n; ++a) t[e++] = s[a];return e;
    }function ln(t, e, i, n, o) {
      for (var r = o || [], s = 0, a = 0, h = i.length; a < h; ++a) {
        var l = hn(t, e, i[a], n);r[s++] = l, e = l;
      }return r.length = s, r;
    }function un(t, e, i, n, o) {
      for (var r = void 0 !== o ? o : [], s = 0, a = e; a < i; a += n) r[s++] = t.slice(a, a + n);return r.length = s, r;
    }function cn(t, e, i, n, o) {
      for (var r = void 0 !== o ? o : [], s = 0, a = 0, h = i.length; a < h; ++a) {
        var l = i[a];r[s++] = un(t, e, l, n, r[s]), e = l;
      }return r.length = s, r;
    }function pn(t, e, i, n, o) {
      for (var r = void 0 !== o ? o : [], s = 0, a = 0, h = i.length; a < h; ++a) {
        var l = i[a];r[s++] = cn(t, e, l, n, r[s]), e = l[l.length - 1];
      }return r.length = s, r;
    }function dn(t, e, i, n, o, r, s) {
      var a = (i - e) / n;if (a < 3) {
        for (; e < i; e += n) r[s++] = t[e], r[s++] = t[e + 1];return s;
      }var h = new Array(a);h[0] = 1, h[a - 1] = 1;for (var l = [e, i - n], u = 0; l.length > 0;) {
        for (var c = l.pop(), p = l.pop(), d = 0, f = t[p], _ = t[p + 1], g = t[c], y = t[c + 1], v = p + n; v < c; v += n) {
          var m = re(t[v], t[v + 1], f, _, g, y);m > d && (u = v, d = m);
        }d > o && (h[(u - e) / n] = 1, p + n < u && l.push(p, u), u + n < c && l.push(u, c));
      }for (var E = 0; E < a; ++E) h[E] && (r[s++] = t[e + E * n], r[s++] = t[e + E * n + 1]);return s;
    }function fn(t, e, i, n, o, r, s, a) {
      for (var h = 0, l = i.length; h < l; ++h) {
        var u = i[h];s = dn(t, e, u, n, o, r, s), a.push(s), e = u;
      }return s;
    }function _n(t, e) {
      return e * Math.round(t / e);
    }function gn(t, e, i, n, o, r, s) {
      if (e == i) return s;var a,
          h,
          l = _n(t[e], o),
          u = _n(t[e + 1], o);e += n, r[s++] = l, r[s++] = u;do {
        if (a = _n(t[e], o), h = _n(t[e + 1], o), (e += n) == i) return r[s++] = a, r[s++] = h, s;
      } while (a == l && h == u);for (; e < i;) {
        var c = _n(t[e], o),
            p = _n(t[e + 1], o);if (e += n, c != a || p != h) {
          var d = a - l,
              f = h - u,
              _ = c - l,
              g = p - u;d * g == f * _ && (d < 0 && _ < d || d == _ || d > 0 && _ > d) && (f < 0 && g < f || f == g || f > 0 && g > f) ? (a = c, h = p) : (r[s++] = a, r[s++] = h, l = a, u = h, a = c, h = p);
        }
      }return r[s++] = a, r[s++] = h, s;
    }function yn(t, e, i, n, o, r, s, a) {
      for (var h = 0, l = i.length; h < l; ++h) {
        var u = i[h];s = gn(t, e, u, n, o, r, s), a.push(s), e = u;
      }return s;
    }var vn = function (t) {
      function e(e, i) {
        t.call(this), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, void 0 === i || Array.isArray(e[0]) ? this.setCoordinates(e, i) : this.setFlatCoordinates(i, e);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {
        return new e(this.flatCoordinates.slice(), this.layout);
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        return n < Le(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(on(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), sn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !0, t, e, i, n));
      }, e.prototype.getArea = function () {
        return tn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
      }, e.prototype.getCoordinates = function () {
        return un(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
      }, e.prototype.getSimplifiedGeometryInternal = function (t) {
        var i = [];return i.length = dn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, i, 0), new e(i, oi.XY);
      }, e.prototype.getType = function () {
        return ni.LINEAR_RING;
      }, e.prototype.intersectsExtent = function (t) {}, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = hn(this.flatCoordinates, 0, t, this.stride), this.changed();
      }, e;
    }($i),
        mn = function (t) {
      function e(e, i) {
        t.call(this), this.setCoordinates(e, i);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {
        return new e(this.flatCoordinates.slice(), this.layout);
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        var o = this.flatCoordinates,
            r = se(t, e, o[0], o[1]);if (r < n) {
          for (var s = this.stride, a = 0; a < s; ++a) i[a] = o[a];return i.length = s, r;
        }return n;
      }, e.prototype.getCoordinates = function () {
        return this.flatCoordinates ? this.flatCoordinates.slice() : [];
      }, e.prototype.computeExtent = function (t) {
        return function (t, e) {
          var i = t[0],
              n = t[1];return De(i, n, i, n, e);
        }(this.flatCoordinates, t);
      }, e.prototype.getType = function () {
        return ni.POINT;
      }, e.prototype.intersectsExtent = function (t) {
        return Fe(t, this.flatCoordinates[0], this.flatCoordinates[1]);
      }, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = function (t, e, i, n) {
          for (var o = 0, r = i.length; o < r; ++o) t[e++] = i[o];return e;
        }(this.flatCoordinates, 0, t, this.stride), this.changed();
      }, e;
    }($i);function En(t, e, i, n, o) {
      return !function (t, e, i) {
        var n;return (n = e.call(i, Ue(t))) ? n : (n = e.call(i, Be(t))) ? n : (n = e.call(i, Qe(t))) ? n : (n = e.call(i, Je(t))) || !1;
      }(o, function (o) {
        return !xn(t, e, i, n, o[0], o[1]);
      });
    }function xn(t, e, i, n, o, r) {
      for (var s = 0, a = t[i - n], h = t[i - n + 1]; e < i; e += n) {
        var l = t[e],
            u = t[e + 1];h <= r ? u > r && (l - a) * (r - h) - (o - a) * (u - h) > 0 && s++ : u <= r && (l - a) * (r - h) - (o - a) * (u - h) < 0 && s--, a = l, h = u;
      }return 0 !== s;
    }function Cn(t, e, i, n, o, r) {
      if (0 === i.length) return !1;if (!xn(t, e, i[0], n, o, r)) return !1;for (var s = 1, a = i.length; s < a; ++s) if (xn(t, i[s - 1], i[s], n, o, r)) return !1;return !0;
    }function Tn(t, e, i, n, o, r, s) {
      for (var a, h, l, u, c, p, d, f = o[r + 1], _ = [], g = 0, y = i.length; g < y; ++g) {
        var v = i[g];for (u = t[v - n], p = t[v - n + 1], a = e; a < v; a += n) c = t[a], d = t[a + 1], (f <= p && d <= f || p <= f && f <= d) && (l = (f - p) / (d - p) * (c - u) + u, _.push(l)), u = c, p = d;
      }var m = NaN,
          E = -1 / 0;for (_.sort(bt), u = _[0], a = 1, h = _.length; a < h; ++a) {
        c = _[a];var x = Math.abs(c - u);x > E && Cn(t, e, i, n, l = (u + c) / 2, f) && (m = l, E = x), u = c;
      }return isNaN(m) && (m = o[r]), s ? (s.push(m, f, E), s) : [m, f, E];
    }function Sn(t, e, i, n, o, r) {
      for (var s, a = [t[e], t[e + 1]], h = []; e + n < i; e += n) {
        if (h[0] = t[e + n], h[1] = t[e + n + 1], s = o.call(r, a, h)) return s;a[0] = h[0], a[1] = h[1];
      }return !1;
    }function Rn(t, e, i, n, o) {
      var r = We([1 / 0, 1 / 0, -1 / 0, -1 / 0], t, e, i, n);return !!ti(o, r) && (!!Pe(o, r) || r[0] >= o[0] && r[2] <= o[2] || r[1] >= o[1] && r[3] <= o[3] || Sn(t, e, i, n, function (t, e) {
        return function (t, e, i) {
          var n = !1,
              o = be(t, e),
              r = be(t, i);if (o === Re.INTERSECTING || r === Re.INTERSECTING) n = !0;else {
            var s,
                a,
                h = t[0],
                l = t[1],
                u = t[2],
                c = t[3],
                p = e[0],
                d = e[1],
                f = i[0],
                _ = i[1],
                g = (_ - d) / (f - p);r & Re.ABOVE && !(o & Re.ABOVE) && (n = (s = f - (_ - c) / g) >= h && s <= u), n || !(r & Re.RIGHT) || o & Re.RIGHT || (n = (a = _ - (f - u) * g) >= l && a <= c), n || !(r & Re.BELOW) || o & Re.BELOW || (n = (s = f - (_ - l) / g) >= h && s <= u), n || !(r & Re.LEFT) || o & Re.LEFT || (n = (a = _ - (f - h) * g) >= l && a <= c);
          }return n;
        }(o, t, e);
      }));
    }function In(t, e, i, n, o) {
      if (!function (t, e, i, n, o) {
        return !!(Rn(t, e, i, n, o) || xn(t, e, i, n, o[0], o[1]) || xn(t, e, i, n, o[0], o[3]) || xn(t, e, i, n, o[2], o[1]) || xn(t, e, i, n, o[2], o[3]));
      }(t, e, i[0], n, o)) return !1;if (1 === i.length) return !0;for (var r = 1, s = i.length; r < s; ++r) if (En(t, i[r - 1], i[r], n, o)) return !1;return !0;
    }function wn(t, e, i, n) {
      for (; e < i - n;) {
        for (var o = 0; o < n; ++o) {
          var r = t[e + o];t[e + o] = t[i - n + o], t[i - n + o] = r;
        }e += n, i -= n;
      }
    }function On(t, e, i, n) {
      for (var o = 0, r = t[i - n], s = t[i - n + 1]; e < i; e += n) {
        var a = t[e],
            h = t[e + 1];o += (a - r) * (h + s), r = a, s = h;
      }return o > 0;
    }function Ln(t, e, i, n, o) {
      for (var r = void 0 !== o && o, s = 0, a = i.length; s < a; ++s) {
        var h = i[s],
            l = On(t, e, h, n);if (0 === s) {
          if (r && l || !r && !l) return !1;
        } else if (r && !l || !r && l) return !1;e = h;
      }return !0;
    }function Mn(t, e, i, n, o) {
      for (var r = void 0 !== o && o, s = 0, a = i.length; s < a; ++s) {
        var h = i[s],
            l = On(t, e, h, n);(0 === s ? r && l || !r && !l : r && !l || !r && l) && wn(t, e, h, n), e = h;
      }return e;
    }function Pn(t, e, i, n, o) {
      for (var r = 0, s = i.length; r < s; ++r) e = Mn(t, e, i[r], n, o);return e;
    }var Fn = function (t) {
      function e(e, i, n) {
        t.call(this), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, void 0 !== i && n ? (this.setFlatCoordinates(i, e), this.ends_ = n) : this.setCoordinates(e, i);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.appendLinearRing = function (t) {
        this.flatCoordinates ? kt(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
      }, e.prototype.clone = function () {
        return new e(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        return n < Le(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(rn(this.flatCoordinates, 0, this.ends_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), an(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !0, t, e, i, n));
      }, e.prototype.containsXY = function (t, e) {
        return Cn(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, e);
      }, e.prototype.getArea = function () {
        return en(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
      }, e.prototype.getCoordinates = function (t) {
        var e;return void 0 !== t ? Mn(e = this.getOrientedFlatCoordinates().slice(), 0, this.ends_, this.stride, t) : e = this.flatCoordinates, cn(e, 0, this.ends_, this.stride);
      }, e.prototype.getEnds = function () {
        return this.ends_;
      }, e.prototype.getFlatInteriorPoint = function () {
        if (this.flatInteriorPointRevision_ != this.getRevision()) {
          var t = Ve(this.getExtent());this.flatInteriorPoint_ = Tn(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, 0), this.flatInteriorPointRevision_ = this.getRevision();
        }return this.flatInteriorPoint_;
      }, e.prototype.getInteriorPoint = function () {
        return new mn(this.getFlatInteriorPoint(), oi.XYM);
      }, e.prototype.getLinearRingCount = function () {
        return this.ends_.length;
      }, e.prototype.getLinearRing = function (t) {
        return t < 0 || this.ends_.length <= t ? null : new vn(this.flatCoordinates.slice(0 === t ? 0 : this.ends_[t - 1], this.ends_[t]), this.layout);
      }, e.prototype.getLinearRings = function () {
        for (var t = this.layout, e = this.flatCoordinates, i = this.ends_, n = [], o = 0, r = 0, s = i.length; r < s; ++r) {
          var a = i[r],
              h = new vn(e.slice(o, a), t);n.push(h), o = a;
        }return n;
      }, e.prototype.getOrientedFlatCoordinates = function () {
        if (this.orientedRevision_ != this.getRevision()) {
          var t = this.flatCoordinates;Ln(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Mn(this.orientedFlatCoordinates_, 0, this.ends_, this.stride)), this.orientedRevision_ = this.getRevision();
        }return this.orientedFlatCoordinates_;
      }, e.prototype.getSimplifiedGeometryInternal = function (t) {
        var i = [],
            n = [];return i.length = yn(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(t), i, 0, n), new e(i, oi.XY, n);
      }, e.prototype.getType = function () {
        return ni.POLYGON;
      }, e.prototype.intersectsExtent = function (t) {
        return In(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t);
      }, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);var i = ln(this.flatCoordinates, 0, t, this.stride, this.ends_);this.flatCoordinates.length = 0 === i.length ? 0 : i[i.length - 1], this.changed();
      }, e;
    }($i),
        bn = Fn;function An(t) {
      var e = t[0],
          i = t[1],
          n = t[2],
          o = t[3],
          r = [e, i, e, o, n, o, n, i, e, i];return new Fn(r, oi.XY, [r.length]);
    }var Dn = 0;function Gn(t) {
      return !(t.sourceCenter && t.targetCenter && !function (t, e) {
        for (var i = !0, n = t.length - 1; n >= 0; --n) if (t[n] != e[n]) {
          i = !1;break;
        }return i;
      }(t.sourceCenter, t.targetCenter)) && t.sourceResolution === t.targetResolution && t.sourceRotation === t.targetRotation;
    }var kn = function (t) {
      function e(e) {
        t.call(this);var i = l({}, e);this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.updateAnimations_ = this.updateAnimations_.bind(this), this.projection_ = Ai(i.projection, "EPSG:3857"), this.applyOptions_(i);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.applyOptions_ = function (t) {
        var e = {};e[fe] = void 0 !== t.center ? t.center : null;var i = function (t) {
          var e,
              i,
              n,
              o = void 0 !== t.minZoom ? t.minZoom : Dn,
              r = void 0 !== t.maxZoom ? t.maxZoom : 28,
              s = void 0 !== t.zoomFactor ? t.zoomFactor : 2;if (void 0 !== t.resolutions) {
            var a = t.resolutions;i = a[o], n = void 0 !== a[r] ? a[r] : a[a.length - 1], e = function (t) {
              return function (e, i, n) {
                if (void 0 !== e) {
                  var o = Dt(t, e, n);o = ne(o + i, 0, t.length - 1);var r = Math.floor(o);if (o != r && r < t.length - 1) {
                    var s = t[r] / t[r + 1];return t[r] / Math.pow(s, o - r);
                  }return t[r];
                }
              };
            }(a);
          } else {
            var h = Ai(t.projection, "EPSG:3857"),
                l = h.getExtent(),
                u = l ? Math.max($e(l), He(l)) : 360 * li[ui.DEGREES] / h.getMetersPerUnit(),
                c = u / ie / Math.pow(2, Dn),
                p = c / Math.pow(2, 28 - Dn);void 0 !== (i = t.maxResolution) ? o = 0 : i = c / Math.pow(s, o), void 0 === (n = t.minResolution) && (n = void 0 !== t.maxZoom ? void 0 !== t.maxResolution ? i / Math.pow(s, r) : c / Math.pow(s, r) : p), r = o + Math.floor(Math.log(i / n) / Math.log(s)), n = i / Math.pow(s, r - o), e = function (t, e, i) {
              return function (n, o, r) {
                if (void 0 !== n) {
                  var s = -r / 2 + .5,
                      a = Math.floor(Math.log(e / n) / Math.log(t) + s),
                      h = Math.max(a + o, 0);return void 0 !== i && (h = Math.min(h, i)), e / Math.pow(t, h);
                }
              };
            }(s, i, r - o);
          }return { constraint: e, maxResolution: i, minResolution: n, minZoom: o, zoomFactor: s };
        }(t);this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = t.resolutions, this.minZoom_ = i.minZoom;var n = function (t) {
          return void 0 !== t.extent ? function (t) {
            return function (e) {
              return e ? [ne(e[0], t[0], t[2]), ne(e[1], t[1], t[3])] : void 0;
            };
          }(t.extent) : ue;
        }(t),
            o = i.constraint,
            r = function (t) {
          if (void 0 === t.enableRotation || t.enableRotation) {
            var e = t.constrainRotation;return void 0 === e || !0 === e ? function (t) {
              var e = t || ae(5);return function (t, i) {
                return void 0 !== t ? Math.abs(t + i) <= e ? 0 : t + i : void 0;
              };
            }() : !1 === e ? pe : "number" == typeof e ? function (t) {
              var e = 2 * Math.PI / t;return function (t, i) {
                return void 0 !== t ? t = Math.floor((t + i) / e + .5) * e : void 0;
              };
            }(e) : pe;
          }return ce;
        }(t);this.constraints_ = { center: n, resolution: o, rotation: r }, void 0 !== t.resolution ? e[_e] = t.resolution : void 0 !== t.zoom && (e[_e] = this.constrainResolution(this.maxResolution_, t.zoom - this.minZoom_), this.resolutions_ && (e[_e] = ne(Number(this.getResolution() || e[_e]), this.minResolution_, this.maxResolution_))), e[ge] = void 0 !== t.rotation ? t.rotation : 0, this.setProperties(e), this.options_ = t;
      }, e.prototype.getUpdatedOptions_ = function (t) {
        var e = l({}, this.options_);return void 0 !== e.resolution ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenter(), e.rotation = this.getRotation(), l({}, e, t);
      }, e.prototype.animate = function (t) {
        var e,
            i = arguments,
            n = arguments.length;if (n > 1 && "function" == typeof arguments[n - 1] && (e = arguments[n - 1], --n), !this.isDef()) {
          var o = arguments[n - 1];return o.center && this.setCenter(o.center), void 0 !== o.zoom && this.setZoom(o.zoom), void 0 !== o.rotation && this.setRotation(o.rotation), void (e && setTimeout(function () {
            e(!0);
          }, 0));
        }for (var r = Date.now(), s = this.getCenter().slice(), a = this.getResolution(), h = this.getRotation(), l = [], u = 0; u < n; ++u) {
          var c = i[u],
              p = { start: r, complete: !1, anchor: c.anchor, duration: void 0 !== c.duration ? c.duration : 1e3, easing: c.easing || Ce };if (c.center && (p.sourceCenter = s, p.targetCenter = c.center, s = p.targetCenter), void 0 !== c.zoom ? (p.sourceResolution = a, p.targetResolution = this.constrainResolution(this.maxResolution_, c.zoom - this.minZoom_, 0), a = p.targetResolution) : c.resolution && (p.sourceResolution = a, p.targetResolution = c.resolution, a = p.targetResolution), void 0 !== c.rotation) {
            p.sourceRotation = h;var d = he(c.rotation - h + Math.PI, 2 * Math.PI) - Math.PI;p.targetRotation = h + d, h = p.targetRotation;
          }p.callback = e, Gn(p) ? p.complete = !0 : r += p.duration, l.push(p);
        }this.animations_.push(l), this.setHint(de.ANIMATING, 1), this.updateAnimations_();
      }, e.prototype.getAnimating = function () {
        return this.hints_[de.ANIMATING] > 0;
      }, e.prototype.getInteracting = function () {
        return this.hints_[de.INTERACTING] > 0;
      }, e.prototype.cancelAnimations = function () {
        this.setHint(de.ANIMATING, -this.hints_[de.ANIMATING]);for (var t = 0, e = this.animations_.length; t < e; ++t) {
          var i = this.animations_[t];i[0].callback && i[0].callback(!1);
        }this.animations_.length = 0;
      }, e.prototype.updateAnimations_ = function () {
        if (void 0 !== this.updateAnimationKey_ && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), this.getAnimating()) {
          for (var t = Date.now(), e = !1, i = this.animations_.length - 1; i >= 0; --i) {
            for (var n = this.animations_[i], o = !0, r = 0, s = n.length; r < s; ++r) {
              var a = n[r];if (!a.complete) {
                var h = t - a.start,
                    l = a.duration > 0 ? h / a.duration : 1;l >= 1 ? (a.complete = !0, l = 1) : o = !1;var u = a.easing(l);if (a.sourceCenter) {
                  var c = a.sourceCenter[0],
                      p = a.sourceCenter[1],
                      d = c + u * (a.targetCenter[0] - c),
                      f = p + u * (a.targetCenter[1] - p);this.set(fe, [d, f]);
                }if (a.sourceResolution && a.targetResolution) {
                  var _ = 1 === u ? a.targetResolution : a.sourceResolution + u * (a.targetResolution - a.sourceResolution);a.anchor && this.set(fe, this.calculateCenterZoom(_, a.anchor)), this.set(_e, _);
                }if (void 0 !== a.sourceRotation && void 0 !== a.targetRotation) {
                  var g = 1 === u ? he(a.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : a.sourceRotation + u * (a.targetRotation - a.sourceRotation);a.anchor && this.set(fe, this.calculateCenterRotate(g, a.anchor)), this.set(ge, g);
                }if (e = !0, !a.complete) break;
              }
            }if (o) {
              this.animations_[i] = null, this.setHint(de.ANIMATING, -1);var y = n[0].callback;y && setTimeout(function () {
                y(!0);
              }, 0);
            }
          }this.animations_ = this.animations_.filter(Boolean), e && void 0 === this.updateAnimationKey_ && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_));
        }
      }, e.prototype.calculateCenterRotate = function (t, e) {
        var i,
            n = this.getCenter();return void 0 !== n && (ve(i = [n[0] - e[0], n[1] - e[1]], t - this.getRotation()), ye(i, e)), i;
      }, e.prototype.calculateCenterZoom = function (t, e) {
        var i,
            n = this.getCenter(),
            o = this.getResolution();void 0 !== n && void 0 !== o && (i = [e[0] - t * (e[0] - n[0]) / o, e[1] - t * (e[1] - n[1]) / o]);return i;
      }, e.prototype.getSizeFromViewport_ = function () {
        var t = [100, 100],
            e = '.ol-viewport[data-view="' + o(this) + '"]',
            i = document.querySelector(e);if (i) {
          var n = getComputedStyle(i);t[0] = parseInt(n.width, 10), t[1] = parseInt(n.height, 10);
        }return t;
      }, e.prototype.constrainCenter = function (t) {
        return this.constraints_.center(t);
      }, e.prototype.constrainResolution = function (t, e, i) {
        var n = e || 0,
            o = i || 0;return this.constraints_.resolution(t, n, o);
      }, e.prototype.constrainRotation = function (t, e) {
        var i = e || 0;return this.constraints_.rotation(t, i);
      }, e.prototype.getCenter = function () {
        return this.get(fe);
      }, e.prototype.getConstraints = function () {
        return this.constraints_;
      }, e.prototype.getHints = function (t) {
        return void 0 !== t ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice();
      }, e.prototype.calculateExtent = function (t) {
        var e = t || this.getSizeFromViewport_(),
            i = this.getCenter();Qt(i, 1);var n = this.getResolution();Qt(void 0 !== n, 2);var o = this.getRotation();return Qt(void 0 !== o, 3), Ze(i, n, o, e);
      }, e.prototype.getMaxResolution = function () {
        return this.maxResolution_;
      }, e.prototype.getMinResolution = function () {
        return this.minResolution_;
      }, e.prototype.getMaxZoom = function () {
        return this.getZoomForResolution(this.minResolution_);
      }, e.prototype.setMaxZoom = function (t) {
        this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
      }, e.prototype.getMinZoom = function () {
        return this.getZoomForResolution(this.maxResolution_);
      }, e.prototype.setMinZoom = function (t) {
        this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
      }, e.prototype.getProjection = function () {
        return this.projection_;
      }, e.prototype.getResolution = function () {
        return this.get(_e);
      }, e.prototype.getResolutions = function () {
        return this.resolutions_;
      }, e.prototype.getResolutionForExtent = function (t, e) {
        var i = e || this.getSizeFromViewport_(),
            n = $e(t) / i[0],
            o = He(t) / i[1];return Math.max(n, o);
      }, e.prototype.getResolutionForValueFunction = function (t) {
        var e = t || 2,
            i = this.maxResolution_,
            n = this.minResolution_,
            o = Math.log(i / n) / Math.log(e);return function (t) {
          return i / Math.pow(e, t * o);
        };
      }, e.prototype.getRotation = function () {
        return this.get(ge);
      }, e.prototype.getValueForResolutionFunction = function (t) {
        var e = t || 2,
            i = this.maxResolution_,
            n = this.minResolution_,
            o = Math.log(i / n) / Math.log(e);return function (t) {
          return Math.log(i / t) / Math.log(e) / o;
        };
      }, e.prototype.getState = function () {
        var t = this.getCenter(),
            e = this.getProjection(),
            i = this.getResolution(),
            n = this.getRotation();return { center: t.slice(), projection: void 0 !== e ? e : null, resolution: i, rotation: n, zoom: this.getZoom() };
      }, e.prototype.getZoom = function () {
        var t,
            e = this.getResolution();return void 0 !== e && (t = this.getZoomForResolution(e)), t;
      }, e.prototype.getZoomForResolution = function (t) {
        var e,
            i,
            n = this.minZoom_ || 0;if (this.resolutions_) {
          var o = Dt(this.resolutions_, t, 1);n = o, e = this.resolutions_[o], i = o == this.resolutions_.length - 1 ? 2 : e / this.resolutions_[o + 1];
        } else e = this.maxResolution_, i = this.zoomFactor_;return n + Math.log(e / t) / Math.log(i);
      }, e.prototype.getResolutionForZoom = function (t) {
        return this.constrainResolution(this.maxResolution_, t - this.minZoom_, 0);
      }, e.prototype.fit = function (t, e) {
        var i,
            n = e || {},
            o = n.size;o || (o = this.getSizeFromViewport_()), t instanceof $i ? t.getType() === ni.CIRCLE ? (i = An(t = t.getExtent())).rotate(this.getRotation(), Ve(t)) : i = t : (Qt(Array.isArray(t), 24), Qt(!ei(t), 25), i = An(t));var r,
            s = void 0 !== n.padding ? n.padding : [0, 0, 0, 0],
            a = void 0 === n.constrainResolution || n.constrainResolution,
            h = void 0 !== n.nearest && n.nearest;r = void 0 !== n.minResolution ? n.minResolution : void 0 !== n.maxZoom ? this.constrainResolution(this.maxResolution_, n.maxZoom - this.minZoom_, 0) : 0;for (var l = i.getFlatCoordinates(), u = this.getRotation(), c = Math.cos(-u), p = Math.sin(-u), d = 1 / 0, f = 1 / 0, _ = -1 / 0, g = -1 / 0, y = i.getStride(), v = 0, m = l.length; v < m; v += y) {
          var E = l[v] * c - l[v + 1] * p,
              x = l[v] * p + l[v + 1] * c;d = Math.min(d, E), f = Math.min(f, x), _ = Math.max(_, E), g = Math.max(g, x);
        }var C = this.getResolutionForExtent([d, f, _, g], [o[0] - s[1] - s[3], o[1] - s[0] - s[2]]);if (C = isNaN(C) ? r : Math.max(C, r), a) {
          var S = this.constrainResolution(C, 0, 0);!h && S < C && (S = this.constrainResolution(S, -1, 0)), C = S;
        }p = -p;var R = (d + _) / 2,
            I = (f + g) / 2,
            w = [(R += (s[1] - s[3]) / 2 * C) * c - (I += (s[0] - s[2]) / 2 * C) * p, I * c + R * p],
            O = n.callback ? n.callback : T;void 0 !== n.duration ? this.animate({ resolution: C, center: w, duration: n.duration, easing: n.easing }, O) : (this.setResolution(C), this.setCenter(w), setTimeout(O.bind(void 0, !0), 0));
      }, e.prototype.centerOn = function (t, e, i) {
        var n = this.getRotation(),
            o = Math.cos(-n),
            r = Math.sin(-n),
            s = t[0] * o - t[1] * r,
            a = t[1] * o + t[0] * r,
            h = this.getResolution(),
            l = (s += (e[0] / 2 - i[0]) * h) * o - (a += (i[1] - e[1] / 2) * h) * (r = -r),
            u = a * o + s * r;this.setCenter([l, u]);
      }, e.prototype.isDef = function () {
        return !!this.getCenter() && void 0 !== this.getResolution();
      }, e.prototype.rotate = function (t, e) {
        if (void 0 !== e) {
          var i = this.calculateCenterRotate(t, e);this.setCenter(i);
        }this.setRotation(t);
      }, e.prototype.setCenter = function (t) {
        this.set(fe, t), this.getAnimating() && this.cancelAnimations();
      }, e.prototype.setHint = function (t, e) {
        return this.hints_[t] += e, this.changed(), this.hints_[t];
      }, e.prototype.setResolution = function (t) {
        this.set(_e, t), this.getAnimating() && this.cancelAnimations();
      }, e.prototype.setRotation = function (t) {
        this.set(ge, t), this.getAnimating() && this.cancelAnimations();
      }, e.prototype.setZoom = function (t) {
        this.setResolution(this.getResolutionForZoom(t));
      }, e;
    }(D);function Nn(t, e) {
      var i = document.createElement("CANVAS");return t && (i.width = t), e && (i.height = e), i.getContext("2d");
    }function Yn(t, e) {
      var i = e.parentNode;i && i.replaceChild(t, e);
    }function Xn(t) {
      return t && t.parentNode ? t.parentNode.removeChild(t) : null;
    }var jn = { OPACITY: "opacity", VISIBLE: "visible", EXTENT: "extent", Z_INDEX: "zIndex", MAX_RESOLUTION: "maxResolution", MIN_RESOLUTION: "minResolution", SOURCE: "source" },
        Wn = function (t) {
      function e(e) {
        t.call(this);var i = l({}, e);i[jn.OPACITY] = void 0 !== e.opacity ? e.opacity : 1, i[jn.VISIBLE] = void 0 === e.visible || e.visible, i[jn.Z_INDEX] = void 0 !== e.zIndex ? e.zIndex : 0, i[jn.MAX_RESOLUTION] = void 0 !== e.maxResolution ? e.maxResolution : 1 / 0, i[jn.MIN_RESOLUTION] = void 0 !== e.minResolution ? e.minResolution : 0, this.setProperties(i), this.state_ = { layer: this, managed: !0 }, this.type;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getType = function () {
        return this.type;
      }, e.prototype.getLayerState = function () {
        return this.state_.opacity = ne(this.getOpacity(), 0, 1), this.state_.sourceState = this.getSourceState(), this.state_.visible = this.getVisible(), this.state_.extent = this.getExtent(), this.state_.zIndex = this.getZIndex(), this.state_.maxResolution = this.getMaxResolution(), this.state_.minResolution = Math.max(this.getMinResolution(), 0), this.state_;
      }, e.prototype.getLayersArray = function (t) {}, e.prototype.getLayerStatesArray = function (t) {}, e.prototype.getExtent = function () {
        return this.get(jn.EXTENT);
      }, e.prototype.getMaxResolution = function () {
        return this.get(jn.MAX_RESOLUTION);
      }, e.prototype.getMinResolution = function () {
        return this.get(jn.MIN_RESOLUTION);
      }, e.prototype.getOpacity = function () {
        return this.get(jn.OPACITY);
      }, e.prototype.getSourceState = function () {}, e.prototype.getVisible = function () {
        return this.get(jn.VISIBLE);
      }, e.prototype.getZIndex = function () {
        return this.get(jn.Z_INDEX);
      }, e.prototype.setExtent = function (t) {
        this.set(jn.EXTENT, t);
      }, e.prototype.setMaxResolution = function (t) {
        this.set(jn.MAX_RESOLUTION, t);
      }, e.prototype.setMinResolution = function (t) {
        this.set(jn.MIN_RESOLUTION, t);
      }, e.prototype.setOpacity = function (t) {
        this.set(jn.OPACITY, t);
      }, e.prototype.setVisible = function (t) {
        this.set(jn.VISIBLE, t);
      }, e.prototype.setZIndex = function (t) {
        this.set(jn.Z_INDEX, t);
      }, e;
    }(D),
        Kn = { UNDEFINED: "undefined", LOADING: "loading", READY: "ready", ERROR: "error" },
        zn = { LAYERS: "layers" },
        Un = function (t) {
      function e(e) {
        var i = e || {},
            n = l({}, i);delete n.layers;var o = i.layers;t.call(this, n), this.layersListenerKeys_ = [], this.listenerKeys_ = {}, y(this, A(zn.LAYERS), this.handleLayersChanged_, this), o ? Array.isArray(o) ? o = new N(o.slice(), { unique: !0 }) : (Qt(o instanceof N, 43), o = o) : o = new N(void 0, { unique: !0 }), this.setLayers(o);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.handleLayerChange_ = function () {
        this.changed();
      }, e.prototype.handleLayersChanged_ = function () {
        this.layersListenerKeys_.forEach(E), this.layersListenerKeys_.length = 0;var t = this.getLayers();for (var e in this.layersListenerKeys_.push(y(t, a.ADD, this.handleLayersAdd_, this), y(t, a.REMOVE, this.handleLayersRemove_, this)), this.listenerKeys_) this.listenerKeys_[e].forEach(E);u(this.listenerKeys_);for (var i = t.getArray(), n = 0, r = i.length; n < r; n++) {
          var s = i[n];this.listenerKeys_[o(s).toString()] = [y(s, h, this.handleLayerChange_, this), y(s, M.CHANGE, this.handleLayerChange_, this)];
        }this.changed();
      }, e.prototype.handleLayersAdd_ = function (t) {
        var e = t.element,
            i = o(e).toString();this.listenerKeys_[i] = [y(e, h, this.handleLayerChange_, this), y(e, M.CHANGE, this.handleLayerChange_, this)], this.changed();
      }, e.prototype.handleLayersRemove_ = function (t) {
        var e = o(t.element).toString();this.listenerKeys_[e].forEach(E), delete this.listenerKeys_[e], this.changed();
      }, e.prototype.getLayers = function () {
        return this.get(zn.LAYERS);
      }, e.prototype.setLayers = function (t) {
        this.set(zn.LAYERS, t);
      }, e.prototype.getLayersArray = function (t) {
        var e = void 0 !== t ? t : [];return this.getLayers().forEach(function (t) {
          t.getLayersArray(e);
        }), e;
      }, e.prototype.getLayerStatesArray = function (t) {
        var e = void 0 !== t ? t : [],
            i = e.length;this.getLayers().forEach(function (t) {
          t.getLayerStatesArray(e);
        });for (var n = this.getLayerState(), o = i, r = e.length; o < r; o++) {
          var s = e[o];s.opacity *= n.opacity, s.visible = s.visible && n.visible, s.maxResolution = Math.min(s.maxResolution, n.maxResolution), s.minResolution = Math.max(s.minResolution, n.minResolution), void 0 !== n.extent && (void 0 !== s.extent ? s.extent = qe(s.extent, n.extent) : s.extent = n.extent);
        }return e;
      }, e.prototype.getSourceState = function () {
        return Kn.READY;
      }, e;
    }(Wn);function Bn(t, e) {
      return Array.isArray(t) ? t : (void 0 === e ? e = [t, t] : e[0] = e[1] = t, e);
    }var Vn = function (t) {
      function e(e) {
        t.call(this);var i = function (t) {
          var e = null;void 0 !== t.keyboardEventTarget && (e = "string" == typeof t.keyboardEventTarget ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget);var i,
              n,
              o,
              r = {},
              s = t.layers instanceof Un ? t.layers : new Un({ layers: t.layers });r[qt.LAYERGROUP] = s, r[qt.TARGET] = t.target, r[qt.VIEW] = void 0 !== t.view ? t.view : new kn(), void 0 !== t.controls && (Array.isArray(t.controls) ? i = new N(t.controls.slice()) : (Qt(t.controls instanceof N, 47), i = t.controls));void 0 !== t.interactions && (Array.isArray(t.interactions) ? n = new N(t.interactions.slice()) : (Qt(t.interactions instanceof N, 48), n = t.interactions));void 0 !== t.overlays ? Array.isArray(t.overlays) ? o = new N(t.overlays.slice()) : (Qt(t.overlays instanceof N, 49), o = t.overlays) : o = new N();return { controls: i, interactions: n, keyboardEventTarget: e, overlays: o, values: r };
        }(e);this.maxTilesLoading_ = void 0 !== e.maxTilesLoading ? e.maxTilesLoading : 16, this.loadTilesWhileAnimating_ = void 0 !== e.loadTilesWhileAnimating && e.loadTilesWhileAnimating, this.loadTilesWhileInteracting_ = void 0 !== e.loadTilesWhileInteracting && e.loadTilesWhileInteracting, this.pixelRatio_ = void 0 !== e.pixelRatio ? e.pixelRatio : B, this.animationDelayKey_, this.animationDelay_ = function () {
          this.animationDelayKey_ = void 0, this.renderFrame_.call(this, Date.now());
        }.bind(this), this.coordinateToPixelTransform_ = [1, 0, 0, 1, 0, 0], this.pixelToCoordinateTransform_ = [1, 0, 0, 1, 0, 0], this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("DIV"), this.viewport_.className = "ol-viewport" + (Z ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.viewport_.style.msTouchAction = "none", this.viewport_.style.touchAction = "none", this.overlayContainer_ = document.createElement("DIV"), this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("DIV"), this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";for (var n = [M.CLICK, M.DBLCLICK, M.MOUSEDOWN, M.TOUCHSTART, M.MSPOINTERDOWN, J.POINTERDOWN, M.MOUSEWHEEL, M.WHEEL], o = 0, r = n.length; o < r; ++o) y(this.overlayContainerStopEvent_, n[o], w);for (var s in this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = new Bt(this, e.moveTolerance), J) y(this.mapBrowserEventHandler_, J[s], this.handleMapBrowserEvent, this);this.keyboardEventTarget_ = i.keyboardEventTarget, this.keyHandlerKeys_ = null, y(this.viewport_, M.CONTEXTMENU, this.handleBrowserEvent, this), y(this.viewport_, M.WHEEL, this.handleBrowserEvent, this), y(this.viewport_, M.MOUSEWHEEL, this.handleBrowserEvent, this), this.controls = i.controls || new N(), this.interactions = i.interactions || new N(), this.overlays_ = i.overlays, this.overlayIdIndex_ = {}, this.renderer_ = this.createRenderer(), this.handleResize_, this.focus_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new te(this.getTilePriority.bind(this), this.handleTileChange_.bind(this)), this.skippedFeatureUids_ = {}, y(this, A(qt.LAYERGROUP), this.handleLayerGroupChanged_, this), y(this, A(qt.VIEW), this.handleViewChanged_, this), y(this, A(qt.SIZE), this.handleSizeChanged_, this), y(this, A(qt.TARGET), this.handleTargetChanged_, this), this.setProperties(i.values), this.controls.forEach(function (t) {
          t.setMap(this);
        }.bind(this)), y(this.controls, a.ADD, function (t) {
          t.element.setMap(this);
        }, this), y(this.controls, a.REMOVE, function (t) {
          t.element.setMap(null);
        }, this), this.interactions.forEach(function (t) {
          t.setMap(this);
        }.bind(this)), y(this.interactions, a.ADD, function (t) {
          t.element.setMap(this);
        }, this), y(this.interactions, a.REMOVE, function (t) {
          t.element.setMap(null);
        }, this), this.overlays_.forEach(this.addOverlayInternal_.bind(this)), y(this.overlays_, a.ADD, function (t) {
          this.addOverlayInternal_(t.element);
        }, this), y(this.overlays_, a.REMOVE, function (t) {
          var e = t.element.getId();void 0 !== e && delete this.overlayIdIndex_[e.toString()], t.element.setMap(null);
        }, this);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createRenderer = function () {
        throw new Error("Use a map type that has a createRenderer method");
      }, e.prototype.addControl = function (t) {
        this.getControls().push(t);
      }, e.prototype.addInteraction = function (t) {
        this.getInteractions().push(t);
      }, e.prototype.addLayer = function (t) {
        this.getLayerGroup().getLayers().push(t);
      }, e.prototype.addOverlay = function (t) {
        this.getOverlays().push(t);
      }, e.prototype.addOverlayInternal_ = function (t) {
        var e = t.getId();void 0 !== e && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this);
      }, e.prototype.disposeInternal = function () {
        this.mapBrowserEventHandler_.dispose(), m(this.viewport_, M.CONTEXTMENU, this.handleBrowserEvent, this), m(this.viewport_, M.WHEEL, this.handleBrowserEvent, this), m(this.viewport_, M.MOUSEWHEEL, this.handleBrowserEvent, this), void 0 !== this.handleResize_ && (removeEventListener(M.RESIZE, this.handleResize_, !1), this.handleResize_ = void 0), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0), this.setTarget(null), t.prototype.disposeInternal.call(this);
      }, e.prototype.forEachFeatureAtPixel = function (t, e, i) {
        if (this.frameState_) {
          var n = this.getCoordinateFromPixel(t),
              o = void 0 !== (i = void 0 !== i ? i : {}).hitTolerance ? i.hitTolerance * this.frameState_.pixelRatio : 0,
              r = void 0 !== i.layerFilter ? i.layerFilter : x;return this.renderer_.forEachFeatureAtCoordinate(n, this.frameState_, o, e, null, r, null);
        }
      }, e.prototype.getFeaturesAtPixel = function (t, e) {
        var i = null;return this.forEachFeatureAtPixel(t, function (t) {
          i || (i = []), i.push(t);
        }, e), i;
      }, e.prototype.forEachLayerAtPixel = function (t, e, i) {
        if (this.frameState_) {
          var n = i || {},
              o = void 0 !== n.hitTolerance ? i.hitTolerance * this.frameState_.pixelRatio : 0,
              r = n.layerFilter || x;return this.renderer_.forEachLayerAtPixel(t, this.frameState_, o, e, null, r, null);
        }
      }, e.prototype.hasFeatureAtPixel = function (t, e) {
        if (!this.frameState_) return !1;var i = this.getCoordinateFromPixel(t),
            n = void 0 !== (e = void 0 !== e ? e : {}).layerFilter ? e.layerFilter : x,
            o = void 0 !== e.hitTolerance ? e.hitTolerance * this.frameState_.pixelRatio : 0;return this.renderer_.hasFeatureAtCoordinate(i, this.frameState_, o, n, null);
      }, e.prototype.getEventCoordinate = function (t) {
        return this.getCoordinateFromPixel(this.getEventPixel(t));
      }, e.prototype.getEventPixel = function (t) {
        var e = this.viewport_.getBoundingClientRect(),
            i = t.changedTouches ? t.changedTouches[0] : t;return [i.clientX - e.left, i.clientY - e.top];
      }, e.prototype.getTarget = function () {
        return this.get(qt.TARGET);
      }, e.prototype.getTargetElement = function () {
        var t = this.getTarget();return void 0 !== t ? "string" == typeof t ? document.getElementById(t) : t : null;
      }, e.prototype.getCoordinateFromPixel = function (t) {
        var e = this.frameState_;return e ? zi(e.pixelToCoordinateTransform, t.slice()) : null;
      }, e.prototype.getControls = function () {
        return this.controls;
      }, e.prototype.getOverlays = function () {
        return this.overlays_;
      }, e.prototype.getOverlayById = function (t) {
        var e = this.overlayIdIndex_[t.toString()];return void 0 !== e ? e : null;
      }, e.prototype.getInteractions = function () {
        return this.interactions;
      }, e.prototype.getLayerGroup = function () {
        return this.get(qt.LAYERGROUP);
      }, e.prototype.getLayers = function () {
        return this.getLayerGroup().getLayers();
      }, e.prototype.getPixelFromCoordinate = function (t) {
        var e = this.frameState_;return e ? zi(e.coordinateToPixelTransform, t.slice(0, 2)) : null;
      }, e.prototype.getRenderer = function () {
        return this.renderer_;
      }, e.prototype.getSize = function () {
        return this.get(qt.SIZE);
      }, e.prototype.getView = function () {
        return this.get(qt.VIEW);
      }, e.prototype.getViewport = function () {
        return this.viewport_;
      }, e.prototype.getOverlayContainer = function () {
        return this.overlayContainer_;
      }, e.prototype.getOverlayContainerStopEvent = function () {
        return this.overlayContainerStopEvent_;
      }, e.prototype.getTilePriority = function (t, e, i, n) {
        var o = this.frameState_;if (!(o && e in o.wantedTiles)) return 1 / 0;if (!o.wantedTiles[e][t.getKey()]) return 1 / 0;var r = i[0] - o.focus[0],
            s = i[1] - o.focus[1];return 65536 * Math.log(n) + Math.sqrt(r * r + s * s) / n;
      }, e.prototype.handleBrowserEvent = function (t, e) {
        var i = e || t.type,
            n = new X(i, this, t);this.handleMapBrowserEvent(n);
      }, e.prototype.handleMapBrowserEvent = function (t) {
        if (this.frameState_) {
          this.focus_ = t.coordinate, t.frameState = this.frameState_;var e = this.getInteractions().getArray();if (!1 !== this.dispatchEvent(t)) for (var i = e.length - 1; i >= 0; i--) {
            var n = e[i];if (n.getActive()) if (!n.handleEvent(t)) break;
          }
        }
      }, e.prototype.handlePostRender = function () {
        var t = this.frameState_,
            e = this.tileQueue_;if (!e.isEmpty()) {
          var i = this.maxTilesLoading_,
              n = i;if (t) {
            var o = t.viewHints;o[de.ANIMATING] && (i = this.loadTilesWhileAnimating_ ? 8 : 0, n = 2), o[de.INTERACTING] && (i = this.loadTilesWhileInteracting_ ? 8 : 0, n = 2);
          }e.getTilesLoading() < i && (e.reprioritize(), e.loadMoreTiles(i, n));
        }for (var r = this.postRenderFunctions_, s = 0, a = r.length; s < a; ++s) r[s](this, t);r.length = 0;
      }, e.prototype.handleSizeChanged_ = function () {
        this.render();
      }, e.prototype.handleTargetChanged_ = function () {
        var t;if (this.getTarget() && (t = this.getTargetElement()), this.keyHandlerKeys_) {
          for (var e = 0, i = this.keyHandlerKeys_.length; e < i; ++e) E(this.keyHandlerKeys_[e]);this.keyHandlerKeys_ = null;
        }if (t) {
          t.appendChild(this.viewport_);var n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;this.keyHandlerKeys_ = [y(n, M.KEYDOWN, this.handleBrowserEvent, this), y(n, M.KEYPRESS, this.handleBrowserEvent, this)], this.handleResize_ || (this.handleResize_ = this.updateSize.bind(this), addEventListener(M.RESIZE, this.handleResize_, !1));
        } else this.renderer_.removeLayerRenderers(), Xn(this.viewport_), void 0 !== this.handleResize_ && (removeEventListener(M.RESIZE, this.handleResize_, !1), this.handleResize_ = void 0);this.updateSize();
      }, e.prototype.handleTileChange_ = function () {
        this.render();
      }, e.prototype.handleViewPropertyChanged_ = function () {
        this.render();
      }, e.prototype.handleViewChanged_ = function () {
        this.viewPropertyListenerKey_ && (E(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (E(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);var t = this.getView();t && (this.viewport_.setAttribute("data-view", o(t)), this.viewPropertyListenerKey_ = y(t, h, this.handleViewPropertyChanged_, this), this.viewChangeListenerKey_ = y(t, M.CHANGE, this.handleViewPropertyChanged_, this)), this.render();
      }, e.prototype.handleLayerGroupChanged_ = function () {
        this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(E), this.layerGroupPropertyListenerKeys_ = null);var t = this.getLayerGroup();t && (this.layerGroupPropertyListenerKeys_ = [y(t, h, this.render, this), y(t, M.CHANGE, this.render, this)]), this.render();
      }, e.prototype.isRendered = function () {
        return !!this.frameState_;
      }, e.prototype.renderSync = function () {
        this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
      }, e.prototype.render = function () {
        void 0 === this.animationDelayKey_ && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
      }, e.prototype.removeControl = function (t) {
        return this.getControls().remove(t);
      }, e.prototype.removeInteraction = function (t) {
        return this.getInteractions().remove(t);
      }, e.prototype.removeLayer = function (t) {
        return this.getLayerGroup().getLayers().remove(t);
      }, e.prototype.removeOverlay = function (t) {
        return this.getOverlays().remove(t);
      }, e.prototype.renderFrame_ = function (t) {
        var e,
            i = this.getSize(),
            n = this.getView(),
            r = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
            s = this.frameState_,
            a = null;if (void 0 !== i && function (t) {
          return t[0] > 0 && t[1] > 0;
        }(i) && n && n.isDef()) {
          for (var h = n.getHints(this.frameState_ ? this.frameState_.viewHints : void 0), l = this.getLayerGroup().getLayerStatesArray(), u = {}, c = 0, p = l.length; c < p; ++c) u[o(l[c].layer)] = l[c];e = n.getState();var d = this.focus_;if (!d) {
            d = e.center;var f = e.resolution / this.pixelRatio_;d[0] = Math.round(d[0] / f) * f, d[1] = Math.round(d[1] / f) * f;
          }a = { animate: !1, coordinateToPixelTransform: this.coordinateToPixelTransform_, extent: r, focus: d, index: this.frameIndex_++, layerStates: u, layerStatesArray: l, pixelRatio: this.pixelRatio_, pixelToCoordinateTransform: this.pixelToCoordinateTransform_, postRenderFunctions: [], size: i, skippedFeatureUids: this.skippedFeatureUids_, tileQueue: this.tileQueue_, time: t, usedTiles: {}, viewState: e, viewHints: h, wantedTiles: {} };
        }if (a && (a.extent = Ze(e.center, e.resolution, e.rotation, a.size, r)), this.frameState_ = a, this.renderer_.renderFrame(a), a) {
          if (a.animate && this.render(), Array.prototype.push.apply(this.postRenderFunctions_, a.postRenderFunctions), s) (!this.previousExtent_ || !ei(this.previousExtent_) && !Ne(a.extent, this.previousExtent_)) && (this.dispatchEvent(new Y(Zt, this, s)), this.previousExtent_ = Ge(this.previousExtent_));this.previousExtent_ && !a.viewHints[de.ANIMATING] && !a.viewHints[de.INTERACTING] && !Ne(a.extent, this.previousExtent_) && (this.dispatchEvent(new Y(Ht, this, a)), Oe(a.extent, this.previousExtent_));
        }this.dispatchEvent(new Y(Vt, this, a)), setTimeout(this.handlePostRender.bind(this), 0);
      }, e.prototype.setLayerGroup = function (t) {
        this.set(qt.LAYERGROUP, t);
      }, e.prototype.setSize = function (t) {
        this.set(qt.SIZE, t);
      }, e.prototype.setTarget = function (t) {
        this.set(qt.TARGET, t);
      }, e.prototype.setView = function (t) {
        this.set(qt.VIEW, t);
      }, e.prototype.skipFeature = function (t) {
        var e = o(t).toString();this.skippedFeatureUids_[e] = !0, this.render();
      }, e.prototype.updateSize = function () {
        var t = this.getTargetElement();if (t) {
          var e = getComputedStyle(t);this.setSize([t.offsetWidth - parseFloat(e.borderLeftWidth) - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight) - parseFloat(e.borderRightWidth), t.offsetHeight - parseFloat(e.borderTopWidth) - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom) - parseFloat(e.borderBottomWidth)]);
        } else this.setSize(void 0);
      }, e.prototype.unskipFeature = function (t) {
        var e = o(t).toString();delete this.skippedFeatureUids_[e], this.render();
      }, e;
    }(D),
        Zn = function (t) {
      function e(e) {
        t.call(this), this.element = e.element ? e.element : null, this.target_ = null, this.map_ = null, this.listenerKeys = [], this.render = e.render ? e.render : T, e.target && this.setTarget(e.target);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        Xn(this.element), t.prototype.disposeInternal.call(this);
      }, e.prototype.getMap = function () {
        return this.map_;
      }, e.prototype.setMap = function (t) {
        this.map_ && Xn(this.element);for (var e = 0, i = this.listenerKeys.length; e < i; ++e) E(this.listenerKeys[e]);(this.listenerKeys.length = 0, this.map_ = t, this.map_) && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== T && this.listenerKeys.push(y(t, Vt, this.render, this)), t.render());
      }, e.prototype.setTarget = function (t) {
        this.target_ = "string" == typeof t ? document.getElementById(t) : t;
      }, e;
    }(D),
        Hn = "ol-hidden",
        qn = "ol-unselectable",
        Jn = "ol-control",
        Qn = "ol-collapsed",
        $n = function () {
      var t,
          e = {};return function (i) {
        if (t || (t = document.createElement("div").style), !(i in e)) {
          t.font = i;var n = t.fontFamily;if (t.font = "", !n) return null;e[i] = n.split(/,\s?/);
        }return e[i];
      };
    }(),
        to = "postcompose",
        eo = "precompose",
        io = "render";function no(t, e) {
      return t.visible && e >= t.minResolution && e < t.maxResolution;
    }var oo = function (t) {
      function e(e) {
        var i = l({}, e);delete i.source, t.call(this, i), this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, e.map && this.setMap(e.map), y(this, A(jn.SOURCE), this.handleSourcePropertyChange_, this);var n = e.source ? e.source : null;this.setSource(n);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getLayersArray = function (t) {
        var e = t || [];return e.push(this), e;
      }, e.prototype.getLayerStatesArray = function (t) {
        var e = t || [];return e.push(this.getLayerState()), e;
      }, e.prototype.getSource = function () {
        return this.get(jn.SOURCE) || null;
      }, e.prototype.getSourceState = function () {
        var t = this.getSource();return t ? t.getState() : Kn.UNDEFINED;
      }, e.prototype.handleSourceChange_ = function () {
        this.changed();
      }, e.prototype.handleSourcePropertyChange_ = function () {
        this.sourceChangeKey_ && (E(this.sourceChangeKey_), this.sourceChangeKey_ = null);var t = this.getSource();t && (this.sourceChangeKey_ = y(t, M.CHANGE, this.handleSourceChange_, this)), this.changed();
      }, e.prototype.setMap = function (t) {
        this.mapPrecomposeKey_ && (E(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (E(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = y(t, eo, function (t) {
          var e = this.getLayerState();e.managed = !1, e.zIndex = 1 / 0, t.frameState.layerStatesArray.push(e), t.frameState.layerStates[o(this)] = e;
        }, this), this.mapRenderKey_ = y(this, M.CHANGE, t.render, t), this.changed());
      }, e.prototype.setSource = function (t) {
        this.set(jn.SOURCE, t);
      }, e;
    }(Wn);function ro(t) {
      this.updateElement_(t.frameState);
    }var so = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { element: document.createElement("div"), render: i.render || ro, target: i.target }), this.ulElement_ = document.createElement("UL"), this.collapsed_ = void 0 === i.collapsed || i.collapsed, this.collapsible_ = void 0 === i.collapsible || i.collapsible, this.collapsible_ || (this.collapsed_ = !1);var n = void 0 !== i.className ? i.className : "ol-attribution",
            o = void 0 !== i.tipLabel ? i.tipLabel : "Attributions",
            r = void 0 !== i.collapseLabel ? i.collapseLabel : "»";"string" == typeof r ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = r) : this.collapseLabel_ = r;var s = void 0 !== i.label ? i.label : "i";"string" == typeof s ? (this.label_ = document.createElement("span"), this.label_.textContent = s) : this.label_ = s;var a = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_,
            h = document.createElement("button");h.setAttribute("type", "button"), h.title = o, h.appendChild(a), y(h, M.CLICK, this.handleClick_, this);var l = n + " " + qn + " " + Jn + (this.collapsed_ && this.collapsible_ ? " " + Qn : "") + (this.collapsible_ ? "" : " ol-uncollapsible"),
            u = this.element;u.className = l, u.appendChild(this.ulElement_), u.appendChild(h), this.renderedAttributions_ = [], this.renderedVisible_ = !0;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getSourceAttributions_ = function (t) {
        for (var e = {}, i = [], n = t.layerStatesArray, o = t.viewState.resolution, r = 0, s = n.length; r < s; ++r) {
          var a = n[r];if (no(a, o)) {
            var h = a.layer.getSource();if (h) {
              var l = h.getAttributions();if (l) {
                var u = l(t);if (u) if (Array.isArray(u)) for (var c = 0, p = u.length; c < p; ++c) u[c] in e || (i.push(u[c]), e[u[c]] = !0);else u in e || (i.push(u), e[u] = !0);
              }
            }
          }
        }return i;
      }, e.prototype.updateElement_ = function (t) {
        if (t) {
          var e = this.getSourceAttributions_(t),
              i = e.length > 0;if (this.renderedVisible_ != i && (this.element.style.display = i ? "" : "none", this.renderedVisible_ = i), !Nt(e, this.renderedAttributions_)) {
            !function (t) {
              for (; t.lastChild;) t.removeChild(t.lastChild);
            }(this.ulElement_);for (var n = 0, o = e.length; n < o; ++n) {
              var r = document.createElement("LI");r.innerHTML = e[n], this.ulElement_.appendChild(r);
            }this.renderedAttributions_ = e;
          }
        } else this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
      }, e.prototype.handleClick_ = function (t) {
        t.preventDefault(), this.handleToggle_();
      }, e.prototype.handleToggle_ = function () {
        this.element.classList.toggle(Qn), this.collapsed_ ? Yn(this.collapseLabel_, this.label_) : Yn(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_;
      }, e.prototype.getCollapsible = function () {
        return this.collapsible_;
      }, e.prototype.setCollapsible = function (t) {
        this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), !t && this.collapsed_ && this.handleToggle_());
      }, e.prototype.setCollapsed = function (t) {
        this.collapsible_ && this.collapsed_ !== t && this.handleToggle_();
      }, e.prototype.getCollapsed = function () {
        return this.collapsed_;
      }, e;
    }(Zn);function ao(t) {
      var e = t.frameState;if (e) {
        var i = e.viewState.rotation;if (i != this.rotation_) {
          var n = "rotate(" + i + "rad)";if (this.autoHide_) {
            var o = this.element.classList.contains(Hn);o || 0 !== i ? o && 0 !== i && this.element.classList.remove(Hn) : this.element.classList.add(Hn);
          }this.label_.style.msTransform = n, this.label_.style.webkitTransform = n, this.label_.style.transform = n;
        }this.rotation_ = i;
      }
    }var ho = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { element: document.createElement("div"), render: i.render || ao, target: i.target });var n = void 0 !== i.className ? i.className : "ol-rotate",
            o = void 0 !== i.label ? i.label : "⇧";this.label_ = null, "string" == typeof o ? (this.label_ = document.createElement("span"), this.label_.className = "ol-compass", this.label_.textContent = o) : (this.label_ = o, this.label_.classList.add("ol-compass"));var r = i.tipLabel ? i.tipLabel : "Reset rotation",
            s = document.createElement("button");s.className = n + "-reset", s.setAttribute("type", "button"), s.title = r, s.appendChild(this.label_), y(s, M.CLICK, this.handleClick_, this);var a = n + " " + qn + " " + Jn,
            h = this.element;h.className = a, h.appendChild(s), this.callResetNorth_ = i.resetNorth ? i.resetNorth : void 0, this.duration_ = void 0 !== i.duration ? i.duration : 250, this.autoHide_ = void 0 === i.autoHide || i.autoHide, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(Hn);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.handleClick_ = function (t) {
        t.preventDefault(), void 0 !== this.callResetNorth_ ? this.callResetNorth_() : this.resetNorth_();
      }, e.prototype.resetNorth_ = function () {
        var t = this.getMap().getView();t && void 0 !== t.getRotation() && (this.duration_ > 0 ? t.animate({ rotation: 0, duration: this.duration_, easing: xe }) : t.setRotation(0));
      }, e;
    }(Zn),
        lo = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { element: document.createElement("div"), target: i.target });var n = void 0 !== i.className ? i.className : "ol-zoom",
            o = void 0 !== i.delta ? i.delta : 1,
            r = void 0 !== i.zoomInLabel ? i.zoomInLabel : "+",
            s = void 0 !== i.zoomOutLabel ? i.zoomOutLabel : "−",
            a = void 0 !== i.zoomInTipLabel ? i.zoomInTipLabel : "Zoom in",
            h = void 0 !== i.zoomOutTipLabel ? i.zoomOutTipLabel : "Zoom out",
            l = document.createElement("button");l.className = n + "-in", l.setAttribute("type", "button"), l.title = a, l.appendChild("string" == typeof r ? document.createTextNode(r) : r), y(l, M.CLICK, this.handleClick_.bind(this, o));var u = document.createElement("button");u.className = n + "-out", u.setAttribute("type", "button"), u.title = h, u.appendChild("string" == typeof s ? document.createTextNode(s) : s), y(u, M.CLICK, this.handleClick_.bind(this, -o));var c = n + " " + qn + " " + Jn,
            p = this.element;p.className = c, p.appendChild(l), p.appendChild(u), this.duration_ = void 0 !== i.duration ? i.duration : 250;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.handleClick_ = function (t, e) {
        e.preventDefault(), this.zoomByDelta_(t);
      }, e.prototype.zoomByDelta_ = function (t) {
        var e = this.getMap().getView();if (e) {
          var i = e.getResolution();if (i) {
            var n = e.constrainResolution(i, t);this.duration_ > 0 ? (e.getAnimating() && e.cancelAnimations(), e.animate({ resolution: n, duration: this.duration_, easing: xe })) : e.setResolution(n);
          }
        }
      }, e;
    }(Zn);var uo = function (t, e, i) {
      this.decay_ = t, this.minVelocity_ = e, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0;
    };uo.prototype.begin = function () {
      this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0;
    }, uo.prototype.update = function (t, e) {
      this.points_.push(t, e, Date.now());
    }, uo.prototype.end = function () {
      if (this.points_.length < 6) return !1;var t = Date.now() - this.delay_,
          e = this.points_.length - 3;if (this.points_[e + 2] < t) return !1;for (var i = e - 3; i > 0 && this.points_[i + 2] > t;) i -= 3;var n = this.points_[e + 2] - this.points_[i + 2];if (n < 1e3 / 60) return !1;var o = this.points_[e] - this.points_[i],
          r = this.points_[e + 1] - this.points_[i + 1];return this.angle_ = Math.atan2(r, o), this.initialVelocity_ = Math.sqrt(o * o + r * r) / n, this.initialVelocity_ > this.minVelocity_;
    }, uo.prototype.getDistance = function () {
      return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
    }, uo.prototype.getAngle = function () {
      return this.angle_;
    };var co = uo,
        po = "active";function fo(t, e, i, n) {
      _o(t, e = t.constrainRotation(e, 0), i, n);
    }function _o(t, e, i, n) {
      if (void 0 !== e) {
        var o = t.getRotation(),
            r = t.getCenter();void 0 !== o && r && n > 0 ? t.animate({ rotation: e, anchor: i, duration: n, easing: xe }) : t.rotate(e, i);
      }
    }function go(t, e, i, n) {
      var o = t.getResolution(),
          r = t.constrainResolution(o, e, 0);if (void 0 !== r) {
        var s = t.getResolutions();r = ne(r, t.getMinResolution() || s[s.length - 1], t.getMaxResolution() || s[0]);
      }if (i && void 0 !== r && r !== o) {
        var a = t.getCenter(),
            h = t.calculateCenterZoom(r, i);h = t.constrainCenter(h), i = [(r * a[0] - o * h[0]) / (r - o), (r * a[1] - o * h[1]) / (r - o)];
      }yo(t, r, i, n);
    }function yo(t, e, i, n) {
      if (e) {
        var o = t.getResolution(),
            r = t.getCenter();if (void 0 !== o && r && e !== o && n) t.animate({ resolution: e, anchor: i, duration: n, easing: xe });else {
          if (i) {
            var s = t.calculateCenterZoom(e, i);t.setCenter(s);
          }t.setResolution(e);
        }
      }
    }var vo = function (t) {
      function e(e) {
        t.call(this), this.map_ = null, this.setActive(!0), this.handleEvent = e.handleEvent;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getActive = function () {
        return this.get(po);
      }, e.prototype.getMap = function () {
        return this.map_;
      }, e.prototype.setActive = function (t) {
        this.set(po, t);
      }, e.prototype.setMap = function (t) {
        this.map_ = t;
      }, e;
    }(D);function mo(t) {
      var e = !1,
          i = t.originalEvent;if (t.type == J.DBLCLICK) {
        var n = t.map,
            o = t.coordinate,
            r = i.shiftKey ? -this.delta_ : this.delta_;go(n.getView(), r, o, this.duration_), t.preventDefault(), e = !0;
      }return !e;
    }var Eo = function (t) {
      function e(e) {
        t.call(this, { handleEvent: mo });var i = e || {};this.delta_ = i.delta ? i.delta : 1, this.duration_ = void 0 !== i.duration ? i.duration : 250;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(vo),
        xo = function (t) {
      var e = t.originalEvent;return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
    },
        Co = x,
        To = function (t) {
      var e = t.originalEvent;return 0 == e.button && !(z && U && e.ctrlKey);
    },
        So = function (t) {
      var e = t.originalEvent;return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
    },
        Ro = function (t) {
      var e = t.originalEvent;return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
    },
        Io = function (t) {
      var e = t.originalEvent.target.tagName;return "INPUT" !== e && "SELECT" !== e && "TEXTAREA" !== e;
    },
        wo = function (t) {
      return Qt(t.pointerEvent, 56), "mouse" == t.pointerEvent.pointerType;
    },
        Oo = T,
        Lo = C,
        Mo = C,
        Po = T;function Fo(t) {
      for (var e = t.length, i = 0, n = 0, o = 0; o < e; o++) i += t[o].clientX, n += t[o].clientY;return [i / e, n / e];
    }function bo(t) {
      if (!(t instanceof Q)) return !0;var e = !1;if (this.updateTrackedPointers_(t), this.handlingDownUpSequence) {
        if (t.type == J.POINTERDRAG) this.handleDragEvent_(t);else if (t.type == J.POINTERUP) {
          var i = this.handleUpEvent_(t);this.handlingDownUpSequence = i && this.targetPointers.length > 0;
        }
      } else if (t.type == J.POINTERDOWN) {
        var n = this.handleDownEvent_(t);this.handlingDownUpSequence = n, e = this.stopDown(n);
      } else t.type == J.POINTERMOVE && this.handleMoveEvent_(t);return !e;
    }var Ao = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { handleEvent: i.handleEvent || bo }), this.handleDownEvent_ = i.handleDownEvent ? i.handleDownEvent : Mo, this.handleDragEvent_ = i.handleDragEvent ? i.handleDragEvent : Oo, this.handleMoveEvent_ = i.handleMoveEvent ? i.handleMoveEvent : Po, this.handleUpEvent_ = i.handleUpEvent ? i.handleUpEvent : Lo, this.handlingDownUpSequence = !1, this.stopDown = i.stopDown ? i.stopDown : Do, this.trackedPointers_ = {}, this.targetPointers = [];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.updateTrackedPointers_ = function (t) {
        if (function (t) {
          var e = t.type;return e === J.POINTERDOWN || e === J.POINTERDRAG || e === J.POINTERUP;
        }(t)) {
          var e = t.pointerEvent,
              i = e.pointerId.toString();t.type == J.POINTERUP ? delete this.trackedPointers_[i] : t.type == J.POINTERDOWN ? this.trackedPointers_[i] = e : i in this.trackedPointers_ && (this.trackedPointers_[i] = e), this.targetPointers = c(this.trackedPointers_);
        }
      }, e;
    }(vo);function Do(t) {
      return t;
    }function Go(t) {
      var e = this.targetPointers,
          i = Fo(e);if (e.length == this.lastPointersCount_) {
        if (this.kinetic_ && this.kinetic_.update(i[0], i[1]), this.lastCentroid) {
          var n = this.lastCentroid[0] - i[0],
              o = i[1] - this.lastCentroid[1],
              r = t.map.getView(),
              s = [n, o];me(s, r.getResolution()), ve(s, r.getRotation()), ye(s, r.getCenter()), s = r.constrainCenter(s), r.setCenter(s);
        }
      } else this.kinetic_ && this.kinetic_.begin();this.lastCentroid = i, this.lastPointersCount_ = e.length;
    }function ko(t) {
      var e = t.map,
          i = e.getView();if (0 === this.targetPointers.length) {
        if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
          var n = this.kinetic_.getDistance(),
              o = this.kinetic_.getAngle(),
              r = i.getCenter(),
              s = e.getPixelFromCoordinate(r),
              a = e.getCoordinateFromPixel([s[0] - n * Math.cos(o), s[1] - n * Math.sin(o)]);i.animate({ center: i.constrainCenter(a), duration: 500, easing: xe });
        }return i.setHint(de.INTERACTING, -1), !1;
      }return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0;
    }function No(t) {
      if (this.targetPointers.length > 0 && this.condition_(t)) {
        var e = t.map.getView();return this.lastCentroid = null, this.handlingDownUpSequence || e.setHint(de.INTERACTING, 1), e.getAnimating() && e.setCenter(t.frameState.viewState.center), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
      }return !1;
    }var Yo = function (t) {
      function e(e) {
        t.call(this, { handleDownEvent: No, handleDragEvent: Go, handleUpEvent: ko, stopDown: C });var i = e || {};this.kinetic_ = i.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.condition_ = i.condition ? i.condition : So, this.noKinetic_ = !1;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Ao);function Xo(t) {
      if (wo(t)) {
        var e = t.map,
            i = e.getView();if (i.getConstraints().rotation !== ce) {
          var n = e.getSize(),
              o = t.pixel,
              r = Math.atan2(n[1] / 2 - o[1], o[0] - n[0] / 2);if (void 0 !== this.lastAngle_) {
            var s = r - this.lastAngle_;_o(i, i.getRotation() - s);
          }this.lastAngle_ = r;
        }
      }
    }function jo(t) {
      if (!wo(t)) return !0;var e = t.map.getView();return e.setHint(de.INTERACTING, -1), fo(e, e.getRotation(), void 0, this.duration_), !1;
    }function Wo(t) {
      return !!wo(t) && !(!To(t) || !this.condition_(t)) && (t.map.getView().setHint(de.INTERACTING, 1), this.lastAngle_ = void 0, !0);
    }var Ko = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { handleDownEvent: Wo, handleDragEvent: Xo, handleUpEvent: jo, stopDown: C }), this.condition_ = i.condition ? i.condition : xo, this.lastAngle_ = void 0, this.duration_ = void 0 !== i.duration ? i.duration : 250;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Ao),
        zo = function (t) {
      function e(e) {
        t.call(this), this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.className = "ol-box " + e, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        this.setMap(null);
      }, e.prototype.render_ = function () {
        var t = this.startPixel_,
            e = this.endPixel_,
            i = this.element_.style;i.left = Math.min(t[0], e[0]) + "px", i.top = Math.min(t[1], e[1]) + "px", i.width = Math.abs(e[0] - t[0]) + "px", i.height = Math.abs(e[1] - t[1]) + "px";
      }, e.prototype.setMap = function (t) {
        if (this.map_) {
          this.map_.getOverlayContainer().removeChild(this.element_);var e = this.element_.style;e.left = e.top = e.width = e.height = "inherit";
        }this.map_ = t, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
      }, e.prototype.setPixels = function (t, e) {
        this.startPixel_ = t, this.endPixel_ = e, this.createOrUpdateGeometry(), this.render_();
      }, e.prototype.createOrUpdateGeometry = function () {
        var t = this.startPixel_,
            e = this.endPixel_,
            i = [t, [t[0], e[1]], e, [e[0], t[1]]].map(this.map_.getCoordinateFromPixel, this.map_);i[4] = i[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([i]) : this.geometry_ = new bn([i]);
      }, e.prototype.getGeometry = function () {
        return this.geometry_;
      }, e;
    }(R),
        Uo = { BOXSTART: "boxstart", BOXDRAG: "boxdrag", BOXEND: "boxend" },
        Bo = function (t) {
      function e(e, i, n) {
        t.call(this, e), this.coordinate = i, this.mapBrowserEvent = n;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O);function Vo(t, e, i) {
      var n = i[0] - e[0],
          o = i[1] - e[1];return n * n + o * o >= this.minArea_;
    }function Zo(t) {
      wo(t) && (this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(new Bo(Uo.BOXDRAG, t.coordinate, t)));
    }function Ho(t) {
      return !wo(t) || (this.box_.setMap(null), this.boxEndCondition_(t, this.startPixel_, t.pixel) && (this.onBoxEnd_(t), this.dispatchEvent(new Bo(Uo.BOXEND, t.coordinate, t))), !1);
    }function qo(t) {
      return !!wo(t) && !(!To(t) || !this.condition_(t)) && (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(new Bo(Uo.BOXSTART, t.coordinate, t)), !0);
    }function Jo() {
      var t = this.getMap(),
          e = t.getView(),
          i = t.getSize(),
          n = this.getGeometry().getExtent();if (this.out_) {
        var o = e.calculateExtent(i),
            r = function (t, e) {
          return je(Ge(e), t);
        }([t.getPixelFromCoordinate(Ue(n)), t.getPixelFromCoordinate(Qe(n))]);!function (t, e) {
          var i = (t[2] - t[0]) / 2 * (e - 1),
              n = (t[3] - t[1]) / 2 * (e - 1);t[0] -= i, t[2] += i, t[1] -= n, t[3] += n;
        }(o, 1 / e.getResolutionForExtent(r, i)), n = o;
      }var s = e.constrainResolution(e.getResolutionForExtent(n, i)),
          a = Ve(n);a = e.constrainCenter(a), e.animate({ resolution: s, center: a, duration: this.duration_, easing: xe });
    }var Qo = function (t) {
      function e(e) {
        var i = e || {},
            n = i.condition ? i.condition : Ro;t.call(this, { condition: n, className: i.className || "ol-dragzoom", onBoxEnd: Jo }), this.duration_ = void 0 !== i.duration ? i.duration : 200, this.out_ = void 0 !== i.out && i.out;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(function (t) {
      function e(e) {
        t.call(this, { handleDownEvent: qo, handleDragEvent: Zo, handleUpEvent: Ho });var i = e || {};this.box_ = new zo(i.className || "ol-dragbox"), this.minArea_ = void 0 !== i.minArea ? i.minArea : 64, this.onBoxEnd_ = i.onBoxEnd ? i.onBoxEnd : T, this.startPixel_ = null, this.condition_ = i.condition ? i.condition : Co, this.boxEndCondition_ = i.boxEndCondition ? i.boxEndCondition : Vo;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getGeometry = function () {
        return this.box_.getGeometry();
      }, e;
    }(Ao)),
        $o = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };function tr(t) {
      var e = !1;if (t.type == M.KEYDOWN) {
        var i = t.originalEvent.keyCode;if (this.condition_(t) && (i == $o.DOWN || i == $o.LEFT || i == $o.RIGHT || i == $o.UP)) {
          var n = t.map.getView(),
              o = n.getResolution() * this.pixelDelta_,
              r = 0,
              s = 0;i == $o.DOWN ? s = -o : i == $o.LEFT ? r = -o : i == $o.RIGHT ? r = o : s = o;var a = [r, s];ve(a, n.getRotation()), function (t, e, i) {
            var n = t.getCenter();if (n) {
              var o = t.constrainCenter([n[0] + e[0], n[1] + e[1]]);i ? t.animate({ duration: i, easing: Te, center: o }) : t.setCenter(o);
            }
          }(n, a, this.duration_), t.preventDefault(), e = !0;
        }
      }return !e;
    }var er = function (t) {
      function e(e) {
        t.call(this, { handleEvent: tr });var i = e || {};this.defaultCondition_ = function (t) {
          return So(t) && Io(t);
        }, this.condition_ = void 0 !== i.condition ? i.condition : this.defaultCondition_, this.duration_ = void 0 !== i.duration ? i.duration : 100, this.pixelDelta_ = void 0 !== i.pixelDelta ? i.pixelDelta : 128;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(vo);function ir(t) {
      var e = !1;if (t.type == M.KEYDOWN || t.type == M.KEYPRESS) {
        var i = t.originalEvent.charCode;if (this.condition_(t) && (i == "+".charCodeAt(0) || i == "-".charCodeAt(0))) {
          var n = t.map,
              o = i == "+".charCodeAt(0) ? this.delta_ : -this.delta_;go(n.getView(), o, void 0, this.duration_), t.preventDefault(), e = !0;
        }
      }return !e;
    }var nr = function (t) {
      function e(e) {
        t.call(this, { handleEvent: ir });var i = e || {};this.condition_ = i.condition ? i.condition : Io, this.delta_ = i.delta ? i.delta : 1, this.duration_ = void 0 !== i.duration ? i.duration : 100;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(vo),
        or = { TRACKPAD: "trackpad", WHEEL: "wheel" };function rr(t) {
      if (!this.condition_(t)) return !0;var e = t.type;if (e !== M.WHEEL && e !== M.MOUSEWHEEL) return !0;t.preventDefault();var i,
          n = t.map,
          o = t.originalEvent;if (this.useAnchor_ && (this.lastAnchor_ = t.coordinate), t.type == M.WHEEL ? (i = o.deltaY, W && o.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (i /= B), o.deltaMode === WheelEvent.DOM_DELTA_LINE && (i *= 40)) : t.type == M.MOUSEWHEEL && (i = -o.wheelDeltaY, K && (i /= 3)), 0 === i) return !1;var r = Date.now();if (void 0 === this.startTime_ && (this.startTime_ = r), (!this.mode_ || r - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(i) < 4 ? or.TRACKPAD : or.WHEEL), this.mode_ === or.TRACKPAD) {
        var s = n.getView();this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : s.setHint(de.INTERACTING, 1), this.trackpadTimeoutId_ = setTimeout(this.decrementInteractingHint_.bind(this), this.trackpadEventGap_);var a = s.getResolution() * Math.pow(2, i / this.trackpadDeltaPerZoom_),
            h = s.getMinResolution(),
            l = s.getMaxResolution(),
            u = 0;if (a < h ? (a = Math.max(a, h / this.trackpadZoomBuffer_), u = 1) : a > l && (a = Math.min(a, l * this.trackpadZoomBuffer_), u = -1), this.lastAnchor_) {
          var c = s.calculateCenterZoom(a, this.lastAnchor_);s.setCenter(s.constrainCenter(c));
        }return s.setResolution(a), 0 === u && this.constrainResolution_ && s.animate({ resolution: s.constrainResolution(a, i > 0 ? -1 : 1), easing: xe, anchor: this.lastAnchor_, duration: this.duration_ }), u > 0 ? s.animate({ resolution: h, easing: xe, anchor: this.lastAnchor_, duration: 500 }) : u < 0 && s.animate({ resolution: l, easing: xe, anchor: this.lastAnchor_, duration: 500 }), this.startTime_ = r, !1;
      }this.delta_ += i;var p = Math.max(this.timeout_ - (r - this.startTime_), 0);return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, n), p), !1;
    }var sr = function (t) {
      function e(e) {
        t.call(this, { handleEvent: rr });var i = e || {};this.delta_ = 0, this.duration_ = void 0 !== i.duration ? i.duration : 250, this.timeout_ = void 0 !== i.timeout ? i.timeout : 80, this.useAnchor_ = void 0 === i.useAnchor || i.useAnchor, this.constrainResolution_ = i.constrainResolution || !1, this.condition_ = i.condition ? i.condition : Co, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_ = void 0, this.trackpadDeltaPerZoom_ = 300, this.trackpadZoomBuffer_ = 1.5;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.decrementInteractingHint_ = function () {
        this.trackpadTimeoutId_ = void 0, this.getMap().getView().setHint(de.INTERACTING, -1);
      }, e.prototype.handleWheelZoom_ = function (t) {
        var e = t.getView();e.getAnimating() && e.cancelAnimations();go(e, -ne(this.delta_, -1, 1), this.lastAnchor_, this.duration_), this.mode_ = void 0, this.delta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
      }, e.prototype.setMouseAnchor = function (t) {
        this.useAnchor_ = t, t || (this.lastAnchor_ = null);
      }, e;
    }(vo);function ar(t) {
      var e = 0,
          i = this.targetPointers[0],
          n = this.targetPointers[1],
          o = Math.atan2(n.clientY - i.clientY, n.clientX - i.clientX);if (void 0 !== this.lastAngle_) {
        var r = o - this.lastAngle_;this.rotationDelta_ += r, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), e = r;
      }this.lastAngle_ = o;var s = t.map,
          a = s.getView();if (a.getConstraints().rotation !== ce) {
        var h = s.getViewport().getBoundingClientRect(),
            l = Fo(this.targetPointers);if (l[0] -= h.left, l[1] -= h.top, this.anchor_ = s.getCoordinateFromPixel(l), this.rotating_) {
          var u = a.getRotation();s.render(), _o(a, u + e, this.anchor_);
        }
      }
    }function hr(t) {
      if (this.targetPointers.length < 2) {
        var e = t.map.getView();if (e.setHint(de.INTERACTING, -1), this.rotating_) fo(e, e.getRotation(), this.anchor_, this.duration_);return !1;
      }return !0;
    }function lr(t) {
      if (this.targetPointers.length >= 2) {
        var e = t.map;return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || e.getView().setHint(de.INTERACTING, 1), !0;
      }return !1;
    }var ur = function (t) {
      function e(e) {
        t.call(this, { handleDownEvent: lr, handleDragEvent: ar, handleUpEvent: hr, stopDown: C });var i = e || {};this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = void 0 !== i.threshold ? i.threshold : .3, this.duration_ = void 0 !== i.duration ? i.duration : 250;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Ao);function cr(t) {
      var e = 1,
          i = this.targetPointers[0],
          n = this.targetPointers[1],
          o = i.clientX - n.clientX,
          r = i.clientY - n.clientY,
          s = Math.sqrt(o * o + r * r);void 0 !== this.lastDistance_ && (e = this.lastDistance_ / s), this.lastDistance_ = s;var a = t.map,
          h = a.getView(),
          l = h.getResolution(),
          u = h.getMaxResolution(),
          c = h.getMinResolution(),
          p = l * e;p > u ? (e = u / l, p = u) : p < c && (e = c / l, p = c), 1 != e && (this.lastScaleDelta_ = e);var d = a.getViewport().getBoundingClientRect(),
          f = Fo(this.targetPointers);f[0] -= d.left, f[1] -= d.top, this.anchor_ = a.getCoordinateFromPixel(f), a.render(), yo(h, p, this.anchor_);
    }function pr(t) {
      if (this.targetPointers.length < 2) {
        var e = t.map.getView();e.setHint(de.INTERACTING, -1);var i = e.getResolution();if (this.constrainResolution_ || i < e.getMinResolution() || i > e.getMaxResolution()) {
          var n = this.lastScaleDelta_ - 1;!function (t, e, i, n, o) {
            yo(t, e = t.constrainResolution(e, 0, o), i, n);
          }(e, i, this.anchor_, this.duration_, n);
        }return !1;
      }return !0;
    }function dr(t) {
      if (this.targetPointers.length >= 2) {
        var e = t.map;return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || e.getView().setHint(de.INTERACTING, 1), !0;
      }return !1;
    }var fr = function (t) {
      function e(e) {
        t.call(this, { handleDownEvent: dr, handleDragEvent: cr, handleUpEvent: pr, stopDown: C });var i = e || {};this.constrainResolution_ = i.constrainResolution || !1, this.anchor_ = null, this.duration_ = void 0 !== i.duration ? i.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Ao);var _r = .5,
        gr = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3 },
        yr = function (t) {
      function e(e, i, n, o, r) {
        var s = void 0 !== r ? gr.IDLE : gr.LOADED;t.call(this, e, i, n, s), this.loader_ = void 0 !== r ? r : null, this.canvas_ = o, this.error_ = null;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getError = function () {
        return this.error_;
      }, e.prototype.handleLoad_ = function (t) {
        t ? (this.error_ = t, this.state = gr.ERROR) : this.state = gr.LOADED, this.changed();
      }, e.prototype.load = function () {
        this.state == gr.IDLE && (this.state = gr.LOADING, this.changed(), this.loader_(this.handleLoad_.bind(this)));
      }, e.prototype.getImage = function () {
        return this.canvas_;
      }, e;
    }(function (t) {
      function e(e, i, n, o) {
        t.call(this), this.extent = e, this.pixelRatio_ = n, this.resolution = i, this.state = o;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.changed = function () {
        this.dispatchEvent(M.CHANGE);
      }, e.prototype.getExtent = function () {
        return this.extent;
      }, e.prototype.getImage = function () {}, e.prototype.getPixelRatio = function () {
        return this.pixelRatio_;
      }, e.prototype.getResolution = function () {
        return this.resolution;
      }, e.prototype.getState = function () {
        return this.state;
      }, e.prototype.load = function () {}, e;
    }(L)),
        vr = { IMAGE: "IMAGE", TILE: "TILE", VECTOR_TILE: "VECTOR_TILE", VECTOR: "VECTOR" },
        mr = { IMAGE: "image", VECTOR: "vector" },
        Er = function (t) {
      function e(e, i, n, o, r) {
        t.call(this, e), this.vectorContext = i, this.frameState = n, this.context = o, this.glContext = r;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O),
        xr = function (t) {
      function e(e) {
        t.call(this), this.highWaterMark = void 0 !== e ? e : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.canExpireCache = function () {
        return this.getCount() > this.highWaterMark;
      }, e.prototype.clear = function () {
        this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null, this.dispatchEvent(M.CLEAR);
      }, e.prototype.containsKey = function (t) {
        return this.entries_.hasOwnProperty(t);
      }, e.prototype.forEach = function (t, e) {
        for (var i = this.oldest_; i;) t.call(e, i.value_, i.key_, this), i = i.newer;
      }, e.prototype.get = function (t) {
        var e = this.entries_[t];return Qt(void 0 !== e, 15), e === this.newest_ ? e.value_ : (e === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (e.newer.older = e.older, e.older.newer = e.newer), e.newer = null, e.older = this.newest_, this.newest_.newer = e, this.newest_ = e, e.value_);
      }, e.prototype.remove = function (t) {
        var e = this.entries_[t];return Qt(void 0 !== e, 15), e === this.newest_ ? (this.newest_ = e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_;
      }, e.prototype.getCount = function () {
        return this.count_;
      }, e.prototype.getKeys = function () {
        var t,
            e = new Array(this.count_),
            i = 0;for (t = this.newest_; t; t = t.older) e[i++] = t.key_;return e;
      }, e.prototype.getValues = function () {
        var t,
            e = new Array(this.count_),
            i = 0;for (t = this.newest_; t; t = t.older) e[i++] = t.value_;return e;
      }, e.prototype.peekLast = function () {
        return this.oldest_.value_;
      }, e.prototype.peekLastKey = function () {
        return this.oldest_.key_;
      }, e.prototype.peekFirstKey = function () {
        return this.newest_.key_;
      }, e.prototype.pop = function () {
        var t = this.oldest_;return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_;
      }, e.prototype.replace = function (t, e) {
        this.get(t), this.entries_[t].value_ = e;
      }, e.prototype.set = function (t, e) {
        Qt(!(t in this.entries_), 16);var i = { key_: t, newer: null, older: this.newest_, value_: e };this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[t] = i, ++this.count_;
      }, e.prototype.setSize = function (t) {
        this.highWaterMark = t;
      }, e.prototype.prune = function () {
        for (; this.canExpireCache();) this.pop();
      }, e;
    }(L),
        Cr = [0, 0, 0, 1],
        Tr = [],
        Sr = [0, 0, 0, 1],
        Rr = [0, 0, 0, 0],
        Ir = new xr(),
        wr = {},
        Or = null,
        Lr = {},
        Mr = function () {
      var t,
          e,
          i = 60,
          n = wr,
          o = "32px ",
          r = ["monospace", "serif"],
          s = r.length,
          a = "wmytzilWMYTZIL@#/&?$%10";function h(t) {
        for (var i = Pr(), n = !0, h = 0; h < s; ++h) {
          var l = r[h];if (i.font = o + l, e = i.measureText(a).width, t != l) {
            i.font = o + t + "," + l;var u = i.measureText(a).width;n = n && u != e;
          }
        }return n;
      }function l() {
        var e = !0;for (var o in n) n[o] < i && (h(o) ? (n[o] = i, u(Lr), Or = null, Ir.clear()) : (++n[o], e = !1));e && (clearInterval(t), t = void 0);
      }return function (e) {
        var o = $n(e);if (o) for (var r = 0, s = o.length; r < s; ++r) {
          var a = o[r];a in n || (n[a] = i, h(a) || (n[a] = 0, void 0 === t && (t = setInterval(l, 32))));
        }
      };
    }();function Pr() {
      return Or || (Or = Nn(1, 1)), Or;
    }var Fr = function () {
      var t,
          e = Lr;return function (i) {
        var n = e[i];return void 0 == n && (t || ((t = document.createElement("span")).textContent = "M", t.style.margin = t.style.padding = "0 !important", t.style.position = "absolute !important", t.style.left = "-99999px !important"), t.style.font = i, document.body.appendChild(t), n = e[i] = t.offsetHeight, document.body.removeChild(t)), n;
      };
    }();function br(t, e) {
      var i = Pr();return t != i.font && (i.font = t), i.measureText(e).width;
    }function Ar(t, e, i, n) {
      0 !== e && (t.translate(i, n), t.rotate(e), t.translate(-i, -n));
    }var Dr = [1, 0, 0, 1, 0, 0];function Gr(t, e, i, n, o, r, s, a, h, l, u) {
      var c;1 != i && (c = t.globalAlpha, t.globalAlpha = c * i), e && t.setTransform.apply(t, e), t.drawImage(n, o, r, s, a, h, l, s * u, a * u), c && (t.globalAlpha = c), e && t.setTransform.apply(t, Dr);
    }var kr = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i,
        Nr = /^([a-z]*)$/i;function Yr(t) {
      return "string" == typeof t ? t : jr(t);
    }!function () {
      var t = {},
          e = 0;
    }();function Xr(t) {
      return t[0] = ne(t[0] + .5 | 0, 0, 255), t[1] = ne(t[1] + .5 | 0, 0, 255), t[2] = ne(t[2] + .5 | 0, 0, 255), t[3] = ne(t[3], 0, 1), t;
    }function jr(t) {
      var e = t[0];e != (0 | e) && (e = e + .5 | 0);var i = t[1];i != (0 | i) && (i = i + .5 | 0);var n = t[2];return n != (0 | n) && (n = n + .5 | 0), "rgba(" + e + "," + i + "," + n + "," + (void 0 === t[3] ? 1 : t[3]) + ")";
    }function Wr(t) {
      return function (t) {
        return "string" == typeof t || t instanceof CanvasPattern || t instanceof CanvasGradient;
      }(t) ? t : jr(t);
    }var Kr = function () {};Kr.prototype.drawCustom = function (t, e, i) {}, Kr.prototype.drawGeometry = function (t) {}, Kr.prototype.setStyle = function (t) {}, Kr.prototype.drawCircle = function (t, e) {}, Kr.prototype.drawFeature = function (t, e) {}, Kr.prototype.drawGeometryCollection = function (t, e) {}, Kr.prototype.drawLineString = function (t, e) {}, Kr.prototype.drawMultiLineString = function (t, e) {}, Kr.prototype.drawMultiPoint = function (t, e) {}, Kr.prototype.drawMultiPolygon = function (t, e) {}, Kr.prototype.drawPoint = function (t, e) {}, Kr.prototype.drawPolygon = function (t, e) {}, Kr.prototype.drawText = function (t, e) {}, Kr.prototype.setFillStrokeStyle = function (t, e) {}, Kr.prototype.setImageStyle = function (t, e) {}, Kr.prototype.setTextStyle = function (t, e) {};var zr = Kr,
        Ur = function (t) {
      function e(e, i, n, o, r) {
        t.call(this), this.context_ = e, this.pixelRatio_ = i, this.extent_ = n, this.transform_ = o, this.viewRotation_ = r, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = 0, this.imageSnapToPixel_ = !1, this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = 0, this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = [1, 0, 0, 1, 0, 0];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.drawImages_ = function (t, e, i, n) {
        if (this.image_) {
          var o = ri(t, e, i, 2, this.transform_, this.pixelCoordinates_),
              r = this.context_,
              s = this.tmpLocalTransform_,
              a = r.globalAlpha;1 != this.imageOpacity_ && (r.globalAlpha = a * this.imageOpacity_);var h = this.imageRotation_;this.imageRotateWithView_ && (h += this.viewRotation_);for (var l = 0, u = o.length; l < u; l += 2) {
            var c = o[l] - this.imageAnchorX_,
                p = o[l + 1] - this.imageAnchorY_;if (this.imageSnapToPixel_ && (c = Math.round(c), p = Math.round(p)), 0 !== h || 1 != this.imageScale_) {
              var d = c + this.imageAnchorX_,
                  f = p + this.imageAnchorY_;Vi(s, d, f, this.imageScale_, this.imageScale_, h, -d, -f), r.setTransform.apply(r, s);
            }r.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, c, p, this.imageWidth_, this.imageHeight_);
          }0 === h && 1 == this.imageScale_ || r.setTransform(1, 0, 0, 1, 0, 0), 1 != this.imageOpacity_ && (r.globalAlpha = a);
        }
      }, e.prototype.drawText_ = function (t, e, i, n) {
        if (this.textState_ && "" !== this.text_) {
          this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);var o = ri(t, e, i, n, this.transform_, this.pixelCoordinates_),
              r = this.context_,
              s = this.textRotation_;for (this.textRotateWithView_ && (s += this.viewRotation_); e < i; e += n) {
            var a = o[e] + this.textOffsetX_,
                h = o[e + 1] + this.textOffsetY_;if (0 !== s || 1 != this.textScale_) {
              var l = Vi(this.tmpLocalTransform_, a, h, this.textScale_, this.textScale_, s, -a, -h);r.setTransform.apply(r, l);
            }this.textStrokeState_ && r.strokeText(this.text_, a, h), this.textFillState_ && r.fillText(this.text_, a, h);
          }0 === s && 1 == this.textScale_ || r.setTransform(1, 0, 0, 1, 0, 0);
        }
      }, e.prototype.moveToLineTo_ = function (t, e, i, n, o) {
        var r = this.context_,
            s = ri(t, e, i, n, this.transform_, this.pixelCoordinates_);r.moveTo(s[0], s[1]);var a = s.length;o && (a -= 2);for (var h = 2; h < a; h += 2) r.lineTo(s[h], s[h + 1]);return o && r.closePath(), i;
      }, e.prototype.drawRings_ = function (t, e, i, n) {
        for (var o = 0, r = i.length; o < r; ++o) e = this.moveToLineTo_(t, e, i[o], n, !0);return e;
      }, e.prototype.drawCircle = function (t) {
        if (ti(this.extent_, t.getExtent())) {
          if (this.fillState_ || this.strokeState_) {
            this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);var e = function (t, e, i) {
              var n = t.getFlatCoordinates();if (n) {
                var o = t.getStride();return ri(n, 0, n.length, o, e, i);
              }return null;
            }(t, this.transform_, this.pixelCoordinates_),
                i = e[2] - e[0],
                n = e[3] - e[1],
                o = Math.sqrt(i * i + n * n),
                r = this.context_;r.beginPath(), r.arc(e[0], e[1], o, 0, 2 * Math.PI), this.fillState_ && r.fill(), this.strokeState_ && r.stroke();
          }"" !== this.text_ && this.drawText_(t.getCenter(), 0, 2, 2);
        }
      }, e.prototype.setStyle = function (t) {
        this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText());
      }, e.prototype.drawGeometry = function (t) {
        switch (t.getType()) {case ni.POINT:
            this.drawPoint(t);break;case ni.LINE_STRING:
            this.drawLineString(t);break;case ni.POLYGON:
            this.drawPolygon(t);break;case ni.MULTI_POINT:
            this.drawMultiPoint(t);break;case ni.MULTI_LINE_STRING:
            this.drawMultiLineString(t);break;case ni.MULTI_POLYGON:
            this.drawMultiPolygon(t);break;case ni.GEOMETRY_COLLECTION:
            this.drawGeometryCollection(t);break;case ni.CIRCLE:
            this.drawCircle(t);}
      }, e.prototype.drawFeature = function (t, e) {
        var i = e.getGeometryFunction()(t);i && ti(this.extent_, i.getExtent()) && (this.setStyle(e), this.drawGeometry(i));
      }, e.prototype.drawGeometryCollection = function (t) {
        for (var e = t.getGeometriesArray(), i = 0, n = e.length; i < n; ++i) this.drawGeometry(e[i]);
      }, e.prototype.drawPoint = function (t) {
        var e = t.getFlatCoordinates(),
            i = t.getStride();this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i);
      }, e.prototype.drawMultiPoint = function (t) {
        var e = t.getFlatCoordinates(),
            i = t.getStride();this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i);
      }, e.prototype.drawLineString = function (t) {
        if (ti(this.extent_, t.getExtent())) {
          if (this.strokeState_) {
            this.setContextStrokeState_(this.strokeState_);var e = this.context_,
                i = t.getFlatCoordinates();e.beginPath(), this.moveToLineTo_(i, 0, i.length, t.getStride(), !1), e.stroke();
          }if ("" !== this.text_) {
            var n = t.getFlatMidpoint();this.drawText_(n, 0, 2, 2);
          }
        }
      }, e.prototype.drawMultiLineString = function (t) {
        var e = t.getExtent();if (ti(this.extent_, e)) {
          if (this.strokeState_) {
            this.setContextStrokeState_(this.strokeState_);var i = this.context_,
                n = t.getFlatCoordinates(),
                o = 0,
                r = t.getEnds(),
                s = t.getStride();i.beginPath();for (var a = 0, h = r.length; a < h; ++a) o = this.moveToLineTo_(n, o, r[a], s, !1);i.stroke();
          }if ("" !== this.text_) {
            var l = t.getFlatMidpoints();this.drawText_(l, 0, l.length, 2);
          }
        }
      }, e.prototype.drawPolygon = function (t) {
        if (ti(this.extent_, t.getExtent())) {
          if (this.strokeState_ || this.fillState_) {
            this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);var e = this.context_;e.beginPath(), this.drawRings_(t.getOrientedFlatCoordinates(), 0, t.getEnds(), t.getStride()), this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
          }if ("" !== this.text_) {
            var i = t.getFlatInteriorPoint();this.drawText_(i, 0, 2, 2);
          }
        }
      }, e.prototype.drawMultiPolygon = function (t) {
        if (ti(this.extent_, t.getExtent())) {
          if (this.strokeState_ || this.fillState_) {
            this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);var e = this.context_,
                i = t.getOrientedFlatCoordinates(),
                n = 0,
                o = t.getEndss(),
                r = t.getStride();e.beginPath();for (var s = 0, a = o.length; s < a; ++s) {
              var h = o[s];n = this.drawRings_(i, n, h, r);
            }this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
          }if ("" !== this.text_) {
            var l = t.getFlatInteriorPoints();this.drawText_(l, 0, l.length, 2);
          }
        }
      }, e.prototype.setContextFillState_ = function (t) {
        var e = this.context_,
            i = this.contextFillState_;i ? i.fillStyle != t.fillStyle && (i.fillStyle = e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = { fillStyle: t.fillStyle });
      }, e.prototype.setContextStrokeState_ = function (t) {
        var e = this.context_,
            i = this.contextStrokeState_;i ? (i.lineCap != t.lineCap && (i.lineCap = e.lineCap = t.lineCap), V && (Nt(i.lineDash, t.lineDash) || e.setLineDash(i.lineDash = t.lineDash), i.lineDashOffset != t.lineDashOffset && (i.lineDashOffset = e.lineDashOffset = t.lineDashOffset)), i.lineJoin != t.lineJoin && (i.lineJoin = e.lineJoin = t.lineJoin), i.lineWidth != t.lineWidth && (i.lineWidth = e.lineWidth = t.lineWidth), i.miterLimit != t.miterLimit && (i.miterLimit = e.miterLimit = t.miterLimit), i.strokeStyle != t.strokeStyle && (i.strokeStyle = e.strokeStyle = t.strokeStyle)) : (e.lineCap = t.lineCap, V && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.strokeStyle = t.strokeStyle, this.contextStrokeState_ = { lineCap: t.lineCap, lineDash: t.lineDash, lineDashOffset: t.lineDashOffset, lineJoin: t.lineJoin, lineWidth: t.lineWidth, miterLimit: t.miterLimit, strokeStyle: t.strokeStyle });
      }, e.prototype.setContextTextState_ = function (t) {
        var e = this.context_,
            i = this.contextTextState_,
            n = t.textAlign ? t.textAlign : "center";i ? (i.font != t.font && (i.font = e.font = t.font), i.textAlign != n && (i.textAlign = e.textAlign = n), i.textBaseline != t.textBaseline && (i.textBaseline = e.textBaseline = t.textBaseline)) : (e.font = t.font, e.textAlign = n, e.textBaseline = t.textBaseline, this.contextTextState_ = { font: t.font, textAlign: n, textBaseline: t.textBaseline });
      }, e.prototype.setFillStrokeStyle = function (t, e) {
        if (t) {
          var i = t.getColor();this.fillState_ = { fillStyle: Wr(i || Cr) };
        } else this.fillState_ = null;if (e) {
          var n = e.getColor(),
              o = e.getLineCap(),
              r = e.getLineDash(),
              s = e.getLineDashOffset(),
              a = e.getLineJoin(),
              h = e.getWidth(),
              l = e.getMiterLimit();this.strokeState_ = { lineCap: void 0 !== o ? o : "round", lineDash: r || Tr, lineDashOffset: s || 0, lineJoin: void 0 !== a ? a : "round", lineWidth: this.pixelRatio_ * (void 0 !== h ? h : 1), miterLimit: void 0 !== l ? l : 10, strokeStyle: Wr(n || Sr) };
        } else this.strokeState_ = null;
      }, e.prototype.setImageStyle = function (t) {
        if (t) {
          var e = t.getAnchor(),
              i = t.getImage(1),
              n = t.getOrigin(),
              o = t.getSize();this.imageAnchorX_ = e[0], this.imageAnchorY_ = e[1], this.imageHeight_ = o[1], this.image_ = i, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = n[0], this.imageOriginY_ = n[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation(), this.imageScale_ = t.getScale() * this.pixelRatio_, this.imageSnapToPixel_ = t.getSnapToPixel(), this.imageWidth_ = o[0];
        } else this.image_ = null;
      }, e.prototype.setTextStyle = function (t) {
        if (t) {
          var e = t.getFill();if (e) {
            var i = e.getColor();this.textFillState_ = { fillStyle: Wr(i || Cr) };
          } else this.textFillState_ = null;var n = t.getStroke();if (n) {
            var o = n.getColor(),
                r = n.getLineCap(),
                s = n.getLineDash(),
                a = n.getLineDashOffset(),
                h = n.getLineJoin(),
                l = n.getWidth(),
                u = n.getMiterLimit();this.textStrokeState_ = { lineCap: void 0 !== r ? r : "round", lineDash: s || Tr, lineDashOffset: a || 0, lineJoin: void 0 !== h ? h : "round", lineWidth: void 0 !== l ? l : 1, miterLimit: void 0 !== u ? u : 10, strokeStyle: Wr(o || Sr) };
          } else this.textStrokeState_ = null;var c = t.getFont(),
              p = t.getOffsetX(),
              d = t.getOffsetY(),
              f = t.getRotateWithView(),
              _ = t.getRotation(),
              g = t.getScale(),
              y = t.getText(),
              v = t.getTextAlign(),
              m = t.getTextBaseline();this.textState_ = { font: void 0 !== c ? c : "10px sans-serif", textAlign: void 0 !== v ? v : "center", textBaseline: void 0 !== m ? m : "middle" }, this.text_ = void 0 !== y ? y : "", this.textOffsetX_ = void 0 !== p ? this.pixelRatio_ * p : 0, this.textOffsetY_ = void 0 !== d ? this.pixelRatio_ * d : 0, this.textRotateWithView_ = void 0 !== f && f, this.textRotation_ = void 0 !== _ ? _ : 0, this.textScale_ = this.pixelRatio_ * (void 0 !== g ? g : 1);
        } else this.text_ = "";
      }, e;
    }(zr),
        Br = function () {
      this.cache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32;
    };function Vr(t, e, i) {
      return e + ":" + t + ":" + (i ? Yr(i) : "null");
    }Br.prototype.clear = function () {
      this.cache_ = {}, this.cacheSize_ = 0;
    }, Br.prototype.expire = function () {
      if (this.cacheSize_ > this.maxCacheSize_) {
        var t = 0;for (var e in this.cache_) {
          var i = this.cache_[e];0 != (3 & t++) || i.hasListener() || (delete this.cache_[e], --this.cacheSize_);
        }
      }
    }, Br.prototype.get = function (t, e, i) {
      var n = Vr(t, e, i);return n in this.cache_ ? this.cache_[n] : null;
    }, Br.prototype.set = function (t, e, i, n) {
      var o = Vr(t, e, i);this.cache_[o] = n, ++this.cacheSize_;
    }, Br.prototype.setSize = function (t) {
      this.maxCacheSize_ = t, this.expire();
    };var Zr = new Br(),
        Hr = function (t) {
      function e(e) {
        t.call(this), this.map_ = e, this.layerRenderers_ = {}, this.layerRendererListeners_ = {}, this.layerRendererConstructors_ = [];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.registerLayerRenderers = function (t) {
        this.layerRendererConstructors_.push.apply(this.layerRendererConstructors_, t);
      }, e.prototype.getLayerRendererConstructors = function () {
        return this.layerRendererConstructors_;
      }, e.prototype.calculateMatrices2D = function (t) {
        var e = t.viewState,
            i = t.coordinateToPixelTransform,
            n = t.pixelToCoordinateTransform;Vi(i, t.size[0] / 2, t.size[1] / 2, 1 / e.resolution, -1 / e.resolution, -e.rotation, -e.center[0], -e.center[1]), function (t) {
          var e = function (t) {
            return t[0] * t[3] - t[1] * t[2];
          }(t);Qt(0 !== e, 32);var i = t[0],
              n = t[1],
              o = t[2],
              r = t[3],
              s = t[4],
              a = t[5];t[0] = r / e, t[1] = -n / e, t[2] = -o / e, t[3] = i / e, t[4] = (o * a - r * s) / e, t[5] = -(i * a - n * s) / e;
        }(Ki(n, i));
      }, e.prototype.removeLayerRenderers = function () {
        for (var t in this.layerRenderers_) this.removeLayerRendererByKey_(t).dispose();
      }, e.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r, s, a) {
        var h,
            l = e.viewState,
            u = l.resolution;function c(t, i) {
          var s = o(t).toString(),
              a = e.layerStates[o(i)].managed;if (!(s in e.skippedFeatureUids) || a) return n.call(r, t, a ? i : null);
        }var p = l.projection,
            d = t;if (p.canWrapX()) {
          var f = p.getExtent(),
              _ = $e(f),
              g = t[0];if (g < f[0] || g > f[2]) d = [g + _ * Math.ceil((f[0] - g) / _), t[1]];
        }var y,
            v = e.layerStatesArray;for (y = v.length - 1; y >= 0; --y) {
          var m = v[y],
              E = m.layer;if (no(m, u) && s.call(a, E)) {
            var x = this.getLayerRenderer(E);if (E.getSource() && (h = x.forEachFeatureAtCoordinate(E.getSource().getWrapX() ? d : t, e, i, c, r)), h) return h;
          }
        }
      }, e.prototype.forEachLayerAtPixel = function (t, e, i, n, o, r, s) {}, e.prototype.hasFeatureAtCoordinate = function (t, e, i, n, o) {
        return void 0 !== this.forEachFeatureAtCoordinate(t, e, i, x, this, n, o);
      }, e.prototype.getLayerRenderer = function (t) {
        var e = o(t).toString();if (e in this.layerRenderers_) return this.layerRenderers_[e];for (var i, n = 0, r = this.layerRendererConstructors_.length; n < r; ++n) {
          var s = this.layerRendererConstructors_[n];if (s.handles(t)) {
            i = s.create(this, t);break;
          }
        }if (!i) throw new Error("Unable to create renderer for layer: " + t.getType());return this.layerRenderers_[e] = i, this.layerRendererListeners_[e] = y(i, M.CHANGE, this.handleLayerRendererChange_, this), i;
      }, e.prototype.getLayerRendererByKey = function (t) {
        return this.layerRenderers_[t];
      }, e.prototype.getLayerRenderers = function () {
        return this.layerRenderers_;
      }, e.prototype.getMap = function () {
        return this.map_;
      }, e.prototype.handleLayerRendererChange_ = function () {
        this.map_.render();
      }, e.prototype.removeLayerRendererByKey_ = function (t) {
        var e = this.layerRenderers_[t];return delete this.layerRenderers_[t], E(this.layerRendererListeners_[t]), delete this.layerRendererListeners_[t], e;
      }, e.prototype.removeUnusedLayerRenderers_ = function (t, e) {
        for (var i in this.layerRenderers_) e && i in e.layerStates || this.removeLayerRendererByKey_(i).dispose();
      }, e.prototype.scheduleExpireIconCache = function (t) {
        t.postRenderFunctions.push(qr);
      }, e.prototype.scheduleRemoveUnusedLayerRenderers = function (t) {
        for (var e in this.layerRenderers_) if (!(e in t.layerStates)) return void t.postRenderFunctions.push(this.removeUnusedLayerRenderers_.bind(this));
      }, e;
    }(R);function qr(t, e) {
      Zr.expire();
    }function Jr(t, e) {
      return t.zIndex - e.zIndex;
    }Hr.prototype.renderFrame = T;var Qr = [],
        $r = function (t) {
      function e(e) {
        t.call(this, e);var i = e.getViewport();this.context_ = Nn(), this.canvas_ = this.context_.canvas, this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = qn, i.insertBefore(this.canvas_, i.childNodes[0] || null), this.renderedVisible_ = !0, this.transform_ = [1, 0, 0, 1, 0, 0];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.dispatchComposeEvent_ = function (t, e) {
        var i = this.getMap(),
            n = this.context_;if (i.hasListener(t)) {
          var o = e.extent,
              r = e.pixelRatio,
              s = e.viewState.rotation,
              a = this.getTransform(e),
              h = new Ur(n, r, o, a, s),
              l = new Er(t, h, e, n, null);i.dispatchEvent(l);
        }
      }, e.prototype.getTransform = function (t) {
        var e = t.viewState,
            i = this.canvas_.width / 2,
            n = this.canvas_.height / 2,
            o = t.pixelRatio / e.resolution,
            r = -o,
            s = -e.rotation,
            a = -e.center[0],
            h = -e.center[1];return Vi(this.transform_, i, n, o, r, s, a, h);
      }, e.prototype.renderFrame = function (t) {
        if (t) {
          var e = this.context_,
              i = t.pixelRatio,
              n = Math.round(t.size[0] * i),
              o = Math.round(t.size[1] * i);this.canvas_.width != n || this.canvas_.height != o ? (this.canvas_.width = n, this.canvas_.height = o) : e.clearRect(0, 0, n, o);var r = t.viewState.rotation;this.calculateMatrices2D(t), this.dispatchComposeEvent_(eo, t);var s = t.layerStatesArray;!function (t, e) {
            var i,
                n = t.length,
                o = Array(t.length);for (i = 0; i < n; i++) o[i] = { index: i, value: t[i] };for (o.sort(function (t, i) {
              return e(t.value, i.value) || t.index - i.index;
            }), i = 0; i < t.length; i++) t[i] = o[i].value;
          }(s, Jr), r && (e.save(), Ar(e, r, n / 2, o / 2));var a,
              h,
              l,
              u,
              c,
              p = t.viewState.resolution;for (a = 0, h = s.length; a < h; ++a) l = (c = s[a]).layer, u = this.getLayerRenderer(l), no(c, p) && c.sourceState == Kn.READY && u.prepareFrame(t, c) && u.composeFrame(t, c, e);r && e.restore(), this.dispatchComposeEvent_(to, t), this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t);
        } else this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1);
      }, e.prototype.forEachLayerAtPixel = function (t, e, i, n, o, r, s) {
        var a,
            h,
            l = e.viewState.resolution,
            u = e.layerStatesArray,
            c = u.length,
            p = zi(e.pixelToCoordinateTransform, t.slice());for (h = c - 1; h >= 0; --h) {
          var d = u[h],
              f = d.layer;if (no(d, l) && r.call(s, f)) if (a = this.getLayerRenderer(f).forEachLayerAtCoordinate(p, e, i, n, o)) return a;
        }
      }, e.prototype.registerLayerRenderers = function (e) {
        t.prototype.registerLayerRenderers.call(this, e);for (var i = 0, n = e.length; i < n; ++i) {
          var o = e[i];At(Qr, o) || Qr.push(o);
        }
      }, e;
    }(Hr),
        ts = function (t) {
      function e(e) {
        t.call(this), this.layer_ = e;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createLoadedTileFinder = function (t, e, i) {
        return function (n, o) {
          return t.forEachLoadedTile(e, n, o, function (t) {
            i[n] || (i[n] = {}), i[n][t.tileCoord.toString()] = t;
          });
        };
      }, e.prototype.getLayer = function () {
        return this.layer_;
      }, e.prototype.handleImageChange_ = function (t) {
        t.target.getState() === gr.LOADED && this.renderIfReadyAndVisible();
      }, e.prototype.loadImage = function (t) {
        var e = t.getState();return e != gr.LOADED && e != gr.ERROR && y(t, M.CHANGE, this.handleImageChange_, this), e == gr.IDLE && (t.load(), e = t.getState()), e == gr.LOADED;
      }, e.prototype.renderIfReadyAndVisible = function () {
        var t = this.getLayer();t.getVisible() && t.getSourceState() == Kn.READY && this.changed();
      }, e.prototype.scheduleExpireCache = function (t, e) {
        if (e.canExpireCache()) {
          var i = function (t, e, i) {
            var n = o(t).toString();n in i.usedTiles && t.expireCache(i.viewState.projection, i.usedTiles[n]);
          }.bind(null, e);t.postRenderFunctions.push(i);
        }
      }, e.prototype.updateUsedTiles = function (t, e, i, n) {
        var r = o(e).toString(),
            s = i.toString();r in t ? s in t[r] ? t[r][s].extend(n) : t[r][s] = n : (t[r] = {}, t[r][s] = n);
      }, e.prototype.manageTilePyramid = function (t, e, i, n, r, s, a, h, l, u) {
        var c = o(e).toString();c in t.wantedTiles || (t.wantedTiles[c] = {});var p,
            d,
            f,
            _,
            g,
            y,
            v = t.wantedTiles[c],
            m = t.tileQueue;for (y = i.getMinZoom(); y <= a; ++y) for (d = i.getTileRangeForExtentAndZ(s, y, d), f = i.getResolution(y), _ = d.minX; _ <= d.maxX; ++_) for (g = d.minY; g <= d.maxY; ++g) a - y <= h ? ((p = e.getTile(y, _, g, n, r)).getState() == Jt.IDLE && (v[p.getKey()] = !0, m.isKeyQueued(p.getKey()) || m.enqueue([p, c, i.getTileCoordCenter(p.tileCoord), f])), void 0 !== l && l.call(u, p)) : e.useTile(y, _, g, r);
      }, e;
    }(P);ts.prototype.forEachFeatureAtCoordinate = T, ts.prototype.hasFeatureAtCoordinate = C;var es = function (t) {
      function e(e) {
        t.call(this, e), this.renderedResolution, this.transform_ = [1, 0, 0, 1, 0, 0];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clip = function (t, e, i) {
        var n = e.pixelRatio,
            o = e.size[0] * n,
            r = e.size[1] * n,
            s = e.viewState.rotation,
            a = Je(i),
            h = Qe(i),
            l = Be(i),
            u = Ue(i);zi(e.coordinateToPixelTransform, a), zi(e.coordinateToPixelTransform, h), zi(e.coordinateToPixelTransform, l), zi(e.coordinateToPixelTransform, u), t.save(), Ar(t, -s, o / 2, r / 2), t.beginPath(), t.moveTo(a[0] * n, a[1] * n), t.lineTo(h[0] * n, h[1] * n), t.lineTo(l[0] * n, l[1] * n), t.lineTo(u[0] * n, u[1] * n), t.clip(), Ar(t, s, o / 2, r / 2);
      }, e.prototype.dispatchComposeEvent_ = function (t, e, i, n) {
        var o = this.getLayer();if (o.hasListener(t)) {
          var r = i.size[0] * i.pixelRatio,
              s = i.size[1] * i.pixelRatio,
              a = i.viewState.rotation;Ar(e, -a, r / 2, s / 2);var h = void 0 !== n ? n : this.getTransform(i, 0),
              l = new Ur(e, i.pixelRatio, i.extent, h, i.viewState.rotation),
              u = new Er(t, l, i, e, null);o.dispatchEvent(u), Ar(e, a, r / 2, s / 2);
        }
      }, e.prototype.forEachLayerAtCoordinate = function (t, e, i, n, o) {
        return this.forEachFeatureAtCoordinate(t, e, i, x, this) ? n.call(o, this.getLayer(), null) : void 0;
      }, e.prototype.postCompose = function (t, e, i, n) {
        this.dispatchComposeEvent_(to, t, e, n);
      }, e.prototype.preCompose = function (t, e, i) {
        this.dispatchComposeEvent_(eo, t, e, i);
      }, e.prototype.dispatchRenderEvent = function (t, e, i) {
        this.dispatchComposeEvent_(io, t, e, i);
      }, e.prototype.getTransform = function (t, e) {
        var i = t.viewState,
            n = t.pixelRatio,
            o = n * t.size[0] / 2,
            r = n * t.size[1] / 2,
            s = n / i.resolution,
            a = -s,
            h = -i.rotation,
            l = -i.center[0] + e,
            u = -i.center[1];return Vi(this.transform_, o, r, s, a, h, l, u);
      }, e.prototype.composeFrame = function (t, e, i) {}, e.prototype.prepareFrame = function (t, e) {}, e;
    }(ts),
        is = function (t) {
      function e(e) {
        t.call(this, e), this.coordinateToCanvasPixelTransform = [1, 0, 0, 1, 0, 0], this.hitCanvasContext_ = null;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.composeFrame = function (t, e, i) {
        this.preCompose(i, t);var n = this.getImage();if (n) {
          var o = e.extent,
              r = void 0 !== o && !Pe(o, t.extent) && ti(o, t.extent);r && this.clip(i, t, o);var s = this.getImageTransform(),
              a = i.globalAlpha;i.globalAlpha = e.opacity;var h = s[4],
              l = s[5],
              u = n.width * s[0],
              c = n.height * s[3];i.drawImage(n, 0, 0, +n.width, +n.height, Math.round(h), Math.round(l), Math.round(u), Math.round(c)), i.globalAlpha = a, r && i.restore();
        }this.postCompose(i, t, e);
      }, e.prototype.getImage = function () {}, e.prototype.getImageTransform = function () {}, e.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, o) {
        var r = this.getLayer(),
            s = r.getSource(),
            a = e.viewState.resolution,
            h = e.viewState.rotation,
            l = e.skippedFeatureUids;return s.forEachFeatureAtCoordinate(t, a, h, i, l, function (t) {
          return n.call(o, t, r);
        });
      }, e.prototype.forEachLayerAtCoordinate = function (e, i, n, o, r) {
        if (this.getImage()) {
          if (this.getLayer().getSource().forEachFeatureAtCoordinate !== T) return t.prototype.forEachLayerAtCoordinate.apply(this, arguments);var s = zi(this.coordinateToCanvasPixelTransform, e.slice());me(s, i.viewState.resolution / this.renderedResolution), this.hitCanvasContext_ || (this.hitCanvasContext_ = Nn(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.getImage(), s[0], s[1], 1, 1, 0, 0, 1, 1);var a = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;return a[3] > 0 ? o.call(r, this.getLayer(), a) : void 0;
        }
      }, e;
    }(es),
        ns = function (t) {
      function e(i) {
        if (t.call(this, i), this.image_ = null, this.imageTransform_ = [1, 0, 0, 1, 0, 0], this.skippedFeatures_ = [], this.vectorRenderer_ = null, i.getType() === vr.VECTOR) for (var n = 0, o = Qr.length; n < o; ++n) {
          var r = Qr[n];if (r !== e && r.handles(i)) {
            this.vectorRenderer_ = new r(i);break;
          }
        }
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        this.vectorRenderer_ && this.vectorRenderer_.dispose(), t.prototype.disposeInternal.call(this);
      }, e.prototype.getImage = function () {
        return this.image_ ? this.image_.getImage() : null;
      }, e.prototype.getImageTransform = function () {
        return this.imageTransform_;
      }, e.prototype.prepareFrame = function (t, e) {
        var i,
            n = t.pixelRatio,
            o = t.size,
            r = t.viewState,
            s = r.center,
            a = r.resolution,
            h = this.getLayer().getSource(),
            u = t.viewHints,
            c = this.vectorRenderer_,
            p = t.extent;if (c || void 0 === e.extent || (p = qe(p, e.extent)), !u[de.ANIMATING] && !u[de.INTERACTING] && !ei(p)) {
          var d = r.projection,
              f = this.skippedFeatures_;if (c) {
            var _ = c.context,
                g = l({}, t, { size: [$e(p) / a, He(p) / a], viewState: l({}, t.viewState, { rotation: 0 }) }),
                y = Object.keys(g.skippedFeatureUids).sort();i = new yr(p, a, n, _.canvas, function (t) {
              !c.prepareFrame(g, e) || !c.replayGroupChanged && Nt(f, y) || (_.canvas.width = g.size[0] * n, _.canvas.height = g.size[1] * n, c.compose(_, g, e), f = y, t());
            });
          } else i = h.getImage(p, a, n, d);i && this.loadImage(i) && (this.image_ = i, this.skippedFeatures_ = f);
        }if (this.image_) {
          var v = (i = this.image_).getExtent(),
              m = i.getResolution(),
              E = i.getPixelRatio(),
              x = n * m / (a * E),
              C = Vi(this.imageTransform_, n * o[0] / 2, n * o[1] / 2, x, x, 0, E * (v[0] - s[0]) / m, E * (s[1] - v[3]) / m);Vi(this.coordinateToCanvasPixelTransform, n * o[0] / 2 - C[4], n * o[1] / 2 - C[5], n / a, -n / a, 0, -s[0], -s[1]), this.renderedResolution = m * n / E;
        }return !!this.image_;
      }, e.prototype.forEachFeatureAtCoordinate = function (e, i, n, o, r) {
        return this.vectorRenderer_ ? this.vectorRenderer_.forEachFeatureAtCoordinate(e, i, n, o, r) : t.prototype.forEachFeatureAtCoordinate.call(this, e, i, n, o, r);
      }, e;
    }(is);ns.handles = function (t) {
      return t.getType() === vr.IMAGE || t.getType() === vr.VECTOR && t.getRenderMode() === mr.IMAGE;
    }, ns.create = function (t, e) {
      return new ns(e);
    };var os = ns,
        rs = function (t, e, i, n) {
      this.minX = t, this.maxX = e, this.minY = i, this.maxY = n;
    };function ss(t, e, i, n, o) {
      return void 0 !== o ? (o.minX = t, o.maxX = e, o.minY = i, o.maxY = n, o) : new rs(t, e, i, n);
    }rs.prototype.contains = function (t) {
      return this.containsXY(t[1], t[2]);
    }, rs.prototype.containsTileRange = function (t) {
      return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY;
    }, rs.prototype.containsXY = function (t, e) {
      return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY;
    }, rs.prototype.equals = function (t) {
      return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY;
    }, rs.prototype.extend = function (t) {
      t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY);
    }, rs.prototype.getHeight = function () {
      return this.maxY - this.minY + 1;
    }, rs.prototype.getSize = function () {
      return [this.getWidth(), this.getHeight()];
    }, rs.prototype.getWidth = function () {
      return this.maxX - this.minX + 1;
    }, rs.prototype.intersects = function (t) {
      return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY;
    };var as = rs,
        hs = function (t) {
      function e(e, i) {
        t.call(this, e), this.context = i ? null : Nn(), this.oversampling_, this.renderedExtent_ = null, this.renderedRevision, this.renderedTiles = [], this.newTiles_ = !1, this.tmpExtent = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.tmpTileRange_ = new as(0, 0, 0, 0), this.imageTransform_ = [1, 0, 0, 1, 0, 0], this.zDirection = 0;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.isDrawableTile_ = function (t) {
        var e = t.getState(),
            i = this.getLayer().getUseInterimTilesOnError();return e == Jt.LOADED || e == Jt.EMPTY || e == Jt.ERROR && !i;
      }, e.prototype.getTile = function (t, e, i, n, o) {
        var r = this.getLayer(),
            s = r.getSource().getTile(t, e, i, n, o);return s.getState() == Jt.ERROR && (r.getUseInterimTilesOnError() ? r.getPreload() > 0 && (this.newTiles_ = !0) : s.setState(Jt.LOADED)), this.isDrawableTile_(s) || (s = s.getInterimTile()), s;
      }, e.prototype.prepareFrame = function (t, e) {
        var i = t.pixelRatio,
            n = t.size,
            r = t.viewState,
            s = r.projection,
            a = r.resolution,
            h = r.center,
            l = this.getLayer(),
            u = l.getSource(),
            c = u.getRevision(),
            p = u.getTileGridForProjection(s),
            d = p.getZForResolution(a, this.zDirection),
            f = p.getResolution(d),
            _ = Math.round(a / f) || 1,
            g = t.extent;if (void 0 !== e.extent && (g = qe(g, e.extent)), ei(g)) return !1;var y = p.getTileRangeForExtentAndZ(g, d),
            v = p.getTileRangeExtent(d, y),
            m = u.getTilePixelRatio(i),
            E = {};E[d] = {};var x,
            C,
            T,
            S = this.createLoadedTileFinder(u, s, E),
            R = t.viewHints,
            I = R[de.ANIMATING] || R[de.INTERACTING],
            w = this.tmpExtent,
            O = this.tmpTileRange_;for (this.newTiles_ = !1, C = y.minX; C <= y.maxX; ++C) for (T = y.minY; T <= y.maxY; ++T) if (!(Date.now() - t.time > 16 && I)) {
          if (x = this.getTile(d, C, T, i, s), this.isDrawableTile_(x)) {
            var L = o(this);if (x.getState() == Jt.LOADED) {
              E[d][x.tileCoord.toString()] = x;var M = x.inTransition(L);this.newTiles_ || !M && -1 !== this.renderedTiles.indexOf(x) || (this.newTiles_ = !0);
            }if (1 === x.getAlpha(L, t.time)) continue;
          }var P = p.getTileCoordChildTileRange(x.tileCoord, O, w),
              F = !1;P && (F = S(d + 1, P)), F || p.forEachTileCoordParentTileRange(x.tileCoord, S, null, O, w);
        }var b = f * i / m * _;if (!(this.renderedResolution && Date.now() - t.time > 16 && I) && (this.newTiles_ || !this.renderedExtent_ || !Pe(this.renderedExtent_, g) || this.renderedRevision != c || _ != this.oversampling_ || !I && b != this.renderedResolution)) {
          var A = this.context;if (A) {
            var D = u.getTilePixelSize(d, i, s),
                G = Math.round(y.getWidth() * D[0] / _),
                k = Math.round(y.getHeight() * D[1] / _),
                N = A.canvas;N.width != G || N.height != k ? (this.oversampling_ = _, N.width = G, N.height = k) : (this.renderedExtent_ && !Ne(v, this.renderedExtent_) && A.clearRect(0, 0, G, k), _ = this.oversampling_);
          }this.renderedTiles.length = 0;var Y,
              X,
              j,
              W,
              K,
              z,
              U,
              B,
              V,
              Z,
              H = Object.keys(E).map(Number);for (H.sort(function (t, e) {
            return t === d ? 1 : e === d ? -1 : t > e ? 1 : t < e ? -1 : 0;
          }), W = 0, K = H.length; W < K; ++W) for (var q in j = H[W], X = u.getTilePixelSize(j, i, s), Y = p.getResolution(j) / f, U = m * u.getGutter(s), B = E[j]) x = B[q], C = ((z = p.getTileCoordExtent(x.getTileCoord(), w))[0] - v[0]) / f * m / _, T = (v[3] - z[3]) / f * m / _, V = X[0] * Y / _, Z = X[1] * Y / _, this.drawTileImage(x, t, e, C, T, V, Z, U, d === j), this.renderedTiles.push(x);this.renderedRevision = c, this.renderedResolution = f * i / m * _, this.renderedExtent_ = v;
        }var J = this.renderedResolution / a,
            Q = Vi(this.imageTransform_, i * n[0] / 2, i * n[1] / 2, J, J, 0, (this.renderedExtent_[0] - h[0]) / this.renderedResolution * i, (h[1] - this.renderedExtent_[3]) / this.renderedResolution * i);return Vi(this.coordinateToCanvasPixelTransform, i * n[0] / 2 - Q[4], i * n[1] / 2 - Q[5], i / a, -i / a, 0, -h[0], -h[1]), this.updateUsedTiles(t.usedTiles, u, d, y), this.manageTilePyramid(t, u, p, i, s, g, d, l.getPreload()), this.scheduleExpireCache(t, u), this.renderedTiles.length > 0;
      }, e.prototype.drawTileImage = function (t, e, i, n, r, s, a, h, l) {
        var u = t.getImage(this.getLayer());if (u) {
          var c = o(this),
              p = l ? t.getAlpha(c, e.time) : 1;1 !== p || this.getLayer().getSource().getOpaque(e.viewState.projection) || this.context.clearRect(n, r, s, a);var d = p !== this.context.globalAlpha;d && (this.context.save(), this.context.globalAlpha = p), this.context.drawImage(u, h, h, u.width - 2 * h, u.height - 2 * h, n, r, s, a), d && this.context.restore(), 1 !== p ? e.animate = !0 : l && t.endTransition(c);
        }
      }, e.prototype.getImage = function () {
        var t = this.context;return t ? t.canvas : null;
      }, e.prototype.getImageTransform = function () {
        return this.imageTransform_;
      }, e;
    }(is);hs.handles = function (t) {
      return t.getType() === vr.TILE;
    }, hs.create = function (t, e) {
      return new hs(e);
    }, hs.prototype.getLayer;var ls = hs,
        us = i(0),
        cs = i.n(us),
        ps = function () {};ps.prototype.getReplay = function (t, e) {}, ps.prototype.isEmpty = function () {};var ds = ps,
        fs = { CIRCLE: "Circle", DEFAULT: "Default", IMAGE: "Image", LINE_STRING: "LineString", POLYGON: "Polygon", TEXT: "Text" };function _s(t, e, i, n) {
      for (var o = t[e], r = t[e + 1], s = 0, a = e + n; a < i; a += n) {
        var h = t[a],
            l = t[a + 1];s += Math.sqrt((h - o) * (h - o) + (l - r) * (l - r)), o = h, r = l;
      }return s;
    }function gs(t, e, i, n, o, r, s, a) {
      for (var h, l, u, c = [], p = t[e] > t[i - n], d = o.length, f = t[e], _ = t[e + 1], g = t[e += n], y = t[e + 1], v = 0, m = Math.sqrt(Math.pow(g - f, 2) + Math.pow(y - _, 2)), E = "", x = 0, C = 0; C < d; ++C) {
        l = p ? d - C - 1 : C;var T = o.charAt(l),
            S = r(E = p ? T + E : E + T) - x;x += S;for (var R = s + S / 2; e < i - n && v + m < R;) f = g, _ = y, g = t[e += n], y = t[e + 1], v += m, m = Math.sqrt(Math.pow(g - f, 2) + Math.pow(y - _, 2));var I = R - v,
            w = Math.atan2(y - _, g - f);if (p && (w += w > 0 ? -Math.PI : Math.PI), void 0 !== u) {
          var O = w - u;if (O += O > Math.PI ? -2 * Math.PI : O < -Math.PI ? 2 * Math.PI : 0, Math.abs(O) > a) return null;
        }var L = I / m,
            M = le(f, g, L),
            P = le(_, y, L);u == w ? (p && (h[0] = M, h[1] = P, h[2] = S / 2), h[4] = E) : (x = S, h = [M, P, S / 2, w, E = T], p ? c.unshift(h) : c.push(h), u = w), s += S;
      }return c;
    }var ys = { BEGIN_GEOMETRY: 0, BEGIN_PATH: 1, CIRCLE: 2, CLOSE_PATH: 3, CUSTOM: 4, DRAW_CHARS: 5, DRAW_IMAGE: 6, END_GEOMETRY: 7, FILL: 8, MOVE_TO_LINE_TO: 9, SET_FILL_STYLE: 10, SET_STROKE_STYLE: 11, STROKE: 12 },
        vs = [ys.FILL],
        ms = [ys.STROKE],
        Es = [ys.BEGIN_PATH],
        xs = [ys.CLOSE_PATH],
        Cs = ys,
        Ts = [fs.POLYGON, fs.CIRCLE, fs.LINE_STRING, fs.IMAGE, fs.TEXT, fs.DEFAULT],
        Ss = { left: 0, end: 0, center: .5, right: 1, start: 1, top: 0, middle: .5, hanging: .2, alphabetic: .8, ideographic: .8, bottom: 1 },
        Rs = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
        Is = [1, 0, 0, 1, 0, 0],
        ws = function (t) {
      function e(e, i, n, o, r, s) {
        t.call(this), this.declutterTree = s, this.tolerance = e, this.maxExtent = i, this.overlaps = r, this.pixelRatio = o, this.maxLineWidth = 0, this.resolution = n, this.alignFill_, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.coordinateCache_ = {}, this.renderedTransform_ = [1, 0, 0, 1, 0, 0], this.hitDetectionInstructions = [], this.pixelCoordinates_ = null, this.state = {}, this.viewRotation_ = 0;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.replayTextBackground_ = function (t, e, i, n, o, r, s) {
        t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, i), t.lineTo.apply(t, n), t.lineTo.apply(t, o), t.lineTo.apply(t, e), r && (this.alignFill_ = r[2], this.fill_(t)), s && (this.setStrokeStyle_(t, s), t.stroke());
      }, e.prototype.replayImage_ = function (t, e, i, n, o, r, s, a, h, l, u, c, p, d, f, _, g, y) {
        var v = g || y;e -= o *= p, i -= r *= p;var m,
            E,
            x,
            C,
            T = f + l > n.width ? n.width - l : f,
            S = a + u > n.height ? n.height - u : a,
            R = _[3] + T * p + _[1],
            I = _[0] + S * p + _[2],
            w = e - _[3],
            O = i - _[0];(v || 0 !== c) && (m = [w, O], E = [w + R, O], x = [w + R, O + I], C = [w, O + I]);var L = null;if (0 !== c) {
          var M = e + o,
              P = i + r;L = Vi(Is, M, P, 1, 1, c, -M, -P), Ge(Rs), Xe(Rs, zi(Is, m)), Xe(Rs, zi(Is, E)), Xe(Rs, zi(Is, x)), Xe(Rs, zi(Is, C));
        } else De(w, O, w + R, O + I, Rs);var F = t.canvas,
            b = y ? y[2] * p / 2 : 0,
            A = Rs[0] - b <= F.width && Rs[2] + b >= 0 && Rs[1] - b <= F.height && Rs[3] + b >= 0;if (d && (e = Math.round(e), i = Math.round(i)), s) {
          if (!A && 1 == s[4]) return;Ye(s, Rs);var D = A ? [t, L ? L.slice(0) : null, h, n, l, u, T, S, e, i, p] : null;D && v && D.push(g, y, m, E, x, C), s.push(D);
        } else A && (v && this.replayTextBackground_(t, m, E, x, C, g, y), Gr(t, L, h, n, l, u, T, S, e, i, p));
      }, e.prototype.applyPixelRatio = function (t) {
        var e = this.pixelRatio;return 1 == e ? t : t.map(function (t) {
          return t * e;
        });
      }, e.prototype.appendFlatCoordinates = function (t, e, i, n, o, r) {
        var s = this.coordinates.length,
            a = this.getBufferedMaxExtent();r && (e += n);var h,
            l,
            u,
            c = [t[e], t[e + 1]],
            p = [NaN, NaN],
            d = !0;for (h = e + n; h < i; h += n) p[0] = t[h], p[1] = t[h + 1], (u = be(a, p)) !== l ? (d && (this.coordinates[s++] = c[0], this.coordinates[s++] = c[1]), this.coordinates[s++] = p[0], this.coordinates[s++] = p[1], d = !1) : u === Re.INTERSECTING ? (this.coordinates[s++] = p[0], this.coordinates[s++] = p[1], d = !1) : d = !0, c[0] = p[0], c[1] = p[1], l = u;return (o && d || h === e + n) && (this.coordinates[s++] = c[0], this.coordinates[s++] = c[1]), s;
      }, e.prototype.drawCustomCoordinates_ = function (t, e, i, n, o) {
        for (var r = 0, s = i.length; r < s; ++r) {
          var a = i[r],
              h = this.appendFlatCoordinates(t, e, a, n, !1, !1);o.push(h), e = a;
        }return e;
      }, e.prototype.drawCustom = function (t, e, i) {
        this.beginGeometry(t, e);var n,
            o,
            r,
            s,
            a,
            h = t.getType(),
            l = t.getStride(),
            u = this.coordinates.length;if (h == ni.MULTI_POLYGON) {
          n = (t = t).getOrientedFlatCoordinates(), s = [];var c = t.getEndss();a = 0;for (var p = 0, d = c.length; p < d; ++p) {
            var f = [];a = this.drawCustomCoordinates_(n, a, c[p], l, f), s.push(f);
          }this.instructions.push([Cs.CUSTOM, u, s, t, i, pn]);
        } else h == ni.POLYGON || h == ni.MULTI_LINE_STRING ? (r = [], n = h == ni.POLYGON ? t.getOrientedFlatCoordinates() : t.getFlatCoordinates(), a = this.drawCustomCoordinates_(n, 0, t.getEnds(), l, r), this.instructions.push([Cs.CUSTOM, u, r, t, i, cn])) : h == ni.LINE_STRING || h == ni.MULTI_POINT ? (n = t.getFlatCoordinates(), o = this.appendFlatCoordinates(n, 0, n.length, l, !1, !1), this.instructions.push([Cs.CUSTOM, u, o, t, i, un])) : h == ni.POINT && (n = t.getFlatCoordinates(), this.coordinates.push(n[0], n[1]), o = this.coordinates.length, this.instructions.push([Cs.CUSTOM, u, o, t, i]));this.endGeometry(t, e);
      }, e.prototype.beginGeometry = function (t, e) {
        this.beginGeometryInstruction1_ = [Cs.BEGIN_GEOMETRY, e, 0], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [Cs.BEGIN_GEOMETRY, e, 0], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
      }, e.prototype.fill_ = function (t) {
        if (this.alignFill_) {
          var e = zi(this.renderedTransform_, [0, 0]),
              i = 512 * this.pixelRatio;t.translate(e[0] % i, e[1] % i), t.rotate(this.viewRotation_);
        }t.fill(), this.alignFill_ && t.setTransform.apply(t, Dr);
      }, e.prototype.setStrokeStyle_ = function (t, e) {
        t.strokeStyle = e[1], t.lineWidth = e[2], t.lineCap = e[3], t.lineJoin = e[4], t.miterLimit = e[5], V && (t.lineDashOffset = e[7], t.setLineDash(e[6]));
      }, e.prototype.renderDeclutter_ = function (t, e) {
        if (t && t.length > 5) {
          var i = t[4];if (1 == i || i == t.length - 5) {
            var n = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e };if (!this.declutterTree.collides(n)) {
              this.declutterTree.insert(n);for (var o = 5, r = t.length; o < r; ++o) {
                var s = t[o];s && (s.length > 11 && this.replayTextBackground_(s[0], s[13], s[14], s[15], s[16], s[11], s[12]), Gr.apply(void 0, s));
              }
            }t.length = 5, Ge(t);
          }
        }
      }, e.prototype.replay_ = function (t, e, i, n, r, s) {
        var a;this.pixelCoordinates_ && Nt(e, this.renderedTransform_) ? a = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), a = ri(this.coordinates, 0, this.coordinates.length, 2, e, this.pixelCoordinates_), Ki(this.renderedTransform_, e));for (var h, l, u, c, d, f, _, g, y, v, m, E, x = !p(i), C = 0, T = n.length, S = 0, R = 0, I = 0, w = null, O = null, L = this.coordinateCache_, M = this.viewRotation_, P = { context: t, pixelRatio: this.pixelRatio, resolution: this.resolution, rotation: M }, F = this.instructions != n || this.overlaps ? 0 : 200; C < T;) {
          var b = n[C];switch (b[0]) {case Cs.BEGIN_GEOMETRY:
              v = b[1], x && i[o(v).toString()] || !v.getGeometry() ? C = b[2] : void 0 === s || ti(s, v.getGeometry().getExtent()) ? ++C : C = b[2] + 1;break;case Cs.BEGIN_PATH:
              R > F && (this.fill_(t), R = 0), I > F && (t.stroke(), I = 0), R || I || (t.beginPath(), c = d = NaN), ++C;break;case Cs.CIRCLE:
              var A = a[S = b[1]],
                  D = a[S + 1],
                  G = a[S + 2] - A,
                  k = a[S + 3] - D,
                  N = Math.sqrt(G * G + k * k);t.moveTo(A + N, D), t.arc(A, D, N, 0, 2 * Math.PI, !0), ++C;break;case Cs.CLOSE_PATH:
              t.closePath(), ++C;break;case Cs.CUSTOM:
              S = b[1], h = b[2];var Y = b[3],
                  X = b[4],
                  j = 6 == b.length ? b[5] : void 0;P.geometry = Y, P.feature = v, C in L || (L[C] = []);var W = L[C];j ? j(a, S, h, 2, W) : (W[0] = a[S], W[1] = a[S + 1], W.length = 2), X(W, P), ++C;break;case Cs.DRAW_IMAGE:
              S = b[1], h = b[2], y = b[3], l = b[4], u = b[5], g = r ? null : b[6];var K = b[7],
                  z = b[8],
                  U = b[9],
                  B = b[10],
                  V = b[11],
                  Z = b[12],
                  H = b[13],
                  q = b[14],
                  J = b[15],
                  Q = void 0,
                  $ = void 0,
                  tt = void 0;for (b.length > 16 ? (Q = b[16], $ = b[17], tt = b[18]) : (Q = Rr, $ = tt = !1), V && (Z += M); S < h; S += 2) this.replayImage_(t, a[S], a[S + 1], y, l, u, g, K, z, U, B, Z, H, q, J, Q, $ ? w : null, tt ? O : null);this.renderDeclutter_(g, v), ++C;break;case Cs.DRAW_CHARS:
              var et = b[1],
                  it = b[2],
                  nt = b[3];g = r ? null : b[4];var ot = b[5],
                  rt = b[6],
                  st = b[7],
                  at = b[8],
                  ht = b[9],
                  lt = b[10],
                  ut = b[11],
                  ct = b[12],
                  pt = b[13],
                  dt = b[14],
                  ft = _s(a, et, it, 2),
                  _t = at(ct);if (ot || _t <= ft) {
                var gt = this.textStates[pt].textAlign,
                    yt = gs(a, et, it, 2, ct, at, (ft - _t) * Ss[gt], st);if (yt) {
                  var vt = void 0,
                      mt = void 0,
                      Et = void 0,
                      xt = void 0,
                      Ct = void 0;if (lt) for (vt = 0, mt = yt.length; vt < mt; ++vt) Et = (Ct = yt[vt])[4], xt = this.getImage(Et, pt, "", lt), l = Ct[2] + ut, u = nt * xt.height + 2 * (.5 - nt) * ut - ht, this.replayImage_(t, Ct[0], Ct[1], xt, l, u, g, xt.height, 1, 0, 0, Ct[3], dt, !1, xt.width, Rr, null, null);if (rt) for (vt = 0, mt = yt.length; vt < mt; ++vt) Et = (Ct = yt[vt])[4], xt = this.getImage(Et, pt, rt, ""), l = Ct[2], u = nt * xt.height - ht, this.replayImage_(t, Ct[0], Ct[1], xt, l, u, g, xt.height, 1, 0, 0, Ct[3], dt, !1, xt.width, Rr, null, null);
                }
              }this.renderDeclutter_(g, v), ++C;break;case Cs.END_GEOMETRY:
              if (void 0 !== r) {
                var Tt = r(v = b[1]);if (Tt) return Tt;
              }++C;break;case Cs.FILL:
              F ? R++ : this.fill_(t), ++C;break;case Cs.MOVE_TO_LINE_TO:
              for (S = b[1], h = b[2], m = a[S], _ = (E = a[S + 1]) + .5 | 0, (f = m + .5 | 0) === c && _ === d || (t.moveTo(m, E), c = f, d = _), S += 2; S < h; S += 2) f = (m = a[S]) + .5 | 0, _ = (E = a[S + 1]) + .5 | 0, S != h - 2 && f === c && _ === d || (t.lineTo(m, E), c = f, d = _);++C;break;case Cs.SET_FILL_STYLE:
              w = b, this.alignFill_ = b[2], R && (this.fill_(t), R = 0, I && (t.stroke(), I = 0)), t.fillStyle = b[1], ++C;break;case Cs.SET_STROKE_STYLE:
              O = b, I && (t.stroke(), I = 0), this.setStrokeStyle_(t, b), ++C;break;case Cs.STROKE:
              F ? I++ : t.stroke(), ++C;break;default:
              ++C;}
        }R && this.fill_(t), I && t.stroke();
      }, e.prototype.replay = function (t, e, i, n) {
        this.viewRotation_ = i, this.replay_(t, e, n, this.instructions, void 0, void 0);
      }, e.prototype.replayHitDetection = function (t, e, i, n, o, r) {
        return this.viewRotation_ = i, this.replay_(t, e, n, this.hitDetectionInstructions, o, r);
      }, e.prototype.reverseHitDetectionInstructions = function () {
        var t,
            e = this.hitDetectionInstructions;e.reverse();var i,
            n,
            o = e.length,
            r = -1;for (t = 0; t < o; ++t) (n = (i = e[t])[0]) == Cs.END_GEOMETRY ? r = t : n == Cs.BEGIN_GEOMETRY && (i[2] = t, Gt(this.hitDetectionInstructions, r, t), r = -1);
      }, e.prototype.setFillStrokeStyle = function (t, e) {
        var i = this.state;if (t) {
          var n = t.getColor();i.fillStyle = Wr(n || Cr);
        } else i.fillStyle = void 0;if (e) {
          var o = e.getColor();i.strokeStyle = Wr(o || Sr);var r = e.getLineCap();i.lineCap = void 0 !== r ? r : "round";var s = e.getLineDash();i.lineDash = s ? s.slice() : Tr;var a = e.getLineDashOffset();i.lineDashOffset = a || 0;var h = e.getLineJoin();i.lineJoin = void 0 !== h ? h : "round";var l = e.getWidth();i.lineWidth = void 0 !== l ? l : 1;var u = e.getMiterLimit();i.miterLimit = void 0 !== u ? u : 10, i.lineWidth > this.maxLineWidth && (this.maxLineWidth = i.lineWidth, this.bufferedMaxExtent_ = null);
        } else i.strokeStyle = void 0, i.lineCap = void 0, i.lineDash = null, i.lineDashOffset = void 0, i.lineJoin = void 0, i.lineWidth = void 0, i.miterLimit = void 0;
      }, e.prototype.createFill = function (t, e) {
        var i = t.fillStyle,
            n = [Cs.SET_FILL_STYLE, i];return "string" != typeof i && n.push(!0), n;
      }, e.prototype.applyStroke = function (t) {
        this.instructions.push(this.createStroke(t));
      }, e.prototype.createStroke = function (t) {
        return [Cs.SET_STROKE_STYLE, t.strokeStyle, t.lineWidth * this.pixelRatio, t.lineCap, t.lineJoin, t.miterLimit, this.applyPixelRatio(t.lineDash), t.lineDashOffset * this.pixelRatio];
      }, e.prototype.updateFillStyle = function (t, e, i) {
        var n = t.fillStyle;"string" == typeof n && t.currentFillStyle == n || (void 0 !== n && this.instructions.push(e.call(this, t, i)), t.currentFillStyle = n);
      }, e.prototype.updateStrokeStyle = function (t, e) {
        var i = t.strokeStyle,
            n = t.lineCap,
            o = t.lineDash,
            r = t.lineDashOffset,
            s = t.lineJoin,
            a = t.lineWidth,
            h = t.miterLimit;(t.currentStrokeStyle != i || t.currentLineCap != n || o != t.currentLineDash && !Nt(t.currentLineDash, o) || t.currentLineDashOffset != r || t.currentLineJoin != s || t.currentLineWidth != a || t.currentMiterLimit != h) && (void 0 !== i && e.call(this, t), t.currentStrokeStyle = i, t.currentLineCap = n, t.currentLineDash = o, t.currentLineDashOffset = r, t.currentLineJoin = s, t.currentLineWidth = a, t.currentMiterLimit = h);
      }, e.prototype.endGeometry = function (t, e) {
        this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;var i = [Cs.END_GEOMETRY, e];this.instructions.push(i), this.hitDetectionInstructions.push(i);
      }, e.prototype.getBufferedMaxExtent = function () {
        if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = Oe(this.maxExtent), this.maxLineWidth > 0)) {
          var t = this.resolution * (this.maxLineWidth + 1) / 2;we(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
        }return this.bufferedMaxExtent_;
      }, e;
    }(zr);ws.prototype.finish = T;var Os = ws,
        Ls = function (t) {
      function e(e, i, n, o, r, s) {
        t.call(this, e, i, n, o, r, s), this.declutterGroup_ = null, this.hitDetectionImage_ = null, this.image_ = null, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.drawCoordinates_ = function (t, e, i, n) {
        return this.appendFlatCoordinates(t, e, i, n, !1, !1);
      }, e.prototype.drawPoint = function (t, e) {
        if (this.image_) {
          this.beginGeometry(t, e);var i = t.getFlatCoordinates(),
              n = t.getStride(),
              o = this.coordinates.length,
              r = this.drawCoordinates_(i, 0, i.length, n);this.instructions.push([Cs.DRAW_IMAGE, o, r, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.snapToPixel_, this.width_]), this.hitDetectionInstructions.push([Cs.DRAW_IMAGE, o, r, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.snapToPixel_, this.width_]), this.endGeometry(t, e);
        }
      }, e.prototype.drawMultiPoint = function (t, e) {
        if (this.image_) {
          this.beginGeometry(t, e);var i = t.getFlatCoordinates(),
              n = t.getStride(),
              o = this.coordinates.length,
              r = this.drawCoordinates_(i, 0, i.length, n);this.instructions.push([Cs.DRAW_IMAGE, o, r, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.snapToPixel_, this.width_]), this.hitDetectionInstructions.push([Cs.DRAW_IMAGE, o, r, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.snapToPixel_, this.width_]), this.endGeometry(t, e);
        }
      }, e.prototype.finish = function () {
        this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0;
      }, e.prototype.setImageStyle = function (t, e) {
        var i = t.getAnchor(),
            n = t.getSize(),
            o = t.getHitDetectionImage(1),
            r = t.getImage(1),
            s = t.getOrigin();this.anchorX_ = i[0], this.anchorY_ = i[1], this.declutterGroup_ = e, this.hitDetectionImage_ = o, this.image_ = r, this.height_ = n[1], this.opacity_ = t.getOpacity(), this.originX_ = s[0], this.originY_ = s[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScale(), this.snapToPixel_ = t.getSnapToPixel(), this.width_ = n[0];
      }, e;
    }(Os),
        Ms = function (t) {
      function e(e, i, n, o, r, s) {
        t.call(this, e, i, n, o, r, s);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.drawFlatCoordinates_ = function (t, e, i, n) {
        var o = this.coordinates.length,
            r = this.appendFlatCoordinates(t, e, i, n, !1, !1),
            s = [Cs.MOVE_TO_LINE_TO, o, r];return this.instructions.push(s), this.hitDetectionInstructions.push(s), i;
      }, e.prototype.drawLineString = function (t, e) {
        var i = this.state,
            n = i.strokeStyle,
            o = i.lineWidth;if (void 0 !== n && void 0 !== o) {
          this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([Cs.SET_STROKE_STYLE, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], Es);var r = t.getFlatCoordinates(),
              s = t.getStride();this.drawFlatCoordinates_(r, 0, r.length, s), this.hitDetectionInstructions.push(ms), this.endGeometry(t, e);
        }
      }, e.prototype.drawMultiLineString = function (t, e) {
        var i = this.state,
            n = i.strokeStyle,
            o = i.lineWidth;if (void 0 !== n && void 0 !== o) {
          this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([Cs.SET_STROKE_STYLE, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], Es);for (var r = t.getEnds(), s = t.getFlatCoordinates(), a = t.getStride(), h = 0, l = 0, u = r.length; l < u; ++l) h = this.drawFlatCoordinates_(s, h, r[l], a);this.hitDetectionInstructions.push(ms), this.endGeometry(t, e);
        }
      }, e.prototype.finish = function () {
        var t = this.state;void 0 != t.lastStroke && t.lastStroke != this.coordinates.length && this.instructions.push(ms), this.reverseHitDetectionInstructions(), this.state = null;
      }, e.prototype.applyStroke = function (e) {
        void 0 != e.lastStroke && e.lastStroke != this.coordinates.length && (this.instructions.push(ms), e.lastStroke = this.coordinates.length), e.lastStroke = 0, t.prototype.applyStroke.call(this, e), this.instructions.push(Es);
      }, e;
    }(Os),
        Ps = function (t) {
      function e(e, i, n, o, r, s) {
        t.call(this, e, i, n, o, r, s);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.drawFlatCoordinatess_ = function (t, e, i, n) {
        var o = this.state,
            r = void 0 !== o.fillStyle,
            s = void 0 != o.strokeStyle,
            a = i.length;this.instructions.push(Es), this.hitDetectionInstructions.push(Es);for (var h = 0; h < a; ++h) {
          var l = i[h],
              u = this.coordinates.length,
              c = this.appendFlatCoordinates(t, e, l, n, !0, !s),
              p = [Cs.MOVE_TO_LINE_TO, u, c];this.instructions.push(p), this.hitDetectionInstructions.push(p), s && (this.instructions.push(xs), this.hitDetectionInstructions.push(xs)), e = l;
        }return r && (this.instructions.push(vs), this.hitDetectionInstructions.push(vs)), s && (this.instructions.push(ms), this.hitDetectionInstructions.push(ms)), e;
      }, e.prototype.drawCircle = function (t, e) {
        var i = this.state,
            n = i.fillStyle,
            o = i.strokeStyle;if (void 0 !== n || void 0 !== o) {
          this.setFillStrokeStyles_(t), this.beginGeometry(t, e), void 0 !== i.fillStyle && this.hitDetectionInstructions.push([Cs.SET_FILL_STYLE, Yr(Cr)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([Cs.SET_STROKE_STYLE, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);var r = t.getFlatCoordinates(),
              s = t.getStride(),
              a = this.coordinates.length;this.appendFlatCoordinates(r, 0, r.length, s, !1, !1);var h = [Cs.CIRCLE, a];this.instructions.push(Es, h), this.hitDetectionInstructions.push(Es, h), this.hitDetectionInstructions.push(vs), void 0 !== i.fillStyle && this.instructions.push(vs), void 0 !== i.strokeStyle && (this.instructions.push(ms), this.hitDetectionInstructions.push(ms)), this.endGeometry(t, e);
        }
      }, e.prototype.drawPolygon = function (t, e) {
        var i = this.state,
            n = i.fillStyle,
            o = i.strokeStyle;if (void 0 !== n || void 0 !== o) {
          this.setFillStrokeStyles_(t), this.beginGeometry(t, e), void 0 !== i.fillStyle && this.hitDetectionInstructions.push([Cs.SET_FILL_STYLE, Yr(Cr)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([Cs.SET_STROKE_STYLE, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);var r = t.getEnds(),
              s = t.getOrientedFlatCoordinates(),
              a = t.getStride();this.drawFlatCoordinatess_(s, 0, r, a), this.endGeometry(t, e);
        }
      }, e.prototype.drawMultiPolygon = function (t, e) {
        var i = this.state,
            n = i.fillStyle,
            o = i.strokeStyle;if (void 0 !== n || void 0 !== o) {
          this.setFillStrokeStyles_(t), this.beginGeometry(t, e), void 0 !== i.fillStyle && this.hitDetectionInstructions.push([Cs.SET_FILL_STYLE, Yr(Cr)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([Cs.SET_STROKE_STYLE, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);for (var r = t.getEndss(), s = t.getOrientedFlatCoordinates(), a = t.getStride(), h = 0, l = 0, u = r.length; l < u; ++l) h = this.drawFlatCoordinatess_(s, h, r[l], a);this.endGeometry(t, e);
        }
      }, e.prototype.finish = function () {
        this.reverseHitDetectionInstructions(), this.state = null;var t = this.tolerance;if (0 !== t) for (var e = this.coordinates, i = 0, n = e.length; i < n; ++i) e[i] = _n(e[i], t);
      }, e.prototype.setFillStrokeStyles_ = function (t) {
        var e = this.state;void 0 !== e.fillStyle && this.updateFillStyle(e, this.createFill, t), void 0 !== e.strokeStyle && this.updateStrokeStyle(e, this.applyStroke);
      }, e;
    }(Os);function Fs(t, e, i, n, o) {
      var r,
          s,
          a,
          h,
          l,
          u,
          c,
          p,
          d,
          f = i,
          _ = i,
          g = 0,
          y = 0,
          v = i;for (r = i; r < n; r += o) {
        var m = e[r],
            E = e[r + 1];void 0 !== h && (p = m - h, d = E - l, a = Math.sqrt(p * p + d * d), void 0 !== u && (y += s, Math.acos((u * p + c * d) / (s * a)) > t && (y > g && (g = y, f = v, _ = r), y = 0, v = r - o)), s = a, u = p, c = d), h = m, l = E;
      }return (y += a) > g ? [v, r] : [f, _];
    }var bs = "line";var As = { Circle: Ps, Default: Os, Image: Ls, LineString: Ms, Polygon: Ps, Text: function (t) {
        function e(e, i, n, o, r, s) {
          t.call(this, e, i, n, o, r, s), this.declutterGroup_, this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.widths_ = {}, Ir.prune();
        }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.drawText = function (t, e) {
          var i = this.textFillState_,
              n = this.textStrokeState_,
              o = this.textState_;if ("" !== this.text_ && o && (i || n)) {
            var r,
                s,
                a = this.coordinates.length,
                h = t.getType(),
                l = null,
                u = 2,
                c = 2;if (o.placement === bs) {
              if (!ti(this.getBufferedMaxExtent(), t.getExtent())) return;var p;if (l = t.getFlatCoordinates(), c = t.getStride(), h == ni.LINE_STRING) p = [l.length];else if (h == ni.MULTI_LINE_STRING) p = t.getEnds();else if (h == ni.POLYGON) p = t.getEnds().slice(0, 1);else if (h == ni.MULTI_POLYGON) {
                var d = t.getEndss();for (p = [], r = 0, s = d.length; r < s; ++r) p.push(d[r][0]);
              }this.beginGeometry(t, e);for (var f, _ = o.textAlign, g = 0, y = 0, v = p.length; y < v; ++y) {
                if (void 0 == _) {
                  var m = Fs(o.maxAngle, l, g, p[y], c);g = m[0], f = m[1];
                } else f = p[y];for (r = g; r < f; r += c) this.coordinates.push(l[r], l[r + 1]);u = this.coordinates.length, g = p[y], this.drawChars_(a, u, this.declutterGroup_), a = u;
              }this.endGeometry(t, e);
            } else {
              var E = this.getImage(this.text_, this.textKey_, this.fillKey_, this.strokeKey_),
                  x = E.width / this.pixelRatio;switch (h) {case ni.POINT:case ni.MULTI_POINT:
                  u = (l = t.getFlatCoordinates()).length;break;case ni.LINE_STRING:
                  l = t.getFlatMidpoint();break;case ni.CIRCLE:
                  l = t.getCenter();break;case ni.MULTI_LINE_STRING:
                  u = (l = t.getFlatMidpoints()).length;break;case ni.POLYGON:
                  if (l = t.getFlatInteriorPoint(), !o.overflow && l[2] / this.resolution < x) return;c = 3;break;case ni.MULTI_POLYGON:
                  var C = t.getFlatInteriorPoints();for (l = [], r = 0, s = C.length; r < s; r += 3) (o.overflow || C[r + 2] / this.resolution >= x) && l.push(C[r], C[r + 1]);if (0 == (u = l.length)) return;}u = this.appendFlatCoordinates(l, 0, u, c, !1, !1), (o.backgroundFill || o.backgroundStroke) && (this.setFillStrokeStyle(o.backgroundFill, o.backgroundStroke), o.backgroundFill && (this.updateFillStyle(this.state, this.createFill, t), this.hitDetectionInstructions.push(this.createFill(this.state, t))), o.backgroundStroke && (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))), this.beginGeometry(t, e), this.drawTextImage_(E, a, u), this.endGeometry(t, e);
            }
          }
        }, e.prototype.getImage = function (t, e, i, n) {
          var o,
              r = n + e + t + i + this.pixelRatio;if (!Ir.containsKey(r)) {
            var s = n ? this.strokeStates[n] || this.textStrokeState_ : null,
                a = i ? this.fillStates[i] || this.textFillState_ : null,
                h = this.textStates[e] || this.textState_,
                l = this.pixelRatio,
                u = h.scale * l,
                c = Ss[h.textAlign || "center"],
                p = n && s.lineWidth ? s.lineWidth : 0,
                d = t.split("\n"),
                f = d.length,
                _ = [],
                g = function (t, e, i) {
              for (var n = e.length, o = 0, r = 0; r < n; ++r) {
                var s = br(t, e[r]);o = Math.max(o, s), i.push(s);
              }return o;
            }(h.font, d, _),
                y = Fr(h.font),
                v = y * f,
                m = g + p,
                E = Nn(Math.ceil(m * u), Math.ceil((v + p) * u));o = E.canvas, Ir.set(r, o), 1 != u && E.scale(u, u), E.font = h.font, n && (E.strokeStyle = s.strokeStyle, E.lineWidth = p, E.lineCap = s.lineCap, E.lineJoin = s.lineJoin, E.miterLimit = s.miterLimit, V && s.lineDash.length && (E.setLineDash(s.lineDash), E.lineDashOffset = s.lineDashOffset)), i && (E.fillStyle = a.fillStyle), E.textBaseline = "middle", E.textAlign = "center";var x,
                C = .5 - c,
                T = c * o.width / u + C * p;if (n) for (x = 0; x < f; ++x) E.strokeText(d[x], T + C * _[x], .5 * (p + y) + x * y);if (i) for (x = 0; x < f; ++x) E.fillText(d[x], T + C * _[x], .5 * (p + y) + x * y);
          }return Ir.get(r);
        }, e.prototype.drawTextImage_ = function (t, e, i) {
          var n = this.textState_,
              o = this.textStrokeState_,
              r = this.pixelRatio,
              s = Ss[n.textAlign || "center"],
              a = Ss[n.textBaseline],
              h = o && o.lineWidth ? o.lineWidth : 0,
              l = s * t.width / r + 2 * (.5 - s) * h,
              u = a * t.height / r + 2 * (.5 - a) * h;this.instructions.push([Cs.DRAW_IMAGE, e, i, t, (l - this.textOffsetX_) * r, (u - this.textOffsetY_) * r, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1, !0, t.width, n.padding == Rr ? Rr : n.padding.map(function (t) {
            return t * r;
          }), !!n.backgroundFill, !!n.backgroundStroke]), this.hitDetectionInstructions.push([Cs.DRAW_IMAGE, e, i, t, (l - this.textOffsetX_) * r, (u - this.textOffsetY_) * r, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1 / r, !0, t.width, n.padding, !!n.backgroundFill, !!n.backgroundStroke]);
        }, e.prototype.drawChars_ = function (t, e, i) {
          var n = this.textStrokeState_,
              o = this.textState_,
              r = this.textFillState_,
              s = this.strokeKey_;n && (s in this.strokeStates || (this.strokeStates[s] = { strokeStyle: n.strokeStyle, lineCap: n.lineCap, lineDashOffset: n.lineDashOffset, lineWidth: n.lineWidth, lineJoin: n.lineJoin, miterLimit: n.miterLimit, lineDash: n.lineDash }));var a = this.textKey_;this.textKey_ in this.textStates || (this.textStates[this.textKey_] = { font: o.font, textAlign: o.textAlign || "center", scale: o.scale });var h = this.fillKey_;r && (h in this.fillStates || (this.fillStates[h] = { fillStyle: r.fillStyle }));var l = this.pixelRatio,
              u = Ss[o.textBaseline],
              c = this.textOffsetY_ * l,
              p = this.text_,
              d = o.font,
              f = o.scale,
              _ = n ? n.lineWidth * f / 2 : 0,
              g = this.widths_[d];g || (this.widths_[d] = g = {}), this.instructions.push([Cs.DRAW_CHARS, t, e, u, i, o.overflow, h, o.maxAngle, function (t) {
            var e = g[t];return e || (e = g[t] = br(d, t)), e * f * l;
          }, c, s, _ * l, p, a, 1]), this.hitDetectionInstructions.push([Cs.DRAW_CHARS, t, e, u, i, o.overflow, h, o.maxAngle, function (t) {
            var e = g[t];return e || (e = g[t] = br(d, t)), e * f;
          }, c, s, _, p, a, 1 / l]);
        }, e.prototype.setTextStyle = function (t, e) {
          var i, n, r;if (t) {
            this.declutterGroup_ = e;var s = t.getFill();s ? ((n = this.textFillState_) || (n = this.textFillState_ = {}), n.fillStyle = Wr(s.getColor() || Cr)) : n = this.textFillState_ = null;var a = t.getStroke();if (a) {
              (r = this.textStrokeState_) || (r = this.textStrokeState_ = {});var h = a.getLineDash(),
                  l = a.getLineDashOffset(),
                  u = a.getWidth(),
                  c = a.getMiterLimit();r.lineCap = a.getLineCap() || "round", r.lineDash = h ? h.slice() : Tr, r.lineDashOffset = void 0 === l ? 0 : l, r.lineJoin = a.getLineJoin() || "round", r.lineWidth = void 0 === u ? 1 : u, r.miterLimit = void 0 === c ? 10 : c, r.strokeStyle = Wr(a.getColor() || Sr);
            } else r = this.textStrokeState_ = null;i = this.textState_;var p = t.getFont() || "10px sans-serif";Mr(p);var d = t.getScale();i.overflow = t.getOverflow(), i.font = p, i.maxAngle = t.getMaxAngle(), i.placement = t.getPlacement(), i.textAlign = t.getTextAlign(), i.textBaseline = t.getTextBaseline() || "middle", i.backgroundFill = t.getBackgroundFill(), i.backgroundStroke = t.getBackgroundStroke(), i.padding = t.getPadding() || Rr, i.scale = void 0 === d ? 1 : d;var f = t.getOffsetX(),
                _ = t.getOffsetY(),
                g = t.getRotateWithView(),
                y = t.getRotation();this.text_ = t.getText() || "", this.textOffsetX_ = void 0 === f ? 0 : f, this.textOffsetY_ = void 0 === _ ? 0 : _, this.textRotateWithView_ = void 0 !== g && g, this.textRotation_ = void 0 === y ? 0 : y, this.strokeKey_ = r ? ("string" == typeof r.strokeStyle ? r.strokeStyle : o(r.strokeStyle)) + r.lineCap + r.lineDashOffset + "|" + r.lineWidth + r.lineJoin + r.miterLimit + "[" + r.lineDash.join() + "]" : "", this.textKey_ = i.font + i.scale + (i.textAlign || "?"), this.fillKey_ = n ? "string" == typeof n.fillStyle ? n.fillStyle : "|" + o(n.fillStyle) : "";
          } else this.text_ = "";
        }, e;
      }(Os) },
        Ds = function (t) {
      function e(e, i, n, o, r, s, a) {
        t.call(this), this.declutterTree_ = s, this.declutterGroup_ = null, this.tolerance_ = e, this.maxExtent_ = i, this.overlaps_ = r, this.pixelRatio_ = o, this.resolution_ = n, this.renderBuffer_ = a, this.replaysByZIndex_ = {}, this.hitDetectionContext_ = Nn(1, 1), this.hitDetectionTransform_ = [1, 0, 0, 1, 0, 0];
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.addDeclutter = function (t) {
        var e = null;return this.declutterTree_ && (t ? (e = this.declutterGroup_)[4]++ : (e = this.declutterGroup_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0]).push(1)), e;
      }, e.prototype.clip = function (t, e) {
        var i = this.getClipCoords(e);t.beginPath(), t.moveTo(i[0], i[1]), t.lineTo(i[2], i[3]), t.lineTo(i[4], i[5]), t.lineTo(i[6], i[7]), t.clip();
      }, e.prototype.hasReplays = function (t) {
        for (var e in this.replaysByZIndex_) for (var i = this.replaysByZIndex_[e], n = 0, o = t.length; n < o; ++n) if (t[n] in i) return !0;return !1;
      }, e.prototype.finish = function () {
        for (var t in this.replaysByZIndex_) {
          var e = this.replaysByZIndex_[t];for (var i in e) e[i].finish();
        }
      }, e.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, o, r, s) {
        var a,
            h = 2 * (n = Math.round(n)) + 1,
            l = Vi(this.hitDetectionTransform_, n + .5, n + .5, 1 / e, -1 / e, -i, -t[0], -t[1]),
            u = this.hitDetectionContext_;u.canvas.width !== h || u.canvas.height !== h ? (u.canvas.width = h, u.canvas.height = h) : u.clearRect(0, 0, h, h), void 0 !== this.renderBuffer_ && (Xe(a = [1 / 0, 1 / 0, -1 / 0, -1 / 0], t), we(a, e * (this.renderBuffer_ + n), a));var c,
            p,
            d = function (t) {
          if (void 0 !== Gs[t]) return Gs[t];for (var e = 2 * t + 1, i = new Array(e), n = 0; n < e; n++) i[n] = new Array(e);var o = t,
              r = 0,
              s = 0;for (; o >= r;) ks(i, t + o, t + r), ks(i, t + r, t + o), ks(i, t - r, t + o), ks(i, t - o, t + r), ks(i, t - o, t - r), ks(i, t - r, t - o), ks(i, t + r, t - o), ks(i, t + o, t - r), 2 * ((s += 1 + 2 * ++r) - o) + 1 > 0 && (s += 1 - 2 * (o -= 1));return Gs[t] = i, i;
        }(n);function f(t) {
          for (var e = u.getImageData(0, 0, h, h).data, i = 0; i < h; i++) for (var n = 0; n < h; n++) if (d[i][n] && e[4 * (n * h + i) + 3] > 0) {
            var o = void 0;return (!c || p != fs.IMAGE && p != fs.TEXT || -1 !== c.indexOf(t)) && (o = r(t)), o || void u.clearRect(0, 0, h, h);
          }
        }this.declutterTree_ && (c = this.declutterTree_.all().map(function (t) {
          return t.value;
        }));var _,
            g,
            y,
            v,
            m,
            E = Object.keys(this.replaysByZIndex_).map(Number);for (E.sort(bt), _ = E.length - 1; _ >= 0; --_) {
          var x = E[_].toString();for (y = this.replaysByZIndex_[x], g = Ts.length - 1; g >= 0; --g) if (void 0 !== (v = y[p = Ts[g]])) if (!s || p != fs.IMAGE && p != fs.TEXT) {
            if (m = v.replayHitDetection(u, l, i, o, f, a)) return m;
          } else {
            var C = s[x];C ? C.push(v, l.slice(0)) : s[x] = [v, l.slice(0)];
          }
        }
      }, e.prototype.getClipCoords = function (t) {
        var e = this.maxExtent_,
            i = e[0],
            n = e[1],
            o = e[2],
            r = e[3],
            s = [i, n, i, r, o, r, o, n];return ri(s, 0, 8, 2, t, s), s;
      }, e.prototype.getReplay = function (t, e) {
        var i = void 0 !== t ? t.toString() : "0",
            n = this.replaysByZIndex_[i];void 0 === n && (n = {}, this.replaysByZIndex_[i] = n);var o = n[e];void 0 === o && (o = new (0, As[e])(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_, this.overlaps_, this.declutterTree_), n[e] = o);return o;
      }, e.prototype.getReplays = function () {
        return this.replaysByZIndex_;
      }, e.prototype.isEmpty = function () {
        return p(this.replaysByZIndex_);
      }, e.prototype.replay = function (t, e, i, n, o, r) {
        var s = Object.keys(this.replaysByZIndex_).map(Number);s.sort(bt), t.save(), this.clip(t, e);var a,
            h,
            l,
            u,
            c,
            p,
            d = o || Ts;for (a = 0, h = s.length; a < h; ++a) {
          var f = s[a].toString();for (c = this.replaysByZIndex_[f], l = 0, u = d.length; l < u; ++l) {
            var _ = d[l];if (p = c[_], void 0 !== p) if (!r || _ != fs.IMAGE && _ != fs.TEXT) p.replay(t, e, i, n);else {
              var g = r[f];g ? g.push(p, e.slice(0)) : r[f] = [p, e.slice(0)];
            }
          }
        }t.restore();
      }, e;
    }(ds),
        Gs = { 0: [[!0]] };function ks(t, e, i) {
      var n,
          o = Math.floor(t.length / 2);if (e >= o) for (n = o; n < e; n++) t[n][i] = !0;else if (e < o) for (n = e + 1; n < o; n++) t[n][i] = !0;
    }var Ns = Ds,
        Ys = .5,
        Xs = { Point: function (t, e, i, n) {
        var o = i.getImage();if (o) {
          if (o.getImageState() != gr.LOADED) return;var r = t.getReplay(i.getZIndex(), fs.IMAGE);r.setImageStyle(o, t.addDeclutter(!1)), r.drawPoint(e, n);
        }var s = i.getText();if (s) {
          var a = t.getReplay(i.getZIndex(), fs.TEXT);a.setTextStyle(s, t.addDeclutter(!!o)), a.drawText(e, n);
        }
      }, LineString: function (t, e, i, n) {
        var o = i.getStroke();if (o) {
          var r = t.getReplay(i.getZIndex(), fs.LINE_STRING);r.setFillStrokeStyle(null, o), r.drawLineString(e, n);
        }var s = i.getText();if (s) {
          var a = t.getReplay(i.getZIndex(), fs.TEXT);a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, n);
        }
      }, Polygon: function (t, e, i, n) {
        var o = i.getFill(),
            r = i.getStroke();if (o || r) {
          var s = t.getReplay(i.getZIndex(), fs.POLYGON);s.setFillStrokeStyle(o, r), s.drawPolygon(e, n);
        }var a = i.getText();if (a) {
          var h = t.getReplay(i.getZIndex(), fs.TEXT);h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, n);
        }
      }, MultiPoint: function (t, e, i, n) {
        var o = i.getImage();if (o) {
          if (o.getImageState() != gr.LOADED) return;var r = t.getReplay(i.getZIndex(), fs.IMAGE);r.setImageStyle(o, t.addDeclutter(!1)), r.drawMultiPoint(e, n);
        }var s = i.getText();if (s) {
          var a = t.getReplay(i.getZIndex(), fs.TEXT);a.setTextStyle(s, t.addDeclutter(!!o)), a.drawText(e, n);
        }
      }, MultiLineString: function (t, e, i, n) {
        var o = i.getStroke();if (o) {
          var r = t.getReplay(i.getZIndex(), fs.LINE_STRING);r.setFillStrokeStyle(null, o), r.drawMultiLineString(e, n);
        }var s = i.getText();if (s) {
          var a = t.getReplay(i.getZIndex(), fs.TEXT);a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, n);
        }
      }, MultiPolygon: function (t, e, i, n) {
        var o = i.getFill(),
            r = i.getStroke();if (r || o) {
          var s = t.getReplay(i.getZIndex(), fs.POLYGON);s.setFillStrokeStyle(o, r), s.drawMultiPolygon(e, n);
        }var a = i.getText();if (a) {
          var h = t.getReplay(i.getZIndex(), fs.TEXT);h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, n);
        }
      }, GeometryCollection: function (t, e, i, n) {
        var o,
            r,
            s = e.getGeometriesArray();for (o = 0, r = s.length; o < r; ++o) {
          var a = Xs[s[o].getType()];a(t, s[o], i, n);
        }
      }, Circle: function (t, e, i, n) {
        var o = i.getFill(),
            r = i.getStroke();if (o || r) {
          var s = t.getReplay(i.getZIndex(), fs.CIRCLE);s.setFillStrokeStyle(o, r), s.drawCircle(e, n);
        }var a = i.getText();if (a) {
          var h = t.getReplay(i.getZIndex(), fs.TEXT);h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, n);
        }
      } };function js(t, e) {
      return o(t) - o(e);
    }function Ws(t, e) {
      var i = Ks(t, e);return i * i;
    }function Ks(t, e) {
      return Ys * t / e;
    }function zs(t, e, i, n, o, r) {
      var s = !1,
          a = i.getImage();if (a) {
        var h = a.getImageState();h == gr.LOADED || h == gr.ERROR ? a.unlistenImageChange(o, r) : (h == gr.IDLE && a.load(), h = a.getImageState(), a.listenImageChange(o, r), s = !0);
      }return function (t, e, i, n) {
        var o = i.getGeometryFunction()(e);if (!o) return;var r = o.getSimplifiedGeometry(n);if (i.getRenderer()) !function t(e, i, n, o) {
          if (i.getType() == ni.GEOMETRY_COLLECTION) {
            for (var r = i.getGeometries(), s = 0, a = r.length; s < a; ++s) t(e, r[s], n, o);return;
          }var h = e.getReplay(n.getZIndex(), fs.DEFAULT);h.drawCustom(i, o, n.getRenderer());
        }(t, r, i, e);else {
          var s = Xs[r.getType()];s(t, r, i, e);
        }
      }(t, e, i, n), s;
    }var Us = function (t) {
      function e(e) {
        t.call(this, e), this.declutterTree_ = e.getDeclutter() ? cs()(9, void 0) : null, this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.context = Nn(), y(Ir, M.CLEAR, this.handleFontsChanged_, this);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        m(Ir, M.CLEAR, this.handleFontsChanged_, this), t.prototype.disposeInternal.call(this);
      }, e.prototype.compose = function (t, e, i) {
        var n = e.extent,
            o = e.pixelRatio,
            r = i.managed ? e.skippedFeatureUids : {},
            s = e.viewState,
            a = s.projection,
            h = s.rotation,
            l = a.getExtent(),
            u = this.getLayer().getSource(),
            c = this.getTransform(e, 0),
            p = i.extent,
            d = void 0 !== p;d && this.clip(t, e, p);var f = this.replayGroup_;if (f && !f.isEmpty()) {
          this.declutterTree_ && this.declutterTree_.clear();var _,
              g = this.getLayer(),
              y = 0,
              v = 0,
              m = 1 !== i.opacity,
              E = g.hasListener(io);if (m || E) {
            var x = t.canvas.width,
                C = t.canvas.height;if (h) {
              var T = Math.round(Math.sqrt(x * x + C * C));y = (T - x) / 2, v = (T - C) / 2, x = C = T;
            }this.context.canvas.width = x, this.context.canvas.height = C, _ = this.context;
          } else _ = t;var S = _.globalAlpha;m || (_.globalAlpha = i.opacity), _ != t && _.translate(y, v);var R = e.size[0] * o,
              I = e.size[1] * o;if (Ar(_, -h, R / 2, I / 2), f.replay(_, c, h, r), u.getWrapX() && a.canWrapX() && !Pe(l, n)) {
            for (var w, O = n[0], L = $e(l), M = 0; O < l[0];) w = L * --M, c = this.getTransform(e, w), f.replay(_, c, h, r), O += L;for (M = 0, O = n[2]; O > l[2];) w = L * ++M, c = this.getTransform(e, w), f.replay(_, c, h, r), O -= L;
          }if (Ar(_, h, R / 2, I / 2), E && this.dispatchRenderEvent(_, e, c), _ != t) {
            if (m) {
              var P = t.globalAlpha;t.globalAlpha = i.opacity, t.drawImage(_.canvas, -y, -v), t.globalAlpha = P;
            } else t.drawImage(_.canvas, -y, -v);_.translate(-y, -v);
          }m || (_.globalAlpha = S);
        }d && t.restore();
      }, e.prototype.composeFrame = function (t, e, i) {
        var n = this.getTransform(t, 0);this.preCompose(i, t, n), this.compose(i, t, e), this.postCompose(i, t, e, n);
      }, e.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r) {
        if (this.replayGroup_) {
          var s = e.viewState.resolution,
              a = e.viewState.rotation,
              h = this.getLayer(),
              l = {};return this.replayGroup_.forEachFeatureAtCoordinate(t, s, a, i, {}, function (t) {
            var e = o(t).toString();if (!(e in l)) return l[e] = !0, n.call(r, t, h);
          }, null);
        }
      }, e.prototype.handleFontsChanged_ = function (t) {
        var e = this.getLayer();e.getVisible() && this.replayGroup_ && e.changed();
      }, e.prototype.handleStyleImageChange_ = function (t) {
        this.renderIfReadyAndVisible();
      }, e.prototype.prepareFrame = function (t, e) {
        var i = this.getLayer(),
            n = i.getSource(),
            o = t.viewHints[de.ANIMATING],
            r = t.viewHints[de.INTERACTING],
            s = i.getUpdateWhileAnimating(),
            a = i.getUpdateWhileInteracting();if (!this.dirty_ && !s && o || !a && r) return !0;var h = t.extent,
            l = t.viewState,
            u = l.projection,
            c = l.resolution,
            p = t.pixelRatio,
            d = i.getRevision(),
            f = i.getRenderBuffer(),
            _ = i.getRenderOrder();void 0 === _ && (_ = js);var g = we(h, f * c),
            y = l.projection.getExtent();if (n.getWrapX() && l.projection.canWrapX() && !Pe(y, t.extent)) {
          var v = $e(y),
              m = Math.max($e(g) / 2, v);g[0] = y[0] - m, g[2] = y[2] + m;
        }if (!this.dirty_ && this.renderedResolution_ == c && this.renderedRevision_ == d && this.renderedRenderOrder_ == _ && Pe(this.renderedExtent_, g)) return this.replayGroupChanged = !1, !0;this.replayGroup_ = null, this.dirty_ = !1;var E = new Ns(Ks(c, p), g, c, p, n.getOverlaps(), this.declutterTree_, i.getRenderBuffer());n.loadFeatures(g, c, u);var x = function (t) {
          var e,
              n = t.getStyleFunction() || i.getStyleFunction();if (n && (e = n(t, c)), e) {
            var o = this.renderFeature(t, c, p, e, E);this.dirty_ = this.dirty_ || o;
          }
        }.bind(this);if (_) {
          var C = [];n.forEachFeatureInExtent(g, function (t) {
            C.push(t);
          }, this), C.sort(_);for (var T = 0, S = C.length; T < S; ++T) x(C[T]);
        } else n.forEachFeatureInExtent(g, x, this);return E.finish(), this.renderedResolution_ = c, this.renderedRevision_ = d, this.renderedRenderOrder_ = _, this.renderedExtent_ = g, this.replayGroup_ = E, this.replayGroupChanged = !0, !0;
      }, e.prototype.renderFeature = function (t, e, i, n, o) {
        if (!n) return !1;var r = !1;if (Array.isArray(n)) for (var s = 0, a = n.length; s < a; ++s) r = zs(o, t, n[s], Ws(e, i), this.handleStyleImageChange_, this) || r;else r = zs(o, t, n, Ws(e, i), this.handleStyleImageChange_, this);return r;
      }, e;
    }(es);Us.handles = function (t) {
      return t.getType() === vr.VECTOR;
    }, Us.create = function (t, e) {
      return new Us(e);
    };var Bs = Us,
        Vs = { IMAGE: "image", HYBRID: "hybrid", VECTOR: "vector" },
        Zs = { image: [fs.POLYGON, fs.CIRCLE, fs.LINE_STRING, fs.IMAGE, fs.TEXT], hybrid: [fs.POLYGON, fs.LINE_STRING] },
        Hs = { image: [fs.DEFAULT], hybrid: [fs.IMAGE, fs.TEXT, fs.DEFAULT], vector: Ts },
        qs = function (t) {
      function e(e) {
        t.call(this, e, !0), this.declutterTree_ = e.getDeclutter() ? cs()(9, void 0) : null, this.dirty_ = !1, this.renderedLayerRevision_, this.tmpTransform_ = [1, 0, 0, 1, 0, 0], this.zDirection = e.getRenderMode() == Vs.VECTOR ? 1 : 0, y(Ir, M.CLEAR, this.handleFontsChanged_, this);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        m(Ir, M.CLEAR, this.handleFontsChanged_, this), t.prototype.disposeInternal.call(this);
      }, e.prototype.getTile = function (e, i, n, o, r) {
        var s = t.prototype.getTile.call(this, e, i, n, o, r);return s.getState() === Jt.LOADED && (this.createReplayGroup_(s, o, r), this.context && this.renderTileImage_(s, o, r)), s;
      }, e.prototype.prepareFrame = function (e, i) {
        var n = this.getLayer(),
            o = n.getRevision();if (this.renderedLayerRevision_ != o) {
          this.renderedTiles.length = 0;var r = n.getRenderMode();this.context || r == Vs.VECTOR || (this.context = Nn()), this.context && r == Vs.VECTOR && (this.context = null);
        }return this.renderedLayerRevision_ = o, t.prototype.prepareFrame.apply(this, arguments);
      }, e.prototype.createReplayGroup_ = function (t, e, i) {
        var n = this,
            o = this.getLayer(),
            r = o.getRevision(),
            s = o.getRenderOrder() || null,
            a = t.getReplayState(o);if (a.dirty || a.renderedRevision != r || a.renderedRenderOrder != s) {
          for (var h = o.getSource(), l = h.getTileGrid(), u = h.getTileGridForProjection(i).getResolution(t.tileCoord[0]), c = t.extent, p = {}, d = function (r, d) {
            var f = t.getTile(t.tileKeys[r]);if (f.getState() == Jt.LOADED) {
              var _ = f.tileCoord,
                  g = l.getTileCoordExtent(_),
                  y = qe(c, g),
                  v = Ne(g, y) ? null : we(y, o.getRenderBuffer() * u, n.tmpExtent),
                  m = f.getProjection(),
                  E = !1;Di(i, m) || (E = !0, f.setProjection(i)), a.dirty = !1;var x = new Ns(0, y, u, e, h.getOverlaps(), n.declutterTree_, o.getRenderBuffer()),
                  C = Ws(u, e),
                  T = function (t) {
                var e,
                    i = t.getStyleFunction() || o.getStyleFunction();if (i && (e = i(t, u)), e) {
                  var n = this.renderFeature(t, C, e, x);this.dirty_ = this.dirty_ || n, a.dirty = a.dirty || n;
                }
              },
                  S = f.getFeatures();s && s !== a.renderedRenderOrder && S.sort(s);for (var R = 0, I = S.length; R < I; ++R) {
                var w = S[R];E && (m.getUnits() == ui.TILE_PIXELS && (m.setWorldExtent(g), m.setExtent(f.getExtent())), w.getGeometry().transform(m, i)), v && !ti(v, w.getGeometry().getExtent()) || T.call(n, w);
              }for (var O in x.finish(), x.getReplays()) p[O] = !0;f.setReplayGroup(o, t.tileCoord.toString(), x);
            }
          }, f = 0, _ = t.tileKeys.length; f < _; ++f) d(f);a.renderedRevision = r, a.renderedRenderOrder = s;
        }
      }, e.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r) {
        var s = e.viewState.resolution,
            a = e.viewState.rotation;i = void 0 == i ? 0 : i;var h,
            l,
            u,
            c,
            p,
            d = this.getLayer(),
            f = {},
            _ = this.renderedTiles;for (u = 0, c = _.length; u < c; ++u) {
          var g = _[u];if (Me(h = we(g.extent, i * s, h), t)) for (var y = 0, v = g.tileKeys.length; y < v; ++y) {
            var m = g.getTile(g.tileKeys[y]);m.getState() == Jt.LOADED && (p = m.getReplayGroup(d, g.tileCoord.toString()), l = l || p.forEachFeatureAtCoordinate(t, s, a, i, {}, function (t) {
              var e = o(t).toString();if (!(e in f)) return f[e] = !0, n.call(r, t, d);
            }, null));
          }
        }return l;
      }, e.prototype.getReplayTransform_ = function (t, e) {
        var i = this.getLayer().getSource().getTileGrid(),
            n = t.tileCoord,
            o = i.getResolution(n[0]),
            r = e.viewState,
            s = e.pixelRatio,
            a = r.resolution / s,
            h = i.getTileCoordExtent(n, this.tmpExtent),
            l = r.center,
            u = Je(h),
            c = e.size,
            p = Math.round(s * c[0] / 2),
            d = Math.round(s * c[1] / 2);return Vi(this.tmpTransform_, p, d, o / a, o / a, r.rotation, (u[0] - l[0]) / o, (l[1] - u[1]) / o);
      }, e.prototype.handleFontsChanged_ = function (t) {
        var e = this.getLayer();e.getVisible() && void 0 !== this.renderedLayerRevision_ && e.changed();
      }, e.prototype.handleStyleImageChange_ = function (t) {
        this.renderIfReadyAndVisible();
      }, e.prototype.postCompose = function (e, i, n) {
        var o = this.getLayer(),
            r = o.getRenderMode();if (r != Vs.IMAGE) {
          var s,
              a,
              h = o.getDeclutter() ? {} : null,
              l = o.getSource(),
              u = Hs[r],
              c = i.pixelRatio,
              p = i.viewState.rotation,
              d = i.size;p && Ar(e, -p, s = Math.round(c * d[0] / 2), a = Math.round(c * d[1] / 2)), h && this.declutterTree_.clear();for (var f = this.renderedTiles, _ = l.getTileGridForProjection(i.viewState.projection), g = [], y = [], v = f.length - 1; v >= 0; --v) {
            var m = f[v];if (m.getState() != Jt.ABORT) for (var E = m.tileCoord, x = _.getTileCoordExtent(E, this.tmpExtent)[0] - m.extent[0], C = void 0, T = 0, S = m.tileKeys.length; T < S; ++T) {
              var R = m.getTile(m.tileKeys[T]);if (R.getState() == Jt.LOADED) {
                var I = R.getReplayGroup(o, E.toString());if (I && I.hasReplays(u)) {
                  C || (C = this.getTransform(i, x));var w = R.tileCoord[0],
                      O = I.getClipCoords(C);e.save(), e.globalAlpha = n.opacity;for (var L = 0, M = g.length; L < M; ++L) {
                    var P = g[L];w < y[L] && (e.beginPath(), e.moveTo(O[0], O[1]), e.lineTo(O[2], O[3]), e.lineTo(O[4], O[5]), e.lineTo(O[6], O[7]), e.moveTo(P[6], P[7]), e.lineTo(P[4], P[5]), e.lineTo(P[2], P[3]), e.lineTo(P[0], P[1]), e.clip());
                  }I.replay(e, C, p, {}, u, h), e.restore(), g.push(O), y.push(w);
                }
              }
            }
          }h && function (t, e, i) {
            for (var n = Object.keys(t).map(Number).sort(bt), o = {}, r = 0, s = n.length; r < s; ++r) for (var a = t[n[r].toString()], h = 0, l = a.length; h < l;) {
              var u = a[h++],
                  c = a[h++];u.replay(e, c, i, o);
            }
          }(h, e, p), p && Ar(e, p, s, a);
        }t.prototype.postCompose.apply(this, arguments);
      }, e.prototype.renderFeature = function (t, e, i, n) {
        if (!i) return !1;var o = !1;if (Array.isArray(i)) for (var r = 0, s = i.length; r < s; ++r) o = zs(n, t, i[r], e, this.handleStyleImageChange_, this) || o;else o = zs(n, t, i, e, this.handleStyleImageChange_, this);return o;
      }, e.prototype.renderTileImage_ = function (t, e, i) {
        var n = this.getLayer(),
            o = t.getReplayState(n),
            r = n.getRevision(),
            s = Zs[n.getRenderMode()];if (s && o.renderedTileRevision !== r) {
          o.renderedTileRevision = r;var a = t.wrappedTileCoord,
              h = a[0],
              l = n.getSource(),
              u = l.getTileGridForProjection(i),
              c = u.getResolution(h),
              p = t.getContext(n),
              d = l.getTilePixelSize(h, e, i);p.canvas.width = d[0], p.canvas.height = d[1];for (var f = u.getTileCoordExtent(a, this.tmpExtent), _ = 0, g = t.tileKeys.length; _ < g; ++_) {
            var y = t.getTile(t.tileKeys[_]);if (y.getState() == Jt.LOADED) {
              var v = e / c,
                  m = Xi(this.tmpTransform_);Ui(m, v, -v), Bi(m, -f[0], -f[3]), y.getReplayGroup(n, t.tileCoord.toString()).replay(p, m, 0, {}, s);
            }
          }
        }
      }, e;
    }(ls);qs.handles = function (t) {
      return t.getType() === vr.VECTOR_TILE;
    }, qs.create = function (t, e) {
      return new qs(e);
    };var Js = qs,
        Qs = function (t) {
      function e(e) {
        (e = l({}, e)).controls || (e.controls = function (t) {
          var e = t || {},
              i = new N();return (void 0 === e.zoom || e.zoom) && i.push(new lo(e.zoomOptions)), (void 0 === e.rotate || e.rotate) && i.push(new ho(e.rotateOptions)), (void 0 === e.attribution || e.attribution) && i.push(new so(e.attributionOptions)), i;
        }()), e.interactions || (e.interactions = function (t) {
          var e = t || {},
              i = new N(),
              n = new co(-.005, .05, 100);return (void 0 === e.altShiftDragRotate || e.altShiftDragRotate) && i.push(new Ko()), (void 0 === e.doubleClickZoom || e.doubleClickZoom) && i.push(new Eo({ delta: e.zoomDelta, duration: e.zoomDuration })), (void 0 === e.dragPan || e.dragPan) && i.push(new Yo({ kinetic: n })), (void 0 === e.pinchRotate || e.pinchRotate) && i.push(new ur()), (void 0 === e.pinchZoom || e.pinchZoom) && i.push(new fr({ constrainResolution: e.constrainResolution, duration: e.zoomDuration })), (void 0 === e.keyboard || e.keyboard) && (i.push(new er()), i.push(new nr({ delta: e.zoomDelta, duration: e.zoomDuration }))), (void 0 === e.mouseWheelZoom || e.mouseWheelZoom) && i.push(new sr({ constrainResolution: e.constrainResolution, duration: e.zoomDuration })), (void 0 === e.shiftDragZoom || e.shiftDragZoom) && i.push(new Qo({ duration: e.zoomDuration })), i;
        }()), t.call(this, e);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createRenderer = function () {
        var t = new $r(this);return t.registerLayerRenderers([os, ls, Bs, Js]), t;
      }, e;
    }(Vn),
        $s = "preload",
        ta = "useInterimTilesOnError",
        ea = function (t) {
      function e(e) {
        var i = e || {},
            n = l({}, i);delete n.preload, delete n.useInterimTilesOnError, t.call(this, n), this.setPreload(void 0 !== i.preload ? i.preload : 0), this.setUseInterimTilesOnError(void 0 === i.useInterimTilesOnError || i.useInterimTilesOnError), this.type = vr.TILE;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getPreload = function () {
        return this.get($s);
      }, e.prototype.setPreload = function (t) {
        this.set($s, t);
      }, e.prototype.getUseInterimTilesOnError = function () {
        return this.get(ta);
      }, e.prototype.setUseInterimTilesOnError = function (t) {
        this.set(ta, t);
      }, e;
    }(oo);ea.prototype.getSource;var ia = ea,
        na = function (t) {
      function e(e, i, n) {
        t.call(this);var o = n || {};this.tileCoord = e, this.state = i, this.interimTile = null, this.key = "", this.transition_ = void 0 === o.transition ? 250 : o.transition, this.transitionStarts_ = {};
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.changed = function () {
        this.dispatchEvent(M.CHANGE);
      }, e.prototype.getKey = function () {
        return this.key + "/" + this.tileCoord;
      }, e.prototype.getInterimTile = function () {
        if (!this.interimTile) return this;var t = this.interimTile;do {
          if (t.getState() == Jt.LOADED) return t;t = t.interimTile;
        } while (t);return this;
      }, e.prototype.refreshInterimChain = function () {
        if (this.interimTile) {
          var t = this.interimTile,
              e = this;do {
            if (t.getState() == Jt.LOADED) {
              t.interimTile = null;break;
            }t.getState() == Jt.LOADING ? e = t : t.getState() == Jt.IDLE ? e.interimTile = t.interimTile : e = t, t = e.interimTile;
          } while (t);
        }
      }, e.prototype.getTileCoord = function () {
        return this.tileCoord;
      }, e.prototype.getState = function () {
        return this.state;
      }, e.prototype.setState = function (t) {
        this.state = t, this.changed();
      }, e.prototype.load = function () {}, e.prototype.getAlpha = function (t, e) {
        if (!this.transition_) return 1;var i = this.transitionStarts_[t];if (i) {
          if (-1 === i) return 1;
        } else i = e, this.transitionStarts_[t] = i;var n = e - i + 1e3 / 60;return n >= this.transition_ ? 1 : Ee(n / this.transition_);
      }, e.prototype.inTransition = function (t) {
        return !!this.transition_ && -1 !== this.transitionStarts_[t];
      }, e.prototype.endTransition = function (t) {
        this.transition_ && (this.transitionStarts_[t] = -1);
      }, e;
    }(L);function oa() {
      var t = Nn(1, 1);return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas;
    }var ra = function (t) {
      function e(e, i, n, o, r, s) {
        t.call(this, e, i, s), this.crossOrigin_ = o, this.src_ = n, this.image_ = new Image(), null !== o && (this.image_.crossOrigin = o), this.imageListenerKeys_ = null, this.tileLoadFunction_ = r;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        this.state == Jt.LOADING && (this.unlistenImage_(), this.image_ = oa()), this.interimTile && this.interimTile.dispose(), this.state = Jt.ABORT, this.changed(), t.prototype.disposeInternal.call(this);
      }, e.prototype.getImage = function () {
        return this.image_;
      }, e.prototype.getKey = function () {
        return this.src_;
      }, e.prototype.handleImageError_ = function () {
        this.state = Jt.ERROR, this.unlistenImage_(), this.image_ = oa(), this.changed();
      }, e.prototype.handleImageLoad_ = function () {
        this.image_.naturalWidth && this.image_.naturalHeight ? this.state = Jt.LOADED : this.state = Jt.EMPTY, this.unlistenImage_(), this.changed();
      }, e.prototype.load = function () {
        this.state == Jt.ERROR && (this.state = Jt.IDLE, this.image_ = new Image(), null !== this.crossOrigin_ && (this.image_.crossOrigin = this.crossOrigin_)), this.state == Jt.IDLE && (this.state = Jt.LOADING, this.changed(), this.imageListenerKeys_ = [v(this.image_, M.ERROR, this.handleImageError_, this), v(this.image_, M.LOAD, this.handleImageLoad_, this)], this.tileLoadFunction_(this, this.src_));
      }, e.prototype.unlistenImage_ = function () {
        this.imageListenerKeys_.forEach(E), this.imageListenerKeys_ = null;
      }, e;
    }(na);function sa(t, e, i, n) {
      return void 0 !== n ? (n[0] = t, n[1] = e, n[2] = i, n) : [t, e, i];
    }function aa(t, e, i) {
      return t + "/" + e + "/" + i;
    }function ha(t) {
      return aa(t[0], t[1], t[2]);
    }var la = function (t) {
      function e(e) {
        t.call(this, e);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.expireCache = function (t) {
        for (; this.canExpireCache();) {
          var e = this.peekLast(),
              i = e.tileCoord[0].toString();if (i in t && t[i].contains(e.tileCoord)) break;this.pop().dispose();
        }
      }, e.prototype.pruneExceptNewestZ = function () {
        if (0 !== this.getCount()) {
          var t = function (t) {
            return t.split("/").map(Number);
          }(this.peekFirstKey())[0];this.forEach(function (e) {
            e.tileCoord[0] !== t && (this.remove(ha(e.tileCoord)), e.dispose());
          }, this);
        }
      }, e;
    }(xr);function ua(t, e, i, n) {
      var o = i - t,
          r = n - e,
          s = Math.sqrt(o * o + r * r);return [Math.round(i + o / s), Math.round(n + r / s)];
    }function ca(t, e, i, n, o, r, s, a, h, l, u) {
      var c = Nn(Math.round(i * t), Math.round(i * e));if (0 === h.length) return c.canvas;c.scale(i, i);var p = [1 / 0, 1 / 0, -1 / 0, -1 / 0];h.forEach(function (t, e, i) {
        Ye(p, t.extent);
      });var d = $e(p),
          f = He(p),
          _ = Nn(Math.round(i * d / n), Math.round(i * f / n)),
          g = i / n;h.forEach(function (t, e, i) {
        var n = t.extent[0] - p[0],
            o = -(t.extent[3] - p[3]),
            r = $e(t.extent),
            s = He(t.extent);_.drawImage(t.image, l, l, t.image.width - 2 * l, t.image.height - 2 * l, n * g, o * g, r * g, s * g);
      });var y = Je(s);return a.getTriangles().forEach(function (t, e, o) {
        var s = t.source,
            a = t.target,
            h = s[0][0],
            l = s[0][1],
            u = s[1][0],
            d = s[1][1],
            f = s[2][0],
            g = s[2][1],
            v = (a[0][0] - y[0]) / r,
            m = -(a[0][1] - y[1]) / r,
            E = (a[1][0] - y[0]) / r,
            x = -(a[1][1] - y[1]) / r,
            C = (a[2][0] - y[0]) / r,
            T = -(a[2][1] - y[1]) / r,
            S = h,
            R = l;h = 0, l = 0;var I = function (t) {
          for (var e = t.length, i = 0; i < e; i++) {
            for (var n = i, o = Math.abs(t[i][i]), r = i + 1; r < e; r++) {
              var s = Math.abs(t[r][i]);s > o && (o = s, n = r);
            }if (0 === o) return null;var a = t[n];t[n] = t[i], t[i] = a;for (var h = i + 1; h < e; h++) for (var l = -t[h][i] / t[i][i], u = i; u < e + 1; u++) i == u ? t[h][u] = 0 : t[h][u] += l * t[i][u];
          }for (var c = new Array(e), p = e - 1; p >= 0; p--) {
            c[p] = t[p][e] / t[p][p];for (var d = p - 1; d >= 0; d--) t[d][e] -= t[d][p] * c[p];
          }return c;
        }([[u -= S, d -= R, 0, 0, E - v], [f -= S, g -= R, 0, 0, C - v], [0, 0, u, d, x - m], [0, 0, f, g, T - m]]);if (I) {
          c.save(), c.beginPath();var w = (v + E + C) / 3,
              O = (m + x + T) / 3,
              L = ua(w, O, v, m),
              M = ua(w, O, E, x),
              P = ua(w, O, C, T);c.moveTo(M[0], M[1]), c.lineTo(L[0], L[1]), c.lineTo(P[0], P[1]), c.clip(), c.transform(I[0], I[2], I[1], I[3], v, m), c.translate(p[0] - S, p[3] - R), c.scale(n / i, -n / i), c.drawImage(_.canvas, 0, 0), c.restore();
        }
      }), u && (c.save(), c.strokeStyle = "black", c.lineWidth = 1, a.getTriangles().forEach(function (t, e, i) {
        var n = t.target,
            o = (n[0][0] - y[0]) / r,
            s = -(n[0][1] - y[1]) / r,
            a = (n[1][0] - y[0]) / r,
            h = -(n[1][1] - y[1]) / r,
            l = (n[2][0] - y[0]) / r,
            u = -(n[2][1] - y[1]) / r;c.beginPath(), c.moveTo(a, h), c.lineTo(o, s), c.lineTo(l, u), c.closePath(), c.stroke();
      }), c.restore()), c.canvas;
    }var pa = function (t, e, i, n, o) {
      this.sourceProj_ = t, this.targetProj_ = e;var r = {},
          s = ki(this.targetProj_, this.sourceProj_);this.transformInv_ = function (t) {
        var e = t[0] + "/" + t[1];return r[e] || (r[e] = s(t)), r[e];
      }, this.maxSourceExtent_ = n, this.errorThresholdSquared_ = o * o, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!n && !!this.sourceProj_.getExtent() && $e(n) == $e(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? $e(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? $e(this.targetProj_.getExtent()) : null;var a = Je(i),
          h = Qe(i),
          l = Be(i),
          u = Ue(i),
          c = this.transformInv_(a),
          p = this.transformInv_(h),
          d = this.transformInv_(l),
          f = this.transformInv_(u);if (this.addQuad_(a, h, l, u, c, p, d, f, 10), this.wrapsXInSource_) {
        var _ = 1 / 0;this.triangles_.forEach(function (t, e, i) {
          _ = Math.min(_, t.source[0][0], t.source[1][0], t.source[2][0]);
        }), this.triangles_.forEach(function (t) {
          if (Math.max(t.source[0][0], t.source[1][0], t.source[2][0]) - _ > this.sourceWorldWidth_ / 2) {
            var e = [[t.source[0][0], t.source[0][1]], [t.source[1][0], t.source[1][1]], [t.source[2][0], t.source[2][1]]];e[0][0] - _ > this.sourceWorldWidth_ / 2 && (e[0][0] -= this.sourceWorldWidth_), e[1][0] - _ > this.sourceWorldWidth_ / 2 && (e[1][0] -= this.sourceWorldWidth_), e[2][0] - _ > this.sourceWorldWidth_ / 2 && (e[2][0] -= this.sourceWorldWidth_);var i = Math.min(e[0][0], e[1][0], e[2][0]);Math.max(e[0][0], e[1][0], e[2][0]) - i < this.sourceWorldWidth_ / 2 && (t.source = e);
          }
        }.bind(this));
      }r = {};
    };pa.prototype.addTriangle_ = function (t, e, i, n, o, r) {
      this.triangles_.push({ source: [n, o, r], target: [t, e, i] });
    }, pa.prototype.addQuad_ = function (t, e, i, n, o, r, s, a, h) {
      var l = Ie([o, r, s, a]),
          u = this.sourceWorldWidth_ ? $e(l) / this.sourceWorldWidth_ : null,
          c = this.sourceWorldWidth_,
          p = this.sourceProj_.canWrapX() && u > .5 && u < 1,
          d = !1;if (h > 0) {
        if (this.targetProj_.isGlobal() && this.targetWorldWidth_) d |= $e(Ie([t, e, i, n])) / this.targetWorldWidth_ > .25;!p && this.sourceProj_.isGlobal() && u && (d |= u > .25);
      }if (d || !this.maxSourceExtent_ || ti(l, this.maxSourceExtent_)) {
        if (!(d || isFinite(o[0]) && isFinite(o[1]) && isFinite(r[0]) && isFinite(r[1]) && isFinite(s[0]) && isFinite(s[1]) && isFinite(a[0]) && isFinite(a[1]))) {
          if (!(h > 0)) return;d = !0;
        }if (h > 0) {
          if (!d) {
            var f,
                _ = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2],
                g = this.transformInv_(_);if (p) f = (he(o[0], c) + he(s[0], c)) / 2 - he(g[0], c);else f = (o[0] + s[0]) / 2 - g[0];var y = (o[1] + s[1]) / 2 - g[1];d = f * f + y * y > this.errorThresholdSquared_;
          }if (d) {
            if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
              var v = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2],
                  m = this.transformInv_(v),
                  E = [(n[0] + t[0]) / 2, (n[1] + t[1]) / 2],
                  x = this.transformInv_(E);this.addQuad_(t, e, v, E, o, r, m, x, h - 1), this.addQuad_(E, v, i, n, x, m, s, a, h - 1);
            } else {
              var C = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2],
                  T = this.transformInv_(C),
                  S = [(i[0] + n[0]) / 2, (i[1] + n[1]) / 2],
                  R = this.transformInv_(S);this.addQuad_(t, C, S, n, o, T, R, a, h - 1), this.addQuad_(C, e, i, S, T, r, s, R, h - 1);
            }return;
          }
        }if (p) {
          if (!this.canWrapXInSource_) return;this.wrapsXInSource_ = !0;
        }this.addTriangle_(t, i, n, o, s, a), this.addTriangle_(t, e, i, o, r, s);
      }
    }, pa.prototype.calculateSourceExtent = function () {
      var t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];return this.triangles_.forEach(function (e, i, n) {
        var o = e.source;Xe(t, o[0]), Xe(t, o[1]), Xe(t, o[2]);
      }), t;
    }, pa.prototype.getTriangles = function () {
      return this.triangles_;
    };var da = pa,
        fa = function (t) {
      function e(e, i, n, o, r, s, a, h, l, u, c) {
        t.call(this, r, Jt.IDLE), this.renderEdges_ = void 0 !== c && c, this.pixelRatio_ = a, this.gutter_ = h, this.canvas_ = null, this.sourceTileGrid_ = i, this.targetTileGrid_ = o, this.wrappedTileCoord_ = s || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;var p = o.getTileCoordExtent(this.wrappedTileCoord_),
            d = this.targetTileGrid_.getExtent(),
            f = this.sourceTileGrid_.getExtent(),
            _ = d ? qe(p, d) : p;if (0 !== ze(_)) {
          var g = e.getExtent();g && (f = f ? qe(f, g) : g);var y = o.getResolution(this.wrappedTileCoord_[0]),
              v = function (t, e, i, n) {
            var o = Ni(i, e, t),
                r = Fi(e, n, i),
                s = e.getMetersPerUnit();void 0 !== s && (r *= s);var a = t.getMetersPerUnit();void 0 !== a && (r /= a);var h = t.getExtent();if (!h || Me(h, o)) {
              var l = Fi(t, r, o) / r;isFinite(l) && l > 0 && (r /= l);
            }return r;
          }(e, n, Ve(_), y);if (!isFinite(v) || v <= 0) this.state = Jt.EMPTY;else {
            var m = void 0 !== u ? u : _r;if (this.triangulation_ = new da(e, n, _, f, v * m), 0 !== this.triangulation_.getTriangles().length) {
              this.sourceZ_ = i.getZForResolution(v);var E = this.triangulation_.calculateSourceExtent();if (f && (e.canWrapX() ? (E[1] = ne(E[1], f[1], f[3]), E[3] = ne(E[3], f[1], f[3])) : E = qe(E, f)), ze(E)) {
                for (var x = i.getTileRangeForExtentAndZ(E, this.sourceZ_), C = x.minX; C <= x.maxX; C++) for (var T = x.minY; T <= x.maxY; T++) {
                  var S = l(this.sourceZ_, C, T, a);S && this.sourceTiles_.push(S);
                }0 === this.sourceTiles_.length && (this.state = Jt.EMPTY);
              } else this.state = Jt.EMPTY;
            } else this.state = Jt.EMPTY;
          }
        } else this.state = Jt.EMPTY;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.disposeInternal = function () {
        this.state == Jt.LOADING && this.unlistenSources_(), t.prototype.disposeInternal.call(this);
      }, e.prototype.getImage = function () {
        return this.canvas_;
      }, e.prototype.reproject_ = function () {
        var t = [];if (this.sourceTiles_.forEach(function (e, i, n) {
          e && e.getState() == Jt.LOADED && t.push({ extent: this.sourceTileGrid_.getTileCoordExtent(e.tileCoord), image: e.getImage() });
        }.bind(this)), this.sourceTiles_.length = 0, 0 === t.length) this.state = Jt.ERROR;else {
          var e = this.wrappedTileCoord_[0],
              i = this.targetTileGrid_.getTileSize(e),
              n = "number" == typeof i ? i : i[0],
              o = "number" == typeof i ? i : i[1],
              r = this.targetTileGrid_.getResolution(e),
              s = this.sourceTileGrid_.getResolution(this.sourceZ_),
              a = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);this.canvas_ = ca(n, o, this.pixelRatio_, s, this.sourceTileGrid_.getExtent(), r, a, this.triangulation_, t, this.gutter_, this.renderEdges_), this.state = Jt.LOADED;
        }this.changed();
      }, e.prototype.load = function () {
        if (this.state == Jt.IDLE) {
          this.state = Jt.LOADING, this.changed();var t = 0;this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(function (e, i, n) {
            var o = e.getState();if (o == Jt.IDLE || o == Jt.LOADING) {
              t++;var r = y(e, M.CHANGE, function (i) {
                var n = e.getState();n != Jt.LOADED && n != Jt.ERROR && n != Jt.EMPTY || (E(r), 0 === --t && (this.unlistenSources_(), this.reproject_()));
              }, this);this.sourcesListenerKeys_.push(r);
            }
          }.bind(this)), this.sourceTiles_.forEach(function (t, e, i) {
            t.getState() == Jt.IDLE && t.load();
          }), 0 === t && setTimeout(this.reproject_.bind(this), 0);
        }
      }, e.prototype.unlistenSources_ = function () {
        this.sourcesListenerKeys_.forEach(E), this.sourcesListenerKeys_ = null;
      }, e;
    }(na);function _a(t, e) {
      var i = /\{z\}/g,
          n = /\{x\}/g,
          o = /\{y\}/g,
          r = /\{-y\}/g;return function (s, a, h) {
        return s ? t.replace(i, s[0].toString()).replace(n, s[1].toString()).replace(o, function () {
          return (-s[2] - 1).toString();
        }).replace(r, function () {
          var t = s[0],
              i = e.getFullTileRange(t);return Qt(i, 55), (i.getHeight() + s[2]).toString();
        }) : void 0;
      };
    }function ga(t, e) {
      for (var i = t.length, n = new Array(i), o = 0; o < i; ++o) n[o] = _a(t[o], e);return function (t) {
        if (1 === t.length) return t[0];return function (e, i, n) {
          if (e) {
            var o = function (t) {
              return (t[1] << t[0]) + t[2];
            }(e),
                r = he(o, t.length);return t[r](e, i, n);
          }
        };
      }(n);
    }function ya(t, e, i) {}var va = function (t) {
      function e(e) {
        t.call(this), this.projection_ = Pi(e.projection), this.attributions_ = this.adaptAttributions_(e.attributions), this.state_ = void 0 !== e.state ? e.state : Kn.READY, this.wrapX_ = void 0 !== e.wrapX && e.wrapX;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.adaptAttributions_ = function (t) {
        return t ? Array.isArray(t) ? function (e) {
          return t;
        } : "function" == typeof t ? t : function (e) {
          return [t];
        } : null;
      }, e.prototype.getAttributions = function () {
        return this.attributions_;
      }, e.prototype.getProjection = function () {
        return this.projection_;
      }, e.prototype.getResolutions = function () {}, e.prototype.getState = function () {
        return this.state_;
      }, e.prototype.getWrapX = function () {
        return this.wrapX_;
      }, e.prototype.refresh = function () {
        this.changed();
      }, e.prototype.setAttributions = function (t) {
        this.attributions_ = this.adaptAttributions_(t), this.changed();
      }, e.prototype.setState = function (t) {
        this.state_ = t, this.changed();
      }, e;
    }(D);va.prototype.forEachFeatureAtCoordinate = T;var ma = va,
        Ea = [0, 0, 0],
        xa = function (t) {
      var e;if (this.minZoom = void 0 !== t.minZoom ? t.minZoom : 0, this.resolutions_ = t.resolutions, Qt(function (t, e, i) {
        var n = e || bt;return t.every(function (e, o) {
          if (0 === o) return !0;var r = n(t[o - 1], e);return !(r > 0 || i && 0 === r);
        });
      }(this.resolutions_, function (t, e) {
        return e - t;
      }, !0), 17), !t.origins) for (var i = 0, n = this.resolutions_.length - 1; i < n; ++i) if (e) {
        if (this.resolutions_[i] / this.resolutions_[i + 1] !== e) {
          e = void 0;break;
        }
      } else e = this.resolutions_[i] / this.resolutions_[i + 1];this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = void 0 !== t.origin ? t.origin : null, this.origins_ = null, void 0 !== t.origins && (this.origins_ = t.origins, Qt(this.origins_.length == this.resolutions_.length, 20));var o = t.extent;void 0 === o || this.origin_ || this.origins_ || (this.origin_ = Je(o)), Qt(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18), this.tileSizes_ = null, void 0 !== t.tileSizes && (this.tileSizes_ = t.tileSizes, Qt(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = void 0 !== t.tileSize ? t.tileSize : this.tileSizes_ ? null : ie, Qt(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22), this.extent_ = void 0 !== o ? o : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], void 0 !== t.sizes ? this.fullTileRanges_ = t.sizes.map(function (t, e) {
        return new as(Math.min(0, t[0]), Math.max(t[0] - 1, -1), Math.min(0, t[1]), Math.max(t[1] - 1, -1));
      }, this) : o && this.calculateTileRanges_(o);
    };xa.prototype.forEachTileCoord = function (t, e, i) {
      for (var n = this.getTileRangeForExtentAndZ(t, e), o = n.minX, r = n.maxX; o <= r; ++o) for (var s = n.minY, a = n.maxY; s <= a; ++s) i([e, o, s]);
    }, xa.prototype.forEachTileCoordParentTileRange = function (t, e, i, n, o) {
      var r,
          s,
          a,
          h = null,
          l = t[0] - 1;for (2 === this.zoomFactor_ ? (s = t[1], a = t[2]) : h = this.getTileCoordExtent(t, o); l >= this.minZoom;) {
        if (r = 2 === this.zoomFactor_ ? ss(s = Math.floor(s / 2), s, a = Math.floor(a / 2), a, n) : this.getTileRangeForExtentAndZ(h, l, n), e.call(i, l, r)) return !0;--l;
      }return !1;
    }, xa.prototype.getExtent = function () {
      return this.extent_;
    }, xa.prototype.getMaxZoom = function () {
      return this.maxZoom;
    }, xa.prototype.getMinZoom = function () {
      return this.minZoom;
    }, xa.prototype.getOrigin = function (t) {
      return this.origin_ ? this.origin_ : this.origins_[t];
    }, xa.prototype.getResolution = function (t) {
      return this.resolutions_[t];
    }, xa.prototype.getResolutions = function () {
      return this.resolutions_;
    }, xa.prototype.getTileCoordChildTileRange = function (t, e, i) {
      if (t[0] < this.maxZoom) {
        if (2 === this.zoomFactor_) {
          var n = 2 * t[1],
              o = 2 * t[2];return ss(n, n + 1, o, o + 1, e);
        }var r = this.getTileCoordExtent(t, i);return this.getTileRangeForExtentAndZ(r, t[0] + 1, e);
      }return null;
    }, xa.prototype.getTileRangeExtent = function (t, e, i) {
      var n = this.getOrigin(t),
          o = this.getResolution(t),
          r = Bn(this.getTileSize(t), this.tmpSize_),
          s = n[0] + e.minX * r[0] * o,
          a = n[0] + (e.maxX + 1) * r[0] * o;return De(s, n[1] + e.minY * r[1] * o, a, n[1] + (e.maxY + 1) * r[1] * o, i);
    }, xa.prototype.getTileRangeForExtentAndZ = function (t, e, i) {
      var n = Ea;this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, n);var o = n[1],
          r = n[2];return this.getTileCoordForXYAndZ_(t[2], t[3], e, !0, n), ss(o, n[1], r, n[2], i);
    }, xa.prototype.getTileCoordCenter = function (t) {
      var e = this.getOrigin(t[0]),
          i = this.getResolution(t[0]),
          n = Bn(this.getTileSize(t[0]), this.tmpSize_);return [e[0] + (t[1] + .5) * n[0] * i, e[1] + (t[2] + .5) * n[1] * i];
    }, xa.prototype.getTileCoordExtent = function (t, e) {
      var i = this.getOrigin(t[0]),
          n = this.getResolution(t[0]),
          o = Bn(this.getTileSize(t[0]), this.tmpSize_),
          r = i[0] + t[1] * o[0] * n,
          s = i[1] + t[2] * o[1] * n;return De(r, s, r + o[0] * n, s + o[1] * n, e);
    }, xa.prototype.getTileCoordForCoordAndResolution = function (t, e, i) {
      return this.getTileCoordForXYAndResolution_(t[0], t[1], e, !1, i);
    }, xa.prototype.getTileCoordForXYAndResolution_ = function (t, e, i, n, o) {
      var r = this.getZForResolution(i),
          s = i / this.getResolution(r),
          a = this.getOrigin(r),
          h = Bn(this.getTileSize(r), this.tmpSize_),
          l = n ? .5 : 0,
          u = n ? 0 : .5,
          c = Math.floor((t - a[0]) / i + l),
          p = Math.floor((e - a[1]) / i + u),
          d = s * c / h[0],
          f = s * p / h[1];return n ? (d = Math.ceil(d) - 1, f = Math.ceil(f) - 1) : (d = Math.floor(d), f = Math.floor(f)), sa(r, d, f, o);
    }, xa.prototype.getTileCoordForXYAndZ_ = function (t, e, i, n, o) {
      var r = this.getOrigin(i),
          s = this.getResolution(i),
          a = Bn(this.getTileSize(i), this.tmpSize_),
          h = n ? .5 : 0,
          l = n ? 0 : .5,
          u = Math.floor((t - r[0]) / s + h),
          c = Math.floor((e - r[1]) / s + l),
          p = u / a[0],
          d = c / a[1];return n ? (p = Math.ceil(p) - 1, d = Math.ceil(d) - 1) : (p = Math.floor(p), d = Math.floor(d)), sa(i, p, d, o);
    }, xa.prototype.getTileCoordForCoordAndZ = function (t, e, i) {
      return this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, i);
    }, xa.prototype.getTileCoordResolution = function (t) {
      return this.resolutions_[t[0]];
    }, xa.prototype.getTileSize = function (t) {
      return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
    }, xa.prototype.getFullTileRange = function (t) {
      return this.fullTileRanges_ ? this.fullTileRanges_[t] : null;
    }, xa.prototype.getZForResolution = function (t, e) {
      return ne(Dt(this.resolutions_, t, e || 0), this.minZoom, this.maxZoom);
    }, xa.prototype.calculateTileRanges_ = function (t) {
      for (var e = this.resolutions_.length, i = new Array(e), n = this.minZoom; n < e; ++n) i[n] = this.getTileRangeForExtentAndZ(t, n);this.fullTileRanges_ = i;
    };var Ca = xa;function Ta(t) {
      var e = t.getDefaultTileGrid();return e || (e = function (t, e, i, n) {
        return function (t, e, i, n) {
          var o = void 0 !== n ? n : Se.TOP_LEFT,
              r = Sa(t, e, i);return new Ca({ extent: t, origin: function (t, e) {
              var i;return e === Se.BOTTOM_LEFT ? i = Ue(t) : e === Se.BOTTOM_RIGHT ? i = Be(t) : e === Se.TOP_LEFT ? i = Je(t) : e === Se.TOP_RIGHT ? i = Qe(t) : Qt(!1, 13), i;
            }(t, o), resolutions: r, tileSize: i });
        }(Ra(t), e, i, n);
      }(t), t.setDefaultTileGrid(e)), e;
    }function Sa(t, e, i) {
      for (var n = void 0 !== e ? e : ee, o = He(t), r = $e(t), s = Bn(void 0 !== i ? i : ie), a = Math.max(r / s[0], o / s[1]), h = n + 1, l = new Array(h), u = 0; u < h; ++u) l[u] = a / Math.pow(2, u);return l;
    }function Ra(t) {
      var e = (t = Pi(t)).getExtent();if (!e) {
        var i = 180 * li[ui.DEGREES] / t.getMetersPerUnit();e = De(-i, -i, i, i);
      }return e;
    }var Ia = function (t) {
      function e(e) {
        t.call(this, { attributions: e.attributions, extent: e.extent, projection: e.projection, state: e.state, wrapX: e.wrapX }), this.opaque_ = void 0 !== e.opaque && e.opaque, this.tilePixelRatio_ = void 0 !== e.tilePixelRatio ? e.tilePixelRatio : 1, this.tileGrid = void 0 !== e.tileGrid ? e.tileGrid : null, this.tileCache = new la(e.cacheSize), this.tmpSize = [0, 0], this.key_ = "", this.tileOptions = { transition: e.transition };
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.canExpireCache = function () {
        return this.tileCache.canExpireCache();
      }, e.prototype.expireCache = function (t, e) {
        var i = this.getTileCacheForProjection(t);i && i.expireCache(e);
      }, e.prototype.forEachLoadedTile = function (t, e, i, n) {
        var o = this.getTileCacheForProjection(t);if (!o) return !1;for (var r, s, a, h = !0, l = i.minX; l <= i.maxX; ++l) for (var u = i.minY; u <= i.maxY; ++u) s = aa(e, l, u), a = !1, o.containsKey(s) && (a = (r = o.get(s)).getState() === Jt.LOADED) && (a = !1 !== n(r)), a || (h = !1);return h;
      }, e.prototype.getGutter = function (t) {
        return 0;
      }, e.prototype.getKey = function () {
        return this.key_;
      }, e.prototype.setKey = function (t) {
        this.key_ !== t && (this.key_ = t, this.changed());
      }, e.prototype.getOpaque = function (t) {
        return this.opaque_;
      }, e.prototype.getResolutions = function () {
        return this.tileGrid.getResolutions();
      }, e.prototype.getTile = function (t, e, i, n, o) {}, e.prototype.getTileGrid = function () {
        return this.tileGrid;
      }, e.prototype.getTileGridForProjection = function (t) {
        return this.tileGrid ? this.tileGrid : Ta(t);
      }, e.prototype.getTileCacheForProjection = function (t) {
        var e = this.getProjection();return e && !Di(e, t) ? null : this.tileCache;
      }, e.prototype.getTilePixelRatio = function (t) {
        return this.tilePixelRatio_;
      }, e.prototype.getTilePixelSize = function (t, e, i) {
        var n = this.getTileGridForProjection(i),
            o = this.getTilePixelRatio(e),
            r = Bn(n.getTileSize(t), this.tmpSize);return 1 == o ? r : function (t, e, i) {
          return void 0 === i && (i = [0, 0]), i[0] = t[0] * e + .5 | 0, i[1] = t[1] * e + .5 | 0, i;
        }(r, o, this.tmpSize);
      }, e.prototype.getTileCoordForTileUrlFunction = function (t, e) {
        var i = void 0 !== e ? e : this.getProjection(),
            n = this.getTileGridForProjection(i);return this.getWrapX() && i.isGlobal() && (t = function (t, e, i) {
          var n = e[0],
              o = t.getTileCoordCenter(e),
              r = Ra(i);if (Me(r, o)) return e;var s = $e(r),
              a = Math.ceil((r[0] - o[0]) / s);return o[0] += s * a, t.getTileCoordForCoordAndZ(o, n);
        }(n, t, i)), function (t, e) {
          var i = t[0],
              n = t[1],
              o = t[2];if (e.getMinZoom() > i || i > e.getMaxZoom()) return !1;var r,
              s = e.getExtent();return !(r = s ? e.getTileRangeForExtentAndZ(s, i) : e.getFullTileRange(i)) || r.containsXY(n, o);
        }(t, n) ? t : null;
      }, e.prototype.refresh = function () {
        this.tileCache.clear(), this.changed();
      }, e;
    }(ma);Ia.prototype.useTile = T;var wa = function (t) {
      function e(e, i) {
        t.call(this, e), this.tile = i;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O),
        Oa = "tileloadstart",
        La = "tileloadend",
        Ma = "tileloaderror",
        Pa = function (t) {
      function e(e) {
        t.call(this, { attributions: e.attributions, cacheSize: e.cacheSize, extent: e.extent, opaque: e.opaque, projection: e.projection, state: e.state, tileGrid: e.tileGrid, tilePixelRatio: e.tilePixelRatio, wrapX: e.wrapX, transition: e.transition }), this.tileLoadFunction = e.tileLoadFunction, this.tileUrlFunction = this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : ya, this.urls = null, e.urls ? this.setUrls(e.urls) : e.url && this.setUrl(e.url), e.tileUrlFunction && this.setTileUrlFunction(e.tileUrlFunction), this.tileLoadingKeys_ = {};
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getTileLoadFunction = function () {
        return this.tileLoadFunction;
      }, e.prototype.getTileUrlFunction = function () {
        return this.tileUrlFunction;
      }, e.prototype.getUrls = function () {
        return this.urls;
      }, e.prototype.handleTileChange = function (t) {
        var e,
            i = t.target,
            n = o(i),
            r = i.getState();r == Jt.LOADING ? (this.tileLoadingKeys_[n] = !0, e = Oa) : n in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[n], e = r == Jt.ERROR ? Ma : r == Jt.LOADED || r == Jt.ABORT ? La : void 0), void 0 != e && this.dispatchEvent(new wa(e, i));
      }, e.prototype.setTileLoadFunction = function (t) {
        this.tileCache.clear(), this.tileLoadFunction = t, this.changed();
      }, e.prototype.setTileUrlFunction = function (t, e) {
        this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), void 0 !== e ? this.setKey(e) : this.changed();
      }, e.prototype.setUrl = function (t) {
        var e = this.urls = function (t) {
          var e = [],
              i = /\{([a-z])-([a-z])\}/.exec(t);if (i) {
            var n,
                o = i[1].charCodeAt(0),
                r = i[2].charCodeAt(0);for (n = o; n <= r; ++n) e.push(t.replace(i[0], String.fromCharCode(n)));return e;
          }if (i = i = /\{(\d+)-(\d+)\}/.exec(t)) {
            for (var s = parseInt(i[2], 10), a = parseInt(i[1], 10); a <= s; a++) e.push(t.replace(i[0], a.toString()));return e;
          }return e.push(t), e;
        }(t);this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : ga(e, this.tileGrid), t);
      }, e.prototype.setUrls = function (t) {
        this.urls = t;var e = t.join("\n");this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : ga(t, this.tileGrid), e);
      }, e.prototype.useTile = function (t, e, i) {
        var n = aa(t, e, i);this.tileCache.containsKey(n) && this.tileCache.get(n);
      }, e;
    }(Ia);function Fa(t, e) {
      t.getImage().src = e;
    }Pa.prototype.fixedTileUrlFunction;var ba = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
        Aa = function (t) {
      function e(e) {
        var i,
            n = e || {};i = void 0 !== n.attributions ? n.attributions : [ba];var o = void 0 !== n.crossOrigin ? n.crossOrigin : "anonymous",
            r = void 0 !== n.url ? n.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";t.call(this, { attributions: i, cacheSize: n.cacheSize, crossOrigin: o, opaque: void 0 === n.opaque || n.opaque, maxZoom: void 0 !== n.maxZoom ? n.maxZoom : 19, reprojectionErrorThreshold: n.reprojectionErrorThreshold, tileLoadFunction: n.tileLoadFunction, url: r, wrapX: n.wrapX });
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(function (t) {
      function e(e) {
        var i = e || {},
            n = void 0 !== i.projection ? i.projection : "EPSG:3857",
            o = void 0 !== i.tileGrid ? i.tileGrid : function (t) {
          var e = {};return l(e, void 0 !== t ? t : {}), void 0 === e.extent && (e.extent = Pi("EPSG:3857").getExtent()), e.resolutions = Sa(e.extent, e.maxZoom, e.tileSize), delete e.maxZoom, new Ca(e);
        }({ extent: Ra(n), maxZoom: i.maxZoom, minZoom: i.minZoom, tileSize: i.tileSize });t.call(this, { attributions: i.attributions, cacheSize: i.cacheSize, crossOrigin: i.crossOrigin, opaque: i.opaque, projection: n, reprojectionErrorThreshold: i.reprojectionErrorThreshold, tileGrid: o, tileLoadFunction: i.tileLoadFunction, tilePixelRatio: i.tilePixelRatio, tileUrlFunction: i.tileUrlFunction, url: i.url, urls: i.urls, wrapX: void 0 === i.wrapX || i.wrapX, transition: i.transition });
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(function (t) {
      function e(e) {
        t.call(this, { attributions: e.attributions, cacheSize: e.cacheSize, extent: e.extent, opaque: e.opaque, projection: e.projection, state: e.state, tileGrid: e.tileGrid, tileLoadFunction: e.tileLoadFunction ? e.tileLoadFunction : Fa, tilePixelRatio: e.tilePixelRatio, tileUrlFunction: e.tileUrlFunction, url: e.url, urls: e.urls, wrapX: e.wrapX, transition: e.transition }), this.crossOrigin = void 0 !== e.crossOrigin ? e.crossOrigin : null, this.tileClass = void 0 !== e.tileClass ? e.tileClass : ra, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = e.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.canExpireCache = function () {
        if (this.tileCache.canExpireCache()) return !0;for (var t in this.tileCacheForProjection) if (this.tileCacheForProjection[t].canExpireCache()) return !0;return !1;
      }, e.prototype.expireCache = function (t, e) {
        var i = this.getTileCacheForProjection(t);for (var n in this.tileCache.expireCache(this.tileCache == i ? e : {}), this.tileCacheForProjection) {
          var o = this.tileCacheForProjection[n];o.expireCache(o == i ? e : {});
        }
      }, e.prototype.getGutter = function (t) {
        return this.getProjection() && t && !Di(this.getProjection(), t) ? 0 : this.getGutterInternal();
      }, e.prototype.getGutterInternal = function () {
        return 0;
      }, e.prototype.getOpaque = function (e) {
        return !(this.getProjection() && e && !Di(this.getProjection(), e)) && t.prototype.getOpaque.call(this, e);
      }, e.prototype.getTileGridForProjection = function (t) {
        var e = this.getProjection();if (!this.tileGrid || e && !Di(e, t)) {
          var i = o(t).toString();return i in this.tileGridForProjection || (this.tileGridForProjection[i] = Ta(t)), this.tileGridForProjection[i];
        }return this.tileGrid;
      }, e.prototype.getTileCacheForProjection = function (t) {
        var e = this.getProjection();if (!e || Di(e, t)) return this.tileCache;var i = o(t).toString();return i in this.tileCacheForProjection || (this.tileCacheForProjection[i] = new la(this.tileCache.highWaterMark)), this.tileCacheForProjection[i];
      }, e.prototype.createTile_ = function (t, e, i, n, o, r) {
        var s = [t, e, i],
            a = this.getTileCoordForTileUrlFunction(s, o),
            h = a ? this.tileUrlFunction(a, n, o) : void 0,
            l = new this.tileClass(s, void 0 !== h ? Jt.IDLE : Jt.EMPTY, void 0 !== h ? h : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);return l.key = r, y(l, M.CHANGE, this.handleTileChange, this), l;
      }, e.prototype.getTile = function (t, e, i, n, o) {
        var r = this.getProjection();if (r && o && !Di(r, o)) {
          var s,
              a = this.getTileCacheForProjection(o),
              h = [t, e, i],
              l = ha(h);a.containsKey(l) && (s = a.get(l));var u = this.getKey();if (s && s.key == u) return s;var c = this.getTileGridForProjection(r),
              p = this.getTileGridForProjection(o),
              d = this.getTileCoordForTileUrlFunction(h, o),
              f = new fa(r, c, o, p, h, d, this.getTilePixelRatio(n), this.getGutterInternal(), function (t, e, i, n) {
            return this.getTileInternal(t, e, i, n, r);
          }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_);return f.key = u, s ? (f.interimTile = s, f.refreshInterimChain(), a.replace(l, f)) : a.set(l, f), f;
        }return this.getTileInternal(t, e, i, n, r || o);
      }, e.prototype.getTileInternal = function (t, e, i, n, o) {
        var r = null,
            s = aa(t, e, i),
            a = this.getKey();if (this.tileCache.containsKey(s)) {
          if ((r = this.tileCache.get(s)).key != a) {
            var h = r;r = this.createTile_(t, e, i, n, o, a), h.getState() == Jt.IDLE ? r.interimTile = h.interimTile : r.interimTile = h, r.refreshInterimChain(), this.tileCache.replace(s, r);
          }
        } else r = this.createTile_(t, e, i, n, o, a), this.tileCache.set(s, r);return r;
      }, e.prototype.setRenderReprojectionEdges = function (t) {
        if (this.renderReprojectionEdges_ != t) {
          for (var e in this.renderReprojectionEdges_ = t, this.tileCacheForProjection) this.tileCacheForProjection[e].clear();this.changed();
        }
      }, e.prototype.setTileGridForProjection = function (t, e) {
        var i = Pi(t);if (i) {
          var n = o(i).toString();n in this.tileGridForProjection || (this.tileGridForProjection[n] = e);
        }
      }, e;
    }(Pa))),
        Da = function (t) {
      this.opacity_ = t.opacity, this.rotateWithView_ = t.rotateWithView, this.rotation_ = t.rotation, this.scale_ = t.scale, this.snapToPixel_ = t.snapToPixel;
    };Da.prototype.getOpacity = function () {
      return this.opacity_;
    }, Da.prototype.getRotateWithView = function () {
      return this.rotateWithView_;
    }, Da.prototype.getRotation = function () {
      return this.rotation_;
    }, Da.prototype.getScale = function () {
      return this.scale_;
    }, Da.prototype.getSnapToPixel = function () {
      return this.snapToPixel_;
    }, Da.prototype.getAnchor = function () {}, Da.prototype.getImage = function (t) {}, Da.prototype.getHitDetectionImage = function (t) {}, Da.prototype.getImageState = function () {}, Da.prototype.getImageSize = function () {}, Da.prototype.getHitDetectionImageSize = function () {}, Da.prototype.getOrigin = function () {}, Da.prototype.getSize = function () {}, Da.prototype.setOpacity = function (t) {
      this.opacity_ = t;
    }, Da.prototype.setRotateWithView = function (t) {
      this.rotateWithView_ = t;
    }, Da.prototype.setRotation = function (t) {
      this.rotation_ = t;
    }, Da.prototype.setScale = function (t) {
      this.scale_ = t;
    }, Da.prototype.setSnapToPixel = function (t) {
      this.snapToPixel_ = t;
    }, Da.prototype.listenImageChange = function (t, e) {}, Da.prototype.load = function () {}, Da.prototype.unlistenImageChange = function (t, e) {};var Ga = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { points: 1 / 0, fill: i.fill, radius: i.radius, snapToPixel: i.snapToPixel, stroke: i.stroke, atlasManager: i.atlasManager });
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {
        var t = new e({ fill: this.getFill() ? this.getFill().clone() : void 0, stroke: this.getStroke() ? this.getStroke().clone() : void 0, radius: this.getRadius(), snapToPixel: this.getSnapToPixel(), atlasManager: this.atlasManager_ });return t.setOpacity(this.getOpacity()), t.setScale(this.getScale()), t;
      }, e.prototype.setRadius = function (t) {
        this.radius_ = t, this.render_(this.atlasManager_);
      }, e;
    }(function (t) {
      function e(e) {
        var i = void 0 === e.snapToPixel || e.snapToPixel,
            n = void 0 !== e.rotateWithView && e.rotateWithView;t.call(this, { opacity: 1, rotateWithView: n, rotation: void 0 !== e.rotation ? e.rotation : 0, scale: 1, snapToPixel: i }), this.checksums_ = null, this.canvas_ = null, this.hitDetectionCanvas_ = null, this.fill_ = void 0 !== e.fill ? e.fill : null, this.origin_ = [0, 0], this.points_ = e.points, this.radius_ = void 0 !== e.radius ? e.radius : e.radius1, this.radius2_ = e.radius2, this.angle_ = void 0 !== e.angle ? e.angle : 0, this.stroke_ = void 0 !== e.stroke ? e.stroke : null, this.anchor_ = null, this.size_ = null, this.imageSize_ = null, this.hitDetectionImageSize_ = null, this.atlasManager_ = e.atlasManager, this.render_(this.atlasManager_);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {
        var t = new e({ fill: this.getFill() ? this.getFill().clone() : void 0, points: this.getPoints(), radius: this.getRadius(), radius2: this.getRadius2(), angle: this.getAngle(), snapToPixel: this.getSnapToPixel(), stroke: this.getStroke() ? this.getStroke().clone() : void 0, rotation: this.getRotation(), rotateWithView: this.getRotateWithView(), atlasManager: this.atlasManager_ });return t.setOpacity(this.getOpacity()), t.setScale(this.getScale()), t;
      }, e.prototype.getAnchor = function () {
        return this.anchor_;
      }, e.prototype.getAngle = function () {
        return this.angle_;
      }, e.prototype.getFill = function () {
        return this.fill_;
      }, e.prototype.getHitDetectionImage = function (t) {
        return this.hitDetectionCanvas_;
      }, e.prototype.getImage = function (t) {
        return this.canvas_;
      }, e.prototype.getImageSize = function () {
        return this.imageSize_;
      }, e.prototype.getHitDetectionImageSize = function () {
        return this.hitDetectionImageSize_;
      }, e.prototype.getImageState = function () {
        return gr.LOADED;
      }, e.prototype.getOrigin = function () {
        return this.origin_;
      }, e.prototype.getPoints = function () {
        return this.points_;
      }, e.prototype.getRadius = function () {
        return this.radius_;
      }, e.prototype.getRadius2 = function () {
        return this.radius2_;
      }, e.prototype.getSize = function () {
        return this.size_;
      }, e.prototype.getStroke = function () {
        return this.stroke_;
      }, e.prototype.listenImageChange = function (t, e) {}, e.prototype.load = function () {}, e.prototype.unlistenImageChange = function (t, e) {}, e.prototype.render_ = function (t) {
        var e,
            i,
            n = "",
            o = "",
            r = 0,
            s = null,
            a = 0,
            h = 0;this.stroke_ && (null === (i = this.stroke_.getColor()) && (i = Sr), i = Wr(i), void 0 === (h = this.stroke_.getWidth()) && (h = 1), s = this.stroke_.getLineDash(), a = this.stroke_.getLineDashOffset(), V || (s = null, a = 0), void 0 === (o = this.stroke_.getLineJoin()) && (o = "round"), void 0 === (n = this.stroke_.getLineCap()) && (n = "round"), void 0 === (r = this.stroke_.getMiterLimit()) && (r = 10));var l = 2 * (this.radius_ + h) + 1,
            u = { strokeStyle: i, strokeWidth: h, size: l, lineCap: n, lineDash: s, lineDashOffset: a, lineJoin: o, miterLimit: r };if (void 0 === t) {
          var c = Nn(l, l);this.canvas_ = c.canvas, e = l = this.canvas_.width, this.draw_(u, c, 0, 0), this.createHitDetectionCanvas_(u);
        } else {
          l = Math.round(l);var p,
              d = !this.fill_;d && (p = this.drawHitDetectionCanvas_.bind(this, u));var f = this.getChecksum(),
              _ = t.add(f, l, l, this.draw_.bind(this, u), p);this.canvas_ = _.image, this.origin_ = [_.offsetX, _.offsetY], e = _.image.width, d ? (this.hitDetectionCanvas_ = _.hitImage, this.hitDetectionImageSize_ = [_.hitImage.width, _.hitImage.height]) : (this.hitDetectionCanvas_ = this.canvas_, this.hitDetectionImageSize_ = [e, e]);
        }this.anchor_ = [l / 2, l / 2], this.size_ = [l, l], this.imageSize_ = [e, e];
      }, e.prototype.draw_ = function (t, e, i, n) {
        var o, r, s;e.setTransform(1, 0, 0, 1, 0, 0), e.translate(i, n), e.beginPath();var a = this.points_;if (a === 1 / 0) e.arc(t.size / 2, t.size / 2, this.radius_, 0, 2 * Math.PI, !0);else {
          var h = void 0 !== this.radius2_ ? this.radius2_ : this.radius_;for (h !== this.radius_ && (a *= 2), o = 0; o <= a; o++) r = 2 * o * Math.PI / a - Math.PI / 2 + this.angle_, s = o % 2 == 0 ? this.radius_ : h, e.lineTo(t.size / 2 + s * Math.cos(r), t.size / 2 + s * Math.sin(r));
        }if (this.fill_) {
          var l = this.fill_.getColor();null === l && (l = Cr), e.fillStyle = Wr(l), e.fill();
        }this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineCap = t.lineCap, e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke()), e.closePath();
      }, e.prototype.createHitDetectionCanvas_ = function (t) {
        if (this.hitDetectionImageSize_ = [t.size, t.size], this.fill_) this.hitDetectionCanvas_ = this.canvas_;else {
          var e = Nn(t.size, t.size);this.hitDetectionCanvas_ = e.canvas, this.drawHitDetectionCanvas_(t, e, 0, 0);
        }
      }, e.prototype.drawHitDetectionCanvas_ = function (t, e, i, n) {
        e.setTransform(1, 0, 0, 1, 0, 0), e.translate(i, n), e.beginPath();var o = this.points_;if (o === 1 / 0) e.arc(t.size / 2, t.size / 2, this.radius_, 0, 2 * Math.PI, !0);else {
          var r,
              s,
              a,
              h = void 0 !== this.radius2_ ? this.radius2_ : this.radius_;for (h !== this.radius_ && (o *= 2), r = 0; r <= o; r++) a = 2 * r * Math.PI / o - Math.PI / 2 + this.angle_, s = r % 2 == 0 ? this.radius_ : h, e.lineTo(t.size / 2 + s * Math.cos(a), t.size / 2 + s * Math.sin(a));
        }e.fillStyle = Cr, e.fill(), this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.stroke()), e.closePath();
      }, e.prototype.getChecksum = function () {
        var t = this.stroke_ ? this.stroke_.getChecksum() : "-",
            e = this.fill_ ? this.fill_.getChecksum() : "-";if (!this.checksums_ || t != this.checksums_[1] || e != this.checksums_[2] || this.radius_ != this.checksums_[3] || this.radius2_ != this.checksums_[4] || this.angle_ != this.checksums_[5] || this.points_ != this.checksums_[6]) {
          var i = "r" + t + e + (void 0 !== this.radius_ ? this.radius_.toString() : "-") + (void 0 !== this.radius2_ ? this.radius2_.toString() : "-") + (void 0 !== this.angle_ ? this.angle_.toString() : "-") + (void 0 !== this.points_ ? this.points_.toString() : "-");this.checksums_ = [i, t, e, this.radius_, this.radius2_, this.angle_, this.points_];
        }return this.checksums_[0];
      }, e;
    }(Da)),
        ka = function (t) {
      var e = t || {};this.color_ = void 0 !== e.color ? e.color : null, this.checksum_ = void 0;
    };ka.prototype.clone = function () {
      var t = this.getColor();return new ka({ color: t && t.slice ? t.slice() : t || void 0 });
    }, ka.prototype.getColor = function () {
      return this.color_;
    }, ka.prototype.setColor = function (t) {
      this.color_ = t, this.checksum_ = void 0;
    }, ka.prototype.getChecksum = function () {
      return void 0 === this.checksum_ && (this.color_ instanceof CanvasPattern || this.color_ instanceof CanvasGradient ? this.checksum_ = o(this.color_).toString() : this.checksum_ = "f" + (this.color_ ? Yr(this.color_) : "-")), this.checksum_;
    };var Na = ka,
        Ya = function (t) {
      var e = t || {};this.color_ = void 0 !== e.color ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = void 0 !== e.lineDash ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width, this.checksum_ = void 0;
    };Ya.prototype.clone = function () {
      var t = this.getColor();return new Ya({ color: t && t.slice ? t.slice() : t || void 0, lineCap: this.getLineCap(), lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0, lineDashOffset: this.getLineDashOffset(), lineJoin: this.getLineJoin(), miterLimit: this.getMiterLimit(), width: this.getWidth() });
    }, Ya.prototype.getColor = function () {
      return this.color_;
    }, Ya.prototype.getLineCap = function () {
      return this.lineCap_;
    }, Ya.prototype.getLineDash = function () {
      return this.lineDash_;
    }, Ya.prototype.getLineDashOffset = function () {
      return this.lineDashOffset_;
    }, Ya.prototype.getLineJoin = function () {
      return this.lineJoin_;
    }, Ya.prototype.getMiterLimit = function () {
      return this.miterLimit_;
    }, Ya.prototype.getWidth = function () {
      return this.width_;
    }, Ya.prototype.setColor = function (t) {
      this.color_ = t, this.checksum_ = void 0;
    }, Ya.prototype.setLineCap = function (t) {
      this.lineCap_ = t, this.checksum_ = void 0;
    }, Ya.prototype.setLineDash = function (t) {
      this.lineDash_ = t, this.checksum_ = void 0;
    }, Ya.prototype.setLineDashOffset = function (t) {
      this.lineDashOffset_ = t, this.checksum_ = void 0;
    }, Ya.prototype.setLineJoin = function (t) {
      this.lineJoin_ = t, this.checksum_ = void 0;
    }, Ya.prototype.setMiterLimit = function (t) {
      this.miterLimit_ = t, this.checksum_ = void 0;
    }, Ya.prototype.setWidth = function (t) {
      this.width_ = t, this.checksum_ = void 0;
    }, Ya.prototype.getChecksum = function () {
      return void 0 === this.checksum_ && (this.checksum_ = "s", this.color_ ? "string" == typeof this.color_ ? this.checksum_ += this.color_ : this.checksum_ += o(this.color_).toString() : this.checksum_ += "-", this.checksum_ += "," + (void 0 !== this.lineCap_ ? this.lineCap_.toString() : "-") + "," + (this.lineDash_ ? this.lineDash_.toString() : "-") + "," + (void 0 !== this.lineDashOffset_ ? this.lineDashOffset_ : "-") + "," + (void 0 !== this.lineJoin_ ? this.lineJoin_ : "-") + "," + (void 0 !== this.miterLimit_ ? this.miterLimit_.toString() : "-") + "," + (void 0 !== this.width_ ? this.width_.toString() : "-")), this.checksum_;
    };var Xa = Ya,
        ja = function (t) {
      var e = t || {};this.geometry_ = null, this.geometryFunction_ = za, void 0 !== e.geometry && this.setGeometry(e.geometry), this.fill_ = void 0 !== e.fill ? e.fill : null, this.image_ = void 0 !== e.image ? e.image : null, this.renderer_ = void 0 !== e.renderer ? e.renderer : null, this.stroke_ = void 0 !== e.stroke ? e.stroke : null, this.text_ = void 0 !== e.text ? e.text : null, this.zIndex_ = e.zIndex;
    };ja.prototype.clone = function () {
      var t = this.getGeometry();return t && t.clone && (t = t.clone()), new ja({ geometry: t, fill: this.getFill() ? this.getFill().clone() : void 0, image: this.getImage() ? this.getImage().clone() : void 0, stroke: this.getStroke() ? this.getStroke().clone() : void 0, text: this.getText() ? this.getText().clone() : void 0, zIndex: this.getZIndex() });
    }, ja.prototype.getRenderer = function () {
      return this.renderer_;
    }, ja.prototype.setRenderer = function (t) {
      this.renderer_ = t;
    }, ja.prototype.getGeometry = function () {
      return this.geometry_;
    }, ja.prototype.getGeometryFunction = function () {
      return this.geometryFunction_;
    }, ja.prototype.getFill = function () {
      return this.fill_;
    }, ja.prototype.setFill = function (t) {
      this.fill_ = t;
    }, ja.prototype.getImage = function () {
      return this.image_;
    }, ja.prototype.setImage = function (t) {
      this.image_ = t;
    }, ja.prototype.getStroke = function () {
      return this.stroke_;
    }, ja.prototype.setStroke = function (t) {
      this.stroke_ = t;
    }, ja.prototype.getText = function () {
      return this.text_;
    }, ja.prototype.setText = function (t) {
      this.text_ = t;
    }, ja.prototype.getZIndex = function () {
      return this.zIndex_;
    }, ja.prototype.setGeometry = function (t) {
      "function" == typeof t ? this.geometryFunction_ = t : "string" == typeof t ? this.geometryFunction_ = function (e) {
        return e.get(t);
      } : t ? void 0 !== t && (this.geometryFunction_ = function () {
        return t;
      }) : this.geometryFunction_ = za, this.geometry_ = t;
    }, ja.prototype.setZIndex = function (t) {
      this.zIndex_ = t;
    };var Wa = null;function Ka(t, e) {
      if (!Wa) {
        var i = new Na({ color: "rgba(255,255,255,0.4)" }),
            n = new Xa({ color: "#3399CC", width: 1.25 });Wa = [new ja({ image: new Ga({ fill: i, stroke: n, radius: 5 }), fill: i, stroke: n })];
      }return Wa;
    }function za(t) {
      return t.getGeometry();
    }var Ua = ja,
        Ba = "renderOrder",
        Va = function (t) {
      function e(e) {
        var i = e || {},
            n = l({}, i);delete n.style, delete n.renderBuffer, delete n.updateWhileAnimating, delete n.updateWhileInteracting, t.call(this, n), this.declutter_ = void 0 !== i.declutter && i.declutter, this.renderBuffer_ = void 0 !== i.renderBuffer ? i.renderBuffer : 100, this.style_ = null, this.styleFunction_ = void 0, this.setStyle(i.style), this.updateWhileAnimating_ = void 0 !== i.updateWhileAnimating && i.updateWhileAnimating, this.updateWhileInteracting_ = void 0 !== i.updateWhileInteracting && i.updateWhileInteracting, this.renderMode_ = i.renderMode || mr.VECTOR, this.type = vr.VECTOR;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDeclutter = function () {
        return this.declutter_;
      }, e.prototype.setDeclutter = function (t) {
        this.declutter_ = t;
      }, e.prototype.getRenderBuffer = function () {
        return this.renderBuffer_;
      }, e.prototype.getRenderOrder = function () {
        return this.get(Ba);
      }, e.prototype.getStyle = function () {
        return this.style_;
      }, e.prototype.getStyleFunction = function () {
        return this.styleFunction_;
      }, e.prototype.getUpdateWhileAnimating = function () {
        return this.updateWhileAnimating_;
      }, e.prototype.getUpdateWhileInteracting = function () {
        return this.updateWhileInteracting_;
      }, e.prototype.setRenderOrder = function (t) {
        this.set(Ba, t);
      }, e.prototype.setStyle = function (t) {
        this.style_ = void 0 !== t ? t : Ka, this.styleFunction_ = null === t ? void 0 : function (t) {
          var e, i;return "function" == typeof t ? e = t : (Array.isArray(t) ? i = t : (Qt(t instanceof ja, 41), i = [t]), e = function () {
            return i;
          }), e;
        }(this.style_), this.changed();
      }, e.prototype.getRenderMode = function () {
        return this.renderMode_;
      }, e;
    }(oo);Va.prototype.getSource;var Za = Va;var Ha = function (t) {
      function e(e) {
        if (t.call(this), this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, y(this, A(this.geometryName_), this.handleGeometryChanged_, this), void 0 !== e) if (e instanceof qi || !e) {
          var i = e;this.setGeometry(i);
        } else {
          var n = e;this.setProperties(n);
        }
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {
        var t = new e(this.getProperties());t.setGeometryName(this.getGeometryName());var i = this.getGeometry();i && t.setGeometry(i.clone());var n = this.getStyle();return n && t.setStyle(n), t;
      }, e.prototype.getGeometry = function () {
        return this.get(this.geometryName_);
      }, e.prototype.getId = function () {
        return this.id_;
      }, e.prototype.getGeometryName = function () {
        return this.geometryName_;
      }, e.prototype.getStyle = function () {
        return this.style_;
      }, e.prototype.getStyleFunction = function () {
        return this.styleFunction_;
      }, e.prototype.handleGeometryChange_ = function () {
        this.changed();
      }, e.prototype.handleGeometryChanged_ = function () {
        this.geometryChangeKey_ && (E(this.geometryChangeKey_), this.geometryChangeKey_ = null);var t = this.getGeometry();t && (this.geometryChangeKey_ = y(t, M.CHANGE, this.handleGeometryChange_, this)), this.changed();
      }, e.prototype.setGeometry = function (t) {
        this.set(this.geometryName_, t);
      }, e.prototype.setStyle = function (t) {
        this.style_ = t, this.styleFunction_ = t ? function (t) {
          return "function" == typeof t ? t : (Array.isArray(t) ? e = t : (Qt(t instanceof Ua, 41), e = [t]), function () {
            return e;
          });var e;
        }(t) : void 0, this.changed();
      }, e.prototype.setId = function (t) {
        this.id_ = t, this.changed();
      }, e.prototype.setGeometryName = function (t) {
        m(this, A(this.geometryName_), this.handleGeometryChanged_, this), this.geometryName_ = t, y(this, A(this.geometryName_), this.handleGeometryChanged_, this), this.handleGeometryChanged_();
      }, e;
    }(D),
        qa = function () {
      this.dataProjection = null, this.defaultFeatureProjection = null;
    };function Ja(t, e, i) {
      var n,
          o = i ? Pi(i.featureProjection) : null,
          r = i ? Pi(i.dataProjection) : null;if (n = o && r && !Di(o, r) ? t instanceof qi ? (e ? t.clone() : t).transform(e ? o : r, e ? r : o) : function (t, e, i) {
        return ii(t, ki(e, i));
      }(t, r, o) : t, e && i && void 0 !== i.decimals) {
        var s = Math.pow(10, i.decimals);n === t && (n = n.clone()), n.applyTransform(function (t) {
          for (var e = 0, i = t.length; e < i; ++e) t[e] = Math.round(t[e] * s) / s;return t;
        });
      }return n;
    }qa.prototype.getReadOptions = function (t, e) {
      var i;return e && (i = { dataProjection: e.dataProjection ? e.dataProjection : this.readProjection(t), featureProjection: e.featureProjection }), this.adaptOptions(i);
    }, qa.prototype.adaptOptions = function (t) {
      return l({ dataProjection: this.dataProjection, featureProjection: this.defaultFeatureProjection }, t);
    }, qa.prototype.getLastExtent = function () {
      return null;
    }, qa.prototype.getType = function () {}, qa.prototype.readFeature = function (t, e) {}, qa.prototype.readFeatures = function (t, e) {}, qa.prototype.readGeometry = function (t, e) {}, qa.prototype.readProjection = function (t) {}, qa.prototype.writeFeature = function (t, e) {}, qa.prototype.writeFeatures = function (t, e) {}, qa.prototype.writeGeometry = function (t, e) {};var Qa = { ARRAY_BUFFER: "arraybuffer", JSON: "json", TEXT: "text", XML: "xml" };function $a(t) {
      if ("string" == typeof t) {
        var e = JSON.parse(t);return e || null;
      }return null !== t ? t : null;
    }var th = function (t) {
      function e() {
        t.call(this);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getType = function () {
        return Qa.JSON;
      }, e.prototype.readFeature = function (t, e) {
        return this.readFeatureFromObject($a(t), this.getReadOptions(t, e));
      }, e.prototype.readFeatures = function (t, e) {
        return this.readFeaturesFromObject($a(t), this.getReadOptions(t, e));
      }, e.prototype.readFeatureFromObject = function (t, e) {}, e.prototype.readFeaturesFromObject = function (t, e) {}, e.prototype.readGeometry = function (t, e) {
        return this.readGeometryFromObject($a(t), this.getReadOptions(t, e));
      }, e.prototype.readGeometryFromObject = function (t, e) {}, e.prototype.readProjection = function (t) {
        return this.readProjectionFromObject($a(t));
      }, e.prototype.readProjectionFromObject = function (t) {}, e.prototype.writeFeature = function (t, e) {
        return JSON.stringify(this.writeFeatureObject(t, e));
      }, e.prototype.writeFeatureObject = function (t, e) {}, e.prototype.writeFeatures = function (t, e) {
        return JSON.stringify(this.writeFeaturesObject(t, e));
      }, e.prototype.writeFeaturesObject = function (t, e) {}, e.prototype.writeGeometry = function (t, e) {
        return JSON.stringify(this.writeGeometryObject(t, e));
      }, e.prototype.writeGeometryObject = function (t, e) {}, e;
    }(qa);function eh(t) {
      for (var e = [], i = 0, n = t.length; i < n; ++i) e.push(t[i].clone());return e;
    }var ih = function (t) {
      function e(e) {
        t.call(this), this.geometries_ = e || null, this.listenGeometriesChange_();
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.unlistenGeometriesChange_ = function () {
        if (this.geometries_) for (var t = 0, e = this.geometries_.length; t < e; ++t) m(this.geometries_[t], M.CHANGE, this.changed, this);
      }, e.prototype.listenGeometriesChange_ = function () {
        if (this.geometries_) for (var t = 0, e = this.geometries_.length; t < e; ++t) y(this.geometries_[t], M.CHANGE, this.changed, this);
      }, e.prototype.clone = function () {
        var t = new e(null);return t.setGeometries(this.geometries_), t;
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        if (n < Le(this.getExtent(), t, e)) return n;for (var o = this.geometries_, r = 0, s = o.length; r < s; ++r) n = o[r].closestPointXY(t, e, i, n);return n;
      }, e.prototype.containsXY = function (t, e) {
        for (var i = this.geometries_, n = 0, o = i.length; n < o; ++n) if (i[n].containsXY(t, e)) return !0;return !1;
      }, e.prototype.computeExtent = function (t) {
        Ge(t);for (var e = this.geometries_, i = 0, n = e.length; i < n; ++i) Ye(t, e[i].getExtent());return t;
      }, e.prototype.getGeometries = function () {
        return eh(this.geometries_);
      }, e.prototype.getGeometriesArray = function () {
        return this.geometries_;
      }, e.prototype.getSimplifiedGeometry = function (t) {
        if (this.simplifiedGeometryRevision != this.getRevision() && (u(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || 0 !== this.simplifiedGeometryMaxMinSquaredTolerance && t < this.simplifiedGeometryMaxMinSquaredTolerance) return this;var i = t.toString();if (this.simplifiedGeometryCache.hasOwnProperty(i)) return this.simplifiedGeometryCache[i];for (var n = [], o = this.geometries_, r = !1, s = 0, a = o.length; s < a; ++s) {
          var h = o[s],
              l = h.getSimplifiedGeometry(t);n.push(l), l !== h && (r = !0);
        }if (r) {
          var c = new e(null);return c.setGeometriesArray(n), this.simplifiedGeometryCache[i] = c, c;
        }return this.simplifiedGeometryMaxMinSquaredTolerance = t, this;
      }, e.prototype.getType = function () {
        return ni.GEOMETRY_COLLECTION;
      }, e.prototype.intersectsExtent = function (t) {
        for (var e = this.geometries_, i = 0, n = e.length; i < n; ++i) if (e[i].intersectsExtent(t)) return !0;return !1;
      }, e.prototype.isEmpty = function () {
        return 0 === this.geometries_.length;
      }, e.prototype.rotate = function (t, e) {
        for (var i = this.geometries_, n = 0, o = i.length; n < o; ++n) i[n].rotate(t, e);this.changed();
      }, e.prototype.scale = function (t, e, i) {
        var n = i;n || (n = Ve(this.getExtent()));for (var o = this.geometries_, r = 0, s = o.length; r < s; ++r) o[r].scale(t, e, n);this.changed();
      }, e.prototype.setGeometries = function (t) {
        this.setGeometriesArray(eh(t));
      }, e.prototype.setGeometriesArray = function (t) {
        this.unlistenGeometriesChange_(), this.geometries_ = t, this.listenGeometriesChange_(), this.changed();
      }, e.prototype.applyTransform = function (t) {
        for (var e = this.geometries_, i = 0, n = e.length; i < n; ++i) e[i].applyTransform(t);this.changed();
      }, e.prototype.translate = function (t, e) {
        for (var i = this.geometries_, n = 0, o = i.length; n < o; ++n) i[n].translate(t, e);this.changed();
      }, e.prototype.disposeInternal = function () {
        this.unlistenGeometriesChange_(), t.prototype.disposeInternal.call(this);
      }, e;
    }(qi);function nh(t, e, i, n, o, r) {
      var s = NaN,
          a = NaN,
          h = (i - e) / n;if (1 === h) s = t[e], a = t[e + 1];else if (2 == h) s = (1 - o) * t[e] + o * t[e + n], a = (1 - o) * t[e + 1] + o * t[e + n + 1];else if (0 !== h) {
        for (var l = t[e], u = t[e + 1], c = 0, p = [0], d = e + n; d < i; d += n) {
          var f = t[d],
              _ = t[d + 1];c += Math.sqrt((f - l) * (f - l) + (_ - u) * (_ - u)), p.push(c), l = f, u = _;
        }var g = o * c,
            y = function (t, e, i) {
          for (var n, o, r = i || bt, s = 0, a = t.length, h = !1; s < a;) (o = +r(t[n = s + (a - s >> 1)], e)) < 0 ? s = n + 1 : (a = n, h = !o);return h ? s : ~s;
        }(p, g);if (y < 0) {
          var v = (g - p[-y - 2]) / (p[-y - 1] - p[-y - 2]),
              m = e + (-y - 2) * n;s = le(t[m], t[m + n], v), a = le(t[m + 1], t[m + n + 1], v);
        } else s = t[e + y * n], a = t[e + y * n + 1];
      }return r ? (r[0] = s, r[1] = a, r) : [s, a];
    }function oh(t, e, i, n, o, r) {
      if (i == e) return null;var s;if (o < t[e + n - 1]) return r ? ((s = t.slice(e, e + n))[n - 1] = o, s) : null;if (t[i - 1] < o) return r ? ((s = t.slice(i - n, i))[n - 1] = o, s) : null;if (o == t[e + n - 1]) return t.slice(e, e + n);for (var a = e / n, h = i / n; a < h;) {
        var l = a + h >> 1;o < t[(l + 1) * n - 1] ? h = l : a = l + 1;
      }var u = t[a * n - 1];if (o == u) return t.slice((a - 1) * n, (a - 1) * n + n);var c = (o - u) / (t[(a + 1) * n - 1] - u);s = [];for (var p = 0; p < n - 1; ++p) s.push(le(t[(a - 1) * n + p], t[a * n + p], c));return s.push(o), s;
    }var rh = function (t) {
      function e(e, i) {
        t.call(this), this.flatMidpoint_ = null, this.flatMidpointRevision_ = -1, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, void 0 === i || Array.isArray(e[0]) ? this.setCoordinates(e, i) : this.setFlatCoordinates(i, e);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.appendCoordinate = function (t) {
        this.flatCoordinates ? kt(this.flatCoordinates, t) : this.flatCoordinates = t.slice(), this.changed();
      }, e.prototype.clone = function () {
        return new e(this.flatCoordinates.slice(), this.layout);
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        return n < Le(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(on(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), sn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !1, t, e, i, n));
      }, e.prototype.forEachSegment = function (t) {
        return Sn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t);
      }, e.prototype.getCoordinateAtM = function (t, e) {
        if (this.layout != oi.XYM && this.layout != oi.XYZM) return null;var i = void 0 !== e && e;return oh(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, i);
      }, e.prototype.getCoordinates = function () {
        return un(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
      }, e.prototype.getCoordinateAt = function (t, e) {
        return nh(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, e);
      }, e.prototype.getLength = function () {
        return _s(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
      }, e.prototype.getFlatMidpoint = function () {
        return this.flatMidpointRevision_ != this.getRevision() && (this.flatMidpoint_ = this.getCoordinateAt(.5, this.flatMidpoint_), this.flatMidpointRevision_ = this.getRevision()), this.flatMidpoint_;
      }, e.prototype.getSimplifiedGeometryInternal = function (t) {
        var i = [];return i.length = dn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, i, 0), new e(i, oi.XY);
      }, e.prototype.getType = function () {
        return ni.LINE_STRING;
      }, e.prototype.intersectsExtent = function (t) {
        return Rn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t);
      }, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = hn(this.flatCoordinates, 0, t, this.stride), this.changed();
      }, e;
    }($i),
        sh = function (t) {
      function e(e, i, n) {
        if (t.call(this), this.ends_ = [], this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, Array.isArray(e[0])) this.setCoordinates(e, i);else if (void 0 !== i && n) this.setFlatCoordinates(i, e), this.ends_ = n;else {
          for (var o = this.getLayout(), r = [], s = [], a = 0, h = e.length; a < h; ++a) {
            var l = e[a];0 === a && (o = l.getLayout()), kt(r, l.getFlatCoordinates()), s.push(r.length);
          }this.setFlatCoordinates(o, r), this.ends_ = s;
        }
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.appendLineString = function (t) {
        this.flatCoordinates ? kt(this.flatCoordinates, t.getFlatCoordinates().slice()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
      }, e.prototype.clone = function () {
        return new e(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        return n < Le(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(rn(this.flatCoordinates, 0, this.ends_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), an(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !1, t, e, i, n));
      }, e.prototype.getCoordinateAtM = function (t, e, i) {
        if (this.layout != oi.XYM && this.layout != oi.XYZM || 0 === this.flatCoordinates.length) return null;var n = void 0 !== e && e,
            o = void 0 !== i && i;return function (t, e, i, n, o, r, s) {
          if (s) return oh(t, e, i[i.length - 1], n, o, r);var a;if (o < t[n - 1]) return r ? ((a = t.slice(0, n))[n - 1] = o, a) : null;if (t[t.length - 1] < o) return r ? ((a = t.slice(t.length - n))[n - 1] = o, a) : null;for (var h = 0, l = i.length; h < l; ++h) {
            var u = i[h];if (e != u) {
              if (o < t[e + n - 1]) return null;if (o <= t[u - 1]) return oh(t, e, u, n, o, !1);e = u;
            }
          }return null;
        }(this.flatCoordinates, 0, this.ends_, this.stride, t, n, o);
      }, e.prototype.getCoordinates = function () {
        return cn(this.flatCoordinates, 0, this.ends_, this.stride);
      }, e.prototype.getEnds = function () {
        return this.ends_;
      }, e.prototype.getLineString = function (t) {
        return t < 0 || this.ends_.length <= t ? null : new rh(this.flatCoordinates.slice(0 === t ? 0 : this.ends_[t - 1], this.ends_[t]), this.layout);
      }, e.prototype.getLineStrings = function () {
        for (var t = this.flatCoordinates, e = this.ends_, i = this.layout, n = [], o = 0, r = 0, s = e.length; r < s; ++r) {
          var a = e[r],
              h = new rh(t.slice(o, a), i);n.push(h), o = a;
        }return n;
      }, e.prototype.getFlatMidpoints = function () {
        for (var t = [], e = this.flatCoordinates, i = 0, n = this.ends_, o = this.stride, r = 0, s = n.length; r < s; ++r) {
          var a = n[r];kt(t, nh(e, i, a, o, .5)), i = a;
        }return t;
      }, e.prototype.getSimplifiedGeometryInternal = function (t) {
        var i = [],
            n = [];return i.length = fn(this.flatCoordinates, 0, this.ends_, this.stride, t, i, 0, n), new e(i, oi.XY, n);
      }, e.prototype.getType = function () {
        return ni.MULTI_LINE_STRING;
      }, e.prototype.intersectsExtent = function (t) {
        return function (t, e, i, n, o) {
          for (var r = 0, s = i.length; r < s; ++r) {
            if (Rn(t, e, i[r], n, o)) return !0;e = i[r];
          }return !1;
        }(this.flatCoordinates, 0, this.ends_, this.stride, t);
      }, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);var i = ln(this.flatCoordinates, 0, t, this.stride, this.ends_);this.flatCoordinates.length = 0 === i.length ? 0 : i[i.length - 1], this.changed();
      }, e;
    }($i),
        ah = function (t) {
      function e(e, i) {
        t.call(this), i && !Array.isArray(e[0]) ? this.setFlatCoordinates(i, e) : this.setCoordinates(e, i);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.appendPoint = function (t) {
        this.flatCoordinates ? kt(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.changed();
      }, e.prototype.clone = function () {
        return new e(this.flatCoordinates.slice(), this.layout);
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        if (n < Le(this.getExtent(), t, e)) return n;for (var o = this.flatCoordinates, r = this.stride, s = 0, a = o.length; s < a; s += r) {
          var h = se(t, e, o[s], o[s + 1]);if (h < n) {
            n = h;for (var l = 0; l < r; ++l) i[l] = o[s + l];i.length = r;
          }
        }return n;
      }, e.prototype.getCoordinates = function () {
        return un(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
      }, e.prototype.getPoint = function (t) {
        var e = this.flatCoordinates ? this.flatCoordinates.length / this.stride : 0;return t < 0 || e <= t ? null : new mn(this.flatCoordinates.slice(t * this.stride, (t + 1) * this.stride), this.layout);
      }, e.prototype.getPoints = function () {
        for (var t = this.flatCoordinates, e = this.layout, i = this.stride, n = [], o = 0, r = t.length; o < r; o += i) {
          var s = new mn(t.slice(o, o + i), e);n.push(s);
        }return n;
      }, e.prototype.getType = function () {
        return ni.MULTI_POINT;
      }, e.prototype.intersectsExtent = function (t) {
        for (var e = this.flatCoordinates, i = this.stride, n = 0, o = e.length; n < o; n += i) {
          if (Fe(t, e[n], e[n + 1])) return !0;
        }return !1;
      }, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = hn(this.flatCoordinates, 0, t, this.stride), this.changed();
      }, e;
    }($i);var hh = function (t) {
      function e(e, i, n) {
        if (t.call(this), this.endss_ = [], this.flatInteriorPointsRevision_ = -1, this.flatInteriorPoints_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, !n && !Array.isArray(e[0])) {
          for (var o = this.getLayout(), r = [], s = [], a = 0, h = e.length; a < h; ++a) {
            var l = e[a];0 === a && (o = l.getLayout());for (var u = r.length, c = l.getEnds(), p = 0, d = c.length; p < d; ++p) c[p] += u;kt(r, l.getFlatCoordinates()), s.push(c);
          }i = o, e = r, n = s;
        }void 0 !== i && n ? (this.setFlatCoordinates(i, e), this.endss_ = n) : this.setCoordinates(e, i);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.appendPolygon = function (t) {
        var e;if (this.flatCoordinates) {
          var i = this.flatCoordinates.length;kt(this.flatCoordinates, t.getFlatCoordinates());for (var n = 0, o = (e = t.getEnds().slice()).length; n < o; ++n) e[n] += i;
        } else this.flatCoordinates = t.getFlatCoordinates().slice(), e = t.getEnds().slice(), this.endss_.push();this.endss_.push(e), this.changed();
      }, e.prototype.clone = function () {
        for (var t = this.endss_.length, i = new Array(t), n = 0; n < t; ++n) i[n] = this.endss_[n].slice();return new e(this.flatCoordinates.slice(), this.layout, i);
      }, e.prototype.closestPointXY = function (t, e, i, n) {
        return n < Le(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(function (t, e, i, n, o) {
          for (var r = 0, s = i.length; r < s; ++r) {
            var a = i[r];o = rn(t, e, a, n, o), e = a[a.length - 1];
          }return o;
        }(this.flatCoordinates, 0, this.endss_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), function (t, e, i, n, o, r, s, a, h, l, u) {
          for (var c = u || [NaN, NaN], p = 0, d = i.length; p < d; ++p) {
            var f = i[p];l = an(t, e, f, n, o, r, s, a, h, l, c), e = f[f.length - 1];
          }return l;
        }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, !0, t, e, i, n));
      }, e.prototype.containsXY = function (t, e) {
        return function (t, e, i, n, o, r) {
          if (0 === i.length) return !1;for (var s = 0, a = i.length; s < a; ++s) {
            var h = i[s];if (Cn(t, e, h, n, o, r)) return !0;e = h[h.length - 1];
          }return !1;
        }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t, e);
      }, e.prototype.getArea = function () {
        return function (t, e, i, n) {
          for (var o = 0, r = 0, s = i.length; r < s; ++r) {
            var a = i[r];o += en(t, e, a, n), e = a[a.length - 1];
          }return o;
        }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
      }, e.prototype.getCoordinates = function (t) {
        var e;return void 0 !== t ? Pn(e = this.getOrientedFlatCoordinates().slice(), 0, this.endss_, this.stride, t) : e = this.flatCoordinates, pn(e, 0, this.endss_, this.stride);
      }, e.prototype.getEndss = function () {
        return this.endss_;
      }, e.prototype.getFlatInteriorPoints = function () {
        if (this.flatInteriorPointsRevision_ != this.getRevision()) {
          var t = function (t, e, i, n) {
            for (var o = [], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], s = 0, a = i.length; s < a; ++s) {
              var h = i[s];r = ke(t, e, h[0], n), o.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), e = h[h.length - 1];
            }return o;
          }(this.flatCoordinates, 0, this.endss_, this.stride);this.flatInteriorPoints_ = function (t, e, i, n, o) {
            for (var r = [], s = 0, a = i.length; s < a; ++s) {
              var h = i[s];r = Tn(t, e, h, n, o, 2 * s, r), e = h[h.length - 1];
            }return r;
          }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t), this.flatInteriorPointsRevision_ = this.getRevision();
        }return this.flatInteriorPoints_;
      }, e.prototype.getInteriorPoints = function () {
        return new ah(this.getFlatInteriorPoints().slice(), oi.XYM);
      }, e.prototype.getOrientedFlatCoordinates = function () {
        if (this.orientedRevision_ != this.getRevision()) {
          var t = this.flatCoordinates;!function (t, e, i, n, o) {
            for (var r = 0, s = i.length; r < s; ++r) if (!Ln(t, e, i[r], n, o)) return !1;return !0;
          }(t, 0, this.endss_, this.stride) ? (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Pn(this.orientedFlatCoordinates_, 0, this.endss_, this.stride)) : this.orientedFlatCoordinates_ = t, this.orientedRevision_ = this.getRevision();
        }return this.orientedFlatCoordinates_;
      }, e.prototype.getSimplifiedGeometryInternal = function (t) {
        var i = [],
            n = [];return i.length = function (t, e, i, n, o, r, s, a) {
          for (var h = 0, l = i.length; h < l; ++h) {
            var u = i[h],
                c = [];s = yn(t, e, u, n, o, r, s, c), a.push(c), e = u[u.length - 1];
          }return s;
        }(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(t), i, 0, n), new e(i, oi.XY, n);
      }, e.prototype.getPolygon = function (t) {
        if (t < 0 || this.endss_.length <= t) return null;var e;if (0 === t) e = 0;else {
          var i = this.endss_[t - 1];e = i[i.length - 1];
        }var n = this.endss_[t].slice(),
            o = n[n.length - 1];if (0 !== e) for (var r = 0, s = n.length; r < s; ++r) n[r] -= e;return new bn(this.flatCoordinates.slice(e, o), this.layout, n);
      }, e.prototype.getPolygons = function () {
        for (var t = this.layout, e = this.flatCoordinates, i = this.endss_, n = [], o = 0, r = 0, s = i.length; r < s; ++r) {
          var a = i[r].slice(),
              h = a[a.length - 1];if (0 !== o) for (var l = 0, u = a.length; l < u; ++l) a[l] -= o;var c = new bn(e.slice(o, h), t, a);n.push(c), o = h;
        }return n;
      }, e.prototype.getType = function () {
        return ni.MULTI_POLYGON;
      }, e.prototype.intersectsExtent = function (t) {
        return function (t, e, i, n, o) {
          for (var r = 0, s = i.length; r < s; ++r) {
            var a = i[r];if (In(t, e, a, n, o)) return !0;e = a[a.length - 1];
          }return !1;
        }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t);
      }, e.prototype.setCoordinates = function (t, e) {
        this.setLayout(e, t, 3), this.flatCoordinates || (this.flatCoordinates = []);var i = function (t, e, i, n, o) {
          for (var r = o || [], s = 0, a = 0, h = i.length; a < h; ++a) {
            var l = ln(t, e, i[a], n, r[s]);r[s++] = l, e = l[l.length - 1];
          }return r.length = s, r;
        }(this.flatCoordinates, 0, t, this.stride, this.endss_);if (0 === i.length) this.flatCoordinates.length = 0;else {
          var n = i[i.length - 1];this.flatCoordinates.length = 0 === n.length ? 0 : n[n.length - 1];
        }this.changed();
      }, e;
    }($i),
        lh = { Point: function (t) {
        return new mn(t.coordinates);
      }, LineString: function (t) {
        return new rh(t.coordinates);
      }, Polygon: function (t) {
        return new bn(t.coordinates);
      }, MultiPoint: function (t) {
        return new ah(t.coordinates);
      }, MultiLineString: function (t) {
        return new sh(t.coordinates);
      }, MultiPolygon: function (t) {
        return new hh(t.coordinates);
      }, GeometryCollection: function (t, e) {
        var i = t.geometries.map(function (t) {
          return ch(t, e);
        });return new ih(i);
      } },
        uh = { Point: function (t, e) {
        return { type: "Point", coordinates: t.getCoordinates() };
      }, LineString: function (t, e) {
        return { type: "LineString", coordinates: t.getCoordinates() };
      }, Polygon: function (t, e) {
        var i;e && (i = e.rightHanded);return { type: "Polygon", coordinates: t.getCoordinates(i) };
      }, MultiPoint: function (t, e) {
        return { type: "MultiPoint", coordinates: t.getCoordinates() };
      }, MultiLineString: function (t, e) {
        return { type: "MultiLineString", coordinates: t.getCoordinates() };
      }, MultiPolygon: function (t, e) {
        var i;e && (i = e.rightHanded);return { type: "MultiPolygon", coordinates: t.getCoordinates(i) };
      }, GeometryCollection: function (t, e) {
        return { type: "GeometryCollection", geometries: t.getGeometriesArray().map(function (t) {
            var i = l({}, e);return delete i.featureProjection, ph(t, i);
          }) };
      }, Circle: function (t) {
        return { type: "GeometryCollection", geometries: [] };
      } };function ch(t, e) {
      return t ? Ja((0, lh[t.type])(t), !1, e) : null;
    }function ph(t, e) {
      return (0, uh[t.getType()])(Ja(t, !0, e), e);
    }var dh = function (t) {
      function e(e) {
        var i = e || {};t.call(this), this.dataProjection = Pi(i.dataProjection ? i.dataProjection : "EPSG:4326"), i.featureProjection && (this.defaultFeatureProjection = Pi(i.featureProjection)), this.geometryName_ = i.geometryName, this.extractGeometryName_ = i.extractGeometryName;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.readFeatureFromObject = function (t, e) {
        var i = null,
            n = ch((i = "Feature" === t.type ? t : { type: "Feature", geometry: t }).geometry, e),
            o = new Ha();return this.geometryName_ ? o.setGeometryName(this.geometryName_) : this.extractGeometryName_ && void 0 !== i.geometry_name && o.setGeometryName(i.geometry_name), o.setGeometry(n), void 0 !== i.id && o.setId(i.id), i.properties && o.setProperties(i.properties), o;
      }, e.prototype.readFeaturesFromObject = function (t, e) {
        var i = null;if ("FeatureCollection" === t.type) {
          i = [];for (var n = t.features, o = 0, r = n.length; o < r; ++o) i.push(this.readFeatureFromObject(n[o], e));
        } else i = [this.readFeatureFromObject(t, e)];return i;
      }, e.prototype.readGeometryFromObject = function (t, e) {
        return ch(t, e);
      }, e.prototype.readProjectionFromObject = function (t) {
        var e,
            i = t.crs;return i ? "name" == i.type ? e = Pi(i.properties.name) : Qt(!1, 36) : e = this.dataProjection, e;
      }, e.prototype.writeFeatureObject = function (t, e) {
        e = this.adaptOptions(e);var i = { type: "Feature" },
            n = t.getId();void 0 !== n && (i.id = n);var o = t.getGeometry();i.geometry = o ? ph(o, e) : null;var r = t.getProperties();return delete r[t.getGeometryName()], p(r) ? i.properties = null : i.properties = r, i;
      }, e.prototype.writeFeaturesObject = function (t, e) {
        e = this.adaptOptions(e);for (var i = [], n = 0, o = t.length; n < o; ++n) i.push(this.writeFeatureObject(t[n], e));return { type: "FeatureCollection", features: i };
      }, e.prototype.writeGeometryObject = function (t, e) {
        return ph(t, this.adaptOptions(e));
      }, e;
    }(th);function fh(t, e) {
      return function (t, e, i, n) {
        return function (o, r, s) {
          var a = new XMLHttpRequest();a.open("GET", "function" == typeof t ? t(o, r, s) : t, !0), e.getType() == Qa.ARRAY_BUFFER && (a.responseType = "arraybuffer"), a.onload = function (t) {
            if (!a.status || a.status >= 200 && a.status < 300) {
              var o,
                  r = e.getType();r == Qa.JSON || r == Qa.TEXT ? o = a.responseText : r == Qa.XML ? (o = a.responseXML) || (o = new DOMParser().parseFromString(a.responseText, "application/xml")) : r == Qa.ARRAY_BUFFER && (o = a.response), o ? i.call(this, e.readFeatures(o, { featureProjection: s }), e.readProjection(o), e.getLastExtent()) : n.call(this);
            } else n.call(this);
          }.bind(this), a.onerror = function () {
            n.call(this);
          }.bind(this), a.send();
        };
      }(t, e, function (t, e) {
        this.addFeatures(t);
      }, T);
    }function _h(t, e) {
      return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
    }var gh = "addfeature",
        yh = "changefeature",
        vh = "clear",
        mh = "removefeature",
        Eh = function (t) {
      this.rbush_ = cs()(t, void 0), this.items_ = {};
    };Eh.prototype.insert = function (t, e) {
      var i = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e };this.rbush_.insert(i), this.items_[o(e)] = i;
    }, Eh.prototype.load = function (t, e) {
      for (var i = new Array(e.length), n = 0, r = e.length; n < r; n++) {
        var s = t[n],
            a = e[n],
            h = { minX: s[0], minY: s[1], maxX: s[2], maxY: s[3], value: a };i[n] = h, this.items_[o(a)] = h;
      }this.rbush_.load(i);
    }, Eh.prototype.remove = function (t) {
      var e = o(t),
          i = this.items_[e];return delete this.items_[e], null !== this.rbush_.remove(i);
    }, Eh.prototype.update = function (t, e) {
      var i = this.items_[o(e)];Ne([i.minX, i.minY, i.maxX, i.maxY], t) || (this.remove(e), this.insert(t, e));
    }, Eh.prototype.getAll = function () {
      return this.rbush_.all().map(function (t) {
        return t.value;
      });
    }, Eh.prototype.getInExtent = function (t) {
      var e = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3] };return this.rbush_.search(e).map(function (t) {
        return t.value;
      });
    }, Eh.prototype.forEach = function (t, e) {
      return this.forEach_(this.getAll(), t, e);
    }, Eh.prototype.forEachInExtent = function (t, e, i) {
      return this.forEach_(this.getInExtent(t), e, i);
    }, Eh.prototype.forEach_ = function (t, e, i) {
      for (var n, o = 0, r = t.length; o < r; o++) if (n = e.call(i, t[o])) return n;return n;
    }, Eh.prototype.isEmpty = function () {
      return p(this.items_);
    }, Eh.prototype.clear = function () {
      this.rbush_.clear(), this.items_ = {};
    }, Eh.prototype.getExtent = function (t) {
      var e = this.rbush_.data;return De(e.minX, e.minY, e.maxX, e.maxY, t);
    }, Eh.prototype.concat = function (t) {
      for (var e in this.rbush_.load(t.rbush_.all()), t.items_) this.items_[0 | e] = t.items_[0 | e];
    };var xh = Eh,
        Ch = function (t) {
      function e(e, i) {
        t.call(this, e), this.feature = i;
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(O),
        Th = function (t) {
      function e(e) {
        var i = e || {};t.call(this, { attributions: i.attributions, projection: void 0, state: Kn.READY, wrapX: void 0 === i.wrapX || i.wrapX }), this.loader_ = T, this.format_ = i.format, this.overlaps_ = void 0 == i.overlaps || i.overlaps, this.url_ = i.url, void 0 !== i.loader ? this.loader_ = i.loader : void 0 !== this.url_ && (Qt(this.format_, 7), this.loader_ = fh(this.url_, this.format_)), this.strategy_ = void 0 !== i.strategy ? i.strategy : _h;var n,
            o,
            r = void 0 === i.useSpatialIndex || i.useSpatialIndex;this.featuresRtree_ = r ? new xh() : null, this.loadedExtentsRtree_ = new xh(), this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.undefIdIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null, i.features instanceof N ? o = (n = i.features).getArray() : Array.isArray(i.features) && (o = i.features), r || void 0 !== n || (n = new N(o)), void 0 !== o && this.addFeaturesInternal(o), void 0 !== n && this.bindFeaturesCollection_(n);
      }return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(ma);Th.prototype.addFeature = function (t) {
      this.addFeatureInternal(t), this.changed();
    }, Th.prototype.addFeatureInternal = function (t) {
      var e = o(t).toString();if (this.addToIndex_(e, t)) {
        this.setupChangeEvents_(e, t);var i = t.getGeometry();if (i) {
          var n = i.getExtent();this.featuresRtree_ && this.featuresRtree_.insert(n, t);
        } else this.nullGeometryFeatures_[e] = t;this.dispatchEvent(new Ch(gh, t));
      }
    }, Th.prototype.setupChangeEvents_ = function (t, e) {
      this.featureChangeKeys_[t] = [y(e, M.CHANGE, this.handleFeatureChange_, this), y(e, h, this.handleFeatureChange_, this)];
    }, Th.prototype.addToIndex_ = function (t, e) {
      var i = !0,
          n = e.getId();return void 0 !== n ? n.toString() in this.idIndex_ ? i = !1 : this.idIndex_[n.toString()] = e : (Qt(!(t in this.undefIdIndex_), 30), this.undefIdIndex_[t] = e), i;
    }, Th.prototype.addFeatures = function (t) {
      this.addFeaturesInternal(t), this.changed();
    }, Th.prototype.addFeaturesInternal = function (t) {
      for (var e = [], i = [], n = [], r = 0, s = t.length; r < s; r++) {
        var a = t[r],
            h = o(a).toString();this.addToIndex_(h, a) && i.push(a);
      }for (var l = 0, u = i.length; l < u; l++) {
        var c = i[l],
            p = o(c).toString();this.setupChangeEvents_(p, c);var d = c.getGeometry();if (d) {
          var f = d.getExtent();e.push(f), n.push(c);
        } else this.nullGeometryFeatures_[p] = c;
      }this.featuresRtree_ && this.featuresRtree_.load(e, n);for (var _ = 0, g = i.length; _ < g; _++) this.dispatchEvent(new Ch(gh, i[_]));
    }, Th.prototype.bindFeaturesCollection_ = function (t) {
      var e = !1;y(this, gh, function (i) {
        e || (e = !0, t.push(i.feature), e = !1);
      }), y(this, mh, function (i) {
        e || (e = !0, t.remove(i.feature), e = !1);
      }), y(t, a.ADD, function (t) {
        e || (e = !0, this.addFeature(t.element), e = !1);
      }, this), y(t, a.REMOVE, function (t) {
        e || (e = !0, this.removeFeature(t.element), e = !1);
      }, this), this.featuresCollection_ = t;
    }, Th.prototype.clear = function (t) {
      if (t) {
        for (var e in this.featureChangeKeys_) {
          this.featureChangeKeys_[e].forEach(E);
        }this.featuresCollection_ || (this.featureChangeKeys_ = {}, this.idIndex_ = {}, this.undefIdIndex_ = {});
      } else if (this.featuresRtree_) for (var i in this.featuresRtree_.forEach(this.removeFeatureInternal, this), this.nullGeometryFeatures_) this.removeFeatureInternal(this.nullGeometryFeatures_[i]);this.featuresCollection_ && this.featuresCollection_.clear(), this.featuresRtree_ && this.featuresRtree_.clear(), this.loadedExtentsRtree_.clear(), this.nullGeometryFeatures_ = {};var n = new Ch(vh);this.dispatchEvent(n), this.changed();
    }, Th.prototype.forEachFeature = function (t) {
      return this.featuresRtree_ ? this.featuresRtree_.forEach(t) : this.featuresCollection_ ? this.featuresCollection_.forEach(t) : void 0;
    }, Th.prototype.forEachFeatureAtCoordinateDirect = function (t, e) {
      var i = [t[0], t[1], t[0], t[1]];return this.forEachFeatureInExtent(i, function (i) {
        return i.getGeometry().intersectsCoordinate(t) ? e(i) : void 0;
      });
    }, Th.prototype.forEachFeatureInExtent = function (t, e) {
      return this.featuresRtree_ ? this.featuresRtree_.forEachInExtent(t, e) : this.featuresCollection_ ? this.featuresCollection_.forEach(e) : void 0;
    }, Th.prototype.forEachFeatureIntersectingExtent = function (t, e) {
      return this.forEachFeatureInExtent(t, function (i) {
        if (i.getGeometry().intersectsExtent(t)) {
          var n = e(i);if (n) return n;
        }
      });
    }, Th.prototype.getFeaturesCollection = function () {
      return this.featuresCollection_;
    }, Th.prototype.getFeatures = function () {
      var t;return this.featuresCollection_ ? t = this.featuresCollection_.getArray() : this.featuresRtree_ && (t = this.featuresRtree_.getAll(), p(this.nullGeometryFeatures_) || kt(t, c(this.nullGeometryFeatures_))), t;
    }, Th.prototype.getFeaturesAtCoordinate = function (t) {
      var e = [];return this.forEachFeatureAtCoordinateDirect(t, function (t) {
        e.push(t);
      }), e;
    }, Th.prototype.getFeaturesInExtent = function (t) {
      return this.featuresRtree_.getInExtent(t);
    }, Th.prototype.getClosestFeatureToCoordinate = function (t, e) {
      var i = t[0],
          n = t[1],
          o = null,
          r = [NaN, NaN],
          s = 1 / 0,
          a = [-1 / 0, -1 / 0, 1 / 0, 1 / 0],
          h = e || x;return this.featuresRtree_.forEachInExtent(a, function (t) {
        if (h(t)) {
          var e = t.getGeometry(),
              l = s;if ((s = e.closestPointXY(i, n, r, s)) < l) {
            o = t;var u = Math.sqrt(s);a[0] = i - u, a[1] = n - u, a[2] = i + u, a[3] = n + u;
          }
        }
      }), o;
    }, Th.prototype.getExtent = function (t) {
      return this.featuresRtree_.getExtent(t);
    }, Th.prototype.getFeatureById = function (t) {
      var e = this.idIndex_[t.toString()];return void 0 !== e ? e : null;
    }, Th.prototype.getFormat = function () {
      return this.format_;
    }, Th.prototype.getOverlaps = function () {
      return this.overlaps_;
    }, Th.prototype.getResolutions = function () {}, Th.prototype.getUrl = function () {
      return this.url_;
    }, Th.prototype.handleFeatureChange_ = function (t) {
      var e = t.target,
          i = o(e).toString(),
          n = e.getGeometry();if (n) {
        var r = n.getExtent();i in this.nullGeometryFeatures_ ? (delete this.nullGeometryFeatures_[i], this.featuresRtree_ && this.featuresRtree_.insert(r, e)) : this.featuresRtree_ && this.featuresRtree_.update(r, e);
      } else i in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(e), this.nullGeometryFeatures_[i] = e);var s = e.getId();if (void 0 !== s) {
        var a = s.toString();i in this.undefIdIndex_ ? (delete this.undefIdIndex_[i], this.idIndex_[a] = e) : this.idIndex_[a] !== e && (this.removeFromIdIndex_(e), this.idIndex_[a] = e);
      } else i in this.undefIdIndex_ || (this.removeFromIdIndex_(e), this.undefIdIndex_[i] = e);this.changed(), this.dispatchEvent(new Ch(yh, e));
    }, Th.prototype.hasFeature = function (t) {
      var e = t.getId();return void 0 !== e ? e in this.idIndex_ : o(t).toString() in this.undefIdIndex_;
    }, Th.prototype.isEmpty = function () {
      return this.featuresRtree_.isEmpty() && p(this.nullGeometryFeatures_);
    }, Th.prototype.loadFeatures = function (t, e, i) {
      for (var n = this, o = this.loadedExtentsRtree_, r = this.strategy_(t, e), s = function (t, s) {
        var a = r[t];o.forEachInExtent(a, function (t) {
          return Pe(t.extent, a);
        }) || (n.loader_.call(n, a, e, i), o.insert(a, { extent: a.slice() }));
      }, a = 0, h = r.length; a < h; ++a) s(a);
    }, Th.prototype.removeLoadedExtent = function (t) {
      var e,
          i = this.loadedExtentsRtree_;i.forEachInExtent(t, function (i) {
        if (Ne(i.extent, t)) return e = i, !0;
      }), e && i.remove(e);
    }, Th.prototype.removeFeature = function (t) {
      var e = o(t).toString();e in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[e] : this.featuresRtree_ && this.featuresRtree_.remove(t), this.removeFeatureInternal(t), this.changed();
    }, Th.prototype.removeFeatureInternal = function (t) {
      var e = o(t).toString();this.featureChangeKeys_[e].forEach(E), delete this.featureChangeKeys_[e];var i = t.getId();void 0 !== i ? delete this.idIndex_[i.toString()] : delete this.undefIdIndex_[e], this.dispatchEvent(new Ch(mh, t));
    }, Th.prototype.removeFromIdIndex_ = function (t) {
      var e = !1;for (var i in this.idIndex_) if (this.idIndex_[i] === t) {
        delete this.idIndex_[i], e = !0;break;
      }return e;
    }, Th.prototype.setLoader = function (t) {
      this.loader_ = t;
    };let Sh = new Th({ format: new dh(), loader: (t, e, i) => {
        let n = i.getCode(),
            o = t.join(","),
            r = encodeURIComponent(`http://localhost:8080/geoserver/wfs?request=GetFeature&outputFormat=\n                JSON&version=1.1.0&typeName=India:Country&srsname=${n}&bbox=${o},${n}`),
            s = new XMLHttpRequest();s.open("GET", `/proxy?source=${r}`);let a = function () {
          Sh.removeLoadedExtent(t);
        };s.onerror = a, s.onload = function () {
          200 == s.status ? Sh.addFeatures(Sh.getFormat().readFeatures(s.responseText)) : a();
        }, s.send();
      }, strategy: function (t, e) {
        return [t];
      } }),
        Rh = new Qs({ target: "map-canvas", layers: [new ia({ source: new Aa() }), new Za({ source: Sh })], view: new kn({ center: [77.99, 21.99], zoom: 5, projection: "EPSG:4326" }) });e.default = Rh;
  } });
