"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("certificates", "pictureCompany");
    queryInterface.changeColumn("certificates", "companyName", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    queryInterface.changeColumn("certificates", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    queryInterface.removeColumn("certificates", "issueDate");
    queryInterface.addColumn("certificates", "issueDate", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    queryInterface.changeColumn("certificates", "urlCertificate", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn("certificates", "pictureCompany");
    queryInterface.changeColumn("certificates", "companyName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.changeColumn("certificates", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.changeColumn("certificates", "issueDate", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.changeColumn("certificates", "urlCertificate", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
