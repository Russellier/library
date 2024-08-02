'use strict';

const myLibrary = [];
const noBooks = document.querySelector('.no-books');
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

function displayBooks() {
  // iterate over myLibrary
  myLibrary.forEach((book) => console.log(book));
  // display each book as a card
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
  if (noBooks) noBooks.remove();
});

// closeFormBtn.addEventListener('click', () => {
//   dialogBox.close();
// });
