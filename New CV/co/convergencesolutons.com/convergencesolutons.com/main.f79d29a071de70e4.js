"use strict";
(self.webpackChunkcon_app = self.webpackChunkcon_app || []).push([
    [179], {
        709: (Xa, Df, Vi) => {
            function de(e) {
                return "function" == typeof e
            }

            function Ja(e) {
                const n = e(r => {
                    Error.call(r), r.stack = (new Error).stack
                });
                return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
            }
            const el = Ja(e => function(n) {
                e(this), this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map((r,o)=>`${o+1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = n
            });

            function tl(e, t) {
                if (e) {
                    const n = e.indexOf(t);
                    0 <= n && e.splice(n, 1)
                }
            }
            class bt {
                constructor(t) {
                    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
                }
                unsubscribe() {
                    let t;
                    if (!this.closed) {
                        this.closed = !0;
                        const {
                            _parentage: n
                        } = this;
                        if (n)
                            if (this._parentage = null, Array.isArray(n))
                                for (const i of n) i.remove(this);
                            else n.remove(this);
                        const {
                            initialTeardown: r
                        } = this;
                        if (de(r)) try {
                            r()
                        } catch (i) {
                            t = i instanceof el ? i.errors : [i]
                        }
                        const {
                            _finalizers: o
                        } = this;
                        if (o) {
                            this._finalizers = null;
                            for (const i of o) try {
                                Sf(i)
                            } catch (s) {
                                t = t ? ? [], s instanceof el ? t = [...t, ...s.errors] : t.push(s)
                            }
                        }
                        if (t) throw new el(t)
                    }
                }
                add(t) {
                    var n;
                    if (t && t !== this)
                        if (this.closed) Sf(t);
                        else {
                            if (t instanceof bt) {
                                if (t.closed || t._hasParent(this)) return;
                                t._addParent(this)
                            }(this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                        }
                }
                _hasParent(t) {
                    const {
                        _parentage: n
                    } = this;
                    return n === t || Array.isArray(n) && n.includes(t)
                }
                _addParent(t) {
                    const {
                        _parentage: n
                    } = this;
                    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
                }
                _removeParent(t) {
                    const {
                        _parentage: n
                    } = this;
                    n === t ? this._parentage = null : Array.isArray(n) && tl(n, t)
                }
                remove(t) {
                    const {
                        _finalizers: n
                    } = this;
                    n && tl(n, t), t instanceof bt && t._removeParent(this)
                }
            }
            bt.EMPTY = (() => {
                const e = new bt;
                return e.closed = !0, e
            })();
            const Mf = bt.EMPTY;

            function Ef(e) {
                return e instanceof bt || e && "closed" in e && de(e.remove) && de(e.add) && de(e.unsubscribe)
            }

            function Sf(e) {
                de(e) ? e() : e.unsubscribe()
            }
            const zn = {
                    onUnhandledError: null,
                    onStoppedNotification: null,
                    Promise: void 0,
                    useDeprecatedSynchronousErrorHandling: !1,
                    useDeprecatedNextContext: !1
                },
                ji = {
                    setTimeout(e, t, ...n) {
                        const {
                            delegate: r
                        } = ji;
                        return r ? .setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
                    },
                    clearTimeout(e) {
                        const {
                            delegate: t
                        } = ji;
                        return (t ? .clearTimeout || clearTimeout)(e)
                    },
                    delegate: void 0
                };

            function If(e) {
                ji.setTimeout(() => {
                    const {
                        onUnhandledError: t
                    } = zn;
                    if (!t) throw e;
                    t(e)
                })
            }

            function nl() {}
            const v1 = rl("C", void 0, void 0);

            function rl(e, t, n) {
                return {
                    kind: e,
                    value: t,
                    error: n
                }
            }
            let Gn = null;

            function Bi(e) {
                if (zn.useDeprecatedSynchronousErrorHandling) {
                    const t = !Gn;
                    if (t && (Gn = {
                            errorThrown: !1,
                            error: null
                        }), e(), t) {
                        const {
                            errorThrown: n,
                            error: r
                        } = Gn;
                        if (Gn = null, n) throw r
                    }
                } else e()
            }
            class ol extends bt {
                constructor(t) {
                    super(), this.isStopped = !1, t ? (this.destination = t, Ef(t) && t.add(this)) : this.destination = M1
                }
                static create(t, n, r) {
                    return new vo(t, n, r)
                }
                next(t) {
                    this.isStopped ? sl(function C1(e) {
                        return rl("N", e, void 0)
                    }(t), this) : this._next(t)
                }
                error(t) {
                    this.isStopped ? sl(function y1(e) {
                        return rl("E", void 0, e)
                    }(t), this) : (this.isStopped = !0, this._error(t))
                }
                complete() {
                    this.isStopped ? sl(v1, this) : (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
                }
                _next(t) {
                    this.destination.next(t)
                }
                _error(t) {
                    try {
                        this.destination.error(t)
                    } finally {
                        this.unsubscribe()
                    }
                }
                _complete() {
                    try {
                        this.destination.complete()
                    } finally {
                        this.unsubscribe()
                    }
                }
            }
            const w1 = Function.prototype.bind;

            function il(e, t) {
                return w1.call(e, t)
            }
            class b1 {
                constructor(t) {
                    this.partialObserver = t
                }
                next(t) {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.next) try {
                        n.next(t)
                    } catch (r) {
                        Ui(r)
                    }
                }
                error(t) {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.error) try {
                        n.error(t)
                    } catch (r) {
                        Ui(r)
                    } else Ui(t)
                }
                complete() {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.complete) try {
                        t.complete()
                    } catch (n) {
                        Ui(n)
                    }
                }
            }
            class vo extends ol {
                constructor(t, n, r) {
                    let o;
                    if (super(), de(t) || !t) o = {
                        next: t ? ? void 0,
                        error: n ? ? void 0,
                        complete: r ? ? void 0
                    };
                    else {
                        let i;
                        this && zn.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                            next: t.next && il(t.next, i),
                            error: t.error && il(t.error, i),
                            complete: t.complete && il(t.complete, i)
                        }) : o = t
                    }
                    this.destination = new b1(o)
                }
            }

            function Ui(e) {
                zn.useDeprecatedSynchronousErrorHandling ? function _1(e) {
                    zn.useDeprecatedSynchronousErrorHandling && Gn && (Gn.errorThrown = !0, Gn.error = e)
                }(e) : If(e)
            }

            function sl(e, t) {
                const {
                    onStoppedNotification: n
                } = zn;
                n && ji.setTimeout(() => n(e, t))
            }
            const M1 = {
                    closed: !0,
                    next: nl,
                    error: function D1(e) {
                        throw e
                    },
                    complete: nl
                },
                al = "function" == typeof Symbol && Symbol.observable || "@@observable";

            function Wn(e) {
                return e
            }

            function Pf(e) {
                return 0 === e.length ? Wn : 1 === e.length ? e[0] : function(n) {
                    return e.reduce((r, o) => o(r), n)
                }
            }
            let ye = (() => {
                class e {
                    constructor(n) {
                        n && (this._subscribe = n)
                    }
                    lift(n) {
                        const r = new e;
                        return r.source = this, r.operator = n, r
                    }
                    subscribe(n, r, o) {
                        const i = function I1(e) {
                            return e && e instanceof ol || function S1(e) {
                                return e && de(e.next) && de(e.error) && de(e.complete)
                            }(e) && Ef(e)
                        }(n) ? n : new vo(n, r, o);
                        return Bi(() => {
                            const {
                                operator: s,
                                source: a
                            } = this;
                            i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                        }), i
                    }
                    _trySubscribe(n) {
                        try {
                            return this._subscribe(n)
                        } catch (r) {
                            n.error(r)
                        }
                    }
                    forEach(n, r) {
                        return new(r = Of(r))((o, i) => {
                            const s = new vo({
                                next: a => {
                                    try {
                                        n(a)
                                    } catch (l) {
                                        i(l), s.unsubscribe()
                                    }
                                },
                                error: i,
                                complete: o
                            });
                            this.subscribe(s)
                        })
                    }
                    _subscribe(n) {
                        var r;
                        return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                    }[al]() {
                        return this
                    }
                    pipe(...n) {
                        return Pf(n)(this)
                    }
                    toPromise(n) {
                        return new(n = Of(n))((r, o) => {
                            let i;
                            this.subscribe(s => i = s, s => o(s), () => r(i))
                        })
                    }
                }
                return e.create = t => new e(t), e
            })();

            function Of(e) {
                var t;
                return null !== (t = e ? ? zn.Promise) && void 0 !== t ? t : Promise
            }
            const P1 = Ja(e => function() {
                e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            });
            let Wt = (() => {
                class e extends ye {
                    constructor() {
                        super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    }
                    lift(n) {
                        const r = new xf(this, this);
                        return r.operator = n, r
                    }
                    _throwIfClosed() {
                        if (this.closed) throw new P1
                    }
                    next(n) {
                        Bi(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                                for (const r of this.currentObservers) r.next(n)
                            }
                        })
                    }
                    error(n) {
                        Bi(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.hasError = this.isStopped = !0, this.thrownError = n;
                                const {
                                    observers: r
                                } = this;
                                for (; r.length;) r.shift().error(n)
                            }
                        })
                    }
                    complete() {
                        Bi(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.isStopped = !0;
                                const {
                                    observers: n
                                } = this;
                                for (; n.length;) n.shift().complete()
                            }
                        })
                    }
                    unsubscribe() {
                        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                    }
                    get observed() {
                        var n;
                        return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                    }
                    _trySubscribe(n) {
                        return this._throwIfClosed(), super._trySubscribe(n)
                    }
                    _subscribe(n) {
                        return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
                    }
                    _innerSubscribe(n) {
                        const {
                            hasError: r,
                            isStopped: o,
                            observers: i
                        } = this;
                        return r || o ? Mf : (this.currentObservers = null, i.push(n), new bt(() => {
                            this.currentObservers = null, tl(i, n)
                        }))
                    }
                    _checkFinalizedStatuses(n) {
                        const {
                            hasError: r,
                            thrownError: o,
                            isStopped: i
                        } = this;
                        r ? n.error(o) : i && n.complete()
                    }
                    asObservable() {
                        const n = new ye;
                        return n.source = this, n
                    }
                }
                return e.create = (t, n) => new xf(t, n), e
            })();
            class xf extends Wt {
                constructor(t, n) {
                    super(), this.destination = t, this.source = n
                }
                next(t) {
                    var n, r;
                    null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
                }
                error(t) {
                    var n, r;
                    null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
                }
                complete() {
                    var t, n;
                    null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
                }
                _subscribe(t) {
                    var n, r;
                    return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : Mf
                }
            }

            function Af(e) {
                return de(e ? .lift)
            }

            function xe(e) {
                return t => {
                    if (Af(t)) return t.lift(function(n) {
                        try {
                            return e(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                    throw new TypeError("Unable to lift unknown Observable type")
                }
            }

            function De(e, t, n, r, o) {
                return new O1(e, t, n, r, o)
            }
            class O1 extends ol {
                constructor(t, n, r, o, i, s) {
                    super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function(a) {
                        try {
                            n(a)
                        } catch (l) {
                            t.error(l)
                        }
                    } : super._next, this._error = o ? function(a) {
                        try {
                            o(a)
                        } catch (l) {
                            t.error(l)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._error, this._complete = r ? function() {
                        try {
                            r()
                        } catch (a) {
                            t.error(a)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._complete
                }
                unsubscribe() {
                    var t;
                    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                        const {
                            closed: n
                        } = this;
                        super.unsubscribe(), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                    }
                }
            }

            function W(e, t) {
                return xe((n, r) => {
                    let o = 0;
                    n.subscribe(De(r, i => {
                        r.next(e.call(t, i, o++))
                    }))
                })
            }

            function qn(e) {
                return this instanceof qn ? (this.v = e, this) : new qn(e)
            }

            function T1(e, t, n) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var o, r = n.apply(e, t || []),
                    i = [];
                return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function() {
                    return this
                }, o;

                function s(g) {
                    r[g] && (o[g] = function(m) {
                        return new Promise(function(y, C) {
                            i.push([g, m, y, C]) > 1 || a(g, m)
                        })
                    })
                }

                function a(g, m) {
                    try {
                        ! function l(g) {
                            g.value instanceof qn ? Promise.resolve(g.value.v).then(c, u) : h(i[0][2], g)
                        }(r[g](m))
                    } catch (y) {
                        h(i[0][3], y)
                    }
                }

                function c(g) {
                    a("next", g)
                }

                function u(g) {
                    a("throw", g)
                }

                function h(g, m) {
                    g(m), i.shift(), i.length && a(i[0][0], i[0][1])
                }
            }

            function k1(e) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var n, t = e[Symbol.asyncIterator];
                return t ? t.call(e) : (e = function Rf(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }(e), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
                    return this
                }, n);

                function r(i) {
                    n[i] = e[i] && function(s) {
                        return new Promise(function(a, l) {
                            ! function o(i, s, a, l) {
                                Promise.resolve(l).then(function(c) {
                                    i({
                                        value: c,
                                        done: a
                                    })
                                }, s)
                            }(a, l, (s = e[i](s)).done, s.value)
                        })
                    }
                }
            }
            const Nf = e => e && "number" == typeof e.length && "function" != typeof e;

            function Ff(e) {
                return de(e ? .then)
            }

            function Lf(e) {
                return de(e[al])
            }

            function Vf(e) {
                return Symbol.asyncIterator && de(e ? .[Symbol.asyncIterator])
            }

            function jf(e) {
                return new TypeError(`You provided ${null!==e&&"object"==typeof e?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
            }
            const Bf = function N1() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }();

            function Uf(e) {
                return de(e ? .[Bf])
            }

            function Hf(e) {
                return T1(this, arguments, function*() {
                    const n = e.getReader();
                    try {
                        for (;;) {
                            const {
                                value: r,
                                done: o
                            } = yield qn(n.read());
                            if (o) return yield qn(void 0);
                            yield yield qn(r)
                        }
                    } finally {
                        n.releaseLock()
                    }
                })
            }

            function $f(e) {
                return de(e ? .getReader)
            }

            function Dt(e) {
                if (e instanceof ye) return e;
                if (null != e) {
                    if (Lf(e)) return function F1(e) {
                        return new ye(t => {
                            const n = e[al]();
                            if (de(n.subscribe)) return n.subscribe(t);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        })
                    }(e);
                    if (Nf(e)) return function L1(e) {
                        return new ye(t => {
                            for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                            t.complete()
                        })
                    }(e);
                    if (Ff(e)) return function V1(e) {
                        return new ye(t => {
                            e.then(n => {
                                t.closed || (t.next(n), t.complete())
                            }, n => t.error(n)).then(null, If)
                        })
                    }(e);
                    if (Vf(e)) return zf(e);
                    if (Uf(e)) return function j1(e) {
                        return new ye(t => {
                            for (const n of e)
                                if (t.next(n), t.closed) return;
                            t.complete()
                        })
                    }(e);
                    if ($f(e)) return function B1(e) {
                        return zf(Hf(e))
                    }(e)
                }
                throw jf(e)
            }

            function zf(e) {
                return new ye(t => {
                    (function U1(e, t) {
                        var n, r, o, i;
                        return function x1(e, t, n, r) {
                            return new(n || (n = Promise))(function(i, s) {
                                function a(u) {
                                    try {
                                        c(r.next(u))
                                    } catch (h) {
                                        s(h)
                                    }
                                }

                                function l(u) {
                                    try {
                                        c(r.throw(u))
                                    } catch (h) {
                                        s(h)
                                    }
                                }

                                function c(u) {
                                    u.done ? i(u.value) : function o(i) {
                                        return i instanceof n ? i : new n(function(s) {
                                            s(i)
                                        })
                                    }(u.value).then(a, l)
                                }
                                c((r = r.apply(e, t || [])).next())
                            })
                        }(this, void 0, void 0, function*() {
                            try {
                                for (n = k1(e); !(r = yield n.next()).done;)
                                    if (t.next(r.value), t.closed) return
                            } catch (s) {
                                o = {
                                    error: s
                                }
                            } finally {
                                try {
                                    r && !r.done && (i = n.return) && (yield i.call(n))
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            t.complete()
                        })
                    })(e, t).catch(n => t.error(n))
                })
            }

            function dn(e, t, n, r = 0, o = !1) {
                const i = t.schedule(function() {
                    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
                }, r);
                if (e.add(i), !o) return i
            }

            function Le(e, t, n = 1 / 0) {
                return de(t) ? Le((r, o) => W((i, s) => t(r, i, o, s))(Dt(e(r, o))), n) : ("number" == typeof t && (n = t), xe((r, o) => function H1(e, t, n, r, o, i, s, a) {
                    const l = [];
                    let c = 0,
                        u = 0,
                        h = !1;
                    const g = () => {
                            h && !l.length && !c && t.complete()
                        },
                        m = C => c < r ? y(C) : l.push(C),
                        y = C => {
                            i && t.next(C), c++;
                            let _ = !1;
                            Dt(n(C, u++)).subscribe(De(t, D => {
                                o ? .(D), i ? m(D) : t.next(D)
                            }, () => {
                                _ = !0
                            }, void 0, () => {
                                if (_) try {
                                    for (c--; l.length && c < r;) {
                                        const D = l.shift();
                                        s ? dn(t, s, () => y(D)) : y(D)
                                    }
                                    g()
                                } catch (D) {
                                    t.error(D)
                                }
                            }))
                        };
                    return e.subscribe(De(t, m, () => {
                        h = !0, g()
                    })), () => {
                        a ? .()
                    }
                }(r, o, e, n)))
            }

            function gr(e = 1 / 0) {
                return Le(Wn, e)
            }
            const qt = new ye(e => e.complete());

            function cl(e) {
                return e[e.length - 1]
            }

            function Gf(e) {
                return de(cl(e)) ? e.pop() : void 0
            }

            function yo(e) {
                return function z1(e) {
                    return e && de(e.schedule)
                }(cl(e)) ? e.pop() : void 0
            }

            function Wf(e, t = 0) {
                return xe((n, r) => {
                    n.subscribe(De(r, o => dn(r, e, () => r.next(o), t), () => dn(r, e, () => r.complete(), t), o => dn(r, e, () => r.error(o), t)))
                })
            }

            function qf(e, t = 0) {
                return xe((n, r) => {
                    r.add(e.schedule(() => n.subscribe(r), t))
                })
            }

            function Kf(e, t) {
                if (!e) throw new Error("Iterable cannot be null");
                return new ye(n => {
                    dn(n, t, () => {
                        const r = e[Symbol.asyncIterator]();
                        dn(n, t, () => {
                            r.next().then(o => {
                                o.done ? n.complete() : n.next(o.value)
                            })
                        }, 0, !0)
                    })
                })
            }

            function Me(e, t) {
                return t ? function Q1(e, t) {
                    if (null != e) {
                        if (Lf(e)) return function W1(e, t) {
                            return Dt(e).pipe(qf(t), Wf(t))
                        }(e, t);
                        if (Nf(e)) return function K1(e, t) {
                            return new ye(n => {
                                let r = 0;
                                return t.schedule(function() {
                                    r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
                                })
                            })
                        }(e, t);
                        if (Ff(e)) return function q1(e, t) {
                            return Dt(e).pipe(qf(t), Wf(t))
                        }(e, t);
                        if (Vf(e)) return Kf(e, t);
                        if (Uf(e)) return function Z1(e, t) {
                            return new ye(n => {
                                let r;
                                return dn(n, t, () => {
                                    r = e[Bf](), dn(n, t, () => {
                                        let o, i;
                                        try {
                                            ({
                                                value: o,
                                                done: i
                                            } = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        i ? n.complete() : n.next(o)
                                    }, 0, !0)
                                }), () => de(r ? .return) && r.return()
                            })
                        }(e, t);
                        if ($f(e)) return function Y1(e, t) {
                            return Kf(Hf(e), t)
                        }(e, t)
                    }
                    throw jf(e)
                }(e, t) : Dt(e)
            }

            function ul(e, t, ...n) {
                if (!0 === t) return void e();
                if (!1 === t) return;
                const r = new vo({
                    next: () => {
                        r.unsubscribe(), e()
                    }
                });
                return t(...n).subscribe(r)
            }

            function ie(e) {
                for (let t in e)
                    if (e[t] === ie) return t;
                throw Error("Could not find renamed property on target object.")
            }

            function dl(e, t) {
                for (const n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n])
            }

            function ae(e) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return "[" + e.map(ae).join(", ") + "]";
                if (null == e) return "" + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const t = e.toString();
                if (null == t) return "" + t;
                const n = t.indexOf("\n");
                return -1 === n ? t : t.substring(0, n)
            }

            function fl(e, t) {
                return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
            }
            const e0 = ie({
                __forward_ref__: ie
            });

            function le(e) {
                return e.__forward_ref__ = le, e.toString = function() {
                    return ae(this())
                }, e
            }

            function N(e) {
                return hl(e) ? e() : e
            }

            function hl(e) {
                return "function" == typeof e && e.hasOwnProperty(e0) && e.__forward_ref__ === le
            }

            function pl(e) {
                return e && !!e.\u0275providers
            }
            const Zf = "https://g.co/ng/security#xss";
            class E extends Error {
                constructor(t, n) {
                    super(function Hi(e, t) {
                        return `NG0${Math.abs(e)}${t?": "+t.trim():""}`
                    }(t, n)), this.code = t
                }
            }

            function j(e) {
                return "string" == typeof e ? e : null == e ? "" : String(e)
            }

            function $i(e, t) {
                throw new E(-201, !1)
            }

            function Mt(e, t) {
                null == e && function ne(e, t, n, r) {
                    throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
                }(t, e, null, "!=")
            }

            function A(e) {
                return {
                    token: e.token,
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0
                }
            }

            function it(e) {
                return {
                    providers: e.providers || [],
                    imports: e.imports || []
                }
            }

            function zi(e) {
                return Yf(e, Gi) || Yf(e, Xf)
            }

            function Yf(e, t) {
                return e.hasOwnProperty(t) ? e[t] : null
            }

            function Qf(e) {
                return e && (e.hasOwnProperty(gl) || e.hasOwnProperty(u0)) ? e[gl] : null
            }
            const Gi = ie({\
                    u0275prov: ie
                }),
                gl = ie({\
                    u0275inj: ie
                }),
                Xf = ie({
                    ngInjectableDef: ie
                }),
                u0 = ie({
                    ngInjectorDef: ie
                });
            var F = (() => ((F = F || {})[F.Default = 0] = "Default", F[F.Host = 1] = "Host", F[F.Self = 2] = "Self", F[F.SkipSelf = 4] = "SkipSelf", F[F.Optional = 8] = "Optional", F))();
            let ml;

            function Et(e) {
                const t = ml;
                return ml = e, t
            }

            function Jf(e, t, n) {
                const r = zi(e);
                return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & F.Optional ? null : void 0 !== t ? t : void $i(ae(e))
            }
            const ce = (() => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)(),
                Co = {},
                vl = "__NG_DI_FLAG__",
                Wi = "ngTempTokenPath",
                h0 = /\n/gm,
                eh = "__source";
            let _o;

            function mr(e) {
                const t = _o;
                return _o = e, t
            }

            function g0(e, t = F.Default) {
                if (void 0 === _o) throw new E(-203, !1);
                return null === _o ? Jf(e, void 0, t) : _o.get(e, t & F.Optional ? null : void 0, t)
            }

            function x(e, t = F.Default) {
                return (function d0() {
                    return ml
                }() || g0)(N(e), t)
            }

            function K(e, t = F.Default) {
                return x(e, qi(t))
            }

            function qi(e) {
                return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
            }

            function yl(e) {
                const t = [];
                for (let n = 0; n < e.length; n++) {
                    const r = N(e[n]);
                    if (Array.isArray(r)) {
                        if (0 === r.length) throw new E(900, !1);
                        let o, i = F.Default;
                        for (let s = 0; s < r.length; s++) {
                            const a = r[s],
                                l = m0(a);
                            "number" == typeof l ? -1 === l ? o = a.token : i |= l : o = a
                        }
                        t.push(x(o, i))
                    } else t.push(x(r))
                }
                return t
            }

            function wo(e, t) {
                return e[vl] = t, e.prototype[vl] = t, e
            }

            function m0(e) {
                return e[vl]
            }

            function xn(e) {
                return {
                    toString: e
                }.toString()
            }
            var Rt = (() => ((Rt = Rt || {})[Rt.OnPush = 0] = "OnPush", Rt[Rt.Default = 1] = "Default", Rt))(),
                Kt = (() => {
                    return (e = Kt || (Kt = {}))[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", Kt;
                    var e
                })();
            const fn = {},
                ee = [],
                Ki = ie({\
                    u0275cmp: ie
                }),
                Cl = ie({\
                    u0275dir: ie
                }),
                _l = ie({\
                    u0275pipe: ie
                }),
                nh = ie({\
                    u0275mod: ie
                }),
                hn = ie({\
                    u0275fac: ie
                }),
                bo = ie({
                    __NG_ELEMENT_ID__: ie
                });
            let C0 = 0;

            function Fe(e) {
                return xn(() => {
                    const n = !0 === e.standalone,
                        r = {},
                        o = {
                            type: e.type,
                            providersResolver: null,
                            decls: e.decls,
                            vars: e.vars,
                            factory: null,
                            template: e.template || null,
                            consts: e.consts || null,
                            ngContentSelectors: e.ngContentSelectors,
                            hostBindings: e.hostBindings || null,
                            hostVars: e.hostVars || 0,
                            hostAttrs: e.hostAttrs || null,
                            contentQueries: e.contentQueries || null,
                            declaredInputs: r,
                            inputs: null,
                            outputs: null,
                            exportAs: e.exportAs || null,
                            onPush: e.changeDetection === Rt.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            standalone: n,
                            dependencies: n && e.dependencies || null,
                            getStandaloneInjector: null,
                            selectors: e.selectors || ee,
                            viewQuery: e.viewQuery || null,
                            features: e.features || null,
                            data: e.data || {},
                            encapsulation: e.encapsulation || Kt.Emulated,
                            id: "c" + C0++,
                            styles: e.styles || ee,
                            _: null,
                            setInput: null,
                            schemas: e.schemas || null,
                            tView: null,
                            findHostDirectiveDefs: null,
                            hostDirectives: null
                        },
                        i = e.dependencies,
                        s = e.features;
                    return o.inputs = ih(e.inputs, r), o.outputs = ih(e.outputs), s && s.forEach(a => a(o)), o.directiveDefs = i ? () => ("function" == typeof i ? i() : i).map(rh).filter(oh) : null, o.pipeDefs = i ? () => ("function" == typeof i ? i() : i).map(Qe).filter(oh) : null, o
                })
            }

            function rh(e) {
                return re(e) || $e(e)
            }

            function oh(e) {
                return null !== e
            }

            function ft(e) {
                return xn(() => ({
                    type: e.type,
                    bootstrap: e.bootstrap || ee,
                    declarations: e.declarations || ee,
                    imports: e.imports || ee,
                    exports: e.exports || ee,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                }))
            }

            function ih(e, t) {
                if (null == e) return fn;
                const n = {};
                for (const r in e)
                    if (e.hasOwnProperty(r)) {
                        let o = e[r],
                            i = o;
                        Array.isArray(o) && (i = o[1], o = o[0]), n[o] = r, t && (t[o] = i)
                    }
                return n
            }
            const V = Fe;

            function re(e) {
                return e[Ki] || null
            }

            function $e(e) {
                return e[Cl] || null
            }

            function Qe(e) {
                return e[_l] || null
            }

            function ht(e, t) {
                const n = e[nh] || null;
                if (!n && !0 === t) throw new Error(`Type ${ae(e)} does not have '\u0275mod' property.`);
                return n
            }
            const q = 11;

            function pt(e) {
                return Array.isArray(e) && "object" == typeof e[1]
            }

            function Ft(e) {
                return Array.isArray(e) && !0 === e[1]
            }

            function Dl(e) {
                return 0 != (4 & e.flags)
            }

            function So(e) {
                return e.componentOffset > -1
            }

            function Ji(e) {
                return 1 == (1 & e.flags)
            }

            function Lt(e) {
                return null !== e.template
            }

            function b0(e) {
                return 0 != (256 & e[2])
            }

            function Zn(e, t) {
                return e.hasOwnProperty(hn) ? e[hn] : null
            }
            class E0 {
                constructor(t, n, r) {
                    this.previousValue = t, this.currentValue = n, this.firstChange = r
                }
                isFirstChange() {
                    return this.firstChange
                }
            }

            function gt() {
                return dh
            }

            function dh(e) {
                return e.type.prototype.ngOnChanges && (e.setInput = I0), S0
            }

            function S0() {
                const e = hh(this),
                    t = e ? .current;
                if (t) {
                    const n = e.previous;
                    if (n === fn) e.previous = t;
                    else
                        for (let r in t) n[r] = t[r];
                    e.current = null, this.ngOnChanges(t)
                }
            }

            function I0(e, t, n, r) {
                const o = this.declaredInputs[n],
                    i = hh(e) || function P0(e, t) {
                        return e[fh] = t
                    }(e, {
                        previous: fn,
                        current: null
                    }),
                    s = i.current || (i.current = {}),
                    a = i.previous,
                    l = a[o];
                s[o] = new E0(l && l.currentValue, t, a === fn), e[r] = t
            }
            gt.ngInherit = !0;
            const fh = "__ngSimpleChanges__";

            function hh(e) {
                return e[fh] || null
            }

            function Ve(e) {
                for (; Array.isArray(e);) e = e[0];
                return e
            }

            function mt(e, t) {
                return Ve(t[e.index])
            }

            function mh(e, t) {
                return e.data[t]
            }

            function vt(e, t) {
                const n = t[e];
                return pt(n) ? n : n[0]
            }

            function ts(e) {
                return 64 == (64 & e[2])
            }

            function An(e, t) {
                return null == t ? null : e[t]
            }

            function vh(e) {
                e[18] = 0
            }

            function El(e, t) {
                e[5] += t;
                let n = e,
                    r = e[3];
                for (; null !== r && (1 === t && 1 === n[5] || -1 === t && 0 === n[5]);) r[5] += t, n = r, r = r[3]
            }
            const B = {
                lFrame: Ih(null),
                bindingsEnabled: !0
            };

            function Ch() {
                return B.bindingsEnabled
            }

            function M() {
                return B.lFrame.lView
            }

            function X() {
                return B.lFrame.tView
            }

            function je() {
                let e = _h();
                for (; null !== e && 64 === e.type;) e = e.parent;
                return e
            }

            function _h() {
                return B.lFrame.currentTNode
            }

            function Yt(e, t) {
                const n = B.lFrame;
                n.currentTNode = e, n.isParent = t
            }

            function Sl() {
                return B.lFrame.isParent
            }

            function Dr() {
                return B.lFrame.bindingIndex++
            }

            function $0(e, t) {
                const n = B.lFrame;
                n.bindingIndex = n.bindingRootIndex = e, Pl(t)
            }

            function Pl(e) {
                B.lFrame.currentDirectiveIndex = e
            }

            function Mh() {
                return B.lFrame.currentQueryIndex
            }

            function xl(e) {
                B.lFrame.currentQueryIndex = e
            }

            function G0(e) {
                const t = e[1];
                return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null
            }

            function Eh(e, t, n) {
                if (n & F.SkipSelf) {
                    let o = t,
                        i = e;
                    for (; !(o = o.parent, null !== o || n & F.Host || (o = G0(i), null === o || (i = i[15], 10 & o.type))););
                    if (null === o) return !1;
                    t = o, e = i
                }
                const r = B.lFrame = Sh();
                return r.currentTNode = t, r.lView = e, !0
            }

            function Al(e) {
                const t = Sh(),
                    n = e[1];
                B.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
            }

            function Sh() {
                const e = B.lFrame,
                    t = null === e ? null : e.child;
                return null === t ? Ih(e) : t
            }

            function Ih(e) {
                const t = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: e,
                    child: null,
                    inI18n: !1
                };
                return null !== e && (e.child = t), t
            }

            function Ph() {
                const e = B.lFrame;
                return B.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
            }
            const Oh = Ph;

            function Tl() {
                const e = Ph();
                e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
            }

            function et() {
                return B.lFrame.selectedIndex
            }

            function Yn(e) {
                B.lFrame.selectedIndex = e
            }

            function pe() {
                const e = B.lFrame;
                return mh(e.tView, e.selectedIndex)
            }

            function ns(e, t) {
                for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                    const i = e.data[n].type.prototype,
                        {
                            ngAfterContentInit: s,
                            ngAfterContentChecked: a,
                            ngAfterViewInit: l,
                            ngAfterViewChecked: c,
                            ngOnDestroy: u
                        } = i;
                    s && (e.contentHooks || (e.contentHooks = [])).push(-n, s), a && ((e.contentHooks || (e.contentHooks = [])).push(n, a), (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)), l && (e.viewHooks || (e.viewHooks = [])).push(-n, l), c && ((e.viewHooks || (e.viewHooks = [])).push(n, c), (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, c)), null != u && (e.destroyHooks || (e.destroyHooks = [])).push(n, u)
                }
            }

            function rs(e, t, n) {
                xh(e, t, 3, n)
            }

            function os(e, t, n, r) {
                (3 & e[2]) === n && xh(e, t, n, r)
            }

            function kl(e, t) {
                let n = e[2];
                (3 & n) === t && (n &= 2047, n += 1, e[2] = n)
            }

            function xh(e, t, n, r) {
                const i = r ? ? -1,
                    s = t.length - 1;
                let a = 0;
                for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
                    if ("number" == typeof t[l + 1]) {
                        if (a = t[l], null != r && a >= r) break
                    } else t[l] < 0 && (e[18] += 65536), (a < i || -1 == i) && (eb(e, n, t, l), e[18] = (4294901760 & e[18]) + l + 2), l++
            }

            function eb(e, t, n, r) {
                const o = n[r] < 0,
                    i = n[r + 1],
                    a = e[o ? -n[r] : n[r]];
                if (o) {
                    if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
                        e[2] += 2048;
                        try {
                            i.call(a)
                        } finally {}
                    }
                } else try {
                    i.call(a)
                } finally {}
            }
            class Po {
                constructor(t, n, r) {
                    this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r
                }
            }

            function Nl(e, t, n) {
                let r = 0;
                for (; r < n.length;) {
                    const o = n[r];
                    if ("number" == typeof o) {
                        if (0 !== o) break;
                        r++;
                        const i = n[r++],
                            s = n[r++],
                            a = n[r++];
                        e.setAttribute(t, s, a, i)
                    } else {
                        const i = o,
                            s = n[++r];
                        Th(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
                    }
                }
                return r
            }

            function Ah(e) {
                return 3 === e || 4 === e || 6 === e
            }

            function Th(e) {
                return 64 === e.charCodeAt(0)
            }

            function Oo(e, t) {
                if (null !== t && 0 !== t.length)
                    if (null === e || 0 === e.length) e = t.slice();
                    else {
                        let n = -1;
                        for (let r = 0; r < t.length; r++) {
                            const o = t[r];
                            "number" == typeof o ? n = o : 0 === n || kh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                        }
                    }
                return e
            }

            function kh(e, t, n, r, o) {
                let i = 0,
                    s = e.length;
                if (-1 === t) s = -1;
                else
                    for (; i < e.length;) {
                        const a = e[i++];
                        if ("number" == typeof a) {
                            if (a === t) {
                                s = -1;
                                break
                            }
                            if (a > t) {
                                s = i - 1;
                                break
                            }
                        }
                    }
                for (; i < e.length;) {
                    const a = e[i];
                    if ("number" == typeof a) break;
                    if (a === n) {
                        if (null === r) return void(null !== o && (e[i + 1] = o));
                        if (r === e[i + 1]) return void(e[i + 2] = o)
                    }
                    i++, null !== r && i++, null !== o && i++
                } - 1 !== s && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), null !== r && e.splice(i++, 0, r), null !== o && e.splice(i++, 0, o)
            }

            function Rh(e) {
                return -1 !== e
            }

            function is(e) {
                return 32767 & e
            }

            function ss(e, t) {
                let n = function ob(e) {
                        return e >> 16
                    }(e),
                    r = t;
                for (; n > 0;) r = r[15], n--;
                return r
            }
            let Fl = !0;

            function as(e) {
                const t = Fl;
                return Fl = e, t
            }
            let ib = 0;
            const Qt = {};

            function ls(e, t) {
                const n = Lh(e, t);
                if (-1 !== n) return n;
                const r = t[1];
                r.firstCreatePass && (e.injectorIndex = t.length, Ll(r.data, e), Ll(t, null), Ll(r.blueprint, null));
                const o = Vl(e, t),
                    i = e.injectorIndex;
                if (Rh(o)) {
                    const s = is(o),
                        a = ss(o, t),
                        l = a[1].data;
                    for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | l[s + c]
                }
                return t[i + 8] = o, i
            }

            function Ll(e, t) {
                e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
            }

            function Lh(e, t) {
                return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
            }

            function Vl(e, t) {
                if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
                let n = 0,
                    r = null,
                    o = t;
                for (; null !== o;) {
                    if (r = zh(o), null === r) return -1;
                    if (n++, o = o[15], -1 !== r.injectorIndex) return r.injectorIndex | n << 16
                }
                return -1
            }

            function jl(e, t, n) {
                ! function sb(e, t, n) {
                    let r;
                    "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(bo) && (r = n[bo]), null == r && (r = n[bo] = ib++);
                    const o = 255 & r;
                    t.data[e + (o >> 5)] |= 1 << o
                }(e, t, n)
            }

            function Vh(e, t, n) {
                if (n & F.Optional || void 0 !== e) return e;
                $i()
            }

            function jh(e, t, n, r) {
                if (n & F.Optional && void 0 === r && (r = null), !(n & (F.Self | F.Host))) {
                    const o = e[9],
                        i = Et(void 0);
                    try {
                        return o ? o.get(t, r, n & F.Optional) : Jf(t, r, n & F.Optional)
                    } finally {
                        Et(i)
                    }
                }
                return Vh(r, 0, n)
            }

            function Bh(e, t, n, r = F.Default, o) {
                if (null !== e) {
                    if (1024 & t[2]) {
                        const s = function db(e, t, n, r, o) {
                            let i = e,
                                s = t;
                            for (; null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);) {
                                const a = Uh(i, s, n, r | F.Self, Qt);
                                if (a !== Qt) return a;
                                let l = i.parent;
                                if (!l) {
                                    const c = s[21];
                                    if (c) {
                                        const u = c.get(n, Qt, r);
                                        if (u !== Qt) return u
                                    }
                                    l = zh(s), s = s[15]
                                }
                                i = l
                            }
                            return o
                        }(e, t, n, r, Qt);
                        if (s !== Qt) return s
                    }
                    const i = Uh(e, t, n, r, Qt);
                    if (i !== Qt) return i
                }
                return jh(t, n, r, o)
            }

            function Uh(e, t, n, r, o) {
                const i = function cb(e) {
                    if ("string" == typeof e) return e.charCodeAt(0) || 0;
                    const t = e.hasOwnProperty(bo) ? e[bo] : void 0;
                    return "number" == typeof t ? t >= 0 ? 255 & t : ub : t
                }(n);
                if ("function" == typeof i) {
                    if (!Eh(t, e, r)) return r & F.Host ? Vh(o, 0, r) : jh(t, n, r, o);
                    try {
                        const s = i(r);
                        if (null != s || r & F.Optional) return s;
                        $i()
                    } finally {
                        Oh()
                    }
                } else if ("number" == typeof i) {
                    let s = null,
                        a = Lh(e, t),
                        l = -1,
                        c = r & F.Host ? t[16][6] : null;
                    for ((-1 === a || r & F.SkipSelf) && (l = -1 === a ? Vl(e, t) : t[a + 8], -1 !== l && $h(r, !1) ? (s = t[1], a = is(l), t = ss(l, t)) : a = -1); - 1 !== a;) {
                        const u = t[1];
                        if (Hh(i, a, u.data)) {
                            const h = lb(a, t, n, s, r, c);
                            if (h !== Qt) return h
                        }
                        l = t[a + 8], -1 !== l && $h(r, t[1].data[a + 8] === c) && Hh(i, a, t) ? (s = u, a = is(l), t = ss(l, t)) : a = -1
                    }
                }
                return o
            }

            function lb(e, t, n, r, o, i) {
                const s = t[1],
                    a = s.data[e + 8],
                    u = cs(a, s, n, null == r ? So(a) && Fl : r != s && 0 != (3 & a.type), o & F.Host && i === a);
                return null !== u ? Qn(t, s, u, a) : Qt
            }

            function cs(e, t, n, r, o) {
                const i = e.providerIndexes,
                    s = t.data,
                    a = 1048575 & i,
                    l = e.directiveStart,
                    u = i >> 20,
                    g = o ? a + u : e.directiveEnd;
                for (let m = r ? a : a + u; m < g; m++) {
                    const y = s[m];
                    if (m < l && n === y || m >= l && y.type === n) return m
                }
                if (o) {
                    const m = s[l];
                    if (m && Lt(m) && m.type === n) return l
                }
                return null
            }

            function Qn(e, t, n, r) {
                let o = e[n];
                const i = t.data;
                if (function tb(e) {
                        return e instanceof Po
                    }(o)) {
                    const s = o;
                    s.resolving && function t0(e, t) {
                        const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                        throw new E(-200, `Circular dependency in DI detected for ${e}${n}`)
                    }(function te(e) {
                        return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : j(e)
                    }(i[n]));
                    const a = as(s.canSeeViewProviders);
                    s.resolving = !0;
                    const l = s.injectImpl ? Et(s.injectImpl) : null;
                    Eh(e, r, F.Default);
                    try {
                        o = e[n] = s.factory(void 0, i, e, r), t.firstCreatePass && n >= r.directiveStart && function J0(e, t, n) {
                            const {
                                ngOnChanges: r,
                                ngOnInit: o,
                                ngDoCheck: i
                            } = t.type.prototype;
                            if (r) {
                                const s = dh(t);
                                (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s)
                            }
                            o && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o), i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, i))
                        }(n, i[n], t)
                    } finally {
                        null !== l && Et(l), as(a), s.resolving = !1, Oh()
                    }
                }
                return o
            }

            function Hh(e, t, n) {
                return !!(n[t + (e >> 5)] & 1 << e)
            }

            function $h(e, t) {
                return !(e & F.Self || e & F.Host && t)
            }
            class Er {
                constructor(t, n) {
                    this._tNode = t, this._lView = n
                }
                get(t, n, r) {
                    return Bh(this._tNode, this._lView, t, qi(r), n)
                }
            }

            function ub() {
                return new Er(je(), M())
            }

            function Be(e) {
                return xn(() => {
                    const t = e.prototype.constructor,
                        n = t[hn] || Bl(t),
                        r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r;) {
                        const i = o[hn] || Bl(o);
                        if (i && i !== n) return i;
                        o = Object.getPrototypeOf(o)
                    }
                    return i => new i
                })
            }

            function Bl(e) {
                return hl(e) ? () => {
                    const t = Bl(N(e));
                    return t && t()
                } : Zn(e)
            }

            function zh(e) {
                const t = e[1],
                    n = t.type;
                return 2 === n ? t.declTNode : 1 === n ? e[6] : null
            }
            const Ir = "__parameters__";

            function Or(e, t, n) {
                return xn(() => {
                    const r = function Ul(e) {
                        return function(...n) {
                            if (e) {
                                const r = e(...n);
                                for (const o in r) this[o] = r[o]
                            }
                        }
                    }(t);

                    function o(...i) {
                        if (this instanceof o) return r.apply(this, i), this;
                        const s = new o(...i);
                        return a.annotation = s, a;

                        function a(l, c, u) {
                            const h = l.hasOwnProperty(Ir) ? l[Ir] : Object.defineProperty(l, Ir, {
                                value: []
                            })[Ir];
                            for (; h.length <= u;) h.push(null);
                            return (h[u] = h[u] || []).push(s), l
                        }
                    }
                    return n && (o.prototype = Object.create(n.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
                })
            }
            class O {
                constructor(t, n) {
                    this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = A({
                        token: this,
                        providedIn: n.providedIn || "root",
                        factory: n.factory
                    }))
                }
                get multi() {
                    return this
                }
                toString() {
                    return `InjectionToken ${this._desc}`
                }
            }

            function Xn(e, t) {
                e.forEach(n => Array.isArray(n) ? Xn(n, t) : t(n))
            }

            function Wh(e, t, n) {
                t >= e.length ? e.push(n) : e.splice(t, 0, n)
            }

            function ds(e, t) {
                return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
            }

            function yt(e, t, n) {
                let r = xr(e, t);
                return r >= 0 ? e[1 | r] = n : (r = ~r, function gb(e, t, n, r) {
                    let o = e.length;
                    if (o == t) e.push(n, r);
                    else if (1 === o) e.push(r, e[0]), e[0] = n;
                    else {
                        for (o--, e.push(e[o - 1], e[o]); o > t;) e[o] = e[o - 2], o--;
                        e[t] = n, e[t + 1] = r
                    }
                }(e, r, t, n)), r
            }

            function $l(e, t) {
                const n = xr(e, t);
                if (n >= 0) return e[1 | n]
            }

            function xr(e, t) {
                return function qh(e, t, n) {
                    let r = 0,
                        o = e.length >> n;
                    for (; o !== r;) {
                        const i = r + (o - r >> 1),
                            s = e[i << n];
                        if (t === s) return i << n;
                        s > t ? o = i : r = i + 1
                    }
                    return ~(o << n)
                }(e, t, 1)
            }
            const ko = wo(Or("Optional"), 8),
                Ro = wo(Or("SkipSelf"), 4);
            var at = (() => ((at = at || {})[at.Important = 1] = "Important", at[at.DashCase = 2] = "DashCase", at))();
            const Zl = new Map;
            let Lb = 0;
            const Ql = "__ngContext__";

            function We(e, t) {
                pt(t) ? (e[Ql] = t[20], function jb(e) {
                    Zl.set(e[20], e)
                }(t)) : e[Ql] = t
            }

            function Jl(e, t) {
                return undefined(e, t)
            }

            function Vo(e) {
                const t = e[3];
                return Ft(t) ? t[3] : t
            }

            function ec(e) {
                return hp(e[13])
            }

            function tc(e) {
                return hp(e[4])
            }

            function hp(e) {
                for (; null !== e && !Ft(e);) e = e[4];
                return e
            }

            function Tr(e, t, n, r, o) {
                if (null != r) {
                    let i, s = !1;
                    Ft(r) ? i = r : pt(r) && (s = !0, r = r[0]);
                    const a = Ve(r);
                    0 === e && null !== n ? null == o ? Cp(t, n, a) : Jn(t, n, a, o || null, !0) : 1 === e && null !== n ? Jn(t, n, a, o || null, !0) : 2 === e ? function lc(e, t, n) {
                        const r = gs(e, t);
                        r && function iD(e, t, n, r) {
                            e.removeChild(t, n, r)
                        }(e, r, t, n)
                    }(t, a, s) : 3 === e && t.destroyNode(a), null != i && function lD(e, t, n, r, o) {
                        const i = n[7];
                        i !== Ve(n) && Tr(t, e, r, i, o);
                        for (let a = 10; a < n.length; a++) {
                            const l = n[a];
                            jo(l[1], l, e, t, r, i)
                        }
                    }(t, e, i, n, o)
                }
            }

            function rc(e, t, n) {
                return e.createElement(t, n)
            }

            function gp(e, t) {
                const n = e[9],
                    r = n.indexOf(t),
                    o = t[3];
                512 & t[2] && (t[2] &= -513, El(o, -1)), n.splice(r, 1)
            }

            function oc(e, t) {
                if (e.length <= 10) return;
                const n = 10 + t,
                    r = e[n];
                if (r) {
                    const o = r[17];
                    null !== o && o !== e && gp(o, r), t > 0 && (e[n - 1][4] = r[4]);
                    const i = ds(e, 10 + t);
                    ! function Qb(e, t) {
                        jo(e, t, t[q], 2, null, null), t[0] = null, t[6] = null
                    }(r[1], r);
                    const s = i[19];
                    null !== s && s.detachView(i[1]), r[3] = null, r[4] = null, r[2] &= -65
                }
                return r
            }

            function mp(e, t) {
                if (!(128 & t[2])) {
                    const n = t[q];
                    n.destroyNode && jo(e, t, n, 3, null, null),
                        function eD(e) {
                            let t = e[13];
                            if (!t) return ic(e[1], e);
                            for (; t;) {
                                let n = null;
                                if (pt(t)) n = t[13];
                                else {
                                    const r = t[10];
                                    r && (n = r)
                                }
                                if (!n) {
                                    for (; t && !t[4] && t !== e;) pt(t) && ic(t[1], t), t = t[3];
                                    null === t && (t = e), pt(t) && ic(t[1], t), n = t && t[4]
                                }
                                t = n
                            }
                        }(t)
                }
            }

            function ic(e, t) {
                if (!(128 & t[2])) {
                    t[2] &= -65, t[2] |= 128,
                        function oD(e, t) {
                            let n;
                            if (null != e && null != (n = e.destroyHooks))
                                for (let r = 0; r < n.length; r += 2) {
                                    const o = t[n[r]];
                                    if (!(o instanceof Po)) {
                                        const i = n[r + 1];
                                        if (Array.isArray(i))
                                            for (let s = 0; s < i.length; s += 2) {
                                                const a = o[i[s]],
                                                    l = i[s + 1];
                                                try {
                                                    l.call(a)
                                                } finally {}
                                            } else try {
                                                i.call(o)
                                            } finally {}
                                    }
                                }
                        }(e, t),
                        function rD(e, t) {
                            const n = e.cleanup,
                                r = t[7];
                            let o = -1;
                            if (null !== n)
                                for (let i = 0; i < n.length - 1; i += 2)
                                    if ("string" == typeof n[i]) {
                                        const s = n[i + 3];
                                        s >= 0 ? r[o = s]() : r[o = -s].unsubscribe(), i += 2
                                    } else {
                                        const s = r[o = n[i + 1]];
                                        n[i].call(s)
                                    }
                            if (null !== r) {
                                for (let i = o + 1; i < r.length; i++)(0, r[i])();
                                t[7] = null
                            }
                        }(e, t), 1 === t[1].type && t[q].destroy();
                    const n = t[17];
                    if (null !== n && Ft(t[3])) {
                        n !== t[3] && gp(n, t);
                        const r = t[19];
                        null !== r && r.detachView(e)
                    }! function Bb(e) {
                        Zl.delete(e[20])
                    }(t)
                }
            }

            function vp(e, t, n) {
                return function yp(e, t, n) {
                    let r = t;
                    for (; null !== r && 40 & r.type;) r = (t = r).parent;
                    if (null === r) return n[0]; {
                        const {
                            componentOffset: o
                        } = r;
                        if (o > -1) {
                            const {
                                encapsulation: i
                            } = e.data[r.directiveStart + o];
                            if (i === Kt.None || i === Kt.Emulated) return null
                        }
                        return mt(r, n)
                    }
                }(e, t.parent, n)
            }

            function Jn(e, t, n, r, o) {
                e.insertBefore(t, n, r, o)
            }

            function Cp(e, t, n) {
                e.appendChild(t, n)
            }

            function _p(e, t, n, r, o) {
                null !== r ? Jn(e, t, n, r, o) : Cp(e, t, n)
            }

            function gs(e, t) {
                return e.parentNode(t)
            }
            let dc, Cs, Dp = function bp(e, t, n) {
                return 40 & e.type ? mt(e, n) : null
            };

            function ms(e, t, n, r) {
                const o = vp(e, r, t),
                    i = t[q],
                    a = function wp(e, t, n) {
                        return Dp(e, t, n)
                    }(r.parent || t[6], r, t);
                if (null != o)
                    if (Array.isArray(n))
                        for (let l = 0; l < n.length; l++) _p(i, o, n[l], a, !1);
                    else _p(i, o, n, a, !1)
            }

            function vs(e, t) {
                if (null !== t) {
                    const n = t.type;
                    if (3 & n) return mt(t, e);
                    if (4 & n) return ac(-1, e[t.index]);
                    if (8 & n) {
                        const r = t.child;
                        if (null !== r) return vs(e, r); {
                            const o = e[t.index];
                            return Ft(o) ? ac(-1, o) : Ve(o)
                        }
                    }
                    if (32 & n) return Jl(t, e)() || Ve(e[t.index]); {
                        const r = Ep(e, t);
                        return null !== r ? Array.isArray(r) ? r[0] : vs(Vo(e[16]), r) : vs(e, t.next)
                    }
                }
                return null
            }

            function Ep(e, t) {
                return null !== t ? e[16][6].projection[t.projection] : null
            }

            function ac(e, t) {
                const n = 10 + e + 1;
                if (n < t.length) {
                    const r = t[n],
                        o = r[1].firstChild;
                    if (null !== o) return vs(r, o)
                }
                return t[7]
            }

            function cc(e, t, n, r, o, i, s) {
                for (; null != n;) {
                    const a = r[n.index],
                        l = n.type;
                    if (s && 0 === t && (a && We(Ve(a), r), n.flags |= 2), 32 != (32 & n.flags))
                        if (8 & l) cc(e, t, n.child, r, o, i, !1), Tr(t, e, o, a, i);
                        else if (32 & l) {
                        const c = Jl(n, r);
                        let u;
                        for (; u = c();) Tr(t, e, o, u, i);
                        Tr(t, e, o, a, i)
                    } else 16 & l ? Sp(e, t, r, n, o, i) : Tr(t, e, o, a, i);
                    n = s ? n.projectionNext : n.next
                }
            }

            function jo(e, t, n, r, o, i) {
                cc(n, r, e.firstChild, t, o, i, !1)
            }

            function Sp(e, t, n, r, o, i) {
                const s = n[16],
                    l = s[6].projection[r.projection];
                if (Array.isArray(l))
                    for (let c = 0; c < l.length; c++) Tr(t, e, o, l[c], i);
                else cc(e, t, l, s[3], o, i, !0)
            }

            function Ip(e, t, n) {
                "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
            }

            function Pp(e, t, n) {
                const {
                    mergedAttrs: r,
                    classes: o,
                    styles: i
                } = n;
                null !== r && Nl(e, t, r), null !== o && Ip(e, t, o), null !== i && function uD(e, t, n) {
                    e.setAttribute(t, "style", n)
                }(e, t, i)
            }

            function Tp(e) {
                return function fc() {
                    if (void 0 === Cs && (Cs = null, ce.trustedTypes)) try {
                        Cs = ce.trustedTypes.createPolicy("angular#unsafe-bypass", {
                            createHTML: e => e,
                            createScript: e => e,
                            createScriptURL: e => e
                        })
                    } catch {}
                    return Cs
                }() ? .createScriptURL(e) || e
            }
            class kp {
                constructor(t) {
                    this.changingThisBreaksApplicationSecurity = t
                }
                toString() {
                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Zf})`
                }
            }

            function Tn(e) {
                return e instanceof kp ? e.changingThisBreaksApplicationSecurity : e
            }

            function Bo(e, t) {
                const n = function _D(e) {
                    return e instanceof kp && e.getTypeName() || null
                }(e);
                if (null != n && n !== t) {
                    if ("ResourceURL" === n && "URL" === t) return !0;
                    throw new Error(`Required a safe ${t}, got a ${n} (see ${Zf})`)
                }
                return n === t
            }
            const MD = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
            var Ee = (() => ((Ee = Ee || {})[Ee.NONE = 0] = "NONE", Ee[Ee.HTML = 1] = "HTML", Ee[Ee.STYLE = 2] = "STYLE", Ee[Ee.SCRIPT = 3] = "SCRIPT", Ee[Ee.URL = 4] = "URL", Ee[Ee.RESOURCE_URL = 5] = "RESOURCE_URL", Ee))();

            function Bp(e) {
                const t = Ho();
                return t ? t.sanitize(Ee.URL, e) || "" : Bo(e, "URL") ? Tn(e) : function hc(e) {
                    return (e = String(e)).match(MD) ? e : "unsafe:" + e
                }(j(e))
            }

            function Up(e) {
                const t = Ho();
                if (t) return Tp(t.sanitize(Ee.RESOURCE_URL, e) || "");
                if (Bo(e, "ResourceURL")) return Tp(Tn(e));
                throw new E(904, !1)
            }

            function Ho() {
                const e = M();
                return e && e[12]
            }
            const ws = new O("ENVIRONMENT_INITIALIZER"),
                $p = new O("INJECTOR", -1),
                zp = new O("INJECTOR_DEF_TYPES");
            class Gp {
                get(t, n = Co) {
                    if (n === Co) {
                        const r = new Error(`NullInjectorError: No provider for ${ae(t)}!`);
                        throw r.name = "NullInjectorError", r
                    }
                    return n
                }
            }

            function VD(...e) {
                return {\
                    u0275providers: Wp(0, e),
                    \u0275fromNgModule: !0
                }
            }

            function Wp(e, ...t) {
                const n = [],
                    r = new Set;
                let o;
                return Xn(t, i => {
                    const s = i;
                    vc(s, n, [], r) && (o || (o = []), o.push(s))
                }), void 0 !== o && qp(o, n), n
            }

            function qp(e, t) {
                for (let n = 0; n < e.length; n++) {
                    const {
                        providers: o
                    } = e[n];
                    yc(o, i => {
                        t.push(i)
                    })
                }
            }

            function vc(e, t, n, r) {
                if (!(e = N(e))) return !1;
                let o = null,
                    i = Qf(e);
                const s = !i && re(e);
                if (i || s) {
                    if (s && !s.standalone) return !1;
                    o = e
                } else {
                    const l = e.ngModule;
                    if (i = Qf(l), !i) return !1;
                    o = l
                }
                const a = r.has(o);
                if (s) {
                    if (a) return !1;
                    if (r.add(o), s.dependencies) {
                        const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                        for (const c of l) vc(c, t, n, r)
                    }
                } else {
                    if (!i) return !1; {
                        if (null != i.imports && !a) {
                            let c;
                            r.add(o);
                            try {
                                Xn(i.imports, u => {
                                    vc(u, t, n, r) && (c || (c = []), c.push(u))
                                })
                            } finally {}
                            void 0 !== c && qp(c, t)
                        }
                        if (!a) {
                            const c = Zn(o) || (() => new o);
                            t.push({
                                provide: o,
                                useFactory: c,
                                deps: ee
                            }, {
                                provide: zp,
                                useValue: o,
                                multi: !0
                            }, {
                                provide: ws,
                                useValue: () => x(o),
                                multi: !0
                            })
                        }
                        const l = i.providers;
                        null == l || a || yc(l, u => {
                            t.push(u)
                        })
                    }
                }
                return o !== e && void 0 !== e.providers
            }

            function yc(e, t) {
                for (let n of e) pl(n) && (n = n.\u0275providers), Array.isArray(n) ? yc(n, t) : t(n)
            }
            const jD = ie({
                provide: String,
                useValue: ie
            });

            function Cc(e) {
                return null !== e && "object" == typeof e && jD in e
            }

            function tr(e) {
                return "function" == typeof e
            }
            const _c = new O("Set Injector scope."),
                bs = {},
                UD = {};
            let wc;

            function Ds() {
                return void 0 === wc && (wc = new Gp), wc
            }
            class Xt {}
            class Yp extends Xt {
                get destroyed() {
                    return this._destroyed
                }
                constructor(t, n, r, o) {
                    super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, Dc(t, s => this.processProvider(s)), this.records.set($p, kr(void 0, this)), o.has("environment") && this.records.set(Xt, kr(void 0, this));
                    const i = this.records.get(_c);
                    null != i && "string" == typeof i.value && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(zp.multi, ee, F.Self))
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    try {
                        for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
                        for (const t of this._onDestroyHooks) t()
                    } finally {
                        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), this._onDestroyHooks.length = 0
                    }
                }
                onDestroy(t) {
                    this._onDestroyHooks.push(t)
                }
                runInContext(t) {
                    this.assertNotDestroyed();
                    const n = mr(this),
                        r = Et(void 0);
                    try {
                        return t()
                    } finally {
                        mr(n), Et(r)
                    }
                }
                get(t, n = Co, r = F.Default) {
                    this.assertNotDestroyed(), r = qi(r);
                    const o = mr(this),
                        i = Et(void 0);
                    try {
                        if (!(r & F.SkipSelf)) {
                            let a = this.records.get(t);
                            if (void 0 === a) {
                                const l = function WD(e) {
                                    return "function" == typeof e || "object" == typeof e && e instanceof O
                                }(t) && zi(t);
                                a = l && this.injectableDefInScope(l) ? kr(bc(t), bs) : null, this.records.set(t, a)
                            }
                            if (null != a) return this.hydrate(t, a)
                        }
                        return (r & F.Self ? Ds() : this.parent).get(t, n = r & F.Optional && n === Co ? null : n)
                    } catch (s) {
                        if ("NullInjectorError" === s.name) {
                            if ((s[Wi] = s[Wi] || []).unshift(ae(t)), o) throw s;
                            return function v0(e, t, n, r) {
                                const o = e[Wi];
                                throw t[eh] && o.unshift(t[eh]), e.message = function y0(e, t, n, r = null) {
                                    e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                    let o = ae(t);
                                    if (Array.isArray(t)) o = t.map(ae).join(" -> ");
                                    else if ("object" == typeof t) {
                                        let i = [];
                                        for (let s in t)
                                            if (t.hasOwnProperty(s)) {
                                                let a = t[s];
                                                i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : ae(a)))
                                            }
                                        o = `{${i.join(", ")}}`
                                    }
                                    return `${n}${r?"("+r+")":""}[${o}]: ${e.replace(h0,"\n  ")}`
                                }("\n" + e.message, o, n, r), e.ngTokenPath = o, e[Wi] = null, e
                            }(s, t, "R3InjectorError", this.source)
                        }
                        throw s
                    } finally {
                        Et(i), mr(o)
                    }
                }
                resolveInjectorInitializers() {
                    const t = mr(this),
                        n = Et(void 0);
                    try {
                        const r = this.get(ws.multi, ee, F.Self);
                        for (const o of r) o()
                    } finally {
                        mr(t), Et(n)
                    }
                }
                toString() {
                    const t = [],
                        n = this.records;
                    for (const r of n.keys()) t.push(ae(r));
                    return `R3Injector[${t.join(", ")}]`
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new E(205, !1)
                }
                processProvider(t) {
                    let n = tr(t = N(t)) ? t : N(t && t.provide);
                    const r = function $D(e) {
                        return Cc(e) ? kr(void 0, e.useValue) : kr(Qp(e), bs)
                    }(t);
                    if (tr(t) || !0 !== t.multi) this.records.get(n);
                    else {
                        let o = this.records.get(n);
                        o || (o = kr(void 0, bs, !0), o.factory = () => yl(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
                    }
                    this.records.set(n, r)
                }
                hydrate(t, n) {
                    return n.value === bs && (n.value = UD, n.value = n.factory()), "object" == typeof n.value && n.value && function GD(e) {
                        return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                    }(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
                }
                injectableDefInScope(t) {
                    if (!t.providedIn) return !1;
                    const n = N(t.providedIn);
                    return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
                }
            }

            function bc(e) {
                const t = zi(e),
                    n = null !== t ? t.factory : Zn(e);
                if (null !== n) return n;
                if (e instanceof O) throw new E(204, !1);
                if (e instanceof Function) return function HD(e) {
                    const t = e.length;
                    if (t > 0) throw function To(e, t) {
                        const n = [];
                        for (let r = 0; r < e; r++) n.push(t);
                        return n
                    }(t, "?"), new E(204, !1);
                    const n = function l0(e) {
                        const t = e && (e[Gi] || e[Xf]);
                        if (t) {
                            const n = function c0(e) {
                                if (e.hasOwnProperty("name")) return e.name;
                                const t = ("" + e).match(/^function\s*([^\s(]+)/);
                                return null === t ? "" : t[1]
                            }(e);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), t
                        }
                        return null
                    }(e);
                    return null !== n ? () => n.factory(e) : () => new e
                }(e);
                throw new E(204, !1)
            }

            function Qp(e, t, n) {
                let r;
                if (tr(e)) {
                    const o = N(e);
                    return Zn(o) || bc(o)
                }
                if (Cc(e)) r = () => N(e.useValue);
                else if (function Zp(e) {
                        return !(!e || !e.useFactory)
                    }(e)) r = () => e.useFactory(...yl(e.deps || []));
                else if (function Kp(e) {
                        return !(!e || !e.useExisting)
                    }(e)) r = () => x(N(e.useExisting));
                else {
                    const o = N(e && (e.useClass || e.provide));
                    if (! function zD(e) {
                            return !!e.deps
                        }(e)) return Zn(o) || bc(o);
                    r = () => new o(...yl(e.deps))
                }
                return r
            }

            function kr(e, t, n = !1) {
                return {
                    factory: e,
                    value: t,
                    multi: n ? [] : void 0
                }
            }

            function Dc(e, t) {
                for (const n of e) Array.isArray(n) ? Dc(n, t) : n && pl(n) ? Dc(n.\u0275providers, t) : t(n)
            }
            class qD {}
            class Xp {}
            class ZD {
                resolveComponentFactory(t) {
                    throw function KD(e) {
                        const t = Error(`No component factory found for ${ae(e)}. Did you add it to @NgModule.entryComponents?`);
                        return t.ngComponent = e, t
                    }(t)
                }
            }
            let Rr = (() => {
                class e {}
                return e.NULL = new ZD, e
            })();

            function YD() {
                return Nr(je(), M())
            }

            function Nr(e, t) {
                return new Ct(mt(e, t))
            }
            let Ct = (() => {
                class e {
                    constructor(n) {
                        this.nativeElement = n
                    }
                }
                return e.__NG_ELEMENT_ID__ = YD, e
            })();

            function QD(e) {
                return e instanceof Ct ? e.nativeElement : e
            }
            class eg {}
            let yn = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = () => function XD() {
                        const e = M(),
                            n = vt(je().index, e);
                        return (pt(n) ? n : e)[q]
                    }(), e
                })(),
                JD = (() => {
                    class e {}
                    return e.\u0275prov = A({
                        token: e,
                        providedIn: "root",
                        factory: () => null
                    }), e
                })();
            class $o {
                constructor(t) {
                    this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
                }
            }
            const eM = new $o("15.1.2"),
                Mc = {};

            function Sc(e) {
                return e.ngOriginalError
            }
            class Fr {
                constructor() {
                    this._console = console
                }
                handleError(t) {
                    const n = this._findOriginalError(t);
                    this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n)
                }
                _findOriginalError(t) {
                    let n = t && Sc(t);
                    for (; n && Sc(n);) n = Sc(n);
                    return n || null
                }
            }

            function tg(e) {
                return e.ownerDocument.defaultView
            }

            function Cn(e) {
                return e instanceof Function ? e() : e
            }

            function rg(e, t, n) {
                let r = e.length;
                for (;;) {
                    const o = e.indexOf(t, n);
                    if (-1 === o) return o;
                    if (0 === o || e.charCodeAt(o - 1) <= 32) {
                        const i = t.length;
                        if (o + i === r || e.charCodeAt(o + i) <= 32) return o
                    }
                    n = o + 1
                }
            }
            const og = "ng-template";

            function uM(e, t, n) {
                let r = 0;
                for (; r < e.length;) {
                    let o = e[r++];
                    if (n && "class" === o) {
                        if (o = e[r], -1 !== rg(o.toLowerCase(), t, 0)) return !0
                    } else if (1 === o) {
                        for (; r < e.length && "string" == typeof(o = e[r++]);)
                            if (o.toLowerCase() === t) return !0;
                        return !1
                    }
                }
                return !1
            }

            function ig(e) {
                return 4 === e.type && e.value !== og
            }

            function dM(e, t, n) {
                return t === (4 !== e.type || n ? e.value : og)
            }

            function fM(e, t, n) {
                let r = 4;
                const o = e.attrs || [],
                    i = function gM(e) {
                        for (let t = 0; t < e.length; t++)
                            if (Ah(e[t])) return t;
                        return e.length
                    }(o);
                let s = !1;
                for (let a = 0; a < t.length; a++) {
                    const l = t[a];
                    if ("number" != typeof l) {
                        if (!s)
                            if (4 & r) {
                                if (r = 2 | 1 & r, "" !== l && !dM(e, l, n) || "" === l && 1 === t.length) {
                                    if (Vt(r)) return !1;
                                    s = !0
                                }
                            } else {
                                const c = 8 & r ? l : t[++a];
                                if (8 & r && null !== e.attrs) {
                                    if (!uM(e.attrs, c, n)) {
                                        if (Vt(r)) return !1;
                                        s = !0
                                    }
                                    continue
                                }
                                const h = hM(8 & r ? "class" : l, o, ig(e), n);
                                if (-1 === h) {
                                    if (Vt(r)) return !1;
                                    s = !0;
                                    continue
                                }
                                if ("" !== c) {
                                    let g;
                                    g = h > i ? "" : o[h + 1].toLowerCase();
                                    const m = 8 & r ? g : null;
                                    if (m && -1 !== rg(m, c, 0) || 2 & r && c !== g) {
                                        if (Vt(r)) return !1;
                                        s = !0
                                    }
                                }
                            }
                    } else {
                        if (!s && !Vt(r) && !Vt(l)) return !1;
                        if (s && Vt(l)) continue;
                        s = !1, r = l | 1 & r
                    }
                }
                return Vt(r) || s
            }

            function Vt(e) {
                return 0 == (1 & e)
            }

            function hM(e, t, n, r) {
                if (null === t) return -1;
                let o = 0;
                if (r || !n) {
                    let i = !1;
                    for (; o < t.length;) {
                        const s = t[o];
                        if (s === e) return o;
                        if (3 === s || 6 === s) i = !0;
                        else {
                            if (1 === s || 2 === s) {
                                let a = t[++o];
                                for (;
                                    "string" == typeof a;) a = t[++o];
                                continue
                            }
                            if (4 === s) break;
                            if (0 === s) {
                                o += 4;
                                continue
                            }
                        }
                        o += i ? 1 : 2
                    }
                    return -1
                }
                return function mM(e, t) {
                    let n = e.indexOf(4);
                    if (n > -1)
                        for (n++; n < e.length;) {
                            const r = e[n];
                            if ("number" == typeof r) return -1;
                            if (r === t) return n;
                            n++
                        }
                    return -1
                }(t, e)
            }

            function sg(e, t, n = !1) {
                for (let r = 0; r < t.length; r++)
                    if (fM(e, t[r], n)) return !0;
                return !1
            }

            function ag(e, t) {
                return e ? ":not(" + t.trim() + ")" : t
            }

            function yM(e) {
                let t = e[0],
                    n = 1,
                    r = 2,
                    o = "",
                    i = !1;
                for (; n < e.length;) {
                    let s = e[n];
                    if ("string" == typeof s)
                        if (2 & r) {
                            const a = e[++n];
                            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                        } else 8 & r ? o += "." + s : 4 & r && (o += " " + s);
                    else "" !== o && !Vt(s) && (t += ag(i, o), o = ""), r = s, i = i || !Vt(r);
                    n++
                }
                return "" !== o && (t += ag(i, o)), t
            }
            const U = {};

            function Ue(e) {
                lg(X(), M(), et() + e, !1)
            }

            function lg(e, t, n, r) {
                if (!r)
                    if (3 == (3 & t[2])) {
                        const i = e.preOrderCheckHooks;
                        null !== i && rs(t, i, n)
                    } else {
                        const i = e.preOrderHooks;
                        null !== i && os(t, i, 0, n)
                    }
                Yn(n)
            }

            function fg(e, t = null, n = null, r) {
                const o = hg(e, t, n, r);
                return o.resolveInjectorInitializers(), o
            }

            function hg(e, t = null, n = null, r, o = new Set) {
                const i = [n || ee, VD(e)];
                return r = r || ("object" == typeof e ? void 0 : ae(e)), new Yp(i, t || Ds(), r || null, o)
            }
            let jt = (() => {
                class e {
                    static create(n, r) {
                        if (Array.isArray(n)) return fg({
                            name: ""
                        }, r, n, ""); {
                            const o = n.name ? ? "";
                            return fg({
                                name: o
                            }, n.parent, n.providers, o)
                        }
                    }
                }
                return e.THROW_IF_NOT_FOUND = Co, e.NULL = new Gp, e.\u0275prov = A({
                    token: e,
                    providedIn: "any",
                    factory: () => x($p)
                }), e.__NG_ELEMENT_ID__ = -1, e
            })();

            function w(e, t = F.Default) {
                const n = M();
                return null === n ? x(e, t) : Bh(je(), n, N(e), t)
            }

            function wg(e, t) {
                const n = e.contentQueries;
                if (null !== n)
                    for (let r = 0; r < n.length; r += 2) {
                        const i = n[r + 1];
                        if (-1 !== i) {
                            const s = e.data[i];
                            xl(n[r]), s.contentQueries(2, t[i], i)
                        }
                    }
            }

            function Es(e, t, n, r, o, i, s, a, l, c, u) {
                const h = t.blueprint.slice();
                return h[0] = o, h[2] = 76 | r, (null !== u || e && 1024 & e[2]) && (h[2] |= 1024), vh(h), h[3] = h[15] = e, h[8] = n, h[10] = s || e && e[10], h[q] = a || e && e[q], h[12] = l || e && e[12] || null, h[9] = c || e && e[9] || null, h[6] = i, h[20] = function Vb() {
                    return Lb++
                }(), h[21] = u, h[16] = 2 == t.type ? e[16] : h, h
            }

            function jr(e, t, n, r, o) {
                let i = e.data[t];
                if (null === i) i = function Ac(e, t, n, r, o) {
                        const i = _h(),
                            s = Sl(),
                            l = e.data[t] = function zM(e, t, n, r, o, i) {
                                return {
                                    type: n,
                                    index: r,
                                    insertBeforeIndex: null,
                                    injectorIndex: t ? t.injectorIndex : -1,
                                    directiveStart: -1,
                                    directiveEnd: -1,
                                    directiveStylingLast: -1,
                                    componentOffset: -1,
                                    propertyBindings: null,
                                    flags: 0,
                                    providerIndexes: 0,
                                    value: o,
                                    attrs: i,
                                    mergedAttrs: null,
                                    localNames: null,
                                    initialInputs: void 0,
                                    inputs: null,
                                    outputs: null,
                                    tViews: null,
                                    next: null,
                                    projectionNext: null,
                                    child: null,
                                    parent: t,
                                    projection: null,
                                    styles: null,
                                    stylesWithoutHost: null,
                                    residualStyles: void 0,
                                    classes: null,
                                    classesWithoutHost: null,
                                    residualClasses: void 0,
                                    classBindings: 0,
                                    styleBindings: 0
                                }
                            }(0, s ? i : i && i.parent, n, t, r, o);
                        return null === e.firstChild && (e.firstChild = l), null !== i && (s ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l)), l
                    }(e, t, n, r, o),
                    function H0() {
                        return B.lFrame.inI18n
                    }() && (i.flags |= 32);
                else if (64 & i.type) {
                    i.type = n, i.value = r, i.attrs = o;
                    const s = function Io() {
                        const e = B.lFrame,
                            t = e.currentTNode;
                        return e.isParent ? t : t.parent
                    }();
                    i.injectorIndex = null === s ? -1 : s.injectorIndex
                }
                return Yt(i, !0), i
            }

            function zo(e, t, n, r) {
                if (0 === n) return -1;
                const o = t.length;
                for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
                return o
            }

            function Tc(e, t, n) {
                Al(t);
                try {
                    const r = e.viewQuery;
                    null !== r && Hc(1, r, n);
                    const o = e.template;
                    null !== o && bg(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && wg(e, t), e.staticViewQueries && Hc(2, e.viewQuery, n);
                    const i = e.components;
                    null !== i && function UM(e, t) {
                        for (let n = 0; n < t.length; n++) cE(e, t[n])
                    }(t, i)
                } catch (r) {
                    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
                } finally {
                    t[2] &= -5, Tl()
                }
            }

            function Ss(e, t, n, r) {
                const o = t[2];
                if (128 != (128 & o)) {
                    Al(t);
                    try {
                        vh(t),
                            function bh(e) {
                                return B.lFrame.bindingIndex = e
                            }(e.bindingStartIndex), null !== n && bg(e, t, n, 2, r);
                        const s = 3 == (3 & o);
                        if (s) {
                            const c = e.preOrderCheckHooks;
                            null !== c && rs(t, c, null)
                        } else {
                            const c = e.preOrderHooks;
                            null !== c && os(t, c, 0, null), kl(t, 0)
                        }
                        if (function aE(e) {
                                for (let t = ec(e); null !== t; t = tc(t)) {
                                    if (!t[2]) continue;
                                    const n = t[9];
                                    for (let r = 0; r < n.length; r++) {
                                        const o = n[r];
                                        512 & o[2] || El(o[3], 1), o[2] |= 512
                                    }
                                }
                            }(t), function sE(e) {
                                for (let t = ec(e); null !== t; t = tc(t))
                                    for (let n = 10; n < t.length; n++) {
                                        const r = t[n],
                                            o = r[1];
                                        ts(r) && Ss(o, r, o.template, r[8])
                                    }
                            }(t), null !== e.contentQueries && wg(e, t), s) {
                            const c = e.contentCheckHooks;
                            null !== c && rs(t, c)
                        } else {
                            const c = e.contentHooks;
                            null !== c && os(t, c, 1), kl(t, 1)
                        }! function jM(e, t) {
                            const n = e.hostBindingOpCodes;
                            if (null !== n) try {
                                for (let r = 0; r < n.length; r++) {
                                    const o = n[r];
                                    if (o < 0) Yn(~o);
                                    else {
                                        const i = o,
                                            s = n[++r],
                                            a = n[++r];
                                        $0(s, i), a(2, t[i])
                                    }
                                }
                            } finally {
                                Yn(-1)
                            }
                        }(e, t);
                        const a = e.components;
                        null !== a && function BM(e, t) {
                            for (let n = 0; n < t.length; n++) lE(e, t[n])
                        }(t, a);
                        const l = e.viewQuery;
                        if (null !== l && Hc(2, l, r), s) {
                            const c = e.viewCheckHooks;
                            null !== c && rs(t, c)
                        } else {
                            const c = e.viewHooks;
                            null !== c && os(t, c, 2), kl(t, 2)
                        }!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), t[2] &= -41, 512 & t[2] && (t[2] &= -513, El(t[3], -1))
                    } finally {
                        Tl()
                    }
                }
            }

            function bg(e, t, n, r, o) {
                const i = et(),
                    s = 2 & r;
                try {
                    Yn(-1), s && t.length > 22 && lg(e, t, 22, !1), n(r, o)
                } finally {
                    Yn(i)
                }
            }

            function kc(e, t, n) {
                if (Dl(t)) {
                    const o = t.directiveEnd;
                    for (let i = t.directiveStart; i < o; i++) {
                        const s = e.data[i];
                        s.contentQueries && s.contentQueries(1, n[i], i)
                    }
                }
            }

            function Rc(e, t, n) {
                Ch() && (function YM(e, t, n, r) {
                    const o = n.directiveStart,
                        i = n.directiveEnd;
                    So(n) && function rE(e, t, n) {
                        const r = mt(t, e),
                            o = Dg(n),
                            i = e[10],
                            s = Is(e, Es(e, o, null, n.onPush ? 32 : 16, r, t, i, i.createRenderer(r, n), null, null, null));
                        e[t.index] = s
                    }(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || ls(n, t), We(r, t);
                    const s = n.initialInputs;
                    for (let a = o; a < i; a++) {
                        const l = e.data[a],
                            c = Qn(t, e, a, n);
                        We(c, t), null !== s && oE(0, a - o, c, l, 0, s), Lt(l) && (vt(n.index, t)[8] = Qn(t, e, a, n))
                    }
                }(e, t, n, mt(n, t)), 64 == (64 & n.flags) && Og(e, t, n))
            }

            function Nc(e, t, n = mt) {
                const r = t.localNames;
                if (null !== r) {
                    let o = t.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const s = r[i + 1],
                            a = -1 === s ? n(t, e) : e[s];
                        e[o++] = a
                    }
                }
            }

            function Dg(e) {
                const t = e.tView;
                return null === t || t.incompleteFirstPass ? e.tView = Fc(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t
            }

            function Fc(e, t, n, r, o, i, s, a, l, c) {
                const u = 22 + r,
                    h = u + o,
                    g = function HM(e, t) {
                        const n = [];
                        for (let r = 0; r < t; r++) n.push(r < e ? null : U);
                        return n
                    }(u, h),
                    m = "function" == typeof c ? c() : c;
                return g[1] = {
                    type: e,
                    blueprint: g,
                    template: n,
                    queries: null,
                    viewQuery: a,
                    declTNode: t,
                    data: g.slice().fill(null, u),
                    bindingStartIndex: u,
                    expandoStartIndex: h,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof i ? i() : i,
                    pipeRegistry: "function" == typeof s ? s() : s,
                    firstChild: null,
                    schemas: l,
                    consts: m,
                    incompleteFirstPass: !1
                }
            }

            function Mg(e, t, n, r) {
                const o = Ag(t);
                null === n ? o.push(r) : (o.push(n), e.firstCreatePass && Tg(e).push(r, o.length - 1))
            }

            function Eg(e, t, n, r) {
                for (let o in e)
                    if (e.hasOwnProperty(o)) {
                        n = null === n ? {} : n;
                        const i = e[o];
                        null === r ? Sg(n, t, o, i) : r.hasOwnProperty(o) && Sg(n, t, r[o], i)
                    }
                return n
            }

            function Sg(e, t, n, r) {
                e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r]
            }

            function _t(e, t, n, r, o, i, s, a) {
                const l = mt(t, n);
                let u, c = t.inputs;
                !a && null != c && (u = c[r]) ? ($c(e, n, u, r, o), So(t) && Ig(n, t.index)) : 3 & t.type && (r = function WM(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r), o = null != s ? s(o, t.value || "", r) : o, i.setProperty(l, r, o))
            }

            function Ig(e, t) {
                const n = vt(t, e);
                16 & n[2] || (n[2] |= 32)
            }

            function Lc(e, t, n, r) {
                let o = !1;
                if (Ch()) {
                    const i = null === r ? null : {
                            "": -1
                        },
                        s = function XM(e, t) {
                            const n = e.directiveRegistry;
                            let r = null,
                                o = null;
                            if (n)
                                for (let i = 0; i < n.length; i++) {
                                    const s = n[i];
                                    if (sg(t, s.selectors, !1))
                                        if (r || (r = []), Lt(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s), Vc(e, t, a.length)
                                            } else r.unshift(s), Vc(e, t, 0);
                                    else o = o || new Map, s.findHostDirectiveDefs ? .(s, r, o), r.push(s)
                                }
                            return null === r ? null : [r, o]
                        }(e, n);
                    let a, l;
                    null === s ? a = l = null : [a, l] = s, null !== a && (o = !0, Pg(e, t, n, a, i, l)), i && function JM(e, t, n) {
                        if (t) {
                            const r = e.localNames = [];
                            for (let o = 0; o < t.length; o += 2) {
                                const i = n[t[o + 1]];
                                if (null == i) throw new E(-301, !1);
                                r.push(t[o], i)
                            }
                        }
                    }(n, r, i)
                }
                return n.mergedAttrs = Oo(n.mergedAttrs, n.attrs), o
            }

            function Pg(e, t, n, r, o, i) {
                for (let c = 0; c < r.length; c++) jl(ls(n, t), e, r[c].type);
                ! function tE(e, t, n) {
                    e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
                }(n, e.data.length, r.length);
                for (let c = 0; c < r.length; c++) {
                    const u = r[c];
                    u.providersResolver && u.providersResolver(u)
                }
                let s = !1,
                    a = !1,
                    l = zo(e, t, r.length, null);
                for (let c = 0; c < r.length; c++) {
                    const u = r[c];
                    n.mergedAttrs = Oo(n.mergedAttrs, u.hostAttrs), nE(e, n, t, l, u), eE(l, u, o), null !== u.contentQueries && (n.flags |= 4), (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) && (n.flags |= 64);
                    const h = u.type.prototype;
                    !s && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index), s = !0), !a && (h.ngOnChanges || h.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index), a = !0), l++
                }! function GM(e, t, n) {
                    const o = t.directiveEnd,
                        i = e.data,
                        s = t.attrs,
                        a = [];
                    let l = null,
                        c = null;
                    for (let u = t.directiveStart; u < o; u++) {
                        const h = i[u],
                            g = n ? n.get(h) : null,
                            y = g ? g.outputs : null;
                        l = Eg(h.inputs, u, l, g ? g.inputs : null), c = Eg(h.outputs, u, c, y);
                        const C = null === l || null === s || ig(t) ? null : iE(l, u, s);
                        a.push(C)
                    }
                    null !== l && (l.hasOwnProperty("class") && (t.flags |= 8), l.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = l, t.outputs = c
                }(e, n, i)
            }

            function Og(e, t, n) {
                const r = n.directiveStart,
                    o = n.directiveEnd,
                    i = n.index,
                    s = function z0() {
                        return B.lFrame.currentDirectiveIndex
                    }();
                try {
                    Yn(i);
                    for (let a = r; a < o; a++) {
                        const l = e.data[a],
                            c = t[a];
                        Pl(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && QM(l, c)
                    }
                } finally {
                    Yn(-1), Pl(s)
                }
            }

            function QM(e, t) {
                null !== e.hostBindings && e.hostBindings(1, t)
            }

            function Vc(e, t, n) {
                t.componentOffset = n, (e.components || (e.components = [])).push(t.index)
            }

            function eE(e, t, n) {
                if (n) {
                    if (t.exportAs)
                        for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
                    Lt(t) && (n[""] = e)
                }
            }

            function nE(e, t, n, r, o) {
                e.data[r] = o;
                const i = o.factory || (o.factory = Zn(o.type)),
                    s = new Po(i, Lt(o), w);
                e.blueprint[r] = s, n[r] = s,
                    function KM(e, t, n, r, o) {
                        const i = o.hostBindings;
                        if (i) {
                            let s = e.hostBindingOpCodes;
                            null === s && (s = e.hostBindingOpCodes = []);
                            const a = ~t.index;
                            (function ZM(e) {
                                let t = e.length;
                                for (; t > 0;) {
                                    const n = e[--t];
                                    if ("number" == typeof n && n < 0) return n
                                }
                                return 0
                            })(s) != a && s.push(a), s.push(n, r, i)
                        }
                    }(e, t, r, zo(e, n, o.hostVars, U), o)
            }

            function Jt(e, t, n, r, o, i) {
                const s = mt(e, t);
                ! function jc(e, t, n, r, o, i, s) {
                    if (null == i) e.removeAttribute(t, o, n);
                    else {
                        const a = null == s ? j(i) : s(i, r || "", o);
                        e.setAttribute(t, o, a, n)
                    }
                }(t[q], s, i, e.value, n, r, o)
            }

            function oE(e, t, n, r, o, i) {
                const s = i[t];
                if (null !== s) {
                    const a = r.setInput;
                    for (let l = 0; l < s.length;) {
                        const c = s[l++],
                            u = s[l++],
                            h = s[l++];
                        null !== a ? r.setInput(n, h, c, u) : n[u] = h
                    }
                }
            }

            function iE(e, t, n) {
                let r = null,
                    o = 0;
                for (; o < n.length;) {
                    const i = n[o];
                    if (0 !== i)
                        if (5 !== i) {
                            if ("number" == typeof i) break;
                            if (e.hasOwnProperty(i)) {
                                null === r && (r = []);
                                const s = e[i];
                                for (let a = 0; a < s.length; a += 2)
                                    if (s[a] === t) {
                                        r.push(i, s[a + 1], n[o + 1]);
                                        break
                                    }
                            }
                            o += 2
                        } else o += 2;
                    else o += 4
                }
                return r
            }

            function xg(e, t, n, r) {
                return [e, !0, !1, t, null, 0, r, n, null, null]
            }

            function lE(e, t) {
                const n = vt(t, e);
                if (ts(n)) {
                    const r = n[1];
                    48 & n[2] ? Ss(r, n, r.template, n[8]) : n[5] > 0 && Bc(n)
                }
            }

            function Bc(e) {
                for (let r = ec(e); null !== r; r = tc(r))
                    for (let o = 10; o < r.length; o++) {
                        const i = r[o];
                        if (ts(i))
                            if (512 & i[2]) {
                                const s = i[1];
                                Ss(s, i, s.template, i[8])
                            } else i[5] > 0 && Bc(i)
                    }
                const n = e[1].components;
                if (null !== n)
                    for (let r = 0; r < n.length; r++) {
                        const o = vt(n[r], e);
                        ts(o) && o[5] > 0 && Bc(o)
                    }
            }

            function cE(e, t) {
                const n = vt(t, e),
                    r = n[1];
                (function uE(e, t) {
                    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
                })(r, n), Tc(r, n, n[8])
            }

            function Is(e, t) {
                return e[13] ? e[14][4] = t : e[13] = t, e[14] = t, t
            }

            function Uc(e) {
                for (; e;) {
                    e[2] |= 32;
                    const t = Vo(e);
                    if (b0(e) && !t) return e;
                    e = t
                }
                return null
            }

            function Ps(e, t, n, r = !0) {
                const o = t[10];
                o.begin && o.begin();
                try {
                    Ss(e, t, e.template, n)
                } catch (s) {
                    throw r && Rg(t, s), s
                } finally {
                    o.end && o.end()
                }
            }

            function Hc(e, t, n) {
                xl(0), t(e, n)
            }

            function Ag(e) {
                return e[7] || (e[7] = [])
            }

            function Tg(e) {
                return e.cleanup || (e.cleanup = [])
            }

            function Rg(e, t) {
                const n = e[9],
                    r = n ? n.get(Fr, null) : null;
                r && r.handleError(t)
            }

            function $c(e, t, n, r, o) {
                for (let i = 0; i < n.length;) {
                    const s = n[i++],
                        a = n[i++],
                        l = t[s],
                        c = e.data[s];
                    null !== c.setInput ? c.setInput(l, o, r, a) : l[a] = o
                }
            }

            function Os(e, t, n) {
                let r = n ? e.styles : null,
                    o = n ? e.classes : null,
                    i = 0;
                if (null !== t)
                    for (let s = 0; s < t.length; s++) {
                        const a = t[s];
                        "number" == typeof a ? i = a : 1 == i ? o = fl(o, a) : 2 == i && (r = fl(r, a + ": " + t[++s] + ";"))
                    }
                n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
            }

            function xs(e, t, n, r, o = !1) {
                for (; null !== n;) {
                    const i = t[n.index];
                    if (null !== i && r.push(Ve(i)), Ft(i))
                        for (let a = 10; a < i.length; a++) {
                            const l = i[a],
                                c = l[1].firstChild;
                            null !== c && xs(l[1], l, c, r)
                        }
                    const s = n.type;
                    if (8 & s) xs(e, t, n.child, r);
                    else if (32 & s) {
                        const a = Jl(n, t);
                        let l;
                        for (; l = a();) r.push(l)
                    } else if (16 & s) {
                        const a = Ep(t, n);
                        if (Array.isArray(a)) r.push(...a);
                        else {
                            const l = Vo(t[16]);
                            xs(l[1], l, a, r, !0)
                        }
                    }
                    n = o ? n.projectionNext : n.next
                }
                return r
            }
            class Go {
                get rootNodes() {
                    const t = this._lView,
                        n = t[1];
                    return xs(n, t, n.firstChild, [])
                }
                constructor(t, n) {
                    this._lView = t, this._cdRefInjectingView = n, this._appRef = null, this._attachedToViewContainer = !1
                }
                get context() {
                    return this._lView[8]
                }
                set context(t) {
                    this._lView[8] = t
                }
                get destroyed() {
                    return 128 == (128 & this._lView[2])
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const t = this._lView[3];
                        if (Ft(t)) {
                            const n = t[8],
                                r = n ? n.indexOf(this) : -1;
                            r > -1 && (oc(t, r), ds(n, r))
                        }
                        this._attachedToViewContainer = !1
                    }
                    mp(this._lView[1], this._lView)
                }
                onDestroy(t) {
                    Mg(this._lView[1], this._lView, null, t)
                }
                markForCheck() {
                    Uc(this._cdRefInjectingView || this._lView)
                }
                detach() {
                    this._lView[2] &= -65
                }
                reattach() {
                    this._lView[2] |= 64
                }
                detectChanges() {
                    Ps(this._lView[1], this._lView, this.context)
                }
                checkNoChanges() {}
                attachToViewContainerRef() {
                    if (this._appRef) throw new E(902, !1);
                    this._attachedToViewContainer = !0
                }
                detachFromAppRef() {
                    this._appRef = null,
                        function Jb(e, t) {
                            jo(e, t, t[q], 2, null, null)
                        }(this._lView[1], this._lView)
                }
                attachToAppRef(t) {
                    if (this._attachedToViewContainer) throw new E(902, !1);
                    this._appRef = t
                }
            }
            class dE extends Go {
                constructor(t) {
                    super(t), this._view = t
                }
                detectChanges() {
                    const t = this._view;
                    Ps(t[1], t, t[8], !1)
                }
                checkNoChanges() {}
                get context() {
                    return null
                }
            }
            class Ng extends Rr {
                constructor(t) {
                    super(), this.ngModule = t
                }
                resolveComponentFactory(t) {
                    const n = re(t);
                    return new Wo(n, this.ngModule)
                }
            }

            function Fg(e) {
                const t = [];
                for (let n in e) e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
                return t
            }
            class hE {
                constructor(t, n) {
                    this.injector = t, this.parentInjector = n
                }
                get(t, n, r) {
                    r = qi(r);
                    const o = this.injector.get(t, Mc, r);
                    return o !== Mc || n === Mc ? o : this.parentInjector.get(t, n, r)
                }
            }
            class Wo extends Xp {
                get inputs() {
                    return Fg(this.componentDef.inputs)
                }
                get outputs() {
                    return Fg(this.componentDef.outputs)
                }
                constructor(t, n) {
                    super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = function CM(e) {
                        return e.map(yM).join(",")
                    }(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n
                }
                create(t, n, r, o) {
                    let i = (o = o || this.ngModule) instanceof Xt ? o : o ? .injector;
                    i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                    const s = i ? new hE(t, i) : t,
                        a = s.get(eg, null);
                    if (null === a) throw new E(407, !1);
                    const l = s.get(JD, null),
                        c = a.createRenderer(null, this.componentDef),
                        u = this.componentDef.selectors[0][0] || "div",
                        h = r ? function $M(e, t, n) {
                            return e.selectRootElement(t, n === Kt.ShadowDom)
                        }(c, r, this.componentDef.encapsulation) : rc(c, u, function fE(e) {
                            const t = e.toLowerCase();
                            return "svg" === t ? "svg" : "math" === t ? "math" : null
                        }(u)),
                        g = this.componentDef.onPush ? 288 : 272,
                        m = Fc(0, null, null, 1, 0, null, null, null, null, null),
                        y = Es(null, m, null, g, null, null, a, c, l, s, null);
                    let C, _;
                    Al(y);
                    try {
                        const D = this.componentDef;
                        let S, b = null;
                        D.findHostDirectiveDefs ? (S = [], b = new Map, D.findHostDirectiveDefs(D, S, b), S.push(D)) : S = [D];
                        const R = function gE(e, t) {
                                const n = e[1];
                                return e[22] = t, jr(n, 22, 2, "#host", null)
                            }(y, h),
                            se = function mE(e, t, n, r, o, i, s, a) {
                                const l = o[1];
                                ! function vE(e, t, n, r) {
                                    for (const o of e) t.mergedAttrs = Oo(t.mergedAttrs, o.hostAttrs);
                                    null !== t.mergedAttrs && (Os(t, t.mergedAttrs, !0), null !== n && Pp(r, n, t))
                                }(r, e, t, s);
                                const c = i.createRenderer(t, n),
                                    u = Es(o, Dg(n), null, n.onPush ? 32 : 16, o[e.index], e, i, c, a || null, null, null);
                                return l.firstCreatePass && Vc(l, e, r.length - 1), Is(o, u), o[e.index] = u
                            }(R, h, D, S, y, a, c);
                        _ = mh(m, 22), h && function CE(e, t, n, r) {
                            if (r) Nl(e, n, ["ng-version", eM.full]);
                            else {
                                const {
                                    attrs: o,
                                    classes: i
                                } = function _M(e) {
                                    const t = [],
                                        n = [];
                                    let r = 1,
                                        o = 2;
                                    for (; r < e.length;) {
                                        let i = e[r];
                                        if ("string" == typeof i) 2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
                                        else {
                                            if (!Vt(o)) break;
                                            o = i
                                        }
                                        r++
                                    }
                                    return {
                                        attrs: t,
                                        classes: n
                                    }
                                }(t.selectors[0]);
                                o && Nl(e, n, o), i && i.length > 0 && Ip(e, n, i.join(" "))
                            }
                        }(c, D, h, r), void 0 !== n && function _E(e, t, n) {
                            const r = e.projection = [];
                            for (let o = 0; o < t.length; o++) {
                                const i = n[o];
                                r.push(null != i ? Array.from(i) : null)
                            }
                        }(_, this.ngContentSelectors, n), C = function yE(e, t, n, r, o, i) {
                            const s = je(),
                                a = o[1],
                                l = mt(s, o);
                            Pg(a, o, s, n, null, r);
                            for (let u = 0; u < n.length; u++) We(Qn(o, a, s.directiveStart + u, s), o);
                            Og(a, o, s), l && We(l, o);
                            const c = Qn(o, a, s.directiveStart + s.componentOffset, s);
                            if (e[8] = o[8] = c, null !== i)
                                for (const u of i) u(c, t);
                            return kc(a, s, e), c
                        }(se, D, S, b, y, [wE]), Tc(m, y, null)
                    } finally {
                        Tl()
                    }
                    return new pE(this.componentType, C, Nr(_, y), y, _)
                }
            }
            class pE extends qD {
                constructor(t, n, r, o, i) {
                    super(), this.location = r, this._rootLView = o, this._tNode = i, this.instance = n, this.hostView = this.changeDetectorRef = new dE(o), this.componentType = t
                }
                setInput(t, n) {
                    const r = this._tNode.inputs;
                    let o;
                    if (null !== r && (o = r[t])) {
                        const i = this._rootLView;
                        $c(i[1], i, o, t, n), Ig(i, this._tNode.index)
                    }
                }
                get injector() {
                    return new Er(this._tNode, this._rootLView)
                }
                destroy() {
                    this.hostView.destroy()
                }
                onDestroy(t) {
                    this.hostView.onDestroy(t)
                }
            }

            function wE() {
                const e = je();
                ns(M()[1], e)
            }

            function oe(e) {
                let t = function Lg(e) {
                        return Object.getPrototypeOf(e.prototype).constructor
                    }(e.type),
                    n = !0;
                const r = [e];
                for (; t;) {
                    let o;
                    if (Lt(e)) o = t.\u0275cmp || t.\u0275dir;
                    else {
                        if (t.\u0275cmp) throw new E(903, !1);
                        o = t.\u0275dir
                    }
                    if (o) {
                        if (n) {
                            r.push(o);
                            const s = e;
                            s.inputs = zc(e.inputs), s.declaredInputs = zc(e.declaredInputs), s.outputs = zc(e.outputs);
                            const a = o.hostBindings;
                            a && EE(e, a);
                            const l = o.viewQuery,
                                c = o.contentQueries;
                            if (l && DE(e, l), c && ME(e, c), dl(e.inputs, o.inputs), dl(e.declaredInputs, o.declaredInputs), dl(e.outputs, o.outputs), Lt(o) && o.data.animation) {
                                const u = e.data;
                                u.animation = (u.animation || []).concat(o.data.animation)
                            }
                        }
                        const i = o.features;
                        if (i)
                            for (let s = 0; s < i.length; s++) {
                                const a = i[s];
                                a && a.ngInherit && a(e), a === oe && (n = !1)
                            }
                    }
                    t = Object.getPrototypeOf(t)
                }! function bE(e) {
                    let t = 0,
                        n = null;
                    for (let r = e.length - 1; r >= 0; r--) {
                        const o = e[r];
                        o.hostVars = t += o.hostVars, o.hostAttrs = Oo(o.hostAttrs, n = Oo(n, o.hostAttrs))
                    }
                }(r)
            }

            function zc(e) {
                return e === fn ? {} : e === ee ? [] : e
            }

            function DE(e, t) {
                const n = e.viewQuery;
                e.viewQuery = n ? (r, o) => {
                    t(r, o), n(r, o)
                } : t
            }

            function ME(e, t) {
                const n = e.contentQueries;
                e.contentQueries = n ? (r, o, i) => {
                    t(r, o, i), n(r, o, i)
                } : t
            }

            function EE(e, t) {
                const n = e.hostBindings;
                e.hostBindings = n ? (r, o) => {
                    t(r, o), n(r, o)
                } : t
            }
            let As = null;

            function nr() {
                if (!As) {
                    const e = ce.Symbol;
                    if (e && e.iterator) As = e.iterator;
                    else {
                        const t = Object.getOwnPropertyNames(Map.prototype);
                        for (let n = 0; n < t.length; ++n) {
                            const r = t[n];
                            "entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (As = r)
                        }
                    }
                }
                return As
            }

            function Ts(e) {
                return !!Gc(e) && (Array.isArray(e) || !(e instanceof Map) && nr() in e)
            }

            function Gc(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }

            function qe(e, t, n) {
                return !Object.is(e[t], n) && (e[t] = n, !0)
            }

            function tn(e, t, n, r) {
                const o = M();
                return qe(o, Dr(), t) && (X(), Jt(pe(), o, e, t, n, r)), tn
            }

            function nn(e, t, n, r, o, i, s, a) {
                const l = M(),
                    c = X(),
                    u = e + 22,
                    h = c.firstCreatePass ? function NE(e, t, n, r, o, i, s, a, l) {
                        const c = t.consts,
                            u = jr(t, e, 4, s || null, An(c, a));
                        Lc(t, n, u, An(c, l)), ns(t, u);
                        const h = u.tViews = Fc(2, u, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c);
                        return null !== t.queries && (t.queries.template(t, u), h.queries = t.queries.embeddedTView(u)), u
                    }(u, c, l, t, n, r, o, i, s) : c.data[u];
                Yt(h, !1);
                const g = l[q].createComment("");
                ms(c, l, g, h), We(g, l), Is(l, l[u] = xg(g, l, g, h)), Ji(h) && Rc(c, l, h), null != s && Nc(l, h, a)
            }

            function Te(e, t, n) {
                const r = M();
                return qe(r, Dr(), t) && _t(X(), pe(), r, e, t, r[q], n, !1), Te
            }

            function Wc(e, t, n, r, o) {
                const s = o ? "class" : "style";
                $c(e, n, t.inputs[s], s, r)
            }

            function d(e, t, n, r) {
                const o = M(),
                    i = X(),
                    s = 22 + e,
                    a = o[q],
                    l = o[s] = rc(a, t, function X0() {
                        return B.lFrame.currentNamespace
                    }()),
                    c = i.firstCreatePass ? function LE(e, t, n, r, o, i, s) {
                        const a = t.consts,
                            c = jr(t, e, 2, o, An(a, i));
                        return Lc(t, n, c, An(a, s)), null !== c.attrs && Os(c, c.attrs, !1), null !== c.mergedAttrs && Os(c, c.mergedAttrs, !0), null !== t.queries && t.queries.elementStart(t, c), c
                    }(s, i, o, 0, t, n, r) : i.data[s];
                return Yt(c, !0), Pp(a, l, c), 32 != (32 & c.flags) && ms(i, o, l, c), 0 === function R0() {
                        return B.lFrame.elementDepthCount
                    }() && We(l, o),
                    function N0() {
                        B.lFrame.elementDepthCount++
                    }(), Ji(c) && (Rc(i, o, c), kc(i, c, o)), null !== r && Nc(o, c), d
            }

            function f() {
                let e = je();
                Sl() ? function Il() {
                    B.lFrame.isParent = !1
                }() : (e = e.parent, Yt(e, !1));
                const t = e;
                ! function F0() {
                    B.lFrame.elementDepthCount--
                }();
                const n = X();
                return n.firstCreatePass && (ns(n, e), Dl(e) && n.queries.elementEnd(e)), null != t.classesWithoutHost && function nb(e) {
                    return 0 != (8 & e.flags)
                }(t) && Wc(n, t, M(), t.classesWithoutHost, !0), null != t.stylesWithoutHost && function rb(e) {
                    return 0 != (16 & e.flags)
                }(t) && Wc(n, t, M(), t.stylesWithoutHost, !1), f
            }

            function v(e, t, n, r) {
                return d(e, t, n, r), f(), v
            }

            function Ko(e) {
                return !!e && "function" == typeof e.then
            }
            const Zc = function Xg(e) {
                return !!e && "function" == typeof e.subscribe
            };

            function Q(e, t, n, r) {
                const o = M(),
                    i = X(),
                    s = je();
                return function em(e, t, n, r, o, i, s) {
                    const a = Ji(r),
                        c = e.firstCreatePass && Tg(e),
                        u = t[8],
                        h = Ag(t);
                    let g = !0;
                    if (3 & r.type || s) {
                        const C = mt(r, t),
                            _ = s ? s(C) : C,
                            D = h.length,
                            S = s ? R => s(Ve(R[r.index])) : r.index;
                        let b = null;
                        if (!s && a && (b = function BE(e, t, n, r) {
                                const o = e.cleanup;
                                if (null != o)
                                    for (let i = 0; i < o.length - 1; i += 2) {
                                        const s = o[i];
                                        if (s === n && o[i + 1] === r) {
                                            const a = t[7],
                                                l = o[i + 2];
                                            return a.length > l ? a[l] : null
                                        }
                                        "string" == typeof s && (i += 2)
                                    }
                                return null
                            }(e, t, o, r.index)), null !== b)(b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = i, b.__ngLastListenerFn__ = i, g = !1;
                        else {
                            i = nm(r, t, u, i, !1);
                            const R = n.listen(_, o, i);
                            h.push(i, R), c && c.push(o, S, D, D + 1)
                        }
                    } else i = nm(r, t, u, i, !1);
                    const m = r.outputs;
                    let y;
                    if (g && null !== m && (y = m[o])) {
                        const C = y.length;
                        if (C)
                            for (let _ = 0; _ < C; _ += 2) {
                                const se = t[y[_]][y[_ + 1]].subscribe(i),
                                    be = h.length;
                                h.push(i, se), c && c.push(o, r.index, be, -(be + 1))
                            }
                    }
                }(i, o, o[q], s, e, t, r), Q
            }

            function tm(e, t, n, r) {
                try {
                    return !1 !== n(r)
                } catch (o) {
                    return Rg(e, o), !1
                }
            }

            function nm(e, t, n, r, o) {
                return function i(s) {
                    if (s === Function) return r;
                    Uc(e.componentOffset > -1 ? vt(e.index, t) : t);
                    let l = tm(t, 0, r, s),
                        c = i.__ngNextListenerFn__;
                    for (; c;) l = tm(t, 0, c, s) && l, c = c.__ngNextListenerFn__;
                    return o && !1 === l && (s.preventDefault(), s.returnValue = !1), l
                }
            }

            function Zo(e = 1) {
                return function W0(e) {
                    return (B.lFrame.contextLView = function q0(e, t) {
                        for (; e > 0;) t = t[15], e--;
                        return t
                    }(e, B.lFrame.contextLView))[8]
                }(e)
            }

            function Yo(e, t, n) {
                return Yc(e, "", t, "", n), Yo
            }

            function Yc(e, t, n, r, o) {
                const i = M(),
                    s = function Ur(e, t, n, r) {
                        return qe(e, Dr(), n) ? t + j(n) + r : U
                    }(i, t, n, r);
                return s !== U && _t(X(), pe(), i, e, s, i[q], o, !1), Yc
            }

            function Rs(e, t) {
                return e << 17 | t << 2
            }

            function kn(e) {
                return e >> 17 & 32767
            }

            function Qc(e) {
                return 2 | e
            }

            function or(e) {
                return (131068 & e) >> 2
            }

            function Xc(e, t) {
                return -131069 & e | t << 2
            }

            function Jc(e) {
                return 1 | e
            }

            function dm(e, t, n, r, o) {
                const i = e[n + 1],
                    s = null === t;
                let a = r ? kn(i) : or(i),
                    l = !1;
                for (; 0 !== a && (!1 === l || s);) {
                    const u = e[a + 1];
                    ZE(e[a], t) && (l = !0, e[a + 1] = r ? Jc(u) : Qc(u)), a = r ? kn(u) : or(u)
                }
                l && (e[n + 1] = r ? Qc(i) : Jc(i))
            }

            function ZE(e, t) {
                return null === e || null == t || (Array.isArray(e) ? e[1] : e) === t || !(!Array.isArray(e) || "string" != typeof t) && xr(e, t) >= 0
            }

            function Ns(e, t) {
                return function Bt(e, t, n, r) {
                    const o = M(),
                        i = X(),
                        s = function mn(e) {
                            const t = B.lFrame,
                                n = t.bindingIndex;
                            return t.bindingIndex = t.bindingIndex + e, n
                        }(2);
                    i.firstUpdatePass && function _m(e, t, n, r) {
                        const o = e.data;
                        if (null === o[n + 1]) {
                            const i = o[et()],
                                s = function Cm(e, t) {
                                    return t >= e.expandoStartIndex
                                }(e, n);
                            (function Mm(e, t) {
                                return 0 != (e.flags & (t ? 8 : 16))
                            })(i, r) && null === t && !s && (t = !1), t = function oS(e, t, n, r) {
                                    const o = function Ol(e) {
                                        const t = B.lFrame.currentDirectiveIndex;
                                        return -1 === t ? null : e[t]
                                    }(e);
                                    let i = r ? t.residualClasses : t.residualStyles;
                                    if (null === o) 0 === (r ? t.classBindings : t.styleBindings) && (n = Qo(n = eu(null, e, t, n, r), t.attrs, r), i = null);
                                    else {
                                        const s = t.directiveStylingLast;
                                        if (-1 === s || e[s] !== o)
                                            if (n = eu(o, e, t, n, r), null === i) {
                                                let l = function iS(e, t, n) {
                                                    const r = n ? t.classBindings : t.styleBindings;
                                                    if (0 !== or(r)) return e[kn(r)]
                                                }(e, t, r);
                                                void 0 !== l && Array.isArray(l) && (l = eu(null, e, t, l[1], r), l = Qo(l, t.attrs, r), function sS(e, t, n, r) {
                                                    e[kn(n ? t.classBindings : t.styleBindings)] = r
                                                }(e, t, r, l))
                                            } else i = function aS(e, t, n) {
                                                let r;
                                                const o = t.directiveEnd;
                                                for (let i = 1 + t.directiveStylingLast; i < o; i++) r = Qo(r, e[i].hostAttrs, n);
                                                return Qo(r, t.attrs, n)
                                            }(e, t, r)
                                    }
                                    return void 0 !== i && (r ? t.residualClasses = i : t.residualStyles = i), n
                                }(o, i, t, r),
                                function qE(e, t, n, r, o, i) {
                                    let s = i ? t.classBindings : t.styleBindings,
                                        a = kn(s),
                                        l = or(s);
                                    e[r] = n;
                                    let u, c = !1;
                                    if (Array.isArray(n) ? (u = n[1], (null === u || xr(n, u) > 0) && (c = !0)) : u = n, o)
                                        if (0 !== l) {
                                            const g = kn(e[a + 1]);
                                            e[r + 1] = Rs(g, a), 0 !== g && (e[g + 1] = Xc(e[g + 1], r)), e[a + 1] = function GE(e, t) {
                                                return 131071 & e | t << 17
                                            }(e[a + 1], r)
                                        } else e[r + 1] = Rs(a, 0), 0 !== a && (e[a + 1] = Xc(e[a + 1], r)), a = r;
                                    else e[r + 1] = Rs(l, 0), 0 === a ? a = r : e[l + 1] = Xc(e[l + 1], r), l = r;
                                    c && (e[r + 1] = Qc(e[r + 1])), dm(e, u, r, !0), dm(e, u, r, !1),
                                        function KE(e, t, n, r, o) {
                                            const i = o ? e.residualClasses : e.residualStyles;
                                            null != i && "string" == typeof t && xr(i, t) >= 0 && (n[r + 1] = Jc(n[r + 1]))
                                        }(t, u, e, r, i), s = Rs(a, l), i ? t.classBindings = s : t.styleBindings = s
                                }(o, i, t, n, s, r)
                        }
                    }(i, e, s, r), t !== U && qe(o, s, t) && function bm(e, t, n, r, o, i, s, a) {
                        if (!(3 & t.type)) return;
                        const l = e.data,
                            c = l[a + 1],
                            u = function WE(e) {
                                return 1 == (1 & e)
                            }(c) ? Dm(l, t, n, o, or(c), s) : void 0;
                        Fs(u) || (Fs(i) || function zE(e) {
                            return 2 == (2 & e)
                        }(c) && (i = Dm(l, null, n, o, a, s)), function cD(e, t, n, r, o) {
                            if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                            else {
                                let i = -1 === r.indexOf("-") ? void 0 : at.DashCase;
                                null == o ? e.removeStyle(n, r, i) : ("string" == typeof o && o.endsWith("!important") && (o = o.slice(0, -10), i |= at.Important), e.setStyle(n, r, o, i))
                            }
                        }(r, s, function es(e, t) {
                            return Ve(t[e])
                        }(et(), n), o, i))
                    }(i, i.data[et()], o, o[q], e, o[s + 1] = function uS(e, t) {
                        return null == e || ("string" == typeof t ? e += t : "object" == typeof e && (e = ae(Tn(e)))), e
                    }(t, n), r, s)
                }(e, t, null, !0), Ns
            }

            function eu(e, t, n, r, o) {
                let i = null;
                const s = n.directiveEnd;
                let a = n.directiveStylingLast;
                for (-1 === a ? a = n.directiveStart : a++; a < s && (i = t[a], r = Qo(r, i.hostAttrs, o), i !== e);) a++;
                return null !== e && (n.directiveStylingLast = a), r
            }

            function Qo(e, t, n) {
                const r = n ? 1 : 2;
                let o = -1;
                if (null !== t)
                    for (let i = 0; i < t.length; i++) {
                        const s = t[i];
                        "number" == typeof s ? o = s : o === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), yt(e, s, !!n || t[++i]))
                    }
                return void 0 === e ? null : e
            }

            function Dm(e, t, n, r, o, i) {
                const s = null === t;
                let a;
                for (; o > 0;) {
                    const l = e[o],
                        c = Array.isArray(l),
                        u = c ? l[1] : l,
                        h = null === u;
                    let g = n[o + 1];
                    g === U && (g = h ? ee : void 0);
                    let m = h ? $l(g, r) : u === r ? g : void 0;
                    if (c && !Fs(m) && (m = $l(l, r)), Fs(m) && (a = m, s)) return a;
                    const y = e[o + 1];
                    o = s ? kn(y) : or(y)
                }
                if (null !== t) {
                    let l = i ? t.residualClasses : t.residualStyles;
                    null != l && (a = $l(l, r))
                }
                return a
            }

            function Fs(e) {
                return void 0 !== e
            }

            function p(e, t = "") {
                const n = M(),
                    r = X(),
                    o = e + 22,
                    i = r.firstCreatePass ? jr(r, o, 1, t, null) : r.data[o],
                    s = n[o] = function nc(e, t) {
                        return e.createText(t)
                    }(n[q], t);
                ms(r, n, s, i), Yt(i, !1)
            }
            const Qr = "en-US";
            let qm = Qr;

            function ou(e, t, n, r, o) {
                if (e = N(e), Array.isArray(e))
                    for (let i = 0; i < e.length; i++) ou(e[i], t, n, r, o);
                else {
                    const i = X(),
                        s = M();
                    let a = tr(e) ? e : N(e.provide),
                        l = Qp(e);
                    const c = je(),
                        u = 1048575 & c.providerIndexes,
                        h = c.directiveStart,
                        g = c.providerIndexes >> 20;
                    if (tr(e) || !e.multi) {
                        const m = new Po(l, o, w),
                            y = su(a, t, o ? u : u + g, h); - 1 === y ? (jl(ls(c, s), i, a), iu(i, e, t.length), t.push(a), c.directiveStart++, c.directiveEnd++, o && (c.providerIndexes += 1048576), n.push(m), s.push(m)) : (n[y] = m, s[y] = m)
                    } else {
                        const m = su(a, t, u + g, h),
                            y = su(a, t, u, u + g),
                            _ = y >= 0 && n[y];
                        if (o && !_ || !o && !(m >= 0 && n[m])) {
                            jl(ls(c, s), i, a);
                            const D = function PI(e, t, n, r, o) {
                                const i = new Po(e, n, w);
                                return i.multi = [], i.index = t, i.componentProviders = 0, yv(i, o, r && !n), i
                            }(o ? II : SI, n.length, o, r, l);
                            !o && _ && (n[y].providerFactory = D), iu(i, e, t.length, 0), t.push(a), c.directiveStart++, c.directiveEnd++, o && (c.providerIndexes += 1048576), n.push(D), s.push(D)
                        } else iu(i, e, m > -1 ? m : y, yv(n[o ? y : m], l, !o && r));
                        !o && r && _ && n[y].componentProviders++
                    }
                }
            }

            function iu(e, t, n, r) {
                const o = tr(t),
                    i = function BD(e) {
                        return !!e.useClass
                    }(t);
                if (o || i) {
                    const l = (i ? N(t.useClass) : t).prototype.ngOnDestroy;
                    if (l) {
                        const c = e.destroyHooks || (e.destroyHooks = []);
                        if (!o && t.multi) {
                            const u = c.indexOf(n); - 1 === u ? c.push(n, [r, l]) : c[u + 1].push(r, l)
                        } else c.push(n, l)
                    }
                }
            }

            function yv(e, t, n) {
                return n && e.componentProviders++, e.multi.push(t) - 1
            }

            function su(e, t, n, r) {
                for (let o = n; o < r; o++)
                    if (t[o] === e) return o;
                return -1
            }

            function SI(e, t, n, r) {
                return au(this.multi, [])
            }

            function II(e, t, n, r) {
                const o = this.multi;
                let i;
                if (this.providerFactory) {
                    const s = this.providerFactory.componentProviders,
                        a = Qn(n, n[1], this.providerFactory.index, r);
                    i = a.slice(0, s), au(o, i);
                    for (let l = s; l < a.length; l++) i.push(a[l])
                } else i = [], au(o, i);
                return i
            }

            function au(e, t) {
                for (let n = 0; n < e.length; n++) t.push((0, e[n])());
                return t
            }

            function he(e, t = []) {
                return n => {
                    n.providersResolver = (r, o) => function EI(e, t, n) {
                        const r = X();
                        if (r.firstCreatePass) {
                            const o = Lt(e);
                            ou(n, r.data, r.blueprint, o, !0), ou(t, r.data, r.blueprint, o, !1)
                        }
                    }(r, o ? o(e) : e, t)
                }
            }
            class Xr {}
            class Cv {}
            class _v extends Xr {
                constructor(t, n) {
                    super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Ng(this);
                    const r = ht(t);
                    this._bootstrapComponents = Cn(r.bootstrap), this._r3Injector = hg(t, n, [{
                        provide: Xr,
                        useValue: this
                    }, {
                        provide: Rr,
                        useValue: this.componentFactoryResolver
                    }], ae(t), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t)
                }
                get injector() {
                    return this._r3Injector
                }
                destroy() {
                    const t = this._r3Injector;
                    !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
                }
                onDestroy(t) {
                    this.destroyCbs.push(t)
                }
            }
            class lu extends Cv {
                constructor(t) {
                    super(), this.moduleType = t
                }
                create(t) {
                    return new _v(this.moduleType, t)
                }
            }
            class xI extends Xr {
                constructor(t, n, r) {
                    super(), this.componentFactoryResolver = new Ng(this), this.instance = null;
                    const o = new Yp([...t, {
                        provide: Xr,
                        useValue: this
                    }, {
                        provide: Rr,
                        useValue: this.componentFactoryResolver
                    }], n || Ds(), r, new Set(["environment"]));
                    this.injector = o, o.resolveInjectorInitializers()
                }
                destroy() {
                    this.injector.destroy()
                }
                onDestroy(t) {
                    this.injector.onDestroy(t)
                }
            }

            function Us(e, t, n = null) {
                return new xI(e, t, n).injector
            }
            let AI = (() => {
                class e {
                    constructor(n) {
                        this._injector = n, this.cachedInjectors = new Map
                    }
                    getOrCreateStandaloneInjector(n) {
                        if (!n.standalone) return null;
                        if (!this.cachedInjectors.has(n.id)) {
                            const r = Wp(0, n.type),
                                o = r.length > 0 ? Us([r], this._injector, `Standalone[${n.type.name}]`) : null;
                            this.cachedInjectors.set(n.id, o)
                        }
                        return this.cachedInjectors.get(n.id)
                    }
                    ngOnDestroy() {
                        try {
                            for (const n of this.cachedInjectors.values()) null !== n && n.destroy()
                        } finally {
                            this.cachedInjectors.clear()
                        }
                    }
                }
                return e.\u0275prov = A({
                    token: e,
                    providedIn: "environment",
                    factory: () => new e(x(Xt))
                }), e
            })();

            function wv(e) {
                e.getStandaloneInjector = t => t.get(AI).getOrCreateStandaloneInjector(e)
            }

            function ri(e, t, n, r) {
                return function Pv(e, t, n, r, o, i) {
                    const s = t + n;
                    return qe(e, s, o) ? function en(e, t, n) {
                        return e[t] = n
                    }(e, s + 1, i ? r.call(i, o) : r(o)) : function oi(e, t) {
                        const n = e[t];
                        return n === U ? void 0 : n
                    }(e, s + 1)
                }(M(), function Je() {
                    const e = B.lFrame;
                    let t = e.bindingRootIndex;
                    return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
                }(), e, t, n, r)
            }

            function uu(e) {
                return t => {
                    setTimeout(e, void 0, t)
                }
            }
            const J = class nP extends Wt {
                constructor(t = !1) {
                    super(), this.__isAsync = t
                }
                emit(t) {
                    super.next(t)
                }
                subscribe(t, n, r) {
                    let o = t,
                        i = n || (() => null),
                        s = r;
                    if (t && "object" == typeof t) {
                        const l = t;
                        o = l.next ? .bind(l), i = l.error ? .bind(l), s = l.complete ? .bind(l)
                    }
                    this.__isAsync && (i = uu(i), o && (o = uu(o)), s && (s = uu(s)));
                    const a = super.subscribe({
                        next: o,
                        error: i,
                        complete: s
                    });
                    return t instanceof bt && t.add(a), a
                }
            };

            function rP() {
                return this._results[nr()]()
            }
            class du {
                get changes() {
                    return this._changes || (this._changes = new J)
                }
                constructor(t = !1) {
                    this._emitDistinctChangesOnly = t, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
                    const n = nr(),
                        r = du.prototype;
                    r[n] || (r[n] = rP)
                }
                get(t) {
                    return this._results[t]
                }
                map(t) {
                    return this._results.map(t)
                }
                filter(t) {
                    return this._results.filter(t)
                }
                find(t) {
                    return this._results.find(t)
                }
                reduce(t, n) {
                    return this._results.reduce(t, n)
                }
                forEach(t) {
                    this._results.forEach(t)
                }
                some(t) {
                    return this._results.some(t)
                }
                toArray() {
                    return this._results.slice()
                }
                toString() {
                    return this._results.toString()
                }
                reset(t, n) {
                    const r = this;
                    r.dirty = !1;
                    const o = function It(e) {
                        return e.flat(Number.POSITIVE_INFINITY)
                    }(t);
                    (this._changesDetected = ! function hb(e, t, n) {
                        if (e.length !== t.length) return !1;
                        for (let r = 0; r < e.length; r++) {
                            let o = e[r],
                                i = t[r];
                            if (n && (o = n(o), i = n(i)), i !== o) return !1
                        }
                        return !0
                    }(r._results, o, n)) && (r._results = o, r.length = o.length, r.last = o[this.length - 1], r.first = o[0])
                }
                notifyOnChanges() {
                    this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
                }
                setDirty() {
                    this.dirty = !0
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe()
                }
            }
            let wn = (() => {
                class e {}
                return e.__NG_ELEMENT_ID__ = sP, e
            })();
            const oP = wn,
                iP = class extends oP {
                    constructor(t, n, r) {
                        super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r
                    }
                    createEmbeddedView(t, n) {
                        const r = this._declarationTContainer.tViews,
                            o = Es(this._declarationLView, r, t, 16, null, r.declTNode, null, null, null, null, n || null);
                        o[17] = this._declarationLView[this._declarationTContainer.index];
                        const s = this._declarationLView[19];
                        return null !== s && (o[19] = s.createEmbeddedView(r)), Tc(r, o, t), new Go(o)
                    }
                };

            function sP() {
                return Hs(je(), M())
            }

            function Hs(e, t) {
                return 4 & e.type ? new iP(t, e, Nr(e, t)) : null
            }
            let Ot = (() => {
                class e {}
                return e.__NG_ELEMENT_ID__ = aP, e
            })();

            function aP() {
                return Nv(je(), M())
            }
            const lP = Ot,
                kv = class extends lP {
                    constructor(t, n, r) {
                        super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
                    }
                    get element() {
                        return Nr(this._hostTNode, this._hostLView)
                    }
                    get injector() {
                        return new Er(this._hostTNode, this._hostLView)
                    }
                    get parentInjector() {
                        const t = Vl(this._hostTNode, this._hostLView);
                        if (Rh(t)) {
                            const n = ss(t, this._hostLView),
                                r = is(t);
                            return new Er(n[1].data[r + 8], n)
                        }
                        return new Er(null, this._hostLView)
                    }
                    clear() {
                        for (; this.length > 0;) this.remove(this.length - 1)
                    }
                    get(t) {
                        const n = Rv(this._lContainer);
                        return null !== n && n[t] || null
                    }
                    get length() {
                        return this._lContainer.length - 10
                    }
                    createEmbeddedView(t, n, r) {
                        let o, i;
                        "number" == typeof r ? o = r : null != r && (o = r.index, i = r.injector);
                        const s = t.createEmbeddedView(n || {}, i);
                        return this.insert(s, o), s
                    }
                    createComponent(t, n, r, o, i) {
                        const s = t && ! function Ao(e) {
                            return "function" == typeof e
                        }(t);
                        let a;
                        if (s) a = n;
                        else {
                            const h = n || {};
                            a = h.index, r = h.injector, o = h.projectableNodes, i = h.environmentInjector || h.ngModuleRef
                        }
                        const l = s ? t : new Wo(re(t)),
                            c = r || this.parentInjector;
                        if (!i && null == l.ngModule) {
                            const g = (s ? c : this.parentInjector).get(Xt, null);
                            g && (i = g)
                        }
                        const u = l.create(c, o, void 0, i);
                        return this.insert(u.hostView, a), u
                    }
                    insert(t, n) {
                        const r = t._lView,
                            o = r[1];
                        if (function k0(e) {
                                return Ft(e[3])
                            }(r)) {
                            const u = this.indexOf(t);
                            if (-1 !== u) this.detach(u);
                            else {
                                const h = r[3],
                                    g = new kv(h, h[6], h[3]);
                                g.detach(g.indexOf(t))
                            }
                        }
                        const i = this._adjustIndex(n),
                            s = this._lContainer;
                        ! function tD(e, t, n, r) {
                            const o = 10 + r,
                                i = n.length;
                            r > 0 && (n[o - 1][4] = t), r < i - 10 ? (t[4] = n[o], Wh(n, 10 + r, t)) : (n.push(t), t[4] = null), t[3] = n;
                            const s = t[17];
                            null !== s && n !== s && function nD(e, t) {
                                const n = e[9];
                                t[16] !== t[3][3][16] && (e[2] = !0), null === n ? e[9] = [t] : n.push(t)
                            }(s, t);
                            const a = t[19];
                            null !== a && a.insertView(e), t[2] |= 64
                        }(o, r, s, i);
                        const a = ac(i, s),
                            l = r[q],
                            c = gs(l, s[7]);
                        return null !== c && function Xb(e, t, n, r, o, i) {
                            r[0] = o, r[6] = t, jo(e, r, n, 1, o, i)
                        }(o, s[6], l, r, c, a), t.attachToViewContainerRef(), Wh(fu(s), i, t), t
                    }
                    move(t, n) {
                        return this.insert(t, n)
                    }
                    indexOf(t) {
                        const n = Rv(this._lContainer);
                        return null !== n ? n.indexOf(t) : -1
                    }
                    remove(t) {
                        const n = this._adjustIndex(t, -1),
                            r = oc(this._lContainer, n);
                        r && (ds(fu(this._lContainer), n), mp(r[1], r))
                    }
                    detach(t) {
                        const n = this._adjustIndex(t, -1),
                            r = oc(this._lContainer, n);
                        return r && null != ds(fu(this._lContainer), n) ? new Go(r) : null
                    }
                    _adjustIndex(t, n = 0) {
                        return t ? ? this.length + n
                    }
                };

            function Rv(e) {
                return e[8]
            }

            function fu(e) {
                return e[8] || (e[8] = [])
            }

            function Nv(e, t) {
                let n;
                const r = t[e.index];
                if (Ft(r)) n = r;
                else {
                    let o;
                    if (8 & e.type) o = Ve(r);
                    else {
                        const i = t[q];
                        o = i.createComment("");
                        const s = mt(e, t);
                        Jn(i, gs(i, s), o, function sD(e, t) {
                            return e.nextSibling(t)
                        }(i, s), !1)
                    }
                    t[e.index] = n = xg(r, t, o, e), Is(t, n)
                }
                return new kv(n, e, t)
            }
            class hu {
                constructor(t) {
                    this.queryList = t, this.matches = null
                }
                clone() {
                    return new hu(this.queryList)
                }
                setDirty() {
                    this.queryList.setDirty()
                }
            }
            class pu {
                constructor(t = []) {
                    this.queries = t
                }
                createEmbeddedView(t) {
                    const n = t.queries;
                    if (null !== n) {
                        const r = null !== t.contentQueries ? t.contentQueries[0] : n.length,
                            o = [];
                        for (let i = 0; i < r; i++) {
                            const s = n.getByIndex(i);
                            o.push(this.queries[s.indexInDeclarationView].clone())
                        }
                        return new pu(o)
                    }
                    return null
                }
                insertView(t) {
                    this.dirtyQueriesWithMatches(t)
                }
                detachView(t) {
                    this.dirtyQueriesWithMatches(t)
                }
                dirtyQueriesWithMatches(t) {
                    for (let n = 0; n < this.queries.length; n++) null !== Hv(t, n).matches && this.queries[n].setDirty()
                }
            }
            class Fv {
                constructor(t, n, r = null) {
                    this.predicate = t, this.flags = n, this.read = r
                }
            }
            class gu {
                constructor(t = []) {
                    this.queries = t
                }
                elementStart(t, n) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n)
                }
                elementEnd(t) {
                    for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t)
                }
                embeddedTView(t) {
                    let n = null;
                    for (let r = 0; r < this.length; r++) {
                        const o = null !== n ? n.length : 0,
                            i = this.getByIndex(r).embeddedTView(t, o);
                        i && (i.indexInDeclarationView = r, null !== n ? n.push(i) : n = [i])
                    }
                    return null !== n ? new gu(n) : null
                }
                template(t, n) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n)
                }
                getByIndex(t) {
                    return this.queries[t]
                }
                get length() {
                    return this.queries.length
                }
                track(t) {
                    this.queries.push(t)
                }
            }
            class mu {
                constructor(t, n = -1) {
                    this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n
                }
                elementStart(t, n) {
                    this.isApplyingToNode(n) && this.matchTNode(t, n)
                }
                elementEnd(t) {
                    this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
                }
                template(t, n) {
                    this.elementStart(t, n)
                }
                embeddedTView(t, n) {
                    return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new mu(this.metadata)) : null
                }
                isApplyingToNode(t) {
                    if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                        const n = this._declarationNodeIndex;
                        let r = t.parent;
                        for (; null !== r && 8 & r.type && r.index !== n;) r = r.parent;
                        return n === (null !== r ? r.index : -1)
                    }
                    return this._appliesToNextNode
                }
                matchTNode(t, n) {
                    const r = this.metadata.predicate;
                    if (Array.isArray(r))
                        for (let o = 0; o < r.length; o++) {
                            const i = r[o];
                            this.matchTNodeWithReadOption(t, n, cP(n, i)), this.matchTNodeWithReadOption(t, n, cs(n, t, i, !1, !1))
                        } else r === wn ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, cs(n, t, r, !1, !1))
                }
                matchTNodeWithReadOption(t, n, r) {
                    if (null !== r) {
                        const o = this.metadata.read;
                        if (null !== o)
                            if (o === Ct || o === Ot || o === wn && 4 & n.type) this.addMatch(n.index, -2);
                            else {
                                const i = cs(n, t, o, !1, !1);
                                null !== i && this.addMatch(n.index, i)
                            }
                        else this.addMatch(n.index, r)
                    }
                }
                addMatch(t, n) {
                    null === this.matches ? this.matches = [t, n] : this.matches.push(t, n)
                }
            }

            function cP(e, t) {
                const n = e.localNames;
                if (null !== n)
                    for (let r = 0; r < n.length; r += 2)
                        if (n[r] === t) return n[r + 1];
                return null
            }

            function dP(e, t, n, r) {
                return -1 === n ? function uP(e, t) {
                    return 11 & e.type ? Nr(e, t) : 4 & e.type ? Hs(e, t) : null
                }(t, e) : -2 === n ? function fP(e, t, n) {
                    return n === Ct ? Nr(t, e) : n === wn ? Hs(t, e) : n === Ot ? Nv(t, e) : void 0
                }(e, t, r) : Qn(e, e[1], n, t)
            }

            function Lv(e, t, n, r) {
                const o = t[19].queries[r];
                if (null === o.matches) {
                    const i = e.data,
                        s = n.matches,
                        a = [];
                    for (let l = 0; l < s.length; l += 2) {
                        const c = s[l];
                        a.push(c < 0 ? null : dP(t, i[c], s[l + 1], n.metadata.read))
                    }
                    o.matches = a
                }
                return o.matches
            }

            function vu(e, t, n, r) {
                const o = e.queries.getByIndex(n),
                    i = o.matches;
                if (null !== i) {
                    const s = Lv(e, t, o, n);
                    for (let a = 0; a < i.length; a += 2) {
                        const l = i[a];
                        if (l > 0) r.push(s[a / 2]);
                        else {
                            const c = i[a + 1],
                                u = t[-l];
                            for (let h = 10; h < u.length; h++) {
                                const g = u[h];
                                g[17] === g[3] && vu(g[1], g, c, r)
                            }
                            if (null !== u[9]) {
                                const h = u[9];
                                for (let g = 0; g < h.length; g++) {
                                    const m = h[g];
                                    vu(m[1], m, c, r)
                                }
                            }
                        }
                    }
                }
                return r
            }

            function yu(e) {
                const t = M(),
                    n = X(),
                    r = Mh();
                xl(r + 1);
                const o = Hv(n, r);
                if (e.dirty && function T0(e) {
                        return 4 == (4 & e[2])
                    }(t) === (2 == (2 & o.metadata.flags))) {
                    if (null === o.matches) e.reset([]);
                    else {
                        const i = o.crossesNgTemplate ? vu(n, t, r, []) : Lv(n, t, o, r);
                        e.reset(i, QD), e.notifyOnChanges()
                    }
                    return !0
                }
                return !1
            }

            function Cu() {
                return function hP(e, t) {
                    return e[19].queries[t].queryList
                }(M(), Mh())
            }

            function Bv(e, t, n) {
                const r = new du(4 == (4 & n));
                Mg(e, t, r, r.destroy), null === t[19] && (t[19] = new pu), t[19].queries.push(new hu(r))
            }

            function Uv(e, t, n) {
                null === e.queries && (e.queries = new gu), e.queries.track(new mu(t, n))
            }

            function Hv(e, t) {
                return e.queries.getByIndex(t)
            }

            function zs(...e) {}
            const Gs = new O("Application Initializer");
            let Ws = (() => {
                class e {
                    constructor(n) {
                        this.appInits = n, this.resolve = zs, this.reject = zs, this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, o) => {
                            this.resolve = r, this.reject = o
                        })
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const n = [],
                            r = () => {
                                this.done = !0, this.resolve()
                            };
                        if (this.appInits)
                            for (let o = 0; o < this.appInits.length; o++) {
                                const i = this.appInits[o]();
                                if (Ko(i)) n.push(i);
                                else if (Zc(i)) {
                                    const s = new Promise((a, l) => {
                                        i.subscribe({
                                            complete: a,
                                            error: l
                                        })
                                    });
                                    n.push(s)
                                }
                            }
                        Promise.all(n).then(() => {
                            r()
                        }).catch(o => {
                            this.reject(o)
                        }), 0 === n.length && r(), this.initialized = !0
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(Gs, 8))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const ai = new O("AppId", {
                providedIn: "root",
                factory: function ay() {
                    return `${Mu()}${Mu()}${Mu()}`
                }
            });

            function Mu() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()))
            }
            const ly = new O("Platform Initializer"),
                Eu = new O("Platform ID", {
                    providedIn: "platform",
                    factory: () => "unknown"
                }),
                cy = new O("appBootstrapListener");
            let NP = (() => {
                class e {
                    log(n) {
                        console.log(n)
                    }
                    warn(n) {
                        console.warn(n)
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                }), e
            })();
            const bn = new O("LocaleId", {
                providedIn: "root",
                factory: () => K(bn, F.Optional | F.SkipSelf) || function FP() {
                    return typeof $localize < "u" && $localize.locale || Qr
                }()
            });
            class VP {
                constructor(t, n) {
                    this.ngModuleFactory = t, this.componentFactories = n
                }
            }
            let uy = (() => {
                class e {
                    compileModuleSync(n) {
                        return new lu(n)
                    }
                    compileModuleAsync(n) {
                        return Promise.resolve(this.compileModuleSync(n))
                    }
                    compileModuleAndAllComponentsSync(n) {
                        const r = this.compileModuleSync(n),
                            i = Cn(ht(n).declarations).reduce((s, a) => {
                                const l = re(a);
                                return l && s.push(new Wo(l)), s
                            }, []);
                        return new VP(r, i)
                    }
                    compileModuleAndAllComponentsAsync(n) {
                        return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
                    }
                    clearCache() {}
                    clearCacheFor(n) {}
                    getModuleId(n) {}
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const UP = (() => Promise.resolve(0))();

            function Su(e) {
                typeof Zone > "u" ? UP.then(() => {
                    e && e.apply(null, null)
                }) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
            }
            class Se {
                constructor({
                    enableLongStackTrace: t = !1,
                    shouldCoalesceEventChangeDetection: n = !1,
                    shouldCoalesceRunChangeDetection: r = !1
                }) {
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new J(!1), this.onMicrotaskEmpty = new J(!1), this.onStable = new J(!1), this.onError = new J(!1), typeof Zone > "u") throw new E(908, !1);
                    Zone.assertZonePatched();
                    const o = this;
                    o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = function HP() {
                            let e = ce.requestAnimationFrame,
                                t = ce.cancelAnimationFrame;
                            if (typeof Zone < "u" && e && t) {
                                const n = e[Zone.__symbol__("OriginalDelegate")];
                                n && (e = n);
                                const r = t[Zone.__symbol__("OriginalDelegate")];
                                r && (t = r)
                            }
                            return {
                                nativeRequestAnimationFrame: e,
                                nativeCancelAnimationFrame: t
                            }
                        }().nativeRequestAnimationFrame,
                        function GP(e) {
                            const t = () => {
                                ! function zP(e) {
                                    e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(ce, () => {
                                        e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                            e.lastRequestAnimationFrameId = -1, Pu(e), e.isCheckStableRunning = !0, Iu(e), e.isCheckStableRunning = !1
                                        }, void 0, () => {}, () => {})), e.fakeTopEventTask.invoke()
                                    }), Pu(e))
                                }(e)
                            };
                            e._inner = e._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0
                                },
                                onInvokeTask: (n, r, o, i, s, a) => {
                                    try {
                                        return hy(e), n.invokeTask(o, i, s, a)
                                    } finally {
                                        (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(), py(e)
                                    }
                                },
                                onInvoke: (n, r, o, i, s, a, l) => {
                                    try {
                                        return hy(e), n.invoke(o, i, s, a, l)
                                    } finally {
                                        e.shouldCoalesceRunChangeDetection && t(), py(e)
                                    }
                                },
                                onHasTask: (n, r, o, i) => {
                                    n.hasTask(o, i), r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask, Pu(e), Iu(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                                },
                                onHandleError: (n, r, o, i) => (n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
                            })
                        }(o)
                }
                static isInAngularZone() {
                    return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!Se.isInAngularZone()) throw new E(909, !1)
                }
                static assertNotInAngularZone() {
                    if (Se.isInAngularZone()) throw new E(909, !1)
                }
                run(t, n, r) {
                    return this._inner.run(t, n, r)
                }
                runTask(t, n, r, o) {
                    const i = this._inner,
                        s = i.scheduleEventTask("NgZoneEvent: " + o, t, $P, zs, zs);
                    try {
                        return i.runTask(s, n, r)
                    } finally {
                        i.cancelTask(s)
                    }
                }
                runGuarded(t, n, r) {
                    return this._inner.runGuarded(t, n, r)
                }
                runOutsideAngular(t) {
                    return this._outer.run(t)
                }
            }
            const $P = {};

            function Iu(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                    e._nesting++, e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--, !e.hasPendingMicrotasks) try {
                        e.runOutsideAngular(() => e.onStable.emit(null))
                    } finally {
                        e.isStable = !0
                    }
                }
            }

            function Pu(e) {
                e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
            }

            function hy(e) {
                e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
            }

            function py(e) {
                e._nesting--, Iu(e)
            }
            class WP {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new J, this.onMicrotaskEmpty = new J, this.onStable = new J, this.onError = new J
                }
                run(t, n, r) {
                    return t.apply(n, r)
                }
                runGuarded(t, n, r) {
                    return t.apply(n, r)
                }
                runOutsideAngular(t) {
                    return t()
                }
                runTask(t, n, r, o) {
                    return t.apply(n, r)
                }
            }
            const gy = new O(""),
                qs = new O("");
            let Au, Ou = (() => {
                    class e {
                        constructor(n, r, o) {
                            this._ngZone = n, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, Au || (function qP(e) {
                                Au = e
                            }(o), o.addToWindow(r)), this._watchAngularEvents(), n.run(() => {
                                this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                            })
                        }
                        _watchAngularEvents() {
                            this._ngZone.onUnstable.subscribe({
                                next: () => {
                                    this._didWork = !0, this._isZoneStable = !1
                                }
                            }), this._ngZone.runOutsideAngular(() => {
                                this._ngZone.onStable.subscribe({
                                    next: () => {
                                        Se.assertNotInAngularZone(), Su(() => {
                                            this._isZoneStable = !0, this._runCallbacksIfReady()
                                        })
                                    }
                                })
                            })
                        }
                        increasePendingRequestCount() {
                            return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                        }
                        decreasePendingRequestCount() {
                            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                            return this._runCallbacksIfReady(), this._pendingCount
                        }
                        isStable() {
                            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                        }
                        _runCallbacksIfReady() {
                            if (this.isStable()) Su(() => {
                                for (; 0 !== this._callbacks.length;) {
                                    let n = this._callbacks.pop();
                                    clearTimeout(n.timeoutId), n.doneCb(this._didWork)
                                }
                                this._didWork = !1
                            });
                            else {
                                let n = this.getPendingTasks();
                                this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0
                            }
                        }
                        getPendingTasks() {
                            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
                                source: n.source,
                                creationLocation: n.creationLocation,
                                data: n.data
                            })) : []
                        }
                        addCallback(n, r, o) {
                            let i = -1;
                            r && r > 0 && (i = setTimeout(() => {
                                this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), n(this._didWork, this.getPendingTasks())
                            }, r)), this._callbacks.push({
                                doneCb: n,
                                timeoutId: i,
                                updateCb: o
                            })
                        }
                        whenStable(n, r, o) {
                            if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                            this.addCallback(n, r, o), this._runCallbacksIfReady()
                        }
                        getPendingRequestCount() {
                            return this._pendingCount
                        }
                        registerApplication(n) {
                            this.registry.registerApplication(n, this)
                        }
                        unregisterApplication(n) {
                            this.registry.unregisterApplication(n)
                        }
                        findProviders(n, r, o) {
                            return []
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(Se), x(xu), x(qs))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })(),
                xu = (() => {
                    class e {
                        constructor() {
                            this._applications = new Map
                        }
                        registerApplication(n, r) {
                            this._applications.set(n, r)
                        }
                        unregisterApplication(n) {
                            this._applications.delete(n)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(n) {
                            return this._applications.get(n) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(n, r = !0) {
                            return Au ? .findTestabilityInTree(this, n, r) ? ? null
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "platform"
                    }), e
                })(),
                Rn = null;
            const my = new O("AllowMultipleToken"),
                Tu = new O("PlatformDestroyListeners");
            class vy {
                constructor(t, n) {
                    this.name = t, this.token = n
                }
            }

            function Cy(e, t, n = []) {
                const r = `Platform: ${t}`,
                    o = new O(r);
                return (i = []) => {
                    let s = ku();
                    if (!s || s.injector.get(my, !1)) {
                        const a = [...n, ...i, {
                            provide: o,
                            useValue: !0
                        }];
                        e ? e(a) : function YP(e) {
                            if (Rn && !Rn.get(my, !1)) throw new E(400, !1);
                            Rn = e;
                            const t = e.get(wy);
                            (function yy(e) {
                                const t = e.get(ly, null);
                                t && t.forEach(n => n())
                            })(e)
                        }(function _y(e = [], t) {
                            return jt.create({
                                name: t,
                                providers: [{
                                    provide: _c,
                                    useValue: "platform"
                                }, {
                                    provide: Tu,
                                    useValue: new Set([() => Rn = null])
                                }, ...e]
                            })
                        }(a, r))
                    }
                    return function XP(e) {
                        const t = ku();
                        if (!t) throw new E(401, !1);
                        return t
                    }()
                }
            }

            function ku() {
                return Rn ? .get(wy) ? ? null
            }
            let wy = (() => {
                class e {
                    constructor(n) {
                        this._injector = n, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(n, r) {
                        const o = function Dy(e, t) {
                                let n;
                                return n = "noop" === e ? new WP : ("zone.js" === e ? void 0 : e) || new Se(t), n
                            }(r ? .ngZone, function by(e) {
                                return {
                                    enableLongStackTrace: !1,
                                    shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                                    shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
                                }
                            }(r)),
                            i = [{
                                provide: Se,
                                useValue: o
                            }];
                        return o.run(() => {
                            const s = jt.create({
                                    providers: i,
                                    parent: this.injector,
                                    name: n.moduleType.name
                                }),
                                a = n.create(s),
                                l = a.injector.get(Fr, null);
                            if (!l) throw new E(402, !1);
                            return o.runOutsideAngular(() => {
                                    const c = o.onError.subscribe({
                                        next: u => {
                                            l.handleError(u)
                                        }
                                    });
                                    a.onDestroy(() => {
                                        Zs(this._modules, a), c.unsubscribe()
                                    })
                                }),
                                function My(e, t, n) {
                                    try {
                                        const r = n();
                                        return Ko(r) ? r.catch(o => {
                                            throw t.runOutsideAngular(() => e.handleError(o)), o
                                        }) : r
                                    } catch (r) {
                                        throw t.runOutsideAngular(() => e.handleError(r)), r
                                    }
                                }(l, o, () => {
                                    const c = a.injector.get(Ws);
                                    return c.runInitializers(), c.donePromise.then(() => (function Km(e) {
                                        Mt(e, "Expected localeId to be defined"), "string" == typeof e && (qm = e.toLowerCase().replace(/_/g, "-"))
                                    }(a.injector.get(bn, Qr) || Qr), this._moduleDoBootstrap(a), a))
                                })
                        })
                    }
                    bootstrapModule(n, r = []) {
                        const o = Ey({}, r);
                        return function KP(e, t, n) {
                            const r = new lu(n);
                            return Promise.resolve(r)
                        }(0, 0, n).then(i => this.bootstrapModuleFactory(i, o))
                    }
                    _moduleDoBootstrap(n) {
                        const r = n.injector.get(Ks);
                        if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach(o => r.bootstrap(o));
                        else {
                            if (!n.instance.ngDoBootstrap) throw new E(-403, !1);
                            n.instance.ngDoBootstrap(r)
                        }
                        this._modules.push(n)
                    }
                    onDestroy(n) {
                        this._destroyListeners.push(n)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new E(404, !1);
                        this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                        const n = this._injector.get(Tu, null);
                        n && (n.forEach(r => r()), n.clear()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(jt))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                }), e
            })();

            function Ey(e, t) {
                return Array.isArray(t) ? t.reduce(Ey, e) : { ...e,
                    ...t
                }
            }
            let Ks = (() => {
                class e {
                    get destroyed() {
                        return this._destroyed
                    }
                    get injector() {
                        return this._injector
                    }
                    constructor(n, r, o) {
                        this._zone = n, this._injector = r, this._exceptionHandler = o, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this._destroyed = !1, this._destroyListeners = [], this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this._zone.run(() => {
                                    this.tick()
                                })
                            }
                        });
                        const i = new ye(a => {
                                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                                    a.next(this._stable), a.complete()
                                })
                            }),
                            s = new ye(a => {
                                let l;
                                this._zone.runOutsideAngular(() => {
                                    l = this._zone.onStable.subscribe(() => {
                                        Se.assertNotInAngularZone(), Su(() => {
                                            !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, a.next(!0))
                                        })
                                    })
                                });
                                const c = this._zone.onUnstable.subscribe(() => {
                                    Se.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                        a.next(!1)
                                    }))
                                });
                                return () => {
                                    l.unsubscribe(), c.unsubscribe()
                                }
                            });
                        this.isStable = function X1(...e) {
                            const t = yo(e),
                                n = function G1(e, t) {
                                    return "number" == typeof cl(e) ? e.pop() : t
                                }(e, 1 / 0),
                                r = e;
                            return r.length ? 1 === r.length ? Dt(r[0]) : gr(n)(Me(r, t)) : qt
                        }(i, s.pipe(function J1(e = {}) {
                            const {
                                connector: t = (() => new Wt),
                                resetOnError: n = !0,
                                resetOnComplete: r = !0,
                                resetOnRefCountZero: o = !0
                            } = e;
                            return i => {
                                let s, a, l, c = 0,
                                    u = !1,
                                    h = !1;
                                const g = () => {
                                        a ? .unsubscribe(), a = void 0
                                    },
                                    m = () => {
                                        g(), s = l = void 0, u = h = !1
                                    },
                                    y = () => {
                                        const C = s;
                                        m(), C ? .unsubscribe()
                                    };
                                return xe((C, _) => {
                                    c++, !h && !u && g();
                                    const D = l = l ? ? t();
                                    _.add(() => {
                                        c--, 0 === c && !h && !u && (a = ul(y, o))
                                    }), D.subscribe(_), !s && c > 0 && (s = new vo({
                                        next: S => D.next(S),
                                        error: S => {
                                            h = !0, g(), a = ul(m, n, S), D.error(S)
                                        },
                                        complete: () => {
                                            u = !0, g(), a = ul(m, r), D.complete()
                                        }
                                    }), Dt(C).subscribe(s))
                                })(i)
                            }
                        }()))
                    }
                    bootstrap(n, r) {
                        const o = n instanceof Xp;
                        if (!this._injector.get(Ws).done) throw !o && function vr(e) {
                            const t = re(e) || $e(e) || Qe(e);
                            return null !== t && t.standalone
                        }(n), new E(405, false);
                        let s;
                        s = o ? n : this._injector.get(Rr).resolveComponentFactory(n), this.componentTypes.push(s.componentType);
                        const a = function ZP(e) {
                                return e.isBoundToModule
                            }(s) ? void 0 : this._injector.get(Xr),
                            c = s.create(jt.NULL, [], r || s.selector, a),
                            u = c.location.nativeElement,
                            h = c.injector.get(gy, null);
                        return h ? .registerApplication(u), c.onDestroy(() => {
                            this.detachView(c.hostView), Zs(this.components, c), h ? .unregisterApplication(u)
                        }), this._loadComponent(c), c
                    }
                    tick() {
                        if (this._runningTick) throw new E(101, !1);
                        try {
                            this._runningTick = !0;
                            for (let n of this._views) n.detectChanges()
                        } catch (n) {
                            this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(n))
                        } finally {
                            this._runningTick = !1
                        }
                    }
                    attachView(n) {
                        const r = n;
                        this._views.push(r), r.attachToAppRef(this)
                    }
                    detachView(n) {
                        const r = n;
                        Zs(this._views, r), r.detachFromAppRef()
                    }
                    _loadComponent(n) {
                        this.attachView(n.hostView), this.tick(), this.components.push(n);
                        const r = this._injector.get(cy, []);
                        r.push(...this._bootstrapListeners), r.forEach(o => o(n))
                    }
                    ngOnDestroy() {
                        if (!this._destroyed) try {
                            this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                            this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                        }
                    }
                    onDestroy(n) {
                        return this._destroyListeners.push(n), () => Zs(this._destroyListeners, n)
                    }
                    destroy() {
                        if (this._destroyed) throw new E(406, !1);
                        const n = this._injector;
                        n.destroy && !n.destroyed && n.destroy()
                    }
                    get viewCount() {
                        return this._views.length
                    }
                    warnIfDestroyed() {}
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(Se), x(Xt), x(Fr))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();

            function Zs(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }
            let Ys = (() => {
                class e {}
                return e.__NG_ELEMENT_ID__ = eO, e
            })();

            function eO(e) {
                return function tO(e, t, n) {
                    if (So(e) && !n) {
                        const r = vt(e.index, t);
                        return new Go(r, r)
                    }
                    return 47 & e.type ? new Go(t[16], t) : null
                }(je(), M(), 16 == (16 & e))
            }
            class xy {
                constructor() {}
                supports(t) {
                    return Ts(t)
                }
                create(t) {
                    return new aO(t)
                }
            }
            const sO = (e, t) => t;
            class aO {
                constructor(t) {
                    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || sO
                }
                forEachItem(t) {
                    let n;
                    for (n = this._itHead; null !== n; n = n._next) t(n)
                }
                forEachOperation(t) {
                    let n = this._itHead,
                        r = this._removalsHead,
                        o = 0,
                        i = null;
                    for (; n || r;) {
                        const s = !r || n && n.currentIndex < Ty(r, o, i) ? n : r,
                            a = Ty(s, o, i),
                            l = s.currentIndex;
                        if (s === r) o--, r = r._nextRemoved;
                        else if (n = n._next, null == s.previousIndex) o++;
                        else {
                            i || (i = []);
                            const c = a - o,
                                u = l - o;
                            if (c != u) {
                                for (let g = 0; g < c; g++) {
                                    const m = g < i.length ? i[g] : i[g] = 0,
                                        y = m + g;
                                    u <= y && y < c && (i[g] = m + 1)
                                }
                                i[s.previousIndex] = u - c
                            }
                        }
                        a !== l && t(s, a, l)
                    }
                }
                forEachPreviousItem(t) {
                    let n;
                    for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n)
                }
                forEachAddedItem(t) {
                    let n;
                    for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n)
                }
                forEachMovedItem(t) {
                    let n;
                    for (n = this._movesHead; null !== n; n = n._nextMoved) t(n)
                }
                forEachRemovedItem(t) {
                    let n;
                    for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n)
                }
                forEachIdentityChange(t) {
                    let n;
                    for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n)
                }
                diff(t) {
                    if (null == t && (t = []), !Ts(t)) throw new E(900, !1);
                    return this.check(t) ? this : null
                }
                onDestroy() {}
                check(t) {
                    this._reset();
                    let o, i, s, n = this._itHead,
                        r = !1;
                    if (Array.isArray(t)) {
                        this.length = t.length;
                        for (let a = 0; a < this.length; a++) i = t[a], s = this._trackByFn(a, i), null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)) : (n = this._mismatch(n, i, s, a), r = !0), n = n._next
                    } else o = 0,
                        function TE(e, t) {
                            if (Array.isArray(e))
                                for (let n = 0; n < e.length; n++) t(e[n]);
                            else {
                                const n = e[nr()]();
                                let r;
                                for (; !(r = n.next()).done;) t(r.value)
                            }
                        }(t, a => {
                            s = this._trackByFn(o, a), null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, a, s, o)), Object.is(n.item, a) || this._addIdentityChange(n, a)) : (n = this._mismatch(n, a, s, o), r = !0), n = n._next, o++
                        }), this.length = o;
                    return this._truncate(n), this.collection = t, this.isDirty
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                }
                _reset() {
                    if (this.isDirty) {
                        let t;
                        for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
                        for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
                        for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
                        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                    }
                }
                _mismatch(t, n, r, o) {
                    let i;
                    return null === t ? i = this._itTail : (i = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, o)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o)) : t = this._addAfter(new lO(n, r), i, o), t
                }
                _verifyReinsertion(t, n, r, o) {
                    let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                    return null !== i ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t
                }
                _truncate(t) {
                    for (; null !== t;) {
                        const n = t._next;
                        this._addToRemovals(this._unlink(t)), t = n
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                }
                _reinsertAfter(t, n, r) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                    const o = t._prevRemoved,
                        i = t._nextRemoved;
                    return null === o ? this._removalsHead = i : o._nextRemoved = i, null === i ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t
                }
                _moveAfter(t, n, r) {
                    return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
                }
                _addAfter(t, n, r) {
                    return this._insertAfter(t, n, r), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
                }
                _insertAfter(t, n, r) {
                    const o = null === n ? this._itHead : n._next;
                    return t._next = o, t._prev = n, null === o ? this._itTail = t : o._prev = t, null === n ? this._itHead = t : n._next = t, null === this._linkedRecords && (this._linkedRecords = new Ay), this._linkedRecords.put(t), t.currentIndex = r, t
                }
                _remove(t) {
                    return this._addToRemovals(this._unlink(t))
                }
                _unlink(t) {
                    null !== this._linkedRecords && this._linkedRecords.remove(t);
                    const n = t._prev,
                        r = t._next;
                    return null === n ? this._itHead = r : n._next = r, null === r ? this._itTail = n : r._prev = n, t
                }
                _addToMoves(t, n) {
                    return t.previousIndex === n || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
                }
                _addToRemovals(t) {
                    return null === this._unlinkedRecords && (this._unlinkedRecords = new Ay), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
                }
                _addIdentityChange(t, n) {
                    return t.item = n, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
                }
            }
            class lO {
                constructor(t, n) {
                    this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                }
            }
            class cO {
                constructor() {
                    this._head = null, this._tail = null
                }
                add(t) {
                    null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
                }
                get(t, n) {
                    let r;
                    for (r = this._head; null !== r; r = r._nextDup)
                        if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
                    return null
                }
                remove(t) {
                    const n = t._prevDup,
                        r = t._nextDup;
                    return null === n ? this._head = r : n._nextDup = r, null === r ? this._tail = n : r._prevDup = n, null === this._head
                }
            }
            class Ay {
                constructor() {
                    this.map = new Map
                }
                put(t) {
                    const n = t.trackById;
                    let r = this.map.get(n);
                    r || (r = new cO, this.map.set(n, r)), r.add(t)
                }
                get(t, n) {
                    const o = this.map.get(t);
                    return o ? o.get(t, n) : null
                }
                remove(t) {
                    const n = t.trackById;
                    return this.map.get(n).remove(t) && this.map.delete(n), t
                }
                get isEmpty() {
                    return 0 === this.map.size
                }
                clear() {
                    this.map.clear()
                }
            }

            function Ty(e, t, n) {
                const r = e.previousIndex;
                if (null === r) return r;
                let o = 0;
                return n && r < n.length && (o = n[r]), r + t + o
            }
            class ky {
                constructor() {}
                supports(t) {
                    return t instanceof Map || Gc(t)
                }
                create() {
                    return new uO
                }
            }
            class uO {
                constructor() {
                    this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                }
                forEachItem(t) {
                    let n;
                    for (n = this._mapHead; null !== n; n = n._next) t(n)
                }
                forEachPreviousItem(t) {
                    let n;
                    for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n)
                }
                forEachChangedItem(t) {
                    let n;
                    for (n = this._changesHead; null !== n; n = n._nextChanged) t(n)
                }
                forEachAddedItem(t) {
                    let n;
                    for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n)
                }
                forEachRemovedItem(t) {
                    let n;
                    for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n)
                }
                diff(t) {
                    if (t) {
                        if (!(t instanceof Map || Gc(t))) throw new E(900, !1)
                    } else t = new Map;
                    return this.check(t) ? this : null
                }
                onDestroy() {}
                check(t) {
                    this._reset();
                    let n = this._mapHead;
                    if (this._appendAfter = null, this._forEach(t, (r, o) => {
                            if (n && n.key === o) this._maybeAddToChanges(n, r), this._appendAfter = n, n = n._next;
                            else {
                                const i = this._getOrCreateRecordForKey(o, r);
                                n = this._insertBeforeOrAppend(n, i)
                            }
                        }), n) {
                        n._prev && (n._prev._next = null), this._removalsHead = n;
                        for (let r = n; null !== r; r = r._nextRemoved) r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                }
                _insertBeforeOrAppend(t, n) {
                    if (t) {
                        const r = t._prev;
                        return n._next = t, n._prev = r, t._prev = n, r && (r._next = n), t === this._mapHead && (this._mapHead = n), this._appendAfter = t, t
                    }
                    return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null
                }
                _getOrCreateRecordForKey(t, n) {
                    if (this._records.has(t)) {
                        const o = this._records.get(t);
                        this._maybeAddToChanges(o, n);
                        const i = o._prev,
                            s = o._next;
                        return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o
                    }
                    const r = new dO(t);
                    return this._records.set(t, r), r.currentValue = n, this._addToAdditions(r), r
                }
                _reset() {
                    if (this.isDirty) {
                        let t;
                        for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next) t._nextPrevious = t._next;
                        for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
                        for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                    }
                }
                _maybeAddToChanges(t, n) {
                    Object.is(n, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = n, this._addToChanges(t))
                }
                _addToAdditions(t) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
                }
                _addToChanges(t) {
                    null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
                }
                _forEach(t, n) {
                    t instanceof Map ? t.forEach(n) : Object.keys(t).forEach(r => n(t[r], r))
                }
            }
            class dO {
                constructor(t) {
                    this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                }
            }

            function Ry() {
                return new Js([new xy])
            }
            let Js = (() => {
                class e {
                    constructor(n) {
                        this.factories = n
                    }
                    static create(n, r) {
                        if (null != r) {
                            const o = r.factories.slice();
                            n = n.concat(o)
                        }
                        return new e(n)
                    }
                    static extend(n) {
                        return {
                            provide: e,
                            useFactory: r => e.create(n, r || Ry()),
                            deps: [
                                [e, new Ro, new ko]
                            ]
                        }
                    }
                    find(n) {
                        const r = this.factories.find(o => o.supports(n));
                        if (null != r) return r;
                        throw new E(901, !1)
                    }
                }
                return e.\u0275prov = A({
                    token: e,
                    providedIn: "root",
                    factory: Ry
                }), e
            })();

            function Ny() {
                return new li([new ky])
            }
            let li = (() => {
                class e {
                    constructor(n) {
                        this.factories = n
                    }
                    static create(n, r) {
                        if (r) {
                            const o = r.factories.slice();
                            n = n.concat(o)
                        }
                        return new e(n)
                    }
                    static extend(n) {
                        return {
                            provide: e,
                            useFactory: r => e.create(n, r || Ny()),
                            deps: [
                                [e, new Ro, new ko]
                            ]
                        }
                    }
                    find(n) {
                        const r = this.factories.find(o => o.supports(n));
                        if (r) return r;
                        throw new E(901, !1)
                    }
                }
                return e.\u0275prov = A({
                    token: e,
                    providedIn: "root",
                    factory: Ny
                }), e
            })();
            const pO = Cy(null, "core", []);
            let gO = (() => {
                class e {
                    constructor(n) {}
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(Ks))
                }, e.\u0275mod = ft({
                    type: e
                }), e.\u0275inj = it({}), e
            })();

            function to(e) {
                return "boolean" == typeof e ? e : null != e && "false" !== e
            }
            let Vu = null;

            function sn() {
                return Vu
            }
            class yO {}
            const rt = new O("DocumentToken");
            let ju = (() => {
                class e {
                    historyGo(n) {
                        throw new Error("Not implemented")
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: function() {
                        return function CO() {
                            return x(Fy)
                        }()
                    },
                    providedIn: "platform"
                }), e
            })();
            const _O = new O("Location Initialized");
            let Fy = (() => {
                class e extends ju {
                    constructor(n) {
                        super(), this._doc = n, this._location = window.location, this._history = window.history
                    }
                    getBaseHrefFromDOM() {
                        return sn().getBaseHref(this._doc)
                    }
                    onPopState(n) {
                        const r = sn().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
                    }
                    onHashChange(n) {
                        const r = sn().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
                    }
                    get href() {
                        return this._location.href
                    }
                    get protocol() {
                        return this._location.protocol
                    }
                    get hostname() {
                        return this._location.hostname
                    }
                    get port() {
                        return this._location.port
                    }
                    get pathname() {
                        return this._location.pathname
                    }
                    get search() {
                        return this._location.search
                    }
                    get hash() {
                        return this._location.hash
                    }
                    set pathname(n) {
                        this._location.pathname = n
                    }
                    pushState(n, r, o) {
                        Ly() ? this._history.pushState(n, r, o) : this._location.hash = o
                    }
                    replaceState(n, r, o) {
                        Ly() ? this._history.replaceState(n, r, o) : this._location.hash = o
                    }
                    forward() {
                        this._history.forward()
                    }
                    back() {
                        this._history.back()
                    }
                    historyGo(n = 0) {
                        this._history.go(n)
                    }
                    getState() {
                        return this._history.state
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(rt))
                }, e.\u0275prov = A({
                    token: e,
                    factory: function() {
                        return function wO() {
                            return new Fy(x(rt))
                        }()
                    },
                    providedIn: "platform"
                }), e
            })();

            function Ly() {
                return !!window.history.pushState
            }

            function Bu(e, t) {
                if (0 == e.length) return t;
                if (0 == t.length) return e;
                let n = 0;
                return e.endsWith("/") && n++, t.startsWith("/") && n++, 2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
            }

            function Vy(e) {
                const t = e.match(/#|\?|$/),
                    n = t && t.index || e.length;
                return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n)
            }

            function Mn(e) {
                return e && "?" !== e[0] ? "?" + e : e
            }
            let ar = (() => {
                class e {
                    historyGo(n) {
                        throw new Error("Not implemented")
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: function() {
                        return K(By)
                    },
                    providedIn: "root"
                }), e
            })();
            const jy = new O("appBaseHref");
            let By = (() => {
                    class e extends ar {
                        constructor(n, r) {
                            super(), this._platformLocation = n, this._removeListenerFns = [], this._baseHref = r ? ? this._platformLocation.getBaseHrefFromDOM() ? ? K(rt).location ? .origin ? ? ""
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(n) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        prepareExternalUrl(n) {
                            return Bu(this._baseHref, n)
                        }
                        path(n = !1) {
                            const r = this._platformLocation.pathname + Mn(this._platformLocation.search),
                                o = this._platformLocation.hash;
                            return o && n ? `${r}${o}` : r
                        }
                        pushState(n, r, o, i) {
                            const s = this.prepareExternalUrl(o + Mn(i));
                            this._platformLocation.pushState(n, r, s)
                        }
                        replaceState(n, r, o, i) {
                            const s = this.prepareExternalUrl(o + Mn(i));
                            this._platformLocation.replaceState(n, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(n = 0) {
                            this._platformLocation.historyGo ? .(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(ju), x(jy, 8))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })(),
                bO = (() => {
                    class e extends ar {
                        constructor(n, r) {
                            super(), this._platformLocation = n, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r)
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(n) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        path(n = !1) {
                            let r = this._platformLocation.hash;
                            return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r
                        }
                        prepareExternalUrl(n) {
                            const r = Bu(this._baseHref, n);
                            return r.length > 0 ? "#" + r : r
                        }
                        pushState(n, r, o, i) {
                            let s = this.prepareExternalUrl(o + Mn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(n, r, s)
                        }
                        replaceState(n, r, o, i) {
                            let s = this.prepareExternalUrl(o + Mn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(n, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(n = 0) {
                            this._platformLocation.historyGo ? .(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(ju), x(jy, 8))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })(),
                Uu = (() => {
                    class e {
                        constructor(n) {
                            this._subject = new J, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = n;
                            const r = this._locationStrategy.getBaseHref();
                            this._basePath = function EO(e) {
                                if (new RegExp("^(https?:)?//").test(e)) {
                                    const [, n] = e.split(/\/\/[^\/]+/);
                                    return n
                                }
                                return e
                            }(Vy(Uy(r))), this._locationStrategy.onPopState(o => {
                                this._subject.emit({
                                    url: this.path(!0),
                                    pop: !0,
                                    state: o.state,
                                    type: o.type
                                })
                            })
                        }
                        ngOnDestroy() {
                            this._urlChangeSubscription ? .unsubscribe(), this._urlChangeListeners = []
                        }
                        path(n = !1) {
                            return this.normalize(this._locationStrategy.path(n))
                        }
                        getState() {
                            return this._locationStrategy.getState()
                        }
                        isCurrentPathEqualTo(n, r = "") {
                            return this.path() == this.normalize(n + Mn(r))
                        }
                        normalize(n) {
                            return e.stripTrailingSlash(function MO(e, t) {
                                return e && new RegExp(`^${e}([/;?#]|$)`).test(t) ? t.substring(e.length) : t
                            }(this._basePath, Uy(n)))
                        }
                        prepareExternalUrl(n) {
                            return n && "/" !== n[0] && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
                        }
                        go(n, r = "", o = null) {
                            this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Mn(r)), o)
                        }
                        replaceState(n, r = "", o = null) {
                            this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Mn(r)), o)
                        }
                        forward() {
                            this._locationStrategy.forward()
                        }
                        back() {
                            this._locationStrategy.back()
                        }
                        historyGo(n = 0) {
                            this._locationStrategy.historyGo ? .(n)
                        }
                        onUrlChange(n) {
                            return this._urlChangeListeners.push(n), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
                                this._notifyUrlChangeListeners(r.url, r.state)
                            })), () => {
                                const r = this._urlChangeListeners.indexOf(n);
                                this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription ? .unsubscribe(), this._urlChangeSubscription = null)
                            }
                        }
                        _notifyUrlChangeListeners(n = "", r) {
                            this._urlChangeListeners.forEach(o => o(n, r))
                        }
                        subscribe(n, r, o) {
                            return this._subject.subscribe({
                                next: n,
                                error: r,
                                complete: o
                            })
                        }
                    }
                    return e.normalizeQueryParams = Mn, e.joinWithSlash = Bu, e.stripTrailingSlash = Vy, e.\u0275fac = function(n) {
                        return new(n || e)(x(ar))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return function DO() {
                                return new Uu(x(ar))
                            }()
                        },
                        providedIn: "root"
                    }), e
                })();

            function Uy(e) {
                return e.replace(/\/index.html$/, "")
            }

            function Yy(e, t) {
                t = encodeURIComponent(t);
                for (const n of e.split(";")) {
                    const r = n.indexOf("="),
                        [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                    if (o.trim() === t) return decodeURIComponent(i)
                }
                return null
            }
            const Qu = /\s+/,
                Qy = [];
            let Xu = (() => {
                    class e {
                        constructor(n, r, o, i) {
                            this._iterableDiffers = n, this._keyValueDiffers = r, this._ngEl = o, this._renderer = i, this.initialClasses = Qy, this.stateMap = new Map
                        }
                        set klass(n) {
                            this.initialClasses = null != n ? n.trim().split(Qu) : Qy
                        }
                        set ngClass(n) {
                            this.rawClass = "string" == typeof n ? n.trim().split(Qu) : n
                        }
                        ngDoCheck() {
                            for (const r of this.initialClasses) this._updateState(r, !0);
                            const n = this.rawClass;
                            if (Array.isArray(n) || n instanceof Set)
                                for (const r of n) this._updateState(r, !0);
                            else if (null != n)
                                for (const r of Object.keys(n)) this._updateState(r, Boolean(n[r]));
                            this._applyStateDiff()
                        }
                        _updateState(n, r) {
                            const o = this.stateMap.get(n);
                            void 0 !== o ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(n, {
                                enabled: r,
                                changed: !0,
                                touched: !0
                            })
                        }
                        _applyStateDiff() {
                            for (const n of this.stateMap) {
                                const r = n[0],
                                    o = n[1];
                                o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
                            }
                        }
                        _toggleClass(n, r) {
                            (n = n.trim()).length > 0 && n.split(Qu).forEach(o => {
                                r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
                            })
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Js), w(li), w(Ct), w(yn))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "ngClass", ""]
                        ],
                        inputs: {
                            klass: ["class", "klass"],
                            ngClass: "ngClass"
                        },
                        standalone: !0
                    }), e
                })(),
                tC = (() => {
                    class e {
                        constructor(n, r) {
                            this._viewContainer = n, this._context = new fx, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
                        }
                        set ngIf(n) {
                            this._context.$implicit = this._context.ngIf = n, this._updateView()
                        }
                        set ngIfThen(n) {
                            nC("ngIfThen", n), this._thenTemplateRef = n, this._thenViewRef = null, this._updateView()
                        }
                        set ngIfElse(n) {
                            nC("ngIfElse", n), this._elseTemplateRef = n, this._elseViewRef = null, this._updateView()
                        }
                        _updateView() {
                            this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                        }
                        static ngTemplateContextGuard(n, r) {
                            return !0
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Ot), w(wn))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "ngIf", ""]
                        ],
                        inputs: {
                            ngIf: "ngIf",
                            ngIfThen: "ngIfThen",
                            ngIfElse: "ngIfElse"
                        },
                        standalone: !0
                    }), e
                })();
            class fx {
                constructor() {
                    this.$implicit = null, this.ngIf = null
                }
            }

            function nC(e, t) {
                if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${ae(t)}'.`)
            }
            let iC = (() => {
                class e {}
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275mod = ft({
                    type: e
                }), e.\u0275inj = it({}), e
            })();
            let Tt = (() => {
                class e {}
                return e.\u0275prov = A({
                    token: e,
                    providedIn: "root",
                    factory: () => new Bx(x(rt), window)
                }), e
            })();
            class Bx {
                constructor(t, n) {
                    this.document = t, this.window = n, this.offset = () => [0, 0]
                }
                setOffset(t) {
                    this.offset = Array.isArray(t) ? () => t : t
                }
                getScrollPosition() {
                    return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
                }
                scrollToPosition(t) {
                    this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
                }
                scrollToAnchor(t) {
                    if (!this.supportsScrolling()) return;
                    const n = function Ux(e, t) {
                        const n = e.getElementById(t) || e.getElementsByName(t)[0];
                        if (n) return n;
                        if ("function" == typeof e.createTreeWalker && e.body && (e.body.createShadowRoot || e.body.attachShadow)) {
                            const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                            let o = r.currentNode;
                            for (; o;) {
                                const i = o.shadowRoot;
                                if (i) {
                                    const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                                    if (s) return s
                                }
                                o = r.nextNode()
                            }
                        }
                        return null
                    }(this.document, t);
                    n && (this.scrollToElement(n), n.focus())
                }
                setHistoryScrollRestoration(t) {
                    if (this.supportScrollRestoration()) {
                        const n = this.window.history;
                        n && n.scrollRestoration && (n.scrollRestoration = t)
                    }
                }
                scrollToElement(t) {
                    const n = t.getBoundingClientRect(),
                        r = n.left + this.window.pageXOffset,
                        o = n.top + this.window.pageYOffset,
                        i = this.offset();
                    this.window.scrollTo(r - i[0], o - i[1])
                }
                supportScrollRestoration() {
                    try {
                        if (!this.supportsScrolling()) return !1;
                        const t = aC(this.window.history) || aC(Object.getPrototypeOf(this.window.history));
                        return !(!t || !t.writable && !t.set)
                    } catch {
                        return !1
                    }
                }
                supportsScrolling() {
                    try {
                        return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
                    } catch {
                        return !1
                    }
                }
            }

            function aC(e) {
                return Object.getOwnPropertyDescriptor(e, "scrollRestoration")
            }
            class lC {}
            class pA extends yO {
                constructor() {
                    super(...arguments), this.supportsDOMEvents = !0
                }
            }
            class id extends pA {
                static makeCurrent() {
                    ! function vO(e) {
                        Vu || (Vu = e)
                    }(new id)
                }
                onAndCancel(t, n, r) {
                    return t.addEventListener(n, r, !1), () => {
                        t.removeEventListener(n, r, !1)
                    }
                }
                dispatchEvent(t, n) {
                    t.dispatchEvent(n)
                }
                remove(t) {
                    t.parentNode && t.parentNode.removeChild(t)
                }
                createElement(t, n) {
                    return (n = n || this.getDefaultDocument()).createElement(t)
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                isElementNode(t) {
                    return t.nodeType === Node.ELEMENT_NODE
                }
                isShadowRoot(t) {
                    return t instanceof DocumentFragment
                }
                getGlobalEventTarget(t, n) {
                    return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
                }
                getBaseHref(t) {
                    const n = function gA() {
                        return fi = fi || document.querySelector("base"), fi ? fi.getAttribute("href") : null
                    }();
                    return null == n ? null : function mA(e) {
                        ua = ua || document.createElement("a"), ua.setAttribute("href", e);
                        const t = ua.pathname;
                        return "/" === t.charAt(0) ? t : `/${t}`
                    }(n)
                }
                resetBaseElement() {
                    fi = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                getCookie(t) {
                    return Yy(document.cookie, t)
                }
            }
            let ua, fi = null;
            const pC = new O("TRANSITION_ID"),
                yA = [{
                    provide: Gs,
                    useFactory: function vA(e, t, n) {
                        return () => {
                            n.get(Ws).donePromise.then(() => {
                                const r = sn(),
                                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                                for (let i = 0; i < o.length; i++) r.remove(o[i])
                            })
                        }
                    },
                    deps: [pC, rt, jt],
                    multi: !0
                }];
            let _A = (() => {
                class e {
                    build() {
                        return new XMLHttpRequest
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const da = new O("EventManagerPlugins");
            let fa = (() => {
                class e {
                    constructor(n, r) {
                        this._zone = r, this._eventNameToPlugin = new Map, n.forEach(o => o.manager = this), this._plugins = n.slice().reverse()
                    }
                    addEventListener(n, r, o) {
                        return this._findPluginFor(r).addEventListener(n, r, o)
                    }
                    addGlobalEventListener(n, r, o) {
                        return this._findPluginFor(r).addGlobalEventListener(n, r, o)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(n) {
                        const r = this._eventNameToPlugin.get(n);
                        if (r) return r;
                        const o = this._plugins;
                        for (let i = 0; i < o.length; i++) {
                            const s = o[i];
                            if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s
                        }
                        throw new Error(`No event manager plugin found for event ${n}`)
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(da), x(Se))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            class gC {
                constructor(t) {
                    this._doc = t
                }
                addGlobalEventListener(t, n, r) {
                    const o = sn().getGlobalEventTarget(this._doc, t);
                    if (!o) throw new Error(`Unsupported event target ${o} for event ${n}`);
                    return this.addEventListener(o, n, r)
                }
            }
            let mC = (() => {
                    class e {
                        constructor() {
                            this._stylesSet = new Set
                        }
                        addStyles(n) {
                            const r = new Set;
                            n.forEach(o => {
                                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o))
                            }), this.onStylesAdded(r)
                        }
                        onStylesAdded(n) {}
                        getAllStyles() {
                            return Array.from(this._stylesSet)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })(),
                hi = (() => {
                    class e extends mC {
                        constructor(n) {
                            super(), this._doc = n, this._hostNodes = new Map, this._hostNodes.set(n.head, [])
                        }
                        _addStylesToHost(n, r, o) {
                            n.forEach(i => {
                                const s = this._doc.createElement("style");
                                s.textContent = i, o.push(r.appendChild(s))
                            })
                        }
                        addHost(n) {
                            const r = [];
                            this._addStylesToHost(this._stylesSet, n, r), this._hostNodes.set(n, r)
                        }
                        removeHost(n) {
                            const r = this._hostNodes.get(n);
                            r && r.forEach(vC), this._hostNodes.delete(n)
                        }
                        onStylesAdded(n) {
                            this._hostNodes.forEach((r, o) => {
                                this._addStylesToHost(n, o, r)
                            })
                        }
                        ngOnDestroy() {
                            this._hostNodes.forEach(n => n.forEach(vC))
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(rt))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })();

            function vC(e) {
                sn().remove(e)
            }
            const sd = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/",
                    math: "http://www.w3.org/1998/MathML/"
                },
                ad = /%COMP%/g;

            function ld(e, t) {
                return t.flat(100).map(n => n.replace(ad, e))
            }

            function _C(e) {
                return t => {
                    if ("__ngUnwrap__" === t) return e;
                    !1 === e(t) && (t.preventDefault(), t.returnValue = !1)
                }
            }
            let cd = (() => {
                class e {
                    constructor(n, r, o) {
                        this.eventManager = n, this.sharedStylesHost = r, this.appId = o, this.rendererByCompId = new Map, this.defaultRenderer = new ud(n)
                    }
                    createRenderer(n, r) {
                        if (!n || !r) return this.defaultRenderer;
                        switch (r.encapsulation) {
                            case Kt.Emulated:
                                {
                                    let o = this.rendererByCompId.get(r.id);
                                    return o || (o = new SA(this.eventManager, this.sharedStylesHost, r, this.appId), this.rendererByCompId.set(r.id, o)),
                                    o.applyToHost(n),
                                    o
                                }
                            case Kt.ShadowDom:
                                return new IA(this.eventManager, this.sharedStylesHost, n, r);
                            default:
                                if (!this.rendererByCompId.has(r.id)) {
                                    const o = ld(r.id, r.styles);
                                    this.sharedStylesHost.addStyles(o), this.rendererByCompId.set(r.id, this.defaultRenderer)
                                }
                                return this.defaultRenderer
                        }
                    }
                    begin() {}
                    end() {}
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(fa), x(hi), x(ai))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            class ud {
                constructor(t) {
                    this.eventManager = t, this.data = Object.create(null), this.destroyNode = null
                }
                destroy() {}
                createElement(t, n) {
                    return n ? document.createElementNS(sd[n] || n, t) : document.createElement(t)
                }
                createComment(t) {
                    return document.createComment(t)
                }
                createText(t) {
                    return document.createTextNode(t)
                }
                appendChild(t, n) {
                    (bC(t) ? t.content : t).appendChild(n)
                }
                insertBefore(t, n, r) {
                    t && (bC(t) ? t.content : t).insertBefore(n, r)
                }
                removeChild(t, n) {
                    t && t.removeChild(n)
                }
                selectRootElement(t, n) {
                    let r = "string" == typeof t ? document.querySelector(t) : t;
                    if (!r) throw new Error(`The selector "${t}" did not match any elements`);
                    return n || (r.textContent = ""), r
                }
                parentNode(t) {
                    return t.parentNode
                }
                nextSibling(t) {
                    return t.nextSibling
                }
                setAttribute(t, n, r, o) {
                    if (o) {
                        n = o + ":" + n;
                        const i = sd[o];
                        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
                    } else t.setAttribute(n, r)
                }
                removeAttribute(t, n, r) {
                    if (r) {
                        const o = sd[r];
                        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
                    } else t.removeAttribute(n)
                }
                addClass(t, n) {
                    t.classList.add(n)
                }
                removeClass(t, n) {
                    t.classList.remove(n)
                }
                setStyle(t, n, r, o) {
                    o & (at.DashCase | at.Important) ? t.style.setProperty(n, r, o & at.Important ? "important" : "") : t.style[n] = r
                }
                removeStyle(t, n, r) {
                    r & at.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
                }
                setProperty(t, n, r) {
                    t[n] = r
                }
                setValue(t, n) {
                    t.nodeValue = n
                }
                listen(t, n, r) {
                    return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, n, _C(r)) : this.eventManager.addEventListener(t, n, _C(r))
                }
            }

            function bC(e) {
                return "TEMPLATE" === e.tagName && void 0 !== e.content
            }
            class SA extends ud {
                constructor(t, n, r, o) {
                    super(t), this.component = r;
                    const i = ld(o + "-" + r.id, r.styles);
                    n.addStyles(i), this.contentAttr = function DA(e) {
                        return "_ngcontent-%COMP%".replace(ad, e)
                    }(o + "-" + r.id), this.hostAttr = function MA(e) {
                        return "_nghost-%COMP%".replace(ad, e)
                    }(o + "-" + r.id)
                }
                applyToHost(t) {
                    super.setAttribute(t, this.hostAttr, "")
                }
                createElement(t, n) {
                    const r = super.createElement(t, n);
                    return super.setAttribute(r, this.contentAttr, ""), r
                }
            }
            class IA extends ud {
                constructor(t, n, r, o) {
                    super(t), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const i = ld(o.id, o.styles);
                    for (let s = 0; s < i.length; s++) {
                        const a = document.createElement("style");
                        a.textContent = i[s], this.shadowRoot.appendChild(a)
                    }
                }
                nodeOrShadowRoot(t) {
                    return t === this.hostEl ? this.shadowRoot : t
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
                appendChild(t, n) {
                    return super.appendChild(this.nodeOrShadowRoot(t), n)
                }
                insertBefore(t, n, r) {
                    return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
                }
                removeChild(t, n) {
                    return super.removeChild(this.nodeOrShadowRoot(t), n)
                }
                parentNode(t) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
                }
            }
            let PA = (() => {
                class e extends gC {
                    constructor(n) {
                        super(n)
                    }
                    supports(n) {
                        return !0
                    }
                    addEventListener(n, r, o) {
                        return n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
                    }
                    removeEventListener(n, r, o) {
                        return n.removeEventListener(r, o)
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(rt))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const DC = ["alt", "control", "meta", "shift"],
                OA = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                xA = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey
                };
            let AA = (() => {
                class e extends gC {
                    constructor(n) {
                        super(n)
                    }
                    supports(n) {
                        return null != e.parseEventName(n)
                    }
                    addEventListener(n, r, o) {
                        const i = e.parseEventName(r),
                            s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => sn().onAndCancel(n, i.domEventName, s))
                    }
                    static parseEventName(n) {
                        const r = n.toLowerCase().split("."),
                            o = r.shift();
                        if (0 === r.length || "keydown" !== o && "keyup" !== o) return null;
                        const i = e._normalizeKey(r.pop());
                        let s = "",
                            a = r.indexOf("code");
                        if (a > -1 && (r.splice(a, 1), s = "code."), DC.forEach(c => {
                                const u = r.indexOf(c);
                                u > -1 && (r.splice(u, 1), s += c + ".")
                            }), s += i, 0 != r.length || 0 === i.length) return null;
                        const l = {};
                        return l.domEventName = o, l.fullKey = s, l
                    }
                    static matchEventFullKeyCode(n, r) {
                        let o = OA[n.key] || n.key,
                            i = "";
                        return r.indexOf("code.") > -1 && (o = n.code, i = "code."), !(null == o || !o) && (o = o.toLowerCase(), " " === o ? o = "space" : "." === o && (o = "dot"), DC.forEach(s => {
                            s !== o && (0, xA[s])(n) && (i += s + ".")
                        }), i += o, i === r)
                    }
                    static eventCallback(n, r, o) {
                        return i => {
                            e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i))
                        }
                    }
                    static _normalizeKey(n) {
                        return "esc" === n ? "escape" : n
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(rt))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const NA = Cy(pO, "browser", [{
                    provide: Eu,
                    useValue: "browser"
                }, {
                    provide: ly,
                    useValue: function TA() {
                        id.makeCurrent()
                    },
                    multi: !0
                }, {
                    provide: rt,
                    useFactory: function RA() {
                        return function pD(e) {
                            dc = e
                        }(document), document
                    },
                    deps: []
                }]),
                SC = new O(""),
                IC = [{
                    provide: qs,
                    useClass: class CA {
                        addToWindow(t) {
                            ce.getAngularTestability = (r, o = !0) => {
                                const i = t.findTestabilityInTree(r, o);
                                if (null == i) throw new Error("Could not find testability for element.");
                                return i
                            }, ce.getAllAngularTestabilities = () => t.getAllTestabilities(), ce.getAllAngularRootElements = () => t.getAllRootElements(), ce.frameworkStabilizers || (ce.frameworkStabilizers = []), ce.frameworkStabilizers.push(r => {
                                const o = ce.getAllAngularTestabilities();
                                let i = o.length,
                                    s = !1;
                                const a = function(l) {
                                    s = s || l, i--, 0 == i && r(s)
                                };
                                o.forEach(function(l) {
                                    l.whenStable(a)
                                })
                            })
                        }
                        findTestabilityInTree(t, n, r) {
                            return null == n ? null : t.getTestability(n) ? ? (r ? sn().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                        }
                    },
                    deps: []
                }, {
                    provide: gy,
                    useClass: Ou,
                    deps: [Se, xu, qs]
                }, {
                    provide: Ou,
                    useClass: Ou,
                    deps: [Se, xu, qs]
                }],
                PC = [{
                        provide: _c,
                        useValue: "root"
                    }, {
                        provide: Fr,
                        useFactory: function kA() {
                            return new Fr
                        },
                        deps: []
                    }, {
                        provide: da,
                        useClass: PA,
                        multi: !0,
                        deps: [rt, Se, Eu]
                    }, {
                        provide: da,
                        useClass: AA,
                        multi: !0,
                        deps: [rt]
                    }, {
                        provide: cd,
                        useClass: cd,
                        deps: [fa, hi, ai]
                    }, {
                        provide: eg,
                        useExisting: cd
                    }, {
                        provide: mC,
                        useExisting: hi
                    }, {
                        provide: hi,
                        useClass: hi,
                        deps: [rt]
                    }, {
                        provide: fa,
                        useClass: fa,
                        deps: [da, Se]
                    }, {
                        provide: lC,
                        useClass: _A,
                        deps: []
                    },
                    []
                ];
            let FA = (() => {
                    class e {
                        constructor(n) {}
                        static withServerTransition(n) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: ai,
                                    useValue: n.appId
                                }, {
                                    provide: pC,
                                    useExisting: ai
                                }, yA]
                            }
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(SC, 12))
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({
                        providers: [...PC, ...IC],
                        imports: [iC, gO]
                    }), e
                })(),
                OC = (() => {
                    class e {
                        constructor(n) {
                            this._doc = n
                        }
                        getTitle() {
                            return this._doc.title
                        }
                        setTitle(n) {
                            this._doc.title = n || ""
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(rt))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: function(n) {
                            let r = null;
                            return r = n ? new n : function VA() {
                                return new OC(x(rt))
                            }(), r
                        },
                        providedIn: "root"
                    }), e
                })();

            function T(...e) {
                return Me(e, yo(e))
            }
            typeof window < "u" && window;
            class Gt extends Wt {
                constructor(t) {
                    super(), this._value = t
                }
                get value() {
                    return this.getValue()
                }
                _subscribe(t) {
                    const n = super._subscribe(t);
                    return !n.closed && t.next(this._value), n
                }
                getValue() {
                    const {
                        hasError: t,
                        thrownError: n,
                        _value: r
                    } = this;
                    if (t) throw n;
                    return this._throwIfClosed(), r
                }
                next(t) {
                    super.next(this._value = t)
                }
            }
            const ha = Ja(e => function() {
                    e(this), this.name = "EmptyError", this.message = "no elements in sequence"
                }),
                {
                    isArray: WA
                } = Array,
                {
                    getPrototypeOf: qA,
                    prototype: KA,
                    keys: ZA
                } = Object;

            function TC(e) {
                if (1 === e.length) {
                    const t = e[0];
                    if (WA(t)) return {
                        args: t,
                        keys: null
                    };
                    if (function YA(e) {
                            return e && "object" == typeof e && qA(e) === KA
                        }(t)) {
                        const n = ZA(t);
                        return {
                            args: n.map(r => t[r]),
                            keys: n
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }
            const {
                isArray: QA
            } = Array;

            function kC(e) {
                return W(t => function XA(e, t) {
                    return QA(t) ? e(...t) : e(t)
                }(e, t))
            }

            function RC(e, t) {
                return e.reduce((n, r, o) => (n[r] = t[o], n), {})
            }

            function NC(...e) {
                const t = yo(e),
                    n = Gf(e),
                    {
                        args: r,
                        keys: o
                    } = TC(e);
                if (0 === r.length) return Me([], t);
                const i = new ye(function JA(e, t, n = Wn) {
                    return r => {
                        FC(t, () => {
                            const {
                                length: o
                            } = e, i = new Array(o);
                            let s = o,
                                a = o;
                            for (let l = 0; l < o; l++) FC(t, () => {
                                const c = Me(e[l], t);
                                let u = !1;
                                c.subscribe(De(r, h => {
                                    i[l] = h, u || (u = !0, a--), a || r.next(n(i.slice()))
                                }, () => {
                                    --s || r.complete()
                                }))
                            }, r)
                        }, r)
                    }
                }(r, t, o ? s => RC(o, s) : Wn));
                return n ? i.pipe(kC(n)) : i
            }

            function FC(e, t, n) {
                e ? dn(n, e, t) : t()
            }

            function hd(...e) {
                return function eT() {
                    return gr(1)
                }()(Me(e, yo(e)))
            }

            function LC(e) {
                return new ye(t => {
                    Dt(e()).subscribe(t)
                })
            }

            function pi(e, t) {
                const n = de(e) ? e : () => e,
                    r = o => o.error(n());
                return new ye(t ? o => t.schedule(r, 0, o) : r)
            }

            function pd() {
                return xe((e, t) => {
                    let n = null;
                    e._refCount++;
                    const r = De(t, void 0, void 0, void 0, () => {
                        if (!e || e._refCount <= 0 || 0 < --e._refCount) return void(n = null);
                        const o = e._connection,
                            i = n;
                        n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe()
                    });
                    e.subscribe(r), r.closed || (n = e.connect())
                })
            }
            class VC extends ye {
                constructor(t, n) {
                    super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, Af(t) && (this.lift = t.lift)
                }
                _subscribe(t) {
                    return this.getSubject().subscribe(t)
                }
                getSubject() {
                    const t = this._subject;
                    return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
                }
                _teardown() {
                    this._refCount = 0;
                    const {
                        _connection: t
                    } = this;
                    this._subject = this._connection = null, t ? .unsubscribe()
                }
                connect() {
                    let t = this._connection;
                    if (!t) {
                        t = this._connection = new bt;
                        const n = this.getSubject();
                        t.add(this.source.subscribe(De(n, void 0, () => {
                            this._teardown(), n.complete()
                        }, r => {
                            this._teardown(), n.error(r)
                        }, () => this._teardown()))), t.closed && (this._connection = null, t = bt.EMPTY)
                    }
                    return t
                }
                refCount() {
                    return pd()(this)
                }
            }

            function an(e, t) {
                return xe((n, r) => {
                    let o = null,
                        i = 0,
                        s = !1;
                    const a = () => s && !o && r.complete();
                    n.subscribe(De(r, l => {
                        o ? .unsubscribe();
                        let c = 0;
                        const u = i++;
                        Dt(e(l, u)).subscribe(o = De(r, h => r.next(t ? t(l, h, u, c++) : h), () => {
                            o = null, a()
                        }))
                    }, () => {
                        s = !0, a()
                    }))
                })
            }

            function gi(e) {
                return e <= 0 ? () => qt : xe((t, n) => {
                    let r = 0;
                    t.subscribe(De(n, o => {
                        ++r <= e && (n.next(o), e <= r && n.complete())
                    }))
                })
            }

            function Sn(e, t) {
                return xe((n, r) => {
                    let o = 0;
                    n.subscribe(De(r, i => e.call(t, i, o++) && r.next(i)))
                })
            }

            function pa(e) {
                return xe((t, n) => {
                    let r = !1;
                    t.subscribe(De(n, o => {
                        r = !0, n.next(o)
                    }, () => {
                        r || n.next(e), n.complete()
                    }))
                })
            }

            function jC(e = nT) {
                return xe((t, n) => {
                    let r = !1;
                    t.subscribe(De(n, o => {
                        r = !0, n.next(o)
                    }, () => r ? n.complete() : n.error(e())))
                })
            }

            function nT() {
                return new ha
            }

            function Fn(e, t) {
                const n = arguments.length >= 2;
                return r => r.pipe(e ? Sn((o, i) => e(o, i, r)) : Wn, gi(1), n ? pa(t) : jC(() => new ha))
            }

            function Ln(e, t) {
                return de(t) ? Le(e, t, 1) : Le(e, 1)
            }

            function Ke(e, t, n) {
                const r = de(e) || t || n ? {
                    next: e,
                    error: t,
                    complete: n
                } : e;
                return r ? xe((o, i) => {
                    var s;
                    null === (s = r.subscribe) || void 0 === s || s.call(r);
                    let a = !0;
                    o.subscribe(De(i, l => {
                        var c;
                        null === (c = r.next) || void 0 === c || c.call(r, l), i.next(l)
                    }, () => {
                        var l;
                        a = !1, null === (l = r.complete) || void 0 === l || l.call(r), i.complete()
                    }, l => {
                        var c;
                        a = !1, null === (c = r.error) || void 0 === c || c.call(r, l), i.error(l)
                    }, () => {
                        var l, c;
                        a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)), null === (c = r.finalize) || void 0 === c || c.call(r)
                    }))
                }) : Wn
            }

            function Vn(e) {
                return xe((t, n) => {
                    let i, r = null,
                        o = !1;
                    r = t.subscribe(De(n, void 0, void 0, s => {
                        i = Dt(e(s, Vn(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
                    })), o && (r.unsubscribe(), r = null, i.subscribe(n))
                })
            }

            function rT(e, t, n, r, o) {
                return (i, s) => {
                    let a = n,
                        l = t,
                        c = 0;
                    i.subscribe(De(s, u => {
                        const h = c++;
                        l = a ? e(l, u, h) : (a = !0, u), r && s.next(l)
                    }, o && (() => {
                        a && s.next(l), s.complete()
                    })))
                }
            }

            function BC(e, t) {
                return xe(rT(e, t, arguments.length >= 2, !0))
            }

            function gd(e) {
                return e <= 0 ? () => qt : xe((t, n) => {
                    let r = [];
                    t.subscribe(De(n, o => {
                        r.push(o), e < r.length && r.shift()
                    }, () => {
                        for (const o of r) n.next(o);
                        n.complete()
                    }, void 0, () => {
                        r = null
                    }))
                })
            }

            function UC(e, t) {
                const n = arguments.length >= 2;
                return r => r.pipe(e ? Sn((o, i) => e(o, i, r)) : Wn, gd(1), n ? pa(t) : jC(() => new ha))
            }

            function md(e) {
                return xe((t, n) => {
                    try {
                        t.subscribe(n)
                    } finally {
                        n.add(e)
                    }
                })
            }
            const H = "primary",
                mi = Symbol("RouteTitle");
            class sT {
                constructor(t) {
                    this.params = t || {}
                }
                has(t) {
                    return Object.prototype.hasOwnProperty.call(this.params, t)
                }
                get(t) {
                    if (this.has(t)) {
                        const n = this.params[t];
                        return Array.isArray(n) ? n[0] : n
                    }
                    return null
                }
                getAll(t) {
                    if (this.has(t)) {
                        const n = this.params[t];
                        return Array.isArray(n) ? n : [n]
                    }
                    return []
                }
                get keys() {
                    return Object.keys(this.params)
                }
            }

            function no(e) {
                return new sT(e)
            }

            function aT(e, t, n) {
                const r = n.path.split("/");
                if (r.length > e.length || "full" === n.pathMatch && (t.hasChildren() || r.length < e.length)) return null;
                const o = {};
                for (let i = 0; i < r.length; i++) {
                    const s = r[i],
                        a = e[i];
                    if (s.startsWith(":")) o[s.substring(1)] = a;
                    else if (s !== a.path) return null
                }
                return {
                    consumed: e.slice(0, r.length),
                    posParams: o
                }
            }

            function ln(e, t) {
                const n = e ? Object.keys(e) : void 0,
                    r = t ? Object.keys(t) : void 0;
                if (!n || !r || n.length != r.length) return !1;
                let o;
                for (let i = 0; i < n.length; i++)
                    if (o = n[i], !HC(e[o], t[o])) return !1;
                return !0
            }

            function HC(e, t) {
                if (Array.isArray(e) && Array.isArray(t)) {
                    if (e.length !== t.length) return !1;
                    const n = [...e].sort(),
                        r = [...t].sort();
                    return n.every((o, i) => r[i] === o)
                }
                return e === t
            }

            function $C(e) {
                return Array.prototype.concat.apply([], e)
            }

            function zC(e) {
                return e.length > 0 ? e[e.length - 1] : null
            }

            function He(e, t) {
                for (const n in e) e.hasOwnProperty(n) && t(e[n], n)
            }

            function jn(e) {
                return Zc(e) ? e : Ko(e) ? Me(Promise.resolve(e)) : T(e)
            }
            const ga = !1,
                cT = {
                    exact: function qC(e, t, n) {
                        if (!cr(e.segments, t.segments) || !ma(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren) return !1;
                        for (const r in t.children)
                            if (!e.children[r] || !qC(e.children[r], t.children[r], n)) return !1;
                        return !0
                    },
                    subset: KC
                },
                GC = {
                    exact: function uT(e, t) {
                        return ln(e, t)
                    },
                    subset: function dT(e, t) {
                        return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => HC(e[n], t[n]))
                    },
                    ignored: () => !0
                };

            function WC(e, t, n) {
                return cT[n.paths](e.root, t.root, n.matrixParams) && GC[n.queryParams](e.queryParams, t.queryParams) && !("exact" === n.fragment && e.fragment !== t.fragment)
            }

            function KC(e, t, n) {
                return ZC(e, t, t.segments, n)
            }

            function ZC(e, t, n, r) {
                if (e.segments.length > n.length) {
                    const o = e.segments.slice(0, n.length);
                    return !(!cr(o, n) || t.hasChildren() || !ma(o, n, r))
                }
                if (e.segments.length === n.length) {
                    if (!cr(e.segments, n) || !ma(e.segments, n, r)) return !1;
                    for (const o in t.children)
                        if (!e.children[o] || !KC(e.children[o], t.children[o], r)) return !1;
                    return !0
                } {
                    const o = n.slice(0, e.segments.length),
                        i = n.slice(e.segments.length);
                    return !!(cr(e.segments, o) && ma(e.segments, o, r) && e.children[H]) && ZC(e.children[H], t, i, r)
                }
            }

            function ma(e, t, n) {
                return t.every((r, o) => GC[n](e[o].parameters, r.parameters))
            }
            class lr {
                constructor(t = new Z([], {}), n = {}, r = null) {
                    this.root = t, this.queryParams = n, this.fragment = r
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = no(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return pT.serialize(this)
                }
            }
            class Z {
                constructor(t, n) {
                    this.segments = t, this.children = n, this.parent = null, He(n, (r, o) => r.parent = this)
                }
                hasChildren() {
                    return this.numberOfChildren > 0
                }
                get numberOfChildren() {
                    return Object.keys(this.children).length
                }
                toString() {
                    return va(this)
                }
            }
            class vi {
                constructor(t, n) {
                    this.path = t, this.parameters = n
                }
                get parameterMap() {
                    return this._parameterMap || (this._parameterMap = no(this.parameters)), this._parameterMap
                }
                toString() {
                    return XC(this)
                }
            }

            function cr(e, t) {
                return e.length === t.length && e.every((n, r) => n.path === t[r].path)
            }
            let yi = (() => {
                class e {}
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: function() {
                        return new vd
                    },
                    providedIn: "root"
                }), e
            })();
            class vd {
                parse(t) {
                    const n = new DT(t);
                    return new lr(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment())
                }
                serialize(t) {
                    const n = `/${Ci(t.root,!0)}`,
                        r = function vT(e) {
                            const t = Object.keys(e).map(n => {
                                const r = e[n];
                                return Array.isArray(r) ? r.map(o => `${ya(n)}=${ya(o)}`).join("&") : `${ya(n)}=${ya(r)}`
                            }).filter(n => !!n);
                            return t.length ? `?${t.join("&")}` : ""
                        }(t.queryParams);
                    return `${n}${r}${"string"==typeof t.fragment?`#${function gT(e){return encodeURI(e)}(t.fragment)}`:""}`
                }
            }
            const pT = new vd;

            function va(e) {
                return e.segments.map(t => XC(t)).join("/")
            }

            function Ci(e, t) {
                if (!e.hasChildren()) return va(e);
                if (t) {
                    const n = e.children[H] ? Ci(e.children[H], !1) : "",
                        r = [];
                    return He(e.children, (o, i) => {
                        i !== H && r.push(`${i}:${Ci(o,!1)}`)
                    }), r.length > 0 ? `${n}(${r.join("//")})` : n
                } {
                    const n = function hT(e, t) {
                        let n = [];
                        return He(e.children, (r, o) => {
                            o === H && (n = n.concat(t(r, o)))
                        }), He(e.children, (r, o) => {
                            o !== H && (n = n.concat(t(r, o)))
                        }), n
                    }(e, (r, o) => o === H ? [Ci(e.children[H], !1)] : [`${o}:${Ci(r,!1)}`]);
                    return 1 === Object.keys(e.children).length && null != e.children[H] ? `${va(e)}/${n[0]}` : `${va(e)}/(${n.join("//")})`
                }
            }

            function YC(e) {
                return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
            }

            function ya(e) {
                return YC(e).replace(/%3B/gi, ";")
            }

            function yd(e) {
                return YC(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
            }

            function Ca(e) {
                return decodeURIComponent(e)
            }

            function QC(e) {
                return Ca(e.replace(/\+/g, "%20"))
            }

            function XC(e) {
                return `${yd(e.path)}${function mT(e){return Object.keys(e).map(t=>`;${yd(t)}=${yd(e[t])}`).join("")}(e.parameters)}`
            }
            const yT = /^[^\/()?;=#]+/;

            function _a(e) {
                const t = e.match(yT);
                return t ? t[0] : ""
            }
            const CT = /^[^=?&#]+/,
                wT = /^[^&#]+/;
            class DT {
                constructor(t) {
                    this.url = t, this.remaining = t
                }
                parseRootSegment() {
                    return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new Z([], {}) : new Z([], this.parseChildren())
                }
                parseQueryParams() {
                    const t = {};
                    if (this.consumeOptional("?"))
                        do {
                            this.parseQueryParam(t)
                        } while (this.consumeOptional("&"));
                    return t
                }
                parseFragment() {
                    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
                }
                parseChildren() {
                    if ("" === this.remaining) return {};
                    this.consumeOptional("/");
                    const t = [];
                    for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
                    let n = {};
                    this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0));
                    let r = {};
                    return this.peekStartsWith("(") && (r = this.parseParens(!1)), (t.length > 0 || Object.keys(n).length > 0) && (r[H] = new Z(t, n)), r
                }
                parseSegment() {
                    const t = _a(this.remaining);
                    if ("" === t && this.peekStartsWith(";")) throw new E(4009, ga);
                    return this.capture(t), new vi(Ca(t), this.parseMatrixParams())
                }
                parseMatrixParams() {
                    const t = {};
                    for (; this.consumeOptional(";");) this.parseParam(t);
                    return t
                }
                parseParam(t) {
                    const n = _a(this.remaining);
                    if (!n) return;
                    this.capture(n);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const o = _a(this.remaining);
                        o && (r = o, this.capture(r))
                    }
                    t[Ca(n)] = Ca(r)
                }
                parseQueryParam(t) {
                    const n = function _T(e) {
                        const t = e.match(CT);
                        return t ? t[0] : ""
                    }(this.remaining);
                    if (!n) return;
                    this.capture(n);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const s = function bT(e) {
                            const t = e.match(wT);
                            return t ? t[0] : ""
                        }(this.remaining);
                        s && (r = s, this.capture(r))
                    }
                    const o = QC(n),
                        i = QC(r);
                    if (t.hasOwnProperty(o)) {
                        let s = t[o];
                        Array.isArray(s) || (s = [s], t[o] = s), s.push(i)
                    } else t[o] = i
                }
                parseParens(t) {
                    const n = {};
                    for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                        const r = _a(this.remaining),
                            o = this.remaining[r.length];
                        if ("/" !== o && ")" !== o && ";" !== o) throw new E(4010, ga);
                        let i;
                        r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = H);
                        const s = this.parseChildren();
                        n[i] = 1 === Object.keys(s).length ? s[H] : new Z([], s), this.consumeOptional("//")
                    }
                    return n
                }
                peekStartsWith(t) {
                    return this.remaining.startsWith(t)
                }
                consumeOptional(t) {
                    return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0)
                }
                capture(t) {
                    if (!this.consumeOptional(t)) throw new E(4011, ga)
                }
            }

            function Cd(e) {
                return e.segments.length > 0 ? new Z([], {
                    [H]: e
                }) : e
            }

            function wa(e) {
                const t = {};
                for (const r of Object.keys(e.children)) {
                    const i = wa(e.children[r]);
                    (i.segments.length > 0 || i.hasChildren()) && (t[r] = i)
                }
                return function MT(e) {
                    if (1 === e.numberOfChildren && e.children[H]) {
                        const t = e.children[H];
                        return new Z(e.segments.concat(t.segments), t.children)
                    }
                    return e
                }(new Z(e.segments, t))
            }

            function ur(e) {
                return e instanceof lr
            }

            function IT(e, t, n, r, o) {
                if (0 === n.length) return ro(t.root, t.root, t.root, r, o);
                const i = function t_(e) {
                    if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new e_(!0, 0, e);
                    let t = 0,
                        n = !1;
                    const r = e.reduce((o, i, s) => {
                        if ("object" == typeof i && null != i) {
                            if (i.outlets) {
                                const a = {};
                                return He(i.outlets, (l, c) => {
                                    a[c] = "string" == typeof l ? l.split("/") : l
                                }), [...o, {
                                    outlets: a
                                }]
                            }
                            if (i.segmentPath) return [...o, i.segmentPath]
                        }
                        return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach((a, l) => {
                            0 == l && "." === a || (0 == l && "" === a ? n = !0 : ".." === a ? t++ : "" != a && o.push(a))
                        }), o) : [...o, i]
                    }, []);
                    return new e_(n, t, r)
                }(n);
                return i.toRoot() ? ro(t.root, t.root, new Z([], {}), r, o) : function s(l) {
                    const c = function OT(e, t, n, r) {
                            if (e.isAbsolute) return new oo(t.root, !0, 0);
                            if (-1 === r) return new oo(n, n === t.root, 0);
                            return function n_(e, t, n) {
                                let r = e,
                                    o = t,
                                    i = n;
                                for (; i > o;) {
                                    if (i -= o, r = r.parent, !r) throw new E(4005, !1);
                                    o = r.segments.length
                                }
                                return new oo(r, !1, o - i)
                            }(n, r + (_i(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots)
                        }(i, t, e.snapshot ? ._urlSegment, l),
                        u = c.processChildren ? io(c.segmentGroup, c.index, i.commands) : wd(c.segmentGroup, c.index, i.commands);
                    return ro(t.root, c.segmentGroup, u, r, o)
                }(e.snapshot ? ._lastPathIndex)
            }

            function _i(e) {
                return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
            }

            function wi(e) {
                return "object" == typeof e && null != e && e.outlets
            }

            function ro(e, t, n, r, o) {
                let s, i = {};
                r && He(r, (l, c) => {
                    i[c] = Array.isArray(l) ? l.map(u => `${u}`) : `${l}`
                }), s = e === t ? n : JC(e, t, n);
                const a = Cd(wa(s));
                return new lr(a, i, o)
            }

            function JC(e, t, n) {
                const r = {};
                return He(e.children, (o, i) => {
                    r[i] = o === t ? n : JC(o, t, n)
                }), new Z(e.segments, r)
            }
            class e_ {
                constructor(t, n, r) {
                    if (this.isAbsolute = t, this.numberOfDoubleDots = n, this.commands = r, t && r.length > 0 && _i(r[0])) throw new E(4003, !1);
                    const o = r.find(wi);
                    if (o && o !== zC(r)) throw new E(4004, !1)
                }
                toRoot() {
                    return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
                }
            }
            class oo {
                constructor(t, n, r) {
                    this.segmentGroup = t, this.processChildren = n, this.index = r
                }
            }

            function wd(e, t, n) {
                if (e || (e = new Z([], {})), 0 === e.segments.length && e.hasChildren()) return io(e, t, n);
                const r = function AT(e, t, n) {
                        let r = 0,
                            o = t;
                        const i = {
                            match: !1,
                            pathIndex: 0,
                            commandIndex: 0
                        };
                        for (; o < e.segments.length;) {
                            if (r >= n.length) return i;
                            const s = e.segments[o],
                                a = n[r];
                            if (wi(a)) break;
                            const l = `${a}`,
                                c = r < n.length - 1 ? n[r + 1] : null;
                            if (o > 0 && void 0 === l) break;
                            if (l && c && "object" == typeof c && void 0 === c.outlets) {
                                if (!o_(l, c, s)) return i;
                                r += 2
                            } else {
                                if (!o_(l, {}, s)) return i;
                                r++
                            }
                            o++
                        }
                        return {
                            match: !0,
                            pathIndex: o,
                            commandIndex: r
                        }
                    }(e, t, n),
                    o = n.slice(r.commandIndex);
                if (r.match && r.pathIndex < e.segments.length) {
                    const i = new Z(e.segments.slice(0, r.pathIndex), {});
                    return i.children[H] = new Z(e.segments.slice(r.pathIndex), e.children), io(i, 0, o)
                }
                return r.match && 0 === o.length ? new Z(e.segments, {}) : r.match && !e.hasChildren() ? bd(e, t, n) : r.match ? io(e, 0, o) : bd(e, t, n)
            }

            function io(e, t, n) {
                if (0 === n.length) return new Z(e.segments, {}); {
                    const r = function xT(e) {
                            return wi(e[0]) ? e[0].outlets : {
                                [H]: e
                            }
                        }(n),
                        o = {};
                    return !r[H] && e.children[H] && 1 === e.numberOfChildren && 0 === e.children[H].segments.length ? io(e.children[H], t, n) : (He(r, (i, s) => {
                        "string" == typeof i && (i = [i]), null !== i && (o[s] = wd(e.children[s], t, i))
                    }), He(e.children, (i, s) => {
                        void 0 === r[s] && (o[s] = i)
                    }), new Z(e.segments, o))
                }
            }

            function bd(e, t, n) {
                const r = e.segments.slice(0, t);
                let o = 0;
                for (; o < n.length;) {
                    const i = n[o];
                    if (wi(i)) {
                        const l = TT(i.outlets);
                        return new Z(r, l)
                    }
                    if (0 === o && _i(n[0])) {
                        r.push(new vi(e.segments[t].path, r_(n[0]))), o++;
                        continue
                    }
                    const s = wi(i) ? i.outlets[H] : `${i}`,
                        a = o < n.length - 1 ? n[o + 1] : null;
                    s && a && _i(a) ? (r.push(new vi(s, r_(a))), o += 2) : (r.push(new vi(s, {})), o++)
                }
                return new Z(r, {})
            }

            function TT(e) {
                const t = {};
                return He(e, (n, r) => {
                    "string" == typeof n && (n = [n]), null !== n && (t[r] = bd(new Z([], {}), 0, n))
                }), t
            }

            function r_(e) {
                const t = {};
                return He(e, (n, r) => t[r] = `${n}`), t
            }

            function o_(e, t, n) {
                return e == n.path && ln(t, n.parameters)
            }
            const bi = "imperative";
            class cn {
                constructor(t, n) {
                    this.id = t, this.url = n
                }
            }
            class Dd extends cn {
                constructor(t, n, r = "imperative", o = null) {
                    super(t, n), this.type = 0, this.navigationTrigger = r, this.restoredState = o
                }
                toString() {
                    return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                }
            }
            class dr extends cn {
                constructor(t, n, r) {
                    super(t, n), this.urlAfterRedirects = r, this.type = 1
                }
                toString() {
                    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                }
            }
            class ba extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.reason = r, this.code = o, this.type = 2
                }
                toString() {
                    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                }
            }
            class i_ extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.reason = r, this.code = o, this.type = 16
                }
            }
            class s_ extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.error = r, this.target = o, this.type = 3
                }
                toString() {
                    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                }
            }
            class kT extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 4
                }
                toString() {
                    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class RT extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 7
                }
                toString() {
                    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class NT extends cn {
                constructor(t, n, r, o, i) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = 8
                }
                toString() {
                    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                }
            }
            class FT extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 5
                }
                toString() {
                    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class LT extends cn {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 6
                }
                toString() {
                    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class VT {
                constructor(t) {
                    this.route = t, this.type = 9
                }
                toString() {
                    return `RouteConfigLoadStart(path: ${this.route.path})`
                }
            }
            class jT {
                constructor(t) {
                    this.route = t, this.type = 10
                }
                toString() {
                    return `RouteConfigLoadEnd(path: ${this.route.path})`
                }
            }
            class BT {
                constructor(t) {
                    this.snapshot = t, this.type = 11
                }
                toString() {
                    return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class UT {
                constructor(t) {
                    this.snapshot = t, this.type = 12
                }
                toString() {
                    return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class HT {
                constructor(t) {
                    this.snapshot = t, this.type = 13
                }
                toString() {
                    return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class $T {
                constructor(t) {
                    this.snapshot = t, this.type = 14
                }
                toString() {
                    return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class a_ {
                constructor(t, n, r) {
                    this.routerEvent = t, this.position = n, this.anchor = r, this.type = 15
                }
                toString() {
                    return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
                }
            }
            let GT = (() => {
                    class e {
                        createUrlTree(n, r, o, i, s, a) {
                            return IT(n || r.root, o, i, s, a)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })(),
                WT = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: function(t) {
                            return GT.\u0275fac(t)
                        },
                        providedIn: "root"
                    }), e
                })();
            class l_ {
                constructor(t) {
                    this._root = t
                }
                get root() {
                    return this._root.value
                }
                parent(t) {
                    const n = this.pathFromRoot(t);
                    return n.length > 1 ? n[n.length - 2] : null
                }
                children(t) {
                    const n = Md(t, this._root);
                    return n ? n.children.map(r => r.value) : []
                }
                firstChild(t) {
                    const n = Md(t, this._root);
                    return n && n.children.length > 0 ? n.children[0].value : null
                }
                siblings(t) {
                    const n = Ed(t, this._root);
                    return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t)
                }
                pathFromRoot(t) {
                    return Ed(t, this._root).map(n => n.value)
                }
            }

            function Md(e, t) {
                if (e === t.value) return t;
                for (const n of t.children) {
                    const r = Md(e, n);
                    if (r) return r
                }
                return null
            }

            function Ed(e, t) {
                if (e === t.value) return [t];
                for (const n of t.children) {
                    const r = Ed(e, n);
                    if (r.length) return r.unshift(t), r
                }
                return []
            }
            class In {
                constructor(t, n) {
                    this.value = t, this.children = n
                }
                toString() {
                    return `TreeNode(${this.value})`
                }
            }

            function so(e) {
                const t = {};
                return e && e.children.forEach(n => t[n.value.outlet] = n), t
            }
            class c_ extends l_ {
                constructor(t, n) {
                    super(t), this.snapshot = n, Sd(this, t)
                }
                toString() {
                    return this.snapshot.toString()
                }
            }

            function u_(e, t) {
                const n = function qT(e, t) {
                        const s = new Da([], {}, {}, "", {}, H, t, null, e.root, -1, {});
                        return new f_("", new In(s, []))
                    }(e, t),
                    r = new Gt([new vi("", {})]),
                    o = new Gt({}),
                    i = new Gt({}),
                    s = new Gt({}),
                    a = new Gt(""),
                    l = new ao(r, o, s, a, i, H, t, n.root);
                return l.snapshot = n.root, new c_(new In(l, []), n)
            }
            class ao {
                constructor(t, n, r, o, i, s, a, l) {
                    this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.title = this.data ? .pipe(W(c => c[mi])) ? ? T(void 0), this._futureSnapshot = l
                }
                get routeConfig() {
                    return this._futureSnapshot.routeConfig
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = this.params.pipe(W(t => no(t)))), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(W(t => no(t)))), this._queryParamMap
                }
                toString() {
                    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
                }
            }

            function d_(e, t = "emptyOnly") {
                const n = e.pathFromRoot;
                let r = 0;
                if ("always" !== t)
                    for (r = n.length - 1; r >= 1;) {
                        const o = n[r],
                            i = n[r - 1];
                        if (o.routeConfig && "" === o.routeConfig.path) r--;
                        else {
                            if (i.component) break;
                            r--
                        }
                    }
                return function KT(e) {
                    return e.reduce((t, n) => ({
                        params: { ...t.params,
                            ...n.params
                        },
                        data: { ...t.data,
                            ...n.data
                        },
                        resolve: { ...n.data,
                            ...t.resolve,
                            ...n.routeConfig ? .data,
                            ...n._resolvedData
                        }
                    }), {
                        params: {},
                        data: {},
                        resolve: {}
                    })
                }(n.slice(r))
            }
            class Da {
                get title() {
                    return this.data ? .[mi]
                }
                constructor(t, n, r, o, i, s, a, l, c, u, h) {
                    this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = l, this._urlSegment = c, this._lastPathIndex = u, this._resolve = h
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = no(this.params)), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = no(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
                }
            }
            class f_ extends l_ {
                constructor(t, n) {
                    super(n), this.url = t, Sd(this, n)
                }
                toString() {
                    return h_(this._root)
                }
            }

            function Sd(e, t) {
                t.value._routerState = e, t.children.forEach(n => Sd(e, n))
            }

            function h_(e) {
                const t = e.children.length > 0 ? ` { ${e.children.map(h_).join(", ")} } ` : "";
                return `${e.value}${t}`
            }

            function Id(e) {
                if (e.snapshot) {
                    const t = e.snapshot,
                        n = e._futureSnapshot;
                    e.snapshot = n, ln(t.queryParams, n.queryParams) || e.queryParams.next(n.queryParams), t.fragment !== n.fragment && e.fragment.next(n.fragment), ln(t.params, n.params) || e.params.next(n.params),
                        function lT(e, t) {
                            if (e.length !== t.length) return !1;
                            for (let n = 0; n < e.length; ++n)
                                if (!ln(e[n], t[n])) return !1;
                            return !0
                        }(t.url, n.url) || e.url.next(n.url), ln(t.data, n.data) || e.data.next(n.data)
                } else e.snapshot = e._futureSnapshot, e.data.next(e._futureSnapshot.data)
            }

            function Pd(e, t) {
                const n = ln(e.params, t.params) && function fT(e, t) {
                    return cr(e, t) && e.every((n, r) => ln(n.parameters, t[r].parameters))
                }(e.url, t.url);
                return n && !(!e.parent != !t.parent) && (!e.parent || Pd(e.parent, t.parent))
            }

            function Di(e, t, n) {
                if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
                    const r = n.value;
                    r._futureSnapshot = t.value;
                    const o = function YT(e, t, n) {
                        return t.children.map(r => {
                            for (const o of n.children)
                                if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Di(e, r, o);
                            return Di(e, r)
                        })
                    }(e, t, n);
                    return new In(r, o)
                } {
                    if (e.shouldAttach(t.value)) {
                        const i = e.retrieve(t.value);
                        if (null !== i) {
                            const s = i.route;
                            return s.value._futureSnapshot = t.value, s.children = t.children.map(a => Di(e, a)), s
                        }
                    }
                    const r = function QT(e) {
                            return new ao(new Gt(e.url), new Gt(e.params), new Gt(e.queryParams), new Gt(e.fragment), new Gt(e.data), e.outlet, e.component, e)
                        }(t.value),
                        o = t.children.map(i => Di(e, i));
                    return new In(r, o)
                }
            }
            const Od = "ngNavigationCancelingError";

            function p_(e, t) {
                const {
                    redirectTo: n,
                    navigationBehaviorOptions: r
                } = ur(t) ? {
                    redirectTo: t,
                    navigationBehaviorOptions: void 0
                } : t, o = g_(!1, 0, t);
                return o.url = n, o.navigationBehaviorOptions = r, o
            }

            function g_(e, t, n) {
                const r = new Error("NavigationCancelingError: " + (e || ""));
                return r[Od] = !0, r.cancellationCode = t, n && (r.url = n), r
            }

            function m_(e) {
                return v_(e) && ur(e.url)
            }

            function v_(e) {
                return e && e[Od]
            }
            class XT {
                constructor() {
                    this.outlet = null, this.route = null, this.resolver = null, this.injector = null, this.children = new Mi, this.attachRef = null
                }
            }
            let Mi = (() => {
                class e {
                    constructor() {
                        this.contexts = new Map
                    }
                    onChildOutletCreated(n, r) {
                        const o = this.getOrCreateContext(n);
                        o.outlet = r, this.contexts.set(n, o)
                    }
                    onChildOutletDestroyed(n) {
                        const r = this.getContext(n);
                        r && (r.outlet = null, r.attachRef = null)
                    }
                    onOutletDeactivated() {
                        const n = this.contexts;
                        return this.contexts = new Map, n
                    }
                    onOutletReAttached(n) {
                        this.contexts = n
                    }
                    getOrCreateContext(n) {
                        let r = this.getContext(n);
                        return r || (r = new XT, this.contexts.set(n, r)), r
                    }
                    getContext(n) {
                        return this.contexts.get(n) || null
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const Ma = !1;
            let xd = (() => {
                class e {
                    constructor() {
                        this.activated = null, this._activatedRoute = null, this.name = H, this.activateEvents = new J, this.deactivateEvents = new J, this.attachEvents = new J, this.detachEvents = new J, this.parentContexts = K(Mi), this.location = K(Ot), this.changeDetector = K(Ys), this.environmentInjector = K(Xt)
                    }
                    ngOnChanges(n) {
                        if (n.name) {
                            const {
                                firstChange: r,
                                previousValue: o
                            } = n.name;
                            if (r) return;
                            this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                        }
                    }
                    ngOnDestroy() {
                        this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name)
                    }
                    isTrackedInParentContexts(n) {
                        return this.parentContexts.getContext(n) ? .outlet === this
                    }
                    ngOnInit() {
                        this.initializeOutletWithName()
                    }
                    initializeOutletWithName() {
                        if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                        const n = this.parentContexts.getContext(this.name);
                        n ? .route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
                    }
                    get isActivated() {
                        return !!this.activated
                    }
                    get component() {
                        if (!this.activated) throw new E(4012, Ma);
                        return this.activated.instance
                    }
                    get activatedRoute() {
                        if (!this.activated) throw new E(4012, Ma);
                        return this._activatedRoute
                    }
                    get activatedRouteData() {
                        return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                    }
                    detach() {
                        if (!this.activated) throw new E(4012, Ma);
                        this.location.detach();
                        const n = this.activated;
                        return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(n.instance), n
                    }
                    attach(n, r) {
                        this.activated = n, this._activatedRoute = r, this.location.insert(n.hostView), this.attachEvents.emit(n.instance)
                    }
                    deactivate() {
                        if (this.activated) {
                            const n = this.component;
                            this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(n)
                        }
                    }
                    activateWith(n, r) {
                        if (this.isActivated) throw new E(4013, Ma);
                        this._activatedRoute = n;
                        const o = this.location,
                            s = n.snapshot.component,
                            a = this.parentContexts.getOrCreateContext(this.name).children,
                            l = new JT(n, a, o.injector);
                        if (r && function ek(e) {
                                return !!e.resolveComponentFactory
                            }(r)) {
                            const c = r.resolveComponentFactory(s);
                            this.activated = o.createComponent(c, o.length, l)
                        } else this.activated = o.createComponent(s, {
                            index: o.length,
                            injector: l,
                            environmentInjector: r ? ? this.environmentInjector
                        });
                        this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275dir = V({
                    type: e,
                    selectors: [
                        ["router-outlet"]
                    ],
                    inputs: {
                        name: "name"
                    },
                    outputs: {
                        activateEvents: "activate",
                        deactivateEvents: "deactivate",
                        attachEvents: "attach",
                        detachEvents: "detach"
                    },
                    exportAs: ["outlet"],
                    standalone: !0,
                    features: [gt]
                }), e
            })();
            class JT {
                constructor(t, n, r) {
                    this.route = t, this.childContexts = n, this.parent = r
                }
                get(t, n) {
                    return t === ao ? this.route : t === Mi ? this.childContexts : this.parent.get(t, n)
                }
            }
            let Ad = (() => {
                class e {}
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275cmp = Fe({
                    type: e,
                    selectors: [
                        ["ng-component"]
                    ],
                    standalone: !0,
                    features: [wv],
                    decls: 1,
                    vars: 0,
                    template: function(n, r) {
                        1 & n && v(0, "router-outlet")
                    },
                    dependencies: [xd],
                    encapsulation: 2
                }), e
            })();

            function y_(e, t) {
                return e.providers && !e._injector && (e._injector = Us(e.providers, t, `Route: ${e.path}`)), e._injector ? ? t
            }

            function kd(e) {
                const t = e.children && e.children.map(kd),
                    n = t ? { ...e,
                        children: t
                    } : { ...e
                    };
                return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== H && (n.component = Ad), n
            }

            function kt(e) {
                return e.outlet || H
            }

            function C_(e, t) {
                const n = e.filter(r => kt(r) === t);
                return n.push(...e.filter(r => kt(r) !== t)), n
            }

            function Ei(e) {
                if (!e) return null;
                if (e.routeConfig ? ._injector) return e.routeConfig._injector;
                for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig;
                    if (n ? ._loadedInjector) return n._loadedInjector;
                    if (n ? ._injector) return n._injector
                }
                return null
            }
            class ik {
                constructor(t, n, r, o) {
                    this.routeReuseStrategy = t, this.futureState = n, this.currState = r, this.forwardEvent = o
                }
                activate(t) {
                    const n = this.futureState._root,
                        r = this.currState ? this.currState._root : null;
                    this.deactivateChildRoutes(n, r, t), Id(this.futureState.root), this.activateChildRoutes(n, r, t)
                }
                deactivateChildRoutes(t, n, r) {
                    const o = so(n);
                    t.children.forEach(i => {
                        const s = i.value.outlet;
                        this.deactivateRoutes(i, o[s], r), delete o[s]
                    }), He(o, (i, s) => {
                        this.deactivateRouteAndItsChildren(i, r)
                    })
                }
                deactivateRoutes(t, n, r) {
                    const o = t.value,
                        i = n ? n.value : null;
                    if (o === i)
                        if (o.component) {
                            const s = r.getContext(o.outlet);
                            s && this.deactivateChildRoutes(t, n, s.children)
                        } else this.deactivateChildRoutes(t, n, r);
                    else i && this.deactivateRouteAndItsChildren(n, r)
                }
                deactivateRouteAndItsChildren(t, n) {
                    t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n)
                }
                detachAndStoreRouteSubtree(t, n) {
                    const r = n.getContext(t.value.outlet),
                        o = r && t.value.component ? r.children : n,
                        i = so(t);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    if (r && r.outlet) {
                        const s = r.outlet.detach(),
                            a = r.children.onOutletDeactivated();
                        this.routeReuseStrategy.store(t.value.snapshot, {
                            componentRef: s,
                            route: t,
                            contexts: a
                        })
                    }
                }
                deactivateRouteAndOutlet(t, n) {
                    const r = n.getContext(t.value.outlet),
                        o = r && t.value.component ? r.children : n,
                        i = so(t);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    r && r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated(), r.attachRef = null, r.resolver = null, r.route = null)
                }
                activateChildRoutes(t, n, r) {
                    const o = so(n);
                    t.children.forEach(i => {
                        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new $T(i.value.snapshot))
                    }), t.children.length && this.forwardEvent(new UT(t.value.snapshot))
                }
                activateRoutes(t, n, r) {
                    const o = t.value,
                        i = n ? n.value : null;
                    if (Id(o), o === i)
                        if (o.component) {
                            const s = r.getOrCreateContext(o.outlet);
                            this.activateChildRoutes(t, n, s.children)
                        } else this.activateChildRoutes(t, n, r);
                    else if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                            const a = this.routeReuseStrategy.retrieve(o.snapshot);
                            this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Id(a.route.value), this.activateChildRoutes(t, null, s.children)
                        } else {
                            const a = Ei(o.snapshot),
                                l = a ? .get(Rr) ? ? null;
                            s.attachRef = null, s.route = o, s.resolver = l, s.injector = a, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(t, null, s.children)
                        }
                    } else this.activateChildRoutes(t, null, r)
                }
            }
            class __ {
                constructor(t) {
                    this.path = t, this.route = this.path[this.path.length - 1]
                }
            }
            class Ea {
                constructor(t, n) {
                    this.component = t, this.route = n
                }
            }

            function sk(e, t, n) {
                const r = e._root;
                return Si(r, t ? t._root : null, n, [r.value])
            }

            function lo(e, t) {
                const n = Symbol(),
                    r = t.get(e, n);
                return r === n ? "function" != typeof e || function a0(e) {
                    return null !== zi(e)
                }(e) ? t.get(e) : e : r
            }

            function Si(e, t, n, r, o = {
                canDeactivateChecks: [],
                canActivateChecks: []
            }) {
                const i = so(t);
                return e.children.forEach(s => {
                    (function lk(e, t, n, r, o = {
                        canDeactivateChecks: [],
                        canActivateChecks: []
                    }) {
                        const i = e.value,
                            s = t ? t.value : null,
                            a = n ? n.getContext(e.value.outlet) : null;
                        if (s && i.routeConfig === s.routeConfig) {
                            const l = function ck(e, t, n) {
                                if ("function" == typeof n) return n(e, t);
                                switch (n) {
                                    case "pathParamsChange":
                                        return !cr(e.url, t.url);
                                    case "pathParamsOrQueryParamsChange":
                                        return !cr(e.url, t.url) || !ln(e.queryParams, t.queryParams);
                                    case "always":
                                        return !0;
                                    case "paramsOrQueryParamsChange":
                                        return !Pd(e, t) || !ln(e.queryParams, t.queryParams);
                                    default:
                                        return !Pd(e, t)
                                }
                            }(s, i, i.routeConfig.runGuardsAndResolvers);
                            l ? o.canActivateChecks.push(new __(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), Si(e, t, i.component ? a ? a.children : null : n, r, o), l && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new Ea(a.outlet.component, s))
                        } else s && Ii(t, a, o), o.canActivateChecks.push(new __(r)), Si(e, null, i.component ? a ? a.children : null : n, r, o)
                    })(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet]
                }), He(i, (s, a) => Ii(s, n.getContext(a), o)), o
            }

            function Ii(e, t, n) {
                const r = so(e),
                    o = e.value;
                He(r, (i, s) => {
                    Ii(i, o.component ? t ? t.children.getContext(s) : null : t, n)
                }), n.canDeactivateChecks.push(new Ea(o.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null, o))
            }

            function Pi(e) {
                return "function" == typeof e
            }

            function Rd(e) {
                return e instanceof ha || "EmptyError" === e ? .name
            }
            const Sa = Symbol("INITIAL_VALUE");

            function co() {
                return an(e => NC(e.map(t => t.pipe(gi(1), function tT(...e) {
                    const t = yo(e);
                    return xe((n, r) => {
                        (t ? hd(e, n, t) : hd(e, n)).subscribe(r)
                    })
                }(Sa)))).pipe(W(t => {
                    for (const n of t)
                        if (!0 !== n) {
                            if (n === Sa) return Sa;
                            if (!1 === n || n instanceof lr) return n
                        }
                    return !0
                }), Sn(t => t !== Sa), gi(1)))
            }

            function w_(e) {
                return function E1(...e) {
                    return Pf(e)
                }(Ke(t => {
                    if (ur(t)) throw p_(0, t)
                }), W(t => !0 === t))
            }
            const Nd = {
                matched: !1,
                consumedSegments: [],
                remainingSegments: [],
                parameters: {},
                positionalParamSegments: {}
            };

            function b_(e, t, n, r, o) {
                const i = Fd(e, t, n);
                return i.matched ? function Sk(e, t, n, r) {
                    const o = t.canMatch;
                    return o && 0 !== o.length ? T(o.map(s => {
                        const a = lo(s, e);
                        return jn(function gk(e) {
                            return e && Pi(e.canMatch)
                        }(a) ? a.canMatch(t, n) : e.runInContext(() => a(t, n)))
                    })).pipe(co(), w_()) : T(!0)
                }(r = y_(t, r), t, n).pipe(W(s => !0 === s ? i : { ...Nd
                })) : T(i)
            }

            function Fd(e, t, n) {
                if ("" === t.path) return "full" === t.pathMatch && (e.hasChildren() || n.length > 0) ? { ...Nd
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: n,
                    parameters: {},
                    positionalParamSegments: {}
                };
                const o = (t.matcher || aT)(n, e, t);
                if (!o) return { ...Nd
                };
                const i = {};
                He(o.posParams, (a, l) => {
                    i[l] = a.path
                });
                const s = o.consumed.length > 0 ? { ...i,
                    ...o.consumed[o.consumed.length - 1].parameters
                } : i;
                return {
                    matched: !0,
                    consumedSegments: o.consumed,
                    remainingSegments: n.slice(o.consumed.length),
                    parameters: s,
                    positionalParamSegments: o.posParams ? ? {}
                }
            }

            function Ia(e, t, n, r) {
                if (n.length > 0 && function Ok(e, t, n) {
                        return n.some(r => Pa(e, t, r) && kt(r) !== H)
                    }(e, n, r)) {
                    const i = new Z(t, function Pk(e, t, n, r) {
                        const o = {};
                        o[H] = r, r._sourceSegment = e, r._segmentIndexShift = t.length;
                        for (const i of n)
                            if ("" === i.path && kt(i) !== H) {
                                const s = new Z([], {});
                                s._sourceSegment = e, s._segmentIndexShift = t.length, o[kt(i)] = s
                            }
                        return o
                    }(e, t, r, new Z(n, e.children)));
                    return i._sourceSegment = e, i._segmentIndexShift = t.length, {
                        segmentGroup: i,
                        slicedSegments: []
                    }
                }
                if (0 === n.length && function xk(e, t, n) {
                        return n.some(r => Pa(e, t, r))
                    }(e, n, r)) {
                    const i = new Z(e.segments, function Ik(e, t, n, r, o) {
                        const i = {};
                        for (const s of r)
                            if (Pa(e, n, s) && !o[kt(s)]) {
                                const a = new Z([], {});
                                a._sourceSegment = e, a._segmentIndexShift = t.length, i[kt(s)] = a
                            }
                        return { ...o,
                            ...i
                        }
                    }(e, t, n, r, e.children));
                    return i._sourceSegment = e, i._segmentIndexShift = t.length, {
                        segmentGroup: i,
                        slicedSegments: n
                    }
                }
                const o = new Z(e.segments, e.children);
                return o._sourceSegment = e, o._segmentIndexShift = t.length, {
                    segmentGroup: o,
                    slicedSegments: n
                }
            }

            function Pa(e, t, n) {
                return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path
            }

            function D_(e, t, n, r) {
                return !!(kt(e) === r || r !== H && Pa(t, n, e)) && ("**" === e.path || Fd(t, e, n).matched)
            }

            function M_(e, t, n) {
                return 0 === t.length && !e.children[n]
            }
            const Oa = !1;
            class xa {
                constructor(t) {
                    this.segmentGroup = t || null
                }
            }
            class E_ {
                constructor(t) {
                    this.urlTree = t
                }
            }

            function Oi(e) {
                return pi(new xa(e))
            }

            function S_(e) {
                return pi(new E_(e))
            }
            class Rk {
                constructor(t, n, r, o, i) {
                    this.injector = t, this.configLoader = n, this.urlSerializer = r, this.urlTree = o, this.config = i, this.allowRedirects = !0
                }
                apply() {
                    const t = Ia(this.urlTree.root, [], [], this.config).segmentGroup,
                        n = new Z(t.segments, t.children);
                    return this.expandSegmentGroup(this.injector, this.config, n, H).pipe(W(i => this.createUrlTree(wa(i), this.urlTree.queryParams, this.urlTree.fragment))).pipe(Vn(i => {
                        if (i instanceof E_) return this.allowRedirects = !1, this.match(i.urlTree);
                        throw i instanceof xa ? this.noMatchError(i) : i
                    }))
                }
                match(t) {
                    return this.expandSegmentGroup(this.injector, this.config, t.root, H).pipe(W(o => this.createUrlTree(wa(o), t.queryParams, t.fragment))).pipe(Vn(o => {
                        throw o instanceof xa ? this.noMatchError(o) : o
                    }))
                }
                noMatchError(t) {
                    return new E(4002, Oa)
                }
                createUrlTree(t, n, r) {
                    const o = Cd(t);
                    return new lr(o, n, r)
                }
                expandSegmentGroup(t, n, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(t, n, r).pipe(W(i => new Z([], i))) : this.expandSegment(t, r, n, r.segments, o, !0)
                }
                expandChildren(t, n, r) {
                    const o = [];
                    for (const i of Object.keys(r.children)) "primary" === i ? o.unshift(i) : o.push(i);
                    return Me(o).pipe(Ln(i => {
                        const s = r.children[i],
                            a = C_(n, i);
                        return this.expandSegmentGroup(t, a, s, i).pipe(W(l => ({
                            segment: l,
                            outlet: i
                        })))
                    }), BC((i, s) => (i[s.outlet] = s.segment, i), {}), UC())
                }
                expandSegment(t, n, r, o, i, s) {
                    return Me(r).pipe(Ln(a => this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(Vn(c => {
                        if (c instanceof xa) return T(null);
                        throw c
                    }))), Fn(a => !!a), Vn((a, l) => {
                        if (Rd(a)) return M_(n, o, i) ? T(new Z([], {})) : Oi(n);
                        throw a
                    }))
                }
                expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
                    return D_(o, n, i, s) ? void 0 === o.redirectTo ? this.matchSegmentAgainstRoute(t, n, o, i, s) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) : Oi(n) : Oi(n)
                }
                expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                    return "**" === o.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
                }
                expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
                    const i = this.applyRedirectCommands([], r.redirectTo, {});
                    return r.redirectTo.startsWith("/") ? S_(i) : this.lineralizeSegments(r, i).pipe(Le(s => {
                        const a = new Z(s, {});
                        return this.expandSegment(t, a, n, s, o, !1)
                    }))
                }
                expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                    const {
                        matched: a,
                        consumedSegments: l,
                        remainingSegments: c,
                        positionalParamSegments: u
                    } = Fd(n, o, i);
                    if (!a) return Oi(n);
                    const h = this.applyRedirectCommands(l, o.redirectTo, u);
                    return o.redirectTo.startsWith("/") ? S_(h) : this.lineralizeSegments(o, h).pipe(Le(g => this.expandSegment(t, n, r, g.concat(c), s, !1)))
                }
                matchSegmentAgainstRoute(t, n, r, o, i) {
                    return "**" === r.path ? (t = y_(r, t), r.loadChildren ? (r._loadedRoutes ? T({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector
                    }) : this.configLoader.loadChildren(t, r)).pipe(W(a => (r._loadedRoutes = a.routes, r._loadedInjector = a.injector, new Z(o, {})))) : T(new Z(o, {}))) : b_(n, r, o, t).pipe(an(({
                        matched: s,
                        consumedSegments: a,
                        remainingSegments: l
                    }) => s ? this.getChildConfig(t = r._injector ? ? t, r, o).pipe(Le(u => {
                        const h = u.injector ? ? t,
                            g = u.routes,
                            {
                                segmentGroup: m,
                                slicedSegments: y
                            } = Ia(n, a, l, g),
                            C = new Z(m.segments, m.children);
                        if (0 === y.length && C.hasChildren()) return this.expandChildren(h, g, C).pipe(W(b => new Z(a, b)));
                        if (0 === g.length && 0 === y.length) return T(new Z(a, {}));
                        const _ = kt(r) === i;
                        return this.expandSegment(h, C, g, y, _ ? H : i, !0).pipe(W(S => new Z(a.concat(S.segments), S.children)))
                    })) : Oi(n)))
                }
                getChildConfig(t, n, r) {
                    return n.children ? T({
                        routes: n.children,
                        injector: t
                    }) : n.loadChildren ? void 0 !== n._loadedRoutes ? T({
                        routes: n._loadedRoutes,
                        injector: n._loadedInjector
                    }) : function Ek(e, t, n, r) {
                        const o = t.canLoad;
                        return void 0 === o || 0 === o.length ? T(!0) : T(o.map(s => {
                            const a = lo(s, e);
                            return jn(function dk(e) {
                                return e && Pi(e.canLoad)
                            }(a) ? a.canLoad(t, n) : e.runInContext(() => a(t, n)))
                        })).pipe(co(), w_())
                    }(t, n, r).pipe(Le(o => o ? this.configLoader.loadChildren(t, n).pipe(Ke(i => {
                        n._loadedRoutes = i.routes, n._loadedInjector = i.injector
                    })) : function Tk(e) {
                        return pi(g_(Oa, 3))
                    }())) : T({
                        routes: [],
                        injector: t
                    })
                }
                lineralizeSegments(t, n) {
                    let r = [],
                        o = n.root;
                    for (;;) {
                        if (r = r.concat(o.segments), 0 === o.numberOfChildren) return T(r);
                        if (o.numberOfChildren > 1 || !o.children[H]) return pi(new E(4e3, Oa));
                        o = o.children[H]
                    }
                }
                applyRedirectCommands(t, n, r) {
                    return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r)
                }
                applyRedirectCreateUrlTree(t, n, r, o) {
                    const i = this.createSegmentGroup(t, n.root, r, o);
                    return new lr(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment)
                }
                createQueryParams(t, n) {
                    const r = {};
                    return He(t, (o, i) => {
                        if ("string" == typeof o && o.startsWith(":")) {
                            const a = o.substring(1);
                            r[i] = n[a]
                        } else r[i] = o
                    }), r
                }
                createSegmentGroup(t, n, r, o) {
                    const i = this.createSegments(t, n.segments, r, o);
                    let s = {};
                    return He(n.children, (a, l) => {
                        s[l] = this.createSegmentGroup(t, a, r, o)
                    }), new Z(i, s)
                }
                createSegments(t, n, r, o) {
                    return n.map(i => i.path.startsWith(":") ? this.findPosParam(t, i, o) : this.findOrReturn(i, r))
                }
                findPosParam(t, n, r) {
                    const o = r[n.path.substring(1)];
                    if (!o) throw new E(4001, Oa);
                    return o
                }
                findOrReturn(t, n) {
                    let r = 0;
                    for (const o of n) {
                        if (o.path === t.path) return n.splice(r), o;
                        r++
                    }
                    return t
                }
            }
            class Fk {}
            class jk {
                constructor(t, n, r, o, i, s, a) {
                    this.injector = t, this.rootComponentType = n, this.config = r, this.urlTree = o, this.url = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a
                }
                recognize() {
                    const t = Ia(this.urlTree.root, [], [], this.config.filter(n => void 0 === n.redirectTo)).segmentGroup;
                    return this.processSegmentGroup(this.injector, this.config, t, H).pipe(W(n => {
                        if (null === n) return null;
                        const r = new Da([], Object.freeze({}), Object.freeze({ ...this.urlTree.queryParams
                            }), this.urlTree.fragment, {}, H, this.rootComponentType, null, this.urlTree.root, -1, {}),
                            o = new In(r, n),
                            i = new f_(this.url, o);
                        return this.inheritParamsAndData(i._root), i
                    }))
                }
                inheritParamsAndData(t) {
                    const n = t.value,
                        r = d_(n, this.paramsInheritanceStrategy);
                    n.params = Object.freeze(r.params), n.data = Object.freeze(r.data), t.children.forEach(o => this.inheritParamsAndData(o))
                }
                processSegmentGroup(t, n, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.processChildren(t, n, r) : this.processSegment(t, n, r, r.segments, o)
                }
                processChildren(t, n, r) {
                    return Me(Object.keys(r.children)).pipe(Ln(o => {
                        const i = r.children[o],
                            s = C_(n, o);
                        return this.processSegmentGroup(t, s, i, o)
                    }), BC((o, i) => o && i ? (o.push(...i), o) : null), function oT(e, t = !1) {
                        return xe((n, r) => {
                            let o = 0;
                            n.subscribe(De(r, i => {
                                const s = e(i, o++);
                                (s || t) && r.next(i), !s && r.complete()
                            }))
                        })
                    }(o => null !== o), pa(null), UC(), W(o => {
                        if (null === o) return null;
                        const i = P_(o);
                        return function Bk(e) {
                            e.sort((t, n) => t.value.outlet === H ? -1 : n.value.outlet === H ? 1 : t.value.outlet.localeCompare(n.value.outlet))
                        }(i), i
                    }))
                }
                processSegment(t, n, r, o, i) {
                    return Me(n).pipe(Ln(s => this.processSegmentAgainstRoute(s._injector ? ? t, s, r, o, i)), Fn(s => !!s), Vn(s => {
                        if (Rd(s)) return M_(r, o, i) ? T([]) : T(null);
                        throw s
                    }))
                }
                processSegmentAgainstRoute(t, n, r, o, i) {
                    if (n.redirectTo || !D_(n, r, o, i)) return T(null);
                    let s;
                    if ("**" === n.path) {
                        const a = o.length > 0 ? zC(o).parameters : {},
                            l = x_(r) + o.length;
                        s = T({
                            snapshot: new Da(o, a, Object.freeze({ ...this.urlTree.queryParams
                            }), this.urlTree.fragment, A_(n), kt(n), n.component ? ? n._loadedComponent ? ? null, n, O_(r), l, T_(n)),
                            consumedSegments: [],
                            remainingSegments: []
                        })
                    } else s = b_(r, n, o, t).pipe(W(({
                        matched: a,
                        consumedSegments: l,
                        remainingSegments: c,
                        parameters: u
                    }) => {
                        if (!a) return null;
                        const h = x_(r) + l.length;
                        return {
                            snapshot: new Da(l, u, Object.freeze({ ...this.urlTree.queryParams
                            }), this.urlTree.fragment, A_(n), kt(n), n.component ? ? n._loadedComponent ? ? null, n, O_(r), h, T_(n)),
                            consumedSegments: l,
                            remainingSegments: c
                        }
                    }));
                    return s.pipe(an(a => {
                        if (null === a) return T(null);
                        const {
                            snapshot: l,
                            consumedSegments: c,
                            remainingSegments: u
                        } = a;
                        t = n._injector ? ? t;
                        const h = n._loadedInjector ? ? t,
                            g = function Uk(e) {
                                return e.children ? e.children : e.loadChildren ? e._loadedRoutes : []
                            }(n),
                            {
                                segmentGroup: m,
                                slicedSegments: y
                            } = Ia(r, c, u, g.filter(_ => void 0 === _.redirectTo));
                        if (0 === y.length && m.hasChildren()) return this.processChildren(h, g, m).pipe(W(_ => null === _ ? null : [new In(l, _)]));
                        if (0 === g.length && 0 === y.length) return T([new In(l, [])]);
                        const C = kt(n) === i;
                        return this.processSegment(h, g, m, y, C ? H : i).pipe(W(_ => null === _ ? null : [new In(l, _)]))
                    }))
                }
            }

            function Hk(e) {
                const t = e.value.routeConfig;
                return t && "" === t.path && void 0 === t.redirectTo
            }

            function P_(e) {
                const t = [],
                    n = new Set;
                for (const r of e) {
                    if (!Hk(r)) {
                        t.push(r);
                        continue
                    }
                    const o = t.find(i => r.value.routeConfig === i.value.routeConfig);
                    void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r)
                }
                for (const r of n) {
                    const o = P_(r.children);
                    t.push(new In(r.value, o))
                }
                return t.filter(r => !n.has(r))
            }

            function O_(e) {
                let t = e;
                for (; t._sourceSegment;) t = t._sourceSegment;
                return t
            }

            function x_(e) {
                let t = e,
                    n = t._segmentIndexShift ? ? 0;
                for (; t._sourceSegment;) t = t._sourceSegment, n += t._segmentIndexShift ? ? 0;
                return n - 1
            }

            function A_(e) {
                return e.data || {}
            }

            function T_(e) {
                return e.resolve || {}
            }

            function k_(e) {
                return "string" == typeof e.title || null === e.title
            }

            function Ld(e) {
                return an(t => {
                    const n = e(t);
                    return n ? Me(n).pipe(W(() => t)) : T(t)
                })
            }
            const uo = new O("ROUTES");
            let Vd = (() => {
                class e {
                    constructor(n, r) {
                        this.injector = n, this.compiler = r, this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap
                    }
                    loadComponent(n) {
                        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
                        if (n._loadedComponent) return T(n._loadedComponent);
                        this.onLoadStartListener && this.onLoadStartListener(n);
                        const r = jn(n.loadComponent()).pipe(W(N_), Ke(i => {
                                this.onLoadEndListener && this.onLoadEndListener(n), n._loadedComponent = i
                            }), md(() => {
                                this.componentLoaders.delete(n)
                            })),
                            o = new VC(r, () => new Wt).pipe(pd());
                        return this.componentLoaders.set(n, o), o
                    }
                    loadChildren(n, r) {
                        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                        if (r._loadedRoutes) return T({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                        this.onLoadStartListener && this.onLoadStartListener(r);
                        const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(W(a => {
                                this.onLoadEndListener && this.onLoadEndListener(r);
                                let l, c, u = !1;
                                Array.isArray(a) ? c = a : (l = a.create(n).injector, c = $C(l.get(uo, [], F.Self | F.Optional)));
                                return {
                                    routes: c.map(kd),
                                    injector: l
                                }
                            }), md(() => {
                                this.childrenLoaders.delete(r)
                            })),
                            s = new VC(i, () => new Wt).pipe(pd());
                        return this.childrenLoaders.set(r, s), s
                    }
                    loadModuleFactoryOrRoutes(n) {
                        return jn(n()).pipe(W(N_), Le(o => o instanceof Cv || Array.isArray(o) ? T(o) : Me(this.compiler.compileModuleAsync(o))))
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(jt), x(uy))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();

            function N_(e) {
                return function Qk(e) {
                    return e && "object" == typeof e && "default" in e
                }(e) ? e.default : e
            }
            let Ta = (() => {
                class e {
                    get hasRequestedNavigation() {
                        return 0 !== this.navigationId
                    }
                    constructor() {
                        this.currentNavigation = null, this.lastSuccessfulNavigation = null, this.events = new Wt, this.configLoader = K(Vd), this.environmentInjector = K(Xt), this.urlSerializer = K(yi), this.rootContexts = K(Mi), this.navigationId = 0, this.afterPreactivation = () => T(void 0), this.rootComponentType = null, this.configLoader.onLoadEndListener = o => this.events.next(new jT(o)), this.configLoader.onLoadStartListener = o => this.events.next(new VT(o))
                    }
                    complete() {
                        this.transitions ? .complete()
                    }
                    handleNavigationRequest(n) {
                        const r = ++this.navigationId;
                        this.transitions ? .next({ ...this.transitions.value,
                            ...n,
                            id: r
                        })
                    }
                    setupNavigations(n) {
                        return this.transitions = new Gt({
                            id: 0,
                            targetPageId: 0,
                            currentUrlTree: n.currentUrlTree,
                            currentRawUrl: n.currentUrlTree,
                            extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                            urlAfterRedirects: n.urlHandlingStrategy.extract(n.currentUrlTree),
                            rawUrl: n.currentUrlTree,
                            extras: {},
                            resolve: null,
                            reject: null,
                            promise: Promise.resolve(!0),
                            source: bi,
                            restoredState: null,
                            currentSnapshot: n.routerState.snapshot,
                            targetSnapshot: null,
                            currentRouterState: n.routerState,
                            targetRouterState: null,
                            guards: {
                                canActivateChecks: [],
                                canDeactivateChecks: []
                            },
                            guardsResult: null
                        }), this.transitions.pipe(Sn(r => 0 !== r.id), W(r => ({ ...r,
                            extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl)
                        })), an(r => {
                            let o = !1,
                                i = !1;
                            return T(r).pipe(Ke(s => {
                                this.currentNavigation = {
                                    id: s.id,
                                    initialUrl: s.rawUrl,
                                    extractedUrl: s.extractedUrl,
                                    trigger: s.source,
                                    extras: s.extras,
                                    previousNavigation: this.lastSuccessfulNavigation ? { ...this.lastSuccessfulNavigation,
                                        previousNavigation: null
                                    } : null
                                }
                            }), an(s => {
                                const a = n.browserUrlTree.toString(),
                                    l = !n.navigated || s.extractedUrl.toString() !== a || a !== n.currentUrlTree.toString();
                                if (!l && "reload" !== (s.extras.onSameUrlNavigation ? ? n.onSameUrlNavigation)) {
                                    const u = "";
                                    return this.events.next(new i_(s.id, n.serializeUrl(r.rawUrl), u, 0)), n.rawUrlTree = s.rawUrl, s.resolve(null), qt
                                }
                                if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl)) return F_(s.source) && (n.browserUrlTree = s.extractedUrl), T(s).pipe(an(u => {
                                    const h = this.transitions ? .getValue();
                                    return this.events.next(new Dd(u.id, this.urlSerializer.serialize(u.extractedUrl), u.source, u.restoredState)), h !== this.transitions ? .getValue() ? qt : Promise.resolve(u)
                                }), function Nk(e, t, n, r) {
                                    return an(o => function kk(e, t, n, r, o) {
                                        return new Rk(e, t, n, r, o).apply()
                                    }(e, t, n, o.extractedUrl, r).pipe(W(i => ({ ...o,
                                        urlAfterRedirects: i
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.urlSerializer, n.config), Ke(u => {
                                    this.currentNavigation = { ...this.currentNavigation,
                                        finalUrl: u.urlAfterRedirects
                                    }, r.urlAfterRedirects = u.urlAfterRedirects
                                }), function zk(e, t, n, r, o) {
                                    return Le(i => function Vk(e, t, n, r, o, i, s = "emptyOnly") {
                                        return new jk(e, t, n, r, o, s, i).recognize().pipe(an(a => null === a ? function Lk(e) {
                                            return new ye(t => t.error(e))
                                        }(new Fk) : T(a)))
                                    }(e, t, n, i.urlAfterRedirects, r.serialize(i.urlAfterRedirects), r, o).pipe(W(s => ({ ...i,
                                        targetSnapshot: s
                                    }))))
                                }(this.environmentInjector, this.rootComponentType, n.config, this.urlSerializer, n.paramsInheritanceStrategy), Ke(u => {
                                    if (r.targetSnapshot = u.targetSnapshot, "eager" === n.urlUpdateStrategy) {
                                        if (!u.extras.skipLocationChange) {
                                            const g = n.urlHandlingStrategy.merge(u.urlAfterRedirects, u.rawUrl);
                                            n.setBrowserUrl(g, u)
                                        }
                                        n.browserUrlTree = u.urlAfterRedirects
                                    }
                                    const h = new kT(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot);
                                    this.events.next(h)
                                }));
                                if (l && n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)) {
                                    const {
                                        id: u,
                                        extractedUrl: h,
                                        source: g,
                                        restoredState: m,
                                        extras: y
                                    } = s, C = new Dd(u, this.urlSerializer.serialize(h), g, m);
                                    this.events.next(C);
                                    const _ = u_(h, this.rootComponentType).snapshot;
                                    return T(r = { ...s,
                                        targetSnapshot: _,
                                        urlAfterRedirects: h,
                                        extras: { ...y,
                                            skipLocationChange: !1,
                                            replaceUrl: !1
                                        }
                                    })
                                } {
                                    const u = "";
                                    return this.events.next(new i_(s.id, n.serializeUrl(r.extractedUrl), u, 1)), n.rawUrlTree = s.rawUrl, s.resolve(null), qt
                                }
                            }), Ke(s => {
                                const a = new RT(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot);
                                this.events.next(a)
                            }), W(s => r = { ...s,
                                guards: sk(s.targetSnapshot, s.currentSnapshot, this.rootContexts)
                            }), function vk(e, t) {
                                return Le(n => {
                                    const {
                                        targetSnapshot: r,
                                        currentSnapshot: o,
                                        guards: {
                                            canActivateChecks: i,
                                            canDeactivateChecks: s
                                        }
                                    } = n;
                                    return 0 === s.length && 0 === i.length ? T({ ...n,
                                        guardsResult: !0
                                    }) : function yk(e, t, n, r) {
                                        return Me(e).pipe(Le(o => function Mk(e, t, n, r, o) {
                                            const i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                                            return i && 0 !== i.length ? T(i.map(a => {
                                                const l = Ei(t) ? ? o,
                                                    c = lo(a, l);
                                                return jn(function pk(e) {
                                                    return e && Pi(e.canDeactivate)
                                                }(c) ? c.canDeactivate(e, t, n, r) : l.runInContext(() => c(e, t, n, r))).pipe(Fn())
                                            })).pipe(co()) : T(!0)
                                        }(o.component, o.route, n, t, r)), Fn(o => !0 !== o, !0))
                                    }(s, r, o, e).pipe(Le(a => a && function uk(e) {
                                        return "boolean" == typeof e
                                    }(a) ? function Ck(e, t, n, r) {
                                        return Me(t).pipe(Ln(o => hd(function wk(e, t) {
                                            return null !== e && t && t(new BT(e)), T(!0)
                                        }(o.route.parent, r), function _k(e, t) {
                                            return null !== e && t && t(new HT(e)), T(!0)
                                        }(o.route, r), function Dk(e, t, n) {
                                            const r = t[t.length - 1],
                                                i = t.slice(0, t.length - 1).reverse().map(s => function ak(e) {
                                                    const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                                    return t && 0 !== t.length ? {
                                                        node: e,
                                                        guards: t
                                                    } : null
                                                }(s)).filter(s => null !== s).map(s => LC(() => T(s.guards.map(l => {
                                                    const c = Ei(s.node) ? ? n,
                                                        u = lo(l, c);
                                                    return jn(function hk(e) {
                                                        return e && Pi(e.canActivateChild)
                                                    }(u) ? u.canActivateChild(r, e) : c.runInContext(() => u(r, e))).pipe(Fn())
                                                })).pipe(co())));
                                            return T(i).pipe(co())
                                        }(e, o.path, n), function bk(e, t, n) {
                                            const r = t.routeConfig ? t.routeConfig.canActivate : null;
                                            if (!r || 0 === r.length) return T(!0);
                                            const o = r.map(i => LC(() => {
                                                const s = Ei(t) ? ? n,
                                                    a = lo(i, s);
                                                return jn(function fk(e) {
                                                    return e && Pi(e.canActivate)
                                                }(a) ? a.canActivate(t, e) : s.runInContext(() => a(t, e))).pipe(Fn())
                                            }));
                                            return T(o).pipe(co())
                                        }(e, o.route, n))), Fn(o => !0 !== o, !0))
                                    }(r, i, e, t) : T(a)), W(a => ({ ...n,
                                        guardsResult: a
                                    })))
                                })
                            }(this.environmentInjector, s => this.events.next(s)), Ke(s => {
                                if (r.guardsResult = s.guardsResult, ur(s.guardsResult)) throw p_(0, s.guardsResult);
                                const a = new NT(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot, !!s.guardsResult);
                                this.events.next(a)
                            }), Sn(s => !!s.guardsResult || (n.restoreHistory(s), this.cancelNavigationTransition(s, "", 3), !1)), Ld(s => {
                                if (s.guards.canActivateChecks.length) return T(s).pipe(Ke(a => {
                                    const l = new FT(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                                    this.events.next(l)
                                }), an(a => {
                                    let l = !1;
                                    return T(a).pipe(function Gk(e, t) {
                                        return Le(n => {
                                            const {
                                                targetSnapshot: r,
                                                guards: {
                                                    canActivateChecks: o
                                                }
                                            } = n;
                                            if (!o.length) return T(n);
                                            let i = 0;
                                            return Me(o).pipe(Ln(s => function Wk(e, t, n, r) {
                                                const o = e.routeConfig,
                                                    i = e._resolve;
                                                return void 0 !== o ? .title && !k_(o) && (i[mi] = o.title),
                                                    function qk(e, t, n, r) {
                                                        const o = function Kk(e) {
                                                            return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
                                                        }(e);
                                                        if (0 === o.length) return T({});
                                                        const i = {};
                                                        return Me(o).pipe(Le(s => function Zk(e, t, n, r) {
                                                            const o = Ei(t) ? ? r,
                                                                i = lo(e, o);
                                                            return jn(i.resolve ? i.resolve(t, n) : o.runInContext(() => i(t, n)))
                                                        }(e[s], t, n, r).pipe(Fn(), Ke(a => {
                                                            i[s] = a
                                                        }))), gd(1), function iT(e) {
                                                            return W(() => e)
                                                        }(i), Vn(s => Rd(s) ? qt : pi(s)))
                                                    }(i, e, t, r).pipe(W(s => (e._resolvedData = s, e.data = d_(e, n).resolve, o && k_(o) && (e.data[mi] = o.title), null)))
                                            }(s.route, r, e, t)), Ke(() => i++), gd(1), Le(s => i === o.length ? T(n) : qt))
                                        })
                                    }(n.paramsInheritanceStrategy, this.environmentInjector), Ke({
                                        next: () => l = !0,
                                        complete: () => {
                                            l || (n.restoreHistory(a), this.cancelNavigationTransition(a, "", 2))
                                        }
                                    }))
                                }), Ke(a => {
                                    const l = new LT(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                                    this.events.next(l)
                                }))
                            }), Ld(s => {
                                const a = l => {
                                    const c = [];
                                    l.routeConfig ? .loadComponent && !l.routeConfig._loadedComponent && c.push(this.configLoader.loadComponent(l.routeConfig).pipe(Ke(u => {
                                        l.component = u
                                    }), W(() => {})));
                                    for (const u of l.children) c.push(...a(u));
                                    return c
                                };
                                return NC(a(s.targetSnapshot.root)).pipe(pa(), gi(1))
                            }), Ld(() => this.afterPreactivation()), W(s => {
                                const a = function ZT(e, t, n) {
                                    const r = Di(e, t._root, n ? n._root : void 0);
                                    return new c_(r, t)
                                }(n.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
                                return r = { ...s,
                                    targetRouterState: a
                                }
                            }), Ke(s => {
                                n.currentUrlTree = s.urlAfterRedirects, n.rawUrlTree = n.urlHandlingStrategy.merge(s.urlAfterRedirects, s.rawUrl), n.routerState = s.targetRouterState, "deferred" === n.urlUpdateStrategy && (s.extras.skipLocationChange || n.setBrowserUrl(n.rawUrlTree, s), n.browserUrlTree = s.urlAfterRedirects)
                            }), ((e, t, n) => W(r => (new ik(t, r.targetRouterState, r.currentRouterState, n).activate(e), r)))(this.rootContexts, n.routeReuseStrategy, s => this.events.next(s)), Ke({
                                next: s => {
                                    o = !0, this.lastSuccessfulNavigation = this.currentNavigation, n.navigated = !0, this.events.next(new dr(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(n.currentUrlTree))), n.titleStrategy ? .updateTitle(s.targetRouterState.snapshot), s.resolve(!0)
                                },
                                complete: () => {
                                    o = !0
                                }
                            }), md(() => {
                                o || i || this.cancelNavigationTransition(r, "", 1), this.currentNavigation ? .id === r.id && (this.currentNavigation = null)
                            }), Vn(s => {
                                if (i = !0, v_(s)) {
                                    m_(s) || (n.navigated = !0, n.restoreHistory(r, !0));
                                    const a = new ba(r.id, this.urlSerializer.serialize(r.extractedUrl), s.message, s.cancellationCode);
                                    if (this.events.next(a), m_(s)) {
                                        const l = n.urlHandlingStrategy.merge(s.url, n.rawUrlTree),
                                            c = {
                                                skipLocationChange: r.extras.skipLocationChange,
                                                replaceUrl: "eager" === n.urlUpdateStrategy || F_(r.source)
                                            };
                                        n.scheduleNavigation(l, bi, null, c, {
                                            resolve: r.resolve,
                                            reject: r.reject,
                                            promise: r.promise
                                        })
                                    } else r.resolve(!1)
                                } else {
                                    n.restoreHistory(r, !0);
                                    const a = new s_(r.id, this.urlSerializer.serialize(r.extractedUrl), s, r.targetSnapshot ? ? void 0);
                                    this.events.next(a);
                                    try {
                                        r.resolve(n.errorHandler(s))
                                    } catch (l) {
                                        r.reject(l)
                                    }
                                }
                                return qt
                            }))
                        }))
                    }
                    cancelNavigationTransition(n, r, o) {
                        const i = new ba(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
                        this.events.next(i), n.resolve(!1)
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();

            function F_(e) {
                return e !== bi
            }
            let L_ = (() => {
                    class e {
                        buildTitle(n) {
                            let r, o = n.root;
                            for (; void 0 !== o;) r = this.getResolvedTitleForRoute(o) ? ? r, o = o.children.find(i => i.outlet === H);
                            return r
                        }
                        getResolvedTitleForRoute(n) {
                            return n.data[mi]
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return K(Xk)
                        },
                        providedIn: "root"
                    }), e
                })(),
                Xk = (() => {
                    class e extends L_ {
                        constructor(n) {
                            super(), this.title = n
                        }
                        updateTitle(n) {
                            const r = this.buildTitle(n);
                            void 0 !== r && this.title.setTitle(r)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(OC))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })(),
                Jk = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return K(tR)
                        },
                        providedIn: "root"
                    }), e
                })();
            class eR {
                shouldDetach(t) {
                    return !1
                }
                store(t, n) {}
                shouldAttach(t) {
                    return !1
                }
                retrieve(t) {
                    return null
                }
                shouldReuseRoute(t, n) {
                    return t.routeConfig === n.routeConfig
                }
            }
            let tR = (() => {
                class e extends eR {}
                return e.\u0275fac = function() {
                    let t;
                    return function(r) {
                        return (t || (t = Be(e)))(r || e)
                    }
                }(), e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const ka = new O("", {
                providedIn: "root",
                factory: () => ({})
            });
            let rR = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return K(oR)
                        },
                        providedIn: "root"
                    }), e
                })(),
                oR = (() => {
                    class e {
                        shouldProcessUrl(n) {
                            return !0
                        }
                        extract(n) {
                            return n
                        }
                        merge(n, r) {
                            return n
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })();

            function iR(e) {
                throw e
            }

            function sR(e, t, n) {
                return t.parse("/")
            }
            const aR = {
                    paths: "exact",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "exact"
                },
                lR = {
                    paths: "subset",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "subset"
                };
            let wt = (() => {
                    class e {
                        get navigationId() {
                            return this.navigationTransitions.navigationId
                        }
                        get browserPageId() {
                            return this.location.getState() ? .\u0275routerPageId
                        }
                        get events() {
                            return this.navigationTransitions.events
                        }
                        constructor() {
                            this.disposed = !1, this.currentPageId = 0, this.console = K(NP), this.isNgZoneEnabled = !1, this.options = K(ka, {
                                optional: !0
                            }) || {}, this.errorHandler = this.options.errorHandler || iR, this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || sR, this.navigated = !1, this.lastSuccessfulId = -1, this.urlHandlingStrategy = K(rR), this.routeReuseStrategy = K(Jk), this.urlCreationStrategy = K(WT), this.titleStrategy = K(L_), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.config = $C(K(uo, {
                                optional: !0
                            }) ? ? []), this.navigationTransitions = K(Ta), this.urlSerializer = K(yi), this.location = K(Uu), this.isNgZoneEnabled = K(Se) instanceof Se && Se.isInAngularZone(), this.resetConfig(this.config), this.currentUrlTree = new lr, this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.routerState = u_(this.currentUrlTree, null), this.navigationTransitions.setupNavigations(this).subscribe(n => {
                                this.lastSuccessfulId = n.id, this.currentPageId = n.targetPageId
                            }, n => {
                                this.console.warn(`Unhandled Navigation Error: ${n}`)
                            })
                        }
                        resetRootComponentType(n) {
                            this.routerState.root.component = n, this.navigationTransitions.rootComponentType = n
                        }
                        initialNavigation() {
                            if (this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation) {
                                const n = this.location.getState();
                                this.navigateToSyncWithBrowser(this.location.path(!0), bi, n)
                            }
                        }
                        setUpLocationChangeListener() {
                            this.locationSubscription || (this.locationSubscription = this.location.subscribe(n => {
                                const r = "popstate" === n.type ? "popstate" : "hashchange";
                                "popstate" === r && setTimeout(() => {
                                    this.navigateToSyncWithBrowser(n.url, r, n.state)
                                }, 0)
                            }))
                        }
                        navigateToSyncWithBrowser(n, r, o) {
                            const i = {
                                    replaceUrl: !0
                                },
                                s = o ? .navigationId ? o : null;
                            if (o) {
                                const l = { ...o
                                };
                                delete l.navigationId, delete l.\u0275routerPageId, 0 !== Object.keys(l).length && (i.state = l)
                            }
                            const a = this.parseUrl(n);
                            this.scheduleNavigation(a, r, s, i)
                        }
                        get url() {
                            return this.serializeUrl(this.currentUrlTree)
                        }
                        getCurrentNavigation() {
                            return this.navigationTransitions.currentNavigation
                        }
                        resetConfig(n) {
                            this.config = n.map(kd), this.navigated = !1, this.lastSuccessfulId = -1
                        }
                        ngOnDestroy() {
                            this.dispose()
                        }
                        dispose() {
                            this.navigationTransitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
                        }
                        createUrlTree(n, r = {}) {
                            const {
                                relativeTo: o,
                                queryParams: i,
                                fragment: s,
                                queryParamsHandling: a,
                                preserveFragment: l
                            } = r, c = l ? this.currentUrlTree.fragment : s;
                            let u = null;
                            switch (a) {
                                case "merge":
                                    u = { ...this.currentUrlTree.queryParams,
                                        ...i
                                    };
                                    break;
                                case "preserve":
                                    u = this.currentUrlTree.queryParams;
                                    break;
                                default:
                                    u = i || null
                            }
                            return null !== u && (u = this.removeEmptyProps(u)), this.urlCreationStrategy.createUrlTree(o, this.routerState, this.currentUrlTree, n, u, c ? ? null)
                        }
                        navigateByUrl(n, r = {
                            skipLocationChange: !1
                        }) {
                            const o = ur(n) ? n : this.parseUrl(n),
                                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                            return this.scheduleNavigation(i, bi, null, r)
                        }
                        navigate(n, r = {
                            skipLocationChange: !1
                        }) {
                            return function cR(e) {
                                for (let t = 0; t < e.length; t++) {
                                    if (null == e[t]) throw new E(4008, !1)
                                }
                            }(n), this.navigateByUrl(this.createUrlTree(n, r), r)
                        }
                        serializeUrl(n) {
                            return this.urlSerializer.serialize(n)
                        }
                        parseUrl(n) {
                            let r;
                            try {
                                r = this.urlSerializer.parse(n)
                            } catch (o) {
                                r = this.malformedUriErrorHandler(o, this.urlSerializer, n)
                            }
                            return r
                        }
                        isActive(n, r) {
                            let o;
                            if (o = !0 === r ? { ...aR
                                } : !1 === r ? { ...lR
                                } : r, ur(n)) return WC(this.currentUrlTree, n, o);
                            const i = this.parseUrl(n);
                            return WC(this.currentUrlTree, i, o)
                        }
                        removeEmptyProps(n) {
                            return Object.keys(n).reduce((r, o) => {
                                const i = n[o];
                                return null != i && (r[o] = i), r
                            }, {})
                        }
                        scheduleNavigation(n, r, o, i, s) {
                            if (this.disposed) return Promise.resolve(!1);
                            let a, l, c, u;
                            return s ? (a = s.resolve, l = s.reject, c = s.promise) : c = new Promise((h, g) => {
                                a = h, l = g
                            }), u = "computed" === this.canceledNavigationResolution ? o && o.\u0275routerPageId ? o.\u0275routerPageId : i.replaceUrl || i.skipLocationChange ? this.browserPageId ? ? 0 : (this.browserPageId ? ? 0) + 1 : 0, this.navigationTransitions.handleNavigationRequest({
                                targetPageId: u,
                                source: r,
                                restoredState: o,
                                currentUrlTree: this.currentUrlTree,
                                currentRawUrl: this.currentUrlTree,
                                rawUrl: n,
                                extras: i,
                                resolve: a,
                                reject: l,
                                promise: c,
                                currentSnapshot: this.routerState.snapshot,
                                currentRouterState: this.routerState
                            }), c.catch(h => Promise.reject(h))
                        }
                        setBrowserUrl(n, r) {
                            const o = this.urlSerializer.serialize(n),
                                i = { ...r.extras.state,
                                    ...this.generateNgRouterState(r.id, r.targetPageId)
                                };
                            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl ? this.location.replaceState(o, "", i) : this.location.go(o, "", i)
                        }
                        restoreHistory(n, r = !1) {
                            if ("computed" === this.canceledNavigationResolution) {
                                const o = this.currentPageId - n.targetPageId;
                                "popstate" !== n.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.getCurrentNavigation() ? .finalUrl || 0 === o ? this.currentUrlTree === this.getCurrentNavigation() ? .finalUrl && 0 === o && (this.resetState(n), this.browserUrlTree = n.currentUrlTree, this.resetUrlToCurrentUrlTree()) : this.location.historyGo(o)
                            } else "replace" === this.canceledNavigationResolution && (r && this.resetState(n), this.resetUrlToCurrentUrlTree())
                        }
                        resetState(n) {
                            this.routerState = n.currentRouterState, this.currentUrlTree = n.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl)
                        }
                        resetUrlToCurrentUrlTree() {
                            this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                        }
                        generateNgRouterState(n, r) {
                            return "computed" === this.canceledNavigationResolution ? {
                                navigationId: n,
                                \u0275routerPageId: r
                            } : {
                                navigationId: n
                            }
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })(),
                Ze = (() => {
                    class e {
                        constructor(n, r, o, i, s, a) {
                            this.router = n, this.route = r, this.tabIndexAttribute = o, this.renderer = i, this.el = s, this.locationStrategy = a, this._preserveFragment = !1, this._skipLocationChange = !1, this._replaceUrl = !1, this.href = null, this.commands = null, this.onChanges = new Wt;
                            const l = s.nativeElement.tagName;
                            this.isAnchorElement = "A" === l || "AREA" === l, this.isAnchorElement ? this.subscription = n.events.subscribe(c => {
                                c instanceof dr && this.updateHref()
                            }) : this.setTabIndexIfNotOnNativeEl("0")
                        }
                        set preserveFragment(n) {
                            this._preserveFragment = to(n)
                        }
                        get preserveFragment() {
                            return this._preserveFragment
                        }
                        set skipLocationChange(n) {
                            this._skipLocationChange = to(n)
                        }
                        get skipLocationChange() {
                            return this._skipLocationChange
                        }
                        set replaceUrl(n) {
                            this._replaceUrl = to(n)
                        }
                        get replaceUrl() {
                            return this._replaceUrl
                        }
                        setTabIndexIfNotOnNativeEl(n) {
                            null != this.tabIndexAttribute || this.isAnchorElement || this.applyAttributeValue("tabindex", n)
                        }
                        ngOnChanges(n) {
                            this.isAnchorElement && this.updateHref(), this.onChanges.next(this)
                        }
                        set routerLink(n) {
                            null != n ? (this.commands = Array.isArray(n) ? n : [n], this.setTabIndexIfNotOnNativeEl("0")) : (this.commands = null, this.setTabIndexIfNotOnNativeEl(null))
                        }
                        onClick(n, r, o, i, s) {
                            return !!(null === this.urlTree || this.isAnchorElement && (0 !== n || r || o || i || s || "string" == typeof this.target && "_self" != this.target)) || (this.router.navigateByUrl(this.urlTree, {
                                skipLocationChange: this.skipLocationChange,
                                replaceUrl: this.replaceUrl,
                                state: this.state
                            }), !this.isAnchorElement)
                        }
                        ngOnDestroy() {
                            this.subscription ? .unsubscribe()
                        }
                        updateHref() {
                            this.href = null !== this.urlTree && this.locationStrategy ? this.locationStrategy ? .prepareExternalUrl(this.router.serializeUrl(this.urlTree)) : null;
                            const n = null === this.href ? null : function Hp(e, t, n) {
                                return function FD(e, t) {
                                    return "src" === t && ("embed" === e || "frame" === e || "iframe" === e || "media" === e || "script" === e) || "href" === t && ("base" === e || "link" === e) ? Up : Bp
                                }(t, n)(e)
                            }(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
                            this.applyAttributeValue("href", n)
                        }
                        applyAttributeValue(n, r) {
                            const o = this.renderer,
                                i = this.el.nativeElement;
                            null !== r ? o.setAttribute(i, n, r) : o.removeAttribute(i, n)
                        }
                        get urlTree() {
                            return null === this.commands ? null : this.router.createUrlTree(this.commands, {
                                relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                                queryParams: this.queryParams,
                                fragment: this.fragment,
                                queryParamsHandling: this.queryParamsHandling,
                                preserveFragment: this.preserveFragment
                            })
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(wt), w(ao), function us(e) {
                            return function ab(e, t) {
                                if ("class" === t) return e.classes;
                                if ("style" === t) return e.styles;
                                const n = e.attrs;
                                if (n) {
                                    const r = n.length;
                                    let o = 0;
                                    for (; o < r;) {
                                        const i = n[o];
                                        if (Ah(i)) break;
                                        if (0 === i) o += 2;
                                        else if ("number" == typeof i)
                                            for (o++; o < r && "string" == typeof n[o];) o++;
                                        else {
                                            if (i === t) return n[o + 1];
                                            o += 2
                                        }
                                    }
                                }
                                return null
                            }(je(), e)
                        }("tabindex"), w(yn), w(Ct), w(ar))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "routerLink", ""]
                        ],
                        hostVars: 1,
                        hostBindings: function(n, r) {
                            1 & n && Q("click", function(i) {
                                return r.onClick(i.button, i.ctrlKey, i.shiftKey, i.altKey, i.metaKey)
                            }), 2 & n && tn("target", r.target)
                        },
                        inputs: {
                            target: "target",
                            queryParams: "queryParams",
                            fragment: "fragment",
                            queryParamsHandling: "queryParamsHandling",
                            state: "state",
                            relativeTo: "relativeTo",
                            preserveFragment: "preserveFragment",
                            skipLocationChange: "skipLocationChange",
                            replaceUrl: "replaceUrl",
                            routerLink: "routerLink"
                        },
                        standalone: !0,
                        features: [gt]
                    }), e
                })(),
                ut = (() => {
                    class e {
                        get isActive() {
                            return this._isActive
                        }
                        constructor(n, r, o, i, s) {
                            this.router = n, this.element = r, this.renderer = o, this.cdr = i, this.link = s, this.classes = [], this._isActive = !1, this.routerLinkActiveOptions = {
                                exact: !1
                            }, this.isActiveChange = new J, this.routerEventsSubscription = n.events.subscribe(a => {
                                a instanceof dr && this.update()
                            })
                        }
                        ngAfterContentInit() {
                            T(this.links.changes, T(null)).pipe(gr()).subscribe(n => {
                                this.update(), this.subscribeToEachLinkOnChanges()
                            })
                        }
                        subscribeToEachLinkOnChanges() {
                            this.linkInputChangesSubscription ? .unsubscribe();
                            const n = [...this.links.toArray(), this.link].filter(r => !!r).map(r => r.onChanges);
                            this.linkInputChangesSubscription = Me(n).pipe(gr()).subscribe(r => {
                                this._isActive !== this.isLinkActive(this.router)(r) && this.update()
                            })
                        }
                        set routerLinkActive(n) {
                            const r = Array.isArray(n) ? n : n.split(" ");
                            this.classes = r.filter(o => !!o)
                        }
                        ngOnChanges(n) {
                            this.update()
                        }
                        ngOnDestroy() {
                            this.routerEventsSubscription.unsubscribe(), this.linkInputChangesSubscription ? .unsubscribe()
                        }
                        update() {
                            !this.links || !this.router.navigated || Promise.resolve().then(() => {
                                const n = this.hasActiveLinks();
                                this._isActive !== n && (this._isActive = n, this.cdr.markForCheck(), this.classes.forEach(r => {
                                    n ? this.renderer.addClass(this.element.nativeElement, r) : this.renderer.removeClass(this.element.nativeElement, r)
                                }), n && void 0 !== this.ariaCurrentWhenActive ? this.renderer.setAttribute(this.element.nativeElement, "aria-current", this.ariaCurrentWhenActive.toString()) : this.renderer.removeAttribute(this.element.nativeElement, "aria-current"), this.isActiveChange.emit(n))
                            })
                        }
                        isLinkActive(n) {
                            const r = function uR(e) {
                                return !!e.paths
                            }(this.routerLinkActiveOptions) ? this.routerLinkActiveOptions : this.routerLinkActiveOptions.exact || !1;
                            return o => !!o.urlTree && n.isActive(o.urlTree, r)
                        }
                        hasActiveLinks() {
                            const n = this.isLinkActive(this.router);
                            return this.link && n(this.link) || this.links.some(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(wt), w(Ct), w(yn), w(Ys), w(Ze, 8))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "routerLinkActive", ""]
                        ],
                        contentQueries: function(n, r, o) {
                            if (1 & n && function jv(e, t, n, r) {
                                    const o = X();
                                    if (o.firstCreatePass) {
                                        const i = je();
                                        Uv(o, new Fv(t, n, r), i.index),
                                            function pP(e, t) {
                                                const n = e.contentQueries || (e.contentQueries = []);
                                                t !== (n.length ? n[n.length - 1] : -1) && n.push(e.queries.length - 1, t)
                                            }(o, e), 2 == (2 & n) && (o.staticContentQueries = !0)
                                    }
                                    Bv(o, M(), n)
                                }(o, Ze, 5), 2 & n) {
                                let i;
                                yu(i = Cu()) && (r.links = i)
                            }
                        },
                        inputs: {
                            routerLinkActiveOptions: "routerLinkActiveOptions",
                            ariaCurrentWhenActive: "ariaCurrentWhenActive",
                            routerLinkActive: "routerLinkActive"
                        },
                        outputs: {
                            isActiveChange: "isActiveChange"
                        },
                        exportAs: ["routerLinkActive"],
                        standalone: !0,
                        features: [gt]
                    }), e
                })();
            class j_ {}
            let dR = (() => {
                class e {
                    constructor(n, r, o, i, s) {
                        this.router = n, this.injector = o, this.preloadingStrategy = i, this.loader = s
                    }
                    setUpPreloading() {
                        this.subscription = this.router.events.pipe(Sn(n => n instanceof dr), Ln(() => this.preload())).subscribe(() => {})
                    }
                    preload() {
                        return this.processRoutes(this.injector, this.router.config)
                    }
                    ngOnDestroy() {
                        this.subscription && this.subscription.unsubscribe()
                    }
                    processRoutes(n, r) {
                        const o = [];
                        for (const i of r) {
                            i.providers && !i._injector && (i._injector = Us(i.providers, n, `Route: ${i.path}`));
                            const s = i._injector ? ? n,
                                a = i._loadedInjector ? ? s;
                            i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent ? o.push(this.preloadConfig(s, i)) : (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ? ? i._loadedRoutes))
                        }
                        return Me(o).pipe(gr())
                    }
                    preloadConfig(n, r) {
                        return this.preloadingStrategy.preload(r, () => {
                            let o;
                            o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : T(null);
                            const i = o.pipe(Le(s => null === s ? T(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ? ? n, s.routes))));
                            return r.loadComponent && !r._loadedComponent ? Me([i, this.loader.loadComponent(r)]).pipe(gr()) : i
                        })
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(wt), x(uy), x(Xt), x(j_), x(Vd))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const jd = new O("");
            let B_ = (() => {
                class e {
                    constructor(n, r, o, i, s = {}) {
                        this.urlSerializer = n, this.transitions = r, this.viewportScroller = o, this.zone = i, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled", s.anchorScrolling = s.anchorScrolling || "disabled"
                    }
                    init() {
                        "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                    }
                    createScrollEvents() {
                        return this.transitions.events.subscribe(n => {
                            n instanceof Dd ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = n.navigationTrigger, this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof dr && (this.lastId = n.id, this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment))
                        })
                    }
                    consumeScrollEvents() {
                        return this.transitions.events.subscribe(n => {
                            n instanceof a_ && (n.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(n.position) : n.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(n.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                        })
                    }
                    scheduleScrollEvent(n, r) {
                        this.zone.runOutsideAngular(() => {
                            setTimeout(() => {
                                this.zone.run(() => {
                                    this.transitions.events.next(new a_(n, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r))
                                })
                            }, 0)
                        })
                    }
                    ngOnDestroy() {
                        this.routerEventsSubscription ? .unsubscribe(), this.scrollEventsSubscription ? .unsubscribe()
                    }
                }
                return e.\u0275fac = function(n) {
                    ! function _g() {
                        throw new Error("invalid")
                    }()
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();

            function fr(e, t) {
                return {\
                    u0275kind: e,
                    \u0275providers: t
                }
            }

            function H_() {
                const e = K(jt);
                return t => {
                    const n = e.get(Ks);
                    if (t !== n.components[0]) return;
                    const r = e.get(wt),
                        o = e.get($_);
                    1 === e.get(Ud) && r.initialNavigation(), e.get(z_, null, F.Optional) ? .setUpPreloading(), e.get(jd, null, F.Optional) ? .init(), r.resetRootComponentType(n.componentTypes[0]), o.closed || (o.next(), o.unsubscribe())
                }
            }
            const $_ = new O("", {
                    factory: () => new Wt
                }),
                Ud = new O("", {
                    providedIn: "root",
                    factory: () => 1
                });
            const z_ = new O("");

            function mR(e) {
                return fr(0, [{
                    provide: z_,
                    useExisting: dR
                }, {
                    provide: j_,
                    useExisting: e
                }])
            }
            const G_ = new O("ROUTER_FORROOT_GUARD"),
                vR = [Uu, {
                    provide: yi,
                    useClass: vd
                }, wt, Mi, {
                    provide: ao,
                    useFactory: function U_(e) {
                        return e.routerState.root
                    },
                    deps: [wt]
                }, Vd, []];

            function yR() {
                return new vy("Router", wt)
            }
            let W_ = (() => {
                class e {
                    constructor(n) {}
                    static forRoot(n, r) {
                        return {
                            ngModule: e,
                            providers: [vR, [], {
                                    provide: uo,
                                    multi: !0,
                                    useValue: n
                                }, {
                                    provide: G_,
                                    useFactory: bR,
                                    deps: [
                                        [wt, new ko, new Ro]
                                    ]
                                }, {
                                    provide: ka,
                                    useValue: r || {}
                                }, r ? .useHash ? {
                                    provide: ar,
                                    useClass: bO
                                } : {
                                    provide: ar,
                                    useClass: By
                                }, {
                                    provide: jd,
                                    useFactory: () => {
                                        const e = K(Tt),
                                            t = K(Se),
                                            n = K(ka),
                                            r = K(Ta),
                                            o = K(yi);
                                        return n.scrollOffset && e.setOffset(n.scrollOffset), new B_(o, r, e, t, n)
                                    }
                                }, r ? .preloadingStrategy ? mR(r.preloadingStrategy).\u0275providers : [], {
                                    provide: vy,
                                    multi: !0,
                                    useFactory: yR
                                }, r ? .initialNavigation ? DR(r) : [],
                                [{
                                    provide: q_,
                                    useFactory: H_
                                }, {
                                    provide: cy,
                                    multi: !0,
                                    useExisting: q_
                                }]
                            ]
                        }
                    }
                    static forChild(n) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: uo,
                                multi: !0,
                                useValue: n
                            }]
                        }
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(G_, 8))
                }, e.\u0275mod = ft({
                    type: e
                }), e.\u0275inj = it({
                    imports: [Ad]
                }), e
            })();

            function bR(e) {
                return "guarded"
            }

            function DR(e) {
                return ["disabled" === e.initialNavigation ? fr(3, [{
                    provide: Gs,
                    multi: !0,
                    useFactory: () => {
                        const t = K(wt);
                        return () => {
                            t.setUpLocationChangeListener()
                        }
                    }
                }, {
                    provide: Ud,
                    useValue: 2
                }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? fr(2, [{
                    provide: Ud,
                    useValue: 0
                }, {
                    provide: Gs,
                    multi: !0,
                    deps: [jt],
                    useFactory: t => {
                        const n = t.get(_O, Promise.resolve());
                        return () => n.then(() => new Promise(o => {
                            const i = t.get(wt),
                                s = t.get($_);
                            (function r(o) {
                                t.get(wt).events.pipe(Sn(s => s instanceof dr || s instanceof ba || s instanceof s_), W(s => s instanceof dr || s instanceof ba && (0 === s.code || 1 === s.code) && null), Sn(s => null !== s), gi(1)).subscribe(() => {
                                    o()
                                })
                            })(() => {
                                o(!0)
                            }), t.get(Ta).afterPreactivation = () => (o(!0), s.closed ? T(void 0) : s), i.initialNavigation()
                        }))
                    }
                }]).\u0275providers : []]
            }
            const q_ = new O("");
            let K_ = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n
                        }
                        ngOnInit() {}
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-landing-page"]
                        ],
                        decls: 324,
                        vars: 0,
                        consts: [
                            [1, "section-1"],
                            [1, "row", "front-row"],
                            ["id", "right-side", 1, "col", ".col-sm-*", ".col-md-*", ".col-lg-*", "front-col"],
                            ["id", "welcome-text", 1, "headline"],
                            [1, "headline"],
                            ["id", "welcome-text", 1, "headline", 2, "color", "grey"],
                            [1, "learn-more", "btn", "btn-primary"],
                            [3, "click"],
                            ["id", "left-side", 1, "col", ".col-sm-*", ".col-md-*", ".col-lg-*", "front-col"],
                            ["src", "https://img.freepik.com/premium-vector/team-is-processing-cloud-server-data_18660-3279.jpg", "alt", "dcf", "width", "600em", "height", "500em", 1, "front-page-image"],
                            ["id", "direct-element", 1, "section-2"],
                            [1, "col", ".col-sm-*", ".col-md-*", ".col-lg-*", "second-headline"],
                            [1, "text-center", "fs-1"],
                            [1, "underline"],
                            [1, "row", "img-cards"],
                            [1, "col", ".col-sm-4", ".col-md-4", ".col-lg-4"],
                            [1, "card", "whyUsCard"],
                            ["src", "assets/quality.webp", "alt", "...", 1, "card-img-top"],
                            [1, "card-body"],
                            [1, "card-title", "text-center"],
                            [1, "card-text", "text-center"],
                            ["src", "assets/services.webp", "alt", "...", 1, "card-img-top"],
                            [1, "col", "col-sm-4", ".col-md-4", ".col-lg-4"],
                            ["src", "assets/delivery.jpg", "alt", "...", 1, "card-img-top"],
                            [1, "section-3"],
                            [1, "col", ".col-sm-*", ".col-md-*", ".col-lg-*"],
                            [1, "row", "img-cards-profile"],
                            [1, "col-sm-4", ".col-md-4", ".col-lg-4"],
                            [1, "card", "profile-card"],
                            [1, "fa-solid", "fa-industry", "fa-7x"],
                            [1, "fa-solid", "fa-people-group", "fa-7x"],
                            [1, "fa-brands", "fa-servicestack", "fa-7x"],
                            [1, "numbers"],
                            [1, "fa-solid", "fa-add"],
                            [1, "section-4"],
                            [1, "col"],
                            [1, "text-center", "headline-4"],
                            [1, "col", "text-center"],
                            ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            [1, "section-8"],
                            [1, "container", "service-container"],
                            [1, "row", "row-cols-2"],
                            [1, "col", "col-sm-*", "col-md-*", "col-lg-*", "service-col"],
                            [1, "card", "service-card"],
                            ["src", "https://img.freepik.com/premium-vector/security-control-computer-platform-maintain-cloud-server_18660-3058.jpg", "alt", "...", 1, "card-img-service"],
                            [1, "card", "service-card-odd", 2, "padding-left", "1em"],
                            [1, "fa-duotone", "fa-1", "fa-3x"],
                            [1, "fs-2", "service-headline"],
                            [1, "list-group", "list-unstyled"],
                            [1, "list-group-item", "borderless"],
                            [1, "fa-sharp", "fa-solid", "fa-circle", "fa-xs"],
                            [1, "row", "row-cols-2", "row-even"],
                            [1, "fa-duotone", "fa-2", "fa-3x"],
                            ["src", "https://img.freepik.com/premium-vector/cloud-server-branch-office-network_18660-1417.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "assets/services.webp", "alt", "...", 1, "card-img-service"],
                            [1, "card", "service-card-odd"],
                            [1, "fa-duotone", "fa-3", "fa-3x"],
                            [1, "fa-duotone", "fa-4", "fa-3x"],
                            ["src", "https://img.freepik.com/premium-vector/endpoint-protection-cloud-server_18660-741.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "assets/software.jpg", "alt", "...", 1, "card-img-service"],
                            [1, "fa-duotone", "fa-5", "fa-3x"],
                            [1, "fa-duotone", "fa-6", "fa-3x"],
                            ["src", "https://cdni.iconscout.com/illustration/premium/thumb/modern-city-3134180-2612464.png", "alt", "...", 1, "card-img-service"],
                            [1, "section-5"],
                            [1, "container", "text-center"],
                            [1, "text-center", "fs-1", "second-headline"],
                            [1, "text-center", "partners-text"],
                            [1, "section-6"],
                            [1, "row", "row-cols-4", "client-row"],
                            [1, "card", "client-card"],
                            ["src", "https://ethiojobs.b-cdn.net/wp-content/uploads/2021/02/Mekdela-Amba-University-Ethiopia.jpg", "alt", "...", 1, "card-img-client"],
                            ["src", "https://pbs.twimg.com/profile_images/1209335090347560962/eTZXP08A_400x400.jpg", "alt", "...", 1, "card-img-client"],
                            ["src", "https://media.licdn.com/dms/image/C4D03AQH6i5OYf4Al7A/profile-displayphoto-shrink_800_800/0/1591400132492?e=2147483647&v=beta&t=_Xur5vUMzlgwm3VPR6MAvm02jGUIQDA31xYTgmc2LUM", "alt", "...", 1, "card-img-client"],
                            ["src", "https://www.ena.et/documents/42142/0/2022_05_5555555555555555555555555_png.png/0eefc748-d352-7edb-98f3-06fb386fc6d8?version=1.0&t=1674399787888&download=true", "alt", "...", 1, "card-img-client"],
                            ["src", "https://convergencesolutons.com/company-images/wachemo.jpeg", "alt", "...", 1, "card-img-client"],
                            ["src", "https://convergencesolutons.com/company-images/trademarklogo.jpg", "alt", "...", 1, "card-img-client"],
                            ["src", "https://convergencesolutons.com/company-images/yekatit12.jpeg", "alt", "...", 1, "card-img-client"],
                            ["src", "https://convergencesolutons.com/company-images/undp.jpg", "alt", "...", 1, "card-img-client"],
                            [1, "section-7"],
                            [1, "row", "row-cols-4"],
                            [1, "card", "partners-card"],
                            ["src", "https://i.pinimg.com/564x/31/fb/85/31fb85c52e2b95b72b46880c284873b5.jpg", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://pbs.twimg.com/profile_images/1009484817048616960/HEWwkLcQ_400x400.jpg", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://www.cisilion.com/wp-content/uploads/2019/02/Partner-logo-size-2.png", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXewUU4KhR7CeRIU-NP2_ITxQOJdFXk-9Ym7lnGJokl393IlTIb21pD6pF6bHITZizJW4&usqp=CAU", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://pcpanda.co.in/imgs/sophos.png", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://thinkadnet.com/wp-content/uploads/2020/07/partner-logo-fortinet.png", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://thinkadnet.com/wp-content/uploads/2020/07/partner-logo-vmware.png", "alt", "...", 1, "card-img-partner"],
                            ["src", "https://seeklogo.com/images/U/undp-logo-5682674D5C-seeklogo.com.png", "alt", "...", 1, "card-img-partner"]
                        ],
                        template: function(n, r) {
                            1 & n && (d(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "p", 3), p(4, " WELCOME TO"), f(), d(5, "h1", 4), p(6, " CONVERGENCE IT SOLUTIONS "), f(), v(7, "br"), d(8, "p", 5), p(9, " Empowering those who lead the digital transformation to bring their business to the next level and turn it into a competitive advantage and technology "), f(), d(10, "button", 6)(11, "a", 7), Q("click", function() {
                                return r.onClick("direct-element")
                            }), p(12, " Learn more "), f()()(), d(13, "div", 8), v(14, "img", 9), f()()(), d(15, "section", 10)(16, "div", 11)(17, "p", 12), p(18, "Why Choose Us"), f(), v(19, "hr", 13), d(20, "div", 14)(21, "div", 15)(22, "div", 16), v(23, "img", 17), d(24, "div", 18)(25, "h5", 19), p(26, " Quality "), f(), d(27, "p", 20), p(28, " We deliver our services with the best quality. We have a team of experts who give reliable solutions for your business. "), f()()()(), d(29, "div", 15)(30, "div", 16), v(31, "img", 21), d(32, "div", 18)(33, "h5", 19), p(34, " Support "), f(), d(35, "p", 20), p(36, " We provide a quick technical support and consultancy on the services we deliver. We are just one call away. "), f()()()(), d(37, "div", 22)(38, "div", 16), v(39, "img", 23), d(40, "div", 18)(41, "h5", 19), p(42, " Delivery "), f(), d(43, "p", 20), p(44, " We deliver our projects on-time handled by our well trained project managers. "), f()()()()()()(), d(45, "section", 24)(46, "div", 11)(47, "p", 12), p(48, "Company highlights"), f(), v(49, "hr", 13), d(50, "div", 25)(51, "div", 26)(52, "div", 27)(53, "div", 28), v(54, "i", 29), d(55, "div", 18)(56, "p", 20), p(57, " Founded in 2018 aiming to provide distinctive, specialized, and high-quality turnkey solutions "), f()()()(), d(58, "div", 27)(59, "div", 28), v(60, "i", 30), d(61, "div", 18)(62, "p", 20), p(63, " Employees with hands-on experience and certifications "), f()()()(), d(64, "div", 27)(65, "div", 28), v(66, "i", 31), d(67, "div", 18)(68, "p", 20), p(69, " Provides Multi-vendor IT solutions and end to end services "), f()()()()(), d(70, "div", 26)(71, "div", 27)(72, "div", 28)(73, "p", 32), p(74, " 15"), v(75, "i", 33), f(), d(76, "div", 18)(77, "p", 20), p(78, " Working in partnership with the best vendors in the industry "), f()()()(), d(79, "div", 27)(80, "div", 28)(81, "p", 32), p(82, " 10"), v(83, "i", 33), f(), d(84, "div", 18)(85, "p", 20), p(86, " Enterprises and organizations working with us serving their needs "), f()()()(), d(87, "div", 27)(88, "div", 28)(89, "p", 32), p(90, " 10"), v(91, "i", 33), f(), d(92, "div", 18)(93, "p", 20), p(94, " Completed projects fulfilling the necessary quality standards "), f()()()()()()()(), d(95, "section", 34)(96, "div", 35)(97, "h1", 36), p(98, " Would you like to start a project with us? "), f(), d(99, "div", 37)(100, "button", 38)(101, "a", 39), p(102, " Contact Us "), f()()()()(), d(103, "section", 40)(104, "div", 41)(105, "p", 12), p(106, " Our Services "), f(), v(107, "hr", 13)(108, "br"), d(109, "div", 42)(110, "div", 43)(111, "div", 44), v(112, "img", 45), f()(), d(113, "div", 43)(114, "div", 46), v(115, "i", 47), d(116, "p", 48), p(117, " Data Center Facility "), f(), d(118, "div", 18)(119, "ul", 49)(120, "li", 50), v(121, "i", 51), p(122, " Computing, Storage and OS, Backup and Recovery "), f(), d(123, "li", 50), v(124, "i", 51), p(125, " Serve and Desktop virtualization, Converged Infrastructure "), f(), d(126, "li", 50), v(127, "i", 51), p(128, " Application Delivery and Load Balancing, Hyper-Convergence "), f(), d(129, "li", 50), v(130, "i", 51), p(131, " Cloud Automation and Orchestration, On-perm & public cloud "), f()()()()()(), d(132, "div", 52)(133, "div", 43)(134, "div", 44), v(135, "i", 53), d(136, "p", 48), p(137, " Cloud managed services "), f(), d(138, "div", 18)(139, "ul", 49)(140, "li", 50), v(141, "i", 51), p(142, " Consultancy "), f(), d(143, "li", 50), v(144, "i", 51), p(145, " Quality assurance "), f(), d(146, "li", 50), v(147, "i", 51), p(148, " Managed Software ERP "), f(), d(149, "li", 50), v(150, "i", 51), p(151, " Managed Security "), f(), d(152, "li", 50), v(153, "i", 51), p(154, " Technical Support Services "), f(), d(155, "li", 50), v(156, "i", 51), p(157, " VISP Services "), f()()()()(), d(158, "div", 43)(159, "div", 44), v(160, "img", 54), f()()(), d(161, "div", 42)(162, "div", 43)(163, "div", 44), v(164, "img", 55), f()(), d(165, "div", 43)(166, "div", 56), v(167, "i", 57), d(168, "p", 48), p(169, " Enterprise IT Infrastructure "), f(), d(170, "div", 18)(171, "ul", 49)(172, "li", 50), v(173, "i", 51), p(174, " Wireless LAN "), f(), d(175, "li", 50), v(176, "i", 51), p(177, " WAN Optimization "), f(), d(178, "li", 50), v(179, "i", 51), p(180, " Collaboration "), f(), d(181, "li", 50), v(182, "i", 51), p(183, " Infrastructure "), f()()()()()(), d(184, "div", 52)(185, "div", 43)(186, "div", 44), v(187, "i", 58), d(188, "p", 48), p(189, " Network & Computer Security "), f(), d(190, "div", 18)(191, "ul", 49)(192, "li", 50), v(193, "i", 51), p(194, " Infrastructure Security "), f(), d(195, "li", 50), v(196, "i", 51), p(197, " Endpoint Security "), f(), d(198, "li", 50), v(199, "i", 51), p(200, " Datacenter Security "), f(), d(201, "li", 50), v(202, "i", 51), p(203, " Security Operations "), f()()()()(), d(204, "div", 43)(205, "div", 44), v(206, "img", 59), f()()(), d(207, "div", 42)(208, "div", 43)(209, "div", 44), v(210, "img", 60), f()(), d(211, "div", 43)(212, "div", 56), v(213, "i", 61), d(214, "p", 48), p(215, " Software & System solutions "), f(), d(216, "div", 18)(217, "ul", 49)(218, "li", 50), v(219, "i", 51), p(220, " Internet of Things (IoT) applications "), f(), d(221, "li", 50), v(222, "i", 51), p(223, " Full ERP Solution "), f(), d(224, "li", 50), v(225, "i", 51), p(226, " Big Data and Analytics solutions "), f(), d(227, "li", 50), v(228, "i", 51), p(229, " Anti Money Laundry "), f(), d(230, "li", 50), v(231, "i", 51), p(232, " Smart Office Solution "), f()()()()()(), d(233, "div", 52)(234, "div", 43)(235, "div", 44), v(236, "i", 62), d(237, "p", 48), p(238, " Smart Facility "), f(), d(239, "div", 18)(240, "ul", 49)(241, "li", 50), v(242, "i", 51), p(243, " Datacenter Power System "), f(), d(244, "li", 50), v(245, "i", 51), p(246, " Smart Buildings "), f(), d(247, "li", 50), v(248, "i", 51), p(249, " Smart Classroom & Meeting Rooms "), f(), d(250, "li", 50), v(251, "i", 51), p(252, " Operation Centers (NOC/SOC) "), f()()()()(), d(253, "div", 43)(254, "div", 44), v(255, "img", 63), f()()()()(), d(256, "section", 64)(257, "div", 65)(258, "p", 66), p(259, " Clients "), f(), d(260, "p", 67), p(261, " We work closely with a wide range of clients from different sectors and regions across the public sector and the private sector. "), f()()(), d(262, "section", 68)(263, "div", 65)(264, "div", 69)(265, "div", 35)(266, "div", 70), v(267, "img", 71), f()(), d(268, "div", 35)(269, "div", 70), v(270, "img", 72), f()(), d(271, "div", 35)(272, "div", 70), v(273, "img", 73), f()(), d(274, "div", 35)(275, "div", 70), v(276, "img", 74), f()()(), d(277, "div", 69)(278, "div", 35)(279, "div", 70), v(280, "img", 75), f()(), d(281, "div", 35)(282, "div", 70), v(283, "img", 76), f()(), d(284, "div", 35)(285, "div", 70), v(286, "img", 77), f()(), d(287, "div", 35)(288, "div", 70), v(289, "img", 78), f()()()()(), d(290, "section", 79)(291, "div", 65)(292, "p", 66), p(293, " Partners "), f(), d(294, "p", 67), p(295, " We work in partnership with the best vendors in the industry. "), f()()(), d(296, "section", 40)(297, "div", 65)(298, "div", 80)(299, "div", 35)(300, "div", 81), v(301, "img", 82), f()(), d(302, "div", 35)(303, "div", 81), v(304, "img", 83), f()(), d(305, "div", 35)(306, "div", 81), v(307, "img", 84), f()(), d(308, "div", 35)(309, "div", 81), v(310, "img", 85), f()()(), d(311, "div", 80)(312, "div", 35)(313, "div", 81), v(314, "img", 86), f()(), d(315, "div", 35)(316, "div", 81), v(317, "img", 87), f()(), d(318, "div", 35)(319, "div", 81), v(320, "img", 88), f()(), d(321, "div", 35)(322, "div", 81), v(323, "img", 89), f()()()()())
                        },
                        dependencies: [Ze, ut],
                        styles: ['.section-1[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100%}.section-2[_ngcontent-%COMP%]{background-color:#f2f5fc;width:100%;height:100%;border-top-left-radius:15em;border-top-right-radius:15em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:16px;margin-top:8em}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em;margin-bottom:5em}.front-page-image[_ngcontent-%COMP%]{margin-left:5em}#right-side[_ngcontent-%COMP%]{margin-top:1em}#left-side[_ngcontent-%COMP%]{margin-top:2em}.headline[_ngcontent-%COMP%]{font-size:3.5em;font-weight:bolder}#bottom-text[_ngcontent-%COMP%]{font-size:3em}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-family:"sans serif"}.text-center[_ngcontent-%COMP%]{font-family:"Sans serif"}.underline[_ngcontent-%COMP%]{width:7%;border-top:3px solid #0b91b8;margin:0 auto;font-weight:700}.second-headline[_ngcontent-%COMP%]{padding-top:2em}.card[_ngcontent-%COMP%]{width:23em;height:22em}.img-cards[_ngcontent-%COMP%]{padding:5em}.whyUsCard[_ngcontent-%COMP%], .profile-card[_ngcontent-%COMP%]{border:none;box-shadow:0 10px 20px #0000001f,0 4px 8px #0000000f}.whyUsCard[_ngcontent-%COMP%]:hover, .profile-card[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.img-cards-profile[_ngcontent-%COMP%]{padding-top:3em;padding-left:10em;padding-right:10em}.card-title[_ngcontent-%COMP%]{font-weight:700}.card-img-top[_ngcontent-%COMP%]{padding:15px;width:250px;height:200px;margin:0 auto}.section-3[_ngcontent-%COMP%]{padding-top:3em;width:100%;height:140vh}.profile-card[_ngcontent-%COMP%]{width:20em;height:17em;border:none}.img-profile-card[_ngcontent-%COMP%]{padding:20px;width:150px;height:150px;margin:0 auto}.fa-industry[_ngcontent-%COMP%], .fa-people-group[_ngcontent-%COMP%], .fa-servicestack[_ngcontent-%COMP%]{color:#0b91b8;margin:0 auto;padding:.1em}.numbers[_ngcontent-%COMP%]{margin:0 auto;color:#0b91b8;font-weight:700;font-size:100px}.fa-add[_ngcontent-%COMP%]{font-size:50px}.section-4[_ngcontent-%COMP%]{padding-top:5em;width:100%;height:50vh;background-color:#0b91b8}.section-6[_ngcontent-%COMP%]{padding-top:3em;width:100%;height:110vh;background-color:#fff}.section-5[_ngcontent-%COMP%]{width:100%;height:40vh;background-color:#f6f9fa}.section-7[_ngcontent-%COMP%]{margin-top:1em;width:100%;height:40vh;background-color:#f6f9fa}.section-8[_ngcontent-%COMP%]{width:100%;padding-top:3em;margin-bottom:3em}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:2px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:2px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:35px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover{color:#fff;background:#0b91b8;border:none}.client-card[_ngcontent-%COMP%], .partners-card[_ngcontent-%COMP%]{width:17em;height:18em;border:none;margin:.5em;background-color:transparent}.clients-text[_ngcontent-%COMP%], .partners-text[_ngcontent-%COMP%]{padding-bottom:3em;font-family:"Poppins" serif}.card-img-service[_ngcontent-%COMP%]{width:27em;height:22em}.service-card[_ngcontent-%COMP%]{width:30em;height:30em;margin:0 auto;padding:1em;border:none}.service-card-odd[_ngcontent-%COMP%]{width:30em;height:30em;margin:0 auto;padding:1em 1em 1em 5em;border:none}.row-cols-2[_ngcontent-%COMP%], .service-row[_ngcontent-%COMP%]{padding:1em;margin:0 auto;width:100%;display:flex;flex-direction:row}.service-container[_ngcontent-%COMP%]{width:100%}li.borderless[_ngcontent-%COMP%]{border:0 none;font-size:17px}.fa-circle[_ngcontent-%COMP%]{opacity:.7;padding:.3em}.fa-1[_ngcontent-%COMP%], .fa-2[_ngcontent-%COMP%], .fa-3[_ngcontent-%COMP%], .fa-4[_ngcontent-%COMP%], .fa-5[_ngcontent-%COMP%], .fa-6[_ngcontent-%COMP%]{padding-left:.7em}.service-headline[_ngcontent-%COMP%]{padding-top:1em;padding-left:1em}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.section-1[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em;margin-bottom:3em}.section-2[_ngcontent-%COMP%]{width:100%;height:100%;padding-top:3em;margin:0 auto;border-top-left-radius:5em;border-top-right-radius:5em}.section-3[_ngcontent-%COMP%]{padding-top:3em;width:100%;height:100%}.section-4[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.section-5[_ngcontent-%COMP%]{padding-top:3em;width:100%;height:100%}.section-6[_ngcontent-%COMP%]{padding:1em;width:100%;height:100%}.section-7[_ngcontent-%COMP%]{padding:.1em 1em 1em;width:100%;height:100%}.whyUsCard[_ngcontent-%COMP%], .profile-card[_ngcontent-%COMP%], .partners-card[_ngcontent-%COMP%]{width:100%;height:100%;margin-top:.5em;margin-bottom:1em}.service-card[_ngcontent-%COMP%], .service-card-odd[_ngcontent-%COMP%]{padding:.5em;margin-top:.5em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.img-cards[_ngcontent-%COMP%], .img-cards-profile[_ngcontent-%COMP%]{width:100%;height:100%;padding:2em 1em;margin:0 auto;display:flex;flex-direction:column}.row-cols-2[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .service-col[_ngcontent-%COMP%]{width:100%;height:100%}.list-group-item[_ngcontent-%COMP%]{font-size:5px}.client-card[_ngcontent-%COMP%], .partners-card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1px;margin-top:.5em}.card-img-client[_ngcontent-%COMP%], .card-img-partner[_ngcontent-%COMP%]{width:100%;height:80%}.fa-1[_ngcontent-%COMP%], .fa-2[_ngcontent-%COMP%], .fa-3[_ngcontent-%COMP%], .fa-4[_ngcontent-%COMP%], .fa-5[_ngcontent-%COMP%], .fa-6[_ngcontent-%COMP%]{display:none}}']
                    }), e
                })(),
                ER = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n
                        }
                        ngOnInit() {}
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-enterprise"]
                        ],
                        decls: 62,
                        vars: 0,
                        consts: [
                            [1, "container-fluid"],
                            [1, "row", "front-row"],
                            ["id", "right-side", 1, "col", "front-col"],
                            [1, "headline"],
                            ["id", "welcome-text"],
                            [1, "learn-more", "btn", "btn-primary"],
                            [3, "click"],
                            [1, "col", "front-col"],
                            ["src", "https://res.cloudinary.com/instahippo/image/upload/v1626429120/illustrations/enterprise_networking_hjooa5.svg", "alt", "dcf", "width", "700em", "height", "500em", 1, "front-page-image"],
                            [1, "contact-section"],
                            [1, "col"],
                            [1, "text-center", "headline-4"],
                            [1, "col", "text-center"],
                            ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["id", "direct-element", 1, "grid"],
                            [1, "row", "enterprise-solutions-row"],
                            [1, "col", "col-sm-*", "col-md-*", "col-lg-*", "enterprise-col"],
                            [1, "card", "solutions-card-img"],
                            ["src", "https://img.freepik.com/free-vector/business-people-using-laptop-smartphone-with-wifi-connection-wi-fi-connection-wifi-communication-technology-free-internet-services-concept-bright-vibrant-violet-isolated-illustration_335657-973.jpg?", "alt", "...", 1, "card-img-service"],
                            [1, "card", "solutions-card-text"],
                            [1, "fs-2"],
                            ["id", "solution-text"],
                            [1, "row", "enterprise-solutions-row", "row-even"],
                            ["src", "https://img.freepik.com/premium-vector/team-is-processing-cloud-server-data_18660-3279.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/free-vector/creative-team-concept-illustration_114360-6488.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/premium-vector/computer-network-server-data_18660-1567.jpg?", "alt", "...", 1, "card-img-service"]
                        ],
                        template: function(n, r) {
                            1 & n && (d(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3), p(4, " Enterprise IT infrastructure "), f(), v(5, "br"), d(6, "p", 4), p(7, " We can provide the finest solutions and services to our devoted customers since our Enterprise Network Solutions are integrated with the leading technology partners in the market. Our customers who depend on us to give them dependable networking solutions for their infrastructure will benefit greatly from the experience and certification of the professionals we employ in the design and implementation of network infrastructure solutions. "), f(), d(8, "button", 5)(9, "a", 6), Q("click", function() {
                                return r.onClick("direct-element")
                            }), p(10, " Learn more "), f()()(), d(11, "div", 7), v(12, "img", 8), f()()(), d(13, "section", 9)(14, "div", 10)(15, "h1", 11), p(16, " Would you like to start a project with us? "), f(), d(17, "div", 12)(18, "button", 13)(19, "a", 14), p(20, " Contact Us "), f()()()()(), d(21, "div", 15)(22, "div", 16)(23, "div", 17)(24, "div", 18), v(25, "img", 19), f()(), d(26, "div", 17)(27, "div", 20)(28, "p", 21), p(29, " Wireless LAN "), f(), d(30, "p", 22), p(31, " 802.11ac Wave 2 features multiuser multiple input, multiple output (MU-MIMO), which offers additional streams and larger channel capacity for better user access, more adaptable bandwidth pairing, and increased throughput. Using the most recent technology, we build wireless networks both indoor and outdoor. We also offer 802.11ac wave 2 solutions that are cloud-managed, have cutting-edge management capabilities, and offer high capacity and quick installation. "), f()()()(), d(32, "div", 23)(33, "div", 10)(34, "div", 20)(35, "p", 21), p(36, " WAN Optimization "), f(), d(37, "p", 22), p(38, " The procedures of maximizing, speeding up, or virtualizing an enterprise wide area network are known as WAN optimization solutions. Networks require ongoing optimization. Businesses must make sure they are giving their customers the highest possible quality of experience as traffic grows, networks change, and grow. Managed WAN Optimization Services establish a fast lane for your vital data and apps, from transaction-processing systems to corporate resource planning software. We design optimization plans specifically for your company based on our experience managing networks, hosting, and security equipment. "), f()()(), d(39, "div", 10)(40, "div", 18), v(41, "img", 24), f()()(), d(42, "div", 16)(43, "div", 10)(44, "div", 18), v(45, "img", 25), f()(), d(46, "div", 10)(47, "div", 20)(48, "p", 21), p(49, " Collaboration "), f(), d(50, "p", 22), p(51, " Modern workplace enables organizations to operate smarter, faster, and more nimbly than ever before in a world that is both more competitive and changing quickly. Stay up to date with technology so you can concentrate on expanding your company. No matter how big or small your organization is, our solutions are made to fit your needs. Voicemail, extended mobility, video conferencing to replace in-person meetings and boost participant engagement, instant messaging, and contact centers to offer ongoing customer assistance are just a few of our Collaboration Solutions. "), f()()()(), d(52, "div", 23)(53, "div", 10)(54, "div", 20)(55, "p", 21), p(56, " Infrastructure "), f(), d(57, "p", 22), p(58, " A well planned IT infrastructure solution can significantly reduce the costs and boost revenues. With the growth of an organization, IT infrastructure grows even more rapidly from few servers initially to large data centers housing the modern technology. We offer specialized IT infrastructure solutions, including facility management, equipment supply, installation, and commissioning. Our solid business relationships with top industry firms like Microsoft, HP, DELL, and many others enable us to provide a one-stop solution for all of your infrastructure requirements. "), f()()(), d(59, "div", 10)(60, "div", 18), v(61, "img", 26), f()()()())
                        },
                        dependencies: [Ze, ut],
                        styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#solution-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}.solutions-card-img[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:2em;border:none}.solutions-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.enterprise-solutions-row[_ngcontent-%COMP%]{padding-top:2em}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.enterprise-solutions-row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .enterprise-col[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.solutions-card-text[_ngcontent-%COMP%]{text-align:center}#solution-text[_ngcontent-%COMP%]{text-align:justify;padding:.5em;font-size:16px}}']
                    }), e
                })(),
                SR = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n
                        }
                        ngOnInit() {}
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-software"]
                        ],
                        decls: 73,
                        vars: 0,
                        consts: [
                            ["id", "go-to-up"],
                            [1, "container-fluid"],
                            [1, "row", "front-row"],
                            ["id", "right-side", 1, "col", "front-col"],
                            [1, "headline"],
                            ["id", "welcome-text"],
                            [1, "learn-more", "btn", "btn-primary"],
                            [3, "click"],
                            [1, "col", "front-col"],
                            ["src", "https://img.freepik.com/free-vector/custom-style-script-website-optimization-coding-software-development-female-programmer-cartoon-character-working-adding-javascript-css-code_335657-2370.jpg", "alt", "dcf", "width", "550em", "height", "500em", 1, "front-page-image"],
                            [1, "contact-section"],
                            [1, "col"],
                            [1, "text-center", "headline-4"],
                            [1, "col", "text-center"],
                            ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["id", "direct-element", 1, "grid"],
                            [1, "row", "software-solutions-row"],
                            [1, "card", "solutions-card-img"],
                            ["src", "https://www.cerdonis.tech/Content/images/allpage/iotapps.png", "alt", "...", 1, "card-img-service"],
                            [1, "card", "solutions-card-text"],
                            [1, "fs-2"],
                            ["id", "solution-text"],
                            [1, "row", "software-solutions-row", "row-even"],
                            ["src", "https://www.sibitalent.com/assets/img/itstaffing/erp.png", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/premium-vector/big-data-analytics-abstract-concept-vector-illustration_107173-25643.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://namescan.io/assets/images/know-your-business-slider.svg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/premium-vector/happy-businesswoman-working-computer-with-smiling-face-workplace-work-satisfaction-with-corporate-employee-wellbeing-concept_610956-1633.jpg?", "alt", "...", 1, "card-img-service"]
                        ],
                        template: function(n, r) {
                            1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " Software Solutions "), f(), v(6, "br"), d(7, "p", 5), p(8, " We provide specialized software development services, including dedicated teams and managed services, for small and medium-sized businesses as well as major corporations. "), f(), d(9, "button", 6)(10, "a", 7), Q("click", function() {
                                return r.onClick("direct-element")
                            }), p(11, " Learn more "), f()()(), d(12, "div", 8), v(13, "img", 9), f()()(), d(14, "section", 10)(15, "div", 11)(16, "h1", 12), p(17, " Driving Software applications and solutions across Industries "), f(), d(18, "div", 13)(19, "button", 14)(20, "a", 15), p(21, " Contact Us "), f()()()()(), d(22, "div", 16)(23, "div", 17)(24, "div", 11)(25, "div", 18), v(26, "img", 19), f()(), d(27, "div", 11)(28, "div", 20)(29, "p", 21), p(30, " Internet of Things (IoT) applications "), f(), d(31, "p", 22), p(32, " Through the use of the Internet of Things, items can connect to the Internet and communicate with one another. All of these things, including a clock, heart monitor, door sensor, and even the vehicle you're driving, can be connected to one another and exchange signals. These things have an allocated IP address and are capable of acting independently of human orders. We create cutting-edge Internet of Things (IoT) solutions that have been shown to be beneficial in a number of industries, including manufacturing, transportation, supply chains, logistics, retail, healthcare, etc. "), f()()()(), d(33, "div", 23)(34, "div", 11)(35, "div", 20)(36, "p", 21), p(37, " Full ERP Solution "), f(), d(38, "p", 22), p(39, " ERP is a class of software solution that assists firms in managing and automating critical business activities for optimum performance. By coordinating the data flow between a company's business activities, ERP software creates a single source of truth and streamlines operations throughout the whole organization. The financials, supply chain, operations, business, reporting, manufacturing, and human resources functions of an organization can all be integrated onto one platform. We can assist you in developing an ERP solution that satisfies your business requirements and is consistent with the goals of your company. "), f()()(), d(40, "div", 11)(41, "div", 18), v(42, "img", 24), f()()(), d(43, "div", 17)(44, "div", 11)(45, "div", 18), v(46, "img", 25), f()(), d(47, "div", 11)(48, "div", 20)(49, "p", 21), p(50, " Big Data and Analytics solutions "), f(), d(51, "p", 22), p(52, " Make smarter, quicker decisions by utilizing cutting-edge business intelligence tools and a data science methodology that combines statistical and machine learning methodologies. Our Big Data & Analytics solutions help build intelligent solutions for data-driven businesses, offering data management, business intelligence, data visualization, and advanced analytics. "), f()()()(), d(53, "div", 23)(54, "div", 11)(55, "div", 20)(56, "p", 21), p(57, " Anti-Money Laundering "), f(), d(58, "p", 22), p(59, " We offer regulatory-driven, proactive consumer transactional analysis. Our assistance with Suspicious Activity Reporting (SAR) regulations and the creation of defense plans for criminal and civil investigations involves the identification of pertinent transactions. The management reporting and business as usual transaction monitoring methods are improved and modified using the lessons learnt from the transactional analysis. We address a variety of AML compliance concerns with powerful analytics. "), f()()(), d(60, "div", 11)(61, "div", 18), v(62, "img", 26), f()()(), d(63, "div", 17)(64, "div", 11)(65, "div", 18), v(66, "img", 27), f()(), d(67, "div", 11)(68, "div", 20)(69, "p", 21), p(70, " Smart Office Solution "), f(), d(71, "p", 22), p(72, " A smart office is a place of work where firms use contemporary technology to operate more efficiently. Our service offerings cover the entire spectrum of an organization's IT requirements, including enterprise security, end-user computing, enterprise networking, data centers, and other types of IT infrastructure. We also manage aspects of office buildings for a longer period of time, such as HVAC and light control, as well as civil work (such as gypsum, interior design, and furnishing). "), f()()()()())
                        },
                        dependencies: [Ze, ut],
                        styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#solution-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.solutions-card-img[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:2em;border:none}.solutions-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.software-solutions-row[_ngcontent-%COMP%]{padding-top:2em}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.software-solutions-row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .enterprise-col[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.solutions-card-text[_ngcontent-%COMP%]{text-align:center}#solution-text[_ngcontent-%COMP%]{text-align:justify;padding:.5em;font-size:16px}}']
                    }), e
                })(),
                IR = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n
                        }
                        ngOnInit() {}
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-smart-facility"]
                        ],
                        decls: 62,
                        vars: 0,
                        consts: [
                            [1, "container-fluid"],
                            [1, "row", "front-row"],
                            ["id", "right-side", 1, "col", "front-col"],
                            [1, "headline"],
                            ["id", "welcome-text"],
                            [1, "learn-more", "btn", "btn-primary"],
                            [3, "click"],
                            [1, "col", "front-col"],
                            ["src", "https://img.freepik.com/premium-vector/smart-city-with-cloud-server-smartphone-data-security_18660-275.jpg", "alt", "dcf", "width", "700em", "height", "500em", 1, "front-page-image"],
                            [1, "contact-section"],
                            [1, "col"],
                            [1, "text-center", "headline-4"],
                            [1, "col", "text-center"],
                            ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["direct-element", "", 1, "grid"],
                            [1, "row", "facility-solutions-row"],
                            [1, "card", "solutions-card-img"],
                            ["src", "https://img.freepik.com/free-vector/man-engineer-working-computer-server-rack-switchboard-guy-switching-panel-cabinet-with-plugged-ethernet-optical-cables-telecommunications-engineering-concept-flat-illustration_74855-20639.jpg", "alt", "...", 1, "card-img-service"],
                            [1, "card", "solutions-card-text"],
                            [1, "fs-2"],
                            ["id", "solution-text"],
                            [1, "row", "facility-solutions-row", "row-even"],
                            ["src", "https://img.freepik.com/free-vector/3d-concept-modern-smart-city-with-skyscrapers-public-places-roads-cars-park-isometric-illustration_1284-62036.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/free-vector/isometric-icon-with-man-presenting-project-white-board-business-meeting_1284-63948.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/premium-vector/system-administrator-upkeeping-server-adjusting-network-pc-hardware-sysadmin-repairing-computer-administration-data-center-maintenance-service-repairman-doing-technical-work-with-server-rack_458444-1733.jpg", "alt", "...", 1, "card-img-service"]
                        ],
                        template: function(n, r) {
                            1 & n && (d(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3), p(4, " Smart Facility "), f(), v(5, "br"), d(6, "p", 4), p(7, " Smart facilities management is the integration of processes, systems, and technologies used to improve the management of a facility. It can look quite simple or extremely complex, depending on the focus which involves creating an IoT network, collecting data, and using it to identify data trends. We offer technology solutions that enables facility managers to change the atmosphere in accordance with the needs of staff, clients, tenants, or business requirements. Smart facilities promote change, facilitate data-driven decisions, and enhance outcomes while having a beneficial impact on people and processes. "), f(), d(8, "button", 5)(9, "a", 6), Q("click", function() {
                                return r.onClick("direct-element")
                            }), p(10, " Learn more "), f()()(), d(11, "div", 7), v(12, "img", 8), f()()(), d(13, "section", 9)(14, "div", 10)(15, "h1", 11), p(16, " Turn your building or facilities to become smarter "), f(), d(17, "div", 12)(18, "button", 13)(19, "a", 14), p(20, " Contact Us "), f()()()()(), d(21, "div", 15)(22, "div", 16)(23, "div", 10)(24, "div", 17), v(25, "img", 18), f()(), d(26, "div", 10)(27, "div", 19)(28, "p", 20), p(29, " Data Center Power System "), f(), d(30, "p", 21), p(31, " Data centers need reliable power, which is an essential component. Facilities managers need to make sure that there is a continual supply of clean, uninterrupted electricity on a regular basis in order to ensure that everything operates well in the data center at all times. We offer complete power solutions for data centers with our backup and UPS systems, from design and development through installation and maintenance. "), f()()()(), d(32, "div", 22)(33, "div", 10)(34, "div", 19)(35, "p", 20), p(36, " Smart Buildings "), f(), d(37, "p", 21), p(38, " A smart building is a creative structure that makes use of smart technologies integrated throughout to monitor and enhance building automation control to meet user needs. IoT sensors and building management systems are smart building technologies we provide. Sensors are used to gather data about building usage. Management of the climate control, sun protection, lighting, security, and other systems is accomplished using these data. In order to enhance the user experience, our systems also communicate with one another and gain knowledge from the data gathered. "), f()()(), d(39, "div", 10)(40, "div", 17), v(41, "img", 23), f()()(), d(42, "div", 16)(43, "div", 10)(44, "div", 17), v(45, "img", 24), f()(), d(46, "div", 10)(47, "div", 19)(48, "p", 20), p(49, " Smart Classroom & Meeting Rooms "), f(), d(50, "p", 21), p(51, " A smart classroom is a learning environment that uses technology to improve digital teaching and learning. Digital displays, tabs, whiteboards, assistive listening devices, and other audio/visual elements are integrated into the classroom to make lectures simpler, more interesting, and more interactive. Our smart meeting room solutions also offer wireless presentations, video and telephone conferences, and joint editing of documents. "), f()()()(), d(52, "div", 22)(53, "div", 10)(54, "div", 19)(55, "p", 20), p(56, " Operation Centers (NOC/SOC). "), f(), d(57, "p", 21), p(58, " The Network Operations Center aids in reviewing the overall environment to comprehend network architecture and how everything flows in the network. It also collects server, firewall, and endpoint logs and performs threat-hunting and customer needs-tuning. In order to obtain a comprehensive understanding of your business and to offer managed security services, risk management, and compliance services, we combine NOC (Network Operations Center) and SOC (Security Operations Center) tasks. "), f()()(), d(59, "div", 10)(60, "div", 17), v(61, "img", 25), f()()()())
                        },
                        dependencies: [Ze, ut],
                        styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#solution-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.solutions-card-img[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:2em;border:none}.solutions-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.facility-solutions-row[_ngcontent-%COMP%]{padding-top:2em}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.facility-solutions-row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .enterprise-col[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.solutions-card-text[_ngcontent-%COMP%]{text-align:center}#solution-text[_ngcontent-%COMP%]{text-align:justify;padding:.5em;font-size:16px}}']
                    }), e
                })(),
                PR = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n
                        }
                        ngOnInit() {}
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-security"]
                        ],
                        decls: 65,
                        vars: 0,
                        consts: [
                            ["id", "go-to-up"],
                            [1, "container-fluid"],
                            [1, "row", "front-row"],
                            [1, "col", "front-col"],
                            [1, "headline"],
                            ["id", "welcome-text"],
                            [1, "learn-more", "btn", "btn-primary"],
                            [3, "click"],
                            ["src", "https://img.freepik.com/premium-vector/flat-3d-isometric-shield-laptop-with-computer-programing-language-code-monitor-data-protection-cyber-security-concept_47328-1785.jpg", "alt", "dcf", "width", "600em", "height", "500em", 1, "front-page-image"],
                            [1, "contact-section"],
                            [1, "col"],
                            [1, "text-center", "headline-4"],
                            [1, "col", "text-center"],
                            ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["id", "direct-element", 1, "grid"],
                            [1, "row", "security-solutions-row"],
                            [1, "card", "solutions-card-img"],
                            ["src", "https://smartnet.ua/wp-content/uploads/2019/12/11.svg", "alt", "...", 1, "card-img-service"],
                            [1, "card", "solutions-card-text"],
                            [1, "fs-2"],
                            ["id", "solution-text"],
                            [1, "row", "security-solutions-row", "row-even"],
                            ["src", "https://img.freepik.com/premium-vector/endpoint-protection-cloud-server_18660-741.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/premium-vector/team-analyzes-cloud-server-data_18660-1302.jpg", "alt", "...", 1, "card-img-service"],
                            ["src", "https://img.freepik.com/premium-vector/isometric-flat-illustration-concept-remote-operation-center_18660-2606.jpg", "alt", "...", 1, "card-img-service"]
                        ],
                        template: function(n, r) {
                            1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " Network Security "), f(), v(6, "br"), d(7, "p", 5), p(8, " Threats are growing increasingly sophisticated to get beyond traditional security standards as a result of an expanding scope of the cyber environment. If appropriate security is not implemented, breaches will continue to occur due to a lack of qualified IT professionals, and financial restrictions. We are a company that is perfectly positioned to assist government organizations, non-governmental organizations, and small businesses with the most comprehensive, effective, and adaptable security measures built on the most effective, compliant, and value-driven security technologies available. "), f(), d(9, "button", 6)(10, "a", 7), Q("click", function() {
                                return r.onClick("direct-element")
                            }), p(11, " Learn more "), f()()(), d(12, "div", 3), v(13, "img", 8), f()()(), d(14, "section", 9)(15, "div", 10)(16, "h1", 11), p(17, " Protect your infrastructure and network from sophisticated security threats with proven security skills expertise and modern solutions "), f(), d(18, "div", 12)(19, "button", 13)(20, "a", 14), p(21, " Contact Us "), f()()()()(), d(22, "div", 15)(23, "div", 16)(24, "div", 10)(25, "div", 17), v(26, "img", 18), f()(), d(27, "div", 10)(28, "div", 19)(29, "p", 20), p(30, " Infrastructure Security "), f(), d(31, "p", 21), p(32, " Businesses rely on their technological assets to sustain operations, therefore safeguarding the infrastructure involves safeguarding the company as a whole. Many businesses rely on proprietary data to provide them a competitive edge in the marketplace, and any loss or disruption of access to this data can have severe adverse effects on a business' profitability. We provide monitoring alerting and support of network intrusion, detection and prevention systems across your infrastructure to help prevent unauthorized network access and data theft. "), f()()()(), d(33, "div", 22)(34, "div", 10)(35, "div", 19)(36, "p", 20), p(37, " Endpoint Security "), f(), d(38, "p", 21), p(39, " Endpoint security is the technique of preventing hostile actors and operations from exploiting endpoints or entry points of end-user devices, such as PCs, laptops, and mobile devices. We can assist you with designing, configuring, and deploying endpoint antivirus protection, aligning policies with regulatory compliance to protect sensitive data, installing the latest endpoint encryption technologies, and using security analysts and centralized consoles to monitor, maintain, and update operations to protect your end users and their devices from the latest security threats. "), f()()(), d(40, "div", 10)(41, "div", 17), v(42, "img", 23), f()()(), d(43, "div", 16)(44, "div", 10)(45, "div", 17), v(46, "img", 24), f()(), d(47, "div", 10)(48, "div", 19)(49, "p", 20), p(50, " Data Center Security "), f(), d(51, "p", 21), p(52, " The technology and practical safeguards used to secure and guard the resources and assets of a data center are included in data center security services, protecting it from both internal and external dangers which comprises every component, including the networks, servers, power systems, and the data and processes they support. "), f(), d(53, "p", 21), p(54, " Applying security measures to the data center protects it against threats that could endanger the integrity, availability, or confidentiality of commercial information assets or intellectual property. Through our data center security services, we ensure your business continuity and give confidence that you can focus on growing your businesses without worrying about the safety of your digital assets. "), f()()()(), d(55, "div", 22)(56, "div", 10)(57, "div", 19)(58, "p", 20), p(59, " Security Operations Center"), f(), d(60, "p", 21), p(61, " A centralized role within an organization called a Security Operation Center uses people, procedures, and technology to continuously monitor and enhance the security posture of the business while preventing, detecting, analyzing, and responding to security issues. We take full responsibility of monitoring detecting planning and oversee all aspects of security operations for your infrastructure. We also create a comprehensive security strategy that reflects your business goals and difficulties. "), f()()(), d(62, "div", 10)(63, "div", 17), v(64, "img", 25), f()()()())
                        },
                        dependencies: [Ze, ut],
                        styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:16px;margin-top:3em}.headline[_ngcontent-%COMP%]{font-size:2.5em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#solution-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.solutions-card-img[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:2em;border:none}.solutions-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.security-solutions-row[_ngcontent-%COMP%]{padding-top:2em}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:30px;padding-left:5em;padding-right:5em;padding-bottom:.5em}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px;padding:.5em}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.security-solutions-row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .enterprise-col[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.solutions-card-text[_ngcontent-%COMP%]{text-align:center}#solution-text[_ngcontent-%COMP%]{text-align:justify;padding:.5em;font-size:16px}}']
                    }), e
                })(),
                OR = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n
                        }
                        ngOnInit() {}
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-about"]
                        ],
                        decls: 83,
                        vars: 0,
                        consts: [
                            ["id", "go-to-up"],
                            [1, "container-fluid"],
                            [1, "row", "front-row"],
                            ["id", "right-side", 1, "col", "front-col"],
                            [1, "headline"],
                            ["id", "welcome-text"],
                            [1, "learn-more", "btn", "btn-primary"],
                            [3, "click"],
                            [1, "col", "front-col"],
                            ["src", "https://img.freepik.com/premium-vector/about-us-flat-editable-vector-download_203633-1977.jpg?w=2000", "alt", "dcf", "width", "700em", "height", "500em", 1, "front-page-image"],
                            [1, "contact-section"],
                            [1, "col"],
                            [1, "text-center", "headline-4"],
                            [1, "col", "text-center"],
                            ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["id", "direct-element", 1, "content-section"],
                            [1, "content-body"],
                            [1, "content-headline"],
                            [1, "text-content"],
                            [1, "vision-section"],
                            [1, "row", "row-vision"],
                            [1, "col", "col-sm-*", "col-md-*", "col-lg-*", "col-vision"],
                            [1, "card", "vision-cards"],
                            [1, "card-body"],
                            [1, "line-top"],
                            [1, "card-title"],
                            [1, "card-text"],
                            [1, "list-group", "list-unstyled", "card-text"],
                            [1, "list-group-item", "borderless"],
                            [1, "fa-solid", "fa-caret-right"],
                            [1, "list-group-item-name"],
                            [1, "team-section"],
                            ["src", "https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg", "alt", "dcf", "width", "700em", "height", "500em", 1, "front-page-image"]
                        ],
                        template: function(n, r) {
                            1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " About Us "), f(), v(6, "br"), d(7, "p", 5), p(8, " Convergence IT Solutions is a leading provider of consulting services and IT solutions in order to help our clients use cutting edge technologies to boost their businesses. Our vision is to become a market leader in providing innovative and useful solutions to clients. We are dedicated to finding solutions to problems. We are also really good at it. However the peculiar or challenging the problem is, if it can be resolved, we will. Irrespective of your company size, if you require our help with business operations or processes, storage, or security, we have the right solutions for your need. "), f(), d(9, "button", 6)(10, "a", 7), Q("click", function() {
                                return r.onClick("direct-element")
                            }), p(11, " Learn more "), f()()(), d(12, "div", 8), v(13, "img", 9), f()()(), d(14, "section", 10)(15, "div", 11)(16, "h1", 12), p(17, " Would you like to start a project with us? "), f(), d(18, "div", 13)(19, "button", 14)(20, "a", 15), p(21, " Contact Us "), f()()()()(), d(22, "section", 16)(23, "div", 17)(24, "h1", 18), p(25, " We value human organizational and operational intelligence "), f(), v(26, "br"), d(27, "p", 19), p(28, " Organizational and Operational intelligence is an approach to data analysis that enables decisions and actions in business operations to be based on real-time data as it's generated or collected by companies. Typically, the data analysis process is automated, and the resulting information is integrated into operational systems for immediate use by business managers and workers. The growth of IoT has sparked operational intelligence applications for analyzing sensor data being captured from manufacturing machines, pipelines, elevators and other equipments. We enabled predictive maintenance efforts designed to detect potential equipment failures before they occur, using such applications. "), v(29, "br")(30, "br"), p(31, " Our company offers analysis, architecture, network design, deployment, support as well as procurement services for the implementation of information and communications technologies, providing cost-effective business solutions to public and private clients. Convergence offers Information Technology services and solutions ranging from IT strategic consulting to implementation within organizations. We work in partnership with your team or with the help of our outsourcing staff. Convergence strives to market tailored solutions rather than just generic items, thus we don't only put up IT infrastructures. We lay the groundwork required for growth of your business. We take care of the strategic approach, thinking, and consultation. We pay attention, we comprehend your situation, and we present the technology option that will actually be the most effective. Consulting with Convergence entails Complete project management, Strategic study of your business difficulties leading to specialized solutions, and Expertise deployment inside your organization. "), f()()(), d(32, "section", 20)(33, "div", 21)(34, "div", 22)(35, "div", 23)(36, "div", 24), v(37, "hr", 25), d(38, "h1", 26), p(39, "Our Vision"), f(), d(40, "p", 27), p(41, " Being a reliable IT firm that customers rely on for service excellence working with them to deliver value-driven IT services, and becoming the driving force for Ethiopia's IT sector is our goal. "), f()()()(), d(42, "div", 22)(43, "div", 23)(44, "div", 24), v(45, "hr", 25), d(46, "h1", 26), p(47, "Our Mission"), f(), d(48, "p", 27), p(49, " Convergence IT Solutions is committed to helping you stay updated with the changing technology, and adapt your infrastructure for the future while resolving your most difficult IT problems, providing easy and scalable IT services. "), f()()()(), d(50, "div", 22)(51, "div", 23)(52, "div", 24), v(53, "hr", 25), d(54, "h1", 26), p(55, " What We Do "), f(), d(56, "ul", 28)(57, "li", 29), v(58, "i", 30), d(59, "span", 31), p(60, " Enterprise Network infrastructure "), f()(), d(61, "li", 29), v(62, "i", 30), d(63, "span", 31), p(64, " Software Solutions "), f()(), d(65, "li", 29), v(66, "i", 30), d(67, "span", 31), p(68, " Supply of materials"), f()(), d(69, "li", 29), v(70, "i", 30), d(71, "span", 31), p(72, " Consultancy and technical support "), f()()()()()()()(), d(73, "section", 32)(74, "div", 2)(75, "div", 3)(76, "h1", 4), p(77, " Our Team "), f(), v(78, "br"), d(79, "p", 5), p(80, " Our team is made up of leading certified IT engineers with many years of hands on experience in Implementation and Consultancy, HR, Facility, and Finance Management experts who can rise to every challenge with utmost efficiency, sales professionals that are highly qualified and constantly looking into the actual needs of our Customers relying on the recent technical developments in the industry and focusing on achieving the best possible cost-benefit relationship, and organized project managers who highly focus on customer satisfaction and use the best communication techniques to make sure that our projects are closed with an efficient balance of project constraints. Top-level executives work closely with all other employees in order to maximize operational efficiency and streamline activities by facilitating learning and continuous skill development. Our department heads bring diverse sets of expertise from their respective wide-ranging backgrounds. "), f()(), d(81, "div", 8), v(82, "img", 33), f()()())
                        },
                        dependencies: [Ze, ut],
                        styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh;padding-top:1em}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:16px;margin-top:1em}.headline[_ngcontent-%COMP%]{font-size:2em;font-weight:700}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.content-headline[_ngcontent-%COMP%]{padding-top:1em;font-size:2.2em;font-weight:700;color:#0b91b8}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:2px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:2px solid #0b91b8}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}.content-section[_ngcontent-%COMP%]{padding-bottom:5em;margin:0 auto;width:100%;height:100%}.text-content[_ngcontent-%COMP%]{padding-right:7em;text-align:justify;font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;color:gray}.vision-section[_ngcontent-%COMP%]{padding:3em 3em 3em 8em;margin-bottom:3em;width:100%;height:100%}.content-body[_ngcontent-%COMP%]{padding-left:8em;padding-right:4em}.vision-cards[_ngcontent-%COMP%]{height:20em;border:none}.line-top[_ngcontent-%COMP%]{border:none;height:10px;background-color:#0b91b8;width:12%;opacity:1}.card-body[_ngcontent-%COMP%]{padding:1em}.card-text[_ngcontent-%COMP%]{padding-top:1em;padding-right:.8em;text-align:justify;color:gray}li.borderless[_ngcontent-%COMP%]{border:0 none;padding:2px}.list-group-item[_ngcontent-%COMP%]{justify-content:left}.fa-caret-right[_ngcontent-%COMP%]{color:#0b91b8}.list-group-item-name[_ngcontent-%COMP%]{padding-left:1em;color:gray}.team-section[_ngcontent-%COMP%]{padding-bottom:5em;margin:0 auto;width:100%;height:100%}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:18px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.container-fluid[_ngcontent-%COMP%]{width:100%;height:100%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.vision-section[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em}.team-section[_ngcontent-%COMP%]{width:100%;height:100%}.content-section[_ngcontent-%COMP%], .text-content[_ngcontent-%COMP%], .content-headline[_ngcontent-%COMP%], .content-body[_ngcontent-%COMP%]{width:100%;height:100%;padding:.6em}.content-headline[_ngcontent-%COMP%]{font-size:1.8em;text-align:center}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.row-vision[_ngcontent-%COMP%]{display:flex;flex-direction:column}.col-vision[_ngcontent-%COMP%]{width:100%;height:100%;margin:0 auto}.card-img-service[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.vision-cards[_ngcontent-%COMP%]{width:100%;height:100%}}']
                    }), e
                })(),
                Z_ = (() => {
                    class e {
                        constructor(n, r) {
                            this._renderer = n, this._elementRef = r, this.onChange = o => {}, this.onTouched = () => {}
                        }
                        setProperty(n, r) {
                            this._renderer.setProperty(this._elementRef.nativeElement, n, r)
                        }
                        registerOnTouched(n) {
                            this.onTouched = n
                        }
                        registerOnChange(n) {
                            this.onChange = n
                        }
                        setDisabledState(n) {
                            this.setProperty("disabled", n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(yn), w(Ct))
                    }, e.\u0275dir = V({
                        type: e
                    }), e
                })(),
                hr = (() => {
                    class e extends Z_ {}
                    return e.\u0275fac = function() {
                        let t;
                        return function(r) {
                            return (t || (t = Be(e)))(r || e)
                        }
                    }(), e.\u0275dir = V({
                        type: e,
                        features: [oe]
                    }), e
                })();
            const un = new O("NgValueAccessor"),
                TR = {
                    provide: un,
                    useExisting: le(() => Ra),
                    multi: !0
                },
                RR = new O("CompositionEventMode");
            let Ra = (() => {
                class e extends Z_ {
                    constructor(n, r, o) {
                        super(n, r), this._compositionMode = o, this._composing = !1, null == this._compositionMode && (this._compositionMode = ! function kR() {
                            const e = sn() ? sn().getUserAgent() : "";
                            return /android (\d+)/.test(e.toLowerCase())
                        }())
                    }
                    writeValue(n) {
                        this.setProperty("value", n ? ? "")
                    }
                    _handleInput(n) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(n)
                    }
                    _compositionStart() {
                        this._composing = !0
                    }
                    _compositionEnd(n) {
                        this._composing = !1, this._compositionMode && this.onChange(n)
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(w(yn), w(Ct), w(RR, 8))
                }, e.\u0275dir = V({
                    type: e,
                    selectors: [
                        ["input", "formControlName", "", 3, "type", "checkbox"],
                        ["textarea", "formControlName", ""],
                        ["input", "formControl", "", 3, "type", "checkbox"],
                        ["textarea", "formControl", ""],
                        ["input", "ngModel", "", 3, "type", "checkbox"],
                        ["textarea", "ngModel", ""],
                        ["", "ngDefaultControl", ""]
                    ],
                    hostBindings: function(n, r) {
                        1 & n && Q("input", function(i) {
                            return r._handleInput(i.target.value)
                        })("blur", function() {
                            return r.onTouched()
                        })("compositionstart", function() {
                            return r._compositionStart()
                        })("compositionend", function(i) {
                            return r._compositionEnd(i.target.value)
                        })
                    },
                    features: [he([TR]), oe]
                }), e
            })();

            function Bn(e) {
                return null == e || ("string" == typeof e || Array.isArray(e)) && 0 === e.length
            }

            function Q_(e) {
                return null != e && "number" == typeof e.length
            }
            const Ye = new O("NgValidators"),
                Un = new O("NgAsyncValidators"),
                FR = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            class Ai {
                static min(t) {
                    return function X_(e) {
                        return t => {
                            if (Bn(t.value) || Bn(e)) return null;
                            const n = parseFloat(t.value);
                            return !isNaN(n) && n < e ? {
                                min: {
                                    min: e,
                                    actual: t.value
                                }
                            } : null
                        }
                    }(t)
                }
                static max(t) {
                    return function J_(e) {
                        return t => {
                            if (Bn(t.value) || Bn(e)) return null;
                            const n = parseFloat(t.value);
                            return !isNaN(n) && n > e ? {
                                max: {
                                    max: e,
                                    actual: t.value
                                }
                            } : null
                        }
                    }(t)
                }
                static required(t) {
                    return function ew(e) {
                        return Bn(e.value) ? {
                            required: !0
                        } : null
                    }(t)
                }
                static requiredTrue(t) {
                    return function tw(e) {
                        return !0 === e.value ? null : {
                            required: !0
                        }
                    }(t)
                }
                static email(t) {
                    return function nw(e) {
                        return Bn(e.value) || FR.test(e.value) ? null : {
                            email: !0
                        }
                    }(t)
                }
                static minLength(t) {
                    return function rw(e) {
                        return t => Bn(t.value) || !Q_(t.value) ? null : t.value.length < e ? {
                            minlength: {
                                requiredLength: e,
                                actualLength: t.value.length
                            }
                        } : null
                    }(t)
                }
                static maxLength(t) {
                    return function ow(e) {
                        return t => Q_(t.value) && t.value.length > e ? {
                            maxlength: {
                                requiredLength: e,
                                actualLength: t.value.length
                            }
                        } : null
                    }(t)
                }
                static pattern(t) {
                    return function iw(e) {
                        if (!e) return Na;
                        let t, n;
                        return "string" == typeof e ? (n = "", "^" !== e.charAt(0) && (n += "^"), n += e, "$" !== e.charAt(e.length - 1) && (n += "$"), t = new RegExp(n)) : (n = e.toString(), t = e), r => {
                            if (Bn(r.value)) return null;
                            const o = r.value;
                            return t.test(o) ? null : {
                                pattern: {
                                    requiredPattern: n,
                                    actualValue: o
                                }
                            }
                        }
                    }(t)
                }
                static nullValidator(t) {
                    return null
                }
                static compose(t) {
                    return dw(t)
                }
                static composeAsync(t) {
                    return fw(t)
                }
            }

            function Na(e) {
                return null
            }

            function sw(e) {
                return null != e
            }

            function aw(e) {
                return Ko(e) ? Me(e) : e
            }

            function lw(e) {
                let t = {};
                return e.forEach(n => {
                    t = null != n ? { ...t,
                        ...n
                    } : t
                }), 0 === Object.keys(t).length ? null : t
            }

            function cw(e, t) {
                return t.map(n => n(e))
            }

            function uw(e) {
                return e.map(t => function LR(e) {
                    return !e.validate
                }(t) ? t : n => t.validate(n))
            }

            function dw(e) {
                if (!e) return null;
                const t = e.filter(sw);
                return 0 == t.length ? null : function(n) {
                    return lw(cw(n, t))
                }
            }

            function Hd(e) {
                return null != e ? dw(uw(e)) : null
            }

            function fw(e) {
                if (!e) return null;
                const t = e.filter(sw);
                return 0 == t.length ? null : function(n) {
                    return function xR(...e) {
                        const t = Gf(e),
                            {
                                args: n,
                                keys: r
                            } = TC(e),
                            o = new ye(i => {
                                const {
                                    length: s
                                } = n;
                                if (!s) return void i.complete();
                                const a = new Array(s);
                                let l = s,
                                    c = s;
                                for (let u = 0; u < s; u++) {
                                    let h = !1;
                                    Dt(n[u]).subscribe(De(i, g => {
                                        h || (h = !0, c--), a[u] = g
                                    }, () => l--, void 0, () => {
                                        (!l || !h) && (c || i.next(r ? RC(r, a) : a), i.complete())
                                    }))
                                }
                            });
                        return t ? o.pipe(kC(t)) : o
                    }(cw(n, t).map(aw)).pipe(W(lw))
                }
            }

            function $d(e) {
                return null != e ? fw(uw(e)) : null
            }

            function hw(e, t) {
                return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t]
            }

            function pw(e) {
                return e._rawValidators
            }

            function gw(e) {
                return e._rawAsyncValidators
            }

            function zd(e) {
                return e ? Array.isArray(e) ? e : [e] : []
            }

            function Fa(e, t) {
                return Array.isArray(e) ? e.includes(t) : e === t
            }

            function mw(e, t) {
                const n = zd(t);
                return zd(e).forEach(o => {
                    Fa(n, o) || n.push(o)
                }), n
            }

            function vw(e, t) {
                return zd(t).filter(n => !Fa(e, n))
            }
            class yw {
                constructor() {
                    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
                }
                get value() {
                    return this.control ? this.control.value : null
                }
                get valid() {
                    return this.control ? this.control.valid : null
                }
                get invalid() {
                    return this.control ? this.control.invalid : null
                }
                get pending() {
                    return this.control ? this.control.pending : null
                }
                get disabled() {
                    return this.control ? this.control.disabled : null
                }
                get enabled() {
                    return this.control ? this.control.enabled : null
                }
                get errors() {
                    return this.control ? this.control.errors : null
                }
                get pristine() {
                    return this.control ? this.control.pristine : null
                }
                get dirty() {
                    return this.control ? this.control.dirty : null
                }
                get touched() {
                    return this.control ? this.control.touched : null
                }
                get status() {
                    return this.control ? this.control.status : null
                }
                get untouched() {
                    return this.control ? this.control.untouched : null
                }
                get statusChanges() {
                    return this.control ? this.control.statusChanges : null
                }
                get valueChanges() {
                    return this.control ? this.control.valueChanges : null
                }
                get path() {
                    return null
                }
                _setValidators(t) {
                    this._rawValidators = t || [], this._composedValidatorFn = Hd(this._rawValidators)
                }
                _setAsyncValidators(t) {
                    this._rawAsyncValidators = t || [], this._composedAsyncValidatorFn = $d(this._rawAsyncValidators)
                }
                get validator() {
                    return this._composedValidatorFn || null
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn || null
                }
                _registerOnDestroy(t) {
                    this._onDestroyCallbacks.push(t)
                }
                _invokeOnDestroyCallbacks() {
                    this._onDestroyCallbacks.forEach(t => t()), this._onDestroyCallbacks = []
                }
                reset(t) {
                    this.control && this.control.reset(t)
                }
                hasError(t, n) {
                    return !!this.control && this.control.hasError(t, n)
                }
                getError(t, n) {
                    return this.control ? this.control.getError(t, n) : null
                }
            }
            class ot extends yw {
                get formDirective() {
                    return null
                }
                get path() {
                    return null
                }
            }
            class Hn extends yw {
                constructor() {
                    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
                }
            }
            class Cw {
                constructor(t) {
                    this._cd = t
                }
                get isTouched() {
                    return !!this._cd ? .control ? .touched
                }
                get isUntouched() {
                    return !!this._cd ? .control ? .untouched
                }
                get isPristine() {
                    return !!this._cd ? .control ? .pristine
                }
                get isDirty() {
                    return !!this._cd ? .control ? .dirty
                }
                get isValid() {
                    return !!this._cd ? .control ? .valid
                }
                get isInvalid() {
                    return !!this._cd ? .control ? .invalid
                }
                get isPending() {
                    return !!this._cd ? .control ? .pending
                }
                get isSubmitted() {
                    return !!this._cd ? .submitted
                }
            }
            let _w = (() => {
                    class e extends Cw {
                        constructor(n) {
                            super(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Hn, 2))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "formControlName", ""],
                            ["", "ngModel", ""],
                            ["", "formControl", ""]
                        ],
                        hostVars: 14,
                        hostBindings: function(n, r) {
                            2 & n && Ns("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)
                        },
                        features: [oe]
                    }), e
                })(),
                Gd = (() => {
                    class e extends Cw {
                        constructor(n) {
                            super(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(ot, 10))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "formGroupName", ""],
                            ["", "formArrayName", ""],
                            ["", "ngModelGroup", ""],
                            ["", "formGroup", ""],
                            ["form", 3, "ngNoForm", ""],
                            ["", "ngForm", ""]
                        ],
                        hostVars: 16,
                        hostBindings: function(n, r) {
                            2 & n && Ns("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)("ng-submitted", r.isSubmitted)
                        },
                        features: [oe]
                    }), e
                })();
            const Ti = "VALID",
                Va = "INVALID",
                ho = "PENDING",
                ki = "DISABLED";

            function Zd(e) {
                return (ja(e) ? e.validators : e) || null
            }

            function Yd(e, t) {
                return (ja(t) ? t.asyncValidators : e) || null
            }

            function ja(e) {
                return null != e && !Array.isArray(e) && "object" == typeof e
            }
            class Mw {
                constructor(t, n) {
                    this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._assignValidators(t), this._assignAsyncValidators(n)
                }
                get validator() {
                    return this._composedValidatorFn
                }
                set validator(t) {
                    this._rawValidators = this._composedValidatorFn = t
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn
                }
                set asyncValidator(t) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn = t
                }
                get parent() {
                    return this._parent
                }
                get valid() {
                    return this.status === Ti
                }
                get invalid() {
                    return this.status === Va
                }
                get pending() {
                    return this.status == ho
                }
                get disabled() {
                    return this.status === ki
                }
                get enabled() {
                    return this.status !== ki
                }
                get dirty() {
                    return !this.pristine
                }
                get untouched() {
                    return !this.touched
                }
                get updateOn() {
                    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
                }
                setValidators(t) {
                    this._assignValidators(t)
                }
                setAsyncValidators(t) {
                    this._assignAsyncValidators(t)
                }
                addValidators(t) {
                    this.setValidators(mw(t, this._rawValidators))
                }
                addAsyncValidators(t) {
                    this.setAsyncValidators(mw(t, this._rawAsyncValidators))
                }
                removeValidators(t) {
                    this.setValidators(vw(t, this._rawValidators))
                }
                removeAsyncValidators(t) {
                    this.setAsyncValidators(vw(t, this._rawAsyncValidators))
                }
                hasValidator(t) {
                    return Fa(this._rawValidators, t)
                }
                hasAsyncValidator(t) {
                    return Fa(this._rawAsyncValidators, t)
                }
                clearValidators() {
                    this.validator = null
                }
                clearAsyncValidators() {
                    this.asyncValidator = null
                }
                markAsTouched(t = {}) {
                    this.touched = !0, this._parent && !t.onlySelf && this._parent.markAsTouched(t)
                }
                markAllAsTouched() {
                    this.markAsTouched({
                        onlySelf: !0
                    }), this._forEachChild(t => t.markAllAsTouched())
                }
                markAsUntouched(t = {}) {
                    this.touched = !1, this._pendingTouched = !1, this._forEachChild(n => {
                        n.markAsUntouched({
                            onlySelf: !0
                        })
                    }), this._parent && !t.onlySelf && this._parent._updateTouched(t)
                }
                markAsDirty(t = {}) {
                    this.pristine = !1, this._parent && !t.onlySelf && this._parent.markAsDirty(t)
                }
                markAsPristine(t = {}) {
                    this.pristine = !0, this._pendingDirty = !1, this._forEachChild(n => {
                        n.markAsPristine({
                            onlySelf: !0
                        })
                    }), this._parent && !t.onlySelf && this._parent._updatePristine(t)
                }
                markAsPending(t = {}) {
                    this.status = ho, !1 !== t.emitEvent && this.statusChanges.emit(this.status), this._parent && !t.onlySelf && this._parent.markAsPending(t)
                }
                disable(t = {}) {
                    const n = this._parentMarkedDirty(t.onlySelf);
                    this.status = ki, this.errors = null, this._forEachChild(r => {
                        r.disable({ ...t,
                            onlySelf: !0
                        })
                    }), this._updateValue(), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors({ ...t,
                        skipPristineCheck: n
                    }), this._onDisabledChange.forEach(r => r(!0))
                }
                enable(t = {}) {
                    const n = this._parentMarkedDirty(t.onlySelf);
                    this.status = Ti, this._forEachChild(r => {
                        r.enable({ ...t,
                            onlySelf: !0
                        })
                    }), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    }), this._updateAncestors({ ...t,
                        skipPristineCheck: n
                    }), this._onDisabledChange.forEach(r => r(!1))
                }
                _updateAncestors(t) {
                    this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
                }
                setParent(t) {
                    this._parent = t
                }
                getRawValue() {
                    return this.value
                }
                updateValueAndValidity(t = {}) {
                    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === Ti || this.status === ho) && this._runAsyncValidator(t.emitEvent)), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
                }
                _updateTreeValidity(t = {
                    emitEvent: !0
                }) {
                    this._forEachChild(n => n._updateTreeValidity(t)), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? ki : Ti
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null
                }
                _runAsyncValidator(t) {
                    if (this.asyncValidator) {
                        this.status = ho, this._hasOwnPendingAsyncValidator = !0;
                        const n = aw(this.asyncValidator(this));
                        this._asyncValidationSubscription = n.subscribe(r => {
                            this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
                                emitEvent: t
                            })
                        })
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
                }
                setErrors(t, n = {}) {
                    this.errors = t, this._updateControlsErrors(!1 !== n.emitEvent)
                }
                get(t) {
                    let n = t;
                    return null == n || (Array.isArray(n) || (n = n.split(".")), 0 === n.length) ? null : n.reduce((r, o) => r && r._find(o), this)
                }
                getError(t, n) {
                    const r = n ? this.get(n) : this;
                    return r && r.errors ? r.errors[t] : null
                }
                hasError(t, n) {
                    return !!this.getError(t, n)
                }
                get root() {
                    let t = this;
                    for (; t._parent;) t = t._parent;
                    return t
                }
                _updateControlsErrors(t) {
                    this.status = this._calculateStatus(), t && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(t)
                }
                _initObservables() {
                    this.valueChanges = new J, this.statusChanges = new J
                }
                _calculateStatus() {
                    return this._allControlsDisabled() ? ki : this.errors ? Va : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(ho) ? ho : this._anyControlsHaveStatus(Va) ? Va : Ti
                }
                _anyControlsHaveStatus(t) {
                    return this._anyControls(n => n.status === t)
                }
                _anyControlsDirty() {
                    return this._anyControls(t => t.dirty)
                }
                _anyControlsTouched() {
                    return this._anyControls(t => t.touched)
                }
                _updatePristine(t = {}) {
                    this.pristine = !this._anyControlsDirty(), this._parent && !t.onlySelf && this._parent._updatePristine(t)
                }
                _updateTouched(t = {}) {
                    this.touched = this._anyControlsTouched(), this._parent && !t.onlySelf && this._parent._updateTouched(t)
                }
                _registerOnCollectionChange(t) {
                    this._onCollectionChange = t
                }
                _setUpdateStrategy(t) {
                    ja(t) && null != t.updateOn && (this._updateOn = t.updateOn)
                }
                _parentMarkedDirty(t) {
                    return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
                }
                _find(t) {
                    return null
                }
                _assignValidators(t) {
                    this._rawValidators = Array.isArray(t) ? t.slice() : t, this._composedValidatorFn = function zR(e) {
                        return Array.isArray(e) ? Hd(e) : e || null
                    }(this._rawValidators)
                }
                _assignAsyncValidators(t) {
                    this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t, this._composedAsyncValidatorFn = function GR(e) {
                        return Array.isArray(e) ? $d(e) : e || null
                    }(this._rawAsyncValidators)
                }
            }
            class Ba extends Mw {
                constructor(t, n, r) {
                    super(Zd(n), Yd(r, n)), this.controls = t, this._initObservables(), this._setUpdateStrategy(n), this._setUpControls(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator
                    })
                }
                registerControl(t, n) {
                    return this.controls[t] ? this.controls[t] : (this.controls[t] = n, n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange), n)
                }
                addControl(t, n, r = {}) {
                    this.registerControl(t, n), this.updateValueAndValidity({
                        emitEvent: r.emitEvent
                    }), this._onCollectionChange()
                }
                removeControl(t, n = {}) {
                    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], this.updateValueAndValidity({
                        emitEvent: n.emitEvent
                    }), this._onCollectionChange()
                }
                setControl(t, n, r = {}) {
                    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], n && this.registerControl(t, n), this.updateValueAndValidity({
                        emitEvent: r.emitEvent
                    }), this._onCollectionChange()
                }
                contains(t) {
                    return this.controls.hasOwnProperty(t) && this.controls[t].enabled
                }
                setValue(t, n = {}) {
                    (function Dw(e, t, n) {
                        e._forEachChild((r, o) => {
                            if (void 0 === n[o]) throw new E(1002, "")
                        })
                    })(this, 0, t), Object.keys(t).forEach(r => {
                        (function bw(e, t, n) {
                            const r = e.controls;
                            if (!(t ? Object.keys(r) : r).length) throw new E(1e3, "");
                            if (!r[n]) throw new E(1001, "")
                        })(this, !0, r), this.controls[r].setValue(t[r], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        })
                    }), this.updateValueAndValidity(n)
                }
                patchValue(t, n = {}) {
                    null != t && (Object.keys(t).forEach(r => {
                        const o = this.controls[r];
                        o && o.patchValue(t[r], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        })
                    }), this.updateValueAndValidity(n))
                }
                reset(t = {}, n = {}) {
                    this._forEachChild((r, o) => {
                        r.reset(t[o], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        })
                    }), this._updatePristine(n), this._updateTouched(n), this.updateValueAndValidity(n)
                }
                getRawValue() {
                    return this._reduceChildren({}, (t, n, r) => (t[r] = n.getRawValue(), t))
                }
                _syncPendingControls() {
                    let t = this._reduceChildren(!1, (n, r) => !!r._syncPendingControls() || n);
                    return t && this.updateValueAndValidity({
                        onlySelf: !0
                    }), t
                }
                _forEachChild(t) {
                    Object.keys(this.controls).forEach(n => {
                        const r = this.controls[n];
                        r && t(r, n)
                    })
                }
                _setUpControls() {
                    this._forEachChild(t => {
                        t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
                    })
                }
                _updateValue() {
                    this.value = this._reduceValue()
                }
                _anyControls(t) {
                    for (const [n, r] of Object.entries(this.controls))
                        if (this.contains(n) && t(r)) return !0;
                    return !1
                }
                _reduceValue() {
                    return this._reduceChildren({}, (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n))
                }
                _reduceChildren(t, n) {
                    let r = t;
                    return this._forEachChild((o, i) => {
                        r = n(r, o, i)
                    }), r
                }
                _allControlsDisabled() {
                    for (const t of Object.keys(this.controls))
                        if (this.controls[t].enabled) return !1;
                    return Object.keys(this.controls).length > 0 || this.disabled
                }
                _find(t) {
                    return this.controls.hasOwnProperty(t) ? this.controls[t] : null
                }
            }
            const po = new O("CallSetDisabledState", {
                    providedIn: "root",
                    factory: () => Ua
                }),
                Ua = "always";

            function Ri(e, t, n = Ua) {
                Qd(e, t), t.valueAccessor.writeValue(e.value), (e.disabled || "always" === n) && t.valueAccessor.setDisabledState ? .(e.disabled),
                    function KR(e, t) {
                        t.valueAccessor.registerOnChange(n => {
                            e._pendingValue = n, e._pendingChange = !0, e._pendingDirty = !0, "change" === e.updateOn && Ew(e, t)
                        })
                    }(e, t),
                    function YR(e, t) {
                        const n = (r, o) => {
                            t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r)
                        };
                        e.registerOnChange(n), t._registerOnDestroy(() => {
                            e._unregisterOnChange(n)
                        })
                    }(e, t),
                    function ZR(e, t) {
                        t.valueAccessor.registerOnTouched(() => {
                            e._pendingTouched = !0, "blur" === e.updateOn && e._pendingChange && Ew(e, t), "submit" !== e.updateOn && e.markAsTouched()
                        })
                    }(e, t),
                    function qR(e, t) {
                        if (t.valueAccessor.setDisabledState) {
                            const n = r => {
                                t.valueAccessor.setDisabledState(r)
                            };
                            e.registerOnDisabledChange(n), t._registerOnDestroy(() => {
                                e._unregisterOnDisabledChange(n)
                            })
                        }
                    }(e, t)
            }

            function $a(e, t, n = !0) {
                const r = () => {};
                t.valueAccessor && (t.valueAccessor.registerOnChange(r), t.valueAccessor.registerOnTouched(r)), Ga(e, t), e && (t._invokeOnDestroyCallbacks(), e._registerOnCollectionChange(() => {}))
            }

            function za(e, t) {
                e.forEach(n => {
                    n.registerOnValidatorChange && n.registerOnValidatorChange(t)
                })
            }

            function Qd(e, t) {
                const n = pw(e);
                null !== t.validator ? e.setValidators(hw(n, t.validator)) : "function" == typeof n && e.setValidators([n]);
                const r = gw(e);
                null !== t.asyncValidator ? e.setAsyncValidators(hw(r, t.asyncValidator)) : "function" == typeof r && e.setAsyncValidators([r]);
                const o = () => e.updateValueAndValidity();
                za(t._rawValidators, o), za(t._rawAsyncValidators, o)
            }

            function Ga(e, t) {
                let n = !1;
                if (null !== e) {
                    if (null !== t.validator) {
                        const o = pw(e);
                        if (Array.isArray(o) && o.length > 0) {
                            const i = o.filter(s => s !== t.validator);
                            i.length !== o.length && (n = !0, e.setValidators(i))
                        }
                    }
                    if (null !== t.asyncValidator) {
                        const o = gw(e);
                        if (Array.isArray(o) && o.length > 0) {
                            const i = o.filter(s => s !== t.asyncValidator);
                            i.length !== o.length && (n = !0, e.setAsyncValidators(i))
                        }
                    }
                }
                const r = () => {};
                return za(t._rawValidators, r), za(t._rawAsyncValidators, r), n
            }

            function Ew(e, t) {
                e._pendingDirty && e.markAsDirty(), e.setValue(e._pendingValue, {
                    emitModelToViewChange: !1
                }), t.viewToModelUpdate(e._pendingValue), e._pendingChange = !1
            }

            function Sw(e, t) {
                Qd(e, t)
            }

            function Iw(e, t) {
                e._syncPendingControls(), t.forEach(n => {
                    const r = n.control;
                    "submit" === r.updateOn && r._pendingChange && (n.viewToModelUpdate(r._pendingValue), r._pendingChange = !1)
                })
            }
            const tN = {
                    provide: ot,
                    useExisting: le(() => Wa)
                },
                Ni = (() => Promise.resolve())();
            let Wa = (() => {
                class e extends ot {
                    constructor(n, r, o) {
                        super(), this.callSetDisabledState = o, this.submitted = !1, this._directives = new Set, this.ngSubmit = new J, this.form = new Ba({}, Hd(n), $d(r))
                    }
                    ngAfterViewInit() {
                        this._setUpdateStrategy()
                    }
                    get formDirective() {
                        return this
                    }
                    get control() {
                        return this.form
                    }
                    get path() {
                        return []
                    }
                    get controls() {
                        return this.form.controls
                    }
                    addControl(n) {
                        Ni.then(() => {
                            const r = this._findContainer(n.path);
                            n.control = r.registerControl(n.name, n.control), Ri(n.control, n, this.callSetDisabledState), n.control.updateValueAndValidity({
                                emitEvent: !1
                            }), this._directives.add(n)
                        })
                    }
                    getControl(n) {
                        return this.form.get(n.path)
                    }
                    removeControl(n) {
                        Ni.then(() => {
                            const r = this._findContainer(n.path);
                            r && r.removeControl(n.name), this._directives.delete(n)
                        })
                    }
                    addFormGroup(n) {
                        Ni.then(() => {
                            const r = this._findContainer(n.path),
                                o = new Ba({});
                            Sw(o, n), r.registerControl(n.name, o), o.updateValueAndValidity({
                                emitEvent: !1
                            })
                        })
                    }
                    removeFormGroup(n) {
                        Ni.then(() => {
                            const r = this._findContainer(n.path);
                            r && r.removeControl(n.name)
                        })
                    }
                    getFormGroup(n) {
                        return this.form.get(n.path)
                    }
                    updateModel(n, r) {
                        Ni.then(() => {
                            this.form.get(n.path).setValue(r)
                        })
                    }
                    setValue(n) {
                        this.control.setValue(n)
                    }
                    onSubmit(n) {
                        return this.submitted = !0, Iw(this.form, this._directives), this.ngSubmit.emit(n), "dialog" === n ? .target ? .method
                    }
                    onReset() {
                        this.resetForm()
                    }
                    resetForm(n) {
                        this.form.reset(n), this.submitted = !1
                    }
                    _setUpdateStrategy() {
                        this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
                    }
                    _findContainer(n) {
                        return n.pop(), n.length ? this.form.get(n) : this.form
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(w(Ye, 10), w(Un, 10), w(po, 8))
                }, e.\u0275dir = V({
                    type: e,
                    selectors: [
                        ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                        ["ng-form"],
                        ["", "ngForm", ""]
                    ],
                    hostBindings: function(n, r) {
                        1 & n && Q("submit", function(i) {
                            return r.onSubmit(i)
                        })("reset", function() {
                            return r.onReset()
                        })
                    },
                    inputs: {
                        options: ["ngFormOptions", "options"]
                    },
                    outputs: {
                        ngSubmit: "ngSubmit"
                    },
                    exportAs: ["ngForm"],
                    features: [he([tN]), oe]
                }), e
            })();

            function Pw(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }

            function Ow(e) {
                return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value" in e && "disabled" in e
            }
            const go = class extends Mw {
                constructor(t = null, n, r) {
                    super(Zd(n), Yd(r, n)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(t), this._setUpdateStrategy(n), this._initObservables(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator
                    }), ja(n) && (n.nonNullable || n.initialValueIsDefault) && (this.defaultValue = Ow(t) ? t.value : t)
                }
                setValue(t, n = {}) {
                    this.value = this._pendingValue = t, this._onChange.length && !1 !== n.emitModelToViewChange && this._onChange.forEach(r => r(this.value, !1 !== n.emitViewToModelChange)), this.updateValueAndValidity(n)
                }
                patchValue(t, n = {}) {
                    this.setValue(t, n)
                }
                reset(t = this.defaultValue, n = {}) {
                    this._applyFormState(t), this.markAsPristine(n), this.markAsUntouched(n), this.setValue(this.value, n), this._pendingChange = !1
                }
                _updateValue() {}
                _anyControls(t) {
                    return !1
                }
                _allControlsDisabled() {
                    return this.disabled
                }
                registerOnChange(t) {
                    this._onChange.push(t)
                }
                _unregisterOnChange(t) {
                    Pw(this._onChange, t)
                }
                registerOnDisabledChange(t) {
                    this._onDisabledChange.push(t)
                }
                _unregisterOnDisabledChange(t) {
                    Pw(this._onDisabledChange, t)
                }
                _forEachChild(t) {}
                _syncPendingControls() {
                    return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                        onlySelf: !0,
                        emitModelToViewChange: !1
                    }), 0))
                }
                _applyFormState(t) {
                    Ow(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
                        onlySelf: !0,
                        emitEvent: !1
                    }) : this.enable({
                        onlySelf: !0,
                        emitEvent: !1
                    })) : this.value = this._pendingValue = t
                }
            };
            let tf = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]
                        ],
                        hostAttrs: ["novalidate", ""]
                    }), e
                })(),
                Nw = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({}), e
                })();
            const nf = new O("NgModelWithFormControlWarning"),
                uN = {
                    provide: ot,
                    useExisting: le(() => qa)
                };
            let qa = (() => {
                class e extends ot {
                    constructor(n, r, o) {
                        super(), this.callSetDisabledState = o, this.submitted = !1, this._onCollectionChange = () => this._updateDomValue(), this.directives = [], this.form = null, this.ngSubmit = new J, this._setValidators(n), this._setAsyncValidators(r)
                    }
                    ngOnChanges(n) {
                        this._checkFormPresent(), n.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
                    }
                    ngOnDestroy() {
                        this.form && (Ga(this.form, this), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {}))
                    }
                    get formDirective() {
                        return this
                    }
                    get control() {
                        return this.form
                    }
                    get path() {
                        return []
                    }
                    addControl(n) {
                        const r = this.form.get(n.path);
                        return Ri(r, n, this.callSetDisabledState), r.updateValueAndValidity({
                            emitEvent: !1
                        }), this.directives.push(n), r
                    }
                    getControl(n) {
                        return this.form.get(n.path)
                    }
                    removeControl(n) {
                        $a(n.control || null, n, !1),
                            function eN(e, t) {
                                const n = e.indexOf(t);
                                n > -1 && e.splice(n, 1)
                            }(this.directives, n)
                    }
                    addFormGroup(n) {
                        this._setUpFormContainer(n)
                    }
                    removeFormGroup(n) {
                        this._cleanUpFormContainer(n)
                    }
                    getFormGroup(n) {
                        return this.form.get(n.path)
                    }
                    addFormArray(n) {
                        this._setUpFormContainer(n)
                    }
                    removeFormArray(n) {
                        this._cleanUpFormContainer(n)
                    }
                    getFormArray(n) {
                        return this.form.get(n.path)
                    }
                    updateModel(n, r) {
                        this.form.get(n.path).setValue(r)
                    }
                    onSubmit(n) {
                        return this.submitted = !0, Iw(this.form, this.directives), this.ngSubmit.emit(n), "dialog" === n ? .target ? .method
                    }
                    onReset() {
                        this.resetForm()
                    }
                    resetForm(n) {
                        this.form.reset(n), this.submitted = !1
                    }
                    _updateDomValue() {
                        this.directives.forEach(n => {
                            const r = n.control,
                                o = this.form.get(n.path);
                            r !== o && ($a(r || null, n), (e => e instanceof go)(o) && (Ri(o, n, this.callSetDisabledState), n.control = o))
                        }), this.form._updateTreeValidity({
                            emitEvent: !1
                        })
                    }
                    _setUpFormContainer(n) {
                        const r = this.form.get(n.path);
                        Sw(r, n), r.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                    _cleanUpFormContainer(n) {
                        if (this.form) {
                            const r = this.form.get(n.path);
                            r && function QR(e, t) {
                                return Ga(e, t)
                            }(r, n) && r.updateValueAndValidity({
                                emitEvent: !1
                            })
                        }
                    }
                    _updateRegistrations() {
                        this.form._registerOnCollectionChange(this._onCollectionChange), this._oldForm && this._oldForm._registerOnCollectionChange(() => {})
                    }
                    _updateValidators() {
                        Qd(this.form, this), this._oldForm && Ga(this._oldForm, this)
                    }
                    _checkFormPresent() {}
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(w(Ye, 10), w(Un, 10), w(po, 8))
                }, e.\u0275dir = V({
                    type: e,
                    selectors: [
                        ["", "formGroup", ""]
                    ],
                    hostBindings: function(n, r) {
                        1 & n && Q("submit", function(i) {
                            return r.onSubmit(i)
                        })("reset", function() {
                            return r.onReset()
                        })
                    },
                    inputs: {
                        form: ["formGroup", "form"]
                    },
                    outputs: {
                        ngSubmit: "ngSubmit"
                    },
                    exportAs: ["ngForm"],
                    features: [he([uN]), oe, gt]
                }), e
            })();
            const hN = {
                provide: Hn,
                useExisting: le(() => af)
            };
            let af = (() => {
                    class e extends Hn {
                        set isDisabled(n) {}
                        constructor(n, r, o, i, s) {
                            super(), this._ngModelWarningConfig = s, this._added = !1, this.update = new J, this._ngModelWarningSent = !1, this._parent = n, this._setValidators(r), this._setAsyncValidators(o), this.valueAccessor = function ef(e, t) {
                                if (!t) return null;
                                let n, r, o;
                                return Array.isArray(t), t.forEach(i => {
                                    i.constructor === Ra ? n = i : function JR(e) {
                                        return Object.getPrototypeOf(e.constructor) === hr
                                    }(i) ? r = i : o = i
                                }), o || r || n || null
                            }(0, i)
                        }
                        ngOnChanges(n) {
                            this._added || this._setUpControl(),
                                function Jd(e, t) {
                                    if (!e.hasOwnProperty("model")) return !1;
                                    const n = e.model;
                                    return !!n.isFirstChange() || !Object.is(t, n.currentValue)
                                }(n, this.viewModel) && (this.viewModel = this.model, this.formDirective.updateModel(this, this.model))
                        }
                        ngOnDestroy() {
                            this.formDirective && this.formDirective.removeControl(this)
                        }
                        viewToModelUpdate(n) {
                            this.viewModel = n, this.update.emit(n)
                        }
                        get path() {
                            return function Ha(e, t) {
                                return [...t.path, e]
                            }(null == this.name ? this.name : this.name.toString(), this._parent)
                        }
                        get formDirective() {
                            return this._parent ? this._parent.formDirective : null
                        }
                        _checkParentType() {}
                        _setUpControl() {
                            this._checkParentType(), this.control = this.formDirective.addControl(this), this._added = !0
                        }
                    }
                    return e._ngModelWarningSentOnce = !1, e.\u0275fac = function(n) {
                        return new(n || e)(w(ot, 13), w(Ye, 10), w(Un, 10), w(un, 10), w(nf, 8))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "formControlName", ""]
                        ],
                        inputs: {
                            name: ["formControlName", "name"],
                            isDisabled: ["disabled", "isDisabled"],
                            model: ["ngModel", "model"]
                        },
                        outputs: {
                            update: "ngModelChange"
                        },
                        features: [he([hN]), oe, gt]
                    }), e
                })(),
                Qw = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({
                        imports: [Nw]
                    }), e
                })(),
                ON = (() => {
                    class e {
                        static withConfig(n) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: po,
                                    useValue: n.callSetDisabledState ? ? Ua
                                }]
                            }
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({
                        imports: [Qw]
                    }), e
                })(),
                xN = (() => {
                    class e {
                        static withConfig(n) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: nf,
                                    useValue: n.warnOnNgModelWithFormControl ? ? "always"
                                }, {
                                    provide: po,
                                    useValue: n.callSetDisabledState ? ? Ua
                                }]
                            }
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({
                        imports: [Qw]
                    }), e
                })();
            class Ka {}
            class df {}
            class Pn {
                constructor(t) {
                    this.normalizedNames = new Map, this.lazyUpdate = null, t ? this.lazyInit = "string" == typeof t ? () => {
                        this.headers = new Map, t.split("\n").forEach(n => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                                const o = n.slice(0, r),
                                    i = o.toLowerCase(),
                                    s = n.slice(r + 1).trim();
                                this.maybeSetNormalizedName(o, i), this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                            }
                        })
                    } : () => {
                        this.headers = new Map, Object.keys(t).forEach(n => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]), r.length > 0 && (this.headers.set(o, r), this.maybeSetNormalizedName(n, o))
                        })
                    } : this.headers = new Map
                }
                has(t) {
                    return this.init(), this.headers.has(t.toLowerCase())
                }
                get(t) {
                    this.init();
                    const n = this.headers.get(t.toLowerCase());
                    return n && n.length > 0 ? n[0] : null
                }
                keys() {
                    return this.init(), Array.from(this.normalizedNames.values())
                }
                getAll(t) {
                    return this.init(), this.headers.get(t.toLowerCase()) || null
                }
                append(t, n) {
                    return this.clone({
                        name: t,
                        value: n,
                        op: "a"
                    })
                }
                set(t, n) {
                    return this.clone({
                        name: t,
                        value: n,
                        op: "s"
                    })
                }
                delete(t, n) {
                    return this.clone({
                        name: t,
                        value: n,
                        op: "d"
                    })
                }
                maybeSetNormalizedName(t, n) {
                    this.normalizedNames.has(n) || this.normalizedNames.set(n, t)
                }
                init() {
                    this.lazyInit && (this.lazyInit instanceof Pn ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null))
                }
                copyFrom(t) {
                    t.init(), Array.from(t.headers.keys()).forEach(n => {
                        this.headers.set(n, t.headers.get(n)), this.normalizedNames.set(n, t.normalizedNames.get(n))
                    })
                }
                clone(t) {
                    const n = new Pn;
                    return n.lazyInit = this.lazyInit && this.lazyInit instanceof Pn ? this.lazyInit : this, n.lazyUpdate = (this.lazyUpdate || []).concat([t]), n
                }
                applyUpdate(t) {
                    const n = t.name.toLowerCase();
                    switch (t.op) {
                        case "a":
                        case "s":
                            let r = t.value;
                            if ("string" == typeof r && (r = [r]), 0 === r.length) return;
                            this.maybeSetNormalizedName(t.name, n);
                            const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
                            o.push(...r), this.headers.set(n, o);
                            break;
                        case "d":
                            const i = t.value;
                            if (i) {
                                let s = this.headers.get(n);
                                if (!s) return;
                                s = s.filter(a => -1 === i.indexOf(a)), 0 === s.length ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, s)
                            } else this.headers.delete(n), this.normalizedNames.delete(n)
                    }
                }
                forEach(t) {
                    this.init(), Array.from(this.normalizedNames.keys()).forEach(n => t(this.normalizedNames.get(n), this.headers.get(n)))
                }
            }
            class AN {
                encodeKey(t) {
                    return Xw(t)
                }
                encodeValue(t) {
                    return Xw(t)
                }
                decodeKey(t) {
                    return decodeURIComponent(t)
                }
                decodeValue(t) {
                    return decodeURIComponent(t)
                }
            }
            const kN = /%(\d[a-f0-9])/gi,
                RN = {
                    40: "@",
                    "3A": ":",
                    24: "$",
                    "2C": ",",
                    "3B": ";",
                    "3D": "=",
                    "3F": "?",
                    "2F": "/"
                };

            function Xw(e) {
                return encodeURIComponent(e).replace(kN, (t, n) => RN[n] ? ? t)
            }

            function Za(e) {
                return `${e}`
            }
            class $n {
                constructor(t = {}) {
                    if (this.updates = null, this.cloneFrom = null, this.encoder = t.encoder || new AN, t.fromString) {
                        if (t.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                        this.map = function TN(e, t) {
                            const n = new Map;
                            return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
                                const i = o.indexOf("="),
                                    [s, a] = -1 == i ? [t.decodeKey(o), ""] : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
                                    l = n.get(s) || [];
                                l.push(a), n.set(s, l)
                            }), n
                        }(t.fromString, this.encoder)
                    } else t.fromObject ? (this.map = new Map, Object.keys(t.fromObject).forEach(n => {
                        const r = t.fromObject[n],
                            o = Array.isArray(r) ? r.map(Za) : [Za(r)];
                        this.map.set(n, o)
                    })) : this.map = null
                }
                has(t) {
                    return this.init(), this.map.has(t)
                }
                get(t) {
                    this.init();
                    const n = this.map.get(t);
                    return n ? n[0] : null
                }
                getAll(t) {
                    return this.init(), this.map.get(t) || null
                }
                keys() {
                    return this.init(), Array.from(this.map.keys())
                }
                append(t, n) {
                    return this.clone({
                        param: t,
                        value: n,
                        op: "a"
                    })
                }
                appendAll(t) {
                    const n = [];
                    return Object.keys(t).forEach(r => {
                        const o = t[r];
                        Array.isArray(o) ? o.forEach(i => {
                            n.push({
                                param: r,
                                value: i,
                                op: "a"
                            })
                        }) : n.push({
                            param: r,
                            value: o,
                            op: "a"
                        })
                    }), this.clone(n)
                }
                set(t, n) {
                    return this.clone({
                        param: t,
                        value: n,
                        op: "s"
                    })
                }
                delete(t, n) {
                    return this.clone({
                        param: t,
                        value: n,
                        op: "d"
                    })
                }
                toString() {
                    return this.init(), this.keys().map(t => {
                        const n = this.encoder.encodeKey(t);
                        return this.map.get(t).map(r => n + "=" + this.encoder.encodeValue(r)).join("&")
                    }).filter(t => "" !== t).join("&")
                }
                clone(t) {
                    const n = new $n({
                        encoder: this.encoder
                    });
                    return n.cloneFrom = this.cloneFrom || this, n.updates = (this.updates || []).concat(t), n
                }
                init() {
                    null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => {
                        switch (t.op) {
                            case "a":
                            case "s":
                                const n = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                                n.push(Za(t.value)), this.map.set(t.param, n);
                                break;
                            case "d":
                                if (void 0 === t.value) {
                                    this.map.delete(t.param);
                                    break
                                } {
                                    let r = this.map.get(t.param) || [];
                                    const o = r.indexOf(Za(t.value)); - 1 !== o && r.splice(o, 1), r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param)
                                }
                        }
                    }), this.cloneFrom = this.updates = null)
                }
            }
            class NN {
                constructor() {
                    this.map = new Map
                }
                set(t, n) {
                    return this.map.set(t, n), this
                }
                get(t) {
                    return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
                }
                delete(t) {
                    return this.map.delete(t), this
                }
                has(t) {
                    return this.map.has(t)
                }
                keys() {
                    return this.map.keys()
                }
            }

            function Jw(e) {
                return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
            }

            function e1(e) {
                return typeof Blob < "u" && e instanceof Blob
            }

            function t1(e) {
                return typeof FormData < "u" && e instanceof FormData
            }
            class Fi {
                constructor(t, n, r, o) {
                    let i;
                    if (this.url = n, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = t.toUpperCase(), function FN(e) {
                            switch (e) {
                                case "DELETE":
                                case "GET":
                                case "HEAD":
                                case "OPTIONS":
                                case "JSONP":
                                    return !1;
                                default:
                                    return !0
                            }
                        }(this.method) || o ? (this.body = void 0 !== r ? r : null, i = o) : i = r, i && (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.context && (this.context = i.context), i.params && (this.params = i.params)), this.headers || (this.headers = new Pn), this.context || (this.context = new NN), this.params) {
                        const s = this.params.toString();
                        if (0 === s.length) this.urlWithParams = n;
                        else {
                            const a = n.indexOf("?");
                            this.urlWithParams = n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s
                        }
                    } else this.params = new $n, this.urlWithParams = n
                }
                serializeBody() {
                    return null === this.body ? null : Jw(this.body) || e1(this.body) || t1(this.body) || function LN(e) {
                        return typeof URLSearchParams < "u" && e instanceof URLSearchParams
                    }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof $n ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
                }
                detectContentTypeHeader() {
                    return null === this.body || t1(this.body) ? null : e1(this.body) ? this.body.type || null : Jw(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof $n ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
                }
                clone(t = {}) {
                    const n = t.method || this.method,
                        r = t.url || this.url,
                        o = t.responseType || this.responseType,
                        i = void 0 !== t.body ? t.body : this.body,
                        s = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
                        a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
                    let l = t.headers || this.headers,
                        c = t.params || this.params;
                    const u = t.context ? ? this.context;
                    return void 0 !== t.setHeaders && (l = Object.keys(t.setHeaders).reduce((h, g) => h.set(g, t.setHeaders[g]), l)), t.setParams && (c = Object.keys(t.setParams).reduce((h, g) => h.set(g, t.setParams[g]), c)), new Fi(n, r, i, {
                        params: c,
                        headers: l,
                        context: u,
                        reportProgress: a,
                        responseType: o,
                        withCredentials: s
                    })
                }
            }
            var Oe = (() => ((Oe = Oe || {})[Oe.Sent = 0] = "Sent", Oe[Oe.UploadProgress = 1] = "UploadProgress", Oe[Oe.ResponseHeader = 2] = "ResponseHeader", Oe[Oe.DownloadProgress = 3] = "DownloadProgress", Oe[Oe.Response = 4] = "Response", Oe[Oe.User = 5] = "User", Oe))();
            class ff {
                constructor(t, n = 200, r = "OK") {
                    this.headers = t.headers || new Pn, this.status = void 0 !== t.status ? t.status : n, this.statusText = t.statusText || r, this.url = t.url || null, this.ok = this.status >= 200 && this.status < 300
                }
            }
            class hf extends ff {
                constructor(t = {}) {
                    super(t), this.type = Oe.ResponseHeader
                }
                clone(t = {}) {
                    return new hf({
                        headers: t.headers || this.headers,
                        status: void 0 !== t.status ? t.status : this.status,
                        statusText: t.statusText || this.statusText,
                        url: t.url || this.url || void 0
                    })
                }
            }
            class Ya extends ff {
                constructor(t = {}) {
                    super(t), this.type = Oe.Response, this.body = void 0 !== t.body ? t.body : null
                }
                clone(t = {}) {
                    return new Ya({
                        body: void 0 !== t.body ? t.body : this.body,
                        headers: t.headers || this.headers,
                        status: void 0 !== t.status ? t.status : this.status,
                        statusText: t.statusText || this.statusText,
                        url: t.url || this.url || void 0
                    })
                }
            }
            class n1 extends ff {
                constructor(t) {
                    super(t, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${t.url||"(unknown url)"}` : `Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null
                }
            }

            function pf(e, t) {
                return {
                    body: t,
                    headers: e.headers,
                    context: e.context,
                    observe: e.observe,
                    params: e.params,
                    reportProgress: e.reportProgress,
                    responseType: e.responseType,
                    withCredentials: e.withCredentials
                }
            }
            let r1 = (() => {
                class e {
                    constructor(n) {
                        this.handler = n
                    }
                    request(n, r, o = {}) {
                        let i;
                        if (n instanceof Fi) i = n;
                        else {
                            let l, c;
                            l = o.headers instanceof Pn ? o.headers : new Pn(o.headers), o.params && (c = o.params instanceof $n ? o.params : new $n({
                                fromObject: o.params
                            })), i = new Fi(n, r, void 0 !== o.body ? o.body : null, {
                                headers: l,
                                context: o.context,
                                params: c,
                                reportProgress: o.reportProgress,
                                responseType: o.responseType || "json",
                                withCredentials: o.withCredentials
                            })
                        }
                        const s = T(i).pipe(Ln(l => this.handler.handle(l)));
                        if (n instanceof Fi || "events" === o.observe) return s;
                        const a = s.pipe(Sn(l => l instanceof Ya));
                        switch (o.observe || "body") {
                            case "body":
                                switch (i.responseType) {
                                    case "arraybuffer":
                                        return a.pipe(W(l => {
                                            if (null !== l.body && !(l.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                            return l.body
                                        }));
                                    case "blob":
                                        return a.pipe(W(l => {
                                            if (null !== l.body && !(l.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                            return l.body
                                        }));
                                    case "text":
                                        return a.pipe(W(l => {
                                            if (null !== l.body && "string" != typeof l.body) throw new Error("Response is not a string.");
                                            return l.body
                                        }));
                                    default:
                                        return a.pipe(W(l => l.body))
                                }
                            case "response":
                                return a;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
                        }
                    }
                    delete(n, r = {}) {
                        return this.request("DELETE", n, r)
                    }
                    get(n, r = {}) {
                        return this.request("GET", n, r)
                    }
                    head(n, r = {}) {
                        return this.request("HEAD", n, r)
                    }
                    jsonp(n, r) {
                        return this.request("JSONP", n, {
                            params: (new $n).append(r, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        })
                    }
                    options(n, r = {}) {
                        return this.request("OPTIONS", n, r)
                    }
                    patch(n, r, o = {}) {
                        return this.request("PATCH", n, pf(o, r))
                    }
                    post(n, r, o = {}) {
                        return this.request("POST", n, pf(o, r))
                    }
                    put(n, r, o = {}) {
                        return this.request("PUT", n, pf(o, r))
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(Ka))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();

            function o1(e, t) {
                return t(e)
            }

            function VN(e, t) {
                return (n, r) => t.intercept(n, {
                    handle: o => e(o, r)
                })
            }
            const BN = new O("HTTP_INTERCEPTORS"),
                Li = new O("HTTP_INTERCEPTOR_FNS");

            function UN() {
                let e = null;
                return (t, n) => (null === e && (e = (K(BN, {
                    optional: !0
                }) ? ? []).reduceRight(VN, o1)), e(t, n))
            }
            let s1 = (() => {
                class e extends Ka {
                    constructor(n, r) {
                        super(), this.backend = n, this.injector = r, this.chain = null
                    }
                    handle(n) {
                        if (null === this.chain) {
                            const r = Array.from(new Set(this.injector.get(Li)));
                            this.chain = r.reduceRight((o, i) => function jN(e, t, n) {
                                return (r, o) => n.runInContext(() => t(r, i => e(i, o)))
                            }(o, i, this.injector), o1)
                        }
                        return this.chain(n, r => this.backend.handle(r))
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(df), x(Xt))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const GN = /^\)\]\}',?\n/;
            let l1 = (() => {
                class e {
                    constructor(n) {
                        this.xhrFactory = n
                    }
                    handle(n) {
                        if ("JSONP" === n.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
                        return new ye(r => {
                            const o = this.xhrFactory.build();
                            if (o.open(n.method, n.urlWithParams), n.withCredentials && (o.withCredentials = !0), n.headers.forEach((m, y) => o.setRequestHeader(m, y.join(","))), n.headers.has("Accept") || o.setRequestHeader("Accept", "application/json, text/plain, */*"), !n.headers.has("Content-Type")) {
                                const m = n.detectContentTypeHeader();
                                null !== m && o.setRequestHeader("Content-Type", m)
                            }
                            if (n.responseType) {
                                const m = n.responseType.toLowerCase();
                                o.responseType = "json" !== m ? m : "text"
                            }
                            const i = n.serializeBody();
                            let s = null;
                            const a = () => {
                                    if (null !== s) return s;
                                    const m = o.statusText || "OK",
                                        y = new Pn(o.getAllResponseHeaders()),
                                        C = function WN(e) {
                                            return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                                        }(o) || n.url;
                                    return s = new hf({
                                        headers: y,
                                        status: o.status,
                                        statusText: m,
                                        url: C
                                    }), s
                                },
                                l = () => {
                                    let {
                                        headers: m,
                                        status: y,
                                        statusText: C,
                                        url: _
                                    } = a(), D = null;
                                    204 !== y && (D = typeof o.response > "u" ? o.responseText : o.response), 0 === y && (y = D ? 200 : 0);
                                    let S = y >= 200 && y < 300;
                                    if ("json" === n.responseType && "string" == typeof D) {
                                        const b = D;
                                        D = D.replace(GN, "");
                                        try {
                                            D = "" !== D ? JSON.parse(D) : null
                                        } catch (R) {
                                            D = b, S && (S = !1, D = {
                                                error: R,
                                                text: D
                                            })
                                        }
                                    }
                                    S ? (r.next(new Ya({
                                        body: D,
                                        headers: m,
                                        status: y,
                                        statusText: C,
                                        url: _ || void 0
                                    })), r.complete()) : r.error(new n1({
                                        error: D,
                                        headers: m,
                                        status: y,
                                        statusText: C,
                                        url: _ || void 0
                                    }))
                                },
                                c = m => {
                                    const {
                                        url: y
                                    } = a(), C = new n1({
                                        error: m,
                                        status: o.status || 0,
                                        statusText: o.statusText || "Unknown Error",
                                        url: y || void 0
                                    });
                                    r.error(C)
                                };
                            let u = !1;
                            const h = m => {
                                    u || (r.next(a()), u = !0);
                                    let y = {
                                        type: Oe.DownloadProgress,
                                        loaded: m.loaded
                                    };
                                    m.lengthComputable && (y.total = m.total), "text" === n.responseType && o.responseText && (y.partialText = o.responseText), r.next(y)
                                },
                                g = m => {
                                    let y = {
                                        type: Oe.UploadProgress,
                                        loaded: m.loaded
                                    };
                                    m.lengthComputable && (y.total = m.total), r.next(y)
                                };
                            return o.addEventListener("load", l), o.addEventListener("error", c), o.addEventListener("timeout", c), o.addEventListener("abort", c), n.reportProgress && (o.addEventListener("progress", h), null !== i && o.upload && o.upload.addEventListener("progress", g)), o.send(i), r.next({
                                type: Oe.Sent
                            }), () => {
                                o.removeEventListener("error", c), o.removeEventListener("abort", c), o.removeEventListener("load", l), o.removeEventListener("timeout", c), n.reportProgress && (o.removeEventListener("progress", h), null !== i && o.upload && o.upload.removeEventListener("progress", g)), o.readyState !== o.DONE && o.abort()
                            }
                        })
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(lC))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const gf = new O("XSRF_ENABLED"),
                c1 = "XSRF-TOKEN",
                u1 = new O("XSRF_COOKIE_NAME", {
                    providedIn: "root",
                    factory: () => c1
                }),
                d1 = "X-XSRF-TOKEN",
                f1 = new O("XSRF_HEADER_NAME", {
                    providedIn: "root",
                    factory: () => d1
                });
            class h1 {}
            let qN = (() => {
                class e {
                    constructor(n, r, o) {
                        this.doc = n, this.platform = r, this.cookieName = o, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
                    }
                    getToken() {
                        if ("server" === this.platform) return null;
                        const n = this.doc.cookie || "";
                        return n !== this.lastCookieString && (this.parseCount++, this.lastToken = Yy(n, this.cookieName), this.lastCookieString = n), this.lastToken
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)(x(rt), x(Eu), x(u1))
                }, e.\u0275prov = A({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();

            function KN(e, t) {
                const n = e.url.toLowerCase();
                if (!K(gf) || "GET" === e.method || "HEAD" === e.method || n.startsWith("http://") || n.startsWith("https://")) return t(e);
                const r = K(h1).getToken(),
                    o = K(f1);
                return null != r && !e.headers.has(o) && (e = e.clone({
                    headers: e.headers.set(o, r)
                })), t(e)
            }
            var we = (() => ((we = we || {})[we.Interceptors = 0] = "Interceptors", we[we.LegacyInterceptors = 1] = "LegacyInterceptors", we[we.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", we[we.NoXsrfProtection = 3] = "NoXsrfProtection", we[we.JsonpSupport = 4] = "JsonpSupport", we[we.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", we))();

            function mo(e, t) {
                return {\
                    u0275kind: e,
                    \u0275providers: t
                }
            }

            function ZN(...e) {
                const t = [r1, l1, s1, {
                    provide: Ka,
                    useExisting: s1
                }, {
                    provide: df,
                    useExisting: l1
                }, {
                    provide: Li,
                    useValue: KN,
                    multi: !0
                }, {
                    provide: gf,
                    useValue: !0
                }, {
                    provide: h1,
                    useClass: qN
                }];
                for (const n of e) t.push(...n.\u0275providers);
                return function LD(e) {
                    return {\
                        u0275providers: e
                    }
                }(t)
            }
            const p1 = new O("LEGACY_INTERCEPTOR_FN");

            function QN({
                cookieName: e,
                headerName: t
            }) {
                const n = [];
                return void 0 !== e && n.push({
                    provide: u1,
                    useValue: e
                }), void 0 !== t && n.push({
                    provide: f1,
                    useValue: t
                }), mo(we.CustomXsrfConfiguration, n)
            }
            let XN = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({
                        providers: [ZN(mo(we.LegacyInterceptors, [{
                            provide: p1,
                            useFactory: UN
                        }, {
                            provide: Li,
                            useExisting: p1,
                            multi: !0
                        }]), QN({
                            cookieName: c1,
                            headerName: d1
                        }))]
                    }), e
                })(),
                g1 = (() => {
                    class e {
                        constructor(n) {
                            this.http = n
                        }
                        sendEmail(n, r) {
                            return this.http.post(n, r)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(r1))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })();

            function m1(e, t, n, r, o, i, s) {
                try {
                    var a = e[i](s),
                        l = a.value
                } catch (c) {
                    return void n(c)
                }
                a.done ? t(l) : Promise.resolve(l).then(r, o)
            }

            function mf(e) {
                return function() {
                    var t = this,
                        n = arguments;
                    return new Promise(function(r, o) {
                        var i = e.apply(t, n);

                        function s(l) {
                            m1(i, r, o, s, a, "next", l)
                        }

                        function a(l) {
                            m1(i, r, o, s, a, "throw", l)
                        }
                        s(void 0)
                    })
                }
            }

            function vf(e) {
                return xe((t, n) => {
                    Dt(e).subscribe(De(n, () => n.complete(), nl)), !n.closed && t.subscribe(n)
                })
            }
            const yf = new O("@sweetalert2/ngx-sweetalert2#swalProvider"),
                Cf = new O("@sweetalert2/ngx-sweetalert2#fireOnInit"),
                _f = new O("@sweetalert2/ngx-sweetalert2#dismissOnDestroy");
            let wf = (() => {
                    class e {
                        constructor(n) {
                            this.swalProvider = n
                        }
                        get swal() {
                            return this.swalPromiseCache || this.preloadSweetAlertLibrary(), this.swalPromiseCache
                        }
                        preloadSweetAlertLibrary() {
                            if (this.swalPromiseCache) return;
                            const n = function r(i) {
                                return "function" == typeof i && void 0 === i.version
                            }(this.swalProvider) ? this.swalProvider() : Promise.resolve(this.swalProvider);
                            this.swalPromiseCache = n.then(i => function o(i) {
                                return "function" == typeof i
                            }(i) ? i : i.default)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(x(yf))
                    }, e.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })(),
                bf = (() => {
                    class e {
                        constructor(n, r, o) {
                            this.sweetAlert2Loader = n, this.moduleLevelFireOnInit = r, this.moduleLevelDismissOnDestroy = o, this.willOpen = new J, this.didOpen = new J, this.didRender = new J, this.willClose = new J, this.didClose = new J, this.didDestroy = new J, this.confirm = new J, this.deny = new J, this.dismiss = new J, this.touchedProps = new Set, this.markTouched = this.touchedProps.add.bind(this.touchedProps), this.isCurrentlyShown = !1
                        }
                        set swalOptions(n) {
                            Object.assign(this, n), Object.keys(n).forEach(this.markTouched)
                        }
                        get swalOptions() {
                            return [...this.touchedProps].reduce((n, r) => ({ ...n,
                                [r]: this[r]
                            }), {})
                        }
                        set swalVisible(n) {
                            n ? this.fire() : this.close()
                        }
                        get swalVisible() {
                            return this.isCurrentlyShown
                        }
                        ngOnInit() {
                            this.sweetAlert2Loader.preloadSweetAlertLibrary()
                        }
                        ngAfterViewInit() {
                            (void 0 === this.swalFireOnInit ? this.moduleLevelFireOnInit : this.swalFireOnInit) && this.fire()
                        }
                        ngOnChanges(n) {
                            Object.keys(n).filter(r => !r.startsWith("swal")).forEach(this.markTouched), this.update()
                        }
                        ngOnDestroy() {
                            (void 0 === this.swalDismissOnDestroy ? this.moduleLevelDismissOnDestroy : this.swalDismissOnDestroy) && this.close()
                        }
                        fire() {
                            var n = this;
                            return mf(function*() {
                                const r = yield n.sweetAlert2Loader.swal, o = n.swalOptions, i = { ...o,
                                    willOpen: a(o.willOpen, l => {
                                        n.willOpen.emit({
                                            modalElement: l
                                        })
                                    }),
                                    didOpen: a(o.didOpen, l => {
                                        n.isCurrentlyShown = !0, n.didOpen.emit({
                                            modalElement: l
                                        })
                                    }),
                                    didRender: a(o.didRender, l => {
                                        n.didRender.emit({
                                            modalElement: l
                                        })
                                    }),
                                    willClose: a(o.willClose, l => {
                                        n.isCurrentlyShown = !1, n.willClose.emit({
                                            modalElement: l
                                        })
                                    }),
                                    didClose: a(o.didClose, () => {
                                        n.didClose.emit()
                                    }),
                                    didDestroy: a(o.didDestroy, () => {
                                        n.didDestroy.emit()
                                    })
                                }, s = yield r.fire(i);
                                switch (!0) {
                                    case s.isConfirmed:
                                        n.confirm.emit(s.value);
                                        break;
                                    case s.isDenied:
                                        n.deny.emit();
                                        break;
                                    case s.isDismissed:
                                        n.dismiss.emit(s.dismiss)
                                }
                                return s;

                                function a(l, c) {
                                    return (...u) => (c(...u), l ? .(...u))
                                }
                            })()
                        }
                        close(n) {
                            var r = this;
                            return mf(function*() {
                                r.isCurrentlyShown && (yield r.sweetAlert2Loader.swal).close(n)
                            })()
                        }
                        update(n) {
                            var r = this;
                            return mf(function*() {
                                if (n && (r.swalOptions = n), !r.isCurrentlyShown) return;
                                const o = yield r.sweetAlert2Loader.swal, i = r.swalOptions, s = Object.keys(i).filter(o.isUpdatableParameter).reduce((a, l) => ({ ...a,
                                    [l]: i[l]
                                }), {});
                                o.update(s)
                            })()
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(wf), w(Cf), w(_f))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["swal"]
                        ],
                        inputs: {
                            title: "title",
                            titleText: "titleText",
                            text: "text",
                            html: "html",
                            footer: "footer",
                            icon: "icon",
                            iconColor: "iconColor",
                            iconHtml: "iconHtml",
                            backdrop: "backdrop",
                            toast: "toast",
                            target: "target",
                            input: "input",
                            width: "width",
                            padding: "padding",
                            background: "background",
                            position: "position",
                            grow: "grow",
                            showClass: "showClass",
                            hideClass: "hideClass",
                            customClass: "customClass",
                            timer: "timer",
                            timerProgressBar: "timerProgressBar",
                            heightAuto: "heightAuto",
                            allowOutsideClick: "allowOutsideClick",
                            allowEscapeKey: "allowEscapeKey",
                            allowEnterKey: "allowEnterKey",
                            stopKeydownPropagation: "stopKeydownPropagation",
                            keydownListenerCapture: "keydownListenerCapture",
                            showConfirmButton: "showConfirmButton",
                            showDenyButton: "showDenyButton",
                            showCancelButton: "showCancelButton",
                            confirmButtonText: "confirmButtonText",
                            denyButtonText: "denyButtonText",
                            cancelButtonText: "cancelButtonText",
                            confirmButtonColor: "confirmButtonColor",
                            denyButtonColor: "denyButtonColor",
                            cancelButtonColor: "cancelButtonColor",
                            confirmButtonAriaLabel: "confirmButtonAriaLabel",
                            denyButtonAriaLabel: "denyButtonAriaLabel",
                            cancelButtonAriaLabel: "cancelButtonAriaLabel",
                            buttonsStyling: "buttonsStyling",
                            reverseButtons: "reverseButtons",
                            focusConfirm: "focusConfirm",
                            focusDeny: "focusDeny",
                            focusCancel: "focusCancel",
                            showCloseButton: "showCloseButton",
                            closeButtonHtml: "closeButtonHtml",
                            closeButtonAriaLabel: "closeButtonAriaLabel",
                            loaderHtml: "loaderHtml",
                            showLoaderOnConfirm: "showLoaderOnConfirm",
                            preConfirm: "preConfirm",
                            preDeny: "preDeny",
                            imageUrl: "imageUrl",
                            imageWidth: "imageWidth",
                            imageHeight: "imageHeight",
                            imageAlt: "imageAlt",
                            inputLabel: "inputLabel",
                            inputPlaceholder: "inputPlaceholder",
                            inputValue: "inputValue",
                            inputOptions: "inputOptions",
                            inputAutoTrim: "inputAutoTrim",
                            inputAttributes: "inputAttributes",
                            inputValidator: "inputValidator",
                            returnInputValueOnDeny: "returnInputValueOnDeny",
                            validationMessage: "validationMessage",
                            progressSteps: "progressSteps",
                            currentProgressStep: "currentProgressStep",
                            progressStepsDistance: "progressStepsDistance",
                            scrollbarPadding: "scrollbarPadding",
                            swalOptions: "swalOptions",
                            swalFireOnInit: "swalFireOnInit",
                            swalDismissOnDestroy: "swalDismissOnDestroy",
                            swalVisible: "swalVisible"
                        },
                        outputs: {
                            willOpen: "willOpen",
                            didOpen: "didOpen",
                            didRender: "didRender",
                            willClose: "willClose",
                            didClose: "didClose",
                            didDestroy: "didDestroy",
                            confirm: "confirm",
                            deny: "deny",
                            dismiss: "dismiss"
                        },
                        features: [gt],
                        decls: 0,
                        vars: 0,
                        template: function(n, r) {},
                        encapsulation: 2,
                        changeDetection: 0
                    }), e
                })(),
                JN = (() => {
                    class e {
                        constructor(n, r) {
                            this.viewContainerRef = n, this.resolver = r, this.confirm = new J, this.deny = new J, this.dismiss = new J
                        }
                        set swal(n) {
                            n instanceof bf ? this.swalInstance = n : function r(o) {
                                return Array.isArray(n)
                            }() ? (this.swalOptions = {}, [this.swalOptions.title, this.swalOptions.text, this.swalOptions.icon] = n) : this.swalOptions = n
                        }
                        ngOnInit() {
                            if (!this.swalInstance) {
                                const n = this.resolver.resolveComponentFactory(bf);
                                this.swalRef = this.viewContainerRef.createComponent(n), this.swalInstance = this.swalRef.instance
                            }
                        }
                        ngOnDestroy() {
                            this.swalRef && this.swalRef.destroy()
                        }
                        onClick(n) {
                            if (n.preventDefault(), n.stopImmediatePropagation(), n.stopPropagation(), !this.swalInstance) return;
                            this.swalOptions && (this.swalInstance.swalOptions = this.swalOptions);
                            const r = new Wt;
                            this.swalInstance.confirm.asObservable().pipe(vf(r)).subscribe(o => this.confirm.emit(o)), this.swalInstance.deny.asObservable().pipe(vf(r)).subscribe(o => this.deny.emit(o)), this.swalInstance.dismiss.asObservable().pipe(vf(r)).subscribe(o => this.dismiss.emit(o)), this.swalInstance.fire().then(() => r.next())
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Ot), w(Rr))
                    }, e.\u0275dir = V({
                        type: e,
                        selectors: [
                            ["", "swal", ""]
                        ],
                        hostBindings: function(n, r) {
                            1 & n && Q("click", function(i) {
                                return r.onClick(i)
                            })
                        },
                        inputs: {
                            swal: "swal"
                        },
                        outputs: {
                            confirm: "confirm",
                            deny: "deny",
                            dismiss: "dismiss"
                        }
                    }), e
                })();

            function e2() {
                return Vi.e(226).then(Vi.t.bind(Vi, 226, 19))
            }
            let t2 = (() => {
                class e {
                    static forRoot(n = {}) {
                        return {
                            ngModule: e,
                            providers: [wf, {
                                provide: yf,
                                useValue: n.provideSwal || e2
                            }, {
                                provide: Cf,
                                useValue: n.fireOnInit || !1
                            }, {
                                provide: _f,
                                useValue: n.dismissOnDestroy || !0
                            }]
                        }
                    }
                    static forChild(n = {}) {
                        return {
                            ngModule: e,
                            providers: [...n.provideSwal ? [wf, {
                                provide: yf,
                                useValue: n.provideSwal
                            }] : [], ...void 0 !== n.fireOnInit ? [{
                                provide: Cf,
                                useValue: n.fireOnInit
                            }] : [], ...void 0 !== n.dismissOnDestroy ? [{
                                provide: _f,
                                useValue: n.dismissOnDestroy
                            }] : []]
                        }
                    }
                }
                return e.\u0275fac = function(n) {
                    return new(n || e)
                }, e.\u0275mod = ft({
                    type: e
                }), e.\u0275inj = it({
                    imports: [iC]
                }), e
            })();

            function n2(e, t) {
                1 & e && (d(0, "div")(1, "strong"), p(2, " A required field "), f(), d(3, "span"), p(4, "*"), f()())
            }

            function r2(e, t) {
                if (1 & e && (d(0, "div", 39), nn(1, n2, 5, 0, "div", 40), f()), 2 & e) {
                    const n = Zo();
                    Ue(1), Te("ngIf", null == n.contactForm.controls.name.errors ? null : n.contactForm.controls.name.errors.required)
                }
            }

            function o2(e, t) {
                1 & e && (d(0, "div")(1, "strong"), p(2, " A required field "), f(), d(3, "span"), p(4, "*"), f()())
            }

            function i2(e, t) {
                1 & e && (d(0, "div")(1, "strong"), p(2, "Email must be a valid email address"), f()())
            }

            function s2(e, t) {
                if (1 & e && (d(0, "div", 39), nn(1, o2, 5, 0, "div", 40), nn(2, i2, 3, 0, "div", 40), f()), 2 & e) {
                    const n = Zo();
                    Ue(1), Te("ngIf", null == n.contactForm.controls.email.errors ? null : n.contactForm.controls.email.errors.required), Ue(1), Te("ngIf", null == n.contactForm.controls.email.errors ? null : n.contactForm.controls.email.errors.email)
                }
            }

            function a2(e, t) {
                1 & e && (d(0, "div")(1, "strong"), p(2, " A required field "), f(), d(3, "span"), p(4, "*"), f()())
            }

            function l2(e, t) {
                if (1 & e && (d(0, "div", 39), nn(1, a2, 5, 0, "div", 40), f()), 2 & e) {
                    const n = Zo();
                    Ue(1), Te("ngIf", null == n.contactForm.controls.subject.errors ? null : n.contactForm.controls.subject.errors.required)
                }
            }

            function c2(e, t) {
                1 & e && (d(0, "div")(1, "strong"), p(2, " A required field "), f(), d(3, "span"), p(4, "*"), f()())
            }

            function u2(e, t) {
                if (1 & e && (d(0, "div", 39), nn(1, c2, 5, 0, "div", 40), f()), 2 & e) {
                    const n = Zo();
                    Ue(1), Te("ngIf", null == n.contactForm.controls.message.errors ? null : n.contactForm.controls.message.errors.required)
                }
            }
            const Qa = function(e) {
                    return {
                        "is-invalid": e
                    }
                },
                v2 = ["carousel"],
                y2 = [{
                    path: "",
                    component: K_
                }, {
                    path: "home",
                    component: K_
                }, {
                    path: "enterprise",
                    component: ER
                }, {
                    path: "software",
                    component: SR
                }, {
                    path: "facilities",
                    component: IR
                }, {
                    path: "security",
                    component: PR
                }, {
                    path: "about",
                    component: OR
                }, {
                    path: "contact",
                    component: (() => {
                        class e {
                            constructor(n) {
                                this.emailService = n, this.disabled = !1, this.confirmButtonColor = "#0b91b8"
                            }
                            onSubmit() {
                                var n = new FormData;
                                n.append("name", this.contactForm.value.name), n.append("email", this.contactForm.value.email), n.append("subject", this.contactForm.value.subject), n.append("message", this.contactForm.value.message), console.log("Name: " + n.get("name")), console.log("Email: " + n.get("email")), console.log("Subject: " + n.get("subject")), console.log("Message: " + n.get("message"));
                                let r = {
                                    name: n.get("name"),
                                    from: n.get("email"),
                                    to: "sales@convergencesolutons.com",
                                    subject: n.get("subject"),
                                    text: `A contact mail sent from: ${n.get("name")} <${n.get("email")}> \n\n${n.get("message")}`
                                };
                                this.emailService.sendEmail("https://mailer.convergencesolutons.com/sendmail", r).subscribe(o => {
                                    console.log(`\u{1f44f} > ${r.from} has successfully sent an mail with message id: ${o.messageId}`), this.notice = "Thank you for reaching out", this.message = "We'll get back to you soon", this.resultIcon = "success"
                                }, o => {
                                    console.log(o), this.notice = "Oops", this.message = "Something went wrong...", this.resultIcon = "error"
                                })
                            }
                            ngOnInit() {
                                this.contactForm = new Ba({
                                    name: new go("", Ai.required),
                                    subject: new go("", Ai.required),
                                    email: new go("", [Ai.required, Ai.email]),
                                    message: new go("", Ai.required)
                                }), this.disabled = !(this.contactForm.value.name && this.contactForm.value.email && this.contactForm.value.subject && this.contactForm.value.message), this.contactForm.valueChanges.subscribe(() => {
                                    this.contactForm.invalid ? (this.disabled = !0, console.log("disabled")) : (this.disabled = !1, console.log("enabled"))
                                })
                            }
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)(w(g1))
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-contact"]
                            ],
                            decls: 67,
                            vars: 24,
                            consts: [
                                ["id", "go-to-up"],
                                [1, "map-location"],
                                [1, "map-container"],
                                ["src", "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d246.27260618308114!2d38.76092977493553!3d9.030731519803739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1696324295984!5m2!1sen!2set", "width", "100%", "height", "500", "allowfullscreen", "", "loading", "lazy", "referrerpolicy", "no-referrer-when-downgrade", 2, "border", "0"],
                                [1, "contact-section"],
                                [1, "row", "contact-row"],
                                [1, "col-4", "col-sm-4", "col-md-4", "col-lg-4", "contact-info"],
                                [1, "list-group", "list-unstyled"],
                                [1, "list-group-item", "borderless"],
                                [1, "contact-headline"],
                                [1, "fa-sharp", "fa-solid", "fa-phone-volume"],
                                [1, "list-group-item-name"],
                                [1, "fa-sharp", "fa-solid", "fa-envelope"],
                                [1, "fa-light", "fa-solid", "fa-globe"],
                                [1, "fa-solid", "fa-location-dot"],
                                [1, "col", "col-sm-*", "col-md-*", "col-lg-*"],
                                [1, "hr-info"],
                                [1, "mb-4", "social-buttons"],
                                ["href", "#", "role", "button", 1, "btn", "btn-outline-light", "btn-floating", "m-1"],
                                [1, "fa-brands", "fa-facebook"],
                                [1, "fa-brands", "fa-twitter"],
                                [1, "fa-brands", "fa-google"],
                                [1, "fa-brands", "fa-instagram"],
                                [1, "fa-brands", "fa-linkedin-in"],
                                [1, "fa-brands", "fa-github"],
                                [1, "col-2", "col-sm-2", "col-md-2", "col-lg-2"],
                                [1, "col-6", "col-sm-6", "col-md-6", "col-lg-6", "contact-form"],
                                ["novalidate", "", 3, "formGroup", "ngSubmit"],
                                [1, "form-group"],
                                ["type", "text", "id", "name-controller", "placeholder", "Full Name", "formControlName", "name", 1, "form-control", 3, "ngClass"],
                                ["class", "invalid-feedback", 4, "ngIf"],
                                ["type", "email", "id", "email-controller", "placeholder", "Email", "formControlName", "email", 1, "form-control", 3, "ngClass"],
                                ["type", "text", "id", "subject-controller", "placeholder", "Subject", "formControlName", "subject", 1, "form-control", 3, "ngClass"],
                                ["rows", "7", "id", "message-controller", "placeholder", "Your message...", "formControlName", "message", 1, "form-control", "textarea", 3, "ngClass"],
                                [1, "form-group", "submit"],
                                ["type", "button", 1, "btn", "btn-primary", "submit-btn", 3, "swal", "disabled"],
                                [3, "click"],
                                [3, "title", "text", "icon", "confirmButtonColor", "showCancelButton"],
                                ["confirmation", ""],
                                [1, "invalid-feedback"],
                                [4, "ngIf"]
                            ],
                            template: function(n, r) {
                                if (1 & n && (v(0, "section", 0), d(1, "section", 1)(2, "div", 2), v(3, "iframe", 3), f()(), d(4, "section", 4)(5, "div", 5)(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "h3", 9), p(10, " Contact Information "), f()(), d(11, "li", 8), v(12, "i", 10), d(13, "span", 11), p(14, " +251920343154 "), f()(), d(15, "li", 8), v(16, "i", 12), d(17, "span", 11), p(18, " sales@convergencesolutons.com "), f()(), d(19, "li", 8), v(20, "i", 13), d(21, "span", 11), p(22, " www.convergencesolutons.com "), f()(), d(23, "li", 8), v(24, "i", 14), d(25, "span", 11), p(26, " Yewengel Building 1st Floor, Arat kilo infront of FDRE Ministry of Trade"), f()()(), d(27, "div", 15)(28, "div", 16), v(29, "hr"), f(), d(30, "div", 17)(31, "a", 18), v(32, "i", 19), f(), d(33, "a", 18), v(34, "i", 20), f(), d(35, "a", 18), v(36, "i", 21), f(), d(37, "a", 18), v(38, "i", 22), f(), d(39, "a", 18), v(40, "i", 23), f(), d(41, "a", 18), v(42, "i", 24), f()()()(), v(43, "div", 25), d(44, "div", 26)(45, "form", 27), Q("ngSubmit", function() {
                                        return r.onSubmit()
                                    }), d(46, "div", 28)(47, "h3", 9), p(48, " Leave us a message "), f()(), d(49, "div", 28), v(50, "input", 29), nn(51, r2, 2, 1, "div", 30), f(), d(52, "div", 28), v(53, "input", 31), nn(54, s2, 3, 2, "div", 30), f(), d(55, "div", 28), v(56, "input", 32), nn(57, l2, 2, 1, "div", 30), f(), d(58, "div", 28), v(59, "textarea", 33), nn(60, u2, 2, 1, "div", 30), f(), d(61, "div", 34)(62, "button", 35)(63, "a", 36), Q("click", function() {
                                        return r.onSubmit()
                                    }), p(64, " Submit "), f()()(), v(65, "swal", 37, 38), f()()()()), 2 & n) {
                                    const o = function Yg(e) {
                                        return function br(e, t) {
                                            return e[t]
                                        }(function U0() {
                                            return B.lFrame.contextLView
                                        }(), 22 + e)
                                    }(66);
                                    Ue(45), Te("formGroup", r.contactForm), Ue(5), Te("ngClass", ri(16, Qa, (r.contactForm.controls.name.dirty || r.contactForm.controls.name.touched) && r.contactForm.controls.name.errors)), Ue(1), Te("ngIf", r.contactForm.controls.name.invalid && (r.contactForm.controls.name.dirty || r.contactForm.controls.name.touched)), Ue(2), Te("ngClass", ri(18, Qa, (r.contactForm.controls.email.dirty || r.contactForm.controls.email.touched) && r.contactForm.controls.email.errors)), Ue(1), Te("ngIf", r.contactForm.controls.email.invalid && (r.contactForm.controls.email.dirty || r.contactForm.controls.email.touched)), Ue(2), Te("ngClass", ri(20, Qa, (r.contactForm.controls.subject.dirty || r.contactForm.controls.subject.touched) && r.contactForm.controls.subject.errors)), Ue(1), Te("ngIf", r.contactForm.controls.subject.invalid && (r.contactForm.controls.subject.dirty || r.contactForm.controls.subject.touched)), Ue(2), Te("ngClass", ri(22, Qa, (r.contactForm.controls.message.dirty || r.contactForm.controls.message.touched) && r.contactForm.controls.message.errors)), Ue(1), Te("ngIf", r.contactForm.controls.message.invalid && (r.contactForm.controls.message.dirty || r.contactForm.controls.message.touched)), Ue(2), Te("swal", o)("disabled", r.disabled), Ue(3), Yo("title", r.notice), Yo("text", r.message), Yo("confirmButtonColor", r.confirmButtonColor), Te("icon", r.resultIcon)("showCancelButton", !1)
                                }
                            },
                            dependencies: [bf, JN, Xu, tC, tf, Ra, _w, Gd, qa, af],
                            styles: [".contact-section[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 1em 10em}.map-location[_ngcontent-%COMP%]{margin-top:1em;margin-bottom:3em;padding:2em;width:100%;height:100%}.map-container[_ngcontent-%COMP%]{width:100%;height:100%}.form-group[_ngcontent-%COMP%]{padding:.5em}.form-control[_ngcontent-%COMP%]{width:100%;height:4em;padding:1em;border:none;box-shadow:0 10px 20px #0000001f,0 4px 8px #0000000f;color:gray}.textarea[_ngcontent-%COMP%]{height:10em}li.borderless[_ngcontent-%COMP%]{border:0 none;padding:.5em}.list-group-item[_ngcontent-%COMP%]{justify-content:left}.list-group-item-name[_ngcontent-%COMP%]{padding-left:1em;color:gray}.contact-info[_ngcontent-%COMP%]{padding-top:2em;padding-right:5em}.submit-btn[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:40%;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#fff;border:2px solid #0b91b8;border-radius:40px;transition:all .3s ease 0s;font-size:16px}.submit-btn[_ngcontent-%COMP%]:hover{background-color:#0b91b8;color:#fff;border:none}.btn-floating[_ngcontent-%COMP%]{background-color:transparent;border:none}.fa-facebook[_ngcontent-%COMP%]{color:#3b5998}.fa-twitter[_ngcontent-%COMP%]{color:#00aced}.fa-google[_ngcontent-%COMP%]{color:#dd4b39}.fa-linkedin-in[_ngcontent-%COMP%]{color:#007bb6}.fa-instagram[_ngcontent-%COMP%]{color:#517fa4}.fa-github[_ngcontent-%COMP%]{color:#000}.fa-facebook[_ngcontent-%COMP%], .fa-twitter[_ngcontent-%COMP%], .fa-google[_ngcontent-%COMP%], .fa-linkedin-in[_ngcontent-%COMP%], .fa-instagram[_ngcontent-%COMP%], .fa-github[_ngcontent-%COMP%]{font-size:16px;margin:0 auto}.hr-info[_ngcontent-%COMP%]{width:50%;padding-top:3em}.fa-phone-volume[_ngcontent-%COMP%], .fa-envelope[_ngcontent-%COMP%], .fa-globe[_ngcontent-%COMP%], .fa-location-dot[_ngcontent-%COMP%]{color:#0b91b8}@media only screen and (max-width: 768px){.map-location[_ngcontent-%COMP%]{margin-top:3em;padding:1em;width:100%;height:100%}.contact-section[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em}.map-container[_ngcontent-%COMP%]{width:100%;height:100%}.contact-headline[_ngcontent-%COMP%]{text-align:center;padding-top:2.5em}.hr-info[_ngcontent-%COMP%], .social-buttons[_ngcontent-%COMP%]{margin:0 auto}.submit[_ngcontent-%COMP%]{text-align:center}.contact-row[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:2em}.contact-form[_ngcontent-%COMP%], .contact-info[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.list-group-item[_ngcontent-%COMP%]{font-size:18px}.list-group[_ngcontent-%COMP%]{margin:0 auto}.submit-btn[_ngcontent-%COMP%]{height:3em;width:60%}}"]
                        }), e
                    })()
                }, {
                    path: "consultants",
                    component: (() => {
                        class e {
                            constructor() {}
                            ngOnInit() {}
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-consultation"]
                            ],
                            decls: 19,
                            vars: 0,
                            consts: [
                                ["id", "go-to-up"],
                                [1, "container-fluid"],
                                [1, "row", "front-row"],
                                ["id", "right-side", 1, "col", "front-col"],
                                [1, "headline"],
                                ["id", "welcome-text"],
                                [1, "col", "front-col"],
                                ["src", "https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg", "alt", "dcf", "width", "500em", "height", "400em", 1, "front-page-image"],
                                [1, "contact-section"],
                                [1, "col"],
                                [1, "text-center", "headline-4"],
                                [1, "col", "text-center"],
                                ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                                ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"]
                            ],
                            template: function(n, r) {
                                1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " Business and Technology Consultation "), f(), v(6, "br"), d(7, "p", 5), p(8, " IT consulting services we provide are advisory services that assist clients in evaluating various technological strategies and, as a result, coordinating their technological strategies with their business or process plans. These services provide strategic, architectural, operational, and implementation planning to assist customers' IT initiatives. Strategic planning entails advising services that assist clients in determining their IT requirements and creating plans for system implementation. The logical architecture of the system and the supporting infrastructure are created using advisory services that incorporate strategic plans and knowledge of cutting-edge technologies to satisfy customer requirements. Services that examine the operational effectiveness and capability of a client's IT infrastructure are included in operational assessment/benchmarking. Services aimed at advising clients on the deployment and testing of new solutions are included in implementation planning. By optimizing the ability to match technology with the business demands and opportunities that are continually emerging, Convergence IT Solutions, as IT consultant, can provide value to you. "), f()(), d(9, "div", 6), v(10, "img", 7), f()()(), d(11, "section", 8)(12, "div", 9)(13, "h1", 10), p(14, " Meet our experts who provide quality consultancy service "), f(), d(15, "div", 11)(16, "button", 12)(17, "a", 13), p(18, " Contact Us "), f()()()()())
                            },
                            dependencies: [Ze, ut],
                            styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100%}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:16px;margin-top:4em;margin-bottom:5em}.headline[_ngcontent-%COMP%]{font-size:2em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px;padding-bottom:.3em}.contact-section[_ngcontent-%COMP%]{padding-top:4em;margin-bottom:5em;width:100%;height:40vh;background-color:#0b91b8}@media only screen and (max-width: 768px){.container-fluid[_ngcontent-%COMP%]{height:100%}.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}}']
                        }), e
                    })()
                }, {
                    path: "projects",
                    component: (() => {
                        class e {
                            constructor(n) {
                                this.viewPortScroller = n
                            }
                            ngOnInit() {}
                            onClick(n) {
                                this.viewPortScroller.scrollToAnchor(n)
                            }
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)(w(Tt))
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-projects"]
                            ],
                            decls: 185,
                            vars: 0,
                            consts: [
                                ["id", "go-to-up"],
                                [1, "container-fluid"],
                                [1, "row", "front-row"],
                                ["id", "right-side", 1, "col", "front-col"],
                                [1, "headline"],
                                ["id", "welcome-text"],
                                [1, "learn-more", "btn", "btn-primary"],
                                [3, "click"],
                                [1, "col", "front-col"],
                                ["src", "https://img.freepik.com/free-vector/time-management-concept-illustration_114360-1013.jpg?w=2000", "alt", "dcf", "width", "700em", "height", "500em", 1, "front-page-image"],
                                [1, "contact-section"],
                                [1, "col"],
                                [1, "text-center", "headline-4"],
                                [1, "col", "text-center"],
                                ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                                ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                                ["id", "direct-element", 1, "grid"],
                                ["routerLink", "/projects/wollo-smart-classroom", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "card-button"],
                                [1, "row", "projects-row"],
                                [1, "card", "projects-card-img"],
                                ["src", "https://img.freepik.com/free-vector/group-video-concept-illustration_114360-4952.jpg", "alt", "...", 1, "card-img-service"],
                                [1, "card", "projects-card-text"],
                                [1, "fs-2"],
                                ["id", "projects-text"],
                                [1, "row", "projects-row", "row-even"],
                                ["src", "https://img.freepik.com/free-vector/remote-meeting-concept-illustration_114360-4614.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/flat-business-online-education-elearning-home-concept-webinar-video-training-tutorial-podcast-coaching-outline-design-style-minimal-vector-illustration_269730-1821.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/video-conferencing-home-man-having-video-call-meeting-with-clients-home-greeting-messages-many-different-written-languages_218660-169.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/isometric-illustration-concept-team-is-analyzing-server-data-security_18660-1813.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/computer-network-server-data_18660-1567.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/free-vector/hand-drawn-flat-design-ransomware-illustration_23-2149373423.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/video-calling-online-conference-internet-call-business-chat-group-people-have-distance-discussion-web-meeting-digital-webinar-illustration-remote-education-vector-concept_53562-13812.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://cdni.iconscout.com/illustration/premium/thumb/parcel-distribution-5365229-4500192.png", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/free-vector/isometric-learning-process-university-template-with-students-studying-brainstorming-classroom-isolated_1284-39077.jpg?w=740&t=st=1695037873~exp=1695038473~hmac=fc03ce917168a03b03097549fc9fd34b2c69d8fe376458636f7f3cc19b077b5c", "alt", "...", 1, "card-img-service"]
                            ],
                            template: function(n, r) {
                                1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " Projects "), f(), v(6, "br"), d(7, "p", 5), p(8, " We have completed several projects with best quality, sharp project management, and priceless dedication of our experts. View a list of the projects we finished for the public and private sectors across different industries. "), f(), d(9, "button", 6)(10, "a", 7), Q("click", function() {
                                    return r.onClick("direct-element")
                                }), p(11, " Learn more "), f()()(), d(12, "div", 8), v(13, "img", 9), f()()(), d(14, "section", 10)(15, "div", 11)(16, "h1", 12), p(17, " Would you like to start a project with us? "), f(), d(18, "div", 13)(19, "button", 14)(20, "a", 15), p(21, " Contact Us "), f()()()()(), d(22, "div", 16)(23, "a", 17)(24, "div", 18)(25, "div", 11)(26, "div", 19), v(27, "img", 20), f()(), d(28, "div", 11)(29, "div", 21)(30, "p", 22), p(31, " Mekdela Amba University "), f(), d(32, "p", 23)(33, "strong"), p(34, " Project deliverable: "), f(), p(35, " Network Infrastructure Upgrade, Microsoft Teams, and Zoom Licensing "), f(), d(36, "p", 23)(37, "strong"), p(38, " Project Size: "), f(), p(39, " 1M+ ETB "), f()()()()(), d(40, "div", 24)(41, "div", 11)(42, "div", 21)(43, "p", 22), p(44, " CDT Africa "), f(), d(45, "p", 23)(46, "strong"), p(47, " Project deliverable: "), f(), p(48, " Video Conferencing "), f(), d(49, "p", 23)(50, "strong"), p(51, " Project Size: "), f(), p(52, " 1M+ ETB "), f()()(), d(53, "div", 11)(54, "div", 19), v(55, "img", 25), f()()(), d(56, "div", 18)(57, "div", 11)(58, "div", 19), v(59, "img", 26), f()(), d(60, "div", 11)(61, "div", 21)(62, "p", 22), p(63, " Wachemo University "), f(), d(64, "p", 23)(65, "strong"), p(66, " Project deliverable: "), f(), p(67, " VDI And Smart Education System "), f(), d(68, "p", 23)(69, "strong"), p(70, " Project Size: "), f(), p(71, " 1M+ ETB "), f()()()(), d(72, "div", 24)(73, "div", 11)(74, "div", 21)(75, "p", 22), p(76, " Radisson Blu"), f(), d(77, "p", 23)(78, "strong"), p(79, " Project deliverable: "), f(), p(80, " Video Conferencing and Virtual Platform Supply and Installation "), f(), d(81, "p", 23)(82, "strong"), p(83, " Project Size: "), f(), p(84, " 1M ETB "), f()()(), d(85, "div", 11)(86, "div", 19), v(87, "img", 27), f()()(), d(88, "div", 18)(89, "div", 11)(90, "div", 19), v(91, "img", 28), f()(), d(92, "div", 11)(93, "div", 21)(94, "p", 22), p(95, " Office Of Federal Auditor General "), f(), d(96, "p", 23)(97, "strong"), p(98, " Project deliverable: "), f(), p(99, " Network Operation Center And Virtual Management Platform Supply "), f(), d(100, "p", 23)(101, "strong"), p(102, " Project Size: "), f(), p(103, " 1M+ ETB "), f()()()(), d(104, "div", 24)(105, "div", 11)(106, "div", 21)(107, "p", 22), p(108, " National Disaster and Risk Management Center "), f(), d(109, "p", 23)(110, "strong"), p(111, " Project deliverable: "), f(), p(112, " Data Center, Storage and Backup & Anti-virus "), f(), d(113, "p", 23)(114, "strong"), p(115, " Project Size: "), f(), p(116, " 1M ETB "), f()()(), d(117, "div", 11)(118, "div", 19), v(119, "img", 29), f()()(), d(120, "div", 18)(121, "div", 11)(122, "div", 19), v(123, "img", 30), f()(), d(124, "div", 11)(125, "div", 21)(126, "p", 22), p(127, " United Nation Development Program (UNDP) "), f(), d(128, "p", 23)(129, "strong"), p(130, " Project deliverable: "), f(), p(131, " Anti-Virus installation and commissioning "), f(), d(132, "p", 23)(133, "strong"), p(134, " Project Size: "), f(), p(135, " 1M+ ETB "), f()()()(), d(136, "div", 24)(137, "div", 11)(138, "div", 21)(139, "p", 22), p(140, " Asian Disaster Preparedness Center "), f(), d(141, "p", 23)(142, "strong"), p(143, " Project deliverable: "), f(), p(144, " Network and Video Conferencing "), f(), d(145, "p", 23)(146, "strong"), p(147, " Project Size: "), f(), p(148, " 1M ETB "), f()()(), d(149, "div", 11)(150, "div", 19), v(151, "img", 31), f()()(), d(152, "div", 18)(153, "div", 11)(154, "div", 19), v(155, "img", 32), f()(), d(156, "div", 11)(157, "div", 21)(158, "p", 22), p(159, " Woldia University "), f(), d(160, "p", 23)(161, "strong"), p(162, " Project deliverable: "), f(), p(163, " Supply of ICT Materials "), f(), d(164, "p", 23)(165, "strong"), p(166, " Project Size: "), f(), p(167, " 1M+ ETB "), f()()()(), d(168, "a", 17)(169, "div", 24)(170, "div", 11)(171, "div", 21)(172, "p", 22), p(173, " Wollo University "), f(), d(174, "p", 23)(175, "strong"), p(176, " Project deliverable: "), f(), p(177, " Smart Classroom Installation, Configuration and Testing "), f(), d(178, "p", 23)(179, "strong"), p(180, " Project Size: "), f(), p(181, " 30M+ ETB "), f()()(), d(182, "div", 11)(183, "div", 19), v(184, "img", 33), f()()()()())
                            },
                            dependencies: [Ze, ut],
                            styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}#right-side[_ngcontent-%COMP%]{margin-top:-5em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#projects-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:2px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}.projects-card-img[_ngcontent-%COMP%]{width:25em;height:25em;margin:0 auto;padding:2em;border:none}.projects-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.projects-row[_ngcontent-%COMP%]{padding-top:2em;z-index:1}.projects-row[_ngcontent-%COMP%]:hover{border:none;box-shadow:0 10px 20px #0000001f,0 4px 8px #0000000f;opacity:.6}.card-button[_ngcontent-%COMP%]{text-decoration:none}.banner-content[_ngcontent-%COMP%]{display:none;width:50px;height:auto;margin:0 auto;position:relative;top:5px;left:10px}.card-button[_ngcontent-%COMP%]:hover   .banner-content[_ngcontent-%COMP%]{display:block}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px;padding:.5em}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2 em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center;margin-top:8em}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;padding:.5em}.container-fluid[_ngcontent-%COMP%]{width:100%;height:100%;margin-top:2em;margin-bottom:3em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.projects-row[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column}.projects-card-text[_ngcontent-%COMP%]{text-align:center}#projects-text[_ngcontent-%COMP%]{text-align:justify;padding-left:1em;padding-right:1em;font-size:16px}}']
                        }), e
                    })()
                }, {
                    path: "trainings",
                    component: (() => {
                        class e {
                            constructor() {}
                            ngOnInit() {}
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-trainings"]
                            ],
                            decls: 18,
                            vars: 0,
                            consts: [
                                [1, "container-fluid"],
                                [1, "row", "front-row"],
                                ["id", "right-side", 1, "col", "front-col"],
                                [1, "headline"],
                                ["id", "welcome-text"],
                                [1, "col", "front-col"],
                                ["src", "https://img.freepik.com/free-vector/scientists-studying-neural-connections-programmers-writing-codes-machine-brain_74855-14157.jpg?w=2000", "alt", "dcf", "width", "600em", "height", "400em", 1, "front-page-image"],
                                [1, "contact-section"],
                                [1, "col"],
                                [1, "text-center", "headline-4"],
                                [1, "col", "text-center"],
                                ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                                ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"]
                            ],
                            template: function(n, r) {
                                1 & n && (d(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3), p(4, " IT Trainings "), f(), v(5, "br"), d(6, "p", 4), p(7, " Convergence offers targeted, concentrated courses on how to employ technology in your company. Our professionals offer programs that particularly target the challenges vital to your company, from sporadic lunch-and-learns to comprehensive IT training courses. These courses can be tailored to your entire employees, particular teams, or departments. Our team of experts in technical training services gives consumers the know-how to promote technology adoption and consumption, which boosts employee productivity. Our customised approach to learning adapts training based on the time constraints and learning objectives of your organization, frequently creating micro-sessions in addition to our specialized on-demand and on-site choices. "), f()(), d(8, "div", 5), v(9, "img", 6), f()()(), d(10, "section", 7)(11, "div", 8)(12, "h1", 9), p(13, " Finding the right Training solution for your needs? "), f(), d(14, "div", 10)(15, "button", 11)(16, "a", 12), p(17, " Contact Us "), f()()()()())
                            },
                            dependencies: [Ze, ut],
                            styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:16px;margin-top:4.5em}.headline[_ngcontent-%COMP%]{font-size:2em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:2px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:30px;padding-bottom:.3em}.contact-section[_ngcontent-%COMP%]{padding-top:4em;margin-bottom:5em;width:100%;height:40vh;background-color:#0b91b8}@media only screen and (max-width: 768px){.container-fluid[_ngcontent-%COMP%]{height:100%}.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}}']
                        }), e
                    })()
                }, {
                    path: "data-center",
                    component: (() => {
                        class e {
                            constructor(n) {
                                this.viewPortScroller = n
                            }
                            ngOnInit() {}
                            onClick(n) {
                                this.viewPortScroller.scrollToAnchor(n)
                            }
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)(w(Tt))
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-datacenter"]
                            ],
                            decls: 63,
                            vars: 0,
                            consts: [
                                ["id", "go-to-up"],
                                [1, "container-fluid"],
                                [1, "row", "front-row"],
                                ["id", "right-side", 1, "col", "front-col"],
                                [1, "headline"],
                                ["id", "welcome-text"],
                                [1, "learn-more", "btn", "btn-primary"],
                                [3, "click"],
                                [1, "col", "front-col"],
                                ["src", "https://img.freepik.com/free-vector/data-management-collective-database-tower-people-share-commonplace-centralized-mainframe-widespread-info-stored-files-custom-regulation-vector-isolated-concept-metaphor-illustration_335657-2129.jpg", "alt", "dcf", "width", "600em", "height", "500em", 1, "front-page-image"],
                                [1, "contact-section"],
                                [1, "col"],
                                [1, "text-center", "headline-4"],
                                [1, "col", "text-center"],
                                ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                                ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                                ["id", "direct-element", 1, "grid"],
                                [1, "row", "datacenter-solutions-row"],
                                [1, "card", "solutions-card-img"],
                                ["src", "https://img.freepik.com/premium-vector/cloud-computing-technology-isometric-concept-with-computer-laptop-mobile-phone-tablet-shield-icons-security-cloud-storage-server-big-data-processing-isolated-vector-illustration_108855-3601.jpg", "alt", "...", 1, "card-img-service"],
                                [1, "card", "solutions-card-text"],
                                [1, "fs-2"],
                                ["id", "solution-text"],
                                [1, "row", "datacenter-solutions-row", "row-even"],
                                ["src", "https://img.freepik.com/premium-vector/desktop-cloud-server-email-data-transfer_18660-2824.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://www.asia-net.com.hk/wp-content/uploads/2021/03/Group-3413.png", "alt", "...", 1, "card-img-service"],
                                ["src", "https://sue.eu/sueeuv2/wp-content/uploads/sites/5/2022/07/1200x1200-isometric-sue-04.png", "alt", "...", "width", "550em", "height", "600em", 1, "card-img-service"]
                            ],
                            template: function(n, r) {
                                1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " Datacenter Facility "), f(), v(6, "br"), d(7, "p", 5), p(8, " Our knowledgeable specialists use the most recent technology, such as data centers with sustainable power supply, whether they are for corporate, modular, edge, or hyperscale data facilities. Resilient data centers that can function in the worst conditions start with reliable and strong backup power lowering the risk of downtime, equipment damage, and environmental catastrophes, saving money and maintaining data flow. Data center facilities design and implementation, data center facilities consulting services that produce hybrid infrastructure-ready data centers as an integrated part of IT strategy, and enable company growth and change with strategic data center planning are just a few of the services we offer. "), f(), d(9, "button", 6)(10, "a", 7), Q("click", function() {
                                    return r.onClick("direct-element")
                                }), p(11, " Learn more "), f()()(), d(12, "div", 8), v(13, "img", 9), f()()(), d(14, "section", 10)(15, "div", 11)(16, "h1", 12), p(17, " Unlock the true potential of your network and improve customer experience "), f(), d(18, "div", 13)(19, "button", 14)(20, "a", 15), p(21, " Contact Us "), f()()()()(), d(22, "div", 16)(23, "div", 17)(24, "div", 11)(25, "div", 18), v(26, "img", 19), f()(), d(27, "div", 11)(28, "div", 20)(29, "p", 21), p(30, " Computing and Storage "), f(), d(31, "p", 22), p(32, " The infrastructure needed to support today's apps and workloads must be elastic, scalable, optimized, and cloud-compatible. A new generation of virtualization, storage, and computing technologies emerged in response to these urgent needs. Your organization's applications and data should be powered by storage and computing resources, which provide accessibility, availability, and the integrity of crucial information assets whether on-premises or in the cloud. Scalability and elastic storage capacity are needed to keep up with the exponential growth of data. Agility is also needed due to increased application demands. We offer converged infrastructures, integrated storage, hybrid and multi-cloud computing, and business-driven IT solutions to meet your demand. "), f()()()(), d(33, "div", 23)(34, "div", 11)(35, "div", 20)(36, "p", 21), p(37, " Desktop virtualization and Converged Infrastructure "), f(), d(38, "p", 22), p(39, " IT businesses can more efficiently manage resources and respond rapidly to shifting workload demand by implementing virtualization, which decouples data and programs from the physical resources on which they run. By reducing the number of physical servers needed to run applications and handle workloads, virtualization aids enterprises in lowering total cost of ownership. Additionally, it increases the effectiveness of those computer resources, improving application performance. "), f()()(), d(40, "div", 11)(41, "div", 18), v(42, "img", 24), f()()(), d(43, "div", 17)(44, "div", 11)(45, "div", 18), v(46, "img", 25), f()(), d(47, "div", 11)(48, "div", 20)(49, "p", 21), p(50, " Application Delivery and Load Balancing "), f(), d(51, "p", 22), p(52, " If your company uses commercial apps from well-known suppliers, you must provide lightning-fast response times, round-the-clock accessibility, easy access from many locations, and trustworthy enterprise network security. With a distinctive range of products, convergence enables you to address these needs. You may streamline operations while assuring resilience with the help of our load balancing and application delivery solutions. They offer an application-aware, future-proof method of installing and managing apps. To guarantee mission-critical applications' 24/7 availability, performance, and security, they offer sophisticated and all-encompassing application capabilities. "), f()()()(), d(53, "div", 23)(54, "div", 11)(55, "div", 20)(56, "p", 21), p(57, " Cloud Automation and Orchestration "), f(), d(58, "p", 22), p(59, " The practice of automating the procedures required to manage connections and operations of workloads on private and public clouds is known as cloud orchestration. To carry out particular business operations, cloud orchestration solutions include automated tasks and procedures into a workflow. You can do away with the manual tasks that slow you down with our IaaS, PaaS, and IaaS services. Your team can offer the infrastructure, software, and services that drive your business more quickly and intelligently with Convergence. Reduce friction and speed up creativity by completing time-consuming requests in minutes as opposed to days. "), f()()(), d(60, "div", 11)(61, "div", 18), v(62, "img", 26), f()()()())
                            },
                            dependencies: [Ze, ut],
                            styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#solution-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:2px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}.solutions-card-img[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:2em;border:none}.solutions-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.datacenter-solutions-row[_ngcontent-%COMP%]{padding-top:2em}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.datacenter-solutions-row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .enterprise-col[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.solutions-card-text[_ngcontent-%COMP%]{text-align:center}#solution-text[_ngcontent-%COMP%]{text-align:justify;padding:.5em;font-size:16px}}']
                        }), e
                    })()
                }, {
                    path: "cloud",
                    component: (() => {
                        class e {
                            constructor(n) {
                                this.viewPortScroller = n
                            }
                            ngOnInit() {}
                            onClick(n) {
                                this.viewPortScroller.scrollToAnchor(n)
                            }
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)(w(Tt))
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-cloud"]
                            ],
                            decls: 63,
                            vars: 0,
                            consts: [
                                ["id", "go-to-up"],
                                [1, "container-fluid"],
                                [1, "row", "front-row"],
                                ["id", "right-side", 1, "col", "front-col"],
                                [1, "headline"],
                                ["id", "welcome-text"],
                                [1, "learn-more", "btn", "btn-primary"],
                                [3, "click"],
                                [1, "col", "front-col"],
                                ["src", "https://img.freepik.com/premium-vector/solution-cloud-server-analysis-process_18660-3064.jpg?w=2000", "alt", "dcf", "width", "600em", "height", "500em", 1, "front-page-image"],
                                [1, "contact-section"],
                                [1, "col"],
                                [1, "text-center", "headline-4"],
                                [1, "col", "text-center"],
                                ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                                ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                                ["id", "direct-element", 1, "grid"],
                                [1, "row", "enterprise-solutions-row"],
                                [1, "card", "solutions-card-img"],
                                ["src", "https://thumbs.dreamstime.com/b/tiny-people-testing-quality-assurance-software-tiny-people-testing-quality-assurance-software-isolated-flat-vector-199136390.jpg", "alt", "...", 1, "card-img-service"],
                                [1, "card", "solutions-card-text"],
                                [1, "fs-2"],
                                ["id", "solution-text"],
                                [1, "row", "enterprise-solutions-row", "row-even"],
                                ["src", "https://img.freepik.com/free-vector/hand-drawn-flat-design-erp-illustration_23-2149383351.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/cyber-security-vector-logo-with-shield-check-mark-security-shield-concept_100456-3688.jpg", "alt", "...", 1, "card-img-service"],
                                ["src", "https://img.freepik.com/premium-vector/isp-internet-service-provider-illustration-with-keywords-icons-intranet-access-secure_2175-6119.jpg", "alt", "...", 1, "card-img-service"]
                            ],
                            template: function(n, r) {
                                1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4), p(5, " Cloud managed solutions "), f(), v(6, "br"), d(7, "p", 5), p(8, " Managed cloud services provide full or partial administration of a client's cloud infrastructure or resources. Migration, security, configuration, optimization, and maintenance are all examples of management duties. These services are created to help enterprises get the most out of cloud computing while spending the least amount of time and money internally. We offer services for cloud integration and resource efficiency. "), f(), d(9, "button", 6)(10, "a", 7), Q("click", function() {
                                    return r.onClick("direct-element")
                                }), p(11, " Learn more "), f()()(), d(12, "div", 8), v(13, "img", 9), f()()(), d(14, "section", 10)(15, "div", 11)(16, "h1", 12), p(17, " Manage your IT Infrastructure with our Cloud Solutions "), f(), d(18, "div", 13)(19, "button", 14)(20, "a", 15), p(21, " Contact Us "), f()()()()(), d(22, "div", 16)(23, "div", 17)(24, "div", 11)(25, "div", 18), v(26, "img", 19), f()(), d(27, "div", 11)(28, "div", 20)(29, "p", 21), p(30, " Quality assurance "), f(), d(31, "p", 22), p(32, " To make sure that the apps function properly after being relocated to a cloud environment, quality assurance is essential. In the event of a full rewrite on Cloud Native for a Microservices-Based architecture, in addition to a full traditional functional and non-functional testing required executed, contract testing and resiliency testing are also crucial to ensure all services are developed as per requirement and built with resiliency. Our Cloud Quality Assurance solution will help you successfully migrate to the cloud, reduce costs by carrying out the proper testing for the various migration options, and test the resilience of microservices in-house. "), f()()()(), d(33, "div", 23)(34, "div", 11)(35, "div", 20)(36, "p", 21), p(37, " Cloud ERP Software "), f(), d(38, "p", 22), p(39, " As opposed to an on-premises network, cloud ERP is an enterprise resource planning (ERP) system that enables enterprises to access through the internet. It runs on a vendor's cloud platform. ERP software helps with procurement, production, distribution, and fulfillment by integrating and automating key financial and operational company processes. It also manages inventory, orders, and the supply chain. All that is required to access the software is an internet connection and a browser. "), f()()(), d(40, "div", 11)(41, "div", 18), v(42, "img", 24), f()()(), d(43, "div", 17)(44, "div", 11)(45, "div", 18), v(46, "img", 25), f()(), d(47, "div", 11)(48, "div", 20)(49, "p", 21), p(50, " Cloud Security "), f(), d(51, "p", 22), p(52, " Our Managed Cloud Security solution outsources security monitoring, reporting, and technical assistance to a third party. It involves managing firewalls, intrusion detection systems, the company's virtual private network (VPN), anti-virus set-up, and vulnerability assessments. With years of experience in the IT sector, we are a consulting partner that provides complete cloud managed security solutions. Our focus is on scalability, agility, flexibility to use both your proprietary and open-source tools in the cloud, effective use of strong security operation tools, and compliance with security regulations to help you protect your data. "), f()()()(), d(53, "div", 23)(54, "div", 11)(55, "div", 20)(56, "p", 21), p(57, " VISP Services "), f(), d(58, "p", 22), p(59, " A number of choices that give the speed and network dependability to serve enterprises are available with the Virtual ISP wholesale product, which was created to provide business-grade internet network access. We offer convenient, scalable, and reliable internet. A fantastic option for companies of all sizes in both the public and private sectors. "), f()()(), d(60, "div", 11)(61, "div", 18), v(62, "img", 26), f()()()())
                            },
                            dependencies: [Ze, ut],
                            styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}#solution-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;text-align:left;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:1px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}.solutions-card-img[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:2em;border:none}.solutions-card-text[_ngcontent-%COMP%]{width:80%;height:50%;margin:0 auto;padding:6em 2em 2em;border:none}.enterprise-solutions-row[_ngcontent-%COMP%]{padding-top:2em}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;margin-bottom:1.5em;padding:.5em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.enterprise-solutions-row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.row-even[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.card-img-service[_ngcontent-%COMP%], .enterprise-col[_ngcontent-%COMP%]{width:100%;height:100%;padding-left:1em;padding-right:1em}.solutions-card-text[_ngcontent-%COMP%]{text-align:center}#solution-text[_ngcontent-%COMP%]{text-align:justify;padding:.5em;font-size:16px}}']
                        }), e
                    })()
                }, {
                    path: "projects/wollo-smart-classroom",
                    component: (() => {
                        class e {
                            constructor(n) {
                                this.viewPortScroller = n
                            }
                            ngOnInit() {}
                            onClick(n) {
                                this.viewPortScroller.scrollToAnchor(n)
                            }
                            prevSlide() {
                                $(this.carousel.nativeElement).carousel("prev")
                            }
                            nextSlide() {
                                $(this.carousel.nativeElement).carousel("next")
                            }
                        }
                        return e.\u0275fac = function(n) {
                            return new(n || e)(w(Tt))
                        }, e.\u0275cmp = Fe({
                            type: e,
                            selectors: [
                                ["app-wollo-scr"]
                            ],
                            viewQuery: function(n, r) {
                                if (1 & n && function Vv(e, t, n) {
                                        const r = X();
                                        r.firstCreatePass && (Uv(r, new Fv(e, t, n), -1), 2 == (2 & t) && (r.staticViewQueries = !0)), Bv(r, M(), t)
                                    }(v2, 5), 2 & n) {
                                    let o;
                                    yu(o = Cu()) && (r.carousel = o.first)
                                }
                            },
                            decls: 61,
                            vars: 0,
                            consts: [
                                ["id", "go-to-up"],
                                [1, "container-fluid"],
                                [1, "row", "front-row"],
                                ["id", "right-side", 1, "col", "front-col"],
                                [1, "headline"],
                                [1, "learn-more", "btn", "btn-primary"],
                                [3, "click"],
                                [1, "col", "front-col"],
                                ["src", "https://img.freepik.com/premium-vector/student-learning-online-home-character-sitting-desk-looking-laptop-studying_566886-5187.jpg", "alt", "scr", "width", "700em", "height", "500em", 1, "front-page-image"],
                                [1, "contact-section"],
                                [1, "col"],
                                [1, "text-center", "headline-4"],
                                [1, "col", "text-center"],
                                ["type", "button", 1, "btn", "btn-outline-primary", "btn-rounded"],
                                ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                                ["id", "direct-element", 1, "content-section"],
                                [1, "content-body"],
                                [1, "content-headline"],
                                [1, "text-content"],
                                ["id", "carouselExampleIndicators", "data-ride", "carousel", 1, "carousel", "slide"],
                                ["carousel", ""],
                                [1, "carousel-inner"],
                                [1, "carousel-item", "active"],
                                ["src", "assets/wollo scr 1.jpg", "alt", "First slide", 1, "d-block", "w-100", "carousel-image"],
                                [1, "carousel-item"],
                                ["src", "assets/wollo scr 2.jpg", "alt", "Second slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo scr 3.jpg", "alt", "Third slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo scr 4.jpg", "alt", "Fourth slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo scr 5.jpg", "alt", "Fifth slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo scr 6.jpg", "alt", "Sixth slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo scr 7.jpg", "alt", "Seventh slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo rack 1.jpg", "alt", "Eighth slide", 1, "d-block", "w-100", "carousel-image"],
                                ["src", "assets/wollo rack 2.jpg", "alt", "Nineth slide", 1, "d-block", "w-100", "carousel-image"],
                                ["role", "button", 1, "carousel-control-prev", 3, "click"],
                                ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
                                [1, "sr-only"],
                                ["role", "button", 1, "carousel-control-next", 3, "click"],
                                ["aria-hidden", "true", 1, "carousel-control-next-icon"]
                            ],
                            template: function(n, r) {
                                1 & n && (v(0, "section", 0), d(1, "div", 1)(2, "div", 2)(3, "div", 3), v(4, "br")(5, "br"), d(6, "h1", 4), p(7, " Convergence IT Solutions Successfully Implemented Smart Classroom Project for Wollo University "), f(), v(8, "br"), d(9, "button", 5)(10, "a", 6), Q("click", function() {
                                    return r.onClick("direct-element")
                                }), p(11, " Learn more "), f()()(), d(12, "div", 7), v(13, "img", 8), f()()(), d(14, "section", 9)(15, "div", 10)(16, "h1", 11), p(17, " Would you like to start a project with us? "), f(), d(18, "div", 12)(19, "button", 13)(20, "a", 14), p(21, " Contact Us "), f()()()()(), d(22, "section", 15)(23, "div", 16)(24, "h1", 17), p(25, " The Smart classroom project in Wollo University "), f(), v(26, "br"), d(27, "p", 18), p(28, " Convergence IT Solutions, a leading technology solutions provider, recently completed a smart classroom project for Wollo University. The project aimed to revolutionize the traditional classroom experience by integrating advanced technology and modern teaching learning experience. As the contractor for the project, Convergence IT Solutions provided end-to-end solutions, from design to installation and implementation. The project involved the installation of state-of-the-art equipment such as interactive displays, tracking cameras, and high quality lecture recording, live streaming & broadcasting over the internet, sound systems, as well as the development of custom software applications tailored to the university's specific needs. "), v(29, "br")(30, "br"), p(31, " The smart classroom project has already yielded positive results, with the school community expects higher levels of engagement and improved academic performance. This solution provided by Convergence IT Solutions can also enable teachers to manage their courses more efficiently, track student progress, and provide feedback in real-time. Convergence IT Solutions is proud to have been a part of this innovative project and looks forward to continuing its partnership with Wollo University to further enhance the learning experience for its students. The successful implementation of this smart classroom project serves as a testament to Convergence IT Solutions' expertise in providing cutting-edge technology solutions for higher educational institutions. "), f()(), d(32, "div", 19, 20)(34, "div", 21)(35, "div", 22), v(36, "img", 23), f(), d(37, "div", 24), v(38, "img", 25), f(), d(39, "div", 24), v(40, "img", 26), f(), d(41, "div", 24), v(42, "img", 27), f(), d(43, "div", 24), v(44, "img", 28), f(), d(45, "div", 24), v(46, "img", 29), f(), d(47, "div", 24), v(48, "img", 30), f(), d(49, "div", 24), v(50, "img", 31), f(), d(51, "div", 24), v(52, "img", 32), f()(), d(53, "a", 33), Q("click", function() {
                                    return r.prevSlide()
                                }), v(54, "span", 34), d(55, "span", 35), p(56, "Previous"), f()(), d(57, "a", 36), Q("click", function() {
                                    return r.nextSlide()
                                }), v(58, "span", 37), d(59, "span", 35), p(60, "Next"), f()()()())
                            },
                            dependencies: [Ze, ut],
                            styles: ['.container-fluid[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:100vh}.front-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-left:5em}.front-col[_ngcontent-%COMP%]{vertical-align:bottom;color:#0b91b8;font-family:Poppins,"Sans serif";font-size:14px;margin-top:3em}#right-side[_ngcontent-%COMP%]{margin-top:-5em}.headline[_ngcontent-%COMP%]{font-size:3em;font-weight:700}#welcome-text[_ngcontent-%COMP%]{font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;text-align:justify;color:gray}.front-page-image[_ngcontent-%COMP%]{margin-left:3em}.learn-more[_ngcontent-%COMP%]{background-color:#0b91b8;height:3em;width:12em;margin-top:1.5em;font-family:Poppins,serif;font-weight:700;color:#0b91b8;border:1px solid #0b91b8;border-radius:40px;background:transparent;transition:all .3s ease 0s;font-size:16px}.learn-more[_ngcontent-%COMP%]:hover, .learn-more[_ngcontent-%COMP%]:active{background-color:#0b91b8;color:#fff;border:none}.btn-rounded[_ngcontent-%COMP%]{margin-top:1.5em;width:11em;height:3.5em;font-family:Poppins,serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:1px;line-height:15px;border:2px solid white;border-radius:40px;background:transparent;transition:all .3s ease 0s}.btn-rounded[_ngcontent-%COMP%]:hover{color:#0b91b8;background:white;border:1px solid #0b91b8}.headline-4[_ngcontent-%COMP%]{font-family:Poppins,serif;color:#fff;font-weight:700;font-size:35px}.contact-section[_ngcontent-%COMP%]{padding-top:5em;margin-bottom:3em;width:100%;height:50vh;background-color:#0b91b8}.content-section[_ngcontent-%COMP%]{padding-bottom:5em;margin:0 auto;width:100%;height:100%}.content-body[_ngcontent-%COMP%]{padding-left:8em;padding-right:4em}.text-content[_ngcontent-%COMP%]{padding-right:7em;text-align:justify;font-size:16px;font-weight:400;font-family:"Sans" Serif;line-height:1.5;color:gray}.content-headline[_ngcontent-%COMP%]{padding-top:1em;font-size:2.2em;font-weight:700;color:#0b91b8}.slide[_ngcontent-%COMP%]{width:90%;height:10%;margin:10px auto}.carousel-image[_ngcontent-%COMP%]{width:100%;height:100%;border:0px solid;border-radius:2rem}.carousel-item[_ngcontent-%COMP%]{height:650px}@media only screen and (max-width: 768px){.headline[_ngcontent-%COMP%]{font-size:1.9em;font-family:"sans serif"}.headline-4[_ngcontent-%COMP%]{font-size:20px;padding:.5em}#welcome-text[_ngcontent-%COMP%]{font-size:15px;padding-bottom:.5em}.front-row[_ngcontent-%COMP%]{padding-top:2.5em;padding-bottom:2em;display:flex;flex-direction:column;text-align:center;margin-top:5em}.front-col[_ngcontent-%COMP%]{width:100%;height:100%;margin-left:-6em;padding:.5em}.container-fluid[_ngcontent-%COMP%]{width:100%;height:100%;margin-top:1em;margin-bottom:3em}.front-page-image[_ngcontent-%COMP%]{display:none}.underline[_ngcontent-%COMP%]{width:15%}.contact-section[_ngcontent-%COMP%]{padding-top:3em;padding-bottom:3em;width:100%;height:100%}.second-headline[_ngcontent-%COMP%]{padding-top:.5em}.card[_ngcontent-%COMP%]{width:100%;height:100%;padding:1em 1em 2em}.content-section[_ngcontent-%COMP%], .text-content[_ngcontent-%COMP%], .content-headline[_ngcontent-%COMP%], .content-body[_ngcontent-%COMP%]{width:100%;height:100%;padding:.6em}.content-headline[_ngcontent-%COMP%]{font-size:1.8em;text-align:center}.slide[_ngcontent-%COMP%]{width:90%;height:10%;margin:10px auto}.carousel-image[_ngcontent-%COMP%]{width:100%;height:100%;border:0px solid;border-radius:2rem}.carousel-item[_ngcontent-%COMP%]{height:350px}}']
                        }), e
                    })()
                }];
            let C2 = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e
                    }), e.\u0275inj = it({
                        imports: [W_.forRoot(y2, {
                            anchorScrolling: "enabled"
                        }), W_]
                    }), e
                })(),
                _2 = (() => {
                    class e {
                        constructor(n) {
                            this.viewPortScroller = n, this.title = "Convergence", this.navbarfixed = !1
                        }
                        ngOnInit() {}
                        onScroll() {
                            this.navbarfixed = window.scrollY > 100
                        }
                        onClick(n) {
                            this.viewPortScroller.scrollToAnchor(n)
                        }
                    }
                    return e.\u0275fac = function(n) {
                        return new(n || e)(w(Tt))
                    }, e.\u0275cmp = Fe({
                        type: e,
                        selectors: [
                            ["app-root"]
                        ],
                        hostBindings: function(n, r) {
                            1 & n && Q("scroll", function(i) {
                                return r.onScroll(i)
                            }, 0, tg)
                        },
                        decls: 156,
                        vars: 1,
                        consts: [
                            ["role", "navigation", "scroll", "onScroll()", 1, "navbar", "navbar-expand-lg", 3, "ngClass"],
                            [1, "container-fluid"],
                            ["routerLink", "/home", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "navbar-brand"],
                            ["src", "assets/convergence-removebg.png", "alt", "logo", "width", "80", "height", "40", 1, "d-inline-block", "align-top"],
                            ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarNav", "aria-expanded", "false", "aria-controls", "navbarNav", "aria-label", "Toggle navigation", 1, "navbar-toggler"],
                            [1, "navbar-toggler-icon"],
                            ["id", "navbarNav", 1, "collapse", "navbar-collapse"],
                            [1, "navbar-nav", "ms-auto", "text-center", "mb-2", "mb-lg-0"],
                            [1, "nav-item"],
                            ["routerLink", "/home", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            [1, "nav-item", "dropdown"],
                            ["data-bs-toggle", "dropdown", "href", "#", "role", "button", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle"],
                            [1, "dropdown-menu"],
                            ["routerLink", "/enterprise", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/security", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/facilities", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/software", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/data-center", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/cloud", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/consultants", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link", "sub-link"],
                            ["routerLink", "/trainings", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link", "sub-link"],
                            ["routerLink", "/projects", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/about", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "nav-link"],
                            [1, "btn-group", "dropstart"],
                            [1, "dropdown"],
                            ["data-bs-toggle", "dropdown", "aria-expanded", "false", "data-bs-auto-close", "outside", 1, "fa-solid", "fa-magnifying-glass"],
                            [1, "dropdown-menu", "searchBox"],
                            [1, "mb-3"],
                            ["type", "email", "id", "searchField", "placeholder", "Find your search...", 1, "form-control"],
                            [1, "bg-dark", "text-white", "footer"],
                            [1, "container", "p-4"],
                            [1, "mb-4", "text-center"],
                            ["href", "https://www.facebook.com/convergenceitsolutions/", "role", "button", "target", "_blank", 1, "btn", "btn-outline-light", "btn-floating", "m-1"],
                            [1, "fa-brands", "fa-facebook"],
                            ["href", "https://twitter.com/convergence7_IT/", "role", "button", "target", "_blank", 1, "btn", "btn-outline-light", "btn-floating", "m-1"],
                            [1, "fa-brands", "fa-twitter"],
                            ["href", "#", "role", "button", "target", "_blank", 1, "btn", "btn-outline-light", "btn-floating", "m-1"],
                            [1, "fa-brands", "fa-instagram"],
                            [1, "fa-brands", "fa-linkedin-in"],
                            ["href", "https://github.com/Convergenceitsolutions/", "role", "button", "target", "_blank", 1, "btn", "btn-outline-light", "btn-floating", "m-1"],
                            [1, "fa-brands", "fa-github"],
                            [1, "underline"],
                            [1, "mb-1", "text-center", "motto"],
                            [1, "mb-4"],
                            [1, "row", "footer-tab"],
                            [1, "col", "col-sm-4", "col-md-4", "col-lg-4", "footer-col"],
                            [1, "list-group", "list-unstyled"],
                            [1, "list-group-item", "borderless"],
                            [1, "text-capitalize"],
                            [1, "fa-sharp", "fa-solid", "fa-phone-volume"],
                            [1, "fa-solid", "fa-envelope"],
                            [1, "fa-light", "fa-solid", "fa-globe"],
                            [1, "fa-solid", "fa-location-dot"],
                            [1, "fa-solid", "fa-database"],
                            ["routerLink", "/data-center", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-code"],
                            ["routerLink", "/software", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-shield"],
                            ["routerLink", "/security", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-cloud"],
                            ["routerLink", "/cloud", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "col", "col-sm-2", "col-md-2", "col-lg-2", "footer-col"],
                            [1, "fa-solid", "fa-circle-info"],
                            ["routerLink", "/about", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-screwdriver-wrench"],
                            ["routerLink", "/consultants", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-code-branch"],
                            ["routerLink", "/projects", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-user-astronaut"],
                            ["routerLink", "/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 1, "footer-link", 3, "click"],
                            [1, "fa-solid", "fa-tag"],
                            ["target", "_blank", "href", "http://convergencesolutons.com/files/Convergence_Company_Profile.pdf", "download", "", 1, "footer-link"],
                            [1, "fa-solid", "fa-book-open-reader"],
                            [1, "text-center", "copyright"],
                            [1, "underline-copyright"],
                            ["href", "https://convergencesolutons.com/", 1, "text-white"]
                        ],
                        template: function(n, r) {
                            1 & n && (d(0, "nav", 0)(1, "div", 1)(2, "a", 2), v(3, "img", 3), f(), d(4, "button", 4), v(5, "span", 5), f(), d(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9), p(10, "Home"), f()(), d(11, "li", 10)(12, "a", 11), p(13, " Solutions "), f(), d(14, "ul", 12)(15, "li", 8)(16, "a", 13), p(17, " Enterprise Solutions "), f()(), d(18, "li", 8)(19, "a", 14), p(20, " Security Solutions "), f()(), d(21, "li", 8)(22, "a", 15), p(23, " Smart Facility "), f()(), d(24, "li", 8)(25, "a", 16), p(26, " Software Solutions "), f()(), d(27, "li", 8)(28, "a", 17), p(29, " Data Center Facilities "), f()(), d(30, "li", 8)(31, "a", 18), p(32, " Cloud Solutions "), f()()()(), d(33, "li", 10)(34, "a", 11), p(35, " Services "), f(), d(36, "ul", 12)(37, "li", 8)(38, "a", 19), p(39, " IT Consulting "), f()(), d(40, "li", 8)(41, "a", 20), p(42, " Trainings "), f()()()(), d(43, "li", 8)(44, "a", 21), p(45, "Projects"), f()(), d(46, "li", 8)(47, "a", 22), p(48, "About Us"), f()(), d(49, "li", 8)(50, "a", 23), p(51, "Contact Us"), f()(), d(52, "li", 8)(53, "div", 24)(54, "div", 25), v(55, "i", 26), d(56, "form", 27)(57, "div", 28), v(58, "input", 29), f()()()()()()()()(), v(59, "router-outlet"), d(60, "footer", 30)(61, "div", 31)(62, "div", 32)(63, "a", 33), v(64, "i", 34), f(), d(65, "a", 35), v(66, "i", 36), f(), d(67, "a", 37), v(68, "i", 38), f(), d(69, "a", 37), v(70, "i", 39), f(), d(71, "a", 40), v(72, "i", 41), f()(), v(73, "hr", 42), d(74, "div", 43)(75, "p"), p(76, " We support you in making your vision a reality and make your digital transformation the foundation of your growth. "), f()(), d(77, "section", 44)(78, "div", 45)(79, "div", 46)(80, "ul", 47)(81, "li", 48)(82, "h6", 49), p(83, " Contact "), f()(), d(84, "li", 48), v(85, "i", 50), p(86, " +251920343154 "), f(), d(87, "li", 48), v(88, "i", 51), p(89, " sales@convergencesolutons.com "), f(), d(90, "li", 48), v(91, "i", 52), p(92, " www.convergencesolutons.com "), f(), d(93, "li", 48), v(94, "i", 53), p(95, " Yewengel Building 1st Floor, Arat-kilo infront of FDRE Ministry of Trade & Industry "), f()()(), d(96, "div", 46)(97, "ul", 47)(98, "li", 48)(99, "h6", 49), p(100, " Solutions "), f()(), d(101, "li", 48), v(102, "i", 54), d(103, "a", 55), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(104, " Data Center Facility "), f()(), d(105, "li", 48), v(106, "i", 56), d(107, "a", 57), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(108, " Software Solutions "), f()(), d(109, "li", 48), v(110, "i", 58), d(111, "a", 59), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(112, " Security "), f()(), d(113, "li", 48), v(114, "i", 60), d(115, "a", 61), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(116, " Cloud managed services "), f()()()(), d(117, "div", 62)(118, "ul", 47)(119, "li", 48)(120, "h6", 49), p(121, " Quick Links "), f()(), d(122, "li", 48), v(123, "i", 63), d(124, "a", 64), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(125, "About "), f()(), d(126, "li", 48), v(127, "i", 65), d(128, "a", 66), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(129, " Consultation "), f()(), d(130, "li", 48), v(131, "i", 67), d(132, "a", 68), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(133, " Projects "), f()(), d(134, "li", 48), v(135, "i", 69), d(136, "a", 70), Q("click", function() {
                                return r.onClick("go-to-up")
                            }), p(137, " Contact "), f()()()(), d(138, "div", 62)(139, "ul", 47)(140, "li", 48)(141, "h6", 49), p(142, " Resources "), f()(), d(143, "li", 48), v(144, "i", 71), d(145, "a", 72), p(146, " Company Profile "), f()(), d(147, "li", 48), v(148, "i", 73), p(149, " Training Center "), f(), v(150, "li", 48), f()()()()(), d(151, "div", 74), v(152, "hr", 75), p(153, " \xa9 2022 "), d(154, "a", 76), p(155, " Convergence IT Solutions"), f()()()), 2 & n && Te("ngClass", r.navbarfixed ? "fixed" : "nofixed")
                        },
                        dependencies: [Xu, xd, Ze, ut, tf, Gd, Wa],
                        styles: [".fixed[_ngcontent-%COMP%]{position:fixed!important;width:100%;transition:.2s linear;top:0;background-color:#fff;border-bottom:.001em solid rgb(218,218,218);z-index:1}.nofixed[_ngcontent-%COMP%]{position:static;transition:.2s linear;top:-50px;background-color:transparent;z-index:1}img[_ngcontent-%COMP%]{margin-left:6em;margin-top:.2em}.navbar-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{color:#0b91b8}.navbar-nav[_ngcontent-%COMP%]{padding:.5em 5em;margin-top:.5em}.nav-link[_ngcontent-%COMP%], .dropdown-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{color:gray;font-size:15px;font-weight:700}.dropdown-menu[_ngcontent-%COMP%]{margin-right:50em}.searchBox[_ngcontent-%COMP%]{width:200px;border:none;padding-top:45px;background:transparent}.navbar-nav[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{color:#0b91b8;font-weight:700}.nav-item[_ngcontent-%COMP%]{padding:0 .5em}.navbar-toggler[_ngcontent-%COMP%]{border:none;color:transparent}.navbar-toggler[_ngcontent-%COMP%]:active{border:none}.btn[_ngcontent-%COMP%]{background-color:#0b91b8;border-style:none;height:3em;margin-left:3em;font-weight:700}.btn-floating[_ngcontent-%COMP%]{background-color:transparent;size:16px}.btn-floating[_ngcontent-%COMP%]:hover{color:#fff}.text-capitalize[_ngcontent-%COMP%]{font-weight:700}.text-white[_ngcontent-%COMP%]{text-decoration:none;align-items:left}.logo-section[_ngcontent-%COMP%]{padding-right:6.5em}.underline[_ngcontent-%COMP%]{width:10%;height:1em;color:#fff;margin:0 auto;font-weight:700}.fa-brands[_ngcontent-%COMP%]{padding-top:.8em;font-size:16px}li.borderless[_ngcontent-%COMP%]{border:0 none;font-size:16px;padding:.5em}.list-group-item[_ngcontent-%COMP%]{background-color:transparent;color:#fff;justify-content:left}.fa-circle[_ngcontent-%COMP%], .fa-phone-volume[_ngcontent-%COMP%], .fa-envelope[_ngcontent-%COMP%], .fa-globe[_ngcontent-%COMP%], .fa-location-dot[_ngcontent-%COMP%], .fa-database[_ngcontent-%COMP%], .fa-code[_ngcontent-%COMP%], .fa-cloud[_ngcontent-%COMP%], .fa-shield[_ngcontent-%COMP%], .fa-city[_ngcontent-%COMP%], .fa-circle-info[_ngcontent-%COMP%], .fa-screwdriver-wrench[_ngcontent-%COMP%], .fa-circle-info[_ngcontent-%COMP%], .fa-code-branch[_ngcontent-%COMP%], .fa-user-astronaut[_ngcontent-%COMP%]{padding:.3em}.motto[_ngcontent-%COMP%]{padding-top:1em;padding-bottom:4em;font-size:16px}.copyright[_ngcontent-%COMP%]{padding:.5em;font-size:16px}.fa-magnifying-glass[_ngcontent-%COMP%]{padding-top:.55em;color:#0b91b8}.footer-link[_ngcontent-%COMP%]{color:#fff;text-decoration:none}@media only screen and (max-width: 768px){.nofixed[_ngcontent-%COMP%]{width:100%}.navbar-toggler[_ngcontent-%COMP%]{border:none;color:transparent;right:15px}.navbar-toggler[_ngcontent-%COMP%]:active{border:none}.navbar-brand[_ngcontent-%COMP%]{margin-left:-4.5em;margin-top:.8em}.list-group[_ngcontent-%COMP%]{width:100%;padding-top:1em}.footer-tab[_ngcontent-%COMP%]{display:flex;flex-direction:column}.footer-col[_ngcontent-%COMP%]{width:100%;height:100%;margin:0 auto}.mb-4[_ngcontent-%COMP%]{width:100%}}"]
                    }), e
                })(),
                w2 = (() => {
                    class e {}
                    return e.\u0275fac = function(n) {
                        return new(n || e)
                    }, e.\u0275mod = ft({
                        type: e,
                        bootstrap: [_2]
                    }), e.\u0275inj = it({
                        providers: [g1],
                        imports: [t2.forRoot(), FA, C2, ON, XN, xN]
                    }), e
                })();
            NA().bootstrapModule(w2).catch(e => console.error(e))
        }
    },
    Xa => {
        Xa(Xa.s = 709)
    }
]);