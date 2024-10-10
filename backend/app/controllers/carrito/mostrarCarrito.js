// mostrarCarrito.js
import { eliminarProducto } from './eliminarProducto.js';

window.eliminarProducto = eliminarProducto;

export function mostrarCarrito() { // Asegúrate de exportar la función
  const email = localStorage.getItem('userEmail');
  const mensaje = document.getElementById('mensaje');
  if (!email) {
    alert('No se ha encontrado el email del usuario.');
    return;
  }

  mensaje.innerHTML = email;

  const carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  console.log('Carrito enviado:', carrito); // Verificar el contenido del carrito
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = '';
  // const productsTable = document.getElementById("productsTable")

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

      if (productos.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
      }
      // const tabla = document.getElementById('productsTable').getElementsByTagName('tbody')[0];

      productos.forEach((producto) => {
        // const fila = tabla.insertRow();

        // const celdaFoto = fila.insertCell();
        // const celdaNombre = fila.insertCell();
        // const celdaDescripcion = fila.insertCell();
        // const celdaPrecio = fila.insertCell();
        // const celdaEliminiar = fila.insertCell();

        // celdaFoto.innerHTML = `<img src="/Rizzotronic/frontend/src/imgProduct/${producto.imagen}" alt="${producto.nombre}" style="width:100%;max-width:15rem">`;
        // celdaNombre.textContent = producto.nombre;
        // celdaDescripcion.textContent = producto.descripcion;
        // celdaPrecio.textContent = `$${producto.precio_real}`;
        // celdaEliminiar.innerHTML = `<button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>`;

        const productoElement = document.createElement("div");
        productoElement.classList.add("producto");
        productoElement.innerHTML = `
          <div class="card">
            <img src="/Rizzotronic/frontend/src/imgProduct/${producto.imagen}" alt="${producto.nombre}" class="card-img-top w-60">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">Precio: <span class="precio-real">$${producto.precio_real}</span> <span class="precio-promocionado">$${producto.precio_promocionado}</span></p>
              <p class="card-text">Cantidad: ${producto.cantidad}</p>
              <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
          </div>
        `;
        carritoContainer.appendChild(productoElement);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
    });
}

window.mostrarCarrito = mostrarCarrito;

document.addEventListener('DOMContentLoaded', mostrarCarrito);
