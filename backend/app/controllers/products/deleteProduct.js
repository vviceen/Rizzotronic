export function deleteProduct(productId) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    fetch('/Rizzotronic/backend/app/services/deleteProduct.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Producto eliminado exitosamente');
          // Remover la tarjeta del producto del DOM
          const productCard = document.querySelector(`.card[data-product-id='${productId}']`);
          productCard.remove();
        } else {
          alert('Error al eliminar el producto: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
