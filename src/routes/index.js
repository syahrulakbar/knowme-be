const userRoute = require("./user.route.js");
const skillsRoute = require("./skills.route.js");
const certificateRoute = require("./certificate.route.js");
const projectsRoute = require("./projects.route.js");
const experienceRoute = require("./experience.route.js");

module.exports = function (app) {
  userRoute(app);
  skillsRoute(app);
  certificateRoute(app);
  projectsRoute(app);
  experienceRoute(app);
};
