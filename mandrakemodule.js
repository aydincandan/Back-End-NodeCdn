let modulFUNCmdk=d=>{let t=(e,o)=>{if(null!==e&&"object"==typeof e)for(var n in e)"number"!=typeof e[n]&&"function"!=typeof e[n]&&(console.log("\t",typeof e[n],{key:n},"Buffer"===e[n]?.type,Array.isArray(e[n]?.data),Array.isArray(e[n])),Array.isArray(e[n])&&(e[n].data=o(e[n].data)),"object"==typeof e[n])&&t(e[n],o)};let a=(e,o,n)=>{var t=[];let r=[e];for(var l=new Set;0<r.length;){var a=r.pop();if("object"==typeof a&&null!==a){if(!l.has(a))for(var i in l.add(a),a)i===o?(t.push(a[i]),a[i]=n(a[i])):r.push(a[i])}else Array.isArray(a)&&a.forEach(e=>r.push(e))}return t};let S=(e,o)=>{o.after(e)},_=(o,...e)=>{let n=null;e.forEach(e=>{n?o.insertBefore(e,n.nextSibling):o.appendChild(e),n=e})};return{zamanDamgasi:()=>{var e=new Date;return`${e.getFullYear()}.${String(e.getMonth()+1).padStart(2,"0")}.${String(e.getDate()).padStart(2,"0")}-${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}:${String(e.getSeconds()).padStart(2,"0")}:`+String(e.getMilliseconds()).padStart(3,"0")},newFormData:async(e,o,n)=>{var t=n||!1;t&&console.log("*** BAŞLIYOR-1 ***",e);let r=new FormData;if(e&&o){if(t&&console.log("boş mu",r),e)for(var[l,a]of Object.entries(e))r.append(l,a);if(t&&console.log("dolu mu",r),o){t&&console.log("*** BAŞLIYOR-2 ***",o);for(var i of o){var s=await(async e=>{let o=!0;if(e.buffer){o=!1;var n=new Blob([e.buffer],{type:e.mimetype});r.append("attachments",n,e.originalname),console.log("formData.append('attachments', blob, ",e.originalname)}else if(e.redisKey){o=!1,console.log("========== ŞİMDİ BU DURUMU TEST ET ========="),process.exit(1);try{var t=await myredis.getAsync(e.redisKey);e.buffer=new Blob([t],{type:e.mimetype}),e.buffer=Buffer.from(t),r.append("attachments",e.buffer,e.originalname),console.log("redisten okunan dosya->",e.buffer)}catch(e){console.log("redisKey TTL ile zaman asimina ugramis olabiir.",e)}finally{console.log("- - - - - - - - - - - - - -")}}return o})(i);t&&console.log("sonuc file_buffer_VEYA_file_redisKey",s),1==s&&(s=d.readFileSync(i.path),t&&console.log("fileBuffer",s),s=new Blob([s],{type:i.mimetype}),r.append("attachments",s,i.originalname),t)&&console.log("|========== EKLENDI ===========",i.originalname)}t&&console.log("nasıl dolu mu",r),t&&console.log("|========== "+o.length+" =========== tüm attacler eklendi")}else t||console.log("========== Ve cikis ===========",o.length),t||console.log("newFormData",{formData:r}),t||console.log("========== Ve cikis ===========",o.length),t&&console.log("newFormData *** BİTTİ *** return formData")}return r},response_final:(e,o,n,t,r)=>{var l={};if(l.response_final={status:n,kimden3:e.headers["x-nerden"],req_originalUrl:e.originalUrl,final_data:t},500!=n)try{a(l,"buffer",e=>e.slice(0,5))}catch(e){}return console.log("_^_^_^_^_^_^_^_^_^_^_^_^"),r&&console.log("response_final->",{verbose:r},n,l),console.log("status:",n),console.log(""),console.log(""),console.log("Browser'a dönüş yapildi Via mandrakemodule.js"),console.log(""),console.log(""),console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|"),o.status(n).json(l)},isBrowser:()=>"undefined"!=typeof window&&void 0!==window.document,isNode:()=>"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.node,isElectron:()=>"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.electron,findAndModifyBuffer:t,GetValiumOptimized:function(e,o){var n=[];let t=[e];for(var r=new Set;0<t.length;){var l=t.pop();if("object"==typeof l&&null!==l){if(!r.has(l))for(var a in r.add(l),l)(a===o?n:t).push(l[a])}else Array.isArray(l)&&l.forEach(e=>t.push(e))}return n},findOneModify:a,Mandrake:(o,e)=>{let r=e=>o+"_"+e,l=(e,o)=>document.getElementById(o)?document.getElementById(o):((e,o)=>{e=document.createElement(e),o=r(o);return e.name=o,e.id=o,e})(e,o),n=!1,{prod_server_origin:a,prod_client_origin:t,mndrk_Actions:i}=(null==e||0==Object.keys(e).length?e={prod_server_origin:"",prod_client_origin:"",mndrk_Actions:[]}:n=!0,e),s=e=>new URL(e).origin;var d=window.location.origin,c=window.location.protocol,u=window.location.hostname,f=window.location.port;let m=!1,g=!1,p=(d==s(c+"localhost:"+f)?m=!0:g=!0,!1),y=!1,b=(d==t?y=!0:p=!0,document.getElementById(o));d={PROD:y,TEST:p,REMO:g,LOCA:m,docClientOrigin:d,docClientProtocol:c,docClientHostname:u,docClientPort:f,htmlFormElement:b,setup_mevcut:n,setup:e};if(!b)return console.error(o+" -> htmlFormElementID tanimli değil!"),d;c=b.action,u=b.baseURI,f=!(c===u),e={userManuelACTION:c,baseURI:u,userManuelACTIONvar:f,...d},console.log({RETURNS:e}),u=l("div","MndrkDIV");let v=l("div","AksiyonTutucu");var h,d=l("textarea","feedback"),w=(d.className="mandrakefeedback",d.style="font-size: 10px; width: 100%; margin: 0px; color: yellow; background-color: black;",d.readOnly=!0,d.rows=10,d.addEventListener("mousedown",function(e){var o,n;e.ctrlKey&&(o=e.target,n=parseInt(o.getAttribute("rows"),10),0===e.button?o.setAttribute("rows",n+1):2===e.button&&1<n&&o.setAttribute("rows",n-1))}),d.addEventListener("contextmenu",function(e){e.preventDefault()}),b.elements),k={};for(h of w){var E=h.type;k[E]||(k[E]=[]),k[E].push(h)}if(k.submit.forEach((o,e,n)=>{o.addEventListener("mouseover",function(){var e=o.dataset.action;e&&(b.action=e,v.innerHTML="<b>"+e+"</b>")})}),0==f&&1==n){Array.isArray(i)&&i.forEach((e,o,n)=>{1==m&&1==p?n[o]=e:1==g&&1==y?n[o]=e.replace(s(e),a):n[o]="action bilinmiyor"}),S(u,b),v.style="color:red; background-color: yellow",v.innerHTML="<b style='color:blue'>"+i[0]+"</b>",b.action=i[0];let t=l("select","select");i.forEach((e,o)=>{var n=l("option","option");n.id="URL"+(o+1),n.value=e,n.innerText=`LOCAL: ${m} ve TEST: ${p} | `+e,t.add(n)}),t.addEventListener("change",e=>{e=e.target.value;v.innerHTML="<b style='color:blue'>"+e+"</b>",b.action=e});w=document.querySelector("#"+r("MndrkDIV"));_(w,t,v,d)}else{S(u,b),v.style="color:white; background-color: green",v.innerHTML="<b>"+c+"</b>",b.action=c;f=document.querySelector("#"+r("MndrkDIV"));_(f,v,d)}return b.addEventListener("submit",async e=>{e.preventDefault();let n=document.getElementById(r("feedback"));var e=XanaduForclient(b),o=(n.innerHTML="Xanadu BEKLENİYOR... "+e.url,document.querySelector('input[name="agent1"]:checked')?.value);Xanadu(o,e.url,e.FetchSendOptions,e.AxiosSendData,e.AxiosSendOptions).then(e=>{n.innerHTML=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t")}).catch(e=>{console.log({errXanadu:e});var o=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t");n.innerHTML="{}"==o?String(e):o})}),e},DOMContentLoaded:e=>{window.addEventListener("DOMContentLoaded",e)}}},globalSCOPEmdk="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this;((e,o)=>{"function"==typeof define&&define.amd?(console.log("--------------- mandrakemodule AMD"),define(["fs"],o)):"object"==typeof module&&"object"==typeof module.exports?(console.log("--------------- mandrakemodule CJS"),module.exports=o(require("fs"))):(console.log("--------------- mandrakemodule BRW-1"),void 0===e.fs?(console.error("HATA: global.fs tanimli değil!"),e.mandrakemodule=modulFUNCmdk(e.fs)):e.mandrakemodule=o(e.fs))})(globalSCOPEmdk,modulFUNCmdk);