'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, { foreignKey: 'position', targetKey: 'keyMap', as: 'positionUser' });
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mssv: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    position: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    tunure: DataTypes.STRING,
    bio: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    delete_at: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};