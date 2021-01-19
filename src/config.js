module.exports = {
  PORT : process.env.PORT || 8000,
  NODE_ENV : process.env.NODE_ENV,
  API_KEY : process.env.API_KEY,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/noteful',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/noteful-test'
}
