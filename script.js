/* eslint-disable max-classes-per-file */

const form = document.querySelector('.form');
const booksDiv = document.querySelector('.books');
const addNew = document.querySelector('.add-book');
const viewList = document.querySelector('.my-grid');
const viewContact = document.querySelector('.contact-info');
const allNavLinks = document.querySelectorAll('.load');
const listLink = document.querySelectorAll('.link-1');
const AddLink = document.querySelectorAll('.link-2');
const contactLink = document.querySelectorAll('.link-3');
const dateContainer = document.querySelector('.date');
const date = new Date().toLocaleDateString('en-us', { month: 'long', day: '2-digit', year: 'numeric' });
const time = new Date().toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' });
const dateTime = `${date} ${time}`;

dateContainer.innerHTML = dateTime;

listLink.forEach((link) => link.addEventListener('click', () => {
  viewList.style.display = 'flex';
  addNew.style.display = 'none';
  viewContact.style.display = 'none';
}));

AddLink.forEach((link) => link.addEventListener('click', () => {
  addNew.style.display = 'flex';
  viewList.style.display = 'none';
  viewContact.style.display = 'none';
}));

contactLink.forEach((link) => link.addEventListener('click', () => {
  viewContact.style.display = 'flex';
  viewList.style.display = 'none';
  addNew.style.display = 'none';
}));

class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class CreateNewBook {
  static addNewBook(book) {
    const bookUnit = document.createElement('li');
    bookUnit.className = 'books-li';
    bookUnit.id = book.id;
    bookUnit.innerHTML = `
        <p class="book-name">${book.title}</p> 
        <p>By</p>
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

  static displayOnLoad() {
    // if ()
    viewList.style.display = 'flex';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('.book-title');
  const authorInput = document.querySelector('.book-author');
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;
  const books = CreateNewBook.loadFromStorage();

  if (!title || !author) {
    addNew.style.display = 'flex';
  } else {
    const book = new Books(title, author, Date.now());
    books.push(book);
    CreateNewBook.addNewBook(book);
    CreateNewBook.loadFromStorage();

    localStorage.setItem('bookInfo', JSON.stringify(books));

    titleInput.value = '';
    authorInput.value = '';
  }
});

booksDiv.addEventListener('click', (e) => {
  CreateNewBook.removeBookFromPage(e.target);
  CreateNewBook.removeBookFromStorage(e.target);
});

window.addEventListener('load', CreateNewBook.displayBooksFromStorage());
window.addEventListener('load', CreateNewBook.displayOnLoad());