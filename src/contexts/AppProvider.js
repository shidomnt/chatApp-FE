import React, { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import appReducer from '../reducers/AppReducer';
import { SET_ROOMS } from './constants';
import { useUserContext } from '../hooks';
import { socket } from './socket';
import { getAllRoom } from './action';

const AppContext = createContext(null);
const DispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useUserContext();

  const [state, dispatch] = useReducer(appReducer, {
    rooms: [],
    messages: [],
  });

  useEffect(() => {
    if (user) {
      getAllRoom().then((response) => {
        dispatch({ type: SET_ROOMS, payload: response.data });
        navigate(`/rooms/${response.data[0]?._id ?? ''}`);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.on('update room', (allFriendId, action) => {
        if (allFriendId.includes(user._id)) {
          dispatch(action);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.on('update message', (action) => {
        dispatch(action);
      });
    }
  }, [user]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
    </DispatchContext.Provider>
  );
};

export { AppProvider, AppContext, DispatchContext };
