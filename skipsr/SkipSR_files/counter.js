(function() {

    const doc = document;
    const win = window;
    const loc = win.location;
    const currentScript = doc.currentScript;

    let hasPageview = false;

    const config = {
        endpoint: currentScript.getAttribute("data-api") || new URL(currentScript.src).origin + "/api/event",
        id: parseInt(currentScript.getAttribute("data-id")),
        logging: true
    };

    function getDocumentHeight() {
        var body = document.body || {},
            documentElement = document.documentElement || {};
        return Math.max(
            body.scrollHeight || 0,
            body.offsetHeight || 0,
            body.clientHeight || 0,
            documentElement.scrollHeight || 0,
            documentElement.offsetHeight || 0,
            documentElement.clientHeight || 0
        );
    }

    function getCurrentScrollDepth() {
        var body = document.body || {},
            documentElement = document.documentElement || {},
            windowHeight = window.innerHeight || documentElement.clientHeight || 0,
            scrollTop = window.scrollY || documentElement.scrollTop || body.scrollTop || 0;
        return documentHeight <= windowHeight ? documentHeight : scrollTop + windowHeight;
    }

    var documentHeight = getDocumentHeight(),
        maxScrollDepth = getCurrentScrollDepth(),
        currentProps = {},
        lastScrollDepth = -1,
        isEngagementSetup = false,
        timeStart = null,
        totalTime = 0;

    function getLoc() {
        try {
            return (window && window.location && window.location.href) ||
                   (document && document.location && document.location.href) ||
                   (document && document.URL) ||
                   '';
        } catch (e) {
            return '';
        }
    }

    function sendRequest(data, options) {
        if (!window.fetch) return;
        fetch(config.endpoint, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            keepalive: true,
            body: JSON.stringify(data)
        })
            .then(res => options?.callback?.({ status: res.status }))
            .catch(err => options?.callback?.({ error: err }));
    }


    function handleVisibilityChange() {
        if ("visible" === document.visibilityState && document.hasFocus() && null === timeStart) {
            timeStart = Date.now();
        } else if ("hidden" === document.visibilityState || !document.hasFocus()) {
            totalTime = getEngagementTime();
            timeStart = null;
            //sendEngagementEvent();
        }
    }

    function getEngagementTime() {
        return timeStart ? totalTime + (Date.now() - timeStart) : totalTime;
    }

    function sendEngagementEvent() {
        var engagementTime = getEngagementTime();
        if (!hasPageview && (lastScrollDepth < maxScrollDepth || engagementTime >= 3000)) {
            lastScrollDepth = maxScrollDepth;
            console.log ( "sending engadment");
            var engagementData = {
                n: "engagement",
                sd: Math.round(maxScrollDepth / documentHeight * 100),
                u: getLoc(),
                i: config.id,
                e: engagementTime,
            };
            timeStart = null;
            totalTime = 0;
            engagementData.h = 1;
            sendRequest(engagementData);
        }
    }

    function trackEvent(name, opts) {
        let isPageview = name === 'pageview';

        if(isPageview) {
            //sendEngagementEvent();
            documentHeight = getDocumentHeight();
            maxScrollDepth = getCurrentScrollDepth();
        }

        const event = {
            n: name,
            u: getLoc(),
            i: config.id,
            r: doc.referrer || null
        };
        sendRequest(event, opts);
    }

    let currentPath = '';

    window.addEventListener("load", function() {
        documentHeight = getDocumentHeight();
        var attempts = 0;
        var heightCheckInterval = setInterval(function() {
            documentHeight = getDocumentHeight();
            if (++attempts === 10) {
                clearInterval(heightCheckInterval);
                console.log ( "height: ", documentHeight);
            }
        }, 300);
    });

    const onChange = function() {
        const path = window.location.pathname;
        if (path && path !== currentPath) {
            currentPath = path;
            trackEvent("pageview");
        }
    }

    if (doc.visibilityState === "hidden" || doc.visibilityState === "prerender") {
        doc.addEventListener("visibilitychange", () => {
            console.log('visibility changed');
            if (!currentPath && doc.visibilityState === "visible") onChange();
        });
    } else {
        onChange();
    }

    window.addEventListener("pageshow", event => {
        if (event.persisted) onChange();
    });
})();