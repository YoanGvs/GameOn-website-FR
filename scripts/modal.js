(() => {
  // Sélection des éléments du DOM
  const modalBg = document.querySelector(".bground");
  const modalBtns = document.querySelectorAll(".modal-btn");
  const closeBtn = document.querySelector(".close");
  const topNav = document.getElementById("myTopnav");
  const form = document.querySelector("form");
  const modalContent = document.querySelector(".content");

  /* ================================
     Navigation Responsive
  ================================= */
  topNav.addEventListener("click", () => {
    topNav.classList.toggle("responsive");
  });

  /* ================================
     Modal: ouverture / fermeture
  ================================= */
  const openModal = () => {
    modalBg.style.display = "block";
  };

  const closeModal = () => {
    modalBg.style.display = "none";
  };

  modalBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeBtn.addEventListener("click", closeModal);

  // Ferme la modal lorsqu'on clique en dehors de son contenu
  window.addEventListener("click", (event) => {
    if (event.target === modalBg) {
      closeModal();
    }
  });

  /* ================================
     Gestion des messages d'erreur
  ================================= */
  const displayErrorMessage = (inputElement, message) => {
    let errorElement = inputElement.nextElementSibling;
    // Créer l'élément d'erreur s'il n'existe pas
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
    errorElement.textContent = message;
  };

  const removeErrorMessage = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove();
    }
  };

  /* ================================
     Validation du formulaire
  ================================= */
  const validateForm = () => {
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const quantity = document.getElementById("quantity");
    const birthdate = document.getElementById("birthdate");
    const generalConditions = document.getElementById("checkbox1");
    const locations = document.getElementsByName("location");

    let isValid = true;

    // Validation du prénom (minimum 2 caractères)
    if (firstName.value.trim().length < 2) {
      displayErrorMessage(firstName, "Le prénom doit contenir au moins 2 caractères.");
      isValid = false;
    } else {
      removeErrorMessage(firstName);
    }

    // Validation du nom (minimum 2 caractères)
    if (lastName.value.trim().length < 2) {
      displayErrorMessage(lastName, "Le nom doit contenir au moins 2 caractères.");
      isValid = false;
    } else {
      removeErrorMessage(lastName);
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      displayErrorMessage(email, "L'adresse email est invalide.");
      isValid = false;
    } else {
      removeErrorMessage(email);
    }

    // Validation du nombre de tournois (champ non vide)
    if (!quantity.value.trim()) {
      displayErrorMessage(quantity, "Le nombre de tournois est requis.");
      isValid = false;
    } else {
      removeErrorMessage(quantity);
    }

    // Validation de la date de naissance (champ non vide)
    if (!birthdate.value.trim()) {
      displayErrorMessage(birthdate, "La date de naissance est requise.");
      isValid = false;
    } else {
      removeErrorMessage(birthdate);
    }

    // Validation de la sélection d'une localisation
    let isLocationSelected = false;
    for (const location of locations) {
      if (location.checked) {
        isLocationSelected = true;
        break;
      }
    }
    // On affiche le message d'erreur à partir du conteneur parent du premier radio
    if (!isLocationSelected) {
      displayErrorMessage(locations[0].parentNode, "Veuillez sélectionner une localisation.");
      isValid = false;
    } else {
      removeErrorMessage(locations[0].parentNode);
    }

    // Validation des conditions générales
    if (!generalConditions.checked) {
      displayErrorMessage(generalConditions, "Vous devez accepter les conditions générales.");
      isValid = false;
    } else {
      removeErrorMessage(generalConditions);
    }

    return isValid;
  };

  /* ================================
     Message de confirmation
  ================================= */
  const displayConfirmationMessage = () => {
    // Réinitialiser le contenu de la modal
    modalContent.innerHTML = "";

    // Appliquer les styles pour centrer le message
    Object.assign(modalContent.style, {
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    });

    const confirmationMessage = document.createElement("div");
    confirmationMessage.style.textAlign = "center";
    confirmationMessage.style.color = "white";
    confirmationMessage.style.margin = "2rem";
    confirmationMessage.innerHTML = "<h2>Merci pour votre inscription</h2>";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Fermer";
    Object.assign(closeButton.style, {
      backgroundColor: "#fe142f",
      color: "white",
      padding: "0.5rem 2rem",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      position: "absolute",
      bottom: "10%",
    });
    closeButton.addEventListener("click", closeModal);

    modalContent.appendChild(confirmationMessage);
    modalContent.appendChild(closeButton);
  };

  /* ================================
     Soumission du formulaire
  ================================= */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Formulaire valide");
      displayConfirmationMessage();
    } else {
      console.log("Formulaire invalide");
    }
  });
})();
