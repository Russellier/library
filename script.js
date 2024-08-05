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

function displayBooks() {
  clearDisplay();

  // iterate over myLibrary
  myLibrary.forEach((book, i) => {
    // display each book as a card
    const newCard = document.createElement('div');
    const bookDetails = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const removeBtn = document.createElement('button');

    const read = readOrNot(book.read, i);

    newCard.classList.add('card');
    bookDetails.classList.add('book-details');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    title.textContent = `"${book.title}"`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.dataset.index = i;

    removeBtn.addEventListener('click', (e) => {
      removeBook(e);
    });

    bookDetails.append(title, author, pages, read);
    newCard.append(bookDetails, removeBtn);
    displayContainer.appendChild(newCard);
  });
}

function removeBook(e) {
  let index = parseInt(e.target.dataset.index);
  myLibrary.splice(index, 1);
  displayBooks();
}

function readOrNot(read, i) {
  const readOrNotDiv = document.createElement('div');
  const icon = document.createElement('img');
  const readBtn = document.createElement('button');

  readOrNotDiv.classList.add('read-container');
  readBtn.classList.add('read-btn');

  if (read) {
    icon.src = 'icons/book-open-variant-outline.svg';
    readBtn.textContent = 'Mark as unread';
  } else {
    icon.src = 'icons/book-outline.svg';
    readBtn.textContent = 'Mark as read';
  }

  readBtn.addEventListener('click', (e) => {
    if (read) myLibrary[i].read = false;
    else myLibrary[i].read = true;
    displayBooks();
  });

  readOrNotDiv.append(icon, readBtn);
  return readOrNotDiv;
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
  if (!title.value || !author.value || !pages.value) {
    alert('Please fill out all required fields.');
    return;
  }
  if (!pages.value < 0) {
    alert('Invalid number of pages.');
    return;
  }
  addBookToLibrary();
  displayBooks();
  dialogBox.close();
  form.reset();
});

closeFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dialogBox.close();
});
