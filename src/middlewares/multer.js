const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const originalName = file.originalname;

    cb(null, `${timestamp}-${originalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    const responseRejected = "file must be a PNG or JPEG/JPG image";
    req.fileValidationError = responseRejected;
    cb(null, false, new Error(responseRejected));
  }
};

const upload = multer({
  fileFilter,
  storage,
  limits: {
    fileSize: 3 * 1000 * 1000, //3mb
  },
});

module.exports = upload;
