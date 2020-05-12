const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient, ObjectID } = require('mongodb');

function passportfunc(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function () {
          let client;
          try {
            (async function connectToMg() {
              client = await MongoClient.connect(url, { useUnifiedTopology: true });

              const db = client.db(dbName);
              const col = db.collection('users');

              const user = await col.findOne({ username });

              if (user.password === password) {
                done(null, user);
              } else {
                done(null, false);
              }
              client.close();
            })();
          } catch (err) {
            debug(error.stack);
          }
        })();
      }
    )
  );
}

module.exports = passportfunc;
