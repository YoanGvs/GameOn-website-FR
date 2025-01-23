// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

//edit nav
const editNav = document.getElementById("myTopnav");
editNav.addEventListener("click", () => { 
  editNav.classList.toggle("responsive");
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// close modal form
function closeModal() {
  modalBg.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

// close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modalBg) {
    closeModal();
  }
});

function validate() {
  // (1) Vérifie la longueur du champ "Prénom"
  const firstValue = document.getElementById("first").value;
  if (firstValue.length < 2) return false;

  // (2) Vérifie la longueur du champ "Nom"
  const lastValue = document.getElementById("last").value;
  if (lastValue.length < 2) return false;

  // (3) Vérifie la validité du champ "Email" via une expression régulière
  const emailValue = document.getElementById("email").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) return false;

  // (4) Vérifie que le champ "Nombre" n'est pas vide
  const quantityValue = document.getElementById("quantity").value;
  if (quantityValue.length === 0) return false;

  // (5) Vérifie qu'au moins un bouton radio "location" est sélectionné
  const locationBtns = document.getElementsByName("location");
  let locationSelected = false;
  locationBtns.forEach((btn) => {
    locationSelected = locationSelected || btn.checked;
  });
  if (!locationSelected) return false;

  // (6) Vérifie que la case des conditions générales est cochée
  const generalConditions = document.getElementById("checkbox1");
  if (!generalConditions.checked) return false;

  // Retour true si toutes les validations sont réussies
  return true;
}

// Empêcher l'envoi du formulaire par défaut et vérifier la validité
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche le rechargement de la page

  if (!validate()) {
    console.log("Formulaire invalide");
  } else {
    console.log("Formulaire valide");
    modalBg.style.display = "none";
  }
});
