'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  email_token.init({
    user_id: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'email_token',
  });
  return email_token;
};