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

describe('1.2 - Ao cadastrar um Resultado com as medidas incorretas:', () => {
  it('- [hidratacao] Retorna status 400 e uma mensagem', async () => {
    const result = await request(api).post('/athlete').send({
      competition: "competicao de hidratacao",
      athlete: "Primeiro",
      value: "10",
      measure: "h",
      competitionId: 1
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual(
      "\"measure\" must be one of [l, ml]"
    );
  });
})

describe('1.3 - Ao cadastrar um Resultado com as medidas incorretas:', () => {
  it('- [yoga] Retorna status 400 e uma mensagem', async () => {
    const result = await request(api).post('/athlete').send({
      competition: "competicao de yoga",
      athlete: "Primeiro",
      value: "10",
      measure: "ml",
      competitionId: 2
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual(
      "\"measure\" must be one of [s, m, h]"
    );
  });
})

describe('1.4 - Ao cadastrar um Resultado com as medidas incorretas:', () => {
  it('- [perda de peso] Retorna status 400 e uma mensagem', async () => {
    const result = await request(api).post('/athlete').send({
      competition: "competicao de perda de peso",
      athlete: "Primeiro",
      value: "10",
      measure: "m",
      competitionId: 3
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual(
      "\"measure\" must be [c]"
    );
  });
})

describe('1.5 - Ao cadastrar um Resultado com as medidas incorretas:', () => {
  it('- [lançamento de dardos] Retorna status 400 e uma mensagem', async () => {
    const result = await request(api).post('/athlete').send({
      competition: "competicao de lançamento de dardos",
      athlete: "Primeiro",
      value: "0",
      measure: "m",
      results: [
            {
                "distance": "88"
            },
            {
                "distance": "90"
            },
            {
                "distance": "99"
            }
        ],
      competitionId: 4
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual(
      "\"measure\" must be [cm]"
    );
  });
})
