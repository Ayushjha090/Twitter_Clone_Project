require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log('Successfully Connected to database');
});

module.exports = connection;