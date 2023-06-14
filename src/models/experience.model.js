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
    isStillWorking: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    jobDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Experience;
};
