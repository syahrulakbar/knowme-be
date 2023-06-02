const { projectsController } = require("../controllers");
const { verifyToken, verifyUser, upload } = require("../middlewares");

module.exports = (app) => {
  app.use((req, res, next) => {
    next();
  });
  app.post("/v1/projects", verifyToken, upload.single("pictureProject"), verifyUser.isAuth, projectsController.createProject);
  app.get("/v1/projects", verifyToken, verifyUser.isAdmin, projectsController.getAllProjects);
  app.get("/v1/projects/:id", verifyToken, projectsController.getProjectById);
  app.patch("/v1/projects/:id", upload.single("pictureProject"), projectsController.updateProject);
  app.delete("/v1/projects/:id", verifyToken, upload.single("pictureProject"), verifyUser.isAuth, projectsController.deleteProject);
  app.delete("/v1/projects", verifyToken, verifyUser.isAdmin, projectsController.deleteAllProjects);
};
