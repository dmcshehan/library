const express = require('express');
const Router = express.Router();

const { getById, getIndex, checkUser, renderSingle } = require('../controllers/bookController')();

Router.use(checkUser);
Router.route('/').get(getIndex);
Router.route('/:id').all(getById).get(renderSingle);

module.exports = Router;
