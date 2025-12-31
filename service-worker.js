/**
 * Service Worker for PWA
 * 禁用缓存策略 - 确保每次都加载最新内容
 * - 所有请求都从网络获取
 * - 添加 no-cache 头部确保不使用浏览器缓存
 * - 保留 PWA 安装能力但不缓存内容
 */

const CACHE_NAME = 'prettysun-no-cache-v1';

// 安装 Service Worker - 跳过等待立即激活
self.addEventListener('install', event => {
  console.log('Service Worker installed - No cache mode');
  self.skipWaiting(); // 立即激活新的 Service Worker
});

// 激活 Service Worker - 清除所有旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('Service Worker activated - All caches cleared');
      return self.clients.claim(); // 立即控制所有页面
    })
  );
});

// 拦截网络请求 - 纯网络策略，不使用缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request, {
      cache: 'no-store', // 完全禁用缓存
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }).then(response => {
      // 直接返回网络响应，不进行任何缓存
      return response;
    }).catch(err => {
      // 网络失败时返回错误信息
      console.error('Network request failed:', err);
      return new Response('网络连接失败，请检查网络后刷新页面', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain; charset=utf-8'
        })
      });
    })
  );
});
