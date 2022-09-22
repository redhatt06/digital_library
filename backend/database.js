import { Sequelize } from 'sequelize';
import config from './utils/config';

//Establishes the database connection using Sequilize library
const db = new Sequelize(
  'libraryDB',
  config.POSTGRES_USERNAME,
  config.POSTGRES_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

export default db;
