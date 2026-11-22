// Généré par site-src/build.js : ne pas modifier à la main
var CACHE = "javaquest-759966bfea";
var FILES = ["./", "manifest.webmanifest", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/favicon-32.png"];
self.addEventListener("install", function (e)
{
	e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e)
{
	e.waitUntil(caches.keys().then(function (keys)
	{
		return Promise.all(keys.filter(function (k) { return k.indexOf("javaquest-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
	}).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e)
{
	var req = e.request;
	if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) { return; }
	if (req.mode === "navigate")
	{
		e.respondWith(fetch(req).then(function (res)
		{
			var copy = res.clone();
			caches.open(CACHE).then(function (c) { c.put("./", copy); });
			return res;
		}).catch(function () { return caches.match("./"); }));
		return;
	}
	e.respondWith(caches.match(req).then(function (hit) { return hit || fetch(req); }));
});
