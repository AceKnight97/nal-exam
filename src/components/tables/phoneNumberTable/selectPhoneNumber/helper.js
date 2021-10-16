
import _ from 'lodash';
import fetchPhoneNumbers from '../../../../apollo/functions/fetch/fetchPhoneNumbers';

export const temp = '';

const getSelectData = (res = {}, state = {}) => {
  const newSelectData = _.map(res?.phoneNumbers || [], x => ({ label: x.number, value: x.id }));
  const oldSelectData = _.filter(state.selectData, x => x.isCheck);
  const selectData = _.uniqBy([...oldSelectData, ...newSelectData], x => x.value);
  // console.log({ newSelectData, oldSelectData, selectData });
  return selectData;
};

export const queryPhoneNumbers = async (searchText = '', country = '', countries = [], state = {}) => {
  const countryCode = _.find(countries, x => x.label === country)?.countryCode;
  const sendingData = { filter: { countryCode, searchText }, limit: 10 };
  // console.log({ sendingData, countryCode });
  try {
    const res = await fetchPhoneNumbers(sendingData);
    const selectData = getSelectData(res, state);
    // console.log({ res });
    return { selectData };
  } catch (error) {
    console.log('Failed to fetch phone numbers: ', error);
  }
  return {};
};
