const models = require('../../models');

exports.get_home_list =  async( req , res, next )=>{
    try{
    const shops = await models.Shops.findAll({

        ...( req.query.lat && req.query.lng ? 
            {
                attributes: {
         
                  include : [
                    [
                      models.sequelize.literal(`
                        ST_DISTANCE_SPHERE( POINT( ${req.query.lng}, ${req.query.lat}), geo)`) 
                         ,'distance'
                    ]
                  ]
                },
               
                order  : [ [ models.sequelize.literal('distance'), 'asc' ] ]
                 
              }

              : '')
            });
         
    res.render('home.html', {shops});
    }catch(e){
        console.error(e);
        next(e);
    }
  }