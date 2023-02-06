import type { Resolvers } from '../../__generated__/resolvers-types';

export const mutations: Resolvers = {
    Mutation: {
        add: async (_, { x, y }) => {
            return x + y;
        },
    },
};
