const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');
const UserService = require('../../services/UserService');

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;
    const { email, profileUrl } = payload;

    let targetUser = await UserService.getExistingUser(email);

    if (!targetUser) {
      const newUserData = {
        email: email,
        pet: [],
        match: [],
        review: [],
        calendar: []
      };

      targetUser = await UserService.createNewUser(newUserData);
    }

    return res.status(201).json({
      token: jwt.sign(payload, JWT_SECRET_KEY),
      userData: targetUser
    });
  } catch (err) {
    err.status = 401;

    next(err);
  }
}