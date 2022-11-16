import { mutations } from './mutations';
import { queries } from './queries';

export const resolvers = {
    ...mutations,
    ...queries,
};
