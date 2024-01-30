import { recipes } from '../../data/recipes.js';

export const cardDetails = recipes.map(recipe => {
    return {
        id: recipe.id,
        image: recipe.image,
        name: recipe.name,
        ingredients: recipe.ingredients,
        time: recipe.time,
        description: recipe.description,
        ustensils: recipe.ustensils,
        appliance: recipe.appliance,
    };
});