import BodyError from '../errors/BodyError.js';
import { customerSchema } from '../validations/customerValidation.js';

async function postCustomerValidationMiddleware(req, res, next) {
    const {
        name,
        phone,
        cpf,
        birthday,
    } = req.body;

    try {
        const validate = customerSchema.validate({
            name,
            phone,
            cpf,
            birthday,
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
    postCustomerValidationMiddleware,
};
