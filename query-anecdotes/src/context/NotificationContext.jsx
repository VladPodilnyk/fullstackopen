import { useContext } from 'react';
import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  console.log('debug notifiction state = ', state);
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAN_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
};

export const useNotification = () => {
  const notificationWithDispatch = useContext(NotificationContext);
  return notificationWithDispatch[0];
};

export const useNotificationDispatcher = () => {
  const notificationWithDispatch = useContext(NotificationContext);
  return notificationWithDispatch[1];
}
