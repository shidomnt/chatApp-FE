import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { appReducer } from "../reducers/AppReducer";
import { apiConfig, apiUrl, SET_ROOMS } from "./constants";
import { UserContext } from "./UserProvider";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  let navigate = useNavigate();

  // userContext
  const { user } = useContext(UserContext);

  const [state, dispatch] = useReducer(appReducer, {
    rooms: [],
    activeRoom: null,
    messages: [],
  });

  useEffect(() => {
    if (user) {
      getAllRoom();
    }
  }, [user]);

  const getAllRoom = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const response = await axios.get(`${apiUrl}/rooms`, apiConfig());
    dispatch({ type: SET_ROOMS, payload: response.data });
  };

  const appConetextData = {state};
  return (
    <AppContext.Provider value={appConetextData}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
