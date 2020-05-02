const express = require('express');
const Router = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:books');
const { MongoClient, ObjectID } = require('mongodb');

Router.get('/', (rq, res) => {
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
});

//using async await
Router.route('/:id')
  .all((req, res, next) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    let client;
    try {
      (async function connectToMg() {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });

        const db = client.db(dbName);
        const col = db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(req.params.id) });
        req.book = book;
        client.close();
        next();
      })();
    } catch (err) {
      debug(error.stack);
    }
  })

  .get((req, res) => {
    res.render('singleBook', { book: req.book });
  });

module.exports = Router;
//export default Router;
