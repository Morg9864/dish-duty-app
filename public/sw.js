self.addEventListener('push', function (event) {
  console.log('Push reçu !', event);
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'unsubscribe',
          title: 'Se désabonner',
          icon: '/unsubscribe.png'
        },
        {
          action: 'open',
          title: 'Ouvrir',
          icon: '/open.png'
        }
      ],
      data: {
        url: data.url || '/',
      }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (event.action === 'unsubscribe') {
    // Gérer le désabonnement ici
  } else {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
}); 