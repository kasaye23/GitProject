! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Depicter = e()
}(this, function() {
    "use strict";

    function z(e, t) {
        var i, s = Object.keys(e);
        return Object.getOwnPropertySymbols && (i = Object.getOwnPropertySymbols(e), t && (i = i.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), s.push.apply(s, i)), s
    }

    function w(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {};
            t % 2 ? z(Object(i), !0).forEach(function(t) {
                V(e, t, i[t])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : z(Object(i)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
            })
        }
        return e
    }

    function V(t, e, i) {
        (e = function(t) {
            t = function(t, e) {
                if ("object" != typeof t || null === t) return t;
                var i = t[Symbol.toPrimitive];
                if (void 0 === i) return ("string" === e ? String : Number)(t);
                i = i.call(t, e || "default");
                if ("object" != typeof i) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(t, "string");
            return "symbol" == typeof t ? t : String(t)
        }(e)) in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i
    }

    function x(t, e) {
        if (null == t) return {};
        var i, s = function(t, e) {
            if (null == t) return {};
            for (var i, s = {}, n = Object.keys(t), o = 0; o < n.length; o++) i = n[o], 0 <= e.indexOf(i) || (s[i] = t[i]);
            return s
        }(t, e);
        if (Object.getOwnPropertySymbols)
            for (var n = Object.getOwnPropertySymbols(t), o = 0; o < n.length; o++) i = n[o], 0 <= e.indexOf(i) || Object.prototype.propertyIsEnumerable.call(t, i) && (s[i] = t[i]);
        return s
    }

    function R(t, e, i) {
        e = j(t, e, "set");
        if (e.set) e.set.call(t, i);
        else {
            if (!e.writable) throw new TypeError("attempted to set read only private field");
            e.value = i
        }
    }

    function j(t, e, i) {
        if (e.has(t)) return e.get(t);
        throw new TypeError("attempted to " + i + " private field on non-instance")
    }

    function W(t, e, i) {
        var s = t;
        if (e.has(s)) throw new TypeError("Cannot initialize the same private elements twice on an object");
        e.set(t, i)
    }
    class t {
        constructor() {
            this.listeners = {}, this._onceList = [], this.addEventListener = this.on, this.removeEventListener = this.off, this.debugEvents = !1
        }
        trigger(e, i) {
            var t = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            this.debugEvents && console.log(e, i), this.parentEmitter && this.parentEmitter.trigger(t ? this._transformName(e) : e, i), this.listeners && (this.listeners[e] && (i ? i.unshift(e) : i = [e], this.listeners[e].forEach(t => {
                t.callback.apply(t.context, i)
            })), this._onceList.length) && (this._onceList = this._onceList.filter(t => t.name !== e || (this.off(t.name, t.callback, t.context), !1)))
        }
        on(e, i, s) {
            let n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0;
            if (-1 !== e.indexOf(",")) e.replace(/\s*/g, "").split(",").forEach(t => {
                this.on(t, i, s, n)
            });
            else {
                this.listeners[e] || (this.listeners[e] = []);
                let t = this.listeners[e];
                t.find(t => t.callback === i && t.context === s && t.priority === n) || (t.push({
                    callback: i,
                    priority: n,
                    context: s
                }), t = t.sort((t, e) => t.priority > e.priority ? 1 : t.priority < e.priority ? -1 : 0))
            }
        }
        once(t, e, i, s) {
            this.on(t, e, i, s), this._onceList.push({
                name: t,
                callback: e,
                context: i
            })
        }
        off(t, e, i) {
            var s; - 1 !== t.indexOf(",") ? t.replace(/\s*/g, "").split(",").forEach(t => {
                this.off(t, e, i)
            }) : (s = this.listeners[t]) && s.length && (this.listeners[t] = s.filter(t => t.callback !== e || t.context !== i))
        }
        offOnContext(e) {
            Object.keys(this.listeners).forEach(t => {
                this.listeners[t] = this.listeners[t].filter(t => t.context !== e)
            })
        }
        offByName(t) {
            this.listeners[t] && (this.listeners[t] = void 0)
        }
        _transformName(t) {
            return this.eventPrefix && this.eventPrefix.length ? this.eventPrefix + t.slice(0, 1).toUpperCase() + t.slice(1) : t
        }
    }
    const c = "depicter",
        N = "ontouchstart" in document,
        h = Object.prototype.hasOwnProperty,
        H = {
            mobile: 767,
            tablet: 1024
        },
        d = Object.keys(H).sort((t, e) => H[e] - H[t]),
        l = () => {
            const i = window.innerWidth;
            let s = null,
                n = -1;
            return [...d].reverse().some((t, e) => i <= H[t] && (s = t, n = d.length - e - 1, !0)), {
                name: s,
                index: n,
                size: H[s] || i
            }
        };
    let F = null;
    window.addEventListener("resize", () => {
        F = l().name
    });
    const p = new class extends t {
            constructor() {
                super(), this.update = this.update.bind(this), window.addEventListener("resize", this.update), this.activeBreakpoint = null, this.activeBreakpointIndex = null, this.activeBreakpointSize = null, this.update()
            }
            update(t) {
                var e, i;
                t ? (clearTimeout(this._resizeTimeout), this._resizeTimeout = setTimeout(this.update, 20)) : ({
                    name: t,
                    index: e,
                    size: i
                } = l(), t !== this.activeBreakpoint && (this.activeBreakpoint = t, this.activeBreakpointIndex = e, this.activeBreakpointSize = i, this.trigger("breakpointChange", [t, e, i])))
            }
        },
        u = (t, e) => {
            e = e || l().name;
            var i, s = d.indexOf(e);
            return Array.isArray(t) ? 0 === t.length ? void 0 : !(i = t[s + 1]) && !1 !== i || "string" == typeof i && !i.length ? "none" === e ? void 0 : u(t, 1 <= s ? d[s - 1] : "none") : i : "object" == typeof(t = h.call(t, "toObject") ? t.toObject() : t) ? h.call(t, e) ? t[e] : "none" === e ? void 0 : u(t, 1 <= s ? d[s - 1] : "none") : t
        },
        m = (e, i) => {
            const s = {};
            return e.hasAttribute("data-" + i) && (s.none = e.getAttribute("data-" + i)), d.forEach(t => {
                e.hasAttribute(`data-${t}-` + i) && (s[t] = e.getAttribute(`data-${t}-` + i))
            }), s
        },
        $ = (t, i) => {
            let s = t;
            if (Array.isArray(t)) {
                if (1 === t.length) return void i(t[0]);
                s = t.slice()
            } else {
                if ("string" != typeof t || !t.includes(",")) return void i(s);
                s = t.split(",").map(t => t.trim())
            }
            let n;
            t = (t, e) => {
                e = u(s, e);
                e !== n && (n = e, i(e))
            };
            p.on("breakpointChange", t), t(0, p.activeBreakpoint)
        },
        Y = (t, i) => {
            const s = [];
            let n;
            t.forEach((t, e) => $(t, t => {
                s[e] = t, clearTimeout(n), n = setTimeout(() => {
                    i(s)
                }, 1)
            }))
        };
    class q {
        constructor(t, e, i) {
            this.composer = t, this.options = i, this.view = e, this.innerContainers = {}, this.outerContainers = {}, this._matchHeightList = [], this.options.register({
                layout: "boxed",
                stretch: !0,
                width: 900,
                height: 500,
                columns: 1,
                rtl: !1,
                keepAspectRatio: !0,
                delayBeforeResize: 0,
                fullscreenMargin: 0,
                narrowLayoutOn: "mobile",
                overflowFix: !0
            }), this.primaryContainer = document.createElement("div"), this.primaryContainer.classList.add(c + "-primary-container"), this.composer.element.appendChild(this.primaryContainer), this.viewContainer = document.createElement("div"), this.viewContainer.classList.add(c + "-view-container"), this.view.appendTo(this.viewContainer), this.primaryContainer.appendChild(this.viewContainer), this.view.options.has("reverse") && (t = this.options.get("rtl"), this.view.options.set("reverse", t), t && this.composer.element.classList.add(c + "-rtl"), this.options.observe("rtl", (t, e) => {
                this.view.options.set("reverse", e), this.composer.element.classList[e ? "add" : "remove"](c + "-rtl")
            })), this.update = this.update.bind(this), window.addEventListener("resize", this.update, !1), requestAnimationFrame(this.update), this.update()
        }
        update(e) {
            var t = this.options.get("delayBeforeResize");
            if (e && 0 < t) clearTimeout(this._resizeTimeout), this._resizeTimeout = setTimeout(this.update, t);
            else {
                var i = this.options.get(["layout", "width", "height", "maxHeight", "minHeight", "fullscreenMargin", "overflowFix", "narrowLayoutOn", "stretch"]);
                const n = this.composer.element;
                n.classList.add(c + "-layout-" + i.layout);
                var {
                    name: s,
                    size: e
                } = l();
                switch (s !== this.activeBreakpoint && (this.activeBreakpoint && this.composer.element.classList.remove(c + "-bp-" + this.activeBreakpoint), null !== (this.activeBreakpoint = s) && this.composer.element.classList.add(c + "-bp-" + s), this.activeBreakpointSize = s ? e : u(i.width, s)), this.isNarrow = s === i.narrowLayoutOn, this._lastNarrowStatus !== this.isNarrow && (this.isNarrow ? n.classList.add(c + "-narrow-layout") : n.classList.remove(c + "-narrow-layout"), this._lastNarrowStatus = this.isNarrow), i.layout) {
                    case "fullscreen":
                        i.overflowFix && document.body.classList.add(c + "-overflow-fix");
                    case "fullwidth":
                        i.stretch ? (n.style.width = document.body.clientWidth + "px", requestAnimationFrame(() => {
                            n.style.marginLeft = "";
                            var t = -(window.scrollX + Math.ceil(n.getBoundingClientRect().left)) + "px";
                            n.style.marginLeft = t;
                            try {
                                n.style.setProperty("margin-left", t, "important")
                            } catch (t) {}
                            n.style.width = document.body.clientWidth + "px"
                        })) : n.style.width = "100%";
                        break;
                    case "boxed":
                        n.style.maxWidth = u(i.width, s) + "px"
                }
                t = n.offsetWidth;
                if ("fullscreen" === i.layout)
                    if (i.stretch) {
                        e = window.innerHeight;
                        if (i.fullscreenMargin) {
                            let t = window.scrollY + Math.ceil(n.getBoundingClientRect().top);
                            "auto" === i.fullscreenMargin && .75 <= t / window.innerHeight ? t = 0 : "auto" !== i.fullscreenMargin && (t = i.fullscreenMargin), n.style.height = e - t + "px"
                        } else n.style.height = e + "px"
                    } else n.style.height = "100%";
                this.composer.trigger("beforeViewResize", [this]), this.view.resize(), this._updateMatchHeights(), t === this.width && this.height === n.offsetHeight || (this.width = t, this.height = n.offsetHeight, this.composer.trigger("resize")), this.composer.trigger("layoutUpdate", [this])
            }
        }
        getContainer(t) {
            var e, i;
            return "string" == typeof t && (e = -1 !== (t = t.toLowerCase()).indexOf("inner"), t = t.replace("inner", ""), i = e ? this.innerContainers : this.outerContainers, h.call(i, t) || this._createContainer(t, e), i[t])
        }
        onMatchHeight(t) {
            this._matchHeightList.push(t), this._updateMatchHeights()
        }
        offMatchHeight(t) {
            t.style.height = "", this._matchHeightList.splice(this._matchHeightList.indexOf(t), 1)
        }
        _updateMatchHeights() {
            this._matchHeightList.forEach(t => {
                t.style.height = this.slider.view.height + "px"
            })
        }
        _createContainer(t, e) {
            var i = document.createElement("div");
            i.classList.add(c + `-${t}-container`), (e ? (this.hasInnerBox || (this.hasInnerBox = !0, this.innerBox = document.createElement("div"), this.innerBox.classList.add(c + "-inner-container"), this.innerBox.appendChild(this.viewContainer), (this.hasMidRow ? this.midRow : this.primaryContainer).appendChild(this.innerBox)), this.innerContainers[t] = i, "right" === t || "left" === t ? (this.hasInnerMidRow || (this.hasInnerMidRow = !0, this.innerMidRow = document.createElement("div"), this.innerMidRow.classList.add(c + "-mid-row"), this.innerMidRow.appendChild(this.viewContainer), this.innerBox.appendChild(this.innerMidRow)), this.innerMidRow) : this.innerBox) : (this.outerContainers[t] = i, "right" === t || "left" === t ? (this.hasMidRow || (this.hasMidRow = !0, this.midRow = document.createElement("div"), this.midRow.classList.add(c + "-mid-row"), this.midRow.appendChild(this.hasInnerBox ? this.innerBox : this.viewContainer), this.primaryContainer.appendChild(this.midRow)), this.midRow) : this.primaryContainer)).appendChild(i), this.update()
        }
    }
    var X = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            timelineOffset: 0
        },
        Z = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0
        },
        G = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"],
        U = {
            CSS: {},
            springs: {}
        };

    function A(t, e, i) {
        return Math.min(Math.max(t, e), i)
    }

    function K(t, e) {
        return -1 < t.indexOf(e)
    }

    function J(t, e) {
        return t.apply(null, e)
    }
    var S = {
        arr: function(t) {
            return Array.isArray(t)
        },
        obj: function(t) {
            return K(Object.prototype.toString.call(t), "Object")
        },
        pth: function(t) {
            return S.obj(t) && t.hasOwnProperty("totalLength")
        },
        svg: function(t) {
            return t instanceof SVGElement
        },
        inp: function(t) {
            return t instanceof HTMLInputElement
        },
        dom: function(t) {
            return t.nodeType || S.svg(t)
        },
        str: function(t) {
            return "string" == typeof t
        },
        fnc: function(t) {
            return "function" == typeof t
        },
        und: function(t) {
            return void 0 === t
        },
        nil: function(t) {
            return S.und(t) || null === t
        },
        hex: function(t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
        },
        rgb: function(t) {
            return /^rgb/.test(t)
        },
        hsl: function(t) {
            return /^hsl/.test(t)
        },
        col: function(t) {
            return S.hex(t) || S.rgb(t) || S.hsl(t)
        },
        key: function(t) {
            return !X.hasOwnProperty(t) && !Z.hasOwnProperty(t) && "targets" !== t && "keyframes" !== t
        }
    };

    function Q(t) {
        t = /\(([^)]+)\)/.exec(t);
        return t ? t[1].split(",").map(function(t) {
            return parseFloat(t)
        }) : []
    }

    function tt(s, i) {
        var t = Q(s),
            e = A(S.und(t[0]) ? 1 : t[0], .1, 100),
            n = A(S.und(t[1]) ? 100 : t[1], .1, 100),
            o = A(S.und(t[2]) ? 10 : t[2], .1, 100),
            t = A(S.und(t[3]) ? 0 : t[3], .1, 100),
            r = Math.sqrt(n / e),
            a = o / (2 * Math.sqrt(n * e)),
            h = a < 1 ? r * Math.sqrt(1 - a * a) : 0,
            l = a < 1 ? (a * r - t) / h : -t + r;

        function c(t) {
            var e = i ? i * t / 1e3 : t,
                e = a < 1 ? Math.exp(-e * a * r) * (+Math.cos(h * e) + l * Math.sin(h * e)) : (1 + l * e) * Math.exp(-e * r);
            return 0 === t || 1 === t ? t : 1 - e
        }
        return i ? c : function() {
            var t = U.springs[s];
            if (t) return t;
            for (var e = 0, i = 0;;)
                if (1 === c(e += 1 / 6)) {
                    if (16 <= ++i) break
                } else i = 0;
            return t = e * (1 / 6) * 1e3, U.springs[s] = t
        }
    }

    function et(e) {
        return void 0 === e && (e = 10),
            function(t) {
                return Math.ceil(A(t, 1e-6, 1) * e) * (1 / e)
            }
    }
    var it = function(_, e, b, i) {
        if (0 <= _ && _ <= 1 && 0 <= b && b <= 1) {
            var w = new Float32Array(11);
            if (_ !== e || b !== i)
                for (var t = 0; t < 11; ++t) w[t] = nt(.1 * t, _, b);
            return function(t) {
                return _ === e && b === i || 0 === t || 1 === t ? t : nt(s(t), e, i)
            }
        }

        function s(t) {
            for (var e = 0, i = 1; 10 !== i && w[i] <= t; ++i) e += .1;
            var s = e + .1 * ((t - w[--i]) / (w[i + 1] - w[i])),
                n = ot(s, _, b);
            if (.001 <= n) {
                for (var o = t, r = s, a = _, h = b, l = 0; l < 4; ++l) {
                    var c = ot(r, a, h);
                    if (0 === c) return r;
                    r -= (nt(r, a, h) - o) / c
                }
                return r
            }
            if (0 === n) return s;
            for (var d, p, u = t, m = e, g = e + .1, v = _, f = b, y = 0; 0 < (d = nt(p = m + (g - m) / 2, v, f) - u) ? g = p : m = p, 1e-7 < Math.abs(d) && ++y < 10;);
            return p
        }
    };

    function st(t, e) {
        return 1 - 3 * e + 3 * t
    }

    function nt(t, e, i) {
        return ((st(e, i) * t + (3 * i - 6 * e)) * t + 3 * e) * t
    }

    function ot(t, e, i) {
        return 3 * st(e, i) * t * t + 2 * (3 * i - 6 * e) * t + 3 * e
    }
    e = {
        linear: function() {
            return function(t) {
                return t
            }
        }
    }, rt = {
        Sine: function() {
            return function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }
        },
        Circ: function() {
            return function(t) {
                return 1 - Math.sqrt(1 - t * t)
            }
        },
        Back: function() {
            return function(t) {
                return t * t * (3 * t - 2)
            }
        },
        Bounce: function() {
            return function(t) {
                for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        },
        Elastic: function(t, e) {
            void 0 === e && (e = .5);
            var i = A(t = void 0 === t ? 1 : t, 1, 10),
                s = A(e, .1, 2);
            return function(t) {
                return 0 === t || 1 === t ? t : -i * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s / (2 * Math.PI) * Math.asin(1 / i)) * (2 * Math.PI) / s)
            }
        }
    }, ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function(t, e) {
        rt[t] = function() {
            return function(t) {
                return Math.pow(t, e + 2)
            }
        }
    }), Object.keys(rt).forEach(function(t) {
        var s = rt[t];
        e["easeIn" + t] = s, e["easeOut" + t] = function(e, i) {
            return function(t) {
                return 1 - s(e, i)(1 - t)
            }
        }, e["easeInOut" + t] = function(e, i) {
            return function(t) {
                return t < .5 ? s(e, i)(2 * t) / 2 : 1 - s(e, i)(-2 * t + 2) / 2
            }
        }, e["easeOutIn" + t] = function(e, i) {
            return function(t) {
                return t < .5 ? (1 - s(e, i)(1 - 2 * t)) / 2 : (s(e, i)(2 * t - 1) + 1) / 2
            }
        }
    });
    var e, rt, at = e;

    function ht(t, e) {
        if (S.fnc(t)) return t;
        var i = t.split("(")[0],
            s = at[i],
            n = Q(t);
        switch (i) {
            case "spring":
                return tt(t, e);
            case "cubicBezier":
                return J(it, n);
            case "steps":
                return J(et, n);
            default:
                return J(s, n)
        }
    }

    function lt(t) {
        try {
            return document.querySelectorAll(t)
        } catch (t) {}
    }

    function ct(t, e) {
        for (var i, s = t.length, n = 2 <= arguments.length ? e : void 0, o = [], r = 0; r < s; r++) r in t && (i = t[r], e.call(n, i, r, t)) && o.push(i);
        return o
    }

    function dt(t) {
        return t.reduce(function(t, e) {
            return t.concat(S.arr(e) ? dt(e) : e)
        }, [])
    }

    function pt(t) {
        return S.arr(t) ? t : (t = S.str(t) ? lt(t) || t : t) instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t]
    }

    function ut(t, e) {
        return t.some(function(t) {
            return t === e
        })
    }

    function mt(t) {
        var e, i = {};
        for (e in t) i[e] = t[e];
        return i
    }

    function gt(t, e) {
        var i, s = mt(t);
        for (i in t) s[i] = (e.hasOwnProperty(i) ? e : t)[i];
        return s
    }

    function vt(t, e) {
        var i, s = mt(t);
        for (i in e) s[i] = (S.und(t[i]) ? e : t)[i];
        return s
    }

    function ft(t) {
        var e, i, s, n, o, r, a;
        return S.rgb(t) ? (e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(i = t)) ? "rgba(" + e[1] + ",1)" : i : S.hex(t) ? (e = (e = t).replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(t, e, i, s) {
            return e + e + i + i + s + s
        }), e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), "rgba(" + parseInt(e[1], 16) + "," + parseInt(e[2], 16) + "," + parseInt(e[3], 16) + ",1)") : S.hsl(t) ? (i = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(i = t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(i), t = parseInt(i[1], 10) / 360, r = parseInt(i[2], 10) / 100, a = parseInt(i[3], 10) / 100, i = i[4] || 1, 0 == r ? s = n = o = a : (s = h(r = 2 * a - (a = a < .5 ? a * (1 + r) : a + r - a * r), a, t + 1 / 3), n = h(r, a, t), o = h(r, a, t - 1 / 3)), "rgba(" + 255 * s + "," + 255 * n + "," + 255 * o + "," + i + ")") : void 0;

        function h(t, e, i) {
            return i < 0 && (i += 1), 1 < i && --i, i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
        }
    }

    function E(t) {
        t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
        if (t) return t[1]
    }

    function yt(t, e) {
        return S.fnc(t) ? t(e.target, e.id, e.total) : t
    }

    function o(t, e) {
        return t.getAttribute(e)
    }

    function _t(t, e, i) {
        var s, n, o;
        return ut([i, "deg", "rad", "turn"], E(e)) ? e : (s = U.CSS[e + i], S.und(s) ? (n = document.createElement(t.tagName), (t = t.parentNode && t.parentNode !== document ? t.parentNode : document.body).appendChild(n), n.style.position = "absolute", n.style.width = 100 + i, o = 100 / n.offsetWidth, t.removeChild(n), t = o * parseFloat(e), U.CSS[e + i] = t) : s)
    }

    function bt(t, e, i) {
        var s;
        if (e in t.style) return s = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), e = t.style[e] || getComputedStyle(t).getPropertyValue(s) || "0", i ? _t(t, e, i) : e
    }

    function wt(t, e) {
        return S.dom(t) && !S.inp(t) && (!S.nil(o(t, e)) || S.svg(t) && t[e]) ? "attribute" : S.dom(t) && ut(G, e) ? "transform" : S.dom(t) && "transform" !== e && bt(t, e) ? "css" : null != t[e] ? "object" : void 0
    }

    function xt(t) {
        if (S.dom(t)) {
            for (var e, i = t.style.transform || "", s = /(\w+)\(([^)]*)\)/g, n = new Map; e = s.exec(i);) n.set(e[1], e[2]);
            return n
        }
    }

    function St(t, e, i, s) {
        var n = K(e, "scale") ? 1 : 0 + (K(n = e, "translate") || "perspective" === n ? "px" : K(n, "rotate") || K(n, "skew") ? "deg" : void 0),
            o = xt(t).get(e) || n;
        return i && (i.transforms.list.set(e, o), i.transforms.last = e), s ? _t(t, o, s) : o
    }

    function At(t, e, i, s) {
        switch (wt(t, e)) {
            case "transform":
                return St(t, e, s, i);
            case "css":
                return bt(t, e, i);
            case "attribute":
                return o(t, e);
            default:
                return t[e] || 0
        }
    }

    function Et(t, e) {
        var i = /^(\*=|\+=|-=)/.exec(t);
        if (!i) return t;
        var s = E(t) || 0,
            n = parseFloat(e),
            o = parseFloat(t.replace(i[0], ""));
        switch (i[0][0]) {
            case "+":
                return n + o + s;
            case "-":
                return n - o + s;
            case "*":
                return n * o + s
        }
    }

    function Ct(t, e) {
        var i;
        return S.col(t) ? ft(t) : /\s/g.test(t) ? t : (i = (i = E(t)) ? t.substr(0, t.length - i.length) : t, e ? i + e : i)
    }

    function kt(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    }

    function Lt(t) {
        for (var e, i = t.points, s = 0, n = 0; n < i.numberOfItems; n++) {
            var o = i.getItem(n);
            0 < n && (s += kt(e, o)), e = o
        }
        return s
    }

    function It(t) {
        if (t.getTotalLength) return t.getTotalLength();
        switch (t.tagName.toLowerCase()) {
            case "circle":
                return 2 * Math.PI * o(t, "r");
            case "rect":
                return 2 * o(i = t, "width") + 2 * o(i, "height");
            case "line":
                return kt({
                    x: o(i = t, "x1"),
                    y: o(i, "y1")
                }, {
                    x: o(i, "x2"),
                    y: o(i, "y2")
                });
            case "polyline":
                return Lt(t);
            case "polygon":
                return e = t.points, Lt(t) + kt(e.getItem(e.numberOfItems - 1), e.getItem(0))
        }
        var e, i
    }

    function Ot(t, e) {
        var e = e || {},
            t = e.el || function(t) {
                for (var e = t.parentNode; S.svg(e) && S.svg(e.parentNode);) e = e.parentNode;
                return e
            }(t),
            i = t.getBoundingClientRect(),
            s = o(t, "viewBox"),
            n = i.width,
            i = i.height,
            e = e.viewBox || (s ? s.split(" ") : [0, 0, n, i]);
        return {
            el: t,
            viewBox: e,
            x: +e[0],
            y: +e[1],
            w: n,
            h: i,
            vW: e[2],
            vH: e[3]
        }
    }

    function Tt(t, e) {
        var i = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            s = Ct(S.pth(t) ? t.totalLength : t, e) + "";
        return {
            original: s,
            numbers: s.match(i) ? s.match(i).map(Number) : [0],
            strings: S.str(t) || e ? s.split(i) : []
        }
    }

    function Pt(t) {
        return ct(t ? dt(S.arr(t) ? t.map(pt) : pt(t)) : [], function(t, e, i) {
            return i.indexOf(t) === e
        })
    }

    function Mt(t) {
        var i = Pt(t);
        return i.map(function(t, e) {
            return {
                target: t,
                id: e,
                total: i.length,
                transforms: {
                    list: xt(t)
                }
            }
        })
    }

    function Dt(e) {
        for (var i = ct(dt(e.map(function(t) {
                return Object.keys(t)
            })), function(t) {
                return S.key(t)
            }).reduce(function(t, e) {
                return t.indexOf(e) < 0 && t.push(e), t
            }, []), n = {}, t = 0; t < i.length; t++) ! function(t) {
            var s = i[t];
            n[s] = e.map(function(t) {
                var e, i = {};
                for (e in t) S.key(e) ? e == s && (i.value = t[e]) : i[e] = t[e];
                return i
            })
        }(t);
        return n
    }

    function Bt(t, e) {
        var i, s = [],
            n = e.keyframes;
        for (i in e = n ? vt(Dt(n), e) : e) S.key(i) && s.push({
            name: i,
            tweens: function(t, i) {
                var e, s = mt(i),
                    n = (/^spring/.test(s.easing) && (s.duration = tt(s.easing)), S.arr(t) && (2 === (e = t.length) && !S.obj(t[0]) ? t = {
                        value: t
                    } : S.fnc(i.duration) || (s.duration = i.duration / e)), S.arr(t) ? t : [t]);
                return n.map(function(t, e) {
                    t = S.obj(t) && !S.pth(t) ? t : {
                        value: t
                    };
                    return S.und(t.delay) && (t.delay = e ? 0 : i.delay), S.und(t.endDelay) && (t.endDelay = e === n.length - 1 ? i.endDelay : 0), t
                }).map(function(t) {
                    return vt(t, s)
                })
            }(e[i], t)
        });
        return s
    }

    function zt(a, h) {
        var l;
        return a.tweens.map(function(t) {
            var t = function(t, e) {
                    var i, s = {};
                    for (i in t) {
                        var n = yt(t[i], e);
                        S.arr(n) && 1 === (n = n.map(function(t) {
                            return yt(t, e)
                        })).length && (n = n[0]), s[i] = n
                    }
                    return s.duration = parseFloat(s.duration), s.delay = parseFloat(s.delay), s
                }(t, h),
                e = t.value,
                i = S.arr(e) ? e[1] : e,
                s = E(i),
                n = At(h.target, a.name, s, h),
                o = l ? l.to.original : n,
                r = S.arr(e) ? e[0] : o,
                n = E(r) || E(n),
                s = s || n;
            return S.und(i) && (i = o), t.from = Tt(r, s), t.to = Tt(Et(i, r), s), t.start = l ? l.end : 0, t.end = t.start + t.delay + t.duration + t.endDelay, t.easing = ht(t.easing, t.duration), t.isPath = S.pth(e), t.isPathTargetInsideSVG = t.isPath && S.svg(h.target), t.isColor = S.col(t.from.original), t.isColor && (t.round = 1), l = t
        })
    }
    var Vt = {
        css: function(t, e, i) {
            return t.style[e] = i
        },
        attribute: function(t, e, i) {
            return t.setAttribute(e, i)
        },
        object: function(t, e, i) {
            return t[e] = i
        },
        transform: function(t, e, i, s, n) {
            var o;
            s.list.set(e, i), e !== s.last && !n || (o = "", s.list.forEach(function(t, e) {
                o += e + "(" + t + ") "
            }), t.style.transform = o)
        }
    };

    function Rt(t, r) {
        Mt(t).forEach(function(t) {
            for (var e in r) {
                var i = yt(r[e], t),
                    s = t.target,
                    n = E(i),
                    o = At(s, e, n, t),
                    i = Et(Ct(i, n || E(o)), o),
                    n = wt(s, e);
                Vt[n](s, e, i, t.transforms, !0)
            }
        })
    }

    function jt(t, e) {
        return ct(dt(t.map(function(o) {
            return e.map(function(t) {
                var e, i, s = o,
                    n = wt(s.target, t.name);
                if (n) return i = (e = zt(t, s))[e.length - 1], {
                    type: n,
                    property: t.name,
                    animatable: s,
                    tweens: e,
                    duration: i.end,
                    delay: e[0].delay,
                    endDelay: i.endDelay
                }
            })
        })), function(t) {
            return !S.und(t)
        })
    }

    function Wt(t, e) {
        function i(t) {
            return t.timelineOffset || 0
        }
        var s = t.length,
            n = {};
        return n.duration = s ? Math.max.apply(Math, t.map(function(t) {
            return i(t) + t.duration
        })) : e.duration, n.delay = s ? Math.min.apply(Math, t.map(function(t) {
            return i(t) + t.delay
        })) : e.delay, n.endDelay = s ? n.duration - Math.max.apply(Math, t.map(function(t) {
            return i(t) + t.duration - t.endDelay
        })) : e.endDelay, n
    }
    var Nt = 0;
    var Ht, b = [],
        Ft = ("undefined" != typeof document && document.addEventListener("visibilitychange", function() {
            C.suspendWhenDocumentHidden && (Yt() ? Ht = cancelAnimationFrame(Ht) : (b.forEach(function(t) {
                return t._onDocumentVisibility()
            }), Ft()))
        }), function() {
            !(Ht || Yt() && C.suspendWhenDocumentHidden) && 0 < b.length && (Ht = requestAnimationFrame($t))
        });

    function $t(t) {
        for (var e = b.length, i = 0; i < e;) {
            var s = b[i];
            s.paused ? (b.splice(i, 1), e--) : (s.tick(t), i++)
        }
        Ht = 0 < i ? requestAnimationFrame($t) : void 0
    }

    function Yt() {
        return document && document.hidden
    }

    function C(t) {
        var h, l = 0,
            c = 0,
            d = 0,
            p = 0,
            u = null;

        function m(t) {
            var e = window.Promise && new Promise(function(t) {
                return u = t
            });
            t.finished = e
        }
        e = gt(X, t = t = void 0 === t ? {} : t), i = Bt(s = gt(Z, t), t), t = Mt(t.targets), s = Wt(i = jt(t, i), s), n = Nt, Nt++;
        var e, i, s, n, S = vt(e, {
            id: n,
            children: [],
            animatables: t,
            animations: i,
            duration: s.duration,
            delay: s.delay,
            endDelay: s.endDelay
        });

        function g() {
            var t = S.direction;
            "alternate" !== t && (S.direction = "normal" !== t ? "normal" : "reverse"), S.reversed = !S.reversed, h.forEach(function(t) {
                return t.reversed = S.reversed
            })
        }

        function v(t) {
            return S.reversed ? S.duration - t : t
        }

        function o() {
            l = 0, c = v(S.currentTime) * (1 / C.speed)
        }

        function f(t, e) {
            e && e.seek(t - e.timelineOffset)
        }

        function y(e) {
            for (var t = 0, i = S.animations, s = i.length; t < s;) {
                for (var n = i[t], o = n.animatable, r = n.tweens, a = r.length - 1, h = r[a], a = (a && (h = ct(r, function(t) {
                        return e < t.end
                    })[0] || h), A(e - h.start - h.delay, 0, h.duration) / h.duration), l = isNaN(a) ? 1 : h.easing(a), c = h.to.strings, d = h.round, p = [], u = h.to.numbers.length, m = void 0, g = 0; g < u; g++) {
                    var v = void 0,
                        f = h.to.numbers[g],
                        y = h.from.numbers[g] || 0,
                        v = h.isPath ? function(e, i, t) {
                            function s(t) {
                                return e.el.getPointAtLength(1 <= i + (t = void 0 === t ? 0 : t) ? i + t : 0)
                            }
                            var n = Ot(e.el, e.svg),
                                o = s(),
                                r = s(-1),
                                a = s(1),
                                h = t ? 1 : n.w / n.vW,
                                l = t ? 1 : n.h / n.vH;
                            switch (e.property) {
                                case "x":
                                    return (o.x - n.x) * h;
                                case "y":
                                    return (o.y - n.y) * l;
                                case "angle":
                                    return 180 * Math.atan2(a.y - r.y, a.x - r.x) / Math.PI
                            }
                        }(h.value, l * f, h.isPathTargetInsideSVG) : y + l * (f - y);
                    !d || h.isColor && 2 < g || (v = Math.round(v * d) / d), p.push(v)
                }
                var _ = c.length;
                if (_)
                    for (var m = c[0], b = 0; b < _; b++) {
                        c[b];
                        var w = c[b + 1],
                            x = p[b];
                        isNaN(x) || (m += w ? x + w : x + " ")
                    } else m = p[0];
                Vt[n.type](o.target, n.property, m, o.transforms), n.currentValue = m, t++
            }
        }

        function _(t) {
            S[t] && !S.passThrough && S[t](S)
        }

        function r(t) {
            var e = S.duration,
                i = S.delay,
                s = e - S.endDelay,
                n = v(t);
            if (S.progress = A(n / e * 100, 0, 100), S.reversePlayback = n < S.currentTime, h) {
                var o = n;
                if (S.reversePlayback)
                    for (var r = p; r--;) f(o, h[r]);
                else
                    for (var a = 0; a < p; a++) f(o, h[a])
            }!S.began && 0 < S.currentTime && (S.began = !0, _("begin")), !S.loopBegan && 0 < S.currentTime && (S.loopBegan = !0, _("loopBegin")), n <= i && 0 !== S.currentTime && y(0), (s <= n && S.currentTime !== e || !e) && y(e), i < n && n < s ? (S.changeBegan || (S.changeBegan = !0, S.changeCompleted = !1, _("changeBegin")), _("change"), y(n)) : S.changeBegan && (S.changeCompleted = !0, S.changeBegan = !1, _("changeComplete")), S.currentTime = A(n, 0, e), S.began && _("update"), e <= t && (c = 0, S.remaining && !0 !== S.remaining && S.remaining--, S.remaining ? (l = d, _("loopComplete"), S.loopBegan = !1, "alternate" === S.direction && g()) : (S.paused = !0, S.completed || (S.completed = !0, _("loopComplete"), _("complete"), !S.passThrough && "Promise" in window && (u(), m(S)))))
        }
        return m(S), S.reset = function() {
            var t = S.direction;
            S.passThrough = !1, S.currentTime = 0, S.progress = 0, S.paused = !0, S.began = !1, S.loopBegan = !1, S.changeBegan = !1, S.completed = !1, S.changeCompleted = !1, S.reversePlayback = !1, S.reversed = "reverse" === t, S.remaining = S.loop, h = S.children;
            for (var e = p = h.length; e--;) S.children[e].reset();
            (S.reversed && !0 !== S.loop || "alternate" === t && 1 === S.loop) && S.remaining++, y(S.reversed ? S.duration : 0)
        }, S._onDocumentVisibility = o, S.set = function(t, e) {
            return Rt(t, e), S
        }, S.tick = function(t) {
            r(((d = t) + (c - (l = l || d))) * C.speed)
        }, S.seek = function(t) {
            r(v(t))
        }, S.pause = function() {
            S.paused = !0, o()
        }, S.play = function() {
            S.paused && (S.completed && S.reset(), S.paused = !1, b.push(S), o(), Ft())
        }, S.reverse = function() {
            g(), S.completed = !S.reversed, o()
        }, S.restart = function() {
            S.reset(), S.play()
        }, S.remove = function(t) {
            Xt(Pt(t), S)
        }, S.reset(), S.autoplay && S.play(), S
    }

    function qt(t, e) {
        for (var i = e.length; i--;) ut(t, e[i].animatable.target) && e.splice(i, 1)
    }

    function Xt(t, e) {
        var i = e.animations,
            s = e.children;
        qt(t, i);
        for (var n = s.length; n--;) {
            var o = s[n],
                r = o.animations;
            qt(t, r), r.length || o.children.length || s.splice(n, 1)
        }
        i.length || s.length || e.pause()
    }
    C.version = "3.2.1", C.speed = 1, C.suspendWhenDocumentHidden = !0, C.running = b, C.remove = function(t) {
        for (var e = Pt(t), i = b.length; i--;) Xt(e, b[i])
    }, C.get = At, C.set = Rt, C.convertPx = _t, C.path = function(t, e) {
        var i = S.str(t) ? lt(t)[0] : t,
            s = e || 100;
        return function(t) {
            return {
                property: t,
                el: i,
                svg: Ot(i),
                totalLength: It(i) * (s / 100)
            }
        }
    }, C.setDashoffset = function(t) {
        var e = It(t);
        return t.setAttribute("stroke-dasharray", e), e
    }, C.stagger = function(t, e) {
        var a = (e = void 0 === e ? {} : e).direction || "normal",
            h = e.easing ? ht(e.easing) : null,
            l = e.grid,
            c = e.axis,
            d = e.from || 0,
            p = "first" === d,
            u = "center" === d,
            m = "last" === d,
            g = S.arr(t),
            v = g ? parseFloat(t[0]) : parseFloat(t),
            f = g ? parseFloat(t[1]) : 0,
            y = E(g ? t[1] : t) || 0,
            _ = e.start || 0 + (g ? v : 0),
            b = [],
            w = 0;
        return function(t, e, i) {
            if (p && (d = 0), u && (d = (i - 1) / 2), m && (d = i - 1), !b.length) {
                for (var s, n, o, r = 0; r < i; r++) l ? (s = u ? (l[0] - 1) / 2 : d % l[0], n = u ? (l[1] - 1) / 2 : Math.floor(d / l[0]), s = s - r % l[0], n = n - Math.floor(r / l[0]), o = Math.sqrt(s * s + n * n), "x" === c && (o = -s), b.push(o = "y" === c ? -n : o)) : b.push(Math.abs(d - r)), w = Math.max.apply(Math, b);
                h && (b = b.map(function(t) {
                    return h(t / w) * w
                })), "reverse" === a && (b = b.map(function(t) {
                    return c ? t < 0 ? -1 * t : -t : Math.abs(w - t)
                }))
            }
            return _ + (g ? (f - v) / w : v) * (Math.round(100 * b[e]) / 100) + y
        }
    }, C.timeline = function(r) {
        var a = C(r = void 0 === r ? {} : r);
        return a.duration = 0, a.add = function(t, e) {
            var i = b.indexOf(a),
                s = a.children;

            function n(t) {
                t.passThrough = !0
            } - 1 < i && b.splice(i, 1);
            for (var o = 0; o < s.length; o++) n(s[o]);
            i = vt(t, gt(Z, r)), i.targets = i.targets || r.targets, t = a.duration, i.autoplay = !1, i.direction = a.direction, i.timelineOffset = S.und(e) ? t : Et(e, t), n(a), a.seek(i.timelineOffset), e = C(i), n(e), s.push(e), t = Wt(s, r);
            return a.delay = t.delay, a.endDelay = t.endDelay, a.duration = t.duration, a.seek(0), a.reset(), a.autoplay && a.play(), a
        }, a
    }, C.easing = ht, C.penner = at, C.random = function(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    };
    class Zt extends t {
        constructor() {
            super(), this.sections = [], this.sectionsCount = 0, this._index = -1, this.indexes = [], this.currentSection = null, this.eventPrefix = "view", this._loop = !1, this._size = 0
        }
        get index() {
            return this._index
        }
        set index(t) {
            t !== this._index && (this._index = t, this.currentSection = this.sections[t], this.trigger("indexChange", [t], !0))
        }
        get loop() {
            return this._loop
        }
        set loop(t) {
            this._loop !== t && (this._loop = t, this.update())
        }
        get size() {
            return this._size
        }
        set size(t) {
            this._size !== t && (this._size = t, this.update())
        }
        get count() {
            return this.sectionsCount
        }
        appendSection(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            this.sections.push(t), this._afterSectionAdd(t, e)
        }
        prependSection(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            this.sections.unshift(t), this._afterSectionAdd(t, e)
        }
        insertSectionAfter(t, e) {
            var i = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
            this.insertSectionAt(t, this.sections.indexOf(e), i)
        }
        insertSectionAt(t, e) {
            var i = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
            e < 0 || (this.sections.splice(e, 0, t), this._afterSectionAdd(t, i))
        }
        removeSection(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            return this.removeSectionByIndex(this.section.indexOf(t), e)
        }
        removeSectionByIndex(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            return !(t < 0) && ((t = this.sections.splice(t, 1)).unmount(), this.trigger("sectionRemove", t), e && this.update(), t[0])
        }
        update() {
            this.trigger("update", null, !0)
        }
        updateSectionsIndex() {
            this.sections.forEach((t, e) => {
                t.index = e
            })
        }
        _afterSectionAdd(t, e) {
            this.sectionsCount = this.sections.length, t.mount(this), this.updateSectionsIndex(), e && this.update(), this.trigger("sectionAdd", [t])
        }
    }
    class Gt extends Zt {
        constructor() {
            super(), this.element = document.createElement("div"), this.element.classList.add(c + "-view"), this.sectionsContainer = document.createElement("div"), this.sectionsContainer.classList.add(c + "-sections"), this.element.appendChild(this.sectionsContainer), this.sizeProp = "width"
        }
        resize() {
            var t = this.element.offsetWidth,
                e = this.element.offsetHeight;
            return this.width = t, this.height = e, this.size = this[this.sizeProp], (t !== this.width || e !== this.height) && (this.trigger("resize", [t, e], !0), !0)
        }
        appendTo(t) {
            t.appendChild(this.element), this.resize(), this.trigger("elementAppend", [t], !0)
        }
        appendSection(t) {
            this.sectionsContainer.appendChild(t.element), super.appendSection(t)
        }
        prependSection(t) {
            this.sectionsContainer.hasChildNodes ? this.sectionsContainer.insertBefore(t.element, this.sectionsContainer.firstChild) : this.sectionsContainer.appendChild(t.element), super.prependSection(t)
        }
        insertSectionAt(t, e) {
            e < 0 || (this.sectionsContainer.insertBefore(t.element, this.sectionsContainer.childNodes[e]), super.insertSectionAt(t, e))
        }
        removeSectionByIndex(t) {
            return !(t < 0) && (this.sections[t].element.remove(), super.removeSectionByIndex(t))
        }
    }
    class Ut extends Gt {
        constructor() {
            super(), this.activeEnteringSection = !1, this.activeFactor = .8, this.visibleIndex = 0, this.visibleIndexes = [], this.scrollable = !0, this._size = 0, this._position = 0, this._length = 0
        }
        get position() {
            return this._position
        }
        set position(t) {
            this._position !== t && (this.scrollDirection = t > this._position ? "forward" : "backward", this._loop ? this._position = this.normalizePosition(t) : this._position = t, this.update(!1), this.trigger("scroll", [this._position]))
        }
        get nominalLength() {
            return this._length - this._size
        }
        get length() {
            return this._length
        }
        get size() {
            return this._size
        }
        set size(t) {
            if (this._size !== t) {
                var e = this._size ? t / this._size : 1;
                this._size = t;
                let i = 0;
                this.sections.some((t, e) => !(e < this.visibleIndex && (i += t.space, 1))), this._position = (this._position - i) * e + i
            }
            this.update()
        }
        arrange() {
            var t = this._length;
            this._length = 0, this.sections.forEach((t, e) => {
                t.index = e, t.position = this._length, t.offset = this._length, t.calculateSize(this.options.get("dir"), !0), this._length += t.size
            }), this._sectionsCount && !this._loop && (this._length -= this.sections[this._sectionsCount - 1].space), this.trigger("arrange", null, !0), this._length !== t && this.trigger("lengthChange", [this._length], this)
        }
        locateInLoop() {
            if (this._loop) {
                let e = 0,
                    i = -1,
                    s = 0,
                    n = 0,
                    o;
                if (this.sections.some(t => !!t.inRangeTest(this._position) && (o = t, !0)), o) {
                    for (let t = 0; t !== this._sectionsCount; t += 1) {
                        var r = this.sections[(t + o.index) % this._sectionsCount];
                        if (r.offset = o.position + e, e += r.size, -1 !== (i = -1 === i && r.inRangeTest((this._position + this._size) % this._length) ? (this._length - e) / 2 : i) && r.inRangeTest((this._position + i + this._size) % this._length)) {
                            s = (t + 1 + o.index) % this._sectionsCount, n = this._sectionsCount - (t + 1);
                            break
                        }
                    }
                    e = 0;
                    for (let t = n - 1; 0 <= t; --t) {
                        var a = this.sections[(t + s) % this._sectionsCount];
                        e += a.size, a.offset = o.position - e
                    }
                    this.trigger("loopUpdate", null, !0)
                }
            }
        }
        update() {
            var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
            this._sectionsCount = this.sections.length, t && this.arrange(), this.locateInLoop(), this.updateStatusAndIndex(), this.trigger("update", [this._position], !0)
        }
        updateStatusAndIndex() {
            let n = [],
                o = [],
                r;
            const a = Math.round(this._position);
            this.sections.forEach(t => {
                let e = "in";
                t.offset + t.size <= a ? e = "passed" : t.offset < a ? e = "forward" === this.scrollDirection ? "leaving" : "entering" : t.offset - t.space >= a + this._size ? e = "pending" : t.offset + t.size - t.space > a + this._size && (e = "forward" !== this.scrollDirection ? "leaving" : "entering"), t.inRangeTest(a) && (r = t.index), "passed" !== e && "pending" !== e && o.push(t.index), t.status = e;
                var i = t.offset - a,
                    s = t.offset + t.size - t.space - a - this._size;
                t.pendingOffset = i <= 0 ? i : Math.max(0, s), this.activeEnteringSection ? (i = t.size * this.activeFactor, t.active = t.offset + i >= a && t.offset + t.size - i <= a + this._size + t.space) : t.active = "in" === e, t.active && n.push(t.index)
            }), o = o.sort((t, e) => this.sections[t].offset - this.sections[e].offset), this.visibleIndexes.toString() !== o.toString() && (this.visibleIndexes = o, this.trigger("visibleIndexesChange", [this.visibleIndexes], !0)), this.visibleIndex !== r && (this.visibleIndex = r, this.trigger("visibleIndexChange", [this.visibleIndex], !0)), n = n.sort((t, e) => this.sections[t].offset - this.sections[e].offset), this.indexes.toString() !== n.toString() && (this.indexes = n, this.trigger("indexesChange", [this.indexes]));
            var t = this.indexes[0];
            this.index !== t && (this.index = t, this.trigger("indexChange", [this.index]))
        }
        normalizePositionByDirection(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "auto";
            t = this._loop ? this.normalizePosition(t) : Math.min(t, this._length - this._size);
            let i = 0;
            if (this._loop && "off" !== e) {
                var s = this._position,
                    n = t,
                    o = s < n ? n - s : this._length - s + n,
                    r = s < n ? n - this._length - s : n - s;
                switch (e) {
                    case "auto":
                        i = Math.abs(r) < Math.abs(o) ? r : o;
                        break;
                    case "backward":
                        i = r;
                        break;
                    default:
                        i = o
                }
                return this._position + i
            }
            return t
        }
        scrollTo(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
                i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
                s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "auto",
                n = 4 < arguments.length ? arguments[4] : void 0;
            this.killScrollAnimation(), t = this.normalizePositionByDirection(t, s), e ? ((n = w(w({
                easing: "easeOutExpo",
                duration: 1e3 * i
            }, n), {}, {
                complete: () => {
                    this.animating = !1, this.trigger("scrollToAnimationEnd", void 0, !0)
                }
            })).position = t, this.animating = !0, C(w({
                targets: this
            }, n))) : this.position = t
        }
        killScrollAnimation() {
            this.animating && (C.remove(this), this.animating = !1)
        }
        goToSection(t) {
            this.scrollTo(t.position, !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1], 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1, 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "auto", 4 < arguments.length ? arguments[4] : void 0)
        }
        goToIndex(t) {
            t >= this.sectionsCount || this.goToSection(this.sections[t], !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1], 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1, 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "auto", 4 < arguments.length ? arguments[4] : void 0)
        }
        getIndexAtPosition(i) {
            this._loop && (i = this.normalizePosition(i)), i %= this._length;
            let s = -1;
            return this.sections.some((t, e) => !!t.inRangeTest(i, this.activeEnteringSection ? this.activeFactor : 1) && (s = e, !0)), -1 === s ? this._loop ? 0 : this.sectionsCount - 1 : s
        }
        getIndexesAtPosition(t) {
            t = this._loop ? this.normalizePosition(t) : Math.min(t, this._length - this._size);
            var i = this.getIndexAtPosition(t),
                t = t + this._size,
                s = t > this._length ? t % this._length : t,
                n = [];
            for (let e = 0; e !== this._sectionsCount; e += 1) {
                let t;
                if (this._loop) t = this.sections[(e + i) % this._sectionsCount];
                else {
                    if (e + i >= this._sectionsCount) return n;
                    t = this.sections[e + i]
                }
                if (n.push(t.index), t.inRangeTest(s)) return !this.activeEnteringSection || t.position + t.size - t.size * this.activeFactor < s || n.pop(), n
            }
            return n
        }
        normalizePosition(t) {
            return (t %= this._length) < 0 && (t += this.length), t
        }
    }
    class Kt {
        constructor(t) {
            this._drag = t, this._dragLog = Math.log(t), this._x = 0, this._v = 0, this._startTime = 0
        }
        set(t, e) {
            this._x = t, this._v = e, this._startTime = Date.now()
        }
        x(t) {
            return void 0 === t && (t = (Date.now() - this._startTime) / 1e3), this._x + this._v * this._drag ** t / this._dragLog - this._v / this._dragLog
        }
        dx() {
            var t = (Date.now() - this._startTime) / 1e3;
            return this._v * this._drag ** t
        }
        done() {
            return Math.abs(this.dx()) < 1
        }
    }
    const n = .001;

    function Jt(t, e, i) {
        return e - i < t && t < e + i
    }

    function r(t, e) {
        return Jt(t, 0, e)
    }
    class Qt {
        constructor(t, e, i) {
            this._m = t, this._k = e, this._c = i, this._solution = null, this._endPosition = 0, this._startTime = 0
        }
        _solve(t, e) {
            var i = this._c,
                s = this._m,
                n = this._k,
                o = i * i - 4 * s * n;
            if (0 == o) {
                const a = -i / (2 * s),
                    h = t,
                    l = e / (a * t);
                return {
                    x(t) {
                        return (h + l * t) * Math.E ** (a * t)
                    },
                    dx(t) {
                        var e = Math.E ** (a * t);
                        return a * (h + l * t) * e + l * e
                    }
                }
            }
            if (0 < o) {
                const c = (-i - Math.sqrt(o)) / (2 * s),
                    d = (-i + Math.sqrt(o)) / (2 * s),
                    l = (e - c * t) / (d - c),
                    h = t - l;
                return {
                    x(t) {
                        return h * Math.E ** (c * t) + l * Math.E ** (d * t)
                    },
                    dx(t) {
                        return h * c * Math.E ** (c * t) + l * d * Math.E ** (d * t)
                    }
                }
            }
            const r = Math.sqrt(4 * s * n - i * i) / (2 * s),
                a = -i / 2 * s,
                h = t,
                l = (e - a * t) / r;
            return {
                x(t) {
                    return Math.E ** (a * t) * (h * Math.cos(r * t) + l * Math.sin(r * t))
                },
                dx(t) {
                    var e = Math.E ** (a * t),
                        i = Math.cos(r * t),
                        t = Math.sin(r * t);
                    return e * (l * r * i - h * r * t) + a * e * (l * t + h * i)
                }
            }
        }
        x(t) {
            return void 0 === t && (t = (Date.now() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(t) : 0
        }
        dx(t) {
            return void 0 === t && (t = (Date.now() - this._startTime) / 1e3), this._solution ? this._solution.dx(t) : 0
        }
        setEnd(e, i, s) {
            if (s = s || Date.now(), e !== this._endPosition || !r(i, n)) {
                i = i || 0;
                let t = this._endPosition;
                this._solution && (r(i, n) && (i = this._solution.dx((s - this._startTime) / 1e3)), t = this._solution.x((s - this._startTime) / 1e3), r(i, n) && (i = 0), r(t, n) && (t = 0), t += this._endPosition), this._solution && r(t - e, n) && r(i, n) || (this._endPosition = e, this._solution = this._solve(t - this._endPosition, i), this._startTime = s)
            }
        }
        snap(t) {
            this._startTime = Date.now(), this._endPosition = t, this._solution = {
                x() {
                    return 0
                },
                dx() {
                    return 0
                }
            }
        }
        done(t) {
            return Jt(this.x(), this._endPosition, n) && r(this.dx(), n)
        }
        springConstant() {
            return this._k
        }
        damping() {
            return this._c
        }
    }
    class te {
        constructor(t) {
            this._f = t || 1e-4, this._endPosition = 0, this._x = 0, this._start = 0, this._minV = 700, this._maxV = 1e4
        }
        x(t) {
            return this.done() || t ? this._end : (this._x += this.dx(), this._x)
        }
        dx() {
            var t = Math.abs(this._start - this._end),
                e = .01 * this._v;
            return e -= e * this._f, t / Math.round(t / e)
        }
        setEnd(t, e) {
            this._end = t, this._v = e || 1e3 * Math.sign(this._end - this._start), Math.abs(this._v) > this._maxV && (this._v = this._maxV * Math.sign(this._v)), Math.abs(this._v) < this._minV && (this._v = this._minV * Math.sign(this._v))
        }
        snap(t) {
            this._x = t, this._start = t
        }
        done() {
            return Math.abs(this._x - this._end) < 2
        }
    }
    class ee {
        constructor(t, e) {
            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            this.value = e, this.operator = t, this.activeFactor = .5, (i = w({
                mass: 1,
                constant: 90,
                damping: 20,
                criticalDamping: !(this.priority = 10)
            }, i)).criticalDamping && (i.damping = Math.sqrt(4 * i.mass * i.constant)), this.spring = new Qt(i.mass, i.constant, i.damping)
        }
        get motion() {
            return this.spring
        }
        isActive(t, e) {
            switch (this.operator) {
                case "<=":
                    return e <= this.value;
                case ">=":
                    return e >= this.value;
                case "<":
                    return e < this.value;
                default:
                    return e > this.value
            }
        }
        set(t, e, i, s) {
            this.spring.snap(e), this.spring.setEnd(this.value, s)
        }
        getPriority() {
            return this.priority
        }
    }
    class ie {
        constructor() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            this.activeFactor = 1, this.priority = 20, this.points = t, this._activeRange = null, this.options = w({
                mass: 1,
                constant: 90,
                damping: 20,
                criticalDamping: !1,
                paginate: !0,
                loop: !1,
                motionMode: "spring",
                linearFriction: .01
            }, e), (e = w({}, this.options)).criticalDamping && (e.damping = Math.sqrt(4 * e.mass * e.constant)), "spring" === e.motionMode ? this._motion = new Qt(e.mass, e.constant, e.damping) : this._motion = new te(e.linearFriction)
        }
        get activeRange() {
            return this._activeRange
        }
        set activeRange(t) {
            this._activeRange = t, this.length = t[1] - t[0]
        }
        get motion() {
            return this._motion
        }
        findPoint(i) {
            i = this.normalizePosition(i);
            let s = -1;
            return this.points.some((t, e) => (s = e) === this.points.length - 1 || Math.abs(i - this.points[e + 1][0]) > Math.abs(i - t[0])), !this.options.loop || s !== this.points.length - 1 || Math.abs(i - this.activeRange[1]) > Math.abs(i - this.points[s][0]) ? s : "end"
        }
        normalizePosition(t) {
            return this.options.loop ? (t %= this.length || 1) < 0 && (t += this.length) : t = Math.max(0, Math.min(t, this.length)), t
        }
        isActive(t, e) {
            return !!this.activeRange && (!!this.options.loop || Math.max(t, e) > this._activeRange[0] && Math.min(t, e) < this._activeRange[1])
        }
        getPriority() {
            return this.priority
        }
        set(i, t, s, n) {
            let o = 0;
            if (null === s && (s = t), this.options.paginate && 0 !== n) {
                let e = this.findPoint(i);
                this.options.loop ? (o = Math.floor(i / this.length), "end" === e && (e = 0, o += 1)) : i = this.normalizePosition(i);
                i = this.points[e];
                if (0 < n) s = o * this.length + i[0] + i[1];
                else if (n < 0) {
                    let t = e - 1; - 1 === t && (t = this.points.length - 1), s = o * this.length + i[0] - this.points[t][1]
                }
                this.options.loop || (s = this.normalizePosition(s))
            } else {
                let t = this.findPoint(s);
                this.options.loop ? (o = Math.floor(s / this.length), "end" === t && (t = 0, o += 1)) : s = this.normalizePosition(s), s = o * this.length + this.points[t][0]
            }
            this._motion.snap(t), this._motion.setEnd(s, n)
        }
    }
    class a {
        constructor() {
            this._options = {}, this._defaults = {}, this._observers = {}, this._aliases = {}, this._waitings = {}
        }
        inject(e) {
            Object.keys(e).forEach(t => {
                this._options[t] instanceof a ? this._options[t].inject(e[t]) : this.set(t, e[t], !0) || (this._waitings[t] = e[t])
            })
        }
        register(e, t) {
            var i;
            return "object" == typeof e ? ((i = Object.keys(e)).forEach(t => {
                this.register(t, e[t])
            }), i) : (Array.isArray(t) || "object" != typeof t ? this._defaults[e] = t : (this._options[e] = new a, this._options[e].register(t)), this._checkWaitingList(e), e)
        }
        chain(t, e) {
            this._aliases[t] && (t = this._aliases[t]);
            var i = this._isNested(t);
            if (i) i.options.chain(i.name, e);
            else {
                if (this._options[t] instanceof a) {
                    const s = this._options[t];
                    Object.assign(e._aliases, s._aliases), Object.assign(e._waitings, s._waitings), Object.assign(e._defaults, s._defaults), Object.keys(s._observers).forEach(t => {
                        Object.prototype.hasOwnProperty.call(e._observers, t) ? e._observers[t].concat(s._observers[t]) : e._observers[t] = s._observers[t]
                    }), Object.keys(s._options).forEach(t => {
                        s._options[t] instanceof a && e._options[t] ? s.chain(t, e._options[t]) : e._options[t] = s._options[t]
                    }), e.register(e._defaults)
                }
                this._options[t] = e
            }
        }
        alias(t, e) {
            if (this.has(t)) throw new Error(`"${t}" is already an option.`);
            if (this._aliases[t]) throw new Error(`"${t}" is already created.`);
            if (!this.has(e)) throw new Error(`"${t}" is not registered. Register the option before defining any alias.`);
            this._aliases[t] = e, this._checkWaitingList(t)
        }
        has(t) {
            var e = this._isNested(t);
            return e ? e.options.has(e.name) : h.call(this._options, t) || h.call(this._defaults, t)
        }
        is(t, e) {
            return this.get(t) === e
        }
        get(t) {
            if (Array.isArray(t)) {
                const i = {};
                return t.forEach(t => {
                    i[t] = this.get(t)
                }), i
            }
            this._aliases[t] && (t = this._aliases[t]);
            var e = this._isNested(t);
            return e ? e.options.get(e.name) : (h.call(this._options, t) ? this._options : this._defaults)[t]
        }
        set(e, i) {
            let s = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            if ("object" == typeof e) Object.keys(e).forEach(t => this.set(t, e[t], s));
            else {
                this._aliases[e] && (e = this._aliases[e]);
                var t = this._isNested(e);
                if (t) return t.options.set(t.name, i, s);
                if (!this.has(e)) return !1;
                "object" == typeof i && this._options[e] instanceof a ? this._options[e].set(i) : this._options[e] = i, this._internalChange || s || (this._observers[e] && this._observers[e].forEach(t => t(e, i)), this._observers["*"] && this._observers["*"].forEach(t => t("*", i)))
            }
            return !0
        }
        observe(t, e) {
            if (Array.isArray(t)) t.forEach(t => this.observe(t, e));
            else {
                if ("*" !== t && !this.has(t)) throw new Error(`This option: "${t}" is not registered.`);
                var i = this._isNested(t);
                i ? i.options.observe(i.name, e) : ((i = this.get(t)) instanceof a && i.observe("*", e), this._observers[t] || (this._observers[t] = []), this._observers[t].push(e))
            }
        }
        dontObserve(t, e) {
            var i;
            Array.isArray(t) ? t.forEach(t => this.dontObserve(t, e)) : (i = this._isNested(t)) ? i.options.dontObserve(i.name, e) : (i = this._observers[t]).length && i.splice(i.indexOf(e), 1)
        }
        internalChange() {
            this._internalChange = !0
        }
        endInternalChange() {
            this._internalChange = !1
        }
        aliasesOf(e) {
            return Object.keys(this._aliases).filter(t => this._aliases[t] === e)
        }
        reset(t, e) {
            var i;
            "*" === t ? Object.keys(this._options).forEach(t => this.reset(t, e)) : (this._internalChange = e, (i = this._isNested(t)) ? i.options.reset(i.name, e) : (void 0 !== (i = this._options[t]) && (i instanceof a ? i.reset("*", e) : this.set(t, this._defaults[t])), this._internalChange = !1))
        }
        toObject() {
            const e = {};
            return Object.keys(w(w({}, this._defaults), this._options)).forEach(t => {
                this._options[t] instanceof a ? e[t] = this._options[t].toObject() : e[t] = this.get(t)
            }), e
        }
        list() {
            const e = [];
            return Object.keys(w(w({}, this._defaults), this._options)).forEach(t => {
                this._options[t] instanceof a ? e.push({
                    name: t,
                    value: this._options[t].list()
                }) : e.push({
                    name: t,
                    value: this._options[t],
                    default: this._defaults[t],
                    aliases: this.aliasesOf(t).toString(),
                    observers: this._observers[t]
                })
            }), e
        }
        _checkWaitingList(t) {
            void 0 !== this._waitings[t] && (this.set(t, this._waitings[t], !0), this._waitings[t] = void 0)
        }
        _isNested(t) {
            var e, i = t.indexOf(".");
            return -1 !== i && (e = this.get(t.slice(0, i))) instanceof a && {
                name: t.slice(i + 1),
                options: e
            }
        }
    }
    class se extends t {
        constructor(t, e, i) {
            super(), this.view = e, this.composer = t, this.options = new a, this.options.register({
                animate: !0,
                duration: 1,
                easing: void 0,
                start: 0,
                forceLooped: !1,
                checkLoop: !0
            }), this.options.inject(i), this.currentIndex = 0, this.targetIndex = 0, this.count = -1, this.currentSectionIndex = 0, this.targetSectionIndex = 0, this.currentSectionIndexes = [], this.targetSectionIndexes = []
        }
        init() {
            this.composer.on("init", () => {
                this.options.get("start") && this.goToIndex(this.options.get("start"), {
                    animate: !1
                }, !0)
            }, 1e3)
        }
        next(t) {
            t = w(w({}, this.options.toObject()), t), this.targetIndex + 1 >= this.count ? t.forceLooped || t.checkLoop && this.view.options.get("loop") ? this.goToIndex(0, t) : this.trigger("nextBlock") : this.goToIndex(this.targetIndex + 1, t)
        }
        previous(t) {
            t = w(w({}, this.options.toObject()), t), this.targetIndex - 1 < 0 ? t.forceLooped || t.checkLoop && this.view.options.get("loop") ? this.goToIndex(this.count - 1, t) : this.trigger("previousBlock") : this.goToIndex(this.targetIndex - 1, t)
        }
        goToIndex(t, e, i) {}
        update() {
            this.updateTargetIndex(this.view.index), this.updateCurrentIndex()
        }
        checkIndex(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            return -1 === this.count && this.updateCount(), e ? Math.max(0, Math.min(t, this.count - 1)) : 0 <= t && t < this.count
        }
        updateCount() {}
        updateTargetIndex(t) {
            [this.targetSectionIndex] = this.targetSectionIndexes, this.targetIndex !== t && (this.targetIndex = t, this.trigger("changeStart", [this.targetIndex]), this.trigger("targetIndexChange", [this.targetIndex]))
        }
        updateCurrentIndex() {
            this.currentSectionIndex = this.view.index, this.currentSectionIndexes = this.view.indexes, this.targetIndex !== this.currentIndex && (this.currentIndex = this.targetIndex, this.trigger("changeEnd", [this.currentIndex]), this.trigger("currentIndexChange", [this.currentIndex]))
        }
    }
    class ne {
        constructor(t) {
            this._drag = t, this._x = 0, this._startTime = 0
        }
        set(t, e) {
            this._x = t, this._end = e
        }
        x(t) {
            return t ? this._end : (this._x += (this._end - this._x) * this._drag, this._x)
        }
        dx() {
            return this._x - this._end
        }
        done() {
            return Math.abs(this.dx()) < 1
        }
    }
    class oe extends t {
        constructor() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : .01;
            super(), this._position = 0, this.animating = !1, this._constraints = [], this._friction = new Kt(t), this._frictionVal = t, this.startPosition = null, this._tickerId = null, this._tick = this._tick.bind(this), this.disabled = !1, this.eventPrefix = "slicker"
        }
        get friction() {
            return this._frictionVal
        }
        set friction(t) {
            this.disabled || t === this._frictionVal || (this._friction = new Kt(t), this._frictionVal = t)
        }
        get position() {
            return this._position
        }
        set position(t) {
            this.disabled || t === this._position || (null === this.startPosition && (this.startPosition = t), this._currentConstraint = this.findConstraint(t), this._updatePosition(t))
        }
        moveToPosition(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : .5;
            this.disabled || this._position === t || (null === this.startPosition && (this.startPosition = t), this._velocity = NaN, this._activeMotion = new ne(e), this._activeMotion.set(this._position, t), this._startAnimation())
        }
        get velocity() {
            return this._activeMotion ? this._activeMotion.dx() : 0
        }
        set velocity(t) {
            this.disabled || this._velocity === t || (this._velocity = t, this._friction.set(this._position, this._velocity), this._activeMotion = this._friction, t = this._friction.x(120), this._targetConstraint = this.findConstraint(t) || null, this._targetConstraint ? (this._currentConstraint = null, this._animToConstraint(this._targetConstraint, this._position, t, this._velocity), this.startPosition = null) : (this._startAnimation(), this.trigger("push", [this._velocity], !0)))
        }
        stop() {
            this.startPosition = this._position, this.animating = !1, this._tick(), this.trigger("motionInterrupt", null, !0)
        }
        release(t) {
            !this.disabled && this._currentConstraint && (t ? this._goToConstraint(this._currentConstraint, this._position, null, this._velocity) : (this._animToConstraint(this._currentConstraint, this._position, null, this._velocity), this.trigger("motionToConstraint", null, !0)))
        }
        addConstraint(t) {
            (t.slicker = this)._constraints.push(t)
        }
        removeConstraint(t) {
            t = this._constraints.indexOf(t); - 1 !== t && (this._constraints = this._constraints.splice(t, 1))
        }
        removeConstraints() {
            this._currentConstraint = null, this._constraints = []
        }
        findConstraint(n) {
            var t;
            return !!this._constraints.length && !!(t = this._constraints.filter(t => t.isActive(this._position, n, this.velocity))).length && t.sort((t, e) => {
                var i = e.getPriority(this._position, n, this.velocity),
                    s = t.getPriority(this._position, n, this.velocity);
                return "important" === i ? 1 : "important" === s ? -1 : e.priority - t.priority
            })[0]
        }
        _updatePosition(t) {
            var e = t - this._position;
            this._position = t, this._currentConstraint && (this._position -= (1 - this._currentConstraint.activeFactor) * e), this.trigger("positionChange", [this._position], !0)
        }
        _startAnimation() {
            var t;
            this.animating || (this.animating = !0, this.trigger("animationStart", null, !0), this._activeMotion !== this._friction && this.trigger("constraintAnimationStart", null, !0), t = Math.round(100 * this._activeMotion.x(120)) / 100, this.endPosition !== t && this.trigger("endPositionChange", [t], !0), this._tick())
        }
        _tick() {
            this.animating ? this._activeMotion.done() ? (this.animating = !1, this._updatePosition(Math.round(100 * this._position) / 100), this._tick(), this.trigger("animationEnd", null, !0), this._activeMotion !== this._friction && this.trigger("constraintAnimationEnd", null, !0)) : (this._updatePosition(this._activeMotion.x()), this._tickerId = requestAnimationFrame(this._tick)) : (cancelAnimationFrame(this._tickerId), this._velocity = 0, this._targetConstraint = null, this._currentConstraint = this.findConstraint(this._position))
        }
        _animToConstraint(t, e, i, s) {
            t.set(this.startPosition, e, i, s), this._activeMotion = t.motion, this._startAnimation()
        }
        _goToConstraint(t, e, i, s) {
            t.set(this.startPosition, e, i, s);
            e = Math.round(100 * t.motion.x(120)) / 100;
            this.trigger("endPositionChange", [e], !0), this.position = e, this.trigger("animationEnd", null, !0)
        }
    }
    class re extends se {
        constructor(t, e) {
            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            super(t, e, i), this.options.register({
                direction: "auto",
                slicker: !0,
                slickerFriction: .01,
                updateIndexOnDrag: "auto",
                boundariesSpring: {
                    mass: 1,
                    constant: 90,
                    damping: 20,
                    criticalDamping: !1
                },
                snapping: {
                    mass: 1,
                    constant: 90,
                    damping: 20,
                    criticalDamping: !0
                }
            }), this.options.inject(i), this.updateCurrentIndex = this.updateCurrentIndex.bind(this), this.updateCount = this.updateCount.bind(this), this.view.on("arrange", this.updateCount, this)
        }
        setupSlicker() {
            this.options.get("slicker") && (this.updateSlicker = this.updateSlicker.bind(this), this.slicker = new oe, this.slicker.on("positionChange", this._onSlickerValueChange, this), this.slicker.on("endPositionChange", this._onSlickerEndValueChange, this), this.slicker.on("animationEnd", this.updateCurrentIndex, this), this.slicker.on("push", () => this.trigger("slickChanged")), this.slicker.on("motionInterrupt", () => this.trigger("slickChanged")), this.options.observe(["slickType", "boundariesSpring", "snapping"], this.updateSlicker), this.options.observe("slickerFriction", (t, e) => {
                this.slicker.friction = e
            }), this.view.options.observe("loop", this.updateSlicker), this.view.on("resize, sectionAdd, sectionRemove, lengthChange", this.updateSlicker), this.view.on("scrollToAnimationEnd", this.updateCurrentIndex, this), !1 === this.view.isSafeForInteractions && (this.slicker.disabled = !0), this.view.on("unsafeInteractions", () => {
                this.slicker.disabled = !0
            }), this.view.on("safeInteractions", () => {
                this.slicker.disabled = !1
            }), this.updateSlicker())
        }
        next(t) {
            super.next(w({
                direction: "forward"
            }, t))
        }
        previous(t) {
            super.previous(w({
                direction: "backward"
            }, t))
        }
        drag(t) {
            this.slicker && (this.slicker.position += t * (this.view.dragFactor || 1), this._updateIndexesOnDrag) && (this._onSlickerEndValueChange(null, this.slicker.position), this.updateCurrentIndex())
        }
        push(t) {
            this.slicker && (this.slicker.velocity = t)
        }
        release(t) {
            this.slicker && (this.slicker.position = this.view.position, this.slicker.release(t))
        }
        hold() {
            var t;
            null != (t = this.slicker) && t.stop()
        }
        goToPosition(t, e) {}
        update() {
            this.updateSlicker(), this.updateTargetIndex(this.view.index, this.slicker.position), this.updateCurrentIndex()
        }
        updateCount() {}
        updateSlicker() {}
        _onSlickerValueChange() {}
        _onSlickerEndValueChange(t, e) {}
    }
    class ae extends re {
        constructor(t, e) {
            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            super(t, e, i), this.options.register({
                slickType: "slide",
                paginate: !1
            }), this.options.inject(i), this.updateTargetIndex = this.updateTargetIndex.bind(this), this.options.observe("paginate", this.updateCount), this.updateCount(), this.setupSlicker()
        }
        setupSlicker() {
            this.options.get("slicker") && (this.updateSlicker = this.updateSlicker.bind(this), this.options.observe(["paginate", "slickerFriction"], this.updateSlicker), super.setupSlicker())
        }
        push(t) {
            this.view.killScrollAnimation(), super.push(t)
        }
        release(t) {
            this.view.killScrollAnimation(), super.release(t)
        }
        hold() {
            this.view.animating && (this.view.killScrollAnimation(), this.slicker) && (this.slicker.position = this.view.position), super.hold()
        }
        goToIndex(t, e) {
            var i, s = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            t = this.checkIndex(t), !s && t === this.targetIndex || (s = {
                index: t
            }, (e = w(w({}, this.options.get(["animate", "direction", "duration", "paginate", "easing"])), e)).easing && (s.easing = e.easing), i = this.options.get("paginate") ? t * this.view.size : this.view.sections[t].position, !1 !== this.view.scrollTo(i, e.animate, e.duration, e.direction, s) && this.updateTargetIndex(t, i), e.animate) || this.updateCurrentIndex()
        }
        goToPosition(t, e) {
            var i = this.checkIndex(this.view.getIndexAtPosition(t)),
                s = {};
            (e = w(w({}, this.options.get(["animate", "direction", "duration", "paginate", "ease"])), e)).ease && (s.ease = e.ease), this.updateTargetIndex(i, t), e.useFriction ? (this.slicker.position = this.view.normalizePositionByDirection(this.view.position), this.slicker.moveToPosition(this.view.normalizePositionByDirection(t), e.friction)) : (this.view.scrollTo(t, e.animate, e.duration, e.direction, s), e.animate || this.updateCurrentIndex())
        }
        update() {
            this.updateSlicker(), this.updateTargetIndex(this.view.index, this.slicker.position), this.updateCurrentIndex()
        }
        updateTargetIndex(t, e) {
            this.targetSectionIndexes = this.view.getIndexesAtPosition(e), super.updateTargetIndex(t)
        }
        updateCurrentIndex() {
            this.slicker && (this.slicker.position = this.view.position), super.updateCurrentIndex()
        }
        updateCount() {
            var t = this.options.get("paginate") ? Math.ceil(this.view.length / this.view.size) : this.view.count;
            t !== this.count && (this.count = t, this.trigger("countChange", [this.count]))
        }
        updateSlicker() {
            var i = this.options.get(["slickType", "slickerFriction", "boundariesSpring", "snapping", "paginate", "updateIndexOnDrag"]),
                s = this.view.options.get("loop");
            if (this.slicker.stop(), this.slicker.removeConstraints(), this.slicker.friction = i.slickerFriction, this._updateIndexesOnDrag = i.updateIndexOnDrag, "auto" === this._updateIndexesOnDrag && (this._updateIndexesOnDrag = "scroll" === i.slickType), "scroll" !== i.slickType) {
                let e = [],
                    t;
                if (i.paginate) {
                    t = [0, this.count * this.view.size];
                    for (let t = 0; t !== this.count; t += 1) e.push([t * this.view.size, this.view.size])
                } else s ? (t = [0, this.view.length], e = this.view.sections.map(t => [t.position, t.size])) : (t = [0, this.view.nominalLength], this.view.sections.some(t => t.position < this.view.nominalLength ? (e.push([t.position, t.size]), !1) : (e.push([this.view.nominalLength, this.view.size]), !0)));
                var n = w(w({
                        loop: s,
                        paginate: "slide" === i.slickType
                    }, i.snapping.toObject()), {}, {
                        linearFriction: i.slickerFriction,
                        motionMode: "animroll" === this.composer.options.get("view") ? "linear" : "spring"
                    }),
                    n = new ie(e, n);
                n.activeRange = t, this.slicker.addConstraint(n)
            }
            s || (n = i.boundariesSpring.toObject(), s = new ee("<", 0, n), i = i.paginate ? (this.count - 1) * this.view.size : this.view.nominalLength, i = new ee(">", i, n), this.slicker.addConstraint(s), this.slicker.addConstraint(i)), this.release(!0)
        }
        _onSlickerValueChange() {
            this.view.position = this.slicker.position
        }
        _onSlickerEndValueChange(t, e) {
            let i;
            i = this.options.get("paginate") ? Math.ceil(Math.round(e / this.view.size)) % this.count : this.view.getIndexAtPosition(e), this.updateTargetIndex(i, e)
        }
    }
    class g {
        constructor(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            this._dependencies = 1, this.action = t, this.noMoreExec = e, this._isInvalidated = !1
        }
        hold() {
            this._dependencies += 1
        }
        reset() {
            this._dependencies = 1, this._executed = !1
        }
        charge(t) {
            this._dependencies += t
        }
        exec() {
            if (this._isInvalidated) return !1;
            if (this._executed) {
                if (!this.noMoreExec) return !0;
                console.warn("The action is triggered before.")
            }
            return --this._dependencies, this._dependencies <= 0 && (this._executed = !0, this.action(), !0)
        }
        invalidate() {
            this._isInvalidated = !0
        }
        isExecuted() {
            return this._executed
        }
    }
    const he = [];
    const le = new Map,
        ce = new Map,
        de = new Map,
        pe = new Map;
    class i extends t {
        static registerView(t, e) {
            if (le.has(t)) throw new Error(t + " is already registered.");
            le.set(t, e)
        }
        static registerSection(t, e) {
            if (pe.has(t)) throw new Error(t + " is already registered.");
            pe.set(t, e)
        }
        static registerAddon(t, e) {
            if (ce.has(t)) throw new Error(t + " is already registered.");
            ce.set(t, e)
        }
        static registerControl(t, e) {
            if (de.has(t)) throw new Error(t + " is already registered.");
            de.set(t, e)
        }
        static get views() {
            return le
        }
        static get addons() {
            return ce
        }
        static get controls() {
            return de
        }
        setup(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            this.element = t, this.element.classList.add(c + "-content-composer"), this.options = new a, this.options.register({
                sectionSelector: `.${c}-section`,
                excludeAddons: [],
                navigator: {},
                viewOptions: {},
                view: "basic",
                sectionType: "block",
                sectionFit: "cover",
                disableAnimations: !1
            }), this.trigger("beforeOptions", [e]), this.options.inject(e), this.initTrigger = new g(this._init.bind(this)), this.readyTrigger = new g(this._ready.bind(this)), this.element.classList.add(c + "-on-setup"), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this._domReady.bind(this)) : this._domReady(), this.trigger("afterSetup")
        }
        _domReady() {
            this.trigger("beforeDomReady");
            var t = this["element"];
            "object" == typeof t && t.nodeName ? this.element = t : "string" == typeof t && (this.element = document.querySelector(t)), this.element && (this._domReady = !0, this._setupAddons(), this.element.classList.remove(c + "-on-setup"), this.element.classList.add(c + "-dom-ready"), this.trigger("domReady", [this.element]), this.initTrigger.exec())
        }
        _init() {
            this.trigger("beforeInit"), this._setupView(), this._setupLayout(), this._setupNavigator(), this._setupSections(), this.trigger("init"), this.element.classList.remove(c + "-before-init"), this.element.classList.add(c + "-init"), this.readyTrigger.exec()
        }
        _ready() {
            this.element.classList.add(c + "-ready")
        }
        _setupAddons() {
            this.addons = {};
            const i = this.options.get("excludeAddons");
            this.trigger("beforeSetupAddons"), ce.forEach((t, e) => {
                -1 === i.indexOf(e) && (this.addons[e] = new t(this))
            }), this.trigger("afterSetupAddons")
        }
        _setupView() {
            this.trigger("beforeViewSetup");
            var t = le.get(this.options.get("view"));
            this.view = new t, this.options.chain("viewOptions", this.view.options), (this.view.parentEmitter = this).view.appendTo(this.element), this.trigger("viewSetup", [this.view])
        }
        _setupLayout() {
            this.trigger("beforeLayoutSetup"), this.layoutController = new q(this, this.view, this.options), (this.layoutController.parentEmitter = this).trigger("layoutSetup", [this.layoutController])
        }
        _setupNavigator() {
            this.trigger("beforeNavigatorSetup"), (this.view instanceof Ut || this.view.scrollable) && (this.hasScrollView = !0, this.navigator = new ae(this, this.view), this.options.chain("navigator", this.navigator.options), (this.navigator.parentEmitter = this).navigator.init()), this.trigger("navigatorSetup", [this.navigator])
        }
        _setupSections() {
            this.trigger("beforeSectionsSetup");
            var t = this.options.get("sectionSelector");
            const e = pe.get(this.options.get("sectionType"));
            this.element.querySelectorAll(":scope > " + t).forEach(t => {
                t = new e(t, this);
                (t.parentEmitter = this).view.appendSection(t, !1)
            }), this.view.sections.length && (1 === this.view.sections.length && this.options.set("viewOptions.loop", !1), this.view.update(), this.navigator.update()), this.trigger("sectionsSetup")
        }
    }
    V(i, "initAll", () => {
        var {
            depicterSetups: t = []
        } = window;
        t.length && t.forEach(t => {
            he.includes(t) || (he.push(t), t())
        })
    });
    var ue = Object.freeze({
        __proto__: null,
        default: i
    });

    function v(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            {
                duration: e,
                delay: i,
                easing: s,
                begin: n,
                complete: o
            } = w(w({}, y), e);
        const r = Ee(t);
        return {
            parts: {
                offset: i,
                params: {
                    targets: t,
                    duration: e,
                    easing: s,
                    begin: n,
                    complete: o
                }
            },
            reset: () => {
                r(), C.remove(t)
            }
        }
    }
    const me = ["type"],
        ge = ["type"],
        ve = ["type"],
        fe = ["segmentBy", "staggerDirection", "delay", "duration", "overlap", "segmentAnimType"],
        ye = ["type"],
        _e = ["duration", "delay", "easing", "clipParams"],
        be = ["selector", "focalPoint", "set", "scale"],
        we = (t, e) => {
            var i;
            return null != (i = t.parentElement) && i.insertBefore(e, t), e.appendChild(t), e
        },
        xe = t => {
            t.replaceWith(...t.childNodes)
        },
        Se = t => Array.from(t.childNodes).reduce((t, e) => {
            var i;
            return e.nodeType !== Node.TEXT_NODE && null != (i = e.childNodes) && i.length ? [...t, ...Se(e)] : e.nodeType === Node.TEXT_NODE ? [...t, e] : t
        }, []),
        Ae = (t, e) => {
            var i = new Range;
            return t.contains(e) ? t : e.contains(t) ? e : (i.setStartBefore(t), i.setEndAfter(e), i.collapsed && (i.setStartBefore(e), i.setEndAfter(t)), i.commonAncestorContainer)
        },
        f = (t, e) => {
            var i, s = window.getComputedStyle(t)[e];
            return s ? /px/.test(s.toString()) ? (i = t.style.display, t.style.display = "none", e = window.getComputedStyle(t)[e], t.style.display = i, e) : s : null
        },
        Ee = t => {
            const e = t.style.cssText;
            return () => {
                t.style.cssText = e
            }
        },
        y = {
            duration: 1e3,
            easing: "linear",
            delay: 0
        };

    function Ce(t, e) {
        return t.hasOwnProperty(e)
    }
    const ke = w(w({}, y), {}, {
            movement: 100,
            direction: "left",
            fade: !0,
            perspective: 2e3,
            x: null,
            y: null,
            z: null
        }),
        Le = {
            top: "Y",
            bottom: "Y",
            left: "X",
            right: "X",
            front: "Z",
            back: "Z"
        },
        Ie = u => function(t) {
            var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                {
                    movement: i,
                    direction: s,
                    fade: e,
                    perspective: n
                } = w(w({}, ke), r),
                {
                    parts: {
                        params: o,
                        offset: a
                    },
                    reset: h
                } = v(t, r);
            let l = {};
            var c = "in" === u;
            if ("custom" === s) {
                var {
                    x: r,
                    y: d,
                    z: p
                } = r;
                let t = r,
                    e = d,
                    i = p,
                    s = "px",
                    n = "px",
                    o = "px";
                r && Ce(r, "value") && (t = r.value, s = r.unit), d && Ce(d, "value") && (e = d.value, n = d.unit), p && Ce(p, "value") && (i = p.value, o = p.unit), l = w(w(w({}, r && {
                    translateX: c ? ["" + t + s, 0] : "" + t + s
                }), d && {
                    translateY: c ? ["" + e + n, 0] : "" + e + n
                }), p && {
                    translateZ: c ? ["" + i + o, 0] : "" + i + o
                })
            } else {
                let t = i,
                    e = "px";
                Ce(i, "value") && (t = i.value, e = i.unit);
                r = ["left", "top", "back"].includes(s) ? "-" + t + e : "" + t + e;
                l["translate" + Le[s]] = c ? [r, 0] : r
            }
            return l.translateZ && C.set(t, {
                perspective: n
            }), e && (l.opacity = c ? [0, 1] : 0), {
                parts: {
                    offset: a,
                    params: w(w({}, o), l)
                },
                reset: h
            }
        };
    var Oe = Ie("in"),
        Te = Ie("out"),
        s = w({}, ke);
    const Pe = f => function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            {
                skew: i,
                scale: s,
                rotate: n,
                rotate3d: o,
                transformOrigin: r,
                skewX: a,
                skewY: h,
                rotateX: l,
                rotateY: c,
                rotateZ: d
            } = e,
            {
                reset: t,
                parts: {
                    params: e,
                    offset: p
                }
            } = Ie(f)(t, e);
        let u = {};
        var m, g, v = "in" === f;
        return u = o ? ({
            x: o,
            y: m,
            z: g
        } = o, w(w(w(w({}, u), void 0 !== o && {
            rotateX: v ? [o, 0] : o
        }), void 0 !== m && {
            rotateY: v ? [m, 0] : m
        }), void 0 !== g && {
            rotateZ: v ? [g, 0] : g
        })) : ([o, m, g] = [l, c, d], w(w(w(w({}, u), void 0 !== o && {
            rotateX: v ? [o, 0] : o
        }), void 0 !== m && {
            rotateY: v ? [m, 0] : m
        }), void 0 !== g && {
            rotateZ: v ? [g, 0] : g
        })), void 0 !== n && (u.rotate = v ? [n, 0] : n), u = i ? ({
            x: l,
            y: c
        } = i, w(w(w({}, u), void 0 !== l && {
            skewX: v ? [l, 0] : l
        }), void 0 !== c && {
            skewY: v ? [c, 0] : c
        })) : w(w(w({}, u), void 0 !== a && {
            skewX: v ? [a, 0] : a
        }), void 0 !== h && {
            skewY: v ? [h, 0] : h
        }), s && ("number" == typeof s ? u.scale = v ? [s, 1] : s : ({
            x: d,
            y: o
        } = s, u = w(w(w({}, u), void 0 !== d && {
            scaleX: v ? [d, 1] : d
        }), void 0 !== o && {
            scaleY: v ? [o, 1] : o
        }))), r && ({
            x: m,
            y: g,
            z: n
        } = r, i = `${m||0} ${g||0} ` + (n || 0), u.transformOrigin = [i, i]), {
            parts: {
                offset: p,
                params: w(w({}, e), u)
            },
            reset: t
        }
    };
    var Me = Pe("in"),
        De = Pe("out"),
        Be = (w({}, ke), h => function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            const i = we(t, document.createElement("div"));
            i.classList.add("animator-mask-container");
            var s = f(t, "width"),
                n = f(t, "height");
            null !== s && "auto" !== s && (t.style.width = "100%", i.style.width = s), null !== n && "auto" !== n && (t.style.height = "100%", i.style.height = n), i.style.overflow = "hidden";
            const {
                reset: o,
                parts: {
                    params: r,
                    offset: a
                }
            } = Ie(h)(t, e);
            return {
                parts: {
                    offset: a,
                    params: r
                },
                reset: () => {
                    o(), xe(i)
                }
            }
        }),
        _ = Be("in"),
        Be = Be("out"),
        ze = (w({}, s), h => function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            const i = we(t, document.createElement("div"));
            i.classList.add("animator-mask-container");
            var s = f(t, "width"),
                n = f(t, "height");
            null !== s && "auto" !== s && (t.style.width = "100%", i.style.width = s), null !== n && "auto" !== n && (t.style.height = "100%", i.style.height = n), i.style.overflow = "hidden";
            const {
                reset: o,
                parts: {
                    params: r,
                    offset: a
                }
            } = Pe(h)(t, e);
            return {
                parts: {
                    offset: a,
                    params: r
                },
                reset: () => {
                    o(), xe(i)
                }
            }
        }),
        k = ze("in"),
        ze = ze("out");
    const L = (t, e, i, s) => {
            var i = Li[i];
            if (Ce(i, t)) return {
                parts: i,
                reset: t
            } = (0, i[t])(e, s), {
                reset: t,
                parts: i
            };
            throw new Error("Animation type not found.")
        },
        Ve = {
            coverInAnim: w({
                type: "moveAndTransform"
            }, s),
            coverOutAnim: w({
                type: "moveAndTransform"
            }, s),
            targetAnim: {
                type: "none"
            }
        };
    var Re = b => (t, e) => {
            var e = w(w({}, Ve), e),
                {
                    coverColor: i,
                    duration: s,
                    delay: n = 0,
                    coverInAnim: {
                        type: o
                    },
                    coverOutAnim: {
                        type: r
                    }
                } = e,
                a = x(e.coverInAnim, me),
                h = x(e.coverOutAnim, ge);
            const l = document.createElement("div"),
                c = document.createElement("div"),
                {
                    reset: d,
                    parts: p
                } = (l.classList.add("animator-mask-container"), we(t, l), l.append(c), Object.assign(l.style, {
                    position: "relative",
                    overflow: "hidden",
                    display: "inline-block",
                    verticalAlign: "middle"
                }), Object.assign(c.style, {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: i
                }), L(o, c, "in", w(w({}, a), {}, {
                    duration: s ? s / 2 : a.duration,
                    delay: s ? n : a.delay
                })));
            var {
                offset: i = 0,
                params: o
            } = p, a = i + o.duration;
            let u = e["targetAnim"];
            i = "none" === u.type, o = (u = i ? {
                type: "move",
                fade: !0,
                movement: 0,
                direction: "left"
            } : u).type, e = x(u, ve);
            const {
                reset: m,
                parts: g
            } = L(o, t, b, w(w({}, e), {}, {
                duration: i ? 1 : s ? s / 2 : e.duration,
                delay: s ? n + s / 2 : a + (e.delay || 0)
            }));
            let v = [],
                f = null;
            e.fade || ({
                reset: o,
                parts: i
            } = L("fade", t, b, {
                fade: !0,
                movement: 0,
                direction: "left",
                duration: 1,
                delay: s ? n + s / 2 : a + (e.delay || 0)
            }), v = [i], f = o);
            const {
                reset: y,
                parts: _
            } = L(r, c, "out", w(w({}, h), {}, {
                duration: s ? s / 2 : e.duration,
                delay: s ? n + s / 2 : a + (h.delay || 0)
            }));
            return {
                parts: [p, ...v, g, _],
                reset: () => {
                    var t;
                    d(), y(), m(), null != (t = f) && t(), c.remove(), xe(l), l.remove(), console.log("reset")
                }
            }
        },
        je = Re("in"),
        Re = Re("out");
    const We = t => {
            var e = null == t ? void 0 : t.textContent;
            if (!t || !t.parentNode || 3 !== t.nodeType || !e) return [];
            var i = document.createRange(),
                s = [];
            i.setStart(t, 0);
            let n = i.getBoundingClientRect().bottom,
                o = 1,
                r = 0;
            for (var a; o <= e.length;) i.setStart(t, o), o < e.length - 1 && i.setEnd(t, o + 1), (a = i.getBoundingClientRect().bottom) > n && (s.push(e.substr(r, o - r)), n = a, r = o), o += 1;
            return s.push(e.substr(r)), s
        },
        Ne = t => t.split(/(\s+)/),
        He = t => t.split(""),
        Fe = (t, s, n, o, r) => t.map((t, e) => {
            var i = " " !== t;
            return r && !i || !t ? null : `<${s}${i&&n?` class="${n} ${0===e?"first":""}"`:""}${i&&o?` style="${o}"`:""}>${t}</${s}>`
        }).filter(t => null !== t),
        $e = w(w(w({
            segmentBy: "letter",
            staggerDirection: "left",
            overlap: .05,
            segmentAnimType: "moveAndTransform"
        }, y), s), Ve);
    var Ye = f => (t, e) => {
            const i = w(w({}, $e), e),
                {
                    segmentBy: s,
                    staggerDirection: n,
                    delay: o = 0,
                    duration: r = 1e3,
                    overlap: a = .05,
                    segmentAnimType: h
                } = i,
                l = x(i, fe);
            e = Se(t).filter(t => " " !== t.textContent), t = 1 < (t = e).length ? t.reduce((t, e) => t === e ? t : Ae(t, e), t[0]) : t[0].parentElement;
            const c = function(t) {
                    let e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document.createElement("div");
                    return [...t.childNodes].forEach(t => e.appendChild(t)), t.appendChild(e), e
                }(t),
                d = c.cloneNode(!0);
            t.appendChild(d), c.style.display = "none";
            t = window.getComputedStyle(t).textTransform, e = Se(d).filter(t => " " !== t.textContent);
            const p = document.createElement("span"),
                u = (e.forEach(t => {
                    p.innerHTML = ((t, e) => {
                        var s = ["letter", "word", "line"];
                        const n = s.slice(s.indexOf(t)),
                            o = "word" === t,
                            r = "letter" === t;
                        s = [];
                        if (n.includes("line")) {
                            t = We(e);
                            let i = [];
                            n.includes("word") ? t.forEach(t => {
                                t = Ne(t);
                                let e = [];
                                n.includes("letter") ? t.forEach(t => {
                                    t = He(t), t = Fe(t, "span", r ? "animator-letter" : "", r ? "display:inline-block" : "").join("");
                                    e.push(t)
                                }) : e = t, i.push(Fe(e, "span", o ? "animator-word" : "", o ? "display:inline-block" : "").join(""))
                            }) : i = t, s.push(Fe(i, "div", "animator-line", "white-space: nowrap; display: inline-block;").join(""))
                        }
                        return s.join("")
                    })(s, t), t.replaceWith(...p.childNodes)
                }), p.remove(), []),
                m = [];
            e = [...d.querySelectorAll(".animator-" + s)];
            let g = "left" === n ? e : e.reverse();
            const v = r / (((g = "shuffle" === n ? (t => {
                var e, i = t;
                let s = t.length;
                for (; 0 !== s;) e = Math.floor(Math.random() * s), --s, [i[s], i[e]] = [i[e], i[s]];
                return i
            })(g) : g).length - 1) * (1 - a) + 1);
            return g.forEach((t, e) => {
                var {
                    parts: t,
                    reset: e
                } = L(h, t, f, w(w({}, l), {}, {
                    delay: e * (1 - a) * v + o,
                    duration: v
                }));
                Array.isArray(t) ? u.push(...t) : u.push(t), m.push(e)
            }), d.querySelectorAll(".animator-mask-container").forEach(t => {
                t.style.verticalAlign = "sub", t.style.display = "inline-block"
            }), "capitalize" === t && "letter" === s && (d.style.textTransform = "initial", d.querySelectorAll(".animator-letter.first").forEach(t => {
                t.style.textTransform = "capitalize"
            })), {
                parts: u,
                reset: () => {
                    var e;
                    m.forEach(t => t()), d.remove(), [...(e = c).childNodes].forEach(t => e.parentElement.appendChild(t)), e.remove()
                }
            }
        },
        qe = Ye("in"),
        Ye = Ye("out"),
        Xe = (w({}, y), n => function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                {
                    parts: {
                        params: t,
                        offset: e
                    },
                    reset: i
                } = v(t, e),
                s = {};
            return s.opacity = "in" === n ? [0, 1] : 0, {
                parts: {
                    offset: e,
                    params: w(w({}, t), s)
                },
                reset: i
            }
        }),
        Ze = Xe("in"),
        Xe = Xe("out");
    const I = t => "number" == typeof t ? t + "px" : "" + t.value + t.unit,
        Ge = (t, e) => {
            var i = "number" == typeof t ? t : t.value,
                t = "number" == typeof t ? "px" : t.unit;
            return {
                from: I({
                    value: "in" === e ? i : 0,
                    unit: t
                }),
                to: I({
                    value: "in" === e ? 0 : i,
                    unit: t
                })
            }
        },
        Ue = {
            top: {
                bottom: {
                    value: 100,
                    unit: "%"
                },
                left: {
                    value: 0,
                    unit: "%"
                }
            },
            bottom: {
                top: {
                    value: 100,
                    unit: "%"
                },
                left: {
                    value: 0,
                    unit: "%"
                }
            },
            left: {
                top: {
                    value: 0,
                    unit: "%"
                },
                right: {
                    value: 100,
                    unit: "%"
                }
            },
            right: {
                top: {
                    value: 0,
                    unit: "%"
                },
                left: {
                    value: 100,
                    unit: "%"
                }
            }
        },
        Ke = w({}, y),
        Je = a => (t, e) => {
            var {
                direction: i,
                directionsValue: s = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            } = w(w({}, Ke), e), i = i ? Ue[i] : s;
            const {
                parts: {
                    params: n,
                    offset: o
                },
                reset: r
            } = v(t, e);
            var s = {},
                {
                    from: e,
                    to: i
                } = ((i, s) => {
                    var t = Object.keys(i);
                    const n = {};
                    t.forEach(t => {
                        var e = Ge(i[t], s);
                        n[t] = e
                    });
                    var {
                        top: t,
                        right: e,
                        bottom: o,
                        left: r
                    } = n;
                    return {
                        from: `inset(${(null==t?void 0:t.from)||0} ${(null==e?void 0:e.from)||0} ${(null==o?void 0:o.from)||0} ${(null==r?void 0:r.from)||0})`,
                        to: `inset(${(null==t?void 0:t.to)||0} ${(null==e?void 0:e.to)||0} ${(null==o?void 0:o.to)||0} ${(null==r?void 0:r.to)||0})`
                    }
                })(i, a);
            return t.style.clipPath = e, s.clipPath = [e, i], {
                parts: {
                    offset: o,
                    params: w(w({}, n), s)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), r()
                }
            }
        };
    var Qe = Je("in"),
        ti = Je("out");
    const ei = {
            tl: "left top",
            tr: "right top",
            tc: "center top",
            ml: "left center",
            mc: "center center",
            mr: "right center",
            bl: "left bottom",
            br: "right bottom",
            bc: "center bottom"
        },
        ii = (t, e) => {
            switch (t) {
                case "mc":
                default:
                    return .5 * Math.sqrt(e.width ** 2 + e.height ** 2);
                case "tl":
                case "tr":
                case "bl":
                case "br":
                    return Math.sqrt(e.width ** 2 + e.height ** 2);
                case "tc":
                case "bc":
                    return Math.sqrt((e.width / 2) ** 2 + e.height ** 2);
                case "ml":
                case "mr":
                    return Math.sqrt(e.width ** 2 + (e.height / 2) ** 2)
            }
        },
        si = w({}, y),
        ni = a => (t, e) => {
            var {
                circleOrigin: i = "mc",
                radius: s = {
                    value: 100,
                    unit: "%"
                }
            } = w(w({}, si), e);
            const {
                parts: {
                    params: n,
                    offset: o
                },
                reset: r
            } = v(t, e);
            var e = {},
                {
                    from: s,
                    to: i
                } = ((t, e, i, s) => {
                    let n = "number" == typeof t ? t : t.value;
                    var t = "number" == typeof t ? "px" : t.unit,
                        [o, r] = ei[e].split(" "),
                        t = ("%" === t && (n = ii(e, i) * n / 100), I({
                            value: "in" === s ? 0 : n,
                            unit: "px"
                        }));
                    return {
                        from: `circle(${t} at ${o} ${r})`,
                        to: `circle(${I({value:"in"===s?n:0,unit:"px"})} at ${o} ${r})`
                    }
                })(s, i, {
                    width: t.clientWidth,
                    height: t.clientHeight
                }, a);
            return t.style.clipPath = s, e.clipPath = [s, i], {
                parts: {
                    offset: o,
                    params: w(w({}, n), e)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), r()
                }
            }
        };
    var oi = ni("in"),
        ri = ni("out");
    const ai = (t, e) => {
            var t = t.map(t => {
                    var {
                        x: e,
                        y: i
                    } = t.from, {
                        x: t,
                        y: s
                    } = t.to;
                    return {
                        from: I(e) + " " + I(i),
                        to: I(t) + " " + I(s)
                    }
                }),
                i = t.map(t => t.from).join(","),
                t = t.map(t => t.to).join(",");
            return {
                from: `polygon(${"in"===e?i:t})`,
                to: `polygon(${"in"===e?t:i})`
            }
        },
        hi = w(w({}, y), {}, {
            direction: "tl",
            use45deg: !0
        }),
        li = {
            tl: [{
                from: {
                    x: 0,
                    y: 0
                },
                to: {
                    x: 0,
                    y: 0
                }
            }, {
                from: {
                    x: 0,
                    y: 0
                },
                to: {
                    x: {
                        value: 200,
                        unit: "%"
                    },
                    y: 0
                }
            }, {
                from: {
                    x: 0,
                    y: 0
                },
                to: {
                    x: 0,
                    y: {
                        value: 200,
                        unit: "%"
                    }
                }
            }],
            tr: [{
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                },
                to: {
                    x: {
                        value: -200,
                        unit: "%"
                    },
                    y: 0
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 200,
                        unit: "%"
                    }
                }
            }],
            br: [{
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: -200,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: -200,
                        unit: "%"
                    }
                }
            }],
            bl: [{
                from: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: 200,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: 0,
                    y: {
                        value: -200,
                        unit: "%"
                    }
                }
            }]
        },
        ci = h => (t, e) => {
            var {
                direction: i,
                use45deg: s
            } = w(w({}, hi), e);
            const {
                parts: {
                    params: n,
                    offset: o
                },
                reset: r
            } = v(t, e);
            var e = {},
                {
                    from: a,
                    to: s
                } = s ? ai((s = t.clientWidth, a = t.clientHeight, {
                    tl: [{
                        from: {
                            x: 0,
                            y: 0
                        },
                        to: {
                            x: 0,
                            y: 0
                        }
                    }, {
                        from: {
                            x: 0,
                            y: 0
                        },
                        to: {
                            x: {
                                value: s + a,
                                unit: "px"
                            },
                            y: 0
                        }
                    }, {
                        from: {
                            x: 0,
                            y: 0
                        },
                        to: {
                            x: 0,
                            y: {
                                value: s + a,
                                unit: "px"
                            }
                        }
                    }],
                    tr: [{
                        from: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: 0
                        },
                        to: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: 0
                        }
                    }, {
                        from: {
                            x: {
                                value: s,
                                unit: "px"
                            },
                            y: 0
                        },
                        to: {
                            x: {
                                value: -a,
                                unit: "px"
                            },
                            y: 0
                        }
                    }, {
                        from: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: 0
                        },
                        to: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: {
                                value: s + a,
                                unit: "px"
                            }
                        }
                    }],
                    br: [{
                        from: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        },
                        to: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        }
                    }, {
                        from: {
                            x: {
                                value: s,
                                unit: "%"
                            },
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        },
                        to: {
                            x: {
                                value: -a,
                                unit: "px"
                            },
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        }
                    }, {
                        from: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: {
                                value: a,
                                unit: "%"
                            }
                        },
                        to: {
                            x: {
                                value: 100,
                                unit: "%"
                            },
                            y: {
                                value: -s,
                                unit: "px"
                            }
                        }
                    }],
                    bl: [{
                        from: {
                            x: 0,
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        },
                        to: {
                            x: 0,
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        }
                    }, {
                        from: {
                            x: 0,
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        },
                        to: {
                            x: {
                                value: a + s,
                                unit: "px"
                            },
                            y: {
                                value: 100,
                                unit: "%"
                            }
                        }
                    }, {
                        from: {
                            x: 0,
                            y: {
                                value: a,
                                unit: "%"
                            }
                        },
                        to: {
                            x: 0,
                            y: {
                                value: -s,
                                unit: "px"
                            }
                        }
                    }]
                })[i], h) : ai(li[i], h);
            return t.style.clipPath = a, e.clipPath = [a, s], {
                parts: {
                    offset: o,
                    params: w(w({}, n), e)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), r()
                }
            }
        };
    var di = ci("in"),
        pi = ci("out");
    const ui = w({}, y),
        mi = a => (t, e) => {
            var {
                points: i = []
            } = w(w({}, ui), e);
            const {
                parts: {
                    params: s,
                    offset: n
                },
                reset: o
            } = v(t, e);
            var e = {},
                {
                    from: i,
                    to: r
                } = ai(i, a);
            return console.log(i), t.style.clipPath = i, e.clipPath = [i, r], {
                parts: {
                    offset: n,
                    params: w(w({}, s), e)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), o()
                }
            }
        };
    var gi = mi("in"),
        vi = mi("out");
    const fi = {
            type: "inset"
        },
        yi = a => (t, e) => {
            var e = w(w({}, fi), e),
                i = e["type"],
                s = x(e, ye);
            let n;
            switch (i) {
                case "circle":
                    n = ni(a)(t, s);
                    break;
                case "inset":
                case "rect":
                default:
                    var {
                        direction: o = "left"
                    } = s;
                    n = (["left", "right", "top", "bottom"].includes(o) ? Je : ci)(a)(t, s);
                    break;
                case "diagonal":
                    n = ci(a)(t, s);
                    break;
                case "polygon":
                    n = mi(a)(t, s)
            }
            var {
                reset: e,
                parts: {
                    params: i,
                    offset: r
                }
            } = n;
            return {
                parts: {
                    offset: r,
                    params: i
                },
                reset: e
            }
        };
    var _i = yi("in"),
        bi = yi("out");
    const wi = w(w({}, y), {}, {
        clipParams: fi,
        moveAndTransformParams: s
    });
    var s = u => (t, e) => {
            var e = w(w({}, wi), e),
                {
                    duration: i,
                    delay: s,
                    easing: n,
                    clipParams: o
                } = e,
                e = x(e, _e);
            const r = we(t, document.createElement("div"));
            var a = f(t, "width"),
                h = f(t, "height");
            null !== a && "auto" !== a && (t.style.width = "100%", r.style.width = a), null !== h && "auto" !== h && (t.style.height = "100%", r.style.height = h), r.style.overflow = "hidden";
            const {
                reset: l,
                parts: c
            } = yi(u)(r, w({
                duration: i,
                delay: s,
                easing: n
            }, o)), {
                reset: d,
                parts: p
            } = Pe(u)(t, w({
                duration: i,
                delay: s,
                easing: n
            }, e));
            return {
                parts: [c, p],
                reset: () => {
                    d(), l(), xe(r)
                }
            }
        },
        xi = s("in"),
        s = s("out");

    function Si(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
        return Math.round(t * 10 ** e) / 10 ** e
    }
    const Ai = function(t, e, i, s, n) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0,
            e = e / s,
            i = i / n,
            t = "cover" === t ? Math.max(e, i) : Math.min(e, i);
        return void 0 !== o ? {
            width: Si(s * t, o),
            height: Si(n * t, o)
        } : {
            width: s * t,
            height: n * t
        }
    };

    function Ei(t, e, i, s, n, o, r) {
        (6 < arguments.length && void 0 !== r && r || t < n || e < o) && ({
            width: t,
            height: e
        } = Ai("cover", n, o, t, e));
        r = {
            x: t * i - n / 2,
            y: e * s - o / 2
        };
        return r.x = Math.min(t - n, Math.max(0, r.x)), r.y = Math.min(e - o, Math.max(0, r.y)), {
            position: r,
            mediaSize: {
                width: t,
                height: e
            }
        }
    }
    const Ci = w(w({}, y), {}, {
        fade: !1,
        scale: 1,
        duration: 5e3
    });
    var ki = u => (t, e) => {
        var e = w(w({}, Ci), e),
            {
                selector: i = "img",
                focalPoint: s = {
                    x: .5,
                    y: .5
                },
                set: n,
                scale: o
            } = e,
            e = x(e, be),
            {
                offsetWidth: r,
                offsetHeight: a
            } = t;
        const h = t.querySelector(i);
        var i = n || {},
            n = {
                width: h.clientWidth,
                height: h.clientHeight
            },
            {
                position: l,
                mediaSize: c
            } = (null != i && i.focalPoint || ({
                left: l,
                top: c
            } = getComputedStyle(h), i.focalPoint = {
                x: (-parseFloat("auto" === l ? "0" : l) + r / 2) / n.width,
                y: (-parseFloat("auto" === c ? "0" : c) + a / 2) / n.height
            }), Ei(n.width, n.height, i.focalPoint.x, i.focalPoint.y, r, a)),
            {
                position: i,
                mediaSize: n
            } = Ei(n.width * o, n.height * o, s.x, s.y, r, a);
        const d = h.style.transformOrigin,
            p = h.style.transform;
        Object.assign(h.style, {
            transformOrigin: "top left"
        });
        o = Pe(u)(h, w(w({}, e), {}, {
            direction: "custom",
            x: l.x - i.x,
            y: l.y - i.y,
            scale: n.width / c.width
        })).parts;
        return t.style.overflow = "hidden", {
            parts: o,
            reset: () => {
                h.style.transformOrigin = d, h.style.transform = p, C.remove(h)
            }
        }
    };
    const Li = { in: {
            move: Oe,
            moveAndTransform: Me,
            mask: _,
            maskAndTransform: k,
            reveal: je,
            text: qe,
            revealText: qe,
            fade: Ze,
            clipInset: Qe,
            clipCircle: oi,
            clip: _i,
            clipAndTransform: xi,
            clipPolygon: gi,
            clipDiagonal: di,
            kenBurns: ki("in")
        },
        out: {
            move: Te,
            moveAndTransform: De,
            mask: Be,
            maskAndTransform: ze,
            reveal: Re,
            text: Ye,
            revealText: Ye,
            fade: Xe,
            clipInset: ti,
            clipCircle: ri,
            clip: bi,
            clipAndTransform: s,
            clipPolygon: vi,
            clipDiagonal: pi,
            kenBurns: ki("out")
        }
    };
    var Ii = function(t, e, i, s, n, o) {
        let r = 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : 0;
        var {
            parts: t,
            reset: e
        } = L(t, e, i, s);
        return n = n || C.timeline(o), Array.isArray(t) ? t.forEach(t => {
            var {
                offset: t = 0,
                params: e
            } = t;
            n.add(e, "string" == typeof t ? t : t + r)
        }) : ({
            offset: s = 0,
            params: o
        } = t, n.add(o, "string" == typeof s ? s : s + r)), {
            timeline: n,
            reset: e,
            parts: t,
            phase: i
        }
    };
    L, Li;
    const Oi = (t, e) => {
            var i;
            return null != (i = t.parentElement) && i.insertBefore(e, t), e.appendChild(t), e
        },
        Ti = (t, e, i) => {
            let s = "";
            return t.hasAttribute("data-" + e) && (s = t.getAttribute("data-" + e), t.removeAttribute("data-" + e)), i && t.hasAttribute("data-" + i) && (s = t.getAttribute("data-" + i), t.removeAttribute("data-" + i)), !!s && (t.setAttribute(e, s), !0)
        },
        Pi = (t, e, i, s, n) => {
            e /= s, i /= n, t = "cover" === t ? Math.max(e, i) : Math.min(e, i);
            return {
                width: s * t,
                height: n * t
            }
        },
        Mi = t => "object" == typeof t && 0 === Object.keys(t).length,
        O = t => "object" == typeof t ? t.value : t,
        Di = (e, i) => {
            const s = {};
            return Object.keys(e).forEach(t => {
                s[t] = i(e[t], t)
            }), s
        },
        Bi = e => {
            try {
                return JSON.parse(e.replace(/'/g, '"'))
            } catch (t) {
                console.warn("Given data value is not a valid JSON, skipped. \n " + e)
            }
            return null
        },
        zi = ["type"];
    class Vi {
        static isAnimative(t) {
            {
                var i = /^(data(-\w+)*-animation-(in|out))$/g;
                let e = !1;
                return [].some.call(t.attributes, t => e = i.test(t.name)), e
            }
        }
        constructor(i, s, n, t) {
            var o = this;
            this.target = i, this.element = n, this.sourceElement = s;
            const r = m(this.sourceElement, "animation-in") || {},
                a = m(this.sourceElement, "animation-out") || {},
                h = !!t && {
                    type: "move",
                    duration: 1e3,
                    direction: "top",
                    movement: 0
                },
                e = (this.animationsData = ["none", ...d].map(t => {
                    var e = u(r, t),
                        t = u(a, t);
                    return {
                        animationIn: e ? this.parseAnimationData(e) : h,
                        animationOut: t ? this.parseAnimationData(t) : h,
                        target: i,
                        sourceElement: s,
                        targetElement: n
                    }
                }), this.animatorIsSet = !1, p.on("breakpointChange", this.setAnimator, this), i.animateInOut = function(t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                    return !!["in", "out"].includes(t) && o.startAnimation(t, e)
                }, i.show),
                l = (i.show = function() {
                    var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
                    e ? e.call(i) : i.element.classList.remove(c + "-is-hidden"), t && i.animateInOut("in")
                }, i.hide);
            i.hide = function() {
                (0 < arguments.length && void 0 !== arguments[0] && !arguments[0] || !i.animateInOut("out")) && (l ? l.call(i) : i.element.classList.add(c + "-is-hidden"), o.status = "out-end")
            }, i.progressInOut = (t, e) => {
                ["in", "out"].includes(e) && this.progressAnimation(e, t)
            }, i.killInOutAnimation = () => {
                this.removeActiveAnimator()
            }
        }
        parseAnimationData(e) {
            e = e.replace(/'/g, '"');
            let t = "";
            try {
                t = JSON.parse(e)
            } catch (t) {
                return console.warn("Given animation data value is not a valid JSON, animation skipped. \n " + e), ""
            }
            return t
        }
        _animationBegin(t, e) {
            e && this._progressed || (this.status = t + "-start", this.target.show(!1), this.target.trigger("in" === t ? "animationInStart" : "animationOutStart", [this.target, this.status], !0))
        }
        _animationEnd(t, e) {
            e && this._progressed || (this.status = t + "-end", this.target.trigger("in" === t ? "animationInEnd" : "animationOutEnd", [this.target, this.status], !0), "in" === t ? this.removeActiveAnimator() : "out" === t && this.target.hide(!1))
        }
        removeActiveAnimator() {
            this.activeAnimator && (this.activeAnimator.reset(), this.activeAnimator = null)
        }
        generateNewAnimator(t) {
            var e, i = u(this.animationsData);
            return this.hasAnimation(t, i) ? (e = (i = i["in" === t ? "animationIn" : "animationOut"])["type"], i = x(i, zi), e = Ii(e, this.element, t, i, null, {
                autoplay: !1,
                begin: () => this._animationBegin(t, !0),
                complete: () => this._animationEnd(t, !0)
            }), this.status = t + "-init", this.activePhase = t, e) : null
        }
        startAnimation(t) {
            var e, i = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            return this._progressed = !1, this.animatorIsSet || this.setAnimator(), !(!i && t + "-end" === this.status || (t === this.activePhase && this.activeAnimator || (this.removeActiveAnimator(), this.activeAnimator = this.generateNewAnimator(t)), !this.activeAnimator) || (e = this.activeAnimator.timeline, (i || "in" === t && "in-init" === this.status || "out" === t && "out-init" === this.status) && (e.seek(0), e.play()), 0))
        }
        progressAnimation(t, e) {
            var i;
            this._progressed = !0, this.animatorIsSet || this.setAnimator(), t === this.activePhase && this.activeAnimator || (this.removeActiveAnimator(), this.activeAnimator = this.generateNewAnimator(t)), this.activeAnimator && (i = this.activeAnimator["timeline"], i.seek(i.duration * e), 1 <= e && this.status !== t + "-end" && this._animationEnd(t), e < 1 && this.status === t + "-end" || this.status === t + "-init") && this._animationBegin(t)
        }
        setAnimator() {
            if (this.animatorIsSet = !0, "in-end" !== this.status) {
                let t = 0,
                    e = !1;
                var i;
                this.activePhase || (this.activePhase = "in"), this.activeAnimator && (i = this.activeAnimator["timeline"], t = i.progress, e = i.began && !i.paused, this.removeActiveAnimator()), this.activeAnimator = this.generateNewAnimator(this.activePhase), this.activeAnimator ? (i = this.activeAnimator["timeline"], t && i.seek(i.duration * (t / 100)), e && i.play()) : this.status = "in-end"
            }
        }
        hasAnimation(t, e) {
            return "in" === t ? !!e.animationIn : !!e.animationOut
        }
    }

    function Ri(t, e, i, s, n, o, r) {
        (6 < arguments.length && void 0 !== r && r || t < n || e < o) && ({
            width: t,
            height: e
        } = Pi("cover", n, o, t, e));
        r = {
            x: t * i - n / 2,
            y: e * s - o / 2
        };
        return r.x = Math.min(t - n, Math.max(0, r.x)), r.y = Math.min(e - o, Math.max(0, r.y)), {
            position: r,
            mediaSize: {
                width: t,
                height: e
            }
        }
    }

    function ji(n, o, t) {
        var e = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "50% 50%";
        let r = 4 < arguments.length ? arguments[4] : void 0;
        var {
            objectFit: t = t,
            objectPosition: e = e
        } = n.dataset;
        const a = t.split(",").map(t => t.trim()),
            h = e.split(",").map(t => t.trim());
        let l, c;
        const i = (t, e) => {
            var i, s;
            !e && l && "custom" !== l || (l = u(a, t), c = u(h, t), "custom" !== l ? (n.style.width = "", n.style.height = "", n.style.left = "", n.style.right = "", n.classList.remove(r + "-cropped"), function(t, e, i, s, n) {
                s = !(3 < arguments.length && void 0 !== s) || s, n = 4 < arguments.length && void 0 !== n && n, "tile" === (e = s && t.hasAttribute("data-object-fit") ? t.getAttribute("data-object-fit") : e) && "IMG" === t.nodeName ? (t.style.visibility = "hidden", t.parentElement.style.backgroundImage = `url( ${t.getAttribute("data-src")||t.src})`) : (t.hasAttribute("data-object-fit") && !n || t.setAttribute("data-object-fit", e), t.style.objectFit = e, (i = s && t.hasAttribute("data-object-position") ? t.getAttribute("data-object-position") : i) && (t.hasAttribute("data-object-position") && !n || t.setAttribute("data-object-position", i), t.style.objectPosition = i))
            }(n, l, c, !1, !0)) : ({
                offsetWidth: e,
                offsetHeight: i
            } = o || n.parentElement, s = n, s = Di(m(s, "crop"), t => "false" !== t.trim() && Bi(t)), {
                focalPoint: s,
                mediaSize: t
            } = u(s, t), {
                position: t,
                mediaSize: s
            } = Ri(t.width, t.height, s.x, s.y, e, i), n.style.objectFit = "", n.style.width = `${null==s?void 0:s.width}px`, n.style.height = `${null==s?void 0:s.height}px`, n.style.left = `-${null==t?void 0:t.x}px`, n.style.top = `-${null==t?void 0:t.y}px`, n.classList.add(r + "-cropped")))
        };
        return p.on("breakpointChange", (t, e) => i(e, !0)), i(p.activeBreakpoint), {
            update: () => i(p.activeBreakpoint),
            currentObjectFit: l,
            currentObjectFitPosition: c
        }
    }

    function Wi(t, e, i) {
        Ti(t, "srcset"), Ti(t, "src"), Ti(t, "srcset", "depicter-srcset"), Ti(t, "src", "depicter-src"), t.complete ? (e || i) && (t.naturalWidth && e ? e() : i && i()) : (e && t.addEventListener("load", e, !1), i && t.addEventListener("error", i, !1))
    }
    const Ni = (t, e, i, s) => {
        const n = t.querySelector("img");
        t = t.querySelectorAll("source");
        n || t.length ? (t.forEach(t => {
            Ti(t, "srcset", "depicter-srcset")
        }), Ti(n, "src", "depicter-src"), e && n.addEventListener("load", e, !1), i && n.addEventListener("error", i, !1), s && window.addEventListener("resize", () => {
            n.complete || s()
        })) : e()
    };
    class Hi extends t {
        constructor(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            super(), this.parentEmitter = t, this.section = t, this.container = document.createElement("div"), this.container.classList.add(c + "-background-container"), this.container.classList.add(c + "-bg-container"), this.element = document.createElement("div"), this.element.classList.add(c + "-section-background"), this.animationWrap = document.createElement("div"), this.animationWrap.classList.add(c + "-background-animation-wrap"), this.animationWrap.appendChild(this.element), this.container.appendChild(this.animationWrap), t.composer.options.get("disableAnimations") || (this.inOutAnimation = new Vi(this, t.element, this.animationWrap, e)), this._onBgImageLoad = this._onBgImageLoad.bind(this), this._onBgImageLoadError = this._onBgImageLoadError.bind(this)
        }
        appendTo(t) {
            t.appendChild(this.container)
        }
        appendBackground(t) {
            this.element.appendChild(t)
        }
        appendBackgroundImage(t, e) {
            this.backgroundImage = t, this.appendBackground(t), this.isPicture = "PICTURE" === t.tagName, this.targetImg = this.isPicture ? t.querySelector("img") : t;
            t = ji(this.targetImg, this.element, e, void 0, c).update;
            this.section.on("resize", t, void 0, 100), this.updateBgImageFit = t
        }
        loadBackgroundImage() {
            this.backgroundImage && (this.isPicture ? Ni : Wi)(this.backgroundImage, this._onBgImageLoad, this._onBgImageLoadError)
        }
        _onBgImageLoad(t) {
            this.updateBgImageFit(), this.trigger("backgroundImageLoad", [t, this.backgroundImage])
        }
        _onBgImageLoadError(t) {
            this.trigger("backgroundImageLoadError", [t, this.backgroundImage])
        }
    }
    class Fi extends t {
        constructor(t, e) {
            var i = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
            super(), this.element = t, this.composer = e, this.view = e.view, this.id = t.id, this.eventPrefix = "section", this.parentEmitter = this.composer, this.readyTrigger = new g(this.ready.bind(this)), this.loadTrigger = new g(this.loadContent.bind(this), !1), this.targetHeight = t.dataset.wrapperHeight ? t.dataset.wrapperHeight.split(",") : e.options.get("height"), this._active = !1, this.addDefaultAnimation = i, this._setupBackground()
        }
        get active() {
            return this._active
        }
        set active(t) {
            this._active !== t && (this._active = t, this.isActivated = t, this.element.classList[t ? "add" : "remove"](c + "-active"), this.trigger(t ? "activated" : "deactivated", [this], !0), this.isReady) && this.trigger(t ? "readyAndActivated" : "readyAndDeactivated", [this], !0)
        }
        get status() {
            return this._status
        }
        set status(t) {
            var e;
            t !== this._status && (this.element.classList.add(c + "-" + t), this._status && this.element.classList.remove(c + "-" + this._status), e = this._status, this._status = t, this.trigger("statusChange", [this, t, e], !0))
        }
        reactive() {
            this.active && (this.active = !1, this.active = !0)
        }
        calculateSize() {}
        mount() {
            !1 !== this.firstMount ? this.firstMount = !0 : this.firstMount = !1, this.trigger("beforeMount", [this], !0), this.mounted = !0, this.isReady || this.isLoading || this.loadTrigger.exec(), this.trigger("afterMount", [this], !0)
        }
        unmount() {
            this.mounted = !1
        }
        ready() {
            this.element.classList.add(c + "-ready"), this.isReady = !0, this.isLoading = !1, this.trigger("ready", [this], !0), this._active && this.trigger("readyAndActivated", [this], !0)
        }
        loadContent() {
            this.isLoading = !0, this.trigger("loadingStart", [this], !0), this.backgroundImage ? (this._onBgLoad = this._onBgLoad.bind(this), this.background.on("backgroundImageLoad, backgroundImageLoadError", this._onBgLoad), this.background.loadBackgroundImage()) : this.readyTrigger.exec()
        }
        checkResize(t) {
            var e = this.element.offsetWidth,
                i = this.element.offsetHeight;
            !t && this.height === i && this.width === e || (this.width = e, this.height = i, this.trigger("resize", [this, e, i], !0))
        }
        _setupBackground() {
            this.background = new Hi(this, this.addDefaultAnimation), this.background.appendTo(this.element), this.backgroundImage = this.element.querySelector(`:scope > img.${c}-bg,:scope > picture.${c}-bg`), this.backgroundImage && (this.background.appendBackgroundImage(this.backgroundImage, this.composer.options.get("sectionFit")), this.trigger("bgImageSetup", [this.backgroundImage], !0))
        }
        _onBgLoad() {
            this.trigger("bgImageLoad", [this], !0), this._bgLoaded || this.readyTrigger.exec(), this._bgLoaded = !0
        }
    }
    i.registerSection("block", class extends Fi {
        constructor(t, e) {
            super(t, e, !1), this.space = 0, this.merge = 1, this.position = -1, this.offset = -1, this.size = 0, this.element.hasAttribute("data-merge") && (this.merge = function(t, e) {
                return e = !(1 < arguments.length && void 0 !== e) || e, t = "string" == typeof t && (t = t.replace(/\s+/g, "").split(","), e) ? t.map(t => Number.parseInt(t, 10)) : t
            }(this.element.getAttribute("data-merge"))), this.trigger("sectionCreate", [this], !0)
        }
        get pendingOffset() {
            return this._pendingOffset
        }
        set pendingOffset(t) {
            t !== this._pendingOffset && (this._pendingOffset = t, this.trigger("pendingOffsetChange", [this, t, t / this.size]))
        }
        triggerPendingOffsetChange() {
            this.trigger("pendingOffsetChange", [this, this._pendingOffset, this._pendingOffset / this.size])
        }
        get active() {
            return this._active
        }
        set active(t) {
            this._active !== t && this.isReady && this.background.inOutAnimation && this.background.inOutAnimation.startAnimation(t ? "in" : "out", !0), super.active = t
        }
        ready() {
            super.ready(), this._active && this.background.inOutAnimation && this.background.inOutAnimation.startAnimation("in")
        }
        calculateSize() {
            var t, e = this.composer.options.get("columns"),
                i = u(this.merge),
                s = this.view.options.is("dir", "h");
            e ? (e = u(e), t = this.view.size - this.space * (e - 1), this.size = t / e + this.space, 1 < i && (i = Math.min(e, i), this.size = this.size * i + this.space * (i - 1), t += this.space * (i - 1))) : this.size = this.view.size + this.space, this.element.style.width = s ? this.size + "px" : this.view.width + "px", this.checkResize()
        }
        inRangeTest(t) {
            return t >= this.position && t < this.position + this.size * (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1)
        }
    });
    var $i = new WeakMap;
    i.registerSection("animative", class extends Fi {
        constructor(t, e) {
            super(t, e), W(this, $i, {
                writable: !0,
                value: ""
            }), this.inAnimation = {
                duration: 0,
                start: 0
            }, this.outAnimation = {
                duration: 0,
                start: 0
            }, this.appearDuration = 0, this.disappearDuration = 0, this.element.classList.add(c + "-anim-section"), this.disableAnimationAdapterControl = !0, this.trigger("sectionCreate", [this], !0), this.once("readyAndActivated", () => {
                this.startInOutAnimation("in")
            })
        }
        get position() {
            return this.outAnimation.start
        }
        get size() {
            return this.disappearDuration
        }
        updateDurations() {
            var t, e, i = F;
            ((e = j(t = this, e = $i, "get")).get ? e.get.call(t) : e.value) !== i && (R(this, $i, i), this.inAnimation.duration = this.getInOutAnimationDuration("in"), this.outAnimation.duration = this.getInOutAnimationDuration("out"))
        }
        inRangeTest(t) {
            return t > this.inAnimation.start && t < this.inAnimation.start + this.appearDuration ? "in" : t > this.outAnimation.start && t < this.outAnimation.start + this.disappearDuration ? "out" : t === this.outAnimation.start && "in-end"
        }
        remaining(t, e) {
            e = e || this.inRangeTest(t);
            return "in" === e ? 1 - (t - this.inAnimation.start) / this.appearDuration : "out" === e || "in-end" === e ? 1 - (t - this.outAnimation.start) / this.disappearDuration : NaN
        }
        getLastAnimativeElement(t) {
            const i = "in" === t ? "animationIn" : "animationOut";
            let s, n = 0;
            return [...this.layersAnimations || [], this.background.inOutAnimation.animationsData].forEach(t => {
                var e;
                t && (t = u(t))[i] && ((e = (t[i].duration || 0) + (t[i].delay || 0)) > n && (s = t.target), n = Math.max(e, n))
            }), {
                target: s,
                duration: n
            }
        }
        getInOutAnimationDuration(t, e) {
            return Math.max(this.getLastAnimativeElement(t).duration, "in" === t && (null == e || null == (t = e.getInOutAnimationDuration) ? void 0 : t.call(e, "out")) || 0)
        }
        startInOutAnimation(i) {
            var t, e;
            this.killInOutAnimation(), null != this && null != (t = this.layersController) && t.layers.forEach(t => {
                var e;
                null != t && null != (e = t.animateInOut) && e.call(t, i, !0)
            }), null != (t = this.background) && null != (e = t.animateInOut) && e.call(t, i, !0), this.getLastAnimativeElement(i).target.on("animationInEnd, animationOutEnd", () => {
                this.trigger("allInOutAnimationsEnd", [i])
            }, this)
        }
        progressInOutAnimation(i, s) {
            var t, e;
            this.killInOutAnimation(), s = Math.max(0, Math.min(1, s)), null != this && null != (e = this.layersController) && e.layers.forEach(t => {
                var e;
                null != t && null != (e = t.progressInOut) && e.call(t, s, i, !0)
            }), null != (t = (e = this.background).progressInOut) && t.call(e, s, i, !0)
        }
        killInOutAnimation() {
            var t, e;
            this.getLastAnimativeElement("in").target.offOnContext(this), this.getLastAnimativeElement("out").target.offOnContext(this), null != this && null != (e = this.layersController) && e.layers.forEach(t => {
                var e;
                null != t && null != (e = t.killInOutAnimation) && e.call(t)
            }), null != (t = (e = this.background).killInOutAnimation) && t.call(e)
        }
        calculateSize() {
            this.element.style.width = this.view.width + "px", this.checkResize()
        }
    });
    var Oe = window.getComputedStyle(document.documentElement, ""),
        Me = (Array.prototype.slice.call(Oe).join("").match(/-(moz|webkit|ms)-/) || "" === Oe.OLink && ["", "o"])[1],
        Yi = {
            dom: "WebKit|Moz|MS|O".match(new RegExp("(" + Me + ")", "i"))[1],
            lowercase: Me,
            css: "-" + Me + "-",
            js: {
                moz: "Moz",
                webkit: "Webkit",
                o: "O",
                ms: "ms"
            }[Me]
        };
    class qi extends Ut {
        constructor() {
            super(), this.options = new a, this.readOptions = this.readOptions.bind(this), this.options.observe(this.options.register({
                dir: "h",
                reverse: !1,
                space: 0,
                loop: !1,
                instantActive: !0
            }), this.readOptions), this.readOptions()
        }
        readOptions() {
            const e = this._positionProp;
            var t = this.options.get("reverse");
            this._space = this.options.get("space"), this._loop = this.options.get("loop"), this._reverseFactor = t ? 1 : -1, this.activeEnteringSection = this.options.get("instantActive"), "h" === this.options.get("dir") ? (this.sizeProp = "width", this.offsetProp = "offsetWidth", this._positionProp = t ? "right" : "left", this._transformProp = "X", this.element.classList.remove(c + "-dir-v"), this.element.classList.add(c + "-dir-h")) : (this.sizeProp = "height", this.offsetProp = "offsetHeight", this._transformProp = "Y", this._positionProp = t ? "bottom" : "top", this.element.classList.remove(c + "-dir-h"), this.element.classList.add(c + "-dir-v")), this.sections.forEach(t => {
                t.hasCustomSpace || (t.space = this._space), t.element.style[e] = "", t.sizeReference = this.offsetProp
            }), this.resize(), this.update()
        }
        update() {
            super.update(!(0 < arguments.length && void 0 !== arguments[0]) || arguments[0]), this._paintScheduled || (this._paintScheduled = !0, requestAnimationFrame(() => {
                this.sections.forEach(t => this.locateSection(t)), this.sectionsContainer.style[Yi.js + "Transform"] = "translate" + this._transformProp + "(" + this._position * this._reverseFactor + "px)", this._paintScheduled = !1
            }))
        }
        locateSection(t) {
            t.element.style[this._positionProp] = t.offset + "px"
        }
        _afterSectionAdd(t) {
            t.customSpace || (t.space = this._space), super._afterSectionAdd(t)
        }
    }
    i.registerView("basic", qi);
    const Xi = {
            transform: {
                translateX: [0, 0],
                translateY: [0, 0],
                translateZ: [0, 0],
                rotateX: [0, 0],
                rotateY: [0, 0],
                rotateZ: [0, 0],
                scale: [1, 1],
                skewX: [0, 0],
                skewY: [0, 0]
            },
            opacity: [1, 1],
            limitDistance: !1,
            limitOpacity: !1,
            ease: null
        },
        Zi = {
            translateX: "px",
            translateY: "px",
            translateZ: "px",
            rotateX: "deg",
            rotateY: "deg",
            rotateZ: "deg",
            skewY: "deg",
            skewX: "deg"
        },
        Gi = {
            fadeBasic: {
                className: c + "-fade-basic-view",
                opacity: [.4, .4]
            },
            wave: {
                className: c + "-wave-view",
                transform: {
                    translateZ: [-300, -300]
                }
            },
            fadeWave: {
                className: c + "-fade-wave-view",
                opacity: [.6, .6],
                transform: {
                    scale: [.875, .875]
                }
            },
            flow(t) {
                return {
                    className: c + "-flow-view",
                    transform: w(w(w({}, "h" === t.dir && {
                        rotateY: [30, -30]
                    }), "v" === t.dir && {
                        rotateX: [-30, 30]
                    }), {}, {
                        translateZ: [-600, -600]
                    })
                }
            },
            fadeFlow(t) {
                return {
                    className: c + "-fade-flow-view",
                    opacity: [.6, .6],
                    transform: w(w(w({}, "h" === t.dir && {
                        rotateY: [50, -50]
                    }), "v" === t.dir && {
                        rotateX: [-50, 50]
                    }), {}, {
                        translateZ: [-100, 100]
                    })
                }
            }
        };
    i.registerView("transform", class extends qi {
        constructor() {
            super(), this.options.register({
                transformStyle: "flow"
            }), this.on("elementAppend", () => {
                var t = this.options.toObject();
                this.transformOptions = "function" == typeof Gi[t.transformStyle] ? Gi[t.transformStyle](t) : Gi[t.transformStyle], this.element.classList.add(c + "-transform-view"), this.element.classList.add(this.transformOptions.className)
            })
        }
        locateSection(t) {
            t.element.style[this._positionProp] = t.offset + "px";
            var e = ((t, e) => {
                e = w(w(w({}, Xi), e), {}, {
                    transform: w(w({}, Xi.transform), e.transform)
                });
                let n = Math.abs(t),
                    o = "";
                e.limitDistance && (n = Math.min(n, 1));
                const r = t < 0 ? 0 : 1;
                let i = 1;
                return Object.entries(e.transform).forEach(t => {
                    var e, [t, i] = t,
                        s = Zi[t] || "";
                    "scale" === t ? 1 !== i[r] && (e = Math.abs(i[r] ** n), o += "scale(" + e + ") ") : i[r] && (o += t + "(" + n * i[r] + s + ") ")
                }), {
                    opacity: i = e.opacity[r] < 1 ? e.limitOpacity && 1 < n ? 0 : 1 - Math.min(n, 1 - e.opacity[r]) : i,
                    transform: o
                }
            })(t.pendingOffset / this.size, this.transformOptions);
            t.element.style.transform = e.transform, t.element.style.opacity = e.opacity
        }
    });
    class Ui extends qi {
        update() {
            var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
            this._sectionsCount = this.sections.length, t && this.arrange(), this.locateInLoop(), this.updateStatusAndIndex(), this.trigger("update", [this._position], !0), this._paintScheduled = !0, requestAnimationFrame(() => {
                this.sections.forEach(t => this.locateSection(t)), this._paintScheduled = !1
            })
        }
        locateSection(t) {
            t.element.style.zIndex = this.count - Math.abs(Math.ceil(t.pendingOffset / this.size))
        }
    }
    i.registerView("baseStack", Ui);
    i.registerView("stack", class extends Ui {
        constructor() {
            super(), this.element.classList.add(c + "-stack-view"), this.options.register({
                scaleFactor: .2
            }), this.on("elementAppend", () => {
                this.scaleFactor = this.options.get("scaleFactor")
            })
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                i = Math.abs(e);
            super.locateSection(t), i < 1 ? (t.element.style.visibility = "", e < 0 ? t.element.style.transform = "scale(" + (1 - i * this.scaleFactor) + ")" : (t.element.style.transform = `translate${this._transformProp}(${-i*this.size}px)`, t.element.style.zIndex = 1e3), t.element.classList.remove(c + "-section-hidden")) : t.element.classList.add(c + "-section-hidden")
        }
    });
    i.registerView("fade", class extends Ui {
        constructor() {
            super(), this.element.classList.add(c + "-fade-view")
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                e = Math.abs(e);
            super.locateSection(t), e < 1 ? (t.element.style.opacity = 1 - e, t.element.classList.remove(c + "-section-hidden")) : t.element.classList.add(c + "-section-hidden")
        }
    });
    i.registerView("mask", class extends Ui {
        constructor() {
            super(), this.element.classList.add(c + "-mask-view"), this.options.register({
                maskParallax: 0
            }), this.on("elementAppend", () => {
                this.maskParallax = this.options.get("maskParallax")
            }), this.on("sectionAdd", this._wrapSection.bind(this))
        }
        _wrapSection(t, e) {
            var i = document.createElement("div");
            i.classList.add(c + "-section-mask"), e.element.parentElement.insertBefore(i, e.element), i.appendChild(e.element), e.maskElement = i
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                i = Math.abs(e);
            super.locateSection(t), i < 1 ? (t.element.style.visibility = "", t.maskElement.style.transform = `translate${this._transformProp}(${e*this.size}px)`, t.element.style.transform = `translate${this._transformProp}(${-e*this.size*(1-this.maskParallax)}px)`, t.element.classList.remove(c + "-section-hidden")) : t.element.classList.add(c + "-section-hidden")
        }
    });
    i.registerView("cube", class extends Ui {
        constructor() {
            super(), this.element.classList.add(c + "-cube-view"), this.options.register({
                shadow: .8,
                dolly: 500
            }), this.on("elementAppend", () => {
                this._rotateAxis = "h" === this.options.get("dir") ? "rotateY" : "rotateX", this._rotateDir = "h" === this.options.get("dir") ? -1 : 1, this._shadow = this.options.get("shadow"), this._dolly = this.options.get("dolly")
            })
        }
        update() {
            var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
            this._sectionsCount = this.sections.length, t && this.arrange(), this.locateInLoop(), this.updateStatusAndIndex(), this.trigger("update", [this._position], !0), this._paintScheduled = !0, requestAnimationFrame(() => {
                this.sections.forEach(t => this.locateSection(t)), this._paintScheduled = !1
            })
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                i = Math.abs(e);
            super.locateSection(t), i < 1 ? (t.element.style.visibility = "", t.element.style.transform = this._rotateAxis + "(" + -e * this._rotateDir * 90 + "deg)", t.element.style.transformOrigin = "50% 50% -" + this.size / 2 + "px", this._shadow && (t.element.style.filter = `brightness(${1-i*this._shadow})`), t.element.classList.remove(c + "-section-hidden"), this._dolly && 0 < e && (this.sectionsContainer.style.transform = `translateZ(${-this._dolly/2+Math.abs(i-.5)*this._dolly}px)`)) : t.element.classList.add(c + "-section-hidden")
        }
    });
    i.registerView("animroll", class extends Gt {
        constructor() {
            super(), this.options = new a, this.options.register({
                loop: !0,
                dir: "h",
                reverse: !1,
                transitionType: "animation"
            }), this.element.classList.add(c + "-animative-view"), this.isSafeForInteractions = !0, this.size = 0, this.scrollable = !0, this._position = 0
        }
        arrange() {
            var t = this._length;
            this._length = 0, this._loop = this.options.get("loop"), this.sections.forEach((t, e) => {
                t.index = e;
                e = this.sections[this.normalizeVal(e + 1, this.sections.length)];
                t.calculateSize(this.options.get("dir")), t.updateDurations(), t.outAnimation.start = this._length, e.updateDurations(), e.inAnimation.start = this._length, e.appearDuration = Math.max(t.outAnimation.duration, e.inAnimation.duration), t.disappearDuration = e.appearDuration, this._length += e.appearDuration
            }), this.trigger("arrange", null, !0), this._length !== t && this.trigger("lengthChange", [this._length], this)
        }
        get nominalLength() {
            var t;
            return this._length - (!this._loop && (null == (t = this.sections[this.sectionsCount - 1]) ? void 0 : t.disappearDuration) || 0)
        }
        get length() {
            return this._length
        }
        get dragFactor() {
            var t = "h" === this.options.get("dir") ? "clientWidth" : "clientHeight";
            return this.currentSection.size / this.element[t]
        }
        get position() {
            return this._position
        }
        set position(t) {
            this.isSafeForInteractions && (t = this._loop ? this.normalizeVal(t, this._length) : Math.max(0, Math.min(t, this.nominalLength)), this._position !== t) && (this.scrollDirection = t > this._position ? "forward" : "backward", this._position = t, this.update(!1), this.trigger("scroll", [this._position]))
        }
        resize() {
            var t = super.resize();
            return this.size = this.length / (this.sections.length || 1), t
        }
        update() {
            var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
            super.update(), t && this.arrange(), this.updateStatusAndIndex(), this.sections.forEach(t => this.updateSection(t))
        }
        updateStatusAndIndex() {
            var t, e;
            this.sections.length && ([e] = t = this.getIndexesAtPosition(this._position), this.currentSectionAppearDuration = this.sections[t[0]].appearDuration, this.sections.forEach(t => {
                let e = "neutral";
                var i = t.inRangeTest(this._position);
                "in" === i ? e = "in-progress" : "out" === i && (e = "out-progress"), t.status = e
            }), this.indexes.toString() !== t.toString() && (this.indexes = t, this.trigger("indexesChange", [this.indexes])), this.index !== e) && (this.index = e, this.trigger("indexChange", [this.index]))
        }
        updateStatusAndIndexByBetweenAnimation(i, s) {
            this.sections.forEach(t => {
                let e = "neutral";
                t.index === s ? e = "in-progress" : t.index === i && (e = "out-progress"), t.status = e, t.active = "neutral" !== e
            });
            var t = [s];
            this.indexes.toString() !== t.toString() && (this.indexes = t, this.trigger("indexesChange", [this.indexes])), this.index !== s && (this.index = s, this.trigger("indexChange", [this.index]))
        }
        updateSection(t) {
            var e = t.inRangeTest(this._position);
            e ? (t.active = !0, t.isReady && !this.betweenAnimation && ("in" === e ? (e = (this._position - t.inAnimation.start) / t.inAnimation.duration, t.progressInOutAnimation("in", e)) : (e = (this._position - t.outAnimation.start) / t.outAnimation.duration, t.progressInOutAnimation("out", e)))) : t.active = !1
        }
        getIndexAtPosition(e) {
            var t;
            let i = null;
            return this._loop && (e = this.normalizeVal(e, this._length)), this.sections.filter(t => t.inRangeTest(e)).forEach(t => {
                (!i || t.remaining(e) < .5) && (i = t)
            }), (null == (t = i) ? void 0 : t.index) || 0
        }
        getIndexesAtPosition(t) {
            return [this.getIndexAtPosition(t)]
        }
        scrollTo(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
                i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
                s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "auto";
            let n = 4 < arguments.length ? arguments[4] : void 0;
            if (t = this.normalizePositionByDirection(t, s), !this.isSafeForInteractions) return !1;
            if (e && (void 0 === n.index || n.useScrollAnimation || "scroll" === this.options.get("transitionType"))) this.killScrollAnimation(), (n = w(w({
                easing: "easeOutExpo",
                duration: 1e3 * i
            }, n), {}, {
                complete: () => {
                    this.animating = !1, this.trigger("scrollToAnimationEnd", void 0, !0)
                }
            })).position = t, this.animating = !0, C(w({
                targets: this
            }, n));
            else {
                if (e) {
                    if (this.betweenAnimation) return !1;
                    const o = this.sections[n.index];
                    return this.currentSection === o ? !1 : (s = this.currentSection.disappearDuration > o.appearDuration ? this.currentSection : o, o.startInOutAnimation("in"), this.currentSection.startInOutAnimation("out"), this.updateStatusAndIndexByBetweenAnimation(this.index, n.index), this.betweenAnimation = !0, this.isSafeForInteractions = !1, this.trigger("betweenAnimationStart"), this.trigger("unsafeInteractions"), s.once("allInOutAnimationsEnd", () => {
                        this.betweenAnimation = !1, this.isSafeForInteractions = !0, this.position = o.position, this.trigger("betweenAnimationEnd"), this.trigger("safeInteractions"), this.trigger("scrollToAnimationEnd", void 0, !0)
                    }, this), !0)
                }
                this.position = t
            }
            return !0
        }
        killScrollAnimation() {
            this.animating && (C.remove(this), this.animating = !1)
        }
        normalizePositionByDirection(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "auto";
            t = this._loop ? this.normalizeVal(t, this._length) : Math.min(t, this._length - this._size);
            let i = 0;
            if (this._loop && "off" !== e) {
                var s = this._position,
                    n = t,
                    o = s < n ? n - s : this._length - s + n,
                    r = s < n ? n - this._length - s : n - s;
                switch (e) {
                    case "auto":
                        i = Math.abs(r) < Math.abs(o) ? r : o;
                        break;
                    case "backward":
                        i = r;
                        break;
                    default:
                        i = o
                }
                return this._position + i
            }
            return t
        }
        normalizeVal(t, e) {
            return (t %= e) < 0 && (t += e), t
        }
        _afterSectionAdd(t, e) {
            super._afterSectionAdd(t, e), t.on("ready", () => this.updateSection(t))
        }
    });
    i.registerAddon("autoHeight", class {
        constructor(t) {
            this.composer = t, this.composer.on("init", this._setup, this)
        }
        update(t) {
            let e = 0;
            this.composer.view.indexes.forEach(t => {
                e = Math.max(this.composer.view.sections[t].element.offsetHeight, e)
            }), "indexesChange" !== t ? this.composer.view.element.style.transitionDuration = "0ms" : e !== this.lastHeight && (this.composer.view.element.style.transitionDuration = "300ms"), this.lastHeight = e, this.composer.view.element.style.height = e + "px", "indexesChange" !== t && this._checkScrollbar()
        }
        _checkScrollbar() {
            var t = document.body.clientWidth - window.innerWidth;
            this.scrollbarWidth !== t && (this.scrollbarWidth = t, this.composer.layoutController.update())
        }
        _setup() {
            "fullscreen" !== this.composer.options.get("layout") && (this.composer.element.classList.add(c + "-auto-height"), this.scrollbarWidth = document.body.clientWidth - window.innerWidth, this.composer.view.element.addEventListener("transitionend", t => {
                this.composer.view.element.style.transitionDuration = "0ms", t.target === this.composer.view.element && "height" === t.propertyName && this._checkScrollbar()
            }), this.composer.on("indexesChange, sectionResize, resize", this.update, this), this.update())
        }
    });
    const Ki = {};
    class T extends t {
        static registerLayer(t, e) {
            if (h.call(Ki, t)) throw new Error(`This layer (${t}) is already registered.`);
            Ki[t] = e
        }
        static get layers() {
            return Ki
        }
        constructor(t, e, i) {
            var s = 3 < arguments.length && void 0 !== arguments[3] && arguments[3];
            super(), this.holder = t, (this.holder.layersController = this).wrapperWidth = e, this.wrapperHeight = i, this.keepWrapperAspectRatio = s, this.layers = [], this.container = document.createElement("div"), this.container.classList.add(c + "-layers-container"), this.layersFold = document.createElement("div"), this.layersFold.classList.add(c + "-layers-fold"), this.wrapper = document.createElement("div"), this.wrapper.classList.add(c + "-layers-wrapper"), this.container.appendChild(this.wrapper), this.wrapper.appendChild(this.layersFold)
        }
        setupLayers(t, e) {
            this.container = document.createElement("div"), this.container.classList.add(c + "-layers-container"), this.layersFold = document.createElement("div"), this.layersFold.classList.add(c + "-layers-fold"), this.wrapper = document.createElement("div"), this.wrapper.classList.add(c + "-layers-wrapper"), this.container.appendChild(this.wrapper), this.wrapper.appendChild(this.layersFold), this._initLayers(t, null, e), this.hasFixedLayers && this.holder.on("statusChange, activated, deactivated", this._setFixedContainerClass, this), this._updateWrapperSize(), p.on("breakpointChange", this._updateWrapperSize, this), this.keepWrapperAspectRatio && this.holder.on("resize", this._updateWrapperSize, this), this.trigger("layersSetup", [this])
        }
        changeWrapperSize(t, e) {
            this.wrapperWidth = t, this.wrapperHeight = e, this._updateWrapperSize()
        }
        _initLayers(t, o, r, a) {
            t.querySelectorAll(`:scope > .${c}-layer, :scope > a > .${c}-layer`).forEach((t, e) => {
                let i = !1,
                    s = ("A" === t.parentNode.nodeName && (i = !0), t.getAttribute("data-type") || "custom");
                h.call(Ki, s) || (s = "custom");
                var n = Ki[s];
                n && (n = new n(t, s, this, this.holder, e, i, a), e = "false" !== t.getAttribute("data-wrap"), n.positionType = t.getAttribute("data-position"), "static" === n.positionType ? n.frame.classList.add(c + "-static") : n.isFixed = !0 !== r && "fixed" === n.positionType, n.isFixed ? this._appendToFixedContainer(n, e) : o ? o.appendChild(n.frame) : this._appendToLayersContainer(n, e), n.init(), this.layers.push(n), n.nestable) && this._initLayers(n.element, n.element, !0, n)
            })
        }
        _updateWrapperSize() {
            var t = u(this.wrapperWidth),
                e = u(this.wrapperHeight);
            this.wrapper && (this.wrapper.style.maxWidth = t + "px", this.wrapper.style.height = e + "px"), this.keepWrapperAspectRatio && (this.wrapper.style.height = e * Math.min(1, this.wrapper.offsetWidth / t || t) + "px"), this.fixedWrapper && (this.fixedWrapper.style.maxWidth = t + "px", this.fixedWrapper.style.maxHeight = e + "px")
        }
        _setFixedContainerClass(t, e, i, s) {
            "activated" === t ? this.fixedContainer.classList.add(c + "-active") : "deactivated" === t ? this.fixedContainer.classList.remove(c + "-active") : (this.fixedContainer.classList.add(c + "-" + i), s && this.fixedContainer.classList.remove(c + "-" + s))
        }
        _appendToLayersContainer(t, e) {
            this.hasLayers = !0, (e ? this.layersFold : this.container).appendChild(t.frame)
        }
        _appendToFixedContainer(t, e) {
            this.hasFixedLayers || (this.hasFixedLayers = !0, this.fixedContainer = document.createElement("div"), this.fixedContainer.classList.add(c + "-layers-container"), this.fixedContainer.classList.add(c + "-fixed"), this.fixedLayersFold = document.createElement("div"), this.fixedLayersFold.classList.add(c + "-layers-fold"), this.fixedWrapper = document.createElement("div"), this.fixedWrapper.classList.add(c + "-layers-wrapper"), this.fixedContainer.appendChild(this.fixedWrapper), this.fixedWrapper.appendChild(this.fixedLayersFold)), (e ? this.fixedLayersFold : this.fixedContainer).appendChild(t.frame)
        }
    }
    var Ji = (t, i) => t.map((t, e) => (void 0 === t || "" === t) && Array.isArray(i) ? i[e] : t);
    i.registerAddon("layersAdapter", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                fadeLayers: !1
            }), this.composer.on("beforeSectionsSetup", this._init, this)
        }
        _init() {
            this.wrapperWidth = this.composer.options.get("width"), this.wrapperHeight = this.composer.options.get("height"), this.composer.options.get("fadeLayers") && this.composer.element.classList.add(c + "-fade-layers"), this.composer.on("sectionBeforeMount", this.readLayers, this)
        }
        readLayers(t, e) {
            var i, s;
            e.layersController || (e.loadTrigger.hold(), this.wrapperWidth = this.composer.options.get("width"), e.element.dataset.wrapperWidth && (this.wrapperWidth = Ji(e.element.dataset.wrapperWidth.split(","), this.wrapperWidth)), this.wrapperHeight = this.composer.options.get("height"), e.element.dataset.wrapperHeight && (this.wrapperHeight = Ji(e.element.dataset.wrapperHeight.split(","), this.wrapperHeight)), (i = new T(e, this.wrapperWidth, this.wrapperHeight, this.composer.options.get("keepAspectRatio"))).composer = this.composer, i.parentEmitter = this.composer, (e.layersController = i).setupLayers(e.element), e.element.appendChild(i.container), i.hasFixedLayers && (this.composer.fixedLayersContainer || ((s = document.createElement("div")).classList.add(c + "-fixed-layers"), this.composer.view.element.appendChild(s), this.composer.fixedLayersContainer = s, this.composer.trigger("fixedLayersContainer")), this.composer.fixedLayersContainer.appendChild(i.fixedContainer)), e.loadTrigger.exec())
        }
    });
    i.registerAddon("layerSizing", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerCreate", this._checkLayer, this), this.layersList = [], p.on("breakpointChange", this._update, this)
        }
        _checkLayer(t, e) {
            var i = e.element.getAttribute("data-width") || "",
                s = e.element.getAttribute("data-height") || "";
            (i || s) && (s = {
                layer: e,
                height: s && s.split(","),
                width: i && i.split(",")
            }, this.layersList.push(s), this._updateLayer(e, s.width, s.height, l().name))
        }
        _updateLayer(t, e, i, s) {
            t.relativeSizing = !1, i && ((i = u(i, s)).includes("%") ? (t.frame.classList.add(c + "-relative-height"), t.frame.style.height = i, t.element.style.height = "", t.relativeSizing = !0) : (t.frame.classList.remove(c + "-relative-height"), t.frame.style.height = "", t.element.style.height = i)), e && ((i = u(e, s)).includes("%") ? (t.frame.classList.add(c + "-relative-width"), t.frame.style.width = i, t.element.style.width = "", t.relativeSizing = !0) : (t.frame.classList.remove(c + "-relative-width"), t.frame.style.width = "", t.element.style.width = i))
        }
        _update(t, s) {
            this.layersList.forEach(t => {
                var {
                    layer: t,
                    height: e,
                    width: i
                } = t;
                return this._updateLayer(t, i, e, s)
            })
        }
    });
    class Qi extends t {
        constructor(t, e) {
            super(), this.composer = t, this.eventPrefix = "layersSurface", this.element = e, this.loadTrigger = new g(this.loadStart.bind(this)), this.readyTrigger = new g(this.ready.bind(this)), this.readyTrigger.hold(), this.composer.once("init", () => this.readyTrigger.exec())
        }
        setup() {
            this.trigger("beforeSetup", [this], !0), this.layersController.layers.forEach(t => {
                t.isOnSurface = !0, t.element.hasAttribute("data-show-on-sections") && (t.showOnSections = t.element.getAttribute("data-show-on-sections").replace(/\s+/g, "").split(",")), t.element.hasAttribute("data-hide-on-sections") && (t.hideOnSections = t.element.getAttribute("data-hide-on-sections").replace(/\s+/g, "").split(","))
            }, this), this.loadTrigger.exec(), this.composer.on("resize", () => this.trigger("resize", [this], !0), this)
        }
        _changeLayersState() {
            var t;
            null != (t = this._startingSection) && t.off("readyAndActivated", this._changeLayersState, this), this._startingSection = null, this.layersController.layers.forEach(t => {
                this._checkForShow(t) ? t.show() : t.hide()
            })
        }
        loadStart() {
            this.trigger("loadingStart", [this], !0), this.readyTrigger.exec()
        }
        ready() {
            this.element.classList.add(c + "-ready"), this.element.classList.add(c + "-active"), this.isReady = !0, this.active = !0, this.isActivated = !0, this.ready = !0, this.composer.on("changeStart", this._changeLayersState, this);
            var t = this.composer.view["currentSection"];
            t.isReady ? this._changeLayersState() : (t.once("readyAndActivated", this._changeLayersState, this), this._startingSection = t, this.layersController.layers.forEach(t => {
                this._checkForShow(t) || t.hide()
            })), this.trigger("ready", [this], !0), this.trigger("readyAndActivated", [this], !0)
        }
        _checkForShow(t) {
            var e = this.composer.navigator.targetSectionIndex,
                e = this.composer.view.sections[e].id,
                i = t.hideOnSections,
                t = t.showOnSections;
            return t ? !!e && -1 !== t.indexOf(e) : !e || !i || i.length && -1 === i.indexOf(e)
        }
    }
    i.registerAddon("overlayLayersAdapter", class {
        constructor(t) {
            this.composer = t, this.composer.on("beforeSectionsSetup", this._init, this)
        }
        _init() {
            var t;
            this.wrapperWidth = this.composer.options.get("width"), this.wrapperHeight = this.composer.options.get("height"), this.layersContainer = this.composer.element.querySelector(`.${c}-overlay-layers`), this.layersContainer && (this.layersSurface = new Qi(this.composer, this.layersContainer), this.layersSurface.parentEmitter = this.composer, this.composer.view.element.appendChild(this.layersContainer), (t = new T(this.layersSurface, this.wrapperWidth, this.wrapperHeight, this.composer.options.get("keepAspectRatio"))).parentEmitter = this.composer, t.composer = this.composer, (this.layersController = t).setupLayers(this.layersContainer), this.composer.on("indexesChange", this._updateWrapperSize, this), t.hasLayers && this.layersSurface.element.appendChild(t.container), this.composer.overlayLayers = this.layersSurface, this.layersSurface.setup())
        }
        _updateWrapperSize(t, e) {
            e = this.composer.view.sections[e[0]];
            this.wrapperWidth = this.composer.options.get("width"), e.element.dataset.wrapperWidth && (this.wrapperWidth = Ji(e.element.dataset.wrapperWidth.split(","), this.wrapperWidth)), this.wrapperHeight = this.composer.options.get("height"), e.element.dataset.wrapperHeight && (this.wrapperHeight = Ji(e.element.dataset.wrapperHeight.split(","), this.wrapperHeight)), this.layersController.changeWrapperSize(this.wrapperWidth, this.wrapperHeight)
        }
    });
    class ts {
        constructor(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
            this.element = t, this.segments = [], this.transform = e.length ? e + "Transform" : "transform", this._id = 0
        }
        add(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
            return this._id += 1, this.segments.push({
                transform: t,
                depth: e,
                id: this._id
            }), this._sort(), t && t.length && this._apply(), this._id
        }
        update(t, e, i) {
            e = this._find(e); - 1 !== e && (void 0 !== i && (this.segments[e].depth = i, this._sort()), null !== t) && (this.segments[e].transform = t, this._apply())
        }
        remove(t) {
            t = this._find(t); - 1 !== t && (this.segments.splice(t, 1), this._apply())
        }
        _apply() {
            if (0 === this.segments.length) this.element.style[this.transform] = "";
            else {
                let e = "";
                this.segments.forEach(t => {
                    t.transform && (e += t.transform + " ")
                }), this.element.style[this.transform] = e
            }
        }
        _sort() {
            this.segments.sort((t, e) => t.depth - e.depth)
        }
        _find(i) {
            let s = -1;
            return this.segments.some((t, e) => (s = e, i === t.id)), s
        }
    }
    const es = ["width", "height", "padding-bottom", "padding-top", "padding-left", "padding-right"],
        is = ["font-size"];
    class ss {
        constructor(t, e, i) {
            this.layer = t, this.isEnabled = i, this.positionHandler = e, this.resizeType = t.element.getAttribute("data-resize-type") || "scale-relocate", this.resetResize = "false" !== t.element.getAttribute("data-reset-resize"), this.scaleType = t.element.getAttribute("data-scale-type") || "scale", this.upscale = "true" === t.element.getAttribute("data-upscale"), this.scale = -1 !== this.resizeType.indexOf("scale"), this.relocate = -1 !== this.resizeType.indexOf("relocate"), this._firstLocate = !0, this.scale && ("scale" === this.scaleType ? this.scaleTransform = t.frameTransform.add(null, 100) : this.layerInlineStyle = this.layer.element.getAttribute("style"), this.updateBaseStyle())
        }
        updateBaseStyle() {
            var e = this.scaleType.toLowerCase();
            if ("scale" !== e) {
                let t;
                switch (e) {
                    case "box":
                    default:
                        t = es;
                        break;
                    case "typography-box":
                        t = [].concat(es, is);
                        break;
                    case "typography":
                        t = is
                }
                this.baseStyle = {}, this.layer.element.setAttribute("style", this.layerInlineStyle), t.forEach(t => {
                    var e = getComputedStyle(this.layer.element)[t];
                    this.baseStyle[t] = e
                })
            }
        }
        update() {
            var e = l().name,
                i = u(this.layer.controller.wrapperWidth, e);
            let s = this.layer.composer.element.clientWidth / i;
            if (this.isEnabled && u(this.isEnabled, e) || (s = 1), this.scale)
                if (this.upscale || (s = Math.min(1, s)), "scale" === this.scaleType) {
                    if (this.layer.relativeSizing) return;
                    this.layer.frameTransform.update(`scale(${s})`, this.scaleTransform)
                } else {
                    const a = this["positionHandler"];
                    Object.keys(this.baseStyle).forEach(t => {
                        "width" === t && a.floatWidth || "height" === t && a.floatHeight || (this.layer.element.style[t] = parseFloat(this.baseStyle[t]) * s + "px")
                    })
                }
            if (this.relocate) {
                i = this.positionHandler["activeOffset"], e = i.origin || "tl";
                let t = s;
                var n = this.layer["frame"];
                if (this.upscale || (t = Math.min(1, t)), -1 === i.x.indexOf("%")) {
                    var o = parseInt(i.x, 10) * t;
                    switch (e.charAt(1)) {
                        case "l":
                        default:
                            n.style.left = o + "px";
                            break;
                        case "r":
                            n.style.right = o + "px";
                            break;
                        case "c":
                            n.style.left = 0 == o ? "50%" : "calc( 50% + " + o + "px )"
                    }
                }
                if (-1 === i.y.indexOf("%")) {
                    var r = parseInt(i.y, 10) * t;
                    switch (e.charAt(0)) {
                        case "t":
                        default:
                            n.style.top = r + "px";
                            break;
                        case "b":
                            n.style.bottom = r + "px";
                            break;
                        case "m":
                            n.style.top = 0 == r ? "50%" : "calc( 50% + " + r + "px )"
                    }
                }
            }
        }
    }
    const ns = {
        t: "top",
        m: "center",
        b: "bottom",
        l: "left",
        r: "right",
        c: "center"
    };
    class os {
        constructor(t) {
            (this.layer = t).frame.classList.add(c + "-pos-absolute"), this.layer.frame.style.zIndex = this.layer.index + 10;
            const e = w({
                none: {
                    x: "0px",
                    y: "0px",
                    origin: "tl"
                }
            }, m(t.element, "offset"));
            Object.keys(e).forEach(t => {
                "string" == typeof e[t] && (e[t] = this._getOffsetObject(e[t]))
            }), this.layer.offsets = e, this.layer.element.getAttribute("data-responsive-scale") && !this.layer.nested && (t = this.layer.element.getAttribute("data-responsive-scale").split(",").map(t => t.length ? "true" === t : ""), this.resizeHandler = new ss(this.layer, this, t), this.layer.holder.on("resize", this.resizeHandler.update, this.resizeHandler)), p.on("breakpointChange", this.locate, this)
        }
        locate() {
            var t = this.layer["frame"],
                e = u(this.layer.offsets),
                i = (void 0 !== (this.activeOffset = e).width && (-1 === e.width.indexOf("%") ? (this.layer.element.style.width = e.width, t.classList.remove(c + "-float-width"), this.floatWidth = !1) : (t.style.width = e.width, t.classList.add(c + "-float-width"), this.floatWidth = !0)), void 0 !== e.height && (-1 === e.height.indexOf("%") ? (this.layer.element.style.height = e.height, t.classList.remove(c + "-float-height"), this.floatHeight = !1) : (t.style.height = e.height, t.classList.add(c + "-float-height"), this.floatHeight = !0)), t.style[Yi.js + "Transform"] = "", this.layer.frameTransform.update("", this._transformSegment), t.style.top = "", t.style.left = "", t.style.bottom = "", t.style.right = "", e.origin || "tl"),
                s = i.charAt(0),
                i = i.charAt(1);
            let n = "";
            t.style[Yi.js + "TransformOrigin"] = ns[s] + " " + ns[i];
            var {
                width: o,
                height: r
            } = t.getBoundingClientRect();
            switch (s) {
                case "t":
                default:
                    t.style.top = e.y;
                    break;
                case "b":
                    t.style.bottom = e.y;
                    break;
                case "m":
                    "0" === e.y && (e.y = "0px"), n = `translateY(${r%2==0?"-50%":"calc(-50% + 0.5px)"})`, t.style.top = `calc(50% + ${e.y})`
            }
            switch (i) {
                case "l":
                default:
                    t.style.left = e.x;
                    break;
                case "r":
                    t.style.right = e.x;
                    break;
                case "c":
                    "0" === e.x && (e.x = "0px"), t.style.left = `calc(50% + ${e.x})`, n += ` translateX(${o%2==0?"-50%":"calc(-50% + 0.5px)"})`
            }
            this.layer.frameTransform.update(n, this.layer.transformSegment), this.resizeHandler && (this.resizeHandler.updateBaseStyle(), this.resizeHandler.update())
        }
        _getOffsetObject(t) {
            const e = {};
            return t.replace(/\s/g, "").split(";").forEach(t => {
                t = t.split(":"), e[t[0]] = t[1]
            }), e
        }
    }

    function rs(t) {
        if (!t || 0 === t.length) return {};
        var e = {},
            i = t.toLowerCase().replace(/-(.)/g, (t, e) => e.toUpperCase()).replace(/;\s?$/g, "").split(/:|;/g);
        for (let t = 0; t < i.length; t += 2) e[i[t].replace(/\s/g, "")] = i[t + 1].replace(/^\s+|\s+$/g, "");
        return e
    }
    class as {
        constructor(t, e) {
            this.element = t, e = e || m(t, "style");
            t = Object.keys(e).length;
            0 === t || 1 === t && h.call(e, "none") || (Object.keys(e).forEach(t => {
                "none" !== t && (e[t] = rs(e[t]))
            }), e.none = {}, this.styles = e, p.on("breakpointChange", this.update, this), this.lastActivePoint = "none", this.updateBaseStyle(), this.update())
        }
        updateBaseStyle() {
            this.baseStyle = rs(this.element.getAttribute("style"))
        }
        update() {
            const e = {};
            "none" !== this.lastActivePoint && Object.keys(this.lastStyle).forEach(t => {
                this.baseStyle[t] ? e[t] = this.baseStyle[t] : e[t] = ""
            }), this.lastActivePoint = p.activeBreakpoint;
            let i = u(this.styles, this.lastActivePoint);
            this.lastStyle = i, i = w(w({}, e), i), requestAnimationFrame(() => {
                Object.keys(i).forEach(t => {
                    this.element.style[t] = i[t]
                })
            })
        }
    }
    class hs {
        constructor(t, e) {
            this.element = t, e = e || m(this.element, "class");
            t = Object.keys(e).length;
            0 === t || 1 === t && h.call(e, "none") || (Object.keys(e).forEach(t => {
                "none" !== t && (e[t] = e[t].replace(/(\s\s)+/g, " ").split(" "))
            }), this.classNames = e, this.classNames.none = [], p.on("breakpointChange", this.update, this), this.lastActivePoint = "none", this.update())
        }
        update() {
            "none" !== this.lastActivePoint && this.lastClasses.forEach(t => this.element.classList.remove(t)), this.lastActivePoint = p.activeBreakpoint;
            var t = u(this.classNames, this.lastActivePoint);
            (this.lastClasses = t).forEach(t => this.element.classList.add(t))
        }
    }
    class P extends t {
        constructor(t, e, i, s, n, o, r) {
            super(), this.type = e, this.element = t, this.controller = i, this.holder = s, this.index = n, this.isLinked = o, this.parent = r, this.composer = this.controller.composer, this.id = t.id, this.composer.layersById || (this.composer.layersById = {}), this.id && (this.composer.layersById[this.id] = this), this.parentEmitter = i, this.eventPrefix = "layer", o && (this.linkElement = t.parentElement), this.parent && (this.nested = !0), this.frame = document.createElement("div"), this.frame.classList.add(c + "-layer-frame"), this.element.hasAttribute("data-frame-class") && this.frame.classList.add(this.element.getAttribute("data-frame-class")), this.element.hasAttribute("data-frame-id") && (this.frame.id = this.element.getAttribute("data-frame-id")), this.element.hasAttribute("data-frame-style") && this.frame.setAttribute("style", this.element.getAttribute("data-frame-style")), this.elementBreakpointStyle = new as(this.element), this.elementBreakpointClass = new hs(this.element), this.frameBreakpointStyle = new as(this.frame, m(this.element, "frame-style")), this.frameBreakpointClass = new hs(this.frame, m(this.element, "frame-class")), this.isLinked ? this.frame.appendChild(this.linkElement) : this.frame.appendChild(this.element), this.readyTrigger = new g(this._ready.bind(this)), this.offsets = {}, this.trigger("create", [this], !0)
        }
        init(t) {
            t || this.trigger("beforeInit", [this], !0), this.element.hasAttribute("data-id") && (this.id = this.element.getAttribute("data-id"), this.frame.classList.add(c + "-id-" + this.id)), this.frameTransform = new ts(this.frame, Yi.js), this.transformSegment = this.frameTransform.add(), this.disablePositionHandler || this.element.hasAttribute("data-position-handler") && "absolute" !== this.element.getAttribute("data-position-handler") || (this.positionHandler = new os(this));
            var e = this.element.getAttribute("data-hide-on");
            this.bpVisible = !0, e && function(i, s, n) {
                let o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "depicter-hidden";
                var t = (t, e) => {
                    s.includes(e = null === e ? "desktop" : e) ? (n && n(!0), i.classList.add(o)) : (n && n(!1), i.classList.remove(o))
                };
                t(0, l().name), p.on("breakpointChange", t)
            }(this.frame, e.split(","), t => {
                this.bpVisible = !t, this.trigger("visibilityChange", [this, t], !0)
            }, c + "-layer-hidden"), this._setupContent(), t || (this.trigger("afterInit", [this], !0), this.readyTrigger.exec())
        }
        show() {
            this.isHidden = !1, this.element.style.visibility = "", this.frame.classList.remove(c + "-is-hidden")
        }
        hide() {
            this.isHidden = !0, this.element.style.visibility = "hidden", this.frame.classList.add(c + "-is-hidden")
        }
        _setupContent() {}
        _ready() {
            this.ready = !0, this.positionHandler && this.positionHandler.locate(), this.trigger("ready", [this], !0)
        }
    }
    T.registerLayer("custom", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "custom", this.frame.classList.add(c + `-${this.type}-layer`)
        }
    });
    T.registerLayer("text", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "text", this.frame.classList.add(c + `-${this.type}-layer`)
        }
    });
    T.registerLayer("button", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "button", this.frame.classList.add(c + `-${this.type}-layer`)
        }
    });
    T.registerLayer("shape", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "shape", this.frame.classList.add(c + `-${this.type}-layer`)
        }
        _setupContent() {
            var t;
            null != (t = this.element.querySelector("svg")) && t.setAttribute("preserveAspectRatio", "none")
        }
    });
    T.registerLayer("image", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "image", this.frame.classList.add(c + `-${this.type}-layer`), this.picture = this.element, this.image = this.picture.querySelector("img"), this.isImageLoaded = !1, this.cropData = w({}, m(this.element, "crop"))
        }
        _setupContent() {
            this.picture && (this.mediaPosition = null, this.mediaSize = null, this.previousCropValue = null, this.cropData = this._getCropObject(this.cropData), this.holder.readyTrigger.hold(), this.holder.on("loadingStart", this._loadImages, this), this.holder.on("resize, readyAndActivated", this.locateImage, this), p.on("breakpointChange", () => {
                this.locateImage()
            }))
        }
        locateImage() {
            var t, e;
            this.isImageLoaded && ((e = u(this.cropData)) ? ({
                focalPoint: e,
                mediaSize: t
            } = e, {
                position: t,
                mediaSize: e
            } = Ri(t.width, t.height, e.x, e.y, this.element.offsetWidth, this.element.offsetHeight), this.mediaSize = e, this.mediaPosition = t, this.image.style.width = `${null==(e=this.mediaSize)?void 0:e.width}px`, this.image.style.height = `${null==(t=this.mediaSize)?void 0:t.height}px`, this.image.style.left = `-${Math.round(null==(e=this.mediaPosition)?void 0:e.x)}px`, this.image.style.top = `-${Math.round(null==(t=this.mediaPosition)?void 0:t.y)}px`, this.picture.classList.add(c + "-cropped")) : (this.mediaSize = null, this.mediaPosition = null, this.image.removeAttribute("style"), this.picture.classList.remove(c + "-cropped")))
        }
        _loadImages() {
            Ni(this.picture, this._loaded.bind(this), this._error.bind(this), this._srcChanged.bind(this))
        }
        _loaded() {
            this.image.classList.add(c + "-loaded"), this.isImageLoaded = !0, this.locateImage(), this.holder.readyTrigger.isExecuted() || this.holder.readyTrigger.exec()
        }
        _error() {
            this.holder.readyTrigger.exec()
        }
        _srcChanged() {
            this.image.classList.remove(c + "-loaded"), this.isImageLoaded = !1
        }
        _getCropObject(t) {
            const i = t;
            return Object.entries(t).forEach(t => {
                var [t, e] = t;
                if ("false" === e.trim()) i[t] = !1;
                else {
                    e = e.replace(/'/g, '"');
                    try {
                        i[t] = JSON.parse(e)
                    } catch (t) {
                        console.warn("Given crop data value is not a valid JSON, crop skipped. \n " + e)
                    }
                }
            }), i
        }
    });
    const M = {},
        ls = {},
        cs = [],
        ds = Object.prototype.hasOwnProperty;
    class D {
        static registerPlayer(t, e) {
            ds.call(M, t) || (M[t] = e)
        }
        static get players() {
            return M
        }
        constructor(t) {
            this.type = "custom", "string" == typeof t ? (this.videoSourceType = "embed", this.type = this._getTypeBySrc(t), ds.call(M, this.type) && (this.player = new M[this.type](this)), this.element = this._generateIframe(t), this.source = this.element) : "IFRAME" === t.tagName ? (this.videoSourceType = "embed", this.type = this._getTypeBySrc(t.getAttribute("src")), this.element = t, this.source = t, ds.call(M, this.type) && (this.player = new M[this.type](this))) : "VIDEO" === t.tagName && (this.videoSourceType = "self-hosted", this.element = t, t = (this.source = t).getAttribute("data-player-type") || "native", ds.call(M, t)) && (this.type = t, this.player = new M[this.type](this))
        }
        setup(t, e) {
            "custom" !== this.type && (this._readyCallback = t, this._errorCallback = e, this.player.init())
        }
        playerIsReady() {
            this.ready = !0, this._readyCallback && this._readyCallback()
        }
        loadScript(t, e) {
            var i;
            ls[this.type + "_isLoaded"] ? e() : (ls[this.type] ? ls[this.type].push(e) : ls[this.type] = [e], -1 === cs.indexOf(t) && (cs.push(t), e = document.getElementsByTagName("head")[0], (i = document.createElement("script")).type = "text/javascript", i.onload = () => {
                ls[this.type].forEach(t => t()), ls[this.type + "_isLoaded"] = !0
            }, i.onreadystatechange = i.onload, this._errorCallback && (i.onerror = this._errorCallback), i.src = t, e.appendChild(i)))
        }
        _getTypeBySrc(i) {
            let s = "custom";
            return Object.keys(M).some(t => {
                var e = M[t];
                return !(!e.iframeEmbed || !e.validate(i) || (s = t, 0))
            }), s
        }
        _generateIframe(t) {
            this.player && this.player.beforeIframe && (t = this.player.beforeIframe(t));
            var e = document.createElement("iframe");
            return e.setAttribute("src", t), e.setAttribute("allowtransparency", "true"), e.setAttribute("frameborder", "0"), e.setAttribute("scrolling", "no"), e.setAttribute("allowfullscreen", ""), this.player && this.player.afterIframe && (t = this.player.afterIframe(t)), e
        }
    }
    D.registerPlayer("mejs", class {
        constructor(t) {
            this.ve = t
        }
        init() {
            if (!window.MediaElementPlayer) throw new Error("MediaElementJS not found.");
            this.api = new window.MediaElementPlayer(this.ve.element, {
                success: () => {
                    setTimeout(this._apiReady.bind(this), 0)
                }
            }), this.ve.element = this.api.container
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                mute: () => {
                    this.api.setMuted(!0)
                },
                unmute: () => {
                    this.api.setMuted(!1)
                },
                stop: () => {
                    this.api.setCurrentTime(0), this.api.pause()
                },
                on: this.on.bind(this),
                off: this.off.bind(this)
            })
        }
        on(t, e) {
            this.ve.source.addEventListener(t = "play" === t ? "playing" : t, e, !1)
        }
        off(t, e) {
            this.ve.source.removeEventListener(t, e, !1)
        }
        _apiReady() {
            this.setupInterface(), this.ve.playerIsReady(this.api)
        }
    });
    D.registerPlayer("native", class {
        constructor(t) {
            this.ve = t
        }
        init() {
            this.api = this.ve.element, this.setupInterface(), this.ve.playerIsReady(this.api)
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                mute: () => {
                    this.api.muted = !0
                },
                unmute: () => {
                    this.api.muted = !1
                },
                stop: () => {
                    this.api.currentTime = 0, this.api.pause()
                },
                on: this.on.bind(this),
                off: this.off.bind(this)
            })
        }
        on(t, e) {
            this.ve.element.addEventListener(t, e, !1)
        }
        off(t, e) {
            this.ve.element.removeEventListener(t, e, !1)
        }
    });
    const ps = /http(?:s?):\/\/(?:www\.)?\w*.?vimeo.com/,
        us = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/;
    D.registerPlayer("vimeo", class {
        static validate(t) {
            return ps.test(t)
        }
        static get iframeEmbed() {
            return !0
        }
        constructor(t) {
            this.ve = t
        }
        beforeIframe(t) {
            return -1 === t.indexOf("/video/") ? "https://player.vimeo.com/video/" + t.match(us)[1] : t
        }
        init() {
            window.Vimeo ? (this.api = new window.Vimeo.Player(this.ve.element), this.setupInterface(), this.ve.playerIsReady(this.api)) : this.ve.loadScript("https://player.vimeo.com/api/player.js", () => {
                this.init()
            })
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                mute: () => {
                    this._currentVol = this.api.getVolume(), this.api.setVolume(0)
                },
                unmute: () => {
                    this.api.setVolume(this._currentVol)
                },
                stop: () => {
                    this.api.setCurrentTime(0), this.api.pause()
                },
                on: this.api.on.bind(this.api),
                off: this.api.off.bind(this.api)
            })
        }
    });
    const ms = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com|\.be\/)/,
        gs = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    D.registerPlayer("youtube", class {
        static validate(t) {
            return ms.test(t)
        }
        static get iframeEmbed() {
            return !0
        }
        constructor(t) {
            this.ve = t, this._apiReady = this._apiReady.bind(this), this._onAPIReloaded = this._onAPIReloaded.bind(this), this._onStateChange = this._onStateChange.bind(this), this._listeners = {}, this.ve.element.src = this.checkSrc(this.ve.element.src)
        }
        checkSrc(t) {
            return -1 === (t = -1 === t.indexOf("/embed/") ? "https://www.youtube.com/embed/" + t.match(gs)[1] : t).indexOf("enablejsapi") && (t += `${-1===t.indexOf("?")?"?":"&"}enablejsapi=1`), t
        }
        beforeIframe(t) {
            return this.checkSrc(t)
        }
        init(t) {
            if (window.YT && window.YT.Player) this.api = new window.YT.Player(this.ve.element), this.api.addEventListener("onReady", this._apiReady, !1);
            else if (t) {
                let t;
                window.onYouTubeIframeAPIReady && (t = window.onYouTubeIframeAPIReady), window.onYouTubeIframeAPIReady = () => {
                    t && t(), this.init()
                }
            } else this.ve.loadScript("https://www.youtube.com/iframe_api", () => {
                this.init(!0)
            })
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.playVideo.bind(this.api),
                pause: this.api.pauseVideo.bind(this.api),
                mute: this.api.mute.bind(this.api),
                unmute: this.api.unMute.bind(this.api),
                stop: () => {
                    this.api.seekTo(0), this.api.pauseVideo()
                },
                on: this.on.bind(this),
                off: this.off.bind(this)
            })
        }
        on(t, e) {
            this._eventAdded || (this._eventAdded = !0, this.api.addEventListener("onStateChange", this._onStateChange, !1)), this._listeners[t] ? this._listeners[t].push(e) : this._listeners[t] = [e]
        }
        off(t, e) {
            this._listeners[t] && -1 !== (e = this._listeners[t].indexOf(e)) && this._listeners[t].splice(e, 1)
        }
        _apiReady() {
            this.setupInterface(), this.ve.playerIsReady(this.api), this.api.removeEventListener("onReady", this._apiReady, !1), this.api.addEventListener("onReady", this._onAPIReloaded, !1)
        }
        _onAPIReloaded() {
            "play" === this._state && this.ve.play()
        }
        _onStateChange(t) {
            let e;
            switch (t.data) {
                case 0:
                    e = "ended";
                    break;
                case 1:
                    e = "play";
                    break;
                case 2:
                    e = "pause";
                    break;
                default:
                    return
            }
            this._state = e, this._listeners[e] && this._listeners[e].forEach(t => {
                t()
            })
        }
    });
    D.registerPlayer("plyr", class {
        constructor(t) {
            this.ve = t
        }
        init() {
            if (!window.plyr) throw new Error("Plyr not found.");
            [this.api] = window.plyr.setup(this.ve.element), this.setupInterface(), this.ve.playerIsReady(this.api), this.ve.element = this.api.getContainer()
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                stop: this.api.stop.bind(this.api),
                on: this.api.on.bind(this.api),
                mute: () => {
                    this.api.isMuted() || this.api.toggleMute()
                },
                unmute: () => {
                    this.api.isMuted() && this.api.toggleMute()
                }
            })
        }
    });
    class vs extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "video", this.frame.classList.add(c + `-${this.type}-layer`), this.playVideo = this.playVideo.bind(this), this._videoState = "initial", this.holder.hasVideoLayer = !0
        }
        playVideo(t) {
            this.holder.active && "leaving" !== this.holder.status && "playing" !== this._videoState && this.videoElement.ready && this.bpVisible && (t && this.trigger("playByBtn", [this], !0), this.videoElement.play(), this.element.classList.add(c + "-playing"))
        }
        stopVideo() {
            "stopped" !== this._videoState && this.videoElement.ready && (this.autoPause ? this.videoElement.pause() : this.videoElement.stop(), this.element.classList.remove(c + "-playing"))
        }
        _setupContent() {
            var t;
            this.coverImage = this.element.querySelector("img"), this.videoSource = this.element.querySelector("iframe, video"), this.autoplay = "true" === this.element.getAttribute("data-autoplay"), this.autoPause = "true" === this.element.getAttribute("data-auto-pause"), this.videoSource && (this.looped = "false" !== this.videoSource.getAttribute("data-loop"), "IFRAME" === this.videoSource.tagName ? this.videoSource.src = this.videoSource.src.replace("autoplay=1", "") : "VIDEO" !== this.videoSource.tagName || this.videoSource.hasAttribute("data-player-type") || (t = this.videoSource.getAttribute("data-object-fit") || "cover", this.videoSource.style.objectFit = t, this.videoSource.setAttribute("data-object-fit", t), this.videoSource.hasAttribute("data-object-position") && (t = this.videoSource.getAttribute("data-object-position"), this.videoSource.style.objectPosition = t), this.videoSource.setAttribute("playsinline", ""), this.videoSource.setAttribute("webkit-playsinline", "")), this.videoElement = new D(this.videoSource), this.videoElement.setup(this._videoControllerReady.bind(this)), this.videoElement.element.classList.add(c + "-video-player"), "mejs" === this.videoElement.type && (this.videoElement.player.api.options.stretching = "responsive"), this.coverImage && (this.playBtn = document.createElement("div"), this.playBtn.classList.add(c + "-video-btn"), this.playBtn.addEventListener("click", this.playVideo, !1), this.element.appendChild(this.playBtn), this.holder.readyTrigger.hold()), this.autoplay && this.holder.on("activated", this.playVideo, this), this.holder.on("deactivated", this.stopVideo, this), this.holder.on("loadingStart", this._startLoading, this), this.on("visibilityChange", (t, e, i) => {
                i || !this.autoplay && !this.wasPlaying ? i && (this.wasPlaying = "playing" === this._videoState, this.stopVideo()) : this.playVideo()
            }), this.holder.composer.on("attach", () => {
                this.wasPlaying && this.playVideo()
            }))
        }
        _videoControllerReady() {
            this._onVideoPlay = this._onVideoPlay.bind(this), this._onVideoPause = this._onVideoPause.bind(this), this._onVideoEnded = this._onVideoEnded.bind(this), this.videoElement.on("play", this._onVideoPlay), this.videoElement.on("pause", this._onVideoPause), this.videoElement.on("ended", this._onVideoEnded), this.autoplay && this.playVideo()
        }
        _startLoading() {
            this.coverImage && Wi(this.coverImage, this._loaded.bind(this), this._error.bind(this))
        }
        _loaded() {
            this.coverImage.classList.add(c + "-loaded"), this.holder.readyTrigger.exec()
        }
        _error() {
            this.holder.readyTrigger.exec()
        }
        _onVideoPlay() {
            this._videoState = "playing", this.trigger("videoPlay", [this], !0)
        }
        _onVideoPause() {
            this._videoState = "stopped", this.trigger("videoPause", [this], !0)
        }
        _onVideoEnded() {
            this._videoState = "ended", this.looped && this.playVideo(), this.trigger("videoEnded", [this], !0)
        }
    }
    T.registerLayer("video", vs), T.registerLayer("embedVideo", vs);
    T.registerLayer("group", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "group", this.nestable = !0, this.frame.classList.add(c + `-${this.type}-layer`)
        }
    });
    T.registerLayer("flex", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "flex", this.nestable = !0, this.frame.classList.add(c + `-${this.type}-layer`), this.disablePositionHandler = !0
        }
    });
    T.registerLayer("arrow", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "arrow", this.frame.classList.add(c + `-${this.type}-layer`)
        }
        _setupContent() {
            this.arrowIcon = this.element.querySelector("svg"), this.arrowIcon.classList.add(c + "-arrow-icon")
        }
    });
    T.registerLayer("bullet", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "bullet", this.frame.classList.add(c + `-${this.type}-layer`), this.activeBulletItemClass = c + "-bullet-active"
        }
        _setupContent() {
            this.bulletsCount = this.composer.navigator.count, this.generateBullets = this.generateBullets.bind(this), this.bulletItems = [], this.composer.on("countChange", (t, e) => {
                e !== this.bulletsCount && (this.bulletItems = [], this.element.replaceChildren(this.generateBullets(e)), this.handleIndexChange(this.composer.navigator.targetIndex), this.bulletsCount = e)
            }), this.composer.on("targetIndexChange", (t, e) => {
                this.handleIndexChange(e)
            })
        }
        generateBullets(t) {
            return this.bulletsWrapper = document.createElement("div"), this.bulletsWrapper.classList.add(c + "-bullets-wrapper"), [...Array(t).keys()].forEach(t => {
                var e = document.createElement("span");
                e.classList.add(c + "-bullet-item"), this.bulletItems.push(e), e.addEventListener("click", () => this.handleNavigate(t)), Oi(e, this.bulletsWrapper)
            }), Oi(this.bulletsWrapper, this.element), this.bulletsWrapper
        }
        handleNavigate(t) {
            this.composer.actions.gotoSection({
                type: "number",
                to: t
            })
        }
        handleIndexChange(i) {
            this.bulletItems.forEach((t, e) => {
                i !== e && t.classList.contains(this.activeBulletItemClass) ? t.classList.remove(this.activeBulletItemClass) : i === e && t.classList.add(this.activeBulletItemClass)
            })
        }
    });
    T.registerLayer("lineTimer", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "lineTimer", this.frame.classList.add(c + `-${this.type}-layer`)
        }
        _setupContent() {
            this.timerBar = document.createElement("div"), this.timerBar.classList.add(c + "-timer-bar"), Oi(this.timerBar, this.element), this.composer.navigator.on("changeStart", () => setTimeout(this.handleTimerBarWidth.bind(this), 100, .001)), this.composer.on("slideshowTimerUpdate", (t, e) => this.handleTimerBarWidth(e))
        }
        handleTimerBarWidth(t) {
            0 !== t && (this.timerBar.style.width = t + "%")
        }
    });
    T.registerLayer("scroll", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "scroll", this.frame.classList.add(c + `-${this.type}-layer`)
        }
        _setupContent() {
            this.arrowIcon = this.element.querySelector("svg"), this.arrowIcon.classList.add(c + "-scroll-icon")
        }
    });
    T.registerLayer("playAndPause", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "playAndPause", this.frame.classList.add(c + `-${this.type}-layer`), this.activeClassName = c + "-active", this._isPause = !1
        }
        _setupContent() {
            this.playIcon = this.element.querySelector(`.${c}-play-icon`), this.pauseIcon = this.element.querySelector(`.${c}-pause-icon`), this.composer.on("slideshowInit", (t, e) => {
                this._isPause = e || !1
            }), this.composer.on("slideshowStatusChange", (t, e) => {
                this._isPause = e, this.toggleClassName(this._isPause)
            }), this.toggleClassName(this._isPause), this.element.addEventListener("click", this.toggleState.bind(this))
        }
        toggleClassName(t) {
            (t ? (this.pauseIcon.classList.remove(this.activeClassName), this.playIcon) : (this.playIcon.classList.remove(this.activeClassName), this.pauseIcon)).classList.add(this.activeClassName)
        }
        toggleState() {
            var {
                pause: t,
                resume: e
            } = this.composer.slideshow;
            this._isPause ? (e(), this.toggleClassName(!1)) : (t(), this.toggleClassName(!0))
        }
    });

    function fs(l) {
        const e = t => {
            var e;
            e = l, "readyAndActivated" === (t = t) ? e.waitForAction || e.animateInOut("in", !0) : "readyAndDeactivated" === t && e.autoAnimateOut && e.animateInOut("out")
        };
        let i;
        Y([l.interactiveAnimationIn, l.interactiveAnimationOut], t => {
            const [a, h] = t.map(t => "true" === t);
            i && l.holder.off("pendingOffsetChange", i), a || h ? (i = (t, e, i, s) => {
                var n, o, r;
                n = l, s = s, o = a, r = h, 0 <= s && o ? n.progressInOut(Math.max(0, 1 - s), "in") : s < 0 && r && n.progressInOut(Math.min(1, -s), "out")
            }, l.disableAutoAnimateOut = !0, l.holder.on("pendingOffsetChange", i), l.holder.active && l.holder.triggerPendingOffsetChange()) : l.disableAutoAnimateOut = !1, a ? l.holder.off("readyAndActivated", e) : (l.holder.active && l.holder.isReady && e("readyAndActivated"), l.holder.on("readyAndActivated", e)), h ? l.holder.off("readyAndDeactivated", e) : l.holder.on("readyAndDeactivated", e)
        })
    }
    i.registerAddon("layerAnimationAdapter", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                hideLayers: !0,
                addDefaultAnimation: !0
            }), this._stepAnimationLayers = [], this.composer.options.get("disableAnimations") || t.on("layerBeforeInit", this._checkLayer, this)
        }
        _checkLayer(t, e) {
            var i, s, n, o;
            Vi.isAnimative(e.element) && (e.animationWrap = (s = e.element, (n = c + "-animation-wrap") && s.parentElement.classList.contains("." + n) ? s.parentElement : ((o = document.createElement("div")).classList.add("" + n), s.parentElement.insertBefore(o, s), o.appendChild(s), o)), i = e, n = this.composer, s = this.composer.options.get("addDefaultAnimation"), i.inOutAnimation = new Vi(i, i.element, i.animationWrap, s), i.interactiveAnimationIn = i.element.getAttribute("data-animation-in-interactive"), i.interactiveAnimationOut = i.element.getAttribute("data-animation-out-interactive"), i.waitForAction = "true" === i.element.getAttribute("data-wait-for-action"), i.waitOnAnimationOut = "false" !== i.element.getAttribute("data-animation-out-wait"), i.autoAnimateOut = "true" === i.element.getAttribute("data-animation-out-on-change") || n.options.get("hideLayers"), s = i.holder instanceof Qi, void 0 === i.holder.layersAnimations && (i.holder.layersAnimations = []), i.holder.layersAnimations[i.index] = i.inOutAnimation.animationsData, i.waitForAction || s || i.holder.disableAnimationAdapterControl ? i.hide(!1) : fs(i), i.on("animationInEnd", () => setTimeout(() => {
                i.waitOnAnimationOut || i.disableAutoAnimateOut || i.waitForAction || i.animateInOut("out")
            })), this.composer.trigger("layerGetInOutAnimation", [e]))
        }
    });
    T.registerLayer("rating", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "rating", this.frame.classList.add(c + `-${this.type}-layer`)
        }
        _setupContent() {
            this.symbolID = this.element.getAttribute("data-symbol"), this.rateValue = parseFloat(this.element.getAttribute("data-rate-value")), this.wrapper = document.createElement("div"), this.element.appendChild(this.wrapper), this._calcSymbolValue(this.rateValue).forEach(t => {
                this.wrapper.appendChild(this._generateSymbolContainers(t))
            })
        }
        _calcSymbolValue(i) {
            return [0, 0, 0, 0, 0].map((t, e) => {
                e = Math.max(Math.min(i - e, 1), 0);
                return [0, 1].includes(e) ? e : i % 1
            })
        }
        _generateSvg(t) {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                i = document.createElementNS("http://www.w3.org/2000/svg", "use");
            return e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), i.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + t), e.appendChild(i), e
        }
        _generateSymbolContainers(t) {
            var e = this._generateSvg(this.symbolID),
                i = this._generateSvg(this.symbolID),
                s = document.createElement("div"),
                e = (s.appendChild(e), document.createElement("div")),
                i = (e.appendChild(i), e.style.clipPath = `inset(0 ${100-100*t}% 0 0)`, document.createElement("div"));
            return i.classList.add(c + "-rating-container"), i.appendChild(s).classList.add(c + "-symbol-container"), i.appendChild(e).classList.add(c + "-track-container"), this.element.appendChild(i)
        }
    });

    function ys(t) {
        var {
            locale: e = "en-US",
            useRelative: i = !1,
            formatOptions: s
        } = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        return t ? (t = new Date(t), i ? (i = function(t) {
            return ("" + t).padStart(1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 2, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "0")
        }, function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "en",
                i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                s = Date.now() / 1e3,
                [t, n] = t.trim().split(" "),
                t = [...t.split("-").map((t, e) => parseInt(t, 10) + (1 === e ? -1 : 0)), ...n.split(":").map(t => parseInt(t, 10))],
                n = Date.UTC(...t) / 1e3,
                o = new Intl.RelativeTimeFormat(e, w({
                    numeric: "auto"
                }, i)),
                r = Math.round(n - s);
            switch (!0) {
                case Math.abs(r) < 60:
                    return o.format(Math.round(r), "seconds");
                case 60 < Math.abs(r) && Math.abs(r) < 3600:
                    return o.format(Math.round(r / 60), "minute");
                case 3600 < Math.abs(r) && Math.abs(r) < 86400:
                    return o.format(Math.round(r / 3600), "hour");
                case 86400 < Math.abs(r) && Math.abs(r) < 2592e3:
                    return o.format(Math.round(r / 86400), "day");
                default:
                    return o.format(Math.round(r / 2592e3), "month")
            }
        }(`${t.getFullYear()}-${i(t.getDate())}-${i(t.getMonth()+1)} ${i(t.getHours())}:${i(t.getMinutes())}:` + i(t.getSeconds()))) : new Intl.DateTimeFormat(e, s).format(t)) : null
    }
    T.registerLayer("date", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "date", this.frame.classList.add(c + `-${this.type}-layer`)
        }
        _setupContent() {
            this.useRelative = "true" === this.element.getAttribute("data-use-relative"), this.displayTime = "true" === this.element.getAttribute("data-display-time"), this.formatStyle = this.element.getAttribute("data-format-style") || "auto";
            var t = ys(this.element.dateTime, {
                useRelative: this.useRelative,
                formatOptions: function(t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                    let i = {};
                    return i = "auto" === t ? w({
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }, e ? {
                        hour12: !1,
                        minute: "numeric",
                        hour: "numeric"
                    } : {}) : w({
                        dateStyle: t
                    }, e ? {
                        timeStyle: t
                    } : {})
                }(this.formatStyle, this.displayTime)
            });
            this.element.innerHTML = t
        }
    });
    T.registerLayer("tagList", class extends P {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "tagList", this.element.classList.add(c + `-${this.type}-layer`)
        }
    });
    _ = "ontouchstart" in document, k = window.PointerEvent, je = window.MSPointerEvent;
    const _s = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        bs = k ? "pointerdown" : je ? "MSPointerDown" : _ ? "touchstart" : "mousedown",
        ws = k ? "pointerup" : je ? "MSPointerUp" : _ ? "touchend" : "mouseup",
        xs = k ? "pointermove" : je ? "MSPointerMove" : _ ? "touchmove" : "mousemove",
        Ss = k ? "pointercancel" : je ? "MSPointerCancel" : _ ? "touchcancel" : "";
    class As {
        constructor(t) {
            this.element = t, this._direction = "horizontal", this.noSwipeSelector = "", this.preventDefault = "auto", this._lastStatus = {}, this._touchStart = this._touchStart.bind(this), this._touchEnd = this._touchEnd.bind(this), this._touchMove = this._touchMove.bind(this), this._touchCancel = this._touchCancel.bind(this), this._reset = this._reset.bind(this), this.enable()
        }
        get direction() {
            return this._direction
        }
        set direction(t) {
            let e = "both" !== (this._direction = t) ? "horizontal" === t ? "pan-y" : "pan-x" : "pan-x pan-y";
            this.element.style.msTouchAction = e, this.element.style.touchAction = e
        }
        _getDirection(t, e) {
            switch (this._direction) {
                case "horizontal":
                    return t <= this.startX ? "left" : "right";
                case "vertical":
                    return e <= this.startY ? "up" : "down";
                default:
                    return Math.abs(t - this.startX) > Math.abs(e - this.startY) ? t <= this.startX ? "left" : "right" : e <= this.startY ? "up" : "down"
            }
        }
        _preventDefaultEvent(t, e) {
            return "auto" !== this.preventDefault ? this.preventDefault : !!this._preventLock || (t = Math.abs(t - this.startX) > Math.abs(e - this.startY), this._preventLock = "horizontal" === this._direction && t || "vertical" === this._direction && !t, this._preventLock)
        }
        _createStatusObject(t) {
            var e = {},
                i = this._lastStatus.distanceX || 0,
                s = this._lastStatus.distanceY || 0;
            if (e.distanceX = t.pageX - this.startX, e.distanceY = t.pageY - this.startY, e.moveX = e.distanceX - i, e.moveY = e.distanceY - s, 0 === e.moveX && 0 === e.moveY) return w({}, this._lastStatus);
            e.timeStamp = Date.now();
            i = e.timeStamp - this._lastStatus.timeStamp || 0;
            return 0 == (e.dt = i /= 1e3) || 0 === e.moveX && (t.pageX <= 2 || t.pageX >= window.screen.width - 2) ? e.velocityX = this._lastStatus.velocityX : e.velocityX = e.moveX / i, 0 == i || 0 === e.moveY && (t.pageY <= 2 || t.pageY >= window.screen.height - 2) ? e.velocityY = this._lastStatus.velocityY : e.velocityY = e.moveY / i, e.duration = e.timeStamp - this.startTime, e.direction = this._getDirection(t.pageX, t.pageY), e
        }
        _touchStart(t) {
            !this.enabled || this.touchStarted || t.target.closest(this.noSwipeSelector, this.element) || (t.pointerType && "mouse" === t.pointerType && t.preventDefault(), t = "touchstart" === t.type ? t.touches[0] : t, this.startX = t.pageX, this.startY = t.pageY, this.startTime = Date.now(), document.addEventListener(ws, this._touchEnd, !1), _s || document.addEventListener(xs, this._touchMove, {
                passive: !1
            }), Ss.length && document.addEventListener(Ss, this._touchCancel, !1), (t = this._createStatusObject(t)).phase = "start", this.onSwipe(t), this._lastStatus = t, this.touchStarted = !0)
        }
        _touchMove(t) {
            var e, i;
            this.touchStarted && (e = "touchmove" === t.type ? t.touches[0] : t, i = this._createStatusObject(e), this._preventDefaultEvent(e.pageX, e.pageY)) && (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), clearTimeout(this._autoResetTimeout), this._autoResetTimeout = setTimeout(this._reset, 60, e), i.phase = "move", this._lastStatus = i, this.onSwipe(i))
        }
        _touchEnd(t) {
            var e = this._lastStatus;
            t.preventDefault(), document.removeEventListener(ws, this._touchEnd, !1), _s || document.addEventListener(xs, this._touchMove, {
                passive: !1
            }), Ss.length && document.removeEventListener(Ss, this._touchCancel, !1), clearTimeout(this._autoResetTimeout), this._autoResetTimeout = setTimeout(this._reset, 60), 200 < Date.now() - e.timeStamp && (e.velocityX = 0, e.velocityY = 0), e.phase = "end", this.touchStarted = !1, this.onSwipe(e)
        }
        _touchCancel(t) {
            this._touchEnd(t)
        }
        _reset(t) {
            this.reset = !1, this._lastStatus = {}, this.startTime = Date.now(), t ? (this.startX = t.pageX, this.startY = t.pageY) : (this.startX = null, this.startY = null), this._preventLock = !1
        }
        enable() {
            this.enabled || (this.enabled = !0, _s && document.addEventListener(xs, this._touchMove, {
                passive: !1
            }), this.element.addEventListener(bs, this._touchStart, {
                passive: !1
            }), this.direction = this._direction)
        }
        disable() {
            this.enabled && (this.element.style.msTouchAction = "", this.element.style.touchAction = "", this.enabled = !1, this.element.removeEventListener(bs, this._touchStart, !1), document.removeEventListener(ws, this._touchEnd, !1), document.removeEventListener(xs, this._touchMove, !1), Ss.length) && document.removeEventListener(Ss, this._touchCancel, !1)
        }
    }
    class Es {
        constructor(t, e) {
            this.navigator = t, this.swipeDir = e, this.isDisabled = !1, this.swipe = new As(t.view.element), this.swipe.noSwipeSelector = `.${c}-no-swipe`, this._updateDirection = this._updateDirection.bind(this), this.navigator.view.options.observe("dir", this._updateDirection), this.navigator.view.options.observe("reverse", this._updateDirection), this._updateDirection(), this._scrollNavigatorAdapter = this._scrollNavigatorAdapter.bind(this), this.swipe.onSwipe = this._scrollNavigatorAdapter
        }
        enable() {
            this.isDisabled && (this.isDisabled = !1, this.swipe.enable())
        }
        disable() {
            this.isDisabled || (this.isDisabled = !0, this.swipe.disable())
        }
        _updateDirection() {
            var t = "auto" === this.swipeDir ? this.navigator.view.options.get("dir") : this.swipeDir,
                e = this.navigator.view.options.get("reverse");
            let i = "";
            this._reverseFactor = e ? 1 : -1, "h" === (this.direction = t) ? (i = "clientWidth", this._movement = "moveX", this._velocity = "velocityX", this.swipe.direction = "horizontal") : (i = "clientHeight", this._movement = "moveY", this._velocity = "velocityY", this.swipe.direction = "vertical"), this._moveFactor = this.navigator.view.size / this.navigator.view.element[i] || 1
        }
        _scrollNavigatorAdapter(t) {
            switch (t.phase) {
                case "start":
                    this.navigator.hold(), this.navigator.trigger("swipeStart", [this.navigator, this]);
                    break;
                case "move":
                    this.navigator.drag(t[this._movement] * this._reverseFactor * this._moveFactor), this.navigator.trigger("swipeMove", [this.navigator, this]);
                    break;
                default:
                    t[this._velocity] ? this.navigator.push(t[this._velocity] * this._reverseFactor) : this.navigator.release(), this.navigator.trigger("swipeEnd", [this.navigator, this])
            }
        }
    }
    i.registerAddon("swipeGesture", class {
        constructor(t) {
            this.composer = t, this.composer.options.observe(this.composer.options.register({
                mouseSwipe: !0,
                touchSwipe: !0,
                swipeDir: "auto"
            }), this.checkOptions.bind(this)), this.composer.once("navigatorSetup", (t, e) => {
                this.swipeHandler = new Es(e, this.composer.options.get("swipeDir")), this.composer.swipeHandler = this.swipeHandler, this.enable = this.swipeHandler.enable.bind(this.swipeHandler), this.disable = this.swipeHandler.disable.bind(this.swipeHandler), this.checkOptions()
            }), this.composer.once("sectionsSetup", () => this.checkOptions())
        }
        isDisabled() {
            return this.swipeHandler.isDisabled
        }
        checkOptions() {
            var t = this.composer.options.get(["mouseSwipe", "touchSwipe"]);
            (t.touchSwipe && N || t.mouseSwipe) && 1 < (null == (t = this.composer.view) ? void 0 : t.sections.length) ? (this.enable(), this.composer.trigger("swipeGestureEnabled")) : (this.disable(), this.composer.trigger("swipeGestureDisabled"))
        }
    });
    class Cs {
        constructor(t) {
            var e = t.element.querySelector(`.${c}-bg-video`);
            t.hasBackgroundVideo = !!e, t.hasBackgroundVideo && (this.videoSource = e, this.section = t, this.composer = t.composer, this.looped = "false" !== e.getAttribute("data-loop") || e.loop, e.muted = "false" !== e.getAttribute("data-muted"), this.goNext = "true" === e.getAttribute("data-goto-next"), e.removeAttribute("loop"), e.loop = !1, e.autoplay = !1, this.autoPause = "true" === e.getAttribute("data-auto-pause"), this.videoContainer = document.createElement("div"), this.videoContainer.classList.add("depicter-bg-video-container"), this.videoContainer.classList.add("depicter-background-video-container"), this.videoContainer.appendChild(e), t.background.element.appendChild(this.videoContainer), ji(e, void 0, "cover"), e.setAttribute("playsinline", ""), e.setAttribute("webkit-playsinline", ""), this._videoReady = this._videoReady.bind(this), e.addEventListener("loadstart", this._videoReady, !1), e.addEventListener("loadedmetadata", this._videoReady, !1), 0 < e.readyState && this._videoReady(), t.on("deactivated, readyAndActivated", this._sectionStateChange, this), this.composer.on("attach", () => {
                "playing" === this.videoState && this.videoSource.play()
            }))
        }
        _videoReady() {
            this.videoReady || (this.videoReady = !0, this._videoStateChange = this._videoStateChange.bind(this), this.videoSource.addEventListener("play", this._videoStateChange, !1), this.videoSource.addEventListener("pause", this._videoStateChange, !1), this.videoSource.addEventListener("ended", this._videoStateChange, !1), this.section.active && this.section.isReady ? this.videoSource.play() : (this.videoSource.pause(), this.videoSource.currentTime = 0), this.section.trigger("backgroundVideoReady", [this.section], !0))
        }
        _videoStateChange(t) {
            switch (t.type) {
                case "play":
                default:
                    this.videoState = "playing", this.section.trigger("backgroundVideoPlay", [this.section], !0);
                    break;
                case "pause":
                    this.videoState = "stopped", this.section.trigger("backgroundVideoPause", [this.section], !0);
                    break;
                case "ended":
                    this.videoState = "ended", this.section.trigger("backgroundVideoEnded", [this.section], !0), this.goNext ? this.composer.navigator.next() : this.looped && this.videoSource.play()
            }
        }
        _sectionStateChange(t) {
            if (this.videoReady) switch (t) {
                case "readyAndActivated":
                default:
                    this.videoSource.play();
                    break;
                case "deactivated":
                    this.videoSource.pause(), this.autoPause || (this.videoSource.currentTime = 0)
            }
        }
    }
    i.registerAddon("sectionBackgroundVideo", class {
        constructor(t) {
            this.composer = t, this.activeSlides = [], this.composer.on("sectionBeforeMount", this._checkSection, this)
        }
        _checkSection(t, e) {
            e.firstMount && (e.backgroundVideoController = new Cs(e), e.hasBackgroundVideo || this.activeSlides.push(e))
        }
    });
    const ks = (t, e, i) => {
        return !!window.IntersectionObserver && (new IntersectionObserver(t => {
            t.forEach(t => {
                i(t.intersectionRatio, t)
            })
        }, {
            threshold: e || function(t) {
                var e = 0 < arguments.length && void 0 !== t ? t : 25,
                    i = [];
                for (let t = 1; t <= e; t += 1) {
                    var s = t / e;
                    i.push(s)
                }
                return i.push(0), i
            }(25)
        }).observe(t), !0)
    };
    i.registerAddon("inViewport", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                inViewportRatio: .25,
                initAfterAppear: !1
            });
            let i = this.composer.options.get("initAfterAppear");
            i && this.composer.initTrigger.hold();
            const s = this.composer.options.get("inViewportRatio");
            ks(this.composer.element, null, t => {
                var e = t >= s;
                this.composer.element.classList[e ? "add" : "remove"](c + "-in-viewport"), i && e && (i = !1, this.composer.initTrigger.exec()), e !== this.composer.inViewport && this.composer.trigger("inViewportStateChange", [e, t]), this.composer.trigger("inViewportRatioChange", [t]), this.composer.inViewport = e
            }) || (this.composer.inViewport = !0)
        }
    });
    i.registerAddon("loading", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                sectionLoading: "auto"
            }), this.loadingElement = t.element.querySelector(`.${c}-loading-container`), this.loadingElement || (this.loadingElement = document.createElement("div"), this.loadingElement.classList.add(c + "-loading-container"), (t = document.createElement("div")).classList.add(c + "-loading"), this.loadingElement.appendChild(t), this.composer.element.appendChild(this.loadingElement)), this.composer.on("init", this._afterInit, this)
        }
        _afterInit() {
            "off" !== this.composer.options.get("sectionLoading") && (this.sectionLoadingTemplate = this.composer.element.querySelector(`.${c}-section-loading`) || this.loadingElement.cloneNode(!0), this.sectionLoadingTemplate.remove(), this.composer.view.sections.forEach(this._setupLoadingOnSection, this))
        }
        _setupLoadingOnSection(t) {
            var e;
            t.isReady || (e = this.sectionLoadingTemplate.cloneNode(!0), t.element.appendChild(e))
        }
    });
    i.registerAddon("disableClicks", class {
        constructor(t) {
            this.composer = t, this.actions = t.actions, this.composer.on("init", this._init, this)
        }
        _init() {
            this._checkClick = this._checkClick.bind(this), this.composer.view.element.addEventListener("click", this._checkClick, !1), this.composer.on("swipeStart", this._swipeInteraction, this), this.composer.on("swipeMove", this._swipeInteraction, this), this.composer.on("swipeEnd", this._swipeInteraction, this)
        }
        _swipeInteraction(t) {
            clearTimeout(this._to), "swipeStart" === t ? (this._clickDisabled = !0, this._hadMove = !1) : "swipeMove" === t ? this._hadMove = !0 : this._hadMove ? (this._hadMove = !1, this._to = setTimeout(() => {
                this._clickDisabled = !1
            }, 5)) : this._clickDisabled = !1
        }
        _checkClick(t) {
            this._clickDisabled && (t.preventDefault(), t.stopPropagation())
        }
    });
    i.registerAddon("smartLoader", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                preload: 0
            }), this.composer.options.alias("lazyload", "preload"), this.composer.on("init", this._start, this, 100), this.composer.on("sectionBeforeMount", (t, e) => e.loadTrigger.hold(), this, 100), this.composer.on("layersSurfaceBeforeSetup", this._checkSurfaceLayers, this)
        }
        _start() {
            var t = this.composer.options.get("preload");
            0 === t ? this._loadSectionsInSequence() : "all" === t ? this._waitForAllSections() : "number" == typeof t && (this._loadNearby = t), this.composer.element.classList.add(c + "-preload-" + t), this.composer.on("targetIndexChange", this._checkCurrentSection, this), this._checkCurrentSection()
        }
        _checkSurfaceLayers(t, e) {
            "all" === this.composer.options.get("preload") && (e.loadTrigger.hold(), this.composer.readyTrigger.hold(), e.on("ready", () => this.composer.readyTrigger.exec(), this), e.loadTrigger.exec())
        }
        _checkCurrentSection() {
            this.composer.navigator.targetSectionIndexes.forEach(t => {
                this.composer.view.sections[t].loadTrigger.exec(), this._loadNearby && this._loadNearbySections(t, this._loadNearby)
            })
        }
        _loadNearbySections(e, i) {
            let s;
            var n = this.composer.view["sections"],
                o = this.composer.view["loop"],
                r = n.length;
            for (let t = 1; t !== i + 1; t += 1)(s = e + t) >= r ? o && n[s %= r].loadTrigger.exec() : n[s].loadTrigger.exec(), (s = e - t) < 0 ? o && n[s += r].loadTrigger.exec() : n[s].loadTrigger.exec()
        }
        _loadSectionsInSequence(t) {
            var e;
            t !== this.composer.view.sections.length && (void 0 === t && (t = 0), (e = this.composer.view.sections[t]).isReady ? this._loadSectionsInSequence(t + 1) : (e.on("ready", () => {
                this._loadSectionsInSequence(t + 1)
            }, this), e.loadTrigger.exec()))
        }
        _waitForAllSections() {
            this.composer.readyTrigger.charge(this.composer.view.sections.length), this.composer.view.sections.forEach(t => {
                (t.isReady ? this.composer.readyTrigger : (t.on("ready", () => this.composer.readyTrigger.exec(), this), t.loadTrigger)).exec()
            })
        }
    });
    class Ls {
        constructor(t) {
            let e = t.element.querySelector('.depicter-section-video, a[data-type="video"]');
            var i;
            e ? (this.section = t, this.composer = t.composer, (t.videoController = this).autoplay = "true" === e.getAttribute("data-autoplay"), this.goNext = "true" === e.getAttribute("data-goto-next"), "A" === e.tagName ? (i = e.getAttribute("href"), e.remove(), e = i) : "VIDEO" !== e.tagName || e.hasAttribute("data-player-type") || (e.hasAttribute("data-object-fit") && (e.style.objectFit = e.getAttribute("data-object-fit")), e.hasAttribute("data-object-position") && (e.style.objectPosition = e.getAttribute("data-object-position"))), this._videoElementReady = this._videoElementReady.bind(this), this.videoElement = new D(e), this.videoElement.setup(this._videoElementReady), "mejs" === this.videoElement.type && (this.videoElement.player.api.options.stretching = "responsive"), this.videoElement.source.classList.remove("depicter-section-video"), this.videoElement.element.classList.add("depicter-section-video"), "string" == typeof e && t.element.appendChild(this.videoElement.element), this.playBtn = document.createElement("div"), this.playBtn.classList.add("depicter-section-video-btn"), this.playBtn.addEventListener("click", this.playVideo.bind(this), !1), t.element.appendChild(this.playBtn), this.closeBtn = document.createElement("div"), this.closeBtn.classList.add("depicter-section-video-close-btn"), this.closeBtn.addEventListener("click", this.closeVideo.bind(this), !1), t.element.appendChild(this.closeBtn), t.on("activated, deactivated", this._sectionStateChange, this)) : this.noSource = !0
        }
        playVideo() {
            this.videoElement.ready && this.videoElement.play(), this.section.element.classList.add(c + "-video-open"), this.section.trigger("videoOpen", [this.section, this], !0)
        }
        closeVideo() {
            this.videoElement.ready && this.videoElement.stop(), this.section.element.classList.remove(c + "-video-open"), this.section.trigger("videoClose", [this.section, this], !0)
        }
        _videoElementReady() {
            this.section.active && this.autoplay && this.playVideo(), this._onVideoPlay = this._onVideoPlay.bind(this), this._onVideoPause = this._onVideoPause.bind(this), this._onVideoEnded = this._onVideoEnded.bind(this), this.videoElement.on("play", this._onVideoPlay), this.videoElement.on("pause", this._onVideoPause), this.videoElement.on("ended", this._onVideoEnded)
        }
        _onVideoPlay() {
            this._videoState = "playing", this.section.trigger("videoPlay", [this.section, this], !0)
        }
        _onVideoPause() {
            this._videoState = "stopped", this.section.trigger("videoPause", [this.section, this], !0)
        }
        _onVideoEnded() {
            this._videoState = "ended", this.section.trigger("videoEnded", [this.section, this], !0), this.goNext && this.composer.next && this.composer.next()
        }
        _sectionStateChange(t) {
            switch (t) {
                case "select":
                default:
                    this.autoplay && this.playVideo();
                    break;
                case "deselect":
                    this.closeVideo()
            }
        }
    }
    i.registerAddon("sectionVideo", class {
        constructor(t) {
            this.composer = t, this.actions = t.actions, this.options = t.options, this.activeSections = [], this.composer.on("init", () => {
                this.composer.view.sections.forEach(this._checkSection, this)
            })
        }
        _checkSection(t) {
            new Ls(t).noSource || this.activeSections.push(t)
        }
    });
    const Is = new RegExp(c + "-hide-on-(tablet|desktop|mobile)", "g");
    i.registerAddon("hideOn", class {
        constructor(t) {
            var e;
            this.composer = t, this.composerElement = this.composer.element, this.hideBreakpoints = null == (e = this.composerElement.getAttribute("class").match(Is)) ? void 0 : e.map(t => t.split("-").slice(-1)[0]), null != (e = this.hideBreakpoints) && e.includes(l().name || "desktop") && (this._contentIsOnHold = !0, this.composer.isHidden = !0, t.initTrigger.hold()), null != (e = this.hideBreakpoints) && e.length && p.on("breakpointChange", this.update, this)
        }
        update(t, e) {
            var i;
            null != (i = this.hideBreakpoints) && i.includes(e) ? (this.composer.isHidden = !0, this.composer.trigger("visibilityChange", [!0])) : (this.composer.isHidden = !1, this._contentIsOnHold && (this._contentIsOnHold = !1, this.composer.initTrigger.exec()), this.composer.trigger("visibilityChange", [!1]))
        }
    });
    i.registerAddon("keyboardNav", class {
        constructor(t) {
            this.composer = t, this.composerElement = this.composer.element, this.composer.options.register({
                keyboard: !1
            }), this.composer.on("init", this.setup, this)
        }
        setup() {
            var t = this.composer.options.get("keyboard");
            t && (this.activeOptions = w(w({}, {
                checkLoop: !0,
                activeOnHover: !1
            }), "object" == typeof t ? t : void 0), this._onKeydown = this._onKeydown.bind(this), this.activeOptions.activeOnHover ? (this.composerElement.tabIndex = 0, this._mouseInteraction = this._mouseInteraction.bind(this), this.composerElement.addEventListener("mouseenter", this._mouseInteraction, !1), this.composerElement.addEventListener("mouseleave", this._mouseInteraction, !1)) : (this.composer.on("inViewportStateChange", (t, e) => {
                e ? document.addEventListener("keydown", this._onKeydown) : document.removeEventListener("keydown", this._onKeydown)
            }), this.composer.inViewport && document.addEventListener("keydown", this._onKeydown)))
        }
        _mouseInteraction(t) {
            switch (t.type) {
                case "mouseenter":
                    this.composerElement.focus(), this.composerElement.addEventListener("keydown", this._onKeydown, !1);
                    break;
                case "mouseleave":
                    this.composerElement.blur(), this.composerElement.removeEventListener("keydown", this._onKeydown, !1)
            }
        }
        _onKeydown(t) {
            var e = t["key"],
                i = this.activeOptions["checkLoop"];
            "ArrowLeft" === e ? (this.composer.navigator.previous({
                checkLoop: i
            }), t.preventDefault()) : "ArrowRight" === e && (this.composer.navigator.next({
                checkLoop: i
            }), t.preventDefault())
        }
    });
    i.registerAddon("mouseWheelNav", class {
        constructor(t) {
            this.composer = t, this.composerElement = this.composer.element, this.composer.options.register({
                mouseWheel: !1
            }), this.composer.on("init", this.setup, this)
        }
        setup() {
            var t = this.composer.options.get("mouseWheel");
            this._layout = this.composer.options.get("layout"), this._slideByWheel = this._slideByWheel.bind(this), this._scrollByWheel = this._scrollByWheel.bind(this), this._wheelDeltaBuffer = 0, this._lastWheelTime = 0, t && (this.options = w(w({}, {
                activeOnAppear: !0,
                preventDefault: "auto",
                friction: .09
            }), "object" == typeof t ? t : void 0), t = this.composer.options.get("navigator.slickType"), this.view = this.composer.view, "scroll" === t ? (this._readViewPosition = !0, this.loop = this.composer.options.get("viewOptions.loop"), this.composer.navigator.on("slickChanged", () => {
                this._readViewPosition = !0
            }), ("fullscreen" === this._layout ? window : this.composerElement).addEventListener("wheel", this._scrollByWheel, {
                passive: !1
            })) : ("fullscreen" === this._layout ? window : this.composerElement).addEventListener("wheel", this._slideByWheel, {
                passive: !1
            }))
        }
        _letWindowScroll(t) {
            var {
                top: e,
                bottom: i,
                height: s
            } = this.composerElement.getBoundingClientRect();
            if ({
                    top: e,
                    bottom: i
                } = {
                    top: Math.round(e),
                    bottom: Math.round(i)
                }, t < 0) {
                if ("fullscreen" !== this._layout && e <= 0) return !0;
                if ("fullscreen" === this._layout) return !(Math.abs(e) <= .2 * s) || e + window.scrollY
            }
            if (0 < t) {
                if ("fullscreen" !== this._layout && i >= window.innerHeight) return !0;
                if ("fullscreen" === this._layout) return !(Math.abs(i - window.innerHeight) <= .2 * s) || e + window.scrollY
            }
            return !1
        }
        _slideByWheel(t) {
            let e = t.deltaY;
            var i = this._letWindowScroll(e);
            this.options.activeOnAppear && !0 === i || "auto" === this.options.preventDefault && (this.composer.navigator.currentIndex === this.composer.navigator.count - 1 && 1 < e || 0 === this.composer.navigator.currentIndex && e < 1) || (this.options.preventDefault && (t.preventDefault(), !1 !== i) && window.scrollTo({
                behavior: "smooth",
                top: i
            }), t.timeStamp - this._lastWheelTime < 300) || (1 === t.deltaMode && (e *= 40), Math.abs(e) < 20) || (e < 0 ? this.composer.navigator.previous() : this.composer.navigator.next(), this._lastWheelTime = t.timeStamp)
        }
        _scrollByWheel(t) {
            let e = t.deltaY;
            var i = this._letWindowScroll(e);
            this.options.activeOnAppear && !0 === i || (1 === t.deltaMode && (e *= 40), this.targetScrollPosition >= this.view.nominalLength && 1 < e && ("auto" === this.options.preventDefault || !this.options.preventDefault)) || this.targetScrollPosition <= 0 && e < 1 && ("auto" === this.options.preventDefault || !this.options.preventDefault) || (this.options.preventDefault && (t.preventDefault(), !1 !== i) && window.scrollTo({
                behavior: "smooth",
                top: i
            }), this._readViewPosition && (this._readViewPosition = !1, this.targetScrollPosition = this.view.position), this.targetScrollPosition += e, this.loop && "auto" !== this.options.preventDefault || (this.targetScrollPosition = Math.max(Math.min(this.view.nominalLength, this.targetScrollPosition), 0)), this.composer.navigator.goToPosition(this.targetScrollPosition, {
                useFriction: 0 !== this.options.friction,
                friction: this.options.friction
            }), this._lastWheelTime = t.timeStamp)
        }
    });
    i.registerAddon("grabCursor", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                useGrabCursor: !0
            }), this.composer.on("init", this._afterInit, this), this.composer.on("swipeGestureDisabled, swipeGestureEnabled", this._toggleEnable, this)
        }
        disable() {
            this.disabled || (this.disabled = !0, this.composer.element.classList.remove(c + "-cursor-grab"), this.composer.element.classList.remove(c + "-cursor-grabbing"))
        }
        enable() {
            this.disabled && (this.disabled = !1, this.composer.element.classList.add(c + "-cursor-grab"))
        }
        _toggleEnable(t) {
            ["betweenAnimationStart", "swipeGestureDisabled"].includes(t) ? this.disable() : this.enable()
        }
        _afterInit() {
            var t;
            if (this.composer.view.on("betweenAnimationStart, betweenAnimationEnd", this._toggleEnable, this), this.composer.options.get("useGrabCursor") && !0 === this.composer.options.get("mouseSwipe")) {
                const e = this.composer["element"];
                this.composer.on("swipeStart", () => !this.disabled && e.classList.add(c + "-cursor-grabbing")), this.composer.on("swipeEnd", () => !this.disabled && e.classList.remove(c + "-cursor-grabbing"))
            }
            null != (t = this.composer) && null != (t = t.swipeHandler) && t.isDisabled ? this.disable() : this.enable()
        }
    });
    const B = [];
    let Os = !0;
    const Ts = () => {
            Os || (B.forEach(t => t()), requestAnimationFrame(Ts))
        },
        Ps = t => (B.push(t), 1 === B.length && Os && (Os = !1, Ts()), B.length),
        Ms = t => {
            B.splice(B.indexOf(t), 1), 0 === B.length && (Os = !0)
        };
    class Ds {
        constructor(t, e) {
            this.delay = t, this.currentCount = 0, this.paused = !1, this.onTimer = null, e && this.start(), this.update = this.update.bind(this)
        }
        start() {
            this.paused = !1, this.lastTime = Date.now(), Ps(this.update)
        }
        stop() {
            this.paused = !0, Ms(this.update)
        }
        reset() {
            this.currentCount = 0, this.paused = !0, this.lastTime = Date.now()
        }
        update() {
            this.paused || Date.now() - this.lastTime < this.delay || (this.currentCount += 1, this.lastTime = Date.now(), this.onTimer && this.onTimer(this.getTime()))
        }
        getTime() {
            return this.delay * this.currentCount
        }
    }
    const Bs = {
        autostart: !1,
        duration: 3,
        autoStartAfterVideo: !0,
        pauseOnHover: !0,
        resetTimerOnBlur: !1,
        pauseAtEnd: !1,
        navigatorParams: {
            animate: !0,
            duration: 1.5,
            forceLooped: !0,
            easing: "easeOutExpo"
        }
    };
    i.registerAddon("slideshow", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                slideshow: !1
            }), this.timer = new Ds(100), this.timer.onTimer = this._onTimer.bind(this), this.mouseEntered = !1, this.composer.on("init", this.setup, this, 100)
        }
        setup() {
            var t = this.composer.options.get("slideshow");
            this.options = w(w({}, Bs), "object" == typeof t ? t : {
                autostart: !!t
            }), this._registerAutoPlayMethods(), this._readSectionSlideshowDataAttrs(), this.loop = this.composer.view.options.get("loop"), this.options.autostart ? (this._start(), this._waitForVideo()) : this.composer.slideshow.pause(), this.composer.on("changeStart", this._reset, this), this.composer.on("swipeStart", this._reset, this), this.composer.on("changeEnd", this._onChangeEnd, this), this.options.pauseOnHover && (this._mouseInteraction = this._mouseInteraction.bind(this), this.composer.element.addEventListener("mouseover", this._mouseInteraction, !1), this.composer.element.addEventListener("mouseenter", this._mouseInteraction, !1), this.composer.element.addEventListener("mouseleave", this._mouseInteraction, !1)), this.composer.on("sectionVideoOpen, detach", this._pause, this), this.composer.on("sectionVideoClose", this._start, this), this.composer.on("attach", () => {
                this._reset(), this._start()
            }), this.composer.trigger("slideshowInit", [this._hardPause])
        }
        _registerAutoPlayMethods() {
            this.composer.slideshow = {
                currentTime: () => this.durationProgress,
                resume: () => {
                    this._hardPause = !1, this.composer.paused = !1, this._start(), this.composer.trigger("slideshowStatusChange", [this._hardPause])
                },
                pause: () => {
                    this._hardPause = !0, this.composer.paused = !0, this._pause(), this.composer.trigger("slideshowStatusChange", [this._hardPause])
                },
                reset: () => this._reset,
                isPaused: () => this._hardPause
            }
        }
        _readSectionSlideshowDataAttrs() {
            this.duration = this.options.duration;
            var {
                slideshowDuration: t,
                slideshowPause: e
            } = this.composer.view.currentSection.element.dataset;
            t && (this.duration = t), e && this.composer.slideshow.pause(), this.duration *= 1e3
        }
        _start() {
            this._hardPause || (this._isPaused = !1, this.timer.start(), this.composer.trigger("slideshowStart"))
        }
        _pause() {
            this._isPaused = !0, this.timer.stop(), this.composer.trigger("slideshowPaused")
        }
        _reset() {
            this.timer.reset(), this.durationProgress = 0, this.composer.trigger("slideshowTimerUpdate", [this.durationProgress]), this.composer.trigger("slideshowTimerReset")
        }
        _onChangeEnd() {
            ("auto" !== this.options.pauseAtEnd || this.loop) && !0 !== this.options.pauseAtEnd || this.composer.navigator.targetIndex !== this.composer.navigator.count - 1 ? (this._readSectionSlideshowDataAttrs(), this.mouseEntered || (this._start(), this._waitForVideo())) : (this.composer.slideshow.reset(), this.composer.slideshow.pause())
        }
        _onTimer() {
            this.durationProgress = this.timer.getTime() / this.duration * 100, this.composer.trigger("slideshowTimerUpdate", [this.durationProgress]), this.timer.getTime() >= this.duration && this.composer.navigator.next(this.options.navigatorParams)
        }
        _mouseInteraction(t) {
            switch (t.type) {
                case "mouseenter":
                case "mouseover":
                    this.mouseEntered = !0, this._pause();
                    break;
                case "mouseleave":
                    this.mouseEntered = !1, this.options.resetTimerOnBlur && this._reset(), this._start()
            }
        }
        _waitForVideo() {
            var t = this.options.autoStartAfterVideo,
                {
                    currentSection: {
                        backgroundVideoController: e,
                        hasBackgroundVideo: i
                    }
                } = this.composer["view"];
            t && i && "playing" !== e.videoState && (this._reset(), this.composer.on("sectionBackgroundVideoPlay", this._start, this))
        }
    });

    function zs(t, e) {
        var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
        i ? setTimeout(() => {
            null != t && t(e)
        }, 1e3 * i) : null != t && t(e)
    }
    const Vs = n => ({
            openURL(t) {
                var {
                    path: t,
                    target: e
                } = t;
                window.open(t, e)
            },
            slideshow(t) {
                var e, t = t["type"];
                ["resume", "pause", "reset"].includes(t) && null != (t = (e = n.slideshow)[t]) && t.call(e)
            },
            gotoSection(t) {
                let {
                    type: e,
                    to: i
                } = t;
                var s;
                ["next", "previous"].includes(e) ? null != (s = (t = n.navigator)[e]) && s.call(t, {
                    checkLoop: !0
                }) : "number" !== e || Number.isNaN(i) ? 0 <= (s = n.view.sections.findIndex(t => t.element.id === n.element.id + "-" + i)) && n.navigator.goToIndex(s) : n.navigator.goToIndex(parseInt(i, 10))
            },
            scrollTo(t) {
                var {
                    type: t,
                    to: e
                } = t;
                "below" === t ? window.scrollTo({
                    top: window.scrollY + n.element.getBoundingClientRect().bottom,
                    behavior: "smooth"
                }) : null != (t = document.querySelector(e)) && t.scrollIntoView({
                    behavior: "smooth"
                })
            },
            backgroundVideo(t) {
                var e, t = t["type"],
                    i = null == (e = n.view.currentSection) || null == (e = e.backgroundVideoController) ? void 0 : e.videoSource;
                if (i) try {
                    switch (t) {
                        case "mute":
                            i.muted = !0;
                            break;
                        case "unmute":
                            i.muted = !1;
                            break;
                        case "toggleSound":
                            i.muted = !i.muted;
                            break;
                        case "toggle":
                            i.paused ? i.play() : i.pause();
                            break;
                        case "stop":
                            i.pause(), i.currentTime = 0;
                            break;
                        case "play":
                            i.play();
                            break;
                        case "pause":
                            i.pause();
                            break;
                        case "restart":
                            i.play(), i.currentTime = 0
                    }
                } catch (t) {}
            },
            elements(t) {
                let {
                    elements: e,
                    type: i
                } = t;
                e.forEach(t => {
                    var e = n.layersById[n.element.id + "-" + t];
                    if (e) switch (i) {
                        case "show":
                            null != e && e.show();
                            break;
                        case "hide":
                            null != e && e.hide();
                            break;
                        case "toggle":
                            null != e && e.isHidden ? null != e && e.show() : null != e && e.hide()
                    }
                })
            }
        }),
        Rs = ["click", "mouseenter", "mouseleave"],
        js = (o, r, a) => {
            var e = r.dataset.actions;
            if (e) {
                let t = [];
                try {
                    t = JSON.parse(e.replace(/'/g, '"'))
                } catch (t) {}
                t.forEach(t => {
                    let [e, i, s, n] = t;
                    Rs.includes(i) ? (r.classList.add(c + "-no-swipe"), r.classList.add(c + "-has-mouse-action"), r.addEventListener(i, t => {
                        t.preventDefault(), t.stopPropagation(), zs(o[e], n, s)
                    })) : a.on(i, () => zs(o[e], n, s))
                })
            }
        };
    i.registerAddon("actions", class {
        constructor(t) {
            this.composer = t, this.composer.on("beforeInit", this._setupActions, this), this.composer.on("layerCreate", this._setLayerActions, this), this.composer.on("init", this._afterInit, this)
        }
        _setupActions() {
            this.composer.actions = Vs(this.composer), this.composer.trigger("afterSetupActions", [Vs])
        }
        _afterInit() {
            this.composer.view.sections.forEach(t => js(this.composer.actions, t.element, t))
        }
        _setLayerActions(t, e) {
            js(this.composer.actions, e.element, e)
        }
    });
    i.registerAddon("revertStyles", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                useRevertStyles: !0
            }), this.composer.on("init", this._afterInit, this)
        }
        _afterInit() {
            var t;
            this.composer.options.get("useRevertStyles") && null != (t = window) && null != (t = t.CSS) && t.supports("all", "revert") && this.composer.element.classList.add(c + "-revert")
        }
    });
    i.registerAddon("hoverOff", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerCreate", this._checkLayer, this), this.layersList = [], p.on("breakpointChange", this._update, this)
        }
        _checkLayer(t, e) {
            var i = (e.element.getAttribute("data-hover-off") || "").split(",").map(t => t.trim());
            i.length && (this.layersList.push({
                layer: e,
                hoverOffValue: i
            }), this._updateLayer(e, i, l().name))
        }
        _updateLayer(t, e, i) {
            e.includes(i || "desktop") ? t.element.classList.add(c + "-hover-off") : t.element.classList.remove(c + "-hover-off")
        }
        _update(t, i) {
            this.layersList.forEach(t => {
                var {
                    layer: t,
                    hoverOffValue: e
                } = t;
                return this._updateLayer(t, e, i)
            })
        }
    });
    i.registerAddon("gotoNextVideoLayer", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerCreate", this._checkLayer, this)
        }
        _checkLayer(t, e) {
            ["video", "embedVideo"].includes(e.type) && (this.goNext = "true" === e.element.getAttribute("data-goto-next"), this.goNext) && e.on("videoEnded", () => {
                this.composer.navigator.next()
            })
        }
    });
    i.registerAddon("layerAnimationsClassName", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerGetInOutAnimation", this._checkLayer, this), this.layersList = [], p.on("breakpointChange", this._update, this)
        }
        _checkLayer(t, e) {
            this.layersList.push(e), this._updateLayer(e, l().name || "desktop")
        }
        _updateLayer(t, e) {
            var i = t["inOutAnimation"]["animationsData"];
            i && ((i = u(i, e)).animationIn ? t.frame.classList.add(c + "-has-animation-in") : t.frame.classList.remove(c + "-has-animation-in"), i.animationOut ? t.frame.classList.add(c + "-has-animation-out") : t.frame.classList.remove(c + "-has-animation-out"))
        }
        _update(t, e) {
            this.layersList.forEach(t => this._updateLayer(t, e))
        }
    });
    i.registerAddon("nearbySections", class {
        constructor(t) {
            this.composer = t, this.composer.on("init", this._setup, this)
        }
        _setup() {
            this.composer.view.options.register("nearbyVisibility", "hidden"), this.composer.view.options.register("nearbyVisibilityAmount", "10%");
            var t = this.composer.options.get("view"),
                e = this.composer.options.get("viewOptions.nearbyVisibility");
            "hidden" !== e && ["basic", "transform"].includes(t) && (this.nearbyAmount = this.composer.options.get("viewOptions.nearbyVisibilityAmount"), this.composer.element.classList.add(c + "-nearby-sections-visible"), this.targetDimension = "v" === this.composer.options.get("viewOptions.dir") ? ["maxHeight", "height"] : ["maxWidth", "width"], this.composer.view.element.style[this.targetDimension[0]] = `calc(100% - ${this.nearbyAmount})`, this.composer.view.element.style[this.targetDimension[1]] = `calc(100% - ${this.nearbyAmount})`, "full" === e && this.composer.on("layoutUpdate", this._update, this), this.composer.layoutController.update())
        }
        _update() {
            var t = "maxHeight" === this.targetDimension[0] ? u(this.composer.options.get("height")) : this.composer.layoutController.activeBreakpointSize;
            this.composer.view.element.style[this.targetDimension[0]] = t + "px"
        }
    });
    i.registerAddon("viewDir", class {
        constructor(t) {
            this.composer = t, this.composer.on("init", this._afterInit, this)
        }
        _afterInit() {
            var t = this.composer.options.get("viewOptions.dir");
            t && this.composer.element.classList.add(c + "-view-dir-" + t)
        }
    });
    i.registerAddon("slickerSpeed", class {
        constructor(t) {
            this.composer = t, this._update = this._update.bind(this), this.composer.on("navigatorSetup", this._setup, this)
        }
        _setup() {
            this.composer.navigator.options.register("slickerSpeed", .5), this.composer.navigator.options.observe("slickerSpeed", this._update), this._update()
        }
        _update() {
            var t = 100 * (this.composer.options.get("navigator.slickerSpeed") || .01);
            t <= 50 ? (this.composer.options.set("navigator.snapping.constant", 50 + 40 * (t / 50)), this.composer.options.set("navigator.slickerFriction", .01 + .19 * ((50 - t) / 50))) : (this.composer.options.set("navigator.snapping.constant", 90 + 910 * (t = (t - 50) / 50)), this.composer.options.set("navigator.slickerFriction", .01 - .01 * t))
        }
    });
    class Ws {
        constructor(t, e, i, s) {
            this.parallaxAddon = t, this.target = e, this.holder = i, this.refPoint = {
                x: 0,
                y: 0
            }, this.currentPoint = {
                x: 0,
                y: 0
            }, this.container = t.container, this._renderByMouse = this._renderByMouse.bind(this), this.options = s
        }
        _setupMouseInteractions() {
            this.holder.addEventListener("mousemove", this._renderByMouse), this.holder.addEventListener("mouseleave", this._renderByMouse)
        }
        _revokeMouseInteractions() {
            this.holder.removeEventListener("mousemove", this._renderByMouse), this.holder.removeEventListener("mouseleave", this._renderByMouse)
        }
        _renderByMouse(t) {
            let e, i;
            var s, n, o;
            i = "mousemove" === t.type ? ({
                top: n,
                left: o
            } = (s = t.currentTarget).getBoundingClientRect(), e = t.clientX - o - s.offsetWidth / 2, t.clientY - n - s.offsetHeight / 2) : e = 0, this.refPoint = {
                x: e,
                y: i
            }
        }
        _calculate() {
            var t, e, i, s;
            !1 === this.options.smooth ? this.currentPoint = this.refPoint : ({
                x: t,
                y: e
            } = this.refPoint, {
                x: i,
                y: s
            } = this.currentPoint, this.currentPoint = {
                x: i + (i = t - i) / 12,
                y: s + (s = e - s) / 12
            }, Math.abs(i) < .019 && (this.currentPoint.x = t), Math.abs(s) < .019 && (this.currentPoint.y = e)), this.render(), requestAnimationFrame(() => this._calculate())
        }
        render() {
            var {
                x: t = .5,
                y: e = .5
            } = this.options, {
                x: i,
                y: s
            } = this.currentPoint, i = -i * O(t), t = -s * O(e);
            this.container.style.transform = "translateX(" + i + "px) translateY(" + t + "px) "
        }
        initiate() {
            var {
                use: t = "mouse"
            } = this.options;
            "mouse" === (this.lastActiveUseValue = t) && this._setupMouseInteractions(), this._calculate()
        }
        reset() {
            "mouse" === this.lastActiveUseValue && this._revokeMouseInteractions(), this.container.style.transform = ""
        }
    }
    const Ns = new Map,
        Hs = (Ns.set("2d", Ws), Ns.set("3d", class extends Ws {
            render() {
                var {
                    x: t = 0,
                    y: e = 0,
                    rx: i = 30,
                    ry: s = 30
                } = this.options, {
                    x: n,
                    y: o
                } = this.currentPoint, {
                    offsetWidth: r,
                    offsetHeight: a
                } = this.holder, t = -n * O(t), e = -o * O(e), n = n / (r / 2) * O(i), r = -o / (a / 2) * O(s);
                this.container.style.transform = "translateX(" + t + "px) translateY(" + e + "px) rotateY(" + n + "deg) rotateX(" + r + "deg)"
            }
            initiate() {
                var {
                    use: t = "mouse",
                    zOrigin: e = 0
                } = this.options;
                "mouse" === (this.lastActiveUseValue = t) && this._setupMouseInteractions(), this.container.style.transformStyle = "preserve-3d", this.container.style.transformOrigin = `center center ${O(e)}px`, this._calculate()
            }
            reset() {
                super.reset(), this.container.style.transformStyle = "", this.container.style.transformOrigin = ""
            }
        }), Ns.set("scroll", class {
            constructor(t, e, i, s) {
                this.parallaxAddon = t, this.target = e, this.holder = i, this.refValue = 0, this.currentValue = 0, this.container = t.container, this._onScroll = this._onScroll.bind(this), this.options = s, this.alwaysEnabled = !0
            }
            _setupScrollInteractions() {
                document.addEventListener("scroll", this._onScroll)
            }
            _revokeScrollInteractions() {
                document.removeEventListener("scroll", this._onScroll)
            }
            _onScroll() {
                var {
                    top: t,
                    bottom: e,
                    height: i
                } = this.holder.getBoundingClientRect(), {
                    twoWay: s = !0
                } = this.options;
                t < 0 ? this.refValue = Math.max(-i, t) / i : e > window.innerHeight ? this.refValue = (s ? 1 : -1) * Math.min(i, e - window.innerHeight) / i : this.refValue = 0
            }
            _calculate() {
                var t;
                (!1 === this.options.smooth || (t = this.refValue - this.currentValue, this.currentValue += t / 12, Math.abs(t) < .001)) && (this.currentValue = this.refValue), this.render(), requestAnimationFrame(() => this._calculate())
            }
            render() {
                var t, {
                    dir: e = "bottom",
                    movement: i = 300,
                    fade: s = !1,
                    rotate: n = 0,
                    scale: o = 1
                } = this.options;
                let r = "",
                    a = "";
                i && (t = ["top", "left"].includes(e), r += `translate${["bottom","top"].includes(e)?"Y":"X"}(${this.currentValue*O(i)*(t?1:-1)}px)`), n && (r += ` rotate(${O(n)*this.currentValue}deg)`), 1 !== o && (r += ` scale(${1+(1-O(o))*this.currentValue})`), s && (a = 1 - Math.abs(this.currentValue)), this.container.style.transform = r, this.container.style.opacity = a
            }
            initiate() {
                this._setupScrollInteractions(), this._onScroll(), this._calculate(), this.holder.classList.add(c + "-scroll-parallax")
            }
            reset() {
                this._revokeScrollInteractions(), this.container.style.transform = "", this.container.style.opacity = "", this.holder.classList.remove(c + "-scroll-parallax")
            }
        }), Ns.set("viewScroll", class {
            constructor(t, e, i, s) {
                this.controller = t, this.target = e, this.holder = i, this.refValue = 0, this.currentValue = 0, this.container = t.container, this._onScroll = this._onScroll.bind(this), this.options = s, this.alwaysEnabled = !0
            }
            _setupScrollInteractions() {
                this.controller.holder.on("pendingOffsetChange", this._onScroll)
            }
            _revokeScrollInteractions() {
                this.controller.holder.on("pendingOffsetChange", this._onScroll)
            }
            _onScroll(t, e, i, s) {
                this.value = s, this.render()
            }
            render() {
                var t, {
                    dir: e = "bottom",
                    movement: i = 300,
                    fade: s = !1,
                    rotate: n = 0,
                    scale: o = 1
                } = this.options;
                let r = "",
                    a = "";
                i && (t = ["top", "left"].includes(e), r += `translate${["bottom","top"].includes(e)?"Y":"X"}(${this.value*O(i)*(t?1:-1)}px)`), n && (r += ` rotate(${O(n)*this.value}deg)`), 1 !== o && (r += ` scale(${1+(1-O(o))*this.value})`), s && (a = 1 - Math.abs(this.value)), this.container.style.transform = r, this.container.style.opacity = a
            }
            initiate() {
                this._setupScrollInteractions()
            }
            reset() {
                this._revokeScrollInteractions(), this.container.style.transform = "", this.container.style.opacity = ""
            }
        }), t => {
            try {
                var e = m(t, "parallax");
                if (Mi(e)) return !1;
                const i = {};
                return Object.entries(e).forEach(t => {
                    var [t, e] = t;
                    i[t] = "false" !== e && JSON.parse(e.replace(/'/g, '"'))
                }), i
            } catch (t) {
                return console.log(t), !1
            }
        });
    class Fs {
        constructor(t, e, i, s) {
            var n = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4];
            this.options = s, this.activeAreaElement = i, this.holder = e, this.targetElement = t, n ? ((s = document.createElement("div")).classList.add(c + "-parallax-wrap"), this.container = s, Oi(t, s)) : this.container = t, p.on("breakpointChange", (t, e) => this._update(e), this), this._update(l().name)
        }
        _update(t) {
            var e, t = u(this.options, t);
            this.disable(), t ? (this.activeOptions = t, t = this.activeOptions.type, (e = Ns.get(t)) ? (this.activeHandler = new e(this, this.targetElement, this.activeAreaElement, this.activeOptions), this.activeHandler.alwaysEnabled ? (this.holder.off("readyAndActivated", this.enable, this), this.holder.off("readyAndDeactivated", this.disable, this), this.enable()) : (this.holder.on("readyAndActivated", this.enable, this), this.holder.on("readyAndDeactivated", this.disable, this), this.holder.isReady && this.holder.isActivated && this.enable())) : console.warn("No parallax handler found for " + t)) : (this.holder.off("readyAndActivated", this.enable, this), this.holder.off("readyAndDeactivated", this.disable, this))
        }
        enable() {
            this.isEnabled || (this.isEnabled = !0, this.activeHandler.initiate())
        }
        disable() {
            var t;
            this.isEnabled = !1, null != (t = this.activeHandler) && t.reset()
        }
    }
    i.registerAddon("parallax", class {
        constructor(t) {
            (this.composer = t).options.get("disableAnimations") || (this.composer.on("layerCreate", this._checkLayer, this), this.composer.on("sectionReady", this._checkSection, this), this.layersList = [])
        }
        _checkLayer(t, e) {
            var i = Hs(e.element);
            i && new Fs(e.element, e.holder, this.composer.element, i)
        }
        _checkSection(t, e) {
            var i, s = Hs(e.element);
            s && (i = e.background.element) && new Fs(i, e, this.composer.element, s, !1)
        }
    });
    i.registerAddon("animrollOptionsController", class {
        constructor(t) {
            this.composer = t;
            t = this.composer.options.get("sectionType");
            "animroll" === this.composer.options.get("view") && "animative" !== t && this.composer.options.set("sectionType", "animative")
        }
    });
    qe = Object.freeze({
        __proto__: null,
        default: class {
            constructor(t) {
                var t = null == (t = (this.section = t).background) ? void 0 : t.targetImg,
                    e = t && m(t, "ken-burns"),
                    i = t && m(t, "crop");
                this.section.hasKenBurnsEffect = e && !Mi(e) && i && !Mi(i), this.enabled = this.section.hasKenBurnsEffect, this.enabled && (this.imageElement = t, this.kenBurnsAttrs = Di(e, Bi), this.cropAttrs = Di(i, Bi), this.section.on("readyAndActivated, resize", this.setAnimation, this), this.section.on("deactivated", this.removeAnimation, this), this.animTarget = this.section.background.element)
            }
            setAnimation(t) {
                if ("resize" !== t || this.section.active) {
                    const e = (null == (t = this.anim) ? void 0 : t.timeline.progress) || 0;
                    if (null != (t = this.anim) && t.reset(), cancelAnimationFrame(this.ram), this.imageElement.classList.contains(c + "-cropped")) {
                        const i = u(this.kenBurnsAttrs);
                        i && (i.set = u(this.cropAttrs), this.ram = requestAnimationFrame(() => {
                            var t;
                            this.anim = Ii("kenBurns", this.animTarget, "out", i), e && (t = this.anim["timeline"], t.seek(t.duration * e / 100))
                        }))
                    }
                }
            }
            removeAnimation() {
                var t, e;
                null != (t = this.anim) && null != (e = t.reset) && e.call(t), this.anim = void 0
            }
        }
    });

    function $s(i) {
        var s;
        return i.__esModule ? i : (s = Object.defineProperty({}, "__esModule", {
            value: !0
        }), Object.keys(i).forEach(function(t) {
            var e = Object.getOwnPropertyDescriptor(i, t);
            Object.defineProperty(s, t, e.get ? e : {
                enumerable: !0,
                get: function() {
                    return i[t]
                }
            })
        }), s)
    }
    Ze = $s(ue).default;
    const Ys = $s(qe)["default"];
    Ze.registerAddon("kenBurns", class {
        constructor(t) {
            this.composer = t, this.activeSlides = [], t.options.get("disableAnimations") || this.composer.on("sectionReady", this._checkSection, this)
        }
        _checkSection(t, e) {
            e.firstMount && (e.kenBurnsController = new Ys(e), e.hasBackgroundVideo || this.activeSlides.push(e))
        }
    });
    i.registerAddon("detacher", class {
        constructor(t) {
            this.composer = t, this.composerElement = this.composer.element, this.composer.options.register({
                detachBeforeInit: !1,
                restartActiveSections: !0
            }), this._placeHolder = document.createElement("span"), this._placeHolder.style.display = "none", this._placeHolder.dataset.placeholder = this.composerElement.id, this.isDetached = !1, this.disableAutoInit = this.composer.options.get("detachBeforeInit"), this.restartActiveSections = this.composer.options.get("restartActiveSections"), this.disableAutoInit && (this.composer.initTrigger.hold(), this._detach()), this.composer.attach = this._attach.bind(this), this.composer.detach = this._detach.bind(this)
        }
        _detach() {
            this.isDetached || (this.isDetached = !0, this.composer.trigger("beforeDetach"), this.composerElement.parentElement.insertBefore(this._placeHolder, this.composerElement), this.composerElement.remove(), this.composer.trigger("detach"), this.disableAutoInit) || this.composer.navigator.goToIndex(this.composer.navigator.targetIndex, {
                animate: !1
            }, !0)
        }
        _attach(t) {
            this.isDetached && (this.isDetached = !1, this.composer.trigger("beforeAttach"), t ? t.appendChild(this.composerElement) : (this._placeHolder.parentElement.insertBefore(this.composerElement, this._placeHolder), this._placeHolder.remove()), this.disableAutoInit ? (this.disableAutoInit = !1, this.composer.initTrigger.exec()) : (this.composer.layoutController.update(), this.restartActiveSections && this.composer.view.sections.forEach(t => {
                t.reactive()
            }), this.composer.trigger("attach")))
        }
    });
    class qs {
        constructor(t) {
            var e, i = t.element.querySelector(`.${c}-bg-embed`),
                s = null == i ? void 0 : i.querySelector("iframe");
            t.hasBackgroundVideo = !!s, t.hasBackgroundVideo && (s.dataset.src && s.setAttribute("src", s.dataset.src), e = i.querySelector("img"), this.videoWrapper = i, this.videoSource = s, this.videoPoster = e, this.section = t, this.composer = t.composer, t.background.element.appendChild(this.videoWrapper), this._videoState = "initial", this.looped = "false" !== s.getAttribute("data-loop"), this.videoWidth = s.getAttribute("data-width") || 100, this.videoHeight = s.getAttribute("data-height") || 100, this.autoPause = "true" === s.getAttribute("data-auto-pause"), t.background.appendBackground(this.videoWrapper), this.goNext = "true" === s.getAttribute("data-goto-next"), this.videoElement = new D(this.videoSource), this.videoElement.setup(this._videoControllerReady.bind(this)), this.section.readyTrigger.hold(), this.section.on("resize", this._locateBackground.bind(this), this), this.section.on("deactivated, readyAndActivated", this._sectionStateChange.bind(this), this))
        }
        _locateBackground() {
            var t = ((t, e, i) => {
                var s = t.width / e.width,
                    n = t.height / e.height,
                    s = Math.max(s, n);
                let o = e.height * s,
                    r = e.width * s;
                n = o - t.height;
                return n <= i && (e = r / o, o = o + i - n, r = (o + i - n) * e), {
                    width: r,
                    height: o
                }
            })(this.section.element.getBoundingClientRect(), {
                width: this.videoWidth,
                height: this.videoHeight
            }, "vimeo" === this.videoElement.type ? 0 : 120);
            this.videoWrapper.style.width = t.width + "px", this.videoWrapper.style.height = t.height + "px"
        }
        _videoControllerReady() {
            this.videoReady || (this.videoReady = !0, this._onVideoPlay = this._onVideoPlay.bind(this), this._onVideoPause = this._onVideoPause.bind(this), this._onVideoEnded = this._onVideoEnded.bind(this), this.videoElement.on("play", this._onVideoPlay), this.videoElement.on("pause", this._onVideoPause), this.videoElement.on("ended", this._onVideoEnded), this._locateBackground(), this.section.readyTrigger.exec(), this.section.active && this.section.isReady ? this.videoElement.play() : this.videoElement.pause(), this.section.trigger("backgroundEmbedVideoReady", [this.section], !0), this.composer.on("attach", () => {
                "playing" === this._videoState && this.videoElement.play()
            }))
        }
        _sectionStateChange(t) {
            if (this.videoReady) switch (t) {
                case "readyAndActivated":
                default:
                    this.videoElement.play();
                    break;
                case "deactivated":
                    this.videoElement.pause(), this.autoPause || this.videoElement.stop()
            }
        }
        _onVideoPlay() {
            this._videoState = "playing", this.videoPoster && this.videoPoster.classList.remove(`.${c}-bg-embed-show-poster`), this.section.trigger("backgroundEmbedVideoPlay", [this], !0)
        }
        _onVideoPause() {
            this._videoState = "stopped", this.videoPoster && this.videoPoster.classList.add(`.${c}-bg-embed-show-poster`), this.section.trigger("backgroundEmbedVideoPause", [this], !0)
        }
        _onVideoEnded() {
            this._videoState = "ended", this.section.trigger("backgroundEmbedVideoEnded", [this], !0), this.goNext ? this.composer.navigator.next() : this.looped ? this.videoElement.play() : this.looped || (this.videoElement.play(), this.videoElement.pause())
        }
    }
    i.registerAddon("sectionBackgroundEmbedVideo", class {
        constructor(t) {
            this.composer = t, this.activeSlides = [], this.composer.on("sectionBeforeMount", this._checkSection, this)
        }
        _checkSection(t, e) {
            e.firstMount && (e.backgroundVideoController = new qs(e), e.hasBackgroundVideo || this.activeSlides.push(e))
        }
    });
    const Xs = {
        never: {
            setBehavior: t => {
                document.cookie = `depicter_display_${t}=never_show` + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"
            },
            shouldDisplay: t => {
                return -1 === document.cookie.indexOf(`depicter_display_${t}=never_show`)
            }
        },
        return: {
            setBehavior: t => {
                sessionStorage.setItem("depicter_display_" + t, "true")
            },
            shouldDisplay: t => "true" !== sessionStorage.getItem("depicter_display_" + t)
        },
        afterPeriod: {
            setBehavior: (t, e) => {
                t = `depicter_display_${t}=show_again`, e = new Date(Date.now() + 1e3 * e);
                document.cookie = t + `; expires=${e.toUTCString()}; path=/`
            },
            shouldDisplay: t => {
                return -1 !== document.cookie.indexOf(`depicter_display_${t}=show_again`)
            }
        }
    };
    const Zs = new Map;
    Zs.set("overlay", class {
        constructor(t) {
            this.controller = t, this.options = this.controller.displayController.options, this.options.register({
                backdrop: !0
            }), this.options.get("backdrop") && t.on("afterSetup", this._setup, this)
        }
        _setup() {
            var {
                element: t
            } = this.controller["displayController"], e = document.createElement("div");
            e.classList.add(c + "-backdrop"), this.controller.on("beforeOpen", () => {
                this.element.style.display = ""
            }), this.controller.on("close", () => {
                this.element.style.display = "none"
            }), t.appendChild(e), this.element = e
        }
    }), Zs.set("toggleAnimation", class extends t {
        constructor(t) {
            super(), this.controller = t, this.parentEmitter = t, this.controller.on("afterSetup", this._setup, this)
        }
        _setup() {
            var t = this.controller["displayController"];
            this.element = this.controller.composer.element, this.displayController = t, this.animationWrap = document.createElement("div"), this.animationWrap.classList.add(c + "-display-animation-wrap"), this.animationWrap.appendChild(this.element), t.contentWrap.appendChild(this.animationWrap), t.attachContainer = this.animationWrap, this.inOutAnimation = new Vi(this, this.element, this.animationWrap, !0), (this.controller.toggleAnimation = this).controller.on("beforeOpen, beforeClose", this._controlAnimation, this)
        }
        _updateClassName(t) {
            this._lastStatus && this.displayController.element.classList.remove(c + "-animation-" + this._lastStatus), this.displayController.element.classList.add(c + "-animation-" + t), this._lastStatus = t
        }
        _controlAnimation(t) {
            "beforeOpen" === t ? (this.show(), this._updateClassName("in-start"), this.once("animationInEnd", () => {
                this._updateClassName("in-end")
            })) : (this.displayController.detachTrigger.hold(), this.hide(), this._updateClassName("out-start"), this.once("animationOutEnd", () => {
                this.displayController.detachTrigger.exec(), this._updateClassName("out-end")
            }))
        }
    }), Zs.set("statusClassName", class {
        constructor(t) {
            this.controller = t, this.controller.on("beforeClose", () => {
                this._updateClassName("before-close")
            }), this.controller.on("close", () => {
                this._updateClassName("close")
            }), this.controller.on("beforeOpen", () => {
                this._updateClassName("before-open")
            }), this.controller.on("open", () => {
                this._updateClassName("open")
            })
        }
        _updateClassName(t) {
            this._lastStatus && this.controller.element.classList.remove(c + "-status-" + this._lastStatus), this.controller.element.classList.add(c + "-status-" + t), this._lastStatus = t
        }
    }), Zs.set("displayAgain", class {
        constructor(t) {
            this.controller = t, this.controller.options.register({
                displayAgain: "once",
                displayAgainPeriod: 0
            }), t.on("afterSetup", this._setup, this), this.controller.doSetupTriggers.hold()
        }
        _setup() {
            var t = this.controller["options"],
                e = t.get("displayAgain"),
                t = t.get("id");
            Xs[e] && !Xs[e].shouldDisplay(t) ? this.controller.doSetupTriggers.invalidate() : (this.controller.doSetupTriggers.exec(), this.controller.on("close", this._afterClose, this))
        }
        _afterClose() {
            var t = this.controller["options"],
                e = t.get("displayAgain"),
                i = t.get("id"),
                t = t.get("displayAgainPeriod");
            "always" !== e && this.controller.cleanupTriggers(), null != (e = Xs[e]) && e.setBehavior(i, t)
        }
    }), Zs.set("displayActions", class {
        constructor(t) {
            this.controller = t, this.composer = this.controller.composer, this.composer.on("afterSetupActions", this._setup, this)
        }
        _setup(t, e) {
            this.composer.actions = w(w({}, e), {}, {
                close: () => {
                    this.controller.close()
                }
            })
        }
    });
    class Gs extends t {
        constructor(t, e) {
            super(), this.composer = e, this.eventPrefix = "display", this.parentEmitter = t, this.controller = t, this.options = new a, this._doDetach = this._doDetach.bind(this)
        }
        setup() {
            this.element = document.createElement("div"), this.element.classList.add(c + "-display-container"), this.contentWrap = document.createElement("div"), this.contentWrap.classList.add(c + "-content-wrap"), this.element.appendChild(this.contentWrap), this.controller.element = this.element, this.composer.on("layoutSetup", () => {
                var t = this.composer.options.get("layout");
                "boxed" === t && $(this.composer.options.get("width"), t => {
                    this.contentWrap.style.maxWidth = t + "px"
                }), this.element.classList.add(c + "-content-layout-" + t)
            }), this.detachTrigger = new g(this._doDetach), this.attachContainer = this.contentWrap
        }
        _doDetach() {
            this.composer.detach(), this.trigger("close"), this.detachTrigger.reset()
        }
        open() {
            this.isOpen || (this.isOpen = !0, this.trigger("beforeOpen"), this.composer.attach(this.attachContainer), this.trigger("open"))
        }
        close() {
            this.isOpen && (this.isOpen = !1, this.trigger("beforeClose"), this.detachTrigger.exec())
        }
        toggle() {
            this.isOpen ? this.close() : this.open()
        }
    }
    const Us = new Map;
    Us.set("banner-bar", class extends Gs {
        constructor(t, e) {
            super(t, e), this.options.register({
                placement: "top",
                position: "sticky",
                space: "0px",
                placeHolder: void 0
            })
        }
        setup() {
            super.setup(), this.element.classList.add(c + "-banner-bar-container"), this.locateContainer()
        }
        locateContainer() {
            this.element.parentElement && this.element.remove();
            var t = this.options.get("placement"),
                e = this.options.get("placeHolder"),
                i = this.options.get("position"),
                e = document.querySelector(e) || document.body;
            this.element.classList.add(c + "-placement-" + t), this.element.classList.add(c + "-position-" + i), "top" === t ? (e.prepend(this.element), this.element.style.top = this.options.get("space")) : "bottom" === t && (e.appendChild(this.element), this.element.style.bottom = this.options.get("space"))
        }
    }), Us.set("popup", class extends Gs {
        constructor(t, e) {
            super(t, e), this.options.register({
                placement: "mc"
            })
        }
        setup() {
            super.setup(), this.element.classList.add(c + "-popup-container"), this.locateContainer()
        }
        locateContainer() {
            this.element.parentElement && this.element.remove();
            var t = this.options.get("placement"),
                e = this.options.get("placeHolder"),
                e = document.querySelector(e) || document.body;
            this.element.classList.add(c + "-placement-h-" + t.charAt(1)), this.element.classList.add(c + "-placement-v-" + t.charAt(0)), e.appendChild(this.element)
        }
    });
    var Ks = Object.freeze({
        __proto__: null,
        interact: (t, n) => {
            let {
                event: o,
                selector: r
            } = t;
            return new Promise(e => {
                const t = document.querySelectorAll(r),
                    i = () => {
                        t.forEach(t => t.removeEventListener(o, s))
                    },
                    s = t => {
                        e(t), i()
                    };
                null != n && n.push(i), t.forEach(t => t.addEventListener(o, s))
            })
        },
        wait: t => {
            let e = t["duration"];
            return new Promise(t => setTimeout(t, e))
        },
        scroll: (t, s) => {
            let n = t["percentage"];
            return new Promise(t => {
                function e() {
                    window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100 >= n ? (t(), i()) : window.requestAnimationFrame(e)
                }
                const i = () => {
                    window.removeEventListener("scroll", e)
                };
                null != s && s.push(i), window.addEventListener("scroll", e), e()
            })
        },
        exitIntent: (t, o) => {
            let {
                thresholdArea: r = 0,
                delay: a = 0
            } = t;
            return new Promise(e => {
                let i = null;
                const t = () => {
                        clearTimeout(i)
                    },
                    s = t => {
                        t.clientY <= r && (i = setTimeout(() => {
                            e(), n()
                        }, a))
                    },
                    n = () => {
                        window.removeEventListener("mouseout", s), window.removeEventListener("mouseenter", t)
                    };
                null != o && o.push(n), window.addEventListener("mouseout", s), window.addEventListener("mouseenter", t)
            })
        },
        inactivity: (t, n) => {
            let o = t["time"];
            return new Promise(t => {
                let e = setTimeout(() => {
                    t()
                }, o);
                const i = () => {
                        clearTimeout(e), e = setTimeout(() => {
                            t(), s()
                        }, o)
                    },
                    s = () => {
                        document.removeEventListener("mousemove", i), document.removeEventListener("keydown", i), document.removeEventListener("scroll", i)
                    };
                null != n && n.push(s), document.addEventListener("mousemove", i), document.addEventListener("keydown", i), document.addEventListener("scroll", i)
            })
        },
        waitForHover: (t, r) => {
            let {
                selector: a,
                time: h
            } = t;
            return new Promise(t => {
                const e = document.querySelectorAll(a);
                let i;
                const s = () => {
                        i = setTimeout(() => {
                            t(!0), o()
                        }, h)
                    },
                    n = () => {
                        clearTimeout(i)
                    },
                    o = (e.forEach(t => {
                        t.addEventListener("mouseover", s), t.addEventListener("mouseout", n)
                    }), () => {
                        e.forEach(t => {
                            t.removeEventListener("mouseover", s), t.removeEventListener("mouseout", n)
                        })
                    });
                null != r && r.push(o)
            })
        }
    });
    const Js = t => Promise.race(t.map(t => Promise.all(t))),
        Qs = [
            [{
                name: "exitIntent",
                params: {
                    delay: 600
                }
            }]
        ];
    class tn extends t {
        constructor(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : Qs,
                i = (super(), this.options = new a, this.triggers = i, this.options.register({
                    type: "popup",
                    id: "",
                    displayOptions: {},
                    excludeAddons: []
                }), this.options.inject(e), this.composer = t, Us.get(this.options.get("type")));
            this.displayController = new i(this, t), this.open = this.displayController.open.bind(this.displayController), this.close = this.displayController.close.bind(this.displayController), this.toggle = this.displayController.toggle.bind(this.displayController), this.options.chain("displayOptions", this.displayController.options), this._setupTriggers = this._setupTriggers.bind(this), this.doSetupTriggers = new g(this._setupTriggers)
        }
        setup() {
            this.trigger("beforeSetup"), this._setupAddons(), this.displayController.setup(), this.trigger("afterSetup"), this.doSetupTriggers.exec()
        }
        cleanupTriggers() {
            this.triggersCleanup.forEach(t => t())
        }
        _setupTriggers() {
            this.trigger("beforeTriggersSetup"), this.triggersCleanup = [];
            const e = () => {
                var t, i;
                t = this.triggers, i = this.triggersCleanup, Js(t.map(t => t.map(t => {
                    var {
                        name: t,
                        params: e
                    } = t;
                    return (null == Ks ? void 0 : Ks[t](e, i)) || !1
                }).filter(t => t))).then(() => {
                    this.trigger("triggers"), this.open(), this.cleanupTriggers(), e()
                })
            };
            e(), this.trigger("afterTriggersSetup")
        }
        _setupAddons() {
            this.addons = {};
            const i = this.options.get("excludeAddons");
            this.trigger("beforeSetupAddons"), Zs.forEach((t, e) => {
                i.includes(e) || (this.addons[e] = new t(this))
            }), this.trigger("afterSetupAddons")
        }
    }
    const en = [];
    window.depicterInstances = en;
    class sn extends i {
        static setup(t, i) {
            t = Array.from(document.querySelectorAll(t)).filter(e => !en.find(t => {
                t = t.element;
                return t === e
            })).map(t => {
                var e = new sn;
                return e.setup(t, i), en.push(e), e
            });
            return null == t ? void 0 : t[0]
        }
        setup(t) {
            super.setup(t, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}), this.options.register({})
        }
    }

    function nn() {
        window.DepicterDisableAutoInit || sn.initAll()
    }
    return sn.version = "2.0.3", sn.author = {
        name: "Averta",
        url: "https://averta.net"
    }, sn.display = (t, e) => {
        t = new tn(t, e);
        return t.setup(), t
    }, window.Depicter ? console.warn("Another instance of Depicter module found on the page.") : "complete" === document.readyState ? setTimeout(nn, 20) : document.addEventListener("DOMContentLoaded", nn), sn
});
//# sourceMappingURL=depicter.js.map