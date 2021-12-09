if (!self.define) {
  let e,
    n = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    n[s] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, r) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (n[c]) return;
    let a = {};
    const t = (e) => s(e, c),
      o = { module: { uri: c }, exports: a, require: t };
    n[c] = Promise.all(i.map((e) => o[e] || t(e))).then((e) => (r(...e), a));
  };
}
define(['./workbox-22294e6b'], function (e) {
  'use strict';
  importScripts('fallback-fFDhzinHoUcUD7l0jz7n0.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/server/middleware-manifest.json',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/framework-91d7f78b5b4003c8.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/main-e99ee43ff5a3531a.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/pages/_app-e3c2ed3cd58ff119.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/pages/_error-2280fa386d040b66.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/pages/_offline-005bdfe48ac574c9.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/pages/index-7c3d82dfe9f6958c.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/chunks/webpack-514908bffb652963.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/css/61c34c770a7cdebe.css',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/fFDhzinHoUcUD7l0jz7n0/_buildManifest.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/fFDhzinHoUcUD7l0jz7n0/_middlewareManifest.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        {
          url: '/_next/static/fFDhzinHoUcUD7l0jz7n0/_ssgManifest.js',
          revision: 'fFDhzinHoUcUD7l0jz7n0',
        },
        { url: '/_offline', revision: 'fFDhzinHoUcUD7l0jz7n0' },
        {
          url: '/favicon.ico',
          revision: '4ff59fef4ad8bd2547e3db47bac48f20',
        },
        { url: '/icons/icon-128x128.png', revision: 'd626cfe7c65e6e5403bcbb9d13aa5053' },
        {
          url: '/icons/icon-144x144.png',
          revision: 'e53a506b62999dc7a4f8b7222f8c5add',
        },
        { url: '/icons/icon-152x152.png', revision: '18b3958440703a9ecd3c246a0f3f7c72' },
        {
          url: '/icons/icon-16x16.png',
          revision: '83703514f19796ee15151e450984416d',
        },
        { url: '/icons/icon-192x192.png', revision: '27dc12f66697a47b6a8b3ee25ba96257' },
        {
          url: '/icons/icon-32x32.png',
          revision: '25e2c6ee34840568012b32e4314278df',
        },
        { url: '/icons/icon-384x384.png', revision: 'a40324a3fde2b0b26eeffd4f08bf8be8' },
        {
          url: '/icons/icon-512x512.png',
          revision: '93d6e8e15cfa78dfee55446f607d9a28',
        },
        { url: '/icons/icon-72x72.png', revision: 'f2ffc41b3482888f3ae614e0dd2f6980' },
        {
          url: '/icons/icon-96x96.png',
          revision: 'fba02a40f7ba6fc65be8a2f245480f6d',
        },
        { url: '/manifest.json', revision: 'c96057f6fe080d95b52920d55437ade9' },
        {
          url: '/static/images/test_offline.png',
          revision: 'f88c8ee298c353c994c0ee9181cc745a',
        },
        {
          url: '/vercel.svg',
          revision: '4b4f1876502eb6721764637fe5c41702',
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: n, event: s, state: i }) =>
              n && 'opaqueredirect' === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: n.headers,
                  })
                : n,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const n = e.pathname;
        return !n.startsWith('/api/auth/') && !!n.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 3600,
          }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    );
});
