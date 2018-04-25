'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('Customers', 'username', {type: Sequelize.STRING})
   queryInterface.addColumn('Customers', 'password', {type: Sequelize.STRING})
   queryInterface.addColumn('Customers', 'passwordSalt', {type: Sequelize.INTEGER})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
