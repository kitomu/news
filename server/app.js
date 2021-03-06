const routes = require('./routes');
const handlers = require('./handlers');
const auth = require('./handlers/auth');
const Koa = require('koa');
const app = new Koa();


app.use(handlers.errorHandler);
app.use(handlers.loggerHandler);
app.use(handlers.bodyParserHandler);
app.use(auth.passportHandler);
app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(handlers.serveHandler);
app.use(handlers.compressHandler);

module.exports = app;