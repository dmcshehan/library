const express = require('express');
const Router = express.Router();
const debug = require('debug')('app:admin');

const MongoClient = require('mongodb').MongoClient;

const books = [
  {
    id: '9781593275846',
    title: 'Eloquent JavaScript, Second Edition',
    author: 'Marijn Haverbeke',
  },
  {
    id: '9781449331818',
    title: 'Learning JavaScript Design Patterns',
    author: 'Addy Osmani',
  },
  {
    id: '9781449365035',
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
  },
  {
    id: '9781491950296',
    title: 'Programming JavaScript Applications',
    author: 'Eric Elliott',
  },
  {
    isbn: '9781593277574',
    title: 'Understanding ECMAScript 6',
    subtitle: 'The Definitive Guide for JavaScript Developers',
    author: 'Nicholas C. Zakas',
  },
  {
    id: '9781491904244',
    title: "You Don't Know JS",
    author: 'Kyle Simpson',
  },
  {
    id: '9781449325862',
    title: 'Git Pocket Guide',
    author: 'Richard E. Silverman',
  },
  {
    id: '9781449337711',
    title: 'Designing Evolvable Web APIs with ASP.NET',
    author: 'Glenn Block, et al.',
  },
];

Router.get('/', (req, res) => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'libraryApp';
  (async function connectToMongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('connected correcttly to the server');

      const db = client.db(dbName);
      const result = await db.collection('books').insertMany(books);

      res.json(result);
    } catch (err) {
      debug(err.stack);
    }

    client.close();
  })();
});

module.exports = Router;
