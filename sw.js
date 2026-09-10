// Service worker mínimo: guarda en caché el "cascarón" de la app para que
// abra rápido e instale como PWA. Los datos (Google Drive) NUNCA se cachean:
// siempre se piden en vivo para no mostrar información vieja.

const CACHE_NAME = 'control-ot-tm-v1';
const ARCHIVOS_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(nombres.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Nunca cachear llamadas a Google (Drive API / login): siempre red directa.
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('google.com')) {
    return;
  }

  // Para el resto (archivos propios de la app): red primero, con respaldo en caché
  // si no hay conexión, así siempre se usa la versión más reciente cuando hay internet.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copia = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
