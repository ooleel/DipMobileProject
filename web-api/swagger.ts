import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web API",
      version: "1.0.0",
      description: "API documentation for the Web API backend system",
    },
    servers: [
      {
        url: "http://localhost:3002",
        description: "Local server",
      },
    ],
  },
  apis: ["./index.ts"],
});
