import { mostrarCarrito } from './mostrarCarrito.js';

export function eliminarProducto(productId) {
  console.log("Producto a eliminar: " + productId);
  const email = localStorage.getItem('userEmail');
  if (!email) {
    alert('No se ha encontrado el email del usuario.');
    return;
  }

  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  console.log("Carrito antes de eliminar: ", carrito);

  // Asegurarse de que productId es una cadena
  const productoIndex = carrito.findIndex(producto => producto.id === productId.toString());
  console.log("Índice del producto a eliminar: ", productoIndex);

  if (productoIndex !== -1) {
    const cantidadOriginal = carrito[productoIndex].cantidad;
    if (cantidadOriginal > 1) {
      carrito[productoIndex].cantidad -= 1;
      console.log(`Cantidad del producto ${productId} reducida a ${carrito[productoIndex].cantidad}.`);
    } else {
      carrito = carrito.filter(producto => producto.id !== productId.toString());
      console.log(`Producto ${productId} eliminado del carrito.`);
    }
    localStorage.setItem(`carrito_${email}`, JSON.stringify(carrito));
    console.log("Carrito después de eliminar: ", carrito);

    // Verificar si el producto se eliminó o se redujo la cantidad correctamente
    const carritoActualizado = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
    const productoActualizado = carritoActualizado.find(producto => producto.id === productId.toString());
    if (!productoActualizado) {
      console.log(`Producto ${productId} eliminado correctamente.`);
    } else if (productoActualizado.cantidad < cantidadOriginal) {
      console.log(`Cantidad del producto ${productId} actualizada correctamente a ${productoActualizado.cantidad}.`);
    } else {
      console.error(`Error al actualizar el producto ${productId}.`);
    }
  } else {
    console.error(`Producto ${productId} no encontrado en el carrito.`);
  }
  mostrarCarrito();
}