const db = require("../models");
const Skills = db.skills;

exports.createSkill = async (req, res) => {
  if (req.userId !== req.body.userId) return res.sendStatus(403);

  try {
    const response = await Skills.create(req.body);
    res.status(200).json({
      message: "success create skill",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const response = await Skills.findAll();
    res.status(200).json({
      message: "success get all skills",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getSkillById = async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await Skills.findByPk(id);
    if (skill) {
      if (req.userId !== skill.userId) return res.sendStatus(403);
      return res.status(200).json({
        message: "success get skill",
        data: skill,
      });
    } else {
      return res.status(404).json({
        message: "skill not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteSkill = async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await Skills.findByPk(id);
    if (skill) {
      if (req.userId !== skill.userId) return res.sendStatus(403);
      await Skills.destroy({ where: { id } });
      return res.status(200).json({
        message: "success delete skills",
      });
    } else {
      return res.status(404).json({
        message: "skill not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteAllSkills = async (req, res) => {
  try {
    await Skills.destroy({ where: {}, truncate: true });
    return res.status(200).json({
      message: "success delete all skills",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.updateSkill = async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await Skills.findByPk(id);
    if (skill) {
      if (req.userId !== skill.userId) return res.sendStatus(403);
      await Skills.update(req.body, { where: { id } });
      return res.status(200).json({
        message: "success update skill",
      });
    } else {
      return res.status(404).json({
        message: "skill not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
