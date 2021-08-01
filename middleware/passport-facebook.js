const { Router } = require('express');
const router = Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
 
const models = require('../models');
 
const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG
 
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_SECRETCODE,
    callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
},
async ( accessToken, refreshToken, profile, done ) => {
    try{
        const exUser = await models.User.findOne({
            where: {snsId: profile.id, provider: 'fb'},
        });
        if(exUser){
            done(null, exUser.dataValues);
        }else{
            const newUser = await models.User.create({
                username: `fb_${profile.id}`,
                displayname: profile.displayName,
                password: '!@#$$%^&*',
                snsId: profile.id,
                provider: 'fb',
            });
            done(null, newUser.dataValues);
        }
    }catch (e){
        console.error(e);
        done(e);
    }
}
));


passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
    user.password = '';
    done(null, user);
});



module.exports = passport;


