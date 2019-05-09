'use strict';

const path = require('path');
const fs = require('fs');
async function render(page) {
  const viewUrl = path.join(__dirname, '..', `/views/${page}`);
  return new Promise((reslove, reject) => {
    fs.readFile(viewUrl, (err, data) => {
      if (err) {
        return reject(`<h1>inner error! ${err}</h1>`);
      }
      return reslove(data);
    })
  })
}

module.exports = render