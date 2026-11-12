const CACHE_NAME='wafa-fit-r17-20261112';
const ASSETS=['./','./index.html','./manifest.webmanifest','./logo.png','./apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png','./step1.png','./step2.png','./step3.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('wafa-fit-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){let copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',copy))}return r}).catch(()=>caches.match('./index.html')));return}
e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){let copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy))}return r})))})
