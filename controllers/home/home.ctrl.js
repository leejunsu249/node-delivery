const models = require('../../models');

exports.get_home_list =  async( req , res, next )=>{
    try{
      const shops  = await models.Shops.findAll({
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

                limit :  req.query.limit,
                offset : req.offset,
        
                order  : [ [ models.sequelize.literal('distance'), 'asc' ] ]
                 
              }

              : {limit :  req.query.limit, offset : req.offset})
            });
         
          res.render('home.html', {shops});
    }catch(e){
        console.error(e);
        next(e);
    }
  }