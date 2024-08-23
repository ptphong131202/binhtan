'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Term extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            /* Term.hasMany(models.User, { foreignKey: 'position', as: 'positionUser' }); */
        }
    };
    Term.init({
        title: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Term',
    });
    return Term;
};