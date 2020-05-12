const axios = require('axios');
const xml2js = require('xml2js');

const debug = require('debug')('app:goodreadsService');
const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://www.goodreads.com/book/show/656.xml?key=yourkey')
        .then((response) => {
          parser.parseString(response.data, function parsedJson(error, result) {
            if (error) {
              debug(error);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
