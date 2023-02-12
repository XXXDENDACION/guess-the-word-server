import { Prisma } from '@prisma/client';
import { getDifferenceBetweenWords } from './game.service';
import { WORDS } from '../../data/words';
import type { Resolvers } from '../../__generated__/resolvers-types';
import type { ApolloContext } from '../../graphql/apolloContext';

export const gameMutations: Resolvers = {
    Mutation: {
        createGame: async (_, { game }, context: ApolloContext) => {
            const arrayOfUserIds = game.usersId.map((id) => ({ id: id }));
            try {
                const newGame = await context.prisma.game.create({
                    data: {
                        word: WORDS[Math.ceil(Math.random() * WORDS.length)],
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
            } catch (err) {
                let message = 'Unknown';
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    message = (err?.meta?.cause as string) || 'Unknown';
                }
                return {
                    __typename: 'Error' as const,
                    message: message,
                };
            }
        },
        enterWord: async (
            _,
            { round, word, gameId },
            context: ApolloContext
        ) => {
            // console.log(context.authorization);
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

            await context.pubSub.publish('ENTERED_WORD', {
                enteredWord: {
                    usersId: game.users?.map((u) => u.id),
                    round: round,
                },
            });

            return getDifferenceBetweenWords(game.word, word);
        },
    },
};
