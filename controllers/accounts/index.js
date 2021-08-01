const { Router } = require('express');
const router = Router();
const ctrl = require('./accounts.ctrl');

const passport = require('../../middleware/passport-local');

// 회원가입
router.get('/join', ctrl.get_join);
router.post('/join' , ctrl.post_join);

// 로그인
router.get('/login', ctrl.get_login);
router.post('/login' , 
    passport.authenticate('local', { 
        failureRedirect: '/accounts/login', 
        failureFlash: true 
    }), 
    ctrl.post_login
);


router.get('/success', ctrl.get_success);


router.get('/logout', ctrl.get_logout);

module.exports = router;


