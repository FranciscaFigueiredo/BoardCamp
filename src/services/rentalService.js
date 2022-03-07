import dayjs from 'dayjs';
import ConflictError from '../errors/ConflictError.js';
import NotFoundError from '../errors/NotFoundError.js';
import * as customerRepository from '../repositories/rentalRepository.js';

async function findRentals() {
    const rentals = await customerRepository.find();

    // const customersData = rentals.map((customer) => {
    //     customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD');
    //     return customer;
    // });

    return rentals;
}

async function findRentalById({ id }) {
    const customer = await customerRepository.findById({ id });

    customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD');

    return customer;
}

async function createNewRental({
    name,
    phone,
    cpf,
    birthday,
}) {
    const searchByCpf = await customerRepository.findByCpf({ cpf });

    if (searchByCpf) {
        throw new ConflictError('CPF já cadastrado');
    }

    const customer = await customerRepository.create({
        name,
        phone,
        cpf,
        birthday,
    });

    return customer;
}

async function updateRental({
    name,
    phone,
    cpf,
    birthday,
    id,
}) {
    const customer = await customerRepository.findById({ id });

    if (!customer) {
        throw new NotFoundError('Cliente não cadastrado.');
    }

    const updatedCustomer = await customerRepository.update({
        name,
        phone,
        cpf,
        birthday,
        idUser: customer.id,
    });

    return updatedCustomer;
}

export {
    findRentals,
    findRentalById,
    createNewRental,
    updateRental,
};
