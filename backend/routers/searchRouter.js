import express from 'express';
import { col, fn, where } from 'sequelize';
import Author from '../models/author.js';
import Book from '../models/book.js';
import expressAsyncHandler from 'express-async-handler';
const searchRouter = express.Router();

//GET
//Given a search string matches the string with both Book.title and Author.name and fetches the found records
searchRouter.get(
  '/:searchValue',
  expressAsyncHandler(async (req, res) => {
    const searchValue = decodeURIComponent(req.params.searchValue);
    try {
      const books = await Book.findAll({
        where: where(fn('lower', col('title')), searchValue.toLowerCase()),
        plain: true,
        include: [
          {
            model: Author,
            through: { attributes: [] },
          },
        ],
      });

      const authors = await Author.findAll({
        where: where(fn('lower', col('name')), searchValue.toLowerCase()),
        plain: true,
        include: [
          {
            model: Book,
            through: { attributes: [] },
          },
        ],
      });

      if (books) {
        var bookArray = [];

        console.log(books);
        if (books.length > 1) {
          for (const book of books) {
            const bookAuthors = book['Authors'].map((author) => {
              return { id: author.author_id, name: author.name };
            });
            bookArray.push({
              book: { id: book.book_id, title: book.title },
              bookAuthors,
            });
          }
        } else {
          const data = books.dataValues;
          const bookAuthors = data['Authors'].map((author) => {
            return { id: author.author_id, name: author.name };
          });
          bookArray.push({
            book: { id: data.book_id, title: data.title },
            authors: bookAuthors,
          });
        }

        res.send({
          type: 'b',
          multiple: false,
          data: bookArray,
        });
      } else if (authors) {
        var authorArray = [];
        const data = authors.dataValues;
        const authorBooks = data['Books'].map((book) => {
          return { id: book.book_id, title: book.title };
        });
        authorArray.push({
          author: { id: data.author_id, name: data.name },
          books: authorBooks,
        });
        res.send({
          type: 'a',
          multiple: false,
          data: authorArray,
        });
      } else {
        res.status(404).send({
          message:
            'There is no record of the specified book or author in the library database',
        });
      }
    } catch (err) {
      res.send(err.message);
    }
  })
);

export default searchRouter;
