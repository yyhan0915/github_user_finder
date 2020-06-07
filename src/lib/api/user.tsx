import client from './client';

export const getUsers = async (id?: number) => {
    return client.get(`http://api.github.com/users?since=${id}`);
};

export const getUser = async (username: string) => {
    return client.get(`http://api.github.com/users/${username}`);
};

export const getRepos = async (username: string) => {
    return client.get(`http://api.github.com/users/${username}/repos`);
};
