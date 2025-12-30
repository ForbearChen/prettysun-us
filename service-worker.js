/**
 * Service Worker for PWA
 * 提供离线缓存功能
 * 缓存策略：网络优先，缓存降级 (Network First, Cache Fallback)
 * - 每次优先获取最新内容
 * - 网络失败时使用缓存作为降级方案
 * - 保留离线访问能力
 */

const CACHE_NAME = 'prettysun-v2';
const urlsToCache = [
  '/prettysun-us/',
  '/prettysun-us/index.html',
  '/prettysun-us/detail.html',
  '/prettysun-us/secret.html',
  '/prettysun-us/css/style.css',
  '/prettysun-us/js/main.js',
  '/prettysun-us/js/countdown.js',
  '/prettysun-us/js/calendar-heatmap.js',
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

// 拦截网络请求 - 网络优先策略
self.addEventListener('fetch', event => {
  event.respondWith(
    // 先尝试从网络获取最新内容
    fetch(event.request)
      .then(response => {
        // 检查是否是有效的响应
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // 克隆响应，一份给浏览器，一份存入缓存作为备用
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(err => {
        // 网络失败时，使用缓存作为降级方案
        console.log('Network failed, using cache:', err);
        return caches.match(event.request)
          .then(response => {
            // 如果缓存中有，返回缓存
            if (response) {
              return response;
            }
            // 否则，返回默认的离线页面
            return caches.match('/prettysun-us/index.html');
          });
      })
  );
});
