const passport = require('passport');
const FacebookStrategy = require('passport-kakao').Strategy;
const models = require('../models');
const dotenv = require('dotenv');
dotenv.config();

    passport.use(new FacebookStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    },
    async ( accessToken, refreshToken, profile, done ) => {
        try{
            const exUser = await models.User.findOne({
                where: {snsId: profile.id, provider: 'kakao'},
            });
            if(exUser){
                done(null, exUser.dataValues);
            }else{
                const newUser = await models.User.create({
                    username: `ka_${profile.id}`,
                    displayname: profile.displayName,
                    password: '!@#$$%^&*',
                    snsId: profile.id,
                    provider: 'kakao',
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