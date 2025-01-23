

// Éléments DOM
const modalBg = document.querySelector(".bground"); // Élément d'arrière-plan de la modal
const modalBtns = document.querySelectorAll(".modal-btn"); // Boutons pour ouvrir la modal
const closeBtn = document.querySelector(".close"); // Bouton pour fermer la modal
const editNav = document.getElementById("myTopnav"); // Élément de la barre de navigation
const form = document.querySelector("form"); // Élément du formulaire pour la saisie utilisateur

// Basculer le menu de navigation pour le design responsive
editNav.addEventListener("click", () => {
  editNav.classList.toggle("responsive"); // Ajouter ou supprimer la classe "responsive" du menu de navigation
});

// Afficher la modal
function showModal() {
  modalBg.style.display = "block"; // Rendre la modal visible
}

// Masquer la modal
function hideModal() {
  modalBg.style.display = "none"; // Masquer la modal
}

// Ajouter des écouteurs d'événements pour ouvrir la modal avec tous les boutons
modalBtns.forEach((btn) => {
  btn.addEventListener("click", showModal); // Ouvrir la modal lorsqu'un bouton est cliqué
});

// Fermer la modal lorsque le bouton de fermeture est cliqué
closeBtn.addEventListener("click", hideModal);

// Fermer la modal en cliquant à l'extérieur du contenu de la modal
window.addEventListener("click", (event) => {
  if (event.target === modalBg) { // Vérifier si l'élément cliqué est l'arrière-plan de la modal
    hideModal(); // Masquer la modal
  }
});

// Afficher un message d'erreur sous un champ de saisie
function displayErrorMessage(inputElement, message) {
  let errorElement = inputElement.nextElementSibling; // Vérifier si un message d'erreur existe déjà

  // Si aucun message d'erreur n'existe, en créer un
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div"); // Créer un nouvel élément div
    errorElement.classList.add("error-message"); // Ajouter une classe pour le style du message d'erreur
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling); // Insérer le message après le champ de saisie
  }

  errorElement.textContent = message; // Définir le texte du message d'erreur
}

// Supprimer un message d'erreur d'un champ de saisie
function removeErrorMessage(inputElement) {
  const errorElement = inputElement.nextElementSibling; // Obtenir l'élément suivant

  // Supprimer le message d'erreur s'il existe
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.remove(); // Supprimer l'élément du DOM
  }
}

// Valider les champs du formulaire
function validateForm() {
  const firstName = document.getElementById("first"); // Champ pour le prénom
  const lastName = document.getElementById("last"); // Champ pour le nom
  const email = document.getElementById("email"); // Champ pour l'adresse email
  const quantity = document.getElementById("quantity"); // Champ pour le nombre de tournois
  const birthdate = document.getElementById("birthdate"); // Champ pour la date de naissance
  const generalConditions = document.getElementById("checkbox1"); // Case à cocher pour les conditions générales
  const locations = document.getElementsByName("location"); // Boutons radio pour les localisations

  let isValid = true; // Indicateur de validité du formulaire

  // Valider le prénom (minimum 2 caractères)
  if (firstName.value.trim().length < 2) {
    displayErrorMessage(firstName, "Le prénom doit contenir au moins 2 caractères.");
    isValid = false;
  } else {
    removeErrorMessage(firstName);
  }

  // Valider le nom (minimum 2 caractères)
  if (lastName.value.trim().length < 2) {
    displayErrorMessage(lastName, "Le nom doit contenir au moins 2 caractères.");
    isValid = false;
  } else {
    removeErrorMessage(lastName);
  }

  // Valider l'email avec une expression régulière
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    displayErrorMessage(email, "L'adresse email est invalide.");
    isValid = false;
  } else {
    removeErrorMessage(email);
  }

  // Valider le nombre de tournois (ne doit pas être vide)
  if (!quantity.value.trim()) {
    displayErrorMessage(quantity, "Le nombre de tournois est requis.");
    isValid = false;
  } else {
    removeErrorMessage(quantity);
  }

  // Valider la sélection d'une localisation
  let isLocationSelected = false;
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      isLocationSelected = true;
      break;
    }
  }
  if (!isLocationSelected) {
    displayErrorMessage(locations[0].parentNode, "Veuillez sélectionner une localisation.");
    isValid = false;
  } else {
    removeErrorMessage(locations[0].parentNode);
  }

  // Valider la case des conditions générales (doit être cochée)
  if (!generalConditions.checked) {
    displayErrorMessage(generalConditions, "Vous devez accepter les conditions générales.");
    isValid = false;
  } else {
    removeErrorMessage(generalConditions);
  }

  // Valider la date de naissance (ne doit pas être vide)
  if (!birthdate.value.trim()) {
    displayErrorMessage(birthdate, "La date de naissance est requise.");
    isValid = false;
  } else {
    removeErrorMessage(birthdate);
  }

  return isValid; // Retourner la validité globale du formulaire
}

// Afficher le message de confirmation
function displayConfirmationMessage() {
  const modalContent = document.querySelector(".content"); // Contenu de la modal

  // Vider le contenu de la modal
  modalContent.innerHTML = "";

  // Configurer les styles pour le message de confirmation
  modalContent.style.minHeight = "80vh";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.justifyContent = "center";
  modalContent.style.alignItems = "center";

  // Créer un conteneur pour le message de confirmation
  const confirmationMessage = document.createElement("div");
  confirmationMessage.style.textAlign = "center";
  confirmationMessage.style.color = "white";
  confirmationMessage.style.margin = "2rem";
  confirmationMessage.innerHTML = "<h2>Merci pour votre inscription</h2>";

  // Créer un bouton pour fermer
  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.style.backgroundColor = "#fe142f";
  closeButton.style.color = "white";
  closeButton.style.padding = "0.5rem 2rem";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "0.5rem";
  closeButton.style.cursor = "pointer";
  closeButton.style.position = "absolute";
  closeButton.style.bottom = "10%";

  // Fermer la modal lorsque le bouton est cliqué
  closeButton.addEventListener("click", hideModal);

  // Ajouter le message et le bouton au contenu de la modal
  modalContent.appendChild(confirmationMessage);
  modalContent.appendChild(closeButton);
}

// Gérer la soumission du formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  if (validateForm()) { // Valider le formulaire
    console.log("Formulaire valide");
    displayConfirmationMessage(); // Afficher le message de confirmation
  } else {
    console.log("Formulaire invalide");
  }
});