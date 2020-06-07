import { createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api/user';

import { finishLoading, startLoading } from './loading';

const GET_USERINFO = 'userinfo/GET_USERINFO' as const;
const GET_USERINFO_SUCCESS = 'userinfo/GET_USERINFO_SUCCESS' as const;
const GET_USERINFO_FAILURE = 'userinfo/GET_USERINFO_FAILURE' as const;

export const getUserInfo = createAction(GET_USERINFO, (item: any) => item);

export function* userinfoSaga() {
  yield takeLatest(GET_USERINFO, getUserinfoSaga);
}

function* getUserinfoSaga(action) {
  yield put(startLoading(GET_USERINFO));
  try {
    const userinfo = yield call(api.getUser, action.payload);
    yield put({
      type: GET_USERINFO_SUCCESS,
      payload: userinfo.data,
    });
  } catch (error) {
    yield put({
      type: GET_USERINFO_FAILURE,
      payload: error,
      error: true,
    });
    yield put(finishLoading(GET_USERINFO));
  }
}

interface UserinfoState {
  userinfo: any;
  // 추후 수정
}

const initialState: UserinfoState = {
  userinfo: {},
};

const userinfo = (
  state = initialState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case GET_USERINFO_SUCCESS:
      return { ...state, userinfo: action.payload };
    default:
      return { ...state };
  }
};

export default userinfo;
