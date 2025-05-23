const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Controlador para operações relacionadas aos registros de produtividade
 */
class RegistroController {
  /**
   * Cria um novo registro de produtividade
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  async criar(req, res) {
    const { horaInicio, horaFim, intervalo, descricao } = req.body;

    try {
      const novoRegistro = await prisma.registro.create({
        data: {
          horaInicio: new Date(horaInicio),
          horaFim: new Date(horaFim),
          intervalo: Number(intervalo),
          descricao: descricao || null,
        },
      });

      res.status(201).json(novoRegistro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao registrar produtividade' });
    }
  }

  /**
   * Lista todos os registros de produtividade
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  async listar(req, res) {
    try {
      const registros = await prisma.registro.findMany({
        orderBy: {
          criadoEm: 'desc'
        }
      });
      res.json(registros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar registros' });
    }
  }

  /**
   * Busca um registro de produtividade pelo ID
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const registro = await prisma.registro.findUnique({
        where: { id: Number(id) },
      });
      
      if (!registro) {
        return res.status(404).json({ erro: 'Registro não encontrado' });
      }
      
      res.json(registro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar registro' });
    }
  }

  /**
   * Atualiza um registro de produtividade
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { horaInicio, horaFim, intervalo, descricao } = req.body;
      
      const registro = await prisma.registro.update({
        where: { id: Number(id) },
        data: {
          horaInicio: horaInicio ? new Date(horaInicio) : undefined,
          horaFim: horaFim ? new Date(horaFim) : undefined,
          intervalo: intervalo !== undefined ? Number(intervalo) : undefined,
          descricao: descricao !== undefined ? descricao : undefined,
        },
      });
      
      res.json(registro);
    } catch (error) {
      console.error(error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ erro: 'Registro não encontrado' });
      }
      
      res.status(500).json({ erro: 'Erro ao atualizar registro' });
    }
  }

  /**
   * Remove um registro de produtividade
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  async remover(req, res) {
    try {
      const { id } = req.params;
      await prisma.registro.delete({
        where: { id: Number(id) },
      });
      
      res.status(204).end();
    } catch (error) {
      console.error(error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ erro: 'Registro não encontrado' });
      }
      
      res.status(500).json({ erro: 'Erro ao remover registro' });
    }
  }
}

module.exports = new RegistroController();
