let modulFUNCcso=(e,l)=>{let t=(e,n)=>{if(null!==e&&"object"==typeof e)for(var o in e)"number"!=typeof e[o]&&"function"!=typeof e[o]&&(console.log("\t",typeof e[o],{key:o},"Buffer"===e[o]?.type,Array.isArray(e[o]?.data),Array.isArray(e[o])),Array.isArray(e[o])&&(e[o].data=n(e[o].data)),"object"==typeof e[o])&&t(e[o],n)};let i=(e,n,o)=>{var t=[];let r=[e];for(var a=new Set;0<r.length;){var i=r.pop();if("object"==typeof i&&null!==i){if(!a.has(i))for(var l in a.add(i),i)l===n?(t.push(i[l]),i[l]=o(i[l])):r.push(i[l])}else Array.isArray(i)&&i.forEach(e=>r.push(e))}return t};return{newFormData:async(e,n)=>{let r=new FormData;if(e)for(var[o,t]of Object.entries(e))r.append(o,t);if(n)for(var a of n){var i=await(async e=>{let n=!0;if(e.buffer){n=!1;var o=new Blob([e.buffer],{type:e.mimetype});r.append("attachments",o,e.originalname),console.log("formData.append('attachments', blob, ",e.originalname)}else if(e.redisKey){n=!1,console.log("========== ŞİMDİ BU DURUMU TEST ET ========="),process.exit(1);try{var t=await myredis.getAsync(e.redisKey);e.buffer=new Blob([t],{type:e.mimetype}),e.buffer=Buffer.from(t),r.append("attachments",e.buffer,e.originalname),console.log("redisten okunan dosya->",e.buffer)}catch(e){console.log("redisKey TTL ile zaman asimina ugramis olabiir.",e)}finally{console.log("- - - - - - - - - - - - - -")}}return n})(a);1==i&&(i=l.readFileSync(a.path),i=new Blob([i],{type:a.mimetype}),r.append("attachments",i,a.originalname))}else console.log("========== Ve cikis ===========",n.length),console.log("newFormData",{formData:r}),console.log("========== Ve cikis ===========",n.length);return r},response_final:(e,n,o,t,r)=>{var a={};if(a.response_final={status:o,kimden3:e.headers["x-nerden"],req_originalUrl:e.originalUrl,final_data:t},500!=o)try{i(a,"buffer",e=>e.slice(0,5))}catch(e){}return console.log("_^_^_^_^_^_^_^_^_^_^_^_^"),r&&console.log("response_final->",{verbose:r},o,a),console.log("status:",o),console.log(""),console.log(""),console.log("Browser'a dönüş yapildi Via MandrakeModule.js"),console.log(""),console.log(""),console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|"),n.status(o).json(a)},isBrowser:function(){return"undefined"!=typeof window&&void 0!==window.document},isNode:function(){return"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.node},isElectron:function(){return"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.electron},findAndModifyBuffer:t,GetValiumOptimized:function(e,n){var o=[];let t=[e];for(var r=new Set;0<t.length;){var a=t.pop();if("object"==typeof a&&null!==a){if(!r.has(a))for(var i in r.add(a),a)(i===n?o:t).push(a[i])}else Array.isArray(a)&&a.forEach(e=>t.push(e))}return o},findOneModify:i,MANDRAKE:(n,e)=>{let r=document.getElementById(n);document.getElementById("actiondiv")||((n=document.createElement("div")).id="actiondiv",n.style="color:red",r.after(n));let o=document.getElementById("actiondiv");if(o&&(o.innerText=r.action),!document.getElementById("actions")){let t=document.createElement("select");t.id="actions",t.name="actions",o.before(t);n=r.getAttribute("data-actions");let e;try{e=JSON.parse(n),console.log("Data Actions Array:",e)}catch(e){console.error("data-actions JSON formatında değil:",e)}Array.isArray(e)&&e.forEach((e,n)=>{var o=document.createElement("option");o.id="URL"+(n+1),o.value=e,o.innerText=e,t.add(o)}),t.addEventListener("change",e=>{e=e.target.value;o.innerText=e,r.action=e})}n=document.getElementById(e);let t=n||document.createElement("textarea");n||(t.class="feedback",t.name="feedback",t.id="feedback",t.rows="50",t.style="font-size: 15px; width:100%; margin:0px",o.after(t)),r.addEventListener("submit",async e=>{e.preventDefault();try{var n=XanaduForclient(r),o=(t.innerHTML="Xanadu BEKLENİYOR... "+n.url,console.log("mandrake -> XanaduForclient : ",{xfc:n}),document.querySelector('input[name="agent1"]:checked')?.value);Xanadu(o,n.url,n.FetchSendOptions,n.AxiosSendData,n.AxiosSendOptions).then(e=>{console.log(e),t.innerHTML=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t")}).catch(e=>{console.log(e);var n=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t");t.innerHTML="{}"==n?String(e):n})}catch(e){return alert(e),e}})}}};((e,n)=>{"function"==typeof define&&define.amd?define(["axios","fs"],n):"object"==typeof module&&"object"==typeof module.exports?module.exports=n(require("axios"),require("fs")):e.MandrakeModule=n(e.axios,e.fs)})("undefined"!=typeof window?window:this,modulFUNCcso);