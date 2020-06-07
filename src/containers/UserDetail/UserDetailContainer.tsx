import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from 'src/reducers/root';

import { UserDetail } from '../../components/';
import { UserList } from '../../components/UserList/UserList';
import { getUserInfo } from '../../modules/userinfo';

const UserDetailContainer = ({ username }: { username: string }) => {
  const dispatch = useDispatch();
  const { userinfo, loadingUserinfo } = useSelector(
    ({ userinfo, loading }: RootState) => ({
      userinfo: userinfo.userinfo,
      loadingUserinfo: loading['userinfo/GET_USERINFO'],
    }),
  );

  React.useEffect(() => {
    const fn = async () => {
      const response = await dispatch(getUserInfo(username));
      console.log(response);
    };
    fn();
    // dispatch(getUserInfo(username));
    // console.log('success');
    // const fn = async () => {
    //   try {
    //     await dispatch(getUserInfo('mojombo'));
    //     console.log('succeed to use fn fnc');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fn();
  }, []);

  return <UserDetail />;
};

export default UserDetailContainer;
