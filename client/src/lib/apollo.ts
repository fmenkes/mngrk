import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import env from '../config/env';

const { REACT_APP_GRAPHQL_URI } = env;

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: REACT_APP_GRAPHQL_URI,
});

const client = new ApolloClient({
  link,
  cache,
  resolvers: {},
});

export default client;
