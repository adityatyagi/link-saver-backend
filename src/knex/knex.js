const env_config = require('../../config/config');
const environment = env_config.environment;
const config = require('../../knexfile')[environment];
module.exports = require('knex')(config);
