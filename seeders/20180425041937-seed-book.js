'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Books', [
        {
          title: 'Javascript',
          description: 'Book of Javascript',
          stock: 10
        },
        {
          title: 'Node JS',
          description: 'Book of Node JS',
          stock: 10
        },
        {
          title: 'Swift',
          description: 'Book of Swift',
          stock: 10
        },
        {
          title: 'React',
          description: 'Book of React',
          stock: 10
        },{
          title: 'React Native',
          description: 'Book of React Native',
          stock: 10
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
