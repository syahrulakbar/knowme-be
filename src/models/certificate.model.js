module.exports = (sequelize, Sequelize) => {
  const Certificate = sequelize.define("certificates", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    issueDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    urlCertificate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    credential: {
      type: Sequelize.STRING,
    },
  });
  return Certificate;
};
