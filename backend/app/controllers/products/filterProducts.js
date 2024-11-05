document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    const filtrarBtn = document.getElementById("filtrar");
    const limpiarBtn = document.getElementById("limpiar");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
    const descuentoVigenteCheckbox = document.getElementById("promocionVigente");

    let currentPage = 1;
    const itemsPerPage = 8;
    let filteredProducts = [];

    function renderProducts(products) {
        if (!query) {
            const productList = document.getElementById("product-list");
            productList.innerHTML = ''; // Clear previous content

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedProducts = products.slice(startIndex, endIndex);

            paginatedProducts.forEach(product => {
                const productCard = `
                <div class="card overflow-hidden shadow-lg my-4" data-product-id="${product.id}">
                    <figure>
                        <img class="w-full" src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}">
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold uppercase">${product.nombre}</h2>
                    </div>
                    <div class="flex items-center mt-2 ml-4">
                        <div class="text-secondary text-lg font-semibold ${product.precio_promocionado ? 'line-through' : ''}">$${product.precio_real}</div>
                        ${product.precio_promocionado ? `<div class="text-primary text-lg mr-2">$${product.precio_promocionado}</div>` : ''}
                        ${product.vigencia_promocion ? `<div class="badge badge-accent badge-outline">${product.vigencia_promocion}</div>` : ''}
                    </div>
                    <div class="card-actions justify-end">
                        <div class="mt-4">
                            ${product.rol == '2' ? `
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onclick="editProduct(${product.id})">Editar card</button>
                            ` : ''}
                            <a class="btn btn-primary mr-4 mb-3" href="../../../frontend/src/views/productView.html?id=${product.id}">Ver Más</a>
                        </div>
                    </div>
                </div>
            `;
                productList.innerHTML += productCard;
            });

            pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(products.length / itemsPerPage)}`;
        }
    }

    function filterProducts() {
        if (!query) {
            const precioMin = document.getElementById("precio_min").value;
            const precioMax = document.getElementById("precio_max").value;
            const ordenFecha = document.getElementById("orden_fecha").value;
            const marca = document.getElementById("marca").value;
            const etiqueta = document.getElementById("etiqueta").value;
            const descuentoVigente = descuentoVigenteCheckbox.checked;

            fetch("/Rizzotronic/backend/app/services/getProducts.php")
                .then(response => response.json())
                .then(data => {
                    if (data.products) {
                        filteredProducts = data.products.filter(product => {
                            const precioReal = parseFloat(product.precio_real);

                            return (precioMin === "" || precioReal >= parseFloat(precioMin)) &&
                                (precioMax === "" || precioReal <= parseFloat(precioMax)) &&
                                (marca === "" || product.marca === marca) &&
                                (etiqueta === "" || product.etiqueta === etiqueta) &&
                                (!descuentoVigente || product.precio_promocionado);
                        });

                        if (ordenFecha === "asc") {
                            filteredProducts.sort((a, b) => new Date(a.fecha_creacion) - new Date(b.fecha_creacion));
                        } else if (ordenFecha === "desc") {
                            filteredProducts.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
                        }

                        renderProducts(filteredProducts);
                    } else {
                        console.error("Error al obtener los productos:", data.error);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }

    function resetFilters() {
        if (!query) {
            document.getElementById("precio_min").value = "";
            document.getElementById("precio_max").value = "";
            document.getElementById("orden_fecha").value = "";
            document.getElementById("marca").value = "";
            document.getElementById("etiqueta").value = "";
            descuentoVigenteCheckbox.checked = false;
            currentPage = 1;
            filterProducts();
        }
    }

    filtrarBtn.addEventListener("click", function () {
        currentPage = 1;
        filterProducts();
    });

    limpiarBtn.addEventListener("click", function () {
        resetFilters();
    });

    prevPageBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(filteredProducts);
        }
    });

    nextPageBtn.addEventListener("click", function () {
        if (currentPage * itemsPerPage < filteredProducts.length) {
            currentPage++;
            renderProducts(filteredProducts);
        }
    });

    // Initial load
    filterProducts();
});