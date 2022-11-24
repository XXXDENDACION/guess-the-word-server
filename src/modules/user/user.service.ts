import { MercuriusContext } from 'mercurius';

type Payload = {
    id: number;
    socialId: string;
    provider: string;
};

export async function generateRefreshToken(
    payload: Payload,
    context: MercuriusContext
) {
    return await context.reply.jwtSign(
        {
            id: payload.id,
            socialId: payload.socialId,
            provider: payload.provider,
        },
        { expiresIn: '2d' }
    );
}
