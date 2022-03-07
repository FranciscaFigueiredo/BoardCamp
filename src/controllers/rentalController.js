import BodyError from '../errors/BodyError.js';
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

async function postRental(req, res, next) {
    const {
        customerId,
        gameId,
        daysRented,
    } = req.body;

    try {
        const customer = await rentalService.createNewRental({
            customerId,
            gameId,
            daysRented,
        });

        return res.send(customer);
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }
        return next(error);
    }
}

async function returnRental(req, res, next) {
    const { id } = req.params;

    try {
        const customer = await rentalService.updateRental({ id });

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
    postRental,
    returnRental,
};
