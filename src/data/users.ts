import { User } from '../graphql/generated';

export const users: User[] = [
    {
        id: 1,
        name: 'JohnDoe',
        email: 'John_doe@gmail.com',
        role: 'admin',
        provider: 'google',
        socialId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: 'JaneDoe',
        email: 'Jane_doe@gmail.com',
        role: 'user',
        provider: 'google',
        socialId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: 'JoeDoe',
        email: 'Joe_doe@gmail.com',
        role: 'user',
        provider: 'google',
        socialId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
