const express = require('express'); // commonjs pattern
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/cjs')));

//  not use , but set
app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  debug(`Listnening at port ${chalk.green(port)}`);
});
