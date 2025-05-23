/**
 * Middleware para tratamento centralizado de erros
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Erros específicos do Prisma
  if (err.code) {
    // Erro de registro não encontrado
    if (err.code === 'P2025') {
      return res.status(404).json({ 
        erro: 'Recurso não encontrado',
        detalhes: 'O registro solicitado não existe' 
      });
    }
    
    // Erro de violação de chave única
    if (err.code === 'P2002') {
      return res.status(409).json({ 
        erro: 'Conflito de dados', 
        detalhes: 'Registro com estas informações já existe' 
      });
    }
  }
  
  // Erro de validação
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      erro: 'Erro de validação',
      detalhes: err.message
    });
  }
  
  // Erro genérico
  res.status(500).json({ 
    erro: 'Erro interno do servidor',
    detalhes: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro no servidor'
  });
};

module.exports = errorHandler;
