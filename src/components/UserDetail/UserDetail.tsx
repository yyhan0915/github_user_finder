import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import palette from '../../lib/styles/palette';
import { Repo, UserInfo } from '../../modules/userinfo';
import Responsive from '../common/Responsive';

const UserDetailBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const UserDetailHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 2.4rem;
        line-height: 1.5;
        margin-bottom: 2rem;
    }
`;

const UserDetailContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

export const UserDetail = ({
    loadingUserinfo,
    userinfo,
    repos,
}: {
    loadingUserinfo: boolean;
    userinfo: UserInfo;
    repos: Repo[];
}) => {
    const { name, avatar_url } = userinfo;

    // error handler
    if (!loadingUserinfo || !userinfo) {
        return null;
    }

    return (
        <UserDetailBlock>
            <Helmet>
                <title>{name} - GITHUB FINDER</title>
            </Helmet>
            <UserDetailHead>
                <h1>{name} </h1>
                <img
                    src={avatar_url}
                    width="200px"
                    height="200px"
                    alt="profile_picture"
                />
            </UserDetailHead>
            <UserDetailContent>
                <h3>Number of Repository : {repos.length}</h3>
                <h3>List of Repository</h3>
                <ul>
                    {repos.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))}
                </ul>
            </UserDetailContent>
        </UserDetailBlock>
    );
};
