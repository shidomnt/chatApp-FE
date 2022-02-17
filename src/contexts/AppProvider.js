import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import appReducer from '../reducers/AppReducer';
import {
  ADD_MESSAGE,
  ADD_ROOM,
  apiConfig,
  apiUrl,
  ioUrl,
  SET_MESSAGES,
  SET_ROOMS,
  UPDATE_NEWEST_MESSAGE,
} from './constants';
import { UserContext } from './UserProvider';

const AppContext = createContext(null);

const socket = io(ioUrl, {
  transports: ['websocket'],
});

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

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Io connected ${socket.id}`);
    });
  }, []);

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
        console.log(action);
        dispatch(action);
      });
    }
  }, [user]);

  const getAllRoom = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const response = await axios.get(`${apiUrl}/rooms`, apiConfig());
    dispatch({ type: SET_ROOMS, payload: response.data });
    navigate(`/rooms/${response.data[0]?._id ?? ''}`);
  };

  /**
   * @type {(roomId: string) => void}
   */
  const getMessage = async (roomId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const response = await axios.get(
      `${apiUrl}/messages/${roomId}`,
      apiConfig()
    );
    dispatch({ type: SET_MESSAGES, payload: response.data });
    socket.emit('join room', { roomId });
  };

  /**
   * @type {(body: { roomId: string, content: string }) => void}
   */
  const createMessage = async (body) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
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
  };

  /**
   * @type {(body: {name: string, friendNameList: string[]}) => void}
   * 
   */
  const createRoom = async (body) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
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
  };

  /**
   * @type {(body: {name: string, friendNameList: string[]}) => void}
   *
   */
  const invite = async (body) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
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
  };

  /**
   * @type {(roomId: string) => void}
   *
   */
  let leaveRoom = (roomId) => {
    socket.emit('leave room', { roomId });
  };

  const appContextData = {
    state,
    getMessage,
    createMessage,
    createRoom,
    leaveRoom,
    invite,
  };

  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
