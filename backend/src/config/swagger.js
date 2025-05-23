const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Configuração do Swagger para documentação da API
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Registros de Produtividade',
      version: '1.0.0',
      description: 'API para gerenciamento de registros de produtividade',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Arquivos que contêm anotações JSDoc
};

/**
 * Inicializa a documentação Swagger
 * @param {Object} app - Instância do Express
 */
const setupSwagger = (app) => {
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Documentação Swagger disponível em /api-docs');
};

module.exports = setupSwagger;
