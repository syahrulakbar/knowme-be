"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "about", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "sosialMedia", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "picture", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("users", "refresh_token", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "about", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "sosialMedia", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "picture", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("users", "email");
    await queryInterface.removeColumn("users", "password");
    await queryInterface.removeColumn("users", "refresh_token");
  },
};
