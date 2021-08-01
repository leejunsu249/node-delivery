const { Router } = require('express');
const router = Router();
const ctrl = require('./shops.ctrl');


router.get('/:id(\\d+)', ctrl.get_shops_detail);



module.exports = router;