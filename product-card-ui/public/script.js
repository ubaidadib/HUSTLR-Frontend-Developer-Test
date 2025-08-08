window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('product-grid');
  const toast = document.getElementById('toast');

  try {
    const res = await fetch('/api/products');
    const products = await res.json();

    container.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" />
        <h2>${p.name}</h2>
        <p class="price">$${p.price.toFixed(2)}</p>

        ${p.variants?.length ? `
          <select>
            ${p.variants.map(v => `<option>${v}</option>`).join('')}
          </select>
        ` : ''}

        <input type="number" min="1" max="10" value="1" />

        ${
          p.inStock
            ? `<button class="add" onclick="addToCart('${p.name}')">Add to Cart</button>`
            : `<button class="out" disabled>Out of Stock</button>`
        }
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>⚠️ Failed to load products.</p>`;
    console.error(err);
  }

  window.addToCart = (productName) => {
    toast.innerText = `✅ "${productName}" added to cart`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
  };
});
