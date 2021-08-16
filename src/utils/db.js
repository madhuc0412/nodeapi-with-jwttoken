const sql = require('mssql');
const config = require('../../config/config')();


const sqlConfig = {
    user: config.DB_UserName,
    password: config.DB_Password,
    database: config.DB_Name,
    server: config.DB_Server,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }

}


const poolPromise = new sql.ConnectionPool(sqlConfig).connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool
    }).catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err)
    })


module.exports = { sql, poolPromise }