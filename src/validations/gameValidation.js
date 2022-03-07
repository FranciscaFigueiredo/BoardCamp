import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().min(2).max(45).required(),
    image: joi.string().pattern(/https?:\/\/.*.(?:png|jpg)/),
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().min(1).required(),
    pricePerDay: joi.number().min(3).required(),
});

export {
    gameSchema,
};
