const selftest = () => {
  // ------------- https://github.com/expressjs/multer/issues/1176 ------------
  const boundary = 'AaB03x'
  const body = [
    '--' + boundary,
    'Content-Disposition: form-data; name="file"; filename="test.txt"',
    'Content-Type: text/plain',
    '',
    'test without end boundary'
  ].join('\r\n')
  const options = {
    hostname: 'localhost',
    port,
    path: '/upload',
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data; boundary=' + boundary,
      'content-length': body.length,
    }
  }
  const req = http.request(options, (res) => {
    console.log(res.statusCode)
  })
  req.on('error', (err) => {
    console.log(err)
  })
  req.write(body)
  req.end()
  // ------------- https://github.com/expressjs/multer/issues/1176 ------------
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
const sikistir_IfChanged_save = (uzakfilePath, yerelfilePath) => {
  // nodemon.json
  // {
  //   "ignore": ["./", "xanaduland.js", "mandrakemodule.js", "xanaduland.txt", "mandrakemodule.txt"]
  // }



  // https://bobcares.com/blog/node-redis-async-await/
  // console.log("**file of files->", file)
  // MD5 konusu https://chatgpt.com/share/43f6f0df-5236-433b-ae4e-6e4c5e0a0d9b

  const yontem = 'md5' // veya 'sha256'
  // uzak(new)
  const newContent = fs.readFileSync(uzakfilePath, { encoding: "utf-8" });
  const newContentUglify = UglifyJS.minify(newContent);
  const newContentUglifyHash = crypto.createHash(yontem).update(newContentUglify.code).digest('hex');
  // uzak(new)

  const yerelsha256txt = yerelfilePath.replace('.js', '.txt')
  // text olarak kaydedip karşılaştırısak eşitse return olsun
  if (yerelsha256txt) {
    // 1. YÖNTEM 

    try {
      // ... karşılaştırısak eşitse ...
      if (fs.readFileSync(yerelsha256txt) == newContentUglifyHash) {
        // console.log('Dosya değişmedi, kaydedilmiyor.', newContentUglifyHash);        
        return; // ...  return olsun
      }
    } catch { }

    fs.writeFileSync(yerelsha256txt, newContentUglifyHash); // text olarak kaydedip ...

  } else {
    // 2. YÖNTEM 
    // yerel(old)
    const oldContentUglify = fs.readFileSync(yerelfilePath, { encoding: "utf-8" });
    const oldContentUglifyHash = crypto.createHash(yontem).update(oldContentUglify).digest('hex');
    // yerel(old)

    if (newContentUglifyHash === oldContentUglifyHash) {
      // console.log('Dosya değişmedi, kaydedilmiyor.', newContentUglifyHash);
      return;
    }
  }

  const dosya = path.basename(yerelfilePath)
  if (newContentUglify.error == undefined) {
    fs.writeFileSync(yerelfilePath, newContentUglify.code, 'utf-8');
    console.log();
    console.log(dosya, 'değişti.');
    console.log('# Github GÜNCELLE (Öncesinde; package.json > version : *.+1 yap): ', yerelfilePath);
    if (dosya == "mandrakemodule.js") {
      console.log("\thttps://www.jsdelivr.com/tools/purge", "Adresine git. Aşağıdaki adresi purge Et.")
      console.log("\thttps://cdn.jsdelivr.net/gh/aydincandan/Back-End-NodeCdn/mandrakemodule.js")
      console.log('\t(require/import için) npm publish YAP: ../Back-End-NodeMiddle-npmjs.com/_npmjs/mandrakemodule> npm publish');
    }
    else if (dosya == "xanaduland.js") {
      console.log("\thttps://www.jsdelivr.com/tools/purge", "Adresine git. Aşağıdaki adresi purge Et.")
      console.log("\thttps://cdn.jsdelivr.net/gh/aydincandan/Back-End-NodeCdn/xanaduland.js")
      console.log('\t(require/import için) npm publish YAP: ../Back-End-NodeMiddle-npmjs.com/_npmjs/xanaduland> npm publish');
    } else {
      console.log("\tdosya beklenildiği gibi .js değil fakat yine de varsa aşağıdakilerini yap.")
      console.log("\thttps://www.jsdelivr.com/tools/purge", "Adresine git. Aşağıdaki adresi purge Et.")
      console.log("\thttps://cdn.jsdelivr.net/gh/aydincandan/Back-End-NodeCdn/xxxxxx.?")
      console.log('\t(require/import için) npm publish YAP: ../Back-End-NodeMiddle-npmjs.com/_npmjs/xxxxxxx> npm publish');
    }
    console.log("# Son olarak bu modülü(" + dosya + ") kullanacak olan tüm projelerini güncelle.");
    console.log("# Yani, ilgili projenin rootuna 'npm outdated' olarak bakarsan güncellenmesi gerektiğini görebilmelisin.");
    console.log();

  } else {
    console.log(newContentUglify.error); console.log("çirkinleştirme BAŞARISIZ");
  }

  // return {newContent, newContentUglify} // aslında bu dönüşe gerek yok ama çalışır
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =





// const cluster = require('cluster');


// const { express, app, server, port, catchallroute } = require('../Back-End-NodeMiddle-npmjs.com/_npmjs/express-layer')
// .parametre({filename:__filename})
// server.on('listening', () => {
//   app.get('/', (req, res) => { res.send('Express.js uygulamasi calisiyor. ' + port) });
//   app.all('*', catchallroute); console.log("ok")
// });



// import 'dotenv/config'; // process.env için .ts içinde böyle..
const dotENV = require('dotenv').config().parsed
const portenvp = parseInt(process.env.PORT, 10)
const portenv = parseInt(dotENV.PORT, 10)

console.log({ portenvp, portenv })
const express = require('express');
const app = express();
// ------------------------
app.listen(portenv, () => {
  console.log("app listen " + portenv)
  console.log()
});
// bunu mu kullanayım 
// ------------------------
// yoksa 
// aşağıdakini mi?  Hangisi daha doğru.  Ayrı ayrı denedim ikiside çalışıyor? CEVAP : https://chatgpt.com/share/676fdcb9-353c-8011-93ca-bc7b28b0b787
// ------------------------
const http = require('http');
const server = http.createServer(app);
server.listen((portenv + 1), () => { console.log("server listen " + (portenv + 1)) }); // ikisinide böyle kullanalım fazla mal göz çıkarmaz!:-)

// netstat -ano | findstr :4001
// SONUÇ
// TCP    0.0.0.0:4001   0.0.0.0:0   LISTENING   1234
// İSE
// tasklist | findstr 1234
// 1234 neymiş gör.

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const UglifyJS = require('uglify-js');

var mycors = require('mycorssets').seturls([]);
app.use(mycors.corsWithwhitelist);

// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// app.get("/nodecdn/mandrakemodule.js", async (req, res) => {
//   // https://chatgpt.com/share/67533c08-9eac-8011-9160-aa432b147558

//   // try {
//   // Dosyanın tam yolunu belirtin
//   const filePath = path.join(__dirname, "../back-end-nodemiddle/mandrakemodule.js");
//   console.log(filePath)
//   res.status(200).sendFile(filePath);
//   // } catch (error) {
//   //   console.log("mandrakemodule.js Dosya gönderiminde hata:", error);
//   //   res.status(500).send("Dosya sunulurken, bir hata oluştu.");
//   // }
// });
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const updatemandrakemodule = () => {
  const uzakfilePathEski = path.join(__dirname, "../Back-End-NodeMiddle-npmjs.com/_npmjs/mandrakemodule/index-eski.js");
  const uzakfilePath = path.join(__dirname, "../Back-End-NodeMiddle-npmjs.com/_npmjs/mandrakemodule/index.js");
  const yerelfilePath = path.join(__dirname, "./mandrakemodule.js");
  sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  return { uzakfilePath, yerelfilePath, uzakfilePathEski }
}
const updatexanaduland = () => {
  const uzakfilePath = path.join(__dirname, '../Back-End-NodeMiddle-npmjs.com/_npmjs/xanaduland/index.js');
  const yerelfilePath = path.join(__dirname, "./xanaduland.js");
  sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  return { uzakfilePath, yerelfilePath }
}

updatemandrakemodule();
updatexanaduland();

app.get("/back-end-nodecdn/mandrakemodule.js", async (req, res) => {
  res.status(200).sendFile(updatemandrakemodule().yerelfilePath);
});
app.get("/back-end-nodecdn/xanaduland.js", async (req, res) => {
  res.status(200).sendFile(updatexanaduland().yerelfilePath);
});

app.get("/back-end-nodecdn/orginal/mandrakemodule.js", async (req, res) => {
  res.status(200).sendFile(updatemandrakemodule().uzakfilePath);
});
app.get("/back-end-nodecdn/orginal/xanaduland.js", async (req, res) => {
  res.status(200).sendFile(updatexanaduland().uzakfilePath);
});


// başarılı olmasını bekliyorum.
app.get("/back-end-nodecdn/orginal-eski/mandrakemodule.js", async (req, res) => {
  res.status(200).sendFile(updatemandrakemodule().uzakfilePathEski);
});



// https://chatgpt.com/share/67541ae7-8c48-8011-afe4-5d40bc2eb436
// if (cluster.isMaster) {
//   const numWorkers = 3; // Çalıştırmak istediğiniz işçi sayısı
//   for (let i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }
// } else 
