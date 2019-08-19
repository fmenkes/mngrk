import path from 'path';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { gql, ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import KoaAPI from '../datasources/koaAPI';
import resolvers from '../resolvers';

const typeDefs = gql(
  importSchema(path.join(__dirname, '../schemas/schema.graphql')),
);

let testClient: ApolloServerTestClient;
const koaAPI = new KoaAPI();

beforeAll(() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ koaAPI }),
  });

  testClient = createTestClient(server);
});

describe('queries', () => {
  it('book returns the correct response', async () => {
    koaAPI.book = jest.fn().mockResolvedValue({
      title: 'test',
      genre: 'test',
      publicationYear: 1900,
      pages: 100,
      author: {
        name: 'test',
      },
    });

    const { query } = testClient;

    const BOOK_QUERY = gql`
      query Book($id: ID!) {
        book(id: $id) {
          title
          genre
          publicationYear
          pages
          author {
            name
          }
        }
      }
    `;

    const res = await query({
      query: BOOK_QUERY,
      variables: { id: 'test' },
    });

    expect(res).toHaveProperty('data', {
      book: {
        title: 'test',
        genre: 'test',
        publicationYear: 1900,
        pages: 100,
        author: {
          name: 'test',
        },
      },
    });
  });

  it('books returns the correct response', async () => {
    koaAPI.books = jest.fn().mockResolvedValue([
      {
        title: 'test',
        genre: 'test',
        publicationYear: 1900,
        pages: 100,
        author: {
          name: 'test',
        },
      },
    ]);

    const { query } = testClient;

    const BOOKS_QUERY = gql`
      query Books {
        books {
          title
          genre
          publicationYear
          pages
          author {
            name
          }
        }
      }
    `;

    const res = await query({
      query: BOOKS_QUERY,
    });

    expect(res).toHaveProperty('data', {
      books: [
        {
          title: 'test',
          genre: 'test',
          publicationYear: 1900,
          pages: 100,
          author: {
            name: 'test',
          },
        },
      ],
    });
  });

  it('author returns the correct response', async () => {
    koaAPI.author = jest.fn().mockResolvedValue({
      name: 'test',
    });

    const { query } = testClient;

    const AUTHOR_QUERY = gql`
      query Author($id: ID!) {
        author(id: $id) {
          name
        }
      }
    `;

    const res = await query({
      query: AUTHOR_QUERY,
      variables: { id: 'test' },
    });

    expect(res).toHaveProperty('data', {
      author: {
        name: 'test',
      },
    });
  });

  it('authors returns the correct response', async () => {
    koaAPI.authors = jest.fn().mockResolvedValue([
      {
        name: 'test',
      },
    ]);

    const { query } = testClient;

    const AUTHORS_QUERY = gql`
      query Authors {
        authors {
          name
        }
      }
    `;

    const res = await query({
      query: AUTHORS_QUERY,
    });

    expect(res).toHaveProperty('data', {
      authors: [
        {
          name: 'test',
        },
      ],
    });
  });
});

describe('mutations', () => {
  it('createBook returns the correct response', async () => {
    koaAPI.createBook = jest.fn().mockResolvedValue({
      title: 'test',
      genre: 'test',
      publicationYear: 1900,
      pages: 100,
      author: {
        name: 'test',
      },
    });
    const { mutate } = testClient;

    const CREATE_BOOK = gql`
      mutation CreateBook(
        $title: String!
        $genre: String
        $publicationYear: Int
        $pages: Int
        $author: ID!
      ) {
        createBook(
          title: $title
          genre: $genre
          publicationYear: $publicationYear
          pages: $pages
          author: $author
        ) {
          title
          genre
          publicationYear
          pages
          author {
            name
          }
        }
      }
    `;

    const res = await mutate({
      mutation: CREATE_BOOK,
      variables: {
        title: 'test',
        genre: 'test',
        publicationYear: 1900,
        pages: 100,
        author: 'test',
      },
    });

    expect(res).toHaveProperty('data', {
      createBook: {
        title: 'test',
        genre: 'test',
        publicationYear: 1900,
        pages: 100,
        author: {
          name: 'test',
        },
      },
    });
  });

  it('createAuthor returns the correct response', async () => {
    koaAPI.createAuthor = jest.fn().mockResolvedValue({
      name: 'test',
    });
    const { mutate } = testClient;

    const CREATE_AUTHOR = gql`
      mutation CreateAuthor($name: String!) {
        createAuthor(name: $name) {
          name
        }
      }
    `;

    const res = await mutate({
      mutation: CREATE_AUTHOR,
      variables: { name: 'test' },
    });

    expect(res).toHaveProperty('data', { createAuthor: { name: 'test' } });
  });
});
