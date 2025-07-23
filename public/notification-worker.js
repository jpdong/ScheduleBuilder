// Notification service worker

// Install event
self.addEventListener('install', (event) => {
  console.log('Notification service worker installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Notification service worker activated');
  return self.clients.claim();
});

// Push notification event
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();

    const title = data.title || 'Schedule Reminder';
    const options = {
      body: data.body || 'You have an upcoming schedule',
      icon: data.icon || '/logo.png',
      badge: data.badge || '/logo.png',
      tag: data.tag,
      data: data.data,
      requireInteraction: data.requireInteraction || true
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (error) {
    console.error('Error processing push notification:', error);
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data;
  if (!data || !data.scheduleId) return;

  // Open or focus on the schedule details page
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      // Try to find an already open window
      for (const client of clientList) {
        const url = new URL(client.url);
        if (url.pathname === '/schedule-builder' && url.searchParams.get('scheduleId') === data.scheduleId) {
          return client.focus();
        }
      }

      // If not found, open a new window
      return self.clients.openWindow(`/schedule-builder?scheduleId=${data.scheduleId}`);
    })
  );
});