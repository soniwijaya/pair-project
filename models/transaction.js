'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    CartId: DataTypes.INTEGER,
    bookDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};