// Update with your config settings.

module.exports = {

  development: { //ambiente de desenvolvimento
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlitet'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault : true,
  },

  staging: { //ambiente que simula o de produção para um time de desenvolvimento
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: { //ambiente quando ta online para usuarios 
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
