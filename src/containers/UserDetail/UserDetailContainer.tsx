import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/reducers/root';

import { UserDetail } from '../../components/';
import { getUserInfo } from '../../modules/userinfo';

const UserDetailContainer = ({ username }: { username: string }) => {
    const dispatch = useDispatch();
    const { userinfo, loadingUserinfo, repos } = useSelector(
        ({ userinfo, loading }: RootState) => ({
            loadingUserinfo: loading['userinfo/GET_USERINFO'],
            repos: userinfo.repos,
            userinfo: userinfo.userinfo,
        }),
    );

    React.useEffect(() => {
        const fn = React.useCallback(async () => {
            try {
                await dispatch(getUserInfo(username));
            } catch (error) {
                console.log(error);
            }
        }, []);
        fn();
        // async () => {
        //     try {
        //         await dispatch(getUserInfo(username));
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
        // fn();
    }, [dispatch]);

    return (
        <UserDetail
            userinfo={userinfo}
            loadingUserinfo={loadingUserinfo}
            repos={repos}
        />
    );
};

export default UserDetailContainer;
