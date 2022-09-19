module.exports.signout = (req, res, next)=>{
    if(req.isAuthenticated()){
        req.logout((err)=>{
            if(err){
                console.log('Error in signing out!');
                return next(err);
            }
            res.redirect('/');
        });
    }else{
        return res.redirect('back');
    }
}
