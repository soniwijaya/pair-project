'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Customers', [
     {
      name: "John Doe",
      email: "johndoe@mail.com",
     },
     {
      name: "Bill Gates",
      email: "billgates@mail.com",
     },
     {
      name: "Steve Job",
      email: "stevejob@mail.com",
     },
     {
      name: "Larry Page",
      email: "larrypage@mail.com",
     },
     {
      name: "Jack Ma",
      email: "jackma@mail.com",
     },
   ])
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
