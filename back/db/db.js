const initOptions = {};
const pg = require('pg-promise')(initOptions)
const dbconfig = require('./config');
const db = pg(dbconfig);

module.exports = db;