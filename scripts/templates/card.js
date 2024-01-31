// templates/card.js
import { cardDetails } from '../../scripts/models/data-card.js';

export function createCardHTML(card) {
    return `
    <div class="card custom-card">
      <div class="position-relative">
        <img src="assets/photos-recettes/${card.image}" class="card-img-top custom-image" alt="${card.name}">
        <div class="duration-badge">
          ${card.time} min
        </div>
      </div>
      <div class="card-body custom-body">
        <h5 class="card-title custom-title">${card.name}</h5>
        <p class="card-subtitle mb-2 custom-muted custom-subtitle custom-letter-spacing">RECETTE</p>
        <p class="card-text custom-description">${card.description}</p>
        <p class="card-subtitle mb-2 custom-muted custom-subtitle custom-letter-spacing">INGRÉDIENTS</p>
        <div class="row custom-ingredients">
          ${generateIngredientsHTML(card.ingredients)}
        </div>
      </div>
    </div>
  `;
}

function generateIngredientsHTML(ingredients) {
    return ingredients.map(ingredient => `
      <div class="col-md-6 custom-ingredient">
        <p class="custom-ingredient-name">${ingredient.ingredient}</p>
        ${ingredient.quantity ? `<p class="custom-ingredient-quantity">${ingredient.quantity} ${ingredient.unit || ''}</p>` : ''}
      </div>
  `).join('');
}

