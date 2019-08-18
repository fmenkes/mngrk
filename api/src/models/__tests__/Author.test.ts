import Author, { AuthorInterface } from '../Author';

const authorParams = {
  name: 'test',
};

describe('create', () => {
  let author: AuthorInterface;

  beforeEach(async () => {
    author = await Author.create(authorParams);
  });

  it('has the correct name', () => {
    expect(author.name).toBe(authorParams.name);
  });
});
