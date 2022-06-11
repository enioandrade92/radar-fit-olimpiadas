const athleteResultModel = require('../services/athlete-result-service');
const dataValidators = require('../validators/data-validators');

module.exports = {
  async create(req, res) {
    await dataValidators.athleteResult(req.body);
    const athleteResult = await athleteResultModel.create(req.body);
    return res.status(201).json(athleteResult);
  },
};
