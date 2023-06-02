const { skillsController } = require("../controllers");
const { verifyToken, verifyUser } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.get("/v1/skills", verifyToken, verifyUser.isAdmin, skillsController.getAllSkills);
  app.post("/v1/skills", verifyToken, skillsController.createSkill);
  app.get("/v1/skills/:id", verifyToken, skillsController.getSkillById);
  app.delete("/v1/skills/:id", verifyToken, skillsController.deleteSkill);
  app.patch("/v1/skills/:id", verifyToken, skillsController.updateSkill);
  app.delete("/v1/skills", verifyToken, verifyUser.isAdmin, skillsController.deleteAllSkills);
};
