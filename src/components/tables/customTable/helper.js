import _ from 'lodash';
import { PHONE_NUMBER_TYPES } from '../../../constants/myCustomer';

export const temp = '';

const {
  RANDOM, MANUAL,
} = PHONE_NUMBER_TYPES;


export const checkFullLastRow = (tempData = {}, tabledName = '') => {
  let isFullLastRow = true;
  const {
    chargeAmount, country, type, quantity, phoneNumbers, name,
  } = _.last(tempData) || {};
  switch (tabledName) {
    case 'topUpData':
      if (_.isNil(chargeAmount)) {
        isFullLastRow = false;
      }
      break;
    case 'phoneNumberData':
      if (!country || !type || type === RANDOM && !quantity || type === MANUAL && phoneNumbers?.length === 0) {
        isFullLastRow = false;
      }
      break;
    case 'unlimitedData':
      if (!name) {
        isFullLastRow = false;
      }
      break;
    case 'packageData':
      if (!name || _.isNil(quantity)) {
        isFullLastRow = false;
      }
      break;
    default:
      break;
  }
  // _.forEach(Object.values(obj), (x) => {
  //   if (!x || (typeof (x) === 'object' && _.isEmpty(x))) {
  //     isFullLastRow = false;
  //   }
  // });
  console.log({ isFullLastRow });
  return isFullLastRow;
};
