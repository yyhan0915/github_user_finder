import {
  CombinedState,
  Store as ReduxStore,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';

import { RootState, rootSaga } from '../reducers';
import { rootReducer } from '../reducers';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

// if (module.hot !== undefined) {
//   module.hot.accept(() => {
//     const nextRootReducer = combineReducers<CombinedState<RootState>>({
//       ...require('../reducers/root').default,
//     });

//     store.replaceReducer(nextRootReducer);
//   });
// }
