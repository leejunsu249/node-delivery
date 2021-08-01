const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Shops = sequelize.define('Shops',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING , comment: '상점명' },
            thumbnail : { type: DataTypes.STRING , comment: '상점사진' },
            address : { type: DataTypes.STRING , comment: '주소' },
            location : { type: DataTypes.STRING , comment: '상세주소' },
            phone : { type: DataTypes.STRING , comment: '전화번호' },
            open_time : { type: DataTypes.STRING , comment: '운영시간' },
            cell_phone : { type: DataTypes.STRING , comment: '핸드폰번호' }
        }
    );

     // 메뉴 모델 관계도
     Shops.associate = (models) => {

        // 메뉴 모델에 외부키를 건다
        // onDelete 옵션의 경우 제품 하나가 삭제되면 외부키가 걸린 메모들도 싹다 삭제해준다
        Shops.hasMany( models.ShopsMenu , 
            { as: 'Menu' , foreignKey: 'shop_id', sourceKey: 'id' , onDelete: 'CASCADE' }
        );

     }

    Shops.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')
    );

    return Shops;
}