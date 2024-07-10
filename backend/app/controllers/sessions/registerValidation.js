document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const nacionalidad = document.getElementById('nacionalidad').value.trim();
    const nacimiento = document.getElementById('nacimiento').value.trim();

    if (!nombre || !email || !password || !nacionalidad || !nacimiento) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const data = {
        nombre: nombre,
        email: email,
        password: password,
        nacionalidad: nacionalidad,
        nacimiento: nacimiento
    };

    fetch('/Rizzotronic/backend/app/services/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

