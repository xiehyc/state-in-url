import i from"react";import{TIMEOUT as R}from"../constants/constants.mjs";import{useInsertionEffect as T}from"../useInsertionEffect.mjs";import{useSharedState as v}from"../useSharedState/useSharedState.mjs";import{useUrlEncode as L}from"../useUrlEncode/useUrlEncode.mjs";import{filterUnknownParamsClient as P}from"../utils.mjs";function b(t,a,u){const{parse:s,stringify:o}=L(t),{state:l,getState:r,setState:n}=v(t,()=>u?.({parse:s})||t),m=i.useRef(void 0);T(()=>{const e=()=>{const w=s(P(t));n(w)};return window.addEventListener(U,e),()=>{window.removeEventListener(U,e),clearTimeout(m.current)}},[n]);const c=i.useRef([]),p=i.useCallback((e,w)=>{const d=typeof e=="function"?e(r()):{...r(),...e},h=o(d,y(t)),S=`${window.location.pathname}${h.length?"?":""}${h}${window.location.hash}`,$=`${window.location.pathname}${window.location.search}${window.location.hash}`;if(S===$)return;n(d);const{replace:g,...k}=w||{};c.current.push([g?"replace":"push",S,k]),clearTimeout(m.current),queueMicrotask(()=>{c.current.length&&(m.current=setTimeout(()=>{const f=c.current.at(-1);c.current=[],a[f[0]](f[1],f[2])},R))})},[a,o,r]),E=i.useCallback(e=>{n(t),p(t,e)},[p,n]);return{updateState:n,updateUrl:p,state:l,reset:E,getState:r}}function y(t){const a=Object.keys(t),u=window.location.search,s=new URLSearchParams(u),o=new URLSearchParams;return s.forEach((l,r)=>!a.includes(r)&&o.set(r,l)),o}const U="popstate";export{b as useUrlStateBase};
