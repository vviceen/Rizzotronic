// eliminarProducto.js

import { mostrarCarrito } from './mostrarCarrito.js';

export function eliminarProducto(productId) {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    alert('No se ha encontrado el email del usuario.');
    return;
  }

  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  const productoIndex = carrito.findIndex(producto => producto.id === productId);

  if (productoIndex !== -1) {
    if (carrito[productoIndex].cantidad > 1) {
      carrito[productoIndex].cantidad -= 1;
    } else {
      carrito = carrito.filter(producto => producto.id !== productId);
    }
    localStorage.setItem(`carrito_${email}`, JSON.stringify(carrito));
    mostrarCarrito(); 
  }
} 
