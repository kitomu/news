const config = require('./../config');
const app = require('./app');

const PORT = process.env.PORT || config.port;

const server =  app.listen(PORT , err => {
    if (err) console.error(err.message);
    console.log(`PORT: ${PORT}`);
  });

module.exports = server;