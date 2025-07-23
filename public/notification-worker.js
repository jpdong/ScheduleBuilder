// 通知服务工作器

// 安装事件
self.addEventListener('install', (event) => {
  console.log('通知服务工作器已安装');
  self.skipWaiting();
});

// 激活事件
self.addEventListener('activate', (event) => {
  console.log('通知服务工作器已激活');
  return self.clients.claim();
});

// 推送通知事件
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    const title = data.title || '日程提醒';
    const options = {
      body: data.body || '您有一个日程即将开始',
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
    console.error('处理推送通知时出错:', error);
  }
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const data = event.notification.data;
  if (!data || !data.scheduleId) return;
  
  // 打开或聚焦到日程详情页面
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      // 尝试查找已打开的窗口
      for (const client of clientList) {
        const url = new URL(client.url);
        if (url.pathname === '/schedule-builder' && url.searchParams.get('scheduleId') === data.scheduleId) {
          return client.focus();
        }
      }
      
      // 如果没有找到，则打开新窗口
      return self.clients.openWindow(`/schedule-builder?scheduleId=${data.scheduleId}`);
    })
  );
});