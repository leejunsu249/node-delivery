const { Router } = require('express');
const router = Router();
const fapassport = require('../../middleware/passport-facebook');
const capassport = require('../../middleware/passport-kakao');
 

router.get('/facebook', fapassport.authenticate('facebook', { scope: 'email'}) );
 
router.get('/facebook/callback',
    fapassport.authenticate('facebook', 
        { 
            successRedirect: '/',
            failureRedirect: '/accounts/login' 
        }
    )
);
 
router.get('/kakao', capassport.authenticate('kakao'));
router.get('/kakao/callback', capassport.authenticate('kakao', {
    failureRedirect: '/accounts/login',
  }), (req, res) => {
    res.redirect('/');
  });


 

module.exports = router;


