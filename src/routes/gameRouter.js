import { Router } from 'express';
import * as gameController from '../controllers/gameController.js';
import { gameDataValidationMiddleware } from '../middlewares/gameValidationMiddleware.js';

const router = new Router();

router.get('/games', gameController.getGames);
router.post('/games', gameDataValidationMiddleware, gameController.postGames);

export default router;
