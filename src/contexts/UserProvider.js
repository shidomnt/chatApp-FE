import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiConfig, apiUrl } from "./constants";
import styled from "styled-components";
import { Spin } from "antd";

const StyledContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      navigate("/", {
        replace: true,
      });
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  }, [user]);

  // useEffect(() => {
  //   var intervalId;
  //   if (user) {
  //     intervalId = setInterval(() => {
  //       axios
  //         .post(
  //           `${apiUrl}/auth/refresh`,
  //           {
  //             token: user.refreshToken,
  //           },
  //           apiConfig()
  //         )
  //         .then((response) => {
  //           if (response.data.success) {
  //             localStorage.setItem("token", response.data.accessToken);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }, 5000);
  //   }
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [user]);

  useEffect(() => getUser(), []);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(`${apiUrl}/auth`, apiConfig());
      if (response.data.success) {
        setUser(response.data.info);
      }
    } catch (error) {
      setUser(null);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, data);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        await getUser();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, data);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        await getUser();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async () => {
    try {
      localStorage.setItem("token", "");
      await getUser()
    } catch(err) {
      console.log(err);
    }
  }
  const userContextData = { user, login, register, signOut };

  return (
    <UserContext.Provider value={userContextData}>
      {isLoading ? (
        <StyledContainer>
          <Spin />
        </StyledContainer>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
