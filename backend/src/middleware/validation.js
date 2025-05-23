const { validationResult, body } = require('express-validator');

/**
 * Middleware para validação dos dados de entrada do registro
 */
const validateRegistroInput = [
  // Validação de horaInicio
  body('horaInicio')
    .notEmpty().withMessage('Hora de início é obrigatória')
    .isISO8601().withMessage('Hora de início deve ser uma data válida'),
  
  // Validação de horaFim
  body('horaFim')
    .notEmpty().withMessage('Hora de fim é obrigatória')
    .isISO8601().withMessage('Hora de fim deve ser uma data válida')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.horaInicio)) {
        throw new Error('A hora de fim deve ser posterior à hora de início');
      }
      return true;
    }),
  
  // Validação de intervalo
  body('intervalo')
    .notEmpty().withMessage('Intervalo é obrigatório')
    .isInt({ min: 0 }).withMessage('Intervalo deve ser um número inteiro não negativo'),
  
  // Validação de descricao (opcional)
  body('descricao')
    .optional()
    .isString().withMessage('Descrição deve ser uma string'),
  
  // Middleware para verificar erros de validação
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateRegistroInput
};
