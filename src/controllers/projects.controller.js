const fs = require("fs");
const path = require("path");
const db = require("../models");
const Projects = db.projects;

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../../public/images", filePath);
  return fs.unlink(filePath, (err) => console.log(err || "Success Remove Image"));
};

exports.createProject = async (req, res) => {
  const pictureProject = req.file?.filename;
  if (req.fileValidationError) {
    return res.status(400).json({
      message: req.fileValidationError,
    });
  }
  try {
    const response = await Projects.create({ ...req.body, pictureProject });
    res.status(200).json({
      message: "Success Create Project",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    const response = await Projects.findAll();
    res.status(200).json({
      message: "success get all Projects",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getProjectById = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Projects.findByPk(id);
    if (project) {
      return res.status(200).json({
        message: "success get Project",
        data: project,
      });
    } else {
      return res.status(404).json({
        message: "Project not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteProject = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Projects.findByPk(id);
    if (project) {
      removeImage(project.pictureProject);
      await Projects.destroy({ where: { id } });
      return res.status(200).json({
        message: "success delete project",
      });
    } else {
      return res.status(404).json({
        message: "project not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteAllProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll();
    for (let project in projects) {
      removeImage(projects[project]?.pictureProject);
    }
    await Projects.destroy({ where: {}, truncate: true });
    return res.status(200).json({
      message: "success delete all project",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.updateProject = async (req, res) => {
  const id = req.params.id;
  const pictureProject = req.file?.filename;
  try {
    const skill = await Projects.findByPk(id);
    if (skill) {
      if (pictureProject) {
        removeImage(skill.pictureProject);
      }
      await Projects.update(req.body, { where: { id } });
      return res.status(200).json({
        message: "success update project",
      });
    } else {
      return res.status(404).json({
        message: "project not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
