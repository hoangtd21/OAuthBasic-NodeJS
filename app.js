const express = require('express');
const authRoutes = require('./routes/auth-routes'); 
const profileRoutes = require('./routes/profile-routes'); 
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

app.set('view engine','ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport, to use middleware
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, () => {
    console.log("Connected MongoDB");
})

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//Home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
})

app.listen(3000, () => {
    console.log('Server started...');
});