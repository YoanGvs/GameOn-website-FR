// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
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
