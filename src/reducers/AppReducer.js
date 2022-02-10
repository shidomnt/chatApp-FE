import { SET_ROOMS, SET_MESSAGES } from "../contexts/constants";

export const appReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ROOMS:
      return { ...state, rooms: payload };
    case SET_MESSAGES:
      return { ...state, messages: payload };
    default:
      throw new Error("Action not found!");
  }
};
