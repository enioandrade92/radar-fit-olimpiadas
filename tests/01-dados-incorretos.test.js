const request = require('supertest');
const api = require('../src/api/api');

jest.setTimeout(10000);

describe('1.1 - Ao cadastrar uma competicao com os dados incorretos:', () => {
  it('- Retorna status 400 e uma mensagem', async () => {
    const result = await request(api).post('/competition/create').send({
       name: 'competicao de volei'
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual(
      "\"name\" must be one of [competicao de hidratacao, competicao de yoga, competicao de perda de peso, competicao de lançamento de dardos]"
    );
  });
})
