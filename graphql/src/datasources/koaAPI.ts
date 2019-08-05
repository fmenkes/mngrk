import { RESTDataSource } from 'apollo-datasource-rest';
import config from 'config';
import { Book, Author } from '../__generated__/types';

const { url } = config.get('koaAPI');

class KoaAPI extends RESTDataSource {
  public constructor() {
    super();
    this.baseURL = url;
  }

  public async book(id: string): Promise<Book> {
    const response = await this.get(`/books/${id}`);

    const { data } = response;

    return data;
  }

  public async books(): Promise<[Book]> {
    const response = await this.get('/books');

    const { data } = response;

    return data;
  }

  public async author(id: string): Promise<Author> {
    const response = await this.get(`/authors/${id}`);

    const { data } = response;

    return data;
  }

  public async authors(): Promise<[Author]> {
    const response = await this.get('/authors');

    const { data } = response;

    return data;
  }
}

export default KoaAPI;
