// eliminarProducto.js

function eliminarProducto(productId) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productoIndex = carrito.findIndex(producto => producto.id === productId);

  if (productoIndex !== -1) {
    if (carrito[productoIndex].cantidad > 1) {
      carrito[productoIndex].cantidad -= 1;
    } else {
      carrito = carrito.filter(producto => producto.id !== productId);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Asegúrate de que mostrarCarrito esté disponible en el ámbito global
  }
}

export { eliminarProducto };