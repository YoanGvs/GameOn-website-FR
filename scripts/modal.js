// DOM Elements
const modalBg = document.querySelector(".bground"); // Background element of the modal
const modalBtns = document.querySelectorAll(".modal-btn"); // Buttons to open the modal
const closeBtn = document.querySelector(".close"); // Button to close the modal
const editNav = document.getElementById("myTopnav"); // Navigation bar element
const form = document.querySelector("form"); // Form element for user input

// Toggle navigation menu for responsive design
editNav.addEventListener("click", () => {
  editNav.classList.toggle("responsive"); // Add or remove the "responsive" class to the navigation menu
});

// Function to display the modal
function showModal() {
  modalBg.style.display = "block"; // Make the modal visible
}

// Function to hide the modal
function hideModal() {
  modalBg.style.display = "none"; // Hide the modal
}

// Attach click event listeners to all buttons that open the modal
modalBtns.forEach((btn) => {
  btn.addEventListener("click", showModal); // Open the modal when a button is clicked
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", hideModal);

// Close the modal when clicking outside of the modal content
window.addEventListener("click", (event) => {
  if (event.target === modalBg) { // Check if the clicked element is the modal background
    hideModal(); // Hide the modal
  }
});

// Function to display an error message below an input field
function displayErrorMessage(inputElement, message) {
  let errorElement = inputElement.nextElementSibling; // Get the next sibling element to check for existing error message

  // If there is no error message element, create one
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div"); // Create a new div element
    errorElement.classList.add("error-message"); // Add a class to style the error message
    errorElement.style.color = "red"; // Set text color to red
    errorElement.style.fontSize = "0.8rem"; // Set font size
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling); // Insert the error message after the input element
  }

  errorElement.textContent = message; // Set the error message text
}

// Function to remove an error message from an input field
function removeErrorMessage(inputElement) {
  const errorElement = inputElement.nextElementSibling; // Get the next sibling element

  // If an error message exists, remove it
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.remove(); // Remove the error message element
  }
}

// Function to validate the form inputs
function validateForm() {
  const firstName = document.getElementById("first"); // Input for first name
  const lastName = document.getElementById("last"); // Input for last name
  const email = document.getElementById("email"); // Input for email address
  const quantity = document.getElementById("quantity"); // Input for number of tournaments
  const birthdate = document.getElementById("birthdate"); // Input for birth date
  const generalConditions = document.getElementById("checkbox1"); // Checkbox for general conditions
  const locations = document.getElementsByName("location"); // Radio buttons for locations

  let isValid = true; // Flag to track form validity

  // Validate first name (minimum 2 characters)
  if (firstName.value.trim().length < 2) {
    displayErrorMessage(firstName, "Le prénom doit contenir au moins 2 caractères."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(firstName); // Remove error message if valid
  }

  // Validate last name (minimum 2 characters)
  if (lastName.value.trim().length < 2) {
    displayErrorMessage(lastName, "Le nom doit contenir au moins 2 caractères."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(lastName); // Remove error message if valid
  }

  // Validate email using a regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
  if (!emailRegex.test(email.value.trim())) {
    displayErrorMessage(email, "L'adresse email est invalide."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(email); // Remove error message if valid
  }

  // Validate quantity (must not be empty)
  if (!quantity.value.trim()) {
    displayErrorMessage(quantity, "Le nombre de tournois est requis."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(quantity); // Remove error message if valid
  }

  // Validate location selection (at least one radio button must be selected)
  let isLocationSelected = false; // Flag for location selection
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) { // Check if the radio button is selected
      isLocationSelected = true; // Mark as selected
      break; // Exit the loop once a selection is found
    }
  }
  if (!isLocationSelected) {
    displayErrorMessage(locations[0].parentNode, "Veuillez sélectionner une localisation."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(locations[0].parentNode); // Remove error message if valid
  }

  // Validate general conditions checkbox (must be checked)
  if (!generalConditions.checked) {
    displayErrorMessage(generalConditions, "Vous devez accepter les conditions générales."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(generalConditions); // Remove error message if valid
  }

  // Validate birthdate (must not be empty)
  if (!birthdate.value.trim()) {
    displayErrorMessage(birthdate, "La date de naissance est requise."); // Show error if invalid
    isValid = false; // Mark form as invalid
  } else {
    removeErrorMessage(birthdate); // Remove error message if valid
  }

  return isValid; // Return the overall form validity
}

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior (page reload)

  if (validateForm()) { // Validate the form
    console.log("Formulaire valide"); // Log success message
    hideModal(); // Close the modal if the form is valid
  } else {
    console.log("Formulaire invalide"); // Log failure message
  }
});
