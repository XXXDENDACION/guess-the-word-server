import { IResolvers } from 'mercurius';
import { mutations } from './mutations';
import { queries } from './queries';

export const resolvers: IResolvers = {
    ...mutations,
    ...queries,
};
