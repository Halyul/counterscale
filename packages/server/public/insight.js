(() => {
    const h = (window.counterscale && window.counterscale.q) || [],
        i = {},
        y = {
            set: s,
            trackPageview: d,
            // backwards compat
            setTrackerUrl: w,
            // backwards compat
        };
    function s(e, t) {
        i[e] = t;
    }
    function w(e) {
        return s("reporterUrl", e);
    }
    function b(e) {
        return (
            "?" +
            Object.keys(e)
                .map(function (o) {
                    return (
                        encodeURIComponent(o) + "=" + encodeURIComponent(e[o])
                    );
                })
                .join("&")
        );
    }
    function f() {
        return document.getElementById("counterscale-script");
    }
    function d(e) {
        if (
            ((e = e || {}),
            "visibilityState" in document &&
                document.visibilityState === "prerender")
        )
            return;
        if (document.body === null) {
            document.addEventListener("DOMContentLoaded", () => {
                d(e);
            });
            return;
        }
        let t = window.location;
        if (t.host === "" && navigator.userAgent.indexOf("Electron") < 0)
            return;
        const o = document.querySelector('link[rel="canonical"][href]');
        if (o) {
            const a = document.createElement("a");
            (a.href = o.href), (t = a);
        }
        let r = e.path || t.pathname + t.search;
        r || (r = "/"), (r = r.split("?")[0]);
        const u = e.hostname || t.protocol + "//" + t.hostname;
        let c = e.referrer || "";
        document.referrer.indexOf(u) < 0 && (c = document.referrer),
            (c = c.split("?")[0]);
        const l = f(),
            m = {
                p: r,
                h: u,
                r: c,
                sid: i.siteId !== void 0 ? i.siteId : "",
                // Ensure sid is always a string
            },
            p =
                i.reporterUrl ||
                (l ? l.src.replace("insight.js", "collect") : ""),
            n = document.createElement("img");
        n.setAttribute("alt", ""),
            n.setAttribute("aria-hidden", "true"),
            n.setAttribute("style", "position:absolute"),
            (n.src = p + b(m)),
            n.addEventListener("load", function () {
                document.body.removeChild(n);
            }),
            window.setTimeout(() => {
                n.parentNode && ((n.src = ""), document.body.removeChild(n));
            }, 1e3),
            document.body.appendChild(n);
    }
    const g = (window.counterscale = function (...e) {
        const t = e[0],
            o = y[t];
        typeof o == "function" && o.apply(this, e.slice(1));
    });
    h.forEach(function (e) {
        g.apply(window, e);
    });
    (() => {
        const t = f().getAttribute("data-site-id");
        t && (s("siteId", t), d({}));
    })();
})();
