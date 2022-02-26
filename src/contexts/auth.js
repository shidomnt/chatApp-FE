import axios from 'axios';
import { apiUrl, apiConfig } from '../contexts/constants';

let handleAuthStateChanged = () => {};
let intervalId;

const auth = {
  onAuthStateChanged: (func) => {
    if (typeof func === 'function') {
      handleAuthStateChanged = func;
    } else {
      throw new Error('auth.onAuthStateChanged only accept type function');
    }
  },
};

const getUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth`, apiConfig());
    if (response.data.success) {
      handleAuthStateChanged(response.data.info);
      return response.data.info;
    }
  } catch (error) {
    console.log(error);
    handleAuthStateChanged(null);
    return null;
  }
};

const login = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, data);
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

const register = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, data);
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

const signOut = async () => {
  localStorage.setItem('token', '');
  await getUser();
};

const refresh = {
  start: (user) => {
    intervalId = setInterval(() => {
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
  },
  stop: () => {
    clearInterval(intervalId);
  },
};

export { register, login, signOut, refresh, getUser, auth };
