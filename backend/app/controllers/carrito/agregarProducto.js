export function agregarProducto(productoId) {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    alert('No se ha encontrado el email del usuario.');
    return;
  }

  console.log("producto " + productoId + " email " + email);

  // Verificar si localStorage está disponible
  if (typeof localStorage === 'undefined') {
    console.error("localStorage no está disponible.");
    return;
  }

  // Obtener el carrito actual del usuario de localStorage
  let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];

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
  localStorage.setItem(`carrito_${email}`, JSON.stringify(carrito));

  console.log("Producto agregado al carrito:", email, carrito);
}