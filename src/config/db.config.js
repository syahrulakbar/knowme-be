const { development, test, production } = require("./config.js");
const env = process.env.NODE_ENV || "development";

let config = {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
if (env === "production") {
  config = {
    ...config,
    ...production,
  };
} else if (env === "development" || env === "dev-resync") {
  config = {
    ...config,
    ...development,
  };
} else if (env === "test") {
  config = {
    ...config,
    ...test,
  };
}
module.exports = config;
