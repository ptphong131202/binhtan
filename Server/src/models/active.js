'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Active extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            /* Active.hasMany(models.User, { foreignKey: 'position', as: 'positionUser' }); */
        }
    };
    Active.init({
        userid: DataTypes.STRING,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Active',
    });
    return Active;
};