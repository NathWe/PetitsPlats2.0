import { cardDetails } from '../models/data-card.js';
import { SearchEngine } from '../utils/searchEngine.js';
import { updateRecipeDisplay } from '../utils/recipeDisplayUtils.js';

// Sélection des éléments du DOM
export const searchBar = document.querySelector('.research_text');
const searchForm = document.querySelector('.research');
const closeButton = document.querySelector('.closebutton-delete');
let currentSearchText = '';
let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];

// Fonction pour ajouter un bouton de fermeture à la barre de recherche
function addCloseButton() {
    closeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    closeButton.style.display = 'none'; // Masquer la croix par défaut
    closeButton.addEventListener('click', function () {
        searchBar.value = '';
        closeButton.style.display = 'none';
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        searchBar.dispatchEvent(event);
    });
    searchBar.parentNode.appendChild(closeButton); // Ajouter la croix à l'élément parent de la barre de recherche

    // Gestionnaire d'événements pour surveiller les changements dans la barre de recherche
    searchBar.addEventListener('input', function () {
        currentSearchText = searchBar.value.toLowerCase().trim();

        // Afficher la croix dès qu'il y a du texte
        if (currentSearchText.length > 0) {
            closeButton.style.display = 'inline';
        } else {
            closeButton.style.display = 'none';
        }

        if (currentSearchText.length >= 3 && currentSearchText.trim() !== '') {
            filterRecipes();
            updateRecipes();
        }
    });
}

// Gestionnaire d'événements pour la soumission du formulaire de recherche
function handleSearchFormSubmit(event) {
    event.preventDefault();
    filterRecipes();
    updateRecipes();
}

// Fonction pour filtrer les recettes en fonction du texte de recherche
function filterRecipes() {
    const filteredRecipes = SearchEngine(cardDetails, currentSearchText, selectedIngredients, selectedAppliances, selectedUstensils);
    updateRecipeDisplay(filteredRecipes);
}

// Fonction pour mettre à jour les recettes
function updateRecipes() {
    const filteredRecipes = SearchEngine(cardDetails, currentSearchText, selectedIngredients, selectedAppliances, selectedUstensils);
    updateRecipeDisplay(filteredRecipes);
}

// Appel de la fonction addCloseButton pour ajouter le bouton de fermeture
addCloseButton();

// Ajout d'un événement pour la soumission du formulaire de recherche
searchForm.addEventListener('submit', handleSearchFormSubmit);
