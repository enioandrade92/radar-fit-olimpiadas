const competitionService = require('../services/competition-service');
const dataValidators = require('../validators/data-validators');

module.exports = {
  async create(req, res) {
    await dataValidators.competition(req.body);
    const competition = await competitionService.create(req.body);
    return res.status(201).json(competition);
  },
};
