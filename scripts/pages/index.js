import { recipes } from '../../data/recipes.js';
import { createCardHTML } from '../templates/card.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('searchInput');
    const totalRecipesElement = document.getElementById('totalRecipes');

    // Fonction de filtrage des recettes en fonction de la recherche
    const filterRecipes = (searchTerm) => {
        return recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Met à jour les cartes lors de la saisie dans la barre de recherche
    const updateRecipeCards = () => {
        const searchTerm = searchInput.value.trim();
        const filteredRecipes = filterRecipes(searchTerm);

        // Affiche le nombre total de recettes trouvées
        const totalRecipes = filteredRecipes.length;
        totalRecipesElement.textContent = `${totalRecipes} recettes`;

        // Génère le HTML des cartes et ajouter au conteneur
        cardsContainer.innerHTML = '';
        filteredRecipes.forEach((recipe) => {
            const cardHTML = createCardHTML(recipe);
            cardsContainer.innerHTML += cardHTML;
        });
    };

    searchInput.addEventListener('input', updateRecipeCards);

    // Au chargement initial, affiche toutes les recettes
    const totalRecipes = recipes.length;
    totalRecipesElement.textContent = `${totalRecipes} recettes`;

    recipes.forEach((recipe) => {
        const cardHTML = createCardHTML(recipe);
        cardsContainer.innerHTML += cardHTML;
    });
});
