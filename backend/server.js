import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import config from './utils/config.js';
import db from './database.js';
import bookRouter from './routers/bookRouter.js';
import authorRouter from './routers/authorRouter.js';
import userRouter from './routers/userRouter.js';
import searchRouter from './routers/searchRouter.js';
import Book from './models/book.js';
import Author from './models/author.js';
import AuthorBook from './models/author_book.js';
import seed from './dummy_data/seed.js';

//Defining model relations before syncing to the database
Book.belongsToMany(Author, {
  through: AuthorBook,
  foreignKey: 'book_id',
});
Author.belongsToMany(Book, {
  through: AuthorBook,
  foreignKey: 'author_id',
});
//Connect and sync to the database
db.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });
const app = express();

//Defining API Routes
app.use(bodyParser.json());
app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);
app.use('/api/users', userRouter);
app.use('/api/search', searchRouter);
app.get('/api/seed', async (req, res) => {
  seed();
  res.send('Test data has been successfully created.');
});
//Static route for react build folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//Start listening
app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
