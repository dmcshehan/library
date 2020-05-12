const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');
const bookService = require('../services/goodReadsService');

function bookController() {
  function getIndex(req, res, next) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    let client;
    try {
      (async function connectToMg() {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });

        const db = client.db(dbName);
        const col = db.collection('books');
        const books = await col.find().toArray();
        res.render('books', {
          books,
        });

        client.close();
      })();
    } catch (err) {
      debug(error.stack);
    }
  }

  function getById(req, res, next) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    let client;
    try {
      (async function connectToMg() {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });

        const db = client.db(dbName);
        const col = db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(req.params.id) });

        try {
          book.details = await bookService.getBookById(book._id);

          console.log(book);
        } catch (error) {
          console.log(error);
        }

        req.book = book;
        client.close();
        next();
      })();
    } catch (err) {
      debug(error.stack);
    }
  }

  function checkUser(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function renderSingle(req, res) {
    res.render('singleBook', { book: req.book });
  }

  return {
    getById,
    getIndex,
    checkUser,
    renderSingle,
  };
}

module.exports = bookController;
