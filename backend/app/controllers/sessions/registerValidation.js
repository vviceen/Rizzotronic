document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!nombre || !email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const data = {
        nombre: nombre,
        email: email,
        password: password,
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
        if (result.includes("Registro exitoso.")) { // Verifica si el registro fue exitoso
            document.getElementById('nombre').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

