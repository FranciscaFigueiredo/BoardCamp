import { connection } from '../database.js';
import NotFoundError from '../errors/NotFoundError.js';

async function find() {
    const customers = await connection.query('SELECT * FROM customers;');

    return customers.rows;
}

async function findById({ id }) {
    const customer = await connection.query('SELECT * FROM customers WHERE id = $1;', [id]);

    if (!customer) {
        throw new NotFoundError('Usuário não existente');
    }

    return customer.rows[0];
}

async function findByCpf({ cpf }) {
    const customer = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);

    if (!customer) {
        throw new NotFoundError('Usuário não existente');
    }

    return customer.rows[0];
}

async function create({
    name,
    phone,
    cpf,
    birthday,
}) {
    const customer = await connection.query(`
        INSERT INTO customers
            (name, phone, cpf, birthday)
        VALUES 
            ($1, $2, $3, $4)
        RETURNING *;
    `, [name, phone, cpf, birthday]);

    return customer.rows[0];
}

async function update({
    name,
    phone,
    cpf,
    birthday,
    idUser,
}) {
    const customer = await connection.query(`
        UPDATE customers SET
            name =$1, phone= $2, cpf = $3, birthday = $4
        WHERE id = $5
        RETURNING *;
    `, [name, phone, cpf, birthday, idUser]);

    return customer.rows[0];
}

export {
    find,
    findById,
    create,
    findByCpf,
    update,
};
