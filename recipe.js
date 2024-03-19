// Get HTML elements
const ingredientList = document.getElementById("ingredient-list");
const instructionList = document.getElementById("instruction-list");
const ingredientButton = document.getElementById("add-ingredient");
const instructionButton = document.getElementById("add-instruction");
const ingredientInput = document.getElementById("ingredient");
const instructionInput = document.getElementById("instruction");
const resetButton = document.getElementById("reset");
const titleInput = document.getElementById("title");
const saveButton = document.getElementById("save");

// Variable to hold recipe data
let ingredients = [];

// Variable to hold instruction data
let instructions = [];

// Display default text in the ingredients list
updateIngredients();

// Display defualt text in the instructions list
updateInstructions();

// Stores an ingredient when added by the user
ingredientButton.addEventListener("click", () => {
    // Add ingredient to array
    const ingredient = ingredientInput.value;
    ingredients.push(ingredient);

    // Update the ingredients on the screen
    updateIngredients(ingredient);

    // Clear the input field
    ingredientInput.value = "";
});

// Stores an instruction when added by the user
instructionButton.addEventListener("click", () => {
    // Add instruction to array
    const instruction = instructionInput.value;
    instructions.push(instruction);

    // Update the instructions on the screen
    updateInstructions(instruction);

    // Clear the input field
    instructionInput.value = "";
});

// Update the ingredients shown on the screen
function updateIngredients(ingredient) {
    
    // If there are no instructions, add default text to show where they will appear
    if (ingredientList.children.length === 0) {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = "Ingredients will appear here.";
        newDiv.classList.add("list-text");
        ingredientList.appendChild(newDiv);
    }
    // If there are ingredients, add a new ingredient
    else {
        // If the child is the default text, remove so we can add an ingredient
        if (ingredientList.children.length === 1 && ingredientList.children[0].classList.contains("list-text")) {
            ingredientList.innerHTML = "";
        }

        // Create a new div with the ingredient
        const newDiv = document.createElement("div");
        newDiv.innerHTML = ingredient;
        newDiv.classList.add("ingredient");
        newDiv.setAttribute("role", "button");
        newDiv.setAttribute("tabIndex", "0");
        newDiv.setAttribute("aria-label", ingredient);
        newDiv.setAttribute("aria-description", "Click or press enter to delete ingredient");

        // Add event listener to delete ingredient when clicked
        newDiv.addEventListener("click", () => {

            // Remove ingredient from array
            const ingredientIndex = ingredients.indexOf(newDiv.innerHTML);
            ingredients.splice(ingredientIndex, 1);
            
            // Remove ingredient from screen
            newDiv.remove()
            if (ingredients.length === 0) {
                ingredientList.innerHTML = "";
                updateIngredients();
            }
        });

        // Add event listener to delete ingredient when enter or spacebar are pressed
        newDiv.addEventListener("keypress", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                // Remove ingredient from array
            const ingredientIndex = ingredients.indexOf(newDiv.innerHTML);
            ingredients.splice(ingredientIndex, 1);
            
            // Remove ingredient from screen
            newDiv.remove()
            if (ingredients.length === 0) {
                ingredientList.innerHTML = "";
                updateIngredients();
            }
            }
        });

        // Add ingredient to screen
        ingredientList.appendChild(newDiv);
    }
}

// Update the instructions shown on the screen
function updateInstructions(instruction) {
    
    // If there are no instructions, add default text to show where they will appear
    if (instructionList.children.length === 0) {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = "Instructions will appear here.";
        newDiv.classList.add("list-text");
        instructionList.appendChild(newDiv);
    }
    // If there are instructions, add a new instruction
    else {
        // If the child is the default text, remove so we can add an instruction
        if (instructionList.children.length === 1 && instructionList.children[0].classList.contains("list-text")) {
            instructionList.innerHTML = "";
        }

        // Create a new div with the instruction
        const newDiv = document.createElement("div");
        newDiv.innerHTML = instruction;
        newDiv.classList.add("instruction");
        newDiv.setAttribute("role", "button");
        newDiv.setAttribute("tabIndex", "0");
        newDiv.setAttribute("aria-label", instruction);
        newDiv.setAttribute("aria-description", "Click or press enter to delete instruction");

        // Add event listener to delete instruction when clicked
        newDiv.addEventListener("click", () => {

            // Remove instruction from array
            const instructionIndex = instructions.indexOf(newDiv.innerHTML);
            instructions.splice(instructionIndex, 1);
            
            // Remove instruction from screen
            newDiv.remove();
            if (instructions.length === 0) {
                instructionList.innerHTML = "";
                updateInstructions();
            }
        });

        // Add event listener to delete instruction when enter or spacebar are pressed
        newDiv.addEventListener("keypress", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                // Remove instruction from array
                const ingredientIndex = instructions.indexOf(newDiv.innerHTML);
                instructions.splice(ingredientIndex, 1);
            
                // Remove ingredient from screen
                newDiv.remove()
                if (instructions.length === 0) {
                    instructionList.innerHTML = "";
                    updateInstructions();
                }
            }
        });

        // Add instruction to screen
        instructionList.appendChild(newDiv);
    }
}

// Clear inputted data when reset button is pressed
resetButton.addEventListener("click", () => {
    // Clear the title
    titleInput.value = "";

    // Clear the ingredients from array
    ingredients = [];

    // Clear the instructions from array
    instructions = [];

    // Clear the ingredients from the screen
    while (ingredientList.children.length != 0) {
        ingredientList.removeChild(ingredientList.firstChild);
    };
    updateIngredients();

    // Clear the instructions from the screen
    while (instructionList.children.length != 0) {
        instructionList.removeChild(instructionList.firstChild);
    }
    updateInstructions();
});

saveButton.addEventListener("click", () => {
    // Create the recipe object
    const recipe = {
        title: titleInput.value,
        ingredients: ingredients,
        instructions: instructions
    };

    // Write the recipe to the file
    writeRecipeToFile(recipe);
});
