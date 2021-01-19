module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.NODE_ENV
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL,
  "host": process.env.MIGRATION_DB_HOST || 'localhost',
  "port": process.env.MIGRATION_DB_PORT || '5432',
  "database": process.env.MIGRATION_DB_NAME || 'noteful',
  "username": process.env.MIGRATION_DB_USER || 'postgres',
  "password": process.env.MIGRATION_DB_PASS
}