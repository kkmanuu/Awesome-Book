/* eslint-disable max-classes-per-file */
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const form = document.querySelector('.form');
const booksDiv = document.querySelector('.books');

class CreateNewBook {
  static addNewBook(book) {
    const bookUnit = document.createElement('li');
    bookUnit.className = 'books-li';
    bookUnit.id = book.id;
    bookUnit.innerHTML = `
        <p class="book-name">${book.title}</p>
        <p class="the-auhtor">${book.author}</p>
        <button class='removeBook'>Remove</button>
        `;
    booksDiv.appendChild(bookUnit);
    booksDiv.style.border = '3px solid black';
  }

  static removeBookFromPage(target) {
    if (target.classList.contains('removeBook')) {
      target.parentElement.remove();
    }

    if (!booksDiv.firstElementChild) {
      booksDiv.style.border = '3px solid white';
    }
  }

  static loadFromStorage() {
    let books;

    if (localStorage.getItem('bookInfo')) {
      books = JSON.parse(localStorage.getItem('bookInfo'));
    } else {
      books = [];
    }

    return books;
  }

  static displayBooksFromStorage() {
    const books = CreateNewBook.loadFromStorage();

    books.forEach((book) => {
      CreateNewBook.addNewBook(book);
    });
  }

  static removeBookFromStorage(element) {
    const books = CreateNewBook.loadFromStorage();
    const { id } = element.parentElement;
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    localStorage.setItem('bookInfo', JSON.stringify(books));
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('.book-title');
  const authorInput = document.querySelector('.book-author');
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;
  const books = CreateNewBook.loadFromStorage();

  const book = new Books(title, author, Date.now());
  books.push(book);
  CreateNewBook.addNewBook(book);
  CreateNewBook.loadFromStorage();

  localStorage.setItem('bookInfo', JSON.stringify(books));

  titleInput.value = '';
  authorInput.value = '';
});

booksDiv.addEventListener('click', (e) => {
  CreateNewBook.removeBookFromPage(e.target);
  CreateNewBook.removeBookFromStorage(e.target);
});

window.addEventListener('load', CreateNewBook.displayBooksFromStorage);