const { experienceController } = require("../controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.post("/v1/experience", experienceController.createExperience);
  app.get("/v1/experience", experienceController.getAllExperience);
  app.get("/v1/experience/:id", experienceController.getExperienceById);
  app.delete("/v1/experience/:id", experienceController.deleteExperience);
  app.delete("/v1/experience", experienceController.deleteAllExperience);
  app.patch("/v1/experience/:id", experienceController.updateExperience);
};
