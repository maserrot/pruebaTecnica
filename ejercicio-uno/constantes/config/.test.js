USER_DB = 'db_mad_man'
PASS_DB = '2tNtjJ!%40!t#k!KWj'
AUTH_DB = 'usuario'

module.exports = {
    //URL_DB: 'mongodb://10.100.15.15/ejercicios',
    URL_DB: 'mongodb://' + USER_DB + ':' + PASS_DB + '@10.100.15.15/ejercicios?authSource=' + AUTH_DB,
    PORT_CONFIG: 7012
}