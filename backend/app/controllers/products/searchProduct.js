document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetch(`/Rizzotronic/backend/app/services/searchProductByName.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('product-list');
                productList.innerHTML = ''; // Limpiar contenido previo

                document.getElementById('deleteQueryBtn').style.display = 'block';
                const mensajeQuery = document.getElementById('mensajeQuery');
                mensajeQuery.innerHTML = `Resultados de: "${query}"`;
                if (data.success) {
                    data.products.forEach(product => {
                        const productCard = `
                            <div class="card overflow-hidden shadow-lg my-4" data-product-id="${product.id}">
                                <figure>
                                    <img class="w-full" src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}">
                                </figure>
                                <div class="card-body">
                                    <h2 class="card-title font-bold uppercase">${product.nombre}</h2>
                                </div>
                                <div class="flex items-center mt-2 ml-4">
                                    <div class="text-secondary text-lg font-semibold line-through">$${product.precio_real}</div>
                                    ${product.precio_promocionado ? `<div class="text-primary text-lg mr-2">$${product.precio_promocionado}</div>` : ''}
                                    ${product.vigencia_promocion ? `<div class="badge badge-accent badge-outline">${product.vigencia_promocion}</div>` : ''}
                                </div>
                                <div class="card-actions justify-end">
                                    <div class="mt-4">
                                        ${data.rol == '2' ? `
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onclick="editProduct(${product.id})">Editar card</button>
                                        ` : ''}
                                         <a class="btn btn-primary mr-4 mb-3" href="../../../frontend/src/views/productView.html?id=${product.id}">Ver Más</a>
                                    </div>
                                </div>
                            </div>
                        `;
                        productList.innerHTML += productCard;
                    });
                } else {
                    productList.innerHTML = `<p>No se encontraron productos.</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});