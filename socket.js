import io from 'socket.io-client';
import getEnvVars from './environment';

const { SERVER_URL } = getEnvVars();

export const socket = io.connect(SERVER_URL, {
  transports: ['websocket'],
});
