'use strict';
module.exports = (sequelize, DataTypes) => {
  let Transaction = require('./transaction')
  var Cart = sequelize.define('Cart', {
    CustomerId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    // Cart.hasMany(models.Transaction)
    Cart.belongsTo(models.Transaction)
    Cart.belongsTo(models.Book)
  };
  return Cart;
};