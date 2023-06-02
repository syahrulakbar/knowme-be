"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("users", "sosialMedia", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn("users", "sosialMedia", {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },
};
