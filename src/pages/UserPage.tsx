import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from '../components';
import { UserDetailContainer } from '../containers/UserDetail/UserDetailContainer';
interface MatchParams {
    username: string;
}
const UserPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const { username } = match.params;

    return (
        <div>
            <Header back={1} />
            <UserDetailContainer username={username} />
        </div>
    );
};

export default UserPage;
