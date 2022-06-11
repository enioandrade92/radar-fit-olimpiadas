const athleteResultModel = require('../models/athlete-result-model');
const competitionModel = require('../models/competition-model');
const errorGenerator = require('../util/error-generator');

async function checkCompetitionStatus(id) {
  const competition = await competitionModel.findById(id);
  if (!competition) {
    return errorGenerator('bad_request', 'Competition not found');
  }
  if (competition.status === 'closed') {
    return errorGenerator('bad_request', 'Competition closed');
  }
  return true;
}

function checkMeasure(data) {
  switch (data.measure) {
    case 'ml':
      return {
        ...data,
        value: +data.value / 1000,
        measure: 'l',
      };

    case 's':
      return {
        ...data,
        value: +data.value / 60,
        measure: 'm',
      };

    case 'h':
      return {
        ...data,
        value: +data.value * 60,
        measure: 'm',
      };

    default:
      return {
        ...data,
        value: +data.value,
      };
  }
}

module.exports = {
  async create(dataAthleteResult) {
    await checkCompetitionStatus(dataAthleteResult.competitionId);
    const processedData = checkMeasure(dataAthleteResult);
    const athleteResult = await athleteResultModel.create(processedData);
    return athleteResult;
  },
};
