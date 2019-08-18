import request from 'supertest';
import server from '../../index';
import Author, { AuthorInterface } from '../../models/Author';

jest.mock('../../models/Author');
const mockedAuthor = Author as jest.Mocked<typeof Author>;

afterEach(() => {
  server.close();
  jest.clearAllMocks();
});

const authorParams = {
  name: 'test',
};

describe('author', () => {
  it('create should respond as expected', async () => {
    mockedAuthor.create.mockResolvedValue(authorParams as AuthorInterface);

    const response = await request(server)
      .post('/authors')
      .send(authorParams);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('author.name', authorParams.name);
  });

  it('find should respond as expected', async () => {
    mockedAuthor.find.mockResolvedValue([authorParams] as [AuthorInterface]);

    const response = await request(server).get('/authors');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('authors');
    expect(response.body.data.authors.length).toBe(1);
    expect(response.body.data.authors[0]).toEqual(authorParams);
  });

  it('findById should respond as expected', async () => {
    mockedAuthor.findById.mockResolvedValue(authorParams as AuthorInterface);

    const response = await request(server).get('/authors/1');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('author', authorParams);
  });

  it('findById should return 404 when not found', async () => {
    mockedAuthor.findById.mockResolvedValue(null);

    const response = await request(server).get('/authors/1');

    expect(response.status).toEqual(404);
  });
});
