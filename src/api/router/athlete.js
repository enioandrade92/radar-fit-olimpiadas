const { Router } = require('express');
const athleteResultController = require('../../app/controllers/athlete-result-controller');

const athleteRouter = Router();

athleteRouter.post('/', athleteResultController.create);

module.exports = athleteRouter;
