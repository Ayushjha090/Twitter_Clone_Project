require('dotenv').config();
const express = require('express');

const db = require('./config/dbConfig');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

const port = process.env.PORT;
app.listen(port, (err)=>{
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
});