import { connection } from '../database.js';

async function find() {
    const categories = await connection.query('SELECT * FROM categories;');

    return categories.rows;
}

async function create({ name }) {
    const category = await connection.query(`
        INSERT INTO categories
            (name)
        VALUES ($1)
        RETURNING *;
    `, [name]);

    return category;
}

export {
    find,
    create,
};
