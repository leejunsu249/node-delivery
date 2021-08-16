const models= require('../../models');

exports.get_shops = async ( req , res ) => {

const paginate = require('express-paginate');

    try{
        
        const [shops, totalCount] = await Promise.all([
             
             await models.Shops.findAll({
                where: {user_id: req.user.username},
                limit :  req.query.limit,
                offset : req.offset,
                order : [['createdAt', 'desc']]
            })
            ,
            await models.Shops.count()
        ])
        
        const pageCount = Math.ceil(totalCount / req.query.limit);
        const pages = paginate.getArrayPages(req)(10 , pageCount, req.query.page);//10 = 최대10p씩 페이징

        res.render( 'admin/shops.html' , { shops, pages, pageCount });

    }catch(e){

    }

}

exports.get_shops_write = ( req , res ) => {
  res.render( 'admin/form.html' , { csrfToken : req.csrfToken() } );
}

exports.post_shops_write = async (req,res) => {

    try{
        req.body.geo = {
            type: 'Point',
            coordinates: [
                req.body.geo.split(',')[0] ,
                req.body.geo.split(',')[1]
            ]
        };
 
        req.body.thumbnail = (req.file) ? req.file.filename : "";
        await models.Shops.create(req.body);
        res.redirect('/admin/shops');

    }catch(e){
        console.log(e);
    }
};

exports.get_shops_detail = async(req, res) => {

    try{

			// const shop = await models.Shops.findByPk(req.params.id);

			const shop = await models.Shops.findOne({
				where : {
					id : req.params.id
				},
				include :[
					'Menu'
				]
			});

			

      res.render('admin/detail.html', { shop });  

    }catch(e){
        console.log(e)
    }

    
}

exports.get_shops_edit = async(req, res) => {

    try{

        const shop = await models.Shops.findByPk(req.params.id);
        res.render('admin/form.html', { shop , csrfToken : req.csrfToken() });  

    }catch(e){

    }

    
}

exports.post_shops_edit = async(req, res) => {

		const fs = require('fs');
		const path = require('path');
		const uploadDir = path.join( __dirname , '../../uploads' );

    try{
        req.body.geo = {
            type: 'Point',
            coordinates: [
                req.body.geo.split(',')[0] ,
                req.body.geo.split(',')[1]
            ]
        };

        const shop = await models.Shops.findByPk(req.params.id);
        
        if(req.file && shop.thumbnail){  
                fs.unlinkSync( uploadDir + '/' + shop.thumbnail );
        }

        req.body.thumbnail = (req.file) ? req.file.filename : shop.thumbnail;

        await models.Shops.update(
            req.body , 
            { 
                where : { id: req.params.id } 
            }
        );
        res.redirect('/admin/shops/detail/' + req.params.id );

    }catch(e){
				console.log(e)
    }

}

exports.get_shops_delete = async(req, res) => {

    try{

        await models.Shops.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/shops');

    }catch(e){

    }

}

exports.add_menu = async(req, res) => {

	try{

			const shop = await models.Shops.findByPk(req.params.id);
			// create + as에 적은 내용 ( shops.js association 에서 적은 내용 )
			await shop.createMenu(req.body);
			res.redirect('/admin/shops/detail/'+req.params.id);  

	}catch(e){
			console.log(e)
	}

	
}

exports.remove_menu = async(req, res) => {

	try{

		await models.ShopsMenu.destroy({
				where: {
						id: req.params.menu_id
				}
		});
	
		res.redirect('/admin/shops/detail/' + req.params.shop_id );

	}catch(e){

	}

}

exports.get_order = async (req, res) => {
    try{
        const checkouts = await models.Checkout.findAll();
        res.render('admin/order.html', {checkouts});
    }catch(e){
        console.error(e);
    }
}

exports.get_order_edit = async (req, res) => {
    try{
        const checkout = await models.Checkout.findOne({
            where : {
                id: req.params.id,
            },
            include : ['Menu', 'Shop'],
        });
        res.render('admin/order_edit.html', {checkout});
    }catch(e){
        console.error(e);
    }
}

exports.remove_order = async (req, res) => {
    try{          
        const checkout = await models.Checkout.findByPk(req.params.id);
        const menuArray = await models.ShopsMenu.findAll({
            include: ['Checkout'],
            where:{[`$Checkout.id$`]: req.params.id},
        });

        await checkout.removeMenu(menuArray);

        await models.Checkout.destroy({
            where:{id : req.params.id}
        });

        res.redirect('/admin/order/');
    }catch(e){
        console.error(e);
    }
}