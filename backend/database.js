import { Sequelize } from 'sequelize';
import config from './utils/config.js';

//Establishes the database connection using Sequilize library
const db = new Sequelize(
  config.POSTGRES_DB_NAME,
  config.POSTGRES_USERNAME,
  config.POSTGRES_PASSWORD,
  {
    host: config.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

export default db;
