const { Router } = require('express');
const router = Router();
const ctrl = require('./home.ctrl');
const paginate = require('express-paginate');

router.get('/',paginate.middleware(4, 8), ctrl.get_home_list);

module.exports = router;