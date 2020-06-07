import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RootState } from 'src/reducers';
import styled from 'styled-components';

import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const UserDetailBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const UserDetailHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const UserDetailContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

export const UserDetail = ({ loadingUserinfo, userinfo, repos }) => {
    const { name, avatar_url, login, html_url } = userinfo;

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
                <h1>{name}</h1>
                <img src={avatar_url} with="200px" height="200px" />
            </UserDetailHead>
            <UserDetailContent>
                <h2>Number of Repository : {repos.length}</h2>
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
