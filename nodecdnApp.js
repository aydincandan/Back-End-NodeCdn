const cluster = require('cluster');


const { express, app, server, port } = require('back-end-nodemiddle/ExpressCoreApp')
console.log("(back-end-nodecdn) nodecdnApp.js Basladi ... ", { port }) // öncelikle .env, yoksa commandline, yoksa X000 den sonraki boşta olan bir port olmalı.


const redis = require('redis');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// const nodemiddle = require('back-end-nodemiddle');
// const { deleteFiles_Sync, copyFiles_Sync, processFilesForHtml } = nodemiddle.afterbuildlib
// const Dosyama = nodemiddle.afterbuildlib.default

const UglifyJS = require("uglify-js");

var mycors = require('./mycors');
app.use(mycors.corsWithwhitelist);

// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// app.get("/nodecdn/MyCSOmodule.js", async (req, res) => {
//   // https://chatgpt.com/share/67533c08-9eac-8011-9160-aa432b147558

//   // try {
//   // Dosyanın tam yolunu belirtin
//   const filePath = path.join(__dirname, "../back-end-nodemiddle/MyCSOmodule.js");
//   console.log(filePath)
//   res.status(200).sendFile(filePath);
//   // } catch (error) {
//   //   console.log("MyCSOmodule.js Dosya gönderiminde hata:", error);
//   //   res.status(500).send("Dosya sunulurken, bir hata oluştu.");
//   // }
// });
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
app.get("/rediscdn/MyCSOmodule.js", async (req, res) => {
  const uzakfilePath = path.join(__dirname, "../back-end-nodemiddle/MyCSOmodule.js");
  const yerelfilePath = path.join(__dirname, "./MyCSOmodule.js");
  sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  console.log(yerelfilePath)// production için atılması(okunması) gereken bu yerelfilePath
  res.status(200).sendFile(yerelfilePath);
});
app.get("/rediscdn/XanaduModule.js", async (req, res) => {
  const uzakfilePath = path.join(__dirname, "../back-end-nodemiddle/XanaduModule.js");
  const yerelfilePath = path.join(__dirname, "./XanaduModule.js");
  sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  console.log(yerelfilePath)// production için atılması(okunması) gereken bu yerelfilePath
  res.status(200).sendFile(yerelfilePath);
});
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
const sikistir_IfChanged_save = (uzakfilePath, yerelfilePath) => {
  // nodemon.json
  // {
  //   "ignore": ["./", "XanaduModule.js", "MyCSOmodule.js", "XanaduModule.txt", "MyCSOmodule.txt"]
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
  } else {
    console.log(newContentUglify.error); console.log("çirkinleştirme BAŞARISIZ");
  }

  return newContentUglify
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// https://chatgpt.com/share/67541ae7-8c48-8011-afe4-5d40bc2eb436
// if (cluster.isMaster) {
//   const numWorkers = 3; // Çalıştırmak istediğiniz işçi sayısı
//   for (let i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }
// } else 

{

  app.listen(port, () => {
    console.log("Back-End-NodeCdn servisi calisiyor: http://localhost:" + port);
    console.log("*************************************************************");
    console.log("");
    console.log("");
    console.log("http://localhost:3001/rediscdn/MyCSOmodule.js");
    console.log("http://localhost:3001/rediscdn/XanaduModule.js");
    console.log("");
    console.log("");
    console.log(new Date().toLocaleString());
    console.log(`Worker ${process.pid} is running on port ${port}`);
    console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|");
  });



}

