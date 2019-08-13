import Router from 'koa-router';

const router = new Router({ prefix: '/ping' });

router.get('/', async ctx => {
  ctx.body = {
    data: 'Pong',
  };
});

export default router;
