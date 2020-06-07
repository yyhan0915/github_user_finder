import client from './client';

export const getUsers = async (id?: number) => {
  const response = await client.get(`http://api.github.com/users?since=${id}`);
  return response;
};

export const getUser = async (username: string) => {
  // 추후 타입 수정
  const response = await client.get(`http://api.github.com/users/${username}`);
  return response;
};
