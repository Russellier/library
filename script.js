'use strict';

const myLibrary = [];
const dialogBox = document.querySelector('.form-container');
const form = document.querySelector('.form');
const addBookBtn = document.querySelector('.add-book');
const openFormBtn = document.querySelector('.open-form');
// const closeFormBtn = document.querySelector('.close-form');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; //replace with boolean
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary() {
  // do stuff here
}

function displayBooks() {
  // iterate over myLibrary
  // display each book as a card
}

if (myLibrary.length === 0) dialogBox.showModal();

openFormBtn.addEventListener('click', () => {
  dialogBox.showModal();
});

// addBookBtn.addEventLister('click', (e) => {
//   e.preventDefault();
//   dialogBox.close();
// });

// closeFormBtn.addEventListener('click', () => {
//   dialogBox.close();
// });

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
