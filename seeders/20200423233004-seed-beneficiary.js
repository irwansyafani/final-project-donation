'use strict';
const data = require('./beneficiaries.json')

module.exports = {
  up: (queryInterface, Sequelize) => {

    data.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Beneficiaries', data, {})
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Beneficiaries', null, {});
  }
};
