import ConflictError from '../errors/ConflictError.js';
import * as customerService from '../services/customerService.js';

async function getCustomers(req, res, next) {
    try {
        const customers = await customerService.findCustomers();

        return res.send(customers);
    } catch (error) {
        return next(error);
    }
}

async function getCustomerById(req, res, next) {
    const { id } = req.params;

    try {
        const customer = await customerService.findCustomerById({ id });

        return res.send(customer);
    } catch (error) {
        return next(error);
    }
}

async function postCustomer(req, res, next) {
    const {
        name,
        phone,
        cpf,
        birthday,
    } = req.body;

    try {
        const customer = await customerService.createNewCustomer({
            name,
            phone,
            cpf,
            birthday,
        });

        return res.send(customer);
    } catch (error) {
        if (error instanceof ConflictError) {
            return res.status(409).send(error.message);
        }
        return next(error);
    }
}

async function patchCustomer(req, res, next) {
    const {
        name,
        phone,
        cpf,
        birthday,
    } = req.body;

    const { id } = req.params;

    try {
        const customer = await customerService.updateCustomer({
            name,
            phone,
            cpf,
            birthday,
            id,
        });

        return res.status(200).send(customer);
    } catch (error) {
        if (error instanceof ConflictError) {
            return res.status(409).send(error.message);
        }
        return next(error);
    }
}

export {
    getCustomers,
    getCustomerById,
    postCustomer,
    patchCustomer,
};
