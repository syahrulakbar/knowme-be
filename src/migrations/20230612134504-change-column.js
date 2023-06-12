"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("users", "sosialMedia");
    queryInterface.addColumn("users", "sosialMedia", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.changeColumn("users", "sosialMedia", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
