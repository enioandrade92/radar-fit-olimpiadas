const Joi = require('joi');

const competitionSchema = Joi.object({
  name: Joi.string().valid(
    'competicao de hidratacao',
    'competicao de yoga',
    'competicao de perda de peso',
    'competicao de lançamento de dardos',
  ).required(),
});

const athleteResultDardoSchema = Joi.object({
  competition: Joi.string().valid(
    'competicao de lançamento de dardos',
  ).required(),
  athlete: Joi.string().required(),
  value: Joi.string().required(),
  measure: Joi.string().valid('cm').required(),
  results: Joi.array(),
  competitionId: Joi.number().positive().required(),
});

const athleteResultHidSchema = Joi.object({
  competition: Joi.string().valid(
    'competicao de hidratacao',
  ).required(),
  athlete: Joi.string().required(),
  value: Joi.string().required(),
  measure: Joi.string().valid('l', 'ml').required(),
  competitionId: Joi.number().positive().required(),
});

const athleteResultYogaSchema = Joi.object({
  competition: Joi.string().valid(
    'competicao de yoga',
  ).required(),
  athlete: Joi.string().required(),
  value: Joi.string().required(),
  measure: Joi.string().valid('s', 'm', 'h').required(),
  competitionId: Joi.number().positive().required(),
});

const athleteResultPesoSchema = Joi.object({
  competition: Joi.string().valid(
    'competicao de perda de peso',
  ).required(),
  athlete: Joi.string().required(),
  value: Joi.string().required(),
  measure: Joi.string().valid('c').required(),
  competitionId: Joi.number().positive().required(),
});

const getCompetitionSchema = Joi.number().positive().required();

module.exports = {
  athleteResultPesoSchema,
  athleteResultYogaSchema,
  athleteResultHidSchema,
  competitionSchema,
  athleteResultDardoSchema,
  getCompetitionSchema,
};
