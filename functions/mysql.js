const mysql = require('mysql');


const pool = mysql.createPool({
    user: 'acessoRemoto',
    password: 'acessoRemotoAps',
    host: '201.74.113.36',
    port: 3306,
    database: 'loginTeste'
})


exports.pool = pool;