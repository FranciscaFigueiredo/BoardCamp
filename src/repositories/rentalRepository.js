import { connection } from '../database.js';
import NotFoundError from '../errors/NotFoundError.js';

async function find() {
    const rentals = await connection.query({
        text: `
            SELECT 
                rentals.*,
                customers.id, customers.name,
                games.id, games.name,
                categories.*
            FROM rentals
            JOIN customers
                ON customers.id = rentals."customerId"
            JOIN games
                ON games.id = rentals."gameId"
            JOIN categories
                ON games."categoryId" = categories.id;
        `,
        rowMode: 'array',
    });

    const rentalsResult = rentals.rows.map((row) => {
        const [
            id,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            idCustomer,
            nameCustomer,
            idGame,
            nameGame,
            categoryId,
            categoryName,
        ] = row;

        return {
            id,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            customer: {
                id: idCustomer,
                name: nameCustomer,
            },
            game: {
                id: idGame,
                name: nameGame,
                categoryId,
                categoryName,
            },
        };
    });

    return rentalsResult;
}

async function findById({ id }) {
    const rentals = await connection.query({
        text: `
            SELECT 
                rentals.*,
                customers.id, customers.name,
                games.id, games.name, games."pricePerDay",
                categories.*
            FROM rentals
            JOIN customers
                ON customers.id = rentals."customerId"
            JOIN games
                ON games.id = rentals."gameId"
            JOIN categories
                ON games."categoryId" = categories.id
            WHERE rentals.id = $1;
        `,
        rowMode: 'array',
    }, [id]);

    const rentalResult = rentals.rows.map((row) => {
        const [
            idRental,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            idCustomer,
            nameCustomer,
            idGame,
            nameGame,
            pricePerDay,
            categoryId,
            categoryName,
        ] = row;

        return {
            id: idRental,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            customer: {
                id: idCustomer,
                name: nameCustomer,
            },
            game: {
                id: idGame,
                name: nameGame,
                pricePerDay,
                categoryId,
                categoryName,
            },
        };
    });

    return rentalResult[0];
}

async function findByCpf({ cpf }) {
    const customer = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);

    if (!customer) {
        throw new NotFoundError('Usuário não existente');
    }

    return customer.rows[0];
}

async function create({
    customerId,
    gameId,
    date,
    daysRented,
    originalPrice,
}) {
    const rental = await connection.query(`
        INSERT INTO rentals
            ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *;
    `, [customerId, gameId, date, daysRented, originalPrice]);

    return rental.rows[0];
}

async function update({
    id,
    returnDate,
    delayFee,
}) {
    const rental = await connection.query(`
        UPDATE rentals SET
            "returnDate" = $1, "delayFee" = $2
        WHERE id = $3
        RETURNING *;
    `, [returnDate, delayFee, id]);

    return rental.rows[0];
}

async function deleteRentalData({ id }) {
    const rental = await connection.query(`
        DELETE FROM rentals
        WHERE id = $
        RETURNING *;
    `, [id]);

    return rental.rows[0];
}

export {
    find,
    findById,
    create,
    findByCpf,
    update,
    deleteRentalData,
};
