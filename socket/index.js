const socketIo = require('socket.io');
const match = require('../models/match');
const MatchService = require('../services/MatchService');
const pendingList = {};

const startSocket = server => {
  const io = socketIo(server);

  io.on('connection', socket => {
    console.log('new user connected');

    socket.on('new pending match created', async ({ newMatch }) => {
      socket.join(newMatch._id);

      const newMatchInfo = await MatchService.getTargetMatch(newMatch._id);
      socket.broadcast.emit('there is new pending match', { newMatchInfo });
    });

    socket.on('accepted', async updatedMatch => {
      const { _id } = updatedMatch;
      socket.join(_id);

      socket.broadcast.emit('one pending matched so delete from list of pending', _id);
      socket.to(_id).emit('matching succeed', updatedMatch);
    });

    socket.on('disconnect', () => {
      console.log('someone leave..  X');
    });


  });
};

module.exports = startSocket;
