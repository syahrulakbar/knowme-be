"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("experiences", "duration");
    queryInterface.addColumn("experiences", "startDate", {
      type: Sequelize.DATE,
    });
    queryInterface.addColumn("experiences", "endDate", {
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn("experiences", "duration", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.removeColumn("experiences", "startDate");
    queryInterface.removeColumn("experiences", "endDate");
  },
};
