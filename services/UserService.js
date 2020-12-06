const User = require('../models/User');

const UserService = {
  getExistingUser: async (email) => {
    const user = await User.findOne({ email: email });
      // .populate('pet')
      // .populate('match')
      // .populate('review')
      // .populate('calendar');

    return user;
  },

  createNewUser: async newUserData => {
    const newUser = await User.create(newUserData);
    return newUser;
  },

  findUserAndUpdate: async (userId, fullAddress) => {
    await User.findByIdAndUpdate(userId, { address: fullAddress });
  },


};

module.exports = UserService;
