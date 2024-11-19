document.addEventListener("DOMContentLoaded", function () {
    // Obtener la ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error('No se proporcionó ninguna ID de producto en la URL.');
        return;
    }

    // Hacer la solicitud al servidor para obtener los detalles del producto
    fetch(`/Rizzotronic/backend/app/services/getProductDetails.php?id=${productId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const product = data.product;

                // Llenar los elementos HTML con los datos del producto
                document.getElementById('product-image').src = `/Rizzotronic/frontend/src/imgProduct/${product.imagen}`;
                document.getElementById('product-name').textContent = product.nombre;
                document.getElementById('product-description').textContent = product.informacion;
                document.getElementById('product-price').textContent = `Precio: $${product.precio_real}`;
                document.getElementById('product-promotion').textContent = product.precio_promocionado ? `Promoción: $${product.precio_promocionado}` : '';
                document.getElementById('product-promotion-end').textContent = product.vigencia_promocion ? `Vigencia: ${product.vigencia_promocion}` : '';
                document.getElementById('product-brand').textContent = `Marca: ${product.marca}`;
                document.getElementById('product-quantity').textContent = `Cantidad Disponible: ${product.stock}`;
                document.getElementById('product-tag').textContent = `Etiqueta: ${product.etiqueta}`;

                // Manejar el clic en el botón "Editar Producto"
                document.getElementById('edit-product-button').addEventListener('click', function () {
                    Swal.fire({
                        title: 'Editar Producto',
                        html: `
                            <input type="hidden" id="product-id" value="${product.id}">
                            
                            <hr>
                            <br>
                            
                            <div class="mb-6">
                                <label for="product-image-input" class="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
                                <input type="file" id="product-image-input" class="swal2-file">
                            </div>

                            <div class="mb-6">
                                <label for="product-name-input" class="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                                <input type="text" id="product-name-input" class="swal2-input" value="${product.nombre}">
                            </div>

                            <div class="mb-6">
                                <label for="product-description-input" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea id="product-description-input" class="swal2-textarea">${product.informacion}</textarea>
                            </div>

                            <div class="mb-6">
                                <label for="product-price-input" class="block text-sm font-medium text-gray-700 mb-1">Precio Real</label>
                                <input type="number" id="product-price-input" class="swal2-input" value="${product.precio_real}">
                            </div>

                            <div class="mb-6">
                                <label for="product-promotion-input" class="block text-sm font-medium text-gray-700 mb-1">Precio Promocionado</label>
                                <input type="number" id="product-promotion-input" class="swal2-input" value="${product.precio_promocionado}">
                            </div>

                            <div class="mb-6">
                                <label for="product-promotion-end-input" class="block text-sm font-medium text-gray-700 mb-1">Vigencia Promoción</label>
                                <input type="date" id="product-promotion-end-input" class="swal2-input" value="${product.vigencia_promocion}">
                            </div>

                            <div class="mb-6">
                                <label for="product-brand-input" class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                                <input type="text" id="product-brand-input" class="swal2-input" value="${product.marca}">
                            </div>

                            <div class="mb-6">
                                <label for="product-quantity-input" class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                                <input type="number" id="product-quantity-input" class="swal2-input" value="${product.stock}">
                            </div>

                            <div class="mb-6">
                                <label for="product-tag-input" class="block text-sm font-medium text-gray-700 mb-1">Etiqueta</label>
                                <input type="text" id="product-tag-input" class="swal2-input" value="${product.etiqueta}">
                            </div>

                            <div class="mb-6">
                                <label for="product-promotion-checkbox" class="block text-sm font-medium text-gray-700 mb-1">Promocionado</label>
                                <input type="checkbox" id="product-promotion-checkbox" class="swal2-checkbox" ${product.promocionado ? 'checked' : ''}>
                            </div>
                        `,
                        focusConfirm: false,
                        preConfirm: () => {
                            const formData = new FormData();
                            formData.append('id', productId);
                            formData.append('nombre', document.getElementById('product-name-input').value || product.nombre);
                            formData.append('informacion', document.getElementById('product-description-input').value || product.informacion);
                            formData.append('precio_real', document.getElementById('product-price-input').value || product.precio_real);

                            // Manejar campos vacíos para precio promocionado y vigencia de promoción
                            const precioPromocionado = document.getElementById('product-promotion-input').value;
                            const vigenciaPromocion = document.getElementById('product-promotion-end-input').value;
                            formData.append('precio_promocionado', precioPromocionado !== '' ? precioPromocionado : null);
                            formData.append('vigencia_promocion', vigenciaPromocion !== '' ? vigenciaPromocion : null);

                            formData.append('marca', document.getElementById('product-brand-input').value || product.marca);
                            formData.append('stock', document.getElementById('product-quantity-input').value || product.stock);
                            formData.append('etiqueta', document.getElementById('product-tag-input').value || product.etiqueta);
                            formData.append('promocionado', document.getElementById('product-promotion-checkbox').checked ? 1 : 0);

                            const imageInput = document.getElementById('product-image-input');
                            if (imageInput.files.length > 0) {
                                formData.append('imagen', imageInput.files[0]);
                            } else {
                                formData.append('imagen_actual', product.imagen);
                            }

                            fetch('/Rizzotronic/backend/app/services/edit_productView.php', {
                                method: 'POST',
                                body: formData,
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    Swal.fire('Producto actualizado exitosamente', '', 'success').then(() => {
                                        window.location.reload();
                                    });
                                } else {
                                    Swal.fire('Error al actualizar el producto', data.message, 'error');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                Swal.fire('Error', 'Hubo un error al actualizar el producto', 'error');
                            });
                        }
                    });
                });
            } else {
                console.error('Error al obtener los detalles del producto:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});