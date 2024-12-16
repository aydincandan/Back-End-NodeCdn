
const modulFUNCs2 = (axios, fs, MyCSOmodule) => {
    // -----------------
    // Preparing server2server
    const XanaduForserver = async (url, fields, files) => {
        // https://chatgpt.com/share/675c07a8-c340-8011-bd8f-534fcd12955f  ... için tipik bir SendOptions örneği ne olabilir
        const _newformdata = await MyCSOmodule.newFormData(fields, files);
        // console.log("_newformdata", _newformdata)
        // console.log("Server'dan Gönderilen/Gönderilecek form verileri(myCSOmodule):", Object.fromEntries(_newformdata));
        // console.log("___" + url + "___");
        const FetchSendOptions = {
            method: "POST",
            body: _newformdata,
            headers: {
                'x-nerden': 'x-server FETCH@action : ' + url
            }
        }
        const AxiosSendOptions = {
            method: "POST",
            headers: {
                'x-nerden': 'x-server AXIOS@action : ' + url
            }
        }

        const AxiosSendData = _newformdata

        return { url, FetchSendOptions, AxiosSendData, AxiosSendOptions }

    }
    // Preparing client2server
    const XanaduForclient = (htmlFormElement) => {
        // https://chatgpt.com/share/675c07a8-c340-8011-bd8f-534fcd12955f  ... için tipik bir SendOptions örneği ne olabilir
        const _newformdata = new FormData(htmlFormElement);
        const url = htmlFormElement.action;
        // console.log("_newformdata", _newformdata)
        // console.log("Client'dan Gönderilen/Gönderilecek form verileri(myCSOmodule):", Object.fromEntries(_newformdata));
        // console.log("___"+url+"___");
        const FetchSendOptions = {
            method: "POST",
            body: _newformdata,
            headers: {
                'x-nerden': 'x-client FETCH@action : ' + url
            }
        }
        const AxiosSendOptions = {
            method: "POST",
            headers: {
                'x-nerden': 'x-client AXIOS@action : ' + url
            }
        }

        const AxiosSendData = _newformdata

        return { url, FetchSendOptions, AxiosSendData, AxiosSendOptions }
    }
    const Xanadusoncikis = (fbTxtArea_innerHTML, jsonObj) => {
        const textObj = fbTxtArea_innerHTML
            + "<br />C.A.C"
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/\\n /gi, "\n\t"); // enson burada şekil veriliyor.

        let ortam = MyCSOmodule.isBrowser() ? "browser" : "node"
        const propertyName = "XanaduSoncikis_" + ortam;
        const urls = MyCSOmodule.findUrlsOptimized(jsonObj, "url")
        const result = { urls, [propertyName]: jsonObj }
        return result
    }
    // Takip için : gatewayApp.js deki         cso.Xanadu() fonksiyonu
    // Takip için : meylat.html   deki MyCSOmodule.Xanadu() fonksiyonu
    const Xanadu = (agent1, url, FetchSendOptions, AxiosSendData, AxiosSendOptions, fbTxtArea_innerHTML) => {
        let jsonObj = {
            SERVER: {
                thenResult: {},
                catchError: {}
            }
        };
        const zortam = "isBrowser : " + MyCSOmodule.isBrowser()
        // boşver jsonObj.zortam = zortam
        let res_json = {};
        if (agent1 == "axios") {
            fbTxtArea_innerHTML = "#Axios# Bekleniyor... ";
            // boşver jsonObj.wait = fbTxtArea_innerHTML
            // ilka.netlify.app'den alınmıştı (şimdi burası güncel gerekenleri updateet)
            return axios.post(url, AxiosSendData, AxiosSendOptions)
                .then(async (serviceResult) => {
                    fbTxtArea_innerHTML = zortam + "<br />"

                    res_json = serviceResult?.data;

                    // jsonObj.res_json = res_json // ?

                    jsonObj.SERVER.thenResult.statusText = serviceResult?.statusText
                    jsonObj.SERVER.thenResult.status = serviceResult?.status
                    // jsonObj.SERVER.thenResult.headers = serviceResult?.headers // şimdilik karışmasın
                    // jsonObj.SERVER.thenResult.config = serviceResult?.sonfig // şimdilik karışmasın
                    jsonObj.SERVER.thenResult.serviceResultData = serviceResult?.data;

                    if (res_json?.status == 200) {
                        fbTxtArea_innerHTML = fbTxtArea_innerHTML + "axios.than =1=> " + JSON.stringify(res_json, null, 4) + "<br />bitti.";
                    } else {
                        fbTxtArea_innerHTML = fbTxtArea_innerHTML + "axios.than =2=> " + JSON.stringify(res_json, null, 4) + "<br />bitti."; // message : Request failed with status code 500, buraya düşmüyor, catchError'a düşüyor.
                        // belki 500 haricindeki error'lar buraya düşer.
                    }

                    fbTxtArea_innerHTML = fbTxtArea_innerHTML + "<br />res_json.status: " + res_json?.status + "<br />serviceResult.status: " + serviceResult?.status

                }).catch((catchError) => {
                    fbTxtArea_innerHTML = zortam + "<br />"
                    jsonObj.SERVER.catchError.neoldu = " -axios.catch Biseyler yanlis gitti ! (Server down olmuş olabilir)"
                    jsonObj.SERVER.catchError.url = catchError?.config?.url
                    jsonObj.SERVER.catchError = catchError
                    jsonObj.SERVER.catchError.code = catchError?.code
                    jsonObj.SERVER.catchError.message = catchError?.message
                    jsonObj.SERVER.catchError.stack = catchError?.stack
                    jsonObj.SERVER.catchError.res_json = JSON.stringify(res_json, null, 4)
                    fbTxtArea_innerHTML = fbTxtArea_innerHTML + jsonObj.SERVER.catchError.neoldu + "<br />"
                        + " =1=> url : " + catchError?.config?.url + "<br />"
                        + " =2=> catchError : " + catchError + "<br />"
                        + " =3=> code : " + catchError?.code + "<br />"
                        + " =4=> message : " + catchError?.message + "<br />"
                        + " =5=> stack : " + catchError?.stack + "<br />"
                        + " =6=> res_json : " + JSON.stringify(res_json, null, 4) + "<br />"

                }).then(() => { return Xanadusoncikis(fbTxtArea_innerHTML, jsonObj) });
            // ilka.netlify.app'den alınmıştı (şimdi burası güncel gerekenleri updateet)
        }
        else {
            fbTxtArea_innerHTML = "#Fetch# Bekleniyor... "
            // boşver jsonObj.wait = fbTxtArea_innerHTML
            // ilka.netlify.app'den alınmıştı (şimdi burası güncel gerekenleri updateet)
            return fetch(url, FetchSendOptions)
                .then(async (serviceResult) => {
                    fbTxtArea_innerHTML = zortam + "<br />"

                    res_json = await serviceResult.json();

                    // jsonObj.res_json = res_json // ?

                    jsonObj.SERVER.thenResult.statusText = serviceResult?.statusText
                    jsonObj.SERVER.thenResult.status = serviceResult?.status
                    // jsonObj.SERVER.thenResult.headers = serviceResult?.headers // şimdilik karışmasın
                    // jsonObj.SERVER.thenResult.config = serviceResult?.sonfig // şimdilik karışmasın
                    jsonObj.SERVER.thenResult.serviceResultData = res_json;

                    if (res_json?.status == 200) {
                        fbTxtArea_innerHTML = fbTxtArea_innerHTML + "fetch.than =1=> " + JSON.stringify(res_json, null, 4) + "<br />bitti.";
                    } else {
                        fbTxtArea_innerHTML = fbTxtArea_innerHTML + "fetch.than =2=> " + JSON.stringify(res_json, null, 4) + "<br />bitti.";
                    }

                    fbTxtArea_innerHTML = fbTxtArea_innerHTML + "<br />res_json.status: " + res_json?.status + "<br />serviceResult.status: " + serviceResult?.status

                }).catch((catchError) => {
                    fbTxtArea_innerHTML = zortam + "<br />"
                    jsonObj.SERVER.catchError.neoldu = " -fetch.catch Biseyler yanlis gitti ! (Server down olmuş olabilir)"
                    jsonObj.SERVER.catchError.url = catchError?.config?.url
                    jsonObj.SERVER.catchError = catchError
                    jsonObj.SERVER.catchError.code = catchError?.code
                    jsonObj.SERVER.catchError.message = catchError?.message
                    jsonObj.SERVER.catchError.stack = catchError?.stack
                    jsonObj.SERVER.catchError.res_json = JSON.stringify(res_json, null, 4)
                    fbTxtArea_innerHTML = fbTxtArea_innerHTML + jsonObj.SERVER.catchError.neoldu + "<br />"
                        + " =1=> url : " + catchError?.config?.url + "<br />"
                        + " =2=> catchError : " + catchError + "<br />"
                        + " =3=> code : " + catchError?.code + "<br />"
                        + " =4=> message : " + catchError?.message + "<br />"
                        + " =5=> stack : " + catchError?.stack + "<br />"
                        + " =6=> res_json : " + JSON.stringify(res_json, null, 4) + "<br />"

                }).then(() => { return Xanadusoncikis(fbTxtArea_innerHTML, jsonObj) });
            // ilka.netlify.app'den alınmıştı (şimdi burası güncel gerekenleri updateet)
        }

    }
    const mandrake = (htmlFormElementID, htmlFormElementTextareaID) => {
        // bu fonksiyona mecbur değilsin. Örnek alıp diğer modül fonksiyonları ile birlikte özelleştirebilirsin.
        const htmlFormElement = document.getElementById(htmlFormElementID);

        if(!document.getElementById("action")){
            const action = document.createElement("div");
            action.id = "action";
            htmlFormElement.after(action);
        };
        if(document.getElementById("action"))document.getElementById("action").innerHTML = htmlFormElement.action;

        const fbTxtArea = document.getElementById(htmlFormElementTextareaID);

        htmlFormElement.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {

                const r = XanaduForclient(htmlFormElement);

                fbTxtArea.innerHTML = "Xanadu BEKLENİYOR... " + r.url

                console.log("mandrake -> XanaduForclient : ", { r })

                const selectedAgent = document.querySelector('input[name="agent1"]:checked')?.value;

                // console.log("= = = = = = = = ", selectedAgent)
                //***
                const agent1 = selectedAgent
                Xanadu(agent1, r.url, r.FetchSendOptions, r.AxiosSendData, r.AxiosSendOptions)
                    .then(result => {
                        fbTxtArea.innerHTML = JSON.stringify(result, null, 4).replace(/<br\s*\/?>/gi, "\n").replace(/\\n /gi, "\n\t");
                    })
                    .catch(err => {
                        const hata = (JSON.stringify(err, null, 4).replace(/<br\s*\/?>/gi, "\n").replace(/\\n /gi, "\n\t"))
                        fbTxtArea.innerHTML = hata == "{}" ? String(err) : hata;
                    });
                //***
                // console.log("= = = = = = = = ", agent1)
            } catch (TryError) {
                alert(TryError)
            }

        })

    }
    // -----------------

    return {
        XanaduForserver,
        XanaduForclient,
        Xanadu,
        mandrake
    };
}

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['axios', 'fs', 'MyCSOmodule'], factory);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(require('axios'), require('fs'), require('./MyCSOmodule'));
    } else {
        global.Xanadu = factory(global.axios, global.fs, global.MyCSOmodule);
    }
})(typeof window !== 'undefined' ? window : this, modulFUNCs2);
