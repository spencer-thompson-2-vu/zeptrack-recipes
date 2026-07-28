const CACHE_NAME = 'zeptrack-v1.3';
const ASSETS = [
  '/zeptrack-recipes/',
  '/zeptrack-recipes/index.html',
  '/zeptrack-recipes/manifest.json',
  '/zeptrack-recipes/icon-192.png',
  '/zeptrack-recipes/icon-512.png',
  '/zeptrack-recipes/version.json'
];

// Allow clients to force-activate a waiting SW
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting(); // activate immediately, don't wait for old SW to die
});

// Activate: delete all old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // take control of all open tabs immediately
});

// Fetch: network first, fall back to cache
// This ensures the app always tries to get fresh content
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // update cache with fresh response
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
