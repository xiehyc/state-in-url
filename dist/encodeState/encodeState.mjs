import{encode as f,decode as a}from"../encoder/encoder.mjs";import{getParams as i}from"../utils.mjs";function m(o,e,n){const r=i(n);return Object.entries(o||{}).forEach(([t,c])=>{const s=e?.[t];JSON.stringify(c)!==JSON.stringify(s)&&r.set(t,f(c))}),r.toString()}function d(o,e){return{...e||{},...Object.fromEntries([...i(o).entries()].map(([n,r])=>{const t=e?.[n];return[n,a(r,t)??t]}))}}export{d as decodeState,m as encodeState};
