const errorGenerator = require('../util/error-generator');
const { competitionSchema, athleteResultSchema, getCompetitionSchema } = require('./schemas');

module.exports = {
  async competition(body) {
    try {
      await competitionSchema.validateAsync(body);
    } catch (error) {
      errorGenerator('bad_request', error.message);
    }
  },

  async getCompetition(body) {
    try {
      await getCompetitionSchema.validateAsync(body);
    } catch (error) {
      errorGenerator('bad_request', error.message);
    }
  },

  async athleteResult(body) {
    try {
      await athleteResultSchema.validateAsync(body);
    } catch (error) {
      errorGenerator('bad_request', error.message);
    }
  },
};
