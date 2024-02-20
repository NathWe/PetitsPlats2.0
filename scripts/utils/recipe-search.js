import { cardDetails } from '../models/data-card.js';
import { createCardHTML } from '../templates/card.js';
import { SearchEngine } from '../utils/searchEngine.js';

// Sélection des éléments du DOM
const recipeCardsContainer = document.querySelector('#cardsContainer');
const searchForm = document.querySelector('.research');
const searchBar = document.querySelector('.research_text');
const closeDelete = document.querySelectorAll('.closebutton-delete');
const ingredientsOptions = document.querySelectorAll('#ingredientsList option');
const applianceOptions = document.querySelectorAll('#appliancesList option');
const ustensilsOptions = document.querySelectorAll('#ustensilsList option');
const selectContainer = document.querySelector('.select-option');
const totalRecipesElement = document.getElementById('totalRecipes');


const selectedIngredients = [];
const selectedAppliances = [];
const selectedUstensils = [];

const recipes = cardDetails;

let searchTerm = '';
let closeButton = null; // Déclaration de closeButton en dehors de la fonction

function addCloseButton() {
    closeButton = document.createElement('button');
    closeButton.classList.add('reset-research');
    closeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    closeButton.addEventListener('click', function () {
        searchBar.value = '';
        closeButton.style.display = 'none';
    });
    searchBar.parentNode.appendChild(closeButton);
}

// Gestionnaire d'événements pour le chargement de la fenêtre
window.addEventListener('load', function () {
    if (searchBar.value.trim().length > 0) {
        if (!closeButton) {
            addCloseButton();
        } else {
            closeButton.style.display = 'block';
        }
    } else {
        if (closeButton) {
            closeButton.style.display = 'none';
        }
    }
});

// Gestionnaire d'événements pour la soumission du formulaire de recherche
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchTerm = searchBar.value.toLowerCase();
    filterRecipes();
});


// Fonction pour mettre à jour le nombre total de recettes
function updateTotalRecipesCount() {
    const totalRecipesCount = document.querySelectorAll('.recipe-card').length;
    totalRecipesElement.textContent = `${totalRecipesCount} recettes`;
}

// Fonction createCardHTML pour générer le HTML de la carte de recette
function updateRecipeDisplay(recipes) {
    recipeCardsContainer.innerHTML = ''; // Vide le conteneur des cartes

    let i = 0;
    while (i < recipes.length) {
        const card = recipes[i];
        const cardHTML = createCardHTML(card);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML; // Convertit la chaîne HTML en élément
        recipeCardsContainer.appendChild(cardElement);
        i++;
    }
}

// Écouteurs d'événements aux options des filtres
ingredientsOptions.forEach(option => {
    option.addEventListener('click', function () {
        optionSelect(option, selectedIngredients);
    });
});

applianceOptions.forEach(option => {
    option.addEventListener('click', function () {
        optionSelect(option, selectedAppliances);
    });
});

ustensilsOptions.forEach(option => {
    option.addEventListener('click', function () {
        optionSelect(option, selectedUstensils);
    });
});

function filterRecipes(text) {
    let searchText = text.trim().toLowerCase();

    // Si la barre de recherche est vide mais qu'il y a des filtres sélectionnés, filtrez les recettes en fonction des filtres
    if (!searchText && (selectedIngredients.length > 0 || selectedAppliances.length > 0 || selectedUstensils.length > 0)) {
        searchText = '';
    }

    // Filtre les recettes en fonction du texte de recherche et des filtres sélectionnés
    const filteredRecipes = SearchEngine(cardDetails, searchText, selectedIngredients, selectedAppliances, selectedUstensils);

    // Affiche un message d'erreur si aucune recette n'est trouvée
    if (filteredRecipes.length === 0) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = `Aucune recette ne correspond à vos critères de recherche.`;
        errorMessageElement.classList.add('error-message');
        recipeCardsContainer.innerHTML = '';
        recipeCardsContainer.appendChild(errorMessageElement);
    }

    // Mise à jour de l'affichage des recettes
    updateRecipeDisplay(filteredRecipes);

    // Mise à jour du nombre total de recettes
    updateTotalRecipesCount();
}

// Appeler la fonction filterRecipes lorsque la recherche dans la barre de recherche est modifiée
searchBar.addEventListener('input', function () {
    filterRecipes(searchBar.value);
});

// Écouteurs d'événements aux options des filtres
ingredientsOptions.forEach(option => {
    option.addEventListener('click', function () {
        optionSelect(option, selectedIngredients);
    });
});

applianceOptions.forEach(option => {
    option.addEventListener('click', function () {
        optionSelect(option, selectedAppliances);
    });
});

ustensilsOptions.forEach(option => {
    option.addEventListener('click', function () {
        optionSelect(option, selectedUstensils);
    });
});

// Mise à jour des options sélectionnées dans la fonction optionSelect
function optionSelect(option, selectedItems) {
    if (option.value !== 'default') {
        const optionText = option.text;
        console.log('Option sélectionnée:', optionText);
        if (selectedItems.includes(optionText)) {
            return;
        }
        selectedItems.push(optionText);

        // Crée un élément HTML pour afficher l'option sélectionnée
        const button = document.createElement('p');
        button.textContent = optionText;

        // Ajoute un bouton de suppression pour permettre de supprimer l'option sélectionnée
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        removeButton.addEventListener('click', function () {
            const itemIndex = selectedItems.indexOf(optionText);
            if (itemIndex !== -1) {
                selectedItems.splice(itemIndex, 1);
            }
            // Supprime l'option sélectionnée de l'interface utilisateur
            selectContainer.removeChild(button);
            console.log('Option sélectionnée retirée de selectContainer:', button);

            // Désélectionne l'option correspondante dans la liste déroulante
            option.selected = false;

            // Mise à jour des recettes filtrées
            filterRecipes(searchBar.value);
            console.log('Options sélectionnées:', selectedItems);
        });

        button.appendChild(removeButton);
        selectContainer.appendChild(button);
        console.log('Option sélectionnée ajoutée à selectContainer:', button);

        // Mise à jour de l'apparence de l'option sélectionnée dans le menu déroulant
        option.style.backgroundColor = '#FFD15B';

        // Mse à jour des recettes filtrées et le nombre total de recettes
        filterRecipes(searchBar.value);
        updateTotalRecipesCount();
    }
}
