// 離線快取：每次更新 App，把下面的版本號加 1（例如 v7 → v8），裝置才會抓到新版
const CACHE = 'coloring-v24';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './logo.png', './lines/animal-1.png','./lines/animal-2.png','./lines/animal-3.png','./lines/animal-4.png','./lines/animal-5.png','./lines/animal-6.png','./lines/animal-7.png','./lines/animal-8.png','./lines/animal-9.png','./lines/animal-10.png','./lines/animal-11.png','./lines/animal-12.png','./lines/animal-13.png','./lines/animal-14.png','./lines/animal-15.png','./lines/animal-16.png','./lines/animal-17.png','./lines/animal-18.png','./lines/animal-19.png','./lines/animal-20.png','./lines/vehicle-1.png','./lines/vehicle-2.png','./lines/vehicle-3.png','./lines/vehicle-4.png','./lines/vehicle-5.png','./lines/vehicle-6.png','./lines/vehicle-7.png','./lines/vehicle-8.png','./lines/vehicle-9.png','./lines/vehicle-10.png','./lines/vehicle-11.png','./lines/vehicle-12.png','./lines/vehicle-13.png','./lines/vehicle-14.png','./lines/vehicle-15.png','./lines/vehicle-16.png','./lines/vehicle-17.png','./lines/vehicle-18.png','./lines/vehicle-19.png','./lines/vehicle-20.png','./lines/flower-1.png','./lines/flower-2.png','./lines/flower-3.png','./lines/flower-4.png','./lines/flower-5.png','./lines/flower-6.png','./lines/flower-7.png','./lines/flower-8.png','./lines/flower-9.png','./lines/food-1.png','./lines/food-2.png','./lines/food-3.png','./lines/food-4.png','./lines/food-5.png','./lines/food-6.png','./lines/food-7.png','./lines/food-8.png','./lines/food-9.png','./lines/food-10.png','./lines/food-11.png','./lines/food-13.png','./lines/food-14.png','./lines/food-15.png','./lines/food-16.png','./lines/food-17.png','./lines/food-18.png','./lines/food-19.png','./lines/food-20.png','./lines/food-21.png','./lines/fruit-1.png','./lines/fruit-2.png','./lines/fruit-3.png','./lines/fruit-4.png','./lines/fruit-5.png','./lines/fruit-6.png','./lines/fruit-7.png','./lines/fruit-8.png','./lines/fruit-9.png','./lines/fruit-10.png','./lines/fruit-11.png','./lines/fruit-12.png','./lines/fruit-13.png','./lines/fruit-14.png','./lines/fruit-15.png','./lines/fruit-16.png','./lines/fruit-17.png','./lines/music-1.png','./lines/music-2.png','./lines/music-3.png','./lines/music-4.png','./lines/music-5.png','./lines/music-6.png','./lines/music-7.png','./lines/music-8.png','./lines/music-9.png','./lines/music-10.png','./lines/sport-1.png','./lines/sport-2.png','./lines/sport-3.png','./lines/sport-4.png','./lines/sport-5.png','./lines/sport-6.png','./lines/sport-7.png','./lines/sport-8.png','./lines/sport-9.png','./lines/sport-10.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f =>
    fetch(new Request(f, { cache: 'reload' })).then(r => { if (!r.ok) throw new Error(f); return c.put(f, r); })))));
});
// 新版下載好後先等著，由 App 內的「更新」按鈕（長按 1.5 秒）通知才啟用
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
