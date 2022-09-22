import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

//DEFINE BOOK TABLE
const Book = db.define(
  'Book',
  {
    // Model attributes are defined here
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Book',
    tableName: 'book',
    underscore: true,
  }
);

export default Book;
