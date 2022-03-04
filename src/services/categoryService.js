import * as categoryRepository from '../repositories/categoryRepository.js';

async function findCategories() {
    const categories = await categoryRepository.find();

    return categories;
}

async function createNewCategory() {
    const category = await categoryRepository.create();

    return category;
}

export {
    findCategories,
    createNewCategory,
};
