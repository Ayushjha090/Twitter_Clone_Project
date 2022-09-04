require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT;
app.listen(port, (err)=>{
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
});