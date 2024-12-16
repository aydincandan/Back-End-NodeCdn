
const modulFUNCs = (axios, fs) => {
    // Modül içeriği

    // Ref : https://chatgpt.com/share/67547bfa-7070-8011-9232-9cb9c75bcc59    (Güncellenmiş UMD Örneği)


    // -----------------
    const newFormData = async (formFields, formFiles) => {
        const v = false
        if (v) console.log("*** BAŞLIYOR-1 ***", formFields)

        // https://chatgpt.com/share/67472f48-1890-8011-844b-c91f89e54a6e
        const formData = new FormData();

        const file_buffer_VEYA_file_redisKey = async (file) => {
            // console.log("fi----------------------------le")
            // console.log(file)
            // console.log("fi----------------------------le")
            let file_path_var = true
            //*
            if (file.buffer) {
                file_path_var = false
                const blob = new Blob([file.buffer], { type: file.mimetype });
                // console.log({blob})
                formData.append('attachments', blob, file.originalname);
                // burası O.K.
                console.log(file.originalname)
            }
            else {
                // myredis'ten redisKey ile okusun
                if (file.redisKey) {
                    file_path_var = false

                    // !?dikkat ancak multer geçmişi varsa redise girmiştir
                    // bizde eğer MemoryStorage kullandığımızda redise sokmaya "karar verirsek" redis'ten dosyayı okuyabiliriz

                    console.log("========== ŞİMDİ BU DURUMU TEST ET =========")
                    process.exit(1)
                    try {
                        const base64data = await myredis.getAsync(file.redisKey)

                        file.buffer = new Blob([base64data], { type: file.mimetype });

                        file.buffer = Buffer.from(base64data)

                        formData.append('attachments', file.buffer, file.originalname);
                        console.log("redisten okunan dosya->", file.buffer)
                    }
                    catch (e) {
                        console.log("redisKey TTL ile zaman asimina ugramis olabiir.", e)
                    } finally {
                        console.log("- - - - - - - - - - - - - -")
                    }
                }
            }
            //*

            return file_path_var;
        }

        if (v) console.log("boş mu", formData)
        // varsa Form elemanlarını ekle
        if (formFields) {
            for (const [key, value] of Object.entries(formFields)) {
                formData.append(key, value);
            }
        }
        if (v) console.log("dolu mu", formData)

        if (formFiles) {
            if (v) console.log("*** BAŞLIYOR-2 ***", formFiles)
            for (const file of formFiles) {
                // console.log("file", file)    
                const sonuc = await file_buffer_VEYA_file_redisKey(file)
                if (v) console.log("sonuc file_buffer_VEYA_file_redisKey", sonuc)

                if (sonuc == true) {

                    // ÇOK ÖNEMLİ : https://chatgpt.com/share/675bf96f-57d8-8011-8171-6bcfd1e99125 
                    const hangisi = 1
                    if (hangisi == 1) {
                        // Küçük Dosyalar (1-2 MB gibi): fs.readFileSync veya fs.readFile (asenkron versiyon) daha basit bir çözüm sunar.
                        const fileBuffer = fs.readFileSync(file.path); // Bloklama (Blocking): fs.readFileSync senkronize çalışan bir metottur. 
                        if (v) console.log("fileBuffer", fileBuffer)
                        const blob = new Blob([fileBuffer], { type: file.mimetype });
                        formData.append('attachments', blob, file.originalname);
                        // Büyük dosyalar için bellek tüketimi artar.
                    } else {
                        // Büyük Dosyalar (10+ MB veya daha fazla): fs.createReadStream bellek ve performans açısından daha avantajlıdır.
                        const fileBuffer = fs.createReadStream(file.path); // Akış Tabanlı (Streaming): fs.createReadStream, bir dosyayı parça parça (chunk) okur ve veriyi bir stream (akış) olarak döner.
                        if (v) console.log("fileBuffer", fileBuffer)
                        const blob = new Blob([fileBuffer], { type: file.mimetype });
                        formData.append('attachments', blob, file.originalname);
                        // Akış yönetimi ek kod yazmayı gerektirebilir.
                    }

                    if (v) console.log("|========== " + "EKLENDI" + " ===========", file.originalname)
                }
            }
            if (v) console.log("nasıl dolu mu", formData);
            if (v) console.log("|========== " + formFiles.length + " =========== tüm attacler eklendi");

            return formData
        }

        if (!v) console.log("========== Ve çıkış ===========", formFiles.length);
        if (!v) console.log("newFormData", { formData });
        if (!v) console.log("========== Ve çıkış ===========", formFiles.length);
        if (v) console.log("newFormData *** BİTTİ *** return formData");
        return formData

    }


    const response_final = (req, res, status, final_data, verbose) => {
        let donusyap = {}
        donusyap.response_final = {
            status: status,
            kimden1: req.get('Referer'),
            kimden2: req.get('Origin'),
            kimden3: req.headers['x-nerden'],
            kimden4: req.connection.remoteAddress,
            req_originalUrl: req.originalUrl,
            final_data
        }

        if (status != 500) {
            // console.log("response_final varsa kırpcaz 1", donusyap)
            // console.log("--------------")
            const benimDegistiriciFonksiyonum = (pvalue) => {
                console.log("myModifierFunc pvalue:", pvalue)

                // const kirptik = pvalue.map(itm => itm ** 2).slice(0, 5)
                const kirptik = pvalue.slice(0, 5)

                return kirptik;
            }
            findOneModify(donusyap, "buffer", benimDegistiriciFonksiyonum)
            // findsModify(donusyap, ["buffer","content"], benimDegistiriciFonksiyonum)
        }
        console.log("_^_^_^_^_^_^_^_^_^_^_^_^")

        if (verbose) console.log("response_final->", { verbose }, status, donusyap);

        console.log("status:", status);
        console.log("");
        console.log("");
        console.log("Browser'a dönüş yapildi Via MyCSOmodule.js");
        console.log("");
        console.log("");
        console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|");

        return res.status(status).json(donusyap);
    }

    function isBrowser() { return typeof window !== 'undefined' && typeof window.document !== 'undefined'; }
    function isNode() { return typeof process !== 'undefined' && process.versions != null && process.versions.node != null; }
    function isElectron() { return typeof process !== 'undefined' && process.versions != null && process.versions.electron != null; }

    // processArray_WithAnACTION
    const sihirliGPTbozukolabilir = async (array, myACTION) => {
        for (const item of array) {
            return await new Promise(
                async resolveNext => {
                    return await myACTION(item, resolveNext)
                }
            );
        }
    }
    // GPT BOZUK NEDENI VE DÜZELTILMIŞI : https://chatgpt.com/share/675af10c-56bc-8011-9aff-09bfd8c43c26
    const sihirliGPTDuzeltilmis = async (array, myACTION) => {
        for (const item of array) {
            await new Promise(resolveNext => {
                myACTION(item, resolveNext);
            });
        }
    };


    const processItem_WithAnACTION = async (myACTION) => {

        return await new Promise(
            async resolveNext => {
                return await myACTION(resolveNext)
            }
        );

    }

    function findUrls(obj) {
        let urls = [];

        function recursiveSearch(item) {
            if (typeof item === "object" && item !== null) {
                for (const key in item) {
                    if (key === "url") {
                        urls.push(item[key]);
                    } else {
                        recursiveSearch(item[key]);
                    }
                }
            } else if (Array.isArray(item)) {
                item.forEach(recursiveSearch);
            }
        }

        recursiveSearch(obj);

        return urls;
    }
    function findUrlsSafely(obj) {
        // Ok başarılı
        const urls = [];
        const visited = new Set(); // Daha önce ziyaret edilen nesneleri takip eder

        function recursiveSearch(item) {
            if (typeof item === "object" && item !== null) {
                if (visited.has(item)) return; // Daha önce ziyaret edilen nesneyi atla
                visited.add(item); // Ziyaret edildi olarak işaretle

                for (const key in item) {
                    if (key === "url") {
                        urls.push(item[key]); // `url` key'inin değerini kaydet
                    } else {
                        recursiveSearch(item[key]); // Alt nesneyi kontrol et
                    }
                }
            } else if (Array.isArray(item)) {
                item.forEach(recursiveSearch); // Array içeriğini kontrol et
            }
        }

        recursiveSearch(obj);

        return urls;
    }


    // https://chatgpt.com/share/67514924-10d8-8011-825e-c8c4840ea31f
    const findAndModifyBuffer = (data, myModifierFunc) => {
        // console.log("111 1 1 1 1 1  111111 1 1 1 1 1 1 1 1 1 1  1 11 1 1 1 1 ", (typeof data))
        if (data === null || typeof data !== 'object') return; // null veya obje değilse işlem yapmıyoruz.

        for (const key in data) {
            if (typeof data[key] != "number" && typeof data[key] != "function") {

                console.log("\t", typeof data[key], { key }, data[key]?.type === 'Buffer', Array.isArray(data[key]?.data), Array.isArray(data[key]))

                if (Array.isArray(data[key])) {
                    // buffer'ın data alanını myModifierFunc ile güncelle
                    data[key].data = myModifierFunc(data[key].data);
                }

                // Eğer bir alt nesne veya array ise, rekürsif olarak ilerle
                if (typeof data[key] === 'object') {
                    findAndModifyBuffer(data[key], myModifierFunc);
                }
            }
        }

        // // Eğer data bir array ise, elemanlar üzerinden de döngü yap
        // if (Array.isArray(data)) {
        //     for (const item of data) {
        //         findAndModifyBuffer(item, myModifierFunc);
        //     }
        // }
    }

    // REF : https://chatgpt.com/share/675d8038-47d0-8011-abab-c8aae300ace2
    function findUrlsOptimized(obj, pname) {
        // bir kere test ettim Sonuç : Mükemmel  findUrlsOptimized
        const maResults = [];
        const stack = [obj];
        const visited = new Set(); // Döngüsel referansları kontrol etmek için

        while (stack.length > 0) {
            const current = stack.pop();

            if (typeof current === "object" && current !== null) {
                if (visited.has(current)) continue; // Daha önce işlenen nesneyi atla
                visited.add(current);

                for (const key in current) {
                    if (key === pname) {
                        maResults.push(current[key]);
                    } else {
                        stack.push(current[key]);
                    }
                }
            } else if (Array.isArray(current)) {
                current.forEach(item => stack.push(item)); // Array elemanlarını yığına ekle
            }
        }

        return maResults;
    }

    const findOneModify = (obj, pname, myModifierFunc) => {
        // çok kere test ettim Sonuç : Mükemmel  findUrlsOptimized den geliştirdim.
        const maResults = [];
        const stack = [obj];
        const visited = new Set(); // Döngüsel referansları kontrol etmek için

        while (stack.length > 0) {
            // console.log("stack->   ",stack)
            const current = stack.pop();

            if (typeof current === "object" && current !== null) {
                if (visited.has(current)) continue; // Daha önce işlenen nesneyi atla
                visited.add(current);

                for (const key in current) {
                    if (key === pname) {

                        maResults.push(current[key]);

                        //  bu  alanı  myModifierFunc ile güncelle
                        current[key] = myModifierFunc(current[key]);

                    } else {
                        stack.push(current[key]);
                    }
                }
            } else if (Array.isArray(current)) {
                current.forEach(item => stack.push(item)); // Array elemanlarını yığına ekle
            }
        }

        return maResults;
    }

    const findsModify = (obj, pnames, myModifierFunc) => {
        // çok kere test ettim Sonuç : Mükemmel  findUrlsOptimized den geliştirdim.
        const maResults = [];
        const stack = [obj];
        const visited = new Set(); // Döngüsel referansları kontrol etmek için

        while (stack.length > 0) {
            // console.log("stack->   ",stack)
            const current = stack.pop();

            if (typeof current === "object" && current !== null) {
                if (visited.has(current)) continue; // Daha önce işlenen nesneyi atla
                visited.add(current);

                for (let i = 0; i < pnames.length; i++) {// ** böyle yaptık bişey değişmedi yine saçmaladı!!!
                    let pname = pnames[i];

                    // pnames.forEach(pname => {
                    // ** buraya aldık       bişey değişmedi yine saçmaladı!!!
                    for (const key in current) {
                        console.log("key->   ", key,":",current[key])
                        // ** burdaydı


                        if (key === pname) {

                            maResults.push(current[key]);

                            //  bu  alanı  myModifierFunc ile güncelle
                            current[key] = myModifierFunc(current[key]);

                        } else {
                            stack.push(current[key]);
                        }


                        // ** burdaydı
                    }
                    // ** buraya aldık
                    // });


                }


            } else if (Array.isArray(current)) {
                current.forEach(item => stack.push(item)); // Array elemanlarını yığına ekle
            }
        }

        return maResults;
    }
    // -----------------

    return {
        newFormData,

        response_final,
        isBrowser, isNode, isElectron,

        // sihirliGPTbozukolabilir,
        // sihirliGPTDuzeltilmis,
        // processItem_WithAnACTION

        findAndModifyBuffer, // buffer'ın data alanını modifier ile günceller. Fakat henüz doğru çalışmıyor.
        findUrlsOptimized, // tüm  pname  adındaki  özellikleri bulur. liste olarak dondurur.
        findOneModify,  // tüm  pname  adındaki  özellikleri bulur. myModifierFunc göre modifiye eder(edecek).
    };
}



(function (global, factory) {
    // https://chatgpt.com/share/6759e015-b410-8011-9831-ba81c3312c7a
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['axios', 'fs'], factory);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        // Node.js ortamı (CommonJS)

        module.exports = factory(require('axios'), require('fs'));
    } else {
        // Global (browser or other environments)
        // global.MyCSOmodule = factory(); // [SORUN YOK TU?] MyCSOmodule olarak global bir obje atanır
        global.MyCSOmodule = factory(global.axios, global.fs); // [fakat] BÖYLE de Dene bakalım      ANCAK BOYLE OLUNCA axios kullanılıyor !!
    }
})(typeof window !== 'undefined' ? window : this, modulFUNCs);
