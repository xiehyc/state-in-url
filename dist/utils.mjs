function t(t){let n,e=t[0],o=1;for(;o<t.length;){const c=t[o],r=t[o+1];if(o+=2,("optionalAccess"===c||"optionalCall"===c)&&null==e)return;"access"===c||"optionalAccess"===c?(n=e,e=r(e)):"call"!==c&&"optionalCall"!==c||(e=r(((...t)=>e.call(n,...t))),n=void 0)}return e}const n=t=>{const n=typeof t,e=null===t,o=Array.isArray(t),c=t instanceof Date;return(e?"null":c&&"date")||o&&"array"||!e&&!c&&!o&&"object"===n&&"object"||n},e=()=>"undefined"==typeof window,o=n=>new URLSearchParams("string"==typeof n?c(n):t([n,"optionalAccess",t=>t.toString,"optionalCall",t=>t()])||""),c=n=>t([n,"access",t=>t.split,"call",t=>t("?"),"optionalAccess",t=>t[1]])||n||"",r=(t,n)=>JSON.stringify(t)===JSON.stringify(n);function a(t){const n=new URLSearchParams;return i(t,[...new URLSearchParams(window.location.search).entries()]).forEach((([t,e])=>n.set(t,e))),n.toString()}function s(t,n){return Object.fromEntries(i(t,Object.entries(n||{})))}function i(t,n){const e=Object.keys(t);return n.filter((([t])=>e.includes(t))).map((([t,n])=>[t.replaceAll("+"," "),n]))}function l(t,n,e){const o=Object.assign({},t,n);return Object.entries(t).forEach((([n])=>{const c=n,r=void 0!==e[c];o[c]=r?e[c]:t[c]})),o}export{l as assignValue,s as filterUnknownParams,a as filterUnknownParamsClient,o as getParams,r as isEqual,e as isSSR,n as typeOf};
