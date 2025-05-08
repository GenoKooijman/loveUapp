self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/manifest.json',
        '/robots.txt',
        '/src/assets/index.css',
        '/src/components/ExampleComponent.jsx',
        '/src/pages/Home.jsx',
        '/src/App.jsx',
        '/src/main.jsx',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});