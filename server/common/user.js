crypto = require('crypto');
      
module.exports.passwordToHash = password =>{
  if (password) {
    let salt = crypto.randomBytes(128).toString('base64');
    let passwordHash = crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1').toString('base64');
    return{
        salt,
        passwordHash
    }
  } else {
    return {
        salt: undefined,
        passwordHash: undefined
    };
  }
};
module.exports.checkPassword = (password, passwordHash, salt) => {
    if (!password) return false;
    if (!passwordHash) return false;
    return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1').toString('base64') == passwordHash;
  };