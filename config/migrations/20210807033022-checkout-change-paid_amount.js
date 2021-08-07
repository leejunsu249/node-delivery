'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.changeColumn('Checkout', 'paid_amount', {
      type: Sequelize.INTEGER
    });
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.changeColumn('Checkout', 'paid_amount', {
      type: Sequelize.STRING
    });
  
  }
};

//npx sequelize-cli migration:generate --name checkout-change-paid_amount
