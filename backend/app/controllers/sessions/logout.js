 // Manejar el cierre de sesión
 const closeSessionButton = document.getElementById('closeSession');
 
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