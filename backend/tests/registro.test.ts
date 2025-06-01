import request from 'supertest';
import app from '../src/app';  // ajuste o caminho conforme seu projeto
import prisma from '../src/prisma/client'; // para manipular banco nos testes

describe('API de Registros', () => {
  // Limpa dados antes e depois dos testes para evitar interferência
  beforeAll(async () => {
    await prisma.registro.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  let registroId: number;

  it('deve criar um novo registro com dados válidos', async () => {
    const novoRegistro = {
      horaInicio: new Date(Date.now() - 3600000).toISOString(),
      horaFim: new Date().toISOString(),
      intervalo: 15,
      descricao: 'Teste criação',
    };

    const res = await request(app).post('/registro').send(novoRegistro);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.descricao).toBe(novoRegistro.descricao);

    registroId = res.body.id;
  });

  it('deve retornar erro 400 para dados inválidos', async () => {
    const dadosInvalidos = {
      horaInicio: 'data-invalida',
      horaFim: new Date().toISOString(),
      intervalo: -5,
    };

    const res = await request(app).post('/registro').send(dadosInvalidos);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erros');
    expect(Array.isArray(res.body.erros)).toBe(true);
  });

  it('deve listar registros', async () => {
    const res = await request(app).get('/registro');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve buscar registro por ID', async () => {
    const res = await request(app).get(`/registro/${registroId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', registroId);
  });

  it('deve atualizar registro', async () => {
    const dadosAtualizados = {
      descricao: 'Descrição atualizada',
      intervalo: 20,
    };

    const res = await request(app).put(`/registro/${registroId}`).send(dadosAtualizados);

    expect(res.statusCode).toBe(200);
    expect(res.body.descricao).toBe(dadosAtualizados.descricao);
    expect(res.body.intervalo).toBe(dadosAtualizados.intervalo);
  });

  it('deve remover registro', async () => {
    const res = await request(app).delete(`/registro/${registroId}`);

    expect(res.statusCode).toBe(204);
  });
});
