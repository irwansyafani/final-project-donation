'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Topups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nominal: {
        type: Sequelize.INTEGER
      },
      DonorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Donors',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      token: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Topups');
  }
};