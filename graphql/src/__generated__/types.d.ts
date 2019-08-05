import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  name: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  isbn: Scalars['String'];
  pages?: Maybe<Scalars['Int']>;
  author?: Maybe<Author>;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors?: Maybe<Array<Maybe<Author>>>;
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
};

export type QueryAuthorArgs = {
  id: Scalars['ID'];
};

export type QueryBookArgs = {
  id: Scalars['ID'];
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

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
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Author: ResolverTypeWrapper<Author>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Book: ResolverTypeWrapper<Book>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  Author: Author;
  String: Scalars['String'];
  Book: Book;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
}>;

export type AuthorResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes['Author']
> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type BookResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes['Book']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes['Query']
> = ResolversObject<{
  author?: Resolver<
    Maybe<ResolversTypes['Author']>,
    ParentType,
    ContextType,
    QueryAuthorArgs
  >;
  authors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Author']>>>,
    ParentType,
    ContextType
  >;
  book?: Resolver<
    Maybe<ResolversTypes['Book']>,
    ParentType,
    ContextType,
    QueryBookArgs
  >;
  books?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Book']>>>,
    ParentType,
    ContextType
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
