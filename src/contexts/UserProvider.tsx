import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiConfig, apiUrl } from './constants';
import styled from 'styled-components';
import { Spin } from 'antd';

const StyledContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  refreshToken: string;
}

interface LoginInfo {
  username: string;
  password: string;
}

interface RegisterInfo {
  username: string;
  password: string;
  email: string;
  avatar?: string;
}

interface UserContext {
  user: User;
  login: (data: LoginInfo) => Promise<any>;
  register: (data: RegisterInfo) => Promise<any>;
  signOut: () => void;
};

interface LoginResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
};

interface RegisterResponse {
    success: boolean;
    message: string;
    accessToken: string;
    // refreshToken: string;
};

interface Login {
  (data: LoginInfo): Promise<LoginResponse | void>;
};

interface Register {
  (data: RegisterInfo): Promise<RegisterResponse | void>
}

const UserContext = createContext<UserContext | undefined>(undefined);

function UserProvider({ children }: { children: JSX.Element}) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const interval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      navigate('/', {
        replace: true,
      });
    } else {
      navigate('/login');
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      interval.current = setInterval(() => {
        axios
          .post(
            `${apiUrl}/auth/refresh`,
            {
              token: user.refreshToken,
            },
            apiConfig()
          )
          .then((response) => {
            if (response.data.success) {
              localStorage.setItem('token', response.data.accessToken);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1800000);
    }
    return () => {
      clearInterval(interval.current as NodeJS.Timer);
    };
  }, [user]);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      const response = await axios.get(`${apiUrl}/auth`, apiConfig());
      if (response.data.success) {
        setUser(response.data.info);
      }
    } catch (error) {
      setUser(undefined);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const login: Login = async (data) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${apiUrl}/auth/login`,
        data
      );
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('token', response.data.accessToken);
        await getUser();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const register: Register = async (data) => {
    try {
      const response = await axios.post<RegisterResponse>(`${apiUrl}/auth/register`, data);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('token', response.data.accessToken);
        await getUser();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    try {
      localStorage.setItem('token', '');
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  const userContextData = { user, login, register, signOut } as UserContext;

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
export type {
  User
}
