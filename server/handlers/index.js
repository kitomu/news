module.exports.compressHandler = require('koa-compress')();
module.exports.loggerHandler = require('koa-logger')();
module.exports.bodyParserHandler = require('koa-body')();

module.exports.serveHandler = require('koa-static')(require('path').join(__dirname, 'public'));
module.exports.errorHandler =  async (ctx ,next)=>{
    try {
       await next();
    } catch (err) {
        console.log(err);
       //Обработчик ошибок
    }
 };