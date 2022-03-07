import { Router } from 'express';
import categoryRouter from './categoryRouter.js';
import gameRouter from './gameRouter.js';
import customerRouter from './customerRouter.js';
import rentalRouter from './rentalRouter.js';

const router = new Router();

router.use(categoryRouter);
router.use(gameRouter);
router.use(customerRouter);
router.use(rentalRouter);

export default router;
