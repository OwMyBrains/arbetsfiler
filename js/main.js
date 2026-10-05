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

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    createStudentCard();
    clearForm();
  } else {
    displayErrors();
  }
}

// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm() {
  let name = fullnameInput.value;
  let email = emailInput.value;
  let phone = phoneInput.value;

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
  errorList.innerHTML = "";
  //Vilkor för input

  let name = fullnameInput.value;
  let email = emailInput.value;
  let phone = phoneInput.value;

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
function saveHistory() {
  // Spara history i localStorage
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  // Hämta eventuell sparad historik
  // Uppdatera history
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
  // Rensa tidigare visad historik
  // Skriv ut innehållet i history till DOM
}

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
  fullnameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  // Återställ formulär och studentkort
  // Rensa eventuella felmeddelanden
}
/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  // Radera sparad historik
  // Uppdatera history och visningen på sidan
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas

// När användaren klickar på "Rensa"

// När användaren klickar på "Radera historik"

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
