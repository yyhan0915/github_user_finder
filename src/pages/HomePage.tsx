import * as React from 'react';

import { Header } from '../components';
import UserListContainer from '../containers/UserList/UserListContainer';

const HomePage = () => {
  return (
    <>
      <Header />
      <UserListContainer />
    </>
  );
};

export default HomePage;
