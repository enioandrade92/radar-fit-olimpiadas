const request = require('supertest');
const api = require('../src/api/api');

jest.setTimeout(10000);

const athleteResultMock = [
  {
    "competition": "competicao de hidratacao",
    "athlete": "Terceiro",
    "value": "1",
    "measure": "l",
    "competitionId": 1
  },
  {
    "competition": "competicao de hidratacao",
    "athlete": "Segundo",
    "value": "7000",
    "measure": "ml",
    "competitionId": 1
  },
  {
    "competition": "competicao de hidratacao",
    "athlete": "Primeiro",
    "value": "11",
    "measure": "l",
    "competitionId": 1
  },
];

describe('2.1 - Criar uma competicao de hidratacao:', () => {
  it('- Retorna status 201 e {id, name, status: "open"}', async () => {
    const result = await request(api).post('/competition/create').send({
       name: 'competicao de hidratacao'
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de hidratacao' });
    expect(result.body).toMatchObject({ status: 'open' });
  });
})

describe('2.2 - Cadastrar o resultado dos atletas na competicao de hidratacao:', () => {
  it('- Retorna status 201 e {id, competition, athlete, value, measure, competitionId}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[0]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de hidratacao' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 1 });
    expect(result.body).toMatchObject({ measure: 'l' });
    expect(result.body).toHaveProperty('competitionId');
  });

  it('- Com a medida em "ml", retorna "l"}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[1]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de hidratacao' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 7 });
    expect(result.body).toMatchObject({ measure: 'l' });
    expect(result.body).toHaveProperty('competitionId');
  });
})

describe('2.3 - Consultar os dados da competicao de hidratacao:', () => {
  it('- Retorna status 200 com os atletas na ordem decrescente ', async () => {
    await request(api).post('/athlete').send(athleteResultMock[2]);
    const result = await request(api).get('/competition/1')

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de hidratacao' });
    expect(result.body).toHaveProperty('athleteResult');
    expect(result.body.athleteResult[0]).toMatchObject({value: 11});
    expect(result.body.athleteResult[1]).toMatchObject({value: 7});
    expect(result.body.athleteResult[2]).toMatchObject({value: 1});
  });
})

describe('2.4 - Ao encerrar uma competição:', () => {
  it('- Retorna status 201 e {id, name, status: "closed"}', async () => {
    const result = await request(api).post('/competition/closed/1');

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('name');
    expect(result.body).toMatchObject({ status: 'closed' });
  });

  it('- Não é possível cadastrar novo resultado', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[0]
    );

    expect(result.statusCode).toEqual(400);
    expect(result.body).toMatchObject({ message: 'Competition closed' });
  });
})
