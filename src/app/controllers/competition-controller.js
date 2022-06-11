const competitionService = require('../services/competition-service');
const dataValidators = require('../validators/data-validators');
const errorGenerator = require('../util/error-generator');

module.exports = {
  async create(req, res) {
    await dataValidators.competition(req.body);
    const competition = await competitionService.create(req.body);
    return res.status(201).json(competition);
  },

  async findCompetition(req, res) {
    await dataValidators.getCompetition(+req.params.id);
    const competition = await competitionService.findCompetition(+req.params.id);
    if (!competition) {
      return errorGenerator('bad_request', 'Competition not found');
    }

    return res.status(201).json(competition);
  },
};
