import path from 'path';
import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import KoaAPI from './datasources/koaAPI';

require('dotenv').config();

const typeDefs = gql(
  importSchema(path.join(__dirname, 'schemas/schema.graphql')),
);

const dataSources = () => ({
  koaAPI: new KoaAPI(),
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources,
});

server
  .listen()
  .then(({ url }: { url: string }) =>
    console.log(`GraphQL server ready at ${url}.`),
  );
