'use strict';
module.exports = {
  up: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.createTable( 'Tunures', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tunure: {
            type: Sequelize.STRING
        },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );
  },
  down: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.dropTable( 'Tunures' );
  }
};