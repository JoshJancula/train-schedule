
// ingredients searched for
var ingredientList = [];

// Function for displaying ingredient buttons
function renderIngredients() {
    // delete ingredient search before searching for another
    $("#ingredients").empty();
    // Looping through the ingredientList array
    for (var i = 0; i < ingredientList.length; i++) {
        addIngr(ingredientList[i]);
    }
}

function addIngr(ingredientText) {
    var a = $("<ul>");
    // Adding a class of ingredient to our list item
    a.addClass("ingredient");
    // Adding a data-attribute
    a.attr("data-name", ingredientText);
    // Providing the initial list text
    a.text(ingredientText);
    // Adding the ingredient to the HTML
    $("#ingredientsGoHere").append(a);

}

// This function handles events where addIngr button is clicked
$("#addIngr").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    ingredientList = $("#ingredients").val().trim();
    // Adding the new ingredient from the textbox to our array
    ingredientList.push(ingredients);
    // Calling renderIngredients which handles the processing of our ingredientList array
    addIngr(ingredients);
    console.log(ingredientList)
    // empty the input box
    $("#ingredients").val("");
});