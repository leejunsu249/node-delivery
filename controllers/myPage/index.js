const express = require('express');
const router = express.Router();
 const {isLoggedIn} = require('../../middleware/loginRequired');
 const ctrl = require('./myPage.ctrl');


router.get('/likes' ,isLoggedIn, ctrl.get_likes);

module.exports = router;
