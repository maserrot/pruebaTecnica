module.exports = mongoose => {
    const constantes = require('../constantes/constantes');
    const autoIncrement = require('mongoose-auto-increment');
    autoIncrement.initialize(mongoose.connection);

    const ejercicioDos = mongoose.model(
        constantes.TABLA_EJERCICIO_DOS,
        mongoose.Schema(
            {
                codigo: Number,
                temperature: String,
                humidity: String,
                dateCurrency: {type: Date, default: Date.now}
            }
            , { 
                versionKey: false,
                collection: constantes.TABLA_EJERCICIO_DOS
            }
        ).plugin(autoIncrement.plugin, {
            model: constantes.TABLA_EJERCICIO_DOS,
            field: 'codigo',
            startAt: 1
        })
    );
    return ejercicioDos;
};