import path from 'path';
import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import config from 'config';
import resolvers from './resolvers';
import KoaAPI from './datasources/koaAPI';

require('dotenv').config();

const { port } = config.get('server');

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

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  server.listen({ port }).then(({ url }: { url: string }) => {
    console.log(`GraphQL server ready at ${url}.`);
  });
}

export default server;
