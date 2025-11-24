const CACHE_NAME = "seo-opt-v1.3";  // Bump invalidate

const CORE_ASSETS = [
  "./",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

const precacheChunks = async (cache) => {
  try {
    const entry = await fetch("./");
    const text = await entry.text();
    const jsChunks = [...text.matchAll(/src="\/assets\/([^"]+\.js)"/g)].map(m => `/assets/${m[1]}`);
    const cssChunks = [...text.matchAll(/href="\/assets\/([^"]+\.css)"/g)].map(m => `/assets/${m[1]}`);
    await cache.addAll([...jsChunks, ...cssChunks]);
  } catch (err) {
    console.warn("SW precache chunks skip:", err);
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS).catch(err => console.warn("SW core addAll fail:", err));
      await precacheChunks(cache);
      self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome-extension (or other non-http schemes)
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;  // No cache, pass to browser
  }

  const isNav = request.mode === "navigate";
  const isAsset = request.destination === "image" || request.destination === "script" || request.destination === "style";

  if (isNav) {
    event.respondWith(
      fetch(request).catch(() => caches.match("./") || new Response("Offline — подключись для оптимизации", { status: 503 }))
    );
  } else if (isAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        caches.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((net) => {
            cache.put(request, net.clone()).catch(err => console.warn("SW put fail (asset):", err));  // Silent skip
            return net;
          }).catch(() => null);
          return cached || fetchPromise;
        })
      )
    );
  } else {
    event.respondWith(fetch(request).then((net) => net).catch(() => caches.match(request)));
  }
});