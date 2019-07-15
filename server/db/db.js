const Sequelize = require('sequelize');
// const databaseName =
//   pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/forecast-app',
  {
    logging: false, // unless you like the logs
    // ...and there are many other options you may want to play with
  }
);

module.exports = db;
