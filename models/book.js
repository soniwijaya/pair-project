'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.hasOne(models.Cart)
  };
  return Book;
};