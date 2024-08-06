'use strict';
module.exports = {
  up: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.createTable( 'Admins', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      phone: {
          type: Sequelize.STRING
        },
      image: {
            type: Sequelize.STRING
        },
      position: {
          type: Sequelize.STRING
        },
        tunure: {
          type: Sequelize.STRING
        },
      biography: {
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
    await queryInterface.dropTable( 'Admins' );
  }
};