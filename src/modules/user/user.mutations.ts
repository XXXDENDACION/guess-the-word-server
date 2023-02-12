import type { Resolvers } from '../../__generated__/resolvers-types';
import type { ApolloContext } from '../../graphql/apolloContext';

export const userMutations: Resolvers = {
    Mutation: {
        createUser: async (_, { user }, context: ApolloContext) => {
            const newUser = await context.prisma.user.create({
                data: {
                    ...user,
                },
            });

            console.log(newUser);
            return newUser;
        },
    },
};
