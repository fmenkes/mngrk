import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { gql } from 'apollo-server';
import server from '../index';

let testClient: ApolloServerTestClient;

beforeAll(() => {
  testClient = createTestClient(server);
});

it('server starts up correctly', async () => {
  const { query } = testClient;

  const TEST_QUERY = gql`
    query IntrospectionQuery {
      __schema {
        mutationType {
          name
          description
        }
        queryType {
          name
          description
        }
      }
    }
  `;

  const res = await query({
    query: TEST_QUERY,
  });

  expect(res).toMatchSnapshot();
});
