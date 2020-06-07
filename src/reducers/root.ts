import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from '../modules/loading';
import userinfo, { userinfoSaga } from '../modules/userinfo';
import userlist, { userlistSaga } from '../modules/userlist';

const rootReducer = combineReducers({
    loading,
    userinfo,
    userlist,
});

export function* rootSaga() {
    yield all([userlistSaga(), userinfoSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
