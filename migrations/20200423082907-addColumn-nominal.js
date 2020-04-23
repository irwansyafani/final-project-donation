'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('DonorBeneficiaries', 'amount', { type: Sequelize.INTEGER })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('DonorBeneficiaries', 'amount', {})
  }
};
