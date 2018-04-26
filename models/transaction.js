'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    bookDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
  }, {});
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsToMany(models.Customer, {
      through: models.Cart
    })
    Transaction.hasMany(models.Cart)
  };
  return Transaction;
};