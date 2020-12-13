const match = require('../models/match');
const Match = require('../models/match');

const MatchService = {
  createMatch: async matchData => {
    const newMatch = await Match.create(matchData);
    return newMatch;
  },

  getTargetMatch: async matchId => {
    const populatedMatch = await Match.findById(matchId).populate('customer').populate('pet').exec();
    return populatedMatch;
  },

  getAllPendings: async () => {
    const allPendings = await Match.find({ status: 1 }).populate('customer').populate('pet').exec();
    return allPendings;
  },

  updateMatchStatus: async (matchId, petsitterId) => {
    await Match.findOneAndUpdate({ _id: matchId }, { $set: { status: 2, petsitter: petsitterId } }).exec();
  }
};

module.exports = MatchService;
