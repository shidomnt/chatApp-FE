import axios from 'axios';
import React, {
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { useNavigate } from 'react-router-dom';

import appReducer, { Action, Message, Room, State } from '../reducers/AppReducer';
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
import { UserContext } from './UserProvider';

type Invite = (body: { roomId: string, friendNameList: string[]}) => Promise<void>;
type CreateRoom = (body: { name: string, friendNameList: string[]}) => Promise<void>;
type CreateMessage = (body: { roomId: string, content: string}) => Promise<void>;
type GetMessage = (roomId: string) => Promise<void>;

interface AppContext {
    state: State;
    getMessage: GetMessage;
    createMessage: CreateMessage;
    createRoom: CreateRoom;
    invite: Invite;
}

const AppContext = createContext<AppContext | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

const AppProvider = ({ children }: { children: JSX.Element}) => {
  const navigate = useNavigate();
  const socket = useSocket();

  const { user } = useUserContext() as UserContext;

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

  const getMessage: GetMessage = useCallback(async (roomId) => {
    const response = await axios.get<Message[]>(
      `${apiUrl}/messages/${roomId}`,
      apiConfig()
    );
    dispatch({ type: SET_MESSAGES, payload: response.data });
    socket.emit('join room', { roomId });
  }, [socket]);

  const createMessage: CreateMessage = useCallback(async (body) => {
    const response = await axios.post<Message>(
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

  const createRoom: CreateRoom = useCallback(async (body) => {
    const response = await axios.post<Room>(
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

  const invite: Invite = useCallback(async (body) => {
    const response = await axios.post<Room>(
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
