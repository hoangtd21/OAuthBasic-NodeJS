const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });   
});

passport.use(new GoogleStrategy({
    //option for the google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken,profile,done) => {
   // check user already exits in DB
   User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
            //Already have user
            console.log("User is: " + currentUser);
            done(null, currentUser);
        }
        else{
            //If not, create new user in DB
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.picture
            }).save().then((newUser) => {
                console.log('New user created: '+ newUser);
                done(null,newUser);
            })
        }
   }) 
})
)