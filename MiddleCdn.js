const cluster = require('cluster');


const express = require("express");
const app = express();
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
// app.get("/middlecdn/MyCSOmodule.js", async (req, res) => {
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
const sikistir_IfChanged_save = (uzakfilePath, yerelfilePath) => {
  const beautifyFile = fs.readFileSync(uzakfilePath, { encoding: "utf-8" })
  const uglifyFile = UglifyJS.minify(beautifyFile);

  if (uglifyFile.error == undefined) {
    saveFileIfChanged(yerelfilePath, beautifyFile);
  } else {
    console.log(uglifyFile.error);
    console.log("çirkinleştirme BAŞARISIZ");
  }

  return uglifyFile
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
app.get("/rediscdn/MyCSOmodule.js", async (req, res) => {
  const uzakfilePath = path.join(__dirname, "../back-end-nodemiddle/MyCSOmodule.js");
  const yerelfilePath = path.join(__dirname, "./MyCSOmodule.js");

  const sonuc1 = sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  // console.log(sonuc1.error)
  // console.log(sonuc1.code.length)

  console.log(yerelfilePath)// production için atılması(okunması) gereken bu yerelfilePath
  res.status(200).sendFile(yerelfilePath);
});
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
app.get("/rediscdn/XanaduModule.js", async (req, res) => {
  const uzakfilePath = path.join(__dirname, "../back-end-nodemiddle/XanaduModule.js");
  const yerelfilePath = path.join(__dirname, "./XanaduModule.js");

  const sonuc2 = sikistir_IfChanged_save(uzakfilePath, yerelfilePath)
  // console.log(sonuc2.error)
  // console.log(sonuc2.code.length)

  console.log(yerelfilePath)// production için atılması(okunması) gereken bu yerelfilePath
  res.status(200).sendFile(yerelfilePath);
});
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function calculateHash(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return crypto.createHash('sha256').update(fileContent).digest('hex');
}

function saveFileIfChanged(filePath, newContent) {
  const newHash = crypto.createHash('sha256').update(newContent).digest('hex');
  if (fs.existsSync(filePath)) {
    const oldHash = calculateHash(filePath);
    if (newHash === oldHash) {
      // console.log('Dosya değişmedi, kaydedilmiyor.');
      return;
    }
  }
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(filePath,'Dosya kaydedildi.');
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


  const PORT = 3001;
  app.listen(PORT, () => {
    console.log("Back-End-NodeMiddle servisi calisiyor: http://localhost:" + PORT);
    console.log("*************************************************************");
    console.log("");
    console.log("");
    console.log("http://localhost:3001/rediscdn/MyCSOmodule.js");
    console.log("http://localhost:3001/rediscdn/XanaduModule.js");
    console.log("");
    console.log("");
    console.log(new Date().toLocaleString());
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
    console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|");
  });



}

