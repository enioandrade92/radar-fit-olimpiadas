const competitionService = require('../services/competition-service');
const dataValidators = require('../validators/data-validators');

module.exports = {
  async create(req, res) {
    await dataValidators.competition(req.body);
    const competition = await competitionService.create(req.body);
    return res.status(201).json(competition);
  },

  async closeCompetition(req, res) {
    await competitionService.findCompetition(+req.params.id);
    const competition = await competitionService.closeCompetition(+req.params.id);
    return res.status(201).json(competition);
  },

  async findCompetition(req, res) {
    await dataValidators.getCompetition(+req.params.id);
    const competition = await competitionService.findCompetition(+req.params.id);

    return res.status(200).json(competition);
  },
};
