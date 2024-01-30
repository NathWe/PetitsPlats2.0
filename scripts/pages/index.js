// scripts/pages/index.js
import { recipes } from '../../data/recipes.js';
import { createCardHTML } from '../templates/card.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cardsContainer');

    // Générer le HTML des cartes et ajouter au conteneur
    recipes.forEach((recipe) => {
        const cardHTML = createCardHTML(recipe);
        cardsContainer.innerHTML += cardHTML;
    });
});
