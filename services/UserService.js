const User = require('../models/user');

const UserService = {
  getExistingUser: async (email) => {
    const user = await User.findOne({ email: email }, (err, data) => {console.log(err)})
      .populate('pet')
      .populate('match');
      // .populate('review')
      // .populate('calendar');

    return user;
  },

  createNewUser: async newUserData => {
    const newUser = await User.create(newUserData);
    return newUser;
  },

  updateUserAddress: async (userId, fullAddress) => {
    await User.findByIdAndUpdate(userId, { address: fullAddress });
  },

  updateUserPet: async (userId, petId) => {
    await User.updateOne({ _id: userId }, { $push: { 'pet': petId } });
  },

  findUserAndUpdateMatch: async (userId, matchData) => {
    //await User.update({ _id: userId }, { $push { pet: petData  } });
  }
};

module.exports = UserService;
