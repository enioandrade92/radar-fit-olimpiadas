const athleteResultModel = require('../models/athlete-result-model');
const competitionModel = require('../models/competition-model');
const errorGenerator = require('../util/error-generator');

async function checkCompetitionStatus({ competition, competitionId }) {
  const { name, status } = await competitionModel.findById(competitionId);
  if (!competition) {
    return errorGenerator('bad_request', 'Competition not found');
  }
  if (name !== competition) {
    return errorGenerator('bad_request', 'Competition name incorrect');
  }
  if (status === 'closed') {
    return errorGenerator('bad_request', 'Competition closed');
  }
  return true;
}

function checkIsNaN(value) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) {
    return errorGenerator('bad_request', 'Could not convert "value" to number');
  }

  return 'Isn"t nan';
}

function checkMeasure(data, convertedValue) {
  checkIsNaN(convertedValue);
  switch (data.measure) {
    case 'ml':
      return {
        ...data,
        value: convertedValue / 1000,
        measure: 'l',
      };

    case 's':
      return {
        ...data,
        value: convertedValue / 60,
        measure: 'm',
      };

    case 'h':
      return {
        ...data,
        value: convertedValue * 60,
        measure: 'm',
      };

    default:
      return {
        ...data,
        value: convertedValue,
      };
  }
}

function processDartData(data) {
  const { results } = data;
  results.sort((a, b) => {
    checkIsNaN(+b.distance);
    checkIsNaN(+a.distance);
    return (+b.distance - +a.distance);
  });

  return { ...data, results, value: +results[0].distance };
}

module.exports = {
  async create(dataAthleteResult) {
    await checkCompetitionStatus(dataAthleteResult);
    if (dataAthleteResult.competition === 'competicao de lançamento de dardos') {
      const processedData = processDartData(dataAthleteResult);
      delete processedData.results;
      const athleteResult = await athleteResultModel.create(processedData);
      return athleteResult;
    }
    const processedData = checkMeasure(dataAthleteResult, +dataAthleteResult.value);
    const athleteResult = await athleteResultModel.create(processedData);
    return athleteResult;
  },
};
