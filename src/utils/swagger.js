const swaggerJSDoc = require("swagger-jsdoc");
const version = require("../../package.json");
const corsPORT = process.env.CORS_PORT || "3001";
const corsHOST = process.env.CORS_HOST || "http://localhost:";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Know Me API",
    ...version,
    description: "Documentation for Know Me API",
  },
  servers: [
    {
      url: `http://localhost:3000`,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

exports.swaggerSpec = swaggerJSDoc(options);
