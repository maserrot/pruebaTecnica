USER_DB = 'db_mad_man'
PASS_DB = 'w2mr7ME?*Nv&NZQR'
AUTH_DB = 'usuario'

module.exports = {
    //URL_DB: 'mongodb://mongodb/ejercicios',
    URL_DB: 'mongodb://' + USER_DB + ':' + PASS_DB + '@mongodb/ejercicios?authSource=' + AUTH_DB,
    PORT_CONFIG: 7012
}