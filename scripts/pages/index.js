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

// Fonction pour filtrer les recettes en fonction de la recherche
const filterRecipes = () => {
    const searchTerm = currentSearchText.trim().toLowerCase(); // Utilisation de la recherche principale
    return SearchEngine(cardDetails, searchTerm, selectedIngredients, selectedAppliances, selectedUstensils);
};

// Mise à jour des cartes lors de la saisie dans la barre de recherche
const updateRecipeCards = () => {
    const filteredRecipes = filterRecipes();

    // Affiche le nombre total de recettes trouvées
    totalRecipesElement.textContent = `${filteredRecipes.length} recettes`;

    // Génère le HTML des cartes et ajoute au conteneur
    cardsContainer.innerHTML = filteredRecipes.map(createCardHTML).join('');
};

// Gestionnaire d'événements pour surveiller les changements dans la barre de recherche
searchBar.addEventListener('input', () => {
    currentSearchText = searchBar.value.toLowerCase().trim();
    filterRecipes(); // Mise à jour du filtre principal
    updateRecipeCards();
});

// Au chargement initial, affiche toutes les recettes
totalRecipesElement.textContent = `${cardDetails.length} recettes`;
cardsContainer.innerHTML = cardDetails.map(createCardHTML).join('');
