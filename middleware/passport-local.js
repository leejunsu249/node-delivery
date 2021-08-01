const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');
const models = require('../models');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField : 'password',
  passReqToCallback : true

}, async ( req, username, password, done) => {
  const exUser = await models.User.findOne({where: { username },});
 if(exUser){
      const result = exUser.password === passwordHash(password);
      if(result){
          return done(null, exUser.dataValues);
      }else{
          return done(null, false, { message: '비밀번호 확인해주세요.' });
      } 
 }else{
          return done(null, false, { message: '아이디 확인해주세요.' });
 }
     
}));

passport.serializeUser(  (user, done) => {
  done(null, user);
});

passport.deserializeUser(  (user, done) => {
  user.password = '';
  done(null, user);
});

module.exports = passport;