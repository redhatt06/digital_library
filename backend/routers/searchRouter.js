import express from 'express';
import { col, fn, where } from 'sequelize';
import Author from '../models/author.js';
import Book from '../models/book.js';
import expressAsyncHandler from 'express-async-handler';
const searchRouter = express.Router();

//GET
//Given a search string matches the string with both Book.title and Author.name and fetches the found records
// searchRouter.get(
//   '/:searchValue',
//   expressAsyncHandler(async (req, res) => {
//     const searchValue = decodeURIComponent(req.params.searchValue);
//     try {
//       const books = await Book.findAll({
//         where: where(fn('lower', col('title')), searchValue.toLowerCase()),
//         plain: true,
//         include: [
//           {
//             model: Author,
//             through: { attributes: [] },
//           },
//         ],
//       });

//       const authors = await Author.findAll({
//         where: where(fn('lower', col('name')), searchValue.toLowerCase()),
//         plain: true,
//         include: [
//           {
//             model: Book,
//             through: { attributes: [] },
//           },
//         ],
//       });

//       if (books) {
//         var bookArray = [];

//         console.log(books);
//         if (books.length > 1) {
//           for (const book of books) {
//             const bookAuthors = book['Authors'].map((author) => {
//               return { id: author.author_id, name: author.name };
//             });
//             bookArray.push({
//               book: { id: book.book_id, title: book.title },
//               bookAuthors,
//             });
//           }
//         } else {
//           const data = books.dataValues;
//           const bookAuthors = data['Authors'].map((author) => {
//             return { id: author.author_id, name: author.name };
//           });
//           bookArray.push({
//             book: { id: data.book_id, title: data.title },
//             authors: bookAuthors,
//           });
//         }

//         res.send({
//           type: 'b',
//           multiple: false,
//           data: bookArray,
//         });
//       } else if (authors) {
//         var authorArray = [];
//         const data = authors.dataValues;
//         const authorBooks = data['Books'].map((book) => {
//           return { id: book.book_id, title: book.title };
//         });
//         authorArray.push({
//           author: { id: data.author_id, name: data.name },
//           books: authorBooks,
//         });
//         res.send({
//           type: 'a',
//           multiple: false,
//           data: authorArray,
//         });
//       } else {
//         res.send({
//           error:
//             'There is no record of the specified book or author in the library database',
//         });
//       }
//     } catch (err) {
//       res.send({ error: err.message });
//     }
//   })
// );

searchRouter.get(
  '/:searchValue',
  expressAsyncHandler(async (req, res) => {
    const groupByKey = (list, key) => {
      if (key === 'book_id') {
        const grouped = list.reduce(
          (hash, obj) => ({
            ...hash,
            [obj[key]]: (hash[obj[key]] || []).concat(obj),
          }),
          {}
        );
        const formatted = Object.keys(grouped).map(function (key, index) {
          var authors = [];
          grouped[key].forEach((obj) => {
            authors.push(obj['Authors.name']);
          });
          return {
            book_id: grouped[key][0].book_id,
            title: grouped[key][0].title,
            type: 'b',
            authors: authors,
          };
        });
        return formatted;
      } else if (key === 'author_id') {
        const grouped = list.reduce(
          (hash, obj) => ({
            ...hash,
            [obj[key]]: (hash[obj[key]] || []).concat(obj),
          }),
          {}
        );
        const formatted = Object.keys(grouped).map(function (key, index) {
          var books = [];
          grouped[key].forEach((obj) => {
            books.push(obj['Books.title']);
          });
          return {
            author_id: grouped[key][0].author_id,
            name: grouped[key][0].name,
            type: 'a',
            books: books,
          };
        });
        return formatted;
      }
    };
    const searchValue = decodeURIComponent(req.params.searchValue);
    try {
      var responseData = [];
      const books = await Book.findAll({
        where: where(fn('lower', col('title')), searchValue.toLowerCase()),
        raw: true,
        include: [
          {
            model: Author,
            through: { attributes: [] },
          },
        ],
      });

      const authors = await Author.findAll({
        where: where(fn('lower', col('name')), searchValue.toLowerCase()),
        raw: true,
        include: [
          {
            model: Book,
            through: { attributes: [] },
          },
        ],
      });
      if (books || authors) {
        if (books) {
          var groupedBooks = groupByKey(books, 'book_id');
        }
        if (authors) {
          var groupedAuthors = groupByKey(authors, 'author_id');
        }
        responseData = groupedBooks.concat(groupedAuthors);
        res.send({ data: responseData });
      } else {
        res.send({
          error:
            'There is no record of the specified book or author in the library database',
        });
      }
    } catch (err) {
      res.send({ error: err.message });
    }
  })
);

export default searchRouter;
