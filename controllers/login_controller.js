module.exports.login = (req, res)=>{
    res.render('login', {
        title: 'Twitter | Login',
    });
}

module.exports.createSession = (req, res)=>{
    return res.redirect('/');
}