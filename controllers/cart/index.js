const { Router } = require('express');
const router = Router();
const ctrl = require('./cart.ctrl');

router.get('/', ctrl.get_cart);


module.exports = router;