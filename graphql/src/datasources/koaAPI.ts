import { RESTDataSource } from 'apollo-datasource-rest';
import config from 'config';
import { Book, Author } from '../__generated__/types';

const { url } = config.get('koaAPI');

export interface CreateBook {
  title: string;
  genre?: string;
  publicationYear: number;
  pages: number;
  author: string;
}

class KoaAPI extends RESTDataSource {
  public constructor() {
    super();
    this.baseURL = url;
  }

  public async createBook(params: CreateBook): Promise<Book> {
    const response = await this.post('/books', params);

    const { data } = response;

    return data.book;
  }

  public async book(id: string): Promise<Book> {
    const response = await this.get(`/books/${id}`);

    const { data } = response;

    return data.book;
  }

  public async books(): Promise<[Book]> {
    const response = await this.get('/books');

    const { data } = response;

    return data.books;
  }

  public async createAuthor(name: string): Promise<Author> {
    const response = await this.post('/authors', {
      name,
    });

    const { data } = response;

    return data.author;
  }

  public async author(id: string): Promise<Author> {
    const response = await this.get(`/authors/${id}`);

    const { data } = response;

    return data.author;
  }

  public async authors(): Promise<[Author]> {
    const response = await this.get('/authors');

    const { data } = response;

    return data.authors;
  }
}

export default KoaAPI;
