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
        const body = document.querySelector('body');
        const checkState = store.getState().userlist.lasItem;
        if (body && body.scrollHeight <= body.scrollTop + body.clientHeight) {
            const fn = async () => {
                try {
                    dispatch(getUsers(checkState));
                } catch (error) {
                    console.log(error);
                }
            };
            fn();
        }
    }, [getUsers]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const checkState = store.getState().userlist.lasItem;
        const fn = async () => {
            try {
                dispatch(getUsers(checkState));
            } catch (error) {
                console.log(error);
            }
        };
        fn();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [getUsers]);

    return <UserList users={users} loadingUsers={loadingUsers} />;
};

export default UserListContainer;
