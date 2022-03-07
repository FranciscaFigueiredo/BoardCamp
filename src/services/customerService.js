import dayjs from 'dayjs';
import ConflictError from '../errors/ConflictError.js';
import NotFoundError from '../errors/NotFoundError.js';
import * as customerRepository from '../repositories/customerRepository.js';

async function findCustomers() {
    const customers = await customerRepository.find();

    const customersData = customers.map((customer) => {
        customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD');
        return customer;
    });

    return customersData;
}

async function findCustomerById({ id }) {
    const customer = await customerRepository.findById({ id });

    customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD');

    return customer;
}

async function createNewCustomer({
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

async function updateCustomer({
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
    findCustomers,
    findCustomerById,
    createNewCustomer,
    updateCustomer,
};
