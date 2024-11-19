document.addEventListener("DOMContentLoaded", function () {
    const finalizarCompraBtn = document.getElementById('finalizarCompra');

    finalizarCompraBtn.addEventListener('click', function () {
        const email = localStorage.getItem('userEmail');
        const usuario_id = localStorage.getItem('userId'); // Obtener el ID del usuario desde el localStorage
        let carrito = JSON.parse(localStorage.getItem(`carrito_${email}`)) || [];

        if (carrito.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Obtener las cantidades de los productos desde los inputs
        carrito = carrito.map(producto => {
            const cantidadInput = document.querySelector(`input[data-id="${producto.id}"]`);
            const cantidad = parseInt(cantidadInput.value);
            return { ...producto, cantidad };
        });

        fetch('/Rizzotronic/backend/app/services/completePurchase.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario_id, carrito }),
        })
            .then(response => {
                console.log('Respuesta del servidor:', response);
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data);
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Compra completada!',
                        text: 'Tu compra ha sido registrada exitosamente.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Vaciar el carrito
                        localStorage.removeItem(`carrito_${email}`);
                        // Recargar la página para actualizar el carrito
                        window.location.reload();
                    });
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'Hubo un error al completar la compra. Por favor, inténtelo de nuevo más tarde.', 'error');
            });
    });
});