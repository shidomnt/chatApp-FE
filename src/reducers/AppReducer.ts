import {
  SET_ROOMS,
  SET_MESSAGES,
  ADD_MESSAGE,
  ADD_ROOM,
  UPDATE_NEWEST_MESSAGE,
} from "../contexts/constants";
import { User } from "../contexts/UserProvider";
import middlewares from './middlewares';

interface Message {
  _id: string,
  content: string,
  userId: string,
  roomId: string,
  user?: User,
  createdAt: string,
  updatedAt: string,
};

interface Room {
  _id: string,
  name: string,
  newestMessage: Message,
  createdAt: string,
  updatedAt: string,
};

interface State {
  rooms: Room[],
  messages: Message[],
};

interface Action {
  type: string,
  payload: any
};

interface Reducer<State> {
  (state: State, action: Action): State
}

const appReducer: Reducer<State> = (state: State, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ROOMS:
      return { ...state, rooms: payload };
    case SET_MESSAGES:
      return { ...state, messages: payload };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case ADD_ROOM:
      return { ...state, rooms: [payload, ...state.rooms] };
    case UPDATE_NEWEST_MESSAGE:
      const rooms = state.rooms.map(room => room._id === payload.roomId ? {...room, newestMessage: {...payload}} : room);
      return { ...state, rooms }
    default:
      throw new Error("Action not found!");
  }
};

export default middlewares(appReducer)(['sortRoomList', 'updateNewestMessage']);
export type {
  State,
  Action,
  Reducer,
  Message,
  Room,
}
