const express = require('express');
const Router = express.Router();
const debug = require('debug')('app:authroutes');
const passport = require('passport');
const { MongoClient, ObjectID } = require('mongodb');

Router.post('/signUp', (req, res) => {
  const { username, password } = req.body;
  const url = 'mongodb://localhost:27017';
  const dbName = 'libraryApp';

  (async function () {
    let client;
    try {
      (async function connectToMg() {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });

        const db = client.db(dbName);
        const col = db.collection('users');
        const results = await col.insertOne({ username, password });

        req.logIn(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
        client.close();
      })();
    } catch (err) {
      debug(error.stack);
    }
  })();
});

Router.route('/profile')
  .all((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  })
  .get((req, res) => {
    res.render('profile', {
      user: req.user,
    });
  });

Router.route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/signIn',
      failureFlash: true,
    })
  );

Router.get('/signout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = Router;
