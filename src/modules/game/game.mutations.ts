import type { IResolvers, MercuriusContext } from 'mercurius';
import type { MutationResolvers } from '../../graphql/generated';
import type { IGameEnterWord, IGameInput } from './game.interfaces';
import { Prisma } from '@prisma/client';
import { WORDS } from '../../data/words';
import { getDifferenceBetweenWords } from './game.service';

type GameMutations = {
    createGame: MutationResolvers['createGame'];
    enterWord: MutationResolvers['enterWord'];
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
                        word: WORDS[Math.random() * WORDS.length],
                        users: {
                            connect: arrayOfUserIds,
                        },
                    },
                });

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
        enterWord: async (
            _,
            { round, word, gameId }: IGameEnterWord,
            context: MercuriusContext
        ) => {
            const game = await context.prisma.game.findFirst({
                where: {
                    id: gameId,
                },
                include: {
                    users: true,
                },
            });

            if (!game) {
                throw new Error('No Game');
            }

            context.pubsub.publish({
                topic: 'ENTERED_WORD',
                payload: {
                    enteredWord: {
                        usersId: game.users?.map((u) => u.id),
                        round: round,
                    },
                },
            });

            return getDifferenceBetweenWords(game.word, word);
        },
    },
};
