const mariadb = require('mariadb');
const { DBConnection } = require('../../../config');

let dataBaseLink = {
    database: DBConnection.dataBase,
    host: DBConnection.host,
    user: DBConnection.user,
    password: DBConnection.password,
};

const pool = mariadb.createPool(dataBaseLink);

async function asyncConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
    return conn;
}

module.exports = {
    connection: asyncConnection,
    pool
};
