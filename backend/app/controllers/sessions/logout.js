 // Manejar el cierre de sesión
 document.getElementById('cerrarSession').addEventListener('click', () => {
     fetch("http://localhost/Rizzotronic/backend/app/services/logout.php")
         .then(response => response.json())
         .then(data => {
             if (data.success) {
                localStorage.clear();
                window.location.href = '/Rizzotronic/frontend/public/index.html';
             } else {
                 alert('Error al cerrar sesión');
             }
         })
         .catch(error => {
             console.error('Error:', error);
             alert('Error al cerrar sesión');
         });
});