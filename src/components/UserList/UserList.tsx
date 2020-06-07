import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'src/modules/userlist';
import styled from 'styled-components';

import { Image } from '../';
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
    border: 1px solid red;
  }
  div {
    display: block;
    border: 1px solid black;
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
        <h3>ID : {id}</h3>
      </div>
    </UserItemBlock>
  );
};
interface UserListContainerProps {
  users: User[];
  loadingUsers: boolean;
}

export const UserList: React.FC<UserListContainerProps> = ({
  loadingUsers,
  users,
}) => {
  const [reach, setReach] = React.useState(0);

  return (
    <UsersListBlock>
      <h1>사용자 목록</h1>
      {loadingUsers && '로딩 중...'}
      {!loadingUsers && users && (
        <ul>
          {users.map(user => (
            <UserItem user={user} key={user.login} />
          ))}
        </ul>
      )}
    </UsersListBlock>
  );
};
