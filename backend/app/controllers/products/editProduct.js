// editProduct.js
export function editProduct(productId) {
  // Obtener la tarjeta del producto por ID
  const productCard = document.querySelector(`.card[data-product-id='${productId}']`);
  
  if (!productCard) {
    console.error(`Product card with ID ${productId} not found.`);
    return;
  }

  // Obtener los valores actuales de la tarjeta
  const nombreElement = productCard.querySelector('.card-title');
  const descripcionElement = productCard.querySelector('.text-gray-700');
  const precioRealElement = productCard.querySelector('.text-gray-900');
  const categoriaElement = productCard.querySelector('.text-gray-600');
  const precioPromocionadoElement = productCard.querySelector('.text-red-500');
  const vigenciaPromocionElement = productCard.querySelector('.text-gray-500');

  const nombre = nombreElement ? nombreElement.textContent : '';
  const descripcion = descripcionElement ? descripcionElement.textContent : '';
  const precio_real = precioRealElement ? precioRealElement.textContent.replace('Precio: $', '') : '';
  const categoria = categoriaElement ? categoriaElement.textContent.replace('Categoría: ', '') : '';
  const precio_promocionado = precioPromocionadoElement ? precioPromocionadoElement.textContent.replace('Promoción: $', '') : '';
  const vigencia_promocion = vigenciaPromocionElement ? vigenciaPromocionElement.textContent.replace('Vigencia: ', '') : '';

  // Reemplazar el contenido de la tarjeta con inputs
  productCard.innerHTML = `
    <div class="card-body">
      <input type="text" class="form-control mb-2" id="edit-nombre-${productId}" value="${nombre}">
      <textarea class="form-control mb-2" id="edit-descripcion-${productId}">${descripcion}</textarea>
      <input type="text" class="form-control mb-2" id="edit-precio_real-${productId}" value="${precio_real}">
      <input type="text" class="form-control mb-2" id="edit-categoria-${productId}" value="${categoria}">
      <input type="text" class="form-control mb-2" id="edit-precio_promocionado-${productId}" value="${precio_promocionado}">
      <input type="text" class="form-control mb-2" id="edit-vigencia_promocion-${productId}" value="${vigencia_promocion}">
      <button class="btn btn-success" onclick="saveProduct(${productId})">Guardar</button>
      <button class="btn btn-secondary" onclick="cancelEdit(${productId})">Cancelar</button>
    </div>
  `;
}

export function saveProduct(productId) {
  // Obtener los nuevos valores de los inputs
  const nombre = document.getElementById(`edit-nombre-${productId}`).value;
  const descripcion = document.getElementById(`edit-descripcion-${productId}`).value;
  const precio_real = document.getElementById(`edit-precio_real-${productId}`).value;
  const categoria = document.getElementById(`edit-categoria-${productId}`).value;
  const precio_promocionado = document.getElementById(`edit-precio_promocionado-${productId}`).value;
  const vigencia_promocion = document.getElementById(`edit-vigencia_promocion-${productId}`).value;

  // Crear el objeto de datos a enviar al servidor
  const formData = new FormData();
  formData.append('id', productId);
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('precio_real', precio_real);
  formData.append('categoria', categoria);
  formData.append('precio_promocionado', precio_promocionado);
  formData.append('vigencia_promocion', vigencia_promocion);

  // Enviar los datos al servidor para guardar los cambios
  fetch('/Rizzotronic/backend/app/services/updateProduct.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Producto actualizado exitosamente');
        location.reload(); // Recargar la página para mostrar los cambios actualizados
      } else {
        alert('Error al actualizar el producto: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export function cancelEdit(productId) {
  // Recargar la página para cancelar la edición
  location.reload();
}
