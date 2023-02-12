import type { ApolloContext } from '../../graphql/apolloContext';

type RefreshPayload = {
    id: number;
    socialId: string;
    provider: string;
};

type GenerateTokens = {
    refreshToken: string;
    accessToken: string;
};

export async function generateTokens(
    payload: RefreshPayload,
    context: ApolloContext
): Promise<GenerateTokens> {
    const refreshToken = await context.reply.jwtSign(payload, {
        expiresIn: '2d',
    });
    const accessToken = await context.reply.jwtSign(payload, {
        expiresIn: '2h',
    });

    return {
        refreshToken,
        accessToken,
    };
}

export async function validateRefreshToken(
    token: string,
    context: ApolloContext
) {
    try {
        return context.app.jwt.verify(token);
    } catch (error) {
        return null;
    }
}

export async function validateAccessToken(
    token: string,
    context: ApolloContext
) {
    try {
        return context.app.jwt.verify(token);
    } catch (error) {
        return null;
    }
}

export async function updateRefreshTokenForUser(
    refreshToken: string,
    userId: number,
    context: ApolloContext
) {
    try {
        await context.prisma.tokens.updateMany({
            where: { userId },
            data: {
                refreshToken,
                updatedAt: new Date(),
            },
        });
    } catch (error) {
        return error;
    }
}
