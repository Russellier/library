'use strict';

class Book {
  static myLibrary = [];
  static displayContainer = document.querySelector('.display-container');
  static dialogBox = document.querySelector('.form-container');
  static form = document.querySelector('.form');
  static addBookBtn = document.querySelector('.add-book');
  static openFormBtn = document.querySelector('.open-form');
  static closeFormBtn = document.querySelector('.close-form');
  static title = document.querySelector('.title');
  static author = document.querySelector('.author');
  static pages = document.querySelector('.pages');
  static read = document.querySelector('.read');

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${title} by ${author}, ${pages} pages, ${read}`;
    };
  }

  addBookToLibrary(newBook) {
    Book.myLibrary.push(newBook);
    Book.displayBooks();
  }

  removeBook(e) {
    let index = parseInt(e.target.dataset.index);
    Book.myLibrary.splice(index, 1);
    Book.displayBooks();
  }

  readOrNot(read, i) {
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
      if (read) Book.myLibrary[i].read = false;
      else Book.myLibrary[i].read = true;
      Book.displayBooks();
    });

    readOrNotDiv.append(icon, readBtn);
    return readOrNotDiv;
  }

  static clearDisplay() {
    let child = Book.displayContainer.lastChild;
    while (child) {
      Book.displayContainer.removeChild(child);
      child = Book.displayContainer.lastChild;
    }
  }

  static displayBooks() {
    Book.clearDisplay();

    // iterate over myLibrary
    Book.myLibrary.forEach((book, i) => {
      // display each book as a card
      const newCard = document.createElement('div');
      const bookDetails = document.createElement('div');
      const title = document.createElement('p');
      const author = document.createElement('p');
      const pages = document.createElement('p');
      const removeBtn = document.createElement('button');

      const read = book.readOrNot(book.read, i);

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
        book.removeBook(e);
      });

      bookDetails.append(title, author, pages, read);
      newCard.append(bookDetails, removeBtn);
      Book.displayContainer.appendChild(newCard);
    });
  }

  static initialize() {
    if (Book.myLibrary.length === 0) Book.dialogBox.showModal();

    Book.dialogBox.addEventListener('click', (e) => {
      const dialogDimensions = Book.dialogBox.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        Book.dialogBox.close();
      }
    });

    Book.openFormBtn.addEventListener('click', () => {
      Book.dialogBox.showModal();
    });

    Book.addBookBtn.addEventListener('click', (e) => {
      if (!title.value || !author.value || !pages.value) {
        alert('Please fill out all required fields.');
        return;
      }
      if (pages.value < 0) {
        alert('Invalid number of pages.');
        return;
      }
      e.preventDefault();
      const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
      );
      newBook.addBookToLibrary(newBook);
      // Book.displayBooks();
      Book.dialogBox.close();
      Book.form.reset();
    });

    Book.closeFormBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Book.dialogBox.close();
    });
  }
}
Book.initialize();
