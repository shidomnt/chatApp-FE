import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { apiUrl } from "./constants";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user])

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("loi khong co token");
      }
      const response = await axios.get(`${apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setUser(response.data.info);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getUser(), []);

  const login = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/users/login`, data);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        await getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/users/register`, data);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userContextData = { user, login, register };

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
export { UserContext };
