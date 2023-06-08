const { experienceController } = require("../controllers");
const { verifyToken, verifyUser } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.post("/v1/experience", verifyToken, experienceController.createExperience);
  app.get("/v1/experience", verifyToken, verifyUser.isAdmin, experienceController.getAllExperience);
  app.get("/v1/experience/user/:userId", experienceController.getAllExperienceByUserId);
  app.get("/v1/experience/:id", verifyToken, experienceController.getExperienceById);
  app.delete("/v1/experience/:id", verifyToken, experienceController.deleteExperience);
  app.delete("/v1/experience", verifyToken, verifyUser.isAdmin, experienceController.deleteAllExperience);
  app.patch("/v1/experience/:id", verifyToken, experienceController.updateExperience);
};
