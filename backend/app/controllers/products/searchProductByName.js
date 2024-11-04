document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('productSearch');
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');
    window.selectProduct = selectProduct;

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            window.location.href = `/Rizzotronic/frontend/src/views/products.html?query=${encodeURIComponent(query)}`;
        }
    };

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
                    searchResults.innerHTML = data.products.slice(0, 6).map(product => `
                        <li class="bg-white" onclick="selectProduct(${product.id})">
                            <div class="flex w-full items-center p-2">
                                <img src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}">
                                <span class="text-black">${product.nombre}</span>
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

    // Ocultar los resultados cuando el input pierde el foco, excepto cuando se hace clic en los resultados
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchResults.classList.add('hidden');
        }, 100); // Retraso para permitir el clic en los resultados
    });

    // Mostrar los resultados cuando el input recibe el foco
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            searchResults.classList.remove('hidden');
        }
    });

    // Evitar que el evento blur oculte los resultados cuando se hace clic en los resultados
    searchResults.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });

    // Redirigir a la página de productos cuando se hace clic en el botón de búsqueda
    searchButton.addEventListener('click', performSearch);

    // Redirigir a la página de productos cuando se presiona "Enter" en el input de búsqueda
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

function selectProduct(productId) {
    // Redirigir a la página de detalles del producto o realizar alguna acción
    window.location.href = `/Rizzotronic/frontend/src/views/productView.html?id=${productId}`;
}