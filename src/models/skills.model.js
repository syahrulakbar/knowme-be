module.exports = (sequelize, Sequelize) => {
  const Skills = sequelize.define("skills", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    categorySkills: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detailSkills: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue("detailSkills");
        return JSON.parse(value);
      },
    },
  });
  return Skills;
};
