module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define("projects", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pictureProject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    techStack: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descriptionProject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlProject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Projects;
};
