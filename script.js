// Get DOM elements
const booksDiv = document.querySelector('.books');
const form = document.querySelector('.form');

// Retrieve books from localStorage or initialize an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to add a new book to the collection
function addBook(title, author) {
  const id = Date.now();
  const book = { title, author, id };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

// Function to remove a book from the collection
function removeBook(id) {
  books = books.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

// Function to display all books in the collection
function displayBooks() {
  booksDiv.innerHTML = '';

  books.forEach((book) => {
    const bookUnit = document.createElement('li');
    bookUnit.className = 'books-li';
    bookUnit.id = book.id;
    bookUnit.innerHTML = `
      <p class="book-name">${book.title}</p>
      <p>By</p>
      <p class="the-author">${book.author}</p>
      <button class='removeBook'>Remove</button>
    `;
    booksDiv.appendChild(bookUnit);
  });
}

// Add event listener to the form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('.book-title');
  const authorInput = document.querySelector('.book-author');
  const title = titleInput.value;
  const author = authorInput.value;

  if (title && author) {
    addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
});

// Add event listener to the booksDiv for the removeBook button clicks
booksDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeBook')) {
    const bookId = parseInt(event.target.parentElement.id);
    removeBook(bookId);
  }
});

// Display the books on initial load
displayBooks();
