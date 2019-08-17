import Router from 'koa-router';
import * as book from '../controllers/book';

const router = new Router({ prefix: '/books' });

router.get('/', book.all);
router.get('/:id', book.findById);
router.post('/', book.create);

export default router;
