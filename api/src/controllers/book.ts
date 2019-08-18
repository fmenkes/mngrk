import { ParameterizedContext } from 'koa';
import Author from '../models/Author';
import Book from '../models/Book';

export const create = async (
  ctx: ParameterizedContext,
  next: () => Promise<any>,
) => {
  const params = ctx.request.body;

  try {
    const author = await Author.findById(params.author);
    const book = await Book.create({ author, ...params });
    book.author = author;
    ctx.body = {
      data: {
        book,
      },
    };
  } catch {
    ctx.throw('creation error');
  }

  await next();
};

export const findById = async (
  ctx: ParameterizedContext,
  next: () => Promise<any>,
) => {
  const { id } = ctx.params;

  let book;

  try {
    book = await Book.findById(id).populate('author');
  } catch (e) {
    console.log(e);
    ctx.throw('findbyid error');
  }
  if (!book) {
    ctx.throw(404);
  }
  ctx.body = {
    data: {
      book,
    },
  };

  await next();
};

export const all = async (
  ctx: ParameterizedContext,
  next: () => Promise<any>,
) => {
  try {
    const books = await Book.find({}).populate('author');
    ctx.body = {
      data: {
        books,
      },
    };
  } catch {
    ctx.throw('find error');
  }

  await next();
};
