
// agregarProducto.js
export function agregarProducto(productoId) {
  console.log("producto " + productoId);

  // Obtener el carrito actual de localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(producto => producto.id === productoId);

  if (productoExistente) {
    // Si el producto ya está en el carrito, incrementar la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si el producto no está en el carrito, agregarlo con cantidad 1
    carrito.push({ id: productoId, cantidad: 1 });
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  console.log("Producto agregado al carrito:", carrito);
}