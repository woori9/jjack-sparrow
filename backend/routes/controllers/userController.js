const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');
const UserService = require('../../services/UserService');
const PetService = require('../../services/PetService');
const MatchService = require('../../services/MatchService');
const { getPhotoUrl } = require('../middleware/uploadPhoto');
const ReviewService = require('../../services/ReviewService');

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

    const userMatch = await MatchService.getUserMatch(targetUser.match);
    targetUser.match = userMatch;

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
    const { fullAddress, location } = req.body;

    await UserService.updateUserAddress(userId, fullAddress, location);

    return res.status(201).json({
      message: 'Success'
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

    const registeredPet = await PetService.createPet(petData);
    await UserService.updateUserPet(userId, registeredPet._id);

    return res.status(201).json({
      registeredPet
    });
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.savePhoto = async (req, res, next) => {
  try {
    const awsPhotoURL = getPhotoUrl(req.files);

    if (!awsPhotoURL.length) {
      throw new Error(err);
    }

    const { userId } = req.params;
    const photoURL = awsPhotoURL[0];

    return res.status(201).json({
      photoURL
    });
  } catch (err) {
    console.log(err);

    next(err);
  }
};

exports.createMatch = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { startAt, expireAt, pet } = req.body;

    const requestMatchData = {
      customer: userId,
      status: 1,
      startAt: startAt,
      expireAt: expireAt,
      chat: [],
      pet: pet
    };

    const newMatchRequest = await MatchService.createMatch(requestMatchData);

    await UserService.updateUserMatch(userId, newMatchRequest._id);

    return res.status(201).json({
      newMatchRequest
    });
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.updateBothUserAndMatch = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const matchId = req.params.matchId;

    await MatchService.updateMatchStatus(matchId, userId); //match 상태 업데이트 (Status + petSitter id)
    await UserService.updateUserMatch(userId, matchId);//push match to pet sitter's match
    const updatedMatch = await MatchService.getTargetMatch(matchId);

    return res.status(200).json({
      updatedMatch
    });
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.deleteMatches = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const matchId = req.params.matchId;//복수 일 경우 '&'
    const matches = matchId.split('&');

    await MatchService.deleteMatches(matches);
    await UserService.deleteExpiredPendingMatches(userId, matches);//push match to pet sitter's match

    return res.status(204);
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.deleteMatch = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const matchId = req.params.matchId;

    await MatchService.deleteMatch(matchId);
    await UserService.deleteExpiredPendingMatch(userId, matchId);

    return res.status(204);
  } catch (err) {
    err.status = 401;

    next(err);
  }
};

exports.registerReview = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const matchId = req.params.matchId;
    const { reviewData } = req.body;
    const { rating, description } = reviewData;

    const review = {
      author: userId,
      rating,
      description
    };

    const newReview = await ReviewService.createReview(review);

    await UserService.updateUserReview(userId, newReview._id);
    await MatchService.updateReview(matchId, newReview);

    return res.status(200).json({
      newReview
    });

  } catch (err) {
    console.log(err);
  }
};
