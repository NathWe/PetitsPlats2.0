
// Scenario 1
const recipes = {}
const result = searchEngine(recipes, "Coco", ["Lait de coco", "Jus de citron"], [], []);
console.log(result);

// Scenario 2
const recipes = {}
const result = searchEngine(recipes, "Coco", ["Lait de coco", "Jus de citron"], [], []);
console.log(result);

// Scenario 3
const recipes = {}
const result = searchEngine(recipes, "Coco", ["Lait de coco", "Jus de citron"], [], []);
console.log(result);

// MAINPAGE.JS

let text;
let filtreIngredients = [];
let filtreAppareils = [];
let filtreUstensiles = [];

inputresearch.addEventListener("keyup", function (event) {
    text = inputresearch.value;
    search();
});

dropdown("Ingrédients", dataIngredients, (selectedValues) => {
    filtreIngredients = selectedValues;
    search();
});

dropdown("Appareils", dataAppareils, (selectedValues) => {
    filtreAppareils = selectedValues;
    search();
});

dropdown("Ustensiles", dataUstensiles, (selectedValues) => {
    filtreUstensiles = selectedValues;
    search();
});

function search() {
    const result = searchEngine(recipes, inputresearch.value,
        displayRecipes(result));
}