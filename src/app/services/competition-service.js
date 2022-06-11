const competitionModel = require('../models/competition-model');
const errorGenerator = require('../util/error-generator');

module.exports = {
  async create(nameCompetition) {
    return competitionModel.create(nameCompetition);
  },

  async findCompetition(id) {
    const competition = await competitionModel.findCompetition(id);
    if (!competition) {
      return errorGenerator('bad_request', 'Competition not found');
    }

    return competition;
  },
};
