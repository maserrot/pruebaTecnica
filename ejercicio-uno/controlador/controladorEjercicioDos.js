const db = require("../db/config.js");
const EjercicioDos = db.ejercicioDos;
const constantes = require('../constantes/constantes');
const request1 = require("request");
const log = require("../util/log/log");
const LoggerLevel = log.LoggerLevel

//#endregion
exports.findTemperature = async () => {
    let secondsToCountDown = 15

    const doOnInterval = async () => {
        secondsToCountDown--;
        if (secondsToCountDown === 0) {
            await stopInterval()
        }
        var options = {
            method: 'GET',
            url: constantes.URL_DWEET,//'https://dweet.io:443/get/latest/dweet/for/thecore',
            json: true
        };
        await request1(options, async function (error, response1, body) {
            if (error) throw new Error(error);
            //console.log(body.with[0].content);
            let array1 =  body.with;
            array1.forEach( async (data, index) => {
                console.log(data);
                let tempCrt = {
                    temperature: data.content.temperature,
                    humidity: data.content.humidity
                }
                nuevoTemp = await EjercicioDos.create(tempCrt)

            });
        });
        
    }

    const stopInterval = async () => {
        
        let resAllTemp =  await EjercicioDos.find({}).lean();
        if (Array.isArray(resAllTemp) && resAllTemp.length) {
            let response = {};
            response.currency = resAllTemp
            var options = {
                method: 'POST',
                url: constantes.URL_WEBHOOK,//'https://webhook.site/4ed54cff-41ba-423e-9f46-b2c87408daf9 ', 
                body: response.currency,
                json: true
              };
              await request1(options, function (error, response1, body) {
                if (error) throw new Error(error);
                console.log(response1);
              });
        }
        clearInterval(interval);
    }

    const interval = await setInterval(doOnInterval, 60000);
};