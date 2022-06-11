const prismaClient = require('../../database/prisma-client');

module.exports = {
  async create(nameCompetition) {
    const competition = await prismaClient.competition.create({
      data: { ...nameCompetition, status: 'open' },
    });
    return competition;
  },
};
