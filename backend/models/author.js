import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

//DEFINE AUTHOR TABLE
const Author = db.define(
  'Author',
  {
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Author',
    tableName: 'author',
    underscore: true,
  }
);
export default Author;
