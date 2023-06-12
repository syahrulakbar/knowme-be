const { certificateController } = require("../controllers");
const { verifyToken, verifyUser } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.post("/v1/certificate", verifyToken, certificateController.createCertificate);
  app.get("/v1/certificate", verifyToken, verifyUser.isAdmin, certificateController.getAllCertificate);
  app.get("/v1/certificate/:id", verifyToken, certificateController.getCertificateById);
  app.delete("/v1/certificate/:id", verifyToken, certificateController.deleteCertificate);
  app.delete("/v1/certificate", verifyToken, verifyUser.isAdmin, certificateController.deleteAllCertificate);
  app.patch("/v1/certificate/:id", verifyToken, certificateController.updateCertificate);
};
