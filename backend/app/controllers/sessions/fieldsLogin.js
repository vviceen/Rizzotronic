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
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Puedes manejar la respuesta del servidor aquí
            alert(data); // Muestra la respuesta del servidor en una alerta (puedes cambiar esto según tus necesidades)
        })
        .catch(error => console.error('Error:', error));
    });
});
