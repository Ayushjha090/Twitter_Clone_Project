require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);

const db = require('./config/dbConfig');
const passportLocal = require('./config/passportConfig');

const app = express();

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'twitter_clone',
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MySQLStore({}, db),
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

const port = process.env.PORT;
app.listen(port, (err)=>{
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
});