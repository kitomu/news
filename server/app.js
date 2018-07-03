const routes = require('./routes');
const handlers = require('./handlers');

const Koa = require('koa');
const app = new Koa();


app.use(handlers.errorHandler);
app.use(handlers.loggerHandler);
app.use(routes);
app.use(handlers.serveHandler);
app.use(handlers.compressHandler);

module.exports = app;