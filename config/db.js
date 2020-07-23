const mysql = require('mysql');

const db = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoppingdb'
});

db.connect(function(err){
    if(err){
        return console.error(`error: ${err.message}`);
    }
    console.log('Connected to mysql server');
});

module.exports = db;