let modulFUNCmdk=(e,i)=>{let t=(e,o)=>{if(null!==e&&"object"==typeof e)for(var n in e)"number"!=typeof e[n]&&"function"!=typeof e[n]&&(console.log("\t",typeof e[n],{key:n},"Buffer"===e[n]?.type,Array.isArray(e[n]?.data),Array.isArray(e[n])),Array.isArray(e[n])&&(e[n].data=o(e[n].data)),"object"==typeof e[n])&&t(e[n],o)};let l=(e,o,n)=>{var t=[];let r=[e];for(var a=new Set;0<r.length;){var l=r.pop();if("object"==typeof l&&null!==l){if(!a.has(l))for(var i in a.add(l),l)i===o?(t.push(l[i]),l[i]=n(l[i])):r.push(l[i])}else Array.isArray(l)&&l.forEach(e=>r.push(e))}return t};return{newFormData:async(e,o)=>{let r=new FormData;if(e)for(var[n,t]of Object.entries(e))r.append(n,t);if(o)for(var a of o){var l=await(async e=>{let o=!0;if(e.buffer){o=!1;var n=new Blob([e.buffer],{type:e.mimetype});r.append("attachments",n,e.originalname),console.log("formData.append('attachments', blob, ",e.originalname)}else if(e.redisKey){o=!1,console.log("========== ŞİMDİ BU DURUMU TEST ET ========="),process.exit(1);try{var t=await myredis.getAsync(e.redisKey);e.buffer=new Blob([t],{type:e.mimetype}),e.buffer=Buffer.from(t),r.append("attachments",e.buffer,e.originalname),console.log("redisten okunan dosya->",e.buffer)}catch(e){console.log("redisKey TTL ile zaman asimina ugramis olabiir.",e)}finally{console.log("- - - - - - - - - - - - - -")}}return o})(a);1==l&&(l=i.readFileSync(a.path),l=new Blob([l],{type:a.mimetype}),r.append("attachments",l,a.originalname))}else console.log("========== Ve cikis ===========",o.length),console.log("newFormData",{formData:r}),console.log("========== Ve cikis ===========",o.length);return r},response_final:(e,o,n,t,r)=>{var a={};if(a.response_final={status:n,kimden3:e.headers["x-nerden"],req_originalUrl:e.originalUrl,final_data:t},500!=n)try{l(a,"buffer",e=>e.slice(0,5))}catch(e){}return console.log("_^_^_^_^_^_^_^_^_^_^_^_^"),r&&console.log("response_final->",{verbose:r},n,a),console.log("status:",n),console.log(""),console.log(""),console.log("Browser'a dönüş yapildi Via MandrakeModule.js"),console.log(""),console.log(""),console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|"),o.status(n).json(a)},isBrowser:function(){return"undefined"!=typeof window&&void 0!==window.document},isNode:function(){return"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.node},isElectron:function(){return"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.electron},findAndModifyBuffer:t,GetValiumOptimized:function(e,o){var n=[];let t=[e];for(var r=new Set;0<t.length;){var a=t.pop();if("object"==typeof a&&null!==a){if(!r.has(a))for(var l in r.add(a),a)(l===o?n:t).push(a[l])}else Array.isArray(a)&&a.forEach(e=>t.push(e))}return n},findOneModify:l,Mandrake:(e,o,n)=>{let r=document.getElementById(e);var e=window.location.origin,t=window.location.protocol,a=window.location.hostname,l=window.location.port;let{prod_server_origin:i,prod_client_origin:s,mndrk_Actions:c}=n,d=e=>new URL(e).origin,f=!1,u=!1,p=(e==d(t+"localhost:"+l)?f=!0:u=!0,!1),g=!1;e==s?g=!0:p=!0,console.log({LOCA:f}),console.log(e,d(t+"localhost:"+l)),console.log({REMO:u}),console.log({TEST:p}),console.log(1,{docClientOrigin:e}),console.log(2,{prod_client_origin:s}),console.log(3,{prod_server_origin:i});n=new URL(i),console.log(n.href),console.log(n.pathname),console.log({PROD:g}),console.log({docClientOrigin:e,docClientProtocol:t,docClientHostname:a,docClientPort:l}),n=r.getAttribute("data-mndrk_Actions");let m;if(n)try{m=JSON.parse(n),console.log("Data Actions Array:",m)}catch(e){console.error("data-mndrk_Actions JSON formatında değil:",e)}else m=c;Array.isArray(m)&&m.forEach((e,o,n)=>{1==f&&1==p?n[o]=e:1==u&&1==g?n[o]=e.replace(d(e),i):n[o]="action bilinmiyor"}),document.getElementById("selectedRedActionDiv")||((e=document.createElement("div")).id="selectedRedActionDiv",e.style="color:red",r.after(e));let y=document.getElementById("selectedRedActionDiv");if(y&&(y.innerText=m[0],r.action=m[0]),!document.getElementById("actions")){let t=document.createElement("select");t.id="actions",t.name="actions",y.before(t),Array.isArray(m)&&m.forEach((e,o)=>{var n=document.createElement("option");n.id="URL"+(o+1),n.value=e,n.innerText=`LOCAL: ${f} ve TEST: ${p} | `+e,t.add(n)}),t.addEventListener("change",e=>{e=e.target.value;y.innerText=e,r.action=e})}t=document.getElementById(o);let v=t||document.createElement("textarea");t||(v.class="feedback",v.name="feedback",v.id="feedback",v.rows="50",v.style="font-size: 15px; width:100%; margin:0px",y.after(v)),r.addEventListener("submit",async e=>{e.preventDefault();try{var o=XanaduForclient(r),n=(v.innerHTML="Xanadu BEKLENİYOR... "+o.url,console.log("mandrake -> XanaduForclient : ",{xfc:o}),document.querySelector('input[name="agent1"]:checked')?.value);Xanadu(n,o.url,o.FetchSendOptions,o.AxiosSendData,o.AxiosSendOptions).then(e=>{console.log(e),v.innerHTML=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t")}).catch(e=>{console.log(e);var o=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t");v.innerHTML="{}"==o?String(e):o})}catch(e){return alert(e),e}})}}};((e,o)=>{"function"==typeof define&&define.amd?define(["fs"],o):"object"==typeof module&&"object"==typeof module.exports?module.exports=o(require("fs")):e.MandrakeModule=o(e.fs)})("undefined"!=typeof window?window:this,modulFUNCmdk);