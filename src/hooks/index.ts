import io from 'socket.io-client'
import { useContext } from 'react'
import { ioUrl } from '../contexts/constants'
import { AppContext, DispatchContext } from '../contexts/AppProvider';
import { UserContext } from '../contexts/UserProvider';

const socket = io(ioUrl, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log(`Io connected ${socket.id}`);
});


const useAppContext = () => {
  const appState = useContext(AppContext);
  return appState;
}

const useUserContext = () => {
  const userState = useContext(UserContext);
  return userState;
}

const useAppDispatch = () => {
  const dispatch = useContext(DispatchContext);
  return dispatch;
}

const useSocket = () => {
  // const [socket] = useState(() => getSocket());
  return socket;
}

export {
  useSocket,
  useAppContext,
  useAppDispatch,
  useUserContext
}
