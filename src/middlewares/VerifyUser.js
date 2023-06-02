const db = require("../models");
const fs = require("fs");
const path = require("path");
const User = db.user;

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../../public/images", filePath);
  return fs.unlink(filePath, (err) => console.log(err || "Success Remove Image"));
};
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

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (user.email === "07tav2akbar@gmail.com") {
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
};
module.exports = verifyUser;
