import { Router } from 'express';
import * as customerController from '../controllers/customerController.js';
import { customerDataValidationMiddleware } from '../middlewares/customerValidationMiddleware.js';

const router = new Router();

router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.post('/customers', customerDataValidationMiddleware, customerController.postCustomer);
router.patch('/customers/:id', customerDataValidationMiddleware, customerController.patchCustomer);

export default router;
