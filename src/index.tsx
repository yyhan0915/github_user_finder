import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import logo from './assets/logo.svg';
import { Image } from './components';
import * as styles from './index.module.css';
import store from './modules/store/store';

const App = () => (
  <Provider store={store}>
    <div className={styles.App}>
      <Image src={logo} alt="React logo" />
      hello world!
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot !== undefined) {
  module.hot.accept();
}
