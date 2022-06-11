const { Router } = require('express');
const competitionController = require('../../app/controllers/competition-controller');

const competitionRouter = Router();

competitionRouter.post('/create', competitionController.create);
competitionRouter.get('/:id', competitionController.findCompetition);

module.exports = competitionRouter;
