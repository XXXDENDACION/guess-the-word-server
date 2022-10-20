import jwt from 'jsonwebtoken';
import { users } from '../../data/users';
import { IResolvers } from "mercurius";

export const queries: IResolvers = {
    Query: {
        dogs: async (_, { word }) => {
            return `Wow! ${word}`;
        },
        users: async (_) => users,
        user: async(_, { id }) => {
            const user = users.find(u => u.id === id);
            if (!user) {
                throw new Error('unknown user');
            }
            return user;
        },
        login: async (_, { username, password }) => {
            const user = users.find(user => user.name && user.password === password);
            if (!user) {
                throw new Error('unknown user!');
            }

            const token = jwt.sign({ username: user.name, password: user.password, role: user.role}, 'secret');
            return token;
        }
    }
}