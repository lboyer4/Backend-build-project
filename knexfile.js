module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/senators',
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
  client: 'pg',
  connection: process.env.DATABASE_URL + `?ssl=true`,
  migrations: {
    directory: './db/migrations'
  },
  useNullAsDefault: true
  }
};
