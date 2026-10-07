"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Pether Sand
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");
//Input
const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");
const errorList = document.querySelector("#errorlist");
//Preview på kortet
const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");
//historik
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

//EventListeners

//Submit för informationen
form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    createStudentCard();
    saveHistory();
    loadHistory();
    renderHistory();
    clearForm();
  } else {
    displayErrors();
  }
}
//Rensar formuläret
clearButton.addEventListener("click", clearCard);
clearButton.addEventListener("click", clearForm);
deleteHistoryButton.addEventListener("click", deleteHistory);

// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm() {
  let name = fullnameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();

  errors = [];
  errorList.innerHTML = "";

  if (name.length === 0) {
    return false;
  } else if (email.length === 0) {
    return false;
  } else if (phone.length === 0) {
    return false;
  } else {
    return true;
  }

  // Kontrollera formulärets obligatoriska fält
  // Visa eventuella felmeddelanden
  // Returnera resultatet (true eller false) av valideringen
}

/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
  //Rensar felmeddelanden

  //Vilkor för input

  let name = fullnameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();

  if (name.length === 0) {
    errors.push("Du måste ange ditt namn");
  }
  if (email.length === 0) {
    errors.push("Du måste ange din E-postadress");
  }
  if (phone.length === 0) {
    errors.push("Du måste ange ditt telefonnummer");
  }
  //Lägg till felmeddelandenm i listan
  errors.forEach((error) => {
    const liEl = document.createElement("li");
    const textNode = document.createTextNode(error);
    liEl.appendChild(textNode);
    errorList.appendChild(liEl);
  });
  // Rensa tidigare felmeddelanden
  // Skriv ut aktuella felmeddelanden till DOM
}

/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
  errorList.innerHTML = "";
  errors = [];

  let name = fullnameInput.value;
  let email = emailInput.value;
  let phone = phoneInput.value;
  let font = fontSelect.value;

  const outputName = document.querySelector("#previewfullname");
  outputName.innerHTML = `Namn: ${name}`;

  const outputEmail = document.querySelector("#previewemail");
  outputEmail.innerHTML = `E-post: ${email}`;

  const outputPhone = document.querySelector("#previewphone");
  outputPhone.innerHTML = `Telefon: ${phone}`;

  document.querySelector("#preview").style.fontFamily = font;

  // Hämta information från formuläret
  // Uppdatera studentkortet
  // Lägg till studentkortet i historiken
  // Spara och uppdatera historiken
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory(name, email, phone, font) {
  //Skapa användare
  const historyArr = {
    name: fullnameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    font: fontSelect.value,
  };
  //Hämta eventuella användare från Local storage
  let localStorageHistory = localStorage.getItem("history");

  let history = JSON.parse(localStorageHistory);
  if (history === null) {
    history = [];
  }
  history.push(historyArr);

  let historyJson = JSON.stringify(history);

  localStorage.setItem("history", historyJson);
}
/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  //Hämtar lagrad info i history arrayen
  const LocalStorageData = localStorage.getItem("history");
  const history = JSON.parse(LocalStorageData);

  if (history === null) {
    users = [];
  }
  if ((history.length = 0)) {
    return;
  }
  // Hämta
  // eventuell sparad historik
  // Uppdatera history
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
  const LocalStorageData = localStorage.getItem("history");
  const history = JSON.parse(LocalStorageData);

  historySection.innerHTML = "";

  // Example: render each object
  for (let i = 0; i < history.length; i++) {
    const sectionEl = document.createElement("section");

    const pEl = document.createElement("p");

    pEl.innerHTML = `Namn: ${history[i].name}
<br>
E-post: ${history[i].email}
<br>
Telefon: ${history[i].phone}
<br>
Font: ${history[i].font}`;

    sectionEl.appendChild(pEl);
    historySection.appendChild(sectionEl);
    sectionEl.style.fontFamily = history[i].font;
  }
}
// Rensa tidigare visad historik
// Skriv ut innehållet i history till DOM

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
  //Rensar formuläret
  errorList.innerHTML = "";
  errors = [];
  fullnameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  // Återställ formulär och studentkort
  // Rensa eventuella felmeddelanden
}
function clearCard() {
  //rensar studentkortet
  const outputName = document.querySelector("#previewfullname");
  outputName.innerHTML = "Namn";

  const outputEmail = document.querySelector("#previewemail");
  outputEmail.innerHTML = "E-post";

  const outputPhone = document.querySelector("#previewphone");
  outputPhone.innerHTML = "Telefon";
}
/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  //rensar local storage
  localStorage.clear();
  //rensar history arrayen
  history.length = 0;
  historySection.innerHTML = "";
}
// Radera sparad historik
// Uppdatera history och visningen på sidan

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas

// När användaren klickar på "Rensa"

// När användaren klickar på "Radera historik"

// När sidan laddas:
// - läs in och visa eventuell tidigare historik

renderHistory();
