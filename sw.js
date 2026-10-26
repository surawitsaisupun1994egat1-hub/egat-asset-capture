// EGAT AssetCapture service worker – precache ทุกไฟล์ ใช้งานออฟไลน์ได้หลังเปิดครั้งแรก
const CACHE='egat-ac-v1.1-73590185';
const FILES=["./", "index.html", "merge.html", "manifest.webmanifest", "favicon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('egat-ac-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).catch(()=>r.mode==='navigate'?caches.match('index.html'):Response.error())))});
