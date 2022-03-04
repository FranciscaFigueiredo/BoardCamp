import { Router } from 'express';
import * as gameController from '../controllers/gameController.js';

const router = new Router();

router.get('/games', gameController.getGames);
router.post('/games', gameController.postGames);

export default router;
