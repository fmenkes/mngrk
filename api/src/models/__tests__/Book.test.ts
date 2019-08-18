import Author, { AuthorInterface } from '../Author';
import Book, { BookInterface } from '../Book';

const authorParams = {
  name: 'test',
};

const bookParams = {
  title: 'test',
  genre: 'test',
  publicationYear: 1900,
  pages: 100,
};

describe('create', () => {
  let author: AuthorInterface;
  let book: BookInterface;

  beforeEach(async () => {
    author = await Author.create(authorParams);
    book = await Book.create({ author, ...bookParams });
  });

  it('has the correct title', () => {
    expect(book.title).toBe(bookParams.title);
  });

  it('has the correct genre', () => {
    expect(book.genre).toBe(bookParams.genre);
  });

  it('has the correct publicationYear', () => {
    expect(typeof book.publicationYear).toBe('number');
    expect(book.publicationYear).toBe(bookParams.publicationYear);
  });

  it('has the correct number of pages', () => {
    expect(typeof book.pages).toBe('number');
    expect(book.pages).toBe(bookParams.pages);
  });

  it('author has the correct name', () => {
    const bookAuthor = book.author as AuthorInterface;
    expect(bookAuthor.name).toBe(authorParams.name);
  });
});
