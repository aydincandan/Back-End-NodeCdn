const cors = require('cors');

const whitelist = [
    'http://127.0.0.1:4321', 'http://localhost:4321',
    'https://orca-app-8ditd.ondigitalocean.app',
    'http://127.0.0.1:8100', 'http://localhost:8100',
    'http://127.0.0.1:8101', 'http://localhost:8101',
    'http://127.0.0.1:8102', 'http://localhost:8102',
    'http://127.0.0.1:4200', 'http://localhost:4200',
    'http://127.0.0.1:5500', 'http://localhost:5500',
    'http://127.0.0.1:3539', 'http://localhost:3539',
    'http://127.0.0.1:3537', 'http://localhost:3537',
    'http://127.0.0.1:3000', 'http://localhost:3000',
];

// const whitelist = [
//     'https://orca-app-8ditd.ondigitalocean.app'
// ];


var withWhiteList = (req, callback) => {
    const istekYapanDomain = req.header('Origin')
    const istekYapanDomainBizimListemizdeVarmi = whitelist.indexOf(istekYapanDomain)

    // console.log("\n_ ---- mycors --------")
    // console.log("_")

    const zaman = new Date(); const saat = zaman.getHours() + ":" + zaman.getMinutes()

    // console.log("_istekYapanDomain", istekYapanDomain)
    // console.log("_istekYapanDomainBizimListemizdeVarmi", (istekYapanDomainBizimListemizdeVarmi !== -1) ? "VAR" : "YOK", istekYapanDomainBizimListemizdeVarmi )
    // console.log("_istekYapan", req.rawHeaders[istekYapanDomainBizimListemizdeVarmi] )


    var corsOptions;

    if (istekYapanDomainBizimListemizdeVarmi !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }

    // console.log("_corsOptions", corsOptions)
    
    callback(null, corsOptions);

    // console.log("_")
    // console.log("_ ---- mycors --------\n")
}

exports.cors = cors();
exports.corsWithwhitelist = cors(withWhiteList);