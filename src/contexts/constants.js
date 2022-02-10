export const apiUrl = "http://localhost:4000/api";

export const apiConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const SET_ROOMS = "SET_ROOMS";
