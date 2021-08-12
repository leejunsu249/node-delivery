const models = require('../../models');

exports.get_checkout = (req, res) => {
    let totalAmount = 0;
    let cartList ={};

    let shop_id = 0;
    let menuArray =[];
    const IMPORT_ID = process.env.IMPORT_ID;

    if(typeof(req.cookies.cartList) !== 'undefined'){
        cartList = JSON.parse(unescape(req.cookies.cartList));

        for(let key in cartList){
            totalAmount += parseInt(cartList[key].price);
            shop_id = cartList[key].shop_id;
            menuArray.push(parseInt(key));
          }
    }
    res.render('checkout/index.html',{cartList, totalAmount , shop_id, menuArray , IMPORT_ID});
}

exports.post_complete = async(req, res) => {
    try{
      const checkout = await models.Checkout.create(req.body);

      const menuArray = JSON.parse(req.body.menuArray); //중괄호 오류 분리

      const result = await Promise.all(
        menuArray.map(menu => {          
          return models.ShopsMenu.findByPk( menu );
      
        }),
      );
      await checkout.addMenu(result);
    
      res.json({message:"success"});

    }catch(e){
        console.error(e);
    }
}


exports.get_success = (req, res) => {
    res.render('checkout/success.html');
}