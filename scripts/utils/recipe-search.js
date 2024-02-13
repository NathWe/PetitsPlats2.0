import { cardDetails } from '../models/data-card.js';
import { createCardHTML } from '../templates/card.js';

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

// Utilisez la fonction createCardHTML pour générer le HTML de la carte de recette
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

// Ajoutez des écouteurs d'événements aux options des filtres
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

// Mettre à jour les options sélectionnées dans la fonction optionSelect
function optionSelect(option, selectedItems) {
    if (option.value !== 'default') {
        const optionText = option.text;
        console.log('Option sélectionnée:', optionText);
        if (selectedItems.includes(optionText)) {
            return;
        }
        selectedItems.push(optionText);

        // Créez un élément HTML pour afficher l'option sélectionnée
        const button = document.createElement('p');
        button.textContent = optionText;

        // Ajoutez un bouton de suppression pour permettre de supprimer l'option sélectionnée
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        removeButton.addEventListener('click', function () {
            const itemIndex = selectedItems.indexOf(optionText);
            if (itemIndex !== -1) {
                selectedItems.splice(itemIndex, 1);
            }
            // Supprimez l'option sélectionnée de l'interface utilisateur
            selectContainer.removeChild(button);
            console.log('Option sélectionnée retirée de selectContainer:', button);

            // Mettez à jour les recettes filtrées
            filterRecipes();
            console.log('Options sélectionnées:', selectedItems);
        });

        button.appendChild(removeButton);
        selectContainer.appendChild(button);
        console.log('Option sélectionnée ajoutée à selectContainer:', button);

        // Mettez à jour l'apparence de l'option sélectionnée dans le menu déroulant
        option.style.backgroundColor = '#FFD15B';

        // Mettez à jour les recettes filtrées et le nombre total de recettes
        filterRecipes();
        updateTotalRecipesCount();
    }
}

function filterRecipes() {
    // Filtrer les recettes en fonction du terme de recherche et des filtres sélectionnés
    const filteredRecipes = recipes.filter(recipe => {
        const { name, ingredients, description, appliance, ustensils } = recipe;
        const searchTermMatch = name.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm) || ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm));
        const ingredientMatch = selectedIngredients.every(selectedIngredient => ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())));
        const applianceMatch = selectedAppliances.length === 0 || selectedAppliances.includes(appliance.toLowerCase());
        const ustensilsMatch = selectedUstensils.length === 0 || selectedUstensils.some(selectedUstensil => ustensils.includes(selectedUstensil.toLowerCase()));

        return searchTermMatch && ingredientMatch && applianceMatch && ustensilsMatch;
    });

    // Afficher un message d'erreur si aucune recette n'est trouvée
    if (filteredRecipes.length === 0) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = `Aucune recette ne correspond à vos critères de recherche.`;
        errorMessageElement.classList.add('error-message');
        recipeCardsContainer.innerHTML = '';
        recipeCardsContainer.appendChild(errorMessageElement);
    }

    // Mettre à jour l'affichage des recettes
    updateRecipeDisplay(filteredRecipes);

    // Mettre à jour le nombre total de recettes
    updateTotalRecipesCount();
}
