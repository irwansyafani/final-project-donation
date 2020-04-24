'use strict';
const data = require('./donors.json')

module.exports = {
  up: (queryInterface, Sequelize) => {

    data.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Donors', data, {})
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Donors', null, {});
    }
};
