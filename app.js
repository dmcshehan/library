const express = require('express'); // commonjs pattern
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const bookRoutes = require('./src/routes/book');
const adminRoutes = require('./src/routes/admin');

const app = express();

const config = {
  user: 'user',
  password: 'jhj^T#ghg',
  server: 'dmcshehanpslibrary.database.windows.net',
  database: 'PSLibrary',
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};

sql.connect(config).catch((error) => {
  debug(`${chalk.red(error)}`);
});

app.use(morgan('tiny'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bulma/css')));

//  not use , but set
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      {
        link: '/books',
        title: 'Books',
      },
      {
        link: '/authors',
        title: 'Authors',
      },
    ],
    title: 'Book Shop',
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  debug(`Listnening at port ${chalk.green(port)}`);
});
