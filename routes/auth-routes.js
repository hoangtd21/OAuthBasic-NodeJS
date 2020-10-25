const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect("/");
});

//auth google
router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
})

module.exports = router;