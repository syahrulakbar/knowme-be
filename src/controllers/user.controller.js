const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models");
const { removeImage } = require("../utils/imageUtils.js");
const { user: User, skills: Skills, projects: Projects, certificate: Certificate, experience: Experience, ADMIN } = db;

exports.createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.status(400).json({ message: "Password and Confirm Password Not Match" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(200).json({
      message: "Success Create Account",
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ message: "Email Not Registered" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });
    const { id, name, email } = user;
    const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Successfully logged in",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(204);
    await User.update(
      { refresh_token: null },
      {
        where: { id: user.id },
      }
    );
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Successfully Logout",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    if (req.query?.name) {
      const users = await User.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        },
        attributes: ["id", "email", "name"],
      });
      if (users.length > 0) {
        return res.status(200).json({
          message: "Success Get User",
          data: users,
        });
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    } else {
      const response = await User.findAll({
        attributes: ["id", "email", "name"],
      });
      res.status(200).json({
        message: "Success Get All Users",
        data: response,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
      if (err) return res.sendStatus(403);
      const { id, name, email } = user;
      const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      const experience = await Experience.findAll({ where: { userId } });
      const skills = await Skills.findAll({ where: { userId } });
      const projects = await Projects.findAll({ where: { userId } });
      const certificate = await Certificate.findAll({ where: { userId } });
      const data = {
        user,
        experience,
        skills,
        projects,
        certificate,
      };
      res.status(200).json({
        message: "Success Fetch Data",
        data,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      if (ADMIN.includes(user.email)) {
        return res.status(403).json({ message: "Cannot delete admin account" });
      }
      if (user.picture) {
        removeImage(user.picture);
      }
      await User.destroy({
        where: { id: userId },
      });
      res.status(200).json({
        message: "Success Delete User",
      });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
exports.deleteAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        email: {
          [Op.notIn]: ADMIN,
        },
      },
    });
    for (let user in users) {
      if (users[user]?.picture) {
        removeImage(users[user]?.picture);
      }
    }
    await User.destroy({
      where: {
        email: {
          [Op.notIn]: ADMIN,
        },
      },
    });
    res.status(200).json({
      message: "Success Delete All Users",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const picture = req.file?.filename;
  if (req.fileValidationError) {
    return res.status(400).json({
      message: req.fileValidationError,
    });
  }
  try {
    const user = await User.findByPk(userId);
    if (user) {
      if (picture) {
        if (user.picture) {
          removeImage(user.picture);
        }
      }
      await User.update(
        { ...req.body, picture },
        {
          where: { id: userId },
        }
      );
      res.status(200).json({
        message: "Success Update User",
      });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message,
    });
  }
};
