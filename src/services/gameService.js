import ConflictError from '../errors/ConflictError.js';
import * as gameRepository from '../repositories/gameRepository.js';

async function findGames() {
    const games = await gameRepository.find();

    return games;
}

async function createNewGame({
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,
}) {
    const search = await gameRepository.findByName({ name });

    if (search.length) {
        throw new ConflictError('Nome de jogo já cadastrado');
    }

    const game = await gameRepository.create({
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    });

    return game;
}

export {
    findGames,
    createNewGame,
};
