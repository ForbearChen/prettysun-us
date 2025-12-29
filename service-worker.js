/**
 * Service Worker for PWA
 * 提供离线缓存功能
 */

const CACHE_NAME = 'prettysun-v1';
const urlsToCache = [
  '/prettysun-us/',
  '/prettysun-us/index.html',
  '/prettysun-us/detail.html',
  '/prettysun-us/secret.html',
  '/prettysun-us/css/style.css',
  '/prettysun-us/js/main.js',
  '/prettysun-us/js/countdown.js',
  '/prettysun-us/js/easter-eggs.js',
  '/prettysun-us/manifest.json'
];

// 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Cache installation failed:', err);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有，直接返回缓存
        if (response) {
          return response;
        }
        
        // 否则，发起网络请求
        return fetch(event.request)
          .then(response => {
            // 检查是否是有效的响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，一份给浏览器，一份存入缓存
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(err => {
            console.log('Fetch failed:', err);
            // 可以返回一个默认的离线页面
            return caches.match('/prettysun-us/index.html');
          });
      })
  );
});
