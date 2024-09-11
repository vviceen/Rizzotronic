import { editProduct, saveProduct, cancelEdit, proximo } from './editProduct.js';
import { deleteProduct } from './deleteProduct.js';
import { agregarProducto } from '../carrito/agregarProducto.js';

window.editProduct = editProduct;
window.saveProduct = saveProduct;
window.cancelEdit = cancelEdit;
window.deleteProduct = deleteProduct;
window.proximo = proximo;
window.agregarProducto = agregarProducto;


document.addEventListener("DOMContentLoaded", function () {
  fetch("/Rizzotronic/backend/app/services/getProducts.php")
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = ''; // Limpiar contenido previo
      
      data.products.forEach((product) => {
        const productCard = `
          <div class="card max-w-sm rounded overflow-hidden shadow-lg my-4 bg-slate-950" data-product-id="${product.id}">
            <img class="w-full" src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 card-title">${product.nombre}</div>
              <p class="text-gray-500 text-lg font-semibold card-text-precio">Precio: $${product.precio_real}</p>
              ${product.precio_promocionado ? `<p class="text-red-500 text-lg card-text-promocion">Promoción: $${product.precio_promocionado}</p>` : ''}
              ${product.vigencia_promocion ? `<p class="text-gray-500 text-sm card-text-vigencia">Vigencia: ${product.vigencia_promocion}</p>` : ''}
              <div>  
              ${data.rol == '2' ? `
                <button class="bg-neutral-200 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded" onclick="editProduct(${product.id})">Editar card</button>
                <button class="bg-neutral-200 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded" onclick="deleteProduct(${product.id})">Eliminar</button>
                <button class="bg-neutral-200 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded" onclick="proximo(${product.id})">Editar Producto</button>
              ` : `
                <a class="bg-neutral-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="../../frontend/src/views/productView.html?id=${product.id}">Ver Más</a>
                <button class="btn btn-success hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded" onclick="agregarProducto(${product.id})">Agregar al carrito</button>
              `}
              
              </div>
            </div>
          </div>
        `;
        productList.innerHTML += productCard;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
