export function deleteUser(userId) {
    if (confirm("¿Estás seguro de que deseas eliminar este Usuario?")) {
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
            alert('Usuario eliminado exitosamente');
            // Remover la tarjeta del producto del DOM
            const userCard = document.querySelector(`.card[data-user-id="${userId}"]`);
            userCard.remove();
          } else {
            alert('Error al eliminar el Usuario: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  