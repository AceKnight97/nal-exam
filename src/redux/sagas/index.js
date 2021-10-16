import { fork } from 'redux-saga/effects';
import loginFlow from './login';

export default function* root() {
  yield fork(loginFlow);
}
