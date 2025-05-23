module.exports = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL
  }
};
