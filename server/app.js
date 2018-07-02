const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'answer'
})

module.exports = app;