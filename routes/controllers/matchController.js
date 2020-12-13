const UserService = require('../../services/UserService');
const MatchService = require('../../services/MatchService');

exports.getAllPendingMatches = async (req, res, next) => {
  try {
    const allPendingMatches = await MatchService.getAllPendings();

    return res.status(200).json({
      allPendingMatches
    });

  } catch(err) {
    console.log(err);
  }
};
