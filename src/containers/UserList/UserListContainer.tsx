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
      users: userlist.users,
      loadingUsers: loading['userlist/GET_USERS'],
      lastItem: userlist.lasItem,
    }),
  );

  const handleScroll = (event: Event) => {
    const body = document.querySelector('body');
    const checkState = store.getState().userlist.lasItem;
    // console.log(
    //   `scrollTop of body: ${body.scrollTop}, scrollHeight : ${body.scrollHeight}, clientHeight : ${body.clientHeight}`,
    // );
    if (body.scrollHeight <= body.scrollTop + body.clientHeight) {
      console.log('reached!!!');
      console.log(`checkState : ${checkState}`);
      dispatch(getUsers(checkState));
    }
  };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   console.log('hello');
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     console.log('bye');
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log('hello');
    const itemlast = store.getState().userlist.lasItem;
    const fn = async () => {
      try {
        await dispatch(getUsers(itemlast));
      } catch (error) {
        console.log(error);
      }
    };
    fn();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('bye');
    };
  }, []);

  return <UserList users={users} loadingUsers={loadingUsers} />;
};

export default UserListContainer;
