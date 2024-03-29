import { recipes } from '../../data/recipes.js';
import { createCardHTML } from '../templates/card.js';
import { SearchEngine } from '../utils/searchEngine.js';
import { updateRecipeDisplay } from '../utils/recipeDisplayUtils.js';

const ingredientsOptions = document.querySelectorAll('#ingredientsList option');
const applianceOptions = document.querySelectorAll('#appliancesList option');
const ustensilsOptions = document.querySelectorAll('#ustensilsList option');
const ingredientsSearch = document.querySelectorAll('#ingredientsSearchInput');
const applianceSearch = document.querySelectorAll('#appliancesSearchInput');
const ustensilsSearch = document.querySelectorAll('#ustensilsSearchInput');
const closeAppliance = document.querySelectorAll('.closebutton-appliance')
const closeIngredient = document.querySelectorAll('.closebutton-ingredients')
const closeUstensils = document.querySelectorAll('.closebutton-ustensils')

let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];


// Fonction de filtrage des options
function filterOptions(options, searchText) {
    searchText = searchText.toLowerCase();

    options.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(searchText)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}

// Ajout d' écouteurs d'événements de clic pour chaque option de recherche
ingredientsOptions.forEach(option => {
    option.addEventListener('click', () => {
        updateRecipeCards(option.textContent);
    });
});

applianceOptions.forEach(option => {
    option.addEventListener('click', () => {
        updateRecipeCards(option.textContent);
    });
});

ustensilsOptions.forEach(option => {
    option.addEventListener('click', () => {
        updateRecipeCards(option.textContent);
    });
});

function updateRecipeCards(clickedElement) {
    if (!clickedElement) return;
    // Convertit l'élément cliqué en minuscules pour une comparaison insensible à la casse
    const clickedElementLower = clickedElement.toLowerCase();

    // Filtre les cartes en fonction de l'élément cliqué
    const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === clickedElementLower) ||
        recipe.appliance.toLowerCase() === clickedElementLower ||
        recipe.ustensils.some(ustensil => ustensil.toLowerCase() === clickedElementLower)
    );

    // Affiche les cartes filtrées
    cardsContainer.innerHTML = '';
    filteredRecipes.forEach((recipe) => {
        const cardHTML = createCardHTML(recipe);
        cardsContainer.innerHTML += cardHTML;
    });

    // Mise à jour du nombre total de recettes
    updateTotalRecipes();
}

//Gestion de la recherche d'ingrédients
ingredientsSearch.forEach(input => {
    const closeButton = input.parentElement.querySelector('.closebutton-ingredients');
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ingredientsOptions, searchText);

        if (searchText === '') {
            closeButton.classList.add('closebutton-ingredients');
        } else {
            closeButton.classList.remove('closebutton-ingredients');
        }
        // Appel de la fonction SearchEngine avec les paramètres appropriés
        const filteredRecipes = SearchEngine(recipes, searchText, selectedIngredients, selectedAppliances, selectedUstensils);
        // Mise à jour de l'affichage des recettes
        updateRecipeDisplay(filteredRecipes);
        updateTotalRecipes();
    });
});

// Gestion de la recherche d'appareils
applianceSearch.forEach(input => {
    const closeButton = input.parentElement.querySelector('.closebutton-appliance');
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(applianceOptions, searchText);

        if (searchText === '') {
            closeButton.classList.add('closebutton-appliance');
        } else {
            closeButton.classList.remove('closebutton-appliance');
        }
        // Appel de la fonction SearchEngine avec les paramètres appropriés
        const filteredRecipes = SearchEngine(recipes, searchText, selectedIngredients, selectedAppliances, selectedUstensils);
        // Mise à jour de l'affichage des recettes
        updateRecipeDisplay(filteredRecipes);
        updateTotalRecipes();
    });
});

//Gestion de la recherche d'ustensiles
ustensilsSearch.forEach(input => {
    const closeButton = input.parentElement.querySelector('.closebutton-ustensils');
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ustensilsOptions, searchText);

        if (searchText === '') {
            closeButton.classList.add('closebutton-ustensils');
        } else {
            closeButton.classList.remove('closebutton-ustensils');
        }
        // Appel de la fonction SearchEngine avec les paramètres appropriés
        const filteredRecipes = SearchEngine(recipes, searchText, selectedIngredients, selectedAppliances, selectedUstensils);
        // Mise à jour de l'affichage des recettes
        updateRecipeDisplay(filteredRecipes);
        updateTotalRecipes();
    });
});

// Fonction pour mettre à jour le nombre total de recettes
function updateTotalRecipes() {
    const totalRecipesElement = document.getElementById('totalRecipes');
    const totalRecipesCount = document.querySelectorAll('.recipe-card').length;
    totalRecipesElement.textContent = `Total de recettes : ${totalRecipesCount}`;
}

//Réinitialisation de la barre de recherche pour les ingrédients
closeIngredient.forEach(closeButton => {
    closeButton.addEventListener('click', () => {

        ingredientsSearch.forEach(input => {
            input.value = '';
            filterOptions(ingredientsOptions, '');
            closeButton.classList.add('delete');
        });
        // Appel de la fonction SearchEngine pour afficher toutes les recettes
        const filteredRecipes = SearchEngine(recipes, '', [], [], []);
        // Mise à jour de l'affichage des recettes
        updateRecipeDisplay(filteredRecipes);
        updateTotalRecipes();
    });
});

//Réinitialisation de la barre de recherche pour les appareils
closeAppliance.forEach(closeButton => {
    closeButton.addEventListener('click', () => {

        applianceSearch.forEach(input => {
            input.value = '';
            filterOptions(applianceOptions, '');
            closeButton.classList.add('delete');
        });
        // Appel de la fonction SearchEngine pour afficher toutes les recettes
        const filteredRecipes = SearchEngine(recipes, '', [], [], []);
        // Mise à jour de l'affichage des recettes
        updateRecipeDisplay(filteredRecipes);
        updateTotalRecipes();
    });
});

//Réinitialisation de la barre de recherche pour les ustensiles
closeUstensils.forEach(closeButton => {
    closeButton.addEventListener('click', () => {

        ustensilsSearch.forEach(input => {
            input.value = '';
            filterOptions(ustensilsOptions, '');
            closeButton.classList.add('delete');
        });
        // Appel de la fonction SearchEngine pour afficher toutes les recettes
        const filteredRecipes = SearchEngine(recipes, '', [], [], []);
        // Mise à jour de l'affichage des recettes
        updateRecipeDisplay(filteredRecipes);
        updateTotalRecipes();
    });
});

// Réinitialisation des champs de recherche au chargement de la page
window.addEventListener('load', function () {
    ingredientsSearch.forEach(input => {
        if (input.value === '') {
            closeIngredient.forEach(closeButton => closeButton.classList.add('delete'));
        }
    });

    applianceSearch.forEach(input => {
        if (input.value === '') {
            closeAppliance.forEach(closeButton => closeButton.classList.add('delete'));
        }
    });

    ustensilsSearch.forEach(input => {
        if (input.value === '') {
            closeUstensils.forEach(closeButton => closeButton.classList.add('delete'));
        }
    });
});
