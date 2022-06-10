const express = require('express');
const cors = require('cors');
require('express-async-errors');

const competitionRouter = require('./router/competition');

const api = express();

api.use(express.json());
api.use(cors());

api.use('/competition', competitionRouter);

module.exports = api;
