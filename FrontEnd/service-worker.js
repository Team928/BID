const CACHE_NAME = 'cache-v1';

const FILES_TO_CACHE = ['/offline.html'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (CACHE_NAME !== key) return caches.delete(key);
        }),
      ),
    ),
  );
});

self.addEventListener('fetch', event => {
  if ('navigate' !== event.request.mode) return;

  event.respondWith(
    fetch(event.request).catch(() => caches.open(CACHE_NAME).then(cache => cache.match('/offline.html'))),
  );
});
