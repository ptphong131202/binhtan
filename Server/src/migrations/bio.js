'use strict';
module.exports = {
  up: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.createTable( 'Bios', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminId: {
            type: Sequelize.STRING
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
    await queryInterface.dropTable( 'Bios' );
  }
};