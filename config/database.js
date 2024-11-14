import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.SIGNAPPDBNAME,
  process.env.SIGNAPPDBUSER,
  process.env.SIGNAPPDBPASS,
  {
    host: process.env.SIGNAPPHOST,
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
