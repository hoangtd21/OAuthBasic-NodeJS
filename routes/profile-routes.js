const { model } = require('mongoose');

const router = require('express').Router();
const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not log in
        res.redirect('/auth/login');
    }
    else{
        next();
    }
};
router.get('/', authCheck, (req, res) => {
    // res.send("You are logged in. This is profile page: " +req.user.username);
    res.render('profile', {user: req.user});
});

module.exports = router;