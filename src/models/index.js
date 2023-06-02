const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.experience = require("../models/experience.model.js")(sequelize, Sequelize);
db.projects = require("../models/projects.model.js")(sequelize, Sequelize);
db.skills = require("../models/skills.model.js")(sequelize, Sequelize);
db.certificate = require("../models/certificate.model.js")(sequelize, Sequelize);

db.user.hasMany(db.experience, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});
db.experience.belongsTo(db.user, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});

db.user.hasMany(db.projects, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});
db.projects.belongsTo(db.user, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});

db.user.hasMany(db.skills, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});
db.skills.belongsTo(db.user, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});

db.user.hasMany(db.certificate, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});
db.certificate.belongsTo(db.user, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
});

module.exports = db;
