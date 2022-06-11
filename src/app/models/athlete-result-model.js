const prismaClient = require('../../database/prisma-client');

module.exports = {
  async create(dataAthleteResult) {
    const athleteResult = await prismaClient.athleteResult.create({
      data: dataAthleteResult,
    });
    return athleteResult;
  },
};
