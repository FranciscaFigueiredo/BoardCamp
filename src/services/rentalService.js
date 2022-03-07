import dayjs from 'dayjs';
import NotFoundError from '../errors/NotFoundError.js';
import * as customerRepository from '../repositories/customerRepository.js';
import * as rentalRepository from '../repositories/rentalRepository.js';
import * as gameRepository from '../repositories/gameRepository.js';
import BodyError from '../errors/BodyError.js';

async function findRentals() {
    const rentals = await rentalRepository.find();

    return rentals;
}

async function findRentalById({ id }) {
    const customer = await rentalRepository.findById({ id });

    customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD');

    return customer;
}

async function createNewRental({
    customerId,
    gameId,
    daysRented,
}) {
    const customer = await customerRepository.findById({ id: customerId });
    const game = await gameRepository.findById({ id: gameId });

    if (!customer) {
        throw new BodyError('Usuário não cadastrado.');
    }

    if (!game) {
        throw new BodyError('Jogo não cadastrado.');
    }

    if (game.stockTotal < 1) {
        throw new BodyError('Estoque esgotado');
    }

    const originalPrice = game.pricePerDay * daysRented;
    const date = dayjs().format('YYYY-MM-DD');

    const rental = await rentalRepository.create({
        customerId,
        gameId,
        date,
        daysRented,
        originalPrice,
    });

    await gameRepository.update({ id: gameId, stockTotal: -1 });

    return rental;
}

async function updateRental({ id }) {
    const rental = await rentalRepository.findById({ id });

    if (!rental) {
        throw new NotFoundError('Compra não realizada.');
    }

    if (rental.returnDate) {
        throw new BodyError('Aluguel já devolvido');
    }

    const returnDate = new Date();
    const toReturn = new Date(dayjs(rental.rentDate).add(rental.daysRented, 'day').format('YYYY-MM-DD'));

    let delayFee = 0;
    let days = Math.abs(returnDate.getTime() - toReturn.getTime());
    days = Math.floor(delayFee / (1000 * 60 * 60 * 24));

    if (days > 0) {
        delayFee = ((rental.originalPrice / rental.daysRented) * days);
    }

    const updatedRental = await rentalRepository.update({
        id,
        returnDate,
        delayFee,
    });

    await gameRepository.update({ id, stockTotal: 1 });

    return updatedRental;
}

async function deleteRental({ id }) {
    const rental = await rentalRepository.findById({ id });

    if (!rental) {
        throw new NotFoundError('Aluguel não encontrado');
    }

    if (rental.returnDate) {
        throw new BodyError('Já houve devolução deste item');
    }

    await rentalRepository.deleteRentalData({ id });

    await gameRepository.update({ id: rental.gameId, stockTotal: 1 });

    return true;
}

export {
    findRentals,
    findRentalById,
    createNewRental,
    updateRental,
    deleteRental,
};
