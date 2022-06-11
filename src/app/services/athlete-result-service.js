const athleteResultModel = require('../models/athlete-result-model');

module.exports = {
  async create(dataAthleteResult) {
    const athleteResult = await athleteResultModel.create(dataAthleteResult);
    return athleteResult;
  },
};
