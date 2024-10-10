document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('productSearch');
  const searchResults = document.getElementById('searchResults');
  window.selectProduct = selectProduct;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();

    if (query.length < 2) {
      searchResults.innerHTML = '';
      searchResults.classList.add('hidden');
      return;
    }

    fetch(`/Rizzotronic/backend/app/services/searchProductByName.php?query=${encodeURIComponent(query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json().catch(() => {
          throw new Error('Invalid JSON response');
        });
      })
      .then(data => {
        if (data.success) {
          searchResults.innerHTML = data.products.map(product => `
            <li class="bg-white" onclick="selectProduct(${product.id})">
            <div class="flex w-full items-center p-2">
              <img src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}">
              <span>${product.nombre}</span>
              </div>
            </li>
          `).join('');
          searchResults.classList.remove('hidden');
        } else {
          searchResults.innerHTML = '<li class="p-2 text-red-500">No se encontraron productos</li>';
          searchResults.classList.remove('hidden');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        searchResults.innerHTML = `<li class="p-2 text-red-500">${error.message}</li>`;
        searchResults.classList.remove('hidden');
      });
  });
});

function selectProduct(productId) {
  // Redirigir a la página de detalles del producto o realizar alguna acción
  window.location.href = `/Rizzotronic/frontend/src/views/productView.html?id=${productId}`;
}