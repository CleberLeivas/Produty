import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import { Registro } from '@prisma/client';

class RegistroController {
  private validarData(data: any): boolean {
    const d = new Date(data);
    return !isNaN(d.getTime());
  }

  private validarIntervalo(intervalo: any): boolean {
    const num = Number(intervalo);
    return Number.isInteger(num) && num >= 0;
  }

  async criar(req: Request, res: Response): Promise<void> {
    const { horaInicio, horaFim, intervalo, descricao } = req.body;

    const erros = [];

    if (!this.validarData(horaInicio)) erros.push({ msg: 'horaInicio inválido' });
    if (!this.validarData(horaFim)) erros.push({ msg: 'horaFim inválido' });
    if (!this.validarIntervalo(intervalo)) erros.push({ msg: 'intervalo inválido' });

    if (erros.length > 0) {
      res.status(400).json({ erros });
      return;
    }

    try {
      const novoRegistro: Registro = await prisma.registro.create({
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

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const registros: Registro[] = await prisma.registro.findMany({
        orderBy: { criadoEm: 'desc' },
      });
      res.json(registros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar registros' });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ erro: 'ID inválido' });
        return;
      }

      const registro = await prisma.registro.findUnique({ where: { id } });

      if (!registro) {
        res.status(404).json({ erro: 'Registro não encontrado' });
        return;
      }

      res.json(registro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar registro' });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ erro: 'ID inválido' });
        return;
      }

      const { horaInicio, horaFim, intervalo, descricao } = req.body;

      const erros = [];

      if (horaInicio && !this.validarData(horaInicio)) erros.push({ msg: 'horaInicio inválido' });
      if (horaFim && !this.validarData(horaFim)) erros.push({ msg: 'horaFim inválido' });
      if (intervalo !== undefined && !this.validarIntervalo(intervalo)) erros.push({ msg: 'intervalo inválido' });

      if (erros.length > 0) {
        res.status(400).json({ erros });
        return;
      }

      const registro = await prisma.registro.update({
        where: { id },
        data: {
          horaInicio: horaInicio ? new Date(horaInicio) : undefined,
          horaFim: horaFim ? new Date(horaFim) : undefined,
          intervalo: intervalo !== undefined ? Number(intervalo) : undefined,
          descricao: descricao !== undefined ? descricao : undefined,
        },
      });

      res.json(registro);
    } catch (error: any) {
      console.error(error);

      if (error.code === 'P2025') {
        res.status(404).json({ erro: 'Registro não encontrado' });
        return;
      }

      res.status(500).json({ erro: 'Erro ao atualizar registro' });
    }
  }

  async remover(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ erro: 'ID inválido' });
        return;
      }

      await prisma.registro.delete({ where: { id } });

      res.status(204).end();
    } catch (error: any) {
      console.error(error);

      if (error.code === 'P2025') {
        res.status(404).json({ erro: 'Registro não encontrado' });
        return;
      }

      res.status(500).json({ erro: 'Erro ao remover registro' });
    }
  }
}

export default new RegistroController();
