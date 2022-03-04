import ConflictError from '../errors/ConflictError.js';
import * as gameService from '../services/gameService.js';

async function getGames(req, res, next) {
    try {
        const categories = await gameService.findGames();

        return res.send(categories);
    } catch (error) {
        return next(error);
    }
}

async function postGames(req, res, next) {
    const {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    } = req.body;

    try {
        const category = await gameService.createNewGame({
            name,
            image,
            stockTotal,
            categoryId,
            pricePerDay,
        });

        return res.send(category);
    } catch (error) {
        if (error instanceof ConflictError) {
            return res.status(409).send(error.message);
        }
        return next(error);
    }
}

export {
    getGames,
    postGames,
};
