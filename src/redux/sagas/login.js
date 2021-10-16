import {
  put, call, take, fork,
} from 'redux-saga/effects';

import _ from 'lodash';
import { LOGIN_URL } from '../../services/config';
import auth from '../../utils/auth';
import AppFlowActions from '../../constants';

// import login from '../reducers/login';
import fetchClient from '../../services/restApi/fetch-client';

function fetchUser(data) {
  const { userName, passWord } = data;
  try {
    const options = {
      url: LOGIN_URL,
      method: 'POST',
      body: { userName, passWord },
    };

    return fetchClient(options);
  } catch (error) {
    return null;
  }
}
/**
 * Log in saga
 */

export function* loginRequest() {
  const INFINITE = true;
  while (INFINITE) {
    const request = yield take(AppFlowActions.LOGIN_REQUEST);
    const { data } = request;
    const result = {
      isSuccess: true, user: _.cloneDeep(data.me), accessToken: data.accessToken,
      // photo: data.photo || '',
    };
    console.log({ result });
    auth.login(result);
    yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: result });
    // if (result.isSuccess === true) {
    //   yield put({ type: AppFlowActions.GET_ALL_DATA_REQUEST });
    // }
  }
}


export default function* loginFlow() {
  yield fork(loginRequest);
}
