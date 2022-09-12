const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy();

const db = require('./dbConfig');

const verifyPassword = (password, dbPassword)=>{
    bcrypt.compare(password, dbPassword, (err, result)=>{
        if(err){
            console.log('Error in comparing password --> bcrypt!');
            return false;
        }
        
        if(result){
            return true;
        }else{
            return false;
        }
    });
}

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    (email, password, done)=>{
        db.query(`SELECT * from user where email = ${email}`, (err, rows)=>{
            if(err){
                console.log('Error in finding the user --> passport');
                return done(err);
            }

            if(!rows.length){
                console.log('Invalid Email!');
                return done(null, false);
            }

            if(!verifyPassword(password, rows[0].password)){
                console.log('Invalid Password!');
                return done(null, false);
            }

            return done(null, rows[0]);
        });
    }
));

// Serializing the user to decide which key to be put in the cookies
passport.serializeUser((user, done)=>{
    return done(null, user.id);
});

// Deserializing the user
passport.deserializeUser((id, done)=>{
    db.query(`SELECT * from user where id = ${id}`, (err, rows)=>{
        if(err){
            console.log('Error in finding the user --> Passport (Deserializing)');
            return done(err);
        }
        return done(null, rows[0]);
    });
});