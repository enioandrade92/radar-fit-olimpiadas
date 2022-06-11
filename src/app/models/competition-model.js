const prismaClient = require('../../database/prisma-client');

module.exports = {
  async create(nameCompetition) {
    const competition = await prismaClient.competition.create({
      data: { ...nameCompetition, status: 'open' },
    });
    return competition;
  },

  async findCompetition(id) {
    const competition = await prismaClient.competition.findUnique({
      where: { id },
      include: {
        athleteResult: { orderBy: { value: 'desc' } },
      },
    });

    return competition || null;
  },

  async findById(id) {
    const competition = await prismaClient.competition.findUnique({
      where: { id },
    });

    return competition || null;
  },
};
