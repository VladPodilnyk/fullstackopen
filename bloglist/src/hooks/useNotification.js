import { useState } from 'react';

const timeout = 5000;

export const useNotification = () => {
  const [isVisible, setVisibility] = useState(false);
  const [notificationType, setType] = useState('');
  const [message, setMessage] = useState('');

  const reset = () => {
    setVisibility(false);
    setType('');
    setMessage('');
  }

  const showError = (errorMessage) => {
    setVisibility(true);
    setType('error');
    setMessage(errorMessage);

    setTimeout(
      reset,
      timeout
    );
  }

  const showNotification = (message) => {
    setVisibility(true);
    setType('notification');
    setMessage(message);

    setTimeout(
      reset,
      timeout
    );
  }

  return {
    isVisible,
    notificationType,
    message,
    showNotification,
    showError
  }
}