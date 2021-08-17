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

exports.get_complete = async(req, res) => {

  const {Iamporter} = require('iamporter');
  const iamporter = new Iamporter({
    apiKey: process.env.IAMPORT_APIKEY,
    secret: process.env.IAMPORT_SECRET,
  })
  try{
      const iamportData = await iamporter.findByImpUid(req.query.imp_uid);
      const checkout = await models.Checkout.create({
        imp_uid : iamportData.data.imp_uid,
        merchant_uid : iamportData.data.merchant_uid,
        paid_amount : iamportData.data.amount,
        apply_num : iamportData.data.apply_num,

        buyer_email : iamportData.data.buyer_email,
        buyer_name : iamportData.data.buyer_name,
        buyer_tel : iamportData.data.buyer_tel,
        buyer_addr : iamportData.data.buyer_addr,
        buyer_postcode : iamportData.data.buyer_postcode,
        shop_id : req.query.shop_id,
        status:"결제완료"
      });
      const menuArray = JSON.parse(req.query.menuArray); //중괄호 오류 분리

      const result = await Promise.all(
        menuArray.map(menu => {          
          return models.ShopsMenu.findByPk( menu );
      
        }),
      );
      await checkout.addMenu(result);

      res.redirect('/checkout/success');

  }catch(e){
      console.error(e);
  }
}


exports.get_success = (req, res) => {
    res.render('checkout/success.html');
}

