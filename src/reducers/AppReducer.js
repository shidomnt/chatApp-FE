import {
  SET_ROOMS,
  SET_MESSAGES,
  ADD_MESSAGE,
  ADD_ROOM,
} from "../contexts/constants";

export const appReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ROOMS:
      return { ...state, rooms: payload };
    case SET_MESSAGES:
      return { ...state, messages: payload };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case ADD_ROOM:
      return { ...state, rooms: [...state.rooms, payload] };
    default:
      throw new Error("Action not found!");
  }
};
