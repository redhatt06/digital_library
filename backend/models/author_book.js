import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

//DEFINE AUTHOR BOOK TABLE
//AuthorBook table is an intermediate table to provide the relationship between the Book and Author Tables
const AuthorBook = db.define(
  'AuthorBook',
  {
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: 'Book',
      referencesKey: 'book_id',
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: 'Author',
      referencesKey: 'author_id',
      allowNull: false,
    },
  },
  {
    modelName: 'AuthorBook',
    tableName: 'author_book',
    underscore: true,
    timestamps: false,
  }
);
export default AuthorBook;
