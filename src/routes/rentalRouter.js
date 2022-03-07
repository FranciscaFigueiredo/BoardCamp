import { Router } from 'express';
import * as rentalController from '../controllers/rentalController.js';
import { rentalDataValidationMiddleware } from '../middlewares/rentalValidationMiddleware.js';

const router = new Router();

router.get('/rentals', rentalController.getRentals);
router.post('/rentals', rentalDataValidationMiddleware, rentalController.postRental);
router.post('/rentals/:id/return', rentalController.returnRental);

export default router;
