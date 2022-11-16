import { IResolvers } from 'mercurius';
import { users } from '../../data/users';
import { QueryloginArgs, QueryResolvers } from '../../graphql/generated';

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
            console.log(user);
            if (!user) {
                throw new Error('unknown user!');
            }

            const refreshToken = await context.reply.jwtSign({
                id: user.id,
                socialId: user.socialId,
                provide: user.provider,
            });

            const upsertToken = await context.prisma.tokens.upsert({
                where: { userId: user.id },
                create: {
                    user: { connect: { id: user.id } },
                    refreshToken: refreshToken,
                },
                update: {
                    refreshToken: refreshToken,
                    updatedAt: new Date(),
                },
            });

            return upsertToken;
        },
    },
};
