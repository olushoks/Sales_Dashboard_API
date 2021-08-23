const bcrypt = require("bcrypt");
const saltRounds = +process.env.BCRYPT_SALT;

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        reject(err.message);
      }
      resolve(hash);
    });
  });
};

module.exports = {
  hashPassword,
};
