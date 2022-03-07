import { Router } from 'express';
import * as rentalController from '../controllers/rentalController.js';

const router = new Router();

router.get('/rentals', rentalController.getRentals);

export default router;
