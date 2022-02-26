import io from 'socket.io-client'
import { ioUrl } from '../contexts/constants'

const socket = io(ioUrl, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log(`Io connected ${socket.id}`);
});

const useSocket = () => {
  // const [socket] = useState(() => getSocket());
  return socket;
}

export {
  useSocket
};
