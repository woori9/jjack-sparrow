const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');

const verifyToken = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).send({
        code: 401,
        message: 'token does not exist',
      });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).send({
          code: 401,
          message: 'token invalid'
        });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = verifyToken;
