document.addEventListener('DOMContentLoaded', () => {
    const nombreUser = document.getElementById('nombreUser');
    const closeSessionButton = document.getElementById('closeSession');

    // Solicitar los datos de la sesión al archivo PHP
    fetch('/Rizzotronic/backend/app/services/sessionData.php')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                nombreUser.textContent = `Bienvenido, ${data.username}`;
            } else {
                nombreUser.textContent = 'No se pudo cargar la información de la sesión';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            nombreUser.textContent = 'Error al cargar la información de la sesión';
        });

    // Manejar el cierre de sesión
    closeSessionButton.addEventListener('click', () => {
        fetch('/Rizzotronic/backend/app/services/logout.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/Rizzotronic/frontend/public/index.html'; // Redirigir a la página de inicio de sesión
                } else {
                    alert('Error al cerrar sesión');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cerrar sesión');
            });
    });
});
