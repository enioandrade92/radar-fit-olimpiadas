const errorGenerator = require('../util/error-generator');
const {
  competitionSchema,
  athleteResultDardoSchema,
  getCompetitionSchema,
  athleteResultHidSchema,
  athleteResultYogaSchema,
  athleteResultPesoSchema,
} = require('./schemas');

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
    switch (body.competition) {
      case 'competicao de hidratacao':
        try {
          await athleteResultHidSchema.validateAsync(body);
        } catch (error) {
          errorGenerator('bad_request', error.message);
        }
        break;

      case 'competicao de yoga':
        try {
          await athleteResultYogaSchema.validateAsync(body);
        } catch (error) {
          errorGenerator('bad_request', error.message);
        }
        break;

      case 'competicao de perda de peso':
        try {
          await athleteResultPesoSchema.validateAsync(body);
        } catch (error) {
          errorGenerator('bad_request', error.message);
        }
        break;

      default:
        try {
          await athleteResultDardoSchema.validateAsync(body);
        } catch (error) {
          errorGenerator('bad_request', error.message);
        }
    }
  },
};
