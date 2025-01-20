const CACHE_NAME = 'cookie-clicker-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/info.html',
  '/script.js',
  '/cookie.jpg',
  '/monster.png',
  '/music.mp3',
  '/favicon.png',
  'https://teslakitty-cdn.netlify.app/cookie2/background.png', // Use the CDN URL for the background image
];

// Install event: Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        self.skipWaiting(); // Forces the service worker to activate immediately
      })
  );
});

// Fetch event: Serve cached files if offline or network failure
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return the cached response if available
        if (response) {
          return response;
        }

        // Fetch from network if not in cache
        return fetch(event.request).catch(() => {
          // If no cache or network, return a minimal response (blank page, error message, etc.)
          return new Response('<h1>You are offline</h1>', {
            status: 200,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/html' },
          });
        });
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Remove old caches
          }
        })
      );
    }).then(() => {
      self.clients.claim(); // Claim control over all clients immediately
    })
  );
});
