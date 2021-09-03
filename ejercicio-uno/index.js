const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const constantes = require('./constantes/constantes');
const db = require("./db/config");

const controladorRegion = require("./controlador/controladorEjercicioDos");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //ssl: true,
        //sslValidate: false
    })
    .then(() => {
        console.log("BDD conectada");
    })
    .catch(err => {
        console.log("no se pudo conectar a la BDD", err);
        process.exit();
    });

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    }

    res.send(respuesta)
});

require("./rutas/ruta")(app);
controladorRegion.findTemperature();
app.listen(constantes.PUERTO, async () => {
    console.log("El servidor está inicializado en el puerto " + constantes.PUERTO);
});