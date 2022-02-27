import axios from 'axios';
import {
  apiConfig,
  apiUrl,
  UPDATE_NEWEST_MESSAGE,
} from '../contexts/constants';

const middlewares = {
  logger(state, action, newState) {
    console.group(action.type);
    console.log('Old', state);
    console.log('New', newState);
    console.groupEnd();
    return newState;
  },

  sortRoomList(_state, _action, newState) {
    const rooms = newState.rooms.sort((a, b) => {
      return (
        new Date(b.newestMessage?.createdAt || b.createdAt).getTime() -
        new Date(a.newestMessage?.createdAt || a.createdAt).getTime()
      );
    });
    return {
      ...newState,
      rooms,
    };
  },

  updateNewestMessage(_state, action, newState) {
    if (action.type === UPDATE_NEWEST_MESSAGE) {
      const {
        payload: { roomId },
      } = action;

      axios.patch(
        `${apiUrl}/rooms/${roomId}`,
        {
          newestMessage: action.payload,
        },
        apiConfig()
      );
    }
    return newState;
  },
};

const attachMiddleware = function(reducer) {
  return (..._props) => {
    return (state, action) => {
      let newState = reducer(state, action);

      return Object.entries(middlewares).reduce(
        (newState, [_name, middleware]) => {
          return middleware(state, action, newState);
        },
        newState
      );
    };
  };
};

export default attachMiddleware
