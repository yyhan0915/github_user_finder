import client from './client';

export const retrievingUsers = () => {
  client.get('http://api.github.com/users');
};

export const retrievingUser = ({ username }: any) => {
  // 추후 타입 수정
  client.get(`http://api.github.com/users/${username}`);
};
