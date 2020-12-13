const User = require('../models/user');

const UserService = {
  getExistingUser: async (email) => {
    const user = await User.findOne({ email: email }, (err, data) => { console.log(err) })
      .populate('pet')
      .populate('match');
    // .populate('review')
    // .populate('calendar');

    return user;
  },

  createNewUser: async newUserData => {
    const newUser = await User.create(newUserData, function (err) { console.log(err) });
    return newUser;
  },

  updateUserAddress: async (userId, fullAddress, location) => {
    await User.findByIdAndUpdate(userId, { $set: { 'address.description': fullAddress, 'address.location': location } });
  },

  updateUserPet: async (userId, petId) => {
    await User.updateOne({ _id: userId }, { $push: { pet: petId } });//'pet' ??? 문자열?
  },

  updateUserMatch: async (userId, matchId) => {
    await User.updateOne({ _id: userId }, { $push: { match: matchId } });
  }
};

module.exports = UserService;
