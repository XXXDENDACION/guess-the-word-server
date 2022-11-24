import type {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
import type { MercuriusContext } from 'mercurius';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) =>
    | Promise<import('mercurius-codegen').DeepPartial<TResult>>
    | import('mercurius-codegen').DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
    _FieldSet: any;
};

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export type createUserInput = {
    name?: InputMaybe<Scalars['String']>;
    email: Scalars['String'];
    role?: InputMaybe<Scalars['String']>;
    provider: Scalars['String'];
    socialId: Scalars['String'];
};

export type loginUserInput = {
    name?: InputMaybe<Scalars['String']>;
    socialId: Scalars['String'];
    provider: Scalars['String'];
    email: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    add: Scalars['Int'];
    createUser: User;
};

export type MutationaddArgs = {
    x: Scalars['Int'];
    y: Scalars['Int'];
};

export type MutationcreateUserArgs = {
    user: createUserInput;
};

export type Query = {
    __typename?: 'Query';
    dogs: Scalars['String'];
    user: User;
    users: Array<Maybe<User>>;
    login?: Maybe<Tokens>;
    refresh: GeneratedTokens;
};

export type QuerydogsArgs = {
    word?: InputMaybe<Scalars['String']>;
};

export type QueryuserArgs = {
    id: Scalars['Int'];
};

export type QueryloginArgs = {
    input: loginUserInput;
};

export type QueryrefreshArgs = {
    refreshToken: Scalars['String'];
};

export type GeneratedTokens = {
    __typename?: 'GeneratedTokens';
    accessToken?: Maybe<Scalars['String']>;
    refreshToken: Scalars['String'];
};

export type User = {
    __typename?: 'User';
    id: Scalars['Int'];
    name?: Maybe<Scalars['String']>;
    provider: Scalars['String'];
    socialId: Scalars['String'];
    email: Scalars['String'];
    role?: Maybe<Scalars['String']>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type Tokens = {
    __typename?: 'Tokens';
    id: Scalars['Int'];
    userId: Scalars['Int'];
    refreshToken: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    Role: Role;
    createUserInput: createUserInput;
    String: ResolverTypeWrapper<Scalars['String']>;
    loginUserInput: loginUserInput;
    Mutation: ResolverTypeWrapper<{}>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Query: ResolverTypeWrapper<{}>;
    GeneratedTokens: ResolverTypeWrapper<GeneratedTokens>;
    User: ResolverTypeWrapper<User>;
    Tokens: ResolverTypeWrapper<Tokens>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    DateTime: Scalars['DateTime'];
    createUserInput: createUserInput;
    String: Scalars['String'];
    loginUserInput: loginUserInput;
    Mutation: {};
    Int: Scalars['Int'];
    Query: {};
    GeneratedTokens: GeneratedTokens;
    User: User;
    Tokens: Tokens;
    Boolean: Scalars['Boolean'];
};

export type authDirectiveArgs = {
    requires?: Maybe<Role>;
};

export type authDirectiveResolver<
    Result,
    Parent,
    ContextType = MercuriusContext,
    Args = authDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type MutationResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
    add?: Resolver<
        ResolversTypes['Int'],
        ParentType,
        ContextType,
        RequireFields<MutationaddArgs, 'x' | 'y'>
    >;
    createUser?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateUserArgs, 'user'>
    >;
};

export type QueryResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
    dogs?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        Partial<QuerydogsArgs>
    >;
    user?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<QueryuserArgs, 'id'>
    >;
    users?: Resolver<
        Array<Maybe<ResolversTypes['User']>>,
        ParentType,
        ContextType
    >;
    login?: Resolver<
        Maybe<ResolversTypes['Tokens']>,
        ParentType,
        ContextType,
        RequireFields<QueryloginArgs, 'input'>
    >;
    refresh?: Resolver<
        ResolversTypes['GeneratedTokens'],
        ParentType,
        ContextType,
        RequireFields<QueryrefreshArgs, 'refreshToken'>
    >;
};

export type GeneratedTokensResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['GeneratedTokens'] = ResolversParentTypes['GeneratedTokens']
> = {
    accessToken?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    socialId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']
> = {
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<
        Maybe<ResolversTypes['DateTime']>,
        ParentType,
        ContextType
    >;
    updatedAt?: Resolver<
        Maybe<ResolversTypes['DateTime']>,
        ParentType,
        ContextType
    >;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
    DateTime?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    GeneratedTokens?: GeneratedTokensResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    Tokens?: TokensResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MercuriusContext> = {
    auth?: authDirectiveResolver<any, any, ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
    queries: Array<{
        obj: TObj;
        params: TParams;
    }>,
    context: TContext & {
        reply: import('fastify').FastifyReply;
    }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
    | Loader<TReturn, TObj, TParams, TContext>
    | {
          loader: Loader<TReturn, TObj, TParams, TContext>;
          opts?: {
              cache?: boolean;
          };
      };
export interface Loaders<
    TContext = import('mercurius').MercuriusContext & {
        reply: import('fastify').FastifyReply;
    }
> {
    GeneratedTokens?: {
        accessToken?: LoaderResolver<
            Maybe<Scalars['String']>,
            GeneratedTokens,
            {},
            TContext
        >;
        refreshToken?: LoaderResolver<
            Scalars['String'],
            GeneratedTokens,
            {},
            TContext
        >;
    };

    User?: {
        id?: LoaderResolver<Scalars['Int'], User, {}, TContext>;
        name?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        provider?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        socialId?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        email?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        role?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        createdAt?: LoaderResolver<Scalars['DateTime'], User, {}, TContext>;
        updatedAt?: LoaderResolver<Scalars['DateTime'], User, {}, TContext>;
    };

    Tokens?: {
        id?: LoaderResolver<Scalars['Int'], Tokens, {}, TContext>;
        userId?: LoaderResolver<Scalars['Int'], Tokens, {}, TContext>;
        refreshToken?: LoaderResolver<Scalars['String'], Tokens, {}, TContext>;
        createdAt?: LoaderResolver<
            Maybe<Scalars['DateTime']>,
            Tokens,
            {},
            TContext
        >;
        updatedAt?: LoaderResolver<
            Maybe<Scalars['DateTime']>,
            Tokens,
            {},
            TContext
        >;
    };
}
declare module 'mercurius' {
    interface IResolvers
        extends Resolvers<import('mercurius').MercuriusContext> {}
    interface MercuriusLoaders extends Loaders {}
}
