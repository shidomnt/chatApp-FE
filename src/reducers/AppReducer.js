import { SET_ROOMS } from "../contexts/constants";

export const appReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ROOMS:
      return { ...state, rooms: payload };
    default:
      throw new Error("Action not found!");
  }
};
