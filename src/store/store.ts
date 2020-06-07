import {
  Store as ReduxStore,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';

import { rootReducer, rootSaga } from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const store: ReduxStore<Store> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

if (module.hot !== undefined) {
  module.hot.accept(() => {
    const nextRootReducer = combineReducers<Store>({
      ...require('../reducers/root').default,
    });

    store.replaceReducer(nextRootReducer);
  });
}

export default store;
