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
              // Llenar los elementos HTML con los datos del producto
              document.getElementById('product-image').src = `/Rizzotronic/frontend/src/imgProduct/${data.product.imagen}`;
              document.getElementById('product-name').textContent = data.product.nombre;
              document.getElementById('product-description').textContent = data.product.descripcion;
              document.getElementById('product-price').textContent = `Precio: $${data.product.precio_real}`;
              
              if (data.product.precio_promocionado) {
                  document.getElementById('product-promotion').textContent = `Promoción: $${data.product.precio_promocionado}`;
              }

              if (data.product.vigencia_promocion) {
                  document.getElementById('product-promotion-end').textContent = `Vigencia: ${data.product.vigencia_promocion}`;
              }
          } else {
              console.error('Error al obtener los detalles del producto:', data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
});
