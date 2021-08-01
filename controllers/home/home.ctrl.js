const models = require('../../models');

exports.get_home_list =  async( _ , res, next )=>{
    try{
    const shops = await models.Shops.findAll({limit : 4});
    res.render('home.html', {shops});
    }catch(e){
        console.error(e);
        next(e);
    }
  }