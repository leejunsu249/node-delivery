const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    const Checkout = sequelize.define('Checkout',
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
        imp_uid: {type: DataTypes.STRING}, //imp ID
        merchant_uid:{ type: DataTypes.STRING}, // 상점고유ID
        paid_amount : { type: DataTypes.INTEGER }, 
        apply_num : { type: DataTypes.STRING }, //카드 승인번호

        buyer_email : { type: DataTypes.STRING }, 
        buyer_name : { type: DataTypes.STRING }, 
        buyer_tel : { type: DataTypes.STRING }, 
        buyer_addr : { type: DataTypes.STRING }, 
        buyer_postcode : { type: DataTypes.STRING },

        status : { type: DataTypes.STRING }, //결재상태

    },{
        tableName: 'Checkout'
        }
    );

    Checkout.associate = (models) => {
        Checkout.belongsToMany( models.ShopsMenu, {
            through : {
                model: 'CheckoutMenu',
                unique: false
            },
            as : 'Menu',
            foreignKey : 'checkout_id',
            constraints : false,
            sourceKey : 'id'
        });

        Checkout.belongsTo( models.Shops,
            {
                as : 'Shop',
                foreignKey : 'shop_id',
                targetKey : 'id'
            });



    }

    Checkout.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD  hh:mm')
    );

    return Checkout;
 
};