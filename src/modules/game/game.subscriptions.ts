import type { IPayloadEnteredWord } from './game.interfaces';
import { withFilter } from '../../graphql/withFilterTypingHack';
import type { ApolloSubscriptionContext } from '../../graphql/apolloSubscriptionContext';

import type { Resolvers } from '../../__generated__/resolvers-types';

export const gameSubscriptions: Resolvers = {
    Subscription: {
        enteredWord: {
            subscribe: withFilter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (_, _args, context: ApolloSubscriptionContext) => {
                    return context.pubSub.asyncIterator('ENTERED_WORD');
                },
                (
                    payload: IPayloadEnteredWord,
                    variables,
                    context: ApolloSubscriptionContext
                ) => {
                    const subscribedUserIds = payload.enteredWord.usersId;
                    const currentUserId = context?.currentUser?.id || null;

                    if (currentUserId) {
                        return subscribedUserIds.includes(currentUserId);
                    }
                    return false;
                }
            ),
        },
    },
};
