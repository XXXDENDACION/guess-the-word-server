import { userMutations } from './user.mutations';
import { userQueries } from './user.queries';

export const userResolvers = {
    ...userMutations,
    ...userQueries,
};
