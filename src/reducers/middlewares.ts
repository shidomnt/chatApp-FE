import axios from 'axios';
import { apiConfig, apiUrl, UPDATE_NEWEST_MESSAGE } from '../contexts/constants'
import { State, Action, Reducer } from './AppReducer'

interface ApplyMiddleWare<Type> {
  (middlewares: (keyof MiddlewareObj)[]): Reducer<Type>
}

interface Middleware<Type> {
  (reducer: Reducer<Type>): ApplyMiddleWare<Type>
};

interface MiddlewareFC {
  (state: State, action: Action, newState: State) : State
};

interface MiddlewareObj {
  sortRoomList: MiddlewareFC;
  updateNewestMessage: MiddlewareFC;
}

const middlewares: MiddlewareObj = {
  sortRoomList(_state: State, _action: Action, newState: State) {
    const rooms = newState.rooms.sort((a, b) => {
      return new Date(b.newestMessage?.createdAt).getTime() - new Date(a.newestMessage?.createdAt).getTime();
    })
    return {
      ...newState,
      rooms
    }
  },

  updateNewestMessage(_state: State, action: Action, newState: State) {
    if (action.type === UPDATE_NEWEST_MESSAGE) {
      const { payload: { roomId } } = action;

      axios.patch(`${apiUrl}/rooms/${roomId}`, {
        newestMessage: action.payload
      }, apiConfig())
    }
    return newState;
  }
}

const middleware: Middleware<State> = (reducer) => {
  return (listMiddleware = []) => {
    return (state, action) => {
      let newState = reducer(state, action);

      listMiddleware.forEach(name  => {
        newState = middlewares[name](state, action, newState);
      })

      return newState;
    }
  }
}

export default middleware
