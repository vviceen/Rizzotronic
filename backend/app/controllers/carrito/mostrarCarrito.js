// mostrarCarrito.js
import { eliminarProducto } from './eliminarProducto.js';

window.eliminarProducto = eliminarProducto;

export function mostrarCarrito() {
  const email = localStorage.getItem('userEmail');
  const mensaje = document.getElementById('mensaje');
  if (!email) {
    alert('No se ha encontrado el email del usuario.');
    return;
  }

  mensaje.innerHTML = email;

  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  console.log('Carrito enviado:', carrito); // Verificar el contenido del carrito
  const productsTableBody = document.getElementById('productsTable').querySelector('tbody');
  productsTableBody.innerHTML = '';

  fetch("/Rizzotronic/backend/app/services/carrito/getProduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrito),
  })
    .then((response) => response.json())
    .then((productos) => {
      if (productos.error) {
        console.error('Error al obtener los productos:', productos.error);
        return;
      }

      productos.forEach((producto) => {
        const precioReal = parseFloat(producto.precio_real);
        if (isNaN(precioReal)) {
          console.error(`Precio real no válido para el producto ${producto.nombre}`);
          return;
        }

        const row = document.createElement('tr');
        const precioTotal = precioReal * producto.cantidad;
        row.innerHTML = `
          <td class="px-4 py-2"><img src="/Rizzotronic/frontend/src/imgProduct/${producto.imagen}" alt="${producto.nombre}" class="w-16 h-16 object-cover"></td>
          <td class="px-4 py-2">${producto.nombre}</td>
          <td class="px-4 py-2">${precioReal.toFixed(2)}</td>
          <td class="px-4 py-2">${producto.cantidad}</td>
          <td class="px-4 py-2">${precioTotal.toFixed(2)}</td>
          <td class="px-4 py-2"><button class="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
        `;
        productsTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
    });
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);