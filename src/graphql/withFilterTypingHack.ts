import type { FilterFn } from 'graphql-subscriptions';
import { withFilter as withFilterOriginal } from 'graphql-subscriptions';

// https://github.com/apollographql/graphql-subscriptions/issues/261#issuecomment-1246300357
type ResolverFn<TSource = any, TArgs = any, TContext = any> = (
    rootValue?: TSource,
    args?: TArgs,
    context?: TContext,
    info?: any
) => AsyncIterable<any>;

export const withFilter = withFilterOriginal as unknown as (
    asyncIteratorFn: ResolverFn,
    filterFn: FilterFn
) => ResolverFn;
