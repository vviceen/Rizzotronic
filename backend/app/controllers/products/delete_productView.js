document.addEventListener("DOMContentLoaded", function () {
    // Obtener la ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error('No se proporcionó ninguna ID de producto en la URL.');
        return;
    }

    // Manejar el clic en el botón "Eliminar Producto"
    document.getElementById('delete-product-button').addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/Rizzotronic/backend/app/services/deleteProduct.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: productId })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success').then(() => {
                            window.location.href = '/Rizzotronic/frontend/src/views/products.html';
                        });
                    } else {
                        Swal.fire('Error', 'Hubo un error al eliminar el producto.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire('Error', 'Hubo un error al eliminar el producto.', 'error');
                });
            }
        });
    });
});