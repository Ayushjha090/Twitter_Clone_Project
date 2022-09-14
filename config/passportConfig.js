const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./dbConfig');

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    (email, password, done)=>{
        db.query(`SELECT * from user where email = '${email}'`, (err, rows)=>{
            if(err){
                console.log('Error in finding the user --> passport');
                return done(err);
            }

            if(!rows.length){
                console.log('Invalid Email!');
                return done(null, false);
            }else{
                const user = rows[0];
                bcrypt.compare(password, user.password, (err, isFound)=>{
                    if(err){
                        console.log('Error in comparing password --> bcrypt!');
                        return done(err);
                    }
                    if(isFound){
                        return done(null, user);
                    }else{
                        console.log('Invalid Password');
                        return done(null, false);
                    }
                });
            }
        });
    }
));

// Serializing the user to decide which key to be put in the cookies
passport.serializeUser(function(user, done){
    done(null, user.userID);
});

// Deserializing the user
passport.deserializeUser((id, done)=>{
    db.query(`SELECT * from user where userID = '${id}'`, (err, rows)=>{
        if(err){
            console.log('Error in finding the user --> Passport (Deserializing)');
            done(err);
        }
        done(null, rows[0]);
    });
});

module.exports = passport;