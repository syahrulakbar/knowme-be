const fs = require("fs");
const path = require("path");

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../../public/images", filePath);
  return fs.unlink(filePath, (err) => console.log(err || "Success Remove Image"));
};

module.exports = {
  removeImage,
};
