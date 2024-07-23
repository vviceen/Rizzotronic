import { editProduct, saveProduct, cancelEdit } from './editProduct.js';
import { deleteProduct } from './deleteProduct.js';

window.editProduct = editProduct;
window.saveProduct = saveProduct;
window.cancelEdit = cancelEdit;
window.deleteProduct = deleteProduct;

document.addEventListener("DOMContentLoaded", function () {
  fetch("/Rizzotronic/backend/app/services/getProducts.php")
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementById("product-list");
    
      data.products.forEach((product) => {
        const productCard = `
          <div class="card" data-product-id="${product.id}">
            <img src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}" class="card-img-top">
            <div class="card-body bg-slate-300">
              <h5 class="card-title">${product.nombre}</h5>
              <p class="card-text card-text-description">${product.descripcion}</p>
              <p class="card-text card-text-precio"><strong>Precio: $${product.precio_real}</strong></p>
              <p class="card-text card-text-categoria">Categoría: ${product.categoria}</p>
              ${product.precio_promocionado ? `<p class="card-text card-text-promocion">Promoción: $${product.precio_promocionado}</p>` : ''}
              ${product.vigencia_promocion ? `<p class="card-text card-text-vigencia">Vigencia: ${product.vigencia_promocion}</p>` : ''}
              ${data.rol == 'vendedor'? `<button class="btn btn-primary" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>` 
               : `<button class="btn btn-primary">Ver Mas</button>` }
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
