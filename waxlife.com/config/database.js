const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('waxlife', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Sync the database without dropping tables or data
sequelize
  .sync({ alter: true }) // Adjusts tables as necessary without truncating
  .then(() => console.log('Database synced...'))
  .catch((err) => console.error('Error syncing the database:', err));

module.exports = sequelize;


