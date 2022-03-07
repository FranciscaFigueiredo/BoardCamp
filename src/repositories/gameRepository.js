import { connection } from '../database.js';

async function find() {
    const games = await connection.query(`
        SELECT games.*, categories.name as "categoryName"
        FROM games
        JOIN categories
            ON categories.id = games."categoryId";
    `);

    return games.rows;
}

async function create({
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,
}) {
    const game = await connection.query(`
        INSERT INTO games
            (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *;
    `, [name, image, stockTotal, categoryId, pricePerDay]);

    return game;
}

async function findByName({ name }) {
    const games = await connection.query(`
        SELECT * FROM games
        WHERE name = $1;
    `, [name]);

    return games.rows;
}

async function findById({ id }) {
    const games = await connection.query(`
        SELECT * FROM games
        WHERE id = $1;
    `, [id]);

    return games.rows[0];
}

async function update({
    id,
    stockTotal,
}) {
    const rental = await connection.query(`
        UPDATE games SET
            "stockTotal" = stockTotal + $1
        WHERE id = $2
        RETURNING *;
    `, [stockTotal, id]);

    return rental.rows[0];
}

export {
    find,
    create,
    findByName,
    findById,
    update,
};
