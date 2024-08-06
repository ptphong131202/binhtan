'use strict';
const {
  Model
} = require('sequelize');
const tunure = require('./tunure');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsTo(models.Allcode, { foreignKey: 'position' , targetKey: 'keyMap', as: 'positionAdmin' });
      Admin.belongsTo(models.Tunure, { foreignKey: 'tunure' , targetKey: 'id', as: 'tunureAdmin' });
    }
  };
  Admin.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    position: DataTypes.STRING,
    tunure: DataTypes.STRING,
    biography: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};