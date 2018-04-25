'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Format Email"
        },
        isUnique: function (value, next) {
          Customer.find({ where: { email: value } })
            .then(function (user) {
              if (user && self.id !== user.id) {
                return next('Email already in use!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            })
        }
      }
    },
    username : {
      type: DataTypes.STRING
    },
    password : {
      type: DataTypes.STRING
    },
    passwordSalt: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    }
  }, {});
  Customer.associate = function (models) {
    // associations can be defined here
  };
  return Customer;
};