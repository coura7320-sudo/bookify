function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

const books = {
  '1': {id:1, title: 'The Power of Habit', author: 'Charles Duhigg', img: 'book1.png', prices: {paperback:12, hardcover:20, ebook:6}, summary: 'An exploration of how habits form and how they can be changed to improve personal and professional life.'},
  '2': {id:2, title: 'Atomic Habits', author: 'James Clear', img: 'book2.jpg', prices: {paperback:14, hardcover:24, ebook:7}, summary: 'Practical strategies to build good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.'},
  '3': {id:3, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', img: 'book3.jpg', prices: {paperback:10, hardcover:18, ebook:5}, summary: 'A personal finance classic contrasting two approaches to money, investing, and work through the author\'s two father figures.'},
  '4': {id:4, title: 'The Alchemist', author: 'Paulo Coelho', img: 'book4.jpg', prices: {paperback:11, hardcover:19, ebook:6}, summary: 'A poetic tale about following your dreams and listening to your heart while traveling through life.'}
};

const versionLabels = {paperback: 'Paperback', hardcover: 'Hardcover', ebook: 'Ebook'};

function renderBook(book) {
  document.getElementById('book-img').src = book.img;
  document.getElementById('book-title').textContent = book.title;
  document.getElementById('book-author').textContent = 'Author: ' + book.author;
  document.getElementById('book-summary').textContent = book.summary || '';

  const select = document.getElementById('version-select');
  select.innerHTML = '';
  for (const key of Object.keys(book.prices)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = versionLabels[key] || key;
    select.appendChild(opt);
  }

  function updatePrice() {
    const v = select.value;
    document.getElementById('book-price').textContent = book.prices[v];
    renderPreview(book, v);
  }

  select.addEventListener('change', updatePrice);
  updatePrice();

  document.getElementById('addBtn').addEventListener('click', () => {
    const version = select.value;
    const price = book.prices[version];
    const entry = {id: book.id, title: book.title, author: book.author, version, price};
    const catalog = JSON.parse(localStorage.getItem('catalog') || '[]');
    catalog.push(entry);
    localStorage.setItem('catalog', JSON.stringify(catalog));
    const confirmEl = document.getElementById('add-confirm');
    confirmEl.textContent = 'Added ✓';
    confirmEl.style.opacity = '1';
    document.getElementById('addBtn').disabled = true;
    setTimeout(() => {
      window.location.href = 'catalog.html';
    }, 700);
  });
}

function renderPreview(book, version) {
  const preview = document.getElementById('preview');
  const price = book.prices[version];
  preview.innerHTML = `
    <div style="background:rgba(255,255,255,0.04);padding:12px;border-radius:12px;display:flex;gap:12px;align-items:center">
      <img src="${book.img}" alt="mini" style="width:60px;height:80px;object-fit:cover;border-radius:6px">
      <div>
        <div style="font-weight:700;color:#bbf7d0">${book.title}</div>
        <div style="font-size:13px;opacity:0.9">${version} • ${price} €</div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const id = getQueryParam('id') || '1';
  const book = books[id];
  if (!book) {
    document.getElementById('book-detail').innerHTML = '<p>Book not found.</p>';
    return;
  }
  renderBook(book);
});
