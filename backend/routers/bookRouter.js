import express from 'express';
import { QueryTypes } from 'sequelize';
import Author from '../models/author.js';
import Book from '../models/book.js';
import AuthorBook from '../models/author_book.js';
import { isAuth } from '../utils/auth.js';
import expressAsyncHandler from 'express-async-handler';
import db from '../database.js';
const bookRouter = express.Router();

//GET
//Fetch and send all book records
bookRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    db.query(
      `SELECT "book_id", "title", "createdAt", "updatedAt" FROM "book" AS 
    "Book";`,
      { type: QueryTypes.SELECT }
    )
      .then((books) => {
        if (books) {
          res.json(books);
        } else {
          res.status(404).send({
            message: 'Could not find any books in the database',
          });
        }
      })
      .catch((err) => {
        res.send(err.message);
      });
  })
);
//GET
//Fetch and send a book with given ID
bookRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    Book.findByPk(req.params.id, {
      include: [
        {
          model: Author,
          through: { attributes: ['book_id', 'author_id'] },
        },
      ],
    }).then((book) => {
      if (book) {
        const bookAuthors = book['Authors'].map((author) => {
          return { id: author.author_id, name: author.name };
        });
        res.send({
          book: { id: book.book_id, title: book.title },
          authors: bookAuthors,
        });
      } else {
        res.status(404).send({
          message: `Could not find book with ID:${id} in the database.`,
        });
      }
    });
  })
);

//GET
//Fetch and send all books that have more than three authors
bookRouter.get(
  '/query/more_than_three_authors',
  expressAsyncHandler(async (req, res) => {
    db.query(
      `with joinTable AS (SELECT b.book_id, COUNT(*) as cnt FROM book b INNER JOIN author_book ab ON b.book_id = ab.book_id GROUP BY b.book_id)
      SELECT b.book_id, "title","cnt", "createdAt", "updatedAt" FROM book b INNER JOIN joinTable jt ON b.book_id = jt.book_id  WHERE jt.cnt > 3;`,
      { type: QueryTypes.SELECT }
    )
      .then((books) => {
        if (books) {
          res.json(books);
        } else {
          res.status(404).send({
            message: 'No result found for the query.',
          });
        }
      })
      .catch((err) => {
        res.send(err.message);
      });
  })
);

//POST
//Create a new book record with given data
bookRouter.post(
  '/add',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.body.id;
      const title = req.body.title;
      const authors = req.body.authors;
      const authorList = authors.replace(/ /g, '').split(',');
      var promises = [];

      await db.transaction(async (t) => {
        const [book, created] = await Book.findOrCreate({
          raw: true,
          where: { book_id: id, title: title },
          transaction: t,
        });
        if (authorList.length > 1) {
          for (const author of authorList) {
            const authorCreated = await Author.findOrCreate({
              where: { name: author },
              transaction: t,
            });

            promises.push(
              await AuthorBook.findOrCreate({
                where: {
                  author_id: authorCreated[0].author_id,
                  book_id: book.book_id,
                  transaction: t,
                },
              })
            );
          }
          Promise.all(promises);
        } else {
          const author = await Author.findOrCreate({
            where: { name: authors },
            transaction: t,
          });
          await AuthorBook.findOrCreate({
            where: { author_id: author[0].author_id, book_id: book.book_id },
            transaction: t,
          });
        }

        created
          ? res.send(book)
          : res.status(404).send({
              message: 'Book already exists in the database',
            });
      });
    } catch (err) {
      res.send(err);
    }
  })
);

//DELETE
//Delete a book record with given ID
bookRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      await db.transaction(async (t) => {
        await AuthorBook.destroy({
          where: { book_id: req.params.id },
          transaction: t,
        });
        await Book.destroy({
          where: { book_id: req.params.id, transaction: t },
        }).then((deleted) => {
          deleted
            ? res.send(true)
            : res.status(404).send({
                message: 'Could not find any books in the database',
              });
        });
      });
    } catch (err) {
      res.send(err.message);
    }
  })
);

//PUT
//Update a book record with new data
bookRouter.put(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const authors = req.body.authors;
    const authorList = authors.replace(/ /g, '').split(',');
    var promises = [];
    try {
      await db.transaction(async (t) => {
        const authorBookDeleted = await AuthorBook.destroy({
          where: { book_id: id },
          transaction: t,
        });
        const book = await Book.update(
          { title: title },
          { where: { book_id: id }, transaction: t }
        );

        if (authorList.length > 1 && book) {
          for (const author of authorList) {
            const authorCreated = await Author.findOrCreate({
              where: { name: author },
            });

            promises.push(
              await AuthorBook.findOrCreate({
                where: {
                  author_id: authorCreated[0].author_id,
                  book_id: id,
                },
                transaction: t,
              })
            );
          }
          Promise.all(promises);
        } else {
          const author = await Author.findOrCreate({
            where: { name: authors },
            transaction: t,
          });
          await AuthorBook.findOrCreate({
            where: { author_id: author[0].author_id, book_id: id },
            transaction: t,
          });
        }

        res.status(200).send('Successfully Updated');
      });
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  })
);

export default bookRouter;
