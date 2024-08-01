'use strict';

const myLibrary = [];
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
  // do stuff here
}

if (myLibrary.length === 0) form.classList.remove('hidden');

openForm.addEventListener('click', () => {
  form.classList.remove('hidden');
});

closeForm.addEventListener('click', () => {
  form.classList.add('hidden');
});
