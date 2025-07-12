import axios from 'axios';
import { useNotification } from '@/hooks';

export const initBackend = (errorHandler: (message?: string) => void) => {
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.response.use(
    res => res,
    err => {
      errorHandler(err?.response?.data?.message);
      throw err;
    }
  );

  return client;
};

export const useBackend = () => {
  const notification = useNotification();

  const onApiError = (message?: string) => {
    if (message) {
      return notification.error({ message });
    }
    notification.error({
      message: 'Ocurrió un error ineseperado',
      description: 'Contáctate con soporte',
    });
  };

  const api = initBackend(onApiError);

  return api;
};
