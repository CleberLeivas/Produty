const express = require('express');
const registroController = require('../controllers/registroController');
const { validateRegistroInput } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Cria um novo registro de produtividade
 *     tags: [Registros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - horaInicio
 *               - horaFim
 *               - intervalo
 *             properties:
 *               horaInicio:
 *                 type: string
 *                 format: date-time
 *               horaFim:
 *                 type: string
 *                 format: date-time
 *               intervalo:
 *                 type: integer
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/', validateRegistroInput, registroController.criar);

/**
 * @swagger
 * /registro:
 *   get:
 *     summary: Lista todos os registros de produtividade
 *     tags: [Registros]
 *     responses:
 *       200:
 *         description: Lista de registros
 *       500:
 *         description: Erro no servidor
 */
router.get('/', registroController.listar);

/**
 * @swagger
 * /registro/{id}:
 *   get:
 *     summary: Busca um registro pelo ID
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', registroController.buscarPorId);

/**
 * @swagger
 * /registro/{id}:
 *   put:
 *     summary: Atualiza um registro
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horaInicio:
 *                 type: string
 *                 format: date-time
 *               horaFim:
 *                 type: string
 *                 format: date-time
 *               intervalo:
 *                 type: integer
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 *       404:
 *         description: Registro não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', registroController.atualizar);

/**
 * @swagger
 * /registro/{id}:
 *   delete:
 *     summary: Remove um registro
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Registro removido
 *       404:
 *         description: Registro não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', registroController.remover);

module.exports = router;
