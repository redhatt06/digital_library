import Book from '../models/book.js';
import Author from '../models/author.js';
import AuthorBook from '../models/author_book.js';
import libraryData from './libraryData.js';
import { Sequelize } from 'sequelize';
import userData from './userData.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import db from '../database.js';

//This script creates the defined tables and fills them with the dummy data for test purposes
//Start this script before and while testing the database.

export default async function seed() {
  try {
    await db.sync({ force: true });

    var promises = [];
    for (const data of libraryData) {
      const author = await Author.findOrCreate({
        where: { name: data.author },
      });
      const book = await Book.findOrCreate({
        raw: true,
        where: { book_id: data.id, title: data.book },
      });

      promises.push(
        await AuthorBook.findOrCreate({
          where: { author_id: author[0].author_id, book_id: book[0].book_id },
        })
      );
    }
    Promise.all(promises);

    for (const data of userData) {
      await User.findOrCreate({
        where: {
          username: data.username,
          password: bcrypt.hashSync(data.password, 8),
          first_name: data.firstName,
          last_name: data.lastName,
          isAdmin: data.isAdmin,
        },
      });
    }
  } catch (errors) {
    if (errors instanceof Sequelize.UniqueConstraintError) {
      console.log('This author and book is already in library records!');
    }
    console.error(errors.message);
  }
}
