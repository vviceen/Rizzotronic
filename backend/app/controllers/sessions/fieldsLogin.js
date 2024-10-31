document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Cerrar sesión antes de proceder con el login
        const username = form.username.value.trim();
        const password = form.password.value.trim();

        if (!username || !password) {
            alert('Todos los campos son requeridos.');
            return;
        }

        // objeto FormData para enviar los datos del formulario
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Enviar los datos a PHP usando fetch
        fetch('/Rizzotronic/backend/app/services/login.php', {
            method: 'POST', 
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Inicio de sesión exitoso');
                // Guardar toda la información del usuario en localStorage
                localStorage.setItem('userNombre', data.nombre);
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userRol', data.rol);
                console.log("rol en localStorage: "+localStorage.getItem('userRol'));
                localStorage.setItem('userId', data.id);
                window.location.href = '/Rizzotronic/frontend/public/index.html';
            } else {
                alert('Error al iniciar sesión: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});