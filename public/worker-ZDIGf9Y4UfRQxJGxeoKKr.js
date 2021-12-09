(() => {
  'use strict';
  self.addEventListener('push', function (t) {
    const n = JSON.parse(t.data.text());
    t.waitUntil(registration.showNotification(n.title, { body: n.message, icon: '/icons/android-chrome-192x192.png' }));
  }),
    self.addEventListener('notificationclick', function (t) {
      t.notification.close(),
        t.waitUntil(
          clients.matchAll({ type: 'window', includeUncontrolled: !0 }).then(function (t) {
            if (t.length > 0) {
              let n = t[0];
              for (let i = 0; i < t.length; i++) t[i].focused && (n = t[i]);
              return n.focus();
            }
            return clients.openWindow('/');
          }),
        );
    });
})();
