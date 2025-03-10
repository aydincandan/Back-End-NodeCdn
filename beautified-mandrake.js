let modulFUNCmdk = d => {
    let t = (e, o) => {
        if (null !== e && "object" == typeof e) for (var n in e) "number" != typeof e[n] && "function" != typeof e[n] && (console.log("\t", typeof e[n], {
            key: n
        }, "Buffer" === e[n]?.type, Array.isArray(e[n]?.data), Array.isArray(e[n])), 
        Array.isArray(e[n]) && (e[n].data = o(e[n].data)), "object" == typeof e[n]) && t(e[n], o);
    };
    let a = (e, o, n) => {
        var t = [];
        let r = [ e ];
        for (var l = new Set(); 0 < r.length; ) {
            var a = r.pop();
            if ("object" == typeof a && null !== a) {
                if (!l.has(a)) for (var i in l.add(a), a) i === o ? (t.push(a[i]), 
                a[i] = n(a[i])) : r.push(a[i]);
            } else Array.isArray(a) && a.forEach(e => r.push(e));
        }
        return t;
    };
    return {
        zamanDamgasi: () => {
            var e = new Date();
            return `${e.getFullYear()}.${String(e.getMonth() + 1).padStart(2, "0")}.${String(e.getDate()).padStart(2, "0")}-${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}:` + String(e.getMilliseconds()).padStart(3, "0");
        },
        newFormData: async (e, o, n) => {
            var t = n || !1;
            t && console.log("*** BAŞLIYOR-1 ***", e);
            let r = new FormData();
            if (e && o) {
                if (t && console.log("boş mu", r), e) for (var [ l, a ] of Object.entries(e)) r.append(l, a);
                if (t && console.log("dolu mu", r), o) {
                    t && console.log("*** BAŞLIYOR-2 ***", o);
                    for (var i of o) {
                        var s = await (async e => {
                            let o = !0;
                            if (e.buffer) {
                                o = !1;
                                var n = new Blob([ e.buffer ], {
                                    type: e.mimetype
                                });
                                r.append("attachments", n, e.originalname), console.log("formData.append('attachments', blob, ", e.originalname);
                            } else if (e.redisKey) {
                                o = !1, console.log("========== ŞİMDİ BU DURUMU TEST ET ========="), 
                                process.exit(1);
                                try {
                                    var t = await myredis.getAsync(e.redisKey);
                                    e.buffer = new Blob([ t ], {
                                        type: e.mimetype
                                    }), e.buffer = Buffer.from(t), r.append("attachments", e.buffer, e.originalname), 
                                    console.log("redisten okunan dosya->", e.buffer);
                                } catch (e) {
                                    console.log("redisKey TTL ile zaman asimina ugramis olabiir.", e);
                                } finally {
                                    console.log("- - - - - - - - - - - - - -");
                                }
                            }
                            return o;
                        })(i);
                        t && console.log("sonuc file_buffer_VEYA_file_redisKey", s), 
                        1 == s && (s = d.readFileSync(i.path), t && console.log("fileBuffer", s), 
                        s = new Blob([ s ], {
                            type: i.mimetype
                        }), r.append("attachments", s, i.originalname), t) && console.log("|========== EKLENDI ===========", i.originalname);
                    }
                    t && console.log("nasıl dolu mu", r), t && console.log("|========== " + o.length + " =========== tüm attacler eklendi");
                } else t || console.log("========== Ve cikis ===========", o.length), 
                t || console.log("newFormData", {
                    formData: r
                }), t || console.log("========== Ve cikis ===========", o.length), 
                t && console.log("newFormData *** BİTTİ *** return formData");
            }
            return r;
        },
        response_final: (e, o, n, t, r) => {
            var l = {};
            if (l.response_final = {
                status: n,
                kimden3: e.headers["x-nerden"],
                req_originalUrl: e.originalUrl,
                final_data: t
            }, 500 != n) try {
                a(l, "buffer", e => e.slice(0, 5));
            } catch (e) {}
            return console.log("_^_^_^_^_^_^_^_^_^_^_^_^"), r && console.log("response_final->", {
                verbose: r
            }, n, l), console.log("status:", n), console.log(""), console.log(""), 
            console.log("Browser'a dönüş yapildi Via mandrakemodule.js"), console.log(""), 
            console.log(""), console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|"), 
            o.status(n).json(l);
        },
        isMyBrowser: function() {
            return "undefined" != typeof window && void 0 !== window.document;
        },
        isNode: function() {
            return "undefined" != typeof process && null != process.versions && null != process.versions.node;
        },
        isElectron: function() {
            return "undefined" != typeof process && null != process.versions && null != process.versions.electron;
        },
        findAndModifyBuffer: t,
        GetValiumOptimized: function(e, o) {
            var n = [];
            let t = [ e ];
            for (var r = new Set(); 0 < t.length; ) {
                var l = t.pop();
                if ("object" == typeof l && null !== l) {
                    if (!r.has(l)) for (var a in r.add(l), l) (a === o ? n : t).push(l[a]);
                } else Array.isArray(l) && l.forEach(e => t.push(e));
            }
            return n;
        },
        findOneModify: a,
        Mandrake: (e, n, r) => {
            null == e && (e = void 0), null == n && (n = void 0);
            let {
                prod_server_origin: l,
                prod_client_origin: o
            } = r = null == r ? {
                prod_server_origin: "",
                prod_client_origin: "",
                mndrk_Actions: []
            } : r, a = e => new URL(e).origin;
            var t = window.location.origin, i = window.location.protocol, s = window.location.hostname, d = window.location.port;
            let c = !1, f = !1, u = (t == a(i + "localhost:" + d) ? c = !0 : f = !0, 
            !1), g = !1, m = (t == o ? g = !0 : u = !0, document.getElementById(e));
            t = {
                PROD: g,
                TEST: u,
                REMO: f,
                LOCA: c,
                docClientOrigin: t,
                docClientProtocol: i,
                docClientHostname: s,
                docClientPort: d,
                htmlFormElement: m,
                setup: r
            };
            if (console.log({
                RETURNS: t
            }), e && n) {
                i = r.mndrk_Actions;
                Array.isArray(i) && i.forEach((e, o, n) => {
                    1 == c && 1 == u ? n[o] = e : 1 == f && 1 == g ? n[o] = e.replace(a(e), l) : n[o] = "action bilinmiyor";
                }), document.getElementById("selectedRedActionDiv") || ((s = document.createElement("div")).id = "selectedRedActionDiv", 
                s.style = "color:red", m.after(s));
                let o = document.getElementById("selectedRedActionDiv");
                if (o && (o.innerText = i[0], m.action = i[0]), !document.getElementById("actions")) {
                    let t = document.createElement("select");
                    t.id = "actions", t.name = "actions", o.before(t), Array.isArray(i) && i.forEach((e, o) => {
                        var n = document.createElement("option");
                        n.id = "URL" + (o + 1), n.value = e, n.innerText = `LOCAL: ${c} ve TEST: ${u} | ` + e, 
                        t.add(n);
                    }), t.addEventListener("change", e => {
                        e = e.target.value;
                        o.innerText = e, m.action = e;
                    });
                }
                d = document.getElementById(n);
                let t = d || document.createElement("textarea");
                d || (t.class = "feedback", t.name = "feedback", t.id = "feedback", 
                t.rows = "50", t.style = "font-size: 15px; width:100%; margin:0px", 
                o.after(t)), m.addEventListener("submit", async e => {
                    e.preventDefault();
                    try {
                        var o = XanaduForclient(m), n = (t.innerHTML = "Xanadu BEKLENİYOR... " + o.url, 
                        console.log("mandrake -> XanaduForclient : ", {
                            xfc: o
                        }), document.querySelector('input[name="agent1"]:checked')?.value);
                        Xanadu(n, o.url, o.FetchSendOptions, o.AxiosSendData, o.AxiosSendOptions).then(e => {
                            console.log(e), t.innerHTML = JSON.stringify(e, null, 4).replace(/<br\s*\/?>/gi, "\n").replace(/\\n /gi, "\n\t");
                        }).catch(e => {
                            console.log(e);
                            var o = JSON.stringify(e, null, 4).replace(/<br\s*\/?>/gi, "\n").replace(/\\n /gi, "\n\t");
                            t.innerHTML = "{}" == o ? String(e) : o;
                        });
                    } catch (e) {
                        return alert(e), e;
                    }
                });
            }
            return t;
        }
    };
}, globalSCOPEmdk = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : this;

((e, o) => {
    "function" == typeof define && define.amd ? (console.log("--------------- mandrakemodule AMD"), 
    define([ "fs" ], o)) : "object" == typeof module && "object" == typeof module.exports ? (console.log("--------------- mandrakemodule CJS"), 
    module.exports = o(require("fs"))) : (console.log("--------------- mandrakemodule BRW-1"), 
    void 0 === e.fs ? console.error("HATA: global.fs tanımlı değil!") : e.mandrakemodule = o(e.fs));
})(globalSCOPEmdk, modulFUNCmdk);