const { Router } = require('express');
const router = Router();
const ctrl = require('./home.ctrl');

router.get('/', ctrl.get_home_list);

module.exports = router;