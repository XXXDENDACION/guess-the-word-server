import { IResolvers } from 'mercurius';
import { users } from '../../data/users';

export const queries: IResolvers = {
    Query: {
        dogs: async (_, { word }) => `Wow! ${word}`,
        users: async () => users,
        user: async (_, { id }) => {
            const user = users.find((u) => u.id === id);
            if (!user) {
                throw new Error('unknown user');
            }
            return user;
        },
        login: async (_, { password }, context) => {
            const user = users.find((u) => u.name && u.password === password);
            if (!user) {
                throw new Error('unknown user!');
            }

            const token = context.reply.jwtSign({ username: user.name, password: user.password, role: user.role });
            return token;
        },
    },
};
