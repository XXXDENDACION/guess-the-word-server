import type { IResolvers, MercuriusContext } from 'mercurius';
import type { MutationResolvers } from '../../graphql/generated';
import type { IGameInput } from './game.interfaces';
import { Prisma } from '@prisma/client';

type GameMutations = {
    createGame: MutationResolvers['createGame'];
};

export const gameMutations: IResolvers<GameMutations> = {
    Mutation: {
        createGame: async (
            _,
            { game }: IGameInput,
            context: MercuriusContext
        ) => {
            const arrayOfUserIds = game.usersId.map((id) => ({ id: id }));

            try {
                const newGame = await context.prisma.game.create({
                    data: {
                        word: 'пицца',
                        users: {
                            connect: arrayOfUserIds,
                        },
                    },
                });
                console.log(newGame);
                return {
                    __typename: 'Game',
                    ...newGame,
                };

                // return newGame;
            } catch (err) {
                let message;
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    message = err?.meta?.cause || 'Unknown';
                }
                return {
                    __typename: 'Error',
                    message: message,
                };
            }
        },
    },
};
