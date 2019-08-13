import compose from 'koa-compose'; // eslint-disable-line
import Router from 'koa-router';
import { ParameterizedContext } from 'koa';

export const combineRouters = (routers: Router[]) => {
  return () => {
    const middleware: compose.Middleware<ParameterizedContext>[] = [];

    routers.forEach(router => {
      middleware.push(router.routes());
      middleware.push(router.allowedMethods());
    });

    return compose(middleware);
  };
};
