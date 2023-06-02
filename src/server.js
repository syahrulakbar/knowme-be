require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./utils/swagger.js");

const app = express();
const corsPORT = process.env.CORS_PORT || "3001";
const corsHOST = process.env.CORS_HOST || "http://localhost:";
const corsOptions = {
  origin: `${corsHOST + corsPORT}`,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static("public/images"));

app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require("./routes")(app);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(413).json({ message: error.message });
  }
  const status = error.errorStatus || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).json({
    message: message,
  });
});

const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.info("Database Connected");
    app.listen(3000, () => {
      console.info("http://localhost:3000");
    });
  } catch (error) {
    console.info(`Error Syncing Database:${error.message}`);
  }
};

startServer();
