import { gameMutations } from './game.mutations';
import { gameQueries } from './game.queries';
import { gameSubscriptions } from './game.subscriptions';

export const gameResolvers = {
    ...gameMutations,
    ...gameQueries,
    ...gameSubscriptions,
};
