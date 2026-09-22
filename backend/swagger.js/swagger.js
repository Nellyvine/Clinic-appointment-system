const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clinic Appointment Management System API',
      version: '1.0.0',
      description: 'REST API for managing patients, doctors, and appointments at a small medical clinic.'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
