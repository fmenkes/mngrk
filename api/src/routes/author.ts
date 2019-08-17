import Router from 'koa-router';
import * as author from '../controllers/author';

const router = new Router({ prefix: '/authors' });

router.get('/', author.all);
router.get('/:id', author.findById);
router.post('/', author.create);

export default router;
