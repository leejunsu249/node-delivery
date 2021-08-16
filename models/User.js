const passwordHash = require('../helpers/passwordHash');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
            username : { 
                type: DataTypes.STRING , 
                validate : {
                    len : [0, 50]
                },
                allowNull: false,
                unique: true,
                comment: 'id' },
            password : { 
                type: DataTypes.STRING , 
                validate : {
                    len : [3, 100]
                },
                allowNull: false,
                comment: '비밀번호' },
            displayname : {type: DataTypes.STRING},
            snsId: {
                type: DataTypes.STRING(30),
                allowNull: true,
              },
            provider:{
                type: DataTypes.STRING,
                allowNull:true,
                defaultValue: 'local', 
            },
            isadmin:{
                 type: DataTypes.BOOLEAN, 
                 allowNull: false, 
                 defaultValue: false,
            },      
        },{
            tableName: 'User'
        }
    );
    User.associate = (models) => {

        User.belongsToMany( models.Shops , {
            through: {
              model: 'LikesShops',
              unique: false
            },
            as: 'Likes',
            foreignKey: 'user_id',
            sourceKey: 'id',
            constraints: false,
          });

       
        };    
    
    User.beforeCreate( (user, _) => {
        user.password = passwordHash(user.password);
    })

    return User;
}