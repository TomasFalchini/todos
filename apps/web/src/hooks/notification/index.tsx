import { App } from 'antd';

export const useNotification = () => {
  const app = App.useApp();
  return app.notification;
};

export const useMessage = () => {
  const app = App.useApp();
  return app.message;
};
