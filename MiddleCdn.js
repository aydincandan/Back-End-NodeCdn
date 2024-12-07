const cluster = require('cluster');


const express = require("express");
const app = express();

const path = require('path');

var mycors = require('./mycors');
app.use(mycors.corsWithwhitelist);

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
app.get("/middlecdn/client-server-ortak.js", async (req, res) => {
  // https://chatgpt.com/share/67533c08-9eac-8011-9160-aa432b147558

  // try {
    // Dosyanın tam yolunu belirtin
    const filePath = path.join(__dirname, "../back-end-nodemiddle/client-server-ortak.js");
    console.log(filePath)
    res.status(200).sendFile(filePath);
  // } catch (error) {
  //   console.log("client-server-ortak.js Dosya gönderiminde hata:", error);
  //   res.status(500).send("Dosya sunulurken, bir hata oluştu.");
  // }
});
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =



// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// if (cluster.isMaster) {
//   const numWorkers = 3; // Çalıştırmak istediğiniz işçi sayısı
//   for (let i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }
// } else 

{


  const PORT = 3001;
  app.listen(PORT, () => {
    console.log("Back-End-NodeMiddle servisi calisiyor: http://localhost:"+PORT);
    console.log("*************************************************************");
    console.log("");
    console.log("");
    console.log("http://localhost:3001/middlecdn/client-server-ortak.js");
    console.log("");
    console.log("npm i file:../back-end-nodemiddle");
    console.log("");
    console.log("");
    console.log(new Date().toLocaleString());
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
    console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|");
  });
  


}

