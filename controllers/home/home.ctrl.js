const models = require('../../models');

exports.get_home_list =  async( req , res, next )=>{
    try{
      const shopsAll  = await models.Shops.findAndCountAll({
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
      
      const shops = shopsAll.rows;
      const shopcount = shopsAll.count;

      res.render('home.html', {shops, shopcount});
    }catch(e){
        console.error(e);
        next(e);
    }
  }

  exports.get_like_list =  async( req , res, next )=>{
    try{
      const shopsAll  = await models.Shops.findAndCountAll({
       
                limit :  req.query.limit,
                offset : req.offset,

                order  : [ [ 'likeshop','DESC'] ],
              
            });
      const shops = shopsAll.rows;
      const shopcount = shopsAll.count;

      res.render('home.html', {shops,shopcount});
    }catch(e){
        console.error(e);
        next(e);
    }
  }


  
exports.home_search =  async( req , res, next )=>{
  try{
    const shopsAll = await models.Shops.findAndCountAll({

      include : [ 'Tag' ],

      ...( req.query.lat && req.query.lng ?
     
      {
        attributes: {
 
          include : [
            [
              models.sequelize.literal(`
                ST_DISTANCE_SPHERE( POINT(
                    ${req.query.lng},
                    ${req.query.lat}
                  ), geo)`
                ) ,
                'distance'
            ]
          ]
 
        },  
        order  : [ [ models.sequelize.literal('distance'), 'asc' ] ]
         
      }
 
      :""),
      where : {
          ...(
          ('name' in req.query && req.query.name) ?
          {
              [models.Sequelize.Op.or] : [
                  models.Sequelize.where( models.Sequelize.col('Tag.name') , {
                      [models.Sequelize.Op.like] : `%${req.query.name}%`
                  }),
                  {
                      'name' : {
                          [models.Sequelize.Op.like] : `%${req.query.name}%`
                      }
                  }
              ],
          }
          :
          "")
      },
     
    });

    const shops = shopsAll.rows;
    const shopcount = shopsAll.count;

    res.render('homeSearch.html', {shops,shopcount});
  }catch(e){
      console.error(e);
      next(e);
  }
}

exports.get_search_like_list =  async( req , res, next )=>{
  try{
    const shopsAll  = await models.Shops.findAndCountAll({
      include : [ 'Tag' ],
      where : {
        ...(
        ('name' in req.query && req.query.name) ?
        {
            [models.Sequelize.Op.or] : [
                models.Sequelize.where( models.Sequelize.col('Tag.name') , {
                    [models.Sequelize.Op.like] : `%${req.query.name}%`
                }),
                {
                    'name' : {
                        [models.Sequelize.Op.like] : `%${req.query.name}%`
                    }
                }
            ],
        }
        :
        "")
    },
     
    order  : [ [ 'likeshop','DESC'] ],
            
          });

          
    const shops = shopsAll.rows;
    const shopcount = shopsAll.count;

    res.render('homeSearch.html', {shops,shopcount});
  }catch(e){
      console.error(e);
      next(e);
  }
}
