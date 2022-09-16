module.exports.login = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.render('login', {
        title: 'Twitter | Login',
    });
}

module.exports.createSession = (req, res)=>{
    return res.redirect('/');
}