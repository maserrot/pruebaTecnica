const db = require("../db/config.js");
const EjercicioUno = db.ejercicioUno;
const constantes = require('../constantes/constantes');
var dateFormat = require('dateformat');
const log = require("../util/log/log");
const LoggerLevel = log.LoggerLevel
const request1 = require("request");

//#region getCurrencyByDate
exports.getCurrencyByDate = (req, res) => {

    var now = new Date()

    let header = {
        uuid: req.header('uuid'),
        funcionalidad: "getCurrencyByDate"
    }

    log.escribirLog({
        header: header, data: {
            nivel: LoggerLevel.INFO,
            accion: "INICIO",
            input: JSON.stringify(req.body)
        }
    })

    let response = {};
    if (!validateCreateBody(req.body)) {

        log.escribirLog({
            header: header, data: {
                nivel: LoggerLevel.INFO,
                accion: "INICIO",
                input: JSON.stringify(req.body),
                output: '{"Parámetros incorrectos}',
                ttl: new Date() - now
            }
        })

        let response = { respuesta: constantes.ERROR_REQUEST }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: "FIN",
                input: JSON.stringify(req.body),
                output: JSON.stringify(response),
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }
    const procesarPeticion = async () => {
        try {
            console.log(req.body+'.fromCurrency');
            let dia = new Date(req.body.dateCurrency);
            let diaInicial = dia;
            let dateString1 = dateFormat(diaInicial, "yyyy-mm-dd").toString()
            //dateFormat(diaInicial, "yyyy-mm-dd");
            console.log( dateFormat(diaInicial, "yyyy-mm-dd"));
            dia.setDate(dia.getDate()+1)
            let diaFinal = dia;
            console.log(diaFinal);
            let dateString2 = dateFormat(diaFinal, "yyyy-mm-dd").toString()
            console.log(dateString1);
            let resGetCurrency = await EjercicioUno.find({fromCurrency: req.body.fromCurrency, 
                toCurrency: req.body.toCurrency, dateCurrency:  { $gte: dateString1, $lte: dateString2}
            }).lean();

            if (Array.isArray(resGetCurrency) && resGetCurrency.length) {
                response.currency = resGetCurrency[0]
                var options = {
                    method: 'POST',
                    url: constantes.URL_WEBHOOK,//'https://webhook.site/4ed54cff-41ba-423e-9f46-b2c87408daf9',
                    body: response.currency,
                    json: true
                  };
                  await request1(options, function (error, response1, body) {
                    if (error) throw new Error(error);
                    console.log(response1);
                  });
                res.send(response);
            } else {
                response = { respuesta: constantes.ERROR_NO_CURRENCY }

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: "FIN",
                        output: JSON.stringify(response),
                        ttl: new Date() - now
                    }
                })

                res.status(404).send(response)
            }
        } catch (error) {
            console.log(error);
            log.escribirLog({
                header: header, data: {
                    nivel: LoggerLevel.ERROR,
                    accion: "FIN",
                    output: error.message,
                    ttl: new Date() - now
                }
            })

            res.status(500).send({
                respuesta: constantes.ERROR_PROCEDIMIENTO
            })
        }

    }

    procesarPeticion()
};
//#endregion

//#region UTIL
function validateCreateBody(body) {
    if (body.fromCurrency &&
        body.toCurrency &&
        body.dateCurrency) return true;
    return false;
}
//#endregion