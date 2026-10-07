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
//Knapparna för att rensa formuläret och historik
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

//Validering av formuläret
function validateForm() {
  let name = fullnameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();

  //Rensar eventuella felmeddelanden sedan tidigare
  errors = [];
  errorList.innerHTML = "";

  //Vilkor för valideringen, om alla stämmer går det vidare
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

//Felmeddelanden vid ej korrekt i fylld input
function displayErrors() {
  //Rensar felmeddelanden

  //Vilkor för input samt trimma bort onödiga " "
  let name = fullnameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();

  //Felmeddelanden
  if (name.length === 0) {
    errors.push("Du måste ange ditt namn");
  }
  if (email.length === 0) {
    errors.push("Du måste ange din E-postadress");
  }
  if (phone.length === 0) {
    errors.push("Du måste ange ditt telefonnummer");
  }
  //Lägg till felmeddelanden i listan som skrivs ut
  errors.forEach((error) => {
    const liEl = document.createElement("li");
    const textNode = document.createTextNode(error);
    liEl.appendChild(textNode);
    errorList.appendChild(liEl);
  });
}

//Skapar studentkortet
function createStudentCard() {
  errorList.innerHTML = "";
  errors = [];

  let name = fullnameInput.value;
  let email = emailInput.value;
  let phone = phoneInput.value;
  let font = fontSelect.value;

  //Det som skrivs ut i studentkortet
  const outputName = document.querySelector("#previewfullname");
  outputName.innerHTML = `Namn: ${name}`;

  const outputEmail = document.querySelector("#previewemail");
  outputEmail.innerHTML = `E-post: ${email}`;

  const outputPhone = document.querySelector("#previewphone");
  outputPhone.innerHTML = `Telefon: ${phone}`;

  document.querySelector("#preview").style.fontFamily = font;
}

//Spara informationen i history array
function saveHistory(name, email, phone, font) {
  //Skapa användare utifrån input
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
  //Skriver in användaren i arrayen
  history.push(historyArr);

  let historyJson = JSON.stringify(history);

  localStorage.setItem("history", historyJson);
}

//Hämtar lagrad information från JSON
function loadHistory() {
  const LocalStorageData = localStorage.getItem("history");
  const history = JSON.parse(LocalStorageData);

  if (history === null) {
    users = [];
  }
  if ((history.length = 0)) {
    return;
  }
}

//Renderar historiken på sidan
function renderHistory() {
  const LocalStorageData = localStorage.getItem("history");
  const history = JSON.parse(LocalStorageData);

  historySection.innerHTML = "";

  //Skapar en sektion för historiken
  for (let i = 0; i < history.length; i++) {
    const sectionEl = document.createElement("section");

    //Skapat P element för informationen
    const pEl = document.createElement("p");

    pEl.innerHTML = `Namn: ${history[i].name}
<br>
E-post: ${history[i].email}
<br>
Telefon: ${history[i].phone}
<br>
Font: ${history[i].font}`;

    //skriver ut i DOM
    sectionEl.appendChild(pEl);
    historySection.appendChild(sectionEl);
    sectionEl.style.fontFamily = history[i].font;
  }
}

//Rensar formuläret
function clearForm() {
  errorList.innerHTML = "";
  errors = [];
  fullnameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
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

//Raderar hela historiken.

function deleteHistory() {
  //rensar local storage
  localStorage.clear();
  //rensar history arrayen
  history.length = 0;
  historySection.innerHTML = "";
}

//Renderar historiken vid omladdning av sidan.
renderHistory();
