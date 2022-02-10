import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { appReducer } from '../reducers/AppReducer';
import {
  ADD_MESSAGE,
  apiConfig,
  apiUrl,
  SET_MESSAGES,
  SET_ROOMS,
} from './constants';
import { UserContext } from './UserProvider';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  let navigate = useNavigate();

  // userContext
  const { user } = useContext(UserContext);

  const [state, dispatch] = useReducer(appReducer, {
    rooms: [],
    messages: [],
  });

  useEffect(() => {
    if (user) {
      getAllRoom();
    }
  }, [user]);

  const getAllRoom = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const response = await axios.get(`${apiUrl}/rooms`, apiConfig());
    dispatch({ type: SET_ROOMS, payload: response.data });
  };

  const getMessage = async (roomId, callback) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const response = await axios.get(
      `${apiUrl}/messages/${roomId}`,
      apiConfig()
    );
    console.log(response.data);
    callback(response.data);
    dispatch({ type: SET_MESSAGES, payload: response.data });
  };

  const createMessage = async (body, callback) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const response = await axios.post(
      `${apiUrl}/messages/create`,
      body,
      apiConfig()
    );
    callback(response.data);
    dispatch({ type: ADD_MESSAGE, payload: response.data });
  };

  const appContextData = { state, getMessage, createMessage };
  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
