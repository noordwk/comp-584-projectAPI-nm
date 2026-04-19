// Function runs when Search button clicked
async function getDrink(){

  // Get user input text
  let drink =
    document.getElementById("drinkInput").value.trim();

  // Prevent empty search
  if(drink === ""){
    alert("Please enter a drink name.");
    return;
  }

  try{

    // Request data from public API
    let res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    );

    // Convert response to JSON
    let data = await res.json();

    // If no drink found
    if(!data.drinks){
      alert("Drink not found.");
      return;
    }

    // Get first matching drink
    let d = data.drinks[0];

    // Insert image
    document.getElementById("image").src =
      d.strDrinkThumb;

    // Insert drink name
    document.getElementById("name").textContent =
      d.strDrink;

    // Insert category
    document.getElementById("category").textContent =
      "Category: " + d.strCategory;

    // Insert first ingredient
    document.getElementById("ingredients").textContent =
      "Main Ingredient: " + d.strIngredient1;

    // Insert instructions
    document.getElementById("instructions").textContent =
      d.strInstructions;

    // Show hidden card
    let card = document.getElementById("card");
    card.classList.remove("hidden");

    // Animate result card
    anime({
      targets:"#card",

      // Move upward into place
      translateY:[50,0],

      // Fade in
      opacity:[0,1],

      duration:900,

      // Smooth bounce effect
      easing:"easeOutElastic(1, .8)"
    });

  }catch(error){

    // If fetch fails
    alert("Error loading drink data.");

    console.log(error);
  }
}