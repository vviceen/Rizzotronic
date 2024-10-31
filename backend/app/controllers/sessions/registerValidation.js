document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!nombre || !email || !password) {
            console.error("Todos los campos son requeridos.");
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
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') { // Verifica si el registro fue exitoso
                    // Limpiar los campos del formulario
                    document.getElementById('nombre').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('password').value = "";

                    // Datos para el login
                    const loginData = {
                        username: nombre, // Asegúrate de usar el nombre registrado
                        password: password
                    };

                    // Enviar solicitud de login
                    fetch('/Rizzotronic/backend/app/services/login.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(loginData)
                    })
                        .then(loginResponse => loginResponse.json())
                        .then(data => {
                            if (data.success) { // Verifica si el login fue exitoso
                                // Guardar toda la información del usuario en localStorage
                                localStorage.setItem('userNombre', data.nombre);
                                localStorage.setItem('userEmail', data.email);
                                localStorage.setItem('userRol', data.rol);
                                console.log("rol en localStorage: " + localStorage.getItem('userRol'));
                                alert("ok?");
                                localStorage.setItem('userId', data.id);
                                window.location.href = "/Rizzotronic/frontend/public/index.html";
                            } else {
                                console.error('Error en el login:', data.message);
                            }
                        })
                        .catch(loginError => {
                            console.error('Error en el login:', loginError);
                        });
                } else {
                    console.error('Error en el registro:', result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});