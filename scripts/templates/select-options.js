import { cardDetails } from '../models/data-card.js';
import { SearchEngine } from '../utils/searchEngine.js';

const labelIngredient = document.querySelector('#ingredientsList');
const labelUstensils = document.querySelector('#ustensilsList');
const labelAppliance = document.querySelector('#appliancesList');

const uniqueIngredients = [];
const uniqueUstensils = [];
const uniqueAppliance = [];


const filterButtons = document.querySelectorAll('.filterBtn');
const filter = document.querySelector('.filterList');

filterButtons.forEach(filterButton => {
    filterButton.addEventListener('click', () => {
        if (filterButton.classList.contains('active')) {
            filterButton.classList.remove('active');
        } else {
            filterButton.classList.add('active');
        }
    });

    const searchInput = filterButton.querySelector('.filterInput');
    searchInput.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});


// Ingrédients pour liste déroulante Ingrédients
cardDetails.forEach(label => {
    label.ingredients.forEach(ingredient => {
        if (!uniqueIngredients.includes(ingredient.ingredient)) {
            uniqueIngredients.push(ingredient.ingredient);
        }
    });
});

uniqueIngredients.forEach(ingredient => {
    const option = document.createElement('option');
    option.textContent = ingredient;
    labelIngredient.appendChild(option);
});

// Ingrédients pour liste déroulante Ustensils
cardDetails.forEach(label => {
    label.ustensils.forEach(ustensils => {
        if (!uniqueUstensils.includes(ustensils)) {
            uniqueUstensils.push(ustensils);
        }
    });
});

uniqueUstensils.forEach(ustensils => {
    const formattedUstensils = ustensils.charAt(0).toUpperCase() + ustensils.slice(1);
    const option = document.createElement('option');
    option.textContent = formattedUstensils;
    labelUstensils.appendChild(option);
});

// Ingrédients pour liste déroulante Appareils
cardDetails.forEach(label => {
    if (!uniqueAppliance.includes(label.appliance)) {
        uniqueAppliance.push(label.appliance);
    }
});

uniqueAppliance.forEach(appliance => {
    const option = document.createElement('option');
    option.textContent = appliance;
    labelAppliance.appendChild(option);
});