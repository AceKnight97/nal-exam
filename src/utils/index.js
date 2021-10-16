
import { notification } from 'antd';
import moment from 'moment';

export const getFullName = (x = {}) => `${x.firstName || ''} ${x.lastName || ''}`;

export const isValidEmail = (email = '') => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
};

export const toggleArr = (item = '', arr = []) => {
  const array = [...arr]; // make a separate copy of the array
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
    return array;
  }
  array.push(item);
  return array;
};

export const normalizeString = (str = '') => {
  if (str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  return '';
};

let handleShowMes;

export const showFailedMsg = (message = '', description = undefined, className = '') => {
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.error({
      message,
      description,
      placement: 'bottomLeft',
      duration: 3,
      className,
    });
  }, 300);
};

export const showSuccessMsg = (message = '', description = undefined, className = '') => {
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.success({
      message,
      description,
      placement: 'bottomLeft',
      duration: 3,
      className,
    });
  }, 300);
};

export const showWarningMsg = (message = '', description = undefined, className = '') => {
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.warning({
      message,
      description,
      placement: 'bottomLeft',
      duration: 3,
      className,
    });
  }, 300);
};

export const mutateDate = (date = undefined) => {
  if (!date) {
    return undefined;
  }
  return moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : undefined;
};

export const mutateDateTime = (dateTime = undefined) => {
  if (!dateTime) {
    return undefined;
  }
  return moment(dateTime).isValid() ? moment(dateTime).toISOString() : undefined;
};
