module.exports = (sequelize, Sequelize) => {
  const Certificate = sequelize.define("certificates", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pictureCompany: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    issueDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlCertificate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Certificate;
};
