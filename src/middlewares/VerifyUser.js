const db = require("../models");
const fs = require("fs");
const path = require("path");
const { user: User, ADMIN } = db;
const { removeImage } = require("../utils/imageUtils.js");

const checkDuplicateEmail = async (req, res, next) => {
  if (!req.body.email) return next();
  try {
    const users = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (users) {
      if (users.id === req.params.id) {
        return next();
      }
      if (req.file?.filename) {
        removeImage(req.file?.filename);
      }
      return res.status(400).json({
        message: "Failed! Email already in use",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.send(500).json({
      message: error?.message,
    });
  }
};

const isAuth = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const email = req.email;
  try {
    const user = await User.findByPk(id || userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (user.email === email || ADMIN.includes(email)) return next();
    res.sendStatus(403);
  } catch (error) {
    console.error(error);
    res.send(500).json({
      message: error?.message,
    });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (ADMIN.includes(req.email)) {
      return next();
    }
    res.sendStatus(403);
  } catch (error) {
    console.error(error);
    res.send(500).json({
      message: error?.message,
    });
  }
};
const verifyUser = {
  checkDuplicateEmail,
  isAdmin,
  isAuth,
};
module.exports = verifyUser;
