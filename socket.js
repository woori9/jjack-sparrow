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

  // socket.emit('message-public', data, () => {
  //   setMessage('');
  //   addMessage(data);
  // });

  joinMeeting: (meetingId, userId) => {
    socket.emit('join meeting', { meetingId, userId });
  },
  sendLocation: location => {
    socket.emit('send location', { location });
  },
  sendMessage: (userId, nickname, message, callback) => {
    socket.emit('send message', { userId, nickname, message }, callback);
  },
  sendNotification: (nickname, message) => {
    socket.emit('send notification', { nickname, message });
  },
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

export const chatSocket = {};

