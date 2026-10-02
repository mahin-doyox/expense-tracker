// Cache version bodlale (v1 -> v2) notun index.html sobar kache jabe
const C='et-v1',ASSETS=['./','index.html','manifest.json','icon-192.png','icon-512.png',
 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>{})))));self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
// Cache theke sathe sathe dao, background e update koro (stale-while-revalidate)
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')caches.open(C).then(c=>c.put(r,res.clone()));return res;}).catch(()=>hit);
    return hit||net;}));
});
