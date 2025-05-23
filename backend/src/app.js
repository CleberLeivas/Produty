const express = require('express');
const { PrismaClient } = require('@prisma/client');
const registroRoutes = require('./routes/registroRoutes');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./config/swagger');
require('dotenv').config();

// Inicialização do app e do Prisma
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

// Rotas
app.use('/registro', registroRoutes);

// Rota de status
app.get('/status', (req, res) => {
  res.json({ status: 'online', ambiente: process.env.NODE_ENV || 'desconhecido' });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;
