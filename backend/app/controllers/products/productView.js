import { agregarProducto } from '../carrito/agregarProducto.js';

window.agregarProducto = agregarProducto;

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
                const productImage = document.getElementById('product-image');
                const productName = document.getElementById('product-name');
                const productDescription = document.getElementById('product-description');
                const productPrice = document.getElementById('product-price');
                const productPromotion = document.getElementById('product-promotion');
                const productPromotionEnd = document.getElementById('product-promotion-end');
                const productBrand = document.getElementById('product-brand');
                const productQuantity = document.getElementById('product-quantity');
                const productTag = document.getElementById('product-tag');
                const productCreatedAt = document.getElementById('product-created-at');
                const addToCartButton = document.getElementById('add-to-cart-button');
    
                productImage.src = `/Rizzotronic/frontend/src/imgProduct/${product.imagen}`;
                productName.textContent = product.nombre;
                productDescription.textContent = product.informacion;
                productPrice.textContent = `Precio: $${product.precio_real}`;
    
                if (product.precio_promocionado) {
                    productPromotion.textContent = `Promoción: $${product.precio_promocionado}`;
                    productPromotion.classList.add('text-2xl', 'font-bold', 'text-accent', 'mr-2');
                    productPrice.classList.add('text-xl', 'text-gray-400', 'font-bold');
                    productPrice.style.textDecoration = 'line-through';
                    productPrice.textContent = `$${product.precio_real}`;
                } else {    
                    productPromotion.style.display = 'none';
                    productPrice.classList.add('text-3xl', 'font-bold', 'text-amarrillo-dark');
                }
    
                if (product.vigencia_promocion) {
                    productPromotionEnd.textContent = `Finaliza el ${product.vigencia_promocion}`;
                    productPromotionEnd.classList.add('badge', 'badge-accent', 'badge-outline');
                }
    
                productBrand.textContent = `${product.marca}`;
                productQuantity.textContent = `Cantidad disponible ${product.stock}`;
                productTag.textContent = `${product.etiqueta}`;
                productCreatedAt.textContent = `Fecha de creación ${product.fecha_creacion}`;
    
                // Mostrar el botón de agregar al carrito solo para clientes con rol 3
                if (localStorage.getItem('userRol') == 3) {
                    // Ocultar los botones de editar y eliminar
                    document.getElementById('edit-product-button').style.display = 'none';
                    document.getElementById('delete-product-button').style.display = 'none';
                    addToCartButton.style.display = 'block';
                    addToCartButton.addEventListener('click', () => {
                        agregarProducto(productId);
                    });
                } else {
                    addToCartButton.style.display = 'none';
                    // Mostrar los botones de editar y eliminar
                    document.getElementById('edit-product-button').style.display = 'block';
                    document.getElementById('delete-product-button').style.display = 'block';
                }
            } else {
                console.error('Error al obtener los detalles del producto:', data.message || 'Respuesta inesperada del servidor');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});