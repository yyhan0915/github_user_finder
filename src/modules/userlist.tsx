import { createAction } from 'redux-actions';
import { TakeableChannel } from 'redux-saga';
import { ForkEffect, call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api/user';

import { finishLoading, startLoading } from './loading';

const GET_USERS = 'userlist/GET_USERS' as const;
const GET_USERS_SUCCESS = 'userlist/GET_USERS_SUCCESS' as const;
const GET_USERS_FAILURE = 'userlist/GET_USERS_FAILURE' as const;

export const getUsers = createAction(GET_USERS, (item: any) => item);

export function* userlistSaga(): Generator<ForkEffect<never>, void> {
    yield takeLatest(
        (GET_USERS as unknown) as TakeableChannel<unknown>,
        getUsersSaga,
    );
}

function* getUsersSaga(action: ReturnType<typeof getUsers>) {
    yield put(startLoading(GET_USERS));
    try {
        const users = yield call(api.getUsers, action.payload);
        yield put({ type: GET_USERS_SUCCESS, payload: users.data });
    } catch (error) {
        yield put({
            error: true,
            payload: error,
            type: GET_USERS_FAILURE,
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
}

// userlist state type
interface UsersState {
    users: User[];
    lasItem: number;
}

// initial State of userlist
const initialState: UsersState = {
    lasItem: 0,
    users: [],
};

// reducer function
function userlist(
    state: UsersState = initialState,
    action: { type: string; payload: any },
): UsersState {
    switch (action.type) {
        case GET_USERS_SUCCESS: {
            return {
                ...state,
                lasItem: action.payload[action.payload.length - 1].id,
                users: [...state.users, ...action.payload],
            };
        }
        default:
            return { ...state };
    }
}

export default userlist;
