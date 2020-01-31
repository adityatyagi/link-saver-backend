// Update with your config settings.
const env_config = require('./config/config');

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './src/knex/migrations'
    },
    connection: env_config.db
  },

  staging: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './src/knex/migrations'
    },
    connection: env_config.db
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './src/knex/migrations'
    },
    connection: env_config.db
  }

};
