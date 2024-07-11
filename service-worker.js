const CACHE_NAME = 'timbre-qr-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/service-worker.js',
    // Incluye aquí todos los archivos que deseas precachear
];

self.addEventListener('install', event => {
    // Instalación del Service Worker
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Interceptar y responder con los recursos en caché
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devolver respuesta desde caché o fetch original
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    // Eliminar caches antiguas al activar el Service Worker
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('timbre-qr-cache-') && cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('notificationclick', event => {
    // Manejar clics en notificaciones push (si aplicable)
    console.log('Notificación clickada: ', event.notification.tag);
    event.notification.close();

    // Aquí puedes añadir lógica adicional al manejar clics en notificaciones
    // Por ejemplo, abrir una URL específica o ejecutar alguna acción en la aplicación
});

// Aquí puedes añadir más eventos y lógica según las necesidades de tu aplicación PWA
