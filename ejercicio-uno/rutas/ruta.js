module.exports = app => {
    const controladorEjercicioUno = require("../controlador/controladorEjercicioUno");
    const constantes = require('../constantes/constantes');

    var router = require("express").Router();

    //#region currency
    // Encontrar por Date
    router.post(constantes.PATH_GET_CURRENCY_BY_DATE, controladorEjercicioUno.getCurrencyByDate);

    
    app.use("/" + constantes.COMPONENT_EJERCICIO, router);
};