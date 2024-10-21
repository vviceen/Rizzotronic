document.getElementById("deleteQueryBtn").addEventListener("click", function () {
        const mensajeQuery = document.getElementById('mensajeQuery');
        document.getElementById('deleteQueryBtn').style.display = 'none';
        mensajeQuery.innerHTML = ``;


        // Eliminar la query de la URL
        const url = new URL(window.location);
        url.search = '';
        window.history.replaceState({}, document.title, url);
        fetch("/Rizzotronic/backend/app/services/getProducts.php")
                .then(response => response.json())
                .then(data => {
                        if (data.products) {
                                const productList = document.getElementById("product-list");
                                productList.innerHTML = ''; // Clear the existing product list
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
                                console.error("Error al obtener los productos:", data.error);
                        }
                })
                .catch(error => {
                        console.error("Error:", error);
                });
});