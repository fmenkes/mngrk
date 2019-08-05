import { QueryResolvers } from './__generated__/types';

const queryResolvers: QueryResolvers = {
  book: (_, { id }, { dataSources }) => dataSources.koaAPI.book(id),
  books: (_, __, { dataSources }) => dataSources.koaAPI.books(),
  author: (_, { id }, { dataSources }) => dataSources.koaAPI.book(id),
  authors: (_, __, { dataSources }) => dataSources.koaAPI.authors(),
};

const resolvers = {
  Query: queryResolvers,
};

export default resolvers;
