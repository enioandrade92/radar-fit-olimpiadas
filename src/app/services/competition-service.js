const competitionModel = require('../models/competition-model');

module.exports = {
  async create(nameCompetition) {
    return competitionModel.create(nameCompetition);
  },
};
