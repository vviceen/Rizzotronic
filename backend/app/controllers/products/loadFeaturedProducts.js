import { editProduct, saveProduct, cancelEdit, proximo } from './editProduct.js';
import { deleteProduct } from './deleteProduct.js';


window.editProduct = editProduct;
window.saveProduct = saveProduct;
window.cancelEdit = cancelEdit;
window.deleteProduct = deleteProduct;
window.proximo = proximo;

document.addEventListener("DOMContentLoaded", function () {
  if(localStorage.getItem('userRol')){
    const whoIs = document.getElementById("whoIs");
    if(localStorage.getItem('userRol') == 1){
      whoIs.innerHTML = 'Admin';
    }
    if(localStorage.getItem('userRol') == 2){
      whoIs.innerHTML = 'Vendedor';
    }
  }



  fetch("/Rizzotronic/backend/app/services/getProducts.php")
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Limpiar contenido previo

    data.products.forEach((product) => {
      if (product.promocionado == 1) {
        const productCard = `
          <div class="swiper-slide flex-shrink-0 max-w-[250px] overflow-hidden h-max" data-product-id="${product.id}">
            <figure>
              <img class="w-full h-auto object-cover" src="/Rizzotronic/frontend/src/imgProduct/${product.imagen}" alt="${product.nombre}">
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
                <a class="btn btn-primary mr-4 mb-3" href="../../../frontend/src/views/productView.html?id=${product.id}">Ver Más</a>
              </div>
            </div>
          </div>
        `;
        productList.insertAdjacentHTML('beforeend', productCard);
      }
    });
    // Una vez añadidas las diapositivas, actualiza Swiper
    setTimeout(() => swiper.update(), 100);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
});
