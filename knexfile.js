// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection:'postgres://localhost/senators',
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      director: './seeds/dev'
    }
  }
};
