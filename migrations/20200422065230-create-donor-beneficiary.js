'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DonorBeneficiaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      BeneficiaryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Beneficiaries',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInterface.dropTable('DonorBeneficiaries');
  }
};