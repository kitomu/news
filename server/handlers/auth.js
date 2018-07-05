const passport = require('koa-passport'), //реализация passport для Koa
      LocalStrategy = require('passport-local'), //локальная стратегия авторизации
      JwtStrategy = require('passport-jwt').Strategy, // авторизация через JWT
      ExtractJwt = require('passport-jwt').ExtractJwt, // авторизация через JWT
      db = require('../common/db'),
      User = require('../common/user'),
      jwtsecret = require('../../config').SECRET_KEY;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (email, password, done) => {
      try{
        let user = (await db.query(`SELECT * FROM users WHERE users.mail='${email}' LIMIT 1`))[0];
        if (!user || !User.checkPassword(password, user.passwordHash, user.salt)) {
            return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
        }
        return done(null, user);
      }catch(err){
          done(err);
      }
  })
);
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
  }, async (payload, done) => {
    try{
      console.log("P");
      let user = (await db.query(`SELECT * FROM users WHERE id=${payload.id} LIMIT 1`));
      if (!user) {
          return done(null, false);
      }
      return done(null, user);
    }catch(err){
        done(err);
    }
  })
);
module.exports.passportHandler = passport.initialize();
module.exports.passport = passport;