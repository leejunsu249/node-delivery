const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

const upload = require('../../middleware/multer');
const csrfProtection = require('../../middleware/csrf');
const {isLoggedIn} = require('../../middleware/loginRequired');

router.get('/shops', ctrl.get_shops );

router.use(isLoggedIn);

router.get('/shops/write', csrfProtection , ctrl.get_shops_write );

router.post('/shops/write', upload.single('thumbnail') , csrfProtection,  ctrl.post_shops_write );

router.get('/shops/detail/:id', ctrl.get_shops_detail );

router.get('/shops/edit/:id', csrfProtection, ctrl.get_shops_edit );

router.post('/shops/edit/:id', upload.single('thumbnail') , csrfProtection , ctrl.post_shops_edit );

router.get('/shops/delete/:id', ctrl.get_shops_delete );

// 메뉴 작성
router.post('/shops/detail/:id' , ctrl.add_menu);

// 메뉴 삭제
router.get('/shops/delete/:shop_id/:menu_id', ctrl.remove_menu );



module.exports = router;
