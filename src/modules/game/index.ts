import { gameMutations } from './game.mutations';
import { gameQueries } from './game.queries';

export const gameResolvers = {
    ...gameMutations,
    ...gameQueries,
};
