const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done)=> {
    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id)
        .then(user => {
            done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, 
(accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
                // User already exist and do not create new record
                done(null, existingUser);
            } else {
                // Create a new record, user currently does not exist
                new User({googleId: profile.id}).save()
                    .then(user => done(null, user));
            }
        })
    
}));