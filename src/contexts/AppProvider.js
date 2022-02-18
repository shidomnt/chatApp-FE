import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { useNavigate } from 'react-router-dom';

import appReducer from '../reducers/AppReducer';
import {
  ADD_MESSAGE,
  ADD_ROOM,
  apiConfig,
  apiUrl,
  SET_MESSAGES,
  SET_ROOMS,
  UPDATE_NEWEST_MESSAGE,
} from './constants';
import { useSocket, useUserContext } from '../hooks'

const AppContext = createContext(null);
const DispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const socket = useSocket();

  const { user } = useUserContext();

  const [state, dispatch] = useReducer(appReducer, {
    rooms: [],
    messages: [],
  });

  useEffect(() => {
    if (user) {
      const getAllRoom = async () => {
        const response = await axios.get(`${apiUrl}/rooms`, apiConfig());
        dispatch({ type: SET_ROOMS, payload: response.data });
        navigate(`/rooms/${response.data[0]?._id ?? ''}`);
      };
      getAllRoom();
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
  }, [user, socket]);

  useEffect(() => {
    if (user) {
      socket.on('update message', (action) => {
        console.log(action);
        dispatch(action);
      });
    }
  }, [user, socket]);

  const getMessage = useCallback(async (roomId) => {
    const response = await axios.get(
      `${apiUrl}/messages/${roomId}`,
      apiConfig()
    );
    dispatch({ type: SET_MESSAGES, payload: response.data });
    socket.emit('join room', { roomId });
  }, [socket]);

  const createMessage = useCallback(async (body) => {
    const response = await axios.post(
      `${apiUrl}/messages/create`,
      body,
      apiConfig()
    );
    // dispatch({ type: ADD_MESSAGE, payload: response.data });
    socket.emit('create message', {
      roomId: body.roomId,
      type: ADD_MESSAGE,
      payload: response.data,
    });
    socket.emit('update newest message', {
      roomId: body.roomId,
      type: UPDATE_NEWEST_MESSAGE,
      payload: response.data,
    });
  }, [socket]);

  const createRoom = useCallback(async (body) => {
    const response = await axios.post(
      `${apiUrl}/rooms/create`,
      body,
      apiConfig()
    );
    // dispatch({ type: ADD_ROOM, payload: response.data });
    socket.emit('create room', {
      friendNameList: [...body.friendNameList, user.username],
      type: ADD_ROOM,
      payload: response.data,
    });
    navigate(`/rooms/${response.data._id}`);
  }, [socket, user]);

  const invite = useCallback(async (body) => {
    const response = await axios.post(
      `${apiUrl}/rooms/invite`,
      body,
      apiConfig()
    );
    socket.emit('create room', {
      friendNameList: body.friendNameList,
      type: ADD_ROOM,
      payload: response.data,
    });
  }, [socket]);

  const appContextData = {
    state,
    getMessage,
    createMessage,
    createRoom,
    invite,
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
    </DispatchContext.Provider>
  );
};

export { AppProvider, AppContext, DispatchContext };
