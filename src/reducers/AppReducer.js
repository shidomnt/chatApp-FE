import {
  SET_ROOMS,
  SET_MESSAGES,
  ADD_MESSAGE,
  ADD_ROOM,
  UPDATE_NEWEST_MESSAGE,
} from "../contexts/constants";
import middlewares from './middlewares';

const appReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ROOMS:
      return { ...state, rooms: payload };
    case SET_MESSAGES:
      return { ...state, messages: payload };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case ADD_ROOM:
      return { ...state, rooms: [payload, ...state.rooms] };
    case UPDATE_NEWEST_MESSAGE:
      const rooms = state.rooms.map(room => room._id === payload.roomId ? {...room, newestMessage: {...payload}} : room);
      return { ...state, rooms }
    default:
      throw new Error("Action not found!");
  }
};

export default middlewares(appReducer)(['sortRoomList', 'updateNewestMessage']);
