module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define("experience", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Experience;
};
