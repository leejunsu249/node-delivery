const { Router } = require('express');
const router = Router();
const ctrl = require('./shops.ctrl');
const {isLoggedIn} = require('../../middleware/loginRequired');


router.get('/:id(\\d+)', ctrl.get_shops_detail);
router.use(isLoggedIn);
router.post('/like/:shop_id(\\d+)',  ctrl.post_shops_like);
router.delete('/like/:shop_id(\\d+)', ctrl.delete_shops_like);


module.exports = router;