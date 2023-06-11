"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("skills", "level");
    await queryInterface.renameColumn("skills", "nameSkills", "categorySkills");
    await queryInterface.renameColumn("skills", "fieldSkills", "detailSkills");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("skills", "level");
    await queryInterface.renameColumn("skills", "categorySkills", "nameSkills");
    await queryInterface.renameColumn("skills", "detailSkills", "fieldSkills");
  },
};
