/* eslint no-use-before-define: "off" */
// Retrieving the books from localStorage or create a new empty array
let allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];

// Show Books
function showBooks() {
  const booksList = document.getElementById('book-list');
  booksList.innerHTML = '';
  allBooks.forEach((book) => {
    const list1 = document.createElement('span');
    const list = document.createElement('li');
    list1.textContent = `"${book.title}" by ${book.authorName}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeBooks(book.title, book.authorName));
    list.appendChild(list1);
    list.appendChild(removeButton);
    booksList.appendChild(list);

    const hr = document.createElement('hr');
    booksList.appendChild(hr);
  });
}
// remove a book
function removeBooks(title, author) {
  allBooks = allBooks.filter(
    (book) => book.title !== title || book.authorName !== author,
  );
  localStorage.setItem('allBooks', JSON.stringify(allBooks));
  showBooks();
}
// Add book
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const authorName = authorInput.value;
  if (title && authorName) {
    const bookList = { title, authorName };
    allBooks.push(bookList);
    localStorage.setItem('allBooks', JSON.stringify(allBooks));
    titleInput.value = '';
    authorInput.value = '';
    showBooks();
  }
});
showBooks();
