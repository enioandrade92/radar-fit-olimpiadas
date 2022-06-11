const Joi = require('joi');

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

const getCompetitionSchema = Joi.number().positive().required();

module.exports = {
  competitionSchema,
  athleteResultSchema,
  getCompetitionSchema,
};
