// Importation des données des cartes
import { cardDetails } from '../models/data-card.js';

// Sélection des éléments DOM
const labelIngredient = document.querySelector('#ingredientsList');
const labelUstensils = document.querySelector('#ustensilsList');
const labelAppliance = document.querySelector('#appliancesList');

const filterButtons = document.querySelectorAll('.filterBtn');

// Ajoute des options aux éléments de liste déroulante
function addOptions(uniqueItems, labelElement) {
    uniqueItems.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        labelElement.appendChild(option);
    });
}

// Gestion des événements des boutons de filtrage
filterButtons.forEach(filterButton => {
    filterButton.addEventListener('click', () => {
        filterButton.classList.toggle('active');
    });

    const searchInput = filterButton.querySelector('.filterInput');
    searchInput.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

// Création d'ensembles (set) pour stocker les éléments uniques
const uniqueIngredients = new Set();
const uniqueUstensils = new Set();
const uniqueAppliance = new Set();

// Ajoute les éléments uniques aux ensembles
cardDetails.forEach(label => {
    label.ingredients.forEach(ingredient => {
        uniqueIngredients.add(ingredient.ingredient);
    });

    label.ustensils.forEach(ustensils => {
        uniqueUstensils.add(ustensils);
    });

    uniqueAppliance.add(label.appliance);
});

// Ajoute les options aux éléments de liste déroulante
addOptions(uniqueIngredients, labelIngredient);
addOptions(uniqueUstensils, labelUstensils);
addOptions(uniqueAppliance, labelAppliance);
