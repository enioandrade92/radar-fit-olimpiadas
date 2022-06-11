const express = require('express');
const cors = require('cors');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error-middleware');

const competitionRouter = require('./router/competition');

const api = express();

api.use(express.json());
api.use(cors());

api.use('/competition', competitionRouter);

api.use(errorMiddleware);

module.exports = api;
