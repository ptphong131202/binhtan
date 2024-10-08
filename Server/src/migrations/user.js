'use strict';
module.exports = {
  up: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.createTable( 'Users', {

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
      mssv: {
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
      position: {
          type: Sequelize.STRING
        },
      address: {
          type: Sequelize.STRING
        },
      image: {
            type: Sequelize.STRING
        },
      tunure: {
          type: Sequelize.STRING
        },
        bio: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.STRING
        },
        role: {
          type: Sequelize.STRING
        },
        delete_at: {
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
    await queryInterface.dropTable( 'Users' );
  }
};