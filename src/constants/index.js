const AppFlowActions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_COMPLETE: 'LOGIN_COMPLETE',

  GET_ALL_DATA_REQUEST: 'GET_ALL_DATA_REQUEST',
  GET_ALL_DATA_COMPLETE: 'GET_ALL_DATA_COMPLETE',

  RELOAD_PAGE_REQUEST: 'RELOAD_PAGE_REQUEST',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
};

export const EMITTER_CONSTANTS = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
};

export default AppFlowActions;


export const NORMAL_CELL_TYPES = {
  DATE: 'DATE',
  BUTTON: 'BUTTON',
};

export const TEXT_MESSAGES = {
  NO_TABLE_DATA: 'There is no data',
};

export const ADDRESS_SIGNS = {
  CitySign1: 'locality',
  CitySign2: 'sublocality_level_1',
  StateSign: 'administrative_area_level_1',
  CountrySign: 'country',
  PostCodeSign: 'postal_code',
};

export const COUNTRY_SHORT_DATA = [
  'AR', 'CA', 'ES', 'TW', 'AE', 'GB', 'US',
];
export const COUNTRY_DATA = [
  'Argentina', 'Canada', 'Spain', 'Taiwan', 'United Arab Emirates', 'United Kingdom', 'United States',
];

export const CONFIRMATION_LAYOUT_TYPES = {
  SAVE_CONTRACT_LACK_OF_DATA: 'SAVE_CONTRACT_LACK_OF_DATA',
};
