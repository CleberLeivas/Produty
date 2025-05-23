const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
afterAll(async () => {
  await prisma.$disconnect();
});

describe('API de Registros', () => {
  // Teste da rota de status
  describe('GET /status', () => {
    it('deve retornar status 200 e informações de status', async () => {
      const res = await request(app).get('/status');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toEqual('online');
    });
  });

  // Testes para as rotas de registro
  describe('Rotas de Registro', () => {
    // Teste de criação de registro
    it('deve criar um novo registro com dados válidos', async () => {
      const novoRegistro = {
        horaInicio: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
        horaFim: new Date().toISOString(),
        intervalo: 15,
        descricao: 'Teste de criação'
      };

      const res = await request(app)
        .post('/registro')
        .send(novoRegistro);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.descricao).toEqual(novoRegistro.descricao);
    });

    // Teste de validação de dados
    it('deve retornar erro 400 para dados inválidos', async () => {
      const dadosInvalidos = {
        horaInicio: 'data-invalida',
        horaFim: new Date().toISOString(),
        intervalo: -5
      };

      const res = await request(app)
        .post('/registro')
        .send(dadosInvalidos);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('erros');
    });
  });
});
