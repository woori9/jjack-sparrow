const socketIo = require('socket.io');
const MatchService = require('../services/MatchService');
const ChatService = require('../services/ChatService');

const startSocket = server => {
  const io = socketIo(server);

  io.on('connection', socket => {
    console.log('new user connected');

    socket.on('new pending match created', async ({ newMatch }) => {
      const newMatchInfo = await MatchService.getTargetMatch(newMatch._id);
      socket.broadcast.emit('there is new pending match', { newMatchInfo });
    });

    socket.on('join pending room', matchId => {
      socket.join(matchId);
    });

    socket.on('accepted', async updatedMatch => {
      const { _id } = updatedMatch;
      socket.join(_id);

      socket.broadcast.emit('one pending matched so delete from list of pending', _id);
      socket.to(_id).emit('matching succeed', updatedMatch);
    });

    socket.on('pending match expired', matchId => {//pending이 만료되어 pet sitter 지도에서 정보 지우기
      socket.broadcast.emit('delete expired pending match', matchId);
    });

    socket.on('join chat room', matchId => {
      socket.join(matchId);
    });

    socket.on('send message', async ({ matchId, userId, message }, callback) => {

      const chatInfo = {
        sendBy: userId,
        message: message
      };

      const newChat = await ChatService.createChat(chatInfo);
      await MatchService.updateChat(matchId, newChat);

      io.in(matchId).emit('recieve message', newChat);
    });

    socket.on('disconnect', () => {
      console.log('someone leave..  X');
    });
  });
};

module.exports = startSocket;
