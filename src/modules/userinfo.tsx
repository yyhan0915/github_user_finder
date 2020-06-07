import { createAction } from 'redux-actions';
import { TakeableChannel } from 'redux-saga';
import { ForkEffect, call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api/user';

import { finishLoading, startLoading } from './loading';

const GET_USERINFO = 'userinfo/GET_USERINFO';
const GET_USERINFO_SUCCESS = 'userinfo/GET_USERINFO_SUCCESS' as const;
const GET_USERINFO_FAILURE = 'userinfo/GET_USERINFO_FAILURE' as const;

export const getUserInfo = createAction(GET_USERINFO, (item: any) => item);

export function* userinfoSaga(): Generator<ForkEffect<never>, void> {
    yield takeLatest(
        (GET_USERINFO as unknown) as TakeableChannel<unknown>,
        getUserinfoSaga,
    );
}

function* getUserinfoSaga(action: { payload: string }) {
    yield put(startLoading(GET_USERINFO));
    try {
        const userinfo = yield call(api.getUser, action.payload);
        const repos = yield call(api.getRepos, action.payload);
        yield put({
            type: GET_USERINFO_SUCCESS,
            payload: { userinfo: userinfo.data, repos: repos.data },
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
export interface UserInfo {
    login: string;
    name: string;
    html_url: string;
    avatar_url: string;
}
export interface Repo {
    name: string;
    html_url: string;
}
interface UserinfoState {
    userinfo: UserInfo;
    repos: Repo[];
}

const initialState: UserinfoState = {
    repos: [],
    userinfo: { login: '', name: '', html_url: '', avatar_url: '' },
};

const userinfo = (
    state = initialState,
    action: { type: any; payload: any },
) => {
    switch (action.type) {
        case GET_USERINFO_SUCCESS:
            return {
                ...state,
                repos: [...state.repos, ...action.payload.repos],
                userinfo: action.payload.userinfo,
            };
        default:
            return { ...state };
    }
};

export default userinfo;
