const { certificateController } = require("../controllers");
const { upload } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  });
  app.post("/v1/certificate", upload.single("pictureCompany"), certificateController.createCertificate);
  app.get("/v1/certificate", certificateController.getAllCertificate);
  app.get("/v1/certificate/:id", certificateController.getCertificateById);
  app.delete("/v1/certificate/:id", certificateController.deleteCertificate);
  app.delete("/v1/certificate", certificateController.deleteAllCertificate);
  app.patch("/v1/certificate/:id", upload.single("pictureCompany"), certificateController.updateCertificate);
};
