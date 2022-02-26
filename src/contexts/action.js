import {
  ADD_MESSAGE,
  ADD_ROOM,
  DELETE_MESSAGE,
  DELETE_ROOM,
  SET_MESSAGES,
  UPDATE_NEWEST_MESSAGE,
} from './constants';

const getMessage = async (roomId) => {
  const response = await axios.get(`${apiUrl}/messages/${roomId}`, apiConfig());
  dispatch({ type: SET_MESSAGES, payload: response.data });
  socket.emit('join room', { roomId });
};

const createMessage = async (body) => {
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

const deleteMessage = async (body) => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
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
};
const createRoom = async (body) => {
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

const deleteRoom = async (idRoom) => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
  const response = await axios.delete(`${apiUrl}/rooms/${idRoom}`, apiConfig());
  dispatch({ type: DELETE_ROOM, payload: response.data });
  navigate(`/rooms`);
};

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

const leaveRoom = () => {
  socket.emit('leave room', { roomId });
};

