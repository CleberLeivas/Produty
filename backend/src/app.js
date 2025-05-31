const express = require("express");
const { PrismaClient } = require("@prisma/client");
const registroRoutes = require("./routes/registroRoutes");
const errorHandler = require("./middleware/errorHandler");
const setupSwagger = require("./config/swagger");
require("dotenv").config();

// Inicialização do app e do Prisma
const app = express();
const prisma = new PrismaClient(); // Embora não usado diretamente aqui, pode ser necessário em outros módulos

// Middlewares
app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

// Rotas
app.use("/registro", registroRoutes);

// Rota de status
app.get("/status", (req, res) => {
  // Acessa config diretamente se necessário, ou passa como parâmetro
  const config = require("./config/server"); 
  res.json({ status: "online", ambiente: config.env });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app; // Exporta a instância do app
