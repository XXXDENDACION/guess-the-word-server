import { IResolvers } from 'mercurius';
import { users } from '../../data/users';
import { QueryloginArgs, QueryResolvers } from '../../graphql/generated';
import { generateRefreshToken } from './user.service';

type UserQueries = {
    users: QueryResolvers['users'];
    user: QueryResolvers['user'];
    login: QueryResolvers['login'];
};

export const userQueries: IResolvers<UserQueries> = {
    Query: {
        users: async () => users,
        user: async (_, { id }, context) => {
            const user = await context.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new Error('unknown user');
            }
            return user;
        },
        login: async (_, { input }: QueryloginArgs, context) => {
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

                const refreshToken = await generateRefreshToken(
                    {
                        id: newUser.id,
                        socialId: newUser.socialId,
                        provider: newUser.provider,
                    },
                    context
                );

                return await context.prisma.tokens.create({
                    data: {
                        userId: newUser.id,
                        refreshToken,
                        updatedAt: new Date(),
                    },
                });
            }

            const refreshToken = await generateRefreshToken(
                {
                    id: user.id,
                    socialId: user.socialId,
                    provider: user.provider,
                },
                context
            );

            return await context.prisma.tokens.update({
                where: { userId: user.id },
                data: {
                    refreshToken,
                    updatedAt: new Date(),
                },
            });
        },
    },
};
