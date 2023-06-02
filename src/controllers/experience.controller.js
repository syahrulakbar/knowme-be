const db = require("../models");
const Experience = db.experience;

exports.createExperience = async (req, res) => {
  try {
    const response = await Experience.create(req.body);
    res.status(200).json({
      message: "Success Create Experience",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.getAllExperience = async (req, res) => {
  try {
    const response = await Experience.findAll();
    res.status(200).json({
      message: "success get all Experience",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getExperienceById = async (req, res) => {
  const id = req.params.id;
  try {
    const experience = await Experience.findByPk(id);
    if (experience) {
      return res.status(200).json({
        message: "success get Experience",
        data: experience,
      });
    } else {
      return res.status(404).json({
        message: "Experience not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteExperience = async (req, res) => {
  const id = req.params.id;
  try {
    const experience = await Experience.findByPk(id);
    if (experience) {
      await Experience.destroy({ where: { id } });
      return res.status(200).json({
        message: "success delete experience",
      });
    } else {
      return res.status(404).json({
        message: "experience not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteAllExperience = async (req, res) => {
  try {
    await Experience.destroy({ where: {}, truncate: true });
    return res.status(200).json({
      message: "success delete all experience",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.updateExperience = async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await Experience.findByPk(id);
    if (skill) {
      await Experience.update(req.body, { where: { id } });
      return res.status(200).json({
        message: "success update experience",
      });
    } else {
      return res.status(404).json({
        message: "experience not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
