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

      const menuArray = req.body.menuArray; //중괄호 오류 분리

      const result = await Promise.all(
        menuArray.map(menu => {          
          return models.ShopsMenu.findByPk( menu );
      
        }),
      );
        console.log(result);
      await checkout.addMenu(result);


      // async function asyncSetMenu(menu_id){
      //   try{
      //     const menu = await models.ShopsMenu.findByPk( menu_id );
      //     const status = await checkout.addMenu(menu);
      //     if(typeof status == 'undefined'){
      //       throw `menu :: ${menu_id}가 존재하지 않습니다.`;
      //     }
      //   }catch(e){
      //     throw e;
      //   }
      // }

      // for (let menu_id of menuArray) await asyncSetMenu(menu_id);
    

      res.json({message:"success"});

    }catch(e){
        console.error(e);
    }
}


exports.get_success = (req, res) => {
    res.render('checkout/success.html');
}