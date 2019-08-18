import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import config from 'config';

import router from './routes';
import db from './lib/mongoose';

require('dotenv').config();

const { port }: { port: number } = config.get('koa');

const app = new Koa();

db.connect();

app.use(cors());
app.use(bodyParser());

app.use(router());

const server = app.listen(port, () => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server listening on ${port}`);
  }
});

export default server;
