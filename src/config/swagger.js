const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Hostal Reservas',
      version: '1.0.0',
      description: 'API para sistema de reservas de hostal',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Rutas donde buscar los comentarios de documentación
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;