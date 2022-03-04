import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { postCategoryValidationMiddleware } from '../middlewares/categoryValidationMiddleware.js';

const router = new Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', postCategoryValidationMiddleware, categoryController.postCategories);

export default router;
