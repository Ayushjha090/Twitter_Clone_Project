const bcrypt = require('bcrypt');
const {randomUUID} = require('crypto');

const db = require('../config/dbConfig');

module.exports.signUp = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    
    res.render('sign_up', {
        title: 'Twitter | Sign Up',
    });
}

module.exports.create = (req, res)=>{
    if(req.body.password !== req.body.cnfm_password){
        console.log('Password and Confirm Password are not matching');
        return res.redirect('back');
    }
    db.query(`SELECT * FROM user where email = '${req.body.email}'`, (err, rows)=>{
        if(err){
            console.log('Error in finding user while signing up!');
            return;
        }
        if(!rows.length){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                const id = randomUUID();
                const {name, username, email} = req.body;
                const img = 'https://cdn-icons-png.flaticon.com/512/668/668709.png';
                const qry = `INSERT INTO user (userID, email, password, username, name, usrImg) VALUES ('${id}', '${email}', '${hash}', '${username}', '${name}', '${img}')`;
                db.query(qry, (err, result)=>{
                    if(err){
                        console.log('Error in creating user while signing up!', err);
                        return;
                    }
                    console.log('User created successfully!!!');
                    return res.redirect('/login');
                });
            });
        }else{
            console.log('Email already exist!!!');
            return res.redirect('back');
        }
    });
}