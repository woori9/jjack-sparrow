const MatchService = require('../../services/MatchService');

exports.getAllPendingMatches = async (req, res, next) => {
  try {
    const allPendingMatches = await MatchService.getAllPendings();

    return res.status(200).json({
      allPendingMatches
    });

  } catch (err) {
    console.log(err);
  }
};

exports.updateSuccessMatch = async (req, res, next) => {
  try {
    const matchId = req.params.matchId;

    await MatchService.updateSuccessToPast(matchId);
    const updatedMatch = await MatchService.getTargetMatch(matchId);

    return res.status(200).json({
      updatedMatch
    });

  } catch (err) {
    console.log(err);
  }
};

exports.getChatInfo = async (req, res, next) => {
  try {
    const matchId = req.params.matchId;

    const { chat } = await MatchService.getTargetChat(matchId);

    return res.status(200).json({
      chat
    });

  } catch (err) {
    console.log(err);
  }
};
