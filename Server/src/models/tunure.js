'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tunure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tunure.hasMany(models.Admin, { foreignKey: 'tunure', as: 'tunureAdmin' });

    }
  };
  Tunure.init({
    tunure: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tunure',
  });
  return Tunure;
};