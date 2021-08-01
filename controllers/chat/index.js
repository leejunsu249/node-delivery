const { Router } = require('express');
const router = Router();
const {isLoggedIn} = require('../../middleware/loginRequired');

router.use(isLoggedIn);
router.get('/', (req, res) => {
    res.render('chat/index.html');
});

module.exports= router;