import Sequelize from 'sequelize';

const sequelize = new Sequelize('employee', 'root', 'root', {
  host: 'localhost',
  port: 3308,
  dialect: 'mysql'
});

export default sequelize;