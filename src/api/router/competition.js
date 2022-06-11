const { Router } = require('express');
const competitionController = require('../../app/controllers/competition-controller');

const competitionRouter = Router();

competitionRouter.post('/create', competitionController.create);

module.exports = competitionRouter;
