const Match = require('../models/match');

const MatchService = {
  createMatch: async matchData => {
    console.log('matchData', matchData);

    const newMatch = await Match.create(matchData);
    return newMatch;
  }
};

module.exports = MatchService;
