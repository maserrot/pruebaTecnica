USER_DB = 'db_mad_man'
PASS_DB = 'DT5E9h^!XKsxvGaB'
AUTH_DB = 'usuario'

module.exports = {
    //URL_DB: 'mongodb://10.100.12.4/ejercicios',
    URL_DB: 'mongodb://' + USER_DB + ':' + PASS_DB + '@10.100.12.4/ejercicios?authSource=' + AUTH_DB,
    PORT_CONFIG: 7012
}