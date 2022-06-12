const request = require('supertest');
const api = require('../src/api/api');

jest.setTimeout(10000);

const athleteResultMock = [
  {
    competition: "competicao de lançamento de dardos",
    athlete: "Terceiro",
    value: "0",
    measure: "cm",
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
  },
  {
    competition: "competicao de lançamento de dardos",
    athlete: "Segundo",
    value: "0",
    measure: "cm",
    results: [
          {
              "distance": "110"
          },
          {
              "distance": "100"
          },
          {
              "distance": "105"
          }
      ],
    competitionId: 4
  },
  {
    competition: "competicao de lançamento de dardos",
    athlete: "Primeiro",
    value: "0",
    measure: "cm",
    results: [
          {
              "distance": "121"
          },
          {
              "distance": "129"
          },
          {
              "distance": "99"
          }
      ],
    competitionId: 4
  }
];

describe('5.1 - Criar uma competicao de lançamento de dardos:', () => {
  it('- Retorna status 201 e {id, name, status: "open"}', async () => {
    const result = await request(api).post('/competition/create').send({
       name: 'competicao de lançamento de dardos'
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de lançamento de dardos' });
    expect(result.body).toMatchObject({ status: 'open' });
  });
})


describe('5.2 - Cadastrar o resultado dos atletas na competicao de perda de peso:', () => {
  it('- Retorna status 201 e {id, competition, athlete, value, measure, competitionId}', async () => {
    const result = await request(api).post('/athlete').send(
      athleteResultMock[0]
    );

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ competition: 'competicao de lançamento de dardos' });
    expect(result.body).toHaveProperty('athlete');
    expect(result.body).toMatchObject({ value: 99 });
    expect(result.body).toMatchObject({ measure: 'cm' });
    expect(result.body).toHaveProperty('competitionId');
  });
})

describe('5.3 - Consultar os dados da competicao de lançamento de dardos:', () => {
  it('- Retorna status 200 com os atletas na ordem decrescente ', async () => {
    await request(api).post('/athlete').send(athleteResultMock[1]);
    await request(api).post('/athlete').send(athleteResultMock[2]);
    const result = await request(api).get('/competition/4')

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toMatchObject({ name: 'competicao de lançamento de dardos' });
    expect(result.body).toHaveProperty('athleteResult');
    expect(result.body.athleteResult[0]).toMatchObject({value: 129});
    expect(result.body.athleteResult[1]).toMatchObject({value: 110});
    expect(result.body.athleteResult[2]).toMatchObject({value: 99});
  });
})



describe('5.4 - Ao encerrar uma competição:', () => {
  it('- Retorna status 201 e {id, name, status: "closed"}', async () => {
    const result = await request(api).post('/competition/closed/4');

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
