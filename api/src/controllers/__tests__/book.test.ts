import request from 'supertest';
import server from '../../index';
import Book, { BookInterface } from '../../models/Book';
import Author, { AuthorInterface } from '../../models/Author';

jest.mock('../../models/Book');
jest.mock('../../models/Author');
const mockedBook = Book as jest.Mocked<typeof Book>;
const mockedAuthor = Author as jest.Mocked<typeof Author>;

afterEach(() => {
  server.close();
  jest.clearAllMocks();
});

const authorParams = {
  name: 'test',
};

const bookParams = {
  title: 'test',
  genre: 'test',
  publicationYear: 1900,
  pages: 100,
  author: '12345',
};

// const BookFindMock = jest.spyOn(Book, 'find');
// const BookFindByIdMock = jest.spyOn(Book, 'findById');
// const BookFindPopulateResult = [populatedBook];
// const BookFindByIdPopulateResult = populatedBook;
// const BookFindPopulate = jest.fn(() => BookFindPopulateResult);
// const BookFindByIdPopulate = jest.fn(() => BookFindByIdPopulateResult);
// const BookFindResult = {
//   populate: BookFindPopulate,
// };
// const BookFindByIdResult = {
//   populate: BookFindByIdPopulate,
// };
// const BookFind = jest.fn(() => BookFindResult);
// const BookFindById = jest.fn(() => BookFindByIdResult);
// BookFindMock.mockImplementation(BookFind as any);
// BookFindByIdMock.mockImplementation(BookFindById as any);

describe('book', () => {
  it('create should respond as expected', async () => {
    mockedBook.create.mockResolvedValue(bookParams as BookInterface);
    mockedAuthor.findById.mockResolvedValue(authorParams as AuthorInterface);

    const response = await request(server)
      .post('/books')
      .send(bookParams);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('book.title', bookParams.title);
    expect(response.body.data).toHaveProperty('book.genre', bookParams.genre);
    expect(response.body.data).toHaveProperty(
      'book.publicationYear',
      bookParams.publicationYear,
    );
    expect(response.body.data).toHaveProperty('book.pages', bookParams.pages);
    expect(response.body.data).toHaveProperty(
      'book.author.name',
      authorParams.name,
    );
  });

  it('find should respond as expected', async () => {
    const BookFindMock = jest.spyOn(Book, 'find');
    const BookFindPopulateResult = [
      {
        author: authorParams,
        ...bookParams,
      },
    ];
    const BookFindPopulate = jest.fn(() => BookFindPopulateResult);
    const BookFindResult = {
      populate: BookFindPopulate,
    };
    const BookFind = jest.fn(() => BookFindResult);
    BookFindMock.mockImplementation(BookFind as any);

    const response = await request(server).get('/books');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('books');
    expect(response.body.data.books.length).toBe(1);
    expect(response.body.data.books[0]).toEqual({
      author: authorParams,
      ...bookParams,
    });
  });

  it('findById should respond as expected', async () => {
    const BookFindByIdMock = jest.spyOn(Book, 'findById');
    const BookFindByIdPopulateResult = {
      author: authorParams,
      ...bookParams,
    };
    const BookFindByIdPopulate = jest.fn(() => BookFindByIdPopulateResult);
    const BookFindByIdResult = {
      populate: BookFindByIdPopulate,
    };
    const BookFindById = jest.fn(() => BookFindByIdResult);
    BookFindByIdMock.mockImplementation(BookFindById as any);

    const response = await request(server).get('/books/1');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('book', {
      author: authorParams,
      ...bookParams,
    });
  });

  it('findById should return 404 when not found', async () => {
    const BookFindByIdMock = jest.spyOn(Book, 'findById');
    const BookFindByIdPopulateResult: BookInterface = null;
    const BookFindByIdPopulate = jest.fn(() => BookFindByIdPopulateResult);
    const BookFindByIdResult = {
      populate: BookFindByIdPopulate,
    };
    const BookFindById = jest.fn(() => BookFindByIdResult);
    BookFindByIdMock.mockImplementation(BookFindById as any);

    const response = await request(server).get('/books/1');

    expect(response.status).toEqual(404);
  });
});
