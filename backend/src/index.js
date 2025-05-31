const app = require("./app"); // Importa a instância do app
const config = require("./config/server");

// Inicializa o servidor apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`API rodando na porta ${config.port} em modo ${config.env}`);
  });
}

// Tratamento de erros não capturados (pode permanecer aqui ou ir para app.js)
process.on("unhandledRejection", (error) => {
  console.error("Erro não tratado:", error);
  // Considerar encerrar o processo em caso de erro não tratado
  // process.exit(1);
});

// Exporta o app para possíveis usos futuros (embora app.js seja o principal)
module.exports = app;
