import joi from 'joi';

const rentalSchema = joi.object({
    customerId: joi.number().min(1),
    gameId: joi.number().min(1),
    daysRented: joi.number().min(1),
});

export {
    rentalSchema,
};
