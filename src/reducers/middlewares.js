import axios from 'axios';
import { apiConfig, apiUrl, UPDATE_NEWEST_MESSAGE } from '../contexts/constants'

const middlewares = {
  sortRoomList(_state, _action, newState) {
    const rooms = newState.rooms.sort((a, b) => {
      return new Date(b.newestMessage?.createdAt).getTime() - new Date(a.newestMessage?.createdAt).getTime();
    })
    return {
      ...newState,
      rooms
    }
  },

  updateNewestMessage(_state, action, newState) {
    if (action.type == UPDATE_NEWEST_MESSAGE) {
      const { payload: { roomId } } = action;

      axios.patch(`${apiUrl}/rooms/${roomId}`, {
        newestMessage: action.payload
      }, apiConfig())
    }
    return newState;
  }
}

export default (reducer) => {
  return (listMiddleware = []) => {

    return (state, action) => {
      let newState = reducer(state, action);

      listMiddleware.forEach(name => {
        newState = middlewares[name](state, action, newState);
      })

      return newState;
    }
  }
}
