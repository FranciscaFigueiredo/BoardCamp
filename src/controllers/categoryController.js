import * as categoryService from '../services/categoryService.js';

async function getCategories(req, res, next) {
    try {
        const categories = await categoryService.findCategories();

        return res.send(categories);
    } catch (error) {
        return next(error);
    }
}

async function postCategories(req, res, next) {
    const { name } = req.body;

    try {
        const category = await categoryService.createNewCategory({ name });

        return res.send(category);
    } catch (error) {
        return next(error);
    }
}

export {
    getCategories,
    postCategories,
};
