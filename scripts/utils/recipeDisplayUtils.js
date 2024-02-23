import { createCardHTML } from '../templates/card.js';

const recipeCardsContainer = document.querySelector('#cardsContainer');

export function updateRecipeDisplay(recipes) {
    recipeCardsContainer.innerHTML = ''; // Vide le conteneur des cartes
    recipes.forEach(card => {
        const cardHTML = createCardHTML(card);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML; // Convertit la chaîne HTML en élément
        recipeCardsContainer.appendChild(cardElement);
    });
}