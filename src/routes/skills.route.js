const { skillsController } = require("../controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.get("/v1/skills", skillsController.getAllSkills);
  app.post("/v1/skills", skillsController.createSkill);
  app.get("/v1/skills/:id", skillsController.getSkillById);
  app.delete("/v1/skills/:id", skillsController.deleteSkill);
  app.patch("/v1/skills/:id", skillsController.updateSkill);
  app.delete("/v1/skills", skillsController.deleteAllSkills);
};
