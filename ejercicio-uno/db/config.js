const constantes = require('../constantes/constantes');

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = constantes.CONEXION;
db.ejercicioUno = require("../modelo/modeloEjercicioUno")(mongoose);
db.ejercicioDos = require("../modelo/modeloEjercicioDos")(mongoose);
module.exports = db;