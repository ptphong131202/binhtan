'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bio extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            /* Bio.hasMany(models.User, { foreignKey: 'position', as: 'positionUser' }); */
        }
    };
    Bio.init({
        adminid: DataTypes.STRING,
        term: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Bio',
    });
    return Bio;
};