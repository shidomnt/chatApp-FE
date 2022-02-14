import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { appReducer } from "../reducers/AppReducer";
import {
  ADD_MESSAGE,
  ADD_ROOM,
  apiConfig,
  apiUrl,
  SET_MESSAGES,
  SET_ROOMS,
} from "./constants";
import { UserContext } from "./UserProvider";

const AppContext = createContext();

const socket = io("https://chat-app-11231212312321.herokuapp.com", {
  transports: ["websocket"],
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
    socket.on("connect", () => {
      console.log(`Io connected ${socket.id}`);
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("update room", (userId, action) => {
        if (userId === user._id) {
          dispatch(action);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.on("update message", (action) => {
        dispatch(action);
      });
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

  // const getMessage = async (roomId, callback) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  //   const response = await axios.get(
  //     `${apiUrl}/messages/${roomId}`,
  //     apiConfig()
  //   );
  //   callback(response.data);
  //   dispatch({ type: SET_MESSAGES, payload: response.data });
  //   socket.emit("join room", { roomId });
  // };

  const getMessage = async (roomId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const response = await axios.get(
      `${apiUrl}/messages/${roomId}`,
      apiConfig()
    );
    dispatch({ type: SET_MESSAGES, payload: response.data });
    socket.emit("join room", { roomId });
  };

  // const createMessage = async (body, callback) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  //   const response = await axios.post(
  //     `${apiUrl}/messages/create`,
  //     body,
  //     apiConfig()
  //   );
  //   if (typeof callback === "function") {
  //     callback(response.data);
  //   }
  //   dispatch({ type: ADD_MESSAGE, payload: response.data });
  //   socket.emit("create message", {
  //     roomId: body.roomId,
  //     type: ADD_MESSAGE,
  //     payload: response.data,
  //   });
  // };
  const createMessage = async (body) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const response = await axios.post(
      `${apiUrl}/messages/create`,
      body,
      apiConfig()
    );
    // dispatch({ type: ADD_MESSAGE, payload: response.data });
    socket.emit("create message", {
      roomId: body.roomId,
      type: ADD_MESSAGE,
      payload: response.data,
    });
  };

  const createRoom = async (body) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const response = await axios.post(
      `${apiUrl}/rooms/create`,
      body,
      apiConfig()
    );
    // dispatch({ type: ADD_ROOM, payload: response.data });
    socket.emit("create room", {
      username: body.username,
      type: ADD_ROOM,
      payload: response.data,
    });
  };

  const leaveRoom = (roomId) => {
    socket.emit("leave room", { roomId });
  };

  const appContextData = {
    state,
    getMessage,
    createMessage,
    createRoom,
    leaveRoom,
  };

  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
