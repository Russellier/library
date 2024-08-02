'use strict';

const myLibrary = [];
const displayContainer = document.querySelector('.display-container');
const dialogBox = document.querySelector('.form-container');
const form = document.querySelector('.form');
const addBookBtn = document.querySelector('.add-book');
const openFormBtn = document.querySelector('.open-form');
const closeFormBtn = document.querySelector('.close-form');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const read = document.querySelector('.read');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary() {
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  myLibrary.push(newBook);
}

function clearDisplay() {
  let child = displayContainer.lastChild;
  while (child) {
    displayContainer.removeChild(child);
    child = displayContainer.lastChild;
  }
}

// Continue
function displayBooks() {
  clearDisplay();

  // iterate over myLibrary
  myLibrary.forEach((book) => {
    // display each book as a card
    const newCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');

    newCard.classList.add('card');
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;

    newCard.append(title, author, pages);
    displayContainer.appendChild(newCard);

    console.log(displayContainer);
  });

  // for (let i = 0; i <= myLibrary.length; i++) {
  //   const newCard = document.createElement('div');
  //   const title = document.createElement('p');
  //   const author = document.createElement('p');
  //   const pages = document.createElement('p');

  //   newCard.classList.add('card');
  //   title.textContent = myLibrary[i].title;
  //   author.textContent = myLibrary[i].author;
  //   pages.textContent = myLibrary[i].pages;

  //   newCard.append(title, author, pages);
  //   displayContainer.appendChild(newCard);

  //   console.log(displayContainer);
  // }
}

if (myLibrary.length === 0) dialogBox.showModal();

dialogBox.addEventListener('click', (e) => {
  const dialogDimensions = dialogBox.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialogBox.close();
  }
});

openFormBtn.addEventListener('click', () => {
  dialogBox.showModal();
});

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  form.reset();
});

// closeFormBtn.addEventListener('click', () => {
//   dialogBox.close();
// });
