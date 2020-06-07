import { css } from '@emotion/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import BarLoader from 'react-spinners/ClipLoader';
import { User } from 'src/modules/userlist';
import styled from 'styled-components';

import { Button, Image } from '../';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const UsersListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const UserItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    display: flex;
    img {
        box-shadow: 0px 0px 20px black;
    }
    div {
        display: block;
        margin: 0 3rem;
    }
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    const { login, avatar_url, id } = user;

    return (
        <UserItemBlock>
            <Image
                src={avatar_url}
                width="120px"
                height="120px"
                style={{ borderRadius: '50%' }}
            />
            <div>
                <h2>
                    <Link to={`/${login}`}>{login}</Link>
                </h2>
                <h3>GITHUB USER ID : {id}</h3>
                <Button cyan={1} to={`/${login}`}>
                    See Profile
                </Button>
            </div>
        </UserItemBlock>
    );
};

const override = css`
    display: block;
    margin: 0 auto;
    border-color: ${palette.cyan[3]};
`;
interface UserListContainerProps {
    users: User[];
    loadingUsers: boolean;
}

export const UserList: React.FC<UserListContainerProps> = ({
    loadingUsers,
    users,
}) => {
    const loadingSentence = 'Loading...';

    return (
        <UsersListBlock>
            <h2>LIST OF USERS</h2>
            {!users && <div>Ooops!! someting is wrong...</div>}
            {users && (
                <ul>
                    {users.map(user => (
                        <UserItem user={user} key={user.login} />
                    ))}
                </ul>
            )}
            {loadingUsers && (
                <div
                    style={{
                        display: 'block',
                        margin: '15px auto',
                        padding: '10px',
                        fontSize: '1.5rem',
                        color: `${palette.cyan[5]}`,
                        textAlign: 'center',
                    }}
                >
                    <BarLoader css={override} size={90} color={'#123abc'} />
                    {loadingSentence}
                </div>
            )}
        </UsersListBlock>
    );
};
