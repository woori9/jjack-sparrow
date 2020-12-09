import io from 'socket.io-client';
import getEnvVars from './environment';

const { SERVER_URL } = getEnvVars();

export const socket = io.connect(SERVER_URL, {
  transports: ['websocket'],
});

export const socketApi = {
  removeAllListeners: () => {
    socket.removeAllListeners();
  },
  createMeeting: (meetingId, userId) => {
    socket.emit('create meeting', { meetingId, userId });
  },
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
