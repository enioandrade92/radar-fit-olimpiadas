const Joi = require('joi');
const errorGenerator = require('../util/error-generator');

const competitionSchema = Joi.object({
  name: Joi.string().valid(
    'competicao de hidratacao',
    'competicao de yoga',
    'competicao de perda de peso',
  ),
});

const athleteResultSchema = Joi.object({
  competition: Joi.string().valid(
    'competicao de hidratacao',
    'competicao de yoga',
    'competicao de perda de peso',
    'competicao de lançamento de dardos',
  ).required(),
  athlete: Joi.string().required(),
  value: Joi.string().required(),
  measure: Joi.string().required(),
  competitionId: Joi.number().positive().required(),
});

module.exports = {
  async competition(body) {
    try {
      await competitionSchema.validateAsync(body);
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
