const CACHE_NAME = 'audit-pwa-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Data (Cache First Strategy for UI)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});