import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import store from './store/store';
import './styles';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>GITHUB USER FINDER</title>
      </Helmet>
      <Route component={HomePage} path="/" exact />
      <Route component={UserPage} path="/:username/" />
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot !== undefined) {
  module.hot.accept();
}
