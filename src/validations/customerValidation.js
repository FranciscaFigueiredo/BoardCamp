import joi from 'joi';

const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const customerSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.string().pattern(regexDate),
});

export {
    customerSchema,
};
