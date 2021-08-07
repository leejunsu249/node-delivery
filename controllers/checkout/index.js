const { Router } = require('express');
const router = Router();
const ctrl = require('./checkout.ctrl');

router.get('/', ctrl.get_checkout);

router.post('/complete' , ctrl.post_complete);
router.get('/success' , ctrl.get_success);


module.exports = router;
