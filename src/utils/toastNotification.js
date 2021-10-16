import { notification } from 'antd';

let handleShowMes;

export const showFailedMsg = (message = '', duration = 3, description = undefined) => {
  notification.destroy();
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.error({
      message,
      description,
      placement: 'bottomLeft',
      duration,
    });
  }, 300);
};

export const showSuccessMsg = (message = '', duration = 3, description = undefined) => {
  notification.destroy();
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.success({
      message,
      description,
      placement: 'bottomLeft',
      duration,
    });
  }, 300);
};
