import { ParameterizedContext } from 'koa';
import Author from '../models/Author';

export const create = async (
  ctx: ParameterizedContext,
  next: () => Promise<any>,
) => {
  const params = ctx.request.body;

  try {
    const author = await Author.create(params);
    ctx.body = {
      data: {
        author,
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

  try {
    const author = await Author.findById(id);

    if (!author) {
      ctx.throw(404);
    }

    ctx.body = {
      data: {
        author,
      },
    };
  } catch {
    ctx.throw('findbyid error');
  }

  await next();
};

export const all = async (
  ctx: ParameterizedContext,
  next: () => Promise<any>,
) => {
  try {
    const authors = await Author.find({});
    ctx.body = {
      data: {
        authors,
      },
    };
  } catch {
    ctx.throw('find error');
  }

  await next();
};
