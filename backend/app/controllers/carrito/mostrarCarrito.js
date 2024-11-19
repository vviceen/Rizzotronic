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

      let subtotal = 0;

      productos.forEach((producto) => {
        console.log('Producto:', producto); // Verificar que la información del producto se extraiga correctamente
        const precioReal = parseFloat(producto.precio_real);
        const precioPromocion = parseFloat(producto.precio_promocionado);
        const precio = !isNaN(precioPromocion) && precioPromocion > 0 ? precioPromocion : precioReal;

        if (isNaN(precio)) {
          console.error(`Precio no válido para el producto ${producto.nombre}`);
          return;
        }

        const row = document.createElement('tr');
        const precioTotal = precio * producto.cantidad;
        subtotal += precioTotal;
        row.innerHTML = `
          <td class="px-4 py-6"><img src="/Rizzotronic/frontend/src/imgProduct/${producto.imagen}" alt="${producto.nombre}" class="w-16 h-16 object-cover"></td>
          <td class="px-4 py-2">${producto.nombre}</td>
          <td class="px-4 py-2">
            ${!isNaN(precioPromocion) && precioPromocion > 0 ? `
              <span class="text-accent text-md line-through">$${precioReal.toFixed(2)}</span><br>
              <span class="text-green-600 font-semibold text-2xl">$${precioPromocion.toFixed(2)}</span>
            ` : `
              <span class="text-green-600 font-semibold text-2xl">$${precioReal.toFixed(2)}</span>
            `}
          </td>
          <td class="px-4 py-2">
            <div class="flex items-center">
              <input type="number" class="mx-2 w-16 text-center border border-gray-300 rounded-lg" value="${producto.cantidad}" min="1" max="${producto.stock}" data-id="${producto.id}" onchange="actualizarCantidad(${producto.id}, this.value, ${producto.stock})" oninput="actualizarPrecioTotal(${producto.id}, ${precio})">
            </div>
          </td>
          <td class="px-4 py-2" id="precio-total-${producto.id}">${precioTotal.toFixed(2)}</td>
          <td class="px-4 py-2"><button class="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onclick="eliminarProducto(${producto.id})"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg></button></td>
        `;
        productsTableBody.appendChild(row);
      });

      // Actualizar subtotal y total
      document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
      document.getElementById('total').textContent = `Total: $${subtotal.toFixed(2)}`;

      // Añadir event listeners a los inputs de cantidad
      const cantidadInputs = document.querySelectorAll('input[type="number"][data-id]');
      cantidadInputs.forEach(input => {
        input.addEventListener('input', function (event) {
          const id = event.target.getAttribute('data-id');
          const cantidad = event.target.value;
          const stock = event.target.getAttribute('max');
          actualizarCantidad(id, cantidad, stock);
        });
      });
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
    });
}

window.cambiarCantidad = function (id, delta) {
  const email = localStorage.getItem('userEmail');
  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    const nuevoCantidad = producto.cantidad + delta;
    if (nuevoCantidad <= producto.stock) {
      producto.cantidad = Math.max(1, nuevoCantidad);
      localStorage.setItem(`carrito_${email}`, JSON.stringify(carrito));
      mostrarCarrito();
    } else {
      alert(`No puedes agregar más de ${producto.stock} unidades de este producto.`);
    }
  }
};

window.actualizarCantidad = function (id, cantidad, stock) {
  const email = localStorage.getItem('userEmail');
  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    if (cantidad <= stock) {
      producto.cantidad = Math.max(1, parseInt(cantidad));
      localStorage.setItem(`carrito_${email}`, JSON.stringify(carrito));
      mostrarCarrito();
    } else {
      alert(`No puedes agregar más de ${stock} unidades de este producto.`);
      mostrarCarrito();
    }
  }
};

window.actualizarPrecioTotal = function (id, precio) {
  const cantidad = parseInt(document.querySelector(`input[data-id="${id}"]`).value);
  if (!isNaN(cantidad)) {
    const precioTotal = precio * cantidad;
    document.getElementById(`precio-total-${id}`).textContent = precioTotal.toFixed(2);
    actualizarSubtotalYTotal();
  }
};

function actualizarSubtotalYTotal() {
  const email = localStorage.getItem('userEmail');
  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];
  let subtotal = 0;

  carrito.forEach(producto => {
    const precio = producto.precio_promocionado || producto.precio_real;
    subtotal += precio * producto.cantidad;
  });

  document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `Total: $${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);