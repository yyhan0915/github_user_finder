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

interface Repo {
    name: string;
    html_url: string;
}
interface UserinfoState {
    userinfo: {
        login: string;
        name: string;
        html_url: string;
        avatar_url: string;
    };
    repos: Repo[];
}

const initialState: UserinfoState = {
    userinfo: { login: '', name: '', html_url: '', avatar_url: '' },
    repos: [{ name: '', html_url: '' }],
};

const userinfo = (
    state = initialState,
    action: { type: any; payload: any },
) => {
    switch (action.type) {
        case GET_USERINFO_SUCCESS:
            return {
                ...state,
                userinfo: action.payload.userinfo,
                repos: [...state.repos, ...action.payload.repos],
            };
        default:
            return { ...state };
    }
};

export default userinfo;
