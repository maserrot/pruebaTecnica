module.exports = mongoose => {
    const constantes = require('../constantes/constantes');
    const autoIncrement = require('mongoose-auto-increment');
    autoIncrement.initialize(mongoose.connection);

    const ejercicioUno = mongoose.model(
        constantes.TABLA_EJERCICIO_UNO,
        mongoose.Schema(
            {
                codigo: Number,
                fromCurrency: String,
                toCurrency: String,
                value: Number,
                dateCurrency: {type: Date, default: Date.now}
            }
            , { 
                versionKey: false,
                collection: constantes.TABLA_EJERCICIO_UNO
            }
        ).plugin(autoIncrement.plugin, {
            model: constantes.TABLA_EJERCICIO_UNO,
            field: 'codigo',
            startAt: 1
        })
    );
    return ejercicioUno;
};