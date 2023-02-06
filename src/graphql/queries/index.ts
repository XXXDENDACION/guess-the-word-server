import type { Resolvers } from '../../__generated__/resolvers-types';

export const queries: Resolvers = {
    Query: {
        dogs: async (_, { word }) => `Wow! ${String(word)}`,
    },
};
