module.exports = (sequelize, Sequelize) => {
  const Skills = sequelize.define("skills", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nameSkills: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fieldSkills: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Skills;
};
