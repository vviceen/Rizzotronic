document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

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
                alert('Inicio de sesión exitoso');
              localStorage.setItem('userEmail', data.email); // Guardar el email en localStorage
              window.location.href = '/Rizzotronic/frontend/public/index.html';
            } else {
              alert('Error al iniciar sesión');
            }
          })
          .catch(error => console.error('Error:', error));
        });
      });
