import {
  CHANGE_LAST_MESSAGE
} from '../constants/actionTypes';


const chat = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_LAST_MESSAGE:
      const { matchId, chatInfo } = action.payload;

      return {
        ...state,
        [matchId]: chatInfo
      };
    default:
      return state;
  };
};

export default chat;
