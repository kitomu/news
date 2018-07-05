const db = require('../common/db'),
        jwt = require('jsonwebtoken'), // аутентификация по JWT для hhtp
        User = require('../common/user'),
        jwtsecret = require('../../config').SECRET_KEY,
        passport = require('../handlers/auth').passport;

module.exports.getArticles = async (ctx, next)=>{
    //Получить список статей
};
module.exports.fetchArticle = async (ctx, next)=>{
    try{
        let user = (await db.query(`SELECT * FROM users WHERE id=${1} LIMIT 1`))[0];
        ctx.body = user;
    }catch(err){
        console.log(err);
    }
    //Получить статью по id
};
module.exports.deleteArticle = async (ctx, next)=>{
    //Удалить статью по id
};
module.exports.createArticle = async (ctx, next)=>{
    //Создать новую статью
};
module.exports.modifieArticle = async (ctx, next)=>{
    //Изменить статью
};

module.exports.registrate = async (ctx, next)=>{
    try {
        let reqBody = ctx.request.body;
        if(!reqBody.name || typeof reqBody.name  !== "string"
            || !reqBody.fname  || typeof reqBody.fname  !== "string"
            || !reqBody.login  || typeof reqBody.login  !== "string"
            || !reqBody.mail  || typeof reqBody.mail  !== "string"
            || !reqBody.password || typeof reqBody.password  !== "string"){
            throw new Error("Not correct param");
        }
        let userSecret = User.passwordToHash(reqBody.password);
        console.log(userSecret.salt.length);
        ctx.body = await db.query(`INSERT INTO users (name, fname, login, mail, passwordHash, salt, img_avatar) VALUES('${reqBody.name}', '${reqBody.fname}','${reqBody.login}', '${reqBody.mail}','${userSecret.passwordHash}','${userSecret.salt}',${reqBody.img_avatar?"'"+reqBody.img_avatar+"'":'NULL'})`);
    }catch (err) {
        ctx.status = 400;
        ctx.body = err;//Дописать оброботчик ошибок, например на дублирование емейла
    }
};
module.exports.authenticate = async (ctx, next)=>{
    await passport.authenticate('local', (err, user) => {
        if (user == false) {
            ctx.status = 400;//Добавить обработчик
            ctx.body = "Login failed";
        } else {
          //--payload - информация которую мы храним в токене и можем из него получать
          const payload = {
            id: user.id,
            displayName: user.login,
            email: user.mail
          };
          const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
          
          ctx.body = {user: user.login, token: 'JWT ' + token};
        }
      })(ctx, next);
};
module.exports.custom = async (ctx, next)=>{
    await passport.authenticate('jwt', function (err, user) {
        if (!user) {
            ctx.status = 400;//Добавить обработчик
            ctx.body = "No such user";
            console.log(user);
        } else {
          ctx.body = user.login;
        }
      } )(ctx, next)  
};