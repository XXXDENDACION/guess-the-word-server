import { IResolvers } from "mercurius";
import { users } from '../../data/users';

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
        login: async (_, { username, password }, context) => {
            const user = users.find(user => user.name && user.password === password);
            if (!user) {
                throw new Error('unknown user!');
            }

            const token = context.reply.jwtSign({ username: user.name, password: user.password, role: user.role});
            return token;
        }
    }
}