const CACHE_NAME = 'study-tracker-v5';

// Force new service worker to activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Intercept fetch requests and ignore extension/Supabase requests
self.addEventListener('fetch', (event) => {
  // 1. Ignore non-HTTP(S) schemes like chrome-extension://
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // 2. Ignore Supabase API requests so data isn't cached stale
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  // 3. Handle standard caching for local app assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
