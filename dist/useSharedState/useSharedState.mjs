import u from"react";import{stateMap as n,subscribers as s}from"../subscribers.mjs";import{useInsertionEffect as g}from"../useInsertionEffect.mjs";import{isSSR as l,isEqual as b}from"../utils.mjs";function d(a,c){const t=u.useRef(a),[f,i]=u.useState(()=>{if(l)return c?c?.():t.current;const e=n.get(t.current);if(e)return e;{const r=c?.()||t.current;return n.set(t.current,r),r}}),m=u.useCallback(e=>{const r=n.get(t.current),o=typeof e=="function"?e(r):{...r,...e};b(r,o)||(n.set(t.current,o),s.get(t.current).forEach(p=>p()))},[]);g(()=>{const e=()=>{i(n.get(t.current)||t.current)},r=s.add(t.current,e);return()=>{r()}},[]);const S=u.useCallback(()=>n.get(t.current)||t.current,[]);return{state:f,getState:S,setState:m}}export{d as useSharedState};
