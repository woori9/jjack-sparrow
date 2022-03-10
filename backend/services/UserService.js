const User = require('../models/user');

const UserService = {
  getExistingUser: async (email) => {
    const user = await User.findOne({ email: email }, (err, data) => { console.log(err) })
      .populate('pet')
      .populate('match')

    return user;
  },

  createNewUser: async newUserData => {
    const newUser = await User.create(newUserData, function (err) { console.log(err) });
    return newUser;
  },

  updateUserAddress: async (userId, fullAddress, location) => {
    await User.findByIdAndUpdate(userId, { $set: { 'address.description': fullAddress, 'address.location': location } }, function (err) {
      console.log(err);
    });
  },

  updateUserPet: async (userId, petId) => {
    await User.updateOne({ _id: userId }, { $push: { pet: petId } });
  },

  updateUserMatch: async (userId, matchId) => {
    await User.updateOne({ _id: userId }, { $push: { match: matchId } });
  },

  deleteExpiredPendingMatches: async (userId, matches) => {
    await User.updateOne({ _id: userId }, { $pullAll: { match: matches } });
  },

  deleteExpiredPendingMatch: async (userId, matchId) => {
    await User.updateOne({ _id: userId }, { $pull: { match: matchId } });
  },

  updateUserReview: async (userId, reviewId) => {
    await User.findByIdAndUpdate(userId, { $push: { review: reviewId } });
  }
};

module.exports = UserService;
