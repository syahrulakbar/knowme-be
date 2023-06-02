const { projectsController } = require("../controllers");
const { upload } = require("../middlewares");
module.exports = (app) => {
  app.use((req, res, next) => {
    next();
  });
  app.post("/v1/projects", upload.single("pictureProject"), projectsController.createProject);
  app.get("/v1/projects", projectsController.getAllProjects);
  app.get("/v1/projects/:id", projectsController.getProjectById);
  app.patch("/v1/projects/:id", upload.single("pictureProject"), projectsController.updateProject);
  app.delete("/v1/projects/:id", projectsController.deleteProject);
  app.delete("/v1/projects", projectsController.deleteAllProjects);
};
