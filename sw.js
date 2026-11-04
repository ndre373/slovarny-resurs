// Service Worker «Словарного Ресурса»: полный офлайн после первого визита.
// Список файлов ниже перезаписывает scripts/gen-sw.mjs при каждой сборке.
const VERSION = 'slovarny-v2';
const ASSETS = /*GEN-BEGIN*/[
  './',
  'assets/index-C0oasZVo.js',
  'assets/index-C3DUqDEd.css',
  'audio/apple.mp3',
  'audio/book.mp3',
  'audio/cat.mp3',
  'audio/day.mp3',
  'audio/dog.mp3',
  'audio/family.mp3',
  'audio/food.mp3',
  'audio/friend.mp3',
  'audio/hand.mp3',
  'audio/heart.mp3',
  'audio/house.mp3',
  'audio/love.mp3',
  'audio/music.mp3',
  'audio/night.mp3',
  'audio/sun.mp3',
  'audio/time.mp3',
  'audio/tree.mp3',
  'audio/water.mp3',
  'audio/work.mp3',
  'audio/world.mp3',
  'icon-192.png',
  'icon-512.png',
  'index.html',
  'manifest.webmanifest'
]/*GEN-END*/;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit ||
      fetch(e.request).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(e.request, copy));
        }
        return res;
      })
    )
  );
});
