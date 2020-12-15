import io from 'socket.io-client';
import getEnvVars from './environment';

const { SERVER_URL } = getEnvVars();

export const socket = io.connect(SERVER_URL, {
  transports: ['websocket'],
});

export const matchSocket = {
  removeAllListeners: () => {
    socket.removeAllListeners();
  },

  informNewPendingMatch: newMatch => {//object ID 있음(디비에 저장하고 나서 가져온 정보)
    socket.emit('new pending match created', { newMatch });
  },

  respondToPendingMatch: (matchId) => {
    socket.emit('accepted', matchId);
  },

  joinPendingRoom: (matchId) => {
    socket.emit('join pending room', matchId);
  },

  notifyPendingMatchExpire: matchId => {
    socket.emit('pending match expired', matchId);
  },
  ///

  arriveMeeting: () => {
    socket.emit('arrive meeting');
  },
  finishMeeting: callback => {
    socket.emit('finish meeting', callback);
  },
  cancelMeeting: callback => {
    socket.emit('cancel meeting', callback);
  },
  breakupMeeting: callback => {
    socket.emit('breakup meeting', callback);
  },
};

export const chatSocket = {
  joinChatRoom: matchId => {
    socket.emit('join chat room', matchId);
  },

  sendMessage: (matchId, userId, message, callback) => {
    socket.emit('send message', { matchId, userId, message })//, callback);
  },

  // socket.emit('message-public', data, () => {
  //   setMessage('');
  //   addMessage(data);
  // });

  sendNotification: (nickname, message) => {
    socket.emit('send notification', { nickname, message });
  },
};

