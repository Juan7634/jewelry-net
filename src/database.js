//CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY, username VARCHAR(20) NOT NULL, password VARCHAR(30) NOT NULL,fullname VARCHAR(100));

const {promisify} = require('util')
const mysql = require('mysql');
const {database} = require('./keys');

const connectionPool = mysql.createPool(database);
 connectionPool.getConnection((err, connection)=> {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Connection was closed');
        }
        if(err.code === 'ER_CON_COUNTER_ERROR'){
            console.error('Connection was to many connections');    
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Connection was refused');
        }

        
        if(connection) connection.release();
        console.log('Connection was successfully connected');
        return;

    });
connectionPool.query = promisify(connectionPool.query);

module.exports = connectionPool;
