export function SearchEngine(recipes, text, ingredients, appliances, ustensils, searchTextIngredients, searchTextAppliance, searchTextUstensils) {
    let filteredRecipes = [];

    let i = 0;
    while (i < recipes.length) {
        const recipe = recipes[i];

        // Définir une variable shouldAddRecipe à true au début de chaque itération
        let shouldAddRecipe = true;

        // Filtrer les recettes par le texte libre
        if (text) {
            if (
                recipe.name.toLowerCase().includes(text.toLowerCase()) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(text.toLowerCase())) ||
                recipe.description.toLowerCase().includes(text.toLowerCase())
            ) {
                shouldAddRecipe = true;
            } else {
                shouldAddRecipe = false;
            }
        }

        // Filtrer les recettes par les ingrédients sélectionnés
        if (ingredients.length > 0) {
            if (!ingredients.every(selectedIngredient =>
                recipe.ingredients.some(ingredient =>
                    ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())
                )
            )) {
                shouldAddRecipe = false;
            }
        }

        // Filtrer les recettes par les appareils sélectionnés
        if (appliances.length > 0) {
            if (!appliances.includes(recipe.appliance.toLowerCase())) {
                shouldAddRecipe = false;
            }
        }

        // Filtrer les recettes par les ustensiles sélectionnés
        if (ustensils.length > 0) {
            if (!ustensils.some(selectedUstensil =>
                recipe.ustensils.some(ustensil =>
                    ustensil.toLowerCase().includes(selectedUstensil.toLowerCase())
                )
            )) {
                shouldAddRecipe = false;
            }
        }

        // Filtrer les recettes par le texte de la recherche d'ingrédients
        if (searchTextIngredients) {
            if (!recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTextIngredients))) {
                shouldAddRecipe = false;
            }
        }

        // Filtrer les recettes par le texte de la recherche d'appareils
        if (searchTextAppliance) {
            if (!recipe.appliance.toLowerCase().includes(searchTextAppliance)) {
                shouldAddRecipe = false;
            }
        }

        // Filtrer les recettes par le texte de la recherche d'ustensiles
        if (searchTextUstensils) {
            if (!recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchTextUstensils))) {
                shouldAddRecipe = false;
            }
        }

        // Si shouldAddRecipe est toujours true, ajouter la recette aux recettes filtrées
        if (shouldAddRecipe) {
            filteredRecipes.push(recipe);
        }

        i++;
    }

    return filteredRecipes;
}
