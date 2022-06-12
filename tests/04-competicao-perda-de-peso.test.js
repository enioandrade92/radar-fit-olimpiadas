const request = require('supertest');
const api = require('../src/api/api');

jest.setTimeout(10000);

const athleteResultMock = [
  {
    "competition": "competicao de perda de peso",
    "athlete": "Terceiro",
    "value": "100",
    "measure": "c",
    "competitionId": 3
  },
  {
    "competition": "competicao de perda de peso",
    "athlete": "Segundo",
    "value": "300",
    "measure": "c",
    "competitionId": 3
  },
  {
    "competition": "competicao de perda de peso",
    "athlete": "Primeiro",
    "value": "1200",
    "measure": "c",
    "competitionId": 3
  },
];

describe('4.1 - Criar uma competicao de perda de peso:', () => {
  it('- Retorna status 201 e {id, name, status: "open"}', async () => {
    const result = await request(api).post('/competition/create').send({
       name: 'competicao de perda de peso'
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de perda de peso' });
    expect(result.body).toMatchObject({ status: 'open' });
  });
})


describe('4.2 - Cadastrar o resultado dos atletas na competicao de perda de peso:', () => {
  it('- Retorna status 201 e {id, competition, athlete, value, measure, competitionId}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[0]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de perda de peso' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 100 });
    expect(result.body).toMatchObject({ measure: 'c' });
    expect(result.body).toHaveProperty('competitionId');
  });
})

describe('4.3 - Consultar os dados da competicao de hidratacao:', () => {
  it('- Retorna status 200 com os atletas na ordem decrescente ', async () => {
    await request(api).post('/athlete').send(athleteResultMock[1]);
    await request(api).post('/athlete').send(athleteResultMock[2]);
    const result = await request(api).get('/competition/3')

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de perda de peso' });
    expect(result.body).toHaveProperty('athleteResult');
    expect(result.body.athleteResult[0]).toMatchObject({value: 1200});
    expect(result.body.athleteResult[1]).toMatchObject({value: 300});
    expect(result.body.athleteResult[2]).toMatchObject({value: 100});
  });
})



describe('4.4 - Ao encerrar uma competição:', () => {
  it('- Retorna status 201 e {id, name, status: "closed"}', async () => {
    const result = await request(api).post('/competition/closed/3');

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
