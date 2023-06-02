const fs = require("fs");
const path = require("path");
const db = require("../models");
const Certificate = db.certificate;

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../../public/images", filePath);
  return fs.unlink(filePath, (err) => console.log(err || "Success Remove Image"));
};

exports.createCertificate = async (req, res) => {
  const pictureCompany = req.file?.filename;
  if (req.fileValidationError) {
    return res.status(400).json({
      message: req.fileValidationError,
    });
  }
  try {
    const response = await Certificate.create({ ...req.body, pictureCompany });
    res.status(200).json({
      message: "Success Create Certificate",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.getAllCertificate = async (req, res) => {
  try {
    const response = await Certificate.findAll();
    res.status(200).json({
      message: "success get all Certificate",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getCertificateById = async (req, res) => {
  const id = req.params.id;
  try {
    const certificate = await Certificate.findByPk(id);
    if (certificate) {
      return res.status(200).json({
        message: "success get Certificate",
        data: certificate,
      });
    } else {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteCertificate = async (req, res) => {
  const id = req.params.id;
  try {
    const certificate = await Certificate.findByPk(id);
    if (certificate) {
      removeImage(certificate?.pictureCompany);
      await Certificate.destroy({ where: { id } });
      return res.status(200).json({
        message: "success delete certificate",
      });
    } else {
      return res.status(404).json({
        message: "certificate not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteAllCertificate = async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    for (let certi in certificates) {
      removeImage(certificates[certi]?.pictureCompany);
    }
    await Certificate.destroy({ where: {}, truncate: true });
    return res.status(200).json({
      message: "success delete all certificate",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.updateCertificate = async (req, res) => {
  const pictureCompany = req.file?.filename;
  const id = req.params.id;
  if (req.fileValidationError) {
    return res.status(400).json({
      message: req.fileValidationError,
    });
  }
  try {
    const skill = await Certificate.findByPk(id);
    if (skill) {
      if (pictureCompany) {
        removeImage(skill.pictureCompany);
      }
      await Certificate.update({ ...req.body, pictureCompany }, { where: { id } });
      return res.status(200).json({
        message: "success update certificate",
      });
    } else {
      return res.status(404).json({
        message: "certificate not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
