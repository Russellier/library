'use strict';

const myLibrary = [];
const displayContainer = document.querySelector('.display-container');
const dialogBox = document.querySelector('.form-container');
const form = document.querySelector('.form');
const addBookBtn = document.querySelector('.add-book');
const openFormBtn = document.querySelector('.open-form');
// const closeFormBtn = document.querySelector('.close-form');
// const removeBtn = document.querySelector('.remove-btn');
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
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    // const read = document.createElement('p');
    const removeBtn = document.createElement('button');

    const read = readOrNot(book.read, i);

    newCard.classList.add('card');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    title.textContent = book.title;
    author.textContent = book.author;
    // read.textContent = book.read;
    pages.textContent = book.pages;
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.dataset.index = i;

    removeBtn.addEventListener('click', (e) => {
      removeBook(e);
    });

    newCard.append(title, author, read, pages, removeBtn);
    displayContainer.appendChild(newCard);

    // console.log(displayContainer);
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

  // Continue: make read button functional
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
  addBookToLibrary();
  displayBooks();
  dialogBox.close();
  form.reset();
});

// closeFormBtn.addEventListener('click', () => {
//   dialogBox.close();
// });
