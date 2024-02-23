export function SearchEngine(recipes, text, ingredients, appliances, ustensils) {
    let filteredRecipes = recipes;

    // Filtre les recettes par le texte libre
    if (text && text.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(text.toLowerCase()) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(text.toLowerCase())) ||
            recipe.description.toLowerCase().includes(text.toLowerCase())
        );
    }

    // Filtre les recettes par les ingrédients sélectionnés
    if (ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            ingredients.every(selectedIngredient =>
                recipe.ingredients.some(ingredient =>
                    ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())
                )
            )
        );
    }

    // Filtre les recettes par les appareils sélectionnés
    if (appliances.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            appliances.includes(recipe.appliance.toLowerCase())
        );
    }

    // Filtre les recettes par les ustensiles sélectionnés
    if (ustensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            ustensils.some(selectedUstensil =>
                recipe.ustensils.some(ustensil =>
                    ustensil.toLowerCase().includes(selectedUstensil.toLowerCase())
                )
            )
        );
    }

    return filteredRecipes;
}
