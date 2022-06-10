const { Router } = require('express');

const competitionRouter = Router();

competitionRouter.post('/create', () => console.log('criado'));

module.exports = competitionRouter;
