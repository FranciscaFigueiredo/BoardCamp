import BodyError from '../errors/BodyError.js';
import { rentalSchema } from '../validations/rentalValidation.js';

async function gameDataValidationMiddleware(req, res, next) {
    const {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    } = req.body;

    try {
        const validate = rentalSchema.validate({
            name,
            image,
            stockTotal,
            categoryId,
            pricePerDay,
        });

        if (validate.error) {
            throw new BodyError(validate.error.message);
        }

        return next();
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }

        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    gameDataValidationMiddleware,
};
