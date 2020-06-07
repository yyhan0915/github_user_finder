import { createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api/user';

import { finishLoading, startLoading } from './loading';

const GET_USERS = 'userlist/GET_USERS' as const;
const GET_USERS_SUCCESS = 'userlist/GET_USERS_SUCCESS' as const;
const GET_USERS_FAILURE = 'userlist/GET_USERS_FAILURE' as const;

export const getUsers = createAction(GET_USERS, (item: any) => item);

export function* userlistSaga() {
  yield takeLatest(GET_USERS, getUsersSaga);
}

function* getUsersSaga(action) {
  yield put(startLoading(GET_USERS));
  try {
    const users = yield call(api.getUsers, action.payload);
    yield put({ type: GET_USERS_SUCCESS, payload: users.data });
  } catch (error) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: error,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

// github user type -> userlist
export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
} // 타입이 완벽하지 않음. 리포지토리 숫자는 어디서 구할 수 있을까? https://api.github.com/users/yyhan0915/repos

// userlist state type
interface UsersState {
  users: User[];
  lasItem: number;
}

// initial State of userlist
const initialState: UsersState = {
  users: [],
  lasItem: 0,
};

// reducer function
function userlist(
  state: UsersState = initialState,
  action: { type: string; payload: any },
): UsersState {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      const newUsers: User[] = [...state.users];
      return {
        ...state,
        users: [...newUsers, ...action.payload],
        lasItem: action.payload[action.payload.length - 1].id,
      };
    }
    default:
      return { ...state };
  }
}

export default userlist;
