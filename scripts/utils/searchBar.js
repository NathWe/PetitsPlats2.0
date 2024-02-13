import { cardDetails } from '../models/data-card.js';
import { createCardHTML } from '../templates/card.js';

// Sélection des éléments du DOM
const searchBar = document.querySelector('.research_text');
const recipeCardsContainer = document.querySelector('#cardsContainer');
const searchForm = document.querySelector('.research');
const closeButton = document.querySelector('.closebutton-delete');


function addCloseButton() {
    closeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    closeButton.addEventListener('click', function () {
        searchBar.value = '';
        closeButton.style.display = 'none';

        // Déclencher un événement de saisie pour simuler une nouvelle recherche
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        searchBar.dispatchEvent(event);
    });
}
// Appel de la fonction pour ajouter le bouton de fermeture
addCloseButton();

// Gestionnaire d'événements pour surveiller les changements dans la barre de recherche
searchBar.addEventListener('input', function () {
    // Vérifier si la barre de recherche contient du texte
    if (searchBar.value.trim().length > 0) {
        // Afficher la croix de suppression
        closeButton.style.display = 'inline';
    } else {
        // Masquer la croix de suppression
        closeButton.style.display = 'none';
    }
});



// Gestionnaire d'événements pour la soumission du formulaire de recherche
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = searchBar.value.toLowerCase();
    if (searchTerm.length > 3) {
        const filteredRecipes = cardDetails.filter((recipe) => {
            const { name, ingredients, description } = recipe;

            // Vérifie si le nom, la description ou un ingrédient contient le terme de recherche
            return name.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm) || ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm));
        });
        // Gestion des résultats de la recherche
        if (filteredRecipes.length === 0) {
            const errorMessageElement = document.createElement('div');
            errorMessageElement.textContent = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher «tarte aux pommes», «poisson», etc.`; // Message d'erreur
            errorMessageElement.classList.add('error-message');
            recipeCardsContainer.innerHTML = '';
            recipeCardsContainer.appendChild(errorMessageElement);
        } else {
            updateRecipeDisplay(filteredRecipes);
        }
    } else { // Si le terme de recherche a une longueur inférieure ou égale à 3 caractères
        updateRecipeDisplay(cardDetails);
    }
});

// Utilisez la fonction createCardHTML pour générer le HTML de la carte de recette
function updateRecipeDisplay(recipes) {
    recipeCardsContainer.innerHTML = ''; // Vide le conteneur des cartes

    recipes.forEach(card => {
        const cardHTML = createCardHTML(card);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML; // Convertit la chaîne HTML en élément
        recipeCardsContainer.appendChild(cardElement);
    });
}
