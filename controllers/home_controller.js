module.exports.home = (req, res)=>{
    // res.status(200).send('<h1>Express router is up for Twitter Clone!</h1>');
    res.render('home', {
        title: 'Home'
    });
}