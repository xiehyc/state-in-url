import t from"react";import{useInsertionEffect as e}from"../useInsertionEffect.mjs";import{useSharedState as n}from"../useSharedState/useSharedState.mjs";import{useUrlEncode as o}from"../useUrlEncode/useUrlEncode.mjs";import{filterUnknownParamsClient as r}from"../utils.mjs";function s(s,c,i){const{parse:u,stringify:h}=o(s),{state:l,getState:m,setState:p}=n(s,(()=>i?.({parse:u})||s));e((()=>{const t=()=>{const t=u(r(s));p(t)};return window.addEventListener(a,t),()=>{window.removeEventListener(a,t)}}),[p]);const d=t.useRef([]),w=t.useCallback(((t,e)=>{const n="function"==typeof t?t(m()):t?{...m(),...t}:m(),o=h(n,function(t){const e=Object.keys(t),n=window.location.search,o=new URLSearchParams(n),r=new URLSearchParams;return o.forEach(((t,n)=>!e.includes(n)&&r.set(n,t))),r}(s)),r=`${window.location.pathname}${o.length?"?":""}${o}${window.location.hash}`;if(r===`${window.location.pathname}${window.location.search}${window.location.hash}`)return;let a;p(n);const{replace:i,...u}=e||{};d.current.push([i?"replace":"push",r,u]),1===d.current.length&&queueMicrotask((()=>{for(;d.current.length;){const t=d.current.shift();t&&t?.[1]!==a?.[1]&&(a=t)}const[t,e,n]=a||{};a=void 0,t&&c[t](e,n)}))}),[c,h,m]);return{updateState:p,updateUrl:w,state:l,getState:m}}const a="popstate";export{s as useUrlStateBase};
