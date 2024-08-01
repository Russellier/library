'use strict';

const myLibrary = [];
const dialogBox = document.querySelector('.form-container');
const form = document.querySelector('.form');
const openForm = document.querySelector('.open-form');
const closeForm = document.querySelector('.close-form');

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

openForm.addEventListener('click', () => {
  dialogBox.showModal();
});

closeForm.addEventListener('click', () => {
  dialogBox.close();
});
