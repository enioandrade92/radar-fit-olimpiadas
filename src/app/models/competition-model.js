const prismaClient = require('../../database/prisma-client');

module.exports = {
  async create(dataCompetition) {
    const competition = await prismaClient.competition.create({
      data: { ...dataCompetition, status: 'open' },
    });
    return competition;
  },
};
