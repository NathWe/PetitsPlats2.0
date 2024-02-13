import { cardDetails } from '../models/data-card.js';
import { createCardHTML } from '../templates/card.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('searchInput');
    const totalRecipesElement = document.getElementById('totalRecipes');

    // Fonction de filtrage des recettes en fonction de la recherche
    const filterRecipes = (searchTerm) => {
        return cardDetails.filter(recipe =>
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

        // Génère le HTML des cartes et ajoute au conteneur
        cardsContainer.innerHTML = '';
        let i = 0;
        while (i < filteredRecipes.length) {
            const cardHTML = createCardHTML(filteredRecipes[i]);
            cardsContainer.innerHTML += cardHTML;
            i++;
        }
    };

    searchInput.addEventListener('input', updateRecipeCards);

    // Au chargement initial, affiche toutes les recettes
    const totalRecipes = cardDetails.length;
    totalRecipesElement.textContent = `${totalRecipes} recettes`;

    let j = 0;
    while (j < cardDetails.length) {
        const cardHTML = createCardHTML(cardDetails[j]);
        cardsContainer.innerHTML += cardHTML;
        j++;
    }
});
