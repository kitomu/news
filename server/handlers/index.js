module.exports.compressHandler = require('koa-compress')();
module.exports.loggerHandler = require('koa-logger')();
module.exports.bodyParserHandler = require('koa-body')({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
});
module.exports.serveHandler = require('koa-static')(require('path').join(__dirname, 'public'));
module.exports.errorHandler =  async (next)=>{
    try {
       await next();
    } catch (err) {
        console.log(err);
       //Обработчик ошибок
    }
 };