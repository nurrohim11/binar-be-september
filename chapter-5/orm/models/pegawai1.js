'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pegawai1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pegawai1.init({
    nama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tgl_masuk: DataTypes.DATE,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pegawai1',
  });
  return pegawai1;
};