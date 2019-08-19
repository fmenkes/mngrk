import { QueryResolvers, MutationResolvers } from './__generated__/types';

const queryResolvers: QueryResolvers = {
  book: (_, { id }, { dataSources }) => dataSources.koaAPI.book(id),
  books: (_, __, { dataSources }) => dataSources.koaAPI.books(),
  author: (_, { id }, { dataSources }) => dataSources.koaAPI.author(id),
  authors: (_, __, { dataSources }) => dataSources.koaAPI.authors(),
};

const mutationResolvers: MutationResolvers = {
  createAuthor: (_, { name }, { dataSources }) =>
    dataSources.koaAPI.createAuthor(name),
  createBook: (_, params, { dataSources }) =>
    dataSources.koaAPI.createBook(params),
};

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export default resolvers;
