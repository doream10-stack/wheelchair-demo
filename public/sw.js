self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Simple fetch handler to satisfy PWA installation criteria
  e.respondWith(
    fetch(e.request).catch(() => {
      return new Response('Offline');
    })
  );
});
