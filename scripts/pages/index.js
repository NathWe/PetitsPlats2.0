import { cardDetails } from '../models/data-card.js';
import { createCardHTML } from '../templates/card.js';
import { SearchEngine } from '../utils/searchEngine.js';

let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];
let currentSearchText = ''; // Variable pour stocker la recherche principale

const searchBar = document.getElementById('searchInput');
const cardsContainer = document.getElementById('cardsContainer');
const totalRecipesElement = document.getElementById('totalRecipes');

// Fonction de filtrage des recettes en fonction de la recherche
const filterRecipes = () => {
    const searchTerm = currentSearchText.trim().toLowerCase(); // Utilisation de la recherche principale
    // Appel de la fonction SearchEngine avec les paramètres appropriés
    const filteredRecipes = SearchEngine(cardDetails, searchTerm, selectedIngredients, selectedAppliances, selectedUstensils);
    return filteredRecipes;
};

// Mise à jour des cartes lors de la saisie dans la barre de recherche
const updateRecipeCards = () => {
    const filteredRecipes = filterRecipes();

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

// Gestionnaire d'événements pour surveiller les changements dans la barre de recherche
searchBar.addEventListener('input', function () {
    currentSearchText = searchBar.value.toLowerCase().trim();
    filterRecipes(); // Mise à jour du filtre principal
    updateRecipeCards();
});

// Au chargement initial, affiche toutes les recettes
const totalRecipes = cardDetails.length;
totalRecipesElement.textContent = `${totalRecipes} recettes`;

let j = 0;
while (j < cardDetails.length) {
    const cardHTML = createCardHTML(cardDetails[j]);
    cardsContainer.innerHTML += cardHTML;
    j++;
}
