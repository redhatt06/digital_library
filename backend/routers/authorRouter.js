import express from 'express';
import Author from '../models/author.js';
import Book from '../models/book.js';
import expressAsyncHandler from 'express-async-handler';
import db from '../database.js';
import { QueryTypes } from 'sequelize';
import { isAuth } from '../utils/auth.js';
import AuthorBook from '../models/author_book.js';
const authorRouter = express.Router();

//GET
//Fetch and send all author records

authorRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    db.query(
      `SELECT "author_id", "name", "createdAt", "updatedAt" FROM "author" AS 
    "Author";`,
      { type: QueryTypes.SELECT }
    )
      .then((author) => {
        author
          ? res.send(author)
          : res.send({
              message: 'Could not find any books in the database',
            });
      })
      .catch((err) => res.send({ error: err.message }));
  })
);

//GET
//Fetch and send record of an author with given ID
authorRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    Author.findByPk(id, {
      include: [
        {
          model: Book,
          through: { attributes: ['book_id', 'author_id'] },
        },
      ],
    })
      .then((data) => {
        data
          ? res.send({
              author: { id: data.author_id, name: data.name },
              books: data['Books'].map((book) => {
                return { id: book.book_id, title: book.title };
              }),
            })
          : res.send({
              error:
                'There is no record of the specified author in the library database',
            });
      })
      .catch((err) => res.send({ error: err.message }));
  })
);

//GET
//Fetch and send authors with most books written
//Will send multiple authors if all of them have the same amount of books
authorRouter.get(
  '/query/mostbooks',
  expressAsyncHandler(async (req, res) => {
    db.query(
      `with jointable AS (SELECT a.author_id,COUNT(*) as cnt
    FROM author a INNER JOIN author_book ab ON a.author_id = ab.author_id GROUP BY a.author_id)
    SELECT au.author_id, "name","cnt", "createdAt", "updatedAt" FROM author au INNER JOIN jointable jt ON au.author_id = jt.author_id
    WHERE jt.cnt = (SELECT MAX(cnt) from jointable)
    `,
      { type: QueryTypes.SELECT }
    )
      .then((authors) => {
        if (authors) {
          res.send(authors);
        } else {
          res.send({
            error: 'No results found!',
          });
        }
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  })
);

//DELETE
//Delete an author from the database with given ID
authorRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      await db.transaction(async (t) => {
        await AuthorBook.destroy({ where: { author_id: id }, transaction: t });
        await Author.destroy({ where: { author_id: id }, transaction: t }).then(
          (deleted) => {
            deleted
              ? res.send(true)
              : res.send({
                  error: `Could not find author with ID:${id} in the database.`,
                });
          }
        );
      });
    } catch (err) {
      res.send({ error: err.message });
    }
  })
);

//PUT
//Update an author's info with new data
authorRouter.put(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.body.id;
      const name = req.body.name;
      await db.transaction(async (t) => {
        const author = await Author.update(
          { name: name },
          { where: { author_id: id }, transaction: t }
        );

        res.send('Successfully Updated');
      });
    } catch (err) {
      res.send({ error: err.message });
    }
  })
);
export default authorRouter;
