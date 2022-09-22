import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

//DEFINE USER TABLE
//USER data is used for logging in to the app.
const User = db.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    modelName: 'User',
    tableName: 'user',
    firstName: 'first_name',
    lastName: 'last_name',
    underscore: true,
  }
);

export default User;
