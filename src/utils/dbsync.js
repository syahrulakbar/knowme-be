const db = require("../models");

const init = async () => {
  await db.sequelize
    .sync({ force: true })
    .then(() => {
      console.info("Done syncing database");
    })
    .catch((error) => {
      console.error(`Error syncing database: ${error}`);
    });
};

module.exports = init;
