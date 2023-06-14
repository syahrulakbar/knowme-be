"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("projects", "techStack");
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn("projects", "techStack");
  },
};
