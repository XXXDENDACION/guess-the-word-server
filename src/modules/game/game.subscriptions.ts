import mercurius from 'mercurius';
import type { IResolvers, MercuriusContext } from 'mercurius';
import type { SubscriptionResolvers } from '../../graphql/generated';
import type { IPayloadEnteredWord } from './game.interfaces';
import fastifyJwt from '@fastify/jwt';

type GameSubscriptions = {
    enteredWord: SubscriptionResolvers['enteredWord'];
};

const { withFilter } = mercurius;

export const gameSubscriptions: IResolvers<GameSubscriptions> = {
    Subscription: {
        enteredWord: {
            subscribe: withFilter(
                async (_, args, context: MercuriusContext) => {
                    // console.log(context.user);
                    return await context.pubsub.subscribe(['ENTERED_WORD']);
                },
                ({ enteredWord }: IPayloadEnteredWord, args, context) => {
                    // const authToken = context.request.headers['Authorization'];
                    // const test = context.app.jwt.decode(authToken as 'string');
                    // console.log('@@@@', context.user);
                    // if (typeof authToken === 'string') {
                    //     console.log(fastifyJwt.);
                    //     console.log(context.app.jwt.decode(authToken));
                    // }
                    // if (!enteredWord) return false;

                    return true;
                }
            ),
        },
    },
};
