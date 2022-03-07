import ConflictError from '../errors/ConflictError.js';
import * as rentalService from '../services/rentalService.js';

async function getRentals(req, res, next) {
    try {
        const rentals = await rentalService.findRentals();

        return res.send(rentals);
    } catch (error) {
        return next(error);
    }
}

async function getCustomerById(req, res, next) {
    const { id } = req.params;

    try {
        const customer = await rentalService.findRentalById({ id });

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
        const customer = await rentalService.createNewRental({
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
        const customer = await rentalService.updateRental({
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
    getRentals,
    getCustomerById,
    postCustomer,
    patchCustomer,
};
