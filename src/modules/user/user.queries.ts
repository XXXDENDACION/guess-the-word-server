import {
    generateTokens,
    updateRefreshTokenForUser,
    validateRefreshToken,
} from './user.service';

import type { Resolvers } from '../../__generated__/resolvers-types';
import type { ApolloContext } from '../../graphql/apolloContext';

export const userQueries: Resolvers = {
    Query: {
        users: async () => [],
        user: async (parent, { id }, context: ApolloContext) => {
            const user = await context.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new Error('unknown user');
            }

            console.log(user);
            return user;
        },
        login: async (_, { input }, context: ApolloContext) => {
            console.log(input);
            const user = await context.prisma.user.findFirst({
                where: {
                    socialId: input.socialId,
                    provider: input.provider,
                },
            });

            if (!user) {
                const newUser = await context.prisma.user.create({
                    data: {
                        name: input.name,
                        email: input.email,
                        provider: input.provider,
                        socialId: input.socialId,
                    },
                });

                const { refreshToken, accessToken } = await generateTokens(
                    newUser,
                    context
                );

                await context.prisma.tokens.create({
                    data: {
                        userId: newUser.id,
                        refreshToken,
                        updatedAt: new Date(),
                    },
                });

                return {
                    refreshToken,
                    accessToken,
                };
            }

            const { refreshToken, accessToken } = await generateTokens(
                user,
                context
            );

            await updateRefreshTokenForUser(refreshToken, user.id, context);

            return {
                accessToken,
                refreshToken,
            };
        },
        refresh: async (_, { refreshToken }, context: ApolloContext) => {
            const refreshPayload = await validateRefreshToken(
                refreshToken,
                context
            );

            if (!refreshPayload) {
                throw new Error('Refresh token is invalid');
            }

            const tokenEntity = await context.prisma.tokens.findFirst({
                where: {
                    refreshToken: refreshToken,
                },
                include: {
                    user: true,
                },
            });

            console.log(tokenEntity);

            if (!tokenEntity) {
                throw new Error('No user');
            }

            const { user } = tokenEntity;

            const newTokens = await generateTokens(user, context);

            await updateRefreshTokenForUser(
                newTokens.refreshToken,
                user.id,
                context
            );

            return newTokens;
        },
    },
};
