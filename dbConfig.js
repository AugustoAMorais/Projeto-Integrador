const mysql = require('mysql2')
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '101010',
    database: 'medkit'
});

db.connect(function(err){
    if(err){
        throw err
    }else{
        console.log("Mysql conectado");
    }
});

module.exports = db