export const apiUrl = "http://localhost:4000/api";

export const ioUrl = "http://localhost:4000/";

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
export const UPDATE_NEWEST_MESSAGE = "UPDATE_NEWEST_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const DELETE_ROOM = "DELETE_ROOM";
