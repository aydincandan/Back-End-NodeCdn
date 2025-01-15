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
  //   "ignore": ["./", "XanaduModule.js", "MandrakeModule.js", "XanaduModule.txt", "MandrakeModule.txt"]
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

  if (newContentUglify.error == undefined) {
    fs.writeFileSync(yerelfilePath, newContentUglify.code, 'utf-8');
    console.log(yerelfilePath, 'Dosya kaydedildi.');
    console.log("\t https://www.jsdelivr.com/tools/purge \tADRESİNDEN ilgili modülünün cache'sini SİLMEYİ UNUTMA!")
  } else {
    console.log(newContentUglify.error); console.log("çirkinleştirme BAŞARISIZ");
  }

  return newContentUglify
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =





const cluster = require('cluster');


// const { express, app, server, port, catchallroute } = require('../Back-End-NodeMiddle-npmjs.com/_npmjs/express-layer')
// .parametre({filename:__filename})
// server.on('listening', () => {
//   app.get('/', (req, res) => { res.send('Express.js uygulamasi calisiyor. ' + port) });
//   app.all('*', catchallroute); console.log("ok")
// });





const express = require('express');
const app = express();
app.listen(3001, () => { 
  console.log("app listen 3001")
  console.log()
  console.log("\t https://www.jsdelivr.com/tools/purge \tADRESİNDEN ilgili modülünün cache'sini SİLMEYİ UNUTMA!")
 });
// bunu mu kullanayım 
// yoksa 
// aşağıdakini mi?  Hangisi daha doğru.  Ayrı ayrı denedim ikiside çalışıyor? CEVAP : https://chatgpt.com/share/676fdcb9-353c-8011-93ca-bc7b28b0b787
// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// server.listen(3001, () => { console.log("server listen 3001") });


const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const UglifyJS = require('uglify-js');

var mycors = require('mycorssets').seturls([]);
app.use(mycors.corsWithwhitelist);

// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// app.get("/nodecdn/MandrakeModule.js", async (req, res) => {
//   // https://chatgpt.com/share/67533c08-9eac-8011-9160-aa432b147558

//   // try {
//   // Dosyanın tam yolunu belirtin
//   const filePath = path.join(__dirname, "../back-end-nodemiddle/MandrakeModule.js");
//   console.log(filePath)
//   res.status(200).sendFile(filePath);
//   // } catch (error) {
//   //   console.log("MandrakeModule.js Dosya gönderiminde hata:", error);
//   //   res.status(500).send("Dosya sunulurken, bir hata oluştu.");
//   // }
// });
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const updateMandrakeModule = () => {
  const uzakfilePath = path.join(__dirname, "../back-end-nodemiddle/ClientServerModules/MandrakeModule.js");
  const yerelfilePath = path.join(__dirname, "./MandrakeModule.js");
  sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  // console.log(yerelfilePath)// production için atılması(okunması) gereken bu yerelfilePath
  console.log("updateMandrakeModule ÇALIŞTI")
  return yerelfilePath
}
const updateXanaduModule = () => {
  const uzakfilePath = path.join(__dirname, "../back-end-nodemiddle/ClientServerModules/XanaduModule.js");
  const yerelfilePath = path.join(__dirname, "./XanaduModule.js");
  sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  // console.log(yerelfilePath)// production için atılması(okunması) gereken bu yerelfilePath
  console.log("updateXanaduModule ÇALIŞTI")
  return yerelfilePath
}

updateMandrakeModule();
updateXanaduModule();

app.get("/rediscdn/MandrakeModule.js", async (req, res) => {
  res.status(200).sendFile(updateMandrakeModule());
});
app.get("/rediscdn/XanaduModule.js", async (req, res) => {
  res.status(200).sendFile(updateXanaduModule());
});


// https://chatgpt.com/share/67541ae7-8c48-8011-afe4-5d40bc2eb436
// if (cluster.isMaster) {
//   const numWorkers = 3; // Çalıştırmak istediğiniz işçi sayısı
//   for (let i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }
// } else 
