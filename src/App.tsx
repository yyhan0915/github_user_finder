import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

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

export default App;
