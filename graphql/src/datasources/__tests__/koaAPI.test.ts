import KoaAPI, { CreateBook } from '../koaAPI';

beforeEach(() => {
  jest.clearAllMocks();
});

const createBookParams: CreateBook = {
  title: 'test',
  genre: 'test',
  publicationYear: 1900,
  pages: 100,
  author: 'test',
};

const bookParams = {
  title: 'test',
  genre: 'test',
  publicationYear: 1900,
  pages: 100,
  author: {
    name: 'test',
  },
};

const authorParams = {
  name: 'test',
};

const mockBookResponse = {
  data: {
    book: bookParams,
  },
};

const mockAuthorResponse = {
  data: {
    author: authorParams,
  },
};

const mockAuthorsResponse = {
  data: {
    authors: [authorParams],
  },
};

const mockBooksResponse = {
  data: {
    books: [bookParams],
  },
};

const Koa = new KoaAPI();
const mockPost = jest.fn();
const mockGet = jest.fn();
Object.defineProperty(Koa, 'post', { value: mockPost });
Object.defineProperty(Koa, 'get', { value: mockGet });

describe('book', () => {
  it('createBook returns correctly', async () => {
    mockPost.mockResolvedValue(mockBookResponse);

    const book = await Koa.createBook(createBookParams);

    expect(book).toEqual(bookParams);
  });

  it('book returns correctly', async () => {
    mockGet.mockResolvedValue(mockBookResponse);

    const book = await Koa.book('test');

    expect(book).toEqual(bookParams);
  });

  it('books returns correctly', async () => {
    mockGet.mockResolvedValue(mockBooksResponse);

    const book = await Koa.books();

    expect(book).toEqual([bookParams]);
  });
});

describe('author', () => {
  it('createAuthor returns correctly', async () => {
    mockPost.mockResolvedValue(mockAuthorResponse);

    const author = await Koa.createAuthor('test');

    expect(author).toEqual(authorParams);
  });

  it('author returns correctly', async () => {
    mockGet.mockResolvedValue(mockAuthorResponse);

    const author = await Koa.author('test');

    expect(author).toEqual(authorParams);
  });

  it('authors returns correctly', async () => {
    mockGet.mockResolvedValue(mockAuthorsResponse);

    const authors = await Koa.authors();

    expect(authors).toEqual([authorParams]);
  });
});
