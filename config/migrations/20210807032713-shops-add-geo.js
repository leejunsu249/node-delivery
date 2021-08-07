'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('Shops', 'geo', {
      type: Sequelize.DataTypes.GEOMETRY('POINT'),
    });
 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn('Shops', 'geo');
  }
};

//npx sequelize-cli migration:generate --name shops-add-geo
//npx sequelize-cli db:migrate
//npx sequelize-cli db:migrate:undo //되돌리기