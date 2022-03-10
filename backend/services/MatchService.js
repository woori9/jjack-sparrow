const Match = require('../models/match');

const MatchService = {
  createMatch: async matchData => {
    const newMatch = await Match.create(matchData);
    return newMatch;
  },

  getUserMatch: async matchIdArray => {
    const userMatch = await Match.find({ '_id': { $in: matchIdArray } })
      .populate('customer')
      .populate('pet')
      .populate('petsitter')
      .exec();
    return userMatch;
  },

  getTargetMatch: async matchId => {
    const populatedMatch = await Match.findById(matchId)
      .populate('customer')
      .populate('pet')
      .populate('petsitter')
      .exec();
    return populatedMatch;
  },

  getTargetChat: async matchId => {
    const populatedChat = await Match.findById(matchId).exec();
    return populatedChat;
  },

  getAllPendings: async () => {
    const allPendings = await Match.find({ status: 1 }).populate('customer').populate('pet').exec();
    return allPendings;
  },

  updateMatchStatus: async (matchId, petsitterId) => {
    await Match.findOneAndUpdate({ _id: matchId }, { $set: { status: 2, petsitter: petsitterId } }).exec();
  },

  deleteMatches: async arrayOfMatchIds => {
    arrayOfMatchIds.forEach(async id => {
      await Match.findByIdAndDelete(id);
    });
  },

  deleteMatch: async id => {
    await Match.findByIdAndDelete(id);
  },

  updateSuccessToPast: async matchId => {
    await Match.findOneAndUpdate({ _id: matchId }, { $set: { status: 3 } }).exec();
  },

  updateChat: async (matchId, newChat) => {
    await Match.findOneAndUpdate({ _id: matchId }, { $push: { chat: newChat } }).exec();
  },

  updateReview: async (matchId, newReview) => {
    const result = await Match.findOneAndUpdate({ _id: matchId }, { $set: { review: newReview } }).exec();
  }
};

module.exports = MatchService;
