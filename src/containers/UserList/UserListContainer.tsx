import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/reducers/root';

import { UserList } from '../../components/UserList/UserList';
import { getUsers } from '../../modules/userlist';
import store from '../../store/store';

const { useEffect } = React;

const UserListContainer = () => {
    const dispatch = useDispatch();
    const { users, loadingUsers } = useSelector(
        ({ userlist, loading }: RootState) => ({
            lastItem: userlist.lasItem,
            loadingUsers: loading['userlist/GET_USERS'],
            users: userlist.users,
        }),
    );

    const handleScroll = React.useCallback(() => {
        console.log('작동시작...감시중');
        const body = document.querySelector('body');
        const checkState = store.getState().userlist.lasItem;
        if (body && body.scrollHeight <= body.scrollTop + body.clientHeight) {
            dispatch(getUsers(checkState));
        }
        console.log('작동함!!');
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const checkState = store.getState().userlist.lasItem;
        dispatch(getUsers(checkState));

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch]);

    return <UserList users={users} loadingUsers={loadingUsers} />;
};

export default UserListContainer;
