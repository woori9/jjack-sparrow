const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');
const UserService = require('../../services/UserService');
const PetService = require('../../services/PetService');
const MatchService = require('../../services/MatchService');

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

exports.registerAddress = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { address, detail } = req.body;
    const fullAddress = `${address} ${detail}`

    await UserService.updateUserAddress(userId, fullAddress);

    return res.status(201).json({
      addressData: fullAddress
    });
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.registerPet = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { petData } = req.body;

    const pet = await PetService.createPet(petData);
    await UserService.updateUserPet(userId, pet._id);
    await UserService.findUserAndUpdatePet(userId, petData);

    return res.status(201).json({
      addressData: fullAddress
    });
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.registerMatch = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { matchData } = req.body;

    const match = await MatchService.createPet(matchData);
    await UserService.findUserAndUpdateMatch(userId, match._id);
    // await UserService.findUserAndUpdatePet(userId, petData);

    // return res.status(201).json({
    //   addressData: fullAddress
    // });
  } catch (err) {
    err.status = 401;

    next(err);
  }
};
