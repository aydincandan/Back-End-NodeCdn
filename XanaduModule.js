let modulFUNCs2=(l,e,u)=>{let o=e=>{var t=new FormData(e),e=e.action;return{url:e,FetchSendOptions:{method:"POST",body:t,headers:{"x-nerden":"x-client FETCH@action : "+e}},AxiosSendData:t,AxiosSendOptions:{method:"POST",headers:{"x-nerden":"x-client AXIOS@action : "+e}}}},d=(e,t)=>{"<br />C.A.C".replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t");var r="XanaduSoncikis_"+(u.isBrowser()?"browser":"node");return{urls:u.GetValiumOptimized(t,"url"),[r]:t}},c=(e,t,r,n,s,a)=>{let o={SERVER:{thenResult:{},catchError:{}}},c="isBrowser : "+u.isBrowser(),i={};return("axios"==e?(a="#Axios# Bekleniyor... ",l.post(t,n,s).then(async e=>{a=c+"<br />",i=e?.data,o.SERVER.thenResult.statusText=e?.statusText,o.SERVER.thenResult.status=e?.status,o.SERVER.thenResult.serviceResultData=e?.data,a=(a=200==i?.status?a+"axios.than =1=> "+JSON.stringify(i,null,4)+"<br />bitti.":a+"axios.than =2=> "+JSON.stringify(i,null,4)+"<br />bitti.")+"<br />res_json.status: "+i?.status+"<br />serviceResult.status: "+e?.status}).catch(e=>{a=c+"<br />",o.SERVER.catchError.neoldu=" -axios.catch Biseyler yanlis gitti ! (Server down olmuş olabilir)",o.SERVER.catchError.url=e?.config?.url,o.SERVER.catchError=e,o.SERVER.catchError.code=e?.code,o.SERVER.catchError.message=e?.message,o.SERVER.catchError.stack=e?.stack,o.SERVER.catchError.res_json=JSON.stringify(i,null,4),a=a+o.SERVER.catchError.neoldu+"<br /> =1=> url : "+e?.config?.url+"<br /> =2=> catchError : "+e+"<br /> =3=> code : "+e?.code+"<br /> =4=> message : "+e?.message+"<br /> =5=> stack : "+e?.stack+"<br /> =6=> res_json : "+JSON.stringify(i,null,4)+"<br />"})):(a="#Fetch# Bekleniyor... ",fetch(t,r).then(async e=>{a=c+"<br />",i=await e.json(),o.SERVER.thenResult.statusText=e?.statusText,o.SERVER.thenResult.status=e?.status,o.SERVER.thenResult.serviceResultData=i,a=(a=200==i?.status?a+"fetch.than =1=> "+JSON.stringify(i,null,4)+"<br />bitti.":a+"fetch.than =2=> "+JSON.stringify(i,null,4)+"<br />bitti.")+"<br />res_json.status: "+i?.status+"<br />serviceResult.status: "+e?.status}).catch(e=>{a=c+"<br />",o.SERVER.catchError.neoldu=" -fetch.catch Biseyler yanlis gitti ! (Server down olmuş olabilir)",o.SERVER.catchError.url=e?.config?.url,o.SERVER.catchError=e,o.SERVER.catchError.code=e?.code,o.SERVER.catchError.message=e?.message,o.SERVER.catchError.stack=e?.stack,o.SERVER.catchError.res_json=JSON.stringify(i,null,4),a=a+o.SERVER.catchError.neoldu+"<br /> =1=> url : "+e?.config?.url+"<br /> =2=> catchError : "+e+"<br /> =3=> code : "+e?.code+"<br /> =4=> message : "+e?.message+"<br /> =5=> stack : "+e?.stack+"<br /> =6=> res_json : "+JSON.stringify(i,null,4)+"<br />"}))).then(()=>d(0,o))};return{XanaduForserver:async(e,t,r)=>{t=await u.newFormData(t,r);return{url:e,FetchSendOptions:{method:"POST",body:t,headers:{"x-nerden":"x-server FETCH@action : "+e}},AxiosSendData:t,AxiosSendOptions:{method:"POST",headers:{"x-nerden":"x-server AXIOS@action : "+e}}}},XanaduForclient:o,Xanadu:c,mandrake:(e,t)=>{let s=document.getElementById(e);document.getElementById("action")||((e=document.createElement("div")).id="actiondiv",e.style="color:red",s.after(e)),document.getElementById("actiondiv")&&(document.getElementById("actiondiv").innerHTML=s.action);e=document.getElementById(t);let a=e||document.createElement("textarea");e||(a.class="feedback",a.name="feedback",a.id="feedback",a.rows="50",a.style="font-size: 15px; width:100%; margin:0px",document.getElementById("actiondiv").after(a)),s.addEventListener("submit",async e=>{e.preventDefault();try{var t=o(s),r=(a.innerHTML="Xanadu BEKLENİYOR... "+t.url,console.log("mandrake -> XanaduForclient : ",{xfc:t}),document.querySelector('input[name="agent1"]:checked')?.value),n=r;c(n,t.url,t.FetchSendOptions,t.AxiosSendData,t.AxiosSendOptions).then(e=>{console.log(e),a.innerHTML=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t")}).catch(e=>{console.log(e);var t=JSON.stringify(e,null,4).replace(/<br\s*\/?>/gi,"\n").replace(/\\n /gi,"\n\t");a.innerHTML="{}"==t?String(e):t})}catch(e){return alert(e),e}})}}};((e,t)=>{"function"==typeof define&&define.amd?define(["axios","fs","MyCSOmodule"],t):"object"==typeof module&&"object"==typeof module.exports?module.exports=t(require("axios"),require("fs"),require("./MyCSOmodule")):e.XanaduModule=t(e.axios,e.fs,e.MyCSOmodule)})("undefined"!=typeof window?window:this,modulFUNCs2);