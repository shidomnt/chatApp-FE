import axios from 'axios';
import {
  ADD_MESSAGE,
  ADD_ROOM,
  DELETE_MESSAGE,
  UPDATE_NEWEST_MESSAGE,
  apiUrl,
  apiConfig
} from './constants';

import { socket } from './socket';

const getAllRoom = async () => {
  const response = await axios.get(`${apiUrl}/rooms`, apiConfig());
  return response;
};

const getMessage = async (roomId) => {
  const response = await axios.get(`${apiUrl}/messages/${roomId}`, apiConfig());
  socket.emit('join room', { roomId });
  return response.data;
};

const createMessage = async (body) => {
  const response = await axios.post(
    `${apiUrl}/messages/create`,
    body,
    apiConfig()
  );
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
  return response.data;
};

const deleteMessage = async (body) => {
  const response = await axios.delete(
    `${apiUrl}/messages/${body.idMessage}`,
    apiConfig()
  );
  socket.emit('delete message', {
    roomId: body.roomId,
    type: DELETE_MESSAGE,
    payload: response.data,
  });
  socket.emit('update newest message', {
    roomId: body.roomId,
    type: UPDATE_NEWEST_MESSAGE,
    payload: response.data,
  });
  return response.data;
};

const createRoom = async (body, user) => {
  const response = await axios.post(
    `${apiUrl}/rooms/create`,
    body,
    apiConfig()
  );
  socket.emit('create room', {
    friendNameList: [...body.friendNameList, user.username],
    type: ADD_ROOM,
    payload: response.data,
  });
  return response.data;
};

const deleteRoom = async (idRoom) => {
  const response = await axios.delete(`${apiUrl}/rooms/${idRoom}`, apiConfig());
  return response.data;
};

const invite = async (body) => {
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
  return response.data;
};

const leaveRoom = (roomId) => {
  socket.emit('leave room', { roomId });
};

export {
  getAllRoom,
  getMessage,
  createMessage,
  deleteMessage,
  createRoom,
  deleteRoom,
  leaveRoom,
  invite,
};
