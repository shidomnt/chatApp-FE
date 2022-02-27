import { useContext } from 'react'
import { AppContext, DispatchContext } from '../contexts/AppProvider';
import { UserContext } from '../contexts/UserProvider';


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


export {
  useAppContext,
  useAppDispatch,
  useUserContext
};
