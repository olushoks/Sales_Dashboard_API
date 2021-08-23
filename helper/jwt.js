const jwt = require("jsonwebtoken");
const accessJWTKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const refreshJWTKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
const accessExpiresIn = process.env.ACCESS_JWT_EXPIRES_IN;
const tokenExpiresIn = process.env.REFRESH_JWT_EXPIRES_IN;

// generate access token
const createAccessJWT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.sign(
        { _id: id },
        accessJWTKey,
        { expiresIn: accessExpiresIn },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

// generate refresh token
const createRefreshJWT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.sign(
        { _id: id },
        refreshJWTKey,
        { expiresIn: tokenExpiresIn },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

// verify access token
const verifyAccessToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, accessJWTKey, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// verify access token
const verifyRefreshToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, accessJWTKey, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessToken,
  verifyRefreshToken,
};
