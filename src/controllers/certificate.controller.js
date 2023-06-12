const fs = require("fs");
const path = require("path");
const db = require("../models");
const Certificate = db.certificate;
const { removeImage } = require("../utils/imageUtils.js");

exports.createCertificate = async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({
      message: req.fileValidationError,
    });
  }
  try {
    const response = await Certificate.create(req.body);
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
  const id = req?.params?.id;
  try {
    const certificate = await Certificate.findByPk(id);
    if (certificate) {
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
  const id = req.params.id;
  try {
    const skill = await Certificate.findByPk(id);
    if (skill) {
      await Certificate.update(req.body, { where: { id } });
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
