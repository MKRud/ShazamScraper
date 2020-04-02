const request = require('request');
const fs = require('fs')

var objShazam = {};

request('https://www.shazam.com/shazam/v2/ru/UA/web/-/tracks/world-chart-world?pageSize=200&startFrom=0', (error, response, html) => {

    if (!error && response.statusCode == 200) {

        var jsonObj = JSON.parse(html);

        jsonObj = jsonObj['chart'];

        for (keyFirst in jsonObj) {
            const name = jsonObj[keyFirst]['share']['subject'];
            const shazam = jsonObj[keyFirst]['share']['href'];

            var objStores = Object.keys(jsonObj[keyFirst]['stores']);

            keyFirstN = Number(keyFirst) + 1;

            for (i of objStores) {
                if (i === 'apple') {
                    var apple = jsonObj[keyFirst]['stores']['apple']['actions'];
                    for (appleKey of apple) {
                        apple = appleKey['uri']
                    }
                }
                if (i === 'itunes') {
                    var itunes = jsonObj[keyFirst]['stores']['itunes']['actions'];
                    for (itunesKey of itunes) {
                        itunes = itunesKey['uri']
                    }
                } 
                if (i === 'google') {
                    var google = jsonObj[keyFirst]['stores']['google']['actions'];
                    for (googleKey of google) {
                        google = googleKey['uri']
                    }
                } 
            }

            objShazam[keyFirstN] = {
                [name]: {
                    shazam,
                    apple,
                    itunes,
                    google
                }
            }
            apple = '';
            itunes = '';
            google = '';
        }
    }
    console.log(objShazam);

    var save = 1;

    if (save != 0) {
        var strJson = JSON.stringify(objShazam);
        fs.writeFileSync('/home/mamuk/JSONShazam.json', strJson);
    }
})
