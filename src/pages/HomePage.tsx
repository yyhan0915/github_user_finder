import * as React from 'react';

import { Header } from '../components';
import UserListContainer from '../containers/UserList/UserListContainer';

const HomePage = () => {
    return (
        <>
            <Header back={0} />
            <UserListContainer />
        </>
    );
};

export default HomePage;
