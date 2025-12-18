function renderCatalog() {
  const list = document.getElementById('catalog-list');
  const totalEl = document.getElementById('catalog-total');
  const catalog = JSON.parse(localStorage.getItem('catalog') || '[]');
  list.innerHTML = '';
  if (catalog.length === 0) {
    list.innerHTML = '<p>Your catalog is empty.</p>';
    totalEl.textContent = '';
    return;
  }

  let total = 0;
  catalog.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'catalog-item';
    div.innerHTML = `<strong>${item.title}</strong> — ${item.version} — ${item.price} € <button data-idx="${idx}">Remove</button>`;
    if (item.summary) {
      const small = document.createElement('div');
      small.style.opacity = '0.9';
      small.style.marginTop = '6px';
      small.textContent = item.summary;
      div.appendChild(small);
    }
    list.appendChild(div);
    total += Number(item.price) || 0;
  });

  totalEl.textContent = 'Total: ' + total + ' €';

  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const idx = Number(e.target.getAttribute('data-idx'));
      catalog.splice(idx, 1);
      localStorage.setItem('catalog', JSON.stringify(catalog));
      renderCatalog();
    }
  });
}

document.addEventListener('DOMContentLoaded', renderCatalog);
