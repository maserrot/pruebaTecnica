const log4js = require("log4js")
const constantes = require("../../constantes/constantes")

const LoggerLevel = {
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
    FATAL: "FATAL",
    DEBUG: "DEBUG"
}

log4js.configure({
    appenders: {
        out: {
            type: 'dateFile',
            filename: 'log/' + constantes.COMPONENT_EJERCICIO + '.log',
            layout: {
                type: 'pattern',
                pattern: "%d{dd-MM-yyyy hh:mm:ss,SSS} | %p | %X{uuid} | %X{documentoId} | %X{localId} | %X{ventaId} | %X{autorizacionId} | %m",
            }
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'debug' }
    }
})

const logger = log4js.getLogger(constantes.COMPONENT_EJERCICIO);

function escribirLog(registro) {

    try {

        let header = registro.header
        let data = registro.data

        logger.addContext('uuid', header.uuid)
        logger.addContext('documentoId', header.documentoId ? header.documentoId : "")
        logger.addContext('localId', header.localId ? header.localId : "")
        logger.addContext('ventaId', header.ventaId ? header.ventaId : "")
        logger.addContext('autorizacionId', header.autorizacionId ? header.autorizacionId : "")

        let linea = ""

        if (data.accion == undefined)
            linea += "| "
        else
            linea = linea + data.accion + " | "

        if (data.detalle == undefined)
            linea += "| "
        else
            linea = linea + data.detalle + " | "

        if (data.input == undefined)
            linea += "| "
        else
            linea = linea + data.input + " | "

        if (data.output == undefined)
            linea += "| "
        else
            linea = linea + data.output + " | "

        if (data.ttl != undefined)
            linea = linea + data.ttl

        switch (data.nivel) {
            case LoggerLevel.INFO:
                logger.info(linea)
                break
            case LoggerLevel.WARN:
                logger.warn(linea)
                break
            case LoggerLevel.ERROR:
                logger.error(linea)
                break
            case LoggerLevel.FATAL:
                logger.fatal(linea)
                break
            default:
                logger.debug(linea)
                break
        }
    } catch (e) {
        console.log("ERROR EN CABECERA DE LOG")
    }
}

module.exports = {
    LoggerLevel: LoggerLevel,
    escribirLog: escribirLog
}