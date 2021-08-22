const models = require('../../models');


exports.get_shops_detail = async (req, res, next) => {
    try{
         const shop = await models.Shops.findOne({
             where: { id : req.params.id},
             include : ['Menu', 'LikeUser','Tag'],
         });

         let likeFlag = false;
         if(req.isAuthenticated()){
            const user = await models.User.findByPk(req.user.id);
            likeFlag = await shop.hasLikeUser(user);
         }
         const countLike = await shop.countLikeUser();
         

         let cartList = {};
         let cartLength = 0;
         let shopFlag = true;
     
         if( typeof(req.cookies.cartList) !== 'undefined'){
             cartList = JSON.parse(unescape(req.cookies.cartList));
             cartLength = Object.keys(cartList).length;

             for( let key in cartList){
                 if(cartList[key].shop_id != req.params.id){
                    shopFlag = false;
                 }
             }
         }


         res.render('shops/detail.html', {shop , cartLength , shopFlag, countLike , likeFlag });
    }catch(e){
        console.error(e);
        next(e);
    }

}

exports.post_shops_like = async(req, res, next) => {
    try{
        const shop = await models.Shops.findByPk(req.params.shop_id);
        const user = await models.User.findByPk(req.user.id);

        const status = await user.addLikes(shop);

        const countLike = await shop.countLikeUser();
        await shop.update({likeshop: countLike});

        res.json({
            status
        });
    }catch(e){
        console.error(e);
        next(e);
    }
}

exports.delete_shops_like = async(req, res, next) => {
    try{
        const shop = await models.Shops.findByPk(req.params.shop_id);
        const user = await models.User.findByPk(req.user.id);

        const status = await user.removeLikes(shop);

        const countLike = await shop.countLikeUser();
        await shop.update({likeshop: countLike});

        res.json({
            status
        });

    }catch(e){
        console.error(e);
        next(e);
    }
}