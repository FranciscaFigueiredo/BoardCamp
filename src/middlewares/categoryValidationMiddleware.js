import BodyError from '../errors/BodyError.js';
import { categorySchema } from '../validations/categoryValidation.js';

async function postCategoryValidationMiddleware(req, res, next) {
    const {
        name,
    } = req.body;

    try {
        const validate = categorySchema.validate({
            name,
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
    postCategoryValidationMiddleware,
};
