import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Spin } from 'antd';
import { getUser, refresh, auth } from './auth'

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
    auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        navigate('/', {
          replace: true,
        });
      } else {
        setUser(null);
        navigate('/login');
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      refresh.start(user);
    }
    return () => {
      refresh.stop();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>
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
