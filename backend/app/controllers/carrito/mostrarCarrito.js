// mostrarCarrito.js

//hay que manejar el stock de los productos y modificar la base de datos
//tambien hay que modificar el precio total del carrito


import { eliminarProducto } from './eliminarProducto.js';

window.eliminarProducto = eliminarProducto;
document.addEventListener('DOMContentLoaded', mostrarCarrito);

function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = '';

  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  fetch("/Rizzotronic/backend/app/services/carrito/getProduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrito),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const productos = JSON.parse(data);
      productos.forEach((producto) => {
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