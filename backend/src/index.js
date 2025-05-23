const app = require('./app');
const config = require('./config/server');

// Inicialização do servidor
app.listen(config.port, () => {
  console.log(`API rodando na porta ${config.port} em modo ${config.env}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
  console.error('Erro não tratado:', error);
});
