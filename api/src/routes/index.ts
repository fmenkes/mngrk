import Router from 'koa-router';
import { ParameterizedContext } from 'koa';

import { combineRouters } from '../utils/routes';

import pingRouter from './ping';
import authorRouter from './author';
import bookRouter from './book';

const indexRouter = new Router();

indexRouter.get('/', async (ctx: ParameterizedContext) => {
  ctx.body = {
    data: 'Hello World',
  };
});

const router = combineRouters([
  indexRouter,
  pingRouter,
  authorRouter,
  bookRouter,
]);

export default router;
