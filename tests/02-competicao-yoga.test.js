const request = require('supertest');
const api = require('../src/api/api');

jest.setTimeout(10000);

const athleteResultMock = [
  {
    "competition": "competicao de yoga",
    "athlete": "Terceiro",
    "value": "10",
    "measure": "m",
    "competitionId": 2
  },
  {
    "competition": "competicao de yoga",
    "athlete": "Segundo",
    "value": "1800",
    "measure": "s",
    "competitionId": 2
  },
  {
    "competition": "competicao de yoga",
    "athlete": "Primeiro",
    "value": "1",
    "measure": "h",
    "competitionId": 2
  },
];

describe('2.1 - Criar uma competicao de yoga:', () => {
  it('- Retorna status 201 e {id, name, status: "open"}', async () => {
    const result = await request(api).post('/competition/create').send({
       name: 'competicao de yoga'
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de yoga' });
    expect(result.body).toMatchObject({ status: 'open' });
  });
})

describe('2.2 - Cadastrar o resultado dos atletas na competicao de yoga:', () => {
  it('- Retorna status 201 e {id, competition, athlete, value, measure, competitionId}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[0]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de yoga' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 10 });
    expect(result.body).toMatchObject({ measure: 'm' });
    expect(result.body).toHaveProperty('competitionId');
  });

  it('- Com a medida em "s", retorna "m"}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[1]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de yoga' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 30 });
    expect(result.body).toMatchObject({ measure: 'm' });
    expect(result.body).toHaveProperty('competitionId');
  });

  it('- Com a medida em "h", retorna "m"}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[2]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de yoga' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 60 });
    expect(result.body).toMatchObject({ measure: 'm' });
    expect(result.body).toHaveProperty('competitionId');
  });
})

describe('2.3 - Consultar os dados da competicao de yoga:', () => {
  it('- Retorna status 200 com os atletas na ordem decrescente ', async () => {
    const result = await request(api).get('/competition/2')

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de yoga' });
    expect(result.body).toHaveProperty('athleteResult');
    expect(result.body.athleteResult[0]).toMatchObject({value: 60});
    expect(result.body.athleteResult[1]).toMatchObject({value: 30});
    expect(result.body.athleteResult[2]).toMatchObject({value: 10});
  });
})

describe('2.4 - Ao encerrar uma competição:', () => {
  it('- Retorna status 201 e {id, name, status: "closed"}', async () => {
    const result = await request(api).post('/competition/closed/2');

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

describe('2.5 - Ao cadastrar um Resultado com as medidas incorretas:', () => {
  it('- Retorna status 400 e uma mensagem', async () => {
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
