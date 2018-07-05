const models = require('./../models/mod');
const Router = require('koa-router');
const route = new Router(); //Instantiate the router

route.get('/articles', models.getArticles);
route.get('/articles/:id([0-9]{1,})', models.fetchArticle);
route.delete('/articles/:id([0-9]{1,})', models.deleteArticle);
route.post('/articles', models.createArticle);
route.put('/articles/:id([0-9]{1,})', models.modifieArticle);

route.post('/registrate', models.registrate);
route.post('/authenticate', models.authenticate);
route.get('/custom', models.custom);

module.exports = route;
