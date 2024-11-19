
export function deleteUser(userId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/Rizzotronic/backend/app/services/adminView/deleteUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire(
                            'Eliminado',
                            'El usuario ha sido eliminado exitosamente.',
                            'success'
                        ).then(() => {
                            // Remover la tarjeta del producto del DOM
                            const userCard = document.querySelector(`.card[data-user-id="${userId}"]`);
                            if (userCard) {
                                userCard.remove();
                            }
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'Error al eliminar el usuario: ' + data.message,
                            'error'
                        );
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un error al eliminar el usuario.',
                        'error'
                    );
                });
        }
    });
}