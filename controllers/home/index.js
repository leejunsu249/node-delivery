const { Router } = require('express');
const router = Router();
const ctrl = require('./home.ctrl');
const paginate = require('express-paginate');

router.get('/',paginate.middleware(4, 8), ctrl.get_home_list);
router.get('/orderlike',paginate.middleware(4, 8), ctrl.get_like_list);
router.get('/search', ctrl.home_search);
router.get('/search/likeorder', ctrl.get_search_like_list);

module.exports = router;