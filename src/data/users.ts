import { User } from "../graphql/generated";

export const users: User[] = [
    { id: 1, name: 'JohnDoe', email: 'John_doe@gmail.com', password: '12345', role: 'admin' },
    { id: 2, name: 'JaneDoe', email: 'Jane_doe@gmail.com', password: '12345', role: 'user' },
    { id: 3, name: 'JoeDoe', email: 'Joe_doe@gmail.com', password: '12345', role: 'user' }
];