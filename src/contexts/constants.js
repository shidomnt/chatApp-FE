export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/api"
    : "https://chat-app-11231212312321.herokuapp.com/api";

export const apiConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const SET_ROOMS = "SET_ROOMS";
export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_ROOM = "ADD_ROOM";
