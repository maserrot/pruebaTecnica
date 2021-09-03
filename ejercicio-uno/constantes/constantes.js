// Variable de entorno
const configuration = require('./config/configuration')

const COMPONENT_EJERCICIO = 'ejercicio-1'
const COMPONENT_EJERCICIO_DOS = 'ejercicio-2'
const URL_WEBHOOK = 'https://webhook.site/4ed54cff-41ba-423e-9f46-b2c87408daf9'
const URL_DWEET = 'https://dweet.io:443/get/latest/dweet/for/thecore'


module.exports = {
    //#region MAIN VARIABLES
    COMPONENT_EJERCICIO: COMPONENT_EJERCICIO,
    COMPONENT_EJERCICIO_DOS: COMPONENT_EJERCICIO_DOS,
    URL_WEBHOOK: URL_WEBHOOK,
    URL_DWEET: URL_DWEET,
    PUERTO: configuration.PORT_CONFIG,
    CONEXION: configuration.URL_DB,
    TABLA_EJERCICIO_UNO: COMPONENT_EJERCICIO,
    TABLA_EJERCICIO_DOS: COMPONENT_EJERCICIO_DOS,
    //#endregion

    //#region RUTAS CURRENCY
    PATH_GET_CURRENCY_BY_DATE: "/getCurrencyByDate",
    //#endregion

    //#region RESPONSES
    ERROR_REQUEST: "Parametros insuficientes",
    ERROR_PROCEDIMIENTO: "Ha ocurrido un error. Intente nuevamente",
    ERROR_NO_CURRENCY: "No existen valores para la trama enviada",
    //#endregion
};