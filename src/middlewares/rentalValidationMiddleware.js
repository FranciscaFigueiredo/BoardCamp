import BodyError from '../errors/BodyError.js';
import { rentalSchema } from '../validations/rentalValidation.js';

async function rentalDataValidationMiddleware(req, res, next) {
    const {
        customerId,
        gameId,
        daysRented,
    } = req.body;

    try {
        const validate = rentalSchema.validate({
            customerId,
            gameId,
            daysRented,
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
    rentalDataValidationMiddleware,
};
